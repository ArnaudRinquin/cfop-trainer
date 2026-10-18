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
  plus2?: boolean;
}

export type Penalty = 'plus2' | 'dnf' | null;

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

// Server and first client render both use `defaults`; the real localStorage
// state is swapped in after hydration via useSyncExternalStore.
let cache: AppState = load();
const serverSnapshot: AppState = structuredClone(defaults);
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

export function getServerState(): AppState {
  return serverSnapshot;
}

// Mutations replace `cache` (never mutate in place) so snapshot identity changes.
function commit(next: AppState) {
  cache = next;
  save();
  notify();
}

export function subscribe(fn: (s: AppState) => void): () => void {
  subs.add(fn);
  return () => {
    subs.delete(fn);
  };
}

export function setLessonStatus(lessonId: string, status: LessonStatus) {
  commit({ ...cache, lessons: { ...cache.lessons, [lessonId]: { status, updatedAt: Date.now() } } });
}

export function isLessonCompleted(lessonId: string, s: AppState = cache): boolean {
  return s.lessons[lessonId]?.status === 'completed';
}

export function setAlgStatus(algId: string, status: AlgStatus | null) {
  const algs = { ...cache.algs };
  if (status === null) delete algs[algId];
  else algs[algId] = status;
  commit({ ...cache, algs });
}

export function getAlgStatus(algId: string, s: AppState = cache): AlgStatus | null {
  return s.algs[algId] ?? null;
}

export function addSolve(solve: Omit<Solve, 'ts'>) {
  // Keep ts unique so it can serve as a stable row key.
  const ts = Math.max(Date.now(), (cache.solves[0]?.ts ?? 0) + 1);
  commit({ ...cache, solves: [{ ...solve, ts }, ...cache.solves].slice(0, 500) });
}

export function deleteSolve(index: number) {
  commit({ ...cache, solves: cache.solves.filter((_, i) => i !== index) });
}

export function setPenalty(index: number, penalty: Penalty) {
  commit({
    ...cache,
    solves: cache.solves.map((s, i) =>
      i === index ? { ...s, plus2: penalty === 'plus2', dnf: penalty === 'dnf' } : s
    ),
  });
}

export function setPrefs(prefs: Partial<Prefs>) {
  commit({ ...cache, prefs: { ...cache.prefs, ...prefs } });
}

export function clearSolves() {
  commit({ ...cache, solves: [] });
}

// Time including the +2 penalty.
export function effectiveMs(s: Solve): number {
  return s.ms + (s.plus2 ? 2000 : 0);
}

// WCA-style average: drop the best and worst 5% (at least one each side).
export function ao(n: number, s: AppState = cache): number | 'DNF' | null {
  const recent = s.solves.slice(0, n);
  if (recent.length < n) return null;
  const trim = Math.max(1, Math.ceil(n * 0.05));
  if (recent.filter((x) => x.dnf).length > trim) return 'DNF';
  const sorted = [...recent].sort((a, b) => {
    if (a.dnf && !b.dnf) return 1;
    if (b.dnf && !a.dnf) return -1;
    return effectiveMs(a) - effectiveMs(b);
  });
  const trimmed = sorted.slice(trim, -trim);
  return trimmed.reduce((acc, x) => acc + effectiveMs(x), 0) / trimmed.length;
}

export function bestSolve(s: AppState = cache): Solve | null {
  const valid = s.solves.filter((x) => !x.dnf);
  if (valid.length === 0) return null;
  return valid.reduce((best, x) => (effectiveMs(x) < effectiveMs(best) ? x : best), valid[0]);
}

export function exportData(): string {
  return JSON.stringify(cache, null, 2);
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

export function importData(json: string) {
  const data: unknown = JSON.parse(json);
  if (!isObject(data)) throw new Error('not a CFOP progress file');
  const { lessons, algs, solves, prefs } = data;
  if (lessons !== undefined && !isObject(lessons)) throw new Error('invalid "lessons"');
  if (algs !== undefined && !isObject(algs)) throw new Error('invalid "algs"');
  if (prefs !== undefined && !isObject(prefs)) throw new Error('invalid "prefs"');
  if (
    solves !== undefined &&
    !(Array.isArray(solves) && solves.every((s) => isObject(s) && typeof s.ms === 'number' && typeof s.ts === 'number'))
  )
    throw new Error('invalid "solves"');
  commit({
    lessons: (lessons as AppState['lessons']) ?? {},
    algs: (algs as AppState['algs']) ?? {},
    solves: ((solves as Solve[]) ?? []).map((s) => ({ ...s, scramble: s.scramble ?? '' })),
    prefs: { ...defaults.prefs, ...((prefs as Partial<Prefs>) ?? {}) },
  });
}

export function resetAll() {
  commit(structuredClone(defaults));
}
