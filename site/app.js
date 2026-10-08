// ALMA documentation site: the repo's guides, tokens and live previews, drawn with ALMA's own components.
// In the build with a selector (scripts/build-selector.mjs) the page holds several systems, ALMA and its entities:
// window.__SISTEMAS lists them, each with its content, its token values, its images and (an entity) its design language,
// and the site starts again on a switch.
(function () {
  'use strict';
  var SIS = window.__SISTEMAS || null, mounted = null, watcher = null;
  // The pictures of the guides are scenes shown live (see escenaHtml below). A scene's frame tells the page its size
  // when it is done; the frame is as wide as the camera's window, and its box scales it to the column.
  var vivas = {}, serie = 0;
  function ajustar(el) {
    if (!el.__w || !el.parentNode) return;
    var k = Math.min(2, el.parentNode.clientWidth / el.__w), f = el.querySelector('iframe');
    el.style.width = Math.floor(el.__w * k) + 'px'; el.style.height = Math.floor(el.__h * k) + 'px';
    if (f) { f.style.height = Math.max(1200, el.__h) + 'px'; f.style.transform = 'scale(' + k + ')'; }
  }
  window.addEventListener('message', function (e) {
    var d = e.data, el = d && d.almaEscena ? vivas[d.almaEscena] : null;
    if (!el) return;
    el.__w = d.w; el.__h = d.h; el.setAttribute('data-on', 'lista'); ajustar(el);
  });
  window.addEventListener('resize', function () { Object.keys(vivas).forEach(function (k) { if (vivas[k].isConnected) ajustar(vivas[k]); else delete vivas[k]; }); });
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }
  };
  // An entity's content travels as what differs from ALMA's (scripts/lib/delta.mjs): the page rebuilds it from ALMA's.
  function aplicarDelta(a, d) {
    if (d === undefined) return a;
    if ('$v' in d) return d.$v;
    var i, k, out;
    if (d.$l) { out = a.split('\n'); for (i in d.$l) out[i] = d.$l[i]; return out.join('\n'); }
    if (d.$a) { out = a.slice(0, d.$n); for (i = 0; i < d.$n; i++) if (i in d.$a) out[i] = aplicarDelta(a[i], d.$a[i]); return out; }
    out = {}; var sin = d.$x || [];
    Object.keys(a).forEach(function (k) { if (sin.indexOf(k) < 0) out[k] = a[k]; });
    Object.keys(d.$o).forEach(function (k) { out[k] = aplicarDelta(a[k], d.$o[k]); });
    if (d.$k) { var en = {}; d.$k.forEach(function (k) { en[k] = out[k]; }); return en; }
    return out;
  }
  var contenidos = {};
  function contenido(id) {
    if (contenidos[id]) return contenidos[id];
    var json = function (x) { var el = document.getElementById(x); return el ? JSON.parse(el.textContent) : null; };
    var propio = json(id ? 'alma-content-' + id : 'alma-content'), d = propio ? null : json('alma-delta-' + id);
    return (contenidos[id] = propio || aplicarDelta(contenido('alma'), d === null ? undefined : d));
  }
  function isSystem(v) { return SIS.some(function (s) { return s.id === v; }); }
  function start(sisId) {
  var h = React.createElement, useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, useMemo = React.useMemo;
  var A = window.AlmaDS;
  var C = contenido(SIS ? sisId : '');
  var root = document.documentElement;
  // Each system's token values sit in a style sheet that only applies while it is chosen.
  var ESC = (function () { var el = document.getElementById('alma-escenas'); return el && window.__ESCENA_DOC ? JSON.parse(el.textContent) : null; })();
  function textoDe(sel) { var el = document.querySelector(sel); return el ? el.textContent : ''; }
  // The document of a scene, with ALMA's styles, the values of the system on screen and the scene's own code.
  function escenaHtml(id, n) {
    var cssSistema = SIS ? textoDe('style[data-sistema="' + sisId + '"]') : textoDe('#alma-entidad');
    return window.__ESCENA_DOC({ fuentes: ESC.fuentes, css: textoDe('#alma-css') + '\n' + cssSistema + '\n' + ESC.base, bundle: textoDe('#alma-bundle'), libs: ESC.libs,
      helpers: ESC.helpers, doc: ESC.doc, datos: Object.assign({ icons: ESC.iconos }, C.escena), escena: ESC.lista[id], vivo: n });
  }
  // A scene starts when it comes near the screen. Nothing inside it can be reached: it is a picture, named by its text.
  function encender(el) {
    var n = 'e' + (++serie), f = document.createElement('iframe');
    vivas[n] = el; el.setAttribute('data-on', 'cargando');
    f.setAttribute('aria-hidden', 'true'); f.setAttribute('tabindex', '-1'); f.setAttribute('inert', ''); f.setAttribute('scrolling', 'no');
    f.srcdoc = escenaHtml(el.getAttribute('data-escena'), n);
    el.appendChild(f);
    setTimeout(function () { if (el.getAttribute('data-on') === 'cargando') el.setAttribute('data-on', 'falla'); }, 20000);
  }
  var mirador = window.IntersectionObserver ? new IntersectionObserver(function (es) {
    es.forEach(function (x) { if (x.isIntersecting) { mirador.unobserve(x.target); encender(x.target); } });
  }, { rootMargin: '600px' }) : null;
  function vivir() {
    [].forEach.call(document.querySelectorAll('.escena:not([data-on])'), function (el) { el.setAttribute('data-on', 'espera'); if (mirador) mirador.observe(el); else encender(el); });
  }
  if (watcher) watcher.disconnect();
  if (ESC) { watcher = new MutationObserver(vivir); watcher.observe(document.getElementById('app'), { childList: true, subtree: true }); }
  if (SIS) [].forEach.call(document.querySelectorAll('style[data-sistema]'), function (el) { el.media = el.getAttribute('data-sistema') === sisId ? 'all' : 'not all'; });
  function change(v) { if (!isSystem(v) || v === sisId) return; store.set('alma-sistema', v); start(v); }
  // An entity's design language (site/lenguaje.js), nested here: its pages join the site's, under their own routes.
  var LANG = SIS && window.__LENGUAJE_HACER && window.__LENGUAJES && window.__LENGUAJES[sisId] ? window.__LENGUAJE_HACER(window.__LENGUAJES[sisId], 'l-') : null;
  root.lang = 'es';
  // The site's own names: ALMA's, or an entity's when the page documents one (scripts/build-site.mjs --entidad).
  var SITE = Object.assign({ nombre: 'ALMA', titulo: 'Documentación ALMA', h1: 'ALMA, sistema de diseño de Cordura', grupo: 'ALMA', pie: '',
    docs: { id: 'novedades', label: 'Novedades y avance', icon: 'notification', title: 'Novedades y avance', summary: 'Qué cambió en ALMA y cómo va la documentación frente a IBM Carbon.' } }, C.site || {});

  // ---- Themes: dark by default (ALMA), the viewer's choice is remembered on this device.
  var THEMES = C.tokens.themes; // [{id, name}]
  function isTheme(v) { return THEMES.some(function (t) { return t.id === v; }); }
  function firstTheme() {
    var saved = store.get('alma-theme');
    if (isTheme(saved)) return saved;
    var host = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    return window.matchMedia && matchMedia('(prefers-contrast: more)').matches ? host + '-hc' : host;
  }
  function paint(theme) { root.setAttribute('data-theme', theme); root.style.colorScheme = theme.indexOf('light') === 0 ? 'light' : 'dark'; }

  // ---- Markdown: marked + DOMPurify, then ALMA classes (type styles by name, ALMA Table, Link).
  var HEAD = { H2: 'web-h4', H3: 'web-h5', H4: 'web-h6', H5: 'web-label-l' };
  var mdCache = {};
  function slug(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  // Inside a tab there is no h2 above the guide's ### headings: lift every heading one level (outside code fences).
  function lift(src) { return src.split(/(^```[\s\S]*?^```)/m).map(function (part, i) { return i % 2 ? part : part.replace(/^#(#{2,5}) /gm, '$1 '); }).join(''); }
  function renderMd(src, shift) {
    var key = (shift ? '1' : '0') + src;
    if (mdCache[key]) return mdCache[key];
    var t = document.createElement('template');
    t.innerHTML = DOMPurify.sanitize(marked.parse(shift ? lift(src) : src, { gfm: true }));
    var f = t.content;
    // A picture of the guides becomes the box of its scene, named by the picture's text.
    if (ESC) f.querySelectorAll('img[src^="assets/"]').forEach(function (el) {
      var id = el.getAttribute('src').replace(/^assets\//, '').replace(/\.png$/, '');
      if (!ESC.lista[id]) return;
      var caja = document.createElement('span');
      caja.className = 'escena'; caja.setAttribute('data-escena', id); caja.setAttribute('role', 'img'); caja.setAttribute('aria-label', el.getAttribute('alt') || '');
      el.replaceWith(caja);
    });
    f.querySelectorAll('h2,h3,h4,h5').forEach(function (el) { el.className = HEAD[el.tagName]; el.id = 'm-' + slug(el.textContent); });
    f.querySelectorAll('a[href]').forEach(function (a) {
      a.className = 'alma-link';
      if (/^https?:/.test(a.getAttribute('href'))) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    });
    var names = {};
    f.querySelectorAll('table').forEach(function (tb) {
      var wrap = document.createElement('div'); wrap.className = 'alma-table-wrap';
      var sc = document.createElement('div'); sc.className = 'alma-table-scroll'; sc.tabIndex = 0; sc.setAttribute('role', 'region');
      // Name each scroll region after the nearest heading above it; number repeats so every region is distinct.
      var prev = tb.previousElementSibling;
      while (prev && !/^H\d$/.test(prev.tagName)) prev = prev.previousElementSibling;
      var name = 'Tabla: ' + (prev ? prev.textContent : 'sin título');
      names[name] = (names[name] || 0) + 1;
      sc.setAttribute('aria-label', names[name] > 1 ? name + ' (' + names[name] + ')' : name);
      tb.className = 'alma-table';
      tb.parentNode.insertBefore(wrap, tb); sc.appendChild(tb); wrap.appendChild(sc);
    });
    // Wide code scrolls sideways: make each block reachable and named, so the keyboard can scroll it (WCAG 2.1.1).
    f.querySelectorAll('pre').forEach(function (pre, i) { pre.tabIndex = 0; pre.setAttribute('role', 'region'); pre.setAttribute('aria-label', 'Ejemplo de código ' + (i + 1)); });
    f.querySelectorAll('blockquote').forEach(function (q) { if (/^\s*Imagen pendiente/.test(q.textContent)) q.className = 'is-pending'; });
    var div = document.createElement('div'); div.appendChild(f);
    return (mdCache[key] = div.innerHTML);
  }
  function Md(p) { return h('div', { className: 'md web-body-m', dangerouslySetInnerHTML: { __html: renderMd(p.src, p.shift) } }); }
  // Two search landmarks can share a page (toolbar and a filter): give each its own name.
  function Named(p) {
    var ref = useRef(null);
    useEffect(function () { var s = ref.current.querySelector('[role="search"]'); if (s) s.setAttribute('aria-label', p.name); });
    return h('div', { ref: ref, className: p.className }, p.children);
  }

  // ---- Live previews: the artifact's preview documents, mounted in place (ids namespaced, script scoped).
  var seq = 0;
  function Preview(p) {
    var ref = useRef(null);
    useEffect(function () {
      var el = ref.current, before = Array.prototype.slice.call(document.head.children), ns = 'pv' + (++seq) + '-';
      el.innerHTML = p.pv.markup.replace(/\bid="([^"]+)"/g, 'id="' + ns + '$1"');
      var bodyBefore = Array.prototype.slice.call(document.body.children);
      // Record the React roots the preview creates, so leaving the page unmounts them (and their portals).
      var roots = [], createRoot = ReactDOM.createRoot;
      ReactDOM.createRoot = function () { var r = createRoot.apply(ReactDOM, arguments); roots.push(r); return r; };
      var s = document.createElement('script');
      s.textContent = '(function(){\n' + p.pv.code.replace(/getElementById\((['"])([^'"]+)\1\)/g, "getElementById('" + ns + "$2')") + '\n})();';
      try { el.appendChild(s); } finally { ReactDOM.createRoot = createRoot; }
      return function () {
        roots.forEach(function (r) { try { r.unmount(); } catch (e) { /* already gone */ } });
        Array.prototype.slice.call(document.head.children).forEach(function (n) { if (before.indexOf(n) < 0) n.remove(); });
        Array.prototype.slice.call(document.body.children).forEach(function (n) { if (bodyBefore.indexOf(n) < 0) n.remove(); });
        el.innerHTML = '';
      };
    }, [p.pv]);
    return h('div', { ref: ref, className: p.className || 'pv' });
  }
  function Cover() {
    var frame = useRef(null), inner = useRef(null);
    useEffect(function () {
      function fit() { inner.current.style.transform = 'scale(' + frame.current.clientWidth / 960 + ')'; }
      fit();
      var ro = window.ResizeObserver ? new ResizeObserver(fit) : null;
      if (ro) ro.observe(frame.current); else window.addEventListener('resize', fit);
      return function () { if (ro) ro.disconnect(); else window.removeEventListener('resize', fit); };
    }, []);
    return h('div', { className: 'cover', ref: frame, 'aria-hidden': 'true' },
      h('div', { className: 'cover__scale', ref: inner }, h(Preview, { pv: C.cover, className: 'cover__art' })));
  }

  // ---- Tables
  function Tbl(p) {
    return h('div', { className: 'doc' },
      p.title ? h('h2', { className: 'web-h5', id: 't-' + slug(p.title), style: { margin: '0 0 var(--space-8)' } }, p.title) : null,
      p.note ? h('p', { className: 'doc__note web-body-s' }, p.note) : null,
      h('div', { className: 'alma-table-wrap' },
        h('div', { className: 'alma-table-scroll', tabIndex: 0, role: 'region', 'aria-label': 'Tabla: ' + (p.title || p.label) },
          h('table', { className: 'alma-table' },
            h('thead', null, h('tr', null, p.cols.map(function (c) { return h('th', { key: c, scope: 'col' }, c); }))),
            h('tbody', null, p.rows.map(function (r, i) { return h('tr', { key: i }, r.map(function (c, j) { return h('td', { key: j }, c); })); }))))));
  }
  function Head(p) {
    return h('header', { className: 'head' },
      p.eyebrow ? h('p', { className: 'head__eyebrow web-label-s' }, p.eyebrow) : null,
      h('h1', { className: 'head__title web-h2', tabIndex: -1, id: 'page-title' }, p.title),
      p.summary ? h('p', { className: 'head__summary web-body-l' }, p.summary) : null,
      p.meta ? h('div', { className: 'head__meta' }, p.meta) : null);
  }
  function tokenValue(t, theme) {
    var v = typeof t.value === 'string' ? t.value : (t.value[theme] !== undefined ? t.value[theme] : t.value[THEMES[0].id]);
    return String(v);
  }
  var code = function (s) { return h('code', { className: 'mono' }, s); };

  // ---- Pages
  function Home() {
    return h(React.Fragment, null,
      h('h1', { className: 'sr', tabIndex: -1, id: 'page-title' }, SITE.h1),
      h(Cover),
      h(Md, { src: C.readme }),
      h('p', { className: 'foot web-body-s' }, 'Esta página se genera desde el repositorio ',
        h('a', { className: 'alma-link', href: 'https://github.com/Cordura-art/alma', target: '_blank', rel: 'noopener noreferrer' }, 'Cordura-art/alma'),
        '. Los textos, los tokens y las vistas previas son los mismos del repositorio.' + SITE.pie));
  }
  function Docs() {
    return h(React.Fragment, null, h(Head, { eyebrow: 'Sistema de diseño', title: SITE.docs.title, summary: SITE.docs.summary }), h(Md, { src: C.docs }));
  }
  function Pending() {
    var imgs = /Imágenes por crear \((\d+)\)/.exec(C.pending), reads = /lectores de pantalla \((\d+)\)/.exec(C.pending);
    return h(React.Fragment, null,
      h(Head, { eyebrow: 'Sistema de diseño', title: 'Pendientes', summary: 'Todo lo que falta crear en ALMA, generado desde los documentos del repositorio. Cada imagen pendiente también se marca en magenta dentro de su página.',
        meta: [imgs ? h(A.Tag, { key: 'i', color: 'magenta' }, imgs[1] + ' imágenes') : null, reads ? h(A.Tag, { key: 'r', color: 'magenta' }, reads[1] + ' pruebas con lectores') : null] }),
      h(Md, { src: C.pending.replace(/^[\s\S]*?(?=## )/, '') }));
  }
  // ---- Foundations: the prose tabs from docs/elements plus a live "Tokens" tab.
  function ColorTokens(p) {
    var q = useState(''), query = q[0];
    var groups = useMemo(function () {
      var out = [], idx = {};
      C.tokens.color.forEach(function (t) {
        if (query && (t.name + ' ' + (t.usage || '')).toLowerCase().indexOf(query.toLowerCase()) < 0) return;
        var stem = t.name.split('-')[0];
        if (!idx[stem]) { idx[stem] = { stem: stem, items: [] }; out.push(idx[stem]); }
        idx[stem].items.push(t);
      });
      return out;
    }, [query]);
    var themeName = (THEMES.filter(function (t) { return t.id === p.theme; })[0] || THEMES[0]).name;
    return h(React.Fragment, null,
      h('p', { className: 'doc__note web-body-s' }, C.tokens.color.length + ' tokens. Las muestras y los valores son los del tema ' + themeName.toLowerCase() + '; cámbialo arriba para comparar.'),
      h(Named, { className: 'filter', name: 'Filtrar tokens de color' }, h(A.SearchField, { label: 'Buscar token de color', placeholder: 'Buscar por nombre o uso', value: query, onChange: q[1] })),
      groups.length ? groups.map(function (g) {
        return h(Tbl, { key: g.stem, title: g.stem, cols: ['Muestra', 'Token', 'Valor', 'Uso'], rows: g.items.map(function (t) {
          return [h('span', { className: 'swatch', style: { background: 'var(--' + t.name + ')' } }), code(t.name), code(tokenValue(t, p.theme)), t.usage || ''];
        }) });
      }) : h('p', { className: 'muted web-body-m' }, 'Ningún token coincide con «' + query + '».'));
  }
  function TypeTokens() {
    return h(React.Fragment, null,
      familyTable('fontAxis', 'Ejes de Roboto Flex'),
      h('p', { className: 'doc__note web-body-s' }, 'Las muestras de más de 4 rem se ven reducidas.'),
      C.tokens.type.map(function (g) {
        return h(Tbl, { key: g.name, title: g.name, cols: ['Muestra', 'Estilo', 'Tamaño · interlineado · peso', 'Uso'], rows: g.styles.map(function (s) {
          var rem = parseFloat(s.fontSize), big = /rem$/.test(s.fontSize) && rem > 4;
          return [h('span', { className: 'type-sample ' + s.name, style: big ? { fontSize: '4rem' } : null }, 'Movimiento'),
            code(s.name), code(s.fontSize + ' · ' + s.lineHeight + ' · ' + s.fontWeight), s.usage || ''];
        }) });
      }));
  }
  function familyTable(key, title, sample) {
    var f = C.tokens.families[key]; if (!f) return null;
    return h(Tbl, { key: key, title: title, note: f.note, cols: sample ? ['Muestra', 'Token', 'Valor', 'Uso'] : ['Token', 'Valor', 'Uso'], rows: f.tokens.map(function (t) {
      var row = [code(t.name), code(t.value), t.usage || ''];
      return sample ? [sample(t)].concat(row) : row;
    }) });
  }
  function SpaceTokens() {
    return h(React.Fragment, null,
      familyTable('spacing', 'Espaciado', function (t) { return h('span', { className: 'bar', style: { width: 'var(--' + t.name + ')' } }); }),
      familyTable('radius', 'Radios', function (t) { return h('span', { className: 'corner', style: { borderRadius: 'var(--' + t.name + ')' } }); }),
      familyTable('size', 'Tamaños de control'),
      familyTable('grid', 'Grilla'),
      familyTable('breakpoint', 'Puntos de quiebre'),
      familyTable('zIndex', 'Capas'),
      familyTable('shadow', 'Sombra', function (t) { return h('span', { className: 'lift', style: { boxShadow: 'var(--' + t.name + ')' } }); }));
  }
  function MotionTokens() { return h(React.Fragment, null, familyTable('duration', 'Duraciones'), familyTable('easing', 'Curvas')); }
  function IconTokens() { return familyTable('icon', 'Tamaños', function (t) { return h(A.Icon, { name: 'star', size: parseInt(t.value, 10) }); }); }
  function ThemeTokens() {
    // Each row is painted in its own theme: data-theme applies to everything inside.
    var roles = ['ui-02', 'ui-01', 'ui-03', 'ui-04', 'text-01', 'text-02', 'interactive-01', 'interactive-02', 'focus', 'support-01'];
    return h(Tbl, { title: 'Los cuatro temas', note: 'Cada fila se pinta en su tema. Las muestras son los roles principales, en este orden: ' + roles.join(', ') + '.',
      cols: ['Tema', 'Id', 'Muestra'], rows: THEMES.map(function (t) {
        return [t.name, code(t.id), h('span', { 'data-theme': t.id, className: 'theme-strip', 'aria-hidden': 'true' },
          roles.map(function (r) { return h('span', { key: r, className: 'swatch', style: { background: 'var(--' + r + ')' } }); }))];
      }) });
  }
  var FUND = {
    color: { slug: 'color', icon: 'light', tokens: function (s) { return h(ColorTokens, { theme: s.theme }); } },
    tipografia: { slug: 'tipografia', icon: 'view', tokens: function () { return h(TypeTokens); } },
    espaciado: { slug: 'espaciado', icon: 'layers', tokens: function () { return h(SpaceTokens); } },
    movimiento: { slug: 'movimiento', icon: 'renew', preview: 'Motion', hint: 'Pasa el cursor o enfoca una fila', tokens: function () { return h(MotionTokens); } },
    iconos: { slug: 'iconos', icon: 'image', preview: 'Icon', tokens: function () { return h(IconTokens); } },
    temas: { slug: 'temas', icon: 'asleep', tokens: function () { return h(ThemeTokens); } }
  };
  function Foundation(p) {
    var f = FUND[p.id], el = C.elements[f.slug];
    var mo = f.preview ? C.components.filter(function (c) { return c.name === f.preview; })[0] : null;
    var tab = useState(el.sections[0].title);
    var tabs = el.sections.map(function (s) { return { value: s.title, label: s.title, content: h(Md, { src: s.body, shift: true }) }; })
      .concat([{ value: 'Tokens', label: 'Tokens', content: f.tokens(p) }]);
    return h(React.Fragment, null,
      h(Head, { eyebrow: 'Fundamentos', title: el.name, summary: el.summary }),
      mo ? h('p', { className: 'pv__label web-label-s' }, f.hint || mo.subtitle || 'Vista previa') : null,
      mo ? h(Preview, { pv: mo.preview }) : null,
      h('div', { className: 'tabs-wrap' }, h(A.Tabs, { label: el.name, value: tab[0], onChange: tab[1], tabs: tabs })));
  }
  // ---- Patterns (single pages) and guides (tabbed pages without tokens).
  function Pattern(p) {
    return h(React.Fragment, null, h(Head, { eyebrow: 'Patrones', title: p.pt.name, summary: p.pt.summary }), h(Md, { src: p.pt.body }));
  }
  // ---- Effects: the effect live with the values of the system on screen, its settings, and its guide.
  function Efecto(p) {
    var ef = p.ef, def = ef.id && window.AlmaEfectos ? window.AlmaEfectos.lista[ef.id] : null, caja = useRef(null), obra = useRef(null), sin = useState(false);
    useEffect(function () {
      if (!def) return;
      obra.current = window.AlmaEfectos.monta(ef.id, def.muestra && def.muestra !== 'zona' ? caja.current.firstElementChild : caja.current);
      if (!obra.current) sin[1](true);
      return function () { if (obra.current) obra.current.quita(); obra.current = null; };
    }, [ef.id]);
    return h(React.Fragment, null, h(Head, { eyebrow: ef.id ? 'Efectos · ' + ef.familia : 'Efectos', title: ef.name, summary: ef.summary }),
      def ? h('div', { className: 'efecto' },
        // A background is a picture; a reaction is shown on something to try it on: a zone, a button, a card.
        !def.muestra ? h('div', { ref: caja, className: 'efecto__escena', role: 'img', 'aria-label': ef.name + ': ' + ef.summary })
          : def.muestra === 'zona' ? h('div', { ref: caja, className: 'efecto__escena efecto__escena--prueba' }, h('p', { className: 'web-body-m efecto__pista' }, 'Haz clic en cualquier parte'))
          : h('div', { ref: caja, className: 'efecto__escena efecto__escena--prueba' },
            def.muestra === 'cambio' ? h('div', { className: 'efecto__cambio' },
                h('div', { className: 'efecto__tarjeta' }, h('p', { className: 'web-h6' }, 'Antes'), h('p', { className: 'web-body-s' }, 'Lo que hay ahora.')),
                h('div', { className: 'efecto__tarjeta', hidden: true }, h('p', { className: 'web-h6' }, 'Después'), h('p', { className: 'web-body-s' }, 'Lo que viene.')))
              : def.muestra === 'entrada' ? h('div', { className: 'efecto__tarjeta' }, h('p', { className: 'web-h6' }, ef.name), h('p', { className: 'web-body-s' }, 'Una pieza que toma forma al entrar a la vista.'))
              : def.muestra === 'boton' ? h('span', { className: 'efecto__envoltorio' }, h(A.Button, { variant: 'filled' }, 'Acerca el puntero'))
              : h('div', { className: 'efecto__tarjeta', tabIndex: 0 }, h('p', { className: 'web-h6' }, ef.name), h('p', { className: 'web-body-s' }, 'Pasa el puntero, o llega con el teclado.')),
            def.muestra === 'cambio' || def.muestra === 'entrada' ? h(A.Button, { variant: 'tinted', onClick: function () { if (obra.current) obra.current.pasa(); } }, def.muestra === 'cambio' ? 'Cambiar' : 'Repetir') : null),
        sin[0] ? h('p', { className: 'web-body-s efecto__nota' }, 'Este navegador no puede dibujar el efecto.') : null,
        h('div', { className: 'efecto__ajustes' }, def.ajustes.map(function (aj) {
          return h(A.Slider, { key: aj.id, label: aj.nombre, min: aj.min, max: aj.max, step: aj.paso, defaultValue: aj.valor, onChange: function (v) { if (obra.current) obra.current.ajusta(aj.id, v); } });
        }))) : null,
      h(Md, { src: ef.body }));
  }
  function Guide(p) {
    var g = p.g, tab = useState(g.sections[0].title);
    return h(React.Fragment, null,
      h(Head, { eyebrow: 'Guías', title: g.name, summary: g.summary }),
      h('div', { className: 'tabs-wrap' }, h(A.Tabs, { label: g.name, value: tab[0], onChange: tab[1],
        tabs: g.sections.map(function (s) { return { value: s.title, label: s.title, content: h(Md, { src: s.body, shift: true }) }; }) })));
  }
  var TABS = ['Uso', 'Estilo', 'Código', 'Accesibilidad'];
  function Component(p) {
    var c = p.c, full = c.sections.length === 4 && c.sections.every(function (s, i) { return s.title === TABS[i]; });
    var tab = useState('Uso');
    return h(React.Fragment, null,
      h(Head, { eyebrow: c.group, title: c.name, summary: c.summary,
        meta: h(A.Tag, { size: 'sm', color: full ? 'green' : 'gray' }, full ? 'Guía completa' : 'Guía breve') }),
      c.preview ? h('p', { className: 'pv__label web-label-s' }, c.subtitle || 'Vista previa') : null,
      c.preview ? h(Preview, { pv: c.preview }) : null,
      full
        ? h('div', { className: 'tabs-wrap' }, h(A.Tabs, { label: 'Guía de ' + c.name, value: tab[0], onChange: tab[1],
            tabs: c.sections.map(function (s) { return { value: s.title, label: s.title, content: h(Md, { src: s.body, shift: true }) }; }) }))
        : h(Md, { src: c.body }));
  }

  // ---- Routes and navigation
  var GROUP_ICON = { 'Acciones': 'flash', 'Formularios': 'list', 'Toggles': 'checkbox--checked', 'Menús': 'menu', 'Navegación': 'compass',
    'Contenido': 'grid', 'Datos': 'dashboard', 'Comunicación': 'chat', 'Estados': 'in-progress', 'Ayuda': 'help', 'Iconografía': 'image' };
  var pages = [
    { id: 'inicio', label: 'Inicio', icon: 'home', group: SITE.grupo, render: function () { return h(Home); } },
    { id: SITE.docs.id, label: SITE.docs.label, icon: SITE.docs.icon, group: SITE.grupo, render: function () { return h(Docs); } }
  ];
  if (C.pending) pages.push({ id: 'pendientes', label: 'Pendientes', icon: 'incomplete', group: SITE.grupo, render: function () { return h(Pending); } });
  Object.keys(FUND).forEach(function (id) {
    var el = C.elements[FUND[id].slug]; if (!el) return;
    pages.push({ id: id, label: el.name, icon: FUND[id].icon, group: 'Fundamentos', render: function (s) { return h(Foundation, { id: id, theme: s.theme, key: id }); } });
  });
  var PATTERN_ICON = { 'formularios': 'list', 'estados-vacios': 'view', 'notificaciones': 'notification', 'carga': 'in-progress',
    'busqueda-y-filtros': 'search', 'dialogos': 'layers', 'acciones': 'flash', 'desactivado-y-solo-lectura': 'view', 'contenido-que-desborda': 'overflow-menu--horizontal',
    'encabezado-global': 'menu', 'inicio-de-sesion': 'login', 'indicadores-de-estado': 'warning--alt', 'barra-de-texto': 'document', 'estilos-fluidos': 'list', 'divulgacion': 'view', 'portada': 'image' };
  (C.patterns || []).forEach(function (pt) {
    pages.push({ id: pt.slug, label: pt.name, icon: PATTERN_ICON[pt.slug] || 'grid', group: 'Patrones', render: function () { return h(Pattern, { pt: pt, key: pt.slug }); } });
  });
  (C.efectos || []).forEach(function (ef) {
    pages.push({ id: 'efecto-' + ef.slug, label: ef.name, icon: ef.id ? 'flash' : 'grid', group: 'Efectos', render: function () { return h(Efecto, { ef: ef, key: ef.slug }); } });
  });
  var GUIDE_ICON = { accesibilidad: 'user', contenido: 'chat' };
  Object.keys(C.guides || {}).forEach(function (id) {
    var g = C.guides[id];
    pages.push({ id: id, label: g.name, icon: GUIDE_ICON[id] || 'help', group: 'Guías', render: function () { return h(Guide, { g: g, key: id }); } });
  });
  C.components.forEach(function (c) {
    if (c.name === 'Motion') return;
    pages.push({ id: c.name.toLowerCase(), label: c.name, icon: GROUP_ICON[c.group] || 'grid', group: c.group || 'Otros', title: c.name,
      render: function () { return h(Component, { c: c, key: c.name }); } });
  });
  if (LANG) LANG.pages.forEach(function (pg) {
    pages.push({ id: 'l-' + pg.id, label: pg.title, icon: pg.icon, group: pg.group || 'Lenguaje de diseño', area: 'lenguaje',
      render: function () { return h('div', { className: 'lng', key: pg.id }, h(LANG.views[pg.id])); } });
  });
  var byId = {}; pages.forEach(function (pg) { byId[pg.id] = pg; });
  function areaOf(id) { return byId[id].area || 'documentacion'; }
  function fold(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function routeFromHash() { var id = location.hash.replace(/^#/, ''); return byId[id] ? id : null; }
  var narrowMq = window.matchMedia ? matchMedia('(max-width: 1055px)') : { matches: false };

  function App() {
    var th = useState(firstTheme), theme = th[0];
    var rt = useState(function () { return routeFromHash() || 'inicio'; }), route = rt[0];
    var qs = useState(''), query = qs[0];
    var hid = useState(narrowMq.matches), hidden = hid[0];
    var first = useRef(true);

    useEffect(function () { paint(theme); store.set('alma-theme', theme); }, [theme]);
    useEffect(function () {
      // The host may set data-theme="light"/"dark" when the viewer switches its own theme.
      var mo = new MutationObserver(function () { var v = root.getAttribute('data-theme'); if (isTheme(v)) th[1](function (cur) { return cur === v ? cur : v; }); });
      mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
      function onHash() { var id = routeFromHash(); if (id) rt[1](id); }
      window.addEventListener('hashchange', onHash);
      return function () { mo.disconnect(); window.removeEventListener('hashchange', onHash); };
    }, []);
    useEffect(function () {
      var pg = byId[route];
      document.title = pg.id === 'inicio' ? SITE.titulo : pg.label + ' · ' + SITE.nombre;
      if (first.current) { first.current = false; return; }
      window.scrollTo(0, 0);
      var t = document.getElementById('page-title') || document.getElementById('titulo'); if (t) t.focus({ preventScroll: true });
      if (narrowMq.matches) hid[1](true);
    }, [route]);

    var groups = useMemo(function () {
      var out = [], idx = {}, f = fold(query.trim());
      pages.forEach(function (pg) {
        if (areaOf(pg.id) !== areaOf(route)) return;
        if (f && fold(pg.label + ' ' + pg.group).indexOf(f) < 0) return;
        if (!idx[pg.group]) { idx[pg.group] = { title: pg.group, items: [] }; out.push(idx[pg.group]); }
        idx[pg.group].items.push({ value: pg.id, label: pg.label, icon: pg.icon, href: '#' + pg.id });
      });
      return out;
    }, [query, areaOf(route)]);
    function go(id) { if (location.hash !== '#' + id) location.hash = id; else rt[1](id); }
    var dark = theme.indexOf('dark') === 0;

    return h(React.Fragment, null,
      h('a', { className: 'skip', href: '#main', onClick: function (e) { e.preventDefault(); var t = document.getElementById('page-title'); if (t) t.focus(); } }, 'Saltar al contenido'),
      h(A.Toolbar, { title: SITE.nombre + (areaOf(route) === 'lenguaje' ? ' · Lenguaje de diseño' : ''), sticky: true,
        search: h(Named, { name: 'Buscar en ' + SITE.nombre }, h(A.SearchField, { label: 'Buscar en ' + SITE.nombre, placeholder: areaOf(route) === 'lenguaje' ? 'Buscar en el lenguaje de diseño' : 'Buscar componentes y fundamentos', value: query,
          onChange: function (v) { qs[1](v); if (v) hid[1](false); },
          onSubmit: function () { var g = groups[0]; if (g) { go(g.items[0].value); qs[1](''); } } })),
        actions: [{ label: dark ? 'Usar tema claro' : 'Usar tema oscuro', icon: dark ? 'light' : 'asleep', onPress: function () { th[1](dark ? 'light' : 'dark'); } }],
        moreActions: THEMES.map(function (t) { return { value: t.id, label: 'Tema ' + t.name.toLowerCase(), icon: t.id === theme ? 'checkmark' : undefined }; }),
        onMoreAction: function (v) { if (isTheme(v)) th[1](v); } }),
      h('div', { className: 'shell' },
        h('div', { className: 'nav' },
          SIS && !hidden ? h('div', { className: 'nav__system' }, h(A.PopUpButton, { label: 'Sistema', value: sisId, onChange: change,
            options: SIS.map(function (s) { return { value: s.id, label: s.nombre }; }) }),
            LANG ? h(A.SegmentedControl, { label: 'Qué ver de ' + SITE.nombre, value: areaOf(route), onChange: function (v) { go(v === 'lenguaje' ? 'l-inicio' : 'inicio'); },
              options: [{ value: 'documentacion', label: 'Documentación' }, { value: 'lenguaje', label: 'Lenguaje' }] }) : null) : null,
          h(A.Sidebar, { label: 'Secciones de ' + SITE.nombre, groups: groups, value: route, onChange: go, hidden: hidden, onHiddenChange: hid[1] }),
          !hidden && !groups.length ? h('p', { className: 'nav__empty web-body-s' }, 'Nada coincide con «' + query + '».') : null),
        h('main', { className: 'main', id: 'main' }, byId[route].render({ theme: theme }))));
  }

  paint(firstTheme());
  if (mounted) mounted.unmount();
  mounted = ReactDOM.createRoot(document.getElementById('app'));
  mounted.render(h(App));
  }
  start(SIS ? (isSystem(store.get('alma-sistema')) ? store.get('alma-sistema') : SIS[0].id) : null);
})();
