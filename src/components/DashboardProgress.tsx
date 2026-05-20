import { useEffect, useState } from 'react';
import { ao, getState, isLessonCompleted, subscribe } from '~/lib/state';

interface Props {
  totalLessons: number;
  allLessonIds: string[];
  labels: {
    yourProgress: string;
    lessonsSuffix: string;
    solves: string;
    ao5: string;
    noAo: string;
  };
}

export default function DashboardProgress({ totalLessons, allLessonIds, labels }: Props) {
  const [, force] = useState(0);
  useEffect(() => subscribe(() => force((n) => n + 1)), []);

  const done = allLessonIds.filter((id) => isLessonCompleted(id)).length;
  const pct = totalLessons ? Math.round((done / totalLessons) * 100) : 0;
  const solves = getState().solves.length;
  const a5 = ao(5);
  const heroAo5 =
    a5 == null ? labels.noAo : a5 === 'DNF' ? 'DNF' : (a5 / 1000).toFixed(2) + 's';

  return (
    <div className="card p-6 flex flex-col justify-between">
      <div>
        <div className="text-ink-400 text-xs uppercase tracking-widest">{labels.yourProgress}</div>
        <div className="mt-4 flex items-baseline gap-2">
          <div className="text-3xl font-display font-semibold text-ink-50">{done}</div>
          <div className="text-ink-400">
            / {totalLessons} {labels.lessonsSuffix}
          </div>
        </div>
        <div className="progress-track mt-3">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
        <div>
          <div className="text-ink-500 text-[10px] uppercase tracking-widest">{labels.solves}</div>
          <div className="font-mono text-ink-100 mt-1">{solves}</div>
        </div>
        <div>
          <div className="text-ink-500 text-[10px] uppercase tracking-widest">{labels.ao5}</div>
          <div className="font-mono text-ink-100 mt-1">{heroAo5}</div>
        </div>
      </div>
    </div>
  );
}
