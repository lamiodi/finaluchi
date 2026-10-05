import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { onImageError, buildWebPSrcSet } from '../../utils/images';

interface AboutPageProps {
  onExploreCollection: () => void;
  onOpenAppointments: () => void;
}

const MILESTONES = [
  { label: '2016 · The Dream', note: 'FLC is founded in Abuja — a dream born from a passion for fashion.' },
  { label: '2020 · BellaNaija', note: 'Featured in a landmark AsoEbi editorial spotlight.' },
  { label: '2022 · Press', note: 'Recognized for red-carpet and milestone occasion dressing.' },
  { label: '2026 · Horizons', note: 'Bridal and couture evening collections debuting through the season.' },
];

/**
 * The maison's own page — the CEO's story given a shareable home (#/about).
 * Paper world for the name and story, salon world for the philosophy climax.
 */
export const AboutPage: React.FC<AboutPageProps> = ({
  onExploreCollection,
  onOpenAppointments,
}) => {
  return (
    <section className="shop-page" aria-label="About Finaluchi Couture">
      {/* Hero — the name of the house, monumental and centred */}
      <header className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 text-center">
        <span className="shop-eyebrow" style={{ color: '#7c7164' }}>
          Finaluchi / The Maison · Abuja, Nigeria · Est. 2016
        </span>
        <h1 className="mt-6 flex items-baseline justify-center gap-x-4 gap-y-1 flex-wrap">
          <span
            style={{
              font: "400 clamp(44px, 8vw, 92px)/1 'Antic Didone', serif",
              letterSpacing: '.18em',
              color: '#201f1d',
            }}
          >
            FINALUCHI
          </span>
          <span
            className="couture-signature"
            style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              color: '#c5a880',
              transform: 'rotate(-6deg)',
              display: 'inline-block',
            }}
          >
            Couture
          </span>
        </h1>
        <p
          style={{
            marginTop: 18,
            font: "italic 400 clamp(20px, 2.6vw, 28px)/1.3 'Antic Didone', serif",
            color: '#846548',
          }}
        >
          Togetherness in Style.
        </p>
        <p
          style={{
            marginTop: 12,
            fontSize: 11,
            letterSpacing: '.16em',
            textTransform: 'uppercase',
            color: '#777069',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          A Nigerian luxury fashion house built on the power of togetherness
        </p>
      </header>

      {/* The portrait — directly beneath the name */}
      <figure className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-12 mt-10 sm:mt-12 m-0">
        <div className="home-editorial-figure aspect-[16/10] sm:aspect-[21/9]">
          <img
            src="/images/campaign/editorial-gold-mini.jpeg"
            srcSet={buildWebPSrcSet('/images/campaign/editorial-gold-mini.jpeg')}
            sizes="(min-width: 1560px) 92vw, 94vw"
            alt="Finaluchi occasion look in gold, photographed on the client"
            onError={onImageError}
          />
          <span className="home-figure-note">Occasion gold, shot on the Finaluchi client.</span>
          <span className="home-figure-number">F / 01</span>
        </div>
      </figure>

      {/* The story — the founder's words, two measured columns */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-12 mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
        <div>
          <h2 className="shop-eyebrow" style={{ color: '#846548' }}>The House</h2>
          <p className="mt-5" style={{ fontSize: 13, lineHeight: 1.9, color: '#201f1d' }}>
            Finaluchi Couture (FLC) is a Nigerian luxury fashion house founded in 2016 — a dream
            born from a passion for fashion that has grown into a couture house built on the power
            of togetherness: the belief that when passion, creativity, culture, and people come
            together, something extraordinary is created.
          </p>
          <p className="mt-4" style={{ fontSize: 13, lineHeight: 1.9, color: '#69645e' }}>
            We design and hand-tailor bespoke couture, haute couture, and ready-to-wear pieces that
            blend contemporary luxury with African influence — precision corsetry, intricate
            embellishments, sculpted silhouettes, and sweeping trains. Each creation is thoughtfully
            designed and carefully crafted to make the wearer feel confident, powerful, feminine,
            and unapologetically themselves.
          </p>
        </div>
        <div>
          <h2 className="shop-eyebrow" style={{ color: '#846548' }}>The Journey</h2>
          <p className="mt-5" style={{ fontSize: 13, lineHeight: 1.9, color: '#201f1d' }}>
            Our journey has always been about more than clothing. It is about people,
            relationships, shared dreams, and the strength that comes from building together — from
            our foundation as a family-owned brand to the community of clients, creatives,
            artisans, and FLC believers who continue to grow with us. Togetherness remains at the
            heart of everything we do.
          </p>
          <p className="mt-4" style={{ fontSize: 13, lineHeight: 1.9, color: '#69645e' }}>
            Led creatively by Fashion Director <strong style={{ color: '#201f1d' }}>Oluchi
            Irokanulo</strong> since October 2017, the house has dressed milestone celebrations
            across Nigeria and the global diaspora — from landmark asoebi editorials to
            red-carpet and bridal moments.
          </p>

          <div className="home-milestones">
            {MILESTONES.map(({ label, note }) => (
              <div key={label} className="home-milestone">
                <span>{label}</span>
                <p>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The philosophy — salon world climax, in the maison's own words */}
      <div className="salon-section mt-16 sm:mt-24">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 text-center">
          <span className="salon-eyebrow">The Power of Togetherness</span>
          <h2
            style={{
              marginTop: 18,
              font: "400 clamp(30px, 4.4vw, 52px)/1.15 'Antic Didone', serif",
              color: '#efebe3',
            }}
          >
            Different styles.<br />
            <em style={{ color: '#c5a880' }}>One direction.</em>
          </h2>
          <p style={{ marginTop: 26, fontSize: 13, lineHeight: 2, color: '#b2ada4' }}>
            At FLC, we believe different people can have different styles and still move in one
            direction. Our philosophy, <strong style={{ color: '#efebe3' }}>“Togetherness in
            Style,”</strong> celebrates the idea that fashion connects us — a language through
            which we express who we are, where we come from, and who we aspire to become.
          </p>
          <p style={{ marginTop: 16, fontSize: 13, lineHeight: 2, color: '#b2ada4' }}>
            We believe in women supporting women, creatives building together, and communities
            growing through shared purpose. Every FLC piece carries a part of this philosophy — a
            reminder that while individuality makes us unique, togetherness makes us stronger.
          </p>
          <p style={{ marginTop: 16, fontSize: 13, lineHeight: 2, color: '#b2ada4' }}>
            Our vision is to build a globally recognised African luxury fashion house that not only
            creates exceptional fashion but also creates opportunities, inspires confidence,
            celebrates culture, and leaves a meaningful legacy.
          </p>
          <p
            style={{
              marginTop: 34,
              font: "400 clamp(20px, 2.6vw, 28px)/1.4 'Antic Didone', serif",
              color: '#efebe3',
            }}
          >
            This is FLC. This is our story.<br />
            <em style={{ color: '#c5a880' }}>This is the power of togetherness.</em>
          </p>
        </div>
      </div>

      {/* The FLC family — where the maison lives online */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-12 mt-16 sm:mt-20">
        <h2 className="shop-eyebrow" style={{ color: '#846548' }}>The FLC Brand Family</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BRAND.lines.map((line) => (
            <a
              key={line.handle}
              href={line.url}
              target="_blank"
              rel="noreferrer"
              className="block p-4 bg-white border border-black/10 hover:border-noir transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-couture text-noir">{line.name}</span>
                <ArrowUpRight size={13} className="text-bronze group-hover:text-noir transition-colors" />
              </div>
              <div className="text-[10px] font-mono-luxury text-black/60 mt-1">{line.handle}</div>
              <p className="text-[11px] text-black/70 mt-2 leading-relaxed">{line.description}</p>
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-14 mb-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <button
            className="shop-solid-button"
            onClick={onExploreCollection}
          >
            <span>Explore the collection</span>
            <ArrowUpRight size={17} />
          </button>
          <button className="shop-text-link" style={{ color: '#201f1d' }} onClick={onOpenAppointments}>
            Request a custom order <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};
