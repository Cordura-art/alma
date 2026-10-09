// Builds the images of the ALMA docs (artifact/project/assets/<Section>/*.png) from the real components and tokens:
// each scene is a page with alma.css, the component bundle and a small script, photographed by Playwright's Chromium.
// Run after `npm run build`, and again whenever tokens or components change. Usage: node scripts/build-images.mjs [scene…]
// With --entidad <id> the same scenes are drawn with that entity's tokens, into build/documentacion-<id>/assets/.
// Only the scenes that changed are drawn again (see "The cache" below); --forzar draws them all, --paralelo N sets how
// many are drawn at once (4 by default).
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright';
import { componentScenes } from './images/componentes.mjs';
import { patternScenes } from './images/patrones.mjs';
import { iaScenes } from './images/ia.mjs';
import { sistema, aplicar, css as cssEntidad } from './lib/documentacion.mjs';

const P = 'artifact/project';
const read = (p) => readFile(p, 'utf8');
const tok = JSON.parse(await read(`${P}/tokens.json`));
const argv = process.argv.slice(2), ei = argv.indexOf('--entidad');
const ENT = ei >= 0 ? argv.splice(ei, 2)[1] : null;
const S = ENT ? await sistema(ENT) : null;
if (S) aplicar(tok, S);
const DEST = S ? `build/documentacion-${ENT}/assets` : `${P}/assets`;
const catalog = JSON.parse(await read(`${P}/assets/Icons/carbon-icons.json`)).icons;
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs';
const FONTS = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,XTRA@8..144,25..151,100..1000,-200..150,323..603&family=Roboto+Mono:wght@400;500&display=swap';

const ICONS = ['arrow--left', 'arrow--right', 'arrow--up', 'arrow--down', 'close', 'search', 'information', 'warning--alt',
  'bus', 'wallet', 'user', 'checkmark', 'add', 'subtract', 'calendar', 'time', 'location', 'ticket', 'settings',
  'notification', 'menu', 'filter', 'edit', 'trash-can',
  'home', 'launch', 'recently-viewed', 'side-panel--close', 'side-panel--open', 'overflow-menu--horizontal', 'overflow-menu--vertical', 'chevron--down', 'chevron--right',
  'chevron--left', 'share', 'copy', 'money', 'star', 'help', 'information--filled', 'checkmark--filled', 'error--filled', 'warning--filled', 'dashboard', 'map', 'email', 'phone',
  'upload', 'document', 'image', 'favorite', 'receipt', 'purchase', 'locked', 'view', 'download', 'renew', 'task', 'list', 'list--checked', 'shopping--cart', 'idea', 'save',
  'wifi--off', 'user--avatar', 'error', 'warning', 'checkmark--outline', 'text--bold', 'text--italic', 'text--underline', 'list--bulleted', 'list--numbered', 'link', 'draggable',
  'ai-label', 'ai-generate', 'send', 'stop--filled', 'thumbs-up', 'thumbs-down', 'restart', 'microphone', 'undo', 'chat', 'attachment'];
const color = (name) => tok.color.tokens.find((t) => t.name === name);
const family = (f) => Object.fromEntries(tok[f].tokens.map((t) => [t.name, t.value]));
const DATA = {
  themes: tok.color.themes, icons: Object.fromEntries(ICONS.filter((n) => catalog[n]).map((n) => [n, catalog[n]])),
  easing: family('easing'), duration: family('duration'), fontAxis: family('fontAxis'),
  swatch: Object.fromEntries(['brand-lime', 'interactive-01', 'button-filled-bg'].map((n) => [n, color(n)]))
};

// Shared look of every scene: the ALMA page color, Roboto Flex with ALMA's axes, token names in mono.
const BASE = `
body { margin: 0; background: transparent; }
#shot { display: inline-block; padding: var(--space-32); background: var(--ui-02); color: var(--text-01); }
.row { display: flex; gap: var(--space-24); align-items: flex-start; }
.col { display: grid; gap: var(--space-8); align-content: start; }
.cap { margin: 0; color: var(--text-02); }
.tok { font-family: var(--font-mono); font-stretch: 100%; font-variation-settings: normal; font-size: 0.75rem; color: var(--text-02); }
.chip { position: absolute; z-index: 2147483001; padding: 2px var(--space-8); border-radius: var(--radius-chip); background: var(--interactive-01); color: var(--text-on-interactive);
  font-family: var(--font-mono); font-stretch: 100%; font-variation-settings: normal; font-size: 0.6875rem; white-space: nowrap; }
.band { position: absolute; z-index: 2147483000; background: color-mix(in srgb, var(--interactive-01) 38%, transparent); }
*, *::before, *::after { animation: none !important; transition: none !important; }
.pane { padding: var(--space-24); background: var(--ui-02); color: var(--text-01); border: 1px solid var(--border-subtle); border-radius: var(--radius-panel); }
.num { position: absolute; z-index: 2147483002; width: 22px; height: 22px; border-radius: 50%; background: var(--interactive-01); color: var(--text-on-interactive);
  font-family: var(--font-mono); font-stretch: 100%; font-variation-settings: normal; font-size: 12px; font-weight: 500; line-height: 22px; text-align: center; }
.out { position: absolute; z-index: 2147483000; border: 1px dashed var(--interactive-01); border-radius: 4px; pointer-events: none; }
.dim { position: absolute; z-index: 2147483000; border: 0 solid var(--interactive-01); }
.dim.v { border-left-width: 1px; } .dim.hz { border-top-width: 1px; }
.dim::before, .dim::after { content: ""; position: absolute; background: var(--interactive-01); }
.dim.v::before { top: 0; left: -5px; width: 9px; height: 1px; } .dim.v::after { bottom: 0; left: -5px; width: 9px; height: 1px; }
.dim.hz::before { left: 0; top: -5px; width: 1px; height: 9px; } .dim.hz::after { right: 0; top: -5px; width: 1px; height: 9px; }
.device { display: block; border: 1px solid var(--border-subtle); border-radius: 16px; background: var(--ui-02); }
`;

// Measuring helpers: a translucent band over a gap and a chip naming it (used by the spacing scene).
const HELPERS = `
var h = React.createElement, A = AlmaDS;
function box(el) { var r = el.getBoundingClientRect(), s = document.getElementById('shot').getBoundingClientRect(); return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height }; }
function add(cls, x, y, w, hh, text) { var d = document.createElement('div'); d.className = cls; d.style.left = x + 'px'; d.style.top = y + 'px';
  if (w != null) d.style.width = w + 'px'; if (hh != null) d.style.height = hh + 'px'; if (text) d.textContent = text; document.getElementById('shot').appendChild(d); return d; }
function band(x, y, w, hh, text, cx, cy) { add('band', x, y, w, hh); if (text) add('chip', cx != null ? cx : x + w + 4, cy != null ? cy : y + hh / 2 - 9, null, null, text); }
function mount(el) { ReactDOM.createRoot(document.getElementById('app')).render(el); }
function $(s, i) { return document.querySelectorAll(s)[i || 0]; }
function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
var SPACE = { 2: 'space-2', 4: 'space-4', 8: 'space-8', 16: 'space-16', 24: 'space-24', 32: 'space-32', 40: 'space-40', 48: 'space-48', 56: 'space-56', 64: 'space-64', 80: 'space-80' };
function px(v) { return Math.round(v) + ' px'; }
function sp(v) { v = Math.round(v); return v + ' px' + (SPACE[v] ? ' · ' + SPACE[v] : ''); }
// A numbered marker next to an element, with a dashed outline, matching the numbered anatomy list of the guide.
function num(el, n, side, o) {
  o = o || {}; var b = box(el), x, y, d = o.d || 10;
  if (o.outline !== false) add('out', b.x - 3, b.y - 3, b.w + 6, b.h + 6);
  side = side || 'left';
  if (side === 'left') { x = b.x - 22 - d - 3; y = b.y + b.h / 2 - 11; }
  else if (side === 'right') { x = b.x + b.w + d + 3; y = b.y + b.h / 2 - 11; }
  else if (side === 'top') { x = b.x + (o.at != null ? o.at : b.w / 2 - 11); y = b.y - 22 - d - 3; }
  else { x = b.x + (o.at != null ? o.at : b.w / 2 - 11); y = b.y + b.h + d + 3; }
  add('num', x + (o.dx || 0), y + (o.dy || 0), null, null, String(n));
}
// Dimension lines, measured from the rendered element.
function dimH(el, side, label, o) { o = o || {}; var b = box(el), x = side === 'left' ? b.x - (o.d || 14) : b.x + b.w + (o.d || 14);
  add('dim v', x, b.y, 0, b.h); var c = add('chip', 0, b.y + b.h / 2 - 9, null, null, label || px(b.h)); c.style.left = (side === 'left' ? x - c.offsetWidth - 8 : x + 8) + 'px'; }
function dimW(el, side, label, o) { o = o || {}; var b = box(el), y = side === 'top' ? b.y - (o.d || 14) : b.y + b.h + (o.d || 14);
  add('dim hz', b.x, y, b.w, 0); var c = add('chip', 0, 0, null, null, label || px(b.w)); c.style.left = (b.x + b.w / 2 - c.offsetWidth / 2) + 'px'; c.style.top = (side === 'top' ? y - 26 : y + 6) + 'px'; }
function padL(el, cx, cy) { var b = box(el), p = parseFloat(getComputedStyle(el).paddingLeft); band(b.x, b.y, p, b.h, sp(p), cx != null ? cx : b.x - 8 - 120, cy); }
function padT(el, cx, cy) { var b = box(el), p = parseFloat(getComputedStyle(el).paddingTop); band(b.x, b.y, b.w, p, sp(p), cx != null ? cx : b.x + b.w + 12, cy); }
function gapX(a, b2, cx, cy) { var A1 = box(a), B = box(b2), g = B.x - (A1.x + A1.w); band(A1.x + A1.w, Math.min(A1.y, B.y), g, Math.max(A1.h, B.h), sp(g), cx != null ? cx : A1.x + A1.w + g / 2 - 40, cy != null ? cy : Math.max(A1.y + A1.h, B.y + B.h) + 8); }
function gapY(a, b2, cx, cy) { var A1 = box(a), B = box(b2), g = B.y - (A1.y + A1.h); band(Math.min(A1.x, B.x), A1.y + A1.h, Math.max(A1.w, B.w), g, sp(g), cx, cy); }
function rad(el, cx, cy) { var b = box(el), r = parseFloat(getComputedStyle(el).borderTopLeftRadius); add('chip', cx != null ? cx : b.x, cy != null ? cy : b.y - 26, null, null, 'radio ' + px(r)); }
// States without interaction: every :hover / :focus-visible / :active / :focus-within rule is copied to a .st-* class.
function stateCss() {
  var out = [];
  function walk(rules) { for (var i = 0; i < rules.length; i++) { var r = rules[i];
    if (r.cssRules && !r.selectorText) { walk(r.cssRules); continue; }
    if (!r.selectorText || !/:(hover|focus-visible|focus-within|active|visited|focus)\\b/.test(r.selectorText)) continue;
    out.push(r.cssText.replace(r.selectorText, r.selectorText.replace(/:focus-visible/g, '.st-focus').replace(/:focus-within/g, '.st-focus-within').replace(/:hover/g, '.st-hover').replace(/:active/g, '.st-active').replace(/:visited/g, '.st-visited').replace(/:focus\\b/g, '.st-focus'))); } }
  for (var s = 0; s < document.styleSheets.length; s++) { try { walk(document.styleSheets[s].cssRules); } catch (e) {} }
  var st = document.createElement('style'); st.textContent = out.join('\\n'); document.head.appendChild(st);
}
function st(el, state) { el.classList.add('st-' + state); return el; }
// The box of an element's own text (a button label, a link), for markers that point at the words.
function textOf(el) { var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n; while ((n = w.nextNode())) if (n.textContent.trim()) break;
  return { getBoundingClientRect: function () { var r = document.createRange(); r.selectNodeContents(n); return r.getBoundingClientRect(); } }; }
function all(s) { return [].slice.call(document.querySelectorAll(s)); }
// A brand illustration for media slots (cards): pills in the brand colors, read from the tokens at run time.
function brandArt() { var cs = getComputedStyle(document.documentElement), c = function (n) { return cs.getPropertyValue('--' + n).trim(); };
  var pills = [[40, 60, 220, c('brand-lime')], [290, 60, 140, c('brand-steel')], [40, 130, 120, c('brand-steel')], [190, 130, 260, c('brand-lime')], [40, 200, 300, c('brand-steel')]];
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270"><rect width="480" height="270" fill="' + c('brand-ink') + '"/>' + pills.map(function (p) { return '<rect x="' + p[0] + '" y="' + p[1] + '" width="' + p[2] + '" height="44" rx="22" fill="' + p[3] + '"/>'; }).join('') + '</svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); }
function themes(ids, render, o) { o = o || {};
  return h('div', { className: 'row', style: o.style }, ids.map(function (id) { var t = D.themes.filter(function (x) { return x.id === id; })[0];
    return h('div', { key: id, className: 'col' }, o.noLabel ? null : h('p', { className: 'cap web-label-m' }, t.name), h('div', { 'data-theme': id, className: 'pane ' + (o.cls || ''), style: o.paneStyle }, render(id))); })); }
// A device frame: an iframe with its own viewport, for screens with fixed layers (modals, sheets, toasts, tab bars).
function device(o) { return h('div', { className: 'col', key: o.key || o.label }, o.label ? h('p', { className: 'cap web-label-m' }, o.label) : null,
  h('iframe', { className: 'device', width: o.w, height: o.h, style: { width: o.w + 'px', height: o.h + 'px', zoom: o.scale || 1 }, srcDoc: window.__DOC(o.theme || 'dark', o.js, o.after || '') })); }
`;

export const scenes = [
  { file: 'Fundamentos/color-cuatro-temas', alt: 'La misma pantalla de compra de un pasaje en los cuatro temas de ALMA, lado a lado: oscuro, claro, oscuro de alto contraste y claro de alto contraste.',
    js: `mount(h('div', { className: 'row' }, D.themes.map(function (t) {
      return h('div', { key: t.id, className: 'col' }, h('p', { className: 'cap web-label-m' }, t.name),
        h('div', { 'data-theme': t.id, className: 'col scr' },
          h('p', { className: 'web-label-s cap' }, 'Paso 2 de 3 · Pago'),
          h('h2', { className: 'web-h5', style: { margin: 0 } }, 'Confirma tu pasaje'),
          h(A.Card, { headingLevel: 3, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14' }),
          h(A.TextInput, { label: 'Correo', defaultValue: 'camila@correo.cl', helper: 'Te enviaremos el pasaje aquí' }),
          h('div', null, h(A.Tag, { color: 'green' }, 'Asiento reservado')),
          h(A.Button, { variant: 'filled', role: 'primary' }, 'Pagar $7.000')));
    })));`,
    css: `.scr { width: 17rem; padding: var(--space-24); gap: var(--space-16); border-radius: var(--radius-panel); background: var(--ui-02); color: var(--text-01); border: 1px solid var(--border-subtle); }` },

  { file: 'Fundamentos/color-tres-capas', alt: 'Las tres capas de tokens de color: el color base brand-lime alimenta al rol semántico interactive-01, que alimenta al token de componente button-filled-bg, el fondo del botón principal.',
    js: `var S = D.swatch, th = 'dark';
    function node(layer, name, note, extra) {
      var t = S[name], v = typeof t.value === 'string' ? t.value : t.value[th];
      return h('div', { className: 'col node' }, h('p', { className: 'cap web-label-s' }, layer),
        h('div', { className: 'sw', style: { background: 'var(--' + name + ')' } }),
        h('span', { className: 'tok', style: { color: 'var(--text-01)' } }, name), h('span', { className: 'tok' }, v), h('p', { className: 'cap web-body-s' }, note), extra || null);
    }
    function arrow() { return h('div', { className: 'arr' }, h(A.Icon, { name: 'arrow--right', size: 32 })); }
    mount(h('div', { className: 'row', style: { alignItems: 'center' } },
      node('Base', 'brand-lime', 'El color disponible. Nunca directo en una interfaz.'), arrow(),
      node('Semántica', 'interactive-01', 'El papel: la acción principal. Cambia con el tema.'), arrow(),
      node('Componente', 'button-filled-bg', 'Una decisión de un componente.', h('div', null, h(A.Button, { variant: 'filled', role: 'primary' }, 'Pagar $7.000')))));`,
    css: `.node { width: 14rem; } .sw { height: 5rem; border-radius: var(--radius-panel); box-shadow: inset 0 0 0 1px var(--border-subtle); } .arr { color: var(--text-02); padding-top: var(--space-8); }` },

  { file: 'Fundamentos/color-capas-superficie', alt: 'Las cuatro capas de superficie anidadas en tema claro y oscuro: la página ui-02, un contenedor ui-01, un panel ui-03 y una zona ui-04 con los botones interactive-01 e interactive-02.',
    js: `function layer(name, cls, child) { return h('div', { className: 'lay ' + cls, style: { background: 'var(--' + name + ')' } }, h('span', { className: 'tok' }, name), child); }
    function act(name) { return h('div', { className: 'act', style: { background: 'var(--' + name + ')' } }, h('span', { className: 'tok', style: { color: 'var(--text-on-interactive)' } }, name)); }
    mount(h('div', { className: 'row' }, ['light', 'dark'].map(function (id) {
      var t = D.themes.filter(function (x) { return x.id === id; })[0];
      return h('div', { key: id, className: 'col' }, h('p', { className: 'cap web-label-m' }, t.name),
        h('div', { 'data-theme': id }, layer('ui-02', 'l2', layer('ui-01', 'l1', layer('ui-03', 'l3', layer('ui-04', 'l4', h('div', { className: 'col', style: { marginTop: 'var(--space-16)' } }, act('interactive-01'), act('interactive-02'))))))));
    })));`,
    css: `.lay { padding: var(--space-24); display: grid; gap: var(--space-16); } .l2 { width: 26rem; } .l1, .l3 { border-radius: var(--radius-panel); }
    .act { height: 3rem; display: grid; place-items: center; border-radius: var(--radius-button); }` },

  { file: 'Fundamentos/color-pantalla-menu', alt: 'Una pantalla en tema oscuro con sus tokens rotulados: la página en ui-02, una tarjeta en ui-01 con borde border-subtle y un menú abierto en ui-01 con la sombra shadow-floating.',
    js: `mount(h('div', { className: 'row', style: { gap: 'var(--space-64)' } },
      h('div', { className: 'col', style: { width: '16rem', gap: 'var(--space-24)' } },
        h('h2', { className: 'web-h4', style: { margin: 0 } }, 'Mis viajes'),
        h(A.PopUpButton, { label: 'Ordenar por', options: ['Más recientes', 'Precio más bajo', 'Menor duración'], defaultValue: 'Más recientes' })),
      h('div', { className: 'col', style: { gap: 'var(--space-16)', paddingTop: 'var(--space-56)' } },
        h(A.Card, { headingLevel: 3, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14' }),
        h(A.Card, { headingLevel: 3, eyebrow: '4 abr 2026 · 19:10', title: 'Viña del Mar → Santiago', subtitle: 'Salón cama · asiento 3' }))));`,
    click: '.alma-popup__btn',
    after: `var cards = document.querySelectorAll('.alma-card'), menu = document.querySelector('.alma-menu');
      add('chip', 12, 12, null, null, 'ui-02 · página');
      var c = box(cards[1]); add('chip', c.x, c.y + c.h + 8, null, null, 'ui-01 · tarjeta, border-subtle');
      var m = box(menu); add('chip', m.x, m.y + m.h + 8, null, null, 'ui-01 · menú, shadow-floating');`,
    css: `#shot { position: relative; padding-bottom: var(--space-64); } .alma-card { width: 20rem; }` },

  { file: 'Fundamentos/color-grafico', alt: 'Un gráfico de barras de viajes por mes con cuatro series (interurbano, rural, aeropuerto y turismo) y su leyenda, en tema oscuro y claro, con los colores viz-cat-01 a viz-cat-04.',
    js: `var months = ['Ene', 'Feb', 'Mar', 'Abr'], series = ['Interurbano', 'Rural', 'Aeropuerto', 'Turismo'], data = [[82, 40, 26, 58], [74, 44, 30, 64], [90, 38, 34, 46], [68, 50, 28, 40]];
    function chart(id) {
      var t = D.themes.filter(function (x) { return x.id === id; })[0];
      return h('div', { key: id, className: 'col' }, h('p', { className: 'cap web-label-m' }, t.name),
        h('div', { 'data-theme': id, className: 'panel col' },
          h('h3', { className: 'web-h6', style: { margin: 0 } }, 'Viajes por mes, en miles'),
          h('div', { className: 'plot' }, [0, 25, 50, 75, 100].map(function (g) { return h('div', { key: g, className: 'grid', style: { bottom: g * 1.6 + 'px' } }, h('span', { className: 'tok' }, g)); }),
            h('div', { className: 'bars' }, months.map(function (m, i) {
              return h('div', { key: m, className: 'grp' }, h('div', { className: 'set' }, data[i].map(function (v, k) { return h('div', { key: k, className: 'bar', style: { height: v * 1.6 + 'px', background: 'var(--viz-cat-0' + (k + 1) + ')' } }); })),
                h('span', { className: 'tok' }, m));
            }))),
          h('div', { className: 'leg' }, series.map(function (s, k) { return h('span', { key: s, className: 'web-label-s' }, h('i', { style: { background: 'var(--viz-cat-0' + (k + 1) + ')' } }), s); }))));
    }
    mount(h('div', { className: 'row' }, chart('dark'), chart('light')));`,
    css: `.panel { width: 24rem; padding: var(--space-24); gap: var(--space-16); background: var(--ui-01); color: var(--text-01); border-radius: var(--radius-panel); }
    .plot { position: relative; height: 180px; margin: 0 0 20px 28px; } .grid { position: absolute; left: 0; right: 0; border-top: 1px solid var(--border-subtle); }
    .grid .tok { position: absolute; left: -28px; top: -8px; } .bars { position: absolute; inset: 0 0 -20px 0; display: flex; justify-content: space-around; align-items: flex-end; }
    .grp { display: grid; justify-items: center; gap: 4px; } .set { display: flex; gap: 2px; align-items: flex-end; } .bar { width: 12px; }
    .leg { display: flex; flex-wrap: wrap; gap: var(--space-16); color: var(--text-02); } .leg i { display: inline-block; width: 10px; height: 10px; margin-right: 6px; }` },

  { file: 'Fundamentos/espaciado-tarjeta', alt: 'Una tarjeta de viaje con sus medidas de espacio rotuladas: el relleno de la tarjeta, la separación entre textos y la separación entre botones, con sus tokens space-*.',
    js: `mount(h(A.Card, { headingLevel: 2, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14 · Terminal Alameda',
      actions: [h(A.Button, { key: 'a', variant: 'tinted' }, 'Ver pasaje'), h(A.Button, { key: 'b', variant: 'plain' }, 'Cambiar fecha')] }));`,
    after: `var card = document.querySelector('.alma-card'), body = card.querySelector('.alma-card__body') || card.firstElementChild;
      var b = box(body), kids = [].slice.call(body.children).map(box);
      var pl = parseFloat(getComputedStyle(body).paddingLeft), pt = parseFloat(getComputedStyle(body).paddingTop);
      band(b.x, b.y, pl, b.h, pl + ' px · space-' + pl, b.x - 128, b.y + b.h / 2 - 9);
      band(b.x, b.y, b.w, pt, pt + ' px · space-' + pt, b.x + b.w + 12, b.y + pt / 2 - 9);
      for (var i = 1; i < kids.length; i++) { var g = kids[i].y - (kids[i - 1].y + kids[i - 1].h); if (g > 0) band(kids[i].x, kids[i - 1].y + kids[i - 1].h, kids[i].w, g, i === 1 ? Math.round(g) + ' px · space-' + Math.round(g) : null, b.x + b.w + 12); }
      var btns = [].slice.call(card.querySelectorAll('.alma-btn')).map(box);
      if (btns.length > 1) { var gx = Math.round(btns[1].x - (btns[0].x + btns[0].w)); band(btns[0].x + btns[0].w, btns[0].y, gx, btns[0].h, gx + ' px · space-' + gx, btns[0].x, btns[0].y + btns[0].h + 8); }`,
    css: `#shot { position: relative; padding: var(--space-40) 12rem var(--space-64); } .alma-card { width: 22rem; }` },

  { file: 'Fundamentos/espaciado-grilla', alt: 'Las columnas de la grilla sobre tres pantallas: un teléfono de 360 px con 4 columnas, bp-md de 672 px con 8 columnas y bp-lg de 1056 px con 16 columnas.',
    js: `var F = [{ w: 360, n: 4, m: 16, g: 8, label: 'Teléfono (bp-sm) · 4 columnas' }, { w: 672, n: 8, m: 16, g: 32, label: 'bp-md · 672 px · 8 columnas' }, { w: 1056, n: 16, m: 16, g: 32, label: 'bp-lg · 1056 px · 16 columnas' }];
    mount(h('div', { className: 'row', style: { alignItems: 'flex-end' } }, F.map(function (f) {
      var cols = []; for (var i = 0; i < f.n; i++) cols.push(h('div', { key: i, className: 'gc' }));
      return h('div', { key: f.w, className: 'col' },
        h('div', { className: 'frame', style: { width: f.w + 'px' } },
          h('div', { className: 'cols', style: { left: f.m + 'px', right: f.m + 'px', gridTemplateColumns: 'repeat(' + f.n + ', 1fr)', columnGap: f.g + 'px' } }, cols),
          h('div', { className: 'content', style: { left: f.m + 'px', right: f.m + 'px', gridTemplateColumns: 'repeat(' + f.n + ', 1fr)', columnGap: f.g + 'px' } },
            h('div', { className: 'blk', style: { gridColumn: '1 / -1', height: 40 } }),
            h('div', { className: 'blk', style: { gridColumn: '1 / span ' + (f.n / 2), height: 140 } }),
            h('div', { className: 'blk', style: { gridColumn: 'span ' + (f.n / 2), height: 140 } }),
            h('div', { className: 'blk', style: { gridColumn: '1 / span ' + (f.n / 4 * 3), height: 60 } }))),
        h('p', { className: 'cap web-label-s' }, f.label));
    })));`,
    css: `.frame { position: relative; height: 320px; box-sizing: border-box; background: var(--ui-01); border: 1px solid var(--border-subtle); border-radius: var(--radius-panel); zoom: .55; }
    .cols, .content { position: absolute; top: 24px; bottom: 24px; display: grid; } .cols { z-index: 2; } .content { z-index: 1; align-content: start; row-gap: 16px; }
    .gc { background: color-mix(in srgb, var(--interactive-01) 20%, transparent); box-shadow: inset 1px 0 0 color-mix(in srgb, var(--interactive-01) 55%, transparent), inset -1px 0 0 color-mix(in srgb, var(--interactive-01) 55%, transparent); } .blk { background: var(--ui-03); border-radius: var(--radius-chip); }` },

  { file: 'Fundamentos/espaciado-densidad', alt: 'La misma tabla de salidas en densidad normal, con filas de 56 px, y en densidad compacta, con filas de 40 px.',
    js: `var cols = [{ key: 'hora', label: 'Salida' }, { key: 'dest', label: 'Destino' }, { key: 'asiento', label: 'Asiento' }, { key: 'precio', label: 'Precio', align: 'end' }];
    var rows = [{ id: 1, hora: '08:30', dest: 'Viña del Mar', asiento: '14', precio: '$7.000' }, { id: 2, hora: '09:15', dest: 'Valparaíso', asiento: '22', precio: '$6.500' },
      { id: 3, hora: '10:00', dest: 'Rancagua', asiento: '3', precio: '$5.200' }, { id: 4, hora: '11:45', dest: 'Talca', asiento: '9', precio: '$9.900' }];
    function t(d, name) { return h('div', { key: d, className: 'col', 'data-density': d, style: { width: '24rem' } }, h('p', { className: 'cap web-label-m' }, name), h(A.Table, { title: 'Salidas de hoy', columns: cols, rows: rows, headingLevel: 3 })); }
    mount(h('div', { className: 'row' }, t('normal', 'Normal · filas de 56 px'), t('compact', 'Compacta · filas de 40 px')));` },

  { file: 'Iconos/muestra', alt: 'Veinticuatro íconos frecuentes de IBM Carbon en su grilla de 32 px: flechas, cerrar, buscar, información, advertencia, bus, billetera, usuario y otros, con su nombre.',
    js: `A.registerIcons({ icons: D.icons });
    mount(h('div', { className: 'ig' }, Object.keys(D.icons).slice(0, 24).map(function (n) { return h('div', { key: n, className: 'ic' }, h('div', { className: 'kl' }, h(A.Icon, { name: n, size: 32 })), h('span', { className: 'tok' }, n)); })));`,
    css: `.ig { display: grid; grid-template-columns: repeat(6, 8.5rem); gap: var(--space-24) var(--space-16); } .ic { display: grid; justify-items: center; gap: var(--space-8); }
    .kl { padding: 12px; color: var(--icon-01); border-radius: var(--radius-chip); background: var(--ui-01); }
    .kl .alma-ico { outline: 1px dashed var(--border-control); outline-offset: 0; display: block; } .ic .tok { font-size: 0.6875rem; }` },

  { file: 'Movimiento/curvas', alt: 'Las seis curvas de movimiento de ALMA dibujadas: estándar, entrada y salida, en sus versiones productiva y expresiva, con sus puntos de control.',
    js: `var kinds = ['standard', 'entrance', 'exit'], names = { standard: 'Estándar', entrance: 'Entrada', exit: 'Salida' };
    function curve(mode, k) {
      var tokN = 'easing-' + k + '-' + mode, p = D.easing[tokN].match(/-?[\\d.]+/g).map(Number), S = 160, X = function (v) { return 12 + v * S; }, Y = function (v) { return 12 + (1 - v) * S; };
      return h('div', { key: tokN, className: 'col' },
        h('svg', { width: S + 24, height: S + 24, viewBox: '0 0 ' + (S + 24) + ' ' + (S + 24), className: 'cv' },
          h('rect', { x: 12, y: 12, width: S, height: S, className: 'ax' }),
          h('line', { x1: X(0), y1: Y(0), x2: X(p[0]), y2: Y(p[1]), className: 'hd' }), h('line', { x1: X(1), y1: Y(1), x2: X(p[2]), y2: Y(p[3]), className: 'hd' }),
          h('circle', { cx: X(p[0]), cy: Y(p[1]), r: 4, className: 'pt' }), h('circle', { cx: X(p[2]), cy: Y(p[3]), r: 4, className: 'pt' }),
          h('path', { d: 'M' + X(0) + ' ' + Y(0) + ' C' + X(p[0]) + ' ' + Y(p[1]) + ' ' + X(p[2]) + ' ' + Y(p[3]) + ' ' + X(1) + ' ' + Y(1), className: 'ln' })),
        h('p', { className: 'web-label-m', style: { margin: 0 } }, names[k] + ' ' + (mode === 'productive' ? 'productiva' : 'expresiva')), h('span', { className: 'tok' }, tokN), h('span', { className: 'tok' }, p.join(', ')));
    }
    mount(h('div', { className: 'col', style: { gap: 'var(--space-32)' } }, ['productive', 'expressive'].map(function (m) { return h('div', { key: m, className: 'row', style: { gap: 'var(--space-40)' } }, kinds.map(function (k) { return curve(m, k); })); })));`,
    css: `.cv .ax { fill: var(--ui-01); stroke: var(--border-subtle); } .cv .hd { stroke: var(--text-02); stroke-width: 1; stroke-dasharray: 3 3; } .cv .pt { fill: var(--text-02); }
    .cv .ln { fill: none; stroke: var(--interactive-01); stroke-width: 3; stroke-linecap: round; }` },

  { file: 'Movimiento/coreografia', alt: 'Línea de tiempo de la entrada de una pantalla de resultados: estructura, contenido estático, datos, acción principal y gráficos entran separados por 20 ms, y todo termina antes de 500 ms.',
    js: `var G = [['Estructura', 'barras de navegación', 'duration-moderate-02'], ['Contenido estático', 'títulos, texto, imágenes', 'duration-moderate-02'], ['Contenido dinámico', 'resultados de la búsqueda', 'duration-moderate-02'],
      ['Acción principal', 'botón «Comprar»', 'duration-moderate-01'], ['Gráficos', 'ocupación del bus', 'duration-slow-01']];
    var PX = 1.5, L = 17 * 16, st = parseInt(D.duration['duration-stagger'], 10);
    mount(h('div', { className: 'col', style: { gap: 'var(--space-16)' } },
      h('div', { className: 'tl' }, [0, 100, 200, 300, 400].map(function (ms) { return h('div', { key: ms, className: 'tick', style: { left: L + ms * PX + 'px' } }, h('span', { className: 'tok' }, ms + ' ms')); }),
        h('div', { className: 'lim', style: { left: L + 500 * PX + 'px' } }, h('span', { className: 'tok' }, '500 ms: límite')),
        G.map(function (g, i) {
          var d = parseInt(D.duration[g[2]], 10), start = i * st;
          return h('div', { key: g[0], className: 'tr' }, h('div', { className: 'nm' }, h('span', { className: 'web-label-m' }, (i + 1) + '. ' + g[0]), h('span', { className: 'cap web-body-s' }, g[1] + ' · desde ' + start + ' ms')),
            h('div', { className: 'bar', style: { left: L + start * PX + 'px', width: d * PX + 'px' } }, h('span', { className: 'tok' }, g[2] + ' · ' + d + ' ms')));
        })),
      h('p', { className: 'cap web-body-s' }, 'Cada grupo empieza duration-stagger (' + st + ' ms) después del anterior. Las duraciones son un ejemplo con los tokens de ALMA.')));`,
    css: `.tl { position: relative; width: calc(17rem + 750px + 7rem); padding-top: var(--space-24); display: grid; gap: var(--space-8); }
    .tick, .lim { position: absolute; top: 0; bottom: 0; border-left: 1px solid var(--border-subtle); } .tick .tok, .lim .tok { position: absolute; top: 0; left: 4px; white-space: nowrap; }
    .lim { border-left: 2px dashed var(--border-control); } .lim .tok { color: var(--text-01); }
    .tr { position: relative; height: 3rem; } .nm { width: 16rem; display: grid; } .nm .cap { margin: 0; }
    .bar { position: absolute; top: 8px; height: 2rem; border-radius: var(--radius-chip); background: var(--interactive-01); display: flex; align-items: center; padding-left: var(--space-8); box-sizing: border-box; overflow: hidden; }
    .bar .tok { color: var(--text-on-interactive); white-space: nowrap; } .at { position: absolute; top: 16px; white-space: nowrap; }` },

  { file: 'Temas/tarjeta', alt: 'La misma tarjeta de viaje en los cuatro temas de ALMA: oscuro, claro, oscuro de alto contraste y claro de alto contraste.',
    js: `mount(h('div', { className: 'row' }, D.themes.map(function (t) {
      return h('div', { key: t.id, className: 'col' }, h('p', { className: 'cap web-label-m' }, t.name),
        h('div', { 'data-theme': t.id, className: 'pg' }, h(A.Card, { headingLevel: 3, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14 · Terminal Alameda',
          actions: [h(A.Button, { key: 'a', variant: 'tinted' }, 'Ver pasaje'), h(A.Button, { key: 'b', variant: 'plain' }, 'Cambiar')] })));
    })));`,
    css: `.pg { padding: var(--space-24); background: var(--ui-02); border-radius: var(--radius-panel); border: 1px solid var(--border-subtle); } .pg .alma-card { width: 15rem; }` },

  { file: 'Tipografia/alfabeto', alt: 'El alfabeto de Roboto Flex a ancho 100, el normal, y al ancho de ALMA (font-width), con la diferencia de largo marcada.',
    js: `var TXT = 'Santiago → Viña del Mar', AB = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz 0123456789', W = D.fontAxis['font-width'];
    function line(w, label) { var st = { fontStretch: w + '%', fontVariationSettings: '"wdth" ' + w + ', "GRAD" var(--font-grade)' };
      return h('div', { className: 'col ln' }, h('span', { className: 'tok' }, label), h('span', { className: 'web-h3 sample', style: st }, TXT),
        h('div', { className: 'meas' }), h('span', { className: 'web-body-m ab', style: st }, AB)); }
    mount(h('div', { className: 'col', style: { gap: 'var(--space-40)' } }, line(100, 'wdth 100 · el ancho normal de Roboto Flex'), line(W, 'wdth ' + W + ' · font-width, el ancho de ALMA')));`,
    after: `var s = [].slice.call(document.querySelectorAll('.sample')), m = document.querySelectorAll('.meas'), w0 = s[0].getBoundingClientRect().width;
      s.forEach(function (el, i) { var w = el.getBoundingClientRect().width; m[i].style.width = w + 'px'; m[i].textContent = Math.round(w) + ' px' + (i ? ' · ' + Math.round((w / w0 - 1) * 100) + ' % más ancho' : ''); });`,
    css: `.ln { gap: var(--space-8); justify-items: start; } .sample { white-space: nowrap; } .ab { color: var(--text-02); max-width: 48rem; }
    .meas { height: 1.25rem; border: 1px solid var(--interactive-01); border-top: 0; font-family: var(--font-mono); font-stretch: 100%; font-variation-settings: normal; font-size: 0.6875rem; color: var(--text-02); text-align: center; padding-top: 2px; }` },

  { file: 'Tipografia/pagina', alt: 'Una página tipo con los estilos web-h1, web-h4, web-body-m y web-label-s, cada uno con su nombre, tamaño y peso rotulados.',
    js: `var R = [['web-h1', 'h1', 'Mis viajes'], ['web-h4', 'h2', 'Próximo viaje'], ['web-body-m', 'p', 'Tu bus a Viña del Mar sale el martes 31 de marzo a las 08:30 desde el Terminal Alameda. Llega 15 minutos antes para subir con calma.'], ['web-label-s', 'p', 'Asiento 14 · Semicama']];
    mount(h('div', { className: 'tp' }, R.map(function (r) { return h(React.Fragment, { key: r[0] }, h('div', { className: 'meta' }, h('span', { className: 'tok', style: { color: 'var(--text-01)' } }, r[0]), h('span', { className: 'tok' })),
      h(r[1], { className: r[0] + ' tx' }, r[2])); })));`,
    after: `document.querySelectorAll('.meta').forEach(function (m) { var cs = getComputedStyle(m.nextElementSibling); m.lastChild.textContent = parseFloat(cs.fontSize) + ' px · peso ' + cs.fontWeight; });`,
    css: `.tp { display: grid; grid-template-columns: 10rem 36rem; gap: var(--space-24) var(--space-32); align-items: baseline; } .meta { display: grid; gap: 2px; } .tx { margin: 0; }` },
  { file: 'Fundamentos/datos-anatomia', alt: 'Las partes de un gráfico de líneas, numeradas como en la lista: el título con la conclusión (1), la bajada con la unidad y el periodo (2), el área de datos (3), el eje (4), las líneas de guía (5), el nombre de cada serie junto a su línea (6) y el detalle abierto sobre un punto (8). La leyenda (7) no aparece: los nombres caben junto a las líneas.',
    js: `mount(h('div', { style: { width: '40rem', padding: '24px 56px 8px' } }, h(A.LineChart, { title: 'Talca vendió más que Chillán todo el semestre', description: 'Pasajes vendidos por mes · primer semestre de 2026', labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], series: [{ name: 'Talca', values: [1210, 1300, 1840, 1900, 2050, 2240] }, { name: 'Chillán', values: [1180, 1240, 1420, 1390, 1410, 1460] }], unit: 'pasajes' })));`,
    after: `var p = $('.alma-chart__plot'); for (var i = 0; i < 3; i++) { p.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); await sleep(80); } await sleep(200); num($('.alma-chart__title'), 1, 'left'); num($('.alma-chart__desc'), 2, 'left'); num($('.alma-chart__line'), 3, 'bottom', { outline: false, at: 120 }); num($('.alma-chart__axis'), 4, 'left'); num(all('.alma-chart__grid')[3], 5, 'left', { outline: false, d: 40 }); num($('.alma-chart__name'), 6, 'right'); num($('.alma-chart__tip'), 8, 'top');` },

  { file: 'Fundamentos/adaptable-anchos', alt: 'La misma pantalla de viajes en los tres anchos. Angosto: un panel con la lista y TabBar abajo. Medio: la lista y el detalle lado a lado, con TabBar abajo. Amplio: Sidebar a la izquierda, y la lista y el detalle lado a lado.',
    js: `var lista = "h('div', { style: { display: 'grid', gap: '16px', alignContent: 'start' } }, h('h1', { className: 'web-h5', style: { margin: 0 } }, 'Mis viajes'), h(A.Card, { headingLevel: 2, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14' }), h(A.Card, { headingLevel: 2, eyebrow: '4 abr 2026 · 19:10', title: 'Viña del Mar → Santiago', subtitle: 'Salón cama · asiento 3' }))", det = "h('div', { className: 'pane', style: { display: 'grid', gap: '8px', alignContent: 'start' } }, h('p', { className: 'web-label-s', style: { margin: 0, color: 'var(--text-02)' } }, '31 mar 2026 · 08:30'), h('h2', { className: 'web-h5', style: { margin: 0 } }, 'Santiago → Viña del Mar'), h('p', { className: 'web-body-m', style: { margin: 0, color: 'var(--text-02)' } }, 'Semicama · asiento 14 · Terminal Alameda'), h('div', null, h(A.Tag, { color: 'green' }, 'Pagado')))", barra = "h('div', { style: { position: 'absolute', left: 0, right: 0, bottom: 0 } }, h(A.TabBar, { label: 'Secciones', defaultValue: 'viajes', items: [{ value: 'inicio', label: 'Inicio', icon: 'home' }, { value: 'viajes', label: 'Viajes', icon: 'ticket' }, { value: 'billetera', label: 'Billetera', icon: 'wallet' }, { value: 'cuenta', label: 'Cuenta', icon: 'user' }] }))";
    var angosto = "mount(h('div', null, h('div', { style: { padding: '24px 16px' } }, " + lista + "), " + barra + "));";
    var medio = "mount(h('div', null, h('div', { style: { padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' } }, " + lista + ", " + det + "), " + barra + "));";
    var amplio = "mount(h('div', { style: { display: 'flex', gap: '24px', padding: '24px' } }, h(A.Sidebar, { label: 'Secciones', defaultValue: 'viajes', groups: [{ items: [{ value: 'inicio', label: 'Inicio', icon: 'home' }, { value: 'viajes', label: 'Viajes', icon: 'ticket' }, { value: 'billetera', label: 'Billetera', icon: 'wallet' }, { value: 'cuenta', label: 'Cuenta', icon: 'user' }] }] }), h('div', { style: { flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignContent: 'start' } }, " + lista + ", " + det + ")));";
    mount(h('div', { className: 'row', style: { gap: 'var(--space-32)', alignItems: 'flex-end' } }, device({ label: 'Angosto · desde 320 px', w: 390, h: 620, js: angosto, scale: 0.6 }), device({ label: 'Medio · desde 672 px', w: 720, h: 620, js: medio, scale: 0.6 }), device({ label: 'Amplio · desde 1056 px', w: 1120, h: 620, js: amplio, scale: 0.6 })));` },

  { file: 'Fundamentos/profundidad-vidrio', efectos: true, alt: 'Cuatro paneles del mismo tamaño sobre un fondo de luz que se mueve, uno por grosor de vidrio: muy delgado, delgado, medio y grueso. En cada uno el fondo se ve menos. Cada panel lleva escritos los textos que asegura: ninguno el muy delgado, el principal el delgado, el principal y el secundario el medio, y los tres el grueso.',
    js: `var G = [['ultra-thin', 'Muy delgado', 0], ['thin', 'Delgado', 1], ['', 'Medio', 2], ['thick', 'Grueso', 3]], T = [['text-01', 'Texto principal'], ['text-02', 'Texto secundario'], ['text-03', 'Texto terciario']];
    mount(h('div', { className: 'fondo' }, h('div', { className: 'luz', 'aria-hidden': true }), h('div', { className: 'fila' }, G.map(function (g) { return h('div', { key: g[1], className: 'alma-glass' + (g[0] ? ' alma-glass--' + g[0] : '') + ' panel' },
      h('p', { className: 'web-h6', style: { margin: 0 } }, g[1]), h('p', { className: 'tok', style: { margin: 0, color: 'inherit' } }, 'glass-' + (g[0] || 'regular')),
      h('div', { className: 'col', style: { marginTop: 'var(--space-16)', gap: 'var(--space-4)' } }, g[2] ? T.slice(0, g[2]).map(function (t) { return h('p', { key: t[0], className: 'web-body-s', style: { margin: 0, color: 'var(--' + t[0] + ')' } }, t[1]); }) : h(A.Icon, { name: 'image', size: 24 }))); }))));`,
    after: `if (window.AlmaEfectos) AlmaEfectos.presencia($('.luz'), 'fondo'); await sleep(4000);`,
    css: `.fondo { position: relative; width: 60rem; padding: var(--space-48) var(--space-32); border-radius: var(--radius-panel); overflow: hidden; } .luz { position: absolute; inset: 0; }
    .fila { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-24); } .panel { min-height: 11rem; padding: var(--space-24); border-radius: var(--radius-panel); box-shadow: var(--shadow-floating); }` }
];

const ALL = scenes.concat(componentScenes, patternScenes, iaScenes);
export { ALL as allScenes };

// What a scene's picture depends on: every custom property that a CSS rule matching one of its elements reads, or that
// its markup names. Pseudo-classes are dropped before matching, so the set errs on the side of too many.
const DEPS = `window.__deps = function () {
  var used = {}, grab = function (t) { var re = /var\\(\\s*--([\\w-]+)/g, m; while ((m = re.exec(t))) used[m[1]] = 1; };
  var scan = function (doc) {
    var walk = function (rules) { for (var i = 0; i < rules.length; i++) { var r = rules[i];
      if (r.type !== 1) { if (r.cssRules) walk(r.cssRules); continue; }
      // The theme blocks declare the tokens: one token naming another is followed by value, not counted as a use.
      if (/^\\s*(:root|\\[data-theme)/.test(r.selectorText)) { grab(r.cssText.replace(/--[\\w-]+\\s*:[^;]*;?/g, '')); continue; }
      var sel = r.selectorText.split(',').map(function (p) { return p.replace(/:{1,2}[\\w-]+(\\((?:[^()]|\\([^()]*\\))*\\))?/g, '').trim() || '*'; }).join(','), hit = true;
      try { hit = !!doc.querySelector(sel); } catch (e) {}
      if (hit) grab(r.cssText); } };
    for (var i = 0; i < doc.styleSheets.length; i++) { try { walk(doc.styleSheets[i].cssRules); } catch (e) {} }
    var shot = doc.getElementById('shot'); if (shot) grab(shot.outerHTML);
    [].forEach.call(doc.querySelectorAll('iframe'), function (f) { if (f.contentDocument) scan(f.contentDocument); });
  };
  scan(document); return Object.keys(used).sort();
};`;

// The iframe document of device(): same CSS, bundle and helpers; it flags __ready once rendered and its "after" ran.
const DOC = `window.__DOC = function (theme, js, after) {
  return '<!doctype html><html lang="es" data-theme="' + theme + '"><head><meta charset="utf-8">' + document.getElementById('src-head').textContent +
    '<style>body{margin:0;background:var(--ui-02);color:var(--text-01);min-height:100vh}#shot{position:relative;display:block;box-sizing:border-box;width:100%;min-height:100vh}[tabindex="-1"]:focus-visible{outline:none}</style></head><body><div id="shot"><div id="app"></div></div>' +
    window.__LIBS + '<scr' + 'ipt>' + document.getElementById('src-bundle').textContent + '</scr' + 'ipt><scr' + 'ipt>var D = window.parent.D;' +
    document.getElementById('src-helpers').textContent + 'stateCss(); A.registerIcons({ icons: D.icons });' + js + ';(async function(){ await sleep(400); ' + after + '; await sleep(150); window.__ready = true; })();</scr' + 'ipt></body></html>';
};`;

// The document of a scene, built by the same function the documentation site uses to show it live (site/escenas.js).
const escenaDoc = await (async () => { const w = {}; new Function('window', await read('site/escenas.js'))(w); return w.__ESCENA_DOC; })();
// What the site needs to show the scenes live: the shared pieces, and each system's own data.
export { BASE as cssEscenas, HELPERS as ayudantes, DOC as docDispositivo, DATA as datosEscenas, FONTS as fuentesEscenas, escenaDoc };

if (import.meta.url === `file://${process.argv[1]}`) {
  const flag = (name) => { const i = argv.indexOf(name); if (i < 0) return null; return argv.splice(i, 2)[1]; };
  const FORCE = argv.includes('--forzar') ? argv.splice(argv.indexOf('--forzar'), 1).length > 0 : false;
  const PAR = Math.max(1, Number(flag('--paralelo') || 4));
  const only = argv;
  const bundle = await read(`${P}/components/bundle.js`);
  const sheets = [await read('dist/css/alma.css'), await read(`${P}/components/bundle.css`), S ? cssEntidad(S) : '', BASE];
  const css = sheets.join('\n');
  const libs = `<script src="${CDN}/react/18.3.1/umd/react.production.min.js"></script><script src="${CDN}/react-dom/18.3.1/umd/react-dom.production.min.js"></script>`;
  // The cache. A picture is kept while its scene, the code it runs on and the value of every token it depends on are
  // the same: a change of one token redraws only the scenes that read it. The manifest lives in build/, out of the repo.
  const sha = (t) => createHash('sha1').update(t).digest('hex');
  const MANIFEST = `build/cache/imagenes-${ENT || 'alma'}.json`;
  const manifest = !FORCE && existsSync(MANIFEST) ? JSON.parse(await read(MANIFEST)) : {};
  // Token values by theme, read from the style sheets (the theme blocks of alma.css, then the entity's), aliases followed.
  const THEMES = ['dark', 'light', 'dark-hc', 'light-hc'], raw = Object.fromEntries(THEMES.map((th) => [th, {}]));
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = m[1], to = THEMES.filter((th) => /:root/.test(sel) || sel.includes(`[data-theme="${th}"]`));
    if (!/^\s*(?:\/\*[\s\S]*?\*\/\s*)*(:root|\[data-theme)/.test(sel)) continue;
    for (const d of m[2].matchAll(/(?:^|;)\s*--([\w-]+)\s*:\s*([^;]+)/g)) for (const th of to) raw[th][d[1]] = d[2].trim();
  }
  const resolve = (n, th, depth = 0) => (raw[th][n] === undefined || depth > 12 ? '' : raw[th][n].replace(/var\(\s*--([\w-]+)\s*(?:,[^)]*)?\)/g, (_, x) => resolve(x, th, depth + 1)));
  // Everything a scene runs on except token values: those count only for the scenes that read them.
  const sinValores = sheets.map((c) => c.replace(/--[\w-]+\s*:[^;{}]*;?/g, '')).join('\n');
  const comun = sha([bundle, sinValores, HELPERS, DEPS, DOC, FONTS, libs, JSON.stringify(DATA.icons), JSON.stringify(DATA.themes)].join('\u0000'));
  // The effects a scene may show (site/efectos): only those scenes are drawn again when an effect changes.
  const motor = (await Promise.all(['site/reloj.js', 'site/partitura.js', 'site/efectos.js', ...(await readdir('site/efectos')).filter((f) => f.endsWith('.js')).sort().map((f) => `site/efectos/${f}`)].map(read))).join('\n');
  const fuente = (s) => { const code = [s.js, s.after, s.css, s.click, s.efectos ? motor : ''].join('\u0000'); return sha([comun, s.file, code, ...['easing', 'duration', 'fontAxis', 'swatch'].filter((k) => code.includes(k)).map((k) => JSON.stringify(DATA[k]))].join('\u0000')); };
  const llave = (src, deps) => sha(src + deps.map((n) => THEMES.map((th) => resolve(n, th)).join('|')).join('\n'));

  const queue = [];
  let kept = 0;
  for (const s of ALL) {
    if (only.length && !only.some((o) => s.file.includes(o))) continue;
    const src = fuente(s), e = manifest[s.file];
    if (e && e.src === src && existsSync(`${DEST}/${s.file}.png`) && llave(src, e.deps) === e.key) { kept++; continue; }
    queue.push({ s, src });
  }
  let n = 0;
  const failed = [];
  if (queue.length) {
    const browser = await chromium.launch(), context = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1800, height: 1200 } });
    const worker = async () => {
      for (let job = queue.shift(); job; job = queue.shift()) {
        const { s, src } = job;
        for (let attempt = 1; attempt <= 2; attempt++) {
          // A page of its own for every scene: where the pointer was left and whether the last input was the keyboard
          // (which decides if focus shows its ring) would otherwise leak from one scene into the next.
          const page = await context.newPage(), errors = [];
          page.on('pageerror', (e) => errors.push(e.message));
          try {
            // A button clicked with the pointer before the scene loads: what a scene opens with focus (a menu, a popover)
            // is then drawn as after a click, without the focus ring the keyboard would show. The pointer ends off the picture.
            await page.setContent('<button style="position:fixed;left:0;top:0;width:40px;height:40px"></button>');
            await page.mouse.click(20, 20);
            await page.mouse.move(0, 0);
            const html = escenaDoc({ fuentes: FONTS, css, bundle, libs, helpers: HELPERS, doc: DOC, deps: DEPS, datos: DATA, escena: s, motor });
            await page.setContent(html, { waitUntil: 'networkidle' });
            await page.evaluate(() => document.fonts.ready);
            await page.waitForTimeout(250);
            await page.waitForFunction(() => [...document.querySelectorAll('iframe')].every((f) => f.contentWindow && f.contentWindow.__ready), null, { timeout: 30000 });
            if (s.click) { await page.click(s.click); await page.waitForTimeout(200); }
            if (s.after) await page.evaluate(`(async function(){ ${HELPERS}\n${s.after} })()`);
            await page.waitForTimeout(120);
            const out = `${DEST}/${s.file}.png`;
            await mkdir(out.replace(/\/[^/]+$/, ''), { recursive: true });
            const deps = await page.evaluate(() => window.__deps());
            await page.locator('#shot').screenshot({ path: out, animations: 'disabled' });
            manifest[s.file] = { src, deps, key: llave(src, deps) };
            n++;
            console.log(`  ${out}`);
            attempt = 2;
          } catch (e) { if (attempt === 2) { failed.push(s.file); delete manifest[s.file]; console.log(`  ✗ ${s.file}: ${e.message.split('\n')[0]} ${errors.join(' | ')}`); } }
          await page.close();
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(PAR, queue.length) }, worker));
    await browser.close();
    await mkdir('build/cache', { recursive: true });
    await writeFile(MANIFEST, JSON.stringify(manifest));
  }
  if (failed.length) { console.log(`Fallaron ${failed.length}: ${failed.join(', ')}`); process.exitCode = 1; }
  console.log(`Imágenes: ${n} generadas, ${kept} sin cambios`);
}
