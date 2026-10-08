// ALMA's clock (site/reloj.js): one clock for every piece that moves on a page.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// A page with nothing in it but a clock: frames are given by hand, so that what the clock does with them is seen.
function pagina() {
  const pedidos = [], oyentes = {}, w = { performance: { now: () => w.t }, t: 1000, innerHeight: 800, setTimeout: (f) => { try { f(); } catch (e) { w.fallas.push(e.message); } }, fallas: [],
    requestAnimationFrame: (f) => { pedidos.push(f); return pedidos.length; }, addEventListener: (q, f) => { (oyentes[q] ||= []).push(f); }, matchMedia: () => w.menos, menos: { matches: false, addEventListener: (q, f) => { w.menos.avisa = f; } },
    document: { hidden: false, addEventListener: (q, f) => { (oyentes[q] ||= []).push(f); } } };
  w.window = w; vm.runInNewContext(readFileSync('site/reloj.js', 'utf8'), w);
  return { w, R: w.AlmaReloj, pedidos, cuadro: (ms) => { w.t += ms; const f = pedidos.shift(); f(w.t); }, dispara: (q) => (oyentes[q] || []).forEach((f) => f()) };
}

test('muchas piezas, un solo pedido al navegador por cuadro, y cada una en el orden en que pidió', () => {
  const { R, pedidos, cuadro } = pagina(), orden = [];
  R.pide(() => orden.push('a')); R.pide(() => orden.push('b')); const c = R.pide(() => orden.push('c')); R.deja(c);
  assert.equal(pedidos.length, 1); cuadro(16); assert.deepEqual(orden, ['a', 'b']); assert.equal(pedidos.length, 0, 'nadie pidió otro cuadro y el reloj se detiene');
  // (what a piece asks for during a frame is for the next one)
  R.pide(() => { orden.push('d'); R.pide(() => orden.push('e')); }); cuadro(16); assert.deepEqual(orden, ['a', 'b', 'd']); assert.equal(pedidos.length, 1); cuadro(16); assert.deepEqual(orden, ['a', 'b', 'd', 'e']);
});

test('una pieza que falla no detiene a las demás, y su falla no se pierde', () => {
  const { w, R, cuadro } = pagina(); let llego = false;
  R.pide(() => { throw new Error('se cayó'); }); R.pide(() => { llego = true; }); cuadro(16);
  assert.equal(llego, true); assert.deepEqual(w.fallas, ['se cayó']);
});

test('lo que sigue cada cuadro lo hace mientras responda que sí, y se puede quitar', () => {
  const { R, pedidos, cuadro } = pagina(); let veces = 0;
  R.cada(() => ++veces < 3); cuadro(16); cuadro(16); cuadro(16); assert.equal(veces, 3); assert.equal(pedidos.length, 0);
  const quita = R.cada(() => { veces++; return true; }); cuadro(16); cuadro(16); quita(); cuadro(16); assert.equal(veces, 5); assert.equal(pedidos.length, 0);
});

test('sabe cuánto pasó, cuántos cuadros por segundo lleva, y no cuenta una pausa como un cuadro largo', () => {
  const { R, cuadro } = pagina(); const quita = R.cada(() => true);
  for (let i = 0; i < 41; i++) cuadro(20); assert.equal(R.cuadros, 50); assert.ok(Math.abs(R.dt - 0.02) < 1e-9);
  cuadro(4000); assert.equal(R.dt, 0.05, 'el paso del tiempo tiene un tope'); quita();
});

test('la seña de quien mira, el movimiento reducido y el avance del desplazamiento son del reloj', () => {
  const { w, R, cuadro, dispara } = pagina(); let lecturas = 0, avisos = 0;
  w.t += 5000; assert.equal(R.descansa(3000), true); dispara('pointermove'); assert.equal(R.descansa(3000), false);
  assert.equal(R.quieto, false); R.alCambiar(() => avisos++); w.menos.matches = true; w.menos.avisa(); dispara('visibilitychange'); assert.equal(R.quieto, true); assert.equal(avisos, 2);
  // (a section four windows tall, scrolled one window and a half: half of the way; read once a frame, whoever asks)
  const el = { getBoundingClientRect: () => { lecturas++; return { top: -1200, bottom: 2000, height: 3200 }; } };
  assert.equal(R.avance(el).v, 0.5); assert.equal(R.avance(el).aLaVista, true); assert.equal(lecturas, 2, 'fuera de un cuadro se lee cada vez');
  R.pide(() => { R.avance(el); R.avance(el); R.avance(el); }); lecturas = 0; cuadro(16); assert.equal(lecturas, 1, 'dentro de un cuadro se lee una sola vez');
});

test('las piezas que se mueven piden sus cuadros al reloj, y siguen andando en una página que no lo tiene', () => {
  for (const f of ['palabra', 'escaneo', 'recorrido', 'mundo']) { const s = readFileSync(`site/${f}.js`, 'utf8'); assert.ok(s.includes('window.AlmaReloj ? window.AlmaReloj.pide(cuadro) : requestAnimationFrame(cuadro)'), f); }
  for (const f of ['generativo', 'entidades']) { const s = readFileSync(`site/${f}.js`, 'utf8'); assert.equal((s.match(/requestAnimationFrame\(/g) || []).length, 1, f + ': solo el reloj de repuesto llama al navegador'); assert.ok(s.includes('pideCuadro('), f); }
  assert.equal(/<\/script|<!--/i.test(readFileSync('site/reloj.js', 'utf8')), false);
});
