export const BREAKPOINTS = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
} as const;

export const LAYOUT = {
  headerHeightMobile: 56,
  headerHeightDesktop: 72,
  contentWidth: 720,
  maxWidth: 1280,
} as const;

// Mobile-first hamburger menu
export const SHOW_HAMBURGER_BELOW = BREAKPOINTS.lg;
