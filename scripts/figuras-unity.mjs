// The line figures of an entity, for its planet in Unity: each figure as the strokes one sees of it, at rest. A figure
// is a flat drawing (its engine projects it as it draws), so it goes out as that: lines on a plane, to stand on the
// ground as a sign. It is drawn in a real browser and read back: every stroke is followed along its length, and only
// the stretches nothing covers are kept.
//   node scripts/figuras-unity.mjs [entidad …]   →   unity/Assets/StreamingAssets/figuras/<entidad>.json   (after `npm run genes -- <entidad>`)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { chromium } from 'playwright';
import { figurasNavegador, nombresDeFiguras, rasgosDe } from './lib/figuras.mjs';

const ids = process.argv.slice(2).length ? process.argv.slice(2) : ['ensayo', 'cordura', 'automata'];
const pagina = `<!doctype html><html lang="es" data-theme="dark"><meta charset="utf-8"><style>${readFileSync('dist/css/alma.css', 'utf8')} body { margin: 0; background: var(--ui-02); } #f { width: 640px; }</style><div id="f"></div><script>${figurasNavegador().replace(/<\/script/gi, '<\\/script')}</script></html>`;
const navegador = await chromium.launch(), hoja = await navegador.newPage({ viewport: { width: 800, height: 900 }, reducedMotion: 'reduce' });
await hoja.setContent(pagina);
for (const id of ids) {
  const archivo = `build/blender/${id}.json`; if (!existsSync(archivo)) throw new Error(`Falta ${archivo}: corre antes npm run genes -- ${id}`);
  const rasgos = rasgosDe(JSON.parse(readFileSync(archivo, 'utf8'))), figuras = [];
  for (const nombre of nombresDeFiguras()) {
    const una = await hoja.evaluate(async ({ nombre, rasgos }) => {
      const f = document.getElementById('f'); f.textContent = ''; f.className = ''; window.AlmaFigura.monta(f, nombre, { genes: rasgos, intensidad: 0.5 });
      await new Promise((r) => setTimeout(r, 350));
      const svg = f.querySelector('svg'), caja = svg.getBoundingClientRect(), trazos = [], sonda = document.createElement('i'); sonda.style.color = 'var(--figura-acento)'; f.appendChild(sonda); const acento = getComputedStyle(sonda).color; sonda.remove();
      // (a run of points with those that add nothing left out: what is nearly straight is two points)
      const limpia = (p) => { const q = [p[0], p[1]]; for (let i = 2; i < p.length - 2; i += 2) { const ax = q[q.length - 2], ay = q[q.length - 1], bx = p[i + 2], by = p[i + 3], l = Math.hypot(bx - ax, by - ay) || 1; if (Math.abs((p[i] - ax) * (by - ay) - (p[i + 1] - ay) * (bx - ax)) / l > 0.35) q.push(p[i], p[i + 1]); } q.push(p[p.length - 2], p[p.length - 1]); return q.map((v) => Math.round(v * 10) / 10); };
      for (const el of svg.querySelectorAll('path, line, polyline, polygon, circle, ellipse, rect')) {
        const cs = getComputedStyle(el); if (!el.getTotalLength || cs.stroke === 'none' || !(parseFloat(cs.strokeWidth) > 0) || cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.05 || parseFloat(cs.strokeOpacity) < 0.05) continue;
        const largo = el.getTotalLength(); if (!(largo > 2)) continue; const m = el.getScreenCTM(), n = Math.ceil(largo / 2); let tramo = [];
        const cierra = () => { if (tramo.length >= 4) trazos.push({ p: limpia(tramo), acento: cs.stroke === acento }); tramo = []; };
        for (let i = 0; i <= n; i++) {
          const p = el.getPointAtLength(largo * i / n), x = p.x * m.a + p.y * m.c + m.e, y = p.x * m.b + p.y * m.d + m.f, encima = document.elementFromPoint(x, y);
          if (encima === el || (encima && svg.contains(encima) && getComputedStyle(encima).fill === 'none')) tramo.push(x - caja.left, y - caja.top); else cierra();
        }
        cierra();
      }
      return { nombre, ancho: Math.round(caja.width), alto: Math.round(caja.height), trazos };
    }, { nombre, rasgos });
    figuras.push(una);
  }
  mkdirSync('unity/Assets/StreamingAssets/figuras', { recursive: true }); const texto = JSON.stringify({ figuras });
  writeFileSync(`unity/Assets/StreamingAssets/figuras/${id}.json`, texto);
  console.log(`Figuras de ${id}: ${figuras.length}, ${figuras.reduce((a, f) => a + f.trazos.length, 0)} trazos, ${Math.round(texto.length / 1024)} KB · sin trazos: ${figuras.filter((f) => !f.trazos.length).map((f) => f.nombre).join(', ') || 'ninguna'}`);
}
await navegador.close();
