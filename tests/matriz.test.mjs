// The colour matrix (tokens/matriz.json) is a rule: every token has a slot, a family and a step, for light and for dark.
// Before it governs the tokens it has to hold on its own: every slot exists, and every pair reads, in ALMA and in every
// entity. `npm test`.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { matriz, con, PASOS, NEUTRO } from '../scripts/lib/matriz.mjs';
import { sistema, valor } from '../scripts/lib/documentacion.mjs';

const regla = JSON.parse(readFileSync('tokens/matriz.json', 'utf8')), tok = JSON.parse(readFileSync('dist/json/tokens.json', 'utf8'));
// The two colours a system gives the matrix: its brand, and its action (the colour of its links on light).
async function sistemas() {
  const NOMBRES = [...new Set(Object.values(regla.casilleros).flat().map((c) => (/^([a-z]+)\d+$/.exec(c) || [])[1]).filter(Boolean))];
  const rampas = (de) => Object.fromEntries(NOMBRES.map((r) => [r, Object.fromEntries(PASOS.map((s) => [s, de(`${r}-${s}`)]))]));
  const out = { alma: { marca: valor(tok, 'brand-accent', 'light'), accion: valor(tok, 'link-01', 'light'), rampas: rampas((n) => valor(tok, n, 'light')) } };
  for (const f of readdirSync('entidades/lenguajes')) { const id = f.replace(/\.json$/, ''), S = await sistema(id), de = (n) => { let v = S.color.light[n] ?? valor(tok, n, 'light'); const m = /^var\(--([a-z0-9-]+)\)$/.exec(v); return m ? de(m[1]) : v; };
    out[id] = { marca: de('brand-accent'), accion: de('link-01'), rampas: rampas(de) }; }
  return out;
}

test('cada casillero es una familia y un paso que existen, en claro y en oscuro', () => {
  for (const [n, par] of Object.entries(regla.casilleros)) { assert.equal(par.length, 2, n);
    for (const c of par) { if (c === 'W' || c === 'K') continue; const m = /^([PST]|[a-z]+)(\d+)$/.exec(c); assert.ok(m, `${n}: «${c}» no es un casillero`);
      assert.ok((m[1] === 'S' ? NEUTRO : PASOS).includes(Number(m[2])), `${n}: la rampa ${m[1]} no tiene el paso ${m[2]}`);
      if (/^[a-z]/.test(m[1])) assert.doesNotThrow(() => valor(tok, `${m[1]}-${m[2]}`, 'light'), `${n}: no existe la rampa ${m[1]}`); } }
  assert.ok(regla.tinte >= 0 && regla.tinte <= 1);
});

test('con la matriz, cada par alcanza su contraste en ALMA y en todas las entidades, en claro y en oscuro', async () => {
  const S = await sistemas(), mal = [];
  for (const [id, s] of Object.entries(S)) for (const tema of ['light', 'dark']) { const m = matriz(s, tema, regla).m;
    for (const p of regla.pares) { const c = con(m[p.texto], m[p.fondo]); if (c < p.minimo) mal.push(`${id} · ${tema} · ${p.texto} sobre ${p.fondo}: ${c.toFixed(2)}:1, y necesita ${p.minimo}:1`); } }
  assert.equal(mal.length, 0, mal.join('\n'));
});

test('la marca queda en su casillero: el botón principal es el color de marca tal cual', async () => {
  const S = await sistemas();
  for (const [id, s] of Object.entries(S)) for (const tema of ['light', 'dark']) assert.equal(matriz(s, tema, regla).m['interactive-01'], s.marca.toUpperCase(), `${id} · ${tema}`);
});

// Since 2026-10-09 the matrix governs: in the light theme and in the dark one, ALMA's tokens are what their slots say,
// and the three ramps in tokens/themes are the ones the matrix makes. `npm run matriz:aplicar` puts them back in line.
test('los tokens de ALMA son los de la matriz, en claro y en oscuro', () => {
  const marca = valor(tok, 'brand-accent', 'light'), mal = [];
  const rampas = Object.fromEntries([...new Set(Object.values(regla.casilleros).flat().map((c) => (/^([a-z]+)\d+$/.exec(c) || [])[1]).filter(Boolean))].map((r) => [r, Object.fromEntries(PASOS.map((s) => [s, valor(tok, `${r}-${s}`, 'light')]))]));
  for (const tema of ['light', 'dark']) { const M = matriz({ marca, accion: marca, rampas }, tema, regla);
    for (const [n, v] of Object.entries(M.m)) { let hoy; try { hoy = valor(tok, n, tema); } catch { continue; } if (hoy.toUpperCase() !== v.toUpperCase()) mal.push(`${tema} · ${n}: ${hoy}, y su casillero dice ${v}`); }
    for (const s of PASOS) for (const [r, R] of [['primary', M.P], ['tertiary', M.T]]) if (valor(tok, `${r}-${s}`, tema).toUpperCase() !== R[s]) mal.push(`${tema} · ${r}-${s}`);
    for (const s of NEUTRO) if (valor(tok, `secondary-${s}`, tema).toUpperCase() !== M.S[s]) mal.push(`${tema} · secondary-${s}`); }
  assert.equal(mal.length, 0, mal.join('\n') + '\nCorre npm run matriz:aplicar y npm run build.');
});

test('una entidad toma sus colores de la matriz: su marca en el botón principal, su acción en enlaces y foco', async () => {
  for (const f of readdirSync('entidades/lenguajes')) { const id = f.replace(/\.json$/, ''), S = await sistema(id), c = S.color.light;
    assert.equal(c['interactive-01'], c['primary-500'], `${id}: el botón principal es Primary 500`);
    assert.equal(c['link-01'], c['tertiary-500'], `${id}: el enlace es Tertiary 500`);
    assert.equal(c['focus'], c['tertiary-400'], `${id}: el foco es Tertiary 400`);
    assert.equal(c['ui-01'], '#FFFFFF', `${id}: un contenedor es blanco sobre la página teñida`); assert.equal(c['ui-02'], c['secondary-50']); }
});
