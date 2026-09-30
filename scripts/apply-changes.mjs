// Applies the changes exported by the ALMA tuning tool (Ajustes de ALMA) to the W3C tokens in tokens/.
// Usage: npm run tokens:apply -- cambios.json   (then: npm run build && npm test)
// Input: { themes: { <theme>: { <color token>: "#RRGGBB" } }, fontAxis: { "font-width": 150, "font-grade": 0 },
//          weights: { display: 600, heading: 500, body: 400 }, radius: { "radius-panel": "24px" } }
import { readFile, writeFile } from 'node:fs/promises';

const file = process.argv[2];
if (!file) { console.error('Uso: npm run tokens:apply -- cambios.json'); process.exit(1); }
const changes = JSON.parse(await readFile(file, 'utf8'));
const done = [];
const load = async (p) => JSON.parse(await readFile(p, 'utf8'));
const save = (p, d) => writeFile(p, JSON.stringify(d, null, 2) + '\n');
const HEX = /^#[0-9A-Fa-f]{6}$/;

for (const [theme, tokens] of Object.entries(changes.themes || {})) {
  const p = `tokens/themes/${theme}.json`, d = await load(p);
  for (const [name, value] of Object.entries(tokens)) {
    if (!d.color[name]) throw new Error(`${theme}: no existe el token de color "${name}"`);
    if (!HEX.test(value)) throw new Error(`${theme}/${name}: usa un color #RRGGBB, no "${value}"`);
    d.color[name].$value = value.toUpperCase();
    done.push(`${theme} · ${name} = ${value.toUpperCase()}`);
  }
  await save(p, d);
}

if (changes.fontAxis) {
  const p = 'tokens/core/fontAxis.json', d = await load(p);
  const LIMITS = { 'font-width': [25, 151], 'font-grade': [-200, 150] };
  for (const [name, value] of Object.entries(changes.fontAxis)) {
    const lim = LIMITS[name]; if (!lim) throw new Error(`Eje desconocido: "${name}"`);
    if (typeof value !== 'number' || value < lim[0] || value > lim[1]) throw new Error(`${name}: debe ir de ${lim[0]} a ${lim[1]}`);
    d.fontAxis[name].$value = value; done.push(`${name} = ${value}`);
  }
  await save(p, d);
}

if (changes.weights) {
  // Roles: display (display-*), heading (h1–h6, headline, title, blockquote), body (body, label).
  const role = (n) => (n.includes('display') ? 'display' : /-h[1-6]$|headline|title|blockquote/.test(n) ? 'heading' : 'body');
  const p = 'tokens/type/styles.json', d = await load(p);
  for (const [r, w] of Object.entries(changes.weights)) {
    if (!['display', 'heading', 'body'].includes(r)) throw new Error(`Rol desconocido: "${r}"`);
    if (!Number.isInteger(w) || w < 100 || w > 1000) throw new Error(`${r}: el peso va de 100 a 1000`);
  }
  for (const group of Object.values(d.type)) {
    for (const [name, t] of Object.entries(group)) {
      const w = changes.weights[role(name)];
      if (w !== undefined) t.$value.fontWeight = w;
    }
  }
  for (const [r, w] of Object.entries(changes.weights)) done.push(`peso ${r} = ${w}`);
  await save(p, d);
}

if (changes.radius) {
  const p = 'tokens/core/radius.json', d = await load(p);
  for (const [name, value] of Object.entries(changes.radius)) {
    if (!d.radius[name]) throw new Error(`No existe el radio "${name}"`);
    if (!/^\d+px$/.test(value)) throw new Error(`${name}: usa px, por ejemplo "24px"`);
    d.radius[name].$value = value; done.push(`${name} = ${value}`);
  }
  await save(p, d);
}

console.log(`Cambios aplicados en tokens/ (${done.length}):\n  ${done.join('\n  ')}\nAhora: npm run build && npm test`);
