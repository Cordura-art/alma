// Tests for the Pictogram component: the bundle draws with the same code as entidades/pictogramas.mjs, reads each
// entity's seed, stroke and line ends from the page's styles, and comes with its guide, preview and types.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { sistema, css, semilla } from '../scripts/lib/documentacion.mjs';
import { trazosPictograma, dibujosDe, PICTOGRAMAS } from '../entidades/pictogramas.mjs';

const read = (p) => readFileSync(p, 'utf8'), BUNDLE = 'artifact/project/components/bundle.js';

// Runs the bundle with a stand-in for React and for the page's styles, and returns AlmaDS. `estilos` are the custom
// properties the page declares on its root.
function almaDS(estilos = {}) {
  const React = { createElement: (type, props, ...children) => ({ type, props: props || {}, children }), useState: (v) => [v, () => {}], useEffect() {}, useRef: (v) => ({ current: v }), useMemo: (f) => f() };
  const document = { documentElement: { getAttribute() {}, setAttribute() {}, style: {} }, addEventListener() {}, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), body: { appendChild() {} }, head: { appendChild() {} } };
  const window = { React, document, console: { warn() {} }, matchMedia: () => ({ matches: false, addEventListener() {} }), getComputedStyle: () => ({ getPropertyValue: (n) => estilos[n] ?? '' }) };
  new Function('window', 'document', read(BUNDLE))(window, document);
  return window.AlmaDS;
}
const ALMA = { '--font-weight-body': '350', '--radius-button': '16px' };

test('el paquete de componentes trae los dibujos de entidades/ al día', () => {
  assert.match(execFileSync('node', ['scripts/build-pictogramas.mjs', '--check']).toString(), /al día/);
  assert.match(read('package.json'), /"build": "[^"]*build-pictogramas\.mjs/);
});

test('Pictogram es un componente de ALMA: está en el catálogo, con sus tipos, su guía de cuatro pestañas y su vista previa', () => {
  const cab = JSON.parse(/@ds-bundle: (\{.*\}) \*\//.exec(read(BUNDLE))[1]);
  assert.ok(cab.components.some((c) => c.name === 'Pictogram'));
  const A = almaDS(ALMA);
  for (const f of ['Pictogram', 'pictogramDrawings', 'configurePictograms']) assert.equal(typeof A[f], 'function', f);
  const tipos = read('artifact/project/components/index.d.ts');
  for (const d of ['export declare function Pictogram(', 'export declare function pictogramDrawings(', 'export declare function configurePictograms(']) assert.ok(tipos.includes(d), d);
  for (const t of ['usage', 'style', 'code', 'accessibility']) assert.match(read(`docs/components/pictogram/${t}.md`), /^---\ncomponent: Pictogram\n/);
  assert.ok(existsSync('artifact/project/components/Pictogram/preview.html'));
  assert.match(read('artifact/project/components/Pictogram/README.md'), /^# Pictogram\n/, 'npm run build genera su guía');
});

test('el componente dibuja lo mismo que entidades/pictogramas.mjs, con la semilla de Cordura si la página no declara otra', () => {
  const A = almaDS(ALMA), G = { semilla: 'nac|1987-03-31|10:45|America/Santiago', trazo: 350 / 400, redondez: 16 / 24 };
  for (const nombre of ['Capítulo 3', 'Proyecto Atlas', 42, '']) {
    const el = A.Pictogram({ name: nombre }), P = trazosPictograma(G, nombre, { modo: 'icono' });
    assert.equal(el.type, 'svg');
    assert.equal(el.props.dangerouslySetInnerHTML.__html, P.trazos, `«${nombre}»`);
    assert.equal(el.props['data-pictogram'], P.dibujo);
    assert.equal(el.props.viewBox, '0 0 32 32');
  }
  assert.deepEqual(A.configurePictograms(), { seed: G.semilla, stroke: 0.875, round: true });
});

test('tamaño, color y nombre accesible como en Icon', () => {
  const A = almaDS(ALMA), a = A.Pictogram({ name: 'x' }), b = A.Pictogram({ name: 'x', size: 32, color: 'var(--nav-selected)', label: 'Capítulo 3', className: 'mia' });
  assert.equal(a.props.style.width, '1.5rem'); assert.equal(a.props.style.height, '1.5rem');
  assert.equal(a.props['aria-hidden'], 'true'); assert.equal(a.props.role, undefined);
  assert.equal(b.props.style.width, '2rem'); assert.equal(b.props.style.color, 'var(--nav-selected)');
  assert.equal(b.props.role, 'img'); assert.equal(b.props['aria-label'], 'Capítulo 3'); assert.equal(b.props['aria-hidden'], undefined);
  assert.match(b.props.className, /^alma-ico alma-pictogram mia$/);
  assert.doesNotMatch(a.props.dangerouslySetInnerHTML.__html, /#[0-9A-Fa-f]{6}|<svg|<script/, 'solo formas, sin colores propios');
});

test('cada entidad dibuja los suyos: la semilla, el trazo y el remate salen de su hoja de valores', async () => {
  for (const id of ['ensayo', 'cordura', 'ibm']) {
    const S = await sistema(id), hoja = css(S), prop = (n) => new RegExp(`--${n}: ([^;]+);`).exec(hoja)[1];
    assert.equal(prop('pictogram-seed'), `"${semilla(S)}"`, `${id}: su hoja declara la semilla`);
    const estilos = { '--pictogram-seed': prop('pictogram-seed'), '--font-weight-body': prop('font-weight-body'), '--radius-button': prop('radius-button') };
    const A = almaDS(estilos), G = { semilla: semilla(S), trazo: S.P.weights.body / 400, redondez: Math.min(1, S.P.shape.base / 24) };
    assert.equal(A.Pictogram({ name: 'Capítulo 3' }).props.dangerouslySetInnerHTML.__html, trazosPictograma(G, 'Capítulo 3', { modo: 'icono' }).trazos, id);
    assert.equal(A.configurePictograms().round, S.P.shape.base > 0, `${id}: remate recto solo con esquinas rectas`);
  }
  const A = almaDS(ALMA), suyo = A.Pictogram({ name: 'Capítulo 3' }).props.dangerouslySetInnerHTML.__html;
  // By hand: a seed, a stroke and square ends; null gives each back to the page's styles.
  assert.deepEqual(A.configurePictograms({ seed: 'otra', stroke: 1, round: false }), { seed: 'otra', stroke: 1, round: false });
  assert.notEqual(A.Pictogram({ name: 'Capítulo 3' }).props.dangerouslySetInnerHTML.__html, suyo);
  A.configurePictograms({ seed: null, stroke: null, round: null });
  assert.equal(A.Pictogram({ name: 'Capítulo 3' }).props.dangerouslySetInnerHTML.__html, suyo);
});

test('en una lista, pictogramDrawings reparte dibujos sin repetir, y un dibujo inválido se ignora', () => {
  const A = almaDS(ALMA), G = { semilla: 'nac|1987-03-31|10:45|America/Santiago', trazo: 0.875, redondez: 16 / 24 };
  const nombres = Array.from({ length: 30 }, (_, n) => `Capítulo ${n + 1}`), dibujos = A.pictogramDrawings(nombres);
  assert.deepEqual(dibujos, dibujosDe(G, nombres, { modo: 'icono' }));
  assert.equal(new Set(dibujos).size, 30);
  assert.ok(dibujos.every((d) => d >= 0 && d < PICTOGRAMAS && d !== 12 && d !== 21));
  assert.equal(A.Pictogram({ name: nombres[5], drawing: dibujos[5] }).props['data-pictogram'], dibujos[5]);
  const libre = A.Pictogram({ name: 'x' }).props['data-pictogram'];
  for (const malo of [99, -1, 2.5, 'a', null]) assert.equal(A.Pictogram({ name: 'x', drawing: malo }).props['data-pictogram'], libre, String(malo));
  assert.deepEqual(A.pictogramDrawings(), []);
});

test('los dibujos no traen colores propios: toman el del texto', () => {
  for (const f of ['entidades/semilla.mjs', 'entidades/pictogramas.mjs']) assert.equal(read(f).match(/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/), null, `${f} trae un color en crudo`);
});
