// Builds one design language page per entity (build/lenguaje-<id>.html) from the template (site/lenguaje.js) and the
// entity's words (entidades/lenguajes/<id>.json), on top of Entidades ALMA in engine-only mode.
// Usage: node scripts/build-lenguaje.mjs [id …]   (run `node scripts/build-entidades.mjs` first; no ids = every entity)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { sistema } from './lib/documentacion.mjs';
import { genesDe, generadorNavegador } from './lib/generativo.mjs';
import { personajeParaPagina, desfileParaPagina } from './lib/personaje.mjs';

const read = (p) => readFileSync(p, 'utf8');
const DIR = 'entidades/lenguajes';
const ids = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
const esc = (s) => s.replace(/<\/script/gi, '<\\/script');
const base = read('build/entidades-alma.html');
for (const id of ids) {
  const L = JSON.parse(read(`${DIR}/${id}.json`));
  // An entity that declares generative illustration gets its genes and the generator (creatures, colonies, emblems
  // and card faces) for the Ilustración page.
  const gen = !!L.ilustracion.generativa;
  if (gen) { L.genes = genesDe(await sistema(id)); L.personaje = personajeParaPagina(id, L.genes); }
  let html = base.replace('<title>Entidades ALMA</title>', `<title>Entidad ${L.nombre}</title>`).replace('</style>', read('site/lenguaje.css') + '</style>');
  // Engine only: the Entidades app exposes window.__ENGINE and returns before rendering.
  html = html.replace('<script>window.__DATA', '<script>window.__ENGINE_ONLY = true;</script>\n<script>window.__DATA');
  if (gen) html += `<script>${esc(generadorNavegador())}</script>\n`;
  if (gen && desfileParaPagina()) html += `<script>window.__DESFILE = ${JSON.stringify(desfileParaPagina())};</script>\n`;
  html += `<script>window.__LENGUAJE = ${JSON.stringify(L)};</script>\n<script>${esc(read('site/lenguaje.js'))}</script>\n`;
  writeFileSync(`build/lenguaje-${id}.html`, html);
  console.log(`build/lenguaje-${id}.html · ${(html.length / 1024) | 0} KB`);
}
