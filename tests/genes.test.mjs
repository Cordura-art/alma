// What an entity gives other programs (scripts/genes.mjs): the same creatures the page draws, as plain data.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { genesParaFuera } from '../scripts/genes.mjs';
import { criatura3d } from '../entidades/volumen.mjs';

test('los genes para otros programas llevan las criaturas tal como la página las dibuja', async () => {
  const D = await genesParaFuera('ensayo'), ida = JSON.parse(JSON.stringify(D));
  assert.deepEqual(ida, D, 'todo sobrevive a escribirse como texto');
  assert.equal(D.criaturas.length, D.nombres.length);
  for (const c of D.criaturas) {
    const K = criatura3d(D.genes, c.nombre);
    assert.deepEqual(c.solidos.map((s) => [s.centro, s.radios, s.color]), K.solidos.map((s) => [s.c, s.r, s.color]));
    assert.equal(c.ojos.length, K.ojos.length);
    for (const e of c.ojos) assert.ok(e.solido >= 0 && e.solido < c.solidos.length, 'cada ojo sabe en qué cuerpo va');
    for (const s of c.solidos) assert.match(s.color, /^#[0-9A-F]{6}$/i);
  }
});

test('el guion de Blender usa la misma cámara que la página', async () => {
  const D = await genesParaFuera('cordura'), py = readFileSync('blender/criatura.py', 'utf8'), js = readFileSync('entidades/volumen.mjs', 'utf8');
  assert.ok(js.includes('D = 3.2') && js.includes('0.55') && js.includes('lado * 2.55'), 'la cámara de la página cambió: ajusta scripts/genes.mjs');
  assert.ok(Math.abs(Math.tan(D.camara.campo * Math.PI / 360) - 0.5 / 2.55) < 1e-9);
  assert.equal(D.camara.distancia, 3.2); assert.equal(D.camara.altura, 0.55);
  assert.ok(py.includes("C['campo']") && py.includes("C['distancia']") && py.includes("C['altura']"));
});

test('el personaje de una entidad tiene las mismas medidas y el mismo andar cada vez', async () => {
  const A = await genesParaFuera('ensayo'), B = await genesParaFuera('ensayo'), C = await genesParaFuera('automata');
  assert.deepEqual(A.personaje, B.personaje);
  assert.notDeepEqual(A.personaje.medidas, C.personaje.medidas);
  assert.equal(C.personaje.medidas.anguloso, true, 'una entidad sin redondez es de bloques');
  for (const D of [A, C]) {
    const { medidas: m, andar: a } = D.personaje;
    for (const k of ['alto', 'ancho', 'miembro', 'cabeza', 'cadera', 'panza', 'mano', 'pie', 'hombros']) assert.ok(m[k] > 0 && m[k] < 3, k);
    assert.ok(a.peso >= 0 && a.peso <= 1 && a.cojera >= 0 && a.cojera <= 0.7 && a.inclina < 0 && a.paso > 15 && a.ritmo > 0.3);
    assert.ok(['I', 'D'].includes(a.pataCoja));
  }
  assert.ok(C.personaje.andar.cojera > A.personaje.andar.cojera * 0 && C.personaje.andar.cojera >= 0.25, 'sin raíz definida, cojea');
});
