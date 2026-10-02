// Tests for the live pictures of the guides: one builder (site/escenas.js) writes the document of a scene for the
// camera (scripts/build-images.mjs) and for the site, which shows it with the values of the system on screen.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(p, 'utf8');
const escenaDoc = new Function('window', read('site/escenas.js') + '; return window.__ESCENA_DOC;')({});
const base = { fuentes: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Flex">', css: '.alma{color:red}', bundle: 'window.AlmaDS={};', libs: '', helpers: 'function ayuda(){}', doc: 'function doc(){}', datos: {} };

test('una escena se escribe igual para la cámara y para el sitio, y solo la del sitio avisa su tamaño', () => {
  const s = { js: 'render(h("div", null, "hola"))', css: '.x{gap:8px}' };
  const foto = escenaDoc({ ...base, escena: s }), viva = escenaDoc({ ...base, escena: s, vivo: 'button-uso' });
  for (const d of [foto, viva]) { assert.match(d, /^<!doctype html>/i); assert.ok(d.includes(s.js) && d.includes(s.css) && d.includes(base.css) && d.includes(base.bundle)); }
  assert.doesNotMatch(foto, /almaEscena/);
  assert.match(viva, /almaEscena/); assert.ok(viva.includes('button-uso'));
});

test('el sitio dibuja las imágenes en vivo: no copia ni empaqueta capturas', () => {
  const sitio = read('scripts/build-site.mjs'), selector = read('scripts/build-selector.mjs'), app = read('site/app.js');
  assert.match(sitio, /id="alma-escenas"/); assert.match(sitio, /site\/escenas\.js/);
  assert.doesNotMatch(selector, /empacar|img\/\$\{/, 'el selector ya no lleva paquetes de imágenes');
  assert.match(app, /__ESCENA_DOC/); assert.match(app, /IntersectionObserver/); assert.match(app, /'role', 'img'/);
  assert.match(read('site/site.css'), /\.md \.escena/);
});

// One file for every system: an entity stores only what differs from ALMA's content, and the page rebuilds the rest.
test('lo que una entidad comparte con ALMA viaja una sola vez, y se reconstruye idéntico', async () => {
  const { delta, aplicarDelta } = await import('../scripts/lib/delta.mjs');
  const a = { site: { nombre: 'ALMA' }, guias: [{ t: 'Color', body: 'uno\ndos\ntres\n' + 'x'.repeat(500) }, { t: 'Forma', body: 'igual' }], tokens: { a: 1, b: 2 }, solo: true };
  const b = { tokens: { b: 2, a: 3, c: [1] }, site: { nombre: 'Entidad' }, guias: [{ t: 'Color', body: 'uno\nDOS\ntres\n' + 'x'.repeat(500) }, { t: 'Forma', body: 'igual' }, { t: 'Nueva' }] };
  const d = delta(a, b);
  assert.deepEqual(aplicarDelta(a, d), b);
  assert.equal(JSON.stringify(aplicarDelta(a, d)), JSON.stringify(b), 'también el orden de las claves');
  assert.deepEqual(d.$o.guias.$a[0].$o.body, { $l: { 1: 'DOS' } }, 'de un texto largo, solo la línea que cambió');
  assert.equal(d.$o.guias.$a[1], undefined, 'lo igual no viaja');
  assert.equal(delta(a, a), undefined);
  // The page reads the delta with its own copy of the function: the two must stay the same.
  const app = read('site/app.js'), i = app.indexOf('  function aplicarDelta('), j = app.indexOf('  var contenidos = {};');
  const enPagina = new Function(app.slice(i, j) + '; return aplicarDelta;')();
  assert.equal(JSON.stringify(enPagina(a, JSON.parse(JSON.stringify(d)))), JSON.stringify(b));
  assert.match(read('scripts/build-selector.mjs'), /alma-delta-\$\{id\}/);
});
