// Builds Cordura's site, the page that sells what Cordura makes: one self-contained fragment (the shape an artifact
// takes) from alma.css + the component bundle + the Entidad Cordura token values + this folder's layout and script.
// Only Cordura is shown: the page proves that one language holds at every level and on every support.
// Run from the repo root after `npm run build`:  npm run sitio:cordura  →  build/sitios/cordura.html
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sistema, css as cssEntidad } from '../../scripts/lib/documentacion.mjs';
import { genesDe, generadorNavegador } from '../../scripts/lib/generativo.mjs';

const here = dirname(fileURLToPath(import.meta.url)), read = (p) => readFileSync(p, 'utf8');
const P = 'artifact/project', CDN = 'https://cdnjs.cloudflare.com/ajax/libs';
const OUT = process.argv[2] || 'build/sitios/cordura.html';
const S = await sistema('cordura'), G = genesDe(S);

// What the page says in figures is counted here, so it stays true as ALMA grows.
const componentes = readdirSync(`${P}/components`).filter((n) => statSync(join(`${P}/components`, n)).isDirectory()).length;
const pares = read('tests/contrast-pairs.txt').split('\n').filter((l) => l.includes('|')).length;
const hechos = { componentes, temas: 4, pares, fecha: new Date().toISOString().slice(0, 10) };

// The files the page lets a visitor open are the system's own, cut short: nothing here is written for the page.
const L = JSON.parse(read('entidades/lenguajes/cordura.json')), M = JSON.parse(read('tokens/matriz.json'));
const elige = (o, ks) => Object.fromEntries(ks.map((k) => [k, o[k]]));
const boton = read(`${P}/components/Button/README.md`).split('\n'), desde = boton.findIndex((l) => l.startsWith('#### Cuándo usarlo')), hasta = boton.findIndex((l) => l.startsWith('### Estilos'));
const archivos = [
  { ruta: 'lenguajes/cordura.json', que: 'La voz: cómo se escribe y qué no se dice nunca.', texto: JSON.stringify({ escritura: { reglas: L.escritura.reglas.slice(0, 4) }, tono: { nunca: L.tono.nunca } }, null, 2) },
  { ruta: 'tokens/matriz.json', que: 'El color: cada token ocupa un casillero, en los cuatro temas.', texto: JSON.stringify({ casilleros: elige(M.casilleros, ['interactive-01', 'link-01', 'text-01', 'ui-01', 'ui-02']), pares: M.pares.slice(0, 3) }, null, 1).replace(/\[\n\s+/g, '[').replace(/,\n\s+"(?=[A-Za-z0-9-]+"[,\n\]])/g, ', "').replace(/\n\s+\]/g, ']') },
  { ruta: 'components/Button/README.md', que: 'La guía de un componente: cuándo usarlo y cuándo no.', texto: boton.slice(desde, hasta).join('\n').trim() },
  { ruta: 'tests/contrast-pairs.txt', que: 'Las pruebas: cada texto con su fondo y el contraste que debe cumplir.', texto: read('tests/contrast-pairs.txt').split('\n').slice(0, 9).join('\n') }
];

// The cover is Cordura's scanned bust, drawn in dots (site/escaneo.js): the same piece as its own cover page, with what
// this site says around it. After it, grounds behind it (the veil and the halo), as that page has them.
const E = JSON.parse(read('entidades/escaneos/meleagro.json')), PORTADA = JSON.parse(read('entidades/escaneos/cordura.json'));
const trama = { alma: E.alma, columnas: E.columnas, filas: E.filas, hondos: E.hondos, alto: E.alto, efectos: PORTADA.efectos, puntos: E.puntos };
const puntos = Buffer.from(E.puntos, 'base64').length / (E.alma === 3 ? 10 : 7), miles = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const DATOS = [
  `${miles(puntos)} puntos de un mismo busto. Ninguno eligió su color: lo tomó del sistema.`,
  'El mármol tenía su color. Aquí lleva los nuestros, igual que cada pantalla que hacemos.',
  'Gira con quien lo mira y se ordena al avanzar. Nada llega apurado.',
  'Sentir, esperar, decidir.'
];
const portada = `<a class="skip" href="#sistema">Saltar a qué es el sistema</a>
<section class="escaneo" aria-label="Cordura">
  <div class="escaneo__fija">
    <p class="escaneo__palabra">Cordura</p>
    <figure class="escaneo__figura" role="img" aria-label="Un busto romano de mármol dibujado con miles de puntos en los colores de Cordura. Gira con el puntero. Al desplazar la página, los puntos se separan en cuatro grupos, uno junto a cada frase, y al final se desvanecen y queda un halo que late."><canvas class="escaneo__lienzo" aria-hidden="true"></canvas></figure>
    <div class="escaneo__entrada">
      <h1 class="escaneo__frase"><span>Tu marca, legible para tu equipo</span><span>y para tus agentes.</span></h1>
      <a class="escaneo__accion" href="#inicio">Lee cómo lo hacemos</a>
      <p class="escaneo__pista">Desplaza, y dale tiempo</p>
    </div>
    <ul class="escaneo__datos">
${DATOS.map((d) => `      <li class="escaneo__dato">${d}</li>`).join('\n')}
    </ul>
  </div>
</section>`;
const EFECTOS = ['velo', 'halo', 'desvelar', 'contar', 'inclinar', 'reticula', 'hilos', 'aparecer', 'escalonar'], FIGURAS = ['sello', 'matriz', 'lupa', 'portatil', 'cinta', 'terminal'];
const efectos = [read('site/efectos.js'), ...EFECTOS.map((e) => read(`site/efectos/${e}.js`))].join('\n'), figuras = ['motor', ...FIGURAS].map((n) => read(`figuras/${n}.js`)).join('\n');
const escaneo = `.escaneo { --escaneo-1: ${G.pieza.acento}; --escaneo-2: ${G.pieza.tinta}; --escaneo-3: ${G.pieza.barras[2]}; }
[data-theme="light"] .escaneo, [data-theme="light-hc"] .escaneo { --escaneo-1: ${G.pieza.barras[1]}; --escaneo-2: ${G.fondo.light.tinta}; --escaneo-3: ${G.pieza.barras[3]}; }`;

const css = [read('dist/css/alma.css'), read(`${P}/components/bundle.css`), cssEntidad(S), escaneo, read('site/palabra.css'), read('site/escaneo.css'), read('site/escaneo-efectos.css'), read(join(here, 'pagina.css'))].join('\n');
const bundle = read(`${P}/components/bundle.js`), pieza = read('site/reloj.js') + '\n' + read('site/partitura.js') + '\n' + read('site/palabra.js'), app = read(join(here, 'pagina.js'));
for (const [name, text, bad] of [['bundle.js', bundle, /<\/script|<!--/i], ['palabra.js', pieza + efectos + figuras + read('site/escaneo.js'), /<\/script|<!--/i], ['pagina.js', app, /<\/script|<!--/i], ['CSS', css, /<\/style/i]]) if (bad.test(text)) throw new Error(`${name} cerraría su etiqueta`);

const html = `<title>Cordura</title>
<meta name="description" content="Cordura le da a tu equipo de producto su lenguaje de diseño completo: una sola fuente de verdad para diseño y desarrollo, que se sostiene en cada nivel y en cada soporte.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,XTRA@8..144,25..151,100..1000,-200..150,323..603&family=Roboto+Mono:wght@400;500&display=swap">
<style>
${css}
</style>
${portada}
<div id="app"></div>
<script src="${CDN}/react/18.3.1/umd/react.production.min.js"></script>
<script src="${CDN}/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>
${bundle}
</script>
<script>
${generadorNavegador()}
${pieza}
${efectos}
${figuras}
window.__ESCANEO = ${JSON.stringify(trama)}; window.__PALABRA = ${JSON.stringify({ numeros: G.numeros, ritmo: G.ritmo, direccion: G.direccion, redondez: G.redondez, puntas: G.puntas })};
window.__GENES = ${JSON.stringify({ cordura: G }).replace(/</g, '\\u003c')};
window.__HECHOS = ${JSON.stringify(hechos)};
window.__ARCHIVOS = ${JSON.stringify(archivos).replace(/</g, '\\u003c')};
</script>
<script>window.__TEMA_ANTES = document.documentElement.getAttribute('data-theme');</script>
<script>
${read('site/escaneo.js')}
</script>
<script>(function () { var r = document.documentElement, t = window.__TEMA_ANTES; if (t === null) r.removeAttribute('data-theme'); else r.setAttribute('data-theme', t); })();</script>
<script>
${app}
</script>
`;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`${OUT} · ${(html.length / 1024) | 0} KB · ${componentes} componentes`);
