import { useEffect, useState } from 'react';
import type { Algorithm } from '~/data/algorithms';
import { getAlgStatus, setAlgStatus, subscribe } from '~/lib/state';

interface Props {
  alg: Algorithm;
  learningLabel: string;
  masteredLabel: string;
}

export default function AlgorithmCard({ alg, learningLabel, masteredLabel }: Props) {
  const [status, setStatus] = useState(() => getAlgStatus(alg.id));

  useEffect(() => {
    const unsub = subscribe(() => setStatus(getAlgStatus(alg.id)));
    setStatus(getAlgStatus(alg.id));
    return unsub;
  }, [alg.id]);

  const toggle = (set: 'learning' | 'mastered') => {
    setAlgStatus(alg.id, status === set ? null : set);
  };

  const mastered = status === 'mastered';

  return (
    <div className={`algo-card ${mastered ? 'mastered' : ''}`}>
      <div className="flex items-start gap-4">
        {alg.sticker ? (
          <div className="face-grid w-24 h-24 shrink-0">
            {alg.sticker.flatMap((row, ri) =>
              row.map((c, ci) => <div key={`${ri}-${ci}`} className={`cube-cell cube-${c}`} />)
            )}
          </div>
        ) : null}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <div className="font-display font-semibold text-ink-50">{alg.name}</div>
            <span className="chip">{alg.id}</span>
          </div>
          {alg.pattern ? <div className="text-ink-400 text-sm mt-1">{alg.pattern}</div> : null}
          {alg.note ? <div className="text-ink-500 text-xs mt-1 italic">{alg.note}</div> : null}
          <div className="mt-3 font-mono text-ink-50 bg-ink-900 px-3 py-2 rounded select-all break-words leading-relaxed text-sm">
            {alg.alg}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => toggle('learning')}
              className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                status === 'learning'
                  ? 'border-yellow-400/50 text-yellow-300 bg-yellow-400/10'
                  : 'border-white/10 text-ink-300 hover:bg-white/5'
              }`}
            >
              {learningLabel}
            </button>
            <button
              type="button"
              onClick={() => toggle('mastered')}
              className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                mastered
                  ? 'border-accent text-ink-950 bg-accent'
                  : 'border-white/10 text-ink-300 hover:bg-white/5'
              }`}
            >
              {masteredLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
