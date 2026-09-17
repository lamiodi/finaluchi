import React, { useEffect, useState } from 'react';

let hasPlayedOnce = false;

export const Preloader: React.FC = () => {
  const [isFading, setIsFading] = useState(false);
  const [hidden, setHidden] = useState(hasPlayedOnce);

  useEffect(() => {
    if (hasPlayedOnce) return;

    // Smooth luxury entrance, beginning gentle fade-out after 1.2s
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1200);

    // Unmount after fade transition completes
    const hideTimer = setTimeout(() => {
      hasPlayedOnce = true;
      setHidden(true);
    }, 1900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#000000] flex flex-col items-center justify-center gap-5 transition-opacity duration-700 ease-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-500">
        <picture>
          <source srcSet="/FINALUCHIlogo-preloader.webp" type="image/webp" />
          <img
            src="/FINALUCHIlogo-preloader.webp"
            alt="Finaluchi Couture"
            width={80}
            height={80}
            fetchPriority="high"
            decoding="async"
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_24px_rgba(255,255,255,0.22)]"
          />
        </picture>
        <span className="text-[10px] sm:text-[11px] font-mono-luxury tracking-[0.35em] text-[#C5A880] uppercase font-semibold text-center">
          FINALUCHI COUTURE
        </span>
        <div className="w-24 h-[1.5px] bg-white/15 overflow-hidden rounded-full mt-2">
          <div
            className="h-full bg-gradient-to-r from-transparent via-[#C5A880] to-white"
            style={{ animation: 'preloaderSlide 1.3s cubic-bezier(0.65, 0, 0.35, 1) infinite', width: '45%' }}
          />
        </div>
      </div>
      <style>{`
        @keyframes preloaderSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

