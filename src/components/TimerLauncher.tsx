import { useEffect, useState } from 'react';
import Timer from './Timer';

interface Strings {
  pressHold: string;
  holding: string;
  ready: string;
  solving: string;
  scrambleLabel: string;
  spaceHint: string;
  newScrambleHint: string;
  closeHint: string;
  timerButton: string;
}

interface Props {
  variant?: 'header' | 'hero' | 'inline';
  strings: Strings;
}

export default function TimerLauncher({ variant = 'header', strings }: Props) {
  const [open, setOpen] = useState(false);

  // Global 'T' hotkey when nothing is focused.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'KeyT') return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      )
        return;
      if (!open) setOpen(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Cross-component open via custom event.
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('cfop:open-timer', handler);
    return () => window.removeEventListener('cfop:open-timer', handler);
  }, []);

  const close = () => setOpen(false);

  const button =
    variant === 'header' ? (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-accent text-ink-950 font-medium text-sm px-3 py-1.5 rounded-md hover:bg-accent-hover transition-colors"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="13" r="8" />
          <path d="M5 3 2 6" />
          <path d="m22 6-3-3" />
          <path d="M6.38 18.7 4 21" />
          <path d="M17.64 18.67 20 21" />
          <path d="m9 13 3 2 2-3" />
        </svg>
        <span className="hidden sm:inline">{strings.timerButton}</span>
        <kbd className="hidden sm:inline ml-1 text-[10px] bg-ink-950/30 px-1 py-0.5 rounded font-mono">
          T
        </kbd>
      </button>
    ) : variant === 'hero' ? (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-ink-200 border border-white/10 px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
      >
        {strings.timerButton}
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-accent text-ink-950 font-medium px-3 py-1.5 rounded-md text-sm hover:bg-accent-hover"
      >
        + {strings.timerButton}
      </button>
    );

  return (
    <>
      {button}
      <Timer open={open} onClose={close} strings={strings} />
    </>
  );
}
