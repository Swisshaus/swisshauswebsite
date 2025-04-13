'use client';

import * as React from 'react';
import { styled } from '@linaria/react';
import { useSpring, useTrail, animated } from 'react-spring';

import { ColorMode, SPRINGS } from '@/constants';
import { range, roundTo } from '@/utils';
import useSound from '@/hooks/use-sound';
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';

import {
  UserPreferencesContext,
  SetUserPreferencesContext,
} from '@/components/UserPreferencesProvider';
import { NavigationTrackerContext } from '@/components/NavigationTrackerProvider';

import IconWrapper from './IconWrapper';

interface Props {
  colorMode: ColorMode;
  size?: number;
  isBooped?: boolean;
  isTransitioning?: boolean;
  includeEnterAnimation: boolean;
  enterAnimationDelay?: number;
}

const SUN_RADIUS = 6;
const MOON_RADIUS = 9.5;

export function IconColorMode({
  colorMode,
  size = 20,
  isBooped,
  isTransitioning,
  includeEnterAnimation,
  enterAnimationDelay = 0,
}: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const id = React.useId().replace(/:/g, '');

  const isDark = colorMode === 'dark';

  const rotation = isDark ? (isBooped ? 28 : 40) : 90;

  const config = {
    tension: 160,
    friction: 30,
  };

  const svgSpring = useSpring({
    transform: `rotate(${rotation}deg)`,
    immediate: prefersReducedMotion,
    config: isTransitioning ? config : SPRINGS.springy,
  });
  const moonCutoutSpring = useSpring({
    cx: 12,
    cy: isDark ? 4 : -4,
    config,
    immediate: prefersReducedMotion,
  });
  const sunMoonSpring = useSpring({
    // prettier-ignore
    r: isDark
      ? MOON_RADIUS
      : isBooped
        ? SUN_RADIUS - 2
        : SUN_RADIUS,
    immediate: prefersReducedMotion,
    config:
      isBooped && !isTransitioning
        ? { tension: 300, friction: 20 }
        : config,
  });

  // The sun/moon is masked by a circle that is in the same spot, and very slightly larger (increased by 50% of the `stroke-width`). When we shift to Dark Mode, `moonCutoutSpring` causes a circle to move in, but we want to clip that circle when it's not above the sun, to create the final effect.
  // This is a bit lazy, and it won't work on a background that isn't `--color-background`; ideally, we would have a more sophisticated masking setup. I can always migrate if/when it becomes necessary.
  const sunMaskSpring = useSpring({
    r: isDark ? MOON_RADIUS + 1 : SUN_RADIUS + 1,
    immediate: prefersReducedMotion,
    config,
  });

  const numOfDots = 8;
  const sunDotAngles = range(numOfDots).map((_, index) => {
    return index * (360 / numOfDots);
  });

  const sunDotTrail = useTrail(sunDotAngles.length, {
    isVisible: isDark ? 0 : 1,
    transformOrigin: 'center center',
    immediate: isDark || prefersReducedMotion,
    config: {
      tension: 210,
      friction: 20,
    },
  });
  const sunDotSpring = useSpring({
    hypothenuse: isBooped ? 9 : 10,
    config: SPRINGS.springy,
  });

  return (
    <Svg
      width={size / 16 + 'rem'}
      height={size / 16 + 'rem'}
      viewBox="0 0 24 24"
      style={svgSpring}
    >
      {/* This mask stops the sun dots from showing inside the sun, as they scale up from the very center. */}
      <mask id={`sun-dot-mask-${id}`}>
        <rect x="-10" y="-10" width="44" height="44" fill="#FFF" />
        <circle r={SUN_RADIUS} cx="12" cy="12" fill="#000" />
      </mask>

      {/* The moon has a chunk removed. This mask removes that chunk */}
      <mask id={`moon-cutout-mask-${id}`}>
        <rect x="0" y="0" width="24" height="24" fill="#FFF" />
        <animated.circle {...moonCutoutSpring} r="8" fill="#000" />
      </mask>

      {/* The moon is given a crescent by another circle, above and to the right of the moon. This crescent should be trimmed to only show the content over the moon */}
      <mask id={`moon-crescent-mask-${id}`}>
        <rect x="0" y="0" width="24" height="24" fill="#000" />
        <animated.circle
          {...sunMaskSpring}
          cx="12"
          cy="12"
          fill="#FFF"
        />
      </mask>

      {/* Sun dots */}
      <g mask={`url(#sun-dot-mask-${id})`}>
        {sunDotTrail.map(({ isVisible, ...props }, index) => {
          const angle = sunDotAngles[index];
          const centerX = 12;
          const centerY = 12;

          const angleInRads = (angle / 180) * Math.PI;

          // Alright, this is kinda complicated.
          // `sunDotTrail` is an array of angles, going from 0 to 360 (exclusive). This creates a pleasing clockwise motion, which matches the exit animation of the moon.
          // For the INITIAL on-enter animation, however, it makes more sense for the dots to animate from the top. Rather than going clockwise or counter-clockwise, they cascade from top to bottom.
          // This array holds the angles that have been reordered to match this cascading flow. And we use that when calculating `--enter-animation-delay` below.
          const initialAnimationAngles = [
            180, 135, 225, 90, 270, 45, 315, 0,
          ];
          let indexInInitialArray =
            initialAnimationAngles.indexOf(angle);

          // The code above assumes we have 8 sun dots. If that changes in the future, we should fall back to a standard clockwise animation.
          if (sunDotAngles.length !== 8) {
            indexInInitialArray = index;
          }

          return (
            <SunDot
              key={angle}
              data-include-enter-animation={String(
                !!includeEnterAnimation
              )}
              cx={sunDotSpring.hypothenuse.to((c) =>
                roundTo(centerX + c * Math.cos(angleInRads), 4)
              )}
              cy={sunDotSpring.hypothenuse.to((c) =>
                roundTo(centerY + c * Math.sin(angleInRads), 4)
              )}
              r={1.5}
              fill="currentColor"
              style={{
                ...props,
                '--enter-animation-delay':
                  enterAnimationDelay +
                  indexInInitialArray * 40 +
                  'ms',
                transform: isVisible.to((val) => `scale(${val})`),
              }}
            />
          );
        })}
      </g>

      <g mask={`url(#moon-cutout-mask-${id})`}>
        <animated.circle
          cx="12"
          cy="12"
          stroke="currentColor"
          fill="none"
          {...sunMoonSpring}
        />
      </g>
      <g mask={`url(#moon-crescent-mask-${id})`}>
        {/* Moon crescent circle: */}
        <animated.circle
          {...moonCutoutSpring}
          r="8"
          stroke="currentColor"
          fill="none"
        />
      </g>
    </Svg>
  );
}

interface WrappedProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  size?: number;
  enterAnimationDelay?: number;
}

export function WrappedIconColorMode({
  size,
  enterAnimationDelay = 0,
  ...delegated
}: WrappedProps) {
  const { colorMode } = React.useContext(UserPreferencesContext);
  const { toggleColorMode } = React.useContext(
    SetUserPreferencesContext
  );

  // Certain springs use different configuration depending on whether we're transitioning from light/dark OR booping on hover. When the user changes from light/dark, we'll set `isTransitioning` to true, and then automatically flip it back to false after a short delay.
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const mostRecentNavigationFrom = React.useContext(
    NavigationTrackerContext
  );

  const [playOn] = useSound('/sounds/switch-on.mp3');
  const [playOff] = useSound('/sounds/switch-off.mp3');

  const timeoutId = React.useRef<number | undefined>();

  function onTrigger(event: React.MouseEvent<any>) {
    event.preventDefault();

    const isDark = colorMode === 'dark';

    toggleColorMode(isDark ? 'light' : 'dark');
    setIsTransitioning(true);

    if (isDark) {
      playOn();
    } else {
      playOff();
    }

    window.clearTimeout(timeoutId.current);
    timeoutId.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }

  return (
    <IconWrapper
      alt={
        colorMode === 'dark'
          ? 'Activate light mode'
          : 'Activate dark mode'
      }
      {...delegated}
      onClick={onTrigger}
    >
      {({ isBooped }) => (
        <IconColorMode
          colorMode={colorMode}
          size={size}
          isBooped={isBooped}
          isTransitioning={isTransitioning}
          includeEnterAnimation={!mostRecentNavigationFrom}
          enterAnimationDelay={enterAnimationDelay}
        />
      )}
    </IconWrapper>
  );
}

const Svg = styled(animated.svg)`
  position: relative;
  overflow: visible;
  stroke-width: 2px;
`;

const SunDot = styled(animated.circle)`
  &[data-include-enter-animation='true'] {
    animation: pop 500ms cubic-bezier(0.07, 0.7, 0.35, 1.35) backwards;
    animation-delay: var(--enter-animation-delay);

    @keyframes pop {
      from {
        transform: scale(0);
      }
    }
  }
`;

export default WrappedIconColorMode;
