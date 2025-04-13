import { styled } from '@linaria/react';

import InPortal from '@/components/InPortal';
import Paper from '@/components/Paper';

import CategoryGrid from '@/components/NavigationContents/CategoryGrid';
import GoodiesGrid from '@/components/NavigationContents/GoodiesGrid';
import CoursesListDesktop from '@/components/NavigationContents/CoursesListDesktop';

import { DROPDOWN_SLUGS, DropdownSlug } from './SiteHeader.constants';
import NavigationTip from './NavigationTip';

interface Props {
  ref: React.RefObject<HTMLDivElement>;
  // It's possible for multiple SiteHeader instances to be on the page at once. Rather than rely on IDs, we instead pass a container ref, which’ll be used to ensure we hop between correct dropdowns when navigating by keyboard (doing the focus management stuff).
  containerRef: React.RefObject<HTMLDivElement>;
  dropdownSlug: DropdownSlug | null;
  travelingFromSlug: DropdownSlug | null;
  boxCollectionRef: React.MutableRefObject<
    Record<DropdownSlug, DOMRect | null>
  >;
  handleDismiss: () => void;
}

// The simplest solution is for each dropdown to have a fixed size. Specified in pixels here since we compare them against bounding boxes, but I'll set them in rems when I actually use them.
const DIMENSIONS_BY_SLUG = {
  categories: {
    width: 300,
    height: 127,
  },
  courses: {
    width: 290,
    height: 200,
  },
  goodies: {
    width: 400,
    height: 160,
  },
} as const;

function NavigationDropdown({
  ref,
  containerRef,
  dropdownSlug,
  travelingFromSlug,
  boxCollectionRef,
  handleDismiss,
}: Props) {
  const triggerBB = dropdownSlug
    ? boxCollectionRef.current[dropdownSlug]
    : null;

  if (!dropdownSlug || !triggerBB) {
    return;
  }

  const currentSize = DIMENSIONS_BY_SLUG[dropdownSlug];

  const top = triggerBB.top + triggerBB.height + 16;
  const triggerCenterX = triggerBB.left + triggerBB.width / 2;
  const offsetLeft = triggerCenterX - currentSize.width / 2;

  // We need to do a bit of manual focus management when the user is at the bounds of the dropdown. We want to create the illusion that the dropdown is right after the dropdown’s trigger, in the DOM order.
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key !== 'Tab' || !dropdownSlug) {
      return;
    }

    const parentElement = event.currentTarget;

    const allLinks = Array.from(
      parentElement.querySelectorAll('a, button')
    ) as Array<HTMLElement>;
    const firstLink = allLinks[0];
    const lastLink = allLinks.at(-1);

    const direction = event.shiftKey ? 'backwards' : 'forwards';

    let elementToFocus: HTMLButtonElement | HTMLAnchorElement | null =
      null;

    if (!containerRef.current) {
      return;
    }

    if (
      document.activeElement === lastLink &&
      direction === 'forwards'
    ) {
      const nextTriggerIndex =
        DROPDOWN_SLUGS.indexOf(dropdownSlug) + 1;
      const nextTriggerSlug = DROPDOWN_SLUGS[nextTriggerIndex];

      // When we’re at the last link in the dropdown, we want to focus the next dropdown trigger in the header. For example, tabbing out of the "Categories" dropdown should focus the "Courses" trigger.
      if (nextTriggerSlug) {
        elementToFocus = containerRef.current.querySelector(
          `[data-trigger-for-slug="${nextTriggerSlug}"]`
        ) as HTMLButtonElement;
      } else {
        // But what if we’re in the final dropdown, "Goodies"? Things get a bit tricky here. On large desktop screens, we display an optional 4th nav item (currently the "About Josh" link). If this exists, we’ll focus it.
        const finalNavItem = containerRef.current.querySelector(
          '[data-is-final-nav-item="true"]'
        );

        if (
          finalNavItem &&
          window.getComputedStyle(finalNavItem).display !== 'none'
        ) {
          const navLink = finalNavItem.querySelector('a');
          elementToFocus = navLink as HTMLAnchorElement;
        } else {
          // If the About link is hidden, we’ll instead skip to the first action in the right-hand-side of the header.
          elementToFocus = containerRef.current.querySelector(
            '#site-header-actions button'
          ) as HTMLButtonElement;
        }
      }
    } else if (
      document.activeElement === firstLink &&
      direction === 'backwards'
    ) {
      // If we’re going backwards, we want to focus the trigger that opened this very menu.
      elementToFocus = containerRef.current.querySelector(
        `[data-trigger-for-slug="${dropdownSlug}"]`
      ) as HTMLButtonElement;
    }

    if (elementToFocus) {
      event.preventDefault();

      // Since we’re moving focus outside the dropdown to some other element, it makes sense to dismiss the dropdown.
      handleDismiss();

      elementToFocus.focus();
    }
  }

  return (
    <InPortal>
      <OuterWrapper>
        <Wrapper
          ref={ref}
          style={{
            top,
            width: currentSize.width / 16 + 'rem',
            height: currentSize.height / 16 + 'rem',
            transform: `translateX(${offsetLeft}px)`,
          }}
        >
          <Page>
            <StyledTip travelingFromSlug={travelingFromSlug} />

            <ContentClipper>
              {DROPDOWN_SLUGS.map((slug) => (
                <ContentWrapper
                  key={slug}
                  inert={slug !== dropdownSlug}
                  data-content-for-slug={slug}
                  data-is-active={slug === dropdownSlug}
                  onKeyDown={handleKeyDown}
                  style={{
                    width:
                      DIMENSIONS_BY_SLUG[slug].width / 16 + 'rem',
                    height:
                      DIMENSIONS_BY_SLUG[slug].height / 16 + 'rem',
                    pointerEvents:
                      slug === dropdownSlug ? 'auto' : 'none',
                  }}
                >
                  {slug === 'categories' && <CategoryGrid />}
                  {slug === 'courses' && (
                    <CoursesListDesktop
                      isOpen={dropdownSlug === 'courses'}
                    />
                  )}
                  {slug === 'goodies' && (
                    <GoodiesGrid withShortNames includeNewsletter />
                  )}
                </ContentWrapper>
              ))}
            </ContentClipper>
          </Page>
        </Wrapper>
      </OuterWrapper>
    </InPortal>
  );
}

const OuterWrapper = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  view-transition-name: navigation-dropdown;
`;

// Weirdly in Chrome, linear() doesn't work if there's extra white-space :/
const LINEAR = `linear(0 0%, 0.0049 1.09%, 0.0199 2.27%, 0.0814 4.99%, 0.4635 16.59%, 0.5584 19.86%, 0.6394 23.07%, 0.7095 26.35%, 0.7696 29.74%, 0.8208 33.3%, 0.8637 37.08%, 0.902 41.52%, 0.9323 46.4%, 0.9557 51.88%, 0.973 58.14%, 0.9847 65.2%, 0.9924 73.79%, 0.9992 100%)
`;

const Wrapper = styled.div`
  --curve: cubic-bezier(0.51, 0.04, 0.19, 0.98);
  --curve: ${LINEAR};
  position: fixed;
  filter: drop-shadow(0px 1px 2px hsl(210deg 15% 6% / 0.1))
    drop-shadow(0px 2px 4px hsl(210deg 15% 6% / 0.1))
    drop-shadow(0px 8px 16px hsl(210deg 15% 6% / 0.1));
  pointer-events: auto;
  transition:
    width 666ms var(--curve),
    height 666ms var(--curve),
    transform 666ms var(--curve);

  @supports not (transition-timing-function: linear(0 0%, 1 100%)) {
    --curve: cubic-bezier(0.31, 0.15, 0.11, 0.99);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Page = styled(Paper)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: var(--color-background);
  animation: slideIn 550ms cubic-bezier(0.17, 0.67, 0.51, 1);

  @keyframes slideIn {
    from {
      transform: translateY(-8px);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const StyledTip = styled(NavigationTip)`
  position: absolute;
  left: 0;
  right: 0;
  top: -11.9px;
  margin-inline: auto;
  color: var(--color-adaptive-white);
`;

const ContentClipper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow: clip;
  border-radius: 8px;
  animation: fadeIn 200ms 100ms backwards;
`;

const ContentWrapper = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 250ms;

  &[data-is-active='true'] {
    opacity: 1;
    transition: opacity 400ms;
    transition-delay: 150ms;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export default NavigationDropdown;
