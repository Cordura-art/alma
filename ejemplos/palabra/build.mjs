// Builds Palabra, the page where an entity's word is worked on: one self-contained fragment (the shape an artifact
// takes) from alma.css + the component bundle + each entity's token values and genes + the word's own script.
// Run from the repo root after `npm run build`:  npm run palabra  →  build/ejemplos/palabra.html
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sistema, css as cssEntidad } from '../../scripts/lib/documentacion.mjs';
import { genesDe } from '../../scripts/lib/generativo.mjs';

const here = dirname(fileURLToPath(import.meta.url)), read = (p) => readFileSync(p, 'utf8');
const P = 'artifact/project', CDN = 'https://cdnjs.cloudflare.com/ajax/libs', IDS = ['ensayo', 'cordura', 'automata'];

export async function paginaDePalabra() {
  const entidades = {};
  for (const id of IDS) { const S = await sistema(id), G = genesDe(S); entidades[id] = { nombre: G.nombre, css: cssEntidad(S), genes: { numeros: G.numeros, ritmo: G.ritmo, direccion: G.direccion, redondez: G.redondez, puntas: G.puntas } }; }
  const css = [read('dist/css/alma.css'), read(`${P}/components/bundle.css`), read('site/palabra.css'), read(join(here, 'pagina.css'))].join('\n');
  const bundle = read(`${P}/components/bundle.js`), pieza = read('site/reloj.js') + '\n' + read('site/partitura.js') + '\n' + read('site/palabra.js'), app = read(join(here, 'pagina.js')), datos = JSON.stringify(entidades).replace(/</g, '\\u003c');
  for (const [name, text, bad] of [['bundle.js', bundle, /<\/script|<!--/i], ['palabra.js', pieza, /<\/script|<!--/i], ['pagina.js', app, /<\/script|<!--/i], ['CSS', css + Object.values(entidades).map((e) => e.css).join(''), /<\/style/i]]) if (bad.test(text)) throw new Error(`${name} cerraría su etiqueta`);
  return `<title>Palabra</title>
<meta name="description" content="La palabra de una entidad, como pieza propia: se escribe letra por letra con los parámetros de la entidad y su peso responde al puntero.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,XTRA@8..144,25..151,100..1000,-200..150,323..603&display=swap">
<style>
${css}
</style>
<style id="entidad">
${entidades[IDS[0]].css}
</style>
<div id="app"></div>
<script src="${CDN}/react/18.3.1/umd/react.production.min.js"></script>
<script src="${CDN}/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>
${bundle}
</script>
<script>
${pieza}
window.__ENTIDADES = ${datos};
</script>
<script>
${app}
</script>
`;
}

if (process.argv[1] && process.argv[1].endsWith('build.mjs')) {
  const OUT = process.argv[2] || 'build/ejemplos/palabra.html', html = await paginaDePalabra();
  mkdirSync(dirname(OUT), { recursive: true }); writeFileSync(OUT, html); console.log(`${OUT} · ${(html.length / 1024) | 0} KB`);
}
