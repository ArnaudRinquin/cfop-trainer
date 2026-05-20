// LocalStorage-backed progress state with a tiny pub/sub.
const KEY = 'cfop:state:v1';

const defaultState = {
  // lessonId -> { status: 'in_progress' | 'completed', updatedAt }
  lessons: {},
  // algId -> 'learning' | 'mastered'
  algs: {},
  // solve times { ms, scramble, ts, dnf? }
  solves: [],
  prefs: {
    showInspection: true,
    inspectionSeconds: 15,
    scrambleLength: 20,
  },
};

let cache = load();
const subs = new Set();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);
    return { ...structuredClone(defaultState), ...parsed, prefs: { ...defaultState.prefs, ...(parsed.prefs || {}) } };
  } catch {
    return structuredClone(defaultState);
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    /* ignore quota errors */
  }
}

function notify() {
  for (const fn of subs) fn(cache);
}

export function getState() {
  return cache;
}

export function subscribe(fn) {
  subs.add(fn);
  return () => subs.delete(fn);
}

export function setLessonStatus(lessonId, status) {
  cache.lessons[lessonId] = { status, updatedAt: Date.now() };
  save();
  notify();
}

export function isLessonCompleted(lessonId) {
  return cache.lessons[lessonId]?.status === 'completed';
}

export function setAlgStatus(algId, status) {
  if (status === null) {
    delete cache.algs[algId];
  } else {
    cache.algs[algId] = status;
  }
  save();
  notify();
}

export function getAlgStatus(algId) {
  return cache.algs[algId] || null;
}

export function addSolve(solve) {
  cache.solves.unshift({ ...solve, ts: Date.now() });
  cache.solves = cache.solves.slice(0, 500);
  save();
  notify();
}

export function deleteSolve(ts) {
  cache.solves = cache.solves.filter((s) => s.ts !== ts);
  save();
  notify();
}

export function clearSolves() {
  cache.solves = [];
  save();
  notify();
}

export function setPref(key, value) {
  cache.prefs[key] = value;
  save();
  notify();
}

// Stats helpers
export function ao(n) {
  const recent = cache.solves.slice(0, n);
  if (recent.length < n) return null;
  const dnfCount = recent.filter((s) => s.dnf).length;
  if (dnfCount >= 2) return 'DNF';
  // trim worst+best (counting DNFs as worst)
  const sorted = [...recent].sort((a, b) => {
    if (a.dnf && !b.dnf) return 1;
    if (b.dnf && !a.dnf) return -1;
    return a.ms - b.ms;
  });
  const trimmed = sorted.slice(1, -1);
  if (trimmed.some((s) => s.dnf)) return 'DNF';
  const sum = trimmed.reduce((acc, s) => acc + s.ms, 0);
  return sum / trimmed.length;
}

export function bestSolve() {
  const valid = cache.solves.filter((s) => !s.dnf);
  if (valid.length === 0) return null;
  return valid.reduce((best, s) => (s.ms < best.ms ? s : best), valid[0]);
}

export function exportData() {
  return JSON.stringify(cache, null, 2);
}

export function importData(json) {
  const data = JSON.parse(json);
  cache = { ...structuredClone(defaultState), ...data };
  save();
  notify();
}

export function resetAll() {
  cache = structuredClone(defaultState);
  save();
  notify();
}
