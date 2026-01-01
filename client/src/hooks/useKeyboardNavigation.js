import { useEffect } from 'react';

/**
 * Custom hook for keyboard navigation
 * @param {Object} options - Configuration options
 * @param {Array} options.keys - Array of key configurations
 * @param {Function} options.onEscape - Function to call on Escape key
 * @param {boolean} options.enabled - Whether the hook is enabled
 */
export const useKeyboardNavigation = ({ keys = [], onEscape, enabled = true }) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      // Handle Escape key globally
      if (event.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      // Handle custom key bindings
      keys.forEach(({ key, ctrl = false, shift = false, alt = false, callback }) => {
        const isCtrl = ctrl ? event.ctrlKey : !event.ctrlKey;
        const isShift = shift ? event.shiftKey : !event.shiftKey;
        const isAlt = alt ? event.altKey : !event.altKey;

        if (event.key === key && isCtrl && isShift && isAlt) {
          event.preventDefault();
          callback(event);
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keys, onEscape, enabled]);
};

/**
 * Hook for focus management
 * @param {Array} selectors - Array of CSS selectors for focusable elements
 * @param {boolean} enabled - Whether the hook is enabled
 */
export const useFocusManagement = (selectors = ['button', 'a', 'input', 'select', 'textarea'], enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const focusableElements = selectors.join(', ');
    const elements = document.querySelectorAll(focusableElements);

    // Add tabindex to make elements focusable if they aren't already
    elements.forEach((element, index) => {
      if (!element.hasAttribute('tabindex') && !element.hasAttribute('disabled')) {
        element.setAttribute('tabindex', '0');
      }
    });

    // Trap focus within modal or container
    const trapFocus = (event) => {
      if (event.key !== 'Tab') return;

      const focusableInModal = Array.from(document.querySelectorAll(focusableElements))
        .filter(el => el.offsetParent !== null); // Only visible elements

      if (focusableInModal.length === 0) return;

      const firstElement = focusableInModal[0];
      const lastElement = focusableInModal[focusableInModal.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [selectors, enabled]);
};
