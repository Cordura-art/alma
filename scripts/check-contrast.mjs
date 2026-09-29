// WCAG contrast of every pair in tests/contrast-pairs.txt, in the four themes.
// Line format: Component|what|foreground token|background token|minimum ratio.
// High-contrast themes raise text (>= 4.5) to 7:1. Also: each viz-cat color >= 3:1 on containers (ui-01).
import { readFile } from 'node:fs/promises';
import { themes } from '../dist/js/tokens.mjs';

// Components whose high-contrast color comes from a component token, not the semantic one listed.
const HC_FOREGROUND = { 'ProductCard|subtítulo': 'tertiary-700', 'ProductCard|subtítulo (cyan)': 'tertiary-700', 'ProductCard|subtítulo (yellow)': 'tertiary-700',
  'PaymentCard|etiquetas': 'secondary-400', 'PaymentCard|dígitos rojo': 'danger-300', 'SearchField|token': 'brand-black', 'TextInput|borde activo': 'field-border' };

function rgba(v) {
  let m = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)$/.exec(v);
  if (m) return [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]];
  m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i.exec(v);
  if (m) return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16), m[4] ? parseInt(m[4], 16) / 255 : 1];
  throw new Error('Color no reconocido: ' + v);
}
const over = (fg, bg) => [0, 1, 2].map((i) => Math.round(fg[i] * fg[3] + bg[i] * (1 - fg[3]))).concat(1);
const lum = (c) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

const pairs = (await readFile('tests/contrast-pairs.txt', 'utf8')).trim().split('\n').map((l) => l.split('|'));
const bad = []; let n = 0;
for (const [th, T] of Object.entries(themes)) {
  const hc = th.endsWith('hc');
  const col = (name) => { const v = name.startsWith('#') ? name : T[name]; if (!v) throw new Error(`Token inexistente en ${th}: ${name}`); return rgba(v); };
  for (const [comp, what, fg0, bgName, need0] of pairs) {
    let need = +need0; if (hc && need >= 4.5) need = 7;
    const fg = hc ? (HC_FOREGROUND[comp + '|' + what] || fg0) : fg0;
    let b = col(bgName); if (b[3] < 1) b = over(b, col('ui-02'));
    let f = col(fg); if (f[3] < 1) f = over(f, b);
    const r = ratio(f, b); n++;
    if (r < need) bad.push(`${th.padEnd(8)} ${comp.padEnd(16)} ${what.padEnd(30)} ${r.toFixed(2)} < ${need}`);
  }
  for (let i = 1; i <= 8; i++) {
    const name = `viz-cat-${String(i).padStart(2, '0')}`, r = ratio(col(name), col('ui-01')); n++;
    if (r < 3) bad.push(`${th.padEnd(8)} ${name} sobre ui-01 ${r.toFixed(2)} < 3`);
  }
}
console.log(`Contraste: ${n} pares, ${bad.length} fallos`);
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
