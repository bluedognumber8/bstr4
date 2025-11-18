import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "fr"],

  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "always",
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  },
  //NEED TO ADJUST FOR EXISTING PATHS, THESE ARE EXAMPLES ONLY
  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be used for all locales
    "/": "/",
    "/blog": "/blog",

    // If locales use different paths, you can
    // specify the relevant external pathnames
    "/services": {
      fr: "/leistungen",
    },

    // Encoding of non-ASCII characters is handled
    // automatically where relevant
    "/about": {
      fr: "/über-uns",
    },

    // Dynamic params are supported via square brackets
    "/news/[articleSlug]": {
      fr: "/neuigkeiten/[articleSlug]",
    },

    // Static pathnames that overlap with dynamic segments
    // will be prioritized over the dynamic segment
    "/news/just-in": {
      fr: "/neuigkeiten/aktuell",
    },

    // Also (optional) catch-all segments are supported
    "/categories/[...slug]": {
      fr: "/kategorien/[...slug]",
    },
  },
});
