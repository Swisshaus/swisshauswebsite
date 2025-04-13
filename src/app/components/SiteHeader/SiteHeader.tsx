'use client';

import * as React from 'react';
import { styled } from '@linaria/react';

import { HEADER_HEIGHT, USE_HAMBURGER_MENU_BELOW } from '@/constants';

import Logo from '@/components/Logo';
import IconColorMode from '@/components/Icons/IconColorMode';
import IconHamburger from '@/components/Icons/IconHamburger';

import DesktopNavigation from './DesktopNavigation';
import IconDrop from './IconDrop';

function SiteHeader({
  skipViewTransitions,
  includeLogoAnimation,
  dismissDropdownOnScroll,
  skipActions = [],
}: {
  skipViewTransitions?: boolean;
  includeLogoAnimation?: boolean;
  dismissDropdownOnScroll?: boolean;
  skipActions?: Array<string>;
}) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  return (
    <OuterWrapper>
      <Wrapper
        ref={wrapperRef}
        style={{
          viewTransitionName: skipViewTransitions
            ? undefined
            : 'site-header',
        }}
      >
        <StyledLogo animated={includeLogoAnimation} />

        <StyledDesktopNavigation
          containerRef={wrapperRef}
          dismissDropdownOnScroll={dismissDropdownOnScroll}
        />

        <Actions id="site-header-actions">
          
          {!skipActions.includes('color-toggle') && (
            <IconDrop>
              <IconColorMode enterAnimationDelay={200} />
            </IconDrop>
          )}
         
          <HamburgerWrapper>
            <IconHamburger />
          </HamburgerWrapper>
        </Actions>
      </Wrapper>
    </OuterWrapper>
  );
}

const OuterWrapper = styled.div`
  height: ${HEADER_HEIGHT}rem;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.header`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  height: 3rem;

  @media (max-width: 56.25rem) {
    gap: 2rem;
  }
  @media (max-width: 25rem) {
    gap: 1rem;
  }
`;

const StyledLogo = styled(Logo)`
  /*
    HACK: Normally I'd use baseline alignment to align the logo with the nav items. The problem is that the nav items disappear below a certain viewport size, and this causes the logo to snap to a new position. So we’ll fake it using translateY.
  */
  transform: translateY(-0.1875rem);
`;

const StyledDesktopNavigation = styled(DesktopNavigation)`
  @media (max-width: ${USE_HAMBURGER_MENU_BELOW}rem) {
    display: none;
  }
`;

const Actions = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-left: auto;

  @media (max-width: 22rem) {
    gap: 0.5rem;
  }
`;

const HamburgerWrapper = styled(IconDrop)`
  display: none;

  @media (max-width: ${USE_HAMBURGER_MENU_BELOW}rem) {
    display: flex;
  }
`;

export default SiteHeader;
