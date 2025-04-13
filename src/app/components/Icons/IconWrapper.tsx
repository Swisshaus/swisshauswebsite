/*
  This component provides the clickable wrapper (either a button or link) that wraps around various icons.

  Getting TS working property was a fool’s errand, so I slapped a bunch of `any` here. When I get significantly better at TS, I should try and solve this properly. See my original attempt in `IconWrapper.abandoned.tsx`.
*/
'use client';

import React from 'react';
import { styled } from '@linaria/react';

import useBoopMinimal from '@/hooks/use-boop-minimal';

import VisuallyHidden from '@/components/VisuallyHidden';
import Link from '@/components/Link';

interface RenderData {
  isBooped: boolean;
}

type ChildlessAnchor = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'children'
>;

interface Props extends ChildlessAnchor {
  ref?: React.Ref<HTMLAnchorElement>;
  alt?: string;
  size?: number;
  boopOn?: 'hover' | 'click';
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement>) => void;
  prefetch?: boolean;
  href?: string;
  boopTiming?: number;
  children: (data: RenderData) => React.ReactNode;
}

function IconWrapper({
  ref,
  alt,
  size = 20,
  boopOn = 'hover',
  children,
  boopTiming,
  ...delegated
}: Props) {
  const [isEngaged, setIsEngaged] = React.useState(false);
  const isBooped = useBoopMinimal(isEngaged, boopTiming);

  const isLink = !!delegated.href;

  return (
    <Wrapper
      ref={ref}
      as={isLink ? Link : 'button'}
      {...delegated}
      onClick={(ev: any) => {
        delegated.onClick?.(ev);
      }}
      onMouseEnter={(ev: any) => {
        delegated.onMouseEnter?.(ev);

        if (boopOn === 'hover') {
          setIsEngaged(true);
        }
      }}
      onMouseLeave={(ev: any) => {
        delegated.onMouseLeave?.(ev);

        // Whether we’re engaging on hover or press, we should disengage if the mouse leaves this element.
        setIsEngaged(false);
      }}
      onMouseDown={(ev: any) => {
        delegated.onMouseDown?.(ev);

        if (boopOn === 'click') {
          setIsEngaged(true);
        }
      }}
      onMouseUp={(ev: any) => {
        delegated.onMouseUp?.(ev);

        if (boopOn === 'click') {
          setIsEngaged(false);
        }
      }}
      onTouchStart={(ev: any) => {
        delegated.onTouchStart?.(ev);

        if (boopOn === 'click') {
          setIsEngaged(true);
        }
      }}
      onTouchEnd={(ev: any) => {
        delegated.onTouchEnd?.(ev);

        if (boopOn === 'click') {
          setIsEngaged(false);
        }
      }}
    >
      {children({ isBooped })}
      {alt && <VisuallyHidden>{alt}</VisuallyHidden>}
    </Wrapper>
  );
}

const Wrapper = styled.a`
  position: relative;
  display: block;
  height: 32px;
  width: 32px;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  /* For focus outlines: */
  border-radius: 1000px;
  outline-offset: 2px;

  /* Increase tap target size */
  &::before {
    content: '';
    position: absolute;
    inset: -4px;
  }

  &:hover {
    color: var(--icon-hover-color, inherit);
  }
`;

export default IconWrapper;
