// Algorithm library: 2-look OLL/PLL, full OLL, full PLL, common F2L cases.
// Algorithms use standard speedcubing notation.

// 2-Look OLL (10 algs) - learn first
export const ollTwoLookEdges = [
  {
    id: 'oll-2l-edge-dot',
    name: 'Dot (no edges)',
    pattern: 'No yellow edges oriented on top',
    alg: "F (R U R' U') F' f (R U R' U') f'",
    sticker: [
      ['X', 'X', 'X'],
      ['X', 'Y', 'X'],
      ['X', 'X', 'X'],
    ],
  },
  {
    id: 'oll-2l-edge-line',
    name: 'Line',
    pattern: 'Horizontal yellow bar across the top',
    alg: "F (R U R' U') F'",
    sticker: [
      ['X', 'X', 'X'],
      ['Y', 'Y', 'Y'],
      ['X', 'X', 'X'],
    ],
  },
  {
    id: 'oll-2l-edge-l',
    name: 'L-shape',
    pattern: 'Two adjacent edges form an L',
    alg: "f (R U R' U') f'",
    sticker: [
      ['X', 'Y', 'X'],
      ['X', 'Y', 'Y'],
      ['X', 'X', 'X'],
    ],
  },
];

export const ollTwoLookCorners = [
  {
    id: 'oll-2l-corner-sune',
    name: 'Sune',
    pattern: 'One corner oriented, others form a Sune pattern',
    alg: "R U R' U R U2 R'",
    sticker: [
      ['Y', 'X', 'X'],
      ['X', 'Y', 'X'],
      ['Y', 'Y', 'X'],
    ],
  },
  {
    id: 'oll-2l-corner-antisune',
    name: 'Anti-Sune',
    pattern: 'Mirror of Sune',
    alg: "R U2 R' U' R U' R'",
    sticker: [
      ['X', 'X', 'Y'],
      ['X', 'Y', 'X'],
      ['Y', 'Y', 'X'],
    ],
  },
  {
    id: 'oll-2l-corner-headlights',
    name: 'Headlights',
    pattern: 'Two corners on the same side oriented',
    alg: "R2 D R' U2 R D' R' U2 R'",
    sticker: [
      ['Y', 'X', 'Y'],
      ['X', 'Y', 'X'],
      ['X', 'X', 'X'],
    ],
  },
  {
    id: 'oll-2l-corner-pi',
    name: 'Pi (bowtie)',
    pattern: 'Two corners diagonally facing front/back',
    alg: "R U2 R' U' R U R' U' R U' R'",
    sticker: [
      ['X', 'Y', 'X'],
      ['X', 'Y', 'X'],
      ['X', 'Y', 'X'],
    ],
  },
  {
    id: 'oll-2l-corner-u',
    name: 'U (chameleon)',
    pattern: 'Two opposite corners oriented',
    alg: "F (R U R' U') (R U R' U') F'",
    sticker: [
      ['X', 'X', 'X'],
      ['Y', 'Y', 'Y'],
      ['X', 'Y', 'X'],
    ],
  },
  {
    id: 'oll-2l-corner-t',
    name: 'T',
    pattern: 'Two adjacent corners oriented (back)',
    alg: "r U R' U' r' F R F'",
    sticker: [
      ['X', 'Y', 'X'],
      ['X', 'Y', 'X'],
      ['Y', 'X', 'Y'],
    ],
  },
  {
    id: 'oll-2l-corner-h',
    name: 'H (cross)',
    pattern: 'No corners oriented, all edges form plus',
    alg: "F (R U R' U')(R U R' U')(R U R' U') F'",
    sticker: [
      ['X', 'Y', 'X'],
      ['Y', 'Y', 'Y'],
      ['X', 'Y', 'X'],
    ],
  },
];

// 2-Look PLL (6 algs)
export const pllTwoLookCorners = [
  {
    id: 'pll-2l-aa',
    name: 'Aa-perm (corner 3-cycle)',
    pattern: 'Cycle three corners counterclockwise',
    alg: "x R' U R' D2 R U' R' D2 R2 x'",
  },
  {
    id: 'pll-2l-ae',
    name: 'E-perm (diagonal corner swap)',
    pattern: 'Two diagonal pairs of corners swapped',
    alg: "x' R U' R' D R U R' D' R U R' D R U' R' D' x",
  },
];

export const pllTwoLookEdges = [
  {
    id: 'pll-2l-ua',
    name: 'Ua-perm (edge 3-cycle)',
    pattern: 'Cycle three edges (UFR pointer)',
    alg: "R U' R U R U R U' R' U' R2",
  },
  {
    id: 'pll-2l-ub',
    name: 'Ub-perm (edge 3-cycle mirror)',
    pattern: 'Cycle three edges the other way',
    alg: "R2 U R U R' U' R' U' R' U R'",
  },
  {
    id: 'pll-2l-h',
    name: 'H-perm (edge swap opposite)',
    pattern: 'Swap front+back edges and left+right edges',
    alg: "M2 U M2 U2 M2 U M2",
  },
  {
    id: 'pll-2l-z',
    name: 'Z-perm (adjacent edge swap)',
    pattern: 'Swap two pairs of adjacent edges',
    alg: "M2 U M2 U M' U2 M2 U2 M'",
  },
];

// Beginner / intuitive F2L pairs (4 most common slot-insertion cases)
export const f2lBasic = [
  {
    id: 'f2l-1',
    name: 'Pair already made — slot it in',
    pattern: 'Corner+edge pair sits in the top, slot is empty',
    alg: "U R U' R'",
    note: 'When pair is on the right above its slot',
  },
  {
    id: 'f2l-2',
    name: 'Pair on the left',
    pattern: 'Pair sits above its slot on the left side',
    alg: "U' L' U L",
    note: 'Mirror of slot-1 insertion',
  },
  {
    id: 'f2l-3',
    name: 'Corner on top, edge on top — same side',
    pattern: 'White corner and the edge both on top, easy join',
    alg: "U R U' R' U' F' U F",
    note: 'Build pair then insert',
  },
  {
    id: 'f2l-4',
    name: 'Edge in slot wrong, corner on top',
    pattern: 'Need to extract edge then rejoin',
    alg: "R U' R' U F' U' F",
    note: 'Common situation — practice extraction',
  },
];

// Full OLL (compact). I include the 57 cases with name and proven algorithm.
// (Stickers omitted for full-OLL list to keep file manageable; trainer can still test alg recall.)
export const ollFull = [
  { id: 'OLL01', name: 'Dot 01', alg: "(R U2)(R'2 F R F') U2 (R' F R F')" },
  { id: 'OLL02', name: 'Dot 02', alg: "F (R U R' U') F' f (R U R' U') f'" },
  { id: 'OLL03', name: 'Dot 03', alg: "f (R U R' U') f' U' F (R U R' U') F'" },
  { id: 'OLL04', name: 'Dot 04', alg: "f (R U R' U') f' U F (R U R' U') F'" },
  { id: 'OLL05', name: 'Square 05', alg: "r' U2 R U R' U r" },
  { id: 'OLL06', name: 'Square 06', alg: "r U2 R' U' R U' r'" },
  { id: 'OLL07', name: 'P 07', alg: "r U R' U R U2 r'" },
  { id: 'OLL08', name: 'P 08', alg: "r' U' R U' R' U2 r" },
  { id: 'OLL09', name: 'W 09', alg: "R U R' U' R' F R2 U R' U' F'" },
  { id: 'OLL10', name: 'W 10', alg: "R U R' U R' F R F' R U2 R'" },
  { id: 'OLL11', name: 'P 11', alg: "r' (R2 U R' U R U2 R') U M'" },
  { id: 'OLL12', name: 'P 12', alg: "F (R U R' U') F' U F (R U R' U') F'" },
  { id: 'OLL13', name: 'Knight 13', alg: "F U R U' R2 F' R U R U' R'" },
  { id: 'OLL14', name: 'Knight 14', alg: "R' F R U R' F' R F U' F'" },
  { id: 'OLL15', name: 'Knight 15', alg: "r' U' r R' U' R U r' U r" },
  { id: 'OLL16', name: 'Knight 16', alg: "r U r' R U R' U' r U' r'" },
  { id: 'OLL17', name: 'S 17', alg: "(R U R' U) (R' F R F') U2 (R' F R F')" },
  { id: 'OLL18', name: 'S 18', alg: "r U R' U R U2 r2 U' R U' R' U2 r" },
  { id: 'OLL19', name: 'S 19', alg: "r' R U R U R' U' M' R' F R F'" },
  { id: 'OLL20', name: 'S 20', alg: "M U R U R' U' M2 U R U' r'" },
  { id: 'OLL21', name: 'Cross 21 (H)', alg: "R U2 R' U' R U R' U' R U' R'" },
  { id: 'OLL22', name: 'Cross 22 (Pi)', alg: "R U2 R2 U' R2 U' R2 U2 R" },
  { id: 'OLL23', name: 'Cross 23 (U)', alg: "R2 D R' U2 R D' R' U2 R'" },
  { id: 'OLL24', name: 'Cross 24 (T)', alg: "r U R' U' r' F R F'" },
  { id: 'OLL25', name: 'Cross 25 (L)', alg: "F' r U R' U' r' F R" },
  { id: 'OLL26', name: 'Cross 26 (Anti-Sune)', alg: "R U2 R' U' R U' R'" },
  { id: 'OLL27', name: 'Cross 27 (Sune)', alg: "R U R' U R U2 R'" },
  { id: 'OLL28', name: 'C 28', alg: "r U R' U' r' R U R U' R'" },
  { id: 'OLL29', name: 'Awkward 29', alg: "R U R' U' R U' R' F' U' F (R U R')" },
  { id: 'OLL30', name: 'Awkward 30', alg: "F R' F R2 U' R' U' R U R' F2" },
  { id: 'OLL31', name: 'P 31', alg: "R' U' F U R U' R' F' R" },
  { id: 'OLL32', name: 'P 32', alg: "L U F' U' L' U L F L'" },
  { id: 'OLL33', name: 'T 33', alg: "(R U R' U') (R' F R F')" },
  { id: 'OLL34', name: 'C 34', alg: "(R U R' U') B' (R' F R F') B" },
  { id: 'OLL35', name: 'Fish 35', alg: "R U2 R2 F R F' R U2 R'" },
  { id: 'OLL36', name: 'W 36', alg: "L' U' L U' L' U L U L F' L' F" },
  { id: 'OLL37', name: 'Fish 37', alg: "F (R U' R' U' R U R' F')" },
  { id: 'OLL38', name: 'W 38', alg: "R U R' U R U' R' U' R' F R F'" },
  { id: 'OLL39', name: 'BLS 39', alg: "L F' L' U' L U F U' L'" },
  { id: 'OLL40', name: 'BLS 40', alg: "R' F R U R' U' F' U R" },
  { id: 'OLL41', name: 'Awkward 41', alg: "R U R' U R U2 R' F (R U R' U') F'" },
  { id: 'OLL42', name: 'Awkward 42', alg: "R' U' R U' R' U2 R F (R U R' U') F'" },
  { id: 'OLL43', name: 'P 43', alg: "f' (L' U' L U) f" },
  { id: 'OLL44', name: 'P 44', alg: "f (R U R' U') f'" },
  { id: 'OLL45', name: 'T 45', alg: "F (R U R' U') F'" },
  { id: 'OLL46', name: 'C 46', alg: "R' U' (R' F R F') U R" },
  { id: 'OLL47', name: 'BLS 47', alg: "F' (L' U' L U) (L' U' L U) F" },
  { id: 'OLL48', name: 'BLS 48', alg: "F (R U R' U') (R U R' U') F'" },
  { id: 'OLL49', name: 'BLS 49', alg: "r U' r2 U r2 U r2 U' r" },
  { id: 'OLL50', name: 'BLS 50', alg: "r' U r2 U' r2 U' r2 U r'" },
  { id: 'OLL51', name: 'Line 51', alg: "f (R U R' U') (R U R' U') f'" },
  { id: 'OLL52', name: 'Line 52', alg: "R U R' U R d' R U' R' F'" },
  { id: 'OLL53', name: 'Square 53', alg: "r' U' R U' R' U R U' R' U2 r" },
  { id: 'OLL54', name: 'Square 54', alg: "r U R' U R U' R' U R U2 r'" },
  { id: 'OLL55', name: 'Line 55', alg: "R U2 R2 U' R U' R' U2 F R F'" },
  { id: 'OLL56', name: 'Line 56', alg: "r U r' U R U' R' U R U' R' r U' r'" },
  { id: 'OLL57', name: 'Cross 57 (H)', alg: "(R U R' U') M' (U R U' r')" },
];

// Full PLL (21 cases)
export const pllFull = [
  { id: 'Aa', name: 'Aa-perm', pattern: 'Corner 3-cycle (CCW)', alg: "x R' U R' D2 R U' R' D2 R2 x'" },
  { id: 'Ab', name: 'Ab-perm', pattern: 'Corner 3-cycle (CW)', alg: "x R2 D2 R U R' D2 R U' R x'" },
  { id: 'E',  name: 'E-perm', pattern: 'Diagonal corner swap', alg: "x' R U' R' D R U R' D' R U R' D R U' R' D'" },
  { id: 'F',  name: 'F-perm', pattern: 'Adjacent corner swap + edge', alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R" },
  { id: 'Ga', name: 'Ga-perm', pattern: '3-cycle corners & 3-cycle edges', alg: "R2 U R' U R' U' R U' R2 U' D R' U R D'" },
  { id: 'Gb', name: 'Gb-perm', pattern: '3-cycle corners & 3-cycle edges (mirror)', alg: "R' U' R U D' R2 U R' U R U' R U' R2 D" },
  { id: 'Gc', name: 'Gc-perm', pattern: '3-cycle corners & 3-cycle edges', alg: "R2 U' R U' R U R' U R2 U D' R U' R' D" },
  { id: 'Gd', name: 'Gd-perm', pattern: '3-cycle corners & 3-cycle edges', alg: "R U R' U' D R2 U' R U' R' U R' U R2 D'" },
  { id: 'H',  name: 'H-perm', pattern: 'Opposite edge swap', alg: "M2 U M2 U2 M2 U M2" },
  { id: 'Ja', name: 'Ja-perm', pattern: 'Adjacent corner+edge swap', alg: "x R2 F R F' R U2 r' U r U2 x'" },
  { id: 'Jb', name: 'Jb-perm', pattern: 'Adjacent corner+edge swap (mirror)', alg: "R U R' F' R U R' U' R' F R2 U' R'" },
  { id: 'Na', name: 'Na-perm', pattern: 'Diagonal corner+edge swap', alg: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'" },
  { id: 'Nb', name: 'Nb-perm', pattern: 'Diagonal corner+edge swap (mirror)', alg: "R' U R U' R' F' U' F R U R' F R' F' R U' R" },
  { id: 'Ra', name: 'Ra-perm', pattern: '3-corner cycle + edge swap', alg: "R U' R' U' R U R D R' U' R D' R' U2 R'" },
  { id: 'Rb', name: 'Rb-perm', pattern: '3-corner cycle + edge swap (mirror)', alg: "R2 F R U R U' R' F' R U2 R' U2 R" },
  { id: 'T',  name: 'T-perm', pattern: 'Adjacent corner+edge swap, the classic', alg: "R U R' U' R' F R2 U' R' U' R U R' F'" },
  { id: 'Ua', name: 'Ua-perm', pattern: 'Edge 3-cycle CCW', alg: "R U' R U R U R U' R' U' R2" },
  { id: 'Ub', name: 'Ub-perm', pattern: 'Edge 3-cycle CW', alg: "R2 U R U R' U' R' U' R' U R'" },
  { id: 'V',  name: 'V-perm', pattern: 'Diagonal corner + adjacent edge swap', alg: "R' U R' U' y R' F' R2 U' R' U R' F R F" },
  { id: 'Y',  name: 'Y-perm', pattern: 'Diagonal corner + opposite edge swap', alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'" },
  { id: 'Z',  name: 'Z-perm', pattern: 'Adjacent edge double-swap', alg: "M2 U M2 U M' U2 M2 U2 M'" },
];

// Group helpers used by views
export const algorithmGroups = {
  '2look-oll-edges': { title: '2-Look OLL — Edges', algs: ollTwoLookEdges },
  '2look-oll-corners': { title: '2-Look OLL — Corners', algs: ollTwoLookCorners },
  '2look-pll-corners': { title: '2-Look PLL — Corners', algs: pllTwoLookCorners },
  '2look-pll-edges': { title: '2-Look PLL — Edges', algs: pllTwoLookEdges },
  'f2l-basic': { title: 'F2L — Foundation cases', algs: f2lBasic },
  'oll-full': { title: 'Full OLL (57)', algs: ollFull },
  'pll-full': { title: 'Full PLL (21)', algs: pllFull },
};
