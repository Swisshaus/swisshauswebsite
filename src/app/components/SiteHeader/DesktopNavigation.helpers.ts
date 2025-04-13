import * as React from 'react';

import { USE_HAMBURGER_MENU_BELOW } from '@/constants';
import { DropdownSlug } from './SiteHeader.constants';

export function useDismissOnEscape(
  handleDismissDropdown: () => void,
  {
    isOpen,
    dropdownSlugRef,
    triggersBySlug,
  }: {
    isOpen: boolean;
    dropdownSlugRef: React.RefObject<DropdownSlug>;
    triggersBySlug: Record<
      DropdownSlug,
      React.RefObject<HTMLButtonElement>
    >;
  }
) {
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleDismissDropdown();

        // Focus the trigger that opened the dropdown.
        if (dropdownSlugRef.current) {
          triggersBySlug[dropdownSlugRef.current].current?.focus();
        }
      }
    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [
    isOpen,
    handleDismissDropdown,
    dropdownSlugRef,
    triggersBySlug,
  ]);
}

export function useDismissOnScroll(
  handleDismissDropdown: () => void,
  {
    enabled,
    isOpen,
  }: {
    enabled: boolean;
    isOpen: boolean;
  }
) {
  React.useEffect(() => {
    if (!enabled || !isOpen) {
      return;
    }

    function handleScroll() {
      handleDismissDropdown();
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled, isOpen, handleDismissDropdown]);
}

export function useDismissOnResize(
  handleDismissDropdown: () => void,
  { isOpen }: { isOpen: boolean }
) {
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleResize() {
      if (window.innerWidth <= USE_HAMBURGER_MENU_BELOW * 16) {
        handleDismissDropdown();
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, handleDismissDropdown]);
}
