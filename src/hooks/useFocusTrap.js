import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Traps Tab and Shift+Tab focus inside containerRef while isActive is true.
 * Focuses initialFocusRef (or the first focusable element) on open,
 * and restores focus to previous active element on close.
 * If isPaused is true, Tab trap is temporarily suspended (for stacked overlays).
 * If onRestoreFocus is provided, it acts as a fallback when trigger element is unavailable.
 */
export function useFocusTrap(isActive, initialFocusRef, isPaused = false, onRestoreFocus = null) {
  const containerRef = useRef(null);
  const triggerElementRef = useRef(null);
  const isPausedRef = useRef(isPaused);
  const onRestoreFocusRef = useRef(onRestoreFocus);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    onRestoreFocusRef.current = onRestoreFocus;
  }, [onRestoreFocus]);

  useEffect(() => {
    if (!isActive) return;

    // Remember currently focused element to return focus on close
    triggerElementRef.current = document.activeElement;

    const container = containerRef.current;
    if (!container) return;

    // Focus initial focus element or first focusable child
    const focusTarget = () => {
      if (initialFocusRef && initialFocusRef.current) {
        initialFocusRef.current.focus();
        return;
      }
      const focusables = container.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusables.length > 0) {
        focusables[0].focus();
      }
    };

    // Small tick to ensure elements are mounted/rendered
    const timer = setTimeout(focusTarget, 0);

    const handleKeyDown = (e) => {
      if (isPausedRef.current) return;
      if (e.key !== 'Tab') return;

      const focusables = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = focusables[0];
      const lastElement = focusables[focusables.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement || !container.contains(document.activeElement)) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement || !container.contains(document.activeElement)) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      if (
        triggerElementRef.current &&
        typeof triggerElementRef.current.focus === 'function' &&
        triggerElementRef.current !== document.body &&
        document.contains(triggerElementRef.current)
      ) {
        triggerElementRef.current.focus();
      } else if (typeof onRestoreFocusRef.current === 'function') {
        onRestoreFocusRef.current();
      }
    };
  }, [isActive, initialFocusRef]);

  return containerRef;
}
