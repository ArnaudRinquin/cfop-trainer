// App shell: top navigation + content slot.
import { html, raw } from './shared.js';
import { ao, bestSolve } from '../state.js';
import { t, getLocale, locales } from '../i18n.js';

function formatAo(v) {
  if (v == null) return '—';
  if (v === 'DNF') return 'DNF';
  const s = v / 1000;
  return s < 60 ? s.toFixed(2) : `${Math.floor(s / 60)}:${(s % 60).toFixed(2).padStart(5, '0')}`;
}

export function shell({ activeRoute, content }) {
  const a5 = ao(5);
  const a12 = ao(12);
  const best = bestSolve();
  const navItem = (label, route) =>
    `<a href="#/${route}" class="tab-button ${activeRoute === route ? 'active' : ''}">${label}</a>`;

  const currentLocale = getLocale();

  return html`
    <div class="min-h-screen flex flex-col">
      <header class="border-b border-white/5 backdrop-blur-md bg-ink-950/60 sticky top-0 z-30">
        <div class="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between gap-6">
          <a href="#/dashboard" class="flex items-center gap-2.5 group">
            <div class="w-8 h-8 rounded-md overflow-hidden grid grid-cols-2 grid-rows-2 gap-px bg-black/60 p-px">
              <div class="bg-cube-yellow"></div>
              <div class="bg-cube-red"></div>
              <div class="bg-cube-green"></div>
              <div class="bg-cube-blue"></div>
            </div>
            <div class="font-display font-semibold tracking-tight text-ink-50">CFOP</div>
            <div class="text-ink-500 text-xs uppercase tracking-widest hidden sm:block">${t('app.tagline')}</div>
          </a>
          <nav class="flex items-center gap-1">
            ${raw(navItem(t('nav.curriculum'), 'dashboard'))} ${raw(navItem(t('nav.algorithms'), 'algorithms'))}
            ${raw(navItem(t('nav.solves'), 'solves'))}
          </nav>
          <div class="flex items-center gap-3">
            <div class="hidden md:flex items-center gap-4 text-xs">
              <div class="text-right">
                <div class="text-ink-500 uppercase tracking-widest text-[10px]">${t('stats.ao5')}</div>
                <div class="font-mono text-ink-100">${formatAo(a5)}</div>
              </div>
              <div class="text-right">
                <div class="text-ink-500 uppercase tracking-widest text-[10px]">${t('stats.ao12')}</div>
                <div class="font-mono text-ink-100">${formatAo(a12)}</div>
              </div>
              <div class="text-right">
                <div class="text-ink-500 uppercase tracking-widest text-[10px]">${t('stats.best')}</div>
                <div class="font-mono text-ink-100">${best ? formatAo(best.ms) : '—'}</div>
              </div>
            </div>
            <select id="locale-picker" aria-label="${t('language.label')}" class="bg-ink-900 border border-white/10 text-ink-200 text-xs font-mono rounded-md px-2 py-1.5 hover:bg-ink-800 focus:outline-none focus:border-accent/50 transition-colors cursor-pointer">
              ${locales().map(
                (loc) => html`<option value="${loc.code}" ${loc.code === currentLocale ? 'selected' : ''}>${loc.short}</option>`
              )}
            </select>
            <button
              id="open-timer"
              class="inline-flex items-center gap-2 bg-accent text-ink-950 font-medium text-sm px-3 py-1.5 rounded-md hover:bg-accent-hover transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/><path d="m9 13 3 2 2-3"/></svg>
              <span class="hidden sm:inline">${t('buttons.timer')}</span>
              <kbd class="hidden sm:inline ml-1 text-[10px] bg-ink-950/30 px-1 py-0.5 rounded font-mono">T</kbd>
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1">
        <div class="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12">${raw(content.__html)}</div>
      </main>

      <footer class="border-t border-white/5 py-6 mt-12">
        <div
          class="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-ink-500"
        >
          <div>${t('app.footer')}</div>
          <div class="flex gap-4">
            <button id="export-data" class="link-underline hover:text-ink-100">${t('buttons.exportProgress')}</button>
            <button id="import-data" class="link-underline hover:text-ink-100">${t('buttons.importProgress')}</button>
            <button id="reset-data" class="link-underline hover:text-red-400">${t('buttons.reset')}</button>
          </div>
        </div>
      </footer>
    </div>
  `;
}
