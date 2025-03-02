"use server";

import { defaultLocale } from "@/libs/i18n/config";
import { type Locale } from "@/types/locale";
import { cookies } from "next/headers";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "RESTAURANT_LOCALE";

export async function getLocale() {
  const appCookies = await cookies();

  return (appCookies.get(COOKIE_NAME)?.value as Locale) || defaultLocale;
}

export async function setLocale(locale: Locale) {
  const appCookies = await cookies();
  appCookies.set(COOKIE_NAME, locale as string);
}
