'use client';

import * as React from 'react';
import { styled } from '@linaria/react';

import { USE_HAMBURGER_MENU_BELOW } from '@/constants';
import { OMIT_OPTIONAL_ICONS_BREAKPOINT } from './SiteHeader.constants';
import useHasHydrated from '@/hooks/use-has-hydrated';

import { NavigationTrackerContext } from '@/components/NavigationTrackerProvider';

function IconDrop({
  isOptional = false,
  children,
  className,
  ...delegated
}: {
  isOptional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const mostRecentNavigationFrom = React.useContext(
    NavigationTrackerContext
  );
  const hasHydrated = useHasHydrated();

  const isFirstPageView = !mostRecentNavigationFrom;

  if (!hasHydrated && isFirstPageView) {
    return null;
  }

  if (isFirstPageView) {
    // Alright, so the thing here is that we want to show an enter animation *right after hydration*. This component also mounts when the user navigates using client-side navigation, but everything is already hydrated, and so I don't want to show the same enter animation over and over and over (esp. because it messes with View Transitions!)
    // And so, we will return `null` on the server-side render, but not on subsequent renders. We'll also render a different element.
    if (!hasHydrated) {
      return null;
    }

    return (
      <AnimatedWrapper
        data-is-optional={String(!!isOptional)}
        className={className}
        {...delegated}
      >
        {children}
      </AnimatedWrapper>
    );
  }

  return (
    <Wrapper
      data-is-optional={String(!!isOptional)}
      className={className}
      {...delegated}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media (max-width: ${OMIT_OPTIONAL_ICONS_BREAKPOINT}rem) {
    &[data-is-optional='true'] {
      display: none;
    }
  }
`;

const AnimatedWrapper = styled(Wrapper)`
  animation: dropIcon calc(500ms + var(--index) * 100ms)
    cubic-bezier(0.17, 0.67, 0.2, 1) both;
  animation-delay: calc(var(--index) * 100ms);

  &:nth-child(1) {
    --index: 1;
  }
  &:nth-child(2) {
    --index: 2;
  }
  &:nth-child(3) {
    --index: 3;
  }
  &:nth-child(4) {
    --index: 4;
  }
  &:nth-child(5) {
    --index: 5;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: revert;
  }

  /*
    On mobile devices, we only show icons 1, 3, and 5. We omit 2 (sound FX) and 4 (RSS). This means that as the user resizes the screen above mobile, these 2 icons pop in, and they have their standard drop-in animation, while the other icons are static.

    The simplest solution is to disable the animation on these sizes.
  */
  @media (max-width: ${USE_HAMBURGER_MENU_BELOW}rem) {
    animation: revert;
  }

  @keyframes dropIcon {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default React.memo(IconDrop);
