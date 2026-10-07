// A line figure of ALMA's as one page that needs nothing else: the system's tokens, the engine (figuras/motor.js), the
// figure (figuras/<nombre>.js), and around it what a figure is shown with: what it says, how strongly it answers, and
// the theme.   node scripts/build-figura.mjs <nombre> [entidad]   →   build/figuras/<nombre>[-<entidad>].html
// With an entity, the figure is that entity's own (its genes decide it) and wears its accent.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

const FONTS = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,XTRA@8..144,25..151,100..1000,-200..150,323..603&display=swap';
export function paginaDeFigura(nombre, rasgos = null, entidad = '') {
  const figura = `figuras/${nombre}.js`; if (!existsSync(figura)) throw new Error(`No hay una figura «${nombre}» en figuras/.`);
  const titulo = nombre[0].toUpperCase() + nombre.slice(1) + (entidad ? ' de ' + entidad : ''), acento = rasgos && rasgos.pieza ? rasgos.pieza.barras[1] : '';
  return `<!doctype html>
<html lang="es" data-theme="dark">
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo} · Figuras ALMA</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>
${readFileSync('dist/css/alma.css', 'utf8')}
${acento ? `.alma-figura { --figura-acento: ${acento}; }      /* the entity's own color, as its genes give it */\n` : ''}html { color-scheme: dark; } html[data-theme="light"] { color-scheme: light; }
body { margin: 0; background: var(--ui-02); color: var(--text-01); font-family: var(--font-flex), system-ui, sans-serif; font-weight: var(--font-weight-body); font-variation-settings: 'wdth' var(--font-width), 'GRAD' var(--font-grade); }
main { box-sizing: border-box; max-width: 46rem; margin: 0 auto; padding: var(--space-48) var(--space-16); display: grid; gap: var(--space-24); }
h1 { margin: 0; font-size: 1.75rem; line-height: 1.2; font-weight: var(--font-weight-heading); }
p { margin: 0; max-width: 60ch; color: var(--text-02); line-height: 1.5; }
.dice { min-height: 1.5em; color: var(--text-01); font-variant-numeric: tabular-nums; }
.mandos { display: flex; flex-wrap: wrap; gap: var(--space-24); align-items: center; }
.mandos label { display: flex; gap: var(--space-16); align-items: center; color: var(--text-02); flex: 1 1 16rem; min-width: 0; }
input[type="range"] { flex: 1; min-width: 0; accent-color: var(--interactive-01); height: var(--space-24); }
button { font: inherit; font-variation-settings: inherit; color: var(--text-01); background: transparent; border: 1px solid var(--border-control); border-radius: var(--radius-button); padding: var(--space-8) var(--space-16); min-height: var(--space-48); cursor: pointer; transition: border-color var(--duration-fast-02) var(--easing-standard-productive); }
button:hover { border-color: var(--text-01); }
button:focus-visible, input:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { button { transition: none; } }
</style>
<main>
  <h1>${titulo}</h1>
  <p id="que"></p>
  <div id="figura"></div>
  <p class="dice" id="dice" aria-hidden="true"></p>
  <div class="mandos">
    <label>Intensidad <input id="intensidad" type="range" min="0" max="1" step="0.01" value="0.5"></label>
    <button id="tema" type="button" aria-pressed="false">Tema claro</button>
  </div>
  <p>Mueve el puntero sobre la figura, o entra en ella con el tabulador y usa las flechas. Escape la deja en reposo.</p>
</main>
<script>
${readFileSync('figuras/motor.js', 'utf8')}
${readFileSync(figura, 'utf8')}
(function () {
  var F = AlmaFigura.figuras[${JSON.stringify(nombre)}], dice = document.getElementById('dice'); document.getElementById('que').textContent = F.describe;
  var f = AlmaFigura.monta(document.getElementById('figura'), ${JSON.stringify(nombre)}, { genes: ${JSON.stringify(rasgos)}, intensidad: 0.5, alLeer: function (t) { dice.textContent = t; } }); window.__figura = f;
  document.getElementById('intensidad').addEventListener('input', function (e) { f.pon({ intensidad: +e.target.value }); });
  var tema = document.getElementById('tema');
  tema.addEventListener('click', function () { var claro = document.documentElement.getAttribute('data-theme') !== 'light'; document.documentElement.setAttribute('data-theme', claro ? 'light' : 'dark'); tema.setAttribute('aria-pressed', String(claro)); f.pon({}); });
})();
</script>
</html>
`;
}

if (process.argv[1] && process.argv[1].endsWith('build-figura.mjs')) {
  const nombre = process.argv[2], id = process.argv[3]; if (!nombre) { console.error('Uso: npm run figura -- <nombre> [entidad]   (las hay en figuras/)'); process.exit(1); }
  let rasgos = null, quien = '';
  if (id) { const { genesParaFuera } = await import('./genes.mjs'), { rasgosDe } = await import('./lib/figuras.mjs'); const E = await genesParaFuera(id); rasgos = rasgosDe(E); quien = E.nombre; }
  const sale = `build/figuras/${nombre}${id ? '-' + id : ''}.html`; mkdirSync('build/figuras', { recursive: true }); const html = paginaDeFigura(nombre, rasgos, quien); writeFileSync(sale, html);
  console.log(`Figura: ${sale} (${Math.round(html.length / 1024)} KB, un solo archivo)`);
}
