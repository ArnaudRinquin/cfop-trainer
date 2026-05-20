export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_META: Record<Locale, { label: string; short: string }> = {
  en: { label: 'English', short: 'EN' },
  fr: { label: 'Français', short: 'FR' },
};

// Translatable cell.
export interface Translatable {
  __i18n: true;
  en: string;
  fr: string;
}

export function tr(en: string, fr: string): Translatable {
  return { __i18n: true, en, fr };
}

export function isTranslatable(v: unknown): v is Translatable {
  return typeof v === 'object' && v !== null && (v as { __i18n?: boolean }).__i18n === true;
}

// Resolve tr() cells recursively for a given locale.
export function localize<T>(node: T, locale: Locale): T {
  if (node == null || typeof node !== 'object') return node;
  if (isTranslatable(node)) return (node[locale] ?? node.en) as unknown as T;
  if (Array.isArray(node)) return node.map((n) => localize(n, locale)) as unknown as T;
  const out: Record<string, unknown> = {};
  for (const key in node) out[key] = localize((node as Record<string, unknown>)[key], locale);
  return out as T;
}
