import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Timer, { type TimerStrings } from './Timer';

// The single timer instance for the page. Launch buttons dispatch
// `cfop:open-timer`; the overlay is portalled to <body> so no ancestor
// (e.g. the header's backdrop-filter) can become its containing block.
export default function TimerHost({ strings }: { strings: TimerStrings }) {
  const [open, setOpen] = useState(false);

  // Global 'T' hotkey when nothing is focused and no modal is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'KeyT' || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (document.body.dataset.modalOpen) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      )
        return;
      setOpen(true);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('cfop:open-timer', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('cfop:open-timer', onOpen);
    };
  }, []);

  if (typeof document === 'undefined') return null;
  return createPortal(<Timer open={open} onClose={() => setOpen(false)} strings={strings} />, document.body);
}
