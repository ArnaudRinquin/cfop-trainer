// Algorithm library: 2-look OLL/PLL, full OLL, full PLL, common F2L cases.
// Algorithms (notation strings) are universal. Names like Sune / T-perm are
// also universal cuber vocabulary — we only translate descriptive patterns.
import { tr, localize } from '../i18n.js';

const ollTwoLookEdges = [
  {
    id: 'oll-2l-edge-dot',
    name: tr('Dot (no edges)', 'Point (aucune arête)'),
    pattern: tr('No yellow edges oriented on top', 'Aucune arête jaune orientée en haut'),
    alg: "F (R U R' U') F' f (R U R' U') f'",
    sticker: [
      ['X', 'X', 'X'],
      ['X', 'Y', 'X'],
      ['X', 'X', 'X'],
    ],
  },
  {
    id: 'oll-2l-edge-line',
    name: tr('Line', 'Ligne'),
    pattern: tr('Horizontal yellow bar across the top', 'Barre jaune horizontale sur le dessus'),
    alg: "F (R U R' U') F'",
    sticker: [
      ['X', 'X', 'X'],
      ['Y', 'Y', 'Y'],
      ['X', 'X', 'X'],
    ],
  },
  {
    id: 'oll-2l-edge-l',
    name: tr('L-shape', 'L'),
    pattern: tr('Two adjacent edges form an L', 'Deux arêtes adjacentes forment un L'),
    alg: "f (R U R' U') f'",
    sticker: [
      ['X', 'Y', 'X'],
      ['X', 'Y', 'Y'],
      ['X', 'X', 'X'],
    ],
  },
];

const ollTwoLookCorners = [
  {
    id: 'oll-2l-corner-sune',
    name: tr('Sune', 'Sune'),
    pattern: tr('One corner oriented, others form a Sune pattern', 'Un coin orienté, les autres en motif Sune'),
    alg: "R U R' U R U2 R'",
    sticker: [
      ['Y', 'X', 'X'],
      ['X', 'Y', 'X'],
      ['Y', 'Y', 'X'],
    ],
  },
  {
    id: 'oll-2l-corner-antisune',
    name: tr('Anti-Sune', 'Anti-Sune'),
    pattern: tr('Mirror of Sune', 'Miroir du Sune'),
    alg: "R U2 R' U' R U' R'",
    sticker: [
      ['X', 'X', 'Y'],
      ['X', 'Y', 'X'],
      ['Y', 'Y', 'X'],
    ],
  },
  {
    id: 'oll-2l-corner-headlights',
    name: tr('Headlights', 'Headlights'),
    pattern: tr('Two corners on the same side oriented', 'Deux coins orientés du même côté'),
    alg: "R2 D R' U2 R D' R' U2 R'",
    sticker: [
      ['Y', 'X', 'Y'],
      ['X', 'Y', 'X'],
      ['X', 'X', 'X'],
    ],
  },
  {
    id: 'oll-2l-corner-pi',
    name: tr('Pi (bowtie)', 'Pi (nœud papillon)'),
    pattern: tr('Two corners diagonally facing front/back', 'Deux coins en diagonale devant/derrière'),
    alg: "R U2 R' U' R U R' U' R U' R'",
    sticker: [
      ['X', 'Y', 'X'],
      ['X', 'Y', 'X'],
      ['X', 'Y', 'X'],
    ],
  },
  {
    id: 'oll-2l-corner-u',
    name: tr('U (chameleon)', 'U (caméléon)'),
    pattern: tr('Two opposite corners oriented', 'Deux coins opposés orientés'),
    alg: "F (R U R' U') (R U R' U') F'",
    sticker: [
      ['X', 'X', 'X'],
      ['Y', 'Y', 'Y'],
      ['X', 'Y', 'X'],
    ],
  },
  {
    id: 'oll-2l-corner-t',
    name: tr('T', 'T'),
    pattern: tr('Two adjacent corners oriented (back)', 'Deux coins adjacents orientés (arrière)'),
    alg: "r U R' U' r' F R F'",
    sticker: [
      ['X', 'Y', 'X'],
      ['X', 'Y', 'X'],
      ['Y', 'X', 'Y'],
    ],
  },
  {
    id: 'oll-2l-corner-h',
    name: tr('H (cross)', 'H (croix)'),
    pattern: tr('No corners oriented, all edges form plus', 'Aucun coin orienté, toutes les arêtes forment une croix'),
    alg: "F (R U R' U')(R U R' U')(R U R' U') F'",
    sticker: [
      ['X', 'Y', 'X'],
      ['Y', 'Y', 'Y'],
      ['X', 'Y', 'X'],
    ],
  },
];

const pllTwoLookCorners = [
  {
    id: 'pll-2l-aa',
    name: tr('Aa-perm (corner 3-cycle)', 'Aa-perm (3-cycle de coins)'),
    pattern: tr('Cycle three corners counterclockwise', 'Cycle de trois coins, anti-horaire'),
    alg: "x R' U R' D2 R U' R' D2 R2 x'",
  },
  {
    id: 'pll-2l-ae',
    name: tr('E-perm (diagonal corner swap)', 'E-perm (échange diagonal de coins)'),
    pattern: tr('Two diagonal pairs of corners swapped', 'Deux paires de coins en diagonale échangées'),
    alg: "x' R U' R' D R U R' D' R U R' D R U' R' D' x",
  },
];

const pllTwoLookEdges = [
  {
    id: 'pll-2l-ua',
    name: tr('Ua-perm (edge 3-cycle)', 'Ua-perm (3-cycle d’arêtes)'),
    pattern: tr('Cycle three edges (UFR pointer)', 'Cycle de trois arêtes (pointeur UFR)'),
    alg: "R U' R U R U R U' R' U' R2",
  },
  {
    id: 'pll-2l-ub',
    name: tr('Ub-perm (edge 3-cycle mirror)', 'Ub-perm (miroir du Ua)'),
    pattern: tr('Cycle three edges the other way', 'Cycle de trois arêtes dans l’autre sens'),
    alg: "R2 U R U R' U' R' U' R' U R'",
  },
  {
    id: 'pll-2l-h',
    name: tr('H-perm (edge swap opposite)', 'H-perm (échange d’arêtes opposées)'),
    pattern: tr('Swap front+back edges and left+right edges', 'Échange avant+arrière et gauche+droite'),
    alg: "M2 U M2 U2 M2 U M2",
  },
  {
    id: 'pll-2l-z',
    name: tr('Z-perm (adjacent edge swap)', 'Z-perm (échange d’arêtes adjacentes)'),
    pattern: tr('Swap two pairs of adjacent edges', 'Échange de deux paires d’arêtes adjacentes'),
    alg: "M2 U M2 U M' U2 M2 U2 M'",
  },
];

const f2lBasic = [
  {
    id: 'f2l-1',
    name: tr('Pair already made — slot it in', 'Paire déjà formée — insérez'),
    pattern: tr('Corner+edge pair sits in the top, slot is empty', 'Paire coin+arête sur le dessus, slot vide'),
    alg: "U R U' R'",
    note: tr('When pair is on the right above its slot', 'Quand la paire est à droite, au-dessus de son slot'),
  },
  {
    id: 'f2l-2',
    name: tr('Pair on the left', 'Paire à gauche'),
    pattern: tr('Pair sits above its slot on the left side', 'La paire est au-dessus de son slot, à gauche'),
    alg: "U' L' U L",
    note: tr('Mirror of slot-1 insertion', 'Miroir de l’insertion du slot 1'),
  },
  {
    id: 'f2l-3',
    name: tr('Corner on top, edge on top — same side', 'Coin et arête sur le dessus — même côté'),
    pattern: tr('White corner and the edge both on top, easy join', 'Coin blanc et arête tous les deux sur le dessus, jonction facile'),
    alg: "U R U' R' U' F' U F",
    note: tr('Build pair then insert', 'Formez la paire puis insérez'),
  },
  {
    id: 'f2l-4',
    name: tr('Edge in slot wrong, corner on top', 'Arête mal placée dans le slot, coin sur le dessus'),
    pattern: tr('Need to extract edge then rejoin', 'Extraire l’arête puis la réassembler'),
    alg: "R U' R' U F' U' F",
    note: tr('Common situation — practice extraction', 'Cas fréquent — pratiquez l’extraction'),
  },
];

// Full OLL (57) — only patterns translated; the names are nicknames cubers use
// in English worldwide.
const ollFull = [
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

// Full PLL (21) - names universal; patterns translated.
const pllFull = [
  { id: 'Aa', name: 'Aa-perm', pattern: tr('Corner 3-cycle (CCW)', '3-cycle de coins (anti-horaire)'), alg: "x R' U R' D2 R U' R' D2 R2 x'" },
  { id: 'Ab', name: 'Ab-perm', pattern: tr('Corner 3-cycle (CW)', '3-cycle de coins (horaire)'), alg: "x R2 D2 R U R' D2 R U' R x'" },
  { id: 'E',  name: 'E-perm', pattern: tr('Diagonal corner swap', 'Échange diagonal de coins'), alg: "x' R U' R' D R U R' D' R U R' D R U' R' D'" },
  { id: 'F',  name: 'F-perm', pattern: tr('Adjacent corner swap + edge', 'Échange de coins adjacents + arête'), alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R" },
  { id: 'Ga', name: 'Ga-perm', pattern: tr('3-cycle corners & 3-cycle edges', '3-cycle de coins + 3-cycle d’arêtes'), alg: "R2 U R' U R' U' R U' R2 U' D R' U R D'" },
  { id: 'Gb', name: 'Gb-perm', pattern: tr('3-cycle corners & 3-cycle edges (mirror)', '3-cycle de coins + 3-cycle d’arêtes (miroir)'), alg: "R' U' R U D' R2 U R' U R U' R U' R2 D" },
  { id: 'Gc', name: 'Gc-perm', pattern: tr('3-cycle corners & 3-cycle edges', '3-cycle de coins + 3-cycle d’arêtes'), alg: "R2 U' R U' R U R' U R2 U D' R U' R' D" },
  { id: 'Gd', name: 'Gd-perm', pattern: tr('3-cycle corners & 3-cycle edges', '3-cycle de coins + 3-cycle d’arêtes'), alg: "R U R' U' D R2 U' R U' R' U R' U R2 D'" },
  { id: 'H',  name: 'H-perm', pattern: tr('Opposite edge swap', 'Échange d’arêtes opposées'), alg: "M2 U M2 U2 M2 U M2" },
  { id: 'Ja', name: 'Ja-perm', pattern: tr('Adjacent corner+edge swap', 'Échange coin+arête adjacents'), alg: "x R2 F R F' R U2 r' U r U2 x'" },
  { id: 'Jb', name: 'Jb-perm', pattern: tr('Adjacent corner+edge swap (mirror)', 'Échange coin+arête adjacents (miroir)'), alg: "R U R' F' R U R' U' R' F R2 U' R'" },
  { id: 'Na', name: 'Na-perm', pattern: tr('Diagonal corner+edge swap', 'Échange diagonal coin+arête'), alg: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'" },
  { id: 'Nb', name: 'Nb-perm', pattern: tr('Diagonal corner+edge swap (mirror)', 'Échange diagonal coin+arête (miroir)'), alg: "R' U R U' R' F' U' F R U R' F R' F' R U' R" },
  { id: 'Ra', name: 'Ra-perm', pattern: tr('3-corner cycle + edge swap', '3-cycle de coins + échange d’arête'), alg: "R U' R' U' R U R D R' U' R D' R' U2 R'" },
  { id: 'Rb', name: 'Rb-perm', pattern: tr('3-corner cycle + edge swap (mirror)', '3-cycle de coins + échange d’arête (miroir)'), alg: "R2 F R U R U' R' F' R U2 R' U2 R" },
  { id: 'T',  name: 'T-perm', pattern: tr('Adjacent corner+edge swap, the classic', 'Échange coin+arête adjacents, le classique'), alg: "R U R' U' R' F R2 U' R' U' R U R' F'" },
  { id: 'Ua', name: 'Ua-perm', pattern: tr('Edge 3-cycle CCW', '3-cycle d’arêtes (anti-horaire)'), alg: "R U' R U R U R U' R' U' R2" },
  { id: 'Ub', name: 'Ub-perm', pattern: tr('Edge 3-cycle CW', '3-cycle d’arêtes (horaire)'), alg: "R2 U R U R' U' R' U' R' U R'" },
  { id: 'V',  name: 'V-perm', pattern: tr('Diagonal corner + adjacent edge swap', 'Échange diagonal de coins + arêtes adjacentes'), alg: "R' U R' U' y R' F' R2 U' R' U R' F R F" },
  { id: 'Y',  name: 'Y-perm', pattern: tr('Diagonal corner + opposite edge swap', 'Échange diagonal de coins + arêtes opposées'), alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'" },
  { id: 'Z',  name: 'Z-perm', pattern: tr('Adjacent edge double-swap', 'Double échange d’arêtes adjacentes'), alg: "M2 U M2 U M' U2 M2 U2 M'" },
];

const GROUPS = {
  '2look-oll-edges': { titleKey: '2look-oll-edges', algs: ollTwoLookEdges },
  '2look-oll-corners': { titleKey: '2look-oll-corners', algs: ollTwoLookCorners },
  '2look-pll-corners': { titleKey: '2look-pll-corners', algs: pllTwoLookCorners },
  '2look-pll-edges': { titleKey: '2look-pll-edges', algs: pllTwoLookEdges },
  'f2l-basic': { titleKey: 'f2l-basic', algs: f2lBasic },
  'oll-full': { titleKey: 'oll-full', algs: ollFull },
  'pll-full': { titleKey: 'pll-full', algs: pllFull },
};

// Locale-aware getter. Resolves tr() cells on every access.
export function getAlgorithmGroups() {
  const out = {};
  for (const key in GROUPS) {
    out[key] = {
      titleKey: GROUPS[key].titleKey,
      algs: localize(GROUPS[key].algs),
    };
  }
  return out;
}
