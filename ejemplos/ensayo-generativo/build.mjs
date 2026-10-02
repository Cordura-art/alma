// Builds Ensayo Generativo, a prototype of an entity's procedural identity: avatars and textures drawn from the
// entity's chart and a key. One self-contained fragment (the shape an artifact takes) from alma.css + the component
// bundle + the Entidad Ensayo token values + the generator and this folder's layout and script. The genes of Cordura
// travel too, to show the same rules on another entity.
// Run from the repo root after `npm run build`:  npm run ejemplo:generativo  →  build/ejemplos/ensayo-generativo.html
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sistema, css as cssEntidad } from '../../scripts/lib/documentacion.mjs';
import { genesDe, generadorNavegador } from '../../scripts/lib/generativo.mjs';

const here = dirname(fileURLToPath(import.meta.url)), read = (p) => readFileSync(p, 'utf8');
const P = 'artifact/project', CDN = 'https://cdnjs.cloudflare.com/ajax/libs';
const OUT = process.argv[2] || 'build/ejemplos/ensayo-generativo.html';
const tok = JSON.parse(read('dist/json/tokens.json')), S = await sistema('ensayo');

const G = {};
for (const X of [S, await sistema('cordura')]) G[X.id] = { ...genesDe(X, tok), paleta: X.P.palette.map((p) => p.name), fechaLarga: X.L.fechaLarga, radio: X.P.radius['radius-button'] };

// The generator as a browser script: the system's families (entidades/) plus the ones that still live in this folder.
// Pictograms are not here: they are ALMA's Pictogram component, in the bundle.
const AQUI = 'ejemplos/ensayo-generativo';
const generador = generadorNavegador([`${AQUI}/campo.mjs`, `${AQUI}/carrusel.mjs`, `${AQUI}/micelio.mjs`], ['campo', 'pintarCampo', 'carrusel', 'anillo', 'micelio', 'pintarMicelio', 'vaivenMicelio']);

const css = [read('dist/css/alma.css'), read(`${P}/components/bundle.css`), cssEntidad(S), read(join(here, 'pagina.css'))].join('\n');
const bundle = read(`${P}/components/bundle.js`), app = read(join(here, 'pagina.js'));
for (const [name, text, bad] of [['bundle.js', bundle, /<\/script|<!--/i], ['el generador', generador, /<\/script|<!--/i], ['pagina.js', app, /<\/script|<!--/i], ['CSS', css, /<\/style/i]]) if (bad.test(text)) throw new Error(`${name} cerraría su etiqueta`);

const html = `<title>Ensayo Generativo</title>
<meta name="description" content="Ensayo Generativo: avatares y texturas de la Entidad Ensayo, dibujados por reglas desde su carta y una semilla. Prototipo hecho con ALMA.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,XTRA@8..144,25..151,100..1000,-200..150,323..603&family=Roboto+Mono:wght@400;500&display=swap">
<style>
${css}
</style>
<div id="app"></div>
<script src="${CDN}/react/18.3.1/umd/react.production.min.js"></script>
<script src="${CDN}/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>
${bundle}
</script>
<script>
${generador}
window.__GENES = ${JSON.stringify(G)};
</script>
<script>
${app}
</script>
`;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`${OUT} · ${(html.length / 1024) | 0} KB`);
