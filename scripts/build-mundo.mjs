// A page with an entity's planet, drawn in dots and made as one walks it (site/mundo.js). Nothing of the planet is in
// the file: only the entity's genes, which its rule reads. What the page says is entidades/mundos/<entidad>.json
// (`"medida": "contenida"` for an entity that holds back). One file that needs nothing else.
//   node scripts/build-mundo.mjs [entidad …]   →   build/mundo/<entidad>.html (no names: every entity that has one), and
//   <entidad>-artefacto.html: the same page without its outer tags, as a published artifact wants it.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { sistema, css } from './lib/documentacion.mjs';
import { genesDe } from './lib/generativo.mjs';
import { paraArtefacto } from './build-escaneo.mjs';

const FONTS = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,XTRA@8..144,25..151,100..1000,-200..150,323..603&display=swap';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ICONOS = JSON.parse(readFileSync('artifact/project/assets/Icons/carbon-icons.json', 'utf8'));
const icono = (nombre) => `<svg viewBox="${ICONOS.viewBox}" width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false">${(ICONOS.icons || ICONOS)[nombre]}</svg>`;
// The controls: what each does, its icon (IBM Carbon), and whether it is only for whoever flies.
const MANDOS = [['izquierda', 'Girar a la izquierda', 'arrow--left'], ['adelante', 'Avanzar', 'arrow--up'], ['atras', 'Retroceder', 'arrow--down'], ['derecha', 'Girar a la derecha', 'arrow--right'], ['volar', 'Volar', 'plane'], ['bajar', 'Bajar', 'down-to-bottom', true], ['subir', 'Subir', 'up-to-top', true]];

// ALMA's Slider, as its bundle styles it: the page has the component's own rules and writes its markup itself.
const SLIDER = readFileSync('artifact/project/components/bundle.css', 'utf8').split('\n').filter((l) => l.startsWith('.alma-slider')).join('\n');

// What whoever looks can set of the dots: what it is, its name, from where to where, by how much, and where it starts.
const AJUSTES = [['densidad', 'Cantidad', 64, 256, 8, 160], ['tamano', 'Tamaño', 30, 250, 5, 100], ['luz', 'Luz', 0, 100, 5, 80], ['motas', 'Motas en el aire', 0, 300, 10, 100], ['reaccion', 'Reacción al puntero', 0, 200, 10, 100], ['alcance', 'Alcance de la reacción', 40, 300, 10, 100]];

// What the planet's rule reads of an entity: the same genes the Unity planet reads.
export const genesDeMundo = (G, T = {}) => ({ semilla: G.semilla, grupos: G.grupos, redondez: G.redondez, puntas: G.puntas, complejidad: G.complejidad, trazo: G.trazo, focos: G.focos, radio: 1000, ...(T.medida === 'contenida' ? { contenida: true } : {}) });

export async function paginaDeMundo(id) {
  const archivo = `entidades/mundos/${id}.json`; if (!existsSync(archivo)) throw new Error(`No hay una página de mundo para «${id}» en entidades/mundos/.`);
  const T = JSON.parse(readFileSync(archivo, 'utf8')), S = await sistema(id), G = genesDe(S), L = JSON.parse(readFileSync(`entidades/lenguajes/${id}.json`, 'utf8'));
  return `<!doctype html>
<html lang="es" data-theme="dark">
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(T.titulo)}</title>
<meta name="description" content="${esc(T.frase.join(' '))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>
${readFileSync('dist/css/alma.css', 'utf8')}
${css(S)}
/* The three colors of the dots: the entity's own, as its genes give them. The sea, the cold and the bare, and what is green. */
.escaneo { --escaneo-1: ${G.pieza.acento}; --escaneo-2: ${G.pieza.tinta}; --escaneo-3: ${G.pieza.barras[2]}; }
[data-theme="light"] .escaneo { --escaneo-1: ${G.pieza.barras[1]}; --escaneo-2: ${G.fondo.light.tinta}; --escaneo-3: ${G.pieza.barras[3]}; }
${SLIDER}
${readFileSync('site/palabra.css', 'utf8')}
${readFileSync('site/escaneo.css', 'utf8')}
${readFileSync('site/mundo.css', 'utf8')}</style>
<button class="escaneo__tema" type="button" aria-label="Usar tema claro"><span class="escaneo__de-oscuro">${icono('light')}</span><span class="escaneo__de-claro">${icono('asleep')}</span></button>
<main>
  <section class="escaneo mundo" aria-label="${esc(L.nombre)}">
    <div class="escaneo__fija">
      <h1 class="escaneo__palabra">${esc(T.palabra)}</h1>
      <figure class="escaneo__figura" role="img" aria-label="${esc(T.descripcion)}"><canvas class="escaneo__lienzo" aria-hidden="true"></canvas></figure>
      <div class="escaneo__entrada">
        <p class="escaneo__frase">${T.frase.map((f) => `<span>${esc(f)}</span>`).join('')}</p>
        <p class="escaneo__pista">${esc(T.pista)}</p>
      </div>
      <div class="mundo__mandos" role="group" aria-label="Recorrer el planeta">
${MANDOS.map(([m, dice, i, vuelo]) => `        <button class="mundo__mando${vuelo ? ' mundo__mando--vuelo' : ''}" type="button" data-mando="${m}" aria-label="${dice}" title="${dice}"${m === 'volar' ? ' aria-pressed="false"' : ''}>${icono(i)}</button>`).join('\n')}
        <p class="mundo__estado" role="status">A pie</p>
      </div>
      <div class="mundo__ajuste">
        <button class="mundo__mando mundo__abre" type="button" aria-label="Ajustar las partículas" title="Ajustar las partículas" aria-expanded="true" aria-controls="mundo-panel">${icono('settings--adjust')}</button>
        <div class="mundo__panel" id="mundo-panel" role="group" aria-label="Partículas">
${AJUSTES.map(([q, dice, min, max, paso, v]) => `          <div class="alma-slider"><div class="alma-slider__top"><label class="alma-slider__label" for="mundo-${q}">${dice}</label><span class="alma-slider__value${q === 'densidad' ? ' mundo__cuenta' : ''}"></span></div><div class="alma-slider__row"><input class="alma-slider__input" id="mundo-${q}" data-ajuste="${q}" type="range" min="${min}" max="${max}" step="${paso}" value="${v}"></div></div>`).join('\n')}
        </div>
      </div>
    </div>
  </section>
</main>
<script>window.__MUNDO = ${JSON.stringify(genesDeMundo(G, T))}; window.__PALABRA = ${JSON.stringify({ numeros: G.numeros, ritmo: G.ritmo, direccion: G.direccion, redondez: G.redondez, puntas: G.puntas })};</script>
<script>
${readFileSync('site/reloj.js', 'utf8')}
${readFileSync('site/partitura.js', 'utf8')}
${readFileSync('site/palabra.js', 'utf8')}
</script>
<script>
${readFileSync('site/mundo.js', 'utf8')}
</script>
</html>
`;
}

// The entities that have such a page.
export const mundos = () => (existsSync('entidades/mundos') ? readdirSync('entidades/mundos').filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')).sort() : []);

if (process.argv[1] && process.argv[1].endsWith('build-mundo.mjs')) {
  const ids = process.argv.slice(2).length ? process.argv.slice(2) : mundos(); mkdirSync('build/mundo', { recursive: true });
  for (const id of ids) {
    const html = await paginaDeMundo(id); writeFileSync(`build/mundo/${id}.html`, html); writeFileSync(`build/mundo/${id}-artefacto.html`, paraArtefacto(html));
    console.log(`Mundo: build/mundo/${id}.html (${Math.round(html.length / 1024)} KB, un solo archivo)`);
  }
}
