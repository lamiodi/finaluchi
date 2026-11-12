# FINALUCHI — Launch Runbook

Everything that **cannot be finished from the codebase alone** because it needs an
external account, a production secret, or a live money movement. Work top to bottom.
Code-side state as of 2026-09-29: all audit fixes are in (`docs/PRE_LAUNCH_AUDIT_2026-09-29.md`);
the storefront automatically falls back to the WhatsApp concierge flow while Paystack
keys are placeholders, so nothing is broken today.

---

## 1. Paystack account (OWNER: not yet created)

1. Sign up at <https://paystack.com> with the business email (finaluchi.com domain email preferred).
2. Complete business verification (CAC certificate, director ID, bank account for payouts).
3. In **Settings → API Keys & Webhooks** copy:
   - **Test Secret Key** (`sk_test_…`) → `backend/.env` → `PAYSTACK_SECRET_KEY`
   - **Test Public Key** (`pk_test_…`) → `frontend/.env` → `VITE_PAYSTACK_PUBLIC_KEY`
   - `PAYSTACK_WEBHOOK_SECRET` = the same **secret key** (Paystack signs webhooks with `sk_…`).
4. In **Settings → Webhooks** set the URL to `https://<your-backend-host>/api/webhooks/paystack`.
5. The moment a real `pk_test_…` key lands in `frontend/.env`, the checkout modal
   automatically switches from the WhatsApp concierge to the live Paystack popup —
   no code change needed.
6. **Test with Paystack test cards before going live**, e.g.
   `4084 0840 8408 4081` (success), `4084 0000 0000 4081` (declined), plus the
   bank-transfer and USSD test flows. Phone auth OTP: `123456`.
7. Only after the canary checklist (§5) passes: swap in **live** keys everywhere
   (`sk_live_…` / `pk_live_…`) and re-deploy.

## 2. Transactional email — Resend

1. Sign up at <https://resend.com>, verify the `finaluchi.com` domain (DNS TXT/DKIM records).
2. Create an API key → `backend/.env` → `RESEND_API_KEY`.
3. `RESEND_FROM=FINALUCHI COUTURE <orders@finaluchi.com>` (must be a verified sender).
4. `ATELIER_EMAIL=<studio inbox>` — receives new-order / appointment / inquiry alerts.
   Until set, emails are logged to the server console instead of sent.

## 3. Backend hosting + durable order storage

The API is a plain Express app (`backend/`). It must NOT be deployed to ephemeral
serverless storage until the Postgres migration below is done.

**Option A (fastest, keeps current file DB):** Render / Railway / Fly.io with a
**persistent disk mounted**, env `DATA_DIR=/var/data/finaluchi` pointing at the disk.
Order/appointment/contact records then survive deploys and restarts.

**Option B (durable — IMPLEMENTED in `backend/src/storage.ts`):**
`backend/src/storage.ts` now writes directly to Supabase Postgres (`DATABASE_URL` in `backend/.env`) across four RLS-protected tables (`public.orders`, `public.appointments`, `public.contacts`, `public.newsletter_subscribers`) and automatically falls back to `backend/data/db.json` if `DATABASE_URL` is unset or temporarily paused.
1. Ensure your Supabase project (`pueovgrhdqjwqusyuppm`) is active (not paused due to free-tier inactivity).
2. Run `npm run db:sync` from the repo root to apply `001_create_products.sql` + `002_create_store_tables.sql` and upsert all **14 live products** into `public.products`.
3. `GET /api/health` will report `"storage": "postgres"` and `"database": "connected"`.

Regardless of option, set on the backend host:
```
NODE_ENV=production
FRONTEND_URL=https://finaluchi.com
SITE_URL=https://finaluchi.com
ADMIN_PASSCODE=<long random passcode>          # generate: openssl rand -base64 18
ADMIN_TOKEN_SECRET=<different long random hex> # generate: openssl rand -hex 32
```

## 4. Frontend deploy (Vercel)

1. Vercel project already builds from the root (`npm run build` → `frontend/dist`).
   The build now regenerates all WebP variants from the tracked JPEGs automatically.
2. Set environment variables in Vercel:
   - `VITE_API_URL=https://<backend-host>` (no trailing slash)
   - `VITE_SITE_URL=https://finaluchi.com`
   - `VITE_PAYSTACK_PUBLIC_KEY=pk_test_…` (later `pk_live_…`)
3. Redeploy after keys change — Vite bakes `VITE_*` values in at build time.

## 5. Canary checklist (run once per environment, test → live)

- [ ] Health: `curl https://<backend-host>/api/health` → `status: ok`, email + admin `configured`
- [ ] Place a test order end-to-end (card succeeds) → order confirmation email arrives,
      studio alert arrives, order shows in `/admin` (passcode login) with `PAYMENT_SUCCESSFUL`
- [ ] Pay ₦100-declined test card → order stays `PAYMENT_FAILED`, no confirmation email
- [ ] Tamper check: `curl -X POST …/api/payments/verify/bogus-ref` → 400
- [ ] Webhook signature check: `curl -X POST …/api/webhooks/paystack -d '{}'` without
      signature header → 401
- [ ] Tracker: open `#/tracker` on a **different device**, order number + email → order found
- [ ] Stock: try adding more than 8 of one size → blocked in cart and by the API
- [ ] Live keys only after all above pass on test keys; finish with one real ₦100
      live transaction and refund it from the Paystack dashboard.

## 6. Known follow-ups (not launch blockers)

- Fabric compositions / exact GSM weights in `frontend/src/data/catalog.ts` still `TODO(product)` (Recall Collection material, finish, macro zoom, and true garment colourways have been updated from the studio photography).
- Cleo "white", Dahlia "white/black", and secondary colourways of Essence/Diza/Hasam/Amber reuse the photographed hero shot until per-colourway studio shots arrive.
- Order registration vs. payment settlement emails now use distinct subject lines, headings, and ledger status rows (`renderOrderConfirmationEmail` in `backend/src/emails.ts`).
- When real stock counts diverge from the flat `8` per variant, keep
  `backend/src/catalog.ts` in sync with `frontend/src/data/catalog.ts` (the server
  copy is the validation authority).
