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
