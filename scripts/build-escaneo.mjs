// A page of an entity with a scanned thing at its middle, drawn in dots, and what the entity says laid out around it.
// The scan is the file blender/escaneo.py writes (entidades/escaneos/<escaneo>.json); what the page says is
// entidades/escaneos/<entidad>.json; its colors are the entity's own. One file that needs nothing else.
// A scanned place is walked into instead (`"modo": "recorrido"` in what the page says, which then names its `entidad`),
// and a scanned ground with no walls is flown over (`"modo": "sobrevuelo"`); with `"arena": true`, what is near comes apart into sand.
//   node scripts/build-escaneo.mjs [entidad …]   →   build/escaneo/<entidad>.html (no names: every entity that has one), and <entidad>-artefacto.html: the same
//   page without its outer tags, as a published artifact wants it.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { sistema, css } from './lib/documentacion.mjs';
import { genesDe } from './lib/generativo.mjs';

const FONTS = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,XTRA@8..144,25..151,100..1000,-200..150,323..603&display=swap';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// A weight a person reads: 32 MB, 63 KB.
export const peso = (bytes) => (bytes >= 1e6 ? Math.round(bytes / 1e6) + ' MB' : Math.max(1, Math.round(bytes / 1e3)) + ' KB');
// An icon of ALMA's (IBM Carbon), as the drawing it is.
const ICONOS = JSON.parse(readFileSync('artifact/project/assets/Icons/carbon-icons.json', 'utf8'));
const icono = (nombre) => `<svg viewBox="${ICONOS.viewBox}" width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false">${(ICONOS.icons || ICONOS)[nombre]}</svg>`;
const miles = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export async function paginaDeEscaneo(id) {
  const archivo = `entidades/escaneos/${id}.json`; if (!existsSync(archivo)) throw new Error(`No hay una página de escaneo para «${id}» en entidades/escaneos/.`);
  const T = JSON.parse(readFileSync(archivo, 'utf8')), E = JSON.parse(readFileSync(`entidades/escaneos/${T.escaneo}.json`, 'utf8')), de = T.entidad || id, vuela = T.modo === 'sobrevuelo', anda = T.modo === 'recorrido' || vuela, S = await sistema(de), G = genesDe(S), L = JSON.parse(readFileSync(`entidades/lenguajes/${de}.json`, 'utf8'));
  const trama = { alma: E.alma, columnas: E.columnas, filas: E.filas, hondos: E.hondos, alto: E.alto, ...(vuela ? { vuelo: true } : {}), ...(T.arena ? { arena: true } : {}), puntos: E.puntos }, puntos = Buffer.from(E.puntos, 'base64').length / (E.alma === 3 ? 10 : 7);
  const dice = (s) => esc(s.replace('{puntos}', miles(puntos)).replace('{largo}', Math.round(Math.max(E.columnas, E.hondos) * E.alto / E.filas)).replace('{pesoOrigen}', peso(E.peso || 0)).replace('{pesoTrama}', peso(JSON.stringify(trama).length)));
  return `<!doctype html>
<html lang="es" data-theme="dark">
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(T.titulo)}</title>
<meta name="description" content="${esc(T.frase.join(' '))}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>
${readFileSync('dist/css/alma.css', 'utf8')}
${css(S)}
/* The three colors of the dots, top to bottom: the entity's own, as its genes give them. */
.escaneo { --escaneo-1: ${G.pieza.acento}; --escaneo-2: ${G.pieza.tinta}; --escaneo-3: ${G.pieza.barras[2]}; }
[data-theme="light"] .escaneo { --escaneo-1: ${G.pieza.barras[1]}; --escaneo-2: ${G.fondo.light.tinta}; --escaneo-3: ${G.pieza.barras[3]}; }      /* on a light page: its deeper colors and its ink, which are seen on white */
${readFileSync('site/palabra.css', 'utf8')}
${readFileSync('site/escaneo.css', 'utf8')}
${anda ? readFileSync('site/recorrido.css', 'utf8') : ''}</style>
<button class="escaneo__tema" type="button" aria-label="Usar tema claro"><span class="escaneo__de-oscuro">${icono('light')}</span><span class="escaneo__de-claro">${icono('asleep')}</span></button>
<main>
  <section class="escaneo${anda ? ' recorrido' : ''}" aria-label="${esc(L.nombre)}">
    <div class="escaneo__fija">
      <h1 class="escaneo__palabra">${esc(T.palabra)}</h1>
      <figure class="escaneo__figura" role="img" aria-label="${esc(T.descripcion)}"><canvas class="escaneo__lienzo" aria-hidden="true"></canvas></figure>
      <div class="escaneo__entrada">
        <p class="escaneo__frase">${T.frase.map((f) => `<span>${esc(f)}</span>`).join('')}</p>
        <a class="escaneo__accion" href="${esc(T.accion.destino)}">${esc(T.accion.texto)}</a>
        <p class="escaneo__pista">${esc(T.pista)}</p>
      </div>
      <ul class="escaneo__datos">
${T.datos.map((d) => `        <li class="escaneo__dato">${dice(d)}</li>`).join('\n')}
      </ul>
    </div>
  </section>
  <section class="oficio" id="oficio" tabindex="-1">
    <h2>${esc(L.inicio.titulo)}</h2>
    <p>${esc(L.inicio.lede)}</p>
    <ul>
${L.voz.atributos.map((a) => `      <li><strong>${esc(a[0])}, ${esc(a[1])}</strong><span>${esc(a[2])}</span></li>`).join('\n')}
    </ul>
    <p class="nota">${esc(L.aviso)}</p>
  </section>
</main>
<script>window.__ESCANEO = ${JSON.stringify(trama)}; window.__PALABRA = ${JSON.stringify({ numeros: G.numeros, ritmo: G.ritmo, direccion: G.direccion, redondez: G.redondez, puntas: G.puntas })};</script>
<script>
${readFileSync('site/palabra.js', 'utf8')}
</script>
<script>
${readFileSync(anda ? 'site/recorrido.js' : 'site/escaneo.js', 'utf8')}
</script>
</html>
`;
}

// The entities that have such a page: those whose file says what it says (a scan's own file has no words).
const paginas = (anda) => readdirSync('entidades/escaneos').filter((f) => { const T = f.endsWith('.json') && JSON.parse(readFileSync('entidades/escaneos/' + f, 'utf8')); return T && T.palabra && !!T.modo === anda; }).map((f) => f.replace(/\.json$/, '')).sort();
export const entidadesConEscaneo = () => paginas(false);
// And the pages that walk into a scanned place.
export const recorridos = () => paginas(true);

// The page as a published artifact wants it: what goes inside the document, without the document's own tags.
export const paraArtefacto = (html) => html.replace(/^<!doctype html>\n<html[^>]*>\n/, '').replace(/<\/html>\n?$/, '');

if (process.argv[1] && process.argv[1].endsWith('build-escaneo.mjs')) {
  const ids = process.argv.slice(2).length ? process.argv.slice(2) : [...entidadesConEscaneo(), ...recorridos()]; mkdirSync('build/escaneo', { recursive: true });
  for (const id of ids) {
    const html = await paginaDeEscaneo(id); writeFileSync(`build/escaneo/${id}.html`, html); writeFileSync(`build/escaneo/${id}-artefacto.html`, paraArtefacto(html));
    console.log(`Escaneo: build/escaneo/${id}.html (${Math.round(html.length / 1024)} KB, un solo archivo)`);
  }
}
