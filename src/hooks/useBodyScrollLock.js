import { useEffect } from 'react';

// Global reference count and original overflow preservation
let lockCount = 0;
let originalOverflow = '';

/**
 * Reference-counted body scroll lock.
 * Ensures stacked overlays (e.g. Photo Tour + Lightbox) lock once
 * and unlock only when the last overlay closes.
 * Handles React StrictMode's double-mounting cleanly.
 */
export function useBodyScrollLock(isActive) {
  useEffect(() => {
    if (!isActive) return;

    if (lockCount === 0) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = originalOverflow || '';
      }
    };
  }, [isActive]);
}
