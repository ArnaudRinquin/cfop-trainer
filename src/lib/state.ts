// LocalStorage-backed progress state with a tiny pub/sub.
// Used inside React islands.
const KEY = 'cfop:state:v1';

export type LessonStatus = 'in_progress' | 'completed';
export type AlgStatus = 'learning' | 'mastered';

export interface Solve {
  ms: number;
  scramble: string;
  ts: number;
  dnf?: boolean;
}

export interface Prefs {
  showInspection: boolean;
  inspectionSeconds: number;
  scrambleLength: number;
}

export interface AppState {
  lessons: Record<string, { status: LessonStatus; updatedAt: number }>;
  algs: Record<string, AlgStatus>;
  solves: Solve[];
  prefs: Prefs;
}

const defaults: AppState = {
  lessons: {},
  algs: {},
  solves: [],
  prefs: {
    showInspection: true,
    inspectionSeconds: 15,
    scrambleLength: 20,
  },
};

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function load(): AppState {
  if (!isBrowser()) return structuredClone(defaults);
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(defaults);
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...structuredClone(defaults),
      ...parsed,
      prefs: { ...defaults.prefs, ...(parsed.prefs || {}) },
    };
  } catch {
    return structuredClone(defaults);
  }
}

let cache: AppState = load();
const subs = new Set<(s: AppState) => void>();

function save() {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    /* ignore quota */
  }
}

function notify() {
  for (const fn of subs) fn(cache);
}

export function getState(): AppState {
  return cache;
}

export function subscribe(fn: (s: AppState) => void): () => void {
  subs.add(fn);
  return () => {
    subs.delete(fn);
  };
}

export function setLessonStatus(lessonId: string, status: LessonStatus) {
  cache.lessons[lessonId] = { status, updatedAt: Date.now() };
  save();
  notify();
}

export function isLessonCompleted(lessonId: string): boolean {
  return cache.lessons[lessonId]?.status === 'completed';
}

export function setAlgStatus(algId: string, status: AlgStatus | null) {
  if (status === null) {
    delete cache.algs[algId];
  } else {
    cache.algs[algId] = status;
  }
  save();
  notify();
}

export function getAlgStatus(algId: string): AlgStatus | null {
  return cache.algs[algId] ?? null;
}

export function addSolve(solve: Omit<Solve, 'ts'>) {
  cache.solves.unshift({ ...solve, ts: Date.now() });
  cache.solves = cache.solves.slice(0, 500);
  save();
  notify();
}

export function deleteSolve(ts: number) {
  cache.solves = cache.solves.filter((s) => s.ts !== ts);
  save();
  notify();
}

export function clearSolves() {
  cache.solves = [];
  save();
  notify();
}

export function ao(n: number): number | 'DNF' | null {
  const recent = cache.solves.slice(0, n);
  if (recent.length < n) return null;
  const dnfCount = recent.filter((s) => s.dnf).length;
  if (dnfCount >= 2) return 'DNF';
  const sorted = [...recent].sort((a, b) => {
    if (a.dnf && !b.dnf) return 1;
    if (b.dnf && !a.dnf) return -1;
    return a.ms - b.ms;
  });
  const trimmed = sorted.slice(1, -1);
  if (trimmed.some((s) => s.dnf)) return 'DNF';
  return trimmed.reduce((acc, s) => acc + s.ms, 0) / trimmed.length;
}

export function bestSolve(): Solve | null {
  const valid = cache.solves.filter((s) => !s.dnf);
  if (valid.length === 0) return null;
  return valid.reduce((best, s) => (s.ms < best.ms ? s : best), valid[0]);
}

export function exportData(): string {
  return JSON.stringify(cache, null, 2);
}

export function importData(json: string) {
  const data = JSON.parse(json) as Partial<AppState>;
  cache = { ...structuredClone(defaults), ...data };
  save();
  notify();
}

export function resetAll() {
  cache = structuredClone(defaults);
  save();
  notify();
}
