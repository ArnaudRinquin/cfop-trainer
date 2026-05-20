import { useEffect, useState } from 'react';
import type { Algorithm } from '~/data/algorithms';
import { getAlgStatus, subscribe } from '~/lib/state';
import AlgorithmCard from './AlgorithmCard';

interface Props {
  algs: Algorithm[];
  title: string;
  labels: {
    learning: string;
    mastered: string;
    masteredSuffix: string;
    learningSuffix: string;
    untouchedSuffix: string;
    algorithmsSuffix: string;
  };
}

export default function AlgorithmGroup({ algs, title, labels }: Props) {
  const [, force] = useState(0);
  useEffect(() => subscribe(() => force((n) => n + 1)), []);

  const total = algs.length;
  const mastered = algs.filter((a) => getAlgStatus(a.id) === 'mastered').length;
  const learning = algs.filter((a) => getAlgStatus(a.id) === 'learning').length;
  const pct = total ? Math.round((mastered / total) * 100) : 0;

  return (
    <>
      <div className="card p-5 mb-6 flex items-center gap-6 flex-wrap">
        <div>
          <div className="text-ink-500 text-xs uppercase tracking-widest">{title}</div>
          <div className="font-display text-xl text-ink-50 mt-1">
            {total} {labels.algorithmsSuffix}
          </div>
        </div>
        <div className="flex-1 min-w-[200px] max-w-md">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-xs text-ink-400 mt-2 flex gap-4">
            <span>
              <span className="text-accent">{mastered}</span> {labels.masteredSuffix}
            </span>
            <span>
              <span className="text-yellow-300">{learning}</span> {labels.learningSuffix}
            </span>
            <span>
              {total - mastered - learning} {labels.untouchedSuffix}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {algs.map((alg) => (
          <AlgorithmCard
            key={alg.id}
            alg={alg}
            learningLabel={labels.learning}
            masteredLabel={labels.mastered}
          />
        ))}
      </div>
    </>
  );
}
