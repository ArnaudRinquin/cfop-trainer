import { useEffect, useState } from 'react';
import { isLessonCompleted, subscribe } from '~/lib/state';

interface Props {
  lessonId: string;
  number: string;
}

export default function LessonCardStatus({ lessonId, number }: Props) {
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    setCompleted(isLessonCompleted(lessonId));
    return subscribe(() => setCompleted(isLessonCompleted(lessonId)));
  }, [lessonId]);

  return (
    <div
      className={`mt-0.5 w-7 h-7 rounded-full grid place-items-center text-[11px] font-mono shrink-0 ${
        completed ? 'bg-accent text-ink-950' : 'bg-ink-800 text-ink-300'
      }`}
    >
      {completed ? '✓' : number}
    </div>
  );
}
