// Applies the colour matrix to ALMA's tokens (npm run matriz:aplicar): every token with a slot in tokens/matriz.json
// takes the colour of its slot, in each of the four themes, and the three ramps the matrix makes (Primary, Secondary,
// Tertiary) replace the ones in tokens/themes/. Run `npm run build` after it.
import { readFileSync, writeFileSync } from 'node:fs';
import { matriz, PASOS, NEUTRO } from './lib/matriz.mjs';

const regla = JSON.parse(readFileSync('tokens/matriz.json', 'utf8'));
const leer = (th) => JSON.parse(readFileSync(`tokens/themes/${th}.json`, 'utf8'));
// (where a token is, whatever group of the file holds it)
const donde = (o, n) => { for (const k of Object.keys(o)) { if (k === n && o[k] && o[k].$value !== undefined) return o; if (o[k] && typeof o[k] === 'object' && o[k].$value === undefined) { const r = donde(o[k], n); if (r) return r; } } return null; };
const valor = (J, n, d = 0) => { const g = donde(J, n); if (!g) return null; const m = /^\{color\.(.+)\}$/.exec(g[n].$value); return m && d < 9 ? valor(J, m[1], d + 1) : g[n].$value; };

// What ALMA gives the matrix: its brand colour, its action colour (ALMA's action is its brand: one blue), and the
// ramps of the families the matrix only reads (states and tags).
const claro = leer('light'), RAMPAS = [...new Set(Object.values(regla.casilleros).flat().map((c) => (/^([a-z]+)\d+$/.exec(c) || [])[1]).filter(Boolean))];
const alma = { marca: valor(claro, 'brand-accent'), accion: valor(claro, 'brand-accent'), rampas: Object.fromEntries(RAMPAS.map((r) => [r, Object.fromEntries(PASOS.map((s) => [s, valor(claro, `${r}-${s}`)]))])) };

let cambios = 0;
for (const th of ['light', 'dark', 'light-hc', 'dark-hc']) {
  const J = leer(th), M = matriz(alma, th, regla);
  const pon = (n, v, descripcion) => { let g = donde(J, n);
    if (!g) { g = donde(J, 'secondary-900'); const out = {}; for (const k of Object.keys(g)) { out[k] = g[k]; if (k === 'secondary-900') out[n] = { $type: 'color', $value: v, $description: descripcion }; } for (const k of Object.keys(g)) delete g[k]; Object.assign(g, out); cambios++; return; }
    if (String(g[n].$value).toUpperCase() !== v.toUpperCase()) { g[n].$value = v; cambios++; } };
  for (const s of PASOS) { pon(`primary-${s}`, M.P[s]); pon(`tertiary-${s}`, M.T[s]); }
  for (const s of NEUTRO) pon(`secondary-${s}`, M.S[s], 'El neutro, más allá del 900: para las superficies del tema oscuro.');
  for (const n of Object.keys(M.m)) if (donde(J, n)) pon(n, M.m[n]);
  writeFileSync(`tokens/themes/${th}.json`, JSON.stringify(J, null, 2) + '\n');
}
console.log(`Matriz aplicada a tokens/themes: ${cambios} valores cambiaron. Corre npm run build.`);
