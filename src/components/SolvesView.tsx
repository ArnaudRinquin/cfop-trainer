import { useEffect, useState } from 'react';
import { ao, bestSolve, deleteSolve, getState, subscribe, type Solve } from '~/lib/state';
import { formatMs } from '~/lib/format';

interface Strings {
  title: string;
  subtitle: string;
  empty: string;
  newSolveLabel: string;
  columns: { number: string; time: string; scramble: string; date: string };
  stats: { ao5: string; ao12: string; ao100: string; best: string; solves: string };
}

interface Props {
  strings: Strings;
  locale: string;
}

const fmt = (ms: number | 'DNF' | null) => {
  if (ms == null) return '—';
  if (ms === 'DNF') return 'DNF';
  return formatMs(ms);
};

export default function SolvesView({ strings, locale }: Props) {
  const [, force] = useState(0);
  useEffect(() => subscribe(() => force((n) => n + 1)), []);

  const { solves } = getState();
  const best = bestSolve();

  return (
    <div>
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink-50">
            {strings.title}
          </h1>
          <p className="text-ink-400 mt-1">{strings.subtitle}</p>
        </div>
        <button
          type="button"
          className="bg-accent text-ink-950 font-medium px-3 py-1.5 rounded-md text-sm hover:bg-accent-hover"
          onClick={() => window.dispatchEvent(new CustomEvent('cfop:open-timer'))}
        >
          {strings.newSolveLabel}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {[
          [strings.stats.solves, solves.length],
          [strings.stats.best, best ? fmt(best.ms) : '—'],
          [strings.stats.ao5, fmt(ao(5))],
          [strings.stats.ao12, fmt(ao(12))],
          [strings.stats.ao100, fmt(ao(100))],
        ].map(([label, value]) => (
          <div key={String(label)} className="card p-4">
            <div className="text-ink-500 text-[10px] uppercase tracking-widest">{label}</div>
            <div className="font-mono text-2xl text-ink-50 mt-1">{value ?? '—'}</div>
          </div>
        ))}
      </div>

      {solves.length === 0 ? (
        <div className="card p-12 text-center">
          <div
            className="text-ink-300 max-w-md mx-auto"
            dangerouslySetInnerHTML={{
              __html: strings.empty.replace(
                '{kbd}',
                '<kbd class="px-1.5 py-0.5 bg-ink-800 rounded mx-1">T</kbd>'
              ),
            }}
          />
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] text-ink-500 uppercase tracking-widest text-[10px]">
              <tr>
                <th className="text-left px-4 py-3 w-12">{strings.columns.number}</th>
                <th className="text-left px-4 py-3 w-24">{strings.columns.time}</th>
                <th className="text-left px-4 py-3">{strings.columns.scramble}</th>
                <th className="text-left px-4 py-3 w-32">{strings.columns.date}</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {solves.map((s: Solve, i: number) => (
                <tr key={s.ts} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-ink-500 font-mono text-xs">{solves.length - i}</td>
                  <td
                    className={`px-4 py-3 font-mono ${s.dnf ? 'text-red-400' : 'text-ink-100'}`}
                  >
                    {s.dnf ? 'DNF' : fmt(s.ms)}
                  </td>
                  <td className="px-4 py-3 font-mono text-ink-400 text-xs">
                    {s.scramble || ''}
                  </td>
                  <td className="px-4 py-3 text-ink-500 text-xs">
                    {new Date(s.ts).toLocaleString(locale)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => deleteSolve(s.ts)}
                      className="text-ink-500 hover:text-red-400 text-xs"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
