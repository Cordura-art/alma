// Builds the ALMA documentation site as ONE self-contained page (build/alma-site.html):
// ALMA's CSS and component bundle, the repo's guides and tokens, the live previews, and site/{site.css,app.js}.
// Run after `npm run build`. Usage: node scripts/build-site.mjs [output path]
// With --entidad <id> it builds that entity's documentation instead (build/documentacion-<id>/index.html): the same
// site with the entity's token values, its pages (the templates in entidades/documentacion/plantilla/) and its images
// (node scripts/build-images.mjs --entidad <id>).
import { readdir, readFile, writeFile, mkdir, stat, copyFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { generadorNavegador } from './lib/generativo.mjs';
import { allScenes, cssEscenas, ayudantes, docDispositivo, datosEscenas, fuentesEscenas } from './build-images.mjs';
import { sistema, aplicar, css as cssEntidad, palabras, restos, portada, origen } from './lib/documentacion.mjs';

const args = process.argv.slice(2), ei = args.indexOf('--entidad');
const ENT = ei >= 0 ? args.splice(ei, 2)[1] : null;
if (ei >= 0 && !ENT) throw new Error('Uso: node scripts/build-site.mjs --entidad <id>');
const OUT = args[0] || (ENT ? `build/documentacion-${ENT}/index.html` : 'build/alma-site.html');
const P = 'artifact/project';
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs';
const LIBS = ['react/18.3.1/umd/react.production.min.js', 'react-dom/18.3.1/umd/react-dom.production.min.js',
  'marked/12.0.2/marked.min.js', 'dompurify/3.1.6/purify.min.js'];

const read = (p) => readFile(p, 'utf8');
// The pictures the docs link as assets/<Section>/<name>.png are not files here: each one is a scene (the same code
// build-images.mjs photographs for the ALMA artifact) that the page shows live, with the values of its system.
const exists = (p) => stat(p).then(() => true, () => false);

// A preview document: line 1 is the @dsCard marker, then markup, then one <script>.
function parsePreview(src) {
  const marker = /^<!--\s*@dsCard([^]*?)-->\s*/.exec(src);
  const attrs = {};
  if (marker) for (const m of marker[1].matchAll(/(\w+)(?:=(?:"([^"]*)"|(\S+)))?/g)) attrs[m[1]] = m[2] ?? m[3] ?? true;
  const rest = marker ? src.slice(marker[0].length) : src;
  const i = rest.indexOf('<script>'), j = rest.lastIndexOf('</script>');
  // The gallery-frame workarounds do not apply inside the site: drop them.
  const code = (i < 0 ? '' : rest.slice(i + 8, j))
    .split('\n').filter((l) => !/gallery frame makes html|documentElement\.style\.setProperty\('background'|document\.body\.style\.margin/.test(l)).join('\n')
    // A dialog preview starts open to fill its gallery frame; on the site it would cover the page, so it starts closed.
    .replace(/React\.useState\(true\), open = /g, 'React.useState(false), open = ');
  return { attrs, pv: { markup: (i < 0 ? rest : rest.slice(0, i)).trim(), code } };
}

// A component guide: "# Name", summary paragraph, then "## Section" blocks (the four tabs when complete).
function parseGuide(src) {
  const body = src.replace(/^# .*\n+/, '');
  const parts = body.split(/^## (.+)$/m);
  const intro = parts[0].trim();
  const summary = intro.split(/\n\s*\n/)[0].replace(/\s+/g, ' ').trim();
  const sections = [];
  for (let k = 1; k < parts.length; k += 2) sections.push({ title: parts[k].trim(), body: parts[k + 1].trim() });
  return { summary, sections, body: intro.slice(intro.split(/\n\s*\n/)[0].length).trim() + (parts.length > 1 ? '\n\n' + body.slice(parts[0].length) : '') };
}

// An entity: its token values over ALMA's, its words over ALMA's guides.
const tok = JSON.parse(await read(`${P}/tokens.json`));
const S = ENT ? await sistema(ENT) : null;
const cambios = S ? aplicar(tok, S) : [];
const W = S ? palabras(S, tok) : null;
const adapt = (text) => (W ? W.adaptar(text) : text);
// A foundation or guide page of the entity: its own tabs replace ALMA's, by tab name.
const propias = (slug, page) => {
  const own = W && W.tabs[slug];
  if (!own) return page;
  const sections = page.sections.map((sec) => (own[sec.title] ? { title: sec.title, body: own[sec.title].body } : sec));
  for (const title of Object.keys(own)) if (!page.sections.some((sec) => sec.title === title)) throw new Error(`${ENT}: "${slug}" no tiene la pestaña "${title}"`);
  return { ...page, sections, summary: Object.values(own).map((t) => t.summary).filter(Boolean)[0] || page.summary };
};

const bundle = await read(`${P}/components/bundle.js`);
const almaCss = [await read('dist/css/alma.css'), await read(`${P}/components/bundle.css`)].join('\n'), entidadCss = S ? cssEntidad(S) : '', siteCss = await read('site/site.css');
const css = [almaCss, entidadCss, siteCss].join('\n');
const app = await read('site/app.js');
// An entity whose cover is its field (generative illustration, no characters) needs the generator on the page.
const GENV = S && S.L.ilustracion.generativa, campoPortada = GENV && GENV.personajes === false ? `</script>\n<script>\n${generadorNavegador()}\n` : '';
for (const [name, text, bad] of [['bundle.js', bundle, /<\/script|<!--/i], ['app.js', app, /<\/script|<!--/i], ['CSS', css, /<\/style/i]]) {
  if (bad.test(text)) throw new Error(`${name} contiene una secuencia que cerraría la etiqueta en línea`);
}

// Component order: the bundle header's catalogue, then any other folder with a preview or guide.
const header = JSON.parse(/@ds-bundle: (\{.*\}) \*\//.exec(bundle)[1]);
const dirs = (await readdir(`${P}/components`)).filter((d) => !/\./.test(d) && d !== 'Cover' && d !== 'lib' && d !== 'src');
const order = [...new Set([...header.components.map((c) => c.name), ...dirs.sort()])].filter((d) => dirs.includes(d));

const components = [];
for (const name of order) {
  const dir = `${P}/components/${name}`;
  const pv = (await exists(`${dir}/preview.html`)) ? parsePreview(await read(`${dir}/preview.html`)) : null;
  const guide = (await exists(`${dir}/README.md`)) ? parseGuide(adapt(await read(`${dir}/README.md`))) : { summary: '', sections: [], body: '' };
  components.push({ name, group: pv?.attrs.group || 'Otros', subtitle: adapt(pv?.attrs.subtitle || ''), preview: pv?.pv || null, ...guide });
}

// Foundations pages, generated by build-docs as Fundamentos-<order>-<slug>.md: one guide each, tabs as "## <tab>".
const elements = {};
for (const f of (await readdir(P)).filter((f) => /^Fundamentos-\d+-.+\.md$/.test(f)).sort()) {
  const src = adapt(await read(`${P}/${f}`)), slug = f.replace(/^Fundamentos-\d+-|\.md$/g, '');
  elements[slug] = propias(slug, { name: /^# (.+)$/m.exec(src)[1], ...parseGuide(src) });
}

// Guides (accessibility, content), generated by build-docs as Guias-<order>-<slug>.md; patterns straight from docs/patterns.
const guides = {};
for (const f of (await readdir(P)).filter((f) => /^Guias-\d+-.+\.md$/.test(f)).sort()) {
  const src = adapt(await read(`${P}/${f}`)), slug = f.replace(/^Guias-\d+-|\.md$/g, '');
  guides[slug] = propias(slug, { name: /^# (.+)$/m.exec(src)[1], ...parseGuide(src) });
}
const patterns = [];
for (const f of (await readdir('docs/patterns')).filter((f) => f.endsWith('.md')).sort((a, b) => parseInt(a) - parseInt(b))) {
  const src = adapt(await read(`docs/patterns/${f}`));
  const m = /^---\n([\s\S]*?)\n---\n/.exec(src), meta = {};
  for (const line of m[1].split('\n')) { const i = line.indexOf(':'); if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim(); }
  patterns.push({ slug: f.replace(/^\d+-|\.md$/g, ''), name: meta.pattern, summary: meta.summary, body: src.slice(m[0].length).trim() });
}

// Effects: one page each from docs/efectos; a page with an id shows that effect live (site/efectos/<id>.js).
const efectos = [];
for (const f of (await readdir('docs/efectos')).filter((f) => f.endsWith('.md')).sort((a, b) => parseInt(a) - parseInt(b))) {
  const src = adapt(await read(`docs/efectos/${f}`));
  const m = /^---\n([\s\S]*?)\n---\n/.exec(src), meta = {};
  for (const line of m[1].split('\n')) { const i = line.indexOf(':'); if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim(); }
  efectos.push({ slug: f.replace(/^\d+-|\.md$/g, ''), name: meta.efecto, id: meta.id || null, familia: meta.familia, summary: meta.summary, body: src.slice(m[0].length).trim() });
}
// (in the menu: the collection first, then each family together)
const FAMILIAS = ['Efectos', 'Fondo', 'Reacción', 'Transición', 'Texto'];
efectos.sort((a, b) => FAMILIAS.indexOf(a.familia) - FAMILIAS.indexOf(b.familia));
const motorEfectos = [await read('site/reloj.js'), await read('site/partitura.js'), await read('site/efectos.js'), ...(await Promise.all(efectos.filter((e) => e.id).map((e) => read(`site/efectos/${e.id}.js`))))].join('\n');

const families = {};
for (const [k, v] of Object.entries(tok)) if (k !== 'color' && v && Array.isArray(v.tokens)) families[k] = { note: v.note || '', tokens: v.tokens };

const TITLE = S ? `Documentación Entidad ${S.L.nombre}` : 'Documentación ALMA';
const content = S ? {
  site: { nombre: `Entidad ${S.L.nombre}`, titulo: TITLE, h1: `Sistema de diseño de la Entidad ${S.L.nombre}`, grupo: `Entidad ${S.L.nombre}`,
    docs: { id: 'origen', label: 'Origen', icon: 'compass', title: 'Origen', summary: 'De dónde sale cada valor del sistema y qué cambia frente a ALMA.' },
    pie: ` Los valores son los de la Entidad ${S.L.nombre}, calculados por Entidades ALMA desde su carta.` },
  readme: W.inicio,
  docs: origen(S, cambios),
  pending: null,
  cover: portada(S),
} : {
  readme: await read(`${P}/README.md`),
  docs: (await read(`${P}/Documentacion.md`)).replace(/^# .*\n+/, ''),
  pending: (await read(`${P}/Pendientes.md`)).replace(/^# .*\n+/, ''),
  cover: parsePreview(await read(`${P}/components/Cover/preview.html`)).pv,
};
Object.assign(content, {
  tokens: { themes: tok.color.themes, color: tok.color.tokens, type: tok.type.groups, families },
  components,
  elements,
  guides,
  patterns,
  efectos
});
if (S) {
  // Every replacement must still find its sentence in ALMA's guides, and no sentence may still describe Cordura's look.
  const sinUso = W.sinUso();
  if (sinUso.length) throw new Error(`${ENT}: reemplazos que ya no encuentran su texto en las guías de ALMA:\n  ${sinUso.join('\n  ')}`);
  const textos = [['Inicio', content.readme]];
  for (const c of components) for (const sec of c.sections) textos.push([`${c.name} · ${sec.title}`, sec.body]);
  for (const c of components) textos.push([c.name, c.summary + '\n' + c.body + '\n' + c.subtitle]);
  for (const [k, e] of Object.entries({ ...elements, ...guides })) { textos.push([k, e.summary]); for (const sec of e.sections) textos.push([`${k} · ${sec.title}`, sec.body]); }
  for (const pt of patterns) textos.push([`Patrón ${pt.slug}`, pt.summary + '\n' + pt.body]);
  for (const ef of efectos) textos.push([`Efecto ${ef.slug}`, ef.summary + '\n' + ef.body]);
  for (const t of tok.color.tokens) textos.push([`token ${t.name}`, t.usage]);
  const left = restos(textos, W.vigentes, W.aspecto);
  if (left.length) throw new Error(`${ENT}: ${left.length} textos todavía describen un aspecto que la entidad no tiene:\n  ${left.join('\n  ')}`);
}
// Live scenes: the pieces every system shares travel once; a system's own data (its durations, its swatches) with its content.
const { icons: iconosEscenas, ...datosSistema } = datosEscenas;
content.escena = datosSistema;
const escenas = JSON.stringify({ fuentes: fuentesEscenas, base: cssEscenas, helpers: ayudantes, doc: docDispositivo, iconos: iconosEscenas,
  libs: LIBS.slice(0, 2).map((l) => `<script src="${CDN}/${l}"></script>`).join(''),
  lista: Object.fromEntries(allScenes.map((s) => [s.file, { js: s.js, after: s.after, css: s.css, click: s.click, efectos: s.efectos }])) }).replace(/</g, '\\u003c');
const json = JSON.stringify(content).replace(/</g, '\\u003c');

const html = `<title>${TITLE}</title>
<meta name="description" content="${S ? `Sistema de diseño de la Entidad ${S.L.nombre}, hecho con ALMA` : 'Sistema de diseño de Cordura'}: guías, tokens y componentes en vivo.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,XTRA@8..144,25..151,100..1000,-200..150,323..603&family=Roboto+Mono:wght@400;500&display=swap">
<style id="alma-css">
${almaCss}
</style>${S ? `\n<style id="alma-entidad">\n${entidadCss}</style>` : ''}
<style>
${siteCss}
</style>
<div id="app"></div>
${LIBS.map((l) => `<script src="${CDN}/${l}"></script>`).join('\n')}
<script id="alma-bundle">
${bundle}
</script>
<script>
${campoPortada.replace(/^<\/script>\n<script>\n/, '')}${await read('site/escenas.js')}
</script>
<script id="alma-efectos">
${motorEfectos}
</script>
<script type="application/json" id="alma-escenas">${escenas}</script>
<script type="application/json" id="alma-content">${json}</script>
<script>
${app}
</script>
`;
await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, html);
// The entity's values alone, to load after alma.css in any product.
if (S) await writeFile(`${dirname(OUT)}/entidad-${ENT}.css`, cssEntidad(S));
console.log(`Sitio: ${OUT} (${(html.length / 1024).toFixed(0)} KB, ${components.length} componentes, ${allScenes.length} escenas en vivo)`);
