import { LOCALES, DEFAULT_LOCALE, type Locale } from './config';
import { createT } from './strings';

export { LOCALES, DEFAULT_LOCALE };
export type { Locale };

// Derive locale from the Astro URL pathname.
export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (LOCALES.includes(seg as Locale)) return seg as Locale;
  return DEFAULT_LOCALE;
}

// Build a URL for a given path in a target locale.
// - 'en' (default) gets no prefix; others get /<locale>/.
export function localePath(path: string, locale: Locale): string {
  const clean = path.replace(/^\/+/, '');
  if (locale === DEFAULT_LOCALE) return '/' + clean;
  return `/${locale}/${clean}`;
}

// Build the equivalent of the current path under a different locale.
export function switchLocale(pathname: string, targetLocale: Locale): string {
  const current = localeFromPath(pathname);
  let withoutLocale = pathname;
  if (current !== DEFAULT_LOCALE) {
    withoutLocale = pathname.replace(new RegExp(`^/${current}(/|$)`), '/');
  }
  if (targetLocale === DEFAULT_LOCALE) return withoutLocale || '/';
  return `/${targetLocale}${withoutLocale === '/' ? '/' : withoutLocale}`;
}

export { createT };
