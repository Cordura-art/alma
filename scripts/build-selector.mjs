// Builds ONE page for every system (build/documentacion-sistemas/index.html): ALMA and each entity, with a selector to
// switch between them and, for an entity, between its documentation and its design language. It is the site of
// build-site.mjs holding each system's content and token values side by side, plus the language template
// (site/lenguaje.js) and the engine it runs on.
// An entity's content is stored as what differs from ALMA's (scripts/lib/delta.mjs): most of it is the same text.
// It is one file: the pictures of the guides are scenes the page shows live with the values of the system on screen
// (site/escenas.js), so no system brings images and any number of entities fits.
// Run after `npm run build`.
// Usage: node scripts/build-selector.mjs [id …]   (no ids = every entity with a design language)
import { readFileSync, writeFileSync, readdirSync, mkdirSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { datos, motor } from './lib/entidades.mjs';
import { sistema } from './lib/documentacion.mjs';
import { genesDe, generadorNavegador } from './lib/generativo.mjs';
import { personajeParaPagina, desfileParaPagina, ejemplosParaPagina } from './lib/personaje.mjs';
import { figurasNavegador } from './lib/figuras.mjs';
import { delta, aplicarDelta } from './lib/delta.mjs';

const read = (p) => readFileSync(p, 'utf8');
const all = readdirSync('entidades/lenguajes').filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
const ids = process.argv.slice(2).length ? process.argv.slice(2) : all;
const OUT = 'build/documentacion-sistemas', tmp = mkdtempSync(join(tmpdir(), 'alma-sistemas-'));
mkdirSync(OUT, { recursive: true });
const CONTENT = /<script type="application\/json" id="alma-content">([\s\S]*?)<\/script>/;
const esc = (s) => s.replace(/<\/script/gi, '<\\/script');
const build = (dir, args) => { execFileSync(process.execPath, ['scripts/build-site.mjs', ...args, join(tmp, dir, 'index.html')], { stdio: 'pipe' }); return read(join(tmp, dir, 'index.html')); };

// The language's own styles (and the engine's, which it builds on) apply only inside its pages (.lng), and the site's
// page header does not reach in there: the two were written as separate sites and share a few class names.
function scope(css) {
  const out = [], src = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let i = 0;
  while (i < src.length) {
    const open = src.indexOf('{', i);
    if (open < 0) break;
    let depth = 1, j = open + 1;
    while (depth && j < src.length) { if (src[j] === '{') depth++; else if (src[j] === '}') depth--; j++; }
    const sel = src.slice(i, open).trim(), body = src.slice(open + 1, j - 1);
    i = j;
    if (/^@(media|container|supports)/.test(sel)) { out.push(`${sel} {\n${scope(body)}\n}`); continue; }
    if (sel.startsWith('@')) { out.push(`${sel} {${body}}`); continue; }
    const sels = sel.split(',').map((s) => s.trim()).filter((s) => !/^(html|body|\.shell|\.nav|\.skip|\.app)(?![\w-])/.test(s))
      .map((s) => (/^\.main(?![\w-])/.test(s) ? '.lng' + s.slice(5) : '.lng ' + s));
    if (sels.length) out.push(`${sels.join(', ')} {${body}}`);
  }
  return out.join('\n');
}
const siteCss = read('site/site.css');
const siteScoped = siteCss.replace(/\.(head__title|head|type-sample)(?![\w-])/g, '$&:where(:not(.lng *))');

// ALMA's page is the shell: its CSS, components and app.
const shell = build('alma', []);
if (!CONTENT.test(shell) || !shell.includes('<div id="app"></div>') || !shell.includes(siteCss)) throw new Error('El sitio de ALMA cambió de forma: no encuentro su contenido o sus estilos');
const sistemas = [{ id: 'alma', nombre: 'ALMA' }];
const base = JSON.parse(CONTENT.exec(shell)[1]), pesos = [];
const blocks = [`<script type="application/json" id="alma-content-alma">${CONTENT.exec(shell)[1]}</script>`], styles = [], lenguajes = {};
for (const id of ids) {
  const L = JSON.parse(read(`entidades/lenguajes/${id}.json`));
  // Only what differs from ALMA travels, and the build checks that the page will rebuild exactly the same content.
  const suyo = JSON.parse(CONTENT.exec(build(id, ['--entidad', id]))[1]), d = delta(base, suyo), json = JSON.stringify(d === undefined ? null : d).replace(/</g, '\\u003c');
  if (JSON.stringify(aplicarDelta(base, d)) !== JSON.stringify(suyo)) throw new Error(`${id}: el contenido reconstruido desde ALMA no es igual al suyo`);
  blocks.push(`<script type="application/json" id="alma-delta-${id}">${json}</script>`);
  pesos.push(json.length);
  // The entity's values apply only while it is the chosen system: the app switches this sheet on.
  styles.push(`<style data-sistema="${id}" media="not all">\n${read(join(tmp, id, `entidad-${id}.css`))}</style>`);
  sistemas.push({ id, nombre: `Entidad ${L.nombre}` });
  // Generative illustration: the entity's genes travel with its language (see build-lenguaje.mjs).
  if (L.ilustracion.generativa) { L.genes = genesDe(await sistema(id)); L.personaje = personajeParaPagina(id, L.genes); }
  if (L.ejemplos) L.ejemplos = ejemplosParaPagina(L);
  lenguajes[id] = L;
}
// The language template and what it runs on: the chart engine, the token data and Entidades ALMA in engine-only mode.
const lenguaje = [
  `<script>${esc(read('node_modules/astronomy-engine/astronomy.browser.min.js'))}</script>`,
  `<script>${esc(motor())}</script>`,
  `<script>window.__ENGINE_ONLY = true; window.__DATA = ${JSON.stringify(datos()).replace(/</g, '\\u003c')};</script>`,
  `<script>${esc(read('site/entidades.js'))}</script>`,
  ...(Object.values(lenguajes).some((L) => L.genes) ? [`<script>${esc(generadorNavegador())}</script>`] : []),
  // The parade's video, once for every entity that has a character.
  ...(Object.values(lenguajes).some((L) => L.personaje) && desfileParaPagina() ? [`<script>window.__DESFILE = ${JSON.stringify(desfileParaPagina())};</script>`] : []),
  `<script>window.__LENGUAJES = ${JSON.stringify(lenguajes).replace(/</g, '\\u003c')};</script>`,
  `<script>${esc(read('site/reloj.js') + '\n' + read('site/partitura.js') + '\n' + read('site/palabra.js'))}</script>`,
  `<script>${esc(read('site/lenguaje.js'))}</script>`
].join('\n');
const html = shell.replace(siteCss, () => siteScoped)
  .replace(/<title>[^<]*<\/title>/, '<title>Sistemas ALMA</title>')
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="ALMA y sus entidades en un solo lugar: la documentación y el lenguaje de diseño de cada una, con un selector de sistema.">')
  .replace('<div id="app"></div>', () => `<style>\n${scope(read('site/entidades.css') + '\n' + read('site/lenguaje.css') + '\n' + read('site/palabra.css'))}\n</style>\n${styles.join('\n')}\n<div id="app"></div>`)
  .replace(CONTENT, () => `${blocks.join('\n')}\n<script>window.__SISTEMAS = ${JSON.stringify(sistemas)};</script>\n${lenguaje}`);
writeFileSync(`${OUT}/index.html`, html);
console.log(`Sitio con selector: ${OUT}/index.html (${(html.length / 1024).toFixed(0)} KB, ${sistemas.map((s) => s.nombre).join(', ')}; un solo archivo, con las imágenes en vivo; el contenido de cada entidad pesa ${pesos.map((p) => Math.round(p / 1024)).join(", ")} KB)`);
