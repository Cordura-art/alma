// Tests for the entity engine (site/entidades.js) run in Node: the IBM date chosen by `npm run buscar-fecha` must keep
// generating IBM's look, and the founding date must keep showing why it was not used.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularCarta } from '../entidades/carta.mjs';
import { cargarMotor, deltaE } from '../scripts/lib/entidades.mjs';

const En = await cargarMotor();
const entidad = (nacimiento) => {
  const c = calcularCarta(nacimiento);
  return { id: 't', name: 'IBM', nacimiento, variation: 0, type: c.tipo, auth: c.autoridad, profile: c.perfil, def: c.definicion, centers: c.definidos.slice() };
};

test('la fecha elegida para IBM da un Proyector 1/3 con Cabeza, Ajna y Garganta', () => {
  const c = calcularCarta({ fecha: '1911-06-03', hora: '04:00', zona: 'America/New_York' });
  assert.deepEqual([c.tipo, c.autoridad, c.perfil, c.definicion], ['proyector', 'mental', '1/3', 'simple']);
  assert.deepEqual(c.definidos, ['cabeza', 'ajna', 'garganta']);
  assert.deepEqual(c.canales.map((k) => k.id), ['17-62', '24-61']);
});

test('esa carta genera el azul de IBM, ángulos rectos y letra de ancho normal', () => {
  const P = En.params(entidad({ fecha: '1911-06-03', hora: '04:00', zona: 'America/New_York' }));
  assert.ok(deltaE(P.accent.dark['interactive-01'], '#0F62FE') < 0.02, P.accent.dark['interactive-01']);
  assert.equal(P.accent.dark['text-on-interactive'], '#FFFFFF');
  assert.equal(P.radius['radius-button'], '0px');
  assert.equal(P.fontWidth, 100);
  assert.deepEqual([P.weights.display, P.weights.heading, P.weights.body, P.weights.emphasis], [300, 400, 400, 600]);
});

test('la fecha de fundación da otra entidad: un Generador ámbar y redondeado', () => {
  const P = En.params(entidad({ fecha: '1911-06-16', zona: 'America/New_York' }));
  assert.ok(deltaE(P.accent.dark['interactive-01'], '#0F62FE') > 0.2);
  assert.notEqual(P.radius['radius-button'], '0px');
});
