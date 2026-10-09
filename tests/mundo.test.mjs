// A page with an entity's planet in dots: what the page is built with, and that nothing of the planet is in it but its genes.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { paginaDeMundo, mundos, genesDeMundo } from '../scripts/build-mundo.mjs';
import { paraArtefacto } from '../scripts/build-escaneo.mjs';

test('cada entidad tiene su mundo, y la página lleva sus colores, su palabra, sus mandos con nombre y nada que falte', async () => {
  assert.deepEqual(mundos(), ['automata', 'cordura', 'ensayo']);
  for (const id of mundos()) {
    const html = await paginaDeMundo(id), T = JSON.parse(readFileSync(`entidades/mundos/${id}.json`, 'utf8'));
    assert.ok(html.includes(`<h1 class="escaneo__palabra">${T.palabra}</h1>`)); for (const f of T.frase) assert.ok(html.includes(f)); assert.ok(html.includes(T.pista));
    assert.ok(/--escaneo-1: #[0-9A-Fa-f]{6}; --escaneo-2: #[0-9A-Fa-f]{6}; --escaneo-3: #[0-9A-Fa-f]{6};/.test(html)); assert.ok(html.includes('role="img"') && html.includes('prefers-reduced-motion') && html.includes('role="status"'));
    for (const m of ['izquierda', 'adelante', 'atras', 'derecha', 'volar', 'bajar', 'subir']) assert.ok(new RegExp(`<button class="mundo__mando[^"]*" type="button" data-mando="${m}" aria-label="[^"]+"`).test(html), 'falta el mando ' + m);
    assert.ok(html.includes('data-mando="volar" aria-label="Volar" title="Volar" aria-pressed="false"')); assert.ok(html.includes('.mundo__mando:focus-visible { outline: 2px solid var(--focus)'));
    for (const q of ['densidad', 'tamano', 'luz', 'motas', 'reaccion', 'alcance']) assert.ok(new RegExp(`<label class="alma-slider__label" for="mundo-${q}">[^<]+</label>`).test(html) && new RegExp(`<input class="alma-slider__input" id="mundo-${q}" data-ajuste="${q}" type="range" min="\\d+" max="\\d+" step="\\d+" value="\\d+">`).test(html), 'falta el ajuste ' + q);
    assert.ok(html.includes('.alma-slider__input:focus-visible') && /<button class="mundo__mando mundo__abre" type="button" aria-label="Ajustar las partículas"[^>]*aria-expanded="true" aria-controls="mundo-panel">/.test(html), 'falta el Slider de ALMA o el botón que abre los ajustes');
    assert.equal((html.match(/<script>/g) || []).length, 3); assert.equal(/src=|@import|url\(/.test(html.replace(/<link[^>]*>/g, '')), false, 'la página pide algo de fuera');
    const a = paraArtefacto(html); assert.ok(a.startsWith('<meta charset') && !/<\/?html|<!doctype/i.test(a));
  }
  await assert.rejects(() => paginaDeMundo('no-existe'));
});

test('del planeta solo viajan los genes: el suelo se calcula en la página y nada de él está guardado', async () => {
  const html = await paginaDeMundo('automata'), M = JSON.parse(html.match(/window\.__MUNDO = (\{[^;]*\});/)[1]);
  assert.deepEqual(Object.keys(M), ['semilla', 'grupos', 'redondez', 'puntas', 'complejidad', 'trazo', 'focos', 'radio', 'contenida']); assert.equal(M.radio, 1000); assert.equal(M.contenida, true);
  assert.equal('contenida' in genesDeMundo({ semilla: 's' }, {}), false);
  assert.equal(/__HITOS|base64/.test(html), false);
  // (the page is its script and ALMA's styles: no map, no mesh, no picture)
  // (ALMA's own styles travel with it and grow with the tokens: what is weighed is the rest)
  assert.ok(html.length - readFileSync('dist/css/alma.css', 'utf8').length < 135000, 'la página pesa más de lo que pesa su regla');
});

test('la regla del planeta es la del planeta de Unity: los mismos números, escritos otra vez', () => {
  const js = readFileSync('site/mundo.js', 'utf8'), cs = readFileSync('unity/Assets/ALMA/Relieve.cs', 'utf8');
  for (const n of ['374761393', '668265263', '2246822519', '3266489917']) assert.ok(js.includes(n) && cs.includes(n), 'falta ' + n);
  assert.ok(js.includes("M.semilla + '|planeta'") && cs.includes('g.semilla + "|planeta"')); assert.ok(js.includes('0.08 + 0.012 * M.puntas') && cs.includes('0.08f + 0.012f * g.puntas'));
  assert.equal(/<\/script|<!--/i.test(js), false);
  // (whatever happens each frame is on one list, in order: the eye before what is seen, the ground before what is loose)
  const pasos = [...js.matchAll(/^  cada\('([^']+)'/gm)].map((m) => m[1]); assert.deepEqual(pasos, ['quien camina', 'el ojo', 'el suelo a la vista', 'la vida de las partículas', 'el suelo', 'las estrellas', 'los árboles y las piedras', 'las nubes', 'las motas', 'la palabra', 'lo que se dice', 'lo que falta', 'la medida']);
});

// (a name used twice in the engine once broke the lattice without any test noticing)
test('en el motor del planeta ningún nombre se declara dos veces en su cuerpo', () => {
  const js = readFileSync('site/mundo.js', 'utf8'), vistos = new Map();
  for (const linea of js.split('\n')) { const m = /^  var (.*)$/.exec(linea); if (!m) continue; for (const n of m[1].replace(/\([^()]*\)|\[[^\[\]]*\]|\{[^{}]*\}/g, '').replace(/'[^']*'/g, '').split(',').map((x) => x.trim().split(/[ =]/)[0]).filter((x) => /^[A-Za-z_$][\w$]*$/.test(x))) vistos.set(n, (vistos.get(n) || 0) + 1); }
  const repetidos = [...vistos].filter(([n, c]) => c > 1 && /^[A-Z][A-Z0-9_]+$/.test(n)).map(([n]) => n); assert.deepEqual(repetidos, [], 'constantes declaradas dos veces: ' + repetidos.join(', '));
});
