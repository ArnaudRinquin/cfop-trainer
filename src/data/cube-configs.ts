// Named static cube configurations. Used by MDX `<Cube id="..." />` and stage
// thumbnails. Algorithm cards bypass this registry — they invert the alg
// string directly. Setup convention: yellow on top, white on bottom.

import type { StickeringKind, VisualizationKind } from '~/components/TwistyCube';

export interface CubeConfig {
  setup?: string;
  alg?: string;
  stickering?: StickeringKind;
  visualization?: VisualizationKind;
}

// CFOP convention: yellow on top, white on bottom — `z2` flips cubing.js's
// default (white on top) to match.
export const cubeConfigs: Record<string, CubeConfig> = {
  solved: { setup: 'z2', stickering: 'full', visualization: '3D' },

  scrambled: {
    setup: "z2 F R U2 L2 D' R' F' U L' B2 R U' D F2 B'",
    stickering: 'full',
    visualization: '3D',
  },
  // Cross preserved on the bottom (D-cross = white after z2). F2L-style
  // sequences keep D-edges intact while scrambling F2L slots + U layer.
  'cross-solved': {
    setup: "z2 R U R' U' L' U' L U F U F' U' B' U' B U",
    stickering: 'full',
    visualization: '3D',
  },
  // F2L done, OLL pending — Sune leaves bottom 2 layers solved.
  'f2l-solved': {
    setup: "z2 R U R' U R U2 R'",
    stickering: 'full',
    visualization: '3D',
  },
  // OLL done, PLL pending — T-perm permutes the (already-oriented) yellow top.
  'oll-solved': {
    setup: "z2 R U R' U' R' F R2 U' R' U' R U R' F'",
    stickering: 'full',
    visualization: '3D',
  },

  // Sexy move at start (demo for notation lesson).
  sexy: { setup: 'z2', alg: "R U R' U'", stickering: 'full', visualization: '3D' },
};

export type CubeView = 'oll-edges' | 'oll-corners' | 'oll-full' | 'pll' | 'iso';

export function getCubeConfig(id: string): CubeConfig | undefined {
  return cubeConfigs[id];
}
