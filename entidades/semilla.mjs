// The seed of everything an entity generates: a hash of a key, a random sequence that always repeats for the same seed,
// and the traits of a key. The same entity and the same key always give the same drawing.
// No imports and no DOM: the builds bundle this file into pages (without its `export` words) and Node tests it.

export function hash(s) { let x = 2166136261; for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
export function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
// The same randomness with the helpers the drawings use: a float in a range, an integer in a range, a coin.
export function azar(seed) { const fn = rng(seed); fn.f = (a, b) => a + fn() * (b - a); fn.i = (a, b) => Math.floor(fn.f(a, b + 0.9999)); fn.b = (p = 0.5) => fn() < p; return fn; }
// The traits of a key, read from the bits of its hash (the user's v14 study): counts, proportions, angles, switches and
// `variant` (0–7), which picks a drawing's composition. The same key always has the same traits.
export function rasgos(h) {
  const b = (shift, bits) => (h >>> shift) & ((1 << bits) - 1), pi = Math.PI;
  return { n: 3 + b(0, 4) % 12, n2: 2 + b(4, 3) % 6, ratio: b(8, 8) / 255, angle: b(16, 8) / 255 * pi, decay: 0.52 + b(24, 6) / 255 * 0.36, phase: b(2, 8) / 255 * pi * 2,
    flip: !!(h & (1 << 10)), alt: !!(h & (1 << 11)), sub: !!(h & (1 << 12)), mode: b(13, 2), variant: b(18, 3), weight: b(21, 3), h };
}
