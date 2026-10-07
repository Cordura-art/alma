// Looks at line figures in a real browser, one by one: builds each one's page (for an entity, if one is given), moves
// the pointer over it, presses the arrows, and says what it found: errors, strokes out of the picture, how many accent
// marks, whether it came to rest, and whether it keeps still (and still answers) when less motion is asked for. It leaves two pictures of each in build/figuras/ (at rest, and with the pointer).
//   node scripts/revisar-figuras.mjs [--entidad <id>] [nombre …]      (no names: every figure)
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { mkdirSync, writeFileSync } from 'node:fs';
import { paginaDeFigura } from './build-figura.mjs';
import { nombresDeFiguras, rasgosDe } from './lib/figuras.mjs';

const args = process.argv.slice(2), k = args.indexOf('--entidad'), id = k >= 0 ? args.splice(k, 2)[1] : '', nombres = args.length ? args : nombresDeFiguras();
let rasgos = null, quien = ''; if (id) { const { genesParaFuera } = await import('./genes.mjs'); const E = await genesParaFuera(id); rasgos = rasgosDe(E); quien = E.nombre; }
mkdirSync('build/figuras', { recursive: true }); const b = await chromium.launch(); let malas = 0;
for (const n of nombres) {
  const archivo = `build/figuras/${n}${id ? '-' + id : ''}.html`; writeFileSync(archivo, paginaDeFigura(n, rasgos, quien));
  const p = await b.newPage({ viewport: { width: 620, height: 900 } }), err = []; p.on('pageerror', (e) => err.push(e.message));
  await p.goto(pathToFileURL(archivo).href); await p.waitForTimeout(700);
  const caja = await p.locator('#figura svg').boundingBox(); if (!caja) { console.log(n.padEnd(12), 'NO SE MONTÓ', err.join(' | ')); malas++; await p.close(); continue; }
  const foto = (s) => p.screenshot({ path: `build/figuras/v-${n}${id ? '-' + id : ''}-${s}.png`, clip: caja });
  await foto('a'); await p.mouse.move(caja.x + caja.width * 0.62, caja.y + caja.height * 0.42); await p.waitForTimeout(1500); await foto('b'); const dice = await p.textContent('#dice');
  await p.fill('#intensidad', '1'); for (const [fx, fy] of [[0.85, 0.75], [0.15, 0.2], [0.5, 0.9]]) { await p.mouse.move(caja.x + caja.width * fx, caja.y + caja.height * fy); await p.waitForTimeout(700); }
  await p.waitForTimeout(1300);
  const propio = await p.evaluate((n) => !!window.AlmaFigura.figuras[n].propio, n);      // one that moves on its own never comes to rest
  const r = await p.evaluate(() => ({ quieta: !window.__figura.enMovimiento, fuera: [...document.querySelectorAll('#figura svg path, #figura svg circle, #figura svg ellipse')].filter((e) => { const c = e.getBBox(); return c.width && (c.x < 0 || c.y < 0 || c.x + c.width > 400 || c.y + c.height > 320); }).length,
    acentos: [...document.querySelectorAll('#figura svg .acento')].filter((e) => e.getAttribute('d') || e.getAttribute('r') || e.getAttribute('rx')).length, trazos: document.querySelectorAll('#figura svg path').length }));
  await p.locator('#figura svg').focus(); await p.keyboard.press('ArrowUp'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(900); const tecla = await p.textContent('#dice');
  await p.keyboard.press('Escape'); await p.waitForTimeout(1600); const reposo = await p.textContent('#dice'), quieta = await p.evaluate(() => !window.__figura.enMovimiento);
  // Asked for less motion: it answers the pointer at once and does not keep moving, not even one that moves on its own.
  const q = await b.newPage({ viewport: { width: 620, height: 900 }, reducedMotion: 'reduce' }); q.on('pageerror', (e) => err.push('quieto: ' + e.message)); await q.goto(pathToFileURL(archivo).href); await q.waitForTimeout(500);
  const cq = await q.locator('#figura svg').boundingBox(); await q.mouse.move(cq.x + cq.width * 0.62, cq.y + cq.height * 0.42); await q.waitForTimeout(350);
  const menos = await q.evaluate(() => ({ quieta: !window.__figura.enMovimiento, dice: document.getElementById('dice').textContent })); await q.close(); const calma = menos.quieta && menos.dice !== 'En reposo';
  const bien = calma && !err.length && (propio || (r.quieta && quieta)) && !r.fuera && r.acentos === 1 && reposo === 'En reposo'; if (!bien) malas++;
  console.log((bien ? '✔ ' : '✖ ') + n.padEnd(12), dice.padEnd(30), '| flechas:', tecla.padEnd(30), `| ${r.trazos} trazos, ${r.fuera} fuera, ${r.acentos} acento(s)` + (propio ? ', se mueve sola' : r.quieta && quieta ? '' : ', NO SE DETIENE') + (reposo === 'En reposo' ? '' : ', no vuelve al reposo') + (calma ? '' : ', CON MENOS MOVIMIENTO ' + (menos.quieta ? 'no responde' : 'sigue moviéndose')), err.join(' | '));
  await p.close();
}
await b.close(); console.log(malas ? `${malas} con problemas` : `Las ${nombres.length} bien`); process.exit(malas ? 1 : 0);
