// Builds "Ajustes de ALMA" (build/alma-ajustes.html): one self-contained page to tune ALMA's themes, the Roboto Flex
// axes, type weights and radii on live components, with the repo's contrast pairs. Run after `npm run build`.
// Usage: node scripts/build-tuner.mjs [output path]
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { themes } from '../dist/js/tokens.mjs';

const OUT = process.argv[2] || 'build/alma-ajustes.html';
const P = 'artifact/project';
const read = (p) => readFile(p, 'utf8');
const cfg = JSON.parse(await read('tokens/alma.config.json'));

// The semantic colors worth tuning; every other color token follows them through aliases.
const colorGroups = [
  { title: 'Superficies', tokens: ['ui-02', 'ui-01', 'ui-03', 'ui-04'] },
  { title: 'Texto', tokens: ['text-01', 'text-02', 'text-03'] },
  { title: 'Acción', tokens: ['interactive-01', 'interactive-02', 'text-on-interactive', 'link-01'] },
  { title: 'Foco y navegación', tokens: ['focus', 'nav-selected', 'hover-ui', 'selected-ui'] },
  { title: 'Bordes y controles', tokens: ['border-subtle', 'border-control', 'control-on', 'field-border'] },
  { title: 'Estados', tokens: ['support-01', 'support-02', 'support-03', 'support-04'] }
];
const values = {};
for (const th of Object.keys(themes)) {
  values[th] = {};
  for (const g of colorGroups) for (const n of g.tokens) {
    const v = themes[th][n];
    if (!/^#[0-9A-Fa-f]{6}$/.test(v)) throw new Error(`${th}/${n} no es un color opaco (#RRGGBB): ${v}`);
    values[th][n] = v.toUpperCase();
  }
}

const axis = JSON.parse(await read('tokens/core/fontAxis.json')).fontAxis;
const radius = Object.entries(JSON.parse(await read('tokens/core/radius.json')).radius).filter(([n]) => n !== 'radius-pill').map(([name, t]) => ({ name, value: t.$value }));
// Weights by role: display, heading, body, emphasis. Type styles and components read --font-weight-<role>,
// so the preview only has to set those variables.
const weights = Object.fromEntries(Object.entries(JSON.parse(await read('tokens/core/fontWeight.json')).fontWeight).map(([n, t]) => [n.replace(/^font-weight-/, ''), t.$value]));

const data = {
  themes: cfg.themes, colorGroups, values,
  pairs: (await read('tests/contrast-pairs.txt')).trim().split('\n').map((l) => l.split('|')),
  hcForeground: JSON.parse(await read('tests/contrast-hc-foreground.json')),
  fontAxis: { 'font-width': axis['font-width'].$value, 'font-grade': axis['font-grade'].$value },
  weights, radius
};

const bundle = await read(`${P}/components/bundle.js`);
const css = [await read('dist/css/alma.css'), await read(`${P}/components/bundle.css`), await read('site/site.css'), await read('site/tuner.css')].join('\n');
const app = await read('site/tuner.js');
for (const [name, text, bad] of [['bundle.js', bundle, /<\/script|<!--/i], ['tuner.js', app, /<\/script|<!--/i], ['CSS', css, /<\/style/i]]) {
  if (bad.test(text)) throw new Error(`${name} contiene una secuencia que cerraría la etiqueta en línea`);
}
const LIBS = ['react/18.3.1/umd/react.production.min.js', 'react-dom/18.3.1/umd/react-dom.production.min.js'];
const html = `<title>Ajustes de ALMA</title>
<meta name="description" content="Ajusta los temas, los ejes de Roboto Flex, los pesos y los radios de ALMA sobre componentes en vivo.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,XTRA@8..144,25..151,100..1000,-200..150,323..603&family=Roboto+Mono:wght@400;500&display=swap">
<style>
${css}
</style>
<div id="app"></div>
${LIBS.map((l) => `<script src="https://cdnjs.cloudflare.com/ajax/libs/${l}"></script>`).join('\n')}
<script>
${bundle}
</script>
<script type="application/json" id="tuner-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
<script>
${app}
</script>
`;
await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, html);
console.log(`Ajustes: ${OUT} (${(html.length / 1024).toFixed(0)} KB, ${data.pairs.length} pares de contraste)`);
