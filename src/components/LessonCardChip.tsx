import { useEffect, useState } from 'react';
import { isLessonCompleted, subscribe } from '~/lib/state';

interface Props {
  lessonId: string;
  label: string;
}

export default function LessonCardChip({ lessonId, label }: Props) {
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    setCompleted(isLessonCompleted(lessonId));
    return subscribe(() => setCompleted(isLessonCompleted(lessonId)));
  }, [lessonId]);

  if (!completed) return null;
  return <span className="chip chip-success">{label}</span>;
}
