import { useEffect, useRef, useState } from 'react';
import type { Algorithm } from '~/data/algorithms';
import { invertMoves } from '~/lib/moves';
import TwistyCube, { type TwistyCubeHandle } from './TwistyCube';

interface Props {
  alg: Algorithm;
  onClose: () => void;
}

export default function AlgorithmModal({ alg, onClose }: Props) {
  const cubeRef = useRef<TwistyCubeHandle>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        cubeRef.current?.togglePlay();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        cubeRef.current?.stepForward();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        cubeRef.current?.stepBackward();
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  useEffect(() => {
    // Wire up playing-state subscription once the cube is mounted.
    let unsub: (() => void) | undefined;
    const id = window.setTimeout(() => {
      unsub = cubeRef.current?.onPlayingChange(setPlaying);
    }, 50);
    return () => {
      window.clearTimeout(id);
      unsub?.();
    };
  }, []);

  const setup = invertMoves(alg.alg);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-ink-900 border border-white/10 rounded-xl max-w-2xl w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-ink-400 hover:text-ink-100 text-xl leading-none w-8 h-8 flex items-center justify-center"
        >
          ×
        </button>

        <div className="flex items-baseline gap-2 flex-wrap mb-1 pr-8">
          <h2 className="font-display text-xl font-semibold text-ink-50">{alg.name}</h2>
          <span className="chip">{alg.id}</span>
        </div>
        {alg.pattern ? <div className="text-ink-400 text-sm mb-4">{alg.pattern}</div> : null}

        <div className="flex justify-center mb-4">
          <TwistyCube
            ref={cubeRef}
            setupAlg={setup}
            alg={alg.alg}
            visualization="3D"
            stickering="full"
            controls="none"
            size={360}
          />
        </div>

        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
          <button
            type="button"
            onClick={() => cubeRef.current?.jumpToStart()}
            className="px-3 py-1.5 text-sm rounded border border-white/10 text-ink-200 hover:bg-white/5"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => cubeRef.current?.stepBackward()}
            className="px-3 py-1.5 text-sm rounded border border-white/10 text-ink-200 hover:bg-white/5"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => cubeRef.current?.togglePlay()}
            className="px-4 py-1.5 text-sm rounded bg-accent text-ink-950 hover:bg-accent-hover font-medium min-w-[72px]"
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            onClick={() => cubeRef.current?.stepForward()}
            className="px-3 py-1.5 text-sm rounded border border-white/10 text-ink-200 hover:bg-white/5"
          >
            Next
          </button>
          <button
            type="button"
            onClick={() => cubeRef.current?.jumpToEnd()}
            className="px-3 py-1.5 text-sm rounded border border-white/10 text-ink-200 hover:bg-white/5"
          >
            End
          </button>
        </div>

        <div className="font-mono text-ink-50 bg-ink-950 px-3 py-2 rounded select-all break-words leading-relaxed text-sm">
          {alg.alg}
        </div>

        {alg.note ? <div className="text-ink-500 text-xs mt-3 italic">{alg.note}</div> : null}

        <div className="text-ink-500 text-[10px] mt-3 text-center">
          space play/pause · ← → step · esc close
        </div>
      </div>
    </div>
  );
}
