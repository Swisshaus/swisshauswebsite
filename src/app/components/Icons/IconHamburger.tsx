'use client';

import React from 'react';
import { styled } from '@linaria/react';
import { useSpring, animated } from 'react-spring';

import {
  useGlobalUIState,
  useGlobalUIActions,
} from '@/components/GlobalUIProvider';
import VisuallyHidden from '@/components/VisuallyHidden';
import MobileMenu from '@/components/MobileMenu';

import IconWrapper from './IconWrapper';
import {
  IconStatus,
  VIEWBOX_SIZE,
  getFirstLineProps,
  getSecondLineProps,
  getThirdLineProps,
} from './IconHamburger.helpers';

interface Props extends React.HTMLAttributes<SVGElement> {
  size?: number;
  iconStatus: IconStatus;
  isBooped: boolean;
}

function IconHamburger({
  size = 20,
  iconStatus,
  isBooped,
  ...delegated
}: Props) {
  const sharedConfig = {
    tension: 300,
    friction: 16,
    clamp: iconStatus === 'opening' || iconStatus === 'closing',
  };

  const firstLineProps = useSpring({
    ...getFirstLineProps(iconStatus, isBooped),
    config: sharedConfig,
  });
  const secondLineProps = getSecondLineProps();
  const thirdLineProps = useSpring({
    ...getThirdLineProps(iconStatus, isBooped),
    config: sharedConfig,
  });

  const includePatty =
    iconStatus === 'closed' || iconStatus === 'opening';

  return (
    <>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={size / 16 + 'rem'}
        height={size / 16 + 'rem'}
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...delegated}
      >
        <animated.line {...firstLineProps} />
        <line
          {...secondLineProps}
          style={{
            opacity: includePatty ? 1 : 0,
          }}
        />
        <animated.line {...thirdLineProps} />
      </Svg>
      <VisuallyHidden>Toggle menu</VisuallyHidden>
    </>
  );
}

function WrappedIconHamburger(
  props: React.HTMLAttributes<HTMLAnchorElement>
) {
  const modalId = `modal-${React.useId().replace(/:/g, '')}`;
  const { toggleModal } = useGlobalUIActions();
  const { modals } = useGlobalUIState();

  const modalState = modals[modalId];
  const isOpen = modalState?.isOpen || false;

  const [isPressed, setIsPressed] = React.useState(false);

  // So: If the user taps REALLY quickly, it makes the animation a bit funky and asymmetrical, since the icon isn't fully flattened when it starts animating to the next state. To fix this, we'll enforce a minimum amount of time that we'll spend in the `pressed` state, and track it with refs.
  // HACK: This logic is duplicated in PressableButton, but I don't see a nice way to consolidate it.
  const pressedTimestamp = React.useRef<number | null>(null);
  const timeoutRef = React.useRef<number | null>(null);

  const handleToggle = React.useCallback(
    (forcedValue?: boolean) => {
      toggleModal(modalId, forcedValue);
      setIsPressed(false);
    },
    [modalId, toggleModal]
  );

  const iconStatus = isPressed
    ? isOpen
      ? 'closing'
      : 'opening'
    : isOpen
      ? 'open'
      : 'closed';

  const handleDismiss = React.useCallback(() => {
    if (!isOpen) {
      return;
    }

    // This function is called when hitting "Escape", and I want the animation to match clicking the close button. So we'll have a brief moment where the hamburger closes before the modal dismisses.
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setIsPressed(true);

    timeoutRef.current = window.setTimeout(() => {
      setIsPressed(false);
      handleToggle(false);
    }, 166.67);
  }, [isOpen, handleToggle]);

  // NOTE: I'm trying to figure out whether I want to do the same thing on dismiss (eg. by clicking escape) and on link click. Depending how this goes in production, I may want to add custom behaviour (eg. preventing default and manually visiting after 200ms or whatever).
  const handleClickLink = handleDismiss;

  return (
    <>
      <StyledIconWrapper
        {...props}
        style={{
          transform: isOpen ? 'scale(1.5)' : 'scale(1)',
        }}
        onPointerDown={() => {
          // Start the clock, measure when this event happened:
          pressedTimestamp.current = Date.now();

          setIsPressed(true);

          // If they tap REALLY QUICKLY, they might re-open it before the `closed` timeout even fires. Interrupt this scheduled timeout by cancelling it.
          if (typeof timeoutRef.current === 'number') {
            window.clearTimeout(timeoutRef.current);
          }
        }}
        onClick={() => {
          // As mentioned above, there's a minimum amount of time that we'll spend in the `opening`/`closing` state. We’ll measure the amount of time here, and postpone this event if not enough time has passed.
          const MIN_TIME = Math.ceil(16.66666 * 7);

          const remainingTime = pressedTimestamp.current
            ? MIN_TIME - (Date.now() - pressedTimestamp.current)
            : 0;

          if (remainingTime <= 0) {
            handleToggle();
            return;
          }

          timeoutRef.current = window.setTimeout(() => {
            handleToggle();
            timeoutRef.current = null;
          }, remainingTime);
        }}
        onPointerLeave={() => {
          setIsPressed(false);
        }}
      >
        {({ isBooped }) => (
          <IconHamburger
            iconStatus={iconStatus}
            isBooped={isBooped}
          />
        )}
      </StyledIconWrapper>

      <MobileMenu
        isOpen={isOpen}
        handleDismiss={handleDismiss}
        handleClickLink={handleClickLink}
      />
    </>
  );
}

const StyledIconWrapper = styled(IconWrapper)`
  transition: transform 400ms;
  will-change: transform;
`;

const Svg = styled.svg`
  stroke: currentColor;
  display: block;
  overflow: visible;
`;

export default React.memo(WrappedIconHamburger);
