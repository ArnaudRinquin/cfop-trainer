import { useCallback, useEffect, useRef, useState } from 'react';
import { addSolve, getState, subscribe } from '~/lib/state';
import { generateScramble } from '~/lib/scramble';
import { formatMs } from '~/lib/format';

interface Strings {
  pressHold: string;
  holding: string;
  ready: string;
  solving: string;
  scrambleLabel: string;
  spaceHint: string;
  newScrambleHint: string;
  closeHint: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  strings: Strings;
}

type Phase = 'idle' | 'holding' | 'ready' | 'running';
const HOLD_TIME_MS = 500;

export default function Timer({ open, onClose, strings }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scramble, setScramble] = useState('');
  const [display, setDisplay] = useState('0.00');
  const [recent, setRecent] = useState<{ ms: number; dnf?: boolean }[]>([]);

  const holdStartRef = useRef(0);
  const runStartRef = useRef(0);
  const rafRef = useRef(0);
  const spaceDownRef = useRef(false);
  const phaseRef = useRef<Phase>('idle');

  // Keep phase in a ref so keyboard handlers see latest value without re-binding.
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Pull recent solves from state (subscribed) for the strip under the scramble.
  useEffect(() => {
    const refresh = () =>
      setRecent(getState().solves.slice(0, 5).map((s) => ({ ms: s.ms, dnf: s.dnf })));
    refresh();
    return subscribe(refresh);
  }, []);

  const newScramble = useCallback(() => {
    const len = getState().prefs.scrambleLength || 20;
    setScramble(generateScramble(len));
  }, []);

  const startRun = useCallback(() => {
    setPhase('running');
    runStartRef.current = performance.now();
    const tick = () => {
      setDisplay(formatMs(performance.now() - runStartRef.current));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopRun = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const ms = performance.now() - runStartRef.current;
    setDisplay(formatMs(ms));
    addSolve({ ms, scramble });
    newScramble();
    setPhase('idle');
    setDisplay('0.00');
  }, [scramble, newScramble]);

  // Wire keyboard handlers only when overlay is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (spaceDownRef.current) return;
        spaceDownRef.current = true;
        if (phaseRef.current === 'running') {
          stopRun();
          return;
        }
        if (phaseRef.current === 'idle') {
          holdStartRef.current = performance.now();
          setPhase('holding');
          window.setTimeout(() => {
            if (spaceDownRef.current && phaseRef.current === 'holding') {
              const held = performance.now() - holdStartRef.current;
              if (held >= HOLD_TIME_MS) setPhase('ready');
            }
          }, HOLD_TIME_MS + 5);
        }
      } else if (e.code === 'KeyN' && phaseRef.current === 'idle') {
        newScramble();
      } else if (
        e.code === 'Escape' &&
        phaseRef.current !== 'running' &&
        phaseRef.current !== 'holding'
      ) {
        onClose();
      } else if (phaseRef.current === 'running') {
        e.preventDefault();
        stopRun();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;
      e.preventDefault();
      if (!spaceDownRef.current) return;
      spaceDownRef.current = false;
      if (phaseRef.current === 'ready') startRun();
      else if (phaseRef.current === 'holding') setPhase('idle');
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [open, startRun, stopRun, newScramble, onClose]);

  // When opened, initialize phase + scramble.
  useEffect(() => {
    if (open) {
      setPhase('idle');
      setDisplay('0.00');
      newScramble();
    } else {
      cancelAnimationFrame(rafRef.current);
      spaceDownRef.current = false;
    }
  }, [open, newScramble]);

  if (!open) return null;

  const phaseLabel = {
    idle: strings.pressHold,
    holding: strings.holding,
    ready: strings.ready,
    running: strings.solving,
  }[phase];

  const phaseClass =
    phase === 'ready'
      ? 'timer-ready'
      : phase === 'running'
        ? 'timer-running'
        : phase === 'holding'
          ? 'timer-holding'
          : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 backdrop-blur-sm">
      <div className="text-center px-8 max-w-2xl">
        <div className="text-ink-400 font-mono uppercase tracking-[0.3em] text-xs mb-4">
          {phaseLabel}
        </div>
        <div
          className={`timer-display font-mono font-semibold tabular-nums text-7xl sm:text-9xl text-ink-50 tracking-tight ${phaseClass}`}
        >
          {display}
        </div>
        <div className="mt-8 font-mono text-ink-300 text-lg break-words">{scramble}</div>
        <div className="mt-2 text-ink-500 text-xs uppercase tracking-widest">
          {strings.scrambleLabel}
        </div>
        <div className="mt-10 text-ink-500 text-xs">
          <kbd className="px-1.5 py-0.5 bg-ink-800 rounded">Space</kbd> {strings.spaceHint} &middot;{' '}
          <kbd className="px-1.5 py-0.5 bg-ink-800 rounded">N</kbd> {strings.newScrambleHint} &middot;{' '}
          <kbd className="px-1.5 py-0.5 bg-ink-800 rounded">Esc</kbd> {strings.closeHint}
        </div>
        {recent.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 justify-center text-xs text-ink-400">
            {recent.map((s, i) => (
              <span key={i} className="chip">
                {s.dnf ? 'DNF' : formatMs(s.ms)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
