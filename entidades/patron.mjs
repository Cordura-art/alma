// The pattern of an entity: one drawing of its own that decides its materials (where each of two yarns goes, where a
// layer is cut away, where a surface rises). It is a Chladni figure, the kind sand draws on a plate that rings: a sum of
// standing waves, each with two whole numbers. Ours are the entity's numbers, so the pattern costs a few numbers and
// is always the same for the same chart. No imports beyond the seed and no DOM.
import { hash, azar } from './semilla.mjs';

// Its modes: [{ n, m, a, s }] — two whole numbers (never equal), how much the wave weighs and whether its two halves
// add (s = 1) or subtract (s = -1). The first is the big shape; the others break it up.
export function patronDe(G) {
  const R = azar(hash(G.semilla + '|patron')), N = (G.numeros && G.numeros.length ? G.numeros : [3, 4, 5]).slice(0, 4);
  const pares = []; for (let i = 0; i < N.length && pares.length < 3; i++) { const n = N[i], m = N[(i + 1) % N.length]; if (n !== m) pares.push([n, m]); }
  if (!pares.length) pares.push([2, 3]);
  return { modos: pares.map(([n, m], i) => ({ n, m, a: Math.round((i === 0 ? 1 : R.f(0.3, 0.6) / i) * 1000) / 1000, s: R.b() ? 1 : -1 })) };
}
// Its value at a point of the unit square (u and v from 0 to 1): positive on one side of its lines, negative on the other.
export function patron(P, u, v) {
  let t = 0; const pi = Math.PI;
  for (const { n, m, a, s } of P.modos) t += a * (Math.cos(n * pi * u) * Math.cos(m * pi * v) + s * Math.cos(m * pi * u) * Math.cos(n * pi * v));
  return t;
}
