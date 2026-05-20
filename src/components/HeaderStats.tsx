import { useEffect, useState } from 'react';
import { ao, bestSolve, subscribe } from '~/lib/state';
import { formatAo, formatMs } from '~/lib/format';

interface Props {
  labels: { ao5: string; ao12: string; best: string };
}

export default function HeaderStats({ labels }: Props) {
  const [, force] = useState(0);
  useEffect(() => subscribe(() => force((n) => n + 1)), []);

  const a5 = ao(5);
  const a12 = ao(12);
  const best = bestSolve();

  return (
    <div className="hidden md:flex items-center gap-4 text-xs">
      <div className="text-right">
        <div className="text-ink-500 uppercase tracking-widest text-[10px]">{labels.ao5}</div>
        <div className="font-mono text-ink-100">{formatAo(a5)}</div>
      </div>
      <div className="text-right">
        <div className="text-ink-500 uppercase tracking-widest text-[10px]">{labels.ao12}</div>
        <div className="font-mono text-ink-100">{formatAo(a12)}</div>
      </div>
      <div className="text-right">
        <div className="text-ink-500 uppercase tracking-widest text-[10px]">{labels.best}</div>
        <div className="font-mono text-ink-100">{best ? formatMs(best.ms) : '—'}</div>
      </div>
    </div>
  );
}
