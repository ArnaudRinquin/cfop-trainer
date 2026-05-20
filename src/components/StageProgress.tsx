import { useEffect, useState } from 'react';
import { isLessonCompleted, subscribe } from '~/lib/state';

interface Props {
  lessonIds: string[];
}

export default function StageProgress({ lessonIds }: Props) {
  const [, force] = useState(0);
  useEffect(() => subscribe(() => force((n) => n + 1)), []);

  const done = lessonIds.filter((id) => isLessonCompleted(id)).length;
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
