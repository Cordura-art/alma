// Tests for the automatic draft of a design language (entidades/borrador.mjs): for any birth date it writes a file
// with the same shape as a language written by hand, with every sentence resolved.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { calcularCarta } from '../entidades/carta.mjs';
import { generarPrincipios } from '../entidades/voz.mjs';
import { borradorDe } from '../scripts/lib/borrador.mjs';

const MODELO = JSON.parse(readFileSync('entidades/lenguajes/ensayo.json', 'utf8'));
const VALORES = ['acento', 'deltaE', 'ancho', 'radio', 'pesos', 'velocidad', 'primario', 'secundario', 'terciario', 'cruz', 'perfil', 'fechaLarga', 'error'];
// The keys of every object, as paths: arrays count once, by their first item.
const forma = (o, p = '', out = new Set()) => {
  if (Array.isArray(o)) { if (o.length) forma(o[0], p + '[]', out); } else if (o && typeof o === 'object') { for (const k of Object.keys(o)) { out.add(p + '.' + k); forma(o[k], p + '.' + k, out); } }
  return out;
};
const FECHAS = [];
for (let i = 0; i < 36; i++) FECHAS.push({ fecha: `${1950 + i * 2}-${String((i * 5) % 12 + 1).padStart(2, '0')}-${String((i * 7) % 28 + 1).padStart(2, '0')}`, hora: `${String((i * 5) % 24).padStart(2, '0')}:${String((i * 13) % 60).padStart(2, '0')}`, zona: ['America/Santiago', 'Europe/Madrid', 'Asia/Tokyo'][i % 3] });

test('el borrador de cualquier fecha tiene la forma de un lenguaje escrito a mano', async () => {
  const modelo = forma(MODELO), tipos = new Set(), autoridades = new Set();
  for (const nacimiento of FECHAS) {
    const L = await borradorDe({ id: 'prueba', nombre: 'Prueba', nacimiento, hoy: '2026-10-02' }), C = calcularCarta(nacimiento), donde = `${nacimiento.fecha} ${nacimiento.hora}`;
    tipos.add(C.tipo); autoridades.add(C.autoridad);
    const suya = forma(L);
    // Everything a hand-written language has, except what only some have: the second colour section and its table rows.
    for (const k of modelo) if (!/^\.fecha\.secciones\[\]\.(bullets|parrafos)/.test(k)) assert.ok(suya.has(k), `${donde}: falta ${k}`);
    assert.equal(L.principios.items.length, generarPrincipios(C).length, donde);
    for (const p of L.principios.items) assert.ok(p.t && p.p && p.q.length >= 3, donde);
    assert.equal(L.voz.atributos.length, 3); assert.equal(L.prisma.caras.length, 6); assert.equal(L.tipografia.escala.length, 10); assert.equal(L.tipografia.pesos.length, 4);
    const txt = JSON.stringify(L);
    assert.doesNotMatch(txt, /undefined|NaN|\[object|null/, donde);
    for (const m of txt.match(/\{(\w+)\}/g) || []) assert.ok(VALORES.includes(m.slice(1, -1)), `${donde}: marca desconocida ${m}`);
    assert.doesNotMatch(JSON.stringify(L.firma), /barra/i, donde);
    assert.ok(L.borrador.revisar.every((k) => L[k]), 'lo que pide revisar existe');
    assert.match(L.aviso, /^Borrador automático/);
  }
  assert.ok(tipos.size >= 4 && autoridades.size >= 4, `las fechas de prueba cubren pocos tipos (${[...tipos]}) o autoridades (${[...autoridades]})`);
});

test('la misma fecha da siempre el mismo borrador, y un color heredado cambia lo que dice del color', async () => {
  const dato = { id: 'prueba', nombre: 'Prueba', nacimiento: { fecha: '2026-10-01', hora: '12:00', zona: 'America/Santiago' }, hoy: '2026-10-02' };
  const a = await borradorDe(dato), b = await borradorDe(dato), c = await borradorDe({ ...dato, colorHeredado: '#00A86B' });
  assert.deepEqual(a, b);
  assert.equal(a.fechaLarga, '1 de octubre de 2026, 12:00, Santiago');
  assert.match(a.color.interfaz, /rojo.*errores/, 'un acento rojo avisa el cruce con los errores');
  assert.equal(c.colorHeredado, '#00A86B');
  assert.match(c.fecha.secciones[1].titulo, /que trajimos/);
});
