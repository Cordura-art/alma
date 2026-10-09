// The comparison page of the colour matrix (npm run matriz → build/matriz.html): today's colours beside the ones the
// matrix gives (tokens/matriz.json, scripts/lib/matriz.mjs), for ALMA and every entity, light and dark.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { sistema, valor } from './lib/documentacion.mjs';

const read = (p) => readFileSync(p, 'utf8'), tok = JSON.parse(read('dist/json/tokens.json')), regla = JSON.parse(read('tokens/matriz.json'));
const RAMPAS = [...new Set(Object.values(regla.casilleros).flat().map((c) => (/^([a-z]+)\d+$/.exec(c) || [])[1]).filter(Boolean))];
// Every token the page shows: the slots, what the sample screen needs, and the three ramps of today.
const NOMBRES = [...new Set(['brand-accent', 'text-on-interactive', ...Object.keys(regla.casilleros), ...['primary', 'secondary', 'tertiary', ...RAMPAS].flatMap((r) => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((s) => `${r}-${s}`))])];
const hoy = {};
for (const id of ['alma', ...readdirSync('entidades/lenguajes').map((f) => f.replace(/\.json$/, '')).sort()]) {
  const S = id === 'alma' ? null : await sistema(id);
  hoy[id] = { nombre: S ? S.L.nombre : 'ALMA' };
  for (const th of ['light', 'dark']) {
    // (an entity's value may point at another token: follow it to the colour)
    const res = (n, d = 0) => { if (d > 12) return null; let v = S && S.color && S.color[th] && S.color[th][n]; if (v == null) { try { v = valor(tok, n, th); } catch { return null; } }
      const m = /^var\(--([a-z0-9-]+)\)$/.exec(v) || /^\{(?:color\.)?([a-z0-9-]+)\}$/.exec(v); return m ? res(m[1], d + 1) : v; };
    hoy[id][th] = Object.fromEntries(NOMBRES.map((n) => [n, res(n)]));
  }
}
const lib = read('scripts/lib/matriz.mjs').replace(/^export \{[^}]*\};?\s*$/m, '');
const html = read('site/matriz.html').replace('/*ALMA*/', () => read('dist/css/alma.css')).replace('/*LIB*/', () => lib).replace('/*REGLA*/', () => JSON.stringify(regla)).replace('/*DATA*/', () => JSON.stringify(hoy));
if (/\/\*(ALMA|LIB|REGLA|DATA)\*\//.test(html)) throw new Error('quedó una marca sin llenar en site/matriz.html');
mkdirSync('build', { recursive: true }); writeFileSync('build/matriz.html', html);
console.log(`Matriz de color: build/matriz.html (${Math.round(html.length / 1024)} KB, ${Object.keys(hoy).length} sistemas)`);
