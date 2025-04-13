// Copied from `/components/Tip`. Seems easier to make a copy than to have Tip adapt to this use case.
import React from 'react';
import { styled } from '@linaria/react';
import { useSpring, animated } from 'react-spring';

import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion';

interface Props extends React.HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  travelingFromSlug: string | null;
}

function NavigationTip({
  width = 32,
  height = 12,
  travelingFromSlug,
  ...delegated
}: Props) {
  // If the user prefers reduced motion, the tip is always erect.
  // We need `prefersReducedMotion` to initialize to the correct value, and this is safe since the navigation dropdown is always closed during the initial SSR.
  const prefersReducedMotion = usePrefersReducedMotion({
    clientOnly: true,
  });

  const [isErect, setIsErect] = React.useState<boolean>(
    prefersReducedMotion
  );
  const [applyViewTransitionName, setApplyViewTransitionName] =
    React.useState(false);

  // This is similar to a boop effect; when `travelingFromSlug` changes, we change `isErect` to `false`, but only for a brief period before flipping it back. That way, the tip appears to oscillate.
  React.useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (travelingFromSlug) {
      setIsErect(false);

      const timeoutId = window.setTimeout(() => {
        setIsErect(true);
      }, 150);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }
  }, [travelingFromSlug, prefersReducedMotion]);

  // On mount, we have a similar animation. We delay it a bit since the dropdown fades in and we don't want this animation to finish before it's even fully visible.
  React.useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let timeoutId = window.setTimeout(() => {
      setIsErect(true);

      // Wait another little bit, and then apply the view-transition-name.
      timeoutId = window.setTimeout(() => {
        setApplyViewTransitionName(true);
      }, 600);
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  const spring = useSpring({
    d: getPath(width, height, isErect),
    config: {
      tension: 300,
      friction: 18,
    },
  });

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox={`0 0 ${width} ${height}`}
      style={{
        viewTransitionName: applyViewTransitionName
          ? 'navigation-tip'
          : undefined,
      }}
      {...delegated}
    >
      <animated.path {...spring} />
    </Svg>
  );
}

const getPath = (width: number, height: number, isErect: boolean) => {
  const pointyFactor = width * 0.2;

  return `
    M 0 ${height}
    C ${isErect ? width * 0.25 : 0} ${height}
      ${width / 2 - pointyFactor} ${isErect ? 0 : height * 0.5}
      ${width / 2} ${isErect ? 0 : height * 0.5}
    C ${width / 2 + pointyFactor} ${isErect ? 0 : height * 0.5}
      ${isErect ? width * 0.75 : width} ${height}
      ${width} ${height}
    Z`;
};

const Svg = styled.svg`
  display: block;
  overflow: visible;
  transform-origin: 50% 100%;
  will-change: transform;

  path {
    fill: currentColor;
    stroke: none;
  }
`;

export default NavigationTip;
