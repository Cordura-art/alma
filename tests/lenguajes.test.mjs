// Tests for the design language files (entidades/lenguajes/*.json): every entity has the words each page of the
// template (site/lenguaje.js) reads, as many principles as its chart gives, and a chart that can be calculated.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { calcularCarta } from '../entidades/carta.mjs';
import { generarPrincipios } from '../entidades/voz.mjs';

const DIR = 'entidades/lenguajes';
const PAGINAS = ['inicio', 'puntoDeVista', 'principios', 'prisma', 'voz', 'tono', 'escritura', 'firma', 'tipografia', 'fundamentos', 'color', 'grilla', 'iconografia', 'ilustracion', 'fotografia', 'datos', 'movimiento', 'producto', 'comunicacion', 'carta', 'fecha', 'muestra'];

for (const f of readdirSync(DIR).filter((x) => x.endsWith('.json'))) {
  const L = JSON.parse(readFileSync(`${DIR}/${f}`, 'utf8'));
  test(`${f}: tiene el contenido de cada página`, () => {
    assert.equal(L.id + '.json', f);
    for (const k of PAGINAS) assert.ok(L[k], `falta «${k}»`);
    assert.equal(L.prisma.caras.length, 6);
    assert.equal(L.tipografia.escala.length, 10);
    assert.equal(L.tipografia.pesos.length, 4);
    assert.equal(L.voz.atributos.length, 3);
    if (L.colorHeredado) assert.match(L.colorHeredado, /^#[0-9A-F]{6}$/i);
  });
  // Generative illustration is declared by the language: the names and concepts its Ilustración page draws.
  if (L.ilustracion.generativa) test(`${f}: la ilustración generativa trae nombres y conceptos de ejemplo, sin repetir, y el estilo que la nombra`, () => {
    const X = L.ilustracion.generativa;
    for (const k of ['nombres', 'conceptos']) {
      assert.ok(X[k].length >= 6, k);
      assert.equal(new Set(X[k].map((x) => x.trim().toLowerCase())).size, X[k].length, `${k} repetidos`);
    }
    assert.ok(L.ilustracion.estilos.some((e) => e.t === 'Criaturas'), 'falta el estilo «Criaturas»');
    // Its signature is what the generator draws, so its words no longer describe the bars.
    for (const k of ['lede', 'construccion', 'color', 'movimiento']) { assert.ok(L.firma[k], `firma.${k}`); assert.doesNotMatch(L.firma[k], /barra/i, `firma.${k} habla de barras`); }
    assert.ok(!L.ilustracion.avoid.some((a) => /evita (los )?personajes y (las )?mascotas/i.test(a)), 'el lenguaje aún pide evitar personajes');
  });
  test(`${f}: un principio escrito por cada principio de la carta`, () => {
    const c = calcularCarta(L.nacimiento);
    assert.equal(L.principios.items.length, generarPrincipios(c).length);
    for (const p of L.principios.items) assert.ok(p.t && p.p && p.q.length >= 3, p.t);
  });
}
