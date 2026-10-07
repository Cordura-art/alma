// A page with a scanned thing at its middle: what the scan file holds, and what the page is built with.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { paginaDeEscaneo, paraArtefacto, peso } from '../scripts/build-escaneo.mjs';

test('un escaneo es una trama de puntos: cuatro bytes por punto, todos dentro de su trama', () => {
  for (const f of readdirSync('entidades/escaneos')) {
    const E = JSON.parse(readFileSync('entidades/escaneos/' + f, 'utf8')); if (!E.puntos) continue;
    const b = Buffer.from(E.puntos, 'base64'); assert.equal(b.length % 4, 0); assert.ok(b.length / 4 > 1000 && b.length / 4 < 40000, f + ': ' + b.length / 4 + ' puntos');
    for (let i = 0; i < b.length; i += 4) assert.ok(b[i] < E.columnas && b[i + 1] < E.filas, f + ': un punto cae fuera de la trama');
    assert.ok(E.columnas <= 255 && E.filas <= 255 && E.peso > 0);
  }
});

test('la página de un escaneo lleva los colores y la voz de la entidad, su contenido como texto y nada que falte', async () => {
  const html = await paginaDeEscaneo('ensayo'), T = JSON.parse(readFileSync('entidades/escaneos/ensayo.json', 'utf8'));
  assert.ok(html.includes('<h1 class="escaneo__palabra">Ensayo</h1>')); for (const f of T.frase) assert.ok(html.includes(f));
  assert.equal((html.match(/class="escaneo__dato"/g) || []).length, T.datos.length); assert.equal(/\{(puntos|pesoOrigen|pesoTrama)\}/.test(html), false, 'quedó un dato sin llenar');
  assert.ok(/--escaneo-1: #[0-9A-Fa-f]{6}; --escaneo-2: #[0-9A-Fa-f]{6}; --escaneo-3: #[0-9A-Fa-f]{6};/.test(html)); assert.ok(html.includes('role="img"') && html.includes('prefers-reduced-motion'));
  assert.ok(html.includes('id="oficio"') && html.includes(T.accion.destino)); assert.ok(html.length < 400000, 'la página pesa ' + html.length);
  const a = paraArtefacto(html); assert.ok(a.startsWith('<meta charset') && !/<\/?html|<!doctype/i.test(a) && a.includes('[data-theme="light"] .escaneo'));
  await assert.rejects(() => paginaDeEscaneo('no-existe'));
});

test('el motor y los estilos de la página no traen colores sueltos', () => {
  for (const f of ['site/escaneo.js', 'site/escaneo.css']) { const s = readFileSync(f, 'utf8'); assert.equal(/#[0-9a-fA-F]{3,8}\b/.test(s), false, f); assert.equal(/rgba?\(|hsla?\(/.test(s), false, f); }
  assert.equal(peso(31959628), '32 MB'); assert.equal(peso(63000), '63 KB');
});
