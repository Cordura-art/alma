// Everything an entity's documentation needs, in one command: npm run entidad -- <id>
// 1. checks that the entity has its design language (entidades/lenguajes/<id>.json): the only file an entity writes;
// 2. builds its design language page and its documentation site (build/documentacion-<id>/);
// 3. draws the images that changed (the rest come from the cache);
// 4. runs the entity's tests: token names, contrast in the four themes, every sentence checked;
// 5. photographs the key pages in the four themes (build/documentacion-<id>/revision/) to look at before publishing.
// --sin-capturas skips step 5; --forzar draws every image again.
import { existsSync, readFileSync, readdirSync, mkdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

const args = process.argv.slice(2), has = (f) => (args.includes(f) ? args.splice(args.indexOf(f), 1).length > 0 : false);
const FORZAR = has('--forzar'), SIN = has('--sin-capturas'), id = args[0];
const LENG = 'entidades/lenguajes', ids = readdirSync(LENG).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
if (!id || !ids.includes(id)) {
  console.error(id ? `No existe ${LENG}/${id}.json. Una entidad nace de su lenguaje de diseño: créalo a partir del de otra entidad (README, «Entidades») y vuelve a correr este comando.` : 'Uso: npm run entidad -- <id> [--forzar] [--sin-capturas]');
  console.error(`Entidades con lenguaje: ${ids.join(', ')}`);
  process.exit(1);
}
const DIR = `build/documentacion-${id}`, t0 = Date.now();
const paso = (titulo, file, argv) => { console.log(`\n— ${titulo}`); execFileSync(process.execPath, [file, ...argv], { stdio: 'inherit' }); };

if (!existsSync('dist/css/alma.css')) paso('ALMA: tokens y guías', 'scripts/build-tokens.mjs', []);
paso('Lenguaje de diseño', 'scripts/build-entidades.mjs', []);
execFileSync(process.execPath, ['scripts/build-lenguaje.mjs', id], { stdio: 'inherit' });
paso('Sitio de documentación', 'scripts/build-site.mjs', ['--entidad', id]);
paso('Imágenes', 'scripts/build-images.mjs', ['--entidad', id, ...(FORZAR ? ['--forzar'] : [])]);
// The site counts the images it finds next to it: build it again now that they exist.
execFileSync(process.execPath, ['scripts/build-site.mjs', '--entidad', id], { stdio: 'inherit' });
console.log('\n— Pruebas');
execFileSync(process.execPath, ['--test', '--test-name-pattern', `^${id}:`, 'tests/documentacion.test.mjs'], { stdio: 'inherit' });

if (!SIN) {
  console.log('\n— Capturas para revisar');
  const TYPES = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.css': 'text/css' };
  const PAGINAS = ['inicio', 'origen', 'color', 'tipografia', 'button', 'textinput'], TEMAS = ['dark', 'light', 'dark-hc', 'light-hc'];
  mkdirSync(`${DIR}/revision`, { recursive: true });
  const browser = await chromium.launch(), errores = [];
  for (const tema of TEMAS) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    // The page is a fragment (the artifact adds its skeleton): serve it from disk under a made-up host, with one.
    await ctx.route('http://entidad.test/**', (route) => {
      const p = join(DIR, decodeURIComponent(new URL(route.request().url()).pathname));
      if (!existsSync(p) || !statSync(p).isFile()) return route.fulfill({ status: 404, body: '' });
      const body = p.endsWith('index.html') ? '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>' + readFileSync(p, 'utf8') + '</body></html>' : readFileSync(p);
      return route.fulfill({ status: 200, contentType: TYPES[extname(p)] || 'application/octet-stream', body });
    });
    await ctx.addInitScript((t) => { try { localStorage.setItem('alma-theme', t); } catch (e) { /* storage blocked */ } }, tema);
    for (const pagina of PAGINAS) {
      const page = await ctx.newPage();
      page.on('pageerror', (e) => errores.push(`${pagina} (${tema}): ${e.message}`));
      await page.goto(`http://entidad.test/index.html#${pagina}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(400);
      const desborde = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (desborde > 0) errores.push(`${pagina} (${tema}): la página desborda ${desborde} px a lo ancho`);
      const rotas = await page.evaluate(() => [...document.images].filter((i) => i.complete && !i.naturalWidth).map((i) => i.getAttribute('src')));
      if (rotas.length) errores.push(`${pagina} (${tema}): imágenes que no cargan: ${rotas.join(', ')}`);
      await page.screenshot({ path: `${DIR}/revision/${pagina}-${tema}.png` });
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  console.log(`  ${PAGINAS.length * TEMAS.length} capturas en ${DIR}/revision/`);
  if (errores.length) { console.error(`\nLa revisión encontró ${errores.length} problemas:\n  ${[...new Set(errores)].join('\n  ')}`); process.exit(1); }
}

console.log(`\nEntidad ${id}: lista en ${((Date.now() - t0) / 1000).toFixed(0)} s.
  Lenguaje de diseño   build/lenguaje-${id}.html
  Documentación        ${DIR}/index.html
  Valores de tokens    ${DIR}/entidad-${id}.css
  Imágenes             ${DIR}/assets/
  Capturas             ${SIN ? '(omitidas)' : `${DIR}/revision/`}`);
