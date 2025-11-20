import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. pick locale (from guide)
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // 2. ➜  load messages (missing part)
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages, // <-- required
    timeZone: "UTC",
  };
});
