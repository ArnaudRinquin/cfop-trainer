const FACES = ['U', 'D', 'L', 'R', 'F', 'B'] as const;
const SUFFIXES = ['', "'", '2'] as const;
const OPPOSITE: Record<string, string> = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'B', B: 'F' };

export function generateScramble(length = 20): string {
  const moves: string[] = [];
  let lastFace: string | null = null;
  let secondLastFace: string | null = null;

  while (moves.length < length) {
    const face = FACES[Math.floor(Math.random() * FACES.length)];
    if (face === lastFace) continue;
    if (face === secondLastFace && OPPOSITE[face] === lastFace) continue;
    const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
    moves.push(face + suffix);
    secondLastFace = lastFace;
    lastFace = face;
  }
  return moves.join(' ');
}
