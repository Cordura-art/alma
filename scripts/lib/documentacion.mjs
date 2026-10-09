// The documentation of one entity: ALMA's documentation site with the entity's tokens, words and images.
// An entity changes token values, never token names: `sistema()` computes them from the chart, `aplicar()` writes them
// into the artifact's tokens.json shape, `css()` into custom properties, and `palabras()` fills the shared templates
// (entidades/documentacion/plantilla/) and the replacements for the sentences of ALMA's guides that only hold for Cordura.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { genes, colonia, comoFondo } from '../../entidades/generador.mjs';
import { cargarMotor } from './entidades.mjs';

const read = (p) => readFileSync(p, 'utf8');
export const THEMES = ['dark', 'light', 'dark-hc', 'light-hc'];
const mix = (a, b, t) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(a.substr(i, 2), 16) * (1 - t) + parseInt(b.substr(i, 2), 16) * t).toString(16).padStart(2, '0')).join('').toUpperCase();

// The entity's system: every token it changes, by theme (colors) and by family (axes, weights, radii, durations).
export async function sistema(id) {
  const L = JSON.parse(read(`entidades/lenguajes/${id}.json`));
  const En = await cargarMotor();
  const E = En.withCarta({ id: L.id, name: L.nombre, nacimiento: L.nacimiento, color: L.colorHeredado || undefined, variation: 0, type: 'proyector', auth: 'mental', profile: '1/3', def: 'simple', centers: [] });
  const P = En.params(E), a = P.accent, r0 = P.palette[0].ramp;
  // ALMA's primary ramp runs from 50 to 900; the entity's from 100 to 900, so 50 is half way to white.
  const ramp = { 'primary-50': mix(r0[100], '#FFFFFF', 0.5) };
  for (const [k, v] of Object.entries(r0)) ramp[`primary-${k}`] = v;
  const color = { dark: { ...ramp, ...a.dark }, light: { ...ramp, ...a.light }, 'dark-hc': { ...ramp, ...a.dark, ...a.darkHc }, 'light-hc': { ...ramp, ...a.light, ...a.lightHc } };
  const base = JSON.parse(read('dist/json/tokens.json'));
  // A token the entity sets in one theme keeps ALMA's value in the others. It is declared there too: on the root, the
  // dark block (":root") would otherwise win over ALMA's block for the active theme.
  const names = new Set(THEMES.flatMap((th) => Object.keys(color[th])));
  for (const t of base.color.tokens) if (names.has(t.name)) for (const th of THEMES) if (color[th][t.name] === undefined) color[th][t.name] = typeof t.value === 'string' ? t.value : t.value[th];
  const core = {
    fontAxis: { 'font-width': String(P.fontWidth), 'font-grade': String(P.fontGrade) },
    fontWeight: Object.fromEntries(Object.entries(P.weights).map(([k, v]) => [`font-weight-${k}`, String(v)])),
    radius: { ...P.radius },
    duration: Object.fromEntries(base.duration.tokens.map((t) => [t.name, Math.round(parseFloat(t.value) * P.motion.speed) + 'ms']))
  };
  return { id, L, En, E, P, color, core };
}

// Token notes written for Cordura (its lime, its Figma file) do not hold for another entity: keep the sentences that do.
const AJENO = /\blima\b|oliva|Figma|Cordura|piezas de marca|ALMA usa/i;
const USO = {
  'brand-lime': 'Color de marca de la entidad; el token conserva el nombre que tiene en ALMA. Acción primaria y acentos.',
  'interactive-01': 'Color interactivo principal: botón primario.',
  'hover-primary': 'Encima (hover) de interactive-01.',
  'active-primary': 'Presionado de interactive-01.',
  'link-01': 'Enlaces principales; botón fantasma.',
  'font-width': 'Ancho de Roboto Flex (eje wdth, de 25 a 151).',
  'font-grade': 'Grado de Roboto Flex (eje GRAD, de −200 a 150): engrosa o aligera el trazo sin cambiar el ancho del texto.',
  'radius-button': 'Botones: Button, IconButton, Stepper, PopUpButton y SegmentedControl.'
};
export function uso(name, text) {
  if (USO[name]) return USO[name];
  const ramp = /^primary-(\d+)$/.exec(name);
  if (ramp) return `Rampa primaria de la entidad, paso ${ramp[1]}.`;
  return (text || '').split(/(?<=\.)\s+/).filter((s) => !AJENO.test(s)).join(' ');
}

// Writes the entity's values into the artifact's tokens.json shape (the object build-tokens writes). Returns what changed.
export function aplicar(tok, S) {
  const cambios = [];
  for (const t of tok.color.tokens) {
    const antes = typeof t.value === 'string' ? Object.fromEntries(THEMES.map((th) => [th, t.value])) : { ...t.value };
    const ahora = { ...antes };
    for (const th of THEMES) if (S.color[th][t.name] !== undefined) ahora[th] = S.color[th][t.name];
    if (THEMES.some((th) => ahora[th] !== antes[th])) { t.value = ahora; cambios.push({ familia: 'color', name: t.name, antes, ahora }); }
    t.usage = uso(t.name, t.usage);
  }
  for (const [fam, vals] of Object.entries(S.core)) {
    if (tok[fam].note) tok[fam].note = uso('', tok[fam].note);
    for (const t of tok[fam].tokens) {
      t.usage = uso(t.name, t.usage);
      if (vals[t.name] !== undefined && vals[t.name] !== String(t.value)) { cambios.push({ familia: fam, name: t.name, antes: String(t.value), ahora: vals[t.name] }); t.value = vals[t.name]; }
    }
  }
  // Type styles carry a resolved weight; the role each one uses is in the token source.
  const src = JSON.parse(read('tokens/type/styles.json')).type, rol = {};
  for (const g of Object.values(src)) for (const [name, t] of Object.entries(g)) { const m = /font-weight-[a-z]+/.exec(String(t.$value?.fontWeight)); if (m) rol[name] = m[0]; }
  for (const g of tok.type.groups) for (const s of g.styles) { if (rol[s.name]) s.fontWeight = Number(S.core.fontWeight[rol[s.name]]); s.usage = uso(s.name, s.usage); }
  return cambios;
}

// The seed of an entity: its birth. Everything it generates starts from it, so the same entity always draws the same.
export function semilla(S) { const n = S.E.nacimiento; return `nac|${n.fecha}|${n.hora || ''}|${n.zona}`; }

// The same values as custom properties, declared after alma.css on the selectors alma.css uses for each theme.
export function css(S) {
  const sel = { dark: ':root, [data-theme="dark"]', light: '[data-theme="light"]', 'dark-hc': '[data-theme="dark-hc"]', 'light-hc': '[data-theme="light-hc"]' };
  const decl = (o) => Object.entries(o).map(([k, v]) => `  --${k}: ${String(v).replace(/^\{(.+)\}$/, 'var(--$1)')};`).join('\n');
  // The seed of what the entity generates (its pictograms) travels with its values: the Pictogram component reads it.
  let out = `/* Entidad ${S.L.nombre}: los valores de la entidad sobre los tokens de ALMA. */\n:root {\n${Object.values(S.core).map(decl).join('\n')}\n  --pictogram-seed: "${semilla(S)}";\n}\n`;
  for (const th of THEMES) out += `${sel[th]} {\n${decl(S.color[th])}\n}\n`;
  // An entity may ask for everything in glass ("vidrio": true in its language): the same rules for any entity, all tokens.
  if (S.L.vidrio) out += readFileSync(new URL('../../entidades/vidrio.css', import.meta.url), 'utf8');
  return out;
}

// A token's value for the entity's pages: {token:radius-button}, {token:link-01:light}. Aliases are followed.
export function valor(tok, name, theme = 'dark') {
  const c = tok.color.tokens.find((t) => t.name === name);
  if (c) { const v = typeof c.value === 'string' ? c.value : c.value[theme], m = /^\{(.+)\}$/.exec(v); return m ? valor(tok, m[1], theme) : v; }
  for (const f of Object.values(tok)) { const t = f && Array.isArray(f.tokens) && f.tokens.find((x) => x.name === name); if (t) return String(t.value).replace(/(\d)(px|ms)$/, '$1 $2'); }
  throw new Error(`No existe el token "${name}"`);
}

const meta = (src) => {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(src), out = {};
  if (!m) return { meta: out, body: src };
  for (const line of m[1].split('\n')) { const i = line.indexOf(':'); if (i > 0) out[line.slice(0, i).trim()] = line.slice(i + 1).trim(); }
  return { meta: out, body: src.slice(m[0].length).trim() };
};
// Tabs sit under the page's "## <tab>", so their own headings go one level down (outside code fences), as build-docs does.
const demote = (md) => md.split(/(^```[\s\S]*?^```)/m).map((part, i) => (i % 2 ? part : part.replace(/^(#{1,5}) /gm, '#$1 '))).join('');

// What the chart decided, as the conditions ({si profundo}…{sino}…{fin}) and the words ({v:acento}) of the templates.
export function rasgos(S) {
  const { P, L, E, En } = S, T = En.TYPES[E.type], w = P.weights, base = P.shape.base, fw = P.fontWidth, g = P.fontGrade;
  const nombre = (x) => x.name.split(' ')[0].toLowerCase(), acento = nombre(P.palette[0]), profundo = !!P.accent.deep, heredado = !!L.colorHeredado;
  const radios = new Set(Object.entries(P.radius).filter(([k]) => k !== 'radius-checkbox').map(([, v]) => v));
  const pct = Math.round(Math.abs(T.speed - 1) * 100);
  return {
    si: { profundo, heredado, lima: acento === 'lima', cordura: S.id === 'cordura', accionMarca: P.accent.action[600] === P.palette[0].ramp[600], pesosIguales: w.heading === w.body,
      recta: base === 0, suave: base > 0 && base < 100, pildora: base >= 100, radioUnico: radios.size === 1, productivo: T.motion === 'productivo' },
    v: {
      acento, marca: heredado ? `el ${acento} heredado` : `un ${acento} ${profundo ? 'pleno' : 'luminoso'}`, sobre: profundo ? 'blanco' : 'tinta',
      vecinos: `${nombre(P.palette[1])} y ${nombre(P.palette[2])}`, vecino: nombre(P.palette[1]),
      ancho: fw === 100 ? 'en su ancho natural' : fw > 100 ? 'extendida' : 'condensada',
      anchoNota: fw === 100 ? 'El ancho natural de la letra, sin extender ni condensar.' : fw > 100 ? 'La letra extendida: más ancha que su dibujo natural.' : 'La letra condensada: más angosta que su dibujo natural.',
      grado: g === 0 ? 'con grado neutro' : `con un grado levemente más ${g > 0 ? 'firme' : 'liviano'}`,
      gradoNota: g === 0 ? 'El grado neutro: el trazo tal como fue dibujado.' : `Un grado levemente más ${g > 0 ? 'firme: engrosa' : 'liviano: afina'} el trazo sin cambiar el ancho del texto.`,
      forma: base === 0 ? 'ángulos rectos' : base <= 2 ? 'esquinas casi rectas' : base < 24 ? 'esquinas suaves' : base < 100 ? 'esquinas amplias' : 'píldoras',
      estilo: T.motion, ritmo: T.speed === 1 ? 'a la misma velocidad' : `un ${pct} % más ${T.speed > 1 ? 'lento' : 'rápido'}`
    }
  };
}

// The steps of the entity's ramp that the interface uses, and which token uses each one in which theme.
const PAPEL = ['interactive-01', 'hover-primary', 'active-primary', 'link-01', 'nav-selected', 'control-on', 'field-border', 'interactive-04', 'focus'];
const TEMA = { dark: 'oscuro', light: 'claro', 'dark-hc': 'oscuro de alto contraste', 'light-hc': 'claro de alto contraste' };
const lista = (xs) => (xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' y ' + xs[xs.length - 1]);
function tablaRampa(tok) {
  const donde = (ths) => { const k = ths.join(); return k === THEMES.join() ? 'en los cuatro temas' : k === 'dark,dark-hc' ? 'en los temas oscuros' : k === 'light,light-hc' ? 'en los temas claros' : 'en ' + lista(ths.map((th) => TEMA[th])); };
  const rows = [];
  for (const paso of [100, 200, 300, 400, 500, 600, 700, 800, 900]) {
    const hex = valor(tok, `primary-${paso}`), grupos = {};
    for (const n of PAPEL) { const ths = THEMES.filter((th) => valor(tok, n, th).toUpperCase() === hex.toUpperCase()); if (ths.length) (grupos[donde(ths)] = grupos[donde(ths)] || []).push('`' + n + '`'); }
    if (Object.keys(grupos).length) rows.push(`| \`primary-${paso}\` | \`${hex}\` | ${Object.entries(grupos).map(([d, ns]) => `${lista(ns)} ${d}`).join('; ')}. |`);
  }
  return `| Paso | Valor | Quién lo usa |\n|---|---|---|\n${rows.join('\n')}`;
}

// A template of the entity's pages. Conditions and words come from rasgos(); {L:color.lede} is a sentence of the entity's
// design language ({L:grilla.forma:2-2}: only its second sentence); {token:link-01:light} is a token's value.
export function plantilla(src, S, tok, R = rasgos(S)) {
  const si = (c) => { const k = c.replace(/^!/, ''); if (!(k in R.si)) throw new Error(`Condición desconocida en una plantilla: ${c}`); return c[0] === '!' ? !R.si[k] : R.si[k]; };
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  const palabra = (k) => { if (R.v[k] === undefined) throw new Error(`Palabra desconocida en una plantilla: ${k}`); return String(R.v[k]); };
  const frase = (ruta, desde, hasta) => {
    const x = ruta.split('.').reduce((o, k) => (o == null ? o : o[k]), S.L);
    if (typeof x !== 'string') throw new Error(`${S.id}: al lenguaje de diseño le falta "${ruta}"`);
    if (!desde) return x;
    const fs = x.split(/(?<=[.!?])\s+/), a = hasta ? Number(desde) : 1, b = Number(hasta || desde);
    return fs.slice(a - 1, b).join(' ');
  };
  // A line that holds only markers leaves no empty line behind.
  return src.replace(/^((?:\{(?:si !?\w+|sino|fin)\})+)\n/gm, '$1')
    .replace(/\{si (!?\w+)\}([\s\S]*?)(?:\{sino\}([\s\S]*?))?\{fin\}/g, (_, c, a, b) => (si(c) ? a : b || ''))
    .replace(/\{tabla:rampa\}/g, () => tablaRampa(tok))
    .replace(/\{L:([\w.]+)(?::(\d+)(?:-(\d+))?)?\}/g, (_, r, a, b) => frase(r, a, b))
    .replace(/\{v:(\w+)\}/g, (_, k) => palabra(k)).replace(/\{V:(\w+)\}/g, (_, k) => cap(palabra(k)))
    .replace(/\{token:([a-z0-9-]+)(?::([a-z-]+))?\}/g, (_, n, th) => valor(tok, n, th))
    .replace(/\{nombre\}/g, S.L.nombre).replace(/\{id\}/g, S.id).replace(/\{aviso\}/g, S.L.aviso || '');
}

// Every .md under a folder, by its path inside it.
const archivos = (dir, sub = '') => (!existsSync(`${dir}/${sub}`) ? [] : readdirSync(`${dir}/${sub}`).flatMap((f) => (statSync(`${dir}/${sub}${f}`).isDirectory() ? archivos(dir, `${sub}${f}/`) : f.endsWith('.md') ? [`${sub}${f}`] : [])));

// The entity's words: the shared templates (entidades/documentacion/plantilla/) filled with what its chart decided and
// with sentences of its design language. A file with the same path under entidades/documentacion/<id>/ replaces the
// template, and its reemplazos.json adds to (or replaces, by ALMA sentence) the shared replacements.
export function palabras(S, tok) {
  const base = 'entidades/documentacion/plantilla', propia = `entidades/documentacion/${S.id}`, R = rasgos(S);
  const leer = (f) => { const p = existsSync(`${propia}/${f}`) ? `${propia}/${f}` : `${base}/${f}`; const out = plantilla(read(p), S, tok, R), resto = /\{(?:si |sino|fin|[vVL]:|tabla:)[^}]*\}?/.exec(out); if (resto) throw new Error(`${p}: queda sin resolver "${resto[0]}"`); return out; };
  const tabs = {};
  for (const f of [...new Set([...archivos(base), ...archivos(propia)])].sort()) {
    const m = /^(?:elements|guides)\/([^/]+)\/[^/]+\.md$/.exec(f);
    if (!m) continue;
    const p = meta(leer(f));
    if (!p.meta.tab) throw new Error(`${f}: falta "tab" en el encabezado`);
    (tabs[m[1]] = tabs[m[1]] || {})[p.meta.tab] = { body: demote(p.body), summary: p.meta.summary || '' };
  }
  // reemplazos.json: { reemplazos: [[texto de ALMA, texto de la entidad, condición opcional]…], vigentes: [frases que
  //                    siguen siendo ciertas], aspecto: [palabras que delatan una frase sin revisar] }
  const json = (p) => (existsSync(p) ? JSON.parse(read(p)) : {}), B = json(`${base}/reemplazos.json`), O = json(`${propia}/reemplazos.json`);
  const propios = new Set((O.reemplazos || []).map(([de]) => de));
  const pares = [...(B.reemplazos || []).filter(([de]) => !propios.has(de)), ...(O.reemplazos || [])]
    .filter(([, , c]) => !c || (c[0] === '!' ? !R.si[c.slice(1)] : R.si[c])).map(([de, a]) => ({ de, a: plantilla(a, S, tok, R), n: 0 }));
  const adaptar = (text) => {
    for (const p of pares) if (text.includes(p.de)) { p.n++; text = text.split(p.de).join(p.a); }
    // A value written beside its token, as in "`radius-field` (8 px)", follows the entity's token.
    return text.replace(/`((?:duration|radius)-[a-z0-9-]+)` \((\d+) (ms|px)\)/g, (_, n) => '`' + n + '` (' + valor(tok, n) + ')');
  };
  // Words that describe a look the entity does not have. If one survives, a sentence is still describing ALMA.
  const aspecto = O.aspecto || [...(R.si.lima ? [] : ['\\blima\\b', '\\boliva\\b']), ...(R.si.pildora ? [] : ['píldora']), ...(R.si.recta ? ['redondead'] : [])];
  return { inicio: leer('inicio.md'), tabs, adaptar, vigentes: [...(B.vigentes || []), ...(O.vigentes || [])], aspecto, sinUso: () => pares.filter((p) => !p.n).map((p) => p.de) };
}

// Chart series keep ALMA's names, and `vigentes` are the sentences that were checked and still hold.
export function restos(textos, vigentes = [], aspecto = []) {
  if (!aspecto.length) return [];
  const R = new RegExp(aspecto.join('|'), 'i'), out = [];
  for (const [donde, text] of textos) for (const line of String(text || '').split('\n')) {
    if (R.test(line) && !/viz-cat/.test(line) && !vigentes.some((v) => line.includes(v))) out.push(`${donde}: ${line.trim().slice(0, 140)}`);
  }
  return out;
}

// The cover: the entity's signature beside its name. An entity with generative illustration wears its colony, the
// texture of its creatures, or, if it does not use characters, its field (a canvas the page's generator paints once,
// still); the others, the bars of the engine's layout, drawn as SVG.
export function portada(S) {
  const { En, E, P, L } = S, W = 448, H = 420, lay = En.layout(E, P, W, H);
  const x0 = Math.min(...lay.pills.map((p) => p.x)), x1 = Math.max(...lay.pills.map((p) => p.x + p.w));
  const y0 = Math.min(...lay.pills.map((p) => p.y)), y1 = Math.max(...lay.pills.map((p) => p.y + p.h));
  const n = (v) => Math.round(v * 10) / 10;
  const pills = lay.pills.map((p) => `<rect x="${n(p.x)}" y="${n(p.y)}" width="${n(p.w)}" height="${n(p.h)}" rx="${n(p.h / 2 * lay.roundF)}" fill="${p.c}"/>`).join('');
  const sparks = lay.sparks.map((s) => `<path d="M${n(s.x)} ${n(s.y - s.s)}Q${n(s.x)} ${n(s.y)} ${n(s.x + s.s)} ${n(s.y)}Q${n(s.x)} ${n(s.y)} ${n(s.x)} ${n(s.y + s.s)}Q${n(s.x)} ${n(s.y)} ${n(s.x - s.s)} ${n(s.y)}Q${n(s.x)} ${n(s.y)} ${n(s.x)} ${n(s.y - s.s)}Z" fill="var(--secondary-700)"/>`).join('');
  const T = En.TYPES[E.type], A = En.AUTH[E.auth];
  const style = `.ecv{position:relative;display:grid;grid-template-columns:1fr 1fr;align-items:center;width:960px;height:300px;box-sizing:border-box;padding:var(--space-32) var(--space-40);gap:var(--space-40);background:var(--brand-ink);color:var(--text-01);overflow:hidden}
.ecv__txt{display:grid;gap:var(--space-8);align-content:center}.ecv__eyebrow{margin:0;color:var(--text-02)}.ecv__name{margin:0;line-height:1}.ecv__tag{margin:0;color:var(--text-02)}
.ecv__art{width:100%;height:236px}.ecv__art--gen{border-radius:var(--radius-panel);background-repeat:repeat}`;
  const gen = L.ilustracion && L.ilustracion.generativa, tok = gen ? JSON.parse(read('dist/json/tokens.json')) : null;
  const G = gen ? genes(S, (name, theme) => valor(tok, name, theme)) : null, pers = !!gen && gen.personajes !== false;
  const fondo = pers ? comoFondo(colonia(G, 'portada', { modo: 'pieza' })) : '';
  if (fondo.includes("'")) throw new Error('La colonia de la portada trae una comilla simple');
  const arte = pers ? `<div class="ecv__art ecv__art--gen" aria-hidden="true" style='background-image:${fondo}'></div>`
    : gen ? '<canvas id="ecv-campo" class="ecv__art ecv__art--gen" width="840" height="472" aria-hidden="true"></canvas>'
    : `<svg class="ecv__art" viewBox="${n(x0)} ${n(y0 - 8)} ${n(x1 - x0)} ${n(y1 - y0 + 16)}" preserveAspectRatio="xMaxYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${pills}${sparks}</svg>`;
  const markup = `<style>${style}</style><div class="ecv" data-theme="dark"><div class="ecv__txt"><p class="ecv__eyebrow web-label-m">${T.name} ${E.profile} · ${A.name}</p><p class="ecv__name web-display-s">${L.nombre}</p><p class="ecv__tag web-body-l">${L.inicio.titulo}</p></div>
${arte}</div>`;
  // The field, drawn once at twice the size of its box (420 × 236) and left still.
  const code = gen && !pers ? `var cv = document.getElementById('ecv-campo'), GEN = window.__GENERADOR;
if (cv && GEN) { var ctx = cv.getContext('2d'), F = GEN.campo(${JSON.stringify(G)}, 'portada', 420, 236); ctx.setTransform(2, 0, 0, 2, 0, 0); ctx.fillStyle = F.base; ctx.fillRect(0, 0, F.ancho, F.alto); for (var i = 0; i < 90; i++) { F.avanzar(); GEN.pintarCampo(ctx, F); } }` : '';
  return { markup, code };
}

// "Origen": how the chart became the system, and every token the entity changes, generated from the engine.
export function origen(S, cambios) {
  const { En, E, P, L } = S, T = En.TYPES[E.type], A = En.AUTH[E.auth], [p, d] = E.profile.split('/');
  const centros = E.centers.map((c) => En.CENTERS.find((x) => x.id === c).name).join(', ');
  const w = P.weights, coma = (v) => String(v).replace('.', ',');
  const c = (v) => '`' + v + '`';
  // Values as the reader writes them: "0 px", "88 ms", and an alias by the name of its token.
  const v = (x) => String(x).replace(/^\{(.+)\}$/, 'alias de `$1`').replace(/^(\d+)(px|ms)$/, '$1 $2');
  let md = `## De la carta al sistema\n\nCada valor de este sistema sale de una regla de **Entidades ALMA** aplicada a la carta de la entidad. Ninguno se eligió a mano.\n\n`;
  md += `| Rasgo de la carta | Qué decide | Resultado |\n|---|---|---|\n`;
  md += `| Tipo: ${T.name} | El movimiento: ${T.motion}, a × ${coma(T.speed)} de la duración de ALMA. | ${c('duration-moderate-01')} = ${S.core.duration['duration-moderate-01'].replace('ms', ' ms')} |\n`;
  md += `| Línea consciente ${p} | El ancho de la letra. | ${c('font-width')} = ${P.fontWidth} |\n`;
  md += `| Línea inconsciente ${d} | La forma (${P.shape.note}) y el grado de la letra. | ${c('radius-button')} = ${P.radius['radius-button'].replace('px', ' px')} · ${c('font-grade')} = ${P.fontGrade} |\n`;
  md += `| Autoridad: ${A.name} | Los pesos de la letra: display, títulos, texto y énfasis. | ${w.display} / ${w.heading} / ${w.body} / ${w.emphasis} |\n`;
  md += `| Centros definidos: ${centros} | El tono y la saturación del color${P.accent.deep ? '; con la Garganta definida, un acento profundo con texto blanco' : ''}. | ${c('interactive-01')} = ${c(P.accent.dark['interactive-01'])} |\n`;
  md += `| Armonía del ${T.name} | Los colores de apoyo. | ${P.palette.map((x) => `${x.role}: ${x.name.toLowerCase()}`).join(' · ')} |\n\n`;
  md += `Nacimiento de la entidad: ${L.fechaLarga || L.nacimiento.fecha}.\n\n`;
  md += `## Lo que cambia frente a ALMA\n\n${cambios.length} tokens cambian de valor. Ninguno cambia de nombre: lo que está hecho con ALMA funciona aquí sin tocar una línea.\n\n`;
  const fam = { fontAxis: 'Letra: ejes', fontWeight: 'Letra: pesos', radius: 'Radios', duration: 'Duraciones' };
  for (const [k, title] of Object.entries(fam)) {
    const rows = cambios.filter((x) => x.familia === k);
    if (rows.length) md += `### ${title}\n\n| Token | ALMA | Entidad |\n|---|---|---|\n${rows.map((x) => `| ${c(x.name)} | ${v(x.antes)} | ${v(x.ahora)} |`).join('\n')}\n\n`;
  }
  const col = cambios.filter((x) => x.familia === 'color');
  md += `### Color\n\nValores del tema oscuro y del claro. Los de alto contraste están en la pestaña **Tokens** de la página Color.\n\n| Token | ALMA, oscuro | Entidad, oscuro | ALMA, claro | Entidad, claro |\n|---|---|---|---|---|\n`;
  md += col.map((x) => `| ${c(x.name)} | ${v(x.antes.dark)} | ${v(x.ahora.dark)} | ${v(x.antes.light)} | ${v(x.ahora.light)} |`).join('\n') + '\n\n';
  md += `## Lo que no cambia\n\n- **Los nombres de los tokens.** Incluso ${c('brand-lime')}: aquí guarda el color de marca de la entidad.\n- **Los neutros.** Fondos, capas, texto y bordes son los de ALMA.\n- **Los componentes.** Los mismos componentes, con el mismo código y la misma accesibilidad.\n- **El espacio, la grilla y los íconos.** Múltiplos de 8, la misma grilla y los mismos íconos.\n- **Los colores de estado.** Error, éxito, advertencia e información.\n`;
  return md;
}
