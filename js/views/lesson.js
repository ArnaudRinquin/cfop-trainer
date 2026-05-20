import { html, raw, esc, renderFace } from './shared.js';
import { findLesson, flatLessons } from '../data/curriculum.js';
import { algorithmGroups } from '../data/algorithms.js';
import { isLessonCompleted, getAlgStatus } from '../state.js';

function block(b) {
  switch (b.kind) {
    case 'p':
      return `<p>${b.text}</p>`;
    case 'h3':
      return `<h3>${b.text}</h3>`;
    case 'ul':
      return `<ul>${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
    case 'tip':
      return `<div class="my-5 p-4 border-l-2 border-accent/60 bg-accent/5 rounded-r-md text-ink-200 text-sm">${b.text}</div>`;
    default:
      return '';
  }
}

function algCard(alg) {
  const status = getAlgStatus(alg.id);
  const mastered = status === 'mastered';
  return html`
    <div class="algo-card ${mastered ? 'mastered' : ''}" data-alg-id="${alg.id}">
      <div class="flex items-start gap-4">
        ${alg.sticker ? renderFace(alg.sticker) : ''}
        <div class="flex-1 min-w-0">
          <div class="flex items-baseline gap-2 flex-wrap">
            <div class="font-display font-semibold text-ink-50">${alg.name}</div>
            ${alg.id ? raw(`<span class="chip">${esc(alg.id)}</span>`) : ''}
          </div>
          ${alg.pattern ? html`<div class="text-ink-400 text-sm mt-1">${alg.pattern}</div>` : ''}
          ${alg.note ? html`<div class="text-ink-500 text-xs mt-1 italic">${alg.note}</div>` : ''}
          <div class="mt-3 font-mono text-ink-50 bg-ink-900 px-3 py-2 rounded select-all break-words leading-relaxed">${alg.alg}</div>
          <div class="mt-3 flex gap-2">
            <button class="alg-toggle text-xs px-2.5 py-1 rounded border transition-colors ${
              status === 'learning' ? 'border-yellow-400/50 text-yellow-300 bg-yellow-400/10' : 'border-white/10 text-ink-300 hover:bg-white/5'
            }" data-alg-id="${alg.id}" data-set="learning">Learning</button>
            <button class="alg-toggle text-xs px-2.5 py-1 rounded border transition-colors ${
              mastered ? 'border-accent text-ink-950 bg-accent' : 'border-white/10 text-ink-300 hover:bg-white/5'
            }" data-alg-id="${alg.id}" data-set="mastered">Mastered</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function lessonNav(lessonId) {
  const list = flatLessons();
  const i = list.findIndex((l) => l.id === lessonId);
  const prev = i > 0 ? list[i - 1] : null;
  const next = i < list.length - 1 ? list[i + 1] : null;
  return { prev, next };
}

export function lessonView(lessonId) {
  const found = findLesson(lessonId);
  if (!found) {
    return html`<div class="text-ink-400">Lesson not found. <a class="link-underline" href="#/dashboard">Back</a></div>`;
  }
  const { lesson, stage } = found;
  const completed = isLessonCompleted(lesson.id);
  const { prev, next } = lessonNav(lesson.id);

  const algGroups = [];
  if (lesson.practiceAlgs && algorithmGroups[lesson.practiceAlgs]) algGroups.push(algorithmGroups[lesson.practiceAlgs]);
  if (lesson.practiceAlgs2 && algorithmGroups[lesson.practiceAlgs2]) algGroups.push(algorithmGroups[lesson.practiceAlgs2]);

  return html`
    <div class="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
      <aside class="lg:sticky lg:top-20 self-start">
        <a href="#/dashboard" class="text-ink-400 hover:text-ink-100 text-xs inline-flex items-center gap-1 mb-6">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          All lessons
        </a>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-2 h-2 rounded-full" style="background:${stage.color};"></div>
          <div class="font-display font-semibold text-ink-50 text-sm">${stage.title}</div>
        </div>
        <ol class="space-y-1">
          ${stage.lessons.map(
            (l) => html`
              <li>
                <a href="#/lesson/${l.id}" class="block px-3 py-2 rounded-md text-sm ${
                  l.id === lesson.id ? 'bg-white/5 text-ink-50' : 'text-ink-400 hover:text-ink-100 hover:bg-white/5'
                }">
                  <div class="flex items-center gap-2">
                    ${isLessonCompleted(l.id) ? raw('<span class="text-accent">✓</span>') : ''}
                    <span class="truncate">${l.title}</span>
                  </div>
                </a>
              </li>
            `
          )}
        </ol>
      </aside>

      <article>
        <div class="text-ink-500 text-xs uppercase tracking-widest mb-2">${lesson.eyebrow || stage.title} &middot; ${lesson.estimate}</div>
        <h1 class="font-display text-3xl sm:text-4xl font-semibold text-ink-50 leading-tight mb-4">${lesson.title}</h1>
        <div class="text-ink-300 text-lg max-w-2xl">${lesson.goal}</div>

        <div class="prose-cfop mt-8 max-w-2xl">
          ${raw(lesson.blocks.map(block).join(''))}
        </div>

        ${
          algGroups.length
            ? html`
                <section class="mt-12">
                  <h2 class="font-display text-xl text-ink-50 mb-2">Practice algorithms</h2>
                  <p class="text-ink-400 text-sm mb-6 max-w-2xl">
                    Mark each algorithm as you go. ${raw('<em>Learning</em>')} means you can do it slowly with notation;
                    ${raw('<em>Mastered</em>')} means you can execute it without thinking and recognise the case from the cube.
                  </p>
                  ${algGroups.map(
                    (g) => html`
                      <div class="mb-8">
                        <h3 class="font-display text-base text-ink-100 mb-3">${g.title}</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                          ${g.algs.map((a) => algCard(a))}
                        </div>
                      </div>
                    `
                  )}
                </section>
              `
            : ''
        }

        <section class="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center gap-3">
          <button id="toggle-lesson-complete" class="${
            completed
              ? 'inline-flex items-center gap-2 border border-accent/40 bg-accent/10 text-accent px-4 py-2 rounded-md hover:bg-accent/20'
              : 'inline-flex items-center gap-2 bg-accent text-ink-950 font-medium px-4 py-2 rounded-md hover:bg-accent-hover transition-colors'
          }">
            ${completed ? '✓ Lesson completed' : 'Mark lesson complete'}
          </button>
          ${
            prev
              ? html`<a href="#/lesson/${prev.id}" class="text-sm text-ink-400 hover:text-ink-100 ml-auto inline-flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/></svg>${prev.title}</a>`
              : ''
          }
          ${
            next
              ? html`<a href="#/lesson/${next.id}" class="text-sm text-accent hover:text-accent-hover inline-flex items-center gap-1 ${prev ? '' : 'ml-auto'}">Next: ${next.title}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>`
              : ''
          }
        </section>
      </article>
    </div>
  `;
}
