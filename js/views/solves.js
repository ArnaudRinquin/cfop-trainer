import { html, raw } from './shared.js';
import { getState, ao, bestSolve } from '../state.js';
import { formatMs } from '../timer.js';
import { t } from '../i18n.js';

function fmt(ms) {
  if (ms == null) return '—';
  if (ms === 'DNF') return 'DNF';
  return formatMs(ms);
}

export function solvesView() {
  const { solves } = getState();
  const a5 = ao(5);
  const a12 = ao(12);
  const a100 = ao(100);
  const best = bestSolve();

  return html`
    <div class="flex items-baseline justify-between mb-8">
      <div>
        <h1 class="font-display text-3xl sm:text-4xl font-semibold text-ink-50">${t('solves.title')}</h1>
        <p class="text-ink-400 mt-1">${t('solves.subtitle')}</p>
      </div>
      <button id="open-timer-solves" class="bg-accent text-ink-950 font-medium px-3 py-1.5 rounded-md text-sm hover:bg-accent-hover">${t('buttons.newSolve')}</button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
      ${[
        [t('stats.solves'), solves.length],
        [t('stats.best'), best ? fmt(best.ms) : '—'],
        [t('stats.ao5'), fmt(a5)],
        [t('stats.ao12'), fmt(a12)],
        [t('stats.ao100'), fmt(a100)],
      ].map(
        ([label, value]) => html`
          <div class="card p-4">
            <div class="text-ink-500 text-[10px] uppercase tracking-widest">${label}</div>
            <div class="font-mono text-2xl text-ink-50 mt-1">${value ?? '—'}</div>
          </div>
        `
      )}
    </div>

    ${
      solves.length === 0
        ? html`<div class="card p-12 text-center">
            <div class="text-ink-300 max-w-md mx-auto">
              ${raw(
                t('solves.empty', {
                  kbd: '<kbd class="px-1.5 py-0.5 bg-ink-800 rounded mx-1">T</kbd>',
                })
              )}
            </div>
          </div>`
        : html`
            <div class="card overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-white/[0.02] text-ink-500 uppercase tracking-widest text-[10px]">
                  <tr>
                    <th class="text-left px-4 py-3 w-12">${t('solves.columns.number')}</th>
                    <th class="text-left px-4 py-3 w-24">${t('solves.columns.time')}</th>
                    <th class="text-left px-4 py-3">${t('solves.columns.scramble')}</th>
                    <th class="text-left px-4 py-3 w-32">${t('solves.columns.date')}</th>
                    <th class="px-4 py-3 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  ${solves.map(
                    (s, i) => html`
                      <tr class="border-t border-white/5 hover:bg-white/[0.02]">
                        <td class="px-4 py-3 text-ink-500 font-mono text-xs">${solves.length - i}</td>
                        <td class="px-4 py-3 font-mono ${s.dnf ? 'text-red-400' : 'text-ink-100'}">${
                          s.dnf ? 'DNF' : fmt(s.ms)
                        }</td>
                        <td class="px-4 py-3 font-mono text-ink-400 text-xs">${s.scramble || ''}</td>
                        <td class="px-4 py-3 text-ink-500 text-xs">${new Date(s.ts).toLocaleString()}</td>
                        <td class="px-4 py-3 text-right">
                          <button data-delete-solve="${s.ts}" class="text-ink-500 hover:text-red-400 text-xs">×</button>
                        </td>
                      </tr>
                    `
                  )}
                </tbody>
              </table>
            </div>
          `
    }
  `;
}
