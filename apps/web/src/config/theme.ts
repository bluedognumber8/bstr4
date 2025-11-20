// src/config/theme.ts

// 1. Raw Numbers (Keep these for JS logic, like useWindowSize hooks)
export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
} as const;

// 2. Media Queries (For next-yak)
// ⚠️ MUST be static strings for the compiler to resolve them cross-file.
export const queries = {
  sm: "@media (min-width: 480px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  xxl: "@media (min-width: 1440px)",
} as const;

// 3. Z-Index Scale
export const zIndex = {
  hide: -1,
  base: 0,
  header: 100,
  overlay: 200,
  modal: 300,
  toast: 400,
  tooltip: 500,
} as const;

// 4. Layout Constants
export const layout = {
  headerHeight: "72px",
  maxWidth: "1280px",
} as const;
