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

export const cubeConfigs: Record<string, CubeConfig> = {
  solved: { stickering: 'full', visualization: '3D' },

  'cross-solved': {
    setup: "R U R' F2 L F U F",
    stickering: 'full',
    visualization: '3D',
  },
  'f2l-solved': {
    setup: "R U R' U R U2 R' U R U R' U' R' F R F'",
    stickering: 'full',
    visualization: '3D',
  },
  'oll-solved': {
    setup: "R U R' U' R' F R2 U' R' U' R U R' F'",
    stickering: 'full',
    visualization: '3D',
  },
};

export type CubeView = 'oll-edges' | 'oll-corners' | 'oll-full' | 'pll' | 'iso';

export function getCubeConfig(id: string): CubeConfig | undefined {
  return cubeConfigs[id];
}
