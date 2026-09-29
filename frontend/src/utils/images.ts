import React from 'react';

// Branded stand-in shown while a product folder is still waiting for its
// real photos.
export const FALLBACK_IMAGE = '/FINALUCHIlogo-preloader.webp';

export const onImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  if (img.src.endsWith(FALLBACK_IMAGE)) return;
  img.src = FALLBACK_IMAGE;
};

// Responsive delivery: scripts/optimize-assets.mjs generates WebP siblings
// for every committed JPEG — <name>-480w.webp, <name>-640w.webp and a
// full-size <name>.webp capped at 1920px.
const IMAGE_EXTENSION = /\.(jpg|jpeg)$/i;

export const isCommittedPhoto = (url: string | undefined): boolean =>
  !!url && IMAGE_EXTENSION.test(url);

export const isVideoMedia = (url: string | undefined): boolean =>
  !!url && /\.(mp4|webm|mov|ogg|m4v)(\?.*)?$/i.test(url);

/** Full srcset for the generated WebP ladder. Undefined for non-photo URLs. */
export const buildWebPSrcSet = (url: string | undefined): string | undefined => {
  if (!isCommittedPhoto(url)) return undefined;
  const base = url!.replace(IMAGE_EXTENSION, '');
  return `${base}-480w.webp 480w, ${base}-640w.webp 640w, ${base}.webp 1000w`;
};

/** Single WebP sibling — pass a width for the 480w/640w thumbnail rungs. */
export const webpVariant = (url: string | undefined, width?: 480 | 640): string | undefined => {
  if (!isCommittedPhoto(url)) return url;
  return url!.replace(IMAGE_EXTENSION, `${width ? `-${width}w` : ''}.webp`);
};
