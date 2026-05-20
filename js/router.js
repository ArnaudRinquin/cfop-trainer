// Trivial hash-based router. Routes are #/dashboard, #/lesson/<id>, #/timer, #/algorithms.

const listeners = new Set();

export function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '') || 'dashboard';
  const [name, ...rest] = hash.split('/');
  return { name, params: rest };
}

export function navigate(path) {
  if (!path.startsWith('#')) path = '#/' + path.replace(/^\//, '');
  if (window.location.hash !== path) {
    window.location.hash = path;
  } else {
    // same hash - force re-render
    listeners.forEach((fn) => fn(parseRoute()));
  }
}

export function onRouteChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

window.addEventListener('hashchange', () => {
  listeners.forEach((fn) => fn(parseRoute()));
});
