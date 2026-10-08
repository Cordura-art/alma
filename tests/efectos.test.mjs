// ALMA's effects (site/efectos.js and site/efectos/): what every effect of the collection promises.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';

const archivos = readdirSync('site/efectos').filter((f) => f.endsWith('.js'));
const w = {}; w.window = w;
vm.runInNewContext(readFileSync('site/efectos.js', 'utf8'), w);
for (const f of archivos) vm.runInNewContext(readFileSync(`site/efectos/${f}`, 'utf8'), w);
const lista = Object.values(w.AlmaEfectos.lista), tokens = readFileSync('dist/css/alma.css', 'utf8');
const paginas = readdirSync('docs/efectos').map((f) => readFileSync(`docs/efectos/${f}`, 'utf8'));

test('cada archivo de efecto pone un efecto, de una de las cuatro familias, y tiene su página', () => {
  assert.equal(lista.length, archivos.length);
  for (const e of lista) {
    assert.ok(['fondo', 'transicion', 'reaccion', 'texto'].includes(e.familia), `${e.id}: familia ${e.familia}`);
    assert.ok(archivos.includes(`${e.id}.js`), `${e.id}: su archivo lleva su nombre`);
    assert.ok(paginas.some((p) => new RegExp(`^id: ${e.id}$`, 'm').test(p)), `${e.id}: falta su página en docs/efectos`);
  }
});

test('los colores de un efecto son tokens de ALMA, y su código no escribe ninguno a mano', () => {
  for (const e of lista) for (const t of Object.values(e.colores)) assert.ok(tokens.includes(`--${t}:`), `${e.id}: no existe el token ${t}`);
  for (const f of archivos) assert.doesNotMatch(readFileSync(`site/efectos/${f}`, 'utf8'), /#[0-9a-fA-F]{3,8}\b|rgba?\(/, `${f} escribe un color a mano`);
});

test('cada ajuste tiene nombre, un rango y un valor dentro de él', () => {
  for (const e of lista) for (const a of e.ajustes) {
    assert.ok(a.id && a.nombre && a.paso > 0 && a.min < a.max, `${e.id} · ${a.id}`);
    assert.ok(a.valor >= a.min && a.valor <= a.max, `${e.id} · ${a.id}: ${a.valor} fuera de rango`);
  }
});
