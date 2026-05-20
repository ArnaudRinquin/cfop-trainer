// App entrypoint: routing, rendering, and event delegation.
import { parseRoute, onRouteChange, navigate } from './router.js';
import { shell } from './views/chrome.js';
import { dashboardView } from './views/dashboard.js';
import { lessonView } from './views/lesson.js';
import { algorithmsView } from './views/algorithms.js';
import { solvesView } from './views/solves.js';
import { html, mount } from './views/shared.js';
import { openTimer } from './timer.js';
import {
  subscribe,
  setLessonStatus,
  isLessonCompleted,
  setAlgStatus,
  getAlgStatus,
  deleteSolve,
  exportData,
  importData,
  resetAll,
} from './state.js';
import { t, setLocale, getLocale } from './i18n.js';

const root = document.getElementById('app');
let lastRouteKey = '';

function render() {
  const route = parseRoute();
  const routeKey = [route.name, ...route.params].join('/');
  let content;
  let activeRoute = route.name;

  switch (route.name) {
    case 'dashboard':
    case '':
      content = dashboardView();
      activeRoute = 'dashboard';
      break;
    case 'lesson': {
      const id = route.params[0];
      content = lessonView(id);
      activeRoute = 'dashboard';
      break;
    }
    case 'algorithms': {
      const tab = route.params[0] || '2look-oll-edges';
      content = algorithmsView(tab);
      activeRoute = 'algorithms';
      break;
    }
    case 'solves':
      content = solvesView();
      activeRoute = 'solves';
      break;
    default:
      content = html`<div class="text-ink-400 py-12 text-center">Page not found. <a href="#/dashboard" class="link-underline">Back to dashboard</a></div>`;
  }

  document.documentElement.lang = getLocale();
  mount(root, shell({ activeRoute, content }));
  attachHandlers(route);

  if (routeKey !== lastRouteKey) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    lastRouteKey = routeKey;
  }
}

function attachHandlers(route) {
  // Timer launchers
  document.getElementById('open-timer')?.addEventListener('click', openTimer);
  document.getElementById('hero-open-timer')?.addEventListener('click', openTimer);
  document.getElementById('open-timer-solves')?.addEventListener('click', openTimer);

  // Locale picker
  document.getElementById('locale-picker')?.addEventListener('change', (e) => {
    setLocale(e.target.value);
  });

  // Algorithm mastery toggles (delegated to clicks on .alg-toggle within view)
  document.querySelectorAll('.alg-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.algId;
      const set = btn.dataset.set;
      const current = getAlgStatus(id);
      setAlgStatus(id, current === set ? null : set);
    });
  });

  // Lesson completion toggle
  const toggleBtn = document.getElementById('toggle-lesson-complete');
  toggleBtn?.addEventListener('click', () => {
    const lessonId = route.params[0];
    if (!lessonId) return;
    const completed = isLessonCompleted(lessonId);
    setLessonStatus(lessonId, completed ? 'in_progress' : 'completed');
  });

  // Algorithm tab switching
  document.querySelectorAll('[data-algtab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      navigate('algorithms/' + btn.dataset.algtab);
    });
  });

  // Solve deletion
  document.querySelectorAll('[data-delete-solve]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const ts = parseInt(btn.dataset.deleteSolve, 10);
      if (Number.isFinite(ts)) deleteSolve(ts);
    });
  });

  // Footer actions
  document.getElementById('export-data')?.addEventListener('click', () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cfop-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
  document.getElementById('import-data')?.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        importData(text);
      } catch (err) {
        alert(t('alerts.importFailed', { message: err.message }));
      }
    };
    input.click();
  });
  document.getElementById('reset-data')?.addEventListener('click', () => {
    if (confirm(t('alerts.confirmReset'))) {
      resetAll();
    }
  });
}

// React to state and route changes.
subscribe(render);
onRouteChange(render);

// First render
render();
