import { useEffect, useState } from 'react';
import { isLessonCompleted, setLessonStatus, subscribe } from '~/lib/state';

interface Props {
  lessonId: string;
  markLabel: string;
  completedLabel: string;
}

export default function LessonCompleteButton({ lessonId, markLabel, completedLabel }: Props) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(isLessonCompleted(lessonId));
    return subscribe(() => setCompleted(isLessonCompleted(lessonId)));
  }, [lessonId]);

  return (
    <button
      type="button"
      onClick={() => setLessonStatus(lessonId, completed ? 'in_progress' : 'completed')}
      className={
        completed
          ? 'inline-flex items-center gap-2 border border-accent/40 bg-accent/10 text-accent px-4 py-2 rounded-md hover:bg-accent/20 transition-colors'
          : 'inline-flex items-center gap-2 bg-accent text-ink-950 font-medium px-4 py-2 rounded-md hover:bg-accent-hover transition-colors'
      }
    >
      {completed ? completedLabel : markLabel}
    </button>
  );
}
