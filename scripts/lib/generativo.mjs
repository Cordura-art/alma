// The generative identity, ready for a page: an entity's genes, and the generator as one browser script.
// The generator's modules (entidades/*.mjs) have no DOM: Node tests them as they are, and a page gets the same files in
// one scope, without their `import` and `export` words. Run from the repo root, after `npm run build`.
import { readFileSync } from 'node:fs';
import { valor } from './documentacion.mjs';
import { genes } from '../../entidades/generador.mjs';

const read = (p) => readFileSync(p, 'utf8');
// What every page with generative pieces carries: creatures, colonies, emblems and card faces.
const MODULOS = ['entidades/semilla.mjs', 'entidades/generador.mjs', 'entidades/emblemas.mjs', 'entidades/placa.mjs'];
const NOMBRES = ['hash', 'rng', 'criatura', 'colonia', 'comoFondo', 'emblema', 'placa', 'PATRONES', 'NOMBRE_PATRON'];

// The genes of an entity's system (`S`, from sistema(id)), with ALMA's token values.
export function genesDe(S, tok = JSON.parse(read('dist/json/tokens.json'))) {
  return genes(S, (name, theme) => valor(tok, name, theme));
}

// window.__GENERADOR as a classic script. `extra` are more module files and `nombres` what they add to the global.
export function generadorNavegador(extra = [], nombres = []) {
  const src = [...MODULOS, ...extra].map((f) => read(f).replace(/^import .*$/gm, '').replace(/^export /gm, '')).join('\n');
  if (/<\/script|<!--/i.test(src)) throw new Error('El generador cerraría su etiqueta');
  return `(function () {\n${src}\nwindow.__GENERADOR = { ${[...NOMBRES, ...nombres].map((n) => `${n}: ${n}`).join(', ')} };\n})();`;
}
