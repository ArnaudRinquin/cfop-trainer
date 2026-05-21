import { describe, it, expect } from 'vitest';
import { invertMoves } from './moves';

describe('invertMoves', () => {
  it('empty stays empty', () => {
    expect(invertMoves('').trim()).toBe('');
  });

  it('plain inverts to prime', () => {
    expect(invertMoves('R').trim()).toBe("R'");
  });

  it('prime inverts to plain', () => {
    expect(invertMoves("R'").trim()).toBe('R');
  });

  it('half-turn stays half-turn', () => {
    expect(invertMoves('R2').trim()).toBe('R2');
  });

  it('reverses sequence order', () => {
    expect(invertMoves('R U F').trim()).toBe("F' U' R'");
  });

  it('strips parens', () => {
    expect(invertMoves("(R U R' U')").trim()).toBe("U R U' R'");
  });

  it('handles slice and wide tokens', () => {
    expect(invertMoves("M2 U M2 U2 M2 U M2").trim()).toBe("M2 U' M2 U2 M2 U' M2");
    expect(invertMoves("r U R'").trim()).toBe("R U' r'");
  });

  it('handles rotations', () => {
    expect(invertMoves("x R' x'").trim()).toBe("x R x'");
  });

  it('is self-inverse', () => {
    const alg = "R U R' U' R' F R2 U' R' U' R U R' F'";
    expect(invertMoves(invertMoves(alg)).trim()).toBe(alg.replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim());
  });
});
