// Helpers to load MDX lesson entries by locale + slug, mirroring the stages
// structure declared in src/data/stages.ts.
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Locale } from '~/i18n/config';
import { flatLessonSlugs } from '~/data/stages';

export type LessonEntry = CollectionEntry<'lessons'>;

export async function getLesson(locale: Locale, slug: string): Promise<LessonEntry | undefined> {
  return getEntry('lessons', `${locale}/${slug}`);
}

export async function getLessonsByLocale(locale: Locale): Promise<Map<string, LessonEntry>> {
  const all = await getCollection('lessons');
  const map = new Map<string, LessonEntry>();
  for (const entry of all) {
    const [entryLocale, ...rest] = entry.id.split('/');
    if (entryLocale !== locale) continue;
    map.set(rest.join('/'), entry);
  }
  return map;
}

// Flat ordered list of lesson slugs across all stages — useful for "next/prev".
export function getAllLessonSlugs(): string[] {
  return flatLessonSlugs();
}
