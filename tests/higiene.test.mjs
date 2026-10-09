// What is not a token does not pass. The style sheet of the components (and the «all in glass» mode of an entity) may
// not carry a loose colour, space, radius, time, curve or layer: every one comes from tokens/. `npm test`.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const HOJAS = ['artifact/project/components/bundle.css', 'entidades/vidrio.css'];
// The sizes of the type scale (rem): the only ones a component may set.
const LETRA = ['0.6875rem', '0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '2rem'];
// Every declaration of a sheet, comments out: { hoja, linea, prop, valor, suelto } — `suelto` is the value with its
// var(…) taken away, so what is left is what was written by hand.
function declaraciones(hoja) {
  const css = readFileSync(hoja, 'utf8').replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' ')), out = [];
  css.split('\n').forEach((l, i) => { for (const m of l.matchAll(/([a-z-]+)\s*:\s*([^;{}]+)[;}]/g)) { if (m[1].startsWith('--')) continue;
    out.push({ hoja, linea: i + 1, prop: m[1], valor: m[2].trim(), suelto: m[2].replace(/var\([^)]*\)/g, '').trim() }); } });
  return out;
}
const TODAS = HOJAS.flatMap(declaraciones);
const lista = (d) => d.map((x) => `${x.hoja}:${x.linea} ${x.prop}: ${x.valor.slice(0, 90)}`).join('\n');
const medidas = (s) => [...s.matchAll(/-?\d*\.?\d+(px|rem|em)\b/g)].map((x) => x[0]);

test('ningún color escrito a mano: todos son tokens', () => {
  const mal = TODAS.filter((d) => /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/.test(d.suelto));
  assert.equal(mal.length, 0, lista(mal));
});

test('los espacios salen de la escala: márgenes, rellenos y separaciones usan space-*', () => {
  // (1px is the width of a line, taken away from a space so a border does not move what is inside; an em or a rem
  // inside a calc() centres something against the height of a control)
  const mal = TODAS.filter((d) => /^(padding|margin|gap|row-gap|column-gap)(-|$)/.test(d.prop))
    .filter((d) => medidas(d.suelto.replace(/calc\([^;]*\)/g, (c) => c.replace(/-?\d*\.?\d+(em|rem)\b/g, ''))).some((v) => !/^-?[01]px$/.test(v)));
  assert.equal(mal.length, 0, lista(mal));
});

test('los radios salen de los tokens: ninguno se escribe a mano', () => {
  // (a radius may be a token less 1px, to sit inside the line of its container; 999px and 50% are the full round)
  const mal = TODAS.filter((d) => /radius/.test(d.prop)).filter((d) => medidas(d.suelto).some((v) => !/^(0|1|999|9999)px$/.test(v)));
  assert.equal(mal.length, 0, lista(mal));
});

test('la letra de un componente tiene un tamaño de la escala', () => {
  const mal = TODAS.filter((d) => d.prop === 'font-size' && d.suelto && !LETRA.includes(d.valor) && !/^(inherit|1em|100%)$/.test(d.valor));
  assert.equal(mal.length, 0, lista(mal));
});

test('los pesos de la letra son tokens', () => {
  const mal = TODAS.filter((d) => d.prop === 'font-weight' && /^\d+$/.test(d.valor));
  assert.equal(mal.length, 0, lista(mal));
});

test('los tiempos y las curvas del movimiento son tokens', () => {
  // (1ms is how movement is switched off for who asked for less of it; 0s is no wait; `linear` is a turn that never
  // speeds up, the one of an indicator that spins)
  const mal = TODAS.filter((d) => /^(transition|animation)/.test(d.prop)).filter((d) => { const s = d.suelto.replace(/\b0m?s\b/g, '');
    return (/\d(ms|s)\b/.test(s) && !/^1ms( !important)?$/.test(d.valor)) || /cubic-bezier|\bease(-in|-out|-in-out)?\b/.test(s); });
  assert.equal(mal.length, 0, lista(mal));
});

test('las capas son tokens; dentro de una pieza, solo un orden corto de 0 a 3', () => {
  const mal = TODAS.filter((d) => d.prop === 'z-index' && /^-?\d+$/.test(d.valor) && !(Number(d.valor) >= 0 && Number(d.valor) <= 3));
  assert.equal(mal.length, 0, lista(mal));
});

// The radii of ALMA are not chosen one by one: each is the base, up to its ceiling — the same rule the entities use.
test('los radios de ALMA salen de radius-base, con la regla de las entidades', async () => {
  const { cargarMotor } = await import('../scripts/lib/entidades.mjs');
  const En = await cargarMotor(), fam = JSON.parse(readFileSync('tokens/core/radius.json', 'utf8')).radius;
  const regla = En.radii(parseFloat(fam['radius-base'].$value));
  for (const k of Object.keys(regla)) assert.equal(fam[k].$value, regla[k], `${k} no sigue a radius-base`);
});

// A document does not write the value of a token by hand: a table row about a token asks for it, {token:name}.
test('los documentos no escriben a mano el valor de un token: lo piden', async () => {
  const { readdirSync } = await import('node:fs'); const { valor } = await import('../scripts/lib/documentacion.mjs');
  const tok = JSON.parse(readFileSync('dist/json/tokens.json', 'utf8'));
  const md = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? md(`${d}/${e.name}`) : e.name.endsWith('.md') ? [`${d}/${e.name}`] : []));
  const mal = [];
  for (const f of md('docs')) readFileSync(f, 'utf8').split('\n').forEach((l, i) => {
    for (const p of l.matchAll(/`((?:radius|duration|space)-[a-z0-9-]+)` \((\d+ (?:px|ms))\)/g)) mal.push(`${f}:${i + 1} \`${p[1]}\` (${p[2]}): usa {token:${p[1]}}`);
    const m = /^\| `([a-z0-9-]+)` \| ([^|]+) \|/.exec(l); if (!m) return;
    let v; try { v = valor(tok, m[1]); } catch { return; }
    const dicho = m[2].trim().replace(/^`|`$/g, '');
    if (/^[\d.,]+ ?(px|ms|%)?$|^#[0-9A-Fa-f]{6}$/.test(dicho)) mal.push(`${f}:${i + 1} \`${m[1]}\` dice ${dicho}${dicho.replace(' ', '') === String(v).replace(' ', '') ? '' : ` y es ${v}`}: usa {token:${m[1]}}`);
  });
  assert.equal(mal.length, 0, mal.join('\n'));
});

// A role's colour is a step of a ramp. The ones that are not are counted, in tests/roles-sueltos.txt, and the list can
// only get shorter: a new loose colour does not pass.
test('el color de un papel es un paso de una rampa; los que no, están contados y no crecen', () => {
  const F = {}; const flat = (o, out = {}) => { for (const k in o) { const v = o[k]; if (v && v.$value !== undefined) out[k] = v; else if (v && typeof v === 'object') flat(v, out); } return out; };
  for (const th of ['dark', 'light', 'dark-hc', 'light-hc']) F[th] = flat(JSON.parse(readFileSync(`tokens/themes/${th}.json`, 'utf8')));
  const prim = (n) => /-(50|[1-9]00)$/.test(n) || /^brand-/.test(n), pasos = new Set();
  for (const th in F) for (const n in F[th]) if (prim(n) && /^#/.test(F[th][n].$value)) pasos.add(F[th][n].$value.toUpperCase());
  const hoy = [];
  for (const th in F) for (const n in F[th]) { const v = F[th][n].$value; if (!prim(n) && /^#[0-9a-fA-F]{6}$/.test(v) && !pasos.has(v.toUpperCase())) hoy.push(`${th} ${n} ${v.toUpperCase()}`); }
  const contados = new Set(readFileSync('tests/roles-sueltos.txt', 'utf8').split('\n').filter((l) => l && !l.startsWith('#')));
  const nuevos = hoy.filter((x) => !contados.has(x));
  assert.equal(nuevos.length, 0, 'colores sueltos nuevos:\n' + nuevos.join('\n'));
  assert.ok(hoy.length <= contados.size);
});

// A token is named for what it is for, or for the colour it really holds. `brand-lime` held ALMA's blue for a while,
// after the accent stopped being lime: it is `brand-accent` now, and the old name does not come back.
test('ningún token lleva el nombre de un color que ya no guarda', () => {
  const css = readFileSync('dist/css/alma.css', 'utf8');
  assert.doesNotMatch(css, /--brand-lime\b/, 'brand-lime volvió: el color de marca es brand-accent');
  assert.match(css, /--brand-accent:/);
  for (const th of ['dark', 'light', 'dark-hc', 'light-hc']) { const F = JSON.stringify(JSON.parse(readFileSync(`tokens/themes/${th}.json`, 'utf8')));
    assert.equal(/"brand-lime"|color\.brand-lime/.test(F), false, th); }
});
