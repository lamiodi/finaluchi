THE RECALL COLLECTION — 2024/25 AUTUMN DROP
============================================

Drop-folder for the collection's raw photos. Five products:

  SLOANE DRESS            UK 6-12    N120,000
  BOSS SET                UK 6-12    N220,000  |  UK 14-18  N250,000
  FANTASIA DRESS          UK 6-12    N145,000
  ELIZABETH BRAZER DRESS  UK 6-12    N245,000
  TERESA DRESS            UK 6-12    N105,000

The website serves photos from each product's OWN folder, not this one:

  ../products/sloane-dress/            (name files sloane-1.jpeg, sloane-2.jpeg ...)
  ../products/boss-set/                (boss-1.jpeg, boss-2.jpeg ...)
  ../products/fantasia-dress/          (fantasia-1.jpeg, ...)
  ../products/elizabeth-brazer-dress/  (elizabeth-1.jpeg, ...)
  ../products/teresa-dress/            (teresa-1.jpeg, ...)

Workflow: copy each product's photos into its folder with the names above,
then commit + push. Production (Vercel) builds from the GitHub repo — photos
that are only on this computer never reach the live site. The WebP sizes are
generated automatically during build; add nothing else by hand.

Catalog entries live in frontend/src/data/catalog.ts (mirror:
backend/src/catalog.ts) and already point at these filenames.
