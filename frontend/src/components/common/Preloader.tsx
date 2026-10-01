import React, { useEffect, useState } from 'react';
import './Preloader.css';

export const Preloader: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (hidden) {
      return;
    }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let minimumElapsed = false;
    let pageReady = document.readyState === 'complete';
    let finishing = false;
    let hideTimer: number | undefined;

    const finish = () => {
      if (finishing) return;
      finishing = true;
      setLeaving(true);
      hideTimer = window.setTimeout(() => {
          setHidden(true);
      }, reducedMotion ? 0 : 650);
    };
    const onLoad = () => {
      pageReady = true;
      if (minimumElapsed) finish();
    };
    window.addEventListener('load', onLoad, { once: true });
    const minimumTimer = window.setTimeout(() => {
      minimumElapsed = true;
      if (pageReady) finish();
    }, reducedMotion ? 350 : 1100);
    // Slow media or a failed request must never leave the page covered.
    const maximumTimer = window.setTimeout(finish, 2400);

    return () => {
      window.removeEventListener('load', onLoad);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(maximumTimer);
      window.clearTimeout(hideTimer);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className={`flc-intro${leaving ? ' flc-intro--leaving' : ''}`} aria-hidden="true">
      <div className="flc-intro__curtain flc-intro__curtain--left" />
      <div className="flc-intro__curtain flc-intro__curtain--right" />
      <div className="flc-intro__frame" />
      <span className="flc-intro__location">Abuja, Nigeria</span>
      <div className="flc-intro__identity">
        <span className="flc-intro__eyebrow">Welcome to the maison</span>
        <div className="flc-intro__wordmark-mask">
          <span className="flc-intro__wordmark">FINALUCHI</span>
        </div>
        <span className="flc-intro__couture">Couture</span>
        <div className="flc-intro__thread"><span /></div>
        <span className="flc-intro__invitation">The art of being unforgettable.</span>
      </div>
      <div className="flc-intro__footer">
        <span>Couture & ready-to-wear</span>
        <span>Considered. Crafted. Yours.</span>
      </div>
    </div>
  );
};
