// Entidades ALMA: create entities from a birth date, read their Human Design chart and see ALMA worn with their
// parameters (type axes, weights, radii, palette, voice and principles). Also the engine for the IBM study and the date search.
(function () {
  // (frames are asked of ALMA's clock, site/reloj.js, when the page has it)
  var pideCuadro = function (f) { return window.AlmaReloj ? window.AlmaReloj.pide(f) : requestAnimationFrame(f); }, dejaCuadro = function (id) { if (window.AlmaReloj) window.AlmaReloj.deja(id); else cancelAnimationFrame(id); };
  var h = React.createElement, A = window.AlmaDS, useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, useMemo = React.useMemo;
  var D = window.__DATA; // { ramps, brand, base: { fontAxis, weights, radius, accent } }
  var root = document.documentElement;
  var INK = D.brand['brand-ink'], WHITE = '#FFFFFF', UI02_LIGHT = '#F8FBFC';

  // ---------- Theme of the page (ALMA is dark first; follow the host, else the system).
  function hostTheme() { var v = root.getAttribute('data-theme'); if (v === 'light' || v === 'dark') return v; return window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; }
  function paint(t) { root.setAttribute('data-theme', t); root.style.colorScheme = t; }

  // ---------- Human Design vocabulary (the parts of a chart this tool reads).
  var CENTERS = [
    { id: 'cabeza', name: 'Cabeza', ramp: 'purple', role: 'inspiración' },
    { id: 'ajna', name: 'Ajna', ramp: 'blue', role: 'conceptos' },
    { id: 'garganta', name: 'Garganta', ramp: 'cyan', role: 'expresión' },
    { id: 'g', name: 'G', ramp: 'lime', role: 'identidad y dirección' },
    { id: 'corazon', name: 'Corazón', ramp: 'red', role: 'voluntad' },
    { id: 'plexo', name: 'Plexo solar', ramp: 'magenta', role: 'emoción' },
    { id: 'sacro', name: 'Sacro', ramp: 'yellow', role: 'energía vital' },
    { id: 'bazo', name: 'Bazo', ramp: 'teal', role: 'intuición' },
    { id: 'raiz', name: 'Raíz', ramp: 'green', role: 'presión y ritmo' }
  ];
  var TYPES = {
    manifestador: { name: 'Manifestador', strategy: 'Informar antes de actuar', motion: 'expresivo', speed: 0.8, note: 'Inicia: movimiento expresivo y veloz.' },
    generador: { name: 'Generador', strategy: 'Esperar para responder', motion: 'productivo', speed: 1, note: 'Sostiene: movimiento productivo y constante.' },
    mg: { name: 'Generador Manifestante', strategy: 'Responder y luego informar', motion: 'productivo', speed: 0.7, note: 'Responde rápido: productivo y el más veloz.' },
    proyector: { name: 'Proyector', strategy: 'Esperar la invitación', motion: 'productivo', speed: 1.25, note: 'Guía: productivo, preciso y sereno.' },
    reflector: { name: 'Reflector', strategy: 'Esperar un ciclo lunar', motion: 'expresivo', speed: 1.6, note: 'Refleja: expresivo y lento; su color cambia en ciclo.' }
  };
  var AUTH = {
    emocional: { name: 'Emocional', center: 'plexo', weights: { display: 200, heading: 340, body: 350, emphasis: 600 }, note: 'Decide en olas: mucho contraste entre pesos.' },
    sacral: { name: 'Sacral', center: 'sacro', weights: { display: 500, heading: 500, body: 400, emphasis: 650 }, note: 'Decide con el cuerpo: pesos firmes.' },
    esplenica: { name: 'Esplénica', center: 'bazo', weights: { display: 300, heading: 400, body: 350, emphasis: 500 }, note: 'Decide al instante: pesos ligeros y ágiles.' },
    ego: { name: 'Del ego', center: 'corazon', weights: { display: 700, heading: 600, body: 400, emphasis: 700 }, note: 'Decide con la voluntad: los pesos más fuertes.' },
    autoproyectada: { name: 'Autoproyectada', center: 'g', weights: { display: 400, heading: 450, body: 380, emphasis: 550 }, note: 'Decide al escucharse: pesos equilibrados.' },
    mental: { name: 'Mental', center: 'ajna', weights: { display: 300, heading: 400, body: 400, emphasis: 600 }, note: 'Decide conversando: pesos claros y regulares.' },
    lunar: { name: 'Lunar', center: null, weights: { display: 180, heading: 330, body: 340, emphasis: 450 }, note: 'Decide con el tiempo: los pesos más livianos.' }
  };
  var PROFILES = ['1/3', '1/4', '2/4', '2/5', '3/5', '3/6', '4/6', '4/1', '5/1', '5/2', '6/2', '6/3'];
  var LINES = ['', 'Investigador', 'Ermitaño', 'Mártir', 'Oportunista', 'Hereje', 'Modelo a seguir'];
  // Unconscious (design) line → the shape of things: 1 builds on firm ground, 6 sees the whole from above.
  var SHAPE = ['', { base: 2, note: 'bases firmes: esquinas casi rectas' }, { base: 12, note: 'natural y retirada: esquinas suaves' }, { base: 0, note: 'prueba y error: ángulos rectos, sin adorno' }, { base: 16, note: 'hecha de vínculos: formas amables' }, { base: 24, note: 'proyectada al mundo: formas amplias' }, { base: 100, note: 'mirada completa: píldoras' }];
  var DEFS = { ninguna: { name: 'Sin definición', parts: 0 }, simple: { name: 'Simple', parts: 1 }, partida: { name: 'Partida', parts: 2 }, triple: { name: 'Triple partida', parts: 3 }, cuadruple: { name: 'Cuádruple partida', parts: 4 } };

  function centerOf(id) { return CENTERS.filter(function (c) { return c.id === id; })[0]; }

  // Simplified reading: real charts depend on channels, so these are suggestions the person can override.
  function derive(centers) {
    var on = function (id) { return centers.indexOf(id) >= 0; };
    var auth = on('plexo') ? 'emocional' : on('sacro') ? 'sacral' : on('bazo') ? 'esplenica' : on('corazon') ? 'ego' : on('g') ? 'autoproyectada' : centers.length ? 'mental' : 'lunar';
    var type = !centers.length ? 'reflector' : on('sacro') ? (on('garganta') ? 'mg' : 'generador') : (on('garganta') && (on('corazon') || on('plexo') || on('raiz')) ? 'manifestador' : 'proyector');
    return { auth: auth, type: type };
  }
  function warnings(e) {
    if (e.carta) {
      var c = e.carta, v = [];
      if (e.type !== c.tipo) v.push('La carta dice ' + TYPES[c.tipo].name + '; ahora es ' + TYPES[e.type].name + '.');
      if (e.auth !== c.autoridad) v.push('La carta dice autoridad ' + AUTH[c.autoridad].name + '; ahora es ' + AUTH[e.auth].name + '.');
      if (e.profile !== c.perfil) v.push('La carta dice perfil ' + c.perfil + '; ahora es ' + e.profile + '.');
      if (e.def !== c.definicion) v.push('La carta dice definición ' + DEFS[c.definicion].name.toLowerCase() + '.');
      if (e.centers.slice().sort().join() !== c.definidos.slice().sort().join()) v.push('Los centros definidos ya no son los de la carta.');
      return v;
    }
    var d = derive(e.centers), w = [];
    if (e.type !== d.type) w.push('Con estos centros, la lectura simplificada da ' + TYPES[d.type].name + '. Si tu carta dice ' + TYPES[e.type].name + ', se respeta tu elección.');
    if (e.auth !== d.auth) w.push('Con estos centros, la autoridad simplificada sería ' + AUTH[d.auth].name + '.');
    if (e.type === 'reflector' && e.centers.length) w.push('Un Reflector no tiene centros definidos.');
    if (DEFS[e.def].parts > e.centers.length || (e.centers.length && e.def === 'ninguna')) w.push('La definición no calza con la cantidad de centros definidos.');
    return w;
  }

  // ---------- Randomness with a seed, so every entity always draws the same.
  function hash(s) { var x = 2166136261; for (var i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
  function rng(seed) { var a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function nameFrom(r) {
    var C = ['l', 'm', 'n', 'r', 's', 't', 'v', 'd', 'b', 'c'], V = ['a', 'e', 'i', 'o', 'u'], n = 2 + Math.floor(r() * 2), s = '';
    for (var i = 0; i < n; i++) s += C[Math.floor(r() * C.length)] + V[Math.floor(r() * V.length)];
    if (r() < 0.5) s += ['n', 'r', 'l', 's'][Math.floor(r() * 4)];
    s = V[Math.floor(r() * V.length)] + s; return s.charAt(0).toUpperCase() + s.slice(1);
  }
  // ---------- Birth → chart (the engine is entidades/carta.mjs from the repository, bundled into this page).
  var CARTA = window.__CARTA;
  var ZONES = Intl.supportedValuesOf ? Intl.supportedValuesOf('timeZone') : ['UTC', 'America/Santiago', 'America/New_York', 'Europe/Madrid'];
  var BIRTH_ZONES = ['America/Santiago', 'America/Buenos_Aires', 'America/Mexico_City', 'America/Bogota', 'America/New_York', 'America/Los_Angeles', 'Europe/Madrid', 'Europe/London', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Kolkata', 'Australia/Sydney'];
  function withCarta(e) {
    var n = e.nacimiento;
    if (!n || !n.fecha || !n.zona) return Object.assign({}, e, { carta: null, cartaError: null });
    var c;
    try { c = CARTA.calcularCarta({ fecha: n.fecha, hora: n.hora || undefined, zona: n.zona }); }
    catch (x) { return Object.assign({}, e, { carta: null, cartaError: x.message }); }
    var act = function (list) { return list.map(function (a) { return { c: a.cuerpo, p: a.puerta, l: a.linea }; }); };
    return Object.assign({}, e, {
      cartaError: null, type: c.tipo, auth: c.autoridad, profile: c.perfil, def: c.definicion, centers: c.definidos.slice(),
      carta: { tipo: c.tipo, autoridad: c.autoridad, detalle: c.detalleAutoridad, perfil: c.perfil, definicion: c.definicion, definidos: c.definidos,
        puertas: c.puertas, lado: c.lado, canales: c.canales.map(function (k) { return k.id; }), cruz: c.cruz, utc: c.utc, horaConocida: c.entrada.horaConocida,
        personalidad: act(c.personalidad), diseno: act(c.diseno) }
    });
  }
  function seedKey(e) { var n = e.nacimiento; return n && n.fecha ? 'nac|' + n.fecha + '|' + (n.hora || '') + '|' + n.zona : null; }
  function randomBirth(r) {
    var t = Date.UTC(1900, 0, 1) + r() * (Date.UTC(2030, 11, 31) - Date.UTC(1900, 0, 1)), d = new Date(t);
    var pad = function (x) { return String(x).padStart(2, '0'); };
    return { fecha: d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()), hora: pad(Math.floor(r() * 24)) + ':' + pad(Math.floor(r() * 60)), zona: BIRTH_ZONES[Math.floor(r() * BIRTH_ZONES.length)] };
  }
  function bornEntity(seed) { var r = rng(seed); return withCarta({ id: String(seed), name: nameFrom(r), nacimiento: randomBirth(r), type: 'generador', auth: 'sacral', profile: '1/3', def: 'simple', centers: [], variation: 0 }); }
  function randomEntity(seed) {
    var r = rng(seed), centers = CENTERS.filter(function () { return r() < 0.45; }).map(function (c) { return c.id; });
    if (r() < 0.06) centers = [];
    var d = derive(centers), n = centers.length;
    var def = !n ? 'ninguna' : n === 1 ? 'simple' : (function () { var x = r(); return x < 0.42 ? 'simple' : x < 0.86 || n < 3 ? 'partida' : x < 0.97 || n < 4 ? 'triple' : 'cuadruple'; })();
    return { id: String(seed), name: nameFrom(r), type: d.type, auth: d.auth, profile: PROFILES[Math.floor(r() * PROFILES.length)], def: def, centers: centers, variation: 0 };
  }
  var BORN = { id: 'ibm-1911', name: 'IBM', nacimiento: { fecha: '1911-06-16', hora: '', zona: 'America/New_York' }, type: 'generador', auth: 'sacral', profile: '2/5', def: 'partida', centers: [], variation: 0 };
  var REFERENCE = { id: 'referencia', name: 'Referencia 1/3', type: 'manifestador', auth: 'emocional', profile: '1/3', def: 'partida', centers: ['garganta', 'plexo', 'raiz', 'bazo'], variation: 0 };

  // ---------- Color: every entity builds its own palette in OKLCH; only the steps that pass WCAG AA are used.
  function lum(hex) { var v = [1, 3, 5].map(function (i) { var c = parseInt(hex.substr(i, 2), 16) / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function ramp(name, step) { if (name === 'lime') return step <= 300 ? D.brand['brand-lime'] : D.base.accent.hover; return D.ramps[name][step]; }
  function oklch(L, C, H) {
    var a = C * Math.cos(H * Math.PI / 180), b = C * Math.sin(H * Math.PI / 180);
    var l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3), m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3), s = Math.pow(L - 0.0894841775 * a - 1.2914855480 * b, 3);
    return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s];
  }
  function toHex(L, C, H) {
    var rgb; for (var c = C; c >= 0; c -= 0.004) { rgb = oklch(L, c, H); if (rgb.every(function (v) { return v >= -0.0005 && v <= 1.0005; })) break; }
    return '#' + rgb.map(function (v) { v = Math.max(0, Math.min(1, v)); v = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055; return Math.round(v * 255).toString(16).padStart(2, '0'); }).join('').toUpperCase();
  }
  // #RRGGBB → [L, C, H] in OKLCH: used when an entity inherits a brand color it already had.
  function fromHex(hex) {
    var f = function (c) { c = parseInt(c, 16) / 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    var r = f(hex.substr(1, 2)), g = f(hex.substr(3, 2)), b = f(hex.substr(5, 2));
    var l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    var L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
    return [L, Math.hypot(A, B), (Math.atan2(B, A) * 180 / Math.PI + 360) % 360];
  }
  var STEPS = [[100, 0.95], [200, 0.89], [300, 0.82], [400, 0.74], [500, 0.65], [600, 0.56], [700, 0.47], [800, 0.38], [900, 0.29]];
  function makeRamp(H, C) { var o = {}; STEPS.forEach(function (s) { o[s[0]] = toHex(s[1], C * (s[1] > 0.9 ? 0.45 : s[1] < 0.35 ? 0.75 : 1), H); }); return o; }
  // Where each center sits on the color wheel (OKLCH hue); the entity's seed moves it, so no two entities match.
  var HUE = { cabeza: 305, ajna: 258, garganta: 225, g: 122, corazon: 25, plexo: 350, sacro: 88, bazo: 190, raiz: 150 };
  var HARMONY = { manifestador: [180, 200], generador: [30, 60], mg: [150, 210], proyector: [-40, 45], reflector: [0, 0] };
  function hueName(h, c) {
    var N = [[15, 'Rojo'], [45, 'Coral'], [75, 'Ámbar'], [100, 'Amarillo'], [135, 'Lima'], [165, 'Verde'], [200, 'Turquesa'], [235, 'Cian'], [270, 'Azul'], [300, 'Índigo'], [330, 'Púrpura'], [361, 'Magenta']];
    var n = N.filter(function (x) { return (h % 360) < x[0]; })[0][1];
    return c < 0.05 ? n + ' gris' : c < 0.1 ? n + ' suave' : c < 0.15 ? n : n + ' vivo';
  }
  function palette(e) {
    var r = rng(hash('paleta|' + (seedKey(e) || e.id + '|' + e.name) + '|' + e.variation + '|' + e.auth + '|' + e.profile + '|' + e.centers.join('')));
    var center = AUTH[e.auth].center, n = e.centers.length;
    // The conscious line turns the wheel too (up to ±20°), so entities with the same authority still spread out.
    var line = Number(e.profile.split('/')[0]);
    var h0 = ((center ? HUE[center] : r() * 360) + (line - 3.5) * 8 + (r() - 0.5) * 60 + 720) % 360;
    var c0 = e.type === 'reflector' ? 0.035 + r() * 0.02 : Math.min(0.2, 0.08 + n * 0.02 + r() * 0.03);
    // A defined Throat is a steady voice: a deep, full accent.
    if (e.centers.indexOf('garganta') >= 0 && e.type !== 'reflector') c0 = Math.min(0.26, c0 * 1.5);
    // An inherited brand color replaces the chart's hue and chroma; the harmony around it still comes from the chart.
    if (e.color) { var o = fromHex(e.color); h0 = o[2]; c0 = Math.min(0.26, o[1]); }
    var hm = HARMONY[e.type];
    var h1 = (h0 + hm[0] + (r() - 0.5) * 20 + 360) % 360, h2 = (h0 + hm[1] + (r() - 0.5) * 20 + 360) % 360;
    var c1 = e.type === 'reflector' ? c0 * 0.6 : c0 * (0.7 + r() * 0.3), c2 = e.type === 'reflector' ? c0 * 1.6 : c0 * (0.55 + r() * 0.35);
    return [{ role: 'Primario', use: 'Acciones, selección y navegación', h: h0, c: c0, ramp: makeRamp(h0, c0) },
      { role: 'Secundario', use: 'Enlaces (con acento luminoso) y la firma', h: h1, c: c1, ramp: makeRamp(h1, c1) },
      { role: 'Terciario', use: 'Acentos de la firma', h: h2, c: c2, ramp: makeRamp(h2, c2) }].map(function (p) { p.name = hueName(p.h, p.c); return p; });
  }
  function pickText(rmp, bgs, from) { var order = from === 'light' ? [300, 200, 400, 100] : [700, 800, 900]; for (var i = 0; i < order.length; i++) { var c = rmp[order[i]]; if (bgs.every(function (b) { return contrast(c, b); }) && bgs.every(function (b) { return contrast(c, b) >= 4.5; })) return c; } return from === 'light' ? rmp[100] : rmp[900]; }
  // ---------- Three colors do almost everything, as in IBM's buttons: the brand, a very dark tone and the color of action.
  // The action color is what people already read as "this can be followed": a blue. It stays in the blue zone, at the edge
  // nearest to the brand's hue and with the brand's chroma, so it belongs to the entity. A blue brand is its own action color.
  var BLUE = [258, 268];
  function actionRamp(pal) {
    var h = pal[0].h, d = function (a, b) { var x = Math.abs(a - b) % 360; return x > 180 ? 360 - x : x; };
    if (h >= BLUE[0] && h <= BLUE[1]) return pal[0].ramp;
    return makeRamp(d(h, BLUE[0]) <= d(h, BLUE[1]) ? BLUE[0] : BLUE[1], Math.max(0.12, Math.min(0.2, pal[0].c)));
  }
  //   secondary = the brand's hue, very dark and with little chroma (as ALMA's secondary-900), with white text, so it
  //               never breaks the brand's harmony: as dark as step 900 on light themes and as step 800 on dark ones
  //               (900 would sink into the page). Dark values get lighter on interaction: half a step, then to step 700.
  //   tertiary  = the action color: links, focus, what is selected, and the outline button, which fills on hover.
  //               On dark themes text takes the first light step at 4.5:1 and marks the first at 3:1.
  function roles(pal, ACT) {
    var B = D.base.accent, BLACK = D.brand['brand-black'], G = D.ramps.gray, R = D.ramps;
    var half = function (a, b) { return mix(a, b, 0.5).toUpperCase(); };
    var first = function (rmp, order, min, bgs) { return order.filter(function (st) { return bgs.every(function (b) { return contrast(rmp[st], b) >= min; }); })[0]; };
    var onDark = [BLACK, B.ui01Dark], onLight = [WHITE, UI02_LIGHT, B.ui01Light];
    var t = first(ACT, [400, 300, 200, 100], 4.5, onDark) || 100, m = first(ACT, [500, 400, 300, 200], 3, onDark) || 200, tl = first(ACT, [600, 700, 800, 900], 4.5, onLight) || 900;
    var SL = { 900: 0.29, 850: 0.335, 800: 0.38, 750: 0.425, 700: 0.47 }, sc = Math.min(0.07, pal[0].c * 0.3), tone = function (st) { return toHex(SL[st], sc, pal[0].h); };
    var sec = function (rest, hover, active) {
      // A destructive action on the dark fill reads in the first light red that reaches 4.5:1 on it and on its hover.
      var red = [200, 100, 50].filter(function (st) { return contrast(R.danger[st], rest) >= 4.5 && contrast(R.danger[st], hover) >= 4.5; })[0] || 50;
      // (the gray button is no longer this fill: since 2026-10-08 it is ALMA's faint neutral one, the same in every entity)
      return { 'interactive-02': rest, 'hover-secondary': hover, 'active-secondary': active,
        // The white fills (inverse button) keep ink text and gray states; text on the pressed ghost button sits on the dark tone.
        'button-inverse-text': INK, 'button-inverse-text-active': INK, 'button-inverse-bg-hover': G[100], 'button-inverse-bg-active': G[300], 'button-ghost-text-active': WHITE };
    };
    return {
      action: ACT,
      dark: Object.assign(sec(tone(800), tone(750), tone(700)),
        { 'link-01': ACT[t], 'interactive-03': ACT[t], 'interactive-04': ACT[m], 'hover-tertiary': ACT[t], 'active-tertiary': ACT[Math.max(100, t - 100)], 'focus': ACT[t] }),
      light: Object.assign(sec(tone(900), tone(850), tone(700)),
        { 'link-01': ACT[tl], 'interactive-04': ACT[tl], 'hover-tertiary': half(ACT[tl], ACT[Math.min(900, tl + 100)]), 'active-tertiary': ACT[Math.min(900, tl + 200)], 'focus': ACT[tl] }),
      lightHc: { 'link-01': ACT[900], 'interactive-04': ACT[900], 'focus': ACT[900] }, darkHc: { 'link-01': ACT[100], 'interactive-03': ACT[100], 'focus': WHITE }
    };
  }

  function accentFor(pal, deep, inherited) {
    var P0 = pal[0].ramp, B = D.base.accent, RO = roles(pal, actionRamp(pal));
    if (deep) return deepAccent(pal);
    // The pressed state and the brand color follow the accent too. Chart series stay ALMA's: a designed set.
    // The inherited color is the accent as is, when ink text on it passes AA; otherwise the nearest ramp step that does.
    var i = inherited && contrast(INK, inherited) >= 4.5 ? inherited : [300, 200, 400].map(function (s) { return P0[s]; }).filter(function (c) { return contrast(INK, c) >= 4.5; })[0] || P0[200];
    var navLight = pickText(P0, [WHITE, UI02_LIGHT, B.ui01Light], 'dark');
    var rgba = function (hex, a) { return 'rgba(' + [1, 3, 5].map(function (k) { return parseInt(hex.substr(k, 2), 16); }).join(',') + ',' + a + ')'; };
    // Controls on light backgrounds need 3:1 (WCAG 1.4.11): the first primary step that reaches it.
    var onLight = [600, 700, 800].map(function (k) { return P0[k]; }).filter(function (c) { return contrast(c, WHITE) >= 3 && contrast(c, UI02_LIGHT) >= 3; })[0] || P0[800];
    return {
      ramp: pal[0].name, action: RO.action,
      // ALMA's own accent is deep (white text): a luminous accent also says what goes on it when pressed, and its
      // active field border, so ALMA's values for a deep accent do not show through.
      dark: Object.assign({}, RO.dark, { 'interactive-01': i, 'hover-primary': P0[400], 'active-primary': P0[500], 'brand-lime': i, 'text-on-interactive': INK, 'nav-selected': i,
        'button-filled-text-active': D.brand['brand-black'], 'field-border-active': P0[500],
        'field-border': i, 'field-border-hover': P0[400], 'field-label': i, 'button-tinted-text': i, 'button-tinted-bg': rgba(i, 0.16), 'button-tinted-bg-hover': rgba(i, 0.24), 'button-plain-text': i, 'control-on': i }),
      light: Object.assign({}, RO.light, { 'interactive-01': i, 'hover-primary': P0[400], 'active-primary': P0[500], 'brand-lime': i, 'text-on-interactive': INK, 'nav-selected': navLight,
        'button-filled-text-active': D.brand['brand-black'], 'field-border-active': P0[500],
        'button-tinted-bg': rgba(i, 0.45), 'button-tinted-bg-hover': rgba(i, 0.65), 'button-plain-text': navLight, 'control-on': onLight }),
      lightHc: Object.assign({}, RO.lightHc, { 'nav-selected': P0[900] }), darkHc: RO.darkHc
    };
  }

  // Deep accent (defined Throat): a saturated primary with white text, the same step in every theme; hover is half a step
  // darker and pressed two steps, as in IBM. On dark themes its text and marks use lighter steps of the same ramp.
  function deepAccent(pal) {
    var P0 = pal[0].ramp, B = D.base.accent, BLACK = D.brand['brand-black'], R = D.ramps, RO = roles(pal, actionRamp(pal));
    var half = function (a, b) { return mix(a, b, 0.5).toUpperCase(); };
    var steps = [600, 500, 700, 800], k = steps.filter(function (s) { return contrast(WHITE, P0[s]) >= 4.5; })[0] || 800, i = P0[k], hv = half(i, P0[Math.min(900, k + 100)]), pr = P0[Math.min(900, k + 200)];
    var first = function (order, min, bgs) { return order.map(function (s) { return P0[s]; }).filter(function (c) { return bgs.every(function (b) { return contrast(c, b) >= min; }); })[0]; };
    var navDark = first([400, 300, 200, 100], 4.5, [BLACK, B.ui01Dark]) || P0[100];
    var ctlDark = first([500, 400, 300, 200], 3, [BLACK, B.ui01Dark]) || P0[200];
    var navLight = contrast(i, WHITE) >= 4.5 && contrast(i, UI02_LIGHT) >= 4.5 && contrast(i, B.ui01Light) >= 4.5 ? i : pickText(P0, [WHITE, UI02_LIGHT, B.ui01Light], 'dark');
    var rgba = function (hex, a) { return 'rgba(' + [1, 3, 5].map(function (n) { return parseInt(hex.substr(n, 2), 16); }).join(',') + ',' + a + ')'; };
    // Chart series: IBM's categorical sequence (neighbors chosen to differ most), on ALMA's ramps. Each series takes the
    // nearest step that reaches 3:1 on the containers of its theme.
    var viz = function (seq, bg, dir) {
      var o = {};
      seq.forEach(function (x, n) {
        var st = x[1];
        while (contrast(R[x[0]][st], bg) < 3 && R[x[0]][st + dir]) st += dir;
        o['viz-cat-0' + (n + 1)] = R[x[0]][st];
      });
      return o;
    };
    var vizLight = viz([['purple', 700], ['cyan', 500], ['teal', 700], ['magenta', 700], ['red', 500], ['red', 900], ['green', 600], ['blue', 800]], B.ui01Light, 100);
    var vizDark = viz([['purple', 600], ['cyan', 400], ['teal', 600], ['magenta', 400], ['red', 500], ['red', 100], ['green', 300], ['blue', 500]], B.ui01Dark, -100);
    // One-hue series: the brand ramp. The largest value is the darkest step on light themes and the lightest on dark ones.
    [200, 400, 600, 700, 900].forEach(function (st, n) { vizLight['viz-seq-' + (n + 1)] = P0[st]; });
    [800, 700, 500, 300, 100].forEach(function (st, n) { vizDark['viz-seq-' + (n + 1)] = P0[st]; });
    var shared = { 'interactive-01': i, 'hover-primary': hv, 'active-primary': pr, 'button-filled-text-active': WHITE, 'brand-lime': i, 'text-on-interactive': WHITE, 'field-label-float-text': INK };
    return {
      ramp: pal[0].name, deep: true, action: RO.action,
      dark: Object.assign({}, RO.dark, shared, vizDark, { 'nav-selected': navDark, 'field-border-active': navDark,
        'field-border': ctlDark, 'field-border-hover': navDark, 'field-label': navDark, 'button-tinted-text': navDark, 'button-tinted-bg': rgba(navDark, 0.16), 'button-tinted-bg-hover': rgba(navDark, 0.24), 'button-plain-text': navDark, 'control-on': ctlDark }),
      light: Object.assign({}, RO.light, shared, vizLight, { 'nav-selected': navLight,
        'button-tinted-bg': rgba(i, 0.12), 'button-tinted-bg-hover': rgba(i, 0.2), 'button-plain-text': navLight, 'control-on': i }),
      lightHc: Object.assign({}, RO.lightHc, { 'nav-selected': P0[900] }), darkHc: RO.darkHc
    };
  }

  // The radii, from one base: a button takes it whole; the rest take it up to their own ceiling, so a small piece is never
  // rounder than it is tall, and a container is never rounder than what it holds. ALMA's own radii follow this rule too
  // (tokens/core/radius.json, from radius-base). The checkbox is apart: it keeps its corners, not to read as a radio.
  var RADIUS_CAPS = { 'radius-button': Infinity, 'radius-tag': 100, 'radius-chip': 8, 'radius-field': 24, 'radius-nav': 24, 'radius-card': 24, 'radius-panel': 16, 'radius-swatch': 8 };
  function radii(base) { var o = {}; Object.keys(RADIUS_CAPS).forEach(function (k) { o[k] = Math.min(base, RADIUS_CAPS[k]) + 'px'; }); return o; }

  // ---------- Entity → ALMA parameters (the translation rules, one per trait).
  function params(e) {
    var p = Number(e.profile.split('/')[0]), d = Number(e.profile.split('/')[1]);
    var auth = AUTH[e.auth], authCenter = auth.center ? centerOf(auth.center) : null;
    var base = SHAPE[d].base, pal = palette(e);
    return {
      fontWidth: 100 + (p - 1) * 10,
      fontGrade: (d - 3) * 8,
      weights: auth.weights,
      // glass: an entity with few defined centres is open — most of it lets through what comes from outside. Its
      // surfaces do too: with two centres or fewer, everything is in glass (foundation Profundidad).
      glass: e.centers.length <= 2,
      radius: Object.assign(radii(base), { 'radius-checkbox': [0, 1, 3, 2, 4, 4, 4][d] + 'px' }),
      palette: pal,
      accent: accentFor(pal, e.centers.indexOf('garganta') >= 0 && e.type !== 'reflector' && !e.color, e.color),
      motion: TYPES[e.type],
      shape: SHAPE[d]
    };
  }
  function exportJson(e, P) {
    var all = { dark: P.accent.dark, light: P.accent.light, 'dark-hc': Object.assign({}, P.accent.dark, P.accent.darkHc), 'light-hc': Object.assign({}, P.accent.light, P.accent.lightHc) };
    // tokens:apply takes #RRGGBB only; translucent fills travel apart, as a proposal.
    var themes = {}, alpha = {};
    Object.keys(all).forEach(function (th) { themes[th] = {}; Object.keys(all[th]).forEach(function (k) { var v = all[th][k]; if (/^#[0-9A-Fa-f]{6}$/.test(v)) themes[th][k] = v; else { alpha[th] = alpha[th] || {}; alpha[th][k] = v; } }); });
    return {
      nacimiento: e.nacimiento && e.nacimiento.fecha ? e.nacimiento : null,
      carta: e.carta ? { puertas: e.carta.puertas, canales: e.carta.canales, cruz: e.carta.cruz, utc: e.carta.utc } : null,
      voz: e.carta ? brandOf(e).voz : null,
      principios: e.carta ? brandOf(e).principios.map(function (x) { return { titulo: x.titulo, origen: x.origen, texto: x.texto, interfaz: x.interfaz }; }) : null,
      entidad: { nombre: e.name, tipo: TYPES[e.type].name, perfil: e.profile, autoridad: AUTH[e.auth].name, definicion: DEFS[e.def].name, centros: e.centers.map(function (c) { return centerOf(c).name; }) },
      themes: themes,
      fontAxis: { 'font-width': P.fontWidth, 'font-grade': P.fontGrade },
      weights: P.weights,
      radius: P.radius,
      paleta: P.palette.map(function (p) { return { rol: p.role, nombre: p.name, rampa: p.ramp }; }),
      transparencias: { valores: alpha, nota: 'Propuesta: el Ajustador todavía no aplica colores con transparencia.' },
      movimiento: { estilo: P.motion.motion, velocidad: P.motion.speed, nota: 'Propuesta: el Ajustador todavía no aplica movimiento.' }
    };
  }
  function baseStyle(theme) {
    var B = D.base, a = B.accent, s = { '--font-width': B.fontAxis['font-width'], '--font-grade': B.fontAxis['font-grade'] };
    Object.keys(B.weights).forEach(function (k) { s['--font-weight-' + k] = B.weights[k]; });
    Object.keys(B.radius).forEach(function (k) { s['--' + k] = B.radius[k]; });
    s['--interactive-01'] = a.interactive; s['--hover-primary'] = a.hover;
    s['--nav-selected'] = theme === 'light' ? a.navLight : a.navDark; s['--link-01'] = theme === 'light' ? a.linkLight : a.linkDark;
    Object.keys(B.extra[theme]).forEach(function (k) { s['--' + k] = B.extra[theme][k]; });
    return s;
  }
  function scopeStyle(P, theme) {
    var s = { '--font-width': P.fontWidth, '--font-grade': P.fontGrade };
    Object.keys(P.weights).forEach(function (k) { s['--font-weight-' + k] = P.weights[k]; });
    Object.keys(P.radius).forEach(function (k) { s['--' + k] = P.radius[k]; });
    var a = P.accent[theme]; Object.keys(a).forEach(function (k) { s['--' + k] = a[k]; });
    return s;
  }

  // ---------- The generative signature: the logo's grammar (staggered pills and four-point sparkles), driven by the entity.
  function bezier(x1, y1, x2, y2) {
    function cx(t) { return 3 * x1 * t * (1 - t) * (1 - t) + 3 * x2 * t * t * (1 - t) + t * t * t; }
    function cy(t) { return 3 * y1 * t * (1 - t) * (1 - t) + 3 * y2 * t * t * (1 - t) + t * t * t; }
    return function (x) { var lo = 0, hi = 1; for (var i = 0; i < 24; i++) { var m = (lo + hi) / 2; if (cx(m) < x) lo = m; else hi = m; } return cy((lo + hi) / 2); };
  }
  function easingOf(name) { var v = getComputedStyle(root).getPropertyValue('--easing-entrance-' + (name === 'expresivo' ? 'expressive' : 'productive')).match(/[\d.]+/g) || [0, 0, 0.38, 0.9]; return bezier(+v[0], +v[1], +v[2], +v[3]); }

  function layout(e, P, W, H) {
    var r = rng(hash([e.type, e.auth, e.profile, e.def, e.centers.join(''), seedKey(e) || e.name, e.variation].join('|')));
    var rows = Math.max(3, Math.min(7, e.centers.length || 3)), parts = DEFS[e.def].parts;
    // Pills live in the upper 60 %: the lower band is kept for the entity's name.
    var area = H * (W < 640 ? 0.6 : 0.56), ph = Math.min(area / (rows * 1.55), W * 0.05), gap = ph * 0.55;
    var top = H * 0.06 + (area - (rows * ph + (rows - 1) * gap)) / 2, left = W * 0.1, span = W * 0.8;
    var S1 = P.palette[1].ramp, S2 = P.palette[2].ramp;
    var pal = [S1[300], S1[500], S2[300], S2[400], D.brand['secondary-600']];
    var pills = [], sparks = [];
    var groupOf = function (i) { return parts ? Math.min(parts - 1, Math.floor(i * parts / rows)) : i; };
    var prevEnd = null;
    for (var i = 0; i < rows; i++) {
      var y = top + i * (ph + gap), g = groupOf(i), linked = i > 0 && groupOf(i - 1) === g && parts > 0;
      var x = linked && prevEnd !== null ? prevEnd - ph * (0.2 + r() * 0.6) : left + r() * span * 0.35;
      x = Math.min(x, left + span - ph * 3);
      var n = 1 + Math.floor(r() * 3), end = x;
      for (var k = 0; k < n; k++) {
        if (k > 0 && end + ph * 1.2 > left + span) break;
        var w = ph * (1.6 + r() * 4.5); if (end + w > left + span) w = Math.max(ph * 1.2, left + span - end);
        var accent = r() < 0.18;
        pills.push({ x: end, y: y, w: w, h: ph, c: accent ? P.accent.dark['interactive-01'] : pal[Math.floor(r() * pal.length)], accent: accent, i: pills.length });
        if (linked && k === 0) sparks.push({ x: end + ph * 0.15, y: y - gap / 2, s: gap * 0.9 });
        end += w + ph * (0.25 + r() * 0.4);
      }
      prevEnd = end - ph * 0.5;
    }
    if (!pills.some(function (p) { return p.accent; }) && pills.length) { var pick = pills[Math.floor(r() * pills.length)]; pick.c = P.accent.dark['interactive-01']; pick.accent = true; }
    if (e.type === 'reflector') pills.forEach(function (p) { p.cycle = true; });
    return { pills: pills, sparks: sparks, ph: ph, roundF: Math.min(1, P.shape.base / 24) };
  }
  function roundRect(ctx, x, y, w, h, r) { r = Math.min(r, h / 2, w / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function sparkle(ctx, x, y, s) { ctx.beginPath(); ctx.moveTo(x, y - s); ctx.quadraticCurveTo(x, y, x + s, y); ctx.quadraticCurveTo(x, y, x, y + s); ctx.quadraticCurveTo(x, y, x - s, y); ctx.quadraticCurveTo(x, y, x, y - s); ctx.closePath(); }
  function mix(a, b, t) { var p = function (c, i) { return parseInt(c.substr(i, 2), 16); }; var o = '#'; [1, 3, 5].forEach(function (i) { o += Math.round(p(a, i) + (p(b, i) - p(a, i)) * t).toString(16).padStart(2, '0'); }); return o; }

  function Signature(p) {
    var ref = useRef(null), fmt = p.format;
    useEffect(function () {
      var cv = ref.current, ctx = cv.getContext('2d'), raf = 0, t0 = performance.now();
      var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      var ease = easingOf(p.P.motion.motion), dur = 700 * p.P.motion.speed, stagger = 40 * p.P.motion.speed;
      var cyc = CENTERS.map(function (c) { return ramp(c.ramp, 300); });
      function frame(now) {
        var box = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1, W = box.width, H = box.height;
        if (!W || !H) { raf = pideCuadro(frame); return; }
        if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var L = layout(p.entity, p.P, W, H), t = reduce ? 1e9 : now - t0;
        ctx.fillStyle = D.brand['brand-ink']; ctx.fillRect(0, 0, W, H);
        L.pills.forEach(function (pl) {
          var k = Math.max(0, Math.min(1, (t - pl.i * stagger) / dur)), e = ease(k);
          var drift = reduce ? 0 : Math.sin((t / (2600 * p.P.motion.speed)) + pl.i) * pl.h * 0.12 * Math.min(1, t / (dur * 2));
          var c = pl.c;
          if (pl.cycle && pl.accent && !reduce) { var f = (t / (4000 * p.P.motion.speed)) % cyc.length, a = Math.floor(f); c = mix(cyc[a], cyc[(a + 1) % cyc.length], f - a); }
          ctx.fillStyle = c; roundRect(ctx, pl.x + drift, pl.y, Math.max(0.01, pl.w * e), pl.h, pl.h / 2 * L.roundF); ctx.fill();
        });
        ctx.fillStyle = D.brand['secondary-700'];
        L.sparks.forEach(function (s, i) { var k = Math.max(0, Math.min(1, (t - (L.pills.length + i) * stagger) / dur)); if (k > 0) { sparkle(ctx, s.x, s.y, s.s * ease(k)); ctx.fill(); } });
        if (!reduce) raf = pideCuadro(frame);
      }
      raf = pideCuadro(frame);
      return function () { dejaCuadro(raf); };
    }, [p.entity, p.P, fmt]);
    var e = p.entity;
    return h('figure', { className: 'sig sig--' + fmt },
      h('canvas', { ref: ref, className: 'sig__canvas', role: 'img', 'aria-label': 'Firma generativa de ' + e.name + ': ' + TYPES[e.type].name + ' ' + e.profile + ', autoridad ' + AUTH[e.auth].name.toLowerCase() + ', ' + e.centers.length + ' centros definidos.' }),
      h('figcaption', { className: 'sig__text ent-scope', 'data-theme': 'dark', style: scopeStyle(p.P, 'dark') },
        h('span', { className: 'web-label-m sig__eyebrow' }, TYPES[e.type].name + ' ' + e.profile + ' · ' + AUTH[e.auth].name),
        h('span', { className: 'web-h3 sig__name' }, e.name)));
  }

  function Palette(p) {
    return h('section', { className: 'pal' }, h('h2', { className: 'web-h6' }, 'Paleta de la entidad'),
      p.P.palette.map(function (x) {
        return h('div', { key: x.role, className: 'pal__row' },
          h('div', { className: 'pal__meta' }, h('span', { className: 'web-label-m' }, x.role + ' · ' + x.name), h('span', { className: 'web-body-s cap' }, x.use)),
          h('div', { className: 'pal__ramp' }, Object.keys(x.ramp).map(function (k) {
            return h('span', { key: k, className: 'pal__chip', style: { background: x.ramp[k] }, title: k + ' ' + x.ramp[k] }, h('span', { className: 'pal__num', style: { color: contrast(x.ramp[k], INK) >= 4.5 ? INK : WHITE } }, k));
          })));
      }));
  }

  // ---------- The chart: body graph and activations
  var BG = { cabeza: [160, 44, 'up'], ajna: [160, 118, 'down'], garganta: [160, 196, 'sq'], g: [160, 272, 'dia'], corazon: [226, 300, 'up'], bazo: [58, 356, 'right'], plexo: [262, 356, 'left'], sacro: [160, 366, 'sq'], raiz: [160, 446, 'sq'] };
  function shape(kind, x, y) {
    var s = 26;
    if (kind === 'up') return 'M' + x + ' ' + (y - s) + ' L' + (x + s) + ' ' + (y + s * 0.8) + ' L' + (x - s) + ' ' + (y + s * 0.8) + ' Z';
    if (kind === 'down') return 'M' + (x - s) + ' ' + (y - s * 0.8) + ' L' + (x + s) + ' ' + (y - s * 0.8) + ' L' + x + ' ' + (y + s) + ' Z';
    if (kind === 'dia') return 'M' + x + ' ' + (y - s * 1.15) + ' L' + (x + s * 1.15) + ' ' + y + ' L' + x + ' ' + (y + s * 1.15) + ' L' + (x - s * 1.15) + ' ' + y + ' Z';
    if (kind === 'right') return 'M' + (x - s * 0.8) + ' ' + (y - s) + ' L' + (x + s) + ' ' + y + ' L' + (x - s * 0.8) + ' ' + (y + s) + ' Z';
    if (kind === 'left') return 'M' + (x + s * 0.8) + ' ' + (y - s) + ' L' + (x - s) + ' ' + y + ' L' + (x + s * 0.8) + ' ' + (y + s) + ' Z';
    return 'M' + (x - s) + ' ' + (y - s) + ' h' + (2 * s) + ' v' + (2 * s) + ' h' + (-2 * s) + ' Z';
  }
  function BodyGraph(p) {
    var c = p.entity.carta, P = p.P, def = c.definidos, pairs = {};
    CARTA.CANALES.forEach(function (k) { var a = CARTA.CENTRO_DE[k[0]], b = CARTA.CENTRO_DE[k[1]], key = [a, b].sort().join('|'); (pairs[key] = pairs[key] || []).push(k); });
    var lines = [];
    Object.keys(pairs).forEach(function (key) {
      var list = pairs[key], ab = key.split('|'), A1 = BG[ab[0]], B1 = BG[ab[1]], dx = B1[0] - A1[0], dy = B1[1] - A1[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
      list.forEach(function (k, i) {
        var o = (i - (list.length - 1) / 2) * 7, id = k[0] + '-' + k[1], on = c.canales.indexOf(id) >= 0;
        var sides = [c.lado[k[0]], c.lado[k[1]]], color = !on ? 'var(--border-subtle)' : sides.every(function (x) { return x === 'personalidad'; }) ? 'var(--text-01)' : sides.every(function (x) { return x === 'diseño'; }) ? P.palette[1].ramp[400] : P.palette[0].ramp[400];
        lines.push(h('line', { key: id, x1: A1[0] + nx * o, y1: A1[1] + ny * o, x2: B1[0] + nx * o, y2: B1[1] + ny * o, stroke: color, strokeWidth: on ? 3.5 : 1.5, strokeLinecap: 'round' }, h('title', null, 'Canal ' + id + (on ? ' definido' : ''))));
      });
    });
    return h('svg', { className: 'bg', viewBox: '0 0 320 490', role: 'img', 'aria-label': 'Gráfico corporal: ' + (def.length ? def.length + ' centros definidos (' + def.map(function (d) { return centerOf(d).name; }).join(', ') + ')' : 'ningún centro definido') + ' y ' + c.canales.length + ' canales.' },
      lines,
      Object.keys(BG).map(function (id) {
        var b = BG[id], on = def.indexOf(id) >= 0;
        return h('path', { key: id, d: shape(b[2], b[0], b[1]), fill: on ? P.palette[0].ramp[300] : 'var(--ui-01)', stroke: on ? P.palette[0].ramp[500] : 'var(--text-02)', strokeWidth: 1.5 }, h('title', null, centerOf(id).name + (on ? ' definido' : ' abierto')));
      }));
  }
  function ChartView(p) {
    var e = p.entity, c = e.carta;
    if (!c) return h(A.EmptyState, { icon: 'calendar', title: 'Esta entidad no tiene fecha de nacimiento', message: 'Escribe su fecha, hora y zona en el editor y la carta definirá sus rasgos.' });
    var rows = c.personalidad.map(function (a, i) { var d = c.diseno[i]; return { id: i, c: a.c, pp: a.p + '.' + a.l, dd: d.p + '.' + d.l }; });
    var legend = [['var(--text-01)', 'Personalidad'], [p.P.palette[1].ramp[400], 'Diseño'], [p.P.palette[0].ramp[400], 'Ambos lados']];
    return h('div', { className: 'chart' },
      h('div', { className: 'chart__graph' }, h(BodyGraph, { entity: e, P: p.P }),
        h('div', { className: 'legend' }, legend.map(function (l) { return h('span', { key: l[1], className: 'web-body-s legend__i' }, h('span', { className: 'legend__sw', style: { background: l[0] } }), l[1]); }))),
      h('div', { className: 'chart__data' },
        h('dl', { className: 'facts' }, [['Tipo', TYPES[c.tipo].name], ['Autoridad', AUTH[c.autoridad].name + (c.detalle ? ' (' + c.detalle + ')' : '')], ['Perfil', c.perfil + ' · ' + LINES[c.perfil[0]] + ' / ' + LINES[c.perfil[2]]], ['Definición', DEFS[c.definicion].name], ['Canales', c.canales.join(', ') || 'ninguno'], ['Cruz', c.cruz.puertas.join(' / ') + ' · ángulo ' + c.cruz.angulo], ['Nacimiento (UTC)', c.utc.personalidad.replace('T', ' ').slice(0, 16)], ['Diseño (UTC)', c.utc.diseno.replace('T', ' ').slice(0, 16)]].map(function (f) {
          return h('div', { key: f[0], className: 'fact' }, h('dt', { className: 'web-label-s cap' }, f[0]), h('dd', { className: 'web-body-m' }, f[1]));
        })),
        h('div', { className: 'table-wrap' }, h(A.Table, { title: 'Activaciones (puerta.línea)', headingLevel: 3, columns: [{ key: 'c', label: 'Cuerpo' }, { key: 'pp', label: 'Personalidad', align: 'end' }, { key: 'dd', label: 'Diseño', align: 'end' }], rows: rows }))));
  }

  // ---------- Voice and principles, written from the gates and channels (entidades/voz.mjs from the repository)
  function brandOf(e) { if (!e.carta) return null; var c = Object.assign({}, e.carta, { tipo: e.type, autoridad: e.auth, perfil: e.profile }); return { voz: CARTA.generarVoz(c), principios: CARTA.generarPrincipios(c) }; }
  function VoiceView(p) {
    var e = p.entity, b = brandOf(e);
    if (!b) return h(A.EmptyState, { icon: 'chat', title: 'La voz nace de la carta', message: 'Escribe la fecha de nacimiento de la entidad para generar su voz y sus principios.' });
    var v = b.voz;
    return h('div', { className: 'brand' },
      h('section', { className: 'brand__sec' },
        h('h2', { className: 'web-h6 cap' }, 'Voz'),
        h('p', { className: 'web-h3 brand__lead' }, v.resumen),
        h('div', { className: 'row' }, v.adjetivos.map(function (a) { return h(A.Tag, { key: a, color: 'gray' }, a); })),
        h('dl', { className: 'facts' }, [['Registro · línea ' + e.profile.split('/')[0], v.registro], ['Ritmo · autoridad', v.ritmo], ['Trato · tipo', v.trato], ['Garganta', v.garganta]].map(function (f) {
          return h('div', { key: f[0], className: 'fact' }, h('dt', { className: 'web-label-s cap' }, f[0]), h('dd', { className: 'web-body-m' }, f[1]));
        })),
        h('p', { className: 'web-body-s cap' }, 'Habla de: ' + v.temas.join(', ') + '.'),
        h('div', { className: 'table-wrap' }, h(A.Table, { title: 'Así sí, así no', headingLevel: 3, columns: [{ key: 'caso', label: 'Caso' }, { key: 'si', label: 'Así sí' }, { key: 'no', label: 'Así no' }, { key: 'porque', label: 'Por qué' }], rows: v.ejemplos.map(function (x, i) { return Object.assign({ id: i }, x); }) }))),
      h('section', { className: 'brand__sec' },
        h('h2', { className: 'web-h6 cap' }, 'Principios'),
        b.principios.map(function (x, i) {
          return h('article', { key: i, className: 'princ' },
            h('span', { className: 'web-label-m princ__n' }, String(i + 1).padStart(2, '0')),
            h('div', { className: 'princ__body' },
              h('h3', { className: 'web-h4 princ__t' }, x.titulo),
              h('p', { className: 'web-label-s cap' }, x.origen),
              h('p', { className: 'web-body-l' }, x.texto),
              h('p', { className: 'web-body-m cap' }, 'En la interfaz: ' + x.interfaz)));
        })),
      h('p', { className: 'web-body-s cap measure' }, 'Cada puerta parte de su hexagrama del I Ching y se lee como tema, voz y principio de marca. Los canales definidos son rasgos fijos: por eso se vuelven principios. La cruz (el Sol y la Tierra de cada lado) es el propósito.'));
  }

  // ---------- ALMA with the entity's parameters.
  function Preview(p) {
    var e = p.entity;
    return h('div', { className: 'ent-scope preview', 'data-theme': p.theme, style: p.P ? scopeStyle(p.P, p.theme) : baseStyle(p.theme) },
      h('p', { className: 'web-label-s preview__eyebrow' }, p.caption),
      h('h3', { className: 'web-h4 preview__title' }, 'Hola, ' + (e.name || 'entidad')),
      h('p', { className: 'web-body-m preview__text' }, 'Tu estrategia: ' + TYPES[e.type].strategy.toLowerCase() + '. Así se ve ALMA con tus rasgos.'),
      h('div', { className: 'row' }, h(A.Button, { variant: 'filled', role: 'primary' }, 'Continuar'), h(A.Button, { variant: 'tinted' }, 'Guardar'), h(A.Button, { variant: 'gray' }, 'Cancelar')),
      h('div', { className: 'row' }, h(A.Tag, { color: 'gray' }, 'Perfil ' + e.profile), h(A.Tag, { color: 'gray' }, AUTH[e.auth].name)),
      h(A.TextInput, { label: 'Nombre', defaultValue: e.name }),
      h('div', { className: 'row row--wide' }, h(A.Checkbox, { label: 'Recordarme', defaultChecked: true }), h(A.Switch, { label: 'Avisos', defaultChecked: true })),
      h(A.SegmentedControl, { label: 'Vista', options: ['Día', 'Semana', 'Mes'], defaultValue: 'Semana' }));
  }

  // ---------- Entity editor
  function Editor(p) {
    var e = p.entity, set = function (k, v) { var n = Object.assign({}, e); n[k] = v; p.onChange(n); };
    var d = derive(e.centers), W = warnings(e);
    return h('div', { className: 'editor' },
      h(A.TextInput, { label: 'Nombre de la entidad', value: e.name, onChange: function (v) { set('name', v || ''); } }),
      h('fieldset', { className: 'birth' }, h('legend', { className: 'web-label-m' }, 'Nacimiento'),
        h('div', { className: 'pair' },
          h(A.TextInput, { label: 'Fecha', type: 'date', value: (e.nacimiento && e.nacimiento.fecha) || '', onChange: function (v) { p.onChange(withCarta(Object.assign({}, e, { nacimiento: Object.assign({ zona: 'America/Santiago', hora: '' }, e.nacimiento, { fecha: v }) }))); } }),
          h('div', { className: (e.nacimiento && e.nacimiento.hora) ? '' : 'time-empty' }, h(A.TextInput, { label: 'Hora', type: 'time', value: (e.nacimiento && e.nacimiento.hora) || '', helper: 'Opcional', onChange: function (v) { p.onChange(withCarta(Object.assign({}, e, { nacimiento: Object.assign({ zona: 'America/Santiago', fecha: '' }, e.nacimiento, { hora: v }) }))); } }))),
        h(A.Combobox, { key: e.id + '|' + ((e.nacimiento && e.nacimiento.zona) || ''), label: 'Zona horaria', options: ZONES, value: (e.nacimiento && e.nacimiento.zona) || 'America/Santiago', onChange: function (v) { if (!v) return; p.onChange(withCarta(Object.assign({}, e, { nacimiento: Object.assign({ fecha: '', hora: '' }, e.nacimiento, { zona: v }) }))); } }),
        e.cartaError ? h('p', { className: 'web-body-s bad' }, e.cartaError) : e.carta ? h('p', { className: 'web-body-s cap' }, (e.carta.horaConocida ? 'La carta define los rasgos de abajo.' : 'Sin hora se usa el mediodía: la Luna y las líneas pueden cambiar.')) : h('p', { className: 'web-body-s cap' }, 'Con fecha, la carta define los rasgos. Sin fecha, se eligen a mano.')),
      h('p', { className: 'web-label-m traits' }, e.carta ? 'Rasgos de la carta' : 'Rasgos elegidos a mano'),
      h('div', { className: 'stack' },
        h(A.PopUpButton, { label: 'Tipo', options: Object.keys(TYPES).map(function (k) { return { value: k, label: TYPES[k].name }; }), value: e.type, onChange: function (v) { set('type', v); } }),
        h(A.PopUpButton, { label: 'Perfil', options: PROFILES.map(function (x) { var a = x.split('/'); return { value: x, label: x + ' · ' + LINES[a[0]] + ' / ' + LINES[a[1]] }; }), value: e.profile, onChange: function (v) { set('profile', v); } })),
      h('div', { className: 'pair' },
        h(A.PopUpButton, { label: 'Autoridad', options: Object.keys(AUTH).map(function (k) { return { value: k, label: AUTH[k].name }; }), value: e.auth, onChange: function (v) { set('auth', v); } }),
        h(A.PopUpButton, { label: 'Definición', options: Object.keys(DEFS).map(function (k) { return { value: k, label: DEFS[k].name }; }), value: e.def, onChange: function (v) { set('def', v); } })),
      h('fieldset', { className: 'centers' }, h('legend', { className: 'web-label-m' }, 'Centros definidos'),
        CENTERS.map(function (c) {
          return h(A.Checkbox, { key: c.id, label: c.name, checked: e.centers.indexOf(c.id) >= 0, onChange: function (on) { set('centers', on ? e.centers.concat([c.id]) : e.centers.filter(function (x) { return x !== c.id; })); } });
        })),
      W.length ? h('div', { className: 'warn' }, h('p', { className: 'web-label-m' }, e.carta ? 'Ajustada a mano' : 'Revisa la carta'), W.map(function (w, i) { return h('p', { key: i, className: 'web-body-s' }, w); }),
        h('div', null, e.carta
          ? h(A.Button, { variant: 'gray', onClick: function () { p.onChange(withCarta(e)); } }, 'Volver a la carta')
          : h(A.Button, { variant: 'gray', onClick: function () { p.onChange(Object.assign({}, e, { type: d.type, auth: d.auth })); } }, 'Usar la lectura de los centros'))) : null);
  }

  // ---------- Collection (kept only in this browser)
  var KEY = 'alma-entidades';
  function loadSaved() { try { var v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (x) { return []; } }
  function storeSaved(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (x) { /* storage blocked */ } }

  function ParamTable(p) {
    var e = p.entity, P = p.P, B = D.base, a = e.profile.split('/');
    var rows = [
      { id: 1, t: 'Tipo: ' + TYPES[e.type].name, f: 'Movimiento', v: P.motion.motion + ' · velocidad ×' + P.motion.speed, b: 'productivo · ×1', n: P.motion.note },
      { id: 2, t: 'Línea consciente ' + a[0] + ' · ' + LINES[a[0]], f: 'Ancho de la letra', v: String(P.fontWidth), b: String(B.fontAxis['font-width']), n: 'De 100 (línea 1) a 150 (línea 6).' },
      { id: 3, t: 'Línea inconsciente ' + a[1] + ' · ' + LINES[a[1]], f: 'Radios y grado', v: P.radius['radius-button'] + ' · grado ' + P.fontGrade, b: B.radius['radius-button'] + ' · grado ' + B.fontAxis['font-grade'], n: 'Forma: ' + P.shape.note + '.' },
      { id: 4, t: 'Autoridad: ' + AUTH[e.auth].name, f: 'Pesos de letra', v: [P.weights.display, P.weights.heading, P.weights.body, P.weights.emphasis].join(' / '), b: [B.weights.display, B.weights.heading, B.weights.body, B.weights.emphasis].join(' / '), n: AUTH[e.auth].note + ' (display / títulos / texto / énfasis)' },
      { id: 5, t: 'Centro de la autoridad', f: 'Tono del primario', v: P.palette[0].name, b: 'azul de ALMA', n: (AUTH[e.auth].center ? centerOf(AUTH[e.auth].center).name + ' (' + centerOf(AUTH[e.auth].center).role + '), movido por la semilla de la entidad.' : 'Sin centro: el tono lo decide la semilla.') },
      { id: 8, t: 'Tipo: ' + TYPES[e.type].name, f: 'Armonía de la paleta', v: { manifestador: 'complementaria', generador: 'análoga', mg: 'complementaria dividida', proyector: 'triádica', reflector: 'un solo tono' }[e.type], b: '—', n: 'Cómo se relacionan el secundario y el terciario con el primario.' },
      { id: 10, t: 'Garganta ' + (e.centers.indexOf('garganta') >= 0 ? 'definida' : 'abierta'), f: 'Profundidad del acento', v: P.accent.deep ? 'profundo, texto blanco' : 'luminoso, texto tinta', b: 'luminoso, texto tinta', n: P.accent.deep ? 'Una voz definida: acento pleno y saturado.' : 'Una voz abierta: acento claro que ilumina.' },
      { id: 9, t: 'Centros definidos: ' + e.centers.length, f: 'Intensidad del color', v: 'croma ' + P.palette[0].c.toFixed(3), b: '—', n: 'Más centros definidos, más saturación.' },
      { id: 6, t: 'Centros definidos: ' + e.centers.length, f: 'Firma: filas y colores', v: Math.max(3, Math.min(7, e.centers.length || 3)) + ' filas', b: '—', n: 'Cada centro suma una fila y su color a la firma.' },
      { id: 7, t: 'Definición: ' + DEFS[e.def].name, f: 'Firma: grupos conectados', v: DEFS[e.def].parts ? DEFS[e.def].parts + (DEFS[e.def].parts === 1 ? ' grupo' : ' grupos') : 'píldoras sueltas', b: '—', n: 'Los destellos unen las filas de un mismo grupo.' }
    ];
    return h('div', { className: 'table-wrap' }, h(A.Table, { title: 'Cómo se traduce cada rasgo', headingLevel: 3, columns: [{ key: 't', label: 'Rasgo' }, { key: 'f', label: 'Afecta' }, { key: 'v', label: 'Esta entidad' }, { key: 'b', label: 'ALMA hoy' }, { key: 'n', label: 'Por qué' }], rows: rows }));
  }
  function Checks(p) {
    var P = p.P, list = [];
    ['dark', 'light'].forEach(function (th) {
      var a = P.accent[th], bg = th === 'dark' ? D.brand['brand-black'] : UI02_LIGHT;
      list.push({ id: th + 'b', what: (th === 'dark' ? 'Oscuro' : 'Claro') + ': texto sobre el botón principal', r: contrast(a['text-on-interactive'], a['interactive-01']), min: 4.5 });
      list.push({ id: th + 'n', what: (th === 'dark' ? 'Oscuro' : 'Claro') + ': navegación elegida sobre el fondo', r: contrast(a['nav-selected'], bg), min: 4.5 });
      list.push({ id: th + 'l', what: (th === 'dark' ? 'Oscuro' : 'Claro') + ': enlaces sobre el fondo', r: contrast(a['link-01'], bg), min: 4.5 });
      list.push({ id: th + 'c', what: (th === 'dark' ? 'Oscuro' : 'Claro') + ': controles activos sobre el fondo', r: contrast(a['control-on'], bg), min: 3 });
    });
    return h('div', { className: 'checks' }, h('h3', { className: 'web-h6' }, 'Contraste (WCAG 2.2 AA)'), list.map(function (c) {
      var ok = c.r >= c.min;
      return h('div', { key: c.id, className: 'check' }, h(A.Icon, { name: ok ? 'checkmark--outline' : 'warning', size: 16, color: ok ? 'var(--status-icon-success)' : 'var(--status-icon-error)' }),
        h('span', { className: 'web-body-m' }, c.what), h('span', { className: 'tok' }, c.r.toFixed(2) + ':1 · ' + (ok ? 'cumple' : 'no cumple')));
    }));
  }
  function Export(p) {
    var json = JSON.stringify(exportJson(p.entity, p.P), null, 2), msg = useState('');
    function copy() {
      if (navigator.clipboard) navigator.clipboard.writeText(json).then(function () { msg[1]('Copiado'); }, function () { msg[1]('No se pudo copiar: selecciona el texto.'); });
      else msg[1]('Selecciona el texto para copiarlo.');
    }
    return h('div', { className: 'export' },
      h('p', { className: 'web-body-m measure' }, 'Este JSON usa el formato del Ajustador de ALMA. Guárdalo como entidad.json y aplícalo al repositorio, o pégamelo en el chat y lo aplico yo. El movimiento va como propuesta: el Ajustador todavía no lo aplica.'),
      h('pre', { className: 'code' }, h('code', null, 'npm run tokens:apply -- entidad.json')),
      h('div', { className: 'row' }, h(A.Button, { variant: 'filled', role: 'primary', iconBefore: 'copy', onClick: copy }, 'Copiar JSON'), msg[0] ? h('span', { className: 'web-body-s', role: 'status' }, msg[0]) : null),
      h('pre', { className: 'code code--json', tabIndex: 0 }, h('code', null, json)));
  }

  // ---------- App
  function App() {
    var th = useState(hostTheme()), ent = useState(function () { return withCarta(BORN); }), fmt = useState('Portada 16:9'), tab = useState('firma'), saved = useState(loadSaved()), cmp = useState(false), pth = useState('dark');
    var e = ent[0], P = useMemo(function () { return params(e); }, [e]);
    useEffect(function () { paint(th[0]); }, [th[0]]);
    // The whole tool takes the entity's palette, not only the preview.
    useEffect(function () { var a = P.accent[th[0]], keys = Object.keys(a); keys.forEach(function (k) { root.style.setProperty('--' + k, a[k]); }); return function () { keys.forEach(function (k) { root.style.removeProperty('--' + k); }); }; }, [P, th[0]]);
    useEffect(function () { var mo = new MutationObserver(function () { var v = root.getAttribute('data-theme'); if ((v === 'light' || v === 'dark') && v !== th[0]) th[1](v); }); mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] }); return function () { mo.disconnect(); }; }, [th[0]]);
    function save() { var list = saved[0].filter(function (x) { return x.id !== e.id; }).concat([e]); saved[1](list); storeSaved(list); }
    function remove(id) { var list = saved[0].filter(function (x) { return x.id !== id; }); saved[1](list); storeSaved(list); }
    var light = th[0] === 'light', F = { 'Portada 16:9': 'wide', 'Cuadrado 1:1': 'square', 'Historia 9:16': 'tall' };
    var tabs = [
      { value: 'firma', label: 'Firma', content: h('div', { className: 'panel' },
        h('div', { className: 'row row--between' }, h(A.SegmentedControl, { label: 'Formato', options: Object.keys(F), value: fmt[0], onChange: fmt[1] }),
          h(A.Button, { variant: 'gray', iconBefore: 'renew', onClick: function () { ent[1](Object.assign({}, e, { variation: (e.variation || 0) + 1 })); } }, 'Otra variación')),
        h(Signature, { entity: e, P: P, format: F[fmt[0]] }),
        h(Palette, { P: P }),
        h('p', { className: 'web-body-s cap measure' }, 'Las píldoras escalonadas y los destellos vienen del logo de Cordura. La cantidad de filas, los grupos, las formas, los colores y el ritmo salen de la entidad; la misma entidad dibuja siempre la misma firma.')) },
      { value: 'alma', label: 'ALMA', content: h('div', { className: 'panel' },
        h('div', { className: 'row row--between' }, h(A.SegmentedControl, { label: 'Tema', options: [{ value: 'dark', label: 'Oscuro' }, { value: 'light', label: 'Claro' }], value: pth[0], onChange: pth[1] }), h(A.Switch, { label: 'Comparar con ALMA hoy', checked: cmp[0], onChange: cmp[1] })),
        h('div', { className: cmp[0] ? 'compare' : 'single' }, h(Preview, { entity: e, P: P, theme: pth[0], caption: 'Con ' + (e.name || 'la entidad') }), cmp[0] ? h(Preview, { entity: e, P: null, theme: pth[0], caption: 'ALMA hoy' }) : null)) },
      { value: 'carta', label: 'Carta', content: h('div', { className: 'panel' }, h(ChartView, { entity: e, P: P })) },
      { value: 'voz', label: 'Voz y principios', content: h('div', { className: 'panel' }, h(VoiceView, { entity: e })) },
      { value: 'reglas', label: 'Reglas', content: h('div', { className: 'panel' }, h(ParamTable, { entity: e, P: P }), h(Checks, { P: P }),
        h('p', { className: 'web-body-s cap measure' }, 'Las reglas son una propuesta de diseño para traducir la carta a parámetros visuales; se pueden cambiar. El tipo y la autoridad se deducen de los centros de forma simplificada: una carta real también depende de los canales.')) },
      { value: 'exportar', label: 'Exportar', content: h('div', { className: 'panel' }, h(Export, { entity: e, P: P })) }
    ];
    return h('div', { className: 'app' },
      h(A.Toolbar, { title: 'Entidades ALMA', sticky: true, actions: [{ label: light ? 'Usar tema oscuro' : 'Usar tema claro', icon: light ? 'asleep' : 'light', onPress: function () { th[1](light ? 'dark' : 'light'); } }] }),
      h('div', { className: 'shell' },
        h('aside', { className: 'side' },
          h('div', { className: 'row' },
            h(A.Button, { variant: 'filled', role: 'primary', iconBefore: 'renew', onClick: function () { ent[1](bornEntity((Math.random() * 4294967296) >>> 0)); tab[1]('firma'); } }, 'Nueva entidad'),
            h(A.Button, { variant: 'tinted', iconBefore: 'save', onClick: save }, 'Guardar')),
          h(Editor, { entity: e, onChange: ent[1] }),
          h('section', { className: 'coll' }, h('h2', { className: 'web-h6' }, 'Colección'),
            saved[0].length ? h('ul', { className: 'coll__list' }, saved[0].map(function (x) {
              return h('li', { key: x.id, className: 'coll__item' + (x.id === e.id ? ' is-on' : '') },
                h('button', { type: 'button', className: 'coll__pick', onClick: function () { ent[1](x); } },
                  h('span', { className: 'coll__dot', style: { background: params(x).accent.dark['interactive-01'] } }),
                  h('span', { className: 'coll__txt' }, h('span', { className: 'web-label-m' }, x.name), h('span', { className: 'web-body-s cap' }, TYPES[x.type].name + ' ' + x.profile))),
                h(A.Button, { variant: 'plain', icon: 'trash-can', 'aria-label': 'Quitar ' + x.name, onClick: function () { remove(x.id); } }));
            })) : h('p', { className: 'web-body-s cap' }, 'Guarda entidades para compararlas. Quedan solo en este navegador.'))),
        h('main', { className: 'main' },
          h('header', { className: 'head' },
            h('p', { className: 'web-label-s cap' }, 'Entidad'),
            h('h1', { className: 'web-h2 head__title' }, e.name || 'Sin nombre'),
            e.nacimiento && e.nacimiento.fecha ? h('p', { className: 'web-body-m cap' }, 'Nació el ' + e.nacimiento.fecha + (e.nacimiento.hora ? ' a las ' + e.nacimiento.hora : ' (hora desconocida)') + ' · ' + e.nacimiento.zona) : null,
            h('p', { className: 'web-body-l cap' }, TYPES[e.type].name + ' ' + e.profile + ' · autoridad ' + AUTH[e.auth].name.toLowerCase() + ' · ' + DEFS[e.def].name.toLowerCase() + ' · ' + TYPES[e.type].strategy.toLowerCase())),
          h(A.Tabs, { label: 'Vistas de la entidad', tabs: tabs, value: tab[0], onChange: tab[1] }))));
  }

  window.__ENGINE = { fromHex: fromHex, params: params, radii: radii, palette: palette, layout: layout, contrast: contrast, derive: derive, exportJson: exportJson, scopeStyle: scopeStyle, baseStyle: baseStyle, Signature: Signature, Palette: Palette, Preview: Preview, BodyGraph: BodyGraph, withCarta: withCarta, TYPES: TYPES, AUTH: AUTH, CENTERS: CENTERS, DEFS: DEFS, LINES: LINES, SHAPE: SHAPE, hueName: hueName };
  if (window.__ENGINE_ONLY) return;
  paint(hostTheme());
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
