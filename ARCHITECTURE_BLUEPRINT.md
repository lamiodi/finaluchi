# FINALUCHI COUTURE — MASTER DIGITAL FLAGSHIP BLUEPRINT

**Version:** 2.1.0 (Production Architecture Edition)  
**Platform:** Finaluchi Couture  
**Positioning:** Luxury African & Contemporary Haute Couture E-Commerce  
**Core Thesis:** Transform Finaluchi from a polished clothing store into an iconic digital couture house, uniting editorial storytelling, craftsmanship credibility, formal luxury motion architecture, white-glove clienteling, and frictionless, impenetrable modern commerce.

---

## DOCUMENT CHANGELOG (v2.0.0 → v2.1.0)

| Area | Version 2.0.0 (Master Edition) | Version 2.1.0 (Production Architecture Edition) |
| :--- | :--- | :--- |
| **Payment Gateway** | Multi-gateway architecture | **Paystack Exclusive.** Sole payment gateway for all transactions. |
| **Financial Units** | Mixed currency terminology & `*_cents` fields | **Standardized on integer NGN minor units (`*_kobo`).** Authoritative financial calculations performed strictly in NGN. |
| **Currency Architecture** | Implied multi-currency gateway capture | **Strict separation of Display Currency vs. Transaction Currency.** Client-side conversions are purely indicative. |
| **Lifecycle State Machines** | Single overloaded `order_status` enum | **Triple Decoupled Lifecycles:** Independent `paymentStatus`, `orderStatus`, and `fulfillmentStatus` state machines with formal transition guards. |
| **Payment Reconciliation** | Asynchronous webhook-only reliance | **Full S2S Reconciliation System:** Synchronous post-redirect verification + HMAC-SHA512 webhook + scheduled cron worker for edge-case recovery. |
| **Inventory Management** | Direct mutation of `stockQuantity` | **Atomic Reservation Engine (`ACTIVE`, `EXPIRED`, `CONVERTED`) + Immutable Inventory Ledger (`inventory_transactions`).** |
| **Guest Order Security** | Plaintext `order_access_token` in DB | **Cryptographic Token Hashing (SHA-256):** Plaintext never stored; constant-time comparison + Step-Up Email OTP for high-risk actions. |
| **Measurement Privacy** | Static table columns in plaintext | **Configurable EAV Architecture (`measurement_values`) with AES-256-GCM encryption at rest** and strict RBAC audit access. |
| **Administrative Auditing** | Informal admin session handling | **First-Class `audit_logs` Engine** capturing actor, role, delta (`before`/`after`), IP, request ID, and automated PII/credential redaction. |
| **Security Hardening** | Standard route protection notes | **Enterprise Defense-in-Depth:** HTTP-only Secure SameSite cookies, CSRF tokens, server-side RBAC, CSP/HSTS headers, upload malware scanning. |
| **Historical Invoices** | Foreign-key joins to mutable catalog | **Immutable Purchase Snapshots:** `order_items` preserves exact historical title, variant, price, fabric, and tax metadata at checkout time. |
| **Performance & Media** | High-level optimization guidelines | **Strict Performance Budgets:** CWV thresholds (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1), bundle budgets, progressive 360° loading, reduced-motion fallbacks. |
| **Observability & Jobs** | Generic error tracking | **Structured JSON Logging (`requestId`, `orderId`), BullMQ background workers, and automated alerting matrices.** |
| **Disaster Recovery** | Unspecified backup intervals | **Automated PostgreSQL WAL Archiving, PITR, Encrypted Snapshots, Target RPO ≤ 1h, RTO ≤ 4h.** |
| **Compliance Terminology** | Absolute compliance assertions | **Calibrated Legal Disclaimers:** Explicit separation between engineering architecture and statutory legal policy. |

---

## 1. BRAND EXPERIENCE & COUTURE POSITIONING

### 1.1 Core Brand Position
Finaluchi Couture operates as a **digital fashion house with integrated commerce**, not a transaction-driven store dressed in luxury aesthetics. 

Every touchpoint communicates:
* **Couture Authenticity:** Genuine atelier craft, bespoke fit, and sculptural tailoring.
* **Modern African Sophistication:** Contemporary silhouettes honoring African luxury heritage.
* **Exclusivity & Provenance:** Limited atelier editions, piece serialization, and traceable craftsmanship.
* **Editorial Immersion:** Magazine-quality layout rhythm, cinematic video, and lookbook interactions.
* **High-Touch Clienteling:** Discreet private styling, saved bespoke measurements, and personal concierge care.

### 1.2 The Seven Experience Principles
1. **Editorial before Transactional:** Inspire desire and convey craft before presenting checkout mechanisms.
2. **Whitespace before Density:** High breathing room reflects luxury; clutter degrades brand equity.
3. **Motion as Architecture:** Strict separation between cinematic timelines (GSAP), interface transitions (Framer Motion), and fluid inertia (Lenis).
4. **Product Intelligence:** Teach customers how garments behave, drape, and move when tactile touch is absent.
5. **Dignified Exclusivity:** Replace cheap promotional urgency with numbered atelier editions and private client tiers.
6. **Curated Discovery:** Replace cognitive overload with occasion-based edits and stylized looks.
7. **Post-Purchase Craft Journey:** The luxury experience begins upon payment, tracking the garment’s creation inside the atelier.

---

## 2. COMPREHENSIVE LUXURY DESIGN TOKENS

To ensure visual harmony, all components strictly adhere to global design tokens rather than ad-hoc inline styles.

```css
:root {
  /* --- 2.1 INTERFACE & CANVAS COLOR SYSTEM --- */
  --color-alabaster: #FAF9F6;       /* Primary canvas background */
  --color-alabaster-subtle: #F3F1EC;/* Alternate section background */
  --color-noir: #0D0D0D;            /* Primary typography & deep elements */
  --color-noir-pure: #050505;       /* Video overlays & cinematic backdrops */
  --color-oyster: #E6E1DA;          /* Surfaces, cards, subtle borders */
  --color-champagne: #0D0D0D;       /* Monochrome noir accent (aligned to official B/W logo) */
  --color-champagne-light: #3A3A3A; /* Monochrome hover accent */
  --color-muted: #6F6A64;           /* Secondary copy, captions, timestamps */
  --color-border: #E5E4E1;          /* Subtle dividing rules */
  --color-white: #FFFFFF;           /* Elevated panels & modals */
  --color-status-atelier: #0D0D0D;  /* Atelier progress & bespoke indicators */

  /* --- 2.2 COUTURE CLOTH & FABRIC COLOR PALETTES --- */
  /* Group 1: Signature Neutrals & Mineral Silks */
  --cloth-noir-onyx: #0D0D0D;          /* Obsidian Mulberry Silk Satin (19-4008 TCX) */
  --cloth-alabaster-ivory: #F8F6F0;    /* Raw Ivory Silk Dupioni (11-0601 TCX) */
  --cloth-pearl-oyster: #E4DEC8;       /* Luminous Pearl Silk Charmeuse (13-0905 TCX) */
  --cloth-dune-crepe: #D2C4B2;         /* Desert Sand Hand-Spun Wool Crepe (14-1108 TCX) */
  --cloth-cocoa-umber: #3E2723;        /* Dark Roasted Cocoa Wool (19-1218 TCX) */

  /* Group 2: Imperial African Heritage & Jewel Dyes */
  --cloth-benin-malachite: #0A3D2E;    /* Imperial Emerald Malachite Silk (19-5411 TCX) */
  --cloth-yoruba-indigo: #1B2A4A;      /* Royal Indigofera Vat Dye Silk (19-3938 TCX) */
  --cloth-nile-lapis: #1A365D;         /* Deep Lapis Blue Silk Organza (19-4033 TCX) */
  --cloth-ashanti-saffron: #C68B19;    /* Royal Ashanti Sun Gold Brocade (15-0955 TCX) */
  --cloth-sahara-terracotta: #A84B29;  /* Savanna Clay Terracotta Silk (18-1440 TCX) */
  --cloth-amethyst-plum: #4A154B;      /* Imperial Velvet Deep Plum (19-2520 TCX) */

  /* Group 3: Lustrous Metallics & Accent Satins */
  --cloth-champagne-gold: #C8B294;     /* Atelier Champagne Lame (14-1118 TCX) */
  --cloth-liquid-bronze: #8C6239;      /* Metallic Liquid Bronze Taffeta (18-0935 TCX) */
  --cloth-burnished-copper: #B86B43;   /* Lustrous Spun Copper Silk (17-1436 TCX) */
  --cloth-platinum-silk: #DCDFE4;      /* Cool Specular Platinum Luster (13-4105 TCX) */

  /* Group 4: Earthy Savanna & Solstice Hues */
  --cloth-baobab-bark: #5A4D41;        /* Aged Baobab Bark Linen (19-0822 TCX) */
  --cloth-sage-palm: #78866B;          /* Whispering Sage Silk Georgette (16-0421 TCX) */
  --cloth-sunstone-amber: #D97724;     /* Glowing Solstice Amber Silk (16-1349 TCX) */
  --cloth-dusk-carmine: #722F37;       /* Royal Twilight Carmine Velvet (19-1725 TCX) */

  /* --- 2.3 INTERACTIVE SWATCH COMPONENT TOKENS --- */
  --swatch-size-desktop: 32px;
  --swatch-size-mobile: 28px;
  --swatch-gap: 10px;
  --swatch-radius: 4px;
  --swatch-ring-gap: 2px;
  --swatch-ring-width: 1.5px;
  --swatch-ring-color: var(--color-champagne);
  --swatch-shadow: 0 2px 8px rgba(13, 13, 13, 0.08);
  --swatch-shadow-active: 0 4px 14px rgba(13, 13, 13, 0.25);
  --swatch-disabled-slash: rgba(13, 13, 13, 0.4);
  
  /* --- TYPOGRAPHY FAMILIES --- */
  --font-display: 'Cormorant Garamond', 'Canela', Georgia, serif;
  --font-sans: 'Inter', 'Neue Montreal', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace; /* Serial numbers & measurements */

  /* --- FLUID TYPOGRAPHY SCALE --- */
  --text-display-xl: clamp(4.5rem, 8vw + 1rem, 8.5rem);  /* 72px - 136px */
  --text-display-lg: clamp(3.25rem, 6vw + 1rem, 6rem);   /* 52px - 96px */
  --text-h1: clamp(2.5rem, 4.5vw + 0.5rem, 4.25rem);      /* 40px - 68px */
  --text-h2: clamp(1.85rem, 3vw + 0.5rem, 2.75rem);       /* 30px - 44px */
  --text-h3: clamp(1.35rem, 1.8vw + 0.25rem, 1.85rem);    /* 22px - 30px */
  --text-body-lg: clamp(1.05rem, 0.4vw + 0.95rem, 1.25rem);/* 17px - 20px */
  --text-body: 1rem;                                      /* 16px */
  --text-body-sm: 0.875rem;                               /* 14px */
  --text-micro: 0.6875rem;                                /* 11px */

  /* --- SPACING TOKENS --- */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
  --space-48: 12rem;    /* 192px */

  /* --- BORDER RADII --- */
  --radius-none: 0px;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-pill: 9999px; /* Badges and fine chips only */

  /* --- ELEVATION & SHADOWS --- */
  --shadow-subtle: 0 4px 20px rgba(13, 13, 13, 0.04);
  --shadow-elevated: 0 12px 40px rgba(13, 13, 13, 0.08);
  --shadow-drawer: -8px 0 32px rgba(13, 13, 13, 0.12);

  /* --- MOTION TOKENS --- */
  --duration-micro: 220ms;
  --duration-fast: 350ms;
  --duration-standard: 550ms;
  --duration-luxury: 800ms;
  --duration-cinematic: 1400ms;

  --ease-luxury: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-editorial: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-cinematic: cubic-bezier(0.7, 0, 0.2, 1);

  /* --- LAYOUT & CONTAINERS --- */
  --container-max: 1680px;
  --container-editorial: 1320px;
  --container-prose: 780px;

  /* --- Z-INDEX ARCHITECTURE --- */
  --z-base: 0;
  --z-header: 100;
  --z-sticky-rail: 200;
  --z-drawer: 500;
  --z-modal: 600;
  --z-runway-mode: 800;
  --z-cursor: 1000;
}
```

---

## 3. LUXURY MOTION ARCHITECTURE

### 3.1 Separation of Responsibilities
To eliminate animation conflict, performance drops, and spaghetti code, the motion architecture divides into three explicit layers:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                        FINALUCHI MOTION ENGINE                          │
├───────────────────┬───────────────────────────────┬─────────────────────┤
│   GSAP + SCROLL   │         FRAMER MOTION         │        LENIS        │
├───────────────────┼───────────────────────────────┼─────────────────────┤
│ • Hero Timelines  │ • React Layout Transitions    │ • Global Smooth     │
│ • Pinned Scenes   │ • Slide-over Drawers (Cart)   │   Scrolling         │
│ • Parallax Math   │ • Modals & Dialogs            │ • Scroll Velocity   │
│ • Text Masking    │ • Component Presence / Exits  │   Hooks             │
│ • Horizontal Flow │ • Button & Icon Micro-actions │ • Scroll Ticker     │
│ • Atelier Reveals │ • Shared Element Morphing     │   Sync with GSAP    │
└───────────────────┴───────────────────────────────┴─────────────────────┘
```

> **Core Motion Principle:** GSAP controls the cinematic scroll timeline. Framer Motion controls component interface state. Lenis governs smooth scroll physics.

### 3.2 Four-Tier Motion Hierarchy

```text
LEVEL 01 — MICRO (180ms – 350ms)
Used for: Buttons, icon states, magnetic attraction, wishlist triggers, cursor transformations.
Easing: var(--ease-luxury)

LEVEL 02 — COMPONENT (400ms – 700ms)
Used for: Cart concierge drawer, mega-menu unfolds, product card hover crossfades, filter accordion drops.
Easing: var(--ease-editorial)

LEVEL 03 — PAGE & ROUTE (600ms – 1000ms)
Used for: Route transitions, shared-element image-to-PDP hero expansions, collection grid reveals.
Easing: var(--ease-editorial)

LEVEL 04 — CINEMATIC (1000ms – 3000ms+)
Used for: Campaign hero reveals, Digital Atelier craft walkthrough, Horizontal Runway scenes, Runway Mode transitions.
Easing: var(--ease-cinematic)
```

### 3.3 Animation Directory Structure
```text
src/animations/
├── core/
│   ├── gsap.ts               # GSAP registry, ScrollTrigger defaults, Lenis ticker sync
│   ├── lenis.ts              # Lenis smooth scroll provider and velocity store
│   ├── easings.ts            # Canonical cubic-bezier easing definitions
│   └── motion-config.ts      # Global motion tokens & prefers-reduced-motion hooks
│
├── page/
│   ├── pageReveal.ts         # Page entrance curtain reveals & mask splits
│   ├── pageExit.ts           # Smooth route departure timeline
│   └── sharedTransition.ts   # Shared-element image scaling between views
│
├── hero/
│   ├── campaignHero.ts       # Hero choreography (video expand, title unfold, CTA rise)
│   └── editorialHero.ts      # Large editorial headline and portrait parallax
│
├── scroll/
│   ├── parallax.ts           # Multi-speed image & container parallax calculations
│   ├── horizontalScroll.ts   # GSAP ScrollTrigger pinned horizontal container
│   ├── textReveal.ts         # Line-by-line and character masked clip reveals
│   └── imageReveal.ts        # Luxury curtain and scale reveals
│
├── product/
│   ├── productHover.ts       # Card hover image crossfade & price elevation
│   ├── fabricZoom.ts         # Macro fabric pan & slow scale
│   └── rotation360.ts        # Drag-to-rotate sequence calculations
│
└── lookbook/
    ├── hotspotPulse.ts       # Ambient breathing hotspot marker
    └── runwayMode.ts         # Viewport-filling fashion show carousel
```

---

## 4. THE DIGITAL ATELIER EXPERIENCE

The Digital Atelier is a flagship storytelling module that builds craftsmanship credibility by walking customers through the lifecycle of a Finaluchi garment.

```text
FABRIC SOURCING ➔ INITIAL SKETCH ➔ PATTERN DRAFTING ➔ PRECISION CUTTING ➔ MASTER TAILORING ➔ HAND FINISHING ➔ FINALUCHI COUTURE
```

```text
┌───────────────────────────────────────────────────────────────────────────┐
│ [PINNED VIEWPORT STAGE]                                                   │
│                                                                           │
│   STAGE 03 / 06 — PATTERN DRAFTING                                        │
│                                                                           │
│   ┌───────────────────────────────┐   "Every curve is drafted by hand on  │
│   │                               │    heavy archival card, sculpted to   │
│   │     CINEMATIC VIDEO LOOP      │    contour the natural architecture   │
│   │     OF MASTER TAILOR AT WORK  │    of the female form."               │
│   │                               │                                       │
│   └───────────────────────────────┘   Key Details:                        │
│                                       • 48 Custom Measurements            │
│   [Scroll to advance stage ➔]         • Zero-Waste Precision Seams        │
│                                       • Hand-Chalked Proportions          │
└───────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Digital Atelier Architecture
* **Scroll-Triggered Stage Synchronization:** As the user scrolls vertically, GSAP pins the section and drives a step indicator (`01/06` through `06/06`), cross-fading high-resolution macro imagery and video loops.
* **Macro Texture Inspection:** Users can click to inspect fabric grain up to 400% zoom.
* **Master Tailor Audio Notes (Opt-In):** Discreet, ambient audio button allowing clients to listen to a 30-second atelier commentary from the master pattern maker. (Strictly non-autoplay; requires explicit user click).

---

## 5. RUNWAY EXPERIENCE & 360° GARMENT MOVEMENT

### 5.1 Horizontal "Runway" Collection Sweeps
Embedded seamlessly within editorial pages:
* As the user scrolls vertically into the Runway section, vertical scrolling pins the container and translates horizontally through complete looks (`LOOK 01` to `LOOK 08`).
* Smooth velocity inertia driven by Lenis + GSAP ScrollTrigger.
* Each look showcases full-length styling, model motion preview, and direct discoverability.

### 5.2 Interactive "Runway Mode"
On selected collections (*e.g. Haute Soirée*), clients can click **ENTER RUNWAY**:
* The digital flagship transitions into a dark, distraction-free, full-viewport fashion show interface.
* **Navigation:** Scroll, horizontal drag, or keyboard arrow keys (`←`, `→`, `ESC` to exit).
* **Look Card:**
  ```text
  LOOK 04 OF 12
  
  HAUTE SOIRÉE — SCULPTURAL SILK GOWN
  ₦380,000  (approx. $420 USD / £330 GBP)
  
  [EXPLORE THIS PIECE]   [QUICK ADD TO BAG]
  ```
* Seamlessly bridges haute couture catwalk presentation with direct commerce.

### 5.3 360° Product Movement Engine
For hero flagship pieces:
* **Interactive Drag-to-Rotate:** Client drags horizontally across the image to rotate the garment across 24 or 36 high-resolution frames.
* **Hardware Accelerated:** Canvas-rendered image sequence with on-demand preloading and memory management.
* **Video Motion Loop Toggle:** Direct switch to high-speed 60fps movement loop showcasing fabric sway during motion.

---

## 6. FABRIC & SILHOUETTE INTELLIGENCE

Because luxury fashion clients cannot physically touch the garments online, Finaluchi provides a dedicated Garment Intelligence System.

### 6.1 Fabric Intelligence Matrix
On the Product Detail Page (PDP), clients can expand **EXPLORE THE FABRIC**:
* **High-Definition Macro Zoom:** View weaving density, sheen, and texture.
* **Sensory Profile:**
  * **Material:** 100% Mulberry Silk Satin / Hand-Spun Wool Crepe.
  * **Weight:** 220 GSM (Substantial Fluid Weight).
  * **Drape:** Liquid fluid contour.
  * **Finish:** Luminous soft-pearl luster.
  * **Care:** Specialist Dry Clean Only.
* **"See How It Moves" Clip:** 4-second looping clip showing the drape react to walking motion.

### 6.2 The Silhouette Behavior Matrix
A visual scale illustrating garment fit and structure:

```text
THE SILHOUETTE

FIT
Fitted ────────●──────────────── Relaxed

DRAPE
Crisp / Structured ──────────────●── Fluid / Flowing

WEIGHT
Featherweight ────────●──────────── Heavyweight

STRUCTURE
Soft Unstructured ──────●──────────── Architectural
```

### 6.3 Master Couture Cloth Color System
To eliminate generic color names (*e.g., "Green" or "Brown"*) and inaccurate screen rendering, Finaluchi defines an authoritative, laboratory-calibrated Couture Cloth Palette mapped to international Pantone Fashion, Home + Interiors (TCX) standards:

| Code | Couture Shade Name | Hex Code | HSL Value | Pantone TCX | Fabric Substrate | Luster / Texture Behavior | Cultural & Occasion Resonance |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CL-01** | **Noir Onyx** | `#0D0D0D` | `0°, 0%, 5%` | `19-4008 TCX` | Mulberry Silk Satin / Wool Crepe | Light-absorbent deep matte to obsidian sheen | Gala, Black Tie, Power Tailoring |
| **CL-02** | **Alabaster Ivory** | `#F8F6F0` | `45°, 38%, 96%` | `11-0601 TCX` | Silk Dupioni / Organic Raw Silk | Soft pearl diffusion with subtle slub grain | Bridal, Solstice Gala, Day Luxury |
| **CL-03** | **Pearl Oyster** | `#E4DEC8` | `43°, 33%, 84%` | `13-0905 TCX` | Luminous Silk Charmeuse | Fluid high-specular reflective drape | Evening Soirée, Cocktail, Resort |
| **CL-04** | **Dune Crepe** | `#D2C4B2` | `34°, 28%, 76%` | `14-1108 TCX` | Hand-Spun Wool Crepe | Fine dry-grain pebbled matte texture | Power Dressing, Sculptural Two-Piece |
| **CL-05** | **Cocoa Umber** | `#3E2723` | `10°, 28%, 19%` | `19-1218 TCX` | Structured Wool / Silk Twill | Rich, velvet-toned deep earth warmth | Winter Couture, Evening Separates |
| **CL-06** | **Benin Malachite** | `#0A3D2E` | `163°, 71%, 14%` | `19-5411 TCX` | Heavyweight Silk Satin / Velvet | Opulent royal jewel green with emerald sheen | Red Carpet, State Dinners, Masterpieces |
| **CL-07** | **Yoruba Indigo** | `#1B2A4A` | `220°, 46%, 20%` | `19-3938 TCX` | Traditional Vat-Dyed Silk | Deep midnight indigo with ceremonial heritage | High Ceremonial, Gala, Evening Gowns |
| **CL-08** | **Nile Lapis** | `#1A365D` | `215°, 56%, 23%` | `19-4033 TCX` | Crisp Silk Organza / Taffeta | Electric mineral blue with sculptural tension | Statement Pieces, Runway Outerwear |
| **CL-09** | **Ashanti Saffron** | `#C68B19` | `39°, 78%, 44%` | `15-0955 TCX` | Hand-Woven Silk Brocade | Gilded warm saffron with gold micro-reflection | Royal Celebrations, Milestone Jubilees |
| **CL-10** | **Sahara Terracotta** | `#A84B29` | `16°, 61%, 41%` | `18-1440 TCX` | Raw Wild Silk / Linen Blend | Earthy rust with tactile warmth and grain | Resort Solstice, Sunset Cocktail |
| **CL-11** | **Amethyst Plum** | `#4A154B` | `299°, 57%, 19%` | `19-2520 TCX` | Plush Silk-Rayon Velvet | Dramatic dual-tone refraction under direct light | After Dark, Dramatic Dinner Dresses |
| **CL-12** | **Champagne Gold** | `#C8B294` | `34°, 33%, 68%` | `14-1118 TCX` | Metallic Spun Silk Lamé | Subtle champagne shimmer without aggressive glitter | Private Client Soirée, Anniversary |
| **CL-13** | **Liquid Bronze** | `#8C6239` | `29°, 42%, 39%` | `18-0935 TCX` | Liquid Silk Taffeta | Metallic liquid bronze with fluid shadow folds | Architectural Gowns, Autumn Drops |
| **CL-14** | **Burnished Copper** | `#B86B43` | `20°, 46%, 49%` | `17-1436 TCX` | Spun Copper Silk Chiffon | Fiery warm metallic luster | Resort Solstice, High-Summer Gala |
| **CL-15** | **Platinum Silk** | `#DCDFE4` | `218°, 12%, 88%` | `13-4105 TCX` | Cool Lustrous Silk Satin | Mirror-fluid platinum with silver undertones | Minimalist Haute Couture, Modern Bridal |
| **CL-16** | **Baobab Bark** | `#5A4D41` | `29°, 16%, 30%` | `19-0822 TCX` | Heavyweight Belgian/African Linen | Raw, organic fibrous weave with natural slub | Atelier Separates, Summer Kimonos |
| **CL-17** | **Sage Palm** | `#78866B` | `90°, 11%, 47%` | `16-0421 TCX` | Silk Georgette / Habotai | Translucent muted sage with soft drape | Garden Weddings, Solstice Edits |
| **CL-18** | **Sunstone Amber** | `#D97724` | `28°, 73%, 50%` | `16-1349 TCX` | Hammered Silk Satin | Radiant sunset amber with undulating highlights | Statement Skirts, Festival Soirée |
| **CL-19** | **Dusk Carmine** | `#722F37` | `353°, 42%, 32%` | `19-1725 TCX` | Double-Faced Silk Wool | Deep blood-wine red with architectural drape | Winter Gala, Opera, Formal Dinners |

---

### 6.4 Interactive Swatch Architecture & Component Specifications

```text
┌───────────────────────────────────────────────────────────────────────────┐
│ PDP COLOR SELECTION COMPONENT                                             │
├───────────────────────────────────────────────────────────────────────────┤
│ COLOUR: 06 — BENIN MALACHITE SILK                         [MADE TO ORDER] │
│                                                                           │
│   ┌────┐   ┌───────┐   ┌────┐   ┌────┐   ┌────┐   ┌────┐   ┌────┐         │
│   │    │   │ ┌───┐ │   │    │   │    │   │ /  │   │ ◧  │   │ ●  │         │
│   │ 01 │   │ │06 │ │   │ 07 │   │ 08 │   │/ 10│   │ 12 │   │ 19 │         │
│   │    │   │ └───┘ │   │    │   │    │   │/   │   │    │   │    │         │
│   └────┘   └───────┘   └────┘   └────┘   └────┘   └────┘   └────┘         │
│    Noir      Active    Yoruba    Nile    Sold Out Dual-Tone Made to       │
│    Onyx     Malachite  Indigo   Lapis   Terracotta Gold/Silk Order        │
│            (Halo Ring)                  (Slash)   (Bicolor) (Atelier Dot) │
└───────────────────────────────────────────────────────────────────────────┘
```

#### Swatch States & Design Constraints:
1. **Dimensions:** Desktop: `32px × 32px`, Mobile: `28px × 28px`, Gap: `10px`, Corner Radius: `4px` (subtle luxury squircle, avoiding generic circles).
2. **Active Selection (Halo Ring):** Active swatch displays a `2px` white/canvas space gap enclosed by a `1.5px` solid `--color-champagne` (noir `#0D0D0D`) outer boundary ring.
3. **Hover Micro-Interaction:** Scale `1.08` with `var(--duration-fast)` (`350ms`) using `var(--ease-luxury)`. Tooltip displays color code, shade title, and fabric name (`e.g., "06 — Benin Malachite Silk"`).
4. **Out of Stock / Sold Out:** Displays a diagonal `1px` subtle hairline strike-through (`--swatch-disabled-slash`) across the swatch face with `opacity: 0.4` and inactive pointer events.
5. **Made-to-Order Indicator:** Features a discreet `3px` noir atelier dot (`--color-status-atelier`) at top-right corner.
6. **Dual-Tone / Patterned Swatches:** Diagonal split gradient (`linear-gradient(135deg, var(--cloth-ashanti-saffron) 50%, var(--cloth-noir-onyx) 50%)`) for two-tone colorways, or high-definition micro-texture background for woven jacquard pieces.

---

### 6.5 Dynamic Colorway State Machine & Gallery Synchronization

Selecting a cloth color swatch updates the entire Product Detail Page instantaneously without full page reload:

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant Swatch as Color Swatch Component
    participant Store as Variant State Store (Zustand)
    participant Gallery as PDP Hero Gallery / Carousel
    participant Engine360 as 360° Movement Canvas
    participant URL as Browser History API

    Client->>Swatch: Click "06 — Benin Malachite"
    Swatch->>Store: setActiveColorway(CL-06)
    par Smooth Image Crossfade
        Store->>Gallery: Transition Hero Image to Malachite Set (250ms ease)
    and Swap 360° Image Sequence
        Store->>Engine360: Preload & Swap 36-frame Malachite rotation assets
    and Update Meta Information
        Store->>Swatch: Update Title to "06 — BENIN MALACHITE [MADE TO ORDER]"
    and Push URL State
        Store->>URL: Update query param (?color=benin-malachite) without reload
    end
```

---

### 6.6 Digital Color Calibration & Accuracy Standards

To eliminate customer returns caused by color discrepancy between screen rendering and physical couture garments:

1. **Color Space Standard:** All garment assets are mastered in **Wide Color Gamut (Display P3)** for rich saturation on OLED / Apple Retina displays, with automated fallbacks to calibrated **sRGB IEC61966-2.1** for legacy devices.
2. **Delta-E (ΔE\*00) Quality Threshold:** Studio garment photography and video must achieve `ΔE*00 < 2.0` under standardized CIE D65 (5000K daylight equivalent) studio lighting against physical fabric swatch references.
3. **Contrast & Accessibility (WCAG 2.2 AA):** All dynamic color swatch chips feature an embedded `0.5px` inner border (`rgba(0,0,0,0.08)` for light swatches and `rgba(255,255,255,0.12)` for dark swatches) to ensure strict edge contrast against light (`--color-alabaster`) and dark (`--color-noir`) background canvases.

---

## 7. MERCHANDISING EDITS & OCCASION DISCOVERY

### 7.1 "The Finaluchi Edit" System
Moving beyond generic categories (*e.g. "Dresses"*), products are merchandised into curated cultural moments:
* **THE EVENING EDIT:** Dramatic dinner dresses and evening gowns.
* **THE WEDDING GUEST EDIT:** Refined, celebration-ready couture.
* **AFTER DARK:** Luminous silks, sculptural necklines, and opulent black.
* **POWER DRESSING:** Structured two-piece and three-piece tailoring suites.
* **THE RESORT EDIT:** High-summer solstice, playsuits, and silk kimonos.
* **THE STATEMENT PIECE:** Architectural, limited-run centerpiece garments.

### 7.2 Occasion-Based Discovery Engine
A curated interactive guide where clients select their upcoming event:

```text
WHAT ARE YOU DRESSING FOR?

[ Wedding ]   [ Gala / Black Tie ]   [ Private Dinner ]
[ Vacation ]  [ Cocktail / Soirée ]  [ Red Carpet ]
```

* **Deterministic Filtering:** Instantly filters catalog according to formality, silhouette, and season without requiring complex AI.
* **Curated Recommendation:** Returns a focused 4–8 look capsule tailored specifically to the occasion dress code.

### 7.3 "Complete the Look" (Stylist Edit)
Rather than algorithmic "You may also like" grids, PDPs feature curated stylist ensembles:

```text
COMPLETE THE LOOK
Curated by the Finaluchi Styling Team

┌─────────────────────────┐  +  ┌─────────────────────────┐  +  ┌─────────────────────────┐
│ SIGNATURE SILK DRESS    │     │ COUTURE SILK CLUTCH     │     │ SCULPTURAL GOLD EARRINGS│
│ ₦320,000                │     │ ₦95,000                 │     │ ₦65,000                 │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘

Complete Edit: ₦480,000
[ADD ENTIRE LOOK TO BAG]
```

---

## 8. PRODUCT PROVENANCE & AUTHENTICITY

### 8.1 Limited Atelier Editions
To maintain exclusivity without crude countdown timers:
* Products are designated as **ATELIER EDITION — 08 / 25** or **LIMITED RUN OF 30 PIECES**.
* Displays exact production run and number remaining in the current atelier batch.

### 8.2 Smart Availability Taxonomy
```text
AVAILABLE          : In stock, dispatches in 1–3 business days.
MADE TO ORDER      : Constructed upon order, dispatches in 10–14 business days.
ATELIER EDITION    : Strictly limited batch with individual serial numbers.
PRE-ORDER          : Advance reservation for upcoming seasonal collection.
PRIVATE ACCESS     : Exclusive to VIP & Private Clients via secure token.
ARCHIVED           : Historic piece available solely upon bespoke inquiry.
```

### 8.3 Digital Certificate of Authenticity
Each flagship couture garment comes with a verified digital certificate stored in the customer's portal and accessible via a physical NFC/QR garment tag:

```text
┌───────────────────────────────────────────────────────────┐
│                   FINALUCHI COUTURE                       │
│              CERTIFICATE OF AUTHENTICITY                  │
│                                                           │
│  Piece:          Haute Soirée Sculptural Dress            │
│  Collection:     Autumn / Winter 2026                     │
│  Production:     Lagos Atelier                            │
│  Serial:         FC-HS-2026-000142                        │
│  Master Tailor:  Atelier Lead Signature                   │
│  Owner:          Amara Okafor                             │
│  Registered:     September 18, 2026                       │
└───────────────────────────────────────────────────────────┘
```

---

## 9. PRIVATE CLIENTELING & CONCIERGE CRM

### 9.1 Private Client Tier
For high-value patrons:
* **Dedicated Personal Stylist:** Direct WhatsApp and video consultation link.
* **Saved Bespoke Measurement Profile:** Detailed body measurements maintained with field-level encryption for one-click Made-to-Measure ordering.
* **Private Archive Access:** Token-protected URLs for previewing unreleased drops.
* **Priority Atelier Queue:** Expedited production times for bespoke orders.

### 9.2 Private Appointment Booking Engine
Integrated consultation calendar:
* **Services:** Private Atelier Fitting, Bridal Consultation, Event Styling, Made-to-Measure Measurement Session.
* **Locations:** Lagos Flagship Atelier, In-Home White-Glove Fitting, or Virtual Video Styling.
* **Intake:** Captures event date, style preferences, and size requirements.

### 9.3 Admin Clienteling CRM
The admin hub includes a full client relationship management suite:

```text
┌───────────────────────────────────────────────────────────────────────────┐
│ CLIENT PROFILE: AMARA OKAFOR                        TIER: PRIVATE CLIENT  │
├───────────────────────────────────────────────────────────────────────────┤
│ Customer Since: 2026          Total Orders: 9         LTV: ₦3,450,000     │
│ Preferred Size: Medium / Made-to-Measure              Preferred Cat: Gowns│
│                                                                           │
│ SAVED MEASUREMENTS (VERIFIED):                                            │
│ Bust: 92cm | Waist: 70cm | Hip: 100cm | Height: 178cm | Shoulder: 41cm   │
│ [Verified by Master Tailor Adebayo on 2026-08-14]                         │
│                                                                           │
│ STYLIST NOTES:                                                            │
│ • Attending Lagos Charity Gala in November; prefers emerald and gold.      │
│ • Favors sculptural necklines with fluid silk skirts.                     │
│ • Requires Signature Keepsake Box packaging for all deliveries.           │
│                                                                           │
│ RECENT ACTIVITY:                                                          │
│ • Viewed Haute Soirée Collection (3 times today)                          │
│ • Added Sculptural Silk Gown to "Gala 2026" Edit                          │
│                                                                           │
│ [SEND PRIVATE SHOPPING LINK]    [MESSAGE ON WHATSAPP]   [LOG STYLIST NOTE]│
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 10. POST-PURCHASE ATELIER JOURNEY

The luxury relationship deepens *after* purchase. Instead of standard tracking numbers, clients follow their garment's creation inside the atelier:

```text
ORDER #FC-94820 — HAUTE SOIRÉE SCULPTURAL GOWN

[1] ORDER CONFIRMED         ✓ September 18, 10:20
[2] MEASUREMENTS VERIFIED    ✓ September 18, 14:00
[3] PATTERN DRAFTING         ✓ September 19, 09:30
[4] CUTTING & SEWING         ● IN PROGRESS (Atelier Bench 03)
[5] QA & HAND FINISHING      ○ Scheduled Sep 23
[6] SIGNATURE PACKAGING      ○ Scheduled Sep 24
[7] WHITE-GLOVE DISPATCH     ○ Estimated Sep 25
```

Each stage includes a high-definition photograph from the workshop and an atelier progress report.

---

## 11. DIGITAL WARDROBE & ADVANCED "MY EDIT"

### 11.1 "My Finaluchi Wardrobe"
For authenticated clients:
* **Wardrobe Tracker:** Visual gallery of all previously purchased pieces.
* **Interactive Look Builder:** Combine owned pieces (*e.g. Atelier Pants*) with current collection items (*e.g. Silk Kimono*).
* **"Shop the Missing Piece":** The interface highlights complementary items that complete an outfit with owned garments.

### 11.2 Advanced "My Edit" Wishlist
Clients can organize saved pieces into named luxury capsules:
* *Edit 01: "Venice Biennale 2026"*
* *Edit 02: "Lagos Evening Soirée"*
* **Shareable Edit:** Generates a private, editorial-styled share link for friends or stylists.

---

## 12. BESPOKE GIFT CONCIERGE

```text
┌───────────────────────────────────────────────────────────────────────────┐
│                     GIFT CONCIERGE                        │
├───────────────────────────────────────────────────────────────────────────┤
│ 1. Select Occasion:                                       │
│    (•) Birthday   ( ) Anniversary   ( ) Wedding   ( ) Gala│
│                                                           │
│ 2. Handwritten Calligraphy Message:                       │
│    [ To Amara, with deepest love and celebration. — T. ]  │
│                                                           │
│ 3. Packaging Selection:                                   │
│    (•) Signature Couture Keepsake Box with Champagne Foil │
│    ( ) Eco-Luxury Breathable Garment Carrier              │
│                                                           │
│ 4. Recipient White-Glove Notification:                    │
│    (•) Do not reveal price or receipt                     │
│    ( ) Schedule specific delivery date & time             │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 13. REFINED SOCIAL PROOF & EDITORIAL ACCENTS

To protect high-fashion brand prestige, Finaluchi completely rejects tacky yellow 5-star badges and noisy user comment widgets.

### 13.1 Client Notes
Replaced with dignified, curated quotes from verified clients:
```text
"The drape of the silk satin is peerless. Tailored with absolute precision."
— Verified Finaluchi Private Client, Lagos
```

### 13.2 Discreet Save Metrics
Subtle, high-fashion metric:
```text
SAVED BY 24 PATRONS TO THEIR PRIVATE EDITS
```

### 13.3 Magnetic Interactions & Stylized Typography
* **Magnetic CTAs & Links (`@skiper-ui/skiper40`):** Primary buttons and editorial text links feature subtle magnetic attraction (4–8px pull) and stylized CSS/Framer Motion kinetic underline choreography on hover (`npx shadcn add @skiper-ui/skiper40`).
* **Opt-In Luxury Audio:** Soft, tactile clicks for Runway Mode and Atelier transitions. **Strictly non-autoplay; disabled by default.**

---

## 14. INFORMATION ARCHITECTURE & NAVIGATION

### 14.1 Editorial Four-Pillar World
```mermaid
graph TD
    House["FINALUCHI COUTURE"] --> W1["HAUTE SOIRÉE"]
    House --> W2["THE TAILORING SUITE"]
    House --> W3["ATELIER SEPARATES"]
    House --> W4["RESORT & SOLSTICE"]

    W1 --> W1_1["Dinner Dresses"]
    W1 --> W1_2["Gowns"]
    W1 --> W1_3["Jumpsuits"]

    W2 --> W2_1["2-Piece Suites"]
    W2 --> W2_2["3-Piece Suites"]
    W2 --> W2_3["Sculptural Jackets"]
    W2 --> W2_4["Wide-Leg Pants"]

    W3 --> W3_1["Silk Tops"]
    W3 --> W3_2["Tailored Shirts"]
    W3 --> W3_3["Statement Skirts"]
    W3 --> W3_4["Atelier Kimonos"]

    W4 --> W4_1["Playsuits"]
    W4 --> W4_2["Luxury Swim & Bikini"]
```

### 14.2 Desktop Mega-Menu
```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ HAUTE SOIRÉE         THE TAILORING SUITE    ATELIER SEPARATES    RESORT & SOLSTICE    │
│ Dinner Dresses       2-Piece Suites         Silk Tops            Playsuits             │
│ Evening Gowns        3-Piece Suites         Tailored Shirts      Luxury Swim / Bikini  │
│ Jumpsuits            Sculptural Jackets     Statement Skirts     Silk Kaftans          │
│                      Wide-Leg Pants         Atelier Kimonos                            │
│                                                                                        │
│ THE EDITS            EXPERIENCES                                 FEATURED CAMPAIGN     │
│ The Evening Edit     Digital Atelier                             [HIGH RES EDITORIAL]  │
│ The Wedding Guest    Runway Mode                                 Autumn / Winter 2026  │
│ After Dark           Bespoke Appointment                         Haute Soirée Capsule  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 15. PAYMENT ARCHITECTURE & CHECKOUT ENGINE (PAYSTACK EXCLUSIVE)

### 15.1 Core Gateway & Financial Foundation
Finaluchi operates exclusively on **Paystack** as its sole payment gateway. All authoritative financial accounting is calculated, stored, and verified in **Nigerian Naira (NGN)** using integer minor units (**kobo**, where `1 NGN = 100 kobo`).

* **Sole Gateway:** PAYSTACK ONLY.
* **Primary Transactional Currency:** NGN.
* **Authoritative Financial Minor Units:** All monetary columns in the database and API payloads are strictly suffixed with `_kobo` (e.g. `price_kobo`, `subtotal_kobo`, `shipping_kobo`, `tax_kobo`, `discount_kobo`, `total_kobo`, `refund_kobo`). No "cents" terminology exists anywhere in the architecture.
* **Accepted Paystack Channels:** Debit/Credit Cards (Mastercard, Visa, Verve, AMEX), Direct Bank Transfers (Automated NIP Virtual Accounts), USSD, and Apple Pay (via Paystack).

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       EFFORTLESS GUEST-FIRST CHECKOUT FLOW                                       │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  BAG DRAWER  ➔  GUEST CHECKOUT  ➔  CONTACT & REGION  ➔  COUNTRY-AWARE ADDRESS  ➔  SHIPPING METHOD  ➔  PAYSTACK   │
│   (Concierge)     (No Account Req)    (Email + Phone)       (Nigeria / Intl)         (Calculated)       (Inline/Host)│
│                                                                                                                  │
│  CONFIRMATION  ➔  SECURE GUEST ATELIER TRACKER  ➔  OPTIONAL POST-PURCHASE ACCOUNT CLAIM                          │
│  (Cryptographic)      (Hashed Token URL)               (1-Click Pre-filled Profile)                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 15.2 Display Currency vs. Transaction Currency
To accommodate diaspora and international patrons while preserving absolute transactional integrity:

1. **Display Currency (Indicative):** Patrons may toggle client-side currency estimators (USD, GBP, EUR, CAD, AED). Converted prices are rendered with an explicit luxury indicator (*e.g., "₦450,000 (approx. $495 USD)"*).
2. **Transaction Currency (Authoritative):** The final payment transaction is **strictly processed and billed in NGN via Paystack**.
3. **Immutability Guarantee:** Client-side display currency selections are **never transmitted to the order pricing engine**. The server recalculates and enforces the exact NGN kobo total authoritatively from database records.

---

### 15.3 Triple Decoupled State Machines
Payment, Order, and Fulfillment lifecycles are strictly decoupled. A single overloaded status column is prohibited.

```mermaid
stateDiagram-v2
    [*] --> PAYMENT_PENDING
    PAYMENT_PENDING --> PAYMENT_INITIALIZED : Paystack Tx Created
    PAYMENT_INITIALIZED --> PAYMENT_PROCESSING : Customer Submits Details
    PAYMENT_PROCESSING --> PAYMENT_SUCCESSFUL : S2S Verified / Webhook
    PAYMENT_PROCESSING --> PAYMENT_FAILED : Gateway Decline
    PAYMENT_INITIALIZED --> PAYMENT_ABANDONED : Session Timeout (30m)
    PAYMENT_PENDING --> PAYMENT_EXPIRED : Reservation Expiry (15m)
    PAYMENT_SUCCESSFUL --> PAYMENT_REFUNDED : Full Admin Refund
    PAYMENT_SUCCESSFUL --> PAYMENT_PARTIALLY_REFUNDED : Partial Refund
```

```mermaid
stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> PENDING_PAYMENT : Checkout Initialized
    PENDING_PAYMENT --> CONFIRMED : Payment Successful
    PENDING_PAYMENT --> CANCELLED : Payment Expired / Aborted
    CONFIRMED --> IN_PRODUCTION : Atelier Assigned
    IN_PRODUCTION --> READY_FOR_DISPATCH : QA Passed
    READY_FOR_DISPATCH --> DISPATCHED : Courier Handover
    DISPATCHED --> DELIVERED : Customer Receipt Confirmed
    DELIVERED --> COMPLETED : Return Window Elapsed (14d)
    CONFIRMED --> CANCELLED : Pre-production Cancellation
```

```mermaid
stateDiagram-v2
    [*] --> UNFULFILLED
    UNFULFILLED --> ALLOCATED : Stock Locked
    ALLOCATED --> IN_ATELIER_PRODUCTION : Made-to-Measure / Limited
    IN_ATELIER_PRODUCTION --> QUALITY_INSPECTION : Bench QA
    QUALITY_INSPECTION --> PACKAGED : Signature Keepsake Box
    PACKAGED --> DISPATCHED : Waybill Issued
    DISPATCHED --> DELIVERED : POD Received
    DELIVERED --> RETURNED : Approved Return
```

#### Allowed State Transitions:

| Lifecycle | Allowed States | Transition Rules |
| :--- | :--- | :--- |
| **paymentStatus** | `PAYMENT_PENDING`, `PAYMENT_INITIALIZED`, `PAYMENT_PROCESSING`, `PAYMENT_SUCCESSFUL`, `PAYMENT_FAILED`, `PAYMENT_ABANDONED`, `PAYMENT_EXPIRED`, `PAYMENT_REFUNDED`, `PAYMENT_PARTIALLY_REFUNDED` | Can only transition to `PAYMENT_SUCCESSFUL` via verified server-to-server Paystack API response or HMAC-verified webhook. Never via browser redirect. |
| **orderStatus** | `DRAFT`, `PENDING_PAYMENT`, `CONFIRMED`, `IN_PRODUCTION`, `READY_FOR_DISPATCH`, `DISPATCHED`, `DELIVERED`, `COMPLETED`, `CANCELLED` | Order moves to `CONFIRMED` only when `paymentStatus === PAYMENT_SUCCESSFUL`. |
| **fulfillmentStatus** | `UNFULFILLED`, `ALLOCATED`, `IN_ATELIER_PRODUCTION`, `QUALITY_INSPECTION`, `PACKAGED`, `DISPATCHED`, `DELIVERED`, `RETURNED` | Transitions driven by Atelier Production Desk and courier webhook/waybill events. |

---

### 15.4 Country-Aware Dynamic Address Architecture

The checkout interface dynamically adapts its form schema, required field rules, and nomenclature based on the selected delivery country without generic, confusing form fields:

#### A. Nigerian Delivery (Local & Diaspora in Nigeria)
* **Required Fields:** Full Name, Nigerian Phone (`+234...` / `080...` E.164 normalized), Email, State (36 States + FCT dropdown), City/Area (*Ikoyi, Victoria Island, Maitama, GRA Ikeja*), Delivery Address (Street name, house number, estate / landmark details).
* **Postal / ZIP Code Rule:** **Strictly NOT required.** The system never asks for or blocks Nigerian checkout on missing postal/ZIP codes.

#### B. International Delivery (Rest of the World)
* **Required Fields:** Full Name, Phone (E.164 with country dial code), Email, Destination Country (ISO 3166-1 alpha-2), State / Province / Region, Town / City, Street Address (Lines 1 & 2), Postal / ZIP Code.
* **Country-Aware Postal Rules:**
  * *United States:* 5-digit or 9-digit ZIP (`^\d{5}(-\d{4})?$`).
  * *United Kingdom:* Alphanumeric Postcode (`^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$`).
  * *Canada:* Alphanumeric Postal Code (`^[A-Z]\d[A-Z] \d[A-Z]\d$`).
  * *Countries without postal systems (e.g., UAE, Qatar):* Postal code field is automatically hidden or optional.
* **International Customs & Duties (DDU):** The checkout clearly displays: *"International shipments are dispatched Delivered Duty Unpaid (DDU). Import tariffs, local VAT, and customs clearance fees are the sole responsibility of the recipient."*

---

### 15.5 Paystack Reconciliation Engine & Idempotency
Relying solely on webhooks is architecturally flawed due to network drops, server cold starts, or carrier firewalls. Finaluchi implements a dual-path server-to-server reconciliation engine:

```text
Customer starts checkout
        ↓
Server creates order intent + reserves inventory
        ↓
Paystack transaction initialized (NGN minor units: total_kobo)
        ↓
Customer completes payment on Paystack interface
        ↓
Paystack redirects browser to /checkout/verify?reference=FC_REF_...
        ↓
Server executes synchronous Paystack S2S Verification (verify/FC_REF_...)
        ↓
[Concurrent] Paystack webhook received (charge.success) with HMAC-SHA512
        ↓
Idempotency Guard checks payment_reconciliations table by gateway_reference
        ↓
If already processed ➔ Return HTTP 200 immediately (No-op)
If first verified ➔ Acquire DB row-lock ➔ Update paymentStatus to PAYMENT_SUCCESSFUL
        ↓
Finalize inventory allocation (Convert Reservation)
        ↓
Trigger Resend Atelier Confirmation Email + Dispatch Webhooks
```

#### Scheduled Reconciliation Cron Worker:
A background worker (BullMQ) executes every 5 minutes:
1. Queries all orders in `PAYMENT_INITIALIZED` or `PAYMENT_PROCESSING` older than 15 minutes.
2. Calls Paystack API (`https://api.paystack.co/transaction/verify/:reference`) directly server-to-server.
3. If Paystack reports `status: "success"`, the worker executes the idempotent success transition.
4. If Paystack reports `status: "failed"` or the session is older than 60 minutes with no record, the worker transitions the payment to `PAYMENT_ABANDONED` / `PAYMENT_EXPIRED` and atomically releases the reserved inventory back to available stock.

---

### 15.6 Refunds & Returns Architecture
All customer returns and refunds follow a strict technical lifecycle governed by server-side authorization:

* **Refund Lifecycle:** `REQUESTED` → `APPROVED` → `PROCESSING` → `SUCCESSFUL` → `FAILED` → `CANCELLED`.
* **Server-Side Gateway API:** Dispatches requests to the Paystack Refund API (`POST https://api.paystack.co/refund`) with `transaction_reference`, `amount_kobo`, `merchant_note`, and `customer_note`.
* **Inventory Consequences:**
  * *Ready-to-Wear Pieces:* Upon physical receipt and Atelier QA inspection, stock is returned to `AVAILABLE` via an `inventory_transactions` record of type `RETURN`.
  * *Made-to-Measure & Bespoke Garments:* Archived to bespoke vault; inventory is not restocked to standard inventory.
* **Audit Trail:** Every refund requires `approvedBy` admin user ID and logs an entry in `audit_logs`.

---

## 16. INVENTORY RESERVATION, CONCURRENCY & LEDGER ENGINE

### 16.1 Inventory Lifecycle
To prevent overselling limited-edition runway pieces, serialized drops, and 1-of-1 couture garments during traffic spikes:

```text
AVAILABLE ➔ RESERVED (15m TTL) ➔ PAYMENT_PENDING ➔ PAID ➔ ALLOCATED ➔ FULFILLED
    │             │
    │             └─[Timeout / Payment Fail]─➔ RELEASED ➔ AVAILABLE
    └─[Damaged / Lost / Atelier Inspection]──➔ ADJUSTMENT / DAMAGE
```

### 16.2 Atomic Reservation Model & Concurrency Protection
1. **Atomic Check & Lock:** When a client initiates checkout, inventory is checked and reserved within a single PostgreSQL transaction using row-level locking:
   ```sql
   SELECT id, stock_quantity, reserved_quantity 
   FROM product_variants 
   WHERE id = $1 
   FOR UPDATE;
   ```
2. **Deterministic Constraint:** Database check constraint guarantees `stock_quantity >= reserved_quantity`.
3. **Reservation TTL:** Each reservation is created in `inventory_reservations` with `expires_at = NOW() + INTERVAL '15 minutes'`.
4. **Automatic Expiration Worker:** A BullMQ background worker runs continuously every 60 seconds, identifying expired reservations in status `ACTIVE`, resetting them to `EXPIRED`, decrementing `reserved_quantity`, and logging an `inventory_transactions` record of type `RESERVATION_RELEASE`.
5. **No Double Decrement:** Webhook retries and reconciliation checks verify whether a reservation is already `CONVERTED` before mutating stock.

### 16.3 Immutable Inventory Ledger (`inventory_transactions`)
Stock is never silently mutated. Every quantity change produces an immutable audit record:

```typescript
export const inventoryTransactionTypeEnum = pgEnum('inventory_transaction_type', [
  'INITIAL_STOCK',
  'RESERVATION',
  'RESERVATION_RELEASE',
  'SALE',
  'REFUND',
  'RETURN',
  'ADJUSTMENT',
  'DAMAGE',
  'LOST',
  'TRANSFER',
  'RESTOCK'
]);
```

### 16.4 Piece Serialization for Limited Editions
Every piece belonging to `ATELIER_EDITION` or `LIMITED_RUN` is assigned an immutable piece identifier (`FC-{COLLECTION}-{YEAR}-{PIECE_NUMBER}`, e.g. `FC-HS-2026-000142`) linked to its physical NFC chip and digital certificate of authenticity.

---

## 17. SECURITY HARDENING, GUEST ACCESS & SENSITIVE DATA PROTECTION

### 17.1 Guest Order Access Security & Non-Guessable Token Engine
1. **No Plaintext Tokens:** Plaintext guest access tokens are generated cryptographically (256-bit high-entropy string `fc_gst_...`) and transmitted once to the customer.
2. **Database Storage:** The database stores only the **SHA-256 / HMAC hash** of the token (`token_hash`).
3. **Constant-Time Verification:** Incoming tracker requests hash the provided token and compare it with the stored hash using `crypto.timingSafeEqual()` to eliminate timing attacks.
4. **Access Protection:** Guest tracker URLs are configured with `X-Robots-Tag: noindex, nofollow`, strict Referrer-Policy (`strict-origin-when-cross-origin`), and contain zero third-party tracking scripts.
5. **Rate Limiting:** IP-based and token-based rate limiting (10 requests/minute) prevents brute-force enumeration.

### 17.2 High-Risk Action Step-Up Re-Authentication
For high-risk operations initiated via a guest order session:
* Downloading formal VAT tax invoices with sensitive billing details.
* Accessing bespoke body measurement profiles.
* Requesting delivery destination changes.
* Downloading cryptographic ownership certificates.

The platform requires a **One-Time Password (OTP)** dispatched to the verified order email address (valid for 10 minutes, maximum 5 attempts, exponential lockout).

### 17.3 Data Protection & Encrypted Bespoke Measurement Architecture
Body measurements, tailor notes, and private client preferences are treated as sensitive personal data (NDPR / GDPR compliant).

```text
┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────────────┐
│ measurement_definitions │ 1───N │   measurement_values    │ N───1 │  measurement_profiles   │
├─────────────────────────┤       ├─────────────────────────┤       ├─────────────────────────┤
│ id (UUID)               │       │ id (UUID)               │       │ id (UUID)               │
│ code (e.g. "BUST_CM")   │       │ profile_id (FK)         │       │ user_id (FK / UUID)     │
│ name ("Bust Girth")     │       │ definition_id (FK)      │       │ profile_name            │
│ category ("ANATOMICAL") │       │ encrypted_value (BYTEA) │       │ client_tier             │
│ unit ("CM")             │       │ verified_by (UUID)      │       │ is_active (BOOLEAN)     │
└─────────────────────────┘       └─────────────────────────┘       └─────────────────────────┘
```

1. **Field-Level Encryption at Rest:** Measurement values are encrypted using **AES-256-GCM** before database write, utilizing a dedicated server encryption key (`MEASUREMENT_ENCRYPTION_KEY`) rotated via key versioning headers.
2. **Strict RBAC Access:** Decryption is restricted exclusively to authorized `SUPER_ADMIN`, `ATELIER_MANAGER`, and assigned `STYLIST` roles.
3. **Audit Logged Decryption:** Every measurement decryption event is recorded in `audit_logs` with actor ID, timestamp, and purpose.
4. **Right to Erasure (Anonymization):** Upon customer data deletion request:
   * Anatomical measurements, stylist notes, and identity profiles are permanently purged.
   * Statutory financial and tax records (order invoices, Paystack payment references, VAT totals) are retained in anonymized form (`customer_email: "anonymized_client_9482@redacted.finaluchi.com"`) to satisfy legal and accounting obligations.

### 17.4 Enterprise Security Architecture
* **Cookie Governance:** All session and auth cookies use `HttpOnly`, `Secure` (in production), and `SameSite=Lax` or `SameSite=Strict`.
* **Server-Side Authorization:** Frontend state is never trusted. Every Next.js Server Action and API route verifies RBAC permissions and session authenticity server-side.
* **Input Validation & Parameterization:** 100% of incoming payloads are validated via Zod schemas. Database queries execute exclusively through Drizzle ORM parameterized statements, preventing SQL injection.
* **File Upload Security:** Atelier workshop photos, client inspiration images, and measurement uploads undergo MIME-type validation, magic-byte inspection, file size restrictions (≤ 15MB), and virus/malware scanning before Cloudinary ingestion.
* **Security Headers:**
  ```text
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.paystack.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://res.cloudinary.com; frame-src https://checkout.paystack.com;
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  ```

---

## 18. ADMIN HUB & AUDIT LOGGING

### 18.1 Admin Operational Modules
1. **Clienteling CRM:** Search client records, inspect lifetime value (`lifetime_value_kobo`), review encrypted measurement profiles, and compose personalized shopping links.
2. **Atelier Production Desk:** Live progress tracker for Made-to-Measure garments, updating customer journey stages with workshop photos.
3. **Runway & Lookbook Hotspot Mapper:** Visual coordinator for pinning product buy-drawers directly to high-resolution campaign photography.
4. **Seasonal Campaign Scheduler:** Schedule homepage themes, video loops, countdown drop banners, and exclusive early-access windows.
5. **Certificate & Provenance Manager:** Automated issuing of serialized digital certificates of authenticity upon bespoke dispatch.
6. **Journal Editor:** Rich editorial publication creator with "Shop the Story" inline product taggers.
7. **Inventory & Ledger Desk:** Real-time stock audit, manual adjustments with mandatory audit reason codes, and reservation inspector.
8. **Payment & Reconciliation Monitor:** Live transaction log, gateway verification health, and manual reconciliation triggers.

### 18.2 First-Class Admin Audit Logging (`audit_logs`)
Every sensitive administrative action is written to `audit_logs`:

```typescript
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  actorUserId: uuid('actor_user_id').references(() => users.id),
  actorRole: text('actor_role').notNull(),
  action: text('action').notNull(), // e.g. "PRODUCT_PRICE_UPDATE", "MEASUREMENT_DECRYPT", "REFUND_PROCESSED"
  resourceType: text('resource_type').notNull(), // "product", "order", "measurement", "user"
  resourceId: text('resource_id').notNull(),
  beforeState: jsonb('before_state'),
  afterState: jsonb('after_state'),
  ipAddress: text('ip_address').notNull(),
  userAgent: text('user_agent').notNull(),
  requestId: text('request_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  actorIdx: index('audit_logs_actor_idx').on(table.actorUserId),
  resourceIdx: index('audit_logs_resource_idx').on(table.resourceType, table.resourceId),
  createdAtIdx: index('audit_logs_created_at_idx').on(table.createdAt),
}));
```

#### Automated Redaction Rules:
Before serializing `beforeState` or `afterState` into `audit_logs`, the audit logger strips:
* Passwords, hashes, OTP codes.
* Payment secrets, private keys, Paystack secret keys.
* Full guest access tokens and session IDs.
* Raw unencrypted anatomical measurement values (logged as `"[REDACTED_MEASUREMENT]"`).

---

## 19. PERFORMANCE BUDGET & MEDIA ENGINEERING

### 19.1 Formal Performance Budgets & Core Web Vitals
Because Finaluchi is an opulent, media-rich visual flagship, cinematic aesthetics must never compromise speed:

| Metric | Mobile (Fast 4G / Moto G equivalent) | Desktop (Broadband) | Enforcement Gate |
| :--- | :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | **≤ 2.2s** | **≤ 1.2s** | CI Lighthouse score ≥ 90 |
| **Interaction to Next Paint (INP)** | **≤ 150ms** | **≤ 80ms** | Chrome UX Report (CrUX) Pass |
| **Cumulative Layout Shift (CLS)** | **≤ 0.05** | **≤ 0.02** | Zero layout shifts during font swap |
| **First Contentful Paint (FCP)** | **≤ 1.4s** | **≤ 0.8s** | Critical CSS inlined |
| **Initial JS Bundle Size** | **≤ 120KB gzipped** | **≤ 180KB gzipped** | Bundle-analyzer failure threshold |

### 19.2 Motion Optimization & Accessibility
* **GPU Compositing:** All GSAP and Framer Motion animations animate exclusively `transform` and `opacity`. Zero animations trigger browser layout (`top`, `left`, `width`, `height`, `margin`).
* **Prefers-Reduced-Motion Compliance:** When the client OS requests reduced motion:
  * Lenis smooth inertia is disabled.
  * GSAP ScrollTrigger pinned scenes convert into static editorial layouts.
  * Autoplay campaign video loops display high-resolution static posters.
  * Framer Motion transitions switch from complex spring physics to instant fades (`duration: 0.1s`).

### 19.3 Media Performance & Video Strategy
1. **Hero Media:** Responsive `<picture>` source selection, AVIF/WebP transcoding, Low-Quality Image Placeholders (LQIP blur-up), and explicit `fetchpriority="high"`.
2. **Product Detail Images:** Mastered in Display P3, served via Cloudinary responsive `srcset` with automated DPR scaling (1x, 2x, 3x).
3. **360° Movement Canvas:** 36-frame rotation sequences are **deferred**; only the first frame is downloaded during initial page load. Subsequent frames load progressively upon user interaction, with memory released when the component unmounts.
4. **Cinematic Video Delivery:** Adaptive HLS / compressed MP4 variants; mobile variants capped at ≤ 4MB; muted autoplay only when intersecting viewport via `IntersectionObserver`.

---

## 20. OBSERVABILITY, BACKGROUND JOBS & DATABASE INTEGRITY

### 20.1 Observability Architecture
* **Structured Application Logs:** All logs output as structured JSON containing `timestamp`, `level`, `requestId`, `userId` (if authenticated), `orderId` (if applicable), and `environment`.
* **Error Tracking:** Centralized Sentry integration capturing client-side crashes, server action rejections, and unhandled promise rejections with automatic PII scrubbing.
* **Alerting Matrices:**
  * Paystack webhook verification failure > 1% in 5m ➔ Critical PagerDuty alert.
  * Payment reconciliation amount mismatch ➔ Immediate Atelier lead alert.
  * Inventory oversell attempt ➔ Critical DB anomaly alert.
  * 5xx response rate > 0.5% in 5m ➔ Engineering on-call alert.

### 20.2 Background Job Architecture (BullMQ + Redis)
1. **`reservation-expiry-worker`:** Sweeps active reservations every 60s; releases expired holds back to available stock.
2. **`payment-reconciliation-worker`:** Evaluates pending payments every 5m; queries Paystack S2S API; repairs orphaned states.
3. **`abandoned-checkout-worker`:** Flags abandoned carts and triggers luxury concierge follow-up emails after 24h.
4. **`certificate-generation-worker`:** Renders cryptographic PDF and QR code assets upon bespoke order dispatch.
5. **`transactional-email-retry-worker`:** Exponential backoff retry for failed Resend API calls.
6. **`stale-session-cleanup-worker`:** Daily sweep of expired guest tokens and revoked admin sessions.

### 20.3 Database Integrity, Indexing & Historical Snapshots
* **Immutable Purchase Snapshots:** `order_items` stores historical snapshots (`productNameSnapshot`, `variantNameSnapshot`, `colorNameSnapshot`, `sizeSnapshot`, `unitPriceKobo`, `currency`, `discountKoboSnapshot`, `taxKoboSnapshot`, `skuSnapshot`). If catalog prices or names change, historical orders, VAT invoices, and certificates remain 100% accurate.
* **Indexing Strategy:** High-frequency access columns have dedicated B-Tree indexes:
  * `orders (payment_reference, customer_email, created_at, status)`
  * `order_items (order_id, product_id)`
  * `inventory_reservations (variant_id, status, expires_at)`
  * `inventory_transactions (variant_id, transaction_type, created_at)`
  * `audit_logs (actor_user_id, resource_type, resource_id, created_at)`
  * `guest_access_tokens (token_hash, expires_at)`

---

## 21. COMPLETE DATABASE SCHEMA (POSTGRESQL + DRIZZLE ORM)

The authoritative, production-grade schema is standardized definitively on **PostgreSQL + Drizzle ORM**:

```typescript
// db/schema.ts
import { 
  pgTable, text, timestamp, integer, boolean, jsonb, pgEnum, uuid, index, uniqueIndex, bytea 
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ==========================================
// 1. ENUMS & TYPE DEFINITIONS
// ==========================================
export const roleEnum = pgEnum('role', [
  'SUPER_ADMIN', 
  'ATELIER_MANAGER', 
  'FULFILLMENT_LEAD', 
  'STYLIST', 
  'CLIENT'
]);

export const tierEnum = pgEnum('client_tier', [
  'STANDARD', 
  'VIP', 
  'PRIVATE_CLIENT'
]);

export const availabilityEnum = pgEnum('availability', [
  'AVAILABLE', 
  'MADE_TO_ORDER', 
  'ATELIER_EDITION', 
  'PRE_ORDER', 
  'PRIVATE_ACCESS', 
  'ARCHIVED'
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'PAYMENT_PENDING',
  'PAYMENT_INITIALIZED',
  'PAYMENT_PROCESSING',
  'PAYMENT_SUCCESSFUL',
  'PAYMENT_FAILED',
  'PAYMENT_ABANDONED',
  'PAYMENT_EXPIRED',
  'PAYMENT_REFUNDED',
  'PAYMENT_PARTIALLY_REFUNDED'
]);

export const orderStatusEnum = pgEnum('order_status', [
  'DRAFT',
  'PENDING_PAYMENT',
  'CONFIRMED',
  'IN_PRODUCTION',
  'READY_FOR_DISPATCH',
  'DISPATCHED',
  'DELIVERED',
  'COMPLETED',
  'CANCELLED'
]);

export const fulfillmentStatusEnum = pgEnum('fulfillment_status', [
  'UNFULFILLED',
  'ALLOCATED',
  'IN_ATELIER_PRODUCTION',
  'QUALITY_INSPECTION',
  'PACKAGED',
  'DISPATCHED',
  'DELIVERED',
  'RETURNED'
]);

export const reservationStatusEnum = pgEnum('reservation_status', [
  'ACTIVE',
  'CONVERTED',
  'EXPIRED',
  'RELEASED',
  'CANCELLED'
]);

export const inventoryTransactionTypeEnum = pgEnum('inventory_transaction_type', [
  'INITIAL_STOCK',
  'RESERVATION',
  'RESERVATION_RELEASE',
  'SALE',
  'REFUND',
  'RETURN',
  'ADJUSTMENT',
  'DAMAGE',
  'LOST',
  'TRANSFER',
  'RESTOCK'
]);

export const refundStatusEnum = pgEnum('refund_status', [
  'REQUESTED',
  'APPROVED',
  'PROCESSING',
  'SUCCESSFUL',
  'FAILED',
  'CANCELLED'
]);

export const colorFamilyEnum = pgEnum('color_family', [
  'NEUTRALS_MINERAL', 
  'IMPERIAL_JEWEL', 
  'METALLIC_SATIN', 
  'SAVANNA_SOLSTICE'
]);

export const sheenTypeEnum = pgEnum('sheen_type', [
  'MATTE', 
  'LUSTROUS_SATIN', 
  'METALLIC_SHIMMER', 
  'IRIDESCENT_VELVET', 
  'SLUB_TEXTURE', 
  'HIGH_SPECULAR'
]);

// ==========================================
// 2. USERS, CLIENTELING & AUDIT LOGS
// ==========================================
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  fullName: text('full_name').notNull(),
  phone: text('phone'),
  role: roleEnum('role').default('CLIENT').notNull(),
  tier: tierEnum('client_tier').default('STANDARD').notNull(),
  assignedStylistId: uuid('assigned_stylist_id'),
  lifetimeValueKobo: integer('lifetime_value_kobo').default(0).notNull(),
  stylistNotes: text('stylist_notes'),
  preferredCategories: jsonb('preferred_categories').default([]).notNull(),
  isMfaEnabled: boolean('is_mfa_enabled').default(false).notNull(),
  mfaSecret: text('mfa_secret'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => ({
  emailIdx: uniqueIndex('users_email_idx').on(table.email),
  roleIdx: index('users_role_idx').on(table.role),
  tierIdx: index('users_tier_idx').on(table.tier),
}));

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  actorUserId: uuid('actor_user_id').references(() => users.id),
  actorRole: text('actor_role').notNull(),
  action: text('action').notNull(),
  resourceType: text('resource_type').notNull(),
  resourceId: text('resource_id').notNull(),
  beforeState: jsonb('before_state'),
  afterState: jsonb('after_state'),
  ipAddress: text('ip_address').notNull(),
  userAgent: text('user_agent').notNull(),
  requestId: text('request_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  actorIdx: index('audit_logs_actor_idx').on(table.actorUserId),
  resourceIdx: index('audit_logs_resource_idx').on(table.resourceType, table.resourceId),
  createdAtIdx: index('audit_logs_created_at_idx').on(table.createdAt),
}));

// ==========================================
// 3. ENCRYPTED BESPOKE MEASUREMENT SYSTEM
// ==========================================
export const measurementDefinitions = pgTable('measurement_definitions', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: text('code').notNull().unique(), // e.g. "BUST_CIRCUMFERENCE", "SLEEVE_LENGTH"
  name: text('name').notNull(),
  category: text('category').default('ANATOMICAL').notNull(),
  unit: text('unit').default('CM').notNull(),
  displayOrder: integer('display_order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
});

export const measurementProfiles = pgTable('measurement_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  profileName: text('profile_name').default('Primary Atelier Fit').notNull(),
  isDefault: boolean('is_default').default(true).notNull(),
  verifiedByTailorId: uuid('verified_by_tailor_id').references(() => users.id),
  verifiedAt: timestamp('verified_at', { withTimezone: true }),
  notes: text('fit_preferences'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const measurementValues = pgTable('measurement_values', {
  id: uuid('id').defaultRandom().primaryKey(),
  profileId: uuid('profile_id').references(() => measurementProfiles.id, { onDelete: 'cascade' }).notNull(),
  definitionId: uuid('definition_id').references(() => measurementDefinitions.id).notNull(),
  encryptedValue: text('encrypted_value').notNull(), // AES-256-GCM ciphertext + IV
  keyVersion: integer('key_version').default(1).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  profileDefIdx: uniqueIndex('measurement_profile_def_idx').on(table.profileId, table.definitionId),
}));

// ==========================================
// 4. COLLECTIONS & MASTER CLOTH PALETTE
// ==========================================
export const collections = pgTable('collections', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  editorialQuote: text('editorial_quote'),
  coverVideoUrl: text('cover_video_url'),
  coverImageUrl: text('cover_image_url').notNull(),
  isSeasonalCampaign: boolean('is_seasonal_campaign').default(false).notNull(),
  isPrivateAccess: boolean('is_private_access').default(false).notNull(),
  accessToken: text('access_token'),
  launchDate: timestamp('launch_date', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const clothColors = pgTable('cloth_colors', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: text('code').notNull().unique(), // e.g. "CL-01", "CL-06"
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  hexCode: text('hex_code').notNull(),
  secondaryHexCode: text('secondary_hex_code'),
  pantoneRef: text('pantone_ref').notNull(),
  colorFamily: colorFamilyEnum('color_family').notNull(),
  sheenType: sheenTypeEnum('sheen_type').default('LUSTROUS_SATIN').notNull(),
  swatchTextureUrl: text('swatch_texture_url'),
  isCorePalette: boolean('is_core_palette').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ==========================================
// 5. PRODUCTS, COLORWAYS & VARIANTS
// ==========================================
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  collectionId: uuid('collection_id').references(() => collections.id).notNull(),
  headline: text('headline').notNull(),
  description: text('description').notNull(),
  atelierNotes: text('atelier_notes'),
  
  // Fabric & Silhouette Intelligence
  fabricName: text('fabric_name').notNull(),
  fabricComposition: text('fabric_composition').notNull(),
  fabricWeightGsm: integer('fabric_weight_gsm'),
  fabricDrape: text('fabric_drape'),
  fabricCare: text('fabric_care').notNull(),
  fabricMovementVideoUrl: text('fabric_movement_video_url'),
  
  silhouetteFit: text('silhouette_fit'),
  silhouetteStructure: text('silhouette_structure'),
  
  // Exclusivity & Availability
  availability: availabilityEnum('availability').default('AVAILABLE').notNull(),
  limitedEditionTotal: integer('limited_edition_total'),
  limitedEditionRemaining: integer('limited_edition_remaining'),
  
  basePriceKobo: integer('base_price_kobo').notNull(),
  isMadeToMeasureAllowed: boolean('is_made_to_measure_allowed').default(true).notNull(),
  has360Rotation: boolean('has_360_rotation').default(false).notNull(),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => ({
  slugIdx: uniqueIndex('products_slug_idx').on(table.slug),
  collectionIdx: index('products_collection_idx').on(table.collectionId),
  availabilityIdx: index('products_availability_idx').on(table.availability),
}));

export const productColorways = pgTable('product_colorways', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  colorId: uuid('color_id').references(() => clothColors.id).notNull(),
  sku: text('sku').notNull().unique(),
  isDefault: boolean('is_default').default(false).notNull(),
  heroImageUrl: text('hero_image_url').notNull(),
  mediaGalleryUrls: jsonb('media_gallery_urls').default([]).notNull(),
  rotationFrameUrls: jsonb('rotation_frame_urls').default([]).notNull(),
  fabricMacroImageUrl: text('fabric_macro_image_url'),
  priceDeltaKobo: integer('price_delta_kobo').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  productColorIdx: index('product_colorway_prod_col_idx').on(table.productId, table.colorId),
  skuIdx: uniqueIndex('product_colorway_sku_idx').on(table.sku),
}));

export const productVariants = pgTable('product_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  colorwayId: uuid('colorway_id').references(() => productColorways.id, { onDelete: 'cascade' }).notNull(),
  sizeLabel: text('size_label').notNull(), // "XXS", "XS", "S", "M", "L", "XL", "MADE_TO_MEASURE"
  sku: text('sku').notNull().unique(),
  stockQuantity: integer('stock_quantity').default(0).notNull(),
  reservedQuantity: integer('reserved_quantity').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  variantSkuIdx: uniqueIndex('product_variant_sku_idx').on(table.sku),
  colorwaySizeIdx: index('variant_colorway_size_idx').on(table.colorwayId, table.sizeLabel),
}));

// ==========================================
// 6. INVENTORY RESERVATIONS & LEDGER
// ==========================================
export const inventoryReservations = pgTable('inventory_reservations', {
  id: uuid('id').defaultRandom().primaryKey(),
  variantId: uuid('variant_id').references(() => productVariants.id).notNull(),
  orderId: uuid('order_id'),
  quantity: integer('quantity').default(1).notNull(),
  status: reservationStatusEnum('status').default('ACTIVE').notNull(),
  reservedAt: timestamp('reserved_at', { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  releasedAt: timestamp('released_at', { withTimezone: true }),
  convertedToSaleAt: timestamp('converted_to_sale_at', { withTimezone: true }),
}, (table) => ({
  variantStatusIdx: index('inv_res_variant_status_idx').on(table.variantId, table.status),
  expiresAtIdx: index('inv_res_expires_at_idx').on(table.expiresAt),
}));

export const inventoryTransactions = pgTable('inventory_transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  variantId: uuid('variant_id').references(() => productVariants.id).notNull(),
  orderId: uuid('order_id'),
  reservationId: uuid('reservation_id').references(() => inventoryReservations.id),
  transactionType: inventoryTransactionTypeEnum('transaction_type').notNull(),
  quantity: integer('quantity').notNull(), // Delta: positive or negative
  previousQuantity: integer('previous_quantity').notNull(),
  newQuantity: integer('new_quantity').notNull(),
  reason: text('reason').notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  variantTxIdx: index('inv_tx_variant_idx').on(table.variantId, table.createdAt),
  orderTxIdx: index('inv_tx_order_idx').on(table.orderId),
}));

// ==========================================
// 7. ORDERS, ITEMS, GUEST ACCESS & RECONCILIATION
// ==========================================
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderNumber: text('order_number').notNull().unique(), // e.g. "FC-94820"
  userId: uuid('user_id').references(() => users.id),
  isGuestOrder: boolean('is_guest_order').default(true).notNull(),

  // Contact Information
  customerFullName: text('customer_full_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),

  // Country-Aware Address
  shippingCountry: text('shipping_country').default('NG').notNull(),
  shippingState: text('shipping_state').notNull(),
  shippingCity: text('shipping_city').notNull(),
  shippingAddressLine1: text('shipping_address_line1').notNull(),
  shippingAddressLine2: text('shipping_address_line2'),
  shippingPostalCode: text('shipping_postal_code'),

  // Financial Minor Units (Strict NGN Kobo)
  subtotalKobo: integer('subtotal_kobo').notNull(),
  shippingKobo: integer('shipping_kobo').default(0).notNull(),
  taxKobo: integer('tax_kobo').default(0).notNull(),
  discountKobo: integer('discount_kobo').default(0).notNull(),
  totalKobo: integer('total_kobo').notNull(),
  currency: text('currency').default('NGN').notNull(),

  // Decoupled Statuses
  paymentStatus: paymentStatusEnum('payment_status').default('PAYMENT_PENDING').notNull(),
  orderStatus: orderStatusEnum('order_status').default('PENDING_PAYMENT').notNull(),
  fulfillmentStatus: fulfillmentStatusEnum('fulfillment_status').default('UNFULFILLED').notNull(),

  // Packaging & Bespoke
  packagingType: text('packaging_type').default('SIGNATURE_BOX').notNull(),
  isGift: boolean('is_gift').default(false).notNull(),
  giftMessage: text('gift_message'),
  customMeasurementProfileId: uuid('custom_measurement_profile_id').references(() => measurementProfiles.id),

  // Paystack Reference
  gatewayReference: text('gateway_reference').unique(),

  // Account Claim
  accountClaimTokenHash: text('account_claim_token_hash'),
  isClaimed: boolean('is_claimed').default(false).notNull(),
  claimedAt: timestamp('claimed_at', { withTimezone: true }),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  orderNumberIdx: uniqueIndex('orders_order_number_idx').on(table.orderNumber),
  customerEmailIdx: index('orders_customer_email_idx').on(table.customerEmail),
  gatewayRefIdx: uniqueIndex('orders_gateway_ref_idx').on(table.gatewayReference),
  orderStatusIdx: index('orders_status_idx').on(table.orderStatus),
  paymentStatusIdx: index('orders_payment_status_idx').on(table.paymentStatus),
}));

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  variantId: uuid('variant_id').references(() => productVariants.id).notNull(),
  
  // Historical Purchase-Time Snapshots
  productNameSnapshot: text('product_name_snapshot').notNull(),
  colorNameSnapshot: text('color_name_snapshot').notNull(),
  sizeSnapshot: text('size_snapshot').notNull(),
  skuSnapshot: text('sku_snapshot').notNull(),
  unitPriceKobo: integer('unit_price_kobo').notNull(),
  discountKoboSnapshot: integer('discount_kobo_snapshot').default(0).notNull(),
  taxKoboSnapshot: integer('tax_kobo_snapshot').default(0).notNull(),
  currencySnapshot: text('currency_snapshot').default('NGN').notNull(),
  quantity: integer('quantity').default(1).notNull(),
}, (table) => ({
  orderItemOrderIdx: index('order_items_order_id_idx').on(table.orderId),
}));

export const guestAccessTokens = pgTable('guest_access_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  tokenHash: text('token_hash').notNull().unique(), // Salted SHA-256 hash
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  lastAccessedAt: timestamp('last_accessed_at', { withTimezone: true }),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  tokenHashIdx: uniqueIndex('guest_token_hash_idx').on(table.tokenHash),
  orderGuestIdx: index('guest_order_idx').on(table.orderId),
}));

export const paymentReconciliations = pgTable('payment_reconciliations', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  gatewayReference: text('gateway_reference').notNull().unique(),
  paystackTransactionId: text('paystack_transaction_id'),
  verifiedAmountKobo: integer('verified_amount_kobo').notNull(),
  verifiedCurrency: text('verified_currency').default('NGN').notNull(),
  channel: text('channel'),
  cardType: text('card_type'),
  bank: text('bank'),
  gatewayResponseMetadata: jsonb('gateway_response_metadata'),
  reconciliationStatus: text('reconciliation_status').default('VERIFIED').notNull(),
  verifiedAt: timestamp('verified_at', { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  reconcileGatewayIdx: uniqueIndex('reconcile_gateway_ref_idx').on(table.gatewayReference),
  reconcileOrderIdx: index('reconcile_order_idx').on(table.orderId),
}));

export const refunds = pgTable('refunds', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  amountKobo: integer('amount_kobo').notNull(),
  reason: text('reason').notNull(),
  status: refundStatusEnum('status').default('REQUESTED').notNull(),
  gatewayRefundReference: text('gateway_refund_reference').unique(),
  requestedByUserId: uuid('requested_by_user_id').references(() => users.id).notNull(),
  approvedByUserId: uuid('approved_by_user_id').references(() => users.id),
  processedAt: timestamp('processed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  refundOrderIdx: index('refunds_order_idx').on(table.orderId),
  refundStatusIdx: index('refunds_status_idx').on(table.status),
}));

// ==========================================
// 8. PROVENANCE, CERTIFICATES & WARDROBE
// ==========================================
export const certificates = pgTable('certificates', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  colorwayId: uuid('colorway_id').references(() => productColorways.id),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  serialNumber: text('serial_number').notNull().unique(), // e.g. FC-HS-2026-000142
  ownerFullName: text('owner_full_name').notNull(),
  ownerEmail: text('owner_email').notNull(),
  ownerId: uuid('owner_id').references(() => users.id),
  issuedAt: timestamp('issued_at', { withTimezone: true }).defaultNow().notNull(),
  qrCodeUrl: text('qr_code_url').notNull(),
}, (table) => ({
  certSerialIdx: uniqueIndex('certificates_serial_idx').on(table.serialNumber),
  certOwnerIdx: index('certificates_owner_idx').on(table.ownerEmail),
}));

export const wardrobeItems = pgTable('wardrobe_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  colorwayId: uuid('colorway_id').references(() => productColorways.id),
  purchasedAt: timestamp('purchased_at', { withTimezone: true }).defaultNow().notNull(),
});

export const savedEdits = pgTable('saved_edits', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  editName: text('edit_name').notNull(),
  isPublic: boolean('is_public').default(false).notNull(),
  shareToken: text('share_token').unique(),
  items: jsonb('items').default([]).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  guestName: text('guest_name'),
  guestEmail: text('guest_email').notNull(),
  guestPhone: text('guest_phone').notNull(),
  serviceType: text('service_type').notNull(),
  appointmentDate: timestamp('appointment_date', { withTimezone: true }).notNull(),
  locationType: text('location_type').notNull(),
  status: text('status').default('PENDING').notNull(),
  notes: text('notes'),
  stylistId: uuid('stylist_id').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
```

---

## 22. TESTING STRATEGY & QUALITY ASSURANCE MATRIX

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        COMPREHENSIVE TEST SUITE                        │
├───────────────────┬──────────────────────┬─────────────────────────────┤
│    UNIT TESTS     │  INTEGRATION TESTS   │    E2E & SECURITY TESTS     │
├───────────────────┼──────────────────────┼─────────────────────────────┤
│ • Kobo Math       │ • Paystack Flow      │ • Guest Checkout E2E        │
│ • Currency Disp   │ • S2S Reconciliation │ • Limited Concurrency Race  │
│ • State Guards    │ • Idempotent Webhook │ • IDOR & RBAC Bypass        │
│ • Zod Schemas     │ • Inventory Holds    │ • Constant-Time Token Test  │
│ • Token Hasher    │ • Refund Execution   │ • Measurement Decrypt Auth  │
└───────────────────┴──────────────────────┴─────────────────────────────┘
```

1. **Unit Testing:** Strict validation of monetary kobo arithmetic, currency rounding, Zod input guards, and state transition state machines.
2. **Integration Testing:** Simulated Paystack checkout initialization, HMAC-SHA512 webhook dispatch, duplicate webhook idempotency, background reservation expiry, and refund triggers.
3. **End-to-End Testing (Playwright):** Full guest checkout, international address entry, limited-edition concurrency race conditions (preventing overselling), order tracking, and admin clienteling.
4. **Security Testing:** Automated penetration tests verifying zero IDOR on order tracking, CSRF protection on server actions, XSS escaping on customer reviews, and encryption integrity on bespoke measurement queries.

---

## 23. DISASTER RECOVERY & BACKUP STANDARDS

* **Automated WAL Archiving:** Continuous Write-Ahead Logging (WAL) with point-in-time recovery (PITR) support.
* **Encrypted Snapshots:** Automated daily encrypted database snapshots with 30-day rolling retention.
* **Restoration Testing:** Automated weekly restore drill into an isolated staging sandbox.
* **Operational Targets:**
  * **Recovery Point Objective (RPO):** **≤ 1 Hour.**
  * **Recovery Time Objective (RTO):** **≤ 4 Hours.**

---

## 24. DEFINITIVE ENVIRONMENT VARIABLES INVENTORY

```text
# ==========================================
# PUBLIC CLIENT VARIABLES (NEXT_PUBLIC_*)
# ==========================================
NEXT_PUBLIC_APP_URL="https://finaluchi.com"
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_live_..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="finaluchi-couture"
NEXT_PUBLIC_GA4_MEASUREMENT_ID="G-..."

# ==========================================
# SERVER-ONLY VARIABLES
# ==========================================
NODE_ENV="production"
PORT=3000
DATABASE_POOL_MIN=5
DATABASE_POOL_MAX=20

# ==========================================
# SECRET CREDENTIALS (NEVER EXPOSE TO CLIENT)
# ==========================================
DATABASE_URL="postgres://user:password@aws-eu-west-1.postgres:5432/finaluchi_prod?sslmode=require"
PAYSTACK_SECRET_KEY="sk_live_..."
PAYSTACK_WEBHOOK_SECRET="whsec_..."
MEASUREMENT_ENCRYPTION_KEY="hex_encoded_32_byte_aes_gcm_master_key"
SESSION_SECRET="hex_encoded_64_byte_session_signing_secret"
RESEND_API_KEY="re_..."
REDIS_URL="redis://default:secret@redis-cluster.internal:6379"
SENTRY_AUTH_TOKEN="sntrys_..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

---

## 25. LEGAL & STATUTORY POLICY CALIBRATION

> **Architectural Disclaimer:** This system architecture is designed to support technical compliance with applicable Nigerian (NDPR, FCCPA) and international consumer-protection and data-privacy standards. Final terms of service, bespoke return limitations, and statutory policies require formal review and certification by qualified legal counsel.

---

## 26. MASTER IMPLEMENTATION ROADMAP

```mermaid
gantt
    title Finaluchi Digital Flagship Master Roadmap (v2.1.0)
    dateFormat  YYYY-MM-DD
    section Phase 1: Architecture & DB Foundation
    Design Tokens & Global CSS Architecture   :done, p1_1, 2026-09-01, 7d
    PostgreSQL & Drizzle ORM Schema (Kobo)    :done, p1_2, after p1_1, 7d
    Encrypted Measurements & EAV Engine       :active, p1_3, after p1_2, 6d
    section Phase 2: Motion & Brand Experience
    GSAP + Framer Motion + Lenis Engine       :p2_1, 2026-09-20, 10d
    Cinematic Hero & Digital Atelier Module   :p2_2, after p2_1, 10d
    Runway Mode & Pinned Horizontal Sweeps    :p2_3, after p2_2, 8d
    section Phase 3: Product & Color Intelligence
    PLP with Occasion Discovery Filters       :p3_1, 2026-10-15, 10d
    PDP with Fabric & Swatch Matrix           :p3_2, after p3_1, 10d
    Dynamic Colorway & Deferred 360° Engine   :p3_3, after p3_2, 7d
    Display P3 Wide Gamut Calibration Engine  :p3_4, after p3_3, 5d
    section Phase 4: Commerce, Paystack & Ledger
    Concierge Bag Drawer & Dynamic Checkout   :p4_1, 2026-11-05, 10d
    Paystack Live Integration & Webhooks      :p4_2, after p4_1, 8d
    S2S Reconciliation & Background Cron      :p4_3, after p4_2, 6d
    Atomic Inventory Reservation & Ledger     :p4_4, after p4_3, 7d
    section Phase 5: Clienteling & Provenance
    Post-Purchase Atelier Journey Tracker     :p5_1, 2026-12-01, 10d
    Digital Certificates & QR Provenance      :p5_2, after p5_1, 8d
    Digital Wardrobe & Saved Edits            :p5_3, after p5_2, 8d
    section Phase 6: Admin Hub, QA & Launch
    Admin Hub, CRM & Audit Logging            :p6_1, 2026-12-20, 12d
    Core Web Vitals & Security Penetration    :p6_2, after p6_1, 8d
    Staging Restore Validation & Go-Live      :p6_3, after p6_2, 5d
```

---

## 27. PRODUCTION READINESS CHECKLIST

The Finaluchi platform must not be certified for production deployment until every gate is verified:

- [ ] **1. Gateway Exclusivity:** Paystack is the sole payment gateway. All transactions and authorizations route strictly through Paystack.
- [ ] **2. Minor Unit Financials:** All database columns, calculation engines, and payloads utilize integer kobo (`*_kobo`).
- [ ] **3. Currency Decoupling:** Client-side display currency does not alter the server-authoritative NGN order total.
- [ ] **4. Decoupled Lifecycles:** `paymentStatus`, `orderStatus`, and `fulfillmentStatus` operate as independent state machines.
- [ ] **5. Server Payment Verification:** Order confirmation requires server-to-server Paystack verification; browser redirect is untrusted.
- [ ] **6. Webhook Signature Verification:** Incoming Paystack webhooks authenticate via HMAC-SHA512 with server secret.
- [ ] **7. Webhook Idempotency:** Duplicate webhook events return HTTP 200 without double-decrementing stock or sending duplicate emails.
- [ ] **8. Scheduled Payment Reconciliation:** Cron worker repairs stuck `PAYMENT_PENDING` / `PAYMENT_PROCESSING` transactions every 5m.
- [ ] **9. Atomic Inventory Holds:** Checkout locks stock via `inventory_reservations` using `SELECT ... FOR UPDATE` row-level locking.
- [ ] **10. Concurrency Oversell Protection:** DB check constraint enforces `stock_quantity >= reserved_quantity`.
- [ ] **11. Reservation Auto-Expiry:** Worker releases reservations older than 15 minutes and logs `RESERVATION_RELEASE`.
- [ ] **12. Immutable Inventory Ledger:** 100% of stock mutations are recorded in `inventory_transactions`.
- [ ] **13. Piece Serialization:** Limited/bespoke garments have unique, immutable serial numbers.
- [ ] **14. Hashed Guest Access Tokens:** Plaintext guest access tokens are never stored; database stores salted SHA-256 hashes.
- [ ] **15. Constant-Time Token Auth:** Guest tracker compares tokens using `crypto.timingSafeEqual()`.
- [ ] **16. High-Risk Step-Up OTP:** Invoices, certificates, and measurement changes require email OTP re-auth.
- [ ] **17. Encrypted Anatomical Measurements:** Measurement values use AES-256-GCM encryption at rest with RBAC decryption guards.
- [ ] **18. Right to Erasure / Anonymization:** Data deletion purges PII while retaining anonymized statutory financial records.
- [ ] **19. First-Class Admin Audit Logging:** `audit_logs` records all sensitive admin actions with automated PII redaction.
- [ ] **20. Super Admin MFA:** Mandatory two-factor authentication enforced on administrative roles.
- [ ] **21. Defense-in-Depth Web Security:** HTTP-only Secure SameSite cookies, CSRF protection, and server-side RBAC on all Server Actions.
- [ ] **22. Upload Malware Inspection:** Customer and workshop uploads validated for MIME types, magic bytes, and malware scanned.
- [ ] **23. Hardened Security Headers:** Production deployment enforces CSP, HSTS, X-Frame-Options DENY, and Referrer-Policy.
- [ ] **24. Immutable Purchase Snapshots:** `order_items` preserves title, price, and color snapshots at purchase time.
- [ ] **25. Database Foreign Keys & Indexes:** All high-frequency query paths indexed with appropriate cascade constraints.
- [ ] **26. Automated Backups & PITR:** PostgreSQL WAL archiving active with validated point-in-time recovery.
- [ ] **27. Disaster Recovery Baseline:** Documented targets: RPO ≤ 1h, RTO ≤ 4h.
- [ ] **28. Core Web Vitals Budget:** LCP ≤ 2.2s (Mobile 4G), INP ≤ 150ms, CLS ≤ 0.05.
- [ ] **29. Reduced-Motion Compliance:** `prefers-reduced-motion` cleanly disables Lenis, GSAP pinning, and autoplay video.
- [ ] **30. Deferred 360° Image Assets:** 360° rotation canvas frames load on-demand without blocking initial PDP paint.
- [ ] **31. Structured JSON Observability:** Application logs emit structured JSON with `requestId`, `userId`, and `orderId`.
- [ ] **32. Sentry Error Scrubbing:** Centralized exception monitoring scrubs PII and payment secrets before transmission.
- [ ] **33. Background Worker Reliability:** BullMQ workers handle email retries, certificate generation, and ledger sweeps with exponential backoff.
- [ ] **34. Secret Isolation:** Zero server secrets or private keys exposed in client-accessible bundles.
- [ ] **35. Production Migration Safety:** Backward-compatible expand-and-contract migrations verified on staging before production apply.

---

> **The Definitive Standard:** Finaluchi Couture is built to transcend ordinary e-commerce. By anchoring technology in craft provenance, formal motion choreography, fabric intelligence, Paystack financial integrity, and high-touch concierge care, the digital flagship stands as an impenetrable virtual home of haute couture.
