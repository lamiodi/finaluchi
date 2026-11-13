import assert from 'node:assert/strict';
import { test } from 'node:test';
import crypto from 'node:crypto';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { SERVER_CATALOG, priceOrderItems, computeOrderTotals } from '../src/catalog.js';
import { MASTER_PRODUCTS } from '../../frontend/src/data/catalog.ts';

test('all storefront products, colourways and sizes match server prices', () => {
  assert.equal(MASTER_PRODUCTS.length, SERVER_CATALOG.length);
  for (const product of MASTER_PRODUCTS) {
    for (const colorway of product.colorways) {
      for (const variant of product.variants) {
        const price = priceOrderItems([{
          productId: product.id, sizeSnapshot: variant.size,
          skuSnapshot: `${colorway.sku}-${variant.size}`, quantity: 1, unitPriceKobo: 1,
        }]);
        assert.ok(price.ok, `${product.name}: ${variant.size}`);
        if (price.ok) assert.equal(price.subtotalKobo,
          product.basePriceKobo + (colorway.priceDeltaKobo || 0) + (variant.priceDeltaKobo || 0));
      }
    }
  }
});

test('shipping, VAT and packaging totals', () => {
  assert.deepEqual(computeOrderTotals(6600000, 'SIGNATURE_BOX', 'NG'), {
    packagingKobo: 0, shippingKobo: 1500000, taxKobo: 495000, totalKobo: 8595000,
  });
  assert.deepEqual(computeOrderTotals(6600000, 'ECO_LUXURY_CARRIER', 'US'), {
    packagingKobo: 1500000, shippingKobo: 8500000, taxKobo: 0, totalKobo: 16600000,
  });
});

test('order registration, tracking, verification and signed webhooks', async (t) => {
  const dataDir = await mkdtemp(path.join(tmpdir(), 'finaluchi-checkout-'));
  // Test isolation: never connect to the business database or send real emails.
  Object.assign(process.env, {
    NODE_ENV: 'test', DATABASE_URL: '', DATA_DIR: dataDir, RESEND_API_KEY: '',
    ATELIER_EMAIL: '', PAYSTACK_SECRET_KEY: 'sk_test_checkoutfixture',
    PAYSTACK_WEBHOOK_SECRET: '', ADMIN_PASSCODE: '',
  });
  const { app } = await import('../src/server.js');
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>((resolve) => server.once('listening', resolve));
  const address = server.address();
  assert.ok(address && typeof address === 'object');
  const base = `http://127.0.0.1:${address.port}`;
  const realFetch = globalThis.fetch;
  let transaction: Record<string, unknown> = {};
  globalThis.fetch = async (input, init) => {
    if (String(input).startsWith('https://api.paystack.co/transaction/verify/')) {
      return new Response(JSON.stringify({ status: true, data: transaction }), { status: 200 });
    }
    throw new Error(`Unexpected external request in test: ${String(input)}`);
  };
  const request = async (url: string, body?: unknown, headers?: Record<string, string>) => {
    const response = await realFetch(`${base}${url}`, body === undefined ? undefined : {
      method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body),
    });
    return { status: response.status, body: await response.json() as any };
  };
  const draft = (suffix: string) => ({
    id: `ord-test-${suffix}`, orderNumber: `FC-TEST-${suffix}`,
    customerFullName: 'Checkout Test', customerEmail: 'checkout@example.test', customerPhone: '+2348030000000',
    shippingAddress: { fullName: 'Checkout Test', email: 'checkout@example.test', phone: '+2348030000000', country: 'NG', state: 'FCT', city: 'Abuja', addressLine1: '1 Test Street' },
    items: [{ productId: 'prod-dress-02', sizeSnapshot: '6', skuSnapshot: 'FC-DR-2026-LEO-6', quantity: 1, unitPriceKobo: 1 }],
    totalKobo: 1, packagingType: 'SIGNATURE_BOX', paymentStatus: 'PAYMENT_SUCCESSFUL',
    orderStatus: 'COMPLETED', gatewayReference: 'forged', atelierCurrentStageIndex: 6,
  });
  const txFor = (order: string, overrides: Record<string, unknown> = {}) => ({
    reference: `${order}-attempt1`, status: 'success', amount: 8595000, currency: 'NGN',
    customer: { email: 'checkout@example.test' }, metadata: { orderNumber: order }, ...overrides,
  });
  const webhook = (event: unknown, signature?: string) => {
    const signed = signature ?? crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!).update(JSON.stringify(event)).digest('hex');
    return request('/api/webhooks/paystack', event, { 'x-paystack-signature': signed });
  };
  try {
    await t.test('payment configuration reports test mode without exposing keys', async () => {
      const result = await request('/api/payments/config');
      assert.deepEqual(result.body, { configured: true, mode: 'test' });
      process.env.PAYSTACK_SECRET_KEY = '';
      assert.equal((await request('/api/payments/config')).body.configured, false);
      process.env.PAYSTACK_SECRET_KEY = 'sk_test_checkoutfixture';
    });
    await t.test('server reprices order and discards forged paid/production state', async () => {
      const result = await request('/api/orders', draft('MAIN'));
      assert.equal(result.status, 201);
      assert.equal(result.body.order.totalKobo, 8595000);
      assert.equal(result.body.order.paymentStatus, 'PAYMENT_PENDING');
      assert.equal(result.body.order.atelierCurrentStageIndex, 0);
      assert.equal(result.body.order.gatewayReference, undefined);
    });
    await t.test('repeated and concurrent registration preserves a single order', async () => {
      const results = await Promise.all([request('/api/orders', draft('RETRY')), request('/api/orders', draft('RETRY'))]);
      assert.deepEqual(results.map((r) => r.status).sort(), [200, 201]);
      assert.equal(results[0].body.order.id, results[1].body.order.id);
      assert.equal((await request('/api/orders', { ...draft('MAIN'), id: 'other-client' })).status, 409);
    });
    await t.test('rejects invalid address, packaging, stock, colour and bespoke price tampering', async () => {
      assert.equal((await request('/api/orders', { ...draft('BAD'), shippingAddress: {} })).status, 400);
      assert.equal((await request('/api/orders', { ...draft('BAD'), packagingType: 'free-shipping' })).status, 400);
      for (const changes of [{ quantity: 9 }, { skuSnapshot: 'invalid-6' }, { sizeSnapshot: 'Made to Measure', unitPriceKobo: 1 }]) {
        const order = draft('BAD');
        assert.equal((await request('/api/orders', { ...order, items: [{ ...order.items[0], ...changes }] })).status, 400);
      }
    });
    await t.test('unknown, failed and unrelated payments never confirm an order', async () => {
      for (const changes of [{ status: 'failed' }, { customer: { email: 'other@example.test' } }, { reference: 'FC-OTHER-attempt1' }]) {
        transaction = txFor('FC-TEST-MAIN', changes);
        assert.equal((await request('/api/payments/verify/FC-TEST-MAIN-attempt1', {})).status, 400);
      }
    });
    await t.test('amount and currency mismatches are rejected', async () => {
      await request('/api/orders', draft('AMOUNT'));
      for (const changes of [{ amount: 1 }, { currency: 'USD' }]) {
        transaction = txFor('FC-TEST-AMOUNT', changes);
        assert.equal((await request('/api/payments/verify/FC-TEST-AMOUNT-attempt1', {})).status, 400);
      }
    });
    await t.test('verified payment confirms once and re-registration cannot reset paid state', async () => {
      transaction = txFor('FC-TEST-MAIN');
      const results = await Promise.all([
        request('/api/payments/verify/FC-TEST-MAIN-attempt1', {}),
        request('/api/payments/verify/FC-TEST-MAIN-attempt1', {}),
      ]);
      assert.deepEqual(results.map((r) => r.body.alreadyPaid).sort(), [false, true]);
      for (const result of results) assert.equal(result.body.order.paymentStatus, 'PAYMENT_SUCCESSFUL');
      const retry = await request('/api/orders', draft('MAIN'));
      assert.equal(retry.body.order.paymentStatus, 'PAYMENT_SUCCESSFUL');
      assert.equal(retry.body.order.orderStatus, 'CONFIRMED');
    });
    await t.test('order tracking requires the correct checkout email', async () => {
      assert.equal((await request('/api/orders/track?orderNumber=FC-TEST-MAIN&email=other@example.test')).status, 404);
      const result = await request('/api/orders/track?orderNumber=FC-TEST-MAIN&email=checkout@example.test');
      assert.equal(result.body.order.paymentStatus, 'PAYMENT_SUCCESSFUL');
    });
    await t.test('webhook rejects invalid signature and settles signed payments idempotently', async () => {
      await request('/api/orders', draft('WEBHOOK'));
      const event = { event: 'charge.success', data: txFor('FC-TEST-WEBHOOK') };
      assert.equal((await webhook(event, 'invalid')).status, 401);
      process.env.PAYSTACK_WEBHOOK_SECRET = 'your_paystack_webhook_secret_here';
      assert.equal((await webhook(event)).status, 200);
      process.env.PAYSTACK_WEBHOOK_SECRET = '';
      assert.equal((await webhook(event)).status, 200);
      await webhook({ event: 'charge.failed', data: txFor('FC-TEST-WEBHOOK') });
      const result = await request('/api/orders/track?orderNumber=FC-TEST-WEBHOOK&email=checkout@example.test');
      assert.equal(result.body.order.paymentStatus, 'PAYMENT_SUCCESSFUL');
      assert.equal((await webhook({ event: 'charge.success', data: txFor('FC-TEST-NOTYETSAVED') })).status, 503);
    });
    await t.test('concurrent failure and success notifications cannot reset a paid order', async () => {
      await request('/api/orders', draft('RACE'));
      await Promise.all([
        webhook({ event: 'charge.success', data: txFor('FC-TEST-RACE') }),
        webhook({ event: 'charge.failed', data: txFor('FC-TEST-RACE') }),
      ]);
      const result = await request('/api/orders/track?orderNumber=FC-TEST-RACE&email=checkout@example.test');
      assert.equal(result.body.order.paymentStatus, 'PAYMENT_SUCCESSFUL');
    });
  } finally {
    globalThis.fetch = realFetch;
    await new Promise<void>((resolve, reject) => server.close((err) => err ? reject(err) : resolve()));
    assert.ok(dataDir.startsWith(path.join(tmpdir(), 'finaluchi-checkout-')));
    await rm(dataDir, { recursive: true, force: true });
  }
});
