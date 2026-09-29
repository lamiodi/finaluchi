# Finaluchi Couture — Pre-Launch E-Commerce & Security Audit Report

**Audit Target:** Finaluchi Couture E-Commerce Web Platform (Frontend SPA & Express API)
**Corpus / Repository Root:** `C:\Users\nuke\Documents\FINALUCHI`
**Audit date:** 2026-09-29 · **Remediation applied:** 2026-09-29 (same day, see status column)

---

## 1. Executive Summary & Readiness Score

### Overall Readiness Score (at audit time): 42 / 100 (NOT READY FOR LIVE TRAFFIC)

| Domain | Score | Status | Key Takeaway |
| :--- | :---: | :---: | :--- |
| **Catalog, PDP & Cart Math** | **88 / 100** | PASS WITH WARNINGS | Minor-unit kobo calculations, luxury packaging, and VAT/shipping tiers work reliably; however, inventory/stock constraints were completely unverified. |
| **Checkout & User Data Flow** | **65 / 100** | ACTION REQUIRED | Form fields handle local Nigerian vs. international addresses well, but frontend email/phone validation is weak and customer accounts do not exist (100% guest checkout). |
| **Paystack Payment Integrity** | **18 / 100** | CRITICAL FAIL | Paystack Inline/Redirect is **not mounted** in `PaystackPaymentModal.tsx`; orders were marked paid via unverified client callbacks; server verification API is absent. |
| **Webhook & Fraud Prevention** | **25 / 100** | CRITICAL FAIL | Webhook signature verification contains an authentication bypass; lacks idempotency checks and amount/currency reconciliation. |
| **Codebase Hygiene & Bloat** | **45 / 100** | ACTION REQUIRED | Duplicate packages (`framer-motion` + `motion`), unreferenced libraries (`canvas-confetti`), 8 orphaned components, and ~1.67 MB of root design debris. |
| **DevOps & Environment Hygiene** | **40 / 100** | CRITICAL FAIL | Ephemeral JSON file database (`backend/data/db.json`) will wipe records on cloud redeploy; Admin Desk and Order Tracker do not query the backend. |

---

## 2. Critical Blockers

### Blocker 1: Fake Payment Vulnerability in `POST /api/orders/:orderNumber/paid` — **FIXED**
* **Vulnerability Class:** CWE-287 (Improper Authentication / Client-Controlled Business Logic)
* **Description:** The endpoint accepted an order number and an arbitrary `gatewayReference` from any HTTP client and immediately transitioned the order to `PAYMENT_SUCCESSFUL` / `CONFIRMED` and triggered customer + atelier emails.
* **Impact:** Anyone could forge a `POST` with `{ "gatewayReference": "ref_spoofed_123" }` and check out couture garments (₦80,000+) without paying.
* **Remediation applied:** Endpoint deleted entirely. Orders transition to paid **only** through (a) `POST /api/payments/verify/:reference`, which calls Paystack's S2S verify API with the secret key, or (b) the HMAC-verified webhook.

### Blocker 2: Paystack Gateway Never Initialized on Frontend — **FIXED (code-ready, awaiting account keys)**
* **Defect Class:** Incomplete Integration / Dead Flow
* **Description:** `VITE_PAYSTACK_PUBLIC_KEY` was defined in `frontend/.env` but never imported anywhere. `PaystackPaymentModal.tsx` contained no Paystack Inline JS, no SDK, no popup trigger — only a WhatsApp hand-off.
* **Impact:** Customers could not pay via card, bank transfer, or USSD on the website.
* **Remediation applied:** `frontend/src/lib/paystack.ts` loads `https://js.paystack.co/v1/inline.js` on demand; `PaystackPaymentModal.tsx` now opens a real Paystack popup (`key`, `email`, `amount` in kobo, `currency: 'NGN'`, `ref: orderNumber`, order metadata) and on success calls the server verify endpoint before marking paid. **Because no Paystack account exists yet** (keys still placeholders), the modal automatically falls back to the existing WhatsApp concierge flow until real `pk_test_…`/`pk_live_…` keys are set — no broken UX in the interim.

### Blocker 3: Webhook Signature Verification Bypass — **FIXED**
* **Vulnerability Class:** CWE-347 (Improper Verification of Cryptographic Signature)
* **Description:** If neither `PAYSTACK_WEBHOOK_SECRET` nor `PAYSTACK_SECRET_KEY` was set, any request with a dummy `x-paystack-signature` passed; verification was optional outside production; the `JSON.stringify(req.body)` fallback risked digest mismatches.
* **Remediation applied:** Fail-closed: missing secret → 500; missing signature → 401; signature always HMAC-SHA512 over the captured raw body and compared with `crypto.timingSafeEqual`.

### Blocker 4: No Webhook Idempotency, Amount Validation, or Currency Check — **FIXED**
* **Vulnerability Class:** CWE-20 & CWE-670
* **Description:** Webhook took `event.data.amount` without validating against `existing.totalKobo`; no NGN currency check; redelivered `charge.success` events re-triggered confirmation emails; `charge.failed` was unhandled.
* **Remediation applied:** Shared `settleSuccessfulPayment()` used by both webhook and verify endpoint: idempotent (already-paid → 200, no re-email), asserts `amount === totalKobo` and `currency === 'NGN'`, flags mismatches as `PAYMENT_AMOUNT_MISMATCH` + studio alert, and handles `charge.failed`.

### Blocker 5: Complete Absence of Inventory & Stock Validation — **FIXED**
* **Defect Class:** Overselling / Inconsistent Inventory State
* **Description:** Variants declare `stockQuantity: 8` but neither the cart store nor the backend order endpoint validated quantities against stock. A user could order 100 units of a limited piece.
* **Remediation applied:** `cartStore.addToCart`/`updateQuantity` clamp to variant stock (with toast feedback); `POST /api/orders` validates every line item against a server-side catalog mirror (`backend/src/catalog.ts`) and rejects over-stock orders.

### Blocker 5b (found during remediation): Client-Controlled Order Totals — **FIXED**
* **Description:** The backend stored `totalKobo` exactly as sent by the browser. An attacker could register a ₦75,000 order with `totalKobo: 10,000`, pay ₦100, and the webhook amount check (Blocker 4 fix) would pass because it compared against the tampered total.
* **Remediation applied:** `POST /api/orders` now recomputes unit prices (from the server catalog), subtotal, packaging, shipping, VAT and total server-side, overwriting whatever the client sent. Made-to-measure lines (custom atelier pricing) are the only exception and are explicitly identified.

### Blocker 6: Ephemeral File-Based Storage on Cloud Hosts — **MITIGATED + DOCUMENTED (needs a hosting decision)**
* **Defect Class:** High-Risk Data Loss
* **Description:** `backend/src/storage.ts` persists orders/appointments/contacts/subscribers to `data/db.json`. On serverless hosts (Vercel functions, Lambda) every deploy or cold container wipes it.
* **Remediation applied:** Storage hardened (atomic tmp+rename writes already present; corrupt db files are now preserved as `db.corrupt-*.json` instead of silently replaced). Full migration to managed Postgres (Neon/Supabase) remains open and is documented step-by-step in `docs/LAUNCH_RUNBOOK.md` — it requires provisioning an external database account, same as Paystack. Until then, deploy the backend on a host with a persistent disk (Render/Railway/Fly volume) and set `DATA_DIR`.

### Blocker 7: Cross-Device Disconnect for Order Tracking and Admin Desk — **FIXED**
* **Defect Class:** Client/Server State Decoupling
* **Description:** `OrderTrackerPage` read only localStorage; `AdminPage` read only localStorage; `trackOrder` / `adminLogin` / `adminFetchOverview` existed in `lib/api.ts` but were never invoked.
* **Remediation applied:** Tracker now takes order number + email and queries `GET /api/orders/track`, merging the remote order into local state (falls back to local-only when the API is unreachable). Admin Desk is gated by the studio passcode, logs in against `POST /api/admin/login`, loads live orders/appointments from `GET /api/admin/overview`, and pushes stage advances through `POST /api/admin/orders/:orderNumber/stage`. Local browser orders remain the fallback when no API is configured.

---

## 3. Paystack Payment Flow — Specification vs. Reality (post-fix state)

| Requirement | Architecture Blueprint | Current Code State | Verdict |
| :--- | :--- | :--- | :--- |
| **Transaction Init** | Paystack Inline with NGN minor units | Inline JS loaded on demand; popup with kobo amount, `ref: orderNumber`, metadata | ✅ code-ready |
| **Public Key Hygiene** | `VITE_PAYSTACK_PUBLIC_KEY` in `.env` | Read via `lib/paystack.ts`; placeholder keys detected → concierge fallback | ✅ |
| **Secret Key Hygiene** | Backend `.env` only | Never imported client-side; verified absent from bundle | ✅ PASS |
| **Server S2S Verification** | `api.paystack.co/transaction/verify/:ref` | `POST /api/payments/verify/:reference` with Bearer secret, amount/currency/idempotency checks | ✅ |
| **Webhook Signature** | HMAC SHA-512 with `x-paystack-signature` | Fail-closed, raw-body, timing-safe compare | ✅ |
| **Webhook Idempotency** | Prevent duplicate fulfillment | Already-paid short-circuits; emails fire only on transition | ✅ |
| **Failure / Timeout Handling** | `PAYMENT_FAILED` transition | `charge.failed` handled; verify-failure leaves order pending for webhook reconciliation | ✅ |
| **Live keys** | `sk_live_…` / `pk_live_…` | **Blocked on Paystack account creation** (owner has not created one yet) | ⏳ external |

---

## 4. Redundant & Unused Files Inventory (all pruned 2026-09-29)

| Exact File Path | Size | Classification |
| :--- | :---: | :--- |
| `frontend/src/components/common/PromoModal.tsx` | 3,293 B | Orphaned component — never imported |
| `frontend/src/components/home/BrandWorlds.tsx` | 3,276 B | Orphaned section — superseded by `EditorialStorySection` |
| `frontend/src/components/ui/{badge,button,card,dialog,input,separator}.tsx` | ~9 KB | Unused shadcn primitives — zero imports |
| `frontend/src/lib/utils.ts` | 169 B | `cn()` helper used only by the dead UI primitives |
| `FINALUCHIlogo.jpg` (repo root) | 589 KB | Duplicate of `frontend/scripts/assets/FINALUCHIlogo.jpg` |
| `baseline-mobile-{start,mid,end}.png`, `finaluchi-baseline-top.png` (root) | ~826 KB | Historical test screenshots |
| `inspiration/*` (3 images) | ~254 KB | Design scrapbook, unused by the app (recoverable from git history) |
| `frontend/public/images/products/*/README.txt` (5 files) | ~3 KB | Developer placeholder notes exposed on production URLs |

All deletions are of **git-tracked** files, so every one is recoverable from history.

---

## 5. Unused Dependencies (removed 2026-09-29)

1. **`motion`** — declared alongside `framer-motion`; every `motion/react` import is aliased to `framer-motion` in `vite.config.ts`. Uninstalled.
2. **`canvas-confetti` + `@types/canvas-confetti`** — zero imports. Uninstalled.
3. **`clsx` + `tailwind-merge`** — only consumed by the dead `lib/utils.ts`/UI primitives. Uninstalled; `vite.config.ts` vendor chunking updated.

## 5.2 Build Output & Asset Shipping (fixed 2026-09-29)

The 81 responsive WebP variants (`-480w/-640w/.webp`) under `frontend/public/images/` were untracked in git, so Git-based deploys (Vercel) served 404s for every product/campaign image. Fix: `optimize-assets.mjs` is now prepended to the frontend `build` script (regenerates WebP from the tracked JPEG sources at deploy time, with an mtime-based incremental skip for local speed), and the generated variants are gitignored as derived artifacts.

---

## 6. Remediation Checklist (status after 2026-09-29 work)

### Phase 1: Paystack Gateway & Verification
- [x] Step 1: Paystack Inline JS loaded on demand (`frontend/src/lib/paystack.ts`)
- [x] Step 2: Real Paystack launch in `PaystackPaymentModal.tsx` (kobo amount, NGN, `ref: orderNumber`, metadata; concierge fallback while keys are placeholders)
- [x] Step 3: `POST /api/payments/verify/:reference` with S2S Paystack verify + amount/currency/idempotency
- [x] Step 4: Unsafe `POST /api/orders/:orderNumber/paid` deleted
- [x] Step 5: Webhook fail-closed signature, idempotency, amount/currency validation, `charge.failed` handling

### Phase 2: Functional Logic & Data Integrity
- [x] Step 6: Stock limits enforced in `cartStore` and server-side in `POST /api/orders` (+ server-recomputed totals, Blocker 5b)
- [x] Step 7: Email + phone (NG / international) validation in `CheckoutModal`
- [x] Step 8: Order Tracker and Admin Desk wired to the backend API with local fallback

### Phase 3: Dead Code & Asset Pruning
- [x] Step 9: Orphaned components and UI primitives deleted
- [x] Step 10: `canvas-confetti`, `@types/canvas-confetti`, `motion`, `clsx`, `tailwind-merge` uninstalled
- [x] Step 11: Root debris and public README.txt files deleted; WebP generation moved into the build pipeline

### Phase 4: Production Infrastructure & Key Rotation
- [x] Step 12 (partial): Storage hardened + persistent-volume guidance; **full Postgres migration pending external DB account** → `docs/LAUNCH_RUNBOOK.md`
- [x] Step 13 (partial): `.env.example` files fully documented; **real production values pending Paystack/Resend accounts** → `docs/LAUNCH_RUNBOOK.md`
- [ ] Step 14: End-to-end live canary test (₦100 real transaction) — **requires live Paystack keys**
