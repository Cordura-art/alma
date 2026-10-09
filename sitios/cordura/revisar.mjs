// Opens the built page in a browser at desktop and phone widths, in both themes, and reports overflow, console errors
// and the theme button. Screenshots go next to the page. Run after `npm run sitio:cordura`:  node sitios/cordura/revisar.mjs
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';

const FILE = process.argv[2] || 'build/sitios/cordura.html', dir = dirname(FILE), errs = [];
const html = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>' + readFileSync(FILE, 'utf8') + '</body></html>';
const b = await chromium.launch();
const estado = (p) => p.evaluate(() => ({ tema: document.documentElement.getAttribute('data-theme'), fondo: getComputedStyle(document.body).backgroundColor, desborde: document.documentElement.scrollWidth - innerWidth, h2: document.querySelectorAll('h2').length, acento: getComputedStyle(document.documentElement).getPropertyValue('--interactive-01').trim() }));
for (const [w, scheme, tag] of [[1440, 'dark', 'ancho-oscuro'], [1440, 'light', 'ancho-claro'], [400, 'dark', 'movil-oscuro'], [400, 'light', 'movil-claro']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, colorScheme: scheme }), p = await ctx.newPage();
  p.on('pageerror', (e) => errs.push(`${tag}: ${e.message}`));
  p.on('console', (m) => { if ((m.type() === 'error' || m.type() === 'warning') && !/GL Driver Message/.test(m.text())) errs.push(`${tag} consola: ${m.text()}`); });
  await ctx.route('http://cordura.test/', (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: html }));
  await p.goto('http://cordura.test/', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  const antes = await estado(p);
  if (antes.desborde > 0) errs.push(`${tag}: la página se desborda ${antes.desborde} px`);
  console.log(tag, JSON.stringify(antes));
  await p.screenshot({ path: `${dir}/cordura-${tag}.png`, fullPage: true });
  // The theme button switches to the other theme, and the choice survives a reload.
  const otro = scheme === 'dark' ? 'claro' : 'oscuro';
  await p.getByRole('button', { name: `Usar tema ${otro}` }).click();
  await p.waitForTimeout(300);
  await p.reload({ waitUntil: 'networkidle' });
  const despues = await estado(p);
  if (despues.fondo === antes.fondo) errs.push(`${tag}: el botón de tema no cambió el fondo`);
  console.log(`  tras «Usar tema ${otro}» y recargar`, JSON.stringify(despues));
  await ctx.close();
}
await b.close();
console.log([...new Set(errs)].join('\n') || 'sin errores');
if (errs.length) process.exit(1);
