// Move-sequence helpers. Notation is universal (no localization).

const TOKEN_RE = /([URFDLBMESxyzurfdlb])(['2]?)/g;

// Return the inverse of a move sequence: each token's direction is flipped
// (R↔R', R2 stays R2) and tokens are emitted in reverse order. Parens are
// stripped.
export function invertMoves(sequence: string): string {
  if (!sequence.trim()) return '';
  const cleaned = sequence.replace(/[()]/g, ' ');
  const tokens: string[] = [];
  TOKEN_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN_RE.exec(cleaned)) !== null) {
    const base = m[1];
    const mod = m[2];
    let inv: string;
    if (mod === '2') inv = base + '2';
    else if (mod === "'") inv = base;
    else inv = base + "'";
    tokens.push(inv);
  }
  return tokens.reverse().join(' ');
}
