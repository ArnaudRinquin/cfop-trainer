import { getCubeConfig } from '~/data/cube-configs';
import TwistyCube, { type StickeringKind, type VisualizationKind } from './TwistyCube';

interface Props {
  id: string;
  size?: number;
  stickering?: StickeringKind;
  visualization?: VisualizationKind;
  animated?: boolean;
}

// MDX-friendly wrapper. Looks up a named config and renders a TwistyCube.
// `animated` toggles the cubing.js control panel.
export default function Cube({ id, size = 140, stickering, visualization, animated = false }: Props) {
  const config = getCubeConfig(id);
  if (!config) {
    return (
      <div className="text-xs text-red-400 font-mono">missing cube config: {id}</div>
    );
  }
  return (
    <TwistyCube
      setupAlg={config.setup ?? ''}
      alg={config.alg ?? ''}
      stickering={stickering ?? config.stickering ?? 'full'}
      visualization={visualization ?? config.visualization ?? '3D'}
      controls={animated ? 'bottom-row' : 'none'}
      size={size}
    />
  );
}
