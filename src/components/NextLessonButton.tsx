// Dashboard hero CTA: shows "Continue" or "Review lesson" depending on whether
// the next-up lesson is completed.
import { useEffect, useState } from 'react';
import { isLessonCompleted, subscribe } from '~/lib/state';

interface Props {
  lessonHref: string;
  continueLabel: string;
  reviewLabel: string;
  lessonId: string;
}

export default function NextLessonButton({
  lessonHref,
  continueLabel,
  reviewLabel,
  lessonId,
}: Props) {
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    setCompleted(isLessonCompleted(lessonId));
    return subscribe(() => setCompleted(isLessonCompleted(lessonId)));
  }, [lessonId]);

  return (
    <a
      href={lessonHref}
      className="inline-flex items-center gap-2 bg-accent text-ink-950 font-medium px-4 py-2 rounded-md hover:bg-accent-hover transition-colors"
    >
      {completed ? reviewLabel : continueLabel}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </a>
  );
}
