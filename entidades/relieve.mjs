// The relief of an entity: its field as a land, drawn only with lines. It is the still texture of the entity: as a
// piece it sits on ink with the full palette; as a ground it goes quiet enough for text to read on top.
// The idea of drawing volume with lines alone, and of showing a line only where nothing stands in front of it, comes
// from fogleman/ln (MIT); nothing of its code is used. Here the land is drawn row by row, the nearest first, and each
// row shows only what rises above everything drawn before it.
// `relieve()` gives the height of the land at a point (no DOM: Node tests it); `relieveSvg()` writes the drawing.
import { hash } from './semilla.mjs';
import { ruido, MAPA } from './campo.mjs';

// The height of the land at (x, y), both from 0 to 1 (x left to right, y far to near). It comes from what moves the
// entity's field: the noise (finer with more groups in its definition), its direction (a peak where the field converges, ripples from
// where it bursts, a ring where it turns, a spiral, or a mirror) and a hill for each defined center, at its place on the chart lying down (the
// field's own map: the head on the left, the root on the right).
export function relieve(G, clave) {
  const n3 = ruido(hash(`relieve|${G.semilla}|${clave}`)), dir = G.direccion || '', k = 2.2 * G.grupos;
  const centros = (G.centros || []).filter((id) => MAPA[id]).map((id) => [0.08 + MAPA[id][0] * 0.84, 0.5 + MAPA[id][1] * 0.4]);
  return (x, y) => {
    const X = dir === 'espejo' ? 0.5 - Math.abs(x - 0.5) : x;
    let h = n3(X * k, y * k, 0) * 0.55, dx, dy, d;
    if (dir === 'foco') { dx = x - 0.8; dy = y - 0.5; h += 0.95 * Math.exp(-(dx * dx + dy * dy) / 0.035); }
    else if (dir === 'estallido') { dx = x - 0.18; dy = y - 0.5; d = Math.hypot(dx, dy); h += 0.3 * Math.cos(d * 34) * Math.exp(-d * 2.4) + 0.5 * Math.exp(-d * d / 0.01); }
    else if (dir === 'giro') { dx = x - 0.5; dy = (y - 0.5) * 0.9; d = Math.hypot(dx, dy); h += 0.7 * Math.exp(-((d - 0.27) ** 2) / 0.004); }
    else if (dir === 'espiral') { dx = x - 0.5; dy = y - 0.5; d = Math.hypot(dx, dy); h += 0.55 * (0.5 + 0.5 * Math.cos(Math.atan2(dy, dx) * 2 - d * 22)) * Math.exp(-d * 1.6); }
    for (const c of centros) { dx = x - c[0]; dy = y - c[1]; h += 0.42 * Math.exp(-(dx * dx + dy * dy) / 0.005); }
    return h;
  };
}

const dec = (v) => Math.round(v * 10) / 10;
// The relief as an SVG of `ancho` × `alto` (640 × 360 unless told). `modo` 'pieza' (on ink, the full palette, the
// accent on one row in twelve) or 'fondo' (the quiet colors of a ground for `tema` 'dark' or 'light': text-01 and
// text-02 read on every one of them). The same entity and the same key always give the same land. Decorative unless
// `nombre` is given. As a background it covers its box: use it with `background-size: cover`.
export function relieveSvg(G, clave, o = {}) {
  const W = o.ancho ?? 640, H = o.alto ?? 360, C = o.modo === 'fondo' ? G.fondo[o.tema === 'light' ? 'light' : 'dark'] : G.pieza;
  const alt = relieve(G, clave), filas = o.filas ?? 40, paso = 5, cols = Math.ceil(W / paso) + 1, tope = new Float32Array(cols).fill(H + 9), alza = H * 0.2;
  let lineas = '';
  for (let f = 0; f < filas; f++) {
    const y = 1 - f / (filas - 1), base = H * (0.24 + 0.74 * y);
    let d = '', antes = false, puntos = 0;
    for (let i = 0; i < cols; i++) {
      const sy = base - alt(i * paso / W, y) * alza, v = sy < tope[i];
      if (v) { d += `${antes ? 'L' : 'M'}${i * paso} ${dec(sy)}`; tope[i] = sy; if (antes) puntos++; }
      antes = v;
    }
    if (puntos) lineas += `<path d="${d}" stroke="${f % 12 === 5 ? C.acento : C.barras[f % C.barras.length]}"/>`;
  }
  const marca = o.nombre ? `role="img" aria-label="${String(o.nombre).replace(/[&<>"]/g, '')}"` : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" ${marca}><rect width="${W}" height="${H}" fill="${C.base}"/>` +
    `<g fill="none" stroke-width="${dec(1.6 * G.trazo)}" stroke-linecap="round" stroke-linejoin="round">${lineas}</g></svg>`;
}
