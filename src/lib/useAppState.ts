import { useSyncExternalStore } from 'react';
import { getServerState, getState, subscribe, type AppState } from './state';

// Hydration-safe access to persisted state: renders defaults on the server and
// during hydration, then switches to the localStorage snapshot.
export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, getState, getServerState);
}
