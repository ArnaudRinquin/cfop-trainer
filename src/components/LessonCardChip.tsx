import { isLessonCompleted } from '~/lib/state';
import { useAppState } from '~/lib/useAppState';

interface Props {
  lessonId: string;
  label: string;
}

export default function LessonCardChip({ lessonId, label }: Props) {
  const completed = isLessonCompleted(lessonId, useAppState());

  if (!completed) return null;
  return <span className="chip chip-success">{label}</span>;
}
