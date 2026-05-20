import { html, raw, esc } from './shared.js';
import { getStages, flatLessons } from '../data/curriculum.js';
import { isLessonCompleted, getState, ao } from '../state.js';
import { t } from '../i18n.js';

function stageProgress(stage) {
  const done = stage.lessons.filter((l) => isLessonCompleted(l.id)).length;
  return { done, total: stage.lessons.length };
}

function findNextLesson() {
  const all = flatLessons();
  return all.find((l) => !isLessonCompleted(l.id)) || all[0];
}

function lessonRow(lesson) {
  const completed = isLessonCompleted(lesson.id);
  const numberMatch = (lesson.eyebrow || '').match(/\d+/)?.[0];
  return html`
    <a
      href="#/lesson/${lesson.id}"
      class="card card-hover block p-4 group"
    >
      <div class="flex items-start gap-4">
        <div class="mt-0.5 w-7 h-7 rounded-full grid place-items-center text-[11px] font-mono shrink-0 ${
          completed ? 'bg-accent text-ink-950' : 'bg-ink-800 text-ink-300'
        }">
          ${completed ? '✓' : numberMatch || '·'}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-baseline gap-2">
            <div class="font-display font-semibold text-ink-50 group-hover:text-accent transition-colors truncate">
              ${lesson.title}
            </div>
          </div>
          <div class="text-ink-400 text-sm mt-1 line-clamp-2">${lesson.goal}</div>
          <div class="flex items-center gap-3 mt-2 text-[11px] text-ink-500">
            <span>${lesson.estimate}</span>
            ${lesson.practiceAlgs ? raw(`<span class="chip">${esc(t('lesson.algDrill'))}</span>`) : ''}
            ${completed ? raw(`<span class="chip chip-success">${esc(t('lesson.completed'))}</span>`) : ''}
          </div>
        </div>
        <svg class="text-ink-400 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 mt-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </a>
  `;
}

export function dashboardView() {
  const stages = getStages();
  const next = findNextLesson();
  const total = flatLessons().length;
  const done = flatLessons().filter((l) => isLessonCompleted(l.id)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const solves = getState().solves.length;
  const ao5 = ao(5);

  const heroAo5 =
    ao5 == null
      ? t('dashboard.noAo')
      : ao5 === 'DNF'
        ? 'DNF'
        : (ao5 / 1000).toFixed(2) + 's';

  return html`
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      <div class="lg:col-span-2 card p-8 relative overflow-hidden">
        <div class="absolute inset-0 pointer-events-none opacity-30" style="background: radial-gradient(600px 200px at 20% 0%, rgba(163, 230, 53, 0.25), transparent 60%);"></div>
        <div class="relative">
          <div class="text-ink-400 text-xs uppercase tracking-widest mb-3">${t('dashboard.pickUpWhere')}</div>
          <h1 class="font-display text-3xl sm:text-4xl font-semibold text-ink-50 mb-2 leading-tight">
            ${next.title}
          </h1>
          <p class="text-ink-300 max-w-2xl">${next.goal}</p>
          <div class="flex flex-wrap gap-3 mt-6">
            <a href="#/lesson/${next.id}" class="inline-flex items-center gap-2 bg-accent text-ink-950 font-medium px-4 py-2 rounded-md hover:bg-accent-hover transition-colors">
              ${isLessonCompleted(next.id) ? t('buttons.review') : t('buttons.continue')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <button id="hero-open-timer" class="inline-flex items-center gap-2 text-ink-200 border border-white/10 px-4 py-2 rounded-md hover:bg-white/5 transition-colors">
              ${t('buttons.practiceTimer')}
            </button>
          </div>
        </div>
      </div>

      <div class="card p-6 flex flex-col justify-between">
        <div>
          <div class="text-ink-400 text-xs uppercase tracking-widest">${t('dashboard.yourProgress')}</div>
          <div class="mt-4 flex items-baseline gap-2">
            <div class="text-3xl font-display font-semibold text-ink-50">${done}</div>
            <div class="text-ink-400">/ ${total} ${t('dashboard.lessonsSuffix')}</div>
          </div>
          <div class="progress-track mt-3"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>
        <div class="mt-6 grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
          <div>
            <div class="text-ink-500 text-[10px] uppercase tracking-widest">${t('stats.solves')}</div>
            <div class="font-mono text-ink-100 mt-1">${solves}</div>
          </div>
          <div>
            <div class="text-ink-500 text-[10px] uppercase tracking-widest">${t('stats.ao5')}</div>
            <div class="font-mono text-ink-100 mt-1">${heroAo5}</div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="flex items-baseline justify-between mb-6">
        <h2 class="font-display text-xl text-ink-50">${t('dashboard.curriculumTitle')}</h2>
        <div class="text-xs text-ink-500">${t('dashboard.stagesAndLessons', { stages: stages.length, lessons: total })}</div>
      </div>

      <div class="space-y-10">
        ${stages.map((stage) => {
          const prog = stageProgress(stage);
          const pct = Math.round((prog.done / prog.total) * 100);
          return html`
            <div>
              <div class="flex items-baseline gap-3 mb-3">
                <div class="w-2.5 h-2.5 rounded-full" style="background:${stage.color};"></div>
                <h3 class="font-display text-lg text-ink-50">${stage.title}</h3>
                <div class="text-ink-400 text-sm">${stage.summary}</div>
                <div class="ml-auto text-ink-500 text-xs font-mono">${prog.done}/${prog.total}</div>
              </div>
              <div class="progress-track mb-4 max-w-md"><div class="progress-fill" style="width:${pct}%"></div></div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${stage.lessons.map((lesson) => lessonRow(lesson))}
              </div>
            </div>
          `;
        })}
      </div>
    </section>
  `;
}
