// Random-move scrambles. Good enough for practice — not WCA-grade random-state.
const FACES = ['U', 'D', 'L', 'R', 'F', 'B'];
const SUFFIXES = ['', "'", '2'];

// Opposite faces — avoid generating consecutive moves on the same axis pair when
// they reduce to a simpler scramble.
const OPPOSITE = { U: 'D', D: 'U', L: 'R', R: 'L', F: 'B', B: 'F' };

export function generateScramble(length = 20) {
  const moves = [];
  let lastFace = null;
  let secondLastFace = null;

  while (moves.length < length) {
    const face = FACES[Math.floor(Math.random() * FACES.length)];
    if (face === lastFace) continue;
    // Don't sandwich the same axis with its opposite (e.g., R L R is wasteful)
    if (face === secondLastFace && OPPOSITE[face] === lastFace) continue;

    const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
    moves.push(face + suffix);
    secondLastFace = lastFace;
    lastFace = face;
  }
  return moves.join(' ');
}
