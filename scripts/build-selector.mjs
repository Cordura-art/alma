// Builds ONE documentation page for every system (build/documentacion-sistemas/index.html): ALMA and each entity, with
// a selector to switch between them. It is the same site as build-site.mjs, holding each system's content, token values
// and images side by side. Kept as an alternative to one page per entity: a single link, and it works without the others.
// Run after `npm run build` and `npm run entidad -- <id>` for each entity (their images come from there).
// Usage: node scripts/build-selector.mjs [id …]   (no ids = every entity with a design language)
import { readFileSync, writeFileSync, readdirSync, mkdirSync, mkdtempSync, existsSync, cpSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const read = (p) => readFileSync(p, 'utf8');
const all = readdirSync('entidades/lenguajes').filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
const ids = process.argv.slice(2).length ? process.argv.slice(2) : all;
const OUT = 'build/documentacion-sistemas', tmp = mkdtempSync(join(tmpdir(), 'alma-sistemas-'));
const CONTENT = /<script type="application\/json" id="alma-content">([\s\S]*?)<\/script>/;
const build = (dir, args) => { execFileSync(process.execPath, ['scripts/build-site.mjs', ...args, join(tmp, dir, 'index.html')], { stdio: 'pipe' }); return read(join(tmp, dir, 'index.html')); };

// ALMA's page is the shell: its CSS, components and app. Its images land next to it (assets/).
const shell = build('alma', []);
const sistemas = [{ id: 'alma', nombre: 'ALMA', assets: '' }], blocks = [`<script type="application/json" id="alma-content-alma">${CONTENT.exec(shell)[1]}</script>`], styles = [];
mkdirSync(OUT, { recursive: true });
cpSync(join(tmp, 'alma', 'assets'), `${OUT}/assets`, { recursive: true });
let images = readdirSync(`${OUT}/assets`, { recursive: true }).filter((f) => String(f).endsWith('.png')).length;
for (const id of ids) {
  const L = JSON.parse(read(`entidades/lenguajes/${id}.json`)), from = `build/documentacion-${id}/assets`;
  if (!existsSync(from)) throw new Error(`Faltan las imágenes de ${id}: corre "npm run entidad -- ${id}" primero`);
  blocks.push(`<script type="application/json" id="alma-content-${id}">${CONTENT.exec(build(id, ['--entidad', id]))[1]}</script>`);
  // The entity's values apply only while it is the chosen system: the app switches this sheet on.
  styles.push(`<style data-sistema="${id}" media="not all">\n${read(join(tmp, id, `entidad-${id}.css`))}</style>`);
  cpSync(from, `${OUT}/sistemas/${id}/assets`, { recursive: true });
  images += readdirSync(from, { recursive: true }).filter((f) => String(f).endsWith('.png')).length;
  sistemas.push({ id, nombre: `Entidad ${L.nombre}`, assets: `sistemas/${id}/` });
}
if (!CONTENT.test(shell) || !shell.includes('<div id="app"></div>')) throw new Error('El sitio de ALMA cambió de forma: no encuentro su contenido');
const html = shell.replace(/<title>[^<]*<\/title>/, '<title>Sistemas ALMA</title>')
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="ALMA y sus entidades en una sola documentación, con un selector de sistema.">')
  .replace('<div id="app"></div>', () => `${styles.join('\n')}\n<div id="app"></div>`)
  .replace(CONTENT, () => `${blocks.join('\n')}\n<script>window.__SISTEMAS = ${JSON.stringify(sistemas)};</script>`);
writeFileSync(`${OUT}/index.html`, html);
console.log(`Sitio con selector: ${OUT}/index.html (${(html.length / 1024).toFixed(0)} KB, ${sistemas.map((s) => s.nombre).join(', ')}; ${images} imágenes)`);
