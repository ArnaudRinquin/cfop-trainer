import { useEffect, useState } from 'react';
import type { Algorithm } from '~/data/algorithms';
import type { CubeView } from '~/data/cube-configs';
import { invertMoves } from '~/lib/moves';
import { getAlgStatus, setAlgStatus, subscribe } from '~/lib/state';
import TwistyCube, { type StickeringKind, type VisualizationKind } from './TwistyCube';
import AlgorithmModal from './AlgorithmModal';

interface Props {
  alg: Algorithm;
  view: CubeView;
  learningLabel: string;
  masteredLabel: string;
}

function cubeOptions(view: CubeView): { stickering: StickeringKind; visualization: VisualizationKind; size: number } {
  switch (view) {
    case 'oll-edges':
      return { stickering: 'EOLL', visualization: 'experimental-2D-LL', size: 110 };
    case 'oll-corners':
      return { stickering: 'OCLL', visualization: 'experimental-2D-LL', size: 110 };
    case 'oll-full':
      return { stickering: 'OLL', visualization: 'experimental-2D-LL', size: 110 };
    case 'pll':
      return { stickering: 'PLL', visualization: 'experimental-2D-LL', size: 110 };
    case 'iso':
      return { stickering: 'F2L', visualization: '3D', size: 110 };
  }
}

export default function AlgorithmCard({ alg, view, learningLabel, masteredLabel }: Props) {
  const [status, setStatus] = useState(() => getAlgStatus(alg.id));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsub = subscribe(() => setStatus(getAlgStatus(alg.id)));
    setStatus(getAlgStatus(alg.id));
    return unsub;
  }, [alg.id]);

  const toggle = (set: 'learning' | 'mastered') => {
    setAlgStatus(alg.id, status === set ? null : set);
  };

  const mastered = status === 'mastered';
  const setup = invertMoves(alg.alg);
  const { stickering, visualization, size } = cubeOptions(view);

  return (
    <div className={`algo-card ${mastered ? 'mastered' : ''}`}>
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/40 hover:opacity-90 transition-opacity cursor-pointer"
          aria-label={`Play ${alg.name}`}
        >
          <TwistyCube
            setupAlg={setup}
            alg={alg.alg}
            stickering={stickering}
            visualization={visualization}
            size={size}
          />
        </button>
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
      {open ? <AlgorithmModal alg={alg} onClose={() => setOpen(false)} /> : null}
    </div>
  );
}
