// i18n facade. Reads the current locale from state.prefs.locale and resolves
// dotted-path keys against the active translation table.
import { getState, setPref } from './state.js';
import { STRINGS, SUPPORTED_LOCALES } from './i18n/strings.js';

const FALLBACK = 'en';

export function getLocale() {
  return getState().prefs.locale || FALLBACK;
}

export function setLocale(locale) {
  if (!STRINGS[locale]) return;
  setPref('locale', locale);
}

export function locales() {
  return SUPPORTED_LOCALES;
}

function lookup(table, path) {
  let cur = table;
  for (const seg of path.split('.')) {
    if (cur == null) return undefined;
    cur = cur[seg];
  }
  return cur;
}

function interpolate(str, params) {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (k in params ? String(params[k]) : `{${k}}`));
}

export function t(key, params) {
  const locale = getLocale();
  let value = lookup(STRINGS[locale], key);
  if (value == null) value = lookup(STRINGS[FALLBACK], key);
  if (value == null) return key;
  if (typeof value === 'string') return interpolate(value, params);
  return value;
}

// Inline translation cell — wrap field values that vary by locale.
// Usage: title: tr('Foundations', 'Bases')
export function tr(en, fr) {
  return { __i18n: true, en, fr };
}

// Walk a nested structure and resolve tr() cells to plain strings.
export function localize(node, locale = getLocale()) {
  if (node == null || typeof node !== 'object') return node;
  if (node.__i18n) return node[locale] ?? node.en;
  if (Array.isArray(node)) return node.map((n) => localize(n, locale));
  const out = {};
  for (const key in node) out[key] = localize(node[key], locale);
  return out;
}
