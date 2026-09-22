import React from 'react';

// Branded stand-in shown while a product folder is still waiting for its
// real photos (see public/images/products/<slug>/README.txt).
export const FALLBACK_IMAGE = '/FINALUCHIlogo-preloader.webp';

export const onImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  if (img.src.endsWith(FALLBACK_IMAGE)) return;
  img.src = FALLBACK_IMAGE;
};
