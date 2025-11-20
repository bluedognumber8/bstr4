"use client";

import { ThemeProvider } from "./ThemeProvider";
import { IntlProvider } from "./IntlProvider";
import { type Messages } from "next-intl";
import { AuthProvider } from "./AuthProvider";
import { ToastProvider } from "./ToastProvider";

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
      <ThemeProvider>
        <AuthProvider>
          {children}
          <ToastProvider />
        </AuthProvider>
      </ThemeProvider>
    </IntlProvider>
  );
}
