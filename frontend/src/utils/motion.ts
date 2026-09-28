// Motion preference helpers — JS-driven scrolling must honor the same
// prefers-reduced-motion setting the CSS layer does.

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};

export const scrollToElement = (id: string): void => {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};
