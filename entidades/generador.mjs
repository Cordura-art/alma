// The procedural generator of an entity's identity.
// Like a game that draws its world from a seed: the entity gives the rules (its "genes": colors, roundness, points,
// pace, all read from its chart) and a key picks one drawing out of the infinite set. The same entity and the same key
// always give the same drawing. This file holds what the families share (seed, traits, genes) and the creatures: the
// avatar and the colony texture. Emblems, pictograms, card faces, the field and the carousel have their own files.
// No DOM: the build bundles this file into the page (without its `import` and `export` words) and Node tests it.

import { hash, rng } from './semilla.mjs';
// Only genes() reads the chart's tables, and genes() runs in the builds: a page gets the genes already made, so this
// file travels to pages without this module.
import { CENTRO_DE } from './tabla.mjs';

// What an entity gives the generator. `S` is the entity's system (scripts/lib/documentacion.mjs) and `valor(name, theme)`
// returns an ALMA token's value. A piece ("pieza") lives on ink with the full palette, as the signature does (its
// `barras` are the colors of the shapes: the name comes from the signature's bars). A ground
// ("fondo") goes behind text, so it takes the quietest step of each ramp that keeps text-01 and text-02 at 4.5:1.
// The gates of a chart, the four of its cross first, each with the line the entity has active there.
function puertasDe(carta) {
  if (!carta || !carta.personalidad) return [];
  const vistas = new Set(), out = [], P = carta.personalidad, D = carta.diseno;
  for (const a of [P[0], P[1], D[0], D[1], ...P.slice(2), ...D.slice(2)]) if (a && !vistas.has(a.p)) { vistas.add(a.p); out.push({ n: a.p, l: a.l }); }
  return out;
}
// The entity's own numbers, for the symmetries of its emblems: its defined centers, its channels, the two lines of
// its profile and their sums, between 3 and 12.
function numerosDe(E) {
  const [lc, li] = E.profile.split('/').map(Number), c = E.centers.length, k = E.carta ? E.carta.canales.length : 0;
  const n = [...new Set([c, k, lc, li, c + lc, c + k, lc + li].filter((x) => x >= 3 && x <= 12))].sort((a, b) => a - b);
  return n.length ? n : [Math.max(3, Math.min(12, c + lc))];
}

// Where an entity's field goes. Its type gives one (a Projector guides: its field converges on a focus; a Manifestor
// starts: it bursts from a point; a Generator sustains: it turns; a Manifesting Generator spirals out; a Reflector
// mirrors), and an entity may declare its own in its language (ilustracion.generativa.campo).
export const DIRECCIONES = ['foco', 'estallido', 'giro', 'espiral', 'espejo'];
const DIRECCION_DEL_TIPO = { proyector: 'foco', manifestador: 'estallido', generador: 'giro', mg: 'espiral', reflector: 'espejo' };

export function genes(S, valor) {
  const { E, P, En } = S, n = E.nacimiento, ramps = P.palette.map((p) => p.ramp);
  const propia = S.L && S.L.ilustracion && S.L.ilustracion.generativa ? S.L.ilustracion.generativa.campo : undefined;
  if (propia !== undefined && !DIRECCIONES.includes(propia)) throw new Error(`${S.id}: la dirección del campo «${propia}» no existe. Las que hay: ${DIRECCIONES.join(', ')}`);
  const fondo = (tema, pasos) => {
    const textos = ['text-01', 'text-02'].flatMap((t) => [tema, `${tema}-hc`].map((th) => valor(t, th)));
    const lee = (c) => textos.every((t) => En.contrast(t, c) >= 4.5);
    const paso = (r, orden) => r[orden.find((k) => lee(r[k])) ?? orden[orden.length - 1]];
    return { base: valor('ui-02', tema), barras: ramps.map((r) => paso(r, [pasos[1]])), acento: paso(ramps[0], pasos), tinta: valor('text-01', tema) };
  };
  return {
    id: S.id, nombre: S.L.nombre,
    semilla: `nac|${n.fecha}|${n.hora || ''}|${n.zona}`,
    // The parts of its definition: how many currents the field has.
    grupos: Math.max(1, En.DEFS[E.def].parts),
    redondez: Math.min(1, P.shape.base / 24),
    // Emblems and pictograms: a point for every defined center plus the conscious line (two entities with the same
    // centers still differ), a level of detail for every defined channel, the stroke of the body weight, and a full
    // shape for a defined Throat (a deep accent) or a line for an open one.
    puntas: Math.max(3, Math.min(16, E.centers.length + Number(E.profile.split('/')[0]))),
    // An emblem is drawn from one of its gates, with one of its numbers.
    puertas: puertasDe(E.carta), numeros: numerosDe(E),
    complejidad: Math.max(1, Math.min(5, 1 + (E.carta ? E.carta.canales.length : 0))),
    trazo: Math.round(P.weights.body / 400 * 1000) / 1000,
    relleno: !!P.accent.deep,
    // Its field: where it goes (the direction it declares, or its type's), how it breathes (its authority), and the eddies and streams of its
    // defined centers and channels (each channel, as the two centers it joins).
    tipo: E.type, direccion: propia || DIRECCION_DEL_TIPO[E.type], direccionPropia: !!propia, autoridad: E.auth, centros: [...E.centers],
    canales: (E.carta ? E.carta.canales : []).map((k) => String(k).split('-').map((p) => CENTRO_DE[Number(p)])),
    // What moves (the field, the carousel, the mycelium): the pace of the entity's type (1 is ALMA's; 1.25 is a quarter
    // slower).
    ritmo: P.motion.speed,
    // The mycelium: a focus of colonization for every defined center.
    focos: Math.max(1, Math.min(9, E.centers.length || 1)),
    pieza: { base: valor('brand-ink', 'dark'), barras: [ramps[1][300], ramps[1][500], ramps[2][300], ramps[2][400], valor('secondary-600', 'dark')], acento: P.accent.dark['interactive-01'], tinta: valor('text-01', 'dark') },
    fondo: { dark: fondo('dark', [800, 900]), light: fondo('light', [200, 100]) }
  };
}

const n1 = (v) => Math.round(v * 10) / 10;
const texto = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// A creature avatar (the user's p5 study, ejemplos/ensayo-generativo/referencias/criaturas-p5.js): a round body, a second shape on top of it and
// two eyes. The body and the second shape take two different colors of the entity; the eyes are the ground's ink, and
// lean in or out a little with the key. The user chose creatures over bars on 2026-10-02, and ALMA's written
// rules accept characters since then.
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

// A colony texture (the user's p5 study, ejemplos/ensayo-generativo/referencias/manchas-con-ojos-p5.js): a grid of creatures seen from very
// near, each one a large turned field of color with two eyes, that spills over its neighbors; later ones cover earlier
// ones. Here it is one tile that repeats without a seam: what leaves by one edge comes back by the opposite one, and
// every creature is drawn whole (with all its copies) before the next, so the layers match across the edges.
// `modo` "pieza" is a brand piece on ink with the full palette; "fondo" goes behind text, with the quiet colors.
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
