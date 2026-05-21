import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

export type StickeringKind =
  | 'full'
  | 'OLL'
  | 'OCLL'
  | 'OLL-CO'
  | 'EOLL'
  | 'PLL'
  | 'F2L'
  | 'CLS'
  | 'ELL';

export type VisualizationKind =
  | '3D'
  | '2D'
  | 'PG3D'
  | 'experimental-2D-LL'
  | 'experimental-2D-LL-face';

interface Props {
  alg?: string;
  setupAlg?: string;
  visualization?: VisualizationKind;
  stickering?: StickeringKind;
  controls?: 'none' | 'bottom-row';
  size?: number;
  background?: 'none' | 'checkered';
  anchor?: 'start' | 'end';
}

export interface TwistyCubeHandle {
  play(): void;
  pause(): void;
  togglePlay(): void;
  jumpToStart(): void;
  jumpToEnd(): void;
  stepForward(): void;
  stepBackward(): void;
  onPlayingChange(listener: (playing: boolean) => void): () => void;
}

type TwistyPlayerEl = HTMLElement & {
  alg?: string;
  experimentalSetupAlg?: string;
  experimentalSetupAnchor?: string;
  visualization?: string;
  experimentalStickering?: string;
  controlPanel?: string;
  background?: string;
  hintFacelets?: string;
  puzzle?: string;
  play(): void;
  pause(): void;
  togglePlay(force?: boolean): void;
  jumpToStart(opts?: unknown): void;
  jumpToEnd(opts?: unknown): void;
  controller?: {
    animationController: {
      play(opts: { direction: 1 | -1; untilBoundary: 'move' | 'entire-timeline' }): void;
    };
  };
  experimentalModel?: {
    playingInfo: {
      addFreshListener(fn: (info: { playing: boolean }) => void): () => void;
    };
  };
};

let importedTwisty: Promise<unknown> | null = null;
function ensureTwisty() {
  if (!importedTwisty) {
    importedTwisty = import('cubing/twisty');
  }
  return importedTwisty;
}

const TwistyCube = forwardRef<TwistyCubeHandle, Props>(function TwistyCube(
  {
    alg = '',
    setupAlg = '',
    visualization = 'experimental-2D-LL',
    stickering = 'full',
    controls = 'none',
    size = 120,
    background = 'none',
    anchor = 'start',
  },
  forwardedRef
) {
  const ref = useRef<TwistyPlayerEl | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    ensureTwisty().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !ready) return;
    el.puzzle = '3x3x3';
    el.experimentalSetupAlg = setupAlg;
    el.experimentalSetupAnchor = anchor;
    el.visualization = visualization;
    el.experimentalStickering = stickering;
    el.controlPanel = controls;
    el.background = background;
    el.hintFacelets = 'none';
    el.alg = alg;
  }, [ready, alg, setupAlg, visualization, stickering, controls, background, anchor]);

  useImperativeHandle(
    forwardedRef,
    (): TwistyCubeHandle => ({
      play: () => ref.current?.play(),
      pause: () => ref.current?.pause(),
      togglePlay: () => ref.current?.togglePlay(),
      jumpToStart: () => ref.current?.jumpToStart(),
      jumpToEnd: () => ref.current?.jumpToEnd(),
      stepForward: () =>
        ref.current?.controller?.animationController.play({ direction: 1, untilBoundary: 'move' }),
      stepBackward: () =>
        ref.current?.controller?.animationController.play({ direction: -1, untilBoundary: 'move' }),
      onPlayingChange: (listener) => {
        const el = ref.current;
        const model = el?.experimentalModel;
        if (!model) return () => {};
        return model.playingInfo.addFreshListener((info) => listener(info.playing));
      },
    }),
    [ready]
  );

  if (!ready) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-md bg-black/30"
        aria-hidden="true"
      />
    );
  }

  return (
    // @ts-expect-error - custom element not in JSX intrinsic elements
    <twisty-player
      ref={ref}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
});

export default TwistyCube;
