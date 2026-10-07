// A page with a scanned thing at its middle: what the scan file holds, and what the page is built with.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { paginaDeEscaneo, paraArtefacto, entidadesConEscaneo, peso } from '../scripts/build-escaneo.mjs';

test('un escaneo es una trama de puntos: siete bytes por punto (diez si la trama pasa de 255 pasos por lado), todos dentro de su trama y con su cara de largo uno', () => {
  for (const f of readdirSync('entidades/escaneos')) {
    const E = JSON.parse(readFileSync('entidades/escaneos/' + f, 'utf8')); if (!E.puntos) continue;
    const b = Buffer.from(E.puntos, 'base64'), ancho = E.alma === 3 ? 10 : 7, c = ancho - 4, lugar = (i, k) => c === 6 ? b[i + 2 * k] | b[i + 2 * k + 1] << 8 : b[i + k]; assert.ok(E.alma === 2 || E.alma === 3); assert.equal(b.length % ancho, 0); assert.ok(b.length / ancho > 1000 && b.length / ancho < 40000, f + ': ' + b.length / ancho + ' puntos');
    for (let i = 0; i < b.length; i += ancho) { assert.ok(lugar(i, 0) < E.columnas && lugar(i, 1) < E.filas && lugar(i, 2) < E.hondos, f + ': un punto cae fuera de la trama'); const l = Math.hypot(b[i + c + 1] - 128, b[i + c + 2] - 128, b[i + c + 3] - 128) / 127; assert.ok(l > 0.9 && l < 1.1, f + ': una cara de largo ' + l.toFixed(2)); }
    assert.equal(Math.max(E.columnas, E.filas, E.hondos) > 255, E.alma === 3); assert.ok(E.peso > 0);
  }
});

test('la página de un escaneo lleva los colores y la voz de la entidad, su contenido como texto y nada que falte', async () => {
  const html = await paginaDeEscaneo('ensayo'), T = JSON.parse(readFileSync('entidades/escaneos/ensayo.json', 'utf8'));
  assert.ok(html.includes('<h1 class="escaneo__palabra">Ensayo</h1>')); for (const f of T.frase) assert.ok(html.includes(f));
  assert.equal((html.match(/class="escaneo__dato"/g) || []).length, T.datos.length); assert.equal(/\{(puntos|pesoOrigen|pesoTrama)\}/.test(html), false, 'quedó un dato sin llenar');
  assert.ok(/--escaneo-1: #[0-9A-Fa-f]{6}; --escaneo-2: #[0-9A-Fa-f]{6}; --escaneo-3: #[0-9A-Fa-f]{6};/.test(html)); assert.ok(html.includes('role="img"') && html.includes('prefers-reduced-motion'));
  assert.ok(html.includes('id="oficio"') && html.includes(T.accion.destino));
  assert.ok(/<button class="escaneo__tema" type="button" aria-label="Usar tema claro">.*<svg[^>]*aria-hidden="true"/.test(html), 'falta el botón de tema, con su icono'); assert.ok(html.length < 500000, 'la página pesa ' + html.length);
  const a = paraArtefacto(html); assert.ok(a.startsWith('<meta charset') && !/<\/?html|<!doctype/i.test(a) && a.includes('[data-theme="light"] .escaneo'));
  await assert.rejects(() => paginaDeEscaneo('no-existe'));
});

test('el motor y los estilos de la página no traen colores sueltos', () => {
  for (const f of ['site/escaneo.js', 'site/escaneo.css']) { const s = readFileSync(f, 'utf8'); assert.equal(/#[0-9a-fA-F]{3,8}\b/.test(s), false, f); assert.equal(/rgba?\(|hsla?\(/.test(s), false, f); }
  assert.equal(peso(31959628), '32 MB'); assert.equal(peso(63000), '63 KB');
});

test('cada entidad tiene su portada: su palabra, su voz y sus colores, y ninguna es igual a otra', async () => {
  const ids = entidadesConEscaneo(); assert.deepEqual(ids, ['automata', 'cordura', 'ensayo']); const colores = new Set(), frases = new Set();
  for (const id of ids) {
    const html = await paginaDeEscaneo(id), T = JSON.parse(readFileSync('entidades/escaneos/' + id + '.json', 'utf8'));
    assert.ok(html.includes('<h1 class="escaneo__palabra">' + T.palabra + '</h1>'), id); assert.equal(/\{(puntos|pesoOrigen|pesoTrama)\}/.test(html), false, id + ': quedó un dato sin llenar');
    assert.equal(T.datos.length, 4, id + ': la página reparte el objeto en cuatro'); colores.add(/--escaneo-1: (#[0-9A-Fa-f]{6})/.exec(html)[1]); frases.add(T.frase.join(' '));
  }
  assert.equal(colores.size, 3); assert.equal(frases.size, 3);
});
