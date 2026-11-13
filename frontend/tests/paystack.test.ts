import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(new URL('../package.json', import.meta.url));
const { transform, build } = require('esbuild');
let moduleId = 0;
async function paystackModule(key = 'pk_test_checkoutfixture') {
  const source = await readFile(new URL('../src/lib/paystack.ts', import.meta.url), 'utf8');
  const { code } = await transform(source, {
    loader: 'ts', format: 'esm', target: 'es2022',
    define: { 'import.meta.env.VITE_PAYSTACK_PUBLIC_KEY': JSON.stringify(key) },
  });
  return import(`data:text/javascript;base64,${Buffer.from(`${code}\n// ${moduleId++}`).toString('base64')}`);
}

test('Vercel PAYSTACK_PUBLIC_KEY is explicitly exposed without secret variables', async () => {
  const original = { public: process.env.PAYSTACK_PUBLIC_KEY, vite: process.env.VITE_PAYSTACK_PUBLIC_KEY };
  const { default: config } = await import('../vite.config.ts');
  try {
    process.env.PAYSTACK_PUBLIC_KEY = 'pk_test_vercelfixture';
    process.env.VITE_PAYSTACK_PUBLIC_KEY = 'your_paystack_public_key_here';
    const result = (config as Function)({ mode: 'test' });
    assert.deepEqual(result.define, { 'import.meta.env.VITE_PAYSTACK_PUBLIC_KEY': '"pk_test_vercelfixture"' });
    delete process.env.PAYSTACK_PUBLIC_KEY;
    process.env.VITE_PAYSTACK_PUBLIC_KEY = 'pk_live_legacyfixture';
    assert.equal((config as Function)({ mode: 'test' }).define['import.meta.env.VITE_PAYSTACK_PUBLIC_KEY'], '"pk_live_legacyfixture"');
    process.env.PAYSTACK_PUBLIC_KEY = 'sk_test_neverexposethis';
    process.env.VITE_PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxx';
    assert.equal((config as Function)({ mode: 'test' }).define['import.meta.env.VITE_PAYSTACK_PUBLIC_KEY'], '""');
  } finally {
    for (const [key, value] of [['PAYSTACK_PUBLIC_KEY', original.public], ['VITE_PAYSTACK_PUBLIC_KEY', original.vite]]) {
      if (value === undefined) delete process.env[key!]; else process.env[key!] = value;
    }
  }
});

test('only public test/live keys enable checkout', async () => {
  for (const key of ['', 'your_paystack_public_key_here', 'pk_test_xxxxx', 'sk_test_secret', 'arbitrary']) {
    assert.equal((await paystackModule(key)).isPaystackConfigured(), false);
  }
  for (const key of ['pk_test_123abc', 'pk_live_123abc']) {
    assert.equal((await paystackModule(key)).isPaystackConfigured(), true);
  }
});

test('popup receives authoritative NGN totals, unique references, and single callbacks', async () => {
  const originalWindow = globalThis.window;
  const attempts: any[] = [];
  let opened = 0;
  let succeeded = 0;
  let cancelled = 0;
  (globalThis as any).window = {
    PaystackPop: { setup: (options: any) => { attempts.push(options); return { openIframe: () => { opened++; } }; } },
  };
  try {
    const gateway = await paystackModule();
    const options = { email: 'checkout@example.test', amountKobo: 8595000, reference: 'FC-TEST-POPUP',
      onSuccess: () => { succeeded++; }, onCancel: () => { cancelled++; } };
    await gateway.openPaystackCheckout(options);
    assert.equal(opened, 1);
    assert.equal(attempts[0].amount, 8595000);
    assert.equal(attempts[0].currency, 'NGN');
    assert.equal(attempts[0].metadata.orderNumber, 'FC-TEST-POPUP');
    attempts[0].callback({ reference: attempts[0].ref });
    attempts[0].callback({ reference: attempts[0].ref });
    attempts[0].onClose();
    assert.equal(succeeded, 1);
    assert.equal(cancelled, 0);
    await gateway.openPaystackCheckout(options);
    assert.notEqual(attempts[0].ref, attempts[1].ref);
    attempts[1].onClose();
    attempts[1].onClose();
    assert.equal(cancelled, 1);
    for (const amountKobo of [0, -1, 1.5, NaN, Infinity]) {
      await assert.rejects(gateway.openPaystackCheckout({ ...options, amountKobo }), /invalid/);
    }
    assert.equal(opened, 2);
  } finally {
    (globalThis as any).window = originalWindow;
  }
});

test('Paystack script loading can recover after network or missing SDK errors', async () => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  const scripts: any[] = [];
  (globalThis as any).window = { setTimeout, clearTimeout };
  (globalThis as any).document = {
    createElement: () => ({ remove() {} }), head: { appendChild: (script: any) => scripts.push(script) },
  };
  try {
    const gateway = await paystackModule();
    let loading = gateway.loadPaystackInline();
    assert.equal(gateway.loadPaystackInline(), loading);
    scripts[0].onerror();
    await assert.rejects(loading, /Could not load/);
    loading = gateway.loadPaystackInline();
    scripts[1].onload();
    await assert.rejects(loading, /unavailable/);
    loading = gateway.loadPaystackInline();
    (globalThis as any).window.PaystackPop = {};
    scripts[2].onload();
    await loading;
    assert.equal(scripts.length, 3);
  } finally {
    (globalThis as any).window = originalWindow;
    (globalThis as any).document = originalDocument;
  }
});

test('order API deduplicates registration and preserves server totals', async () => {
  const realFetch = globalThis.fetch;
  const compiled = await build({
    entryPoints: [new URL('../src/lib/api.ts', import.meta.url).pathname.replace(/^\/([A-Z]:)/i, '$1')],
    bundle: true, write: false, format: 'esm', platform: 'node',
    define: { 'import.meta.env.VITE_API_URL': '"https://checkout.example.test"', 'import.meta.env.DEV': 'false' },
  });
  const api = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`);
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return new Response(JSON.stringify({ ok: true, order: { orderNumber: 'FC-API-TEST', totalKobo: 8595000 } }));
  };
  try {
    const order = { orderNumber: 'FC-API-TEST', totalKobo: 1 };
    const results = await Promise.all([api.registerOrder(order), api.registerOrder(order)]);
    assert.equal(calls, 1);
    assert.equal(results[0].totalKobo, 8595000);
    await api.registerOrder(order, true);
    assert.equal(calls, 2);
    globalThis.fetch = async () => new Response('{}', { status: 503 });
    assert.equal(await api.verifyPayment('missing', { orderNumber: 'FC-NOT-SAVED' }), null);
  } finally {
    globalThis.fetch = realFetch;
  }
});
