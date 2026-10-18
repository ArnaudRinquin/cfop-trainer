import { isLessonCompleted } from '~/lib/state';
import { useAppState } from '~/lib/useAppState';

interface Props {
  lessonIds: string[];
}

export default function StageProgress({ lessonIds }: Props) {
  const state = useAppState();

  const done = lessonIds.filter((id) => isLessonCompleted(id, state)).length;
  const total = lessonIds.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div>
      <div className="text-ink-500 text-xs font-mono text-right">
        {done}/{total}
      </div>
      <div className="progress-track mt-3 max-w-md">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
