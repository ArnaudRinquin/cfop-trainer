// Full-screen timer overlay with WCA-style space-bar behavior:
//   1. Press & hold space  -> arming (red), shows "Hold...". After ~500ms turns green: ready.
//   2. Release space        -> timer starts.
//   3. Press any key/space  -> timer stops and the solve is saved.
//
// Plus:
//   N -> new scramble (only when not running)
//   Esc -> close overlay (only when not running)

import { addSolve, getState } from './state.js';
import { generateScramble } from './scramble.js';
import { t } from './i18n.js';

const HOLD_TIME_MS = 500;

const els = () => ({
  overlay: document.getElementById('timer-overlay'),
  display: document.getElementById('timer-display'),
  state: document.getElementById('timer-state'),
  scramble: document.getElementById('timer-scramble'),
  scrambleLabel: document.getElementById('timer-scramble-label'),
  hints: document.getElementById('timer-hints'),
  recent: document.getElementById('timer-recent'),
});

function renderStatics() {
  const e = els();
  e.scrambleLabel.textContent = t('timer.scrambleLabel');
  e.hints.innerHTML =
    `<kbd class="px-1.5 py-0.5 bg-ink-800 rounded">Space</kbd> ${t('timer.spaceHint')} &middot; ` +
    `<kbd class="px-1.5 py-0.5 bg-ink-800 rounded">N</kbd> ${t('timer.newScrambleHint')} &middot; ` +
    `<kbd class="px-1.5 py-0.5 bg-ink-800 rounded">Esc</kbd> ${t('timer.closeHint')}`;
}

const state = {
  open: false,
  phase: 'idle', // idle | holding | ready | running
  scramble: '',
  holdStartedAt: 0,
  runStartedAt: 0,
  rafId: 0,
  spaceDown: false,
};

function formatMs(ms) {
  const s = ms / 1000;
  if (s < 60) return s.toFixed(2);
  const m = Math.floor(s / 60);
  const rem = (s - m * 60).toFixed(2).padStart(5, '0');
  return `${m}:${rem}`;
}

function setPhase(next) {
  state.phase = next;
  const e = els();
  e.display.classList.remove('timer-ready', 'timer-running', 'timer-holding');
  switch (next) {
    case 'idle':
      e.state.textContent = t('timer.pressHold');
      e.display.textContent = '0.00';
      break;
    case 'holding':
      e.state.textContent = t('timer.holding');
      e.display.classList.add('timer-holding');
      e.display.textContent = '0.00';
      break;
    case 'ready':
      e.state.textContent = t('timer.ready');
      e.display.classList.add('timer-ready');
      e.display.textContent = '0.00';
      break;
    case 'running':
      e.state.textContent = t('timer.solving');
      e.display.classList.add('timer-running');
      break;
  }
}

function renderRecent() {
  const e = els();
  const recent = getState().solves.slice(0, 5);
  if (!recent.length) {
    e.recent.innerHTML = '';
    return;
  }
  e.recent.innerHTML = recent
    .map(
      (s) =>
        `<span class="chip">${s.dnf ? 'DNF' : formatMs(s.ms)}</span>`
    )
    .join('');
}

function newScramble() {
  state.scramble = generateScramble(getState().prefs.scrambleLength || 20);
  els().scramble.textContent = state.scramble;
}

function tickRun() {
  const elapsed = performance.now() - state.runStartedAt;
  els().display.textContent = formatMs(elapsed);
  state.rafId = requestAnimationFrame(tickRun);
}

function startRun() {
  setPhase('running');
  state.runStartedAt = performance.now();
  state.rafId = requestAnimationFrame(tickRun);
}

function stopRun() {
  cancelAnimationFrame(state.rafId);
  const ms = performance.now() - state.runStartedAt;
  els().display.textContent = formatMs(ms);
  addSolve({ ms, scramble: state.scramble });
  renderRecent();
  // After a solve, generate a new scramble for the next attempt.
  newScramble();
  setPhase('idle');
}

function onKeyDown(e) {
  if (!state.open) return;
  if (e.code === 'Space') {
    e.preventDefault();
    if (state.spaceDown) return; // ignore key-repeat
    state.spaceDown = true;
    if (state.phase === 'running') {
      stopRun();
      return;
    }
    if (state.phase === 'idle') {
      state.holdStartedAt = performance.now();
      setPhase('holding');
      // Schedule a re-check after HOLD_TIME_MS
      setTimeout(() => {
        if (state.spaceDown && state.phase === 'holding') {
          const held = performance.now() - state.holdStartedAt;
          if (held >= HOLD_TIME_MS) setPhase('ready');
        }
      }, HOLD_TIME_MS + 5);
      return;
    }
  } else if (e.code === 'KeyN' && state.phase === 'idle') {
    newScramble();
  } else if (e.code === 'Escape' && state.phase !== 'running' && state.phase !== 'holding') {
    closeTimer();
  } else if (state.phase === 'running') {
    // Any key stops it (WCA: only space, but supporting any key is friendlier).
    e.preventDefault();
    stopRun();
  }
}

function onKeyUp(e) {
  if (!state.open) return;
  if (e.code !== 'Space') return;
  e.preventDefault();
  if (!state.spaceDown) return;
  state.spaceDown = false;

  if (state.phase === 'ready') {
    startRun();
  } else if (state.phase === 'holding') {
    // Released too early — back to idle, no solve.
    setPhase('idle');
  }
}

export function openTimer() {
  if (state.open) return;
  state.open = true;
  els().overlay.classList.remove('hidden');
  els().overlay.classList.add('flex');
  renderStatics();
  setPhase('idle');
  newScramble();
  renderRecent();
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}

export function closeTimer() {
  if (!state.open) return;
  state.open = false;
  cancelAnimationFrame(state.rafId);
  els().overlay.classList.add('hidden');
  els().overlay.classList.remove('flex');
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);
  state.spaceDown = false;
}

export function toggleTimer() {
  if (state.open) closeTimer();
  else openTimer();
}

// Global hotkey: T opens the timer from anywhere (when not typing into an input)
window.addEventListener('keydown', (e) => {
  if (state.open) return;
  if (e.code !== 'KeyT') return;
  const target = e.target;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable)) return;
  openTimer();
});

export { formatMs };
