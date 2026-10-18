import { useCallback, useEffect, useRef, useState } from 'react';
import { addSolve, getState, setPenalty, setPrefs, subscribe, type Penalty } from '~/lib/state';
import { generateScramble } from '~/lib/scramble';
import { formatMs } from '~/lib/format';

export interface TimerStrings {
  pressHold: string;
  holding: string;
  ready: string;
  solving: string;
  inspecting: string;
  scrambleLabel: string;
  spaceHint: string;
  touchHint: string;
  newScrambleHint: string;
  closeHint: string;
  inspectionLabel: string;
  close: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  strings: TimerStrings;
}

type Phase = 'idle' | 'inspecting' | 'holding' | 'ready' | 'running';
const HOLD_TIME_MS = 500;
// WCA: starting after the inspection time is +2, more than 2s over is DNF.
const DNF_GRACE_MS = 2000;

export default function Timer({ open, onClose, strings }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scramble, setScramble] = useState('');
  const [display, setDisplay] = useState('0.00');
  const [recent, setRecent] = useState<{ ms: number; dnf?: boolean; plus2?: boolean }[]>([]);
  const [inspectionOn, setInspectionOn] = useState(() => getState().prefs.showInspection);
  const [lastPenalty, setLastPenalty] = useState<Penalty | undefined>(undefined);

  const holdStartRef = useRef(0);
  const runStartRef = useRef(0);
  const inspectStartRef = useRef(0);
  const rafRef = useRef(0);
  // Space/pointer physically down, and whether that press is a hold-to-start.
  const pressedRef = useRef(false);
  const holdActiveRef = useRef(false);
  const phaseRef = useRef<Phase>('idle');
  // Phase to return to when a hold is released too early.
  const holdFromRef = useRef<Phase>('idle');

  const go = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  // Pull recent solves from state (subscribed) for the strip under the scramble.
  useEffect(() => {
    const refresh = () => {
      const s = getState();
      setRecent(s.solves.slice(0, 5).map((x) => ({ ms: x.ms, dnf: x.dnf, plus2: x.plus2 })));
      setInspectionOn(s.prefs.showInspection);
    };
    refresh();
    return subscribe(refresh);
  }, []);

  const newScramble = useCallback(() => {
    const len = getState().prefs.scrambleLength || 20;
    setScramble(generateScramble(len));
  }, []);

  const inspectionMs = () => (getState().prefs.inspectionSeconds || 15) * 1000;

  const startInspection = useCallback(() => {
    go('inspecting');
    setLastPenalty(undefined);
    inspectStartRef.current = performance.now();
    const limit = inspectionMs();
    const tick = () => {
      const elapsed = performance.now() - inspectStartRef.current;
      setDisplay(
        elapsed < limit
          ? String(Math.ceil((limit - elapsed) / 1000))
          : elapsed < limit + DNF_GRACE_MS
            ? '+2'
            : 'DNF'
      );
      rafRef.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [go]);

  const startRun = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    go('running');
    setLastPenalty(undefined);
    runStartRef.current = performance.now();
    const tick = () => {
      setDisplay(formatMs(performance.now() - runStartRef.current));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [go]);

  const stopRun = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const now = performance.now();
    const ms = now - runStartRef.current;
    let penalty: Penalty = null;
    if (holdFromRef.current === 'inspecting') {
      const late = runStartRef.current - inspectStartRef.current - inspectionMs();
      if (late > DNF_GRACE_MS) penalty = 'dnf';
      else if (late > 0) penalty = 'plus2';
    }
    addSolve({ ms, scramble, plus2: penalty === 'plus2' || undefined, dnf: penalty === 'dnf' || undefined });
    // Keep the final time on screen until the next attempt.
    setDisplay(formatMs(ms));
    setLastPenalty(penalty);
    newScramble();
    go('idle');
  }, [scramble, newScramble, go]);

  // Press = space down or touch/pointer down on the timer pad.
  const press = useCallback(() => {
    if (pressedRef.current) return;
    pressedRef.current = true;
    const p = phaseRef.current;
    if (p === 'running') {
      stopRun();
      return;
    }
    if (p === 'idle' && inspectionOn) {
      // First press starts inspection; its release is ignored.
      startInspection();
      holdFromRef.current = 'inspecting';
      return;
    }
    if (p === 'idle' || p === 'inspecting') {
      holdActiveRef.current = true;
      holdFromRef.current = p;
      holdStartRef.current = performance.now();
      if (p === 'idle') cancelAnimationFrame(rafRef.current);
      go('holding');
      window.setTimeout(() => {
        if (holdActiveRef.current && phaseRef.current === 'holding') {
          if (performance.now() - holdStartRef.current >= HOLD_TIME_MS) go('ready');
        }
      }, HOLD_TIME_MS + 5);
    }
  }, [inspectionOn, stopRun, startInspection, go]);

  const release = useCallback(() => {
    pressedRef.current = false;
    if (!holdActiveRef.current) return;
    holdActiveRef.current = false;
    if (phaseRef.current === 'ready') startRun();
    else if (phaseRef.current === 'holding') {
      go(holdFromRef.current);
      if (holdFromRef.current === 'idle') setDisplay('0.00');
    }
  }, [startRun, go]);

  const cancel = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    pressedRef.current = false;
    holdActiveRef.current = false;
    holdFromRef.current = 'idle';
    setDisplay('0.00');
    go('idle');
  }, [go]);

  // Wire keyboard handlers only when overlay is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (e.repeat) return;
        press();
      } else if (phaseRef.current === 'running') {
        e.preventDefault();
        stopRun();
      } else if (e.code === 'Escape') {
        if (phaseRef.current === 'idle') onClose();
        else if (phaseRef.current === 'inspecting') cancel();
      } else if (e.code === 'KeyN' && phaseRef.current === 'idle' && !e.metaKey && !e.ctrlKey) {
        newScramble();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;
      e.preventDefault();
      release();
    };

    // Losing focus mid-hold would swallow the keyup.
    const onBlur = () => {
      if (phaseRef.current === 'holding' || phaseRef.current === 'ready') {
        go(holdFromRef.current);
        if (holdFromRef.current === 'idle') setDisplay('0.00');
      }
      pressedRef.current = false;
      holdActiveRef.current = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, [open, press, release, cancel, stopRun, newScramble, onClose, go]);

  // When opened, initialize phase + scramble; lock page scroll while open.
  useEffect(() => {
    if (open) {
      go('idle');
      setDisplay('0.00');
      setLastPenalty(undefined);
      newScramble();
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
    cancelAnimationFrame(rafRef.current);
    pressedRef.current = false;
    holdActiveRef.current = false;
  }, [open, newScramble, go]);

  if (!open) return null;

  const phaseLabel = {
    idle: strings.pressHold,
    inspecting: strings.inspecting,
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

  const idle = phase === 'idle';
  const togglePenalty = (p: Exclude<Penalty, null>) => {
    const next = lastPenalty === p ? null : p;
    setPenalty(0, next);
    setLastPenalty(next);
  };
  const smallBtn =
    'px-3 py-1.5 rounded-md border border-white/10 text-ink-300 hover:bg-white/5 text-xs';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 backdrop-blur-sm select-none"
      style={{ touchAction: 'none' }}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        e.preventDefault();
        press();
      }}
      onPointerUp={(e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        release();
      }}
      onPointerCancel={() => release()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {idle ? (
        <button
          type="button"
          onClick={onClose}
          aria-label={strings.close}
          className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center text-ink-400 hover:text-ink-100 text-2xl"
        >
          ×
        </button>
      ) : null}
      <div className="text-center px-6 max-w-2xl w-full">
        <div className="text-ink-400 font-mono uppercase tracking-[0.3em] text-xs mb-4">
          {phaseLabel}
        </div>
        <div
          className={`timer-display font-mono font-semibold tabular-nums text-7xl sm:text-9xl text-ink-50 tracking-tight ${phaseClass}`}
        >
          {display}
          {idle && lastPenalty === 'plus2' ? <span className="text-3xl sm:text-5xl"> +2</span> : null}
          {idle && lastPenalty === 'dnf' ? <span className="text-3xl sm:text-5xl text-red-400"> DNF</span> : null}
        </div>
        {idle && lastPenalty !== undefined ? (
          <div className="mt-4 flex gap-2 justify-center">
            <button type="button" className={smallBtn} aria-pressed={lastPenalty === 'plus2'} onClick={() => togglePenalty('plus2')}>
              +2
            </button>
            <button type="button" className={smallBtn} aria-pressed={lastPenalty === 'dnf'} onClick={() => togglePenalty('dnf')}>
              DNF
            </button>
          </div>
        ) : null}
        <div className="mt-8 font-mono text-ink-300 text-lg break-words">{scramble}</div>
        <div className="mt-2 text-ink-500 text-xs uppercase tracking-widest">
          {strings.scrambleLabel}
        </div>
        {idle ? (
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <button type="button" className={smallBtn} onClick={newScramble}>
              {strings.newScrambleHint}
            </button>
            <button
              type="button"
              className={smallBtn}
              aria-pressed={inspectionOn}
              onClick={() => setPrefs({ showInspection: !inspectionOn })}
            >
              {strings.inspectionLabel}: {inspectionOn ? 'on' : 'off'}
            </button>
          </div>
        ) : null}
        <div className="mt-8 text-ink-500 text-xs hidden sm:block">
          <kbd className="px-1.5 py-0.5 bg-ink-800 rounded">Space</kbd> {strings.spaceHint} &middot;{' '}
          <kbd className="px-1.5 py-0.5 bg-ink-800 rounded">N</kbd> {strings.newScrambleHint} &middot;{' '}
          <kbd className="px-1.5 py-0.5 bg-ink-800 rounded">Esc</kbd> {strings.closeHint}
        </div>
        <div className="mt-8 text-ink-500 text-xs sm:hidden">{strings.touchHint}</div>
        {recent.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2 justify-center text-xs text-ink-400">
            {recent.map((s, i) => (
              <span key={i} className="chip">
                {s.dnf ? 'DNF' : formatMs(s.ms + (s.plus2 ? 2000 : 0)) + (s.plus2 ? '+' : '')}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
