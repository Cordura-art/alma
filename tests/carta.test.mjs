// Tests for the chart engine (entidades/carta.mjs): mandala table, gate boundaries, time zones, the 88° design
// moment, the type and authority rules on hand-built charts, and a regression chart.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as Astro from 'astronomy-engine';
import { RUEDA, CENTROS, CANALES, CENTRO_DE } from '../entidades/tabla.mjs';
import { puertaDe, aUTC, analizar, calcularCarta } from '../entidades/carta.mjs';

test('el mandala tiene 64 puertas, cada una en un solo centro, y 36 canales válidos', () => {
  assert.equal(new Set(RUEDA).size, 64);
  assert.deepEqual([...RUEDA].sort((a, b) => a - b), Array.from({ length: 64 }, (_, i) => i + 1));
  assert.equal(CENTROS.flatMap((c) => c.puertas).length, 64);
  assert.equal(CANALES.length, 36);
  for (const [a, b] of CANALES) { assert.ok(CENTRO_DE[a] && CENTRO_DE[b]); assert.notEqual(CENTRO_DE[a], CENTRO_DE[b], `${a}-${b} une dos centros`); }
});

test('las longitudes caen en la puerta y la línea correctas', () => {
  assert.equal(puertaDe(302).puerta, 41); assert.equal(puertaDe(302).linea, 1);
  assert.equal(puertaDe(301.99).puerta, 60); assert.equal(puertaDe(301.99).linea, 6);
  assert.equal(puertaDe(358.25).puerta, 25); assert.equal(puertaDe(358.25).linea, 1);
  assert.equal(puertaDe(0).puerta, 25); assert.equal(puertaDe(0).linea, 2);
  assert.equal(puertaDe(302 + 5.625).puerta, 19);
});

test('la hora local pasa a UTC con el horario de verano de cada zona', () => {
  assert.equal(aUTC('2024-01-15', '10:00', 'America/Santiago').toISOString(), '2024-01-15T13:00:00.000Z');
  assert.equal(aUTC('2024-07-15', '10:00', 'America/Santiago').toISOString(), '2024-07-15T14:00:00.000Z');
  assert.equal(aUTC('1911-06-16', '12:00', 'America/New_York').toISOString(), '1911-06-16T17:00:00.000Z');
});

test('el lado diseño es cuando el Sol estaba 88° antes', () => {
  const c = calcularCarta({ fecha: '1990-05-20', hora: '08:30', zona: 'America/Santiago' });
  const a = Astro.SunPosition(new Date(c.utc.personalidad)).elon, b = Astro.SunPosition(new Date(c.utc.diseno)).elon;
  const arco = ((a - b) % 360 + 360) % 360;
  assert.ok(Math.abs(arco - 88) < 1e-4, `arco ${arco}`);
  const dias = (new Date(c.utc.personalidad) - new Date(c.utc.diseno)) / 86400000;
  assert.ok(dias > 85 && dias < 93, `días ${dias}`);
});

// Hand-built charts: only the gates matter, so both sides share the same list.
const con = (...puertas) => analizar(puertas.map((p) => ({ puerta: p })), []);
test('tipo y autoridad siguen las reglas del diseño humano', () => {
  let r = con(); assert.equal(r.tipo, 'reflector'); assert.equal(r.autoridad, 'lunar'); assert.equal(r.definicion, 'ninguna');
  r = con(20, 34); assert.equal(r.tipo, 'mg'); assert.equal(r.autoridad, 'sacral');
  r = con(5, 15); assert.equal(r.tipo, 'generador'); assert.equal(r.autoridad, 'sacral');
  r = con(21, 45); assert.equal(r.tipo, 'manifestador'); assert.equal(r.autoridad, 'ego'); assert.equal(r.detalleAutoridad, 'manifestada');
  r = con(25, 51); assert.equal(r.tipo, 'proyector'); assert.equal(r.autoridad, 'ego'); assert.equal(r.detalleAutoridad, 'proyectada');
  r = con(11, 56); assert.equal(r.tipo, 'proyector'); assert.equal(r.autoridad, 'mental');
  r = con(1, 8); assert.equal(r.tipo, 'proyector'); assert.equal(r.autoridad, 'autoproyectada');
  r = con(6, 59, 12, 22); assert.equal(r.tipo, 'mg'); assert.equal(r.autoridad, 'emocional');
  r = con(35, 36); assert.equal(r.tipo, 'manifestador'); assert.equal(r.autoridad, 'emocional');
  r = con(18, 58); assert.equal(r.tipo, 'proyector'); assert.equal(r.autoridad, 'esplenica');
});

test('la definición cuenta los grupos de centros conectados', () => {
  assert.equal(con(11, 56).definicion, 'simple');
  assert.equal(con(11, 56, 18, 58).definicion, 'partida');
  assert.equal(con(11, 56, 18, 58, 5, 15).definicion, 'triple');
  assert.equal(con(11, 56, 18, 58, 25, 51, 37, 40).definicion, 'triple'); // G–Corazón–Plexo forman un solo grupo
});

test('el nodo lunar verdadero queda cerca del nodo medio', () => {
  for (const f of ['1911-06-16', '1990-05-20', '2024-01-01']) {
    const d = new Date(f + 'T12:00:00Z'), T = (d - Date.UTC(2000, 0, 1, 12)) / 86400000 / 36525;
    const medio = (((125.04452 - 1934.136261 * T) % 360) + 360) % 360;
    const c = calcularCarta({ fecha: f, hora: '12:00', zona: 'UTC' });
    const nodo = c.personalidad.find((a) => a.cuerpo === 'Nodo norte').lon;
    const dif = Math.abs(((nodo - medio + 540) % 360) - 180);
    assert.ok(dif < 2, `${f}: verdadero ${nodo.toFixed(2)}, medio ${medio.toFixed(2)}`);
  }
});

test('carta de regresión: la misma fecha da siempre la misma carta', () => {
  const c = calcularCarta({ fecha: '1911-06-16', zona: 'America/New_York', nombre: 'IBM' });
  assert.equal(c.entrada.horaConocida, false);
  assert.deepEqual([c.tipo, c.autoridad, c.perfil, c.definicion], ['generador', 'sacral', '2/5', 'partida']);
  assert.deepEqual(c.canales.map((k) => k.id), ['13-33', '42-53']);
  assert.deepEqual(c.cruz.puertas, [12, 11, 36, 6]);
  assert.deepEqual(calcularCarta({ fecha: '1911-06-16', zona: 'America/New_York' }).puertas, c.puertas);
});

test('las entradas mal escritas se rechazan con un mensaje claro', () => {
  assert.throws(() => calcularCarta({ fecha: '16/06/1911', zona: 'UTC' }), /AAAA-MM-DD/);
  assert.throws(() => calcularCarta({ fecha: '1911-06-16', hora: '12h', zona: 'UTC' }), /HH:MM/);
});
