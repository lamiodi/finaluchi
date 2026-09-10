import React, { useEffect, useState } from 'react';

let hasPlayedOnce = false;

export const Preloader: React.FC = () => {
  const [hidden, setHidden] = useState(hasPlayedOnce);

  useEffect(() => {
    if (hasPlayedOnce) return;
    const timer = setTimeout(() => {
      hasPlayedOnce = true;
      setHidden(true);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#000000] flex flex-col items-center justify-center gap-5 transition-opacity duration-700">
      <img
        src="/FINALUCHIlogo.jpg"
        alt="Finaluchi Couture"
        className="h-16 sm:h-20 w-auto invert brightness-200"
      />
      <span className="text-[10px] font-mono-luxury tracking-[0.35em] text-[#C5A880] uppercase font-semibold">
        FINALUCHI COUTURE • LAGOS
      </span>
      <div className="w-20 h-px bg-white/20 overflow-hidden">
        <div
          className="h-full bg-[#FFFFFF]"
          style={{ animation: 'loading 1.2s ease-in-out infinite', width: '40%' }}
        />
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};
