// Tests for the voice and principles written from a chart (entidades/voz.mjs, entidades/arquetipos.mjs).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PUERTAS, CANAL_NOMBRE, VOZ_GARGANTA } from '../entidades/arquetipos.mjs';
import { CANALES, CENTROS } from '../entidades/tabla.mjs';
import { calcularCarta } from '../entidades/carta.mjs';
import { generarVoz, generarPrincipios } from '../entidades/voz.mjs';

test('las 64 puertas y los 36 canales tienen su arquetipo', () => {
  for (let n = 1; n <= 64; n++) for (const k of ['hexagrama', 'tema', 'voz', 'principio', 'interfaz']) assert.ok(PUERTAS[n][k], `puerta ${n}: ${k}`);
  for (const [a, b] of CANALES) assert.ok(CANAL_NOMBRE[a + '-' + b], `canal ${a}-${b}`);
  assert.deepEqual(Object.keys(VOZ_GARGANTA).map(Number).sort((a, b) => a - b), CENTROS.find((c) => c.id === 'garganta').puertas.slice().sort((a, b) => a - b));
});

test('la voz de una carta real: tres adjetivos, registro, ritmo, trato y ejemplos', () => {
  const v = generarVoz(calcularCarta({ fecha: '1911-06-16', zona: 'America/New_York' }));
  assert.deepEqual(v.adjetivos, ['cuidadosa', 'intensa', 'reservada']);
  assert.match(v.registro, /^Natural/); assert.match(v.ritmo, /sí o no/); assert.match(v.garganta, /memoria/);
  assert.equal(v.ejemplos.length, 3); for (const e of v.ejemplos) assert.ok(e.si && e.no && e.porque);
});

test('los principios nacen de los canales y de la cruz', () => {
  const p = generarPrincipios(calcularCarta({ fecha: '1911-06-16', zona: 'America/New_York' }));
  assert.deepEqual(p.map((x) => x.titulo), ['Hablar cuando importa', 'Memoria que enseña', 'Ciclos que maduran', 'Compartir las ideas']);
  assert.match(p[1].origen, /Canal 13-33/);
});

test('una carta sin canales, como la de un Reflector, toma sus principios de la cruz', () => {
  const act = (ps) => ps.map((p) => ({ p }));
  const c = { tipo: 'reflector', autoridad: 'lunar', perfil: '5/1', definidos: [], canales: [], personalidad: act([1, 2, 3, 4, 5, 6, 7]), diseno: act([8, 9, 10, 11]) };
  const p = generarPrincipios(c);
  assert.equal(p.length, 4);
  assert.ok(p.every((x) => /Sol|Tierra/.test(x.origen)));
  assert.equal(generarVoz(c).garganta.startsWith('Su Garganta está abierta'), true);
});

test('en muchas cartas al azar siempre hay tres adjetivos y de tres a cinco principios', () => {
  let s = 7;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 300; i++) {
    const d = new Date(Date.UTC(1900, 0, 1) + r() * (Date.UTC(2030, 0, 1) - Date.UTC(1900, 0, 1)));
    const c = calcularCarta({ fecha: d.toISOString().slice(0, 10), hora: d.toISOString().slice(11, 16), zona: 'UTC' });
    assert.equal(new Set(generarVoz(c).adjetivos).size, 3);
    const n = generarPrincipios(c).length; assert.ok(n >= 3 && n <= 5, `${d.toISOString()}: ${n}`);
  }
});
