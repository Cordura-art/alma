// ALMA's score (site/partitura.js): the recipes of brand motion written once, and a sequence written as a list.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// A page with ALMA's motion tokens (or an entity's, a quarter slower), a clock whose frames are given by hand, and the score.
function pagina(lento = 1, menos = false) {
  const T = { '--duration-slow-01': 400 * lento + 'ms', '--duration-slow-02': 700 * lento + 'ms', '--duration-stagger': 20 * lento + 'ms', '--easing-entrance-expressive': 'cubic-bezier(0, 0, 0.3, 1)', '--easing-standard-expressive': 'cubic-bezier(0.4, 0.14, 0.3, 1)' };
  const pedidos = [], w = { t: 1000, performance: { now: () => w.t }, innerHeight: 800, setTimeout: (f) => f(), requestAnimationFrame: (f) => { pedidos.push(f); return pedidos.length; }, cancelAnimationFrame: () => {}, addEventListener: () => {},
    matchMedia: () => ({ matches: menos, addEventListener: () => {} }), document: { hidden: false, documentElement: {}, addEventListener: () => {} }, getComputedStyle: () => ({ getPropertyValue: (n) => T[n] || '' }) };
  w.window = w; vm.runInNewContext(readFileSync('site/reloj.js', 'utf8') + '\n' + readFileSync('site/partitura.js', 'utf8'), w);
  return { w, P: w.AlmaPartitura, pedidos, cuadro: (ms) => { w.t += ms; const f = pedidos.shift(); if (f) f(w.t); } };
}
const cerca = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, a + ' no es ' + b);

test('los tiempos de las recetas salen de los tokens, y una entidad más lenta lo es en todas', () => {
  const T = pagina().P.tiempos({}), L = pagina(1.25).P.tiempos({});
  cerca(T.escribirse.enfoca, 0.7); cerca(T.escribirse.pesa, 1.225); cerca(T.escribirse.pulso, 0.04); cerca(T.armarse.recorrido, 1.4); cerca(T.armarse.mundo, 1.4); cerca(T.armarse.objeto, 1.75);
  for (const r of Object.keys(T)) for (const k of Object.keys(T[r])) cerca(L[r][k], T[r][k] * 1.25);
  assert.deepEqual(Object.keys(T), ['escribirse', 'armarse', 'deshacerse', 'responder', 'avanzar', 'descansar']);
});

test('lo que el manual dice de cada receta es lo que la partitura tiene', () => {
  const R = JSON.parse(JSON.stringify(pagina().P.recetas)), doc = readFileSync('docs/elements/movimiento/2-coreografia.md', 'utf8'), fila = (n) => doc.split('\n').find((l) => l.startsWith('| ' + n + ' |'));
  assert.deepEqual(R.escribirse.tiempos, { enfoca: ['duration-slow-02', 1], pesa: ['duration-slow-02', 1.75], pulso: ['duration-stagger', 2] });
  assert.ok(fila('Escribirse').includes('se enfoca en `duration-slow-02`') && fila('Escribirse').includes('1,75 veces') && fila('Escribirse').includes('dos `duration-stagger`'));
  assert.deepEqual(R.armarse.tiempos, { recorrido: ['duration-slow-02', 2], mundo: ['duration-slow-02', 2], objeto: ['duration-slow-02', 2.5] });
  assert.ok(fila('Armarse').includes('Dos `duration-slow-02` en un recorrido o en un planeta; dos y media en una portada con objeto'));
  for (const [n, r] of [['Deshacerse', 'deshacerse'], ['Responder', 'responder'], ['Avanzar', 'avanzar'], ['Descansar', 'descansar']]) { assert.ok(fila(n), n); assert.equal(R[r].tiempos, undefined, n + ' sigue a algo: no tiene tiempo propio'); assert.ok(R[r].sigue); }
  assert.ok(doc.includes('### La partitura') && doc.includes('site/partitura.js'));
});

test('una curva de ALMA es la función que es: empieza en 0, termina en 1, y la de entrada va adelantada', () => {
  const { P } = pagina(), f = P.curva('easing-entrance-expressive', {}), recta = P.curva('no-existe', {});
  assert.equal(f(0), 0); assert.equal(f(1), 1); assert.ok(f(0.3) > 0.3 && f(0.3) < 1); for (let k = 0.1, antes = 0; k < 1; k += 0.1) { assert.ok(f(k) > antes); antes = f(k); }
  assert.equal(recta(0.37), 0.37); assert.equal(P.curva((k) => k * k, {})(0.5), 0.25);
});

test('una partitura se toca en orden, cada paso con su tiempo en tokens, y cada paso termina en 1', () => {
  const { P, cuadro, pedidos } = pagina(), a = [], b = []; let fin = 0;
  const T = P.toca([{ en: 0, dura: ['duration-slow-01', 1], paso: (k) => a.push(k) }, { en: 'sigue', dura: ['duration-slow-01', 0.5], paso: (k) => b.push(k) }], { el: {}, alTerminar: () => fin++ });
  cerca(T.largo, 0.6); assert.deepEqual(b, [0], 'lo que aún no empieza está en su principio');
  cuadro(0); for (let i = 0; i < 9; i++) cuadro(40); assert.ok(a.length > 5 && a.at(-1) < 1 && b.length === 1, 'a los 360 ms el primero va llegando y el segundo no empieza');
  for (let i = 0; i < 9; i++) cuadro(40); assert.equal(a.at(-1), 1); assert.equal(b.at(-1), 1); assert.equal(T.termino, true); assert.equal(fin, 1); assert.equal(pedidos.length, 0, 'terminada, no pide más cuadros');
  for (let i = 1; i < a.length; i++) assert.ok(a[i] >= a[i - 1]);
});

test('con movimiento reducido una partitura está en su final desde el principio; y se puede dejar a medias', () => {
  const q = pagina(1, true), v = []; let fin = 0; const T = q.P.toca([{ en: 1, dura: 2, paso: (k) => v.push(k) }], { alTerminar: () => fin++ });
  assert.deepEqual(v, [1]); assert.equal(T.termino, true); assert.equal(fin, 1); assert.equal(q.pedidos.length, 0);
  const p = pagina(), u = []; const S = p.P.toca([{ en: 0, dura: 1, paso: (k) => u.push(k) }]); p.cuadro(0); p.cuadro(40); S.deja(); const n = u.length; p.cuadro(40); p.cuadro(40); assert.equal(u.length, n); assert.equal(S.termino, false);
});

test('las piezas piden sus tiempos a la partitura', () => {
  assert.ok(readFileSync('site/palabra.js', 'utf8').includes('window.AlmaPartitura.tiempos(el).escribirse'));
  assert.ok(readFileSync('site/escaneo.js', 'utf8').includes('tiempos(escena).armarse.objeto')); assert.ok(readFileSync('site/recorrido.js', 'utf8').includes('tiempos(escena).armarse.recorrido')); assert.ok(readFileSync('site/mundo.js', 'utf8').includes('tiempos(escena).armarse.mundo'));
  assert.equal(/<\/script|<!--/i.test(readFileSync('site/partitura.js', 'utf8')), false);
});
