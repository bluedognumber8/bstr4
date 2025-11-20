"use client";

import { ThemeProvider } from "./ThemeProvider";
import { IntlProvider } from "./IntlProvider";
import { type Messages } from "next-intl";

export default function AppProviders({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
}) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ThemeProvider>{children}</ThemeProvider>
    </IntlProvider>
  );
}
