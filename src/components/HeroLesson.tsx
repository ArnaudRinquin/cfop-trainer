// Dashboard hero: features the first lesson not yet completed (or the first
// lesson once everything is done).
import type { ReactNode } from 'react';
import { isLessonCompleted } from '~/lib/state';
import { useAppState } from '~/lib/useAppState';
import NextLessonButton from './NextLessonButton';

interface HeroLessonItem {
  slug: string;
  title: string;
  goal: string;
  href: string;
}

interface Props {
  lessons: HeroLessonItem[];
  continueLabel: string;
  reviewLabel: string;
  children?: ReactNode;
}

export default function HeroLesson({ lessons, continueLabel, reviewLabel, children }: Props) {
  const state = useAppState();
  const lesson = lessons.find((l) => !isLessonCompleted(l.slug, state)) ?? lessons[0];
  if (!lesson) return null;

  return (
    <>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink-50 mb-2 leading-tight">
        {lesson.title}
      </h1>
      <p className="text-ink-300 max-w-2xl">{lesson.goal}</p>
      <div className="flex flex-wrap gap-3 mt-6">
        <NextLessonButton
          lessonHref={lesson.href}
          lessonId={lesson.slug}
          continueLabel={continueLabel}
          reviewLabel={reviewLabel}
        />
        {children}
      </div>
    </>
  );
}
