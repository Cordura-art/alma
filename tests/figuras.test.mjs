// ALMA's line figures: what the engine promises, checked without a page.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync, readdirSync } from 'node:fs';
import { paginaDeFigura } from '../scripts/build-figura.mjs';

const require = createRequire(import.meta.url);
const M = require('../figuras/motor.js'), T = require('../figuras/terreno.js'), P = require('../figuras/pila.js'), L = require('../figuras/portatil.js');

test('la cámara va y vuelve: del suelo al cuadro y del cuadro al suelo', () => {
  const C = M.camara({ alza: 34, escala: 80 });
  for (const [x, y] of [[0, 0], [0.3, -0.4], [-1, 1], [0.72, 0.72]]) { const g = C.alSuelo(...C.a(x, y, 0)); assert.ok(Math.abs(g[0] - x) < 1e-9 && Math.abs(g[1] - y) < 1e-9); }
});

test('un resorte llega a su meta y se detiene; con menos movimiento, llega de una vez', () => {
  const r = M.resorte(0); r.meta = 1; let pasos = 0; while (M.paso(r, 1 / 60) && pasos < 600) pasos++;
  assert.equal(r.x, 1); assert.ok(pasos > 5 && pasos < 240, `tardó ${pasos} cuadros`);
  const q = M.resorte(0); q.meta = 1; assert.equal(M.paso(q, 1 / 60, true), false); assert.equal(q.x, 1);
});

test('las curvas de ALMA parten en 0, llegan a 1 y no retroceden', () => {
  const f = M.curva('cubic-bezier(0.4, 0.14, 0.3, 1)'); assert.equal(f(0), 0); assert.equal(f(1), 1);
  let antes = 0; for (let i = 1; i <= 20; i++) { const v = f(i / 20); assert.ok(v >= antes - 1e-6); antes = v; }
});

test('terreno: nada sale del cuadro, esté donde esté la colina y a cualquier intensidad', () => {
  const C = T.camaraDe();
  for (const I of [0, 0.5, 1]) for (let a = -T.LEJOS; a <= T.LEJOS + 1e-9; a += T.LEJOS / 4) for (let b = -T.LEJOS; b <= T.LEJOS + 1e-9; b += T.LEJOS / 4)
    for (let i = 0; i < T.PUNTOS; i++) for (let j = 0; j < T.FILAS; j++) {
      const x = -1 + 2 * i / (T.PUNTOS - 1), y = -1 + 2 * j / (T.FILAS - 1), h = T.altura(x, y, a, b, 1, I), q = C.a(x, y, h);
      assert.ok(h <= T.TOPE && h >= 0); assert.ok(q[0] >= 8 && q[0] <= M.ANCHO - 8 && q[1] >= 8 && q[1] <= M.ALTO - 8, `(${x.toFixed(2)}, ${y.toFixed(2)}) cae en ${q.map((v) => v.toFixed(0))}`);
    }
});

test('terreno: en reposo no es plano, y sus orillas tocan el suelo', () => {
  const hs = []; for (let i = 0; i <= 20; i++) for (let j = 0; j <= 20; j++) hs.push(T.altura(-1 + i / 10, -1 + j / 10, T.CASA[0], T.CASA[1], 0.45, 0.5));
  assert.ok(Math.max(...hs) > 0.2); assert.equal(T.altura(1, 0.3, 0, 0, 1, 1), 0); assert.equal(T.altura(-0.2, -1, 0, 0, 1, 1), 0);
});

test('un sólido redondo: treinta y dos lados por vuelta, una silueta que lo contiene y un pliegue que es parte de su tapa', () => {
  const anillo = M.redondo(1.5, 1, 0.24); assert.equal(anillo.length, 36);      // four corners of eight sides: no upright corner is a point
  for (const p of anillo) assert.ok(Math.abs(Math.hypot(p.nx, p.ny) - 1) < 1e-9);
  const C = M.camara(), S = M.silueta(C, anillo, { x: 0.2, y: -0.1, z: 0.3, giro: 0.4 }, 0.07);
  const gira = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]), n = S.casco.length; assert.ok(n >= 8);
  for (let i = 0; i < n; i++) assert.ok(gira(S.casco[i], S.casco[(i + 1) % n], S.casco[(i + 2) % n]) > 0, 'la silueta no dobla hacia dentro');
  assert.ok(S.pliegue.length >= 3 && S.pliegue.length < anillo.length); for (const q of S.pliegue) assert.ok(S.arriba.includes(q));
});

test('pila: nada sale del cuadro, se elija la ficha que se elija; y en reposo no es un bloque', () => {
  const C = P.camaraDe(), anillo = M.redondo(P.ANCHO, P.FONDO, P.RADIO);
  for (const I of [0, 0.5, 1]) for (let a = -1; a < P.FICHAS; a++) for (let i = 0; i < P.FICHAS; i++) {
    const S = M.silueta(C, anillo, P.lugarDe(P.poseDe(i, a, I), C.mira), P.GRUESO);
    for (const q of S.casco) assert.ok(q[0] >= 10 && q[0] <= M.ANCHO - 10 && q[1] >= 10 && q[1] <= M.ALTO - 10, `ficha ${i} con la ${a} elegida cae en ${q.map((v) => v.toFixed(0))}`);
  }
  const giros = new Set(); for (let i = 0; i < P.FICHAS; i++) giros.add(P.poseDe(i, -1, 0.5).giro); assert.equal(giros.size, P.FICHAS);
  for (let i = 0; i < 3; i++) assert.deepEqual(P.poseDe(i, 3, 1), P.poseDe(i, -1, 1));      // the tiles under the chosen one stay where they are
});

test('un sólido inclinado: de pie es el mismo de antes; al girar en su bisagra conserva su forma y muestra la cara que toca', () => {
  const C = M.camara(), anillo = M.redondo(1.6, 1.1, 0.13), cerca = (a, b) => Math.abs(a - b) < 1e-9;
  const A = M.silueta(C, anillo, { x: 0.2, y: -0.1, z: 0.3, giro: 0.4 }, 0.07), B = M.silueta(C, anillo, M.lugar(0.2, -0.1, 0.3, 0.4), 0.07);
  assert.equal(A.casco.length, B.casco.length); A.casco.forEach((q, i) => assert.ok(cerca(q[0], B.casco[i][0]) && cerca(q[1], B.casco[i][1])));
  const T = L.tapaEn(90);      // straight up: its far edge stays on the hinge, its near edge is a lid's depth above it
  assert.ok(cerca(T.o[1] + T.R[1][1] * (-L.FONDO / 2), -L.FONDO / 2) && cerca(T.o[2] + T.R[2][1] * (L.FONDO / 2), L.BASE + L.FONDO));
  for (let j = 0; j < 3; j++) assert.ok(cerca(Math.hypot(T.R[0][j], T.R[1][j], T.R[2][j]), 1));
  const gira = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  for (const g of [0, 20, 60, 104, 134]) { const S = M.silueta(C, anillo, L.tapaEn(g), L.TAPA), n = S.casco.length; for (let i = 0; i < n; i++) assert.ok(gira(S.casco[i], S.casco[(i + 1) % n], S.casco[(i + 2) % n]) > 0); }
  // Nearly shut, the camera sees the lid's back and not its screen; open, its screen and not its back.
  assert.equal(M.silueta(C, anillo, L.tapaEn(10), L.TAPA).deArriba, true); assert.equal(M.lamina(C, anillo, L.tapaEn(10), 0, true).visible, false);
  assert.equal(M.silueta(C, anillo, L.tapaEn(100), L.TAPA).deArriba, false); assert.equal(M.lamina(C, anillo, L.tapaEn(100), 0, true).visible, true);
});

test('portátil: nada sale del cuadro de cerrado a abierto del todo; arriba abre, abajo cierra', () => {
  const C = L.camaraDe(), anillo = M.redondo(L.ANCHO, L.FONDO, L.RADIO);
  for (let g = 0; g <= L.tope(1); g += 2) for (const q of M.silueta(C, anillo, L.tapaEn(g), L.TAPA).casco) assert.ok(q[0] >= 10 && q[0] <= M.ANCHO - 10 && q[1] >= 10 && q[1] <= M.ALTO - 10, `a ${g}° cae en ${q.map((v) => v.toFixed(0))}`);
  for (const q of M.silueta(C, anillo, M.lugar(0, 0, 0, 0), L.BASE).casco) assert.ok(q[0] >= 10 && q[0] <= M.ANCHO - 10 && q[1] >= 10 && q[1] <= M.ALTO - 10);
  assert.equal(L.pedido(320, 0.5), 0); assert.equal(L.pedido(0, 1), L.tope(1)); assert.ok(L.pedido(100, 0.5) > L.pedido(200, 0.5)); assert.ok(L.REPOSO <= L.tope(0));
});

test('las figuras no traen colores sueltos ni palabras dentro del dibujo: solo tokens de ALMA', () => {
  for (const f of readdirSync('figuras').filter((n) => n.endsWith('.js'))) {
    const s = readFileSync('figuras/' + f, 'utf8'); assert.equal(/#[0-9a-fA-F]{3,8}\b/.test(s), false, f + ' trae un color suelto'); assert.equal(/rgba?\(|hsla?\(/.test(s), false, f); assert.equal(/'text'|"text"|<text/.test(s), false, f + ' escribe dentro del dibujo');
  }
  const motor = readFileSync('figuras/motor.js', 'utf8');
  for (const t of ['--ui-02', '--text-01', '--text-02', '--text-03', '--border-subtle', '--interactive-01', '--focus', '--duration-slow-02', '--easing-standard-expressive']) assert.ok(motor.includes(`var(${t})`) || motor.includes(`'${t}'`), 'falta el token ' + t);
});

test('la página de una figura se arma sola, con motor y figura dentro', () => {
  const html = paginaDeFigura('terreno'); assert.ok(html.includes("define('terreno'")); assert.ok(html.includes('AlmaFigura.monta(')); assert.ok(html.includes('prefers-reduced-motion'));
  assert.throws(() => paginaDeFigura('no-existe'));
});
