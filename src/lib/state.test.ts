import { beforeEach, describe, expect, it } from 'vitest';
import {
  addSolve,
  ao,
  bestSolve,
  deleteSolve,
  getState,
  importData,
  resetAll,
  setPenalty,
} from './state';

const seed = (times: number[]) => {
  // addSolve prepends, so add oldest first.
  for (const ms of [...times].reverse()) addSolve({ ms, scramble: '' });
};

describe('state', () => {
  beforeEach(() => resetAll());

  it('ao5 drops best and worst', () => {
    seed([10000, 12000, 14000, 9000, 20000]);
    expect(ao(5)).toBe(12000);
  });

  it('ao5 with two DNFs is DNF', () => {
    seed([10000, 12000, 14000, 9000, 20000]);
    setPenalty(0, 'dnf');
    expect(ao(5)).not.toBe('DNF');
    setPenalty(1, 'dnf');
    expect(ao(5)).toBe('DNF');
  });

  it('ao100 trims 5 each side', () => {
    seed(Array.from({ length: 100 }, (_, i) => (i + 1) * 1000));
    expect(ao(100)).toBe(50500);
  });

  it('+2 counts toward averages and best', () => {
    seed([10000, 12000, 14000, 9000, 20000]);
    setPenalty(3, 'plus2'); // 9000 -> 11000
    expect(bestSolve()?.ms).toBe(10000);
    expect(ao(5)).toBeCloseTo((11000 + 12000 + 14000) / 3);
  });

  it('solves get unique timestamps and delete removes one', () => {
    addSolve({ ms: 1, scramble: '' });
    addSolve({ ms: 2, scramble: '' });
    const [a, b] = getState().solves;
    expect(a.ts).not.toBe(b.ts);
    deleteSolve(0);
    expect(getState().solves.map((s) => s.ms)).toEqual([1]);
  });

  it('mutations produce a new snapshot', () => {
    const before = getState();
    addSolve({ ms: 1, scramble: '' });
    expect(getState()).not.toBe(before);
  });

  it('import validates shape and merges prefs', () => {
    expect(() => importData('[]')).toThrow();
    expect(() => importData('{"solves": [{"ms": "x"}]}')).toThrow();
    importData('{"prefs": {"scrambleLength": 25}}');
    expect(getState().prefs).toMatchObject({ scrambleLength: 25, inspectionSeconds: 15 });
  });
});
