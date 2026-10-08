// An entity's word as a piece of its own: what its page is built with.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { paginaDePalabra } from '../ejemplos/palabra/build.mjs';
import { paginaDeEscaneo, entidadesConEscaneo, recorridos } from '../scripts/build-escaneo.mjs';

test('la página de la palabra trae las tres entidades, cada una con sus valores y sus genes, y el motor propio', async () => {
  const html = await paginaDePalabra(), datos = JSON.parse(/window\.__ENTIDADES = (\{.*\});/.exec(html)[1]);
  assert.deepEqual(Object.keys(datos), ['ensayo', 'cordura', 'automata']);
  for (const [id, e] of Object.entries(datos)) { assert.ok(e.nombre && e.css.includes('--font-weight-display'), id); assert.ok(Array.isArray(e.genes.numeros) && e.genes.numeros.length && e.genes.ritmo > 0 && e.genes.puntas > 0 && typeof e.genes.direccion === 'string' && e.genes.redondez >= 0, id); }
  assert.notEqual(datos.ensayo.genes.numeros.join(), datos.cordura.genes.numeros.join(), 'cada entidad escribe a su ritmo');
  assert.ok(html.includes('AlmaPalabra') && html.includes('<title>Palabra</title>') && html.includes('prefers-reduced-motion') && !/<\/?html|<!doctype/i.test(html));
});

test('el motor y los estilos de la palabra no traen colores sueltos, y la palabra se nombra entera para quien no la ve', () => {
  for (const f of ['site/palabra.js', 'site/palabra.css', 'ejemplos/palabra/pagina.js', 'ejemplos/palabra/pagina.css']) { const s = readFileSync(f, 'utf8'); assert.equal(/#[0-9a-fA-F]{3,8}\b/.test(s), false, f); assert.equal(/rgba?\(|hsla?\(/.test(s), false, f); }
  const m = readFileSync('site/palabra.js', 'utf8'); assert.ok(m.includes("setAttribute('aria-label', t)") && m.includes("setAttribute('aria-hidden', 'true')") && m.includes('ArrowRight') && m.includes('font-weight-display'));
});

test('la palabra de cada portada es la pieza, escrita con los genes de su entidad', async () => {
  for (const id of [...entidadesConEscaneo(), ...recorridos()]) {
    const html = await paginaDeEscaneo(id), g = JSON.parse(/window\.__PALABRA = (\{[^;]*\});/.exec(html)[1]);
    assert.ok(html.includes('AlmaPalabra = { monta: monta }') && html.includes('window.AlmaPalabra.monta(palabra, { genes: window.__PALABRA, oye: escena, mide: false })'), id); assert.ok(g.numeros.length && g.puntas > 0 && typeof g.direccion === 'string', id);
  }
});

test('el movimiento de marca está escrito: seis recetas por entidad, y Autómata con la medida contenida en sus tres portadas', async () => {
  for (const id of ['ensayo', 'cordura', 'automata']) { const P = JSON.parse(readFileSync('entidades/lenguajes/' + id + '.json', 'utf8')).movimiento.portadas; assert.ok(P.lede && P.recetas.length === 6 && P.recetas.every((r) => r.length === 2 && r[0] && r[1]), id); assert.equal(!!P.medida, id === 'automata', id); }
  for (const id of [...entidadesConEscaneo(), ...recorridos()]) assert.equal((await paginaDeEscaneo(id)).includes('"contenida":true'), id.startsWith('automata'), id);
  const doc = readFileSync('docs/elements/movimiento/2-coreografia.md', 'utf8'); for (const r of ['Escribirse', 'Armarse', 'Deshacerse', 'Responder', 'Avanzar', 'Descansar', 'Medida contenida', 'duration-slow-02']) assert.ok(doc.includes(r), r);
  const m = readFileSync('site/palabra.js', 'utf8'); assert.ok(m.includes("seg('--duration-slow-02'") && m.includes("seg('--duration-stagger'"), 'los tiempos de la palabra salen de los tokens');
});

test('la portada es un patrón de ALMA con su imagen, y cada entidad dice cómo usa su letra viva', () => {
  const doc = readFileSync('docs/patterns/16-portada.md', 'utf8'); for (const r of ['pattern: Portada', 'Con objeto', 'Recorrido', 'Sobrevuelo', 'assets/Patrones/portada-anatomia.png', '## Accesibilidad']) assert.ok(doc.includes(r), r);
  assert.ok(readFileSync('scripts/images/patrones.mjs', 'utf8').includes("scene('16-portada'"));
  for (const id of ['ensayo', 'cordura', 'automata']) { const v = JSON.parse(readFileSync('entidades/lenguajes/' + id + '.json', 'utf8')).tipografia.viva; assert.ok(v.p && v.reglas.length === 3 && v.reglas.some((r) => /Solo en la portada/.test(r[0])), id); }
});
