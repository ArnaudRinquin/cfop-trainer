// Stage definitions. Each stage owns an ordered list of lesson slugs.
// Stage titles + summaries are i18n; lesson titles/content live in MDX.
import { tr, localize, type Translatable, type Locale } from '~/i18n/config';

export type StageId = 'foundations' | 'cross' | 'f2l' | 'oll' | 'pll' | 'optimization';

interface RawStage {
  id: StageId;
  color: string;
  title: string | Translatable;
  summary: string | Translatable;
  lessons: string[]; // lesson slugs (match MDX filenames)
}

export interface Stage {
  id: StageId;
  color: string;
  title: string;
  summary: string;
  lessons: string[];
}

const RAW: RawStage[] = [
  {
    id: 'foundations',
    color: 'rgba(163, 230, 53, 0.7)',
    title: tr('Foundations', 'Bases'),
    summary: tr(
      'Learn the language of the cube before any algorithms.',
      'Apprenez le langage du cube avant tout algorithme.'
    ),
    lessons: ['notation', 'anatomy'],
  },
  {
    id: 'cross',
    color: 'rgba(59, 130, 246, 0.75)',
    title: tr('Cross', 'Croix'),
    summary: tr(
      'Solve the four edges of one face — efficiently.',
      'Résoudre les quatre arêtes d’une face — efficacement.'
    ),
    lessons: ['cross-intuitive', 'cross-planning'],
  },
  {
    id: 'f2l',
    color: 'rgba(34, 197, 94, 0.75)',
    title: 'F2L',
    summary: tr(
      'First Two Layers — pair and slot, 4 times.',
      'First Two Layers — apparier et insérer, 4 fois.'
    ),
    lessons: ['f2l-concept', 'f2l-basic', 'f2l-lookahead'],
  },
  {
    id: 'oll',
    color: 'rgba(250, 204, 21, 0.85)',
    title: 'OLL',
    summary: tr(
      'Orient the Last Layer — make the top face yellow.',
      'Orienter la dernière couche — rendre la face du dessus jaune.'
    ),
    lessons: ['oll-2look', 'oll-full'],
  },
  {
    id: 'pll',
    color: 'rgba(239, 68, 68, 0.8)',
    title: 'PLL',
    summary: tr(
      'Permute the Last Layer — finish the solve.',
      'Permuter la dernière couche — finir la résolution.'
    ),
    lessons: ['pll-2look', 'pll-full'],
  },
  {
    id: 'optimization',
    color: 'rgba(244, 114, 182, 0.7)',
    title: tr('Optimization', 'Optimisation'),
    summary: tr(
      'Go back, fix the cheap mistakes, unlock sub-20.',
      'Revenir en arrière, corriger les erreurs faciles, débloquer le sub-20.'
    ),
    lessons: ['cross-revisit', 'fingertricks', 'advanced-f2l'],
  },
];

export function getStages(locale: Locale): Stage[] {
  return localize(RAW, locale) as Stage[];
}

export function getStageByLessonSlug(slug: string, locale: Locale): Stage | undefined {
  return getStages(locale).find((s) => s.lessons.includes(slug));
}

// Returns total lesson count and flat ordered list of slugs.
export function flatLessonSlugs(): string[] {
  return RAW.flatMap((s) => s.lessons);
}
