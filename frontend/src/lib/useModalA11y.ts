import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalA11yOptions {
  /** Called when the user presses Escape. Omit for non-dismissable overlays. */
  onClose?: () => void;
  /** Effect runs only while true. Defaults to true for mount/unmount modals. */
  isOpen?: boolean;
}

/**
 * Shared overlay behavior for the site's custom modals and drawers:
 * body scroll lock, Escape to close, focus moved into the panel on open,
 * focus restored to the trigger on close, and Tab cycling kept inside
 * the panel while it is open.
 */
export function useModalA11y<T extends HTMLElement = HTMLDivElement>({
  onClose,
  isOpen = true,
}: ModalA11yOptions = {}) {
  // Keep the latest close callback without re-running the effect — inline
  // arrow callbacks would otherwise reset focus on every render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const panelRef = useRef<T>(null);

  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const previousActive = document.activeElement as HTMLElement | null;
    const initialFocus =
      panel.querySelector<HTMLElement>('[data-autofocus]') ??
      panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    (initialFocus ?? panel).focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current?.();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter(
        (el) =>
          el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (active === first || !active || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (!active || !panel.contains(active) || active === last)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
      previousActive?.focus?.();
    };
  }, [isOpen]);

  return panelRef;
}
