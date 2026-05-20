import { html, raw, esc, renderFace } from './shared.js';
import { getAlgorithmGroups } from '../data/algorithms.js';
import { getAlgStatus } from '../state.js';
import { t } from '../i18n.js';

const TAB_IDS = [
  '2look-oll-edges',
  '2look-oll-corners',
  '2look-pll-corners',
  '2look-pll-edges',
  'f2l-basic',
  'oll-full',
  'pll-full',
];

export function algorithmsView(activeTab = '2look-oll-edges') {
  const groups = getAlgorithmGroups();
  const group = groups[activeTab];
  if (!group) {
    return algorithmsView('2look-oll-edges');
  }
  const total = group.algs.length;
  const mastered = group.algs.filter((a) => getAlgStatus(a.id) === 'mastered').length;
  const learning = group.algs.filter((a) => getAlgStatus(a.id) === 'learning').length;

  return html`
    <div class="mb-8">
      <h1 class="font-display text-3xl sm:text-4xl font-semibold text-ink-50">${t('algorithms.title')}</h1>
      <p class="text-ink-400 mt-2 max-w-2xl">${t('algorithms.description')}</p>
    </div>

    <div class="flex flex-wrap gap-1 mb-6">
      ${TAB_IDS.map(
        (id) => html`
          <button
            data-algtab="${id}"
            class="tab-button ${id === activeTab ? 'active' : ''}"
          >
            ${t('algorithms.tabs.' + id)}
          </button>
        `
      )}
    </div>

    <div class="card p-5 mb-6 flex items-center gap-6 flex-wrap">
      <div>
        <div class="text-ink-500 text-xs uppercase tracking-widest">${t('algorithms.tabs.' + activeTab)}</div>
        <div class="font-display text-xl text-ink-50 mt-1">${total} ${t('algorithms.algorithmsSuffix')}</div>
      </div>
      <div class="flex-1 min-w-[200px] max-w-md">
        <div class="progress-track"><div class="progress-fill" style="width:${
          total ? Math.round((mastered / total) * 100) : 0
        }%"></div></div>
        <div class="text-xs text-ink-400 mt-2 flex gap-4">
          <span><span class="text-accent">${mastered}</span> ${t('algorithms.mastered')}</span>
          <span><span class="text-yellow-300">${learning}</span> ${t('algorithms.learning')}</span>
          <span>${total - mastered - learning} ${t('algorithms.untouched')}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      ${group.algs.map((alg) => {
        const status = getAlgStatus(alg.id);
        const isMastered = status === 'mastered';
        return html`
          <div class="algo-card ${isMastered ? 'mastered' : ''}">
            <div class="flex items-start gap-4">
              ${alg.sticker ? renderFace(alg.sticker) : ''}
              <div class="flex-1 min-w-0">
                <div class="flex items-baseline gap-2 flex-wrap">
                  <div class="font-display font-semibold text-ink-50">${alg.name}</div>
                  ${alg.id ? raw(`<span class="chip">${esc(alg.id)}</span>`) : ''}
                </div>
                ${alg.pattern ? html`<div class="text-ink-400 text-sm mt-1">${alg.pattern}</div>` : ''}
                <div class="mt-3 font-mono text-ink-50 bg-ink-900 px-3 py-2 rounded select-all break-words leading-relaxed text-sm">${alg.alg}</div>
                <div class="mt-3 flex gap-2">
                  <button class="alg-toggle text-xs px-2.5 py-1 rounded border transition-colors ${
                    status === 'learning' ? 'border-yellow-400/50 text-yellow-300 bg-yellow-400/10' : 'border-white/10 text-ink-300 hover:bg-white/5'
                  }" data-alg-id="${alg.id}" data-set="learning">${t('buttons.learning')}</button>
                  <button class="alg-toggle text-xs px-2.5 py-1 rounded border transition-colors ${
                    isMastered ? 'border-accent text-ink-950 bg-accent' : 'border-white/10 text-ink-300 hover:bg-white/5'
                  }" data-alg-id="${alg.id}" data-set="mastered">${t('buttons.mastered')}</button>
                </div>
              </div>
            </div>
          </div>
        `;
      })}
    </div>
  `;
}
