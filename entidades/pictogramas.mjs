// The pictograms of an entity: small line drawings that tell one thing apart from its neighbors, next to its name.
// Three kinds, one for each case, all drawn like a Carbon icon: on the 32 grid, with a stroke of 2 and a few pieces.
//   letra     the thing's own initial (and its number) in a frame. For what is ordered or numbered: chapters, steps.
//   sello     one base and one mark from a small vocabulary. For kinds of things: tags, files, categories.
//   criatura  a head, two eyes and one feature: the identity's characters at icon size. For what has character:
//             projects, teams, spaces. An entity that does not use characters gets a seal instead.
// The thing's name picks the drawing, and the same name always gives the same one in the same entity (its seed).
// No DOM: the build copies this file into the component bundle (scripts/build-pictogramas.mjs) and Node tests it.
// The first engine (32 drawings from the user's "Neo-banking Icons v14" study) was replaced on 2026-10-02: it did not
// sit well next to Carbon. The study is kept in ejemplos/ensayo-generativo/referencias/icon_system_v14.html.
import { hash, rng } from './semilla.mjs';

const n1 = (v) => Math.round(v * 10) / 10;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const poli = (pts) => `<path d="M${pts.map((p) => p.map(n1).join(' ')).join('L')}Z"/>`;
// A regular polygon of n points around (cx, cy).
const regular = (n, r, giro = -90, cx = 16, cy = 16) => Array.from({ length: n }, (_, i) => { const a = (giro + i * 360 / n) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
const punto = (x, y, r = 2) => `<circle cx="${n1(x)}" cy="${n1(y)}" r="${r}" fill="currentColor" stroke="none"/>`;

// What each kind is made of. `R` is true when the entity's corners are round.
const MARCOS = (R) => [`<circle cx="16" cy="16" r="13"/>`, `<rect x="3" y="3" width="26" height="26" rx="${R ? 6 : 0}"/>`, poli(regular(6, 14, 0)), poli(regular(4, 14)), `<path d="M3 3H29V20L16 29L3 20Z"/>`];
const BASES = (R) => [`<circle cx="16" cy="16" r="12"/>`, `<rect x="4" y="4" width="24" height="24" rx="${R ? 5 : 0}"/>`, poli(regular(3, 14, -90, 16, 18)), poli(regular(4, 13)), `<path d="M4 20A12 12 0 0 1 28 20Z"/>`, poli(regular(6, 13, 0)), `<path d="M4 28V4H28"/><path d="M12 28V12H28"/>`];
// Every mark stays inside the smallest base, so no pair of base and mark collides. No mark is two dots: in a round
// base they would read as the eyes of a creature.
const MARCAS = () => [punto(16, 16, 2.5), `<path d="M12 16H20"/>`, `<path d="M16 12V20"/>`, `<circle cx="16" cy="16" r="4"/>`, `<path d="M12 16H20M16 12V20"/>`, `<path d="M13 19L19 13"/>`, `<path d="M16 16H22"/>`, `<rect x="13" y="13" width="6" height="6"/>`];
const CABEZAS = (R) => [`<circle cx="16" cy="17" r="11"/>`, `<rect x="5" y="7" width="22" height="21" rx="${R ? 8 : 0}"/>`, `<path d="M5 28V16A11 11 0 0 1 27 16V28Z"/>`, `<ellipse cx="16" cy="18" rx="12" ry="9.5"/>`, `<path d="M16 5C24 5 28 12 28 18C28 24 23 28 16 28C9 28 4 24 4 18C4 12 8 5 16 5Z"/>`];
const RASGOS = (y) => ['', `<path d="M16 6V2"/>`, `<path d="M10 7L8 3"/><path d="M22 7L24 3"/>`, `<path d="M12 ${y + 6}H20"/>`, `<path d="M13 ${y + 5}Q16 ${y + 8} 19 ${y + 5}"/>`, `<path d="M4 12L2 8"/><path d="M28 12L30 8"/>`];

export const TIPOS = ['letra', 'sello', 'criatura'];
// How many drawings each kind has: frames, base × mark, head × feature.
export const PICTOGRAMAS = { letra: MARCOS(true).length, sello: BASES(true).length * MARCAS().length, criatura: CABEZAS(true).length * RASGOS(16).length };

// What a letter pictogram writes: the initial, with the number the name ends in; a number of two digits goes alone.
export function letras(clave) {
  const s = String(clave).trim(), num = /(\d+)\s*$/.exec(s), ini = (/[\p{L}\p{N}]/u.exec(s) || ['·'])[0].toUpperCase();
  if (!num) return ini;
  return num[1].length > 1 ? num[1].slice(-2) : (/\p{L}/u.test(ini) ? ini + num[1] : num[1]);
}

// The kind an entity really draws: a creature only where characters are used.
const tipoDe = (o) => { const t = TIPOS.includes(o.tipo) ? o.tipo : 'sello'; return t === 'criatura' && o.personajes === false ? 'sello' : t; };

// One pictogram: { tipo, dibujo, lado, trazos }. `trazos` is the inside of an <svg viewBox="0 0 32 32" fill="none"
// stroke="currentColor">. G gives the seed, the stroke (1 = Carbon's 2) and whether corners are round. `o.tipo` is the
// kind (sello by default), `o.dibujo` one of its drawings (see dibujosDe), `o.personajes: false` an entity without
// characters.
export function trazosPictograma(G, clave, o = {}) {
  const tipo = tipoDe(o), nombre = String(clave === undefined || clave === null ? '' : clave).trim().toLowerCase();
  const r = rng(hash(`pictograma|${tipo}|${G.semilla}|${nombre}`)), R = G.redondez > 0, sw = n1(2 * (G.trazo || 1));
  const total = PICTOGRAMAS[tipo], azar = Math.floor(r() * total), dibujo = Number.isInteger(o.dibujo) && o.dibujo >= 0 && o.dibujo < total ? o.dibujo : azar;
  const grupo = (s) => `<g stroke-width="${sw}" stroke-linejoin="${R ? 'round' : 'miter'}" stroke-linecap="${R ? 'round' : 'butt'}">${s}</g>`;
  let trazos;
  if (tipo === 'letra') {
    const t = letras(clave), dos = t.length > 1;
    // The letter takes the page's typeface at its normal width, whatever width the entity's text has.
    trazos = grupo(MARCOS(R)[dibujo]) + `<text x="16" y="${dos ? 20.2 : 21.3}" text-anchor="middle" fill="currentColor" stroke="none" font-size="${dos ? 11.5 : 15}" font-weight="600" style="font-stretch:100%;font-variation-settings:'wdth' 100;letter-spacing:0">${esc(t)}</text>`;
  } else if (tipo === 'sello') {
    const marcas = MARCAS(), giro = [0, 90, 180, 270][Math.floor(r() * 4)];
    trazos = grupo(`<g transform="rotate(${giro} 16 16)">${BASES(R)[Math.floor(dibujo / marcas.length)]}</g>${marcas[dibujo % marcas.length]}`);
  } else {
    const sep = 3.5 + Math.floor(r() * 3), y = 15 + Math.floor(r() * 4), rasgos = RASGOS(y);
    trazos = grupo(CABEZAS(R)[Math.floor(dibujo / rasgos.length)] + rasgos[dibujo % rasgos.length]) + punto(16 - sep, y) + punto(16 + sep, y);
  }
  return { tipo, dibujo, lado: 32, trazos };
}

// The drawings of a list of names that sit together, none repeated while the kind has drawings left: the first name
// keeps its own, and each next one takes the nearest free one. The same list gives the same deal.
export function dibujosDe(G, claves, o = {}) {
  const total = PICTOGRAMAS[tipoDe(o)], usados = new Set();
  return claves.map((c) => {
    let d = trazosPictograma(G, c, { ...o, dibujo: undefined }).dibujo;
    if (usados.size < total) while (usados.has(d)) d = (d + 1) % total;
    usados.add(d);
    return d;
  });
}

// A whole pictogram as SVG, in the color of the text around it. With `nombre` it is announced; without, decorative.
export function pictograma(G, clave, o = {}) {
  const P = trazosPictograma(G, clave, o), marca = o.nombre ? `role="img" aria-label="${esc(o.nombre)}"` : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" ${marca}>${P.trazos}</svg>`;
}
