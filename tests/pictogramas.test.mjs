// Tests for pictograms: the three kinds (seal, letter, creature) drawn like Carbon's icons, and the Pictogram component,
// whose bundle draws with the same code as entidades/pictogramas.mjs, reads each entity's seed and corners from the
// page's styles, and comes with its guide, preview and types.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { sistema, css, semilla } from '../scripts/lib/documentacion.mjs';
import { trazosPictograma, dibujosDe, pictograma, letras, PICTOGRAMAS, TIPOS } from '../entidades/pictogramas.mjs';

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
const ALMA = { '--font-weight-body': '350', '--radius-button': '16px' }, CORDURA = 'nac|1987-03-31|10:45|America/Santiago';
const KIND = { seal: 'sello', letter: 'letra', creature: 'criatura' };

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

test('los tres tipos se dibujan como un ícono de Carbon: grilla de 32, trazo de 2, pocas piezas y sin colores propios', () => {
  const G = { semilla: CORDURA, trazo: 1, redondez: 1 };
  assert.deepEqual(TIPOS, ['letra', 'sello', 'criatura']);
  for (const tipo of TIPOS) for (let d = 0; d < PICTOGRAMAS[tipo]; d++) for (const redondez of [0, 1]) {
    const P = trazosPictograma({ ...G, redondez }, 'Capítulo 3', { tipo, dibujo: d });
    assert.equal(P.lado, 32); assert.equal(P.dibujo, d); assert.equal(P.tipo, tipo);
    assert.doesNotMatch(P.trazos, /NaN|undefined|#[0-9A-Fa-f]{3,8}\b|<svg|<script/, `${tipo} ${d}`);
    assert.match(P.trazos, /stroke-width="2"/, 'el trazo de Carbon');
    assert.match(P.trazos, redondez ? /stroke-linejoin="round"/ : /stroke-linejoin="miter"/, 'las esquinas de la entidad');
    const piezas = (P.trazos.match(/<(path|circle|rect|ellipse|text)\b/g) || []).length;
    assert.ok(piezas >= 2 && piezas <= 5, `${tipo} ${d}: ${piezas} piezas`);
    // Nothing leaves the grid.
    for (const n of P.trazos.replace(/rotate\([^)]*\)|font-size="[\d.]+"|font-weight="\d+"|'wdth' \d+|stroke-width="[\d.]+"|:100%/g, '').match(/-?\d+(\.\d+)?/g) || []) assert.ok(+n >= 0 && +n <= 32, `${tipo} ${d}: ${n} fuera de la grilla`);
  }
  assert.equal(trazosPictograma({ ...G, trazo: 1.5 }, 'x').trazos.includes('stroke-width="3"'), true, 'el trazo se puede fijar a mano');
  assert.equal(trazosPictograma(G, 'x').tipo, 'sello', 'sin tipo, un sello');
});

test('el mismo nombre da siempre el mismo pictograma; otro nombre, otro tipo u otra entidad, otro', () => {
  const G = { semilla: CORDURA, trazo: 1, redondez: 1 };
  for (const tipo of TIPOS) {
    assert.equal(pictograma(G, ' Capítulo 3', { tipo }), pictograma(G, 'capítulo 3 ', { tipo }).replace(/>c3</, '>C3<'), tipo);
    assert.notEqual(pictograma(G, 'Proyecto Atlas', { tipo }), pictograma({ ...G, semilla: 'otra' }, 'Proyecto Atlas', { tipo }), `${tipo}: otra entidad`);
  }
  assert.ok(new Set(Array.from({ length: 200 }, (_, n) => pictograma(G, `cosa-${n}`, { tipo: 'sello' }))).size >= 100, 'los sellos se reparten');
  assert.ok(new Set(Array.from({ length: 200 }, (_, n) => pictograma(G, `cosa-${n}`, { tipo: 'criatura' }))).size >= 100, 'las criaturas se reparten');
  assert.match(pictograma(G, 'x'), /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" aria-hidden="true">/);
  assert.match(pictograma(G, 'x', { nombre: 'Capítulo <3>' }), /role="img" aria-label="Capítulo &lt;3&gt;"/);
});

test('la letra escribe la inicial y el número del nombre', () => {
  assert.deepEqual(['Prólogo', 'Capítulo 3', 'capítulo 12', '7', ' notas del editor ', '¿Qué?', '', 'Paso 104'].map(letras), ['P', 'C3', '12', '7', 'N', 'Q', '·', '04']);
  const P = trazosPictograma({ semilla: CORDURA, trazo: 1, redondez: 1 }, 'Capítulo 3', { tipo: 'letra' });
  assert.match(P.trazos, /<text [^>]*text-anchor="middle"[^>]*>C3<\/text>/);
  assert.match(P.trazos, /font-stretch:100%/, 'la letra va al ancho normal, aunque el texto de la entidad sea ancho');
  assert.match(trazosPictograma({ semilla: CORDURA, trazo: 1, redondez: 1 }, 'a<b', { tipo: 'letra' }).trazos, />A<\/text>/);
});

test('una criatura es una cabeza, dos ojos y a lo más un rasgo, en cualquier entidad', () => {
  const G = { semilla: CORDURA, trazo: 1, redondez: 1 };
  for (let d = 0; d < PICTOGRAMAS.criatura; d++) {
    const s = trazosPictograma(G, 'Equipo', { tipo: 'criatura', dibujo: d }).trazos;
    assert.equal((s.match(/<circle [^>]*r="2" fill="currentColor"/g) || []).length, 2, `criatura ${d}: dos ojos`);
  }
  assert.equal(trazosPictograma(G, 'Equipo', { tipo: 'criatura', personajes: false }).tipo, 'criatura', 'ya no depende de si la entidad usa personajes');
});

test('en una lista, dibujosDe reparte sin repetir mientras el tipo tenga dibujos', () => {
  const G = { semilla: CORDURA, trazo: 1, redondez: 1 }, nombres = Array.from({ length: 30 }, (_, n) => `Capítulo ${n + 1}`);
  for (const tipo of TIPOS) {
    const d = dibujosDe(G, nombres, { tipo });
    assert.equal(new Set(d).size, Math.min(30, PICTOGRAMAS[tipo]), tipo);
    assert.deepEqual(dibujosDe(G, nombres, { tipo }), d, 'el mismo reparto');
    assert.equal(d[0], trazosPictograma(G, nombres[0], { tipo }).dibujo, 'el primero conserva el suyo');
  }
});

test('el componente dibuja lo mismo que entidades/pictogramas.mjs, con la semilla de Cordura si la página no declara otra', () => {
  const A = almaDS(ALMA), G = { semilla: CORDURA, trazo: 1, redondez: 16 / 24 };
  for (const [kind, tipo] of Object.entries(KIND)) for (const nombre of ['Capítulo 3', 'Proyecto Atlas', 42, '']) {
    const el = A.Pictogram({ name: nombre, kind }), P = trazosPictograma(G, nombre, { tipo });
    assert.equal(el.type, 'svg');
    assert.equal(el.props.dangerouslySetInnerHTML.__html, P.trazos, `${kind} «${nombre}»`);
    assert.equal(el.props['data-pictogram'], P.dibujo); assert.equal(el.props['data-kind'], kind);
    assert.equal(el.props.viewBox, '0 0 32 32');
  }
  assert.equal(A.Pictogram({ name: 'x' }).props['data-kind'], 'seal', 'sin kind, un sello');
  assert.equal(A.Pictogram({ name: 'x', kind: 'otro' }).props['data-kind'], 'seal');
  assert.deepEqual(A.configurePictograms(), { seed: CORDURA, stroke: 1, round: true });
  assert.match(read('artifact/project/components/bundle.css'), /\.alma-pictogram \{ fill: none; stroke: currentColor;/);
});

test('tamaño, color y nombre accesible como en Icon', () => {
  const A = almaDS(ALMA), a = A.Pictogram({ name: 'x' }), b = A.Pictogram({ name: 'x', size: 32, color: 'var(--nav-selected)', label: 'Capítulo 3', className: 'mia' });
  assert.equal(a.props.style.width, '1.5rem'); assert.equal(a.props.style.height, '1.5rem');
  assert.equal(a.props['aria-hidden'], 'true'); assert.equal(a.props.role, undefined);
  assert.equal(b.props.style.width, '2rem'); assert.equal(b.props.style.color, 'var(--nav-selected)');
  assert.equal(b.props.role, 'img'); assert.equal(b.props['aria-label'], 'Capítulo 3'); assert.equal(b.props['aria-hidden'], undefined);
  assert.match(b.props.className, /^alma-ico alma-pictogram mia$/);
});

test('cada entidad dibuja los suyos, con los tres tipos: la semilla y las esquinas salen de su hoja de valores', async () => {
  for (const id of ['ensayo', 'cordura', 'automata']) {
    const S = await sistema(id), hoja = css(S), prop = (n) => (new RegExp(`--${n}: ([^;]+);`).exec(hoja) || [])[1];
    assert.equal(prop('pictogram-seed'), `"${semilla(S)}"`, `${id}: su hoja declara la semilla`);
    assert.equal(prop('pictogram-characters'), undefined, `${id}: la hoja ya no dice nada de personajes`);
    const estilos = { '--pictogram-seed': prop('pictogram-seed'), '--radius-button': prop('radius-button') };
    const A = almaDS(estilos), G = { semilla: semilla(S), trazo: 1, redondez: Math.min(1, S.P.shape.base / 24) };
    assert.equal(A.Pictogram({ name: 'Capítulo 3' }).props.dangerouslySetInnerHTML.__html, trazosPictograma(G, 'Capítulo 3').trazos, id);
    assert.equal(A.Pictogram({ name: 'Equipo', kind: 'creature' }).props['data-kind'], 'creature', `${id}: criatura`);
    assert.equal(A.configurePictograms().round, S.P.shape.base > 0, id);
  }
  const A = almaDS(ALMA), suyo = A.Pictogram({ name: 'Capítulo 3' }).props.dangerouslySetInnerHTML.__html;
  // By hand: a seed, a stroke and square corners; null gives each back to the page's styles.
  assert.deepEqual(A.configurePictograms({ seed: 'otra', stroke: 1.5, round: false }), { seed: 'otra', stroke: 1.5, round: false });
  assert.notEqual(A.Pictogram({ name: 'Capítulo 3' }).props.dangerouslySetInnerHTML.__html, suyo);
  A.configurePictograms({ seed: null, stroke: null, round: null });
  assert.equal(A.Pictogram({ name: 'Capítulo 3' }).props.dangerouslySetInnerHTML.__html, suyo);
});

test('en una lista, pictogramDrawings reparte dibujos del tipo sin repetir, y un dibujo inválido se ignora', () => {
  const A = almaDS(ALMA), G = { semilla: CORDURA, trazo: 1, redondez: 16 / 24 };
  const nombres = Array.from({ length: 30 }, (_, n) => `Proyecto ${n + 1}`);
  for (const [kind, tipo] of Object.entries(KIND)) assert.deepEqual(A.pictogramDrawings(nombres, kind), dibujosDe(G, nombres, { tipo }), kind);
  const dibujos = A.pictogramDrawings(nombres);
  assert.equal(new Set(dibujos).size, 30);
  assert.equal(A.Pictogram({ name: nombres[5], drawing: dibujos[5] }).props['data-pictogram'], dibujos[5]);
  const libre = A.Pictogram({ name: 'x' }).props['data-pictogram'];
  for (const malo of [99, -1, 2.5, 'a', null]) assert.equal(A.Pictogram({ name: 'x', drawing: malo }).props['data-pictogram'], libre, String(malo));
  assert.deepEqual(A.pictogramDrawings(), []);
});

test('los dibujos no traen colores propios: toman el del texto', () => {
  for (const f of ['entidades/semilla.mjs', 'entidades/pictogramas.mjs']) assert.equal(read(f).match(/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/), null, `${f} trae un color en crudo`);
});
