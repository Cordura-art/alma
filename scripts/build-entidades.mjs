// Builds "Entidades ALMA" (build/entidades-alma.html): one self-contained page with ALMA's CSS and components, the chart
// engine from entidades/*.mjs, the token data and site/entidades.js. Run after `npm run build`.
// Usage: node scripts/build-entidades.mjs [output path]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { datos, rebind, motor } from './lib/entidades.mjs';

const OUT = process.argv[2] || 'build/entidades-alma.html';
const read = (p) => readFileSync(p, 'utf8');
const alma = read('dist/css/alma.css'), alias = rebind(alma);
const esc = (s) => s.replace(/<\/script/gi, '<\\/script');
const FONTS = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,XTRA@8..144,25..151,100..1000,-200..150,323..603&family=Roboto+Mono:wght@400;500&display=swap';
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs';
const html = `<title>Entidades ALMA</title>
<link rel="stylesheet" href="${FONTS}">
<style>${alma}\n${read('artifact/project/components/bundle.css')}\n${read('site/entidades.css')}\n${alias}</style>
<div id="root"></div>
<script src="${CDN}/react/18.3.1/umd/react.production.min.js"></script>
<script src="${CDN}/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>${esc(read('artifact/project/components/bundle.js'))}</script>
<script>${esc(read('node_modules/astronomy-engine/astronomy.browser.min.js'))}</script>
<script>${esc(motor())}</script>
<script>window.__DATA = ${JSON.stringify(datos())};</script>
<script>${esc(read('site/entidades.js'))}</script>
`;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`${OUT} · ${(html.length / 1024) | 0} KB · alias reatados: ${alias.split('\n').filter(Boolean).length} bloques`);
