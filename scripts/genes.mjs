// Writes what an entity gives other programs: its genes (the values its chart decided: colors, numbers, gates,
// direction) and its creatures, already worked out, so that a program that knows nothing of the chart draws the very
// same ones. Blender reads this file (blender/criatura.py).
// Usage: npm run genes -- <id> [archivo.json]      (run after `npm run build`; default build/blender/<id>.json)
// The Unity project (unity/), when it is there, gets its own copy of the same file.
import { mkdirSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { sistema } from './lib/documentacion.mjs';
import { genesDe } from './lib/generativo.mjs';
import { criatura3d } from '../entidades/volumen.mjs';
import { personajeDe } from '../entidades/personaje.mjs';
import { materialesDe } from './lib/materiales.mjs';

// The creature of a name, as plain data: its two solids, its eyes (each on one of them), its rings and its fill.
export function criaturaParaFuera(G, nombre) {
  const K = criatura3d(G, nombre);
  return { nombre, solidos: K.solidos.map((s) => ({ centro: s.c, radios: s.r, color: s.color })), ojos: K.ojos.map((e) => ({ punto: e.p, radio: e.radio, solido: K.solidos.indexOf(e.de) })),
    anillos: K.anillos, lleno: K.lleno, redondo: K.redondo, trazo: K.trazo, alto: K.alto, bajo: K.bajo, fondo: K.base };
}
// Everything of an entity, for another program. The camera is the one the page looks through (entidades/volumen.mjs):
// 3.2 away, 0.55 up, looking at the middle of the creature, with a field of view of 22.2°.
export async function genesParaFuera(id) {
  const S = await sistema(id), G = genesDe(S), X = S.L.ilustracion.generativa || {};
  return { alma: 1, id, nombre: S.L.nombre, nacimiento: S.L.nacimiento, genes: G, personaje: personajeDe(G), ...materialesDe(),      // the system's material and coat tokens: the same for every entity
    nombres: X.nombres || [], conceptos: X.conceptos || [],
    criaturas: (X.nombres || []).map((n) => criaturaParaFuera(G, n)), camara: { distancia: 3.2, altura: 0.55, campo: 2 * Math.atan(1 / 5.1) * 180 / Math.PI } };
}

if (process.argv[1] && process.argv[1].endsWith('genes.mjs')) {
  const id = process.argv[2], ids = readdirSync('entidades/lenguajes').filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
  if (!id || !ids.includes(id)) { console.error(`Uso: npm run genes -- <id> [archivo.json]\nEntidades: ${ids.join(', ')}`); process.exit(1); }
  const file = process.argv[3] || `build/blender/${id}.json`, datos = await genesParaFuera(id);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(datos, null, 1) + '\n');
  if (!process.argv[3] && existsSync('unity/Assets')) { mkdirSync('unity/Assets/StreamingAssets/genes', { recursive: true }); writeFileSync(`unity/Assets/StreamingAssets/genes/${id}.json`, JSON.stringify(datos, null, 1) + '\n'); }
  console.log(`${file} · genes de la Entidad ${datos.nombre} y ${datos.criaturas.length} criaturas`);
}
