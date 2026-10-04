// Lenguaje de diseño: one template for every entity. The structure, the specifications and the visual do/don't pairs
// come from the entity's chart through the Entidades engine; the words come from entidades/lenguajes/<id>.json.
// build(L, PRE) makes one entity's language: alone it is the whole page (window.__LENGUAJE, at the end of this file);
// inside the documentation with a system selector (scripts/build-selector.mjs) the host site takes its pages and views,
// and PRE ('l-') keeps their routes apart from the documentation's.
(function () {
  function build(L, PRE) {
  var h = React.createElement, A = window.AlmaDS, En = window.__ENGINE, CT = window.__CARTA, useState = React.useState, useEffect = React.useEffect;
  var root = document.documentElement;

  // ---------- The entity: everything below comes from this birth moment (and an inherited color, if it has one).
  var C = CT.calcularCarta(L.nacimiento);
  var E = En.withCarta({ id: L.id, name: L.nombre, nacimiento: L.nacimiento, color: L.colorHeredado || undefined, variation: 0, type: 'proyector', auth: 'mental', profile: '1/3', def: 'simple', centers: [] });
  var P = En.params(E), V = CT.generarVoz(C), PR = CT.generarPrincipios(C);
  var HEX = function (n) { return CT.PUERTAS[n].hexagrama; };
  var CENTRO = function (id) { return CT.CENTROS.filter(function (c) { return c.id === id; })[0].nombre; };
  var ACC = P.accent.dark['interactive-01'];

  function oklab(hex) {
    var f = function (c) { c = parseInt(c, 16) / 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    var r = f(hex.substr(1, 2)), g = f(hex.substr(3, 2)), b = f(hex.substr(5, 2));
    var l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s];
  }
  function dE(a, b) { var x = oklab(a), y = oklab(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); }
  var fmt3 = function (x) { return x.toFixed(3).replace('.', ','); };
  var DELTA = L.referencia ? dE(ACC, L.referencia.color) : null;

  // Words can carry values the engine computes: {acento}, {deltaE}, {ancho}, {pesos}, {radio}, {velocidad}, {primario}…
  var VALS = {
    acento: ACC, deltaE: DELTA === null ? '' : fmt3(DELTA), ancho: String(P.fontWidth), radio: P.radius['radius-button'].replace('px', ' px'),
    pesos: [P.weights.display, P.weights.heading, P.weights.body, P.weights.emphasis].join(' / '), velocidad: String(P.motion.speed).replace('.', ','),
    primario: P.palette[0].name.split(' ')[0].toLowerCase(), secundario: P.palette[1].name.split(' ')[0].toLowerCase(), terciario: P.palette[2].name.split(' ')[0].toLowerCase(),
    cruz: C.cruz.puertas.join(' / '), perfil: C.perfil, fechaLarga: L.fechaLarga
  };
  function T(s) { return typeof s === 'string' ? s.replace(/\{(\w+)\}/g, function (m, k) { return VALS[k] !== undefined ? VALS[k] : m; }) : s; }

  function hostTheme() { var v = root.getAttribute('data-theme'); if (v === 'light' || v === 'dark') return v; return window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; }
  // The whole site wears the entity: type axes, weights, radii and palette.
  function wear(theme) {
    root.setAttribute('data-theme', theme); root.style.colorScheme = theme;
    var st = En.scopeStyle(P, theme); Object.keys(st).forEach(function (k) { root.style.setProperty(k, st[k]); });
  }

  var PAGES = [
    { id: 'inicio', group: null, title: 'Inicio', icon: 'home' },
    { id: 'punto-de-vista', group: 'Filosofía', title: 'Punto de vista', icon: 'idea' },
    { id: 'principios', group: 'Filosofía', title: 'Principios', icon: 'checkmark' },
    { id: 'prisma', group: 'Filosofía', title: 'Prisma de identidad', icon: 'identification' },
    { id: 'voz', group: 'Lenguaje', title: 'Voz', icon: 'chat' },
    { id: 'tono', group: 'Lenguaje', title: 'Tono', icon: 'information' },
    { id: 'escritura', group: 'Lenguaje', title: 'Escritura', icon: 'document' },
    { id: 'firma', group: 'Elementos', title: 'Firma', icon: 'star' },
    { id: 'tipografia', group: 'Elementos', title: 'Tipografía', icon: 'view' },
    { id: 'fundamentos', group: 'Elementos', title: 'Fundamentos tipográficos', icon: 'document' },
    { id: 'color', group: 'Elementos', title: 'Color', icon: 'categorical-palette' },
    { id: 'grilla', group: 'Elementos', title: 'Grilla', icon: 'grid' },
    { id: 'iconografia', group: 'Elementos', title: 'Iconografía', icon: 'favorite' },
    { id: 'ilustracion', group: 'Elementos', title: 'Ilustración', icon: 'image' },
    { id: 'fotografia', group: 'Elementos', title: 'Fotografía', icon: 'view' },
    { id: 'datos', group: 'Elementos', title: 'Visualización de datos', icon: 'dashboard' },
    { id: 'movimiento', group: 'Elementos', title: 'Movimiento', icon: 'flash' },
    { id: 'producto', group: 'Galería', title: 'Producto', icon: 'search' },
    { id: 'comunicacion', group: 'Galería', title: 'Comunicación', icon: 'send' },
    { id: 'componentes', group: 'Galería', title: 'Componentes', icon: 'settings' },
    { id: 'carta', group: 'Origen', title: 'La carta', icon: 'compass' },
    { id: 'fecha', group: 'Origen', title: 'La fecha', icon: 'time' }
  ].concat(L.calibracion ? [{ id: 'calibracion', group: 'Origen', title: 'Calibración', icon: 'checkmark--outline' }] : []);
  var GROUPS = ['Filosofía', 'Lenguaje', 'Elementos', 'Galería', 'Origen'];
  function byId(id) { return PAGES.filter(function (p) { return p.id === id; })[0]; }
  function route() { var r = (location.hash || '').replace('#', ''); return byId(r) ? r : 'inicio'; }
  var slug = function (t) { return 's-' + t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-'); };

  // ---------- Shared pieces
  function Head(p) {
    var pg = byId(p.id);
    return h('header', { className: 'head' },
      pg.group ? h('p', { className: 'web-label-m eyebrow' }, pg.group) : null,
      h('h1', { className: 'web-h1 head__title', tabIndex: -1, id: 'titulo' }, p.title || pg.title),
      p.lede ? h('p', { className: 'web-body-l lede' }, T(p.lede)) : null,
      p.index ? h('nav', { className: 'toc', 'aria-label': 'En esta página' }, p.index.map(function (t) {
        return h('a', { key: t, href: '#' + p.id, className: 'web-body-m toc__a', onClick: function (ev) { ev.preventDefault(); var el = document.getElementById(slug(t)); if (el) { el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); el.focus({ preventScroll: true }); } } }, t);
      })) : null);
  }
  function Sec(p) { return h('section', { className: 'sec' }, p.title ? h('h2', { className: 'web-h3 sec__title', id: slug(p.title), tabIndex: -1 }, p.title) : null, p.children); }
  function Sub(p) { return h('div', { className: 'sub' }, h('h3', { className: 'web-h5 sub__title' }, p.title), p.children); }
  function Para(p) { return h('p', { className: 'web-body-l para' }, typeof p.children === 'string' ? T(p.children) : p.children); }
  function Paras(p) { return (p.items || []).map(function (x, i) { return h(Para, { key: i }, x); }); }
  function Quote(p) { return h('blockquote', { className: 'quote web-h3' }, T(p.children)); }
  function Tbl(p) { return h('div', { className: 'tbl' }, h(A.Table, { title: p.title, headingLevel: 3, columns: p.columns, rows: p.rows })); }
  function Chip(p) { return h('span', { className: 'chip', style: { background: p.c } }); }
  function Cards(p) {
    return h('div', { className: 'cards' }, p.items.map(function (c) {
      return h('div', { key: c[0], className: 'card card--static' }, c[2] ? h('span', { className: 'web-label-m cap' }, T(c[2])) : null, h('span', { className: 'web-h5' }, T(c[0])), h('span', { className: 'web-body-m cap' }, T(c[1])));
    }));
  }
  function Avoid(p) { return h('ul', { className: 'avoid web-body-m' }, (p.items || []).map(function (x) { return h('li', { key: x }, h(A.Icon, { name: 'close', size: 16 }), h('span', null, T(x))); })); }
  // An arrow in a large title, drawn instead of typed: the typeface's own arrow keeps one weight and one width, so in
  // display sizes it looks heavier and narrower than the letters around it. This one has the stroke of the letters next
  // to it and the entity's width axis for its length, and sits at the middle of the lowercase. The typed arrow stays,
  // hidden, for whoever reads or copies the text.
  // The stroke is Roboto Flex's stem, measured on the letter «l» (2026-10-02): at weight 400 it is 0.069 em at 44 px,
  // 0.054 at 88 and 0.052 at 144 (the optical size thins it as the text grows); each unit of weight below 400 takes
  // 0.000157 em off, and each one above adds 0.00038. A horizontal stroke is a little thinner than a stem.
  function trazoDeLetra(peso, px) {
    var K = [[44, 0.0689], [88, 0.0542], [144, 0.0522]], t = Math.max(44, Math.min(144, px)), i = t <= 88 ? 0 : 1;
    var s400 = K[i][1] + (K[i + 1][1] - K[i][1]) * (t - K[i][0]) / (K[i + 1][0] - K[i][0]);
    return Math.max(0.012, peso <= 400 ? s400 - (400 - peso) * 0.000157 : s400 + (peso - 400) * 0.00038) * 0.95;
  }
  function Flecha() {
    var ref = React.useRef(null), m = useState({ peso: P.weights.display, px: 88 });
    useEffect(function () {
      function medir() { var cs = getComputedStyle(ref.current), peso = parseFloat(cs.fontWeight) || P.weights.display, px = parseFloat(cs.fontSize) || 88; m[1](function (v) { return v.peso === peso && v.px === px ? v : { peso: peso, px: px }; }); }
      medir(); window.addEventListener('resize', medir);
      return function () { window.removeEventListener('resize', medir); };
    }, []);
    var W = Math.round(Math.max(60, Math.min(110, 70 * P.fontWidth / 100))), sw = Math.round(trazoDeLetra(m[0].peso, m[0].px) * 1000) / 10;
    return h('span', { className: 'flecha', ref: ref },
      h('svg', { viewBox: '0 0 ' + W + ' 70', 'aria-hidden': 'true', focusable: 'false', style: { width: (W / 100) + 'em' } },
        h('path', { d: 'M2 35H' + (W - 4) + 'M' + (W - 29) + ' 9L' + (W - 3) + ' 35L' + (W - 29) + ' 61', fill: 'none', stroke: 'currentColor', strokeWidth: sw, strokeLinejoin: 'miter' })),
      h('span', { className: 'flecha__txt' }, ' → '));
  }
  function conFlechas(s) {
    var partes = String(s).split(/\s*→\s*/);
    return partes.map(function (x, i) { return h(React.Fragment, { key: i }, i ? h(Flecha) : null, x); });
  }
  function Statement(p) { var parts = T(p.children).split('\n'); return h('p', { className: 'statement web-display-m' }, parts.map(function (x, i) { return [i ? h('br', { key: 'b' + i }) : null, h(React.Fragment, { key: 't' + i }, conFlechas(x))]; })); }
  function Origin(p) { return p.children ? h('p', { className: 'web-body-s cap origin' }, h('strong', null, 'Origen en la carta. '), T(p.children)) : null; }
  function Frame(p) { return h('div', { className: 'frame' }, p.label ? h('p', { className: 'web-label-m cap frame__label' }, p.label) : null, p.children); }
  function Bullets(p) { return h('ul', { className: 'steps web-body-l' }, (p.items || []).map(function (x) { return h('li', { key: x[0] }, h('strong', null, T(x[0]) + ' '), T(x[1])); })); }
  function Blocks(p) { // Paragraphs, big statements and quotes, in the order the language writes them.
    return (p.items || []).map(function (b, i) { return b.s ? h(Statement, { key: i }, b.s) : b.q ? h(Quote, { key: i }, b.q) : h(Para, { key: i }, b.p); });
  }
  function cssVar(n) { return getComputedStyle(root).getPropertyValue(n).trim(); }

  // Visual do/don't pairs: each side is a real ALMA composition; the "no" side breaks one rule through scoped tokens or styles.
  function Fig(p) {
    return h('figure', { className: 'ex__fig ex__fig--' + p.k },
      h('div', { className: 'ex__stage', 'aria-hidden': 'true', inert: '' }, p.node),
      h('figcaption', { className: 'web-body-m ex__cap' }, h(A.Icon, { name: p.k === 'si' ? 'checkmark' : 'close', size: 16 }), h('span', null, h('strong', null, p.k === 'si' ? 'Así sí. ' : 'Así no. '), T(p.cap))));
  }
  function Ex(p) { return h('div', { className: 'ex' }, h(Fig, { k: 'si', node: p.si, cap: p.siCap }), h(Fig, { k: 'no', node: p.no, cap: p.noCap })); }
  function Mini(p) {
    return h('div', { className: 'mini', style: p.style },
      h('p', { className: 'web-label-m cap mini__eyebrow' }, p.eyebrow || L.muestra.eyebrow),
      h('p', { className: 'web-h4 mini__title', style: p.titleStyle }, p.title || L.muestra.titulo),
      p.body !== false ? h('p', { className: 'web-body-m mini__body' }, p.body || L.muestra.texto) : null,
      p.actions || h('div', { className: 'demo-row' }, h(A.Button, { variant: 'filled', role: 'primary' }, L.muestra.primaria), h(A.Button, { variant: 'tertiary' }, L.muestra.secundaria)));
  }
  function Btns(p) { return h('div', { className: 'demo-row' }, p.primary ? h(A.Button, { variant: 'filled', role: p.role || 'primary' }, p.primary) : null, p.secondary ? h(A.Button, { variant: 'tertiary' }, p.secondary) : null); }
  var ON_ACCENT = { background: 'var(--interactive-01)', '--text-01': 'var(--text-on-interactive)', '--text-02': 'var(--text-on-interactive)', color: 'var(--text-on-interactive)' };

  var a = C.perfil.split('/');

  // ---------- Inicio
  function Inicio() {
    var I = L.inicio;
    var cards = [['punto-de-vista', 'Filosofía', 'Punto de vista, principios y prisma de identidad.'], ['voz', 'Lenguaje', 'Voz, tono y reglas de escritura.'], ['tipografia', 'Tipografía', 'Letra, escala y fundamentos.'], ['color', 'Color', 'Paleta, roles, combinaciones y accesibilidad.'], ['grilla', 'Grilla', 'Unidad base, columnas y espacio.'], ['iconografia', 'Iconografía', 'Sistema, principios y tamaños.'], ['fotografia', 'Imagen', 'Fotografía e ilustración.'], ['datos', 'Visualización de datos', 'Criterios, series y honestidad.'], ['movimiento', 'Movimiento', 'Enfoque, duraciones y curvas.'], ['producto', 'Galería', 'El lenguaje en producto y comunicación.']];
    return h('div', { className: 'page' },
      h('div', { className: 'head' },
        h('p', { className: 'web-label-m eyebrow' }, 'Lenguaje de diseño'),
        h('h1', { className: 'web-display-m hero__title', tabIndex: -1, id: 'titulo' }, conFlechas(T(I.titulo))),
        h('p', { className: 'web-body-l lede' }, T(I.lede))),
      h(Pieza, { format: 'wide' }),
      h('div', { className: 'cards' }, cards.map(function (c) {
        return h('a', { key: c[0], href: '#' + PRE + c[0], className: 'card' }, h('span', { className: 'web-h5' }, c[1]), h('span', { className: 'web-body-m cap' }, c[2]), h(A.Icon, { name: 'arrow--right', size: 16 }));
      })),
      h(Sec, { title: 'Recursos' }, h(Bullets, { items: [
        ['Componentes.', 'ALMA: los mismos componentes del sistema base, con nuestros tokens.'],
        ['Tokens.', 'El archivo de tokens de la entidad, exportable desde Entidades ALMA.'],
        ['Tipografía.', 'Roboto Flex, de Google Fonts, con licencia libre.']] })),
      h('p', { className: 'web-body-s cap note' }, T(L.aviso)));
  }

  // ---------- Filosofía
  function PuntoDeVista() {
    var X = L.puntoDeVista;
    return h('div', { className: 'page' }, h(Head, { id: 'punto-de-vista', lede: X.lede }), h(Sec, null, h(Blocks, { items: X.bloques })), h(Origin, null, X.origen));
  }

  function Principios() {
    var X = L.principios;
    return h('div', { className: 'page' }, h(Head, { id: 'principios', lede: X.lede, index: X.items.map(function (x) { return x.t; }) }),
      X.items.map(function (x, i) {
        var e = PR[i];
        return h(Sec, { key: x.t, title: x.t },
          h(Para, null, x.p),
          h('ul', { className: 'questions web-body-l' }, x.q.map(function (q) { return h('li', { key: q }, T(q)); })),
          e ? h(Origin, null, e.titulo + ' · ' + e.origen + '.') : null);
      }),
      X.cierre ? h(Quote, null, X.cierre) : null);
  }

  function Prisma() {
    var X = L.prisma;
    var card = function (f) { return h('div', { key: f.k, className: 'prism__cell' }, h('span', { className: 'web-label-m cap' }, f.q), h('span', { className: 'web-h4' }, f.k), h('span', { className: 'web-body-m' }, T(f.t)), h('span', { className: 'web-label-m cap' }, T(f.o))); };
    return h('div', { className: 'page' }, h(Head, { id: 'prisma', lede: X.lede }),
      h('div', { className: 'prism' },
        h('span', { className: 'prism__axis prism__axis--top web-label-m cap' }, 'Emisor: nosotros'),
        h('span', { className: 'prism__axis prism__axis--l web-label-m cap' }, 'Lo que mostramos'),
        h('span', { className: 'prism__axis prism__axis--r web-label-m cap' }, 'Lo que llevamos dentro'),
        h('div', { className: 'prism__grid' }, X.caras.map(card)),
        h('span', { className: 'prism__axis prism__axis--bottom web-label-m cap' }, 'Receptor: quien nos usa')),
      h(Sec, { title: 'Cómo leerlo' }, h(Para, null, X.lectura)));
  }

  // ---------- Lenguaje
  function Voz() {
    var X = L.voz;
    return h('div', { className: 'page' }, h(Head, { id: 'voz', lede: X.lede, index: ['Atributos', 'Cómo hablamos', 'Quién habla', 'Así sí, así no'] }),
      h(Sec, { title: 'Atributos' }, h('div', { className: 'cards' }, X.atributos.map(function (r) {
        return h('div', { key: r[0], className: 'card card--static' }, h('span', { className: 'web-h4' }, r[0] + ', ', h('span', { className: 'cap' }, r[1])), h('span', { className: 'web-body-m cap' }, T(r[2])), h('span', { className: 'web-label-m cap' }, r[3]));
      }))),
      h(Sec, { title: 'Cómo hablamos' }, X.como.map(function (c) { return h(Sub, { key: c.t, title: c.t }, h(Para, null, c.p)); }), h(Origin, null, X.comoOrigen)),
      h(Sec, { title: 'Quién habla' }, h(Para, null, X.quien),
        h(Ex, { si: h(A.InlineNotification, { status: 'error', title: X.ex.si.title, message: X.ex.si.message }), siCap: X.ex.si.cap, no: h(A.InlineNotification, { status: 'error', title: X.ex.no.title, message: X.ex.no.message }), noCap: X.ex.no.cap })),
      h(Sec, { title: 'Así sí, así no' }, h(Tbl, { title: 'Ejemplos', columns: [{ key: 'caso', label: 'Caso' }, { key: 'si', label: 'Así sí' }, { key: 'no', label: 'Así no' }, { key: 'porque', label: 'Por qué' }], rows: V.ejemplos.map(function (x, i) { return Object.assign({ id: i }, x); }) })));
  }

  function Tono() {
    var X = L.tono;
    return h('div', { className: 'page' }, h(Head, { id: 'tono', lede: X.lede, index: ['Según el momento', 'Cuánto explicamos', 'En ningún tono'] }),
      h(Sec, { title: 'Según el momento' }, h(Tbl, { title: 'Tono por momento', columns: [{ key: 'c', label: 'Momento' }, { key: 't', label: 'Tono' }, { key: 'g', label: 'Cuánto explicamos' }, { key: 'e', label: 'Ejemplo' }], rows: X.filas.map(function (f, i) { return { id: i, c: f[0], t: f[1], g: f[2], e: T(f[3]).replace('{error}', V.ejemplos[1].si) }; }) })),
      h(Sec, { title: 'Cuánto explicamos' }, h(Para, null, X.cuanto),
        h(Ex, { si: h(Mini, { eyebrow: X.ex.si.eyebrow, title: X.ex.si.title, body: X.ex.si.body, actions: h(Btns, { primary: X.ex.si.primary, role: 'destructive', secondary: X.ex.si.secondary }) }), siCap: X.ex.si.cap, no: h(Mini, { eyebrow: X.ex.no.eyebrow, title: X.ex.no.title, body: false, actions: h(Btns, { primary: X.ex.no.primary, secondary: X.ex.no.secondary }) }), noCap: X.ex.no.cap })),
      h(Sec, { title: 'En ningún tono' }, h(Avoid, { items: X.nunca })));
  }

  function Escritura() {
    var X = L.escritura;
    return h('div', { className: 'page' }, h(Head, { id: 'escritura', lede: X.lede, index: ['Reglas', 'Palabras', 'Formatos'] }),
      h(Sec, { title: 'Reglas' }, h(Tbl, { title: 'Reglas de escritura', columns: [{ key: 'r', label: 'Regla' }, { key: 'si', label: 'Así' }, { key: 'o', label: 'Por qué' }], rows: X.reglas.map(function (r, i) { return { id: i, r: r[0], si: r[1], o: r[2] }; }) })),
      h(Sec, { title: 'Palabras' },
        h(Ex, { si: h(Mini, { title: X.ex.si.title, body: X.ex.si.body, actions: h(Btns, { primary: X.ex.si.primary }) }), siCap: X.ex.si.cap, no: h(Mini, { title: X.ex.no.title, body: X.ex.no.body, actions: h(Btns, { primary: X.ex.no.primary }) }), noCap: X.ex.no.cap }),
        h(Tbl, { title: 'Preferimos y evitamos', columns: [{ key: 'p', label: 'Preferimos' }, { key: 'e', label: 'Evitamos' }], rows: X.palabras.map(function (r, i) { return { id: i, p: r[0], e: r[1] }; }) })),
      h(Sec, { title: 'Formatos' }, h(Bullets, { items: X.formatos })));
  }

  // ---------- Elementos
  function Firma() {
    var X = L.firma, f = useState('wide');
    return h('div', { className: 'page' }, h(Head, { id: 'firma', lede: X.lede, index: ['Construcción', 'Formatos', 'Espacio y tamaño', 'Color', 'Movimiento', 'Usos incorrectos'] }),
      h(Sec, { title: 'Construcción' }, h(Para, null, X.construccion),
        h(Tbl, { title: 'Cada rasgo de la firma', columns: [{ key: 'r', label: 'Rasgo' }, { key: 'f', label: 'En la firma' }], rows: X.rasgos.map(function (r, i) { return { id: i, r: r[0], f: T(r[1]) }; }) })),
      h(Sec, { title: 'Formatos' },
        h(A.SegmentedControl, { label: 'Formato', options: [{ value: 'wide', label: 'Portada 16:9' }, { value: 'square', label: 'Cuadrado 1:1' }, { value: 'tall', label: 'Historia 9:16' }], value: f[0], onChange: f[1] }),
        h(En.Signature, { entity: E, P: P, format: f[0] }),
        h(Para, null, 'La firma se recompone en cada formato: las barras se reordenan sobre la grilla y el nombre se apoya abajo a la izquierda. No se escala ni se recorta una versión en otra.')),
      h(Sec, { title: 'Espacio y tamaño' }, h(Bullets, { items: [
        ['Área de respeto.', 'Al menos la altura de una barra alrededor de la firma; nada entra en ese espacio.'],
        ['Tamaño mínimo.', '160 px de ancho en pantalla y 40 mm en impresión. Por debajo, se usa solo el nombre.'],
        ['Alineación.', 'Siempre a la grilla de 8 px y al margen izquierdo del contenido.']] })),
      h(Sec, { title: 'Color' }, h(Para, null, X.color)),
      h(Sec, { title: 'Movimiento' }, h(Para, null, X.movimiento)),
      h(Sec, { title: 'Usos incorrectos' },
        h(Ex, { si: h('div', { className: 'ex__sig' }, h(En.Signature, { entity: E, P: P, format: 'square' }), h('p', { className: 'web-h5 ex__p' }, X.ex.texto)), siCap: 'El texto fuera de la firma, alineado a la grilla.', no: h('div', { className: 'ex__sig ex__sig--bad' }, h(En.Signature, { entity: E, P: P, format: 'square' }), h('p', { className: 'web-h3 ex__over' }, X.ex.texto)), noCap: 'Nunca escribas sobre las barras ni cambies sus colores.' }),
        h(Avoid, { items: ['No escribas texto encima de las barras.', 'No cambies los colores ni el orden de las filas.', 'No agregues sombras, contornos ni efectos.', 'No la uses dentro de un formulario, una tabla o un botón.', 'No la gires ni la deformes.'] })));
  }

  function SpecRow(p) {
    var ref = React.useRef(null), m = useState('');
    useEffect(function () { var el = ref.current; if (!el) return; var cs = getComputedStyle(el); m[1](Math.round(parseFloat(cs.fontSize)) + ' / ' + Math.round(parseFloat(cs.lineHeight) || 0) + ' px · ' + cs.fontWeight); }, []);
    return h('div', { className: 'specimen__row' }, h('span', { className: 'tok' }, p.k, h('br'), h('span', { className: 'cap' }, m[0])), h('p', { ref: ref, className: p.k + ' specimen__text' }, p.t));
  }
  function Tipografia() {
    var X = L.tipografia, CLS = ['web-display-m', 'web-h1', 'web-h2', 'web-h3', 'web-h4', 'web-h5', 'web-body-l', 'web-body-m', 'web-label-m', 'web-body-s'];
    return h('div', { className: 'page' }, h(Head, { id: 'tipografia', lede: X.lede, index: ['La letra', 'Pesos', 'Escala'] }),
      h(Sec, { title: 'La letra' }, h(Para, null, X.letra), h('p', { className: 'web-display-m type-sample' }, 'Aa Bb Cc 0123456789 ¿¡«»—')),
      h(Sec, { title: 'Pesos' }, h(Tbl, { title: 'Cuatro pesos', columns: [{ key: 'r', label: 'Rol' }, { key: 'w', label: 'Peso' }, { key: 'n', label: 'Uso' }], rows: [['Display', P.weights.display], ['Títulos', P.weights.heading], ['Texto', P.weights.body], ['Énfasis', P.weights.emphasis]].map(function (r, i) { return { id: i, r: r[0], w: String(r[1]), n: T(X.pesos[i]) }; }) })),
      h(Sec, { title: 'Escala' },
        h('div', { className: 'specimen' }, CLS.map(function (k, i) { return h(SpecRow, { key: k, k: k, t: X.escala[i] }); })),
        h(Para, null, 'Los valores se miden en vivo desde los tokens de ALMA. La escala es la misma de ALMA; lo que cambia es el ancho y el peso.')),
      h(Origin, null, X.origen));
  }

  function Fundamentos() {
    var M = L.muestra, PT = M.parrafo;
    return h('div', { className: 'page' }, h(Head, { id: 'fundamentos', lede: L.fundamentos.lede, index: ['Alineación', 'Interlineado', 'Largo de línea', 'Mayúsculas', 'Signos', 'Énfasis', 'Titulares'] }),
      h(Sec, { title: 'Alineación' }, h(Para, null, 'Alineamos a la izquierda, siempre. Crea un borde firme que el ojo sigue y que coincide con la grilla. Nunca justificamos: abre ríos de espacio entre palabras. Centramos solo una línea corta, y solo cuando está sola.'),
        h(Ex, { si: h('p', { className: 'web-body-m ex__p' }, PT), siCap: 'Alineado a la izquierda: un borde firme para el ojo.', no: h('p', { className: 'web-body-m ex__p', style: { textAlign: 'justify', maxWidth: '13rem', margin: '0 auto' } }, PT), noCap: 'Nunca justifiques: abre huecos entre palabras.' })),
      h(Sec, { title: 'Interlineado' }, h(Para, null, 'El texto de lectura respira con un interlineado de 1,5 veces su tamaño; los titulares, con algo menos. Los tokens de ALMA ya lo resuelven: no lo cambies a mano.')),
      h(Sec, { title: 'Largo de línea' }, h(Para, null, 'Entre 45 y 75 caracteres por línea. Más largo cansa; más corto entrecorta. En pantallas anchas, el texto no ocupa todo el ancho: se queda en su columna de lectura, de 48 rem como máximo.')),
      h(Sec, { title: 'Mayúsculas' }, h(Para, null, 'Escribimos en tipo oración: mayúscula al inicio y en nombres propios. Nunca escribimos párrafos ni botones en mayúsculas sostenidas. Las etiquetas pequeñas pueden ir en mayúsculas solo si tienen espaciado extra.')),
      h(Sec, { title: 'Signos' },
        h(Sub, { title: 'Comillas' }, h(Para, null, 'Usamos comillas latinas, « », y dentro de ellas las inglesas, “ ”. Nunca comillas rectas.')),
        h(Sub, { title: 'Raya, guion y menos' }, h(Para, null, 'La raya (—) abre incisos y diálogos. El guion (-) une compuestos y rangos: 2024-2025. El signo menos (−) va en cifras negativas.')),
        h(Sub, { title: 'Apertura' }, h(Para, null, 'En español, las preguntas y exclamaciones se abren: ¿Guardamos los cambios? Nunca omitimos el signo de apertura, ni siquiera en una etiqueta.'),
          h(Ex, { si: h(Mini, { eyebrow: '«' + M.eyebrow + '»', title: '¿Guardamos los cambios?', body: 'Tus cambios de 2024-2025 siguen aquí — sin enviar.', actions: h(Btns, { primary: 'Guardar cambios', secondary: 'Descartar' }) }), siCap: 'Comillas latinas, signo de apertura y raya para el inciso.', no: h(Mini, { eyebrow: '"' + M.eyebrow + '"', title: 'Guardamos los cambios?', body: 'Tus cambios de 2024 - 2025 siguen aqui - sin enviar.', actions: h(Btns, { primary: 'GUARDAR', secondary: 'Descartar' }) }), noCap: 'Evita comillas rectas, preguntas sin apertura, guiones mal usados y botones en mayúsculas.' }))),
      h(Sec, { title: 'Énfasis' }, h(Para, null, 'Un solo recurso por vez. Si algo va en peso de énfasis, no va además en color, ni subrayado, ni en mayúsculas. Sumar recursos no enfatiza más: confunde.'),
        h(Ex, { si: h('p', { className: 'web-body-l ex__p' }, M.enfasis[0], h('strong', null, M.enfasis[1]), M.enfasis[2]), siCap: 'Un solo recurso: el peso de énfasis.', no: h('p', { className: 'web-body-l ex__p' }, M.enfasis[0], h('strong', { style: { color: 'var(--interactive-01)', textDecoration: 'underline', textTransform: 'uppercase', fontStyle: 'italic' } }, M.enfasis[1]), M.enfasis[2]), noCap: 'Evita sumar peso, color, subrayado y mayúsculas.' })),
      h(Sec, { title: 'Titulares' }, h(Para, null, 'Preferimos titulares cortos, partidos en dos o tres líneas, a una sola línea larga. Evitamos dejar una palabra sola en la última línea. Para distinguir título y subtítulo usamos un recurso: tamaño o peso, no los dos.')),
      h(Avoid, { items: ['No justifiques el texto.', 'No uses mayúsculas sostenidas para destacar.', 'No combines peso, color y subrayado en la misma palabra.', 'No uses comillas rectas.'] }));
  }

  function Color() {
    var X = L.color, d = P.accent.dark, l = P.accent.light, c = En.contrast, STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    var BG = '#000000', INK = d['text-on-interactive'] === '#FFFFFF' ? '#FFFFFF' : d['text-on-interactive'];
    var spec = STEPS.map(function (st) { var row = { id: st, s: String(st) }; P.palette.forEach(function (f, i) { row['f' + i] = h('span', { className: 'stat__v' }, h(Chip, { c: f.ramp[st] }), f.ramp[st]); }); return row; });
    var ok = function (x) { return x >= 4.5 ? 'Texto' : x >= 3 ? 'Gráficos y texto grande' : 'No'; };
    var acc = STEPS.map(function (st) { var v = P.palette[0].ramp[st], w = c(INK, v), k = c(v, BG); return { id: st, s: P.palette[0].name + ' ' + st, w: w.toFixed(2) + ':1 · ' + ok(w), k: k.toFixed(2) + ':1 · ' + ok(k) }; });
    var roles = [
      { id: 1, t: 'interactive-01', v: d['interactive-01'], u: 'Acción principal, en ambos temas' },
      { id: 2, t: 'hover-primary', v: d['hover-primary'], u: 'Acción principal al pasar el cursor' },
      { id: 3, t: 'text-on-interactive', v: d['text-on-interactive'], u: 'Texto sobre la acción principal' },
      { id: 4, t: 'link-01 (oscuro)', v: d['link-01'], u: 'Enlaces sobre fondos oscuros' },
      { id: 5, t: 'link-01 (claro)', v: l['link-01'], u: 'Enlaces sobre fondos claros' },
      { id: 6, t: 'control-on (claro)', v: l['control-on'], u: 'Controles activos sobre fondos claros' }
    ];
    var inkName = INK === '#FFFFFF' ? 'texto blanco' : 'texto oscuro (' + INK + ')';
    return h('div', { className: 'page' }, h(Head, { id: 'color', lede: X.lede, index: ['El acento al centro', 'Especificaciones', 'Familias', 'Color en la interfaz', 'Accesibilidad', 'Color en acción'] }),
      h(Sec, { title: 'El acento al centro' }, h(Para, null, X.centro), h(En.Palette, { P: P }),
        h(Sub, { title: 'Neutros' }, h(Para, null, X.neutros)),
        h(Ex, { si: h(Mini), siCap: 'Neutros para la superficie; el acento solo en la acción principal.', no: h(Mini, { style: ON_ACCENT }), noCap: 'Evita fondos enteros del acento para «darle marca»: la acción deja de destacar.' })),
      h(Sec, { title: 'Especificaciones' },
        h(Para, null, 'Cada familia tiene nueve pasos, del 100 al 900, calculados en OKLCH para que la luminosidad sea pareja entre familias: un 600 de una familia pesa lo mismo que un 600 de otra.'),
        h(Tbl, { title: 'Pasos por familia (HEX)', columns: [{ key: 's', label: 'Paso' }].concat(P.palette.map(function (f, i) { return { key: 'f' + i, label: f.name }; })), rows: spec })),
      h(Sec, { title: 'Familias' },
        h(Ex, { si: h(Mini), siCap: 'Una acción, un color: el acento.', no: h('div', { style: { '--button-filled-bg': P.palette[2].ramp[600], '--button-filled-bg-hover': P.palette[2].ramp[700], '--button-filled-text': '#FFFFFF' } }, h(Mini)), noCap: 'Nunca uses los colores de apoyo en una acción.' }),
        h(Para, null, 'Toda combinación incluye el ' + VALS.primario + '. Para dos colores, con ' + VALS.secundario + ' o con ' + VALS.terciario + '; para tres, los tres. Cuando hace falta uno solo, es el ' + VALS.primario + '.'),
        h(Avoid, { items: ['Evita combinar ' + VALS.secundario + ' y ' + VALS.terciario + ' sin el ' + VALS.primario + '.', 'Evita colores fuera de la paleta, salvo los de estado (error, advertencia, éxito).', 'Evita degradados en la interfaz. En comunicación, solo entre dos pasos vecinos de una misma familia.'] })),
      h(Sec, { title: 'Color en la interfaz' }, h(Para, null, X.interfaz),
        h('div', { className: 'ratio', 'aria-hidden': 'true' }, h('span', { style: { flex: 7, background: 'var(--ui-01)' } }), h('span', { style: { flex: 1.6, background: 'var(--text-01)' } }), h('span', { style: { flex: 1, background: ACC } }), h('span', { style: { flex: 0.4, background: P.palette[1].ramp[400] } })),
        h(Tbl, { title: 'Roles', columns: [{ key: 't', label: 'Token' }, { key: 'v', label: 'Valor' }, { key: 'u', label: 'Uso' }], rows: roles })),
      h(Sec, { title: 'Accesibilidad' },
        h(Para, null, 'El color no puede interponerse entre el mensaje y la persona. Todo texto pequeño necesita un contraste de 4,5:1; el texto grande y los gráficos, 3:1. Esta tabla muestra qué pasos del ' + VALS.primario + ' cumplen, con ' + inkName + ' encima y sobre el fondo oscuro de ALMA.'),
        h(Tbl, { title: 'Contraste del ' + VALS.primario, columns: [{ key: 's', label: 'Paso' }, { key: 'w', label: 'Con ' + inkName }, { key: 'k', label: 'Sobre el fondo oscuro' }], rows: acc }),
        h(Sub, { title: 'Daltonismo' }, h(Para, null, X.daltonismo))),
      h(Sec, { title: 'Color en acción' }, h(Para, null, X.accion), h('a', { className: 'web-body-l', href: '#' + PRE + 'producto' }, 'Ver la galería')),
      h(Origin, null, X.origen));
  }

  function Grilla() {
    var X = L.grilla, SP = ['space-8', 'space-16', 'space-24', 'space-32', 'space-48', 'space-64', 'space-80'];
    var rect = P.radius['radius-button'] === '0px';
    return h('div', { className: 'page' }, h(Head, { id: 'grilla', lede: X.lede, index: ['Unidad base', 'Columnas', 'Espacio', 'Proporciones', 'Forma'] }),
      h(Sec, { title: 'Unidad base' }, h(Para, null, 'Todo se mide en múltiplos de 8 px: tamaños, márgenes, separaciones y la altura de cada línea. La unidad base da precisión; la grilla da estructura. Juntas hacen que cualquier pieza encaje con cualquier otra.')),
      h(Sec, { title: 'Columnas' },
        h('div', { className: 'grid16', 'aria-hidden': 'true' }, Array.from({ length: 16 }).map(function (_, i) { return h('span', { key: i }); })),
        h(Tbl, { title: 'Grilla por ancho', columns: [{ key: 'b', label: 'Desde' }, { key: 'c', label: 'Columnas' }, { key: 'm', label: 'Margen' }, { key: 'g', label: 'Separación' }], rows: [
          { id: 1, b: '320 px', c: '4', m: '16 px', g: '8 px' }, { id: 2, b: '672 px', c: '8', m: '16 px', g: '32 px' },
          { id: 3, b: '1056 px', c: '16', m: '16 px', g: '32 px' }, { id: 4, b: '1584 px', c: '16', m: '24 px', g: '32 px' }] }),
        h(Para, null, 'Elige una división y mantenla en todo el diseño. El texto se alinea a las separaciones, no a los bordes del lienzo.')),
      h(Sec, { title: 'Espacio' },
        h('div', { className: 'spaces' }, SP.map(function (t) { return h('div', { key: t, className: 'spaces__row' }, h('span', { className: 'tok' }, t), h('span', { className: 'spaces__bar', style: { width: 'var(--' + t + ')' } }), h('span', { className: 'web-body-s cap' }, cssVar('--' + t))); })),
        h(Para, null, X.espacio)),
      h(Sec, { title: 'Proporciones' }, h(Para, null, 'Imágenes y contenedores usan proporciones comunes: 16:9, 4:3, 3:2, 1:1 y 9:16. El ancho se mide en columnas; el alto se deriva de la proporción.')),
      h(Sec, { title: 'Forma' },
        h('div', { className: 'cards' }, [['radius-button', P.radius['radius-button']], ['radius-card', P.radius['radius-card']], ['radius-field', P.radius['radius-field']], ['radius-checkbox', P.radius['radius-checkbox']]].map(function (r) {
          return h('div', { key: r[0], className: 'card card--static' }, h('div', { className: 'shape', style: { borderRadius: r[1] } }), h('span', { className: 'tok' }, r[0] + ' · ' + r[1]));
        })),
        h(Para, null, X.forma),
        h(Ex, { si: h(Mini), siCap: X.ex.siCap, no: h(Mini, { style: rect ? { '--radius-button': '24px', borderRadius: '16px', boxShadow: '0 12px 32px rgba(0,0,0,0.35)', marginLeft: '13px' } : { '--radius-button': '0px', '--radius-field': '0px', boxShadow: '0 12px 32px rgba(0,0,0,0.35)', marginLeft: '13px' }, titleStyle: { textAlign: 'center' } }), noCap: X.ex.noCap }),
        h(Avoid, { items: X.avoid })),
      h(Origin, null, X.origen));
  }

  function Iconografia() {
    var X = L.iconografia, N = ['search', 'information', 'warning', 'checkmark', 'renew', 'download', 'send', 'settings', 'user--avatar', 'add', 'close', 'view'];
    return h('div', { className: 'page' }, h(Head, { id: 'iconografia', lede: X.lede, index: ['El sistema', 'Principios', 'Tamaños', 'Color', 'Accesibilidad', 'Pictogramas'] }),
      h(Sec, { title: 'El sistema' }, h(Para, null, 'Usamos los iconos de ALMA, de la familia IBM Carbon: de línea, construidos sobre una grilla y con esquinas consistentes. No dibujamos iconos propios para un caso puntual; si falta uno, se propone al sistema.')),
      h(Sec, { title: 'Principios' }, X.principios.map(function (x) { return h(Sub, { key: x.t, title: x.t }, h(Para, null, x.p)); })),
      h(Sec, { title: 'Tamaños' }, [16, 24, 32].map(function (s) { return h(Frame, { key: s, label: s + ' px · ' + (s === 16 ? 'junto a un texto, con 16 px de separación' : s === 24 ? 'sueltos, en barras y acciones' : 'zonas vacías y estados') }, h('div', { className: 'icons', style: { gap: s } }, N.map(function (n) { return h(A.Icon, { key: n, name: n, size: s }); }))); })),
      h(Sec, { title: 'Color' }, h(Para, null, 'Los iconos toman el color del texto que acompañan. El acento se reserva para iconos activos o que son enlaces; los colores de estado, para información, advertencia, error y éxito.'),
        h(Ex, { si: h('div', { className: 'demo-row ex__center' }, h(A.Button, { variant: 'tertiary', iconBefore: 'download' }, X.ex.boton), h(A.Button, { variant: 'tertiary', iconBefore: 'send' }, 'Enviar')), siCap: 'Icono y texto juntos, en el color del texto.', no: h('div', { className: 'demo-row ex__center' }, h(A.Button, { variant: 'tertiary', iconBefore: 'download', 'aria-label': 'Descargar' }), h('span', { className: 'web-body-m ex__icotext' }, h(A.Icon, { name: 'information', size: 32 }), X.ex.texto)), noCap: 'Evita iconos solos y en el color de acento cuando no se pueden tocar; ni tamaños mezclados.' })),
      h(Sec, { title: 'Accesibilidad' }, h(Para, null, 'Todo icono interactivo tiene un área de toque de al menos 44 × 44 px y un nombre accesible. Los iconos decorativos se ocultan a los lectores de pantalla.')),
      h(Sec, { title: 'Pictogramas' }, h(Para, null, 'Un pictograma distingue una cosa de sus vecinas y va junto a su nombre: un sello para tipos de cosas, una letra para lo que va en orden y una criatura para lo que tiene carácter. Se dibuja con el mismo trazo y la misma grilla que un icono, y no lo reemplaza.'),
        h('div', { className: 'gen-row', style: { color: 'var(--nav-selected)' } }, ['seal', 'letter', 'creature'].map(function (k) { return h(A.Pictogram, { key: k, name: L.nombre + ' 1', kind: k, size: 32 }); }))),
      h(Avoid, { items: ['No uses iconos rellenos o en tres dimensiones.', 'No pongas un icono solo, sin etiqueta.', 'No uses dos iconos distintos para la misma idea.', 'No pintes con el acento un icono que no se puede tocar.'] }));
  }

  // ---------- Generative illustration: creatures, colonies, emblems and card faces, drawn by the generator
  // (window.__GENERADOR) from the entity's genes (L.genes, set by the build). Only for an entity whose language
  // declares them (ilustracion.generativa: the names and concepts of its examples). The words are written once here,
  // in the entity's first person, and take its values. Every drawing is decorative: its name or caption sits next to it.
  var GEN = window.__GENERADOR, G = L.genes, GV = GEN && G && L.ilustracion.generativa ? L.ilustracion.generativa : null;
  // An entity that does not use characters (generativa.personajes: false) keeps what is not one: the field, the
  // carousel, the mycelium, the emblems and the card faces. Creatures and colonies stay out.
  var PERS = !!GV && GV.personajes !== false;
  var CARAS = ['planks', 'vortex', 'petal', 'mesh', 'hole', 'card'];
  function Dibujo(p) { return h('span', { className: 'gen-av gen-av--' + p.size, 'aria-hidden': 'true', dangerouslySetInnerHTML: { __html: p.svg } }); }
  // Light or dark, whichever the page wears now (a ground colony has one palette for each).
  function useTema() {
    var leer = function () { return /light/.test(root.getAttribute('data-theme') || hostTheme()) ? 'light' : 'dark'; }, t = useState(leer());
    useEffect(function () { var mo = new MutationObserver(function () { t[1](leer()); }); mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] }); return function () { mo.disconnect(); }; }, []);
    return t[0];
  }
  function GenCriaturas() {
    var n = useState(GV.nombres[0]), clave = n[0].trim() || GV.nombres[0], mece = useState(!QUIETO);
    var lista = React.useMemo(function () { return GV.nombres.map(function (x) { return { nombre: x, svg: GEN.criatura(G, x) }; }); }, []);
    return h(Sec, { title: 'Criaturas' },
      h(Para, null, 'Nuestros personajes. Cada criatura es un cuerpo redondo, una segunda forma de otro color y dos ojos. No las dibujamos a mano: una regla las dibuja a partir de un nombre, y el mismo nombre da siempre la misma criatura.'),
      h('div', { className: 'gen-try' },
        h(A.TextInput, { label: 'Nombre o correo', value: n[0], onChange: function (v) { n[1](v); }, helper: 'Escribe un nombre y mira su criatura.', autoComplete: 'off' }),
        h('div', { className: 'gen-sizes' }, [96, 64, 48, 32].map(function (s) { return h(Dibujo, { key: s, size: s, svg: GEN.criatura(G, clave) }); }))),
      h('ul', { className: 'gen-people' }, lista.map(function (x) { return h('li', { key: x.nombre, className: 'gen-person' }, h(Dibujo, { size: 64, svg: x.svg }), h('span', { className: 'web-body-s' }, x.nombre)); })),
      h('p', { className: 'web-body-s cap note' }, 'Una criatura sirve de avatar o de mascota de una pieza. Acompaña al nombre; nunca lo reemplaza.'),
      h('h3', { className: 'web-h5 gen-sub' }, 'Con volumen'),
      h(Para, null, 'La misma criatura, con cuerpo: dos formas redondas y dos ojos, dibujadas ' + (G.relleno ? 'con su color y con anillos en el color del fondo' : 'solo con líneas') + '. Lleva ' + G.numeros[0] + ' anillos, uno de nuestros números. Se mece para mostrar la cara, y de frente es la criatura plana. Es para piezas grandes y animaciones; como avatar se usa la plana.'),
      h('div', { className: 'gen-vols' },
        h('figure', { className: 'gen-fig gen-vols__una' }, h(VG.Criatura, { key: clave, clave: clave, anda: mece[0], label: 'Criatura de ' + clave + ' con volumen: dos formas redondas con anillos y dos ojos, que se mece.' }), h('figcaption', { className: 'web-body-s cap' }, clave)),
        h('ul', { className: 'gen-vols__lista' }, GV.nombres.slice(1, 7).map(function (x) { return h('li', { key: x, className: 'gen-person' }, h(VG.Criatura, { clave: x, anda: mece[0], label: 'Criatura de ' + x + ' con volumen.' }), h('span', { className: 'web-body-s' }, x)); }))),
      h('div', { className: 'gen-row' },
        h(A.Button, { variant: 'tinted', iconBefore: mece[0] ? 'pause' : 'play', onClick: function () { mece[1](!mece[0]); } }, mece[0] ? 'Pausar' : 'Reproducir'),
        h('span', { className: 'web-body-s cap' }, QUIETO ? 'Parte en pausa porque pediste menos movimiento.' : 'Se detiene solo cuando sale de la pantalla.')));
  }
  // The character: the creature with a whole body. Its measures and its walk are worked out from the genes by the
  // build (entidades/personaje.mjs), the same ones Blender and Unity read; its portraits are pictures made there.
  function GenPersonaje() {
    var K = L.personaje, M = K.medidas, W = K.andar, R = K.retratos || {}, c = G.centros || [];
    var tiene = function (x) { return c.indexOf(x) >= 0; }, dos = function (v) { return String(Math.round(v * 100) / 100).replace('.', ','); }, veces = function (v) { return dos(v) + ' veces'; };
    var NOMBRE = { arcilla: 'Arcilla', laca: 'Laca', acrilico: 'Acrílico', tela: 'Tela', pelo: 'Pelo', rizo: 'Rizo', pua: 'Púa', pluma: 'Pluma', fleco: 'Fleco' };
    var peso = W.peso < 0.34 ? 'Liviano' : W.peso < 0.6 ? 'Medio' : 'Pesado', arriba = ['cabeza', 'ajna', 'garganta'].filter(tiene).length;
    var filas = [
      ['Contextura', G.tipo.charAt(0).toUpperCase() + G.tipo.slice(1) + ': ' + veces(M.alto) + ' el alto, ' + veces(M.ancho) + ' el ancho y ' + veces(M.miembro) + ' el grosor de brazos y piernas de un personaje llano.', 'Nuestro tipo da la contextura; nuestra fecha de nacimiento, la medida exacta.'],
      ['Forma', M.anguloso ? 'De bloques: cajas en vez de bolas.' : 'Redonda: bultos que se funden en una sola piel.', 'La redondez de nuestra carta.'],
      ['Piezas', 'Una masa por cada centro definido (' + c.length + '), un tubo por cada canal (' + (G.canales || []).length + ') y un detalle por cada puerta (' + (G.puertas || []).length + ').', 'Lo que nuestra carta tiene definido.'],
      ['Peso', peso + '. ' + (W.peso >= 0.6 ? 'Pasos cortos y lentos, con balanceo amplio.' : W.peso < 0.34 ? 'Pasos largos y rápidos, con rebote.' : 'Pasos parejos, con algo de rebote.'), 'Su ancho y su grosor' + (tiene('sacral') ? ', y el centro sacral definido.' : '.')],
      ['Postura', 'Se inclina ' + Math.round(-W.inclina) + '° hacia adelante.', arriba ? 'Tenemos ' + arriba + (arriba === 1 ? ' centro definido' : ' centros definidos') + ' entre cabeza y garganta: cada uno lo echa hacia adelante.' : 'No tenemos centros definidos en cabeza ni garganta: va casi erguido.'],
      ['Cojera', W.cojera < 0.12 ? 'No cojea.' : 'Cojea de la pierna ' + (W.pataCoja === 'I' ? 'izquierda' : 'derecha') + '.', tiene('raiz') ? (tiene('plexo') !== tiene('bazo') ? 'La raíz definida lo afirma, pero carga hacia el lado del ' + (tiene('plexo') ? 'plexo' : 'bazo') + ', que no tiene su par.' : 'La raíz definida lo afirma.') : 'Sin raíz definida, cojea.'],
      ['Ritmo', 'Un paso de cada pie cada ' + dos(W.ritmo) + ' segundos.', 'El ritmo de nuestra carta, más lento cuanto más pesa.']];
    return h(Sec, { title: 'Personaje' },
      h(Para, null, 'Nuestra criatura, de cuerpo entero. Tiene huesos, camina, y nada en ella se dibuja a mano: sus medidas, sus piezas y su manera de andar salen de nuestra carta. La misma carta da siempre el mismo personaje.'),
      R.piezas || R.pelaje ? h('div', { className: 'gen-retratos' },
        R.piezas ? h('figure', { className: 'gen-fig' }, h('img', { src: R.piezas, loading: 'lazy', alt: 'Personaje de ' + L.nombre + ' hecho de piezas: un cuerpo de arcilla con masas brillantes, tubos, botones y púas en nuestros colores.' }),
          h('figcaption', { className: 'web-body-s cap' }, 'Con piezas. El cuerpo es de arcilla; encima van masas, placas, tubos y detalles en laca, acrílico y tela.')) : null,
        R.pelaje ? h('figure', { className: 'gen-fig' }, h('img', { src: R.pelaje, loading: 'lazy', alt: 'Personaje de ' + L.nombre + ' cubierto de pelaje: pelo, plumas y flecos en nuestros colores, a medio paso.' }),
          h('figcaption', { className: 'web-body-s cap' }, 'Con pelaje. Cada zona del cuerpo lleva el suyo: pelo, rizo, púa, pluma o fleco. Se mueve al caminar.')) : null) : null,
      h(Tbl, { title: 'Su cuerpo y su andar', columns: [{ key: 'r', label: 'Rasgo' }, { key: 'v', label: 'Cómo es' }, { key: 'o', label: 'De dónde sale' }], rows: filas.map(function (f, i) { return { id: i, r: f[0], v: f[1], o: f[2] }; }) }),
      K.materiales ? h(Tbl, { title: 'Sus materiales', columns: [{ key: 'm', label: 'Material' }, { key: 'd', label: 'Cómo es y dónde va' }], rows: Object.keys(K.materiales).map(function (k, i) { return { id: i, m: NOMBRE[k] || k, d: K.materiales[k] }; }) }) : null,
      K.pelajes ? h(Tbl, { title: 'Su pelaje', columns: [{ key: 'm', label: 'Clase' }, { key: 'd', label: 'Cómo es' }], rows: Object.keys(K.pelajes).map(function (k, i) { return { id: i, m: NOMBRE[k] || k, d: K.pelajes[k] }; }) }) : null,
      h('p', { className: 'web-body-s cap note' }, 'El personaje se arma fuera de esta página: con piezas en Blender y con pelaje, en vivo, en Unity. Los dos leen el mismo archivo, que escribe el comando «npm run genes». Los materiales y las clases de pelaje son tokens de ALMA (familias material y pelaje): el color siempre es nuestro; el material solo dice cómo recibe la luz.'));
  }
  // The sheets: twelve drawings made only of strokes, ready for a pen plotter. Each is drawn when it nears the
  // screen, one after another, so the page does not stop to draw them all.
  function Lamina(p) {
    var ref = React.useRef(null), st = useState(null), aviso = useState(''), Lm = st[0];
    React.useEffect(function () {
      st[1](null);
      var el = ref.current, t = 0, hecho = false, hacer = function () { if (hecho) return; hecho = true; t = setTimeout(function () { st[1](GEN.lamina(G, p.l.id, { hoja: p.hoja, nombres: GV.nombres })); }, 30 + p.i * 40); };
      if (!window.IntersectionObserver) { hacer(); return function () { clearTimeout(t); }; }
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); hacer(); } }, { rootMargin: '300px' }); io.observe(el);
      return function () { io.disconnect(); clearTimeout(t); };
    }, [p.hoja]);
    function copiar() { var si = function () { aviso[1]('SVG copiado.'); }, no = function () { aviso[1]('No se pudo copiar aquí.'); }; try { navigator.clipboard.writeText(GEN.laminaSvg(Lm)).then(si, no); } catch (e) { no(); } }
    var c = Lm && Lm.cuenta, m = function (mm) { return coma(Math.round(mm / 100) / 10); };
    return h('li', { ref: ref, className: 'gen-lamina' },
      h('span', { className: 'gen-lamina__hoja' + (Lm ? '' : ' gen-lamina__hoja--espera'), dangerouslySetInnerHTML: Lm ? { __html: GEN.laminaSvg(Lm, { papel: G.pieza.base, nombre: p.l.titulo + ' de ' + L.nombre + ', dibujada solo con líneas.' }) } : undefined }),
      h('span', { className: 'web-label-l' }, p.l.titulo),
      h('span', { className: 'web-body-s cap' }, p.l.nota),
      Lm ? h('span', { className: 'web-body-s cap' }, c.trazos + ' trazos · ' + m(c.tinta) + ' m de tinta · ' + m(c.aire) + ' m en el aire · ' + Lm.capas.length + (Lm.capas.length === 1 ? ' pluma' : ' plumas') + ' · unos ' + Math.max(1, Math.round(c.minutos)) + ' min') : h('span', { className: 'web-body-s cap' }, 'Dibujando…'),
      h('span', { className: 'gen-row' }, h(A.Button, { variant: 'tinted', iconBefore: 'copy', disabled: !Lm, onClick: copiar }, 'Copiar SVG'), h('span', { className: 'web-body-s cap', role: 'status' }, aviso[0])));
  }
  function GenLaminas() {
    var hoja = useState('A4');
    return h(Sec, { title: 'Láminas' },
      h(Para, null, 'Doce dibujos de nuestro mundo hechos solo de trazos, para una pluma: sin rellenos, y sin dibujar lo que otra cosa tapa. Seis muestran nuestro terreno (como malla, en cubos, como ciudad, de frente, como maqueta y como mapa), una nuestra carta, una la dirección de nuestro campo y dos nuestras criaturas.'),
      h(Para, null, 'Cada lámina sale lista para un plotter: en milímetros, con una capa por pluma y los trazos unidos, simplificados y ordenados para que la pluma viaje poco. El tiempo es una estimación. Con `npm run laminas` se escriben las doce como archivos.'),
      h('div', { className: 'gen-row' }, h(A.SegmentedControl, { label: 'Hoja', options: Object.keys(GEN.HOJAS), value: hoja[0], onChange: hoja[1] })),
      h('ul', { className: 'gen-laminas' }, GEN.LAMINAS.map(function (l, i) { return h(Lamina, { key: l.id, l: l, i: i, hoja: hoja[0] }); })));
  }
  // The relief: the still texture. Two lands as pieces and the same two as grounds, with text on top.
  function GenRelieve() {
    var tema = useTema();
    var losas = React.useMemo(function () {
      return [['pieza', 1], ['pieza', 2], ['fondo', 1], ['fondo', 2]].map(function (x) { return { modo: x[0], n: x[1], estilo: { backgroundImage: GEN.comoFondo(GEN.relieveSvg(G, x[1], { modo: x[0], tema: tema })) } }; });
    }, [tema]);
    return h(Sec, { title: 'Relieve' },
      h(Para, null, 'El relieve es nuestro campo convertido en terreno, dibujado solo con líneas: cada fila muestra lo que asoma por encima de las de adelante. ' + RELIEVE_DIR[G.direccion] + (G.centros.length ? ' Cada uno de nuestros ' + G.centros.length + ' centros definidos es un cerro, en el lugar que ocupa en la carta.' : '') + ' Es nuestra textura quieta: como pieza va sobre negro con la paleta completa; como fondo se apaga hasta que el texto encima se lee con un contraste de 4,5:1 o más, en tema claro y oscuro.'),
      h('ul', { className: 'gen-tiles gen-tiles--anchas' }, losas.map(function (t) {
        var pieza = t.modo === 'pieza';
        return h('li', { key: t.modo + t.n }, h('figure', { className: 'gen-fig' },
          pieza ? h('div', { className: 'gen-tex gen-tex--relieve', style: t.estilo, role: 'img', 'aria-label': 'Relieve número ' + t.n + ', como pieza: filas de líneas de colores que suben en cerros sobre negro.' })
            : h('div', { className: 'gen-tex gen-tex--relieve gen-tex--fondo', style: t.estilo }, h('p', { className: 'web-h5' }, 'Texto sobre el relieve'), h('p', { className: 'web-body-s' }, 'El texto secundario también se lee.')),
          h('figcaption', { className: 'web-body-s cap' }, (pieza ? 'Pieza ' : 'Fondo ') + t.n)));
      })));
  }
  var RELIEVE_DIR = { foco: 'Tiene una cumbre donde nuestro campo converge.', estallido: 'Tiene ondas que salen de un punto.', giro: 'Tiene un anillo, por donde nuestro campo gira.', espiral: 'Tiene una espiral que se abre.', espejo: 'Una mitad es el espejo de la otra.' };
  function GenColonia() {
    var tema = useTema();
    var losas = React.useMemo(function () {
      return [['pieza', 1], ['pieza', 2], ['fondo', 1], ['fondo', 2]].map(function (x) { return { modo: x[0], n: x[1], estilo: { backgroundImage: GEN.comoFondo(GEN.colonia(G, x[1], { modo: x[0], tema: tema })) } }; });
    }, [tema]);
    return h(Sec, { title: 'Colonia' },
      h(Para, null, 'La colonia es nuestra textura: las mismas criaturas, vistas de muy cerca y amontonadas. Cada número da un mosaico distinto, que se repite sin costura. Como pieza de marca va sobre negro tinta, con la paleta completa y el acento solo en las criaturas más chicas. Como fondo se apaga hasta que el texto encima se lee con un contraste de 4,5:1 o más.'),
      h('ul', { className: 'gen-tiles' }, losas.map(function (t) {
        var pieza = t.modo === 'pieza';
        return h('li', { key: t.modo + t.n }, h('figure', { className: 'gen-fig' },
          pieza ? h('div', { className: 'gen-tex', style: t.estilo, role: 'img', 'aria-label': 'Colonia número ' + t.n + ', como pieza: criaturas de colores amontonadas sobre negro tinta, cada una con dos ojos.' })
            : h('div', { className: 'gen-tex gen-tex--fondo', style: t.estilo }, h('p', { className: 'web-h5' }, 'Texto sobre la colonia'), h('p', { className: 'web-body-s' }, 'El texto secundario también se lee.')),
          h('figcaption', { className: 'web-body-s cap' }, (pieza ? 'Pieza ' : 'Fondo ') + t.n)));
      })));
  }
  // Where an entity's field goes, by its type.
  var CAMPO_DIR = { foco: 'Todo converge hacia un foco.', estallido: 'Todo sale de un punto y se abre.', giro: 'Gira constante alrededor de su centro.', espiral: 'Gira y se abre en espiral.', espejo: 'Una mitad es el espejo de la otra.' };
  var CAMPO_AUT = { emocional: 'Respira en olas: se agita y se calma al avanzar.', sacral: 'Avanza a pulso, como un latido.', esplenica: 'Quieto y, de pronto, un salto breve.', ego: 'Va recto y firme, casi sin desvío.', autoproyectada: 'Sigue su propia dirección, sin sobresaltos.', mental: 'Va en capas paralelas y ordenadas.', lunar: 'Se agita y se calma muy lento, en un ciclo largo.' };
  function GenEmblemas() {
    var lista = React.useMemo(function () { return GEN.emblemasDe(G, GV.conceptos).map(function (x) { return { c: x.clave, svg: x.svg, puerta: x.puerta ? 'Puerta ' + x.puerta + '.' + x.linea : '' }; }); }, []);
    return h(Sec, { title: 'Emblemas' },
      h(Para, null, 'Un emblema por concepto. Cada uno nace de una de las ' + G.puertas.length + ' puertas de nuestra carta: una puerta es un hexagrama, y sus dos mitades eligen la silueta y el motivo; nuestra línea en esa puerta elige la marca, que lleva el acento. Por eso ninguna otra entidad tiene este mismo juego. Los nuestros van ' + (G.relleno ? 'rellenos' : 'de línea') + ' y usan nuestros números: ' + G.numeros.join(', ') + '.'),
      h(Para, null, 'Son ilustración de marca: no reemplazan a los iconos de la interfaz.'),
      h('ul', { className: 'gen-people gen-people--96' }, lista.map(function (x) { return h('li', { key: x.c, className: 'gen-person' }, h(Dibujo, { size: 96, svg: x.svg }), h('span', { className: 'web-body-s' }, x.c), x.puerta ? h('span', { className: 'web-label-s gen-nota' }, x.puerta) : null); })));
  }
  function GenCaras() {
    var lista = React.useMemo(function () { return CARAS.map(function (p, i) { return { p: p, estilo: { backgroundImage: GEN.comoFondo(GEN.placa(G, 'cara-0-' + i, { patron: p })) } }; }); }, []);
    return h(Sec, { title: 'Caras de tarjeta' },
      h(Para, null, 'Texturas hechas para una tarjeta, con nuestros colores sobre negro tinta. Hay ' + GEN.PATRONES.length + ' patrones y cada número da una cara distinta de cada uno. Estas son seis.'),
      h('ul', { className: 'gen-faces' }, lista.map(function (x) {
        return h('li', { key: x.p }, h('figure', { className: 'gen-fig' }, h('span', { className: 'gen-face', style: x.estilo, 'aria-hidden': 'true' }), h('figcaption', { className: 'web-body-s cap' }, GEN.NOMBRE_PATRON[x.p])));
      })));
  }

  // ---------- The generative signature. For an entity with generative illustration the bars give way to what the
  // generator draws: the field (its cover), the carousel and the mycelium move; creatures, colonies, emblems and card
  // faces are still, and live in Ilustración. Words are written once here and take the entity's values.
  var VG = GV && window.__GENERADOR_VISTAS ? window.__GENERADOR_VISTAS(G) : null;
  var QUIETO = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var coma = function (x) { return String(Math.round(x * 10) / 10).replace('.', ','); };
  // The piece of a format, where the bars used to go, always still: the cover is the field, the square a colony and
  // the story the grown mycelium. An entity without generative illustration keeps its signature of bars.
  function Pieza(p) {
    if (!VG) return h(En.Signature, { entity: E, P: P, format: p.format });
    if (p.format === 'square' && !PERS) return h('div', { className: 'gen-emblema', role: 'img', 'aria-label': 'Emblema de ' + L.nombre + ': una figura con sus colores, nacida de una puerta de su carta.', dangerouslySetInnerHTML: { __html: GEN.emblema(G, GV.conceptos[0]) } });
    if (p.format === 'square') return h('div', { className: 'gen-tex gen-tex--cuadro', style: { backgroundImage: GEN.comoFondo(GEN.colonia(G, 'portada', { modo: 'pieza' })) }, role: 'img', 'aria-label': 'Colonia de ' + L.nombre + ': criaturas de colores amontonadas sobre negro tinta, cada una con dos ojos.' });
    if (p.format === 'tall') return h(VG.Micelio, { clave: 1, anda: false, label: 'Micelio de ' + L.nombre + ': una red de líneas que cubre la pantalla de un teléfono, con un brillo de sus colores.' });
    return h(VG.Campo, { clave: 1, anda: false, label: 'Campo de ' + L.nombre + ': sus emblemas, de distintos tamaños, que dejan estela sobre negro.' });
  }
  function Control(p) {
    return h('div', { className: 'gen-row' },
      h(A.Button, { variant: 'tinted', iconBefore: p.anda ? 'pause' : 'play', onClick: p.onToggle }, p.anda ? 'Pausar' : 'Reproducir'),
      h(A.Button, { variant: 'gray', iconBefore: 'renew', onClick: p.onOtro }, p.otro),
      h('span', { className: 'web-body-s cap' }, QUIETO ? 'Parte en pausa porque pediste menos movimiento.' : 'Se detiene solo cuando sale de la pantalla.'));
  }
  function FirmaGenerativa() {
    // Each piece has its own pause: a piece paused before it was seen would stay as it was (the mycelium, not grown).
    var X = L.firma, fluye = useState(!QUIETO), gira = useState(!QUIETO), crece = useState(!QUIETO), sem = useState(1), mazo = useState(0), hifa = useState(1), R = VG.RING;
    var tog = function (s) { return function () { s[1](!s[0]); }; };
    var baraja = React.useMemo(function () { return VG.caras(mazo[0]); }, [mazo[0]]);
    var quietas = React.useMemo(function () {
      return (PERS ? [
        { t: 'Criaturas', svg: GEN.criatura(G, L.nombre) },
        { t: 'Colonia', bg: GEN.comoFondo(GEN.colonia(G, 1, { modo: 'pieza' })) }] : []).concat([
        { t: 'Relieve', bg: GEN.comoFondo(GEN.relieveSvg(G, 1, { ancho: 360, alto: 360, filas: 28 })) },
        { t: 'Emblemas', svg: GEN.emblema(G, GV.conceptos[0]) },
        { t: 'Caras de tarjeta', bg: GEN.comoFondo(GEN.placa(G, 'cara-0-2', { patron: 'petal' })) }]);
    }, []);
    var filas = [
      ['Fecha de nacimiento', 'La semilla: lo que hace propio cada dibujo', L.fechaLarga],
      ['Paleta', 'Los colores de todas las piezas', VALS.secundario + ' y ' + VALS.terciario + ', con acero; ' + VALS.primario + ' como acento'],
      ['Línea inconsciente', 'El remate de las líneas y la redondez de las tejas', 'El radio de nuestros botones: ' + VALS.radio],
      ['Puertas de la carta', 'La silueta, el motivo y la marca de cada emblema', G.puertas.length + ' puertas, cada una con nuestra línea'],
      ['Centros, canales y líneas del perfil', 'Las puntas y los lados de los emblemas', 'Nuestros números: ' + G.numeros.join(', ')],
      ['Centros definidos y línea consciente', 'Las tarjetas del carrusel', R.cantidad + ' tarjetas'],
      ['Garganta definida o abierta', 'Emblemas rellenos o de línea', G.relleno ? 'Rellenos' : 'De línea'],
      ['Centros definidos', 'Los focos desde donde crece el micelio', G.focos + ' focos'],
      [G.direccionPropia ? 'Dirección que elegimos' : 'Tipo', 'Hacia dónde va el campo', CAMPO_DIR[G.direccion]],
      [(G.direccionPropia ? 'Dirección' : 'Tipo') + ' y centros definidos', 'La forma y los cerros del relieve', RELIEVE_DIR[G.direccion] + ' ' + G.centros.length + ' cerros.'],
      ['Autoridad', 'Cómo respira el campo', CAMPO_AUT[G.autoridad]],
      ['Centros y canales definidos', 'Los remolinos y las corrientes del campo', G.centros.length + ' remolinos y ' + G.canales.length + ' corrientes'],
      ['Puertas de la carta', 'Las partículas del campo', 'Los emblemas de nuestras primeras ' + Math.min(12, G.puertas.length) + ' puertas'],
      ['Definición', 'El tamaño de las corrientes del campo', 'Remolinos de unos ' + Math.round(360 / G.grupos) + ' px'],
      ['Tipo', 'El ritmo de todo lo que se mueve', Math.round(100 / G.ritmo) + ' % de la velocidad base']];
    return h('div', { className: 'page' }, h(Head, { id: 'firma', lede: X.lede, index: ['Construcción', 'Campo', 'Carrusel', 'Micelio', 'Lo que no se mueve', 'Espacio y tamaño', 'Color', 'Movimiento', 'Usos incorrectos'] }),
      h(Sec, { title: 'Construcción' }, h(Para, null, X.construccion),
        h(Tbl, { title: 'Cada rasgo de la firma', columns: [{ key: 'r', label: 'Rasgo de la carta' }, { key: 'g', label: 'Qué decide' }, { key: 'v', label: 'En nuestra firma' }], rows: filas.map(function (f, i) { return { id: i, r: f[0], g: f[1], v: f[2] }; }) })),
      h(Sec, { title: 'Campo' },
        h(Para, null, 'Nuestra portada. Cada partícula es uno de nuestros emblemas, algunos mucho más grandes que el resto. ' + CAMPO_DIR[G.direccion] + ' ' + CAMPO_AUT[G.autoridad] + (G.centros.length ? ' Nuestros ' + G.centros.length + ' centros definidos son remolinos en el camino' + (G.canales.length ? ', y nuestros canales, corrientes entre ellos.' : '.') : '') + ' Van a ' + Math.round(100 / G.ritmo) + ' % de la velocidad base y dejan estela. Es una pieza de marca: no lleva texto encima.'),
        h(VG.Campo, { clave: sem[0], anda: fluye[0], label: 'Campo de ' + L.nombre + ': sus emblemas, de distintos tamaños, que derivan sobre negro y dejan estela.' }),
        h(Control, { anda: fluye[0], onToggle: tog(fluye), otro: 'Ver otro campo', onOtro: function () { sem[1](sem[0] + 1); } })),
      h(Sec, { title: 'Carrusel' },
        h(Para, null, 'Un anillo de ' + R.cantidad + ' tarjetas, una por cada centro definido más nuestra línea consciente, que gira en perspectiva y da una vuelta cada ' + coma(R.periodo) + ' segundos. Cada tarjeta lleva una cara distinta.'),
        h(VG.Carrusel, { caras: baraja, anda: gira[0], label: 'Carrusel de ' + L.nombre + ': ' + R.cantidad + ' tarjetas que giran en anillo, cada una con un patrón distinto: ' + baraja.map(function (c) { return c.nombre.toLowerCase(); }).join(', ') + '.' }),
        h(Control, { anda: gira[0], onToggle: tog(gira), otro: 'Ver otras ' + R.cantidad + ' caras', onOtro: function () { mazo[1](mazo[0] + 1); } })),
      h(Sec, { title: 'Micelio' },
        h(Para, null, 'Nuestra bienvenida en la pantalla de un teléfono. Una red crece desde ' + G.focos + ' focos, uno por cada centro que nos define, se bifurca en cada cruce y se une. Crece una sola vez, en ' + coma(4 * G.ritmo) + ' segundos, y después solo se mece: ese vaivén mueve el brillo.'),
        h(VG.Micelio, { clave: hifa[0], anda: crece[0], label: 'Micelio de ' + L.nombre + ': una red de líneas rectas que crece desde el borde inferior de la pantalla de un teléfono y toma un brillo de sus colores.' }),
        h(Control, { anda: crece[0], onToggle: tog(crece), otro: 'Ver otro micelio', onOtro: function () { hifa[1](hifa[0] + 1); } })),
      h(Sec, { title: 'Lo que no se mueve' },
        h(Para, null, (PERS ? 'Las criaturas, la colonia, el relieve, los emblemas' : 'El relieve, los emblemas') + ' y las caras de tarjeta salen de la misma regla y de la misma semilla.'),
        h('ul', { className: 'gen-people gen-people--96' }, quietas.map(function (q) {
          return h('li', { key: q.t, className: 'gen-person' }, q.svg ? h(Dibujo, { size: 96, svg: q.svg }) : h('span', { className: 'gen-av gen-av--96 gen-av--bg', 'aria-hidden': 'true', style: { backgroundImage: q.bg } }), h('span', { className: 'web-body-s' }, q.t));
        })),
        h('a', { className: 'web-body-l', href: '#' + PRE + 'ilustracion' }, 'Ver todas en Ilustración')),
      h(Sec, { title: 'Espacio y tamaño' }, h(Bullets, { items: [
        ['Sin texto encima.', 'El campo, el carrusel y el micelio van sin texto. El título va al lado o debajo, alineado a la grilla de 8 px.']].concat(PERS ? [
        ['Texto sobre textura.', 'Solo sobre la colonia o el relieve en su versión de fondo, que aseguran un contraste de 4,5:1 o más.'],
        ['Tamaño mínimo.', 'Una criatura se usa desde 32 px. Por debajo, se usa solo el nombre.']] : [
        ['Texto sobre textura.', 'Solo sobre el relieve en su versión de fondo, que asegura un contraste de 4,5:1 o más.'],
        ['Alineación.', 'Siempre a la grilla de 8 px y al margen izquierdo del contenido.']]) })),
      h(Sec, { title: 'Color' }, h(Para, null, X.color)),
      h(Sec, { title: 'Movimiento' }, h(Para, null, X.movimiento)),
      h(Sec, { title: 'Usos incorrectos' },
        h(Avoid, { items: ['No escribas texto encima del campo, del carrusel ni del micelio.', 'No cambies los colores de una pieza: salen de nuestra paleta.', 'No dibujes una pieza a mano ni la retoques: la dibuja la regla.', 'No dejes una pieza en movimiento sin una forma de pausarla.', 'No la uses dentro de un formulario, una tabla o un botón.'] })));
  }

  function Ilustracion() {
    var X = L.ilustracion;
    return h('div', { className: 'page' }, h(Head, { id: 'ilustracion', lede: X.lede, index: ['Punto de vista', 'Estilos'].concat(PERS ? ['Criaturas', 'Colonia'] : [], PERS && L.personaje ? ['Personaje'] : [], GV ? ['Relieve', 'Emblemas', 'Láminas', 'Caras de tarjeta'] : [], ['Personas', 'Color']) }),
      GV ? null : h(A.InlineNotification, { kind: 'callout', status: 'info', title: 'Reglas antes que piezas', message: 'ALMA todavía no tiene ilustraciones. Estas son las reglas que van a seguir cuando existan.' }),
      h(Sec, { title: 'Punto de vista' }, h(Para, null, X.puntoDeVista)),
      h(Sec, { title: 'Estilos' }, X.estilos.map(function (x) { return h(Sub, { key: x.t, title: x.t }, h(Para, null, x.p)); })),
      PERS ? h(GenCriaturas) : null, PERS ? h(GenColonia) : null, PERS && L.personaje ? h(GenPersonaje) : null, GV ? h(GenRelieve) : null, GV ? h(GenEmblemas) : null, GV ? h(GenLaminas) : null, GV ? h(GenCaras) : null,
      h(Sec, { title: 'Personas' }, h(Para, null, X.personas)),
      h(Sec, { title: 'Color' }, h(Para, null, X.color)),
      h(Avoid, { items: X.avoid }));
  }

  function Fotografia() {
    var X = L.fotografia;
    return h('div', { className: 'page' }, h(Head, { id: 'fotografia', lede: X.lede, index: ['Punto de vista', 'Tipos de imagen', 'Técnica'] }),
      h(A.InlineNotification, { kind: 'callout', status: 'info', title: 'Reglas antes que piezas', message: 'ALMA todavía no tiene un banco de fotografías. Estas son las reglas para elegir o producir las primeras.' }),
      h(Sec, { title: 'Punto de vista' }, h(Para, null, X.puntoDeVista)),
      h(Sec, { title: 'Tipos de imagen' }, X.tipos.map(function (x) { return h(Sub, { key: x.t, title: x.t }, h(Para, null, x.p)); })),
      h(Sec, { title: 'Técnica' }, h(Bullets, { items: X.tecnica })),
      h(Avoid, { items: X.avoid }));
  }

  function Barras(p) {
    var max = p.max || 140;
    return h('div', { className: 'bars bars--mini' }, p.vals.map(function (v, i) {
      var w = Math.max(2, (v[1] - p.min) / (max - p.min) * 100);
      return h('div', { key: i, className: 'bars__row' }, h('span', { className: 'web-body-s' }, v[0]), h('span', { className: 'bars__track' }, h('span', { className: 'bars__bar', style: { width: w + '%', background: p.color || p.colors[i] } })), h('span', { className: 'web-body-s bars__v' }, p.labels ? String(v[1]) : ''));
    }));
  }
  function Datos() {
    var X = L.datos, D0 = X.ejemplo, max = Math.max.apply(null, D0.barras.map(function (b) { return b[1]; })) * 1.1;
    var seq = [[0, 600], [1, 400], [2, 500], [0, 300], [1, 700], [2, 300]].map(function (x) { return { n: P.palette[x[0]].name + ' ' + x[1], c: P.palette[x[0]].ramp[x[1]] }; });
    var main = P.palette[0].ramp[600], low = Math.min.apply(null, D0.barras.slice(0, 3).map(function (b) { return b[1]; }));
    return h('div', { className: 'page' }, h(Head, { id: 'datos', lede: X.lede, index: X.criterios.map(function (c) { return c.t; }).concat(['Series de color', 'Ejemplo']) }),
      X.criterios.map(function (c, i) {
        return h(Sec, { key: c.t, title: c.t }, h(Para, null, c.p),
          i === 0 ? h(Ex, { si: h(Barras, { vals: D0.barras.slice(0, 3), min: 0, max: max, labels: true, color: main }), siCap: 'Desde cero, con el valor en cada barra y una sola serie.', no: h(Barras, { vals: D0.barras.slice(0, 3), min: low - 4, max: max, labels: false, colors: [P.palette[2].ramp[500], P.palette[1].ramp[400], P.palette[0].ramp[300]] }), noCap: 'Nunca cortes el eje: una diferencia pequeña parece enorme.' }) : null);
      }),
      h(Sec, { title: 'Series de color' }, h('div', { className: 'seq' }, seq.map(function (s, i) { return h('div', { key: i, className: 'seq__item' }, h('span', { className: 'seq__sw', style: { background: s.c } }), h('span', { className: 'web-label-m' }, (i + 1) + ' · ' + s.n), h('span', { className: 'tok' }, s.c)); })), h(Para, null, 'Una sola serie va en el ' + VALS.primario + ' 600. Las demás siguen este orden, que alterna familia y luminosidad para que dos series vecinas nunca se confundan.')),
      h(Sec, { title: 'Ejemplo' }, h(Frame, { label: D0.titulo },
        h('div', { className: 'bars', role: 'img', 'aria-label': D0.titulo + ': ' + D0.barras.map(function (b) { return b[0] + ' ' + b[1] + (b[2] ? ' (estimado)' : ''); }).join(', ') + '.' }, D0.barras.map(function (b) {
          return h('div', { key: b[0], className: 'bars__row' }, h('span', { className: 'web-body-m' }, b[0]), h('span', { className: 'bars__track' }, h('span', { className: 'bars__bar' + (b[2] ? ' bars__bar--est' : ''), style: { width: (b[1] / max * 100) + '%', background: main } })), h('span', { className: 'web-body-m bars__v' }, b[1] + (b[2] ? ' · estimado' : '')));
        })),
        h('p', { className: 'web-body-s cap' }, D0.fuente))),
      h(Avoid, { items: X.avoid }),
      h(Origin, null, X.origen));
  }

  function Movimiento() {
    var X = L.movimiento, D = ['duration-fast-01', 'duration-fast-02', 'duration-moderate-01', 'duration-moderate-02', 'duration-slow-01', 'duration-slow-02'];
    var ms = function (v) { var n = parseFloat(v); return /ms/.test(v) ? n : n * 1000; };
    var rows = D.map(function (t) { var b = ms(cssVar('--' + t)); return { id: t, t: t, a: isNaN(b) ? '—' : b + ' ms', e: isNaN(b) ? '—' : Math.round(b * P.motion.speed) + ' ms' }; });
    return h('div', { className: 'page' }, h(Head, { id: 'movimiento', lede: X.lede, index: ['Enfoque', 'Productivo y expresivo', 'Duraciones', 'Movimiento reducido', 'Aplicaciones'] }),
      h(Sec, { title: 'Enfoque' }, X.enfoque.map(function (x) { return h(Sub, { key: x.t, title: x.t }, h(Para, null, x.p)); })),
      h(Sec, { title: 'Productivo y expresivo' }, h('div', { className: 'motion' }, h('div', { className: 'motion__track', 'aria-hidden': 'true' }, h('span', { className: 'motion__bar' }))), h(Para, null, X.curvas)),
      h(Sec, { title: 'Duraciones' }, h(Tbl, { title: 'Duraciones de ALMA y las nuestras (× ' + VALS.velocidad + ')', columns: [{ key: 't', label: 'Token' }, { key: 'a', label: 'ALMA' }, { key: 'e', label: 'Nuestra' }], rows: rows })),
      h(Sec, { title: 'Movimiento reducido' }, h(Para, null, 'Si la persona pidió menos movimiento, no animamos: mostramos el estado final de inmediato. Ningún contenido depende de una animación para entenderse.')),
      h(Sec, { title: 'Aplicaciones' }, h(Bullets, { items: X.aplicaciones })),
      h(Avoid, { items: X.avoid }),
      h(Origin, null, X.origen));
  }

  // ---------- Galería
  function Producto() {
    var X = L.producto, S = X.pantalla;
    return h('div', { className: 'page' }, h(Head, { id: 'producto', lede: X.lede }),
      h(Frame, { label: 'Pantalla de ejemplo' },
        h('div', { className: 'screen' },
          h('div', { className: 'screen__head' }, h('h2', { className: 'web-h3', style: { margin: 0 } }, S.titulo), h('div', { className: 'demo-row' }, h(A.Button, { variant: 'tertiary' }, S.secundaria), h(A.Button, { variant: 'filled', role: 'primary' }, S.primaria))),
          h(A.InlineNotification, { status: S.aviso.status, title: S.aviso.title, message: S.aviso.message }),
          h('div', { className: 'tbl' }, h(A.Table, { title: S.tabla, headingLevel: 3, columns: S.columnas, rows: S.filas.map(function (r, i) { return Object.assign({ id: i }, r); }) })),
          h('p', { className: 'web-body-s cap' }, S.pie))),
      h(Tbl, { title: 'Qué principio aplica cada parte', columns: [{ key: 'p', label: 'Parte' }, { key: 'r', label: 'Principio' }], rows: X.mapa.map(function (m, i) { return { id: i, p: m[0], r: m[1] }; }) }));
  }

  function Comunicacion() {
    var X = L.comunicacion;
    return h('div', { className: 'page' }, h(Head, { id: 'comunicacion', lede: X.lede }),
      h(Frame, { label: 'Portada 16:9 · anuncio' }, h(Pieza, { format: 'wide' }),
        h('div', { className: 'piece' }, h('p', { className: 'web-label-m eyebrow' }, X.portada.eyebrow), h('h2', { className: 'web-h2', style: { margin: 0 } }, X.portada.titulo), h('p', { className: 'web-body-l cap' }, X.portada.texto), h(Btns, { primary: X.portada.boton }))),
      h('div', { className: 'pieces' },
        h(Frame, { label: 'Publicación 1:1' }, h(Pieza, { format: 'square' }), h('div', { className: 'piece' }, h('h3', { className: 'web-h4', style: { margin: 0 } }, X.cuadrado.titulo), h('p', { className: 'web-body-m cap' }, X.cuadrado.texto))),
        h(Frame, { label: 'Historia 9:16' }, h(Pieza, { format: 'tall' }), h('div', { className: 'piece' }, h('h3', { className: 'web-h4', style: { margin: 0 } }, X.historia.titulo), h('p', { className: 'web-body-m cap' }, X.historia.texto)))));
  }

  function Componentes() {
    var t = useState('dark');
    return h('div', { className: 'page' }, h(Head, { id: 'componentes', lede: 'Los componentes de ALMA con los parámetros de la entidad, junto a ALMA de hoy. No hay componentes nuevos: cambian los tokens.' }),
      h(A.SegmentedControl, { label: 'Tema', options: [{ value: 'dark', label: 'Oscuro' }, { value: 'light', label: 'Claro' }], value: t[0], onChange: t[1] }),
      h('div', { className: 'compare' }, h(En.Preview, { entity: E, P: P, theme: t[0], caption: 'Entidad ' + L.nombre }), h(En.Preview, { entity: E, P: null, theme: t[0], caption: 'ALMA hoy' })));
  }

  // ---------- Origen
  function Carta() {
    var R = L.carta;
    var rasgos = [
      { id: 1, k: 'Tipo', v: En.TYPES[E.type].name, r: 'Estrategia: ' + En.TYPES[E.type].strategy.toLowerCase() + '. ' + R.tipo },
      { id: 2, k: 'Perfil', v: C.perfil + ' · ' + En.LINES[a[0]] + ' / ' + En.LINES[a[1]], r: R.perfil },
      { id: 3, k: 'Autoridad', v: En.AUTH[E.auth].name, r: R.autoridad },
      { id: 4, k: 'Definición', v: En.DEFS[E.def].name, r: R.definicion },
      { id: 5, k: 'Centros definidos', v: C.definidos.map(CENTRO).join(', '), r: R.centros },
      { id: 6, k: 'Canales', v: C.canales.map(function (k) { return k.id + ' · ' + CT.CANAL_NOMBRE[k.id]; }).join(' · '), r: 'Sus rasgos fijos. Se convierten en sus principios.' },
      { id: 7, k: 'Cruz', v: C.cruz.puertas.join(' / ') + ' · ángulo ' + C.cruz.angulo, r: 'Su propósito: Sol y Tierra conscientes, Sol y Tierra inconscientes.' }
    ];
    var act = C.personalidad.map(function (p, i) { var d = C.diseno[i]; return { id: i, c: p.cuerpo, p: p.puerta + '.' + p.linea + ' · ' + HEX(p.puerta), d: d.puerta + '.' + d.linea + ' · ' + HEX(d.puerta) }; });
    return h('div', { className: 'page' }, h(Head, { id: 'carta', lede: 'Nos conocemos porque tenemos carta, calculada con efemérides reales para el ' + L.fechaLarga + '. El lado inconsciente es el ' + new Date(C.utc.diseno).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) + ', cuando el Sol estaba 88° antes.' }),
      h('div', { className: 'carta-grid' },
        h('div', { className: 'chart__graph carta-graph' }, h(En.BodyGraph, { entity: E, P: P })),
        h('div', { className: 'sec' }, h(Tbl, { title: 'Rasgos de la entidad', columns: [{ key: 'k', label: 'Rasgo' }, { key: 'v', label: 'Valor' }, { key: 'r', label: 'Qué dice' }], rows: rasgos }))),
      h(Sec, { title: 'Los canales' }, h(Cards, { items: C.canales.map(function (k) {
        var pp = k.puertas.map(function (n) { return CT.PUERTAS[n]; });
        return [CT.CANAL_NOMBRE[k.id], pp[0].principio + ' y ' + pp[1].principio.charAt(0).toLowerCase() + pp[1].principio.slice(1) + '.', 'Canal ' + k.id + ' · ' + k.centros.map(CENTRO).join(' y ')];
      }) })),
      h(Tbl, { title: 'Activaciones: puerta.línea', columns: [{ key: 'c', label: 'Cuerpo' }, { key: 'p', label: 'Consciente (personalidad)' }, { key: 'd', label: 'Inconsciente (diseño)' }], rows: act }));
  }

  function Fecha() {
    var X = L.fecha;
    return h('div', { className: 'page' }, h(Head, { id: 'fecha', lede: X.lede }),
      X.ventanas ? h(Sec, { title: 'La búsqueda' }, h(Para, null, X.busqueda),
        h(Tbl, { title: X.ventanas.titulo, columns: [{ key: 'f', label: 'Fecha y horas' }, { key: 'k', label: 'Canales' }, { key: 'c', label: 'Cruz' }, { key: 'a', label: 'Acento (mejor hora)' }, { key: 'd', label: 'ΔE a la referencia' }], rows: X.ventanas.filas.map(function (w, i) { return { id: i, f: w.fecha + ' · ' + w.horas, k: w.canales, c: w.cruz, a: h('span', { className: 'stat__v' }, h(Chip, { c: w.acento }), w.acento), d: fmt3(w.dE) + (w.elegida ? ' · elegida' : '') }; }) })) : null,
      X.secciones.map(function (s) { return h(Sec, { key: s.titulo, title: s.titulo }, s.parrafos ? h(Paras, { items: s.parrafos }) : null, s.bullets ? h(Bullets, { items: s.bullets }) : null); }),
      X.aviso ? h(A.InlineNotification, { kind: 'callout', status: 'warning', title: X.aviso.title, message: T(X.aviso.message) }) : null);
  }

  function Calibracion() {
    var X = L.calibracion, d = P.accent.dark, l = P.accent.light;
    var GEN = { acento: d['interactive-01'], hover: d['hover-primary'], texto: d['text-on-interactive'], linkDark: d['link-01'], linkLight: l['link-01'], radio: P.radius['radius-button'].replace('px', ' px'), ancho: String(P.fontWidth), pesos: VALS.pesos, apoyo: P.palette[1].name + ', ' + P.palette[2].name, grilla: '8 px (ALMA)',
      secundario: l['interactive-02'] + ' en claro · ' + d['interactive-02'] + ' en oscuro', terciario: l['interactive-04'] + ' en claro · ' + d['interactive-03'] + ' en oscuro', foco: l['focus'] + ' en claro · ' + d['focus'] + ' en oscuro' };
    return h('div', { className: 'page' }, h(Head, { id: 'calibracion', lede: X.lede }),
      h(Tbl, { title: X.titulo, columns: [{ key: 'e', label: 'Elemento' }, { key: 'g', label: 'Genera la entidad' }, { key: 'i', label: X.columnaReferencia }, { key: 'ok', label: 'Resultado' }, { key: 'r', label: X.columnaReal }], rows: X.filas.map(function (f, i) { return { id: i, e: f.e, g: GEN[f.k], i: f.ref, ok: f.ok, r: f.real }; }) }),
      h(Sec, { title: 'Lo que la calibración corrigió en las reglas' }, h(Bullets, { items: X.corrigio })),
      h(Sec, { title: 'Lo que no cambia' }, h(Bullets, { items: X.noCambia })),
      h('p', { className: 'web-body-s cap note' }, T(X.nota)));
  }

  var VIEWS = { inicio: Inicio, 'punto-de-vista': PuntoDeVista, principios: Principios, prisma: Prisma, voz: Voz, tono: Tono, escritura: Escritura, firma: VG ? FirmaGenerativa : Firma, tipografia: Tipografia, fundamentos: Fundamentos, color: Color, grilla: Grilla, iconografia: Iconografia, ilustracion: Ilustracion, fotografia: Fotografia, datos: Datos, movimiento: Movimiento, producto: Producto, comunicacion: Comunicacion, componentes: Componentes, carta: Carta, fecha: Fecha, calibracion: Calibracion };

  function App() {
    var r = useState(route()), th = useState(hostTheme());
    var narrow = window.matchMedia && matchMedia('(max-width: 1055px)').matches, hid = useState(narrow);
    useEffect(function () { wear(th[0]); }, [th[0]]);
    useEffect(function () {
      function on() { r[1](route()); window.scrollTo(0, 0); var t = document.getElementById('titulo'); if (t) t.focus({ preventScroll: true }); if (window.matchMedia && matchMedia('(max-width: 1055px)').matches) hid[1](true); }
      window.addEventListener('hashchange', on);
      var mo = new MutationObserver(function () { var v = root.getAttribute('data-theme'); if ((v === 'light' || v === 'dark') && v !== th[0]) th[1](v); });
      mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
      return function () { window.removeEventListener('hashchange', on); mo.disconnect(); };
    }, [th[0]]);
    var groups = [{ items: [{ value: 'inicio', label: 'Inicio', icon: 'home', href: '#inicio' }] }].concat(GROUPS.map(function (g) {
      return { title: g, items: PAGES.filter(function (p) { return p.group === g; }).map(function (p) { return { value: p.id, label: p.title, icon: p.icon, href: '#' + p.id }; }) };
    }));
    var light = th[0] === 'light';
    return h('div', { className: 'app' },
      h('a', { className: 'skip', href: '#contenido' }, 'Saltar al contenido'),
      h(A.Toolbar, { title: 'Entidad ' + L.nombre + ' · Lenguaje de diseño', sticky: true, actions: [{ label: light ? 'Usar tema oscuro' : 'Usar tema claro', icon: light ? 'asleep' : 'light', onPress: function () { th[1](light ? 'dark' : 'light'); } }] }),
      h('div', { className: 'shell' },
        h('div', { className: 'nav' }, h(A.Sidebar, { label: 'Secciones del lenguaje de diseño', value: r[0], groups: groups, hidden: hid[0], onHiddenChange: hid[1], onChange: function (v) { location.hash = v; } })),
        h('main', { id: 'contenido', className: 'main' }, h(VIEWS[r[0]]))));
  }

  return { pages: PAGES, groups: GROUPS, views: VIEWS, start: function () { wear(hostTheme()); ReactDOM.createRoot(document.getElementById('root')).render(h(App)); } };
  }
  window.__LENGUAJE_HACER = build;
  if (window.__LENGUAJE) build(window.__LENGUAJE, '').start();
})();
