// The field of an entity: particles carried by a noise field and a steady wind, leaving trails. It is the user's p5
// study (referencias/campo-de-particulas-p5.js) without p5: the same motion, with the entity's colors instead of the
// pointer's hue, the entity's genes instead of sliders, and a seed, so the same key always gives the same field.
// `campo()` is the simulation (no DOM: Node tests it); `pintarCampo()` draws one frame on a canvas 2D context.
import { hash, rng } from '../../entidades/semilla.mjs';

// Seeded value noise in three dimensions, three octaves, between 0 and 1 (what p5's noise() gave the original).
function ruido(seed) {
  const r = rng(seed), p = new Uint8Array(512), v = new Float32Array(256);
  for (let i = 0; i < 256; i++) { p[i] = i; v[i] = r(); }
  for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)), t = p[i]; p[i] = p[j]; p[j] = t; }
  for (let i = 0; i < 256; i++) p[i + 256] = p[i];
  const s = (t) => t * t * (3 - 2 * t), l = (a, b, t) => a + (b - a) * t;
  const una = (x, y, z) => {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), X = xi & 255, Y = yi & 255, Z = zi & 255, u = s(x - xi), w = s(y - yi), q = s(z - zi);
    const g = (i, j, k) => v[p[p[p[X + i] + Y + j] + Z + k]];
    return l(l(l(g(0, 0, 0), g(1, 0, 0), u), l(g(0, 1, 0), g(1, 1, 0), u), w), l(l(g(0, 0, 1), g(1, 0, 1), u), l(g(0, 1, 1), g(1, 1, 1), u), w), q);
  };
  return (x, y, z) => (una(x, y, z) * 4 + una(x * 2, y * 2, z * 2) * 2 + una(x * 4, y * 4, z * 4)) / 7;
}

// A field of `ancho` × `alto` pixels. The entity decides: the pace (its type's speed: a slower entity drifts slower),
// how many currents (one scale of noise per group of its definition: more groups, smaller eddies), the size of a
// particle (its stroke) and the colors (its piece palette, with the accent on one particle in twelve).
// The amount of particles follows the area, up to `max`. `avanzar()` moves every particle one step of 1/60 s.
export function campo(G, clave, ancho, alto, o = {}) {
  const r = rng(hash(`campo|${G.semilla}|${clave}`)), n3 = ruido(hash(`ruido|${G.semilla}|${clave}`)), C = G.pieza;
  const n = Math.max(200, Math.min(o.max ?? 9000, Math.round(ancho * alto * (o.densidad ?? 0.012))));
  const x = new Float32Array(n), y = new Float32Array(n), color = new Uint8Array(n), colores = [...C.barras, C.acento];
  for (let i = 0; i < n; i++) { x[i] = r() * ancho; y[i] = r() * alto; color[i] = r() < 1 / 12 ? C.barras.length : Math.floor(r() * C.barras.length); }
  const escala = 360 / G.grupos, fuerza = 1.2, paso = 1 / G.ritmo, giro = Math.PI * 2 * fuerza;
  const F = { n, ancho, alto, x, y, color, colores, base: C.base, radio: 1.5 * G.trazo, t: 0, escala, paso };
  F.avanzar = () => {
    const z = F.t / escala;
    for (let i = 0; i < n; i++) {
      const a = n3(x[i] / escala, y[i] / escala, z) * giro, c = Math.cos(a), s = Math.sin(a);
      // The original's direction: the field's, plus a wind of one step to the right.
      x[i] += (c + 1) * paso; y[i] += (s - c * s) * paso;
      if (x[i] < 0 || x[i] > ancho || y[i] < 0 || y[i] > alto) { x[i] = r() * ancho; y[i] = r() * alto; }
    }
    F.t++;
  };
  return F;
}

// One frame: a veil of the ground's color over what was there (the trails fade), then every particle, color by color.
export function pintarCampo(ctx, F) {
  ctx.globalAlpha = 0.09; ctx.fillStyle = F.base; ctx.fillRect(0, 0, F.ancho, F.alto); ctx.globalAlpha = 1;
  for (let k = 0; k < F.colores.length; k++) {
    ctx.fillStyle = F.colores[k]; ctx.beginPath();
    for (let i = 0; i < F.n; i++) if (F.color[i] === k) { ctx.moveTo(F.x[i] + F.radio, F.y[i]); ctx.arc(F.x[i], F.y[i], F.radio, 0, Math.PI * 2); }
    ctx.fill();
  }
}
