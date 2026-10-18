// Timer launch button. The timer itself lives once per page in TimerHost.
interface Props {
  variant?: 'header' | 'hero' | 'inline';
  label: string;
}

export default function TimerLauncher({ variant = 'header', label }: Props) {
  const open = () => window.dispatchEvent(new CustomEvent('cfop:open-timer'));

  const button =
    variant === 'header' ? (
      <button
        type="button"
        onClick={open}
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
        <span className="hidden sm:inline">{label}</span>
        <kbd className="hidden sm:inline ml-1 text-[10px] bg-ink-950/30 px-1 py-0.5 rounded font-mono">
          T
        </kbd>
      </button>
    ) : variant === 'hero' ? (
      <button
        type="button"
        onClick={open}
        className="inline-flex items-center gap-2 text-ink-200 border border-white/10 px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
      >
        {label}
      </button>
    ) : (
      <button
        type="button"
        onClick={open}
        className="bg-accent text-ink-950 font-medium px-3 py-1.5 rounded-md text-sm hover:bg-accent-hover"
      >
        + {label}
      </button>
    );

  return button;
}
