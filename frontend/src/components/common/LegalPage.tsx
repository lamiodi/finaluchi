import React from 'react';
import { FileText, ArrowLeft, ShieldCheck } from 'lucide-react';
import { POLICIES, PolicyId } from '../../data/policies';

interface LegalPageProps {
  policyId: PolicyId;
  onSelectPolicy: (policyId: PolicyId) => void;
  onOpenFaq: () => void;
  onBackHome: () => void;
}

const POLICY_NAV: { id: PolicyId; label: string }[] = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms', label: 'Terms of Service' },
  { id: 'returns', label: 'Returns & Alterations' },
  { id: 'shipping', label: 'Shipping & Delivery' },
];

export const LegalPage: React.FC<LegalPageProps> = ({
  policyId,
  onSelectPolicy,
  onOpenFaq,
  onBackHome,
}) => {
  const doc = POLICIES[policyId];

  return (
    <div className="w-full bg-white min-h-screen text-noir font-sans-luxury pb-24">

      {/* Banner */}
      <div className="bg-noir text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-3">
          <button
            onClick={onBackHome}
            className="flex items-center gap-1.5 text-[10px] font-mono-luxury text-white/60 hover:text-white uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Finaluchi
          </button>
          <div className="flex items-center gap-2 text-champagne text-xs font-mono-luxury tracking-widest uppercase font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>{doc.kicker}</span>
          </div>
          <h1 className="font-sans-luxury text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            {doc.title}
          </h1>
          <p className="text-[10px] text-white/50 font-mono-luxury uppercase tracking-wider">
            Last updated: {doc.updated}
          </p>
        </div>
      </div>

      {/* Policy switcher */}
      <div className="border-b border-black/10 bg-alabaster-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center gap-2">
          {POLICY_NAV.map((nav) => (
            <button
              key={nav.id}
              onClick={() => onSelectPolicy(nav.id)}
              className={`px-3.5 py-2 text-[10px] font-semibold tracking-wider uppercase border transition-colors ${
                nav.id === doc.id
                  ? 'bg-noir text-white border-black'
                  : 'bg-white text-black/60 border-black/10 hover:border-black/40 hover:text-black'
              }`}
            >
              {nav.label}
            </button>
          ))}
          <button
            onClick={onOpenFaq}
            className="px-3.5 py-2 text-[10px] font-semibold tracking-wider uppercase border bg-white text-black/60 border-black/10 hover:border-black/40 hover:text-black transition-colors"
          >
            FAQ
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14">
        <p className="text-sm sm:text-[15px] text-black/75 leading-relaxed border-l-2 border-champagne pl-5 mb-12">
          {doc.intro}
        </p>

        <div className="space-y-12">
          {doc.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="flex items-center gap-2.5 text-sm font-bold tracking-loose-couture uppercase text-black">
                <FileText className="w-3.5 h-3.5 text-bronze shrink-0" />
                {section.heading}
              </h2>
              {section.body?.map((paragraph, i) => (
                <p key={i} className="text-xs sm:text-[13px] text-black/70 leading-[1.9] max-w-3xl">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-2.5">
                  {section.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-black/70 leading-relaxed max-w-3xl">
                      <span className="w-1 h-1 bg-champagne mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Concierge footer note */}
        <div className="mt-16 p-6 bg-[#FBF9F5] border border-[#EAE3D2] text-center space-y-2">
          <span className="text-[10px] font-mono-luxury tracking-[0.2em] uppercase text-bronze-deep font-semibold block">
            Questions about this policy?
          </span>
          <p className="text-xs text-black/70 max-w-md mx-auto leading-relaxed">
            Our private client team in Abuja will gladly walk you through any part of it before you order —
            on WhatsApp at +234 803 231 2961.
          </p>
        </div>
      </div>
    </div>
  );
};
