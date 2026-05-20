export function formatMs(ms: number): string {
  const s = ms / 1000;
  if (s < 60) return s.toFixed(2);
  const m = Math.floor(s / 60);
  const rem = (s - m * 60).toFixed(2).padStart(5, '0');
  return `${m}:${rem}`;
}

export function formatAo(v: number | 'DNF' | null): string {
  if (v == null) return '—';
  if (v === 'DNF') return 'DNF';
  return formatMs(v);
}
