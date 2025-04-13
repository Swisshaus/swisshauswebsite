'use client';

import * as React from 'react';
import { styled } from '@linaria/react';
import Link from 'next/link';
import { useViewTransition } from 'use-view-transitions/react';

import useSound from '@/hooks/use-sound';
import useBoundingBox from '@/hooks/use-bounding-box';
import useOnClickOutside from '@/hooks/use-on-click-outside';

import {
  OMIT_OPTIONAL_DESKTOP_LINKS_BREAKPOINT,
  DROPDOWN_SLUGS,
  DropdownSlug,
} from './SiteHeader.constants';
import {
  useDismissOnEscape,
  useDismissOnScroll,
  useDismissOnResize,
} from './DesktopNavigation.helpers';
import NavigationDropdown from './NavigationDropdown';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  dismissDropdownOnScroll?: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

function DesktopNavigation({
  dismissDropdownOnScroll,
  containerRef,
  ...delegated
}: Props) {
  const [dropdownSlug, setDropdownSlug] =
    React.useState<DropdownSlug | null>(null);
  const [travelingFromSlug, setTravelingFromSlug] =
    React.useState<DropdownSlug | null>(null);

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const navigationListRef = React.useRef<HTMLUListElement>(null);

  const dropdownSlugRef = React.useRef<DropdownSlug | null>(null);
  dropdownSlugRef.current = dropdownSlug;

  const catTriggerRef = React.useRef<HTMLButtonElement>(null);
  const coursesTriggerRef = React.useRef<HTMLButtonElement>(null);
  const goodiesTriggerRef = React.useRef<HTMLButtonElement>(null);

  const triggersBySlug = React.useMemo(
    () => ({
      categories: catTriggerRef,
      courses: coursesTriggerRef,
      goodies: goodiesTriggerRef,
    }),
    []
  );

  const catTriggerBB = useBoundingBox(catTriggerRef);
  const coursesTriggerBB = useBoundingBox(coursesTriggerRef);
  const goodiesTriggerBB = useBoundingBox(goodiesTriggerRef);

  const boxCollectionRef = React.useRef({
    categories: catTriggerBB,
    courses: coursesTriggerBB,
    goodies: goodiesTriggerBB,
  });

  boxCollectionRef.current = {
    categories: catTriggerBB,
    courses: coursesTriggerBB,
    goodies: goodiesTriggerBB,
  };

  const [playMenuOpen] = useSound('/sounds/menu-open-softer.mp3', {
    volume: 0.6,
  });
  const [playMenuClose] = useSound('/sounds/menu-close.mp3', {
    volume: 0.6,
  });

  const [, startTransition] = React.useTransition();

  const { startViewTransition } = useViewTransition();
  // Annoyingly, `use-view-transitions` doesn’t wrap this `startViewTransition` function in useCallback, so it gets recreated on every render. Wrap it in a ref.
  const startViewTransitionRef = React.useRef(startViewTransition);
  startViewTransitionRef.current = startViewTransition;

  const handleSelectDropdown = React.useCallback(
    (dropdownSlug: DropdownSlug) => {
      setDropdownSlug(dropdownSlug);
      setTravelingFromSlug(dropdownSlugRef.current);
    },
    []
  );
  const handleDismissDropdown = React.useCallback(() => {
    startViewTransitionRef.current(() =>
      startTransition(() => {
        setDropdownSlug(null);
        setTravelingFromSlug(null);
      })
    );
  }, []);
  const handleDismissDropdownImmediately = React.useCallback(() => {
    setDropdownSlug(null);
    setTravelingFromSlug(null);
  }, []);

  useOnClickOutside(dropdownRef, handleDismissDropdown, {
    triggerRef: navigationListRef,
    rebindDependency: dropdownSlug,
  });

  useDismissOnEscape(handleDismissDropdown, {
    isOpen: !!dropdownSlug,
    dropdownSlugRef,
    triggersBySlug,
  });

  // `dismissDropdownOnScroll` is set on the homepage, where the navigation is sticky (so, it moves) and goes behind a cloud. Feels awkward to leave the menu open, so we’ll dismiss on scroll.
  // Skipping View Transitions exit animation because it causes the header to quickly jump in front of the cloud. Could fix this by giving the cloud a view-transition-name, but whatever, this is easier.
  useDismissOnScroll(handleDismissDropdownImmediately, {
    enabled: !!dismissDropdownOnScroll,
    isOpen: !!dropdownSlug,
  });

  // If the user resizes the screen while a dropdown is open, and the screen shrinks below the "hamburger menu" breakpoint, we want to immediately hide the dropdown. Ideally this would use the View Transitions exit animation, but I get a weird warning about invalid state. This is fine.
  useDismissOnResize(handleDismissDropdownImmediately, {
    isOpen: !!dropdownSlug,
  });

  // The dropdown exists in a portal at the bottom of the DOM, but we want to pretend that it exists between triggers, so that tab can move between the trigger and the dropdown.
  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>
  ) {
    if (event.key !== 'Tab' || !dropdownRef.current) {
      return;
    }

    if (event.shiftKey) {
      // Shift + Tab goes backwards, and we don't want to manage anything when it comes to backwards navigation.
      return;
    }

    const triggerForSlug = event.currentTarget.getAttribute(
      'data-trigger-for-slug'
    ) as DropdownSlug;

    // If this button’s dropdown isn't the one open, we don't have to do anything special.
    if (triggerForSlug !== dropdownSlug) {
      return;
    }

    const relevantContent = dropdownRef.current.querySelector(
      `[data-content-for-slug="${dropdownSlug}"]`
    );
    const firstLink = relevantContent?.querySelector('a');

    if (firstLink) {
      event.preventDefault();
      firstLink.focus();
    }
  }

  return (
    <Wrapper {...delegated}>
      <NavigationList ref={navigationListRef}>
        {DROPDOWN_SLUGS.map((slug) => (
          <ListItem key={slug}>
            <NavButton
              ref={triggersBySlug[slug]}
              data-trigger-for-slug={slug}
              onClick={() => {
                if (slug === dropdownSlug) {
                  handleDismissDropdown();
                  playMenuClose();
                } else {
                  handleSelectDropdown(slug);
                  playMenuOpen();
                }
              }}
              onKeyDown={handleKeyDown}
            >
              {slug}
            </NavButton>
          </ListItem>
        ))}
        {/*
          The /about-josh page isn't critical, so we'll hide it on smaller screens.
        */}
        <OptionalListItem data-is-final-nav-item="true">
          <NavButton
            as={Link}
            // TypeScript doesn't know how the `as` prop works, and I don't know how to convince it.
            // @ts-ignore
            href="/about-josh"
          >
            About
          </NavButton>
        </OptionalListItem>
      </NavigationList>

      <NavigationDropdown
        ref={dropdownRef}
        containerRef={containerRef}
        dropdownSlug={dropdownSlug}
        travelingFromSlug={travelingFromSlug}
        boxCollectionRef={boxCollectionRef}
        handleDismiss={handleDismissDropdown}
      />
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  position: relative;
`;

const NavigationList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 3rem;
  color: var(--color-text);
  font-weight: var(--font-weight-light);
  font-size: 1rem;
  text-decoration: none;
  text-transform: capitalize;
  padding: 0 1rem;
`;

const ListItem = styled.li`
  position: relative;
`;

const OptionalListItem = styled(ListItem)`
  @media (max-width: ${OMIT_OPTIONAL_DESKTOP_LINKS_BREAKPOINT}rem) {
    display: none;
  }
`;

export default DesktopNavigation;
