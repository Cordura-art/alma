// Tests for the sheets (entidades/laminas.mjs): twelve drawings of an entity's world made only of strokes, and the
// way they are got ready for a pen plotter.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { sistema } from '../scripts/lib/documentacion.mjs';
import { genesDe } from '../scripts/lib/generativo.mjs';
import { colores } from '../entidades/generador.mjs';
import { LAMINAS, HOJAS, trazosDe, preparar, laminaSvg, lamina, mundo } from '../entidades/laminas.mjs';

const de = async (id) => { const S = await sistema(id); return { G: genesDe(S), nombres: S.L.ilustracion.generativa.nombres }; };

test('las doce láminas de cada entidad: solo trazos, solo con sus colores, y siempre las mismas', async () => {
  assert.equal(LAMINAS.length, 12); assert.equal(new Set(LAMINAS.map((l) => l.id)).size, 12);
  for (const id of ['ensayo', 'cordura', 'automata']) {
    const { G, nombres } = await de(id), propios = new Set(colores(G.pieza));
    for (const l of LAMINAS) {
      const T = trazosDe(G, l.id, { nombres });
      assert.ok(T.length > 20, `${id} · ${l.id}: ${T.length} trazos`);
      for (const t of T) { assert.ok(propios.has(t.c), `${id} · ${l.id}: ${t.c} no es de la entidad`); assert.ok(t.p.length >= 1 && t.p.every((q) => Number.isFinite(q[0]) && Number.isFinite(q[1])), `${id} · ${l.id}: un punto que no es un número`); }
      assert.deepEqual(trazosDe(G, l.id, { nombres }), T, `${id} · ${l.id}: la misma entidad, la misma lámina`);
    }
    // Another moment of the way is another drawing, for the ones that look ahead.
    assert.notDeepEqual(trazosDe(G, 'filas', { avance: 20 }), trazosDe(G, 'filas', { avance: 6 }));
  }
  const { G } = await de('ensayo');
  assert.throws(() => trazosDe(G, 'tubos'), /No hay una lámina «tubos»/);
});

test('el mundo de una entidad no tiene fin, repite su carta en cada tramo y toma la forma de su dirección', async () => {
  const { G } = await de('ensayo'), { G: A } = await de('automata'), alt = mundo(G), liso = mundo({ ...G, centros: [], direccion: '' });
  for (const z of [-400, 0, 3, 36, 1000, 99999]) assert.ok(Number.isFinite(alt(0.5, z)) && alt(0.5, z) >= 0, `a ${z} filas`);
  // Ensayo's field has a focus: a peak where each stretch begins. Autómata's turns: a ring there, and a hollow inside.
  assert.ok(alt(0.5, 0) - liso(0.5, 0) > 0.9 && alt(0.5, 36) - liso(0.5, 36) > 0.9, 'una cumbre al comenzar cada tramo');
  const giro = mundo({ ...A, centros: [] }), sinGiro = mundo({ ...A, centros: [], direccion: '' });
  assert.ok(giro(0.76, 0) - sinGiro(0.76, 0) > 0.6 && giro(0.5, 0) - sinGiro(0.5, 0) < 0.01, 'un anillo, hueco al medio');
  // Each defined center is a hill, somewhere inside every stretch.
  const cerros = (c) => { let n = 0; for (let z = c * 36 + 6; z < c * 36 + 33; z += 0.5) for (let x = 0; x <= 1; x += 0.05) if (alt(x, z) - liso(x, z) > 0.3) n++; return n; };
  assert.ok(cerros(0) > 10 && cerros(5) > 10, 'cerros en cada tramo');
});

test('lo que tapa un cerro no se dibuja: en línea no hay rellenos que lo escondan', async () => {
  const { G } = await de('ensayo'), llano = { ...G, centros: [], direccion: '' };
  const puntos = (T) => T.reduce((s, t) => s + t.p.length, 0);
  // Seen from a corner, the hills hide the rows behind them: fewer points are drawn than on a land without hills, in
  // more strokes, because a row is cut where a hill covers it.
  const maqueta = trazosDe(G, 'maqueta'), lisa = trazosDe(llano, 'maqueta');
  assert.ok(puntos(maqueta) < puntos(lisa) * 0.95, `los cerros esconden filas: ${puntos(maqueta)} puntos y ${puntos(lisa)} sin cerros`);
  assert.ok(maqueta.length > lisa.length * 1.3, 'y las cortan');
  // The chart in boxes: its channels are drawn in the accent, and what a box hides comes back as dashes.
  const cajas = trazosDe(G, 'cajas'), rayas = cajas.filter((t) => t.c === G.pieza.barras[4]);
  assert.ok(cajas.some((t) => t.c === G.pieza.acento), 'los canales, en el acento, enteros o en rayas');
  assert.ok(rayas.length > 30 && rayas.every((t) => Math.hypot(t.p[t.p.length - 1][0] - t.p[0][0], t.p[t.p.length - 1][1] - t.p[0][1]) <= 5.01), 'lo tapado, en rayas de 5');
});

test('preparar para el plotter: unir, simplificar, ordenar, componer en la hoja y contar', async () => {
  // Four pieces of one square, and a far stroke between them in the list: one closed stroke and the far one.
  const sueltos = [{ c: 'a', p: [[0, 0], [5, 0], [10, 0]] }, { c: 'a', p: [[200, 200], [210, 200]] }, { c: 'a', p: [[10, 10], [10, 0]] }, { c: 'a', p: [[10, 10], [0, 10]] }, { c: 'a', p: [[0, 10], [0, 0]] }];
  const L = preparar(sueltos), cruda = preparar(sueltos, { preparar: false });
  assert.equal(cruda.cuenta.trazos, 5); assert.equal(L.cuenta.trazos, 2, 'los cuatro lados son un trazo');
  const cuadro = L.capas[0].lineas.find((p) => p.length > 2);
  assert.equal(cuadro.length, 5, 'el punto del medio de un lado sobra; las cuatro esquinas se quedan'); assert.deepEqual(cuadro[0], cuadro[4], 'y queda cerrado');
  assert.ok(Math.abs(L.cuenta.tinta - cruda.cuenta.tinta) < 1e-6, 'la misma tinta'); assert.ok(L.cuenta.aire < cruda.cuenta.aire, 'menos viaje en el aire');
  // A stroke drawn twice is drawn once, whichever way it runs.
  assert.equal(preparar([{ c: 'a', p: [[0, 0], [50, 0]] }, { c: 'a', p: [[50, 0], [0, 0]] }, { c: 'a', p: [[0, 0], [0, 80]] }]).cuenta.tinta, preparar([{ c: 'a', p: [[0, 0], [50, 0]] }, { c: 'a', p: [[0, 0], [0, 80]] }]).cuenta.tinta);
  // The sheet: inside a margin of 15 mm, lying down for a wide drawing, one layer per pen.
  const ancha = preparar([{ c: 'a', p: [[0, 0], [300, 0]] }, { c: 'b', p: [[0, 100], [300, 100]] }], { hoja: 'A3' }), alta = preparar([{ c: 'a', p: [[0, 0], [0, 300]] }, { c: 'a', p: [[100, 0], [100, 300]] }]);
  assert.deepEqual(ancha.hoja, [420, 297]); assert.deepEqual(alta.hoja, [210, 297]); assert.equal(ancha.capas.length, 2); assert.equal(alta.capas.length, 1);
  for (const X of [ancha, alta]) for (const c of X.capas) for (const p of c.lineas) for (const q of p) assert.ok(q[0] >= 15 - 1e-6 && q[0] <= X.hoja[0] - 15 + 1e-6 && q[1] >= 15 - 1e-6 && q[1] <= X.hoja[1] - 15 + 1e-6, 'dentro del margen');
  assert.equal(preparar(sueltos.concat([{ c: 'b', p: [[0, 0], [9, 9]] }]), { unaPluma: true }).capas.length, 1);
  assert.throws(() => preparar(sueltos, { hoja: 'Carta' }), /No hay una hoja «Carta»/);
  assert.deepEqual(Object.keys(HOJAS), ['A4', 'A3']);
});

test('una lámina sale en milímetros, con una capa por pluma y sin rellenos; y preparada viaja menos', async () => {
  for (const id of ['ensayo', 'cordura', 'automata']) {
    const { G, nombres } = await de(id);
    for (const l of LAMINAS) {
      const L = lamina(G, l.id, { nombres }), cruda = lamina(G, l.id, { nombres, preparar: false }), svg = laminaSvg(L), [w, h] = L.hoja;
      assert.match(svg, new RegExp(`^<svg [^>]*width="${w}mm" height="${h}mm" viewBox="0 0 ${w} ${h}">`), `${id} · ${l.id}`);
      assert.doesNotMatch(svg, /NaN|undefined|Infinity|<rect|<path/); assert.doesNotMatch(svg, /fill="(?!none)/, 'sin rellenos');
      assert.equal((svg.match(/inkscape:groupmode="layer"/g) || []).length, L.capas.length);
      assert.ok(L.cuenta.aire <= cruda.cuenta.aire * 1.02 && L.cuenta.trazos <= cruda.cuenta.trazos, `${id} · ${l.id}: preparada no viaja más (${L.cuenta.aire.toFixed(0)} y ${cruda.cuenta.aire.toFixed(0)} mm)`);
      assert.ok(L.cuenta.tinta > 500 && L.cuenta.tinta <= cruda.cuenta.tinta + 1, `${id} · ${l.id}: ${L.cuenta.tinta.toFixed(0)} mm de tinta`);
    }
    // The contour map is born as thousands of loose pieces and ends as a few long curves.
    const mapa = lamina(G, 'niveles'), suelto = lamina(G, 'niveles', { preparar: false });
    assert.ok(suelto.cuenta.trazos > 2000 && mapa.cuenta.trazos < 150 && mapa.cuenta.aire < suelto.cuenta.aire / 10, `${id}: ${suelto.cuenta.trazos} tramos pasan a ${mapa.cuenta.trazos} curvas`);
    // On a screen: its paper, a name, and the pen's travel in the air.
    const vista = laminaSvg(mapa, { papel: G.pieza.base, nombre: 'Curvas de nivel', aire: G.pieza.tinta });
    assert.match(vista, /^<svg [^>]*viewBox="0 0 210 297" role="img" aria-label="Curvas de nivel">/); assert.match(vista, /stroke-dasharray/); assert.doesNotMatch(vista, /width="210mm"/);
  }
});

test('npm run laminas escribe las doce como archivos, y dice cómo usarse', () => {
  const dir = mkdtempSync(join(tmpdir(), 'alma-laminas-'));
  const out = execFileSync(process.execPath, [join(process.cwd(), 'scripts/laminas.mjs'), 'cordura', '--hoja', 'A3'], { encoding: 'utf8' });
  assert.match(out, /Láminas de la Entidad Cordura · hoja A3/); assert.match(out, /12 láminas en build\/laminas-cordura\//);
  const archivos = readdirSync('build/laminas-cordura').filter((f) => f.endsWith('.svg')).sort();
  assert.equal(archivos.length, 12); assert.equal(archivos[0], '01-superficie.svg'); assert.equal(archivos[11], '12-criaturas.svg');
  assert.match(readFileSync('build/laminas-cordura/04-cajas.svg', 'utf8'), /^<svg [^>]*width="420mm" height="297mm"/);
  assert.throws(() => execFileSync(process.execPath, ['scripts/laminas.mjs', 'nadie'], { stdio: 'pipe' }), /Uso: npm run laminas/);
  // vpype is optional: asked for and not found, the command says how to get it and writes nothing over.
  assert.throws(() => execFileSync(process.execPath, ['scripts/laminas.mjs', 'cordura', '--vpype'], { stdio: 'pipe', env: { ...process.env, VPYPE: '/no/existe/vpype', PATH: '/usr/bin:/bin', HOME: dir } }), /No encuentro vpype/);
  assert.ok(dir);
});
