// Builds the Ensayo Café landing page, an example of a page made with an entity: one self-contained fragment (the
// shape an artifact takes) from alma.css + the component bundle + the Entidad Ensayo token values + this folder's
// layout and script. Run from the repo root after `npm run build`:  npm run ejemplo  →  build/ejemplos/ensayo-cafe.html
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sistema, css as cssEntidad } from '../../scripts/lib/documentacion.mjs';

const here = dirname(fileURLToPath(import.meta.url)), read = (p) => readFileSync(p, 'utf8');
const P = 'artifact/project', CDN = 'https://cdnjs.cloudflare.com/ajax/libs';
const OUT = process.argv[2] || 'build/ejemplos/ensayo-cafe.html';
const S = await sistema('ensayo');

// The entity's generative signature, as SVG: the engine's layout of pills and sparks.
const lay = S.En.layout(S.E, S.P, 448, 420), n = (v) => Math.round(v * 10) / 10;
const xs = lay.pills.flatMap((p) => [p.x, p.x + p.w]), ys = lay.pills.flatMap((p) => [p.y, p.y + p.h]);
const firma = `<svg class="firma" viewBox="${n(Math.min(...xs))} ${n(Math.min(...ys) - 8)} ${n(Math.max(...xs) - Math.min(...xs))} ${n(Math.max(...ys) - Math.min(...ys) + 16)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
  lay.pills.map((p) => `<rect x="${n(p.x)}" y="${n(p.y)}" width="${n(p.w)}" height="${n(p.h)}" rx="${n(p.h / 2 * lay.roundF)}" fill="${p.c}"/>`).join('') +
  lay.sparks.map((s) => `<path d="M${n(s.x)} ${n(s.y - s.s)}Q${n(s.x)} ${n(s.y)} ${n(s.x + s.s)} ${n(s.y)}Q${n(s.x)} ${n(s.y)} ${n(s.x)} ${n(s.y + s.s)}Q${n(s.x)} ${n(s.y)} ${n(s.x - s.s)} ${n(s.y)}Q${n(s.x)} ${n(s.y)} ${n(s.x)} ${n(s.y - s.s)}Z" fill="var(--secondary-700)"/>`).join('') + '</svg>';

const css = [read('dist/css/alma.css'), read(`${P}/components/bundle.css`), cssEntidad(S), read(join(here, 'pagina.css'))].join('\n');
const bundle = read(`${P}/components/bundle.js`), app = read(join(here, 'pagina.js'));
for (const [name, text, bad] of [['bundle.js', bundle, /<\/script|<!--/i], ['pagina.js', app, /<\/script|<!--/i], ['CSS', css, /<\/style/i]]) if (bad.test(text)) throw new Error(`${name} cerraría su etiqueta`);

const html = `<title>Ensayo Café</title>
<meta name="description" content="Ensayo Café: una cafetería que parte con una sola cosa en la carta, cold brew. Página de ejemplo de la Entidad Ensayo, hecha con ALMA.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,XTRA@8..144,25..151,100..1000,-200..150,323..603&family=Roboto+Mono:wght@400;500&display=swap">
<style>
${css}
</style>
<div id="app"></div>
<template id="firma">${firma}</template>
<script src="${CDN}/react/18.3.1/umd/react.production.min.js"></script>
<script src="${CDN}/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>
${bundle}
</script>
<script>
${app}
</script>
`;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`${OUT} · ${(html.length / 1024) | 0} KB`);
