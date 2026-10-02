// The generative identity, ready for a page: an entity's genes, and the generator as one browser script.
// The generator's modules (entidades/*.mjs) have no DOM: Node tests them as they are, and a page gets the same files in
// one scope, without their `import` and `export` words. Run from the repo root, after `npm run build`.
import { readFileSync } from 'node:fs';
import { valor } from './documentacion.mjs';
import { genes } from '../../entidades/generador.mjs';

const read = (p) => readFileSync(p, 'utf8');
// What every page with generative pieces carries: creatures, colonies, emblems, card faces, the field, the carousel
// and the mycelium.
const MODULOS = ['semilla', 'generador', 'emblemas', 'placa', 'campo', 'carrusel', 'micelio'].map((m) => `entidades/${m}.mjs`);
const NOMBRES = ['hash', 'rng', 'criatura', 'colonia', 'comoFondo', 'emblema', 'emblemaPuerta', 'emblemasDe', 'TRIGRAMAS', 'TRIGRAMAS_DE', 'SILUETAS', 'MOTIVOS', 'placa', 'PATRONES', 'NOMBRE_PATRON', 'campo', 'pintarCampo', 'ladoEmblema', 'carrusel', 'anillo', 'micelio', 'pintarMicelio', 'vaivenMicelio'];

// The genes of an entity's system (`S`, from sistema(id)), with ALMA's token values.
export function genesDe(S, tok = JSON.parse(read('dist/json/tokens.json'))) {
  return genes(S, (name, theme) => valor(tok, name, theme));
}

// window.__GENERADOR as a classic script, followed by the pieces that move as React components
// (window.__GENERADOR_VISTAS, site/generativo.js), which need the page's React.
export function generadorNavegador() {
  const src = MODULOS.map((f) => read(f).replace(/^import .*$/gm, '').replace(/^export /gm, '')).join('\n');
  if (/<\/script|<!--/i.test(src)) throw new Error('El generador cerraría su etiqueta');
  const vistas = read('site/generativo.js');
  if (/<\/script|<!--/i.test(vistas)) throw new Error('site/generativo.js cerraría su etiqueta');
  return `(function () {\n${src}\nwindow.__GENERADOR = { ${NOMBRES.map((n) => `${n}: ${n}`).join(', ')} };\n})();\n${vistas}`;
}
