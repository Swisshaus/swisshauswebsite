export const OMIT_OPTIONAL_DESKTOP_LINKS_BREAKPOINT = 900 / 16;
export const OMIT_OPTIONAL_ICONS_BREAKPOINT = 480 / 16;

export const DROPDOWN_SLUGS = [
  'categories',
  'courses',
  'goodies',
] as const;

export type DropdownSlug = (typeof DROPDOWN_SLUGS)[number];
