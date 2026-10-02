// REFERENCE ONLY, not used by any build. The generator as it was on 2026-10-02, before the bar avatar (avatar) and the
// bar texture (textura) were taken out at the user's request ("quita los patrones de barras, prefiero colonia y
// criaturas"). Kept so the bars can come back.

// The procedural generator of an entity's avatars and textures (a prototype, tried with the Entidad Ensayo).
// Like a game that draws its world from a seed: the entity gives the rules (its "genes": rows, groups, roundness and
// colors, all read from its chart) and a key picks one drawing out of the infinite set. The same entity and the same
// key always give the same SVG. The grammar is the signature's: staggered bars and four-point sparkles.
// No imports and no DOM: the build bundles this file into the page (without the `export` words) and Node tests it.

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

// What an entity gives the generator. `S` is the entity's system (scripts/lib/documentacion.mjs) and `valor(name, theme)`
// returns an ALMA token's value. A piece ("pieza") lives on ink with the full palette, as the signature does. A ground
// ("fondo") goes behind text, so it takes the quietest step of each ramp that keeps text-01 and text-02 at 4.5:1.
export function genes(S, valor) {
  const { E, P, En } = S, n = E.nacimiento, ramps = P.palette.map((p) => p.ramp);
  const fondo = (tema, pasos) => {
    const textos = ['text-01', 'text-02'].flatMap((t) => [tema, `${tema}-hc`].map((th) => valor(t, th)));
    const lee = (c) => textos.every((t) => En.contrast(t, c) >= 4.5);
    const paso = (r, orden) => r[orden.find((k) => lee(r[k])) ?? orden[orden.length - 1]];
    return { base: valor('ui-02', tema), barras: ramps.map((r) => paso(r, [pasos[1]])), acento: paso(ramps[0], pasos), destello: valor('border-subtle', tema), tinta: valor('text-01', tema) };
  };
  return {
    id: S.id, nombre: S.L.nombre,
    semilla: `nac|${n.fecha}|${n.hora || ''}|${n.zona}`,
    filas: Math.max(3, Math.min(7, E.centers.length || 3)),
    grupos: Math.max(1, En.DEFS[E.def].parts),
    redondez: Math.min(1, P.shape.base / 24),
    // Emblems and pictograms: a point for every defined center plus the conscious line (two entities with the same
    // centers still differ), a level of detail for every defined channel, the stroke of the body weight, and a full
    // shape for a defined Throat (a deep accent) or a line for an open one.
    puntas: Math.max(3, Math.min(16, E.centers.length + Number(E.profile.split('/')[0]))),
    complejidad: Math.max(1, Math.min(5, 1 + (E.carta ? E.carta.canales.length : 0))),
    trazo: Math.round(P.weights.body / 400 * 1000) / 1000,
    relleno: !!P.accent.deep,
    // The field: the pace of the entity's type (1 is ALMA's; 1.25 is a quarter slower).
    ritmo: P.motion.speed,
    pieza: { base: valor('brand-ink', 'dark'), barras: [ramps[1][300], ramps[1][500], ramps[2][300], ramps[2][400], valor('secondary-600', 'dark')], acento: P.accent.dark['interactive-01'], destello: valor('secondary-700', 'dark'), tinta: valor('text-01', 'dark') },
    fondo: { dark: fondo('dark', [800, 900]), light: fondo('light', [200, 100]) }
  };
}

const n1 = (v) => Math.round(v * 10) / 10;
const barra = (x, y, w, h, rx, c) => `<rect x="${n1(x)}" y="${n1(y)}" width="${n1(w)}" height="${n1(h)}" rx="${n1(rx)}" fill="${c}"/>`;
const destello = (x, y, s, c) => `<path d="M${n1(x)} ${n1(y - s)}Q${n1(x)} ${n1(y)} ${n1(x + s)} ${n1(y)}Q${n1(x)} ${n1(y)} ${n1(x)} ${n1(y + s)}Q${n1(x)} ${n1(y)} ${n1(x - s)} ${n1(y)}Q${n1(x)} ${n1(y)} ${n1(x)} ${n1(y - s)}Z" fill="${c}"/>`;
const texto = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Which group a row belongs to: the entity's rows split into its groups, as in the signature.
const grupoDe = (i, filas, grupos) => Math.min(grupos - 1, Math.floor(i * grupos / filas));

// An avatar: the entity's rows of bars inside a 96 × 96 ink square. Groups are set apart by air, exactly one bar takes
// the accent, and one sparkle follows a bar when there is room. `clave` is whatever names the person (a name, an email).
// It is decorative unless `nombre` is given: an avatar goes next to the person's name, never in its place.
export function avatar(G, clave, o = {}) {
  const r = rng(hash(`avatar|${G.semilla}|${String(clave).trim().toLowerCase()}`)), C = G.pieza;
  const L = 96, pad = 16, area = L - pad * 2, filas = G.filas, saltos = Array.from({ length: filas - 1 }, (_, i) => (grupoDe(i, filas, G.grupos) === grupoDe(i + 1, filas, G.grupos) ? 0.5 : 1.2));
  const ph = area / (filas + saltos.reduce((a, b) => a + b, 0)), rx = ph / 2 * G.redondez, fin = pad + area;
  const barras = [], libres = [];
  let y = pad, inicio = 0;
  for (let i = 0; i < filas; i++) {
    const unida = i > 0 && saltos[i - 1] === 0.5;
    let x = unida ? inicio + (r() < 0.5 ? -1 : 1) * ph * (0.5 + r()) : pad + r() * area * 0.35;
    x = Math.max(pad, Math.min(x, fin - ph * 3)); inicio = x;
    const cuantas = 1 + Math.floor(r() * 2);
    for (let k = 0; k < cuantas; k++) {
      const w = Math.min(ph * (1.4 + r() * 3.2), fin - x);
      if (w < ph * 1.2) break;
      barras.push({ x, y, w, c: C.barras[Math.floor(r() * C.barras.length)] });
      x += w + ph * 0.4;
    }
    if (fin - x >= ph * 0.9) libres.push({ x: x + ph * 0.25, y: y + ph / 2 });
    y += ph + (saltos[i] || 0) * ph;
  }
  barras[Math.floor(r() * barras.length)].c = C.acento;
  const chispa = libres.length ? libres[Math.floor(r() * libres.length)] : null;
  const marca = o.nombre ? `role="img" aria-label="${texto(o.nombre)}"` : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L} ${L}" ${marca}><rect width="${L}" height="${L}" fill="${C.base}"/>` +
    barras.map((b) => barra(b.x, b.y, b.w, ph, rx, b.c)).join('') + (chispa ? destello(chispa.x, chispa.y, ph * 0.45, C.destello) : '') + '</svg>';
}

// A creature avatar (the user's p5 study, referencias/criaturas-p5.js): a round body, a second shape on top of it and
// two eyes. The body and the second shape take two different colors of the entity; the eyes are the ground's ink, and
// lean in or out a little with the key. An experiment: ALMA and Ensayo's language do not use characters today.
export function criatura(G, clave, o = {}) {
  const r = rng(hash(`criatura|${G.semilla}|${String(clave).trim().toLowerCase()}`)), C = G.pieza, L = 96, c = L / 2;
  const cuerpo = L * (0.5 + r() * 0.2), colores = [...C.barras, C.acento], i = Math.floor(r() * colores.length), j = (i + 1 + Math.floor(r() * (colores.length - 1))) % colores.length;
  const ancho = cuerpo * (0.3 + r() * 0.9), alto = cuerpo * 0.9, sube = cuerpo * (0.3 - (r() * 0.25 - 0.1)), mira = (r() * 2 - 1) * cuerpo * 0.03;
  const ojo = cuerpo * 0.1, sep = cuerpo * 0.32, y = c + cuerpo * 0.08;
  const marca = o.nombre ? `role="img" aria-label="${texto(o.nombre)}"` : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L} ${L}" ${marca}><rect width="${L}" height="${L}" fill="${C.base}"/>` +
    `<circle cx="${c}" cy="${n1(y)}" r="${n1(cuerpo / 2)}" fill="${colores[i]}"/>` +
    `<ellipse cx="${c}" cy="${n1(y - sube)}" rx="${n1(ancho / 2)}" ry="${n1(alto / 2)}" fill="${colores[j]}"/>` +
    `<circle cx="${n1(c - sep + mira)}" cy="${n1(y - cuerpo * 0.1)}" r="${n1(ojo)}" fill="${C.base}"/>` +
    `<circle cx="${n1(c + sep - mira)}" cy="${n1(y - cuerpo * 0.1)}" r="${n1(ojo)}" fill="${C.base}"/></svg>`;
}

// A texture: one tile that repeats without a seam. Bands of the entity's rows, with a row of air between bands; inside
// a band the groups are set apart as in the signature. The key decides the scale (bars of 8, 16 or 32, on ALMA's grid
// of 8), the density and where every bar goes. `modo` "pieza" is a brand piece on ink; "fondo" goes behind text.
export function textura(G, clave, o = {}) {
  const modo = o.modo === 'fondo' ? 'fondo' : 'pieza', C = modo === 'fondo' ? G.fondo[o.tema === 'light' ? 'light' : 'dark'] : G.pieza;
  const r = rng(hash(`textura|${G.semilla}|${clave}`));
  const ph = [8, 16, 32][Math.floor(r() * 3)], paso = ph * 1.5, rx = ph / 2 * G.redondez, W = 240;
  const periodo = G.filas + 1, H = periodo * paso * Math.max(1, Math.round(240 / (periodo * paso)));
  const densidad = (0.4 + r() * 0.45) * (modo === 'fondo' ? 0.7 : 1);
  const barras = [], chispas = [];
  let inicio = 0;
  for (let f = 0; f * paso < H; f++) {
    const i = f % periodo, y = f * paso + (paso - ph) / 2;
    if (i === G.filas) continue;
    const unida = i > 0 && grupoDe(i - 1, G.filas, G.grupos) === grupoDe(i, G.filas, G.grupos);
    inicio = unida ? inicio + (r() < 0.5 ? -1 : 1) * ph * (0.5 + r()) : r() * W;
    // Bars and gaps go round the tile once and close where they started, so the row repeats with no seam.
    let x = 0;
    while (W - x >= ph * 2) {
      const w = Math.min(ph * (1.6 + r() * 4.4), W - x - ph * 0.5), hay = r() < densidad;
      if (hay) barras.push({ x: (((inicio + x) % W) + W) % W, y, w, c: C.barras[Math.floor(r() * C.barras.length)] });
      else if (w >= ph * 1.5 && r() < 0.3) chispas.push({ x: (((inicio + x + w / 2) % W) + W) % W, y: y + ph / 2 });
      x += w + ph * (0.3 + r() * 0.4);
    }
  }
  if (!barras.length) barras.push({ x: 0, y: (paso - ph) / 2, w: ph * 3, c: C.acento });
  // One accent for every twelve bars or so, and never none: the accent marks, it does not fill.
  const acentos = Math.max(1, Math.round(barras.length / 12));
  for (let k = 0; k < acentos; k++) barras[Math.floor(r() * barras.length)].c = C.acento;
  // What crosses the right edge is drawn again on the left.
  const dos = (x, w, dibuja) => dibuja(x) + (x + w > W ? dibuja(x - W) : '');
  const s = ph * 0.45;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true"><rect width="${W}" height="${H}" fill="${C.base}"/>` +
    barras.map((b) => dos(b.x, b.w, (x) => barra(x, b.y, b.w, ph, rx, b.c))).join('') +
    chispas.map((c) => dos((c.x - s + W) % W, s * 2, (x) => destello(x + s, c.y, s, C.destello))).join('') + '</svg>';
}

// A colony texture (the user's p5 study, referencias/manchas-con-ojos-p5.js): a grid of creatures seen from very
// near, each one a large turned field of color with two eyes, that spills over its neighbors; later ones cover earlier
// ones. Here it is one tile that repeats without a seam: what leaves by one edge comes back by the opposite one, and
// every creature is drawn whole (with all its copies) before the next, so the layers match across the edges.
// `modo` as in textura(). An experiment, like criatura(): ALMA and Ensayo's language do not use characters today.
export function colonia(G, clave, o = {}) {
  const modo = o.modo === 'fondo' ? 'fondo' : 'pieza', C = modo === 'fondo' ? G.fondo[o.tema === 'light' ? 'light' : 'dark'] : G.pieza;
  const r = rng(hash(`colonia|${G.semilla}|${clave}`)), W = 240, n = [2, 3, 5][Math.floor(r() * 3)], celda = W / n, formas = [];
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const giro = r() * Math.PI * 2, m = celda * (0.1 + r() * 0.7);
    formas.push({ x: (i + 0.5) * celda, y: (j + 0.5) * celda, giro, m, rx: celda * (0.5 + r() * 1.5), ry: m * 1.1, c: C.barras[Math.floor(r() * C.barras.length)] });
  }
  // The accent goes to the smallest fields (one in twelve, never none), so it marks and does not fill.
  [...formas].sort((a, b) => a.rx * a.ry - b.rx * b.ry).slice(0, Math.max(1, Math.round(formas.length / 12))).forEach((f) => { f.c = C.acento; });
  const una = (f) => {
    // The field turns twice the creature's angle, as in the original; the eyes sit above its center, turned once.
    const cos = Math.cos(f.giro), sen = Math.sin(f.giro), ojo = (dx) => { const px = dx * f.m * 0.2, py = -f.m * 0.2; return `<circle cx="${n1(px * cos - py * sen)}" cy="${n1(px * sen + py * cos)}" r="${n1(f.m * 0.11)}" fill="${C.base}"/>`; };
    const dibujo = `<ellipse rx="${n1(f.rx)}" ry="${n1(f.ry)}" transform="rotate(${n1(f.giro * 360 / Math.PI)})" fill="${f.c}"/>` + ojo(-1) + ojo(1), R = Math.max(f.rx, f.ry);
    let s = '';
    for (const dy of [-W, 0, W]) for (const dx of [-W, 0, W]) {
      const x = f.x + dx, y = f.y + dy;
      if (x + R > 0 && x - R < W && y + R > 0 && y - R < W) s += `<g transform="translate(${n1(x)} ${n1(y)})">${dibujo}</g>`;
    }
    return s;
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" aria-hidden="true"><rect width="${W}" height="${W}" fill="${C.base}"/>` + formas.map(una).join('') + '</svg>';
}

// The texture as a CSS background: `background-image: <this>` repeats the tile.
export function comoFondo(svg) { return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`; }

// Every color a drawing may use, for the contrast tests.
export function colores(C) { return [C.base, ...C.barras, C.acento]; }
