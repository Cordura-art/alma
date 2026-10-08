// ALMA's clock. Every piece that moves on a page (an entity's word, a cover, a planet, the living pictures of a
// manual) asks this one clock for its frames, instead of each asking the browser. So there is one place that knows
// how long it has been since the last frame, how many frames a second the page is holding, how far a tall section
// has been scrolled (read once a frame, whoever asks), whether whoever looks asked for less motion, whether the page
// is hidden, and when they last gave a sign of being there. A piece that fails does not stop the others.
//   AlmaReloj.pide(fn) → id      one frame, as requestAnimationFrame gives it      AlmaReloj.deja(id)
//   AlmaReloj.cada(fn) → quita   every frame while fn answers true; quita() takes it off
(function () {
  if (window.AlmaReloj) return;
  var cola = [], toca = [], n = 0, pedido = 0, antes = 0, enCuadro = false, leidos = new Map(), cuenta = 0, suma = 0, oyentes = [], R;
  var menos = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  function cuadro(ahora) {
    pedido = 0; var crudo = antes ? ahora - antes : 16; antes = ahora; R.ahora = ahora; R.crudo = crudo; R.dt = Math.min(0.05, crudo / 1000); R.cuadro++; leidos.clear(); enCuadro = true;
    // (how many frames a second: counted forty at a time, only while they follow one another)
    if (crudo < 250) { suma += crudo; if (++cuenta >= 40) { R.cuadros = Math.round(1000 * cuenta / suma); cuenta = suma = 0; } } else cuenta = suma = 0;
    toca = cola; cola = [];
    for (var i = 0; i < toca.length; i++) { var p = toca[i]; if (!p.fn) continue; try { p.fn(ahora); } catch (e) { falla(e); } }
    toca = []; enCuadro = false; if (!cola.length) antes = 0;
  }
  function falla(e) { setTimeout(function () { throw e; }, 0); }
  function avisa() { for (var i = 0; i < oyentes.length; i++) try { oyentes[i](); } catch (e) { falla(e); } }
  R = window.AlmaReloj = {
    ahora: 0, dt: 0.016, crudo: 16, cuadro: 0, cuadros: 0, sena: performance.now(),
    pide: function (fn) { var p = { id: ++n, fn: fn }; cola.push(p); if (!pedido) pedido = requestAnimationFrame(cuadro); return p.id; },
    deja: function (id) { for (var i = 0; i < cola.length; i++) if (cola[i].id === id) cola[i].fn = null; for (i = 0; i < toca.length; i++) if (toca[i].id === id) toca[i].fn = null; },
    cada: function (fn) { var id = 0, sigue = true, paso = function (ahora) { id = 0; if (sigue && fn(ahora) === true) id = R.pide(paso); }; id = R.pide(paso); return function () { sigue = false; if (id) R.deja(id); }; },
    get quieto() { return menos.matches; },
    get oculto() { return document.hidden; },
    // Whether it has been that long since the last sign of whoever looks.
    descansa: function (ms) { return performance.now() - R.sena > ms; },
    // How far a tall section has been scrolled past the top of the window, from 0 to 1, and whether any of it is seen.
    avance: function (el) {
      var a = enCuadro && leidos.get(el); if (a) return a;
      var r = el.getBoundingClientRect(), alto = window.innerHeight, largo = r.height - alto; a = { v: largo > 0 ? Math.min(1, Math.max(0, -r.top / largo)) : 0, aLaVista: r.bottom > 0 && r.top < alto, arriba: r.top, largo: largo };
      if (enCuadro) leidos.set(el, a); return a;
    },
    // Told when less motion is asked for or given back, and when the page is hidden or shown.
    alCambiar: function (fn) { oyentes.push(fn); return function () { var i = oyentes.indexOf(fn); if (i >= 0) oyentes.splice(i, 1); }; },
    get pendientes() { return cola.length; }
  };
  ['pointermove', 'pointerdown', 'keydown', 'wheel', 'input', 'focusin', 'scroll', 'touchstart'].forEach(function (que) { window.addEventListener(que, function () { R.sena = performance.now(); }, { capture: true, passive: true }); });
  if (menos.addEventListener) menos.addEventListener('change', avisa);
  document.addEventListener('visibilitychange', avisa);
})();
// ALMA's score. The six recipes of brand motion (docs/elements/movimiento/2-coreografia.md) are written here once,
// as what they are: which motion token each time is counted in, and how many of it. A piece asks for its times
// instead of working them out, so what the manual says and what a page does are the same thing; and an entity that
// moves slower, because its tokens say so, is slower in every piece at once.
// A score is also how a sequence is written: this, then that, each with its time and its curve, played on ALMA's
// clock (site/reloj.js). With less motion asked for, a score is simply at its end.
//   AlmaPartitura.tiempos(el) → { escribirse: { enfoca, pesa, pulso }, armarse: { recorrido, objeto, mundo }, … } in seconds
//   AlmaPartitura.curva('easing-entrance-expressive', el) → f(0…1)
//   AlmaPartitura.toca([{ en, dura, curva, paso(k) }, …], { el, alTerminar }) → { deja(), termino }
(function () {
  if (window.AlmaPartitura) return;
  // The recipes. A time is [token, how many of it]; a recipe with no time of its own follows something.
  var RECETAS = {
    escribirse: { tiempos: { enfoca: ['duration-slow-02', 1], pesa: ['duration-slow-02', 1.75], pulso: ['duration-stagger', 2] }, curva: 'easing-entrance-expressive', veces: 1 },
    armarse: { tiempos: { recorrido: ['duration-slow-02', 2], mundo: ['duration-slow-02', 2], objeto: ['duration-slow-02', 2.5] }, curva: 'easing-standard-expressive', veces: 1 },
    deshacerse: { sigue: 'desplazamiento' },
    responder: { sigue: 'puntero' },
    avanzar: { sigue: 'desplazamiento' },
    descansar: { sigue: 'vista' }
  };
  // (what a token is worth when a page has no tokens: ALMA's own values)
  var DE_ALMA = { 'duration-fast-01': 0.07, 'duration-fast-02': 0.11, 'duration-moderate-01': 0.15, 'duration-moderate-02': 0.24, 'duration-slow-01': 0.4, 'duration-slow-02': 0.7, 'duration-stagger': 0.02 };
  function estilo(el) { return getComputedStyle(el || document.documentElement); }
  // A duration token, in seconds, as the element has it.
  function segundos(token, el, cs) { var t = (cs || estilo(el)).getPropertyValue('--' + token).trim(), x = parseFloat(t); return isFinite(x) && x > 0 ? (/ms$/.test(t) ? x / 1000 : x) : DE_ALMA[token] || 0; }
  // A time as a score writes it: seconds, or [token, how many of it].
  function tiempo(v, el, cs) { return typeof v === 'number' ? v : v ? segundos(v[0], el, cs) * (v[1] == null ? 1 : v[1]) : 0; }
  function tiempos(el) {
    var cs = estilo(el), T = {}; for (var r in RECETAS) { T[r] = {}; var de = RECETAS[r].tiempos; for (var k in de) T[r][k] = tiempo(de[k], el, cs); }
    return T;
  }
  // A curve token (a cubic-bezier, as CSS writes it) as the function it is.
  function curva(nombre, el) {
    if (typeof nombre === 'function') return nombre; var t = nombre ? (/^cubic-bezier/.test(nombre) ? nombre : estilo(el).getPropertyValue('--' + nombre).trim()) : '', m = /cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/.exec(t);
    if (!m) return function (k) { return k; };
    var x1 = +m[1], y1 = +m[2], x2 = +m[3], y2 = +m[4], b = function (a, c, s) { var u = 1 - s; return 3 * u * u * s * a + 3 * u * s * s * c + s * s * s; };
    return function (k) { if (k <= 0) return 0; if (k >= 1) return 1; for (var lo = 0, hi = 1, s = k, i = 0; i < 24; i++) { var x = b(x1, x2, s); if (Math.abs(x - k) < 1e-5) break; if (x < k) lo = s; else hi = s; s = (lo + hi) / 2; } return b(y1, y2, s); };
  }
  function quieto() { return window.AlmaReloj ? window.AlmaReloj.quieto : !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); }
  // A score, played once. Each step starts `en` (from the beginning; or 'sigue': when the one before ends), lasts
  // `dura`, and is told how far along it is, from 0 to 1, through its curve. A step is always told 1 at its end.
  function toca(pasos, o) {
    o = o || {}; var cs = estilo(o.el), fin = 0, P = pasos.map(function (p) { var en = p.en === 'sigue' ? fin + tiempo(p.mas, o.el, cs) : tiempo(p.en, o.el, cs), dura = tiempo(p.dura, o.el, cs); fin = en + dura; return { en: en, dura: dura, curva: curva(p.curva, o.el), paso: p.paso, hecho: false }; });
    var largo = P.reduce(function (m, p) { return Math.max(m, p.en + p.dura); }, 0), t = 0, antes = 0, vivo = true, id = 0, T = { termino: false, largo: largo, deja: function () { vivo = false; if (id) (window.AlmaReloj ? window.AlmaReloj.deja(id) : cancelAnimationFrame(id)); } };
    function acaba() { for (var i = 0; i < P.length; i++) if (!P[i].hecho) { P[i].hecho = true; P[i].paso(1); } T.termino = true; vivo = false; if (o.alTerminar) o.alTerminar(); }
    function cuadro(ahora) {
      id = 0; if (!vivo) return; t += Math.min(0.05, antes ? (ahora - antes) / 1000 : 0); antes = ahora; if (quieto()) { acaba(); return; }
      for (var i = 0; i < P.length; i++) { var p = P[i]; if (p.hecho || t < p.en) continue; var k = p.dura > 0 ? (t - p.en) / p.dura : 1; if (k >= 1) { p.hecho = true; p.paso(1); } else p.paso(p.curva(k)); }
      if (t >= largo) acaba(); else pide();
    }
    function pide() { id = window.AlmaReloj ? window.AlmaReloj.pide(cuadro) : requestAnimationFrame(cuadro); }
    if (quieto()) acaba(); else { for (var i = 0; i < P.length; i++) if (P[i].en > 0 || P[i].dura > 0) P[i].paso(0); pide(); }
    return T;
  }
  window.AlmaPartitura = { recetas: RECETAS, tiempos: tiempos, segundos: segundos, curva: curva, toca: toca };
})();
// ALMA's effects: the collection of what moves behind, between and under things. Four families: a background
// (fondo), a change from one thing to another (transicion), an answer to whoever touches (reaccion) and a text that
// moves as it arrives (texto).
// Every effect is written here, ours, and keeps the same promises: its colours are tokens, read from where it is
// mounted (so an entity's effect is the entity's); it asks ALMA's clock (site/reloj.js) for its frames; it draws only
// while it is seen and the page is shown; with less motion asked for it is one still picture; and it is decoration,
// hidden from whoever does not see the page.
//   AlmaEfectos.pon({ id, familia, nombre, colores: { nombre: token }, ajustes: [{ id, nombre, min, max, paso, valor }], crea(lienzo, V) })
//     crea → { medida(ancho, alto), cuadro(dt, t, puntero), color(nombre, [r, g, b]), quita() }
//   A reaction lives on an element instead of on a canvas of its own: it gives pone(el, V) → { ajusta(id, valor), quita() }.
//   A transition is a reaction with one more thing to give: pasa(), which plays it when whoever uses it says so.
//   AlmaEfectos.monta(id, el, valores) → { ajusta(id, valor), valores, quieto(), quita() }
(function () {
  if (window.AlmaEfectos) return;
  var LISTA = {}, sonda = null;
  // A colour token as an element has it, as three numbers from 0 to 1, however CSS writes it.
  function color(token, el) {
    var v = getComputedStyle(el || document.documentElement).getPropertyValue('--' + token).trim();
    if (!sonda) { var c = document.createElement('canvas'); c.width = c.height = 1; sonda = c.getContext('2d', { willReadFrequently: true }); }
    sonda.clearRect(0, 0, 1, 1); if (v) { sonda.fillStyle = v; sonda.fillRect(0, 0, 1, 1); }
    var d = sonda.getImageData(0, 0, 1, 1).data; return [d[0] / 255, d[1] / 255, d[2] / 255];
  }
  function quieto() { var R = window.AlmaReloj; return R ? R.quieto : !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); }
  // A motion token as an element has it: a duration in seconds, a curve as the function it is.
  function segundos(token, el) { var P = window.AlmaPartitura; if (P) return P.segundos(token, el); var t = getComputedStyle(el || document.documentElement).getPropertyValue('--' + token).trim(), x = parseFloat(t); return isFinite(x) ? (/ms$/.test(t) ? x / 1000 : x) : 0.24; }
  function curva(token, el) { var P = window.AlmaPartitura; return P ? P.curva(token, el) : function (k) { return 1 - (1 - k) * (1 - k); }; }
  // A background that is one picture worked out point by point: a canvas, the program that colours each point, and
  // its values by name. escala: how many of the screen's points it is drawn with (a soft picture needs fewer).
  function sombra(lienzo, fs, escala) {
    var gl = lienzo.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: true }); if (!gl) return null;
    var p = gl.createProgram();
    [[gl.VERTEX_SHADER, 'attribute vec2 p; varying vec2 vUv; void main() { vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }'], [gl.FRAGMENT_SHADER, fs]].forEach(function (x) { var s = gl.createShader(x[0]); gl.shaderSource(s, x[1]); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); gl.attachShader(p, s); });
    gl.bindAttribLocation(p, 0, 'p'); gl.linkProgram(p); gl.useProgram(p);
    var u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS); for (var i = 0; i < n; i++) { var nombre = gl.getActiveUniform(p, i).name; u[nombre] = gl.getUniformLocation(p, nombre); }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    return {
      gl: gl, u: u,
      medida: function (ancho, alto) { var d = Math.min(window.devicePixelRatio || 1, 2) * (escala || 1); lienzo.width = Math.max(2, Math.round(ancho * d)); lienzo.height = Math.max(2, Math.round(alto * d)); gl.viewport(0, 0, lienzo.width, lienzo.height); gl.uniform2f(u.uTam, lienzo.width, lienzo.height); },
      dibuja: function () { gl.drawArrays(gl.TRIANGLES, 0, 3); },
      quita: function () { var x = gl.getExtension('WEBGL_lose_context'); if (x) x.loseContext(); }
    };
  }
  // (a noise of our own for those programs: a value at each corner of a grid, eased between them; from 0 to 1)
  var RUIDO = 'float azar(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }\n' +
    'float ruido(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(azar(i), azar(i + vec2(1.0, 0.0)), f.x), mix(azar(i + vec2(0.0, 1.0)), azar(i + vec2(1.0, 1.0)), f.x), f.y); }\n';
  // Every frame while fn answers true, on ALMA's clock where there is one. → quita()
  function cada(fn) { var R = window.AlmaReloj; if (R) return R.cada(function () { return fn(R.dt); }); var id = 0, paso = function () { if (fn(1 / 60) === true) id = requestAnimationFrame(paso); }; id = requestAnimationFrame(paso); return function () { cancelAnimationFrame(id); }; }
  // Once, the first time a tenth of an element is seen. → deja()
  function alVer(el, fn) { var ojo = new IntersectionObserver(function (v) { if (v[v.length - 1].isIntersecting) { ojo.disconnect(); fn(); } }, { threshold: 0.1 }); ojo.observe(el); return function () { ojo.disconnect(); }; }
  // A text that moves has two faces: the true one, out of sight, for whoever has the page read to them, and the one
  // that is seen and changes, which they are not told about.
  function dosCaras(el) {
    var texto = el.textContent, antes = el.innerHTML, real = document.createElement('span'), vista = document.createElement('span');
    real.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap'; real.textContent = texto;
    vista.setAttribute('aria-hidden', 'true'); vista.textContent = texto; el.textContent = ''; el.appendChild(real); el.appendChild(vista);
    return { texto: texto, vista: vista, suelta: function () { el.innerHTML = antes; } };
  }
  function monta(id, el, valores) {
    var def = LISTA[id]; if (!def) throw new Error('No hay un efecto «' + id + '»');
    if (def.pone) {
      var W = {}; def.ajustes.forEach(function (a) { W[a.id] = valores && valores[a.id] != null ? valores[a.id] : a.valor; });
      var o = def.pone(el, W);
      return { valores: W, quieto: quieto, ajusta: function (k, v) { W[k] = v; if (o.ajusta) o.ajusta(k, v); }, pasa: o.pasa || function () {}, quita: o.quita };
    }
    var R = window.AlmaReloj, V = {}, lienzo = document.createElement('canvas'), vivo = true, aLaVista = false, quita = null, t = 0, cuenta = 0, puntero = { x: 0, y: 0, dentro: false };
    def.ajustes.forEach(function (a) { V[a.id] = valores && valores[a.id] != null ? valores[a.id] : a.valor; });
    lienzo.setAttribute('aria-hidden', 'true'); lienzo.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none';
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.insertBefore(lienzo, el.firstChild);
    var obra = def.crea(lienzo, V);
    if (!obra) { lienzo.remove(); return null; }
    function colores() { for (var k in def.colores) obra.color(k, color(def.colores[k], el)); }
    function mide() { var r = el.getBoundingClientRect(); if (r.width && r.height) { obra.medida(r.width, r.height); if (quieto()) fija(); } }
    // One still picture: the effect as it is after a while, worked out at once.
    function fija() { colores(); for (var i = 0; i < 200; i++) obra.cuadro(1 / 60, 20 + i / 60, puntero, i < 199); }
    function cuadro() {
      if (!vivo || !aLaVista || document.hidden || quieto()) { quita = null; return false; }
      var dt = R ? R.dt : 1 / 60; t += dt;
      // (a theme or an entity may change under it: its colours are read again twice a second)
      if (cuenta++ % 30 === 0) colores();
      obra.cuadro(dt, t, puntero, false); return true;
    }
    function anda() {
      if (!vivo) return; if (quieto()) { fija(); return; }
      if (quita || !aLaVista || document.hidden) return;
      if (R) quita = R.cada(cuadro); else { var id = 0, paso = function () { if (cuadro()) id = requestAnimationFrame(paso); }; id = requestAnimationFrame(paso); quita = function () { cancelAnimationFrame(id); }; }
    }
    function mueve(e) { var r = el.getBoundingClientRect(); puntero.x = (e.clientX - r.left) / r.width - 0.5; puntero.y = 0.5 - (e.clientY - r.top) / r.height; puntero.dentro = Math.abs(puntero.x) <= 0.5 && Math.abs(puntero.y) <= 0.5; }
    var ojo = new IntersectionObserver(function (v) { aLaVista = v[v.length - 1].isIntersecting; anda(); }), regla = new ResizeObserver(mide);
    var dejaReloj = R ? R.alCambiar(anda) : null;
    ojo.observe(el); regla.observe(el); window.addEventListener('pointermove', mueve, { passive: true }); document.addEventListener('visibilitychange', anda);
    colores(); mide();
    return {
      valores: V,
      ajusta: function (k, v) { V[k] = v; if (quieto()) fija(); },
      quieto: quieto,
      quita: function () { vivo = false; if (quita) quita(); if (dejaReloj) dejaReloj(); ojo.disconnect(); regla.disconnect(); window.removeEventListener('pointermove', mueve); document.removeEventListener('visibilitychange', anda); obra.quita(); lienzo.remove(); }
    };
  }
  window.AlmaEfectos = { lista: LISTA, color: color, quieto: quieto, segundos: segundos, curva: curva, sombra: sombra, RUIDO: RUIDO, cada: cada, alVer: alVer, dosCaras: dosCaras, monta: monta, pon: function (def) { LISTA[def.id] = def; return def; } };
})();
// Halo: a ring of light that breathes, and the light it leaves behind. A background.
// How it works: the picture is not drawn anew each frame. Each frame reads the one before, a little grown from the
// centre and pushed aside by its own light, lets it fade, and adds a thin ring on top. So the ring leaves a wake that
// opens outward and curls. What is kept is not colour but how much of each of two lights there is at each point; the
// colours are put in at the end, so the same wake reads on a dark page and on a light one.
(function () {
  var PUNTAS = 'attribute vec2 p; varying vec2 vUv; void main() { vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }';
  var ESTELA = [
    'precision highp float;',
    'varying vec2 vUv; uniform sampler2D uAntes; uniform vec2 uTam, uCentro; uniform float uT, uTamano, uPulso, uQueda, uResta, uPetalos, uGiro;',
    'void main() {',
    '  float ancho = uTam.x / uTam.y;',
    '  vec2 c = vec2(0.5) + uCentro, d = vUv - c, q = d * vec2(ancho, 1.0);',
    '  float r = length(q), a = atan(q.x, q.y);',
    // what was there: grown from the centre and turned a little, and pushed aside by its own light
    '  vec2 e = texture2D(uAntes, vUv).rg;',
    '  float g = uGiro * (0.0025 + 0.0015 * cos(uT * 0.4)), s = sin(g), k = cos(g);',
    '  vec2 crece = c + vec2(d.x * k - d.y * s * (1.0 / ancho), d.x * s * ancho + d.y * k) * 0.9955;',
    '  vec2 empuja = vUv + (e.gr - 0.2) * vec2(0.009 / ancho, 0.009);',
    '  vec2 antes = texture2D(uAntes, crece).rg * 0.62 + texture2D(uAntes, empuja).rg * 0.38;',
    '  antes = max(antes - uResta, 0.0) * uQueda;',
    // the ring: thin, just inside its radius, with petals that rise and fall
    '  float radio = 0.2 * uTamano;',
    '  float onda = sin(a * uPetalos + uT * 0.5) * sin(uT * 1.5) * 0.055 * uPulso;',
    '  float x = r / radio + onda;',
    '  float anillo = smoothstep(1.0, 0.9, x) * pow(min(x, 1.0), 18.0);',
    // which of the two lights: it goes round the ring and changes with time
    '  float cual = 0.5 + 0.5 * sin(a + uT * 0.35 + 1.2 * sin(uT * 0.21));',
    '  gl_FragColor = vec4(min(antes + anillo * vec2(cual, 1.0 - cual), 1.0), 0.0, 1.0);',
    '}'
  ].join('\n');
  var MUESTRA = [
    'precision highp float;',
    'varying vec2 vUv; uniform sampler2D uAhora; uniform vec3 uFondo, uUno, uDos;',
    'void main() {',
    '  vec2 e = texture2D(uAhora, vUv).rg;',
    '  vec3 col = mix(uFondo, uUno, smoothstep(0.0, 0.9, e.r));',
    '  col = mix(col, uDos, smoothstep(0.05, 1.0, e.g) * 0.9);',
    // (a grain finer than the eye, so that slow fades do not show steps)
    '  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');
  window.AlmaEfectos.pon({
    id: 'halo', familia: 'fondo', nombre: 'Halo',
    colores: { fondo: 'ui-02', uno: 'interactive-01', dos: 'text-01' },
    ajustes: [
      { id: 'tamano', nombre: 'Tamaño', min: 0.4, max: 2.4, paso: 0.05, valor: 1.2 },
      { id: 'pulso', nombre: 'Pulso', min: 0, max: 4, paso: 0.1, valor: 2 },
      { id: 'petalos', nombre: 'Pétalos', min: 0, max: 12, paso: 1, valor: 7 },
      { id: 'estela', nombre: 'Estela', min: 0, max: 1, paso: 0.02, valor: 0.8 },
      { id: 'giro', nombre: 'Giro', min: -3, max: 3, paso: 0.1, valor: 1 },
      { id: 'velocidad', nombre: 'Velocidad', min: 0.1, max: 2.5, paso: 0.1, valor: 1 },
      { id: 'x', nombre: 'Centro, a lo ancho', min: -0.5, max: 0.5, paso: 0.02, valor: 0 },
      { id: 'y', nombre: 'Centro, a lo alto', min: -0.5, max: 0.5, paso: 0.02, valor: 0 }
    ],
    crea: function (lienzo, V) {
      // The wake is kept in fine numbers where the machine can (so a faint light goes on fading instead of sticking);
      // where it cannot, in bytes, and then it fades a little sooner.
      var o = { alpha: false, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: true }, gl = lienzo.getContext('webgl2', o), fino = !!gl && !!(gl.getExtension('EXT_color_buffer_half_float') || gl.getExtension('EXT_color_buffer_float'));
      if (!gl) gl = lienzo.getContext('webgl', o);
      if (!gl) return null;
      function programa(fs) {
        var p = gl.createProgram();
        [[gl.VERTEX_SHADER, PUNTAS], [gl.FRAGMENT_SHADER, fs]].forEach(function (x) { var s = gl.createShader(x[0]); gl.shaderSource(s, x[1]); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); gl.attachShader(p, s); });
        gl.bindAttribLocation(p, 0, 'p'); gl.linkProgram(p); var u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
        for (var i = 0; i < n; i++) { var nombre = gl.getActiveUniform(p, i).name; u[nombre] = gl.getUniformLocation(p, nombre); }
        return { p: p, u: u };
      }
      var E = programa(ESTELA), M = programa(MUESTRA), hojas = [], w = 0, h = 0, t = 0, cx = 0, cy = 0, C = { fondo: [0, 0, 0], uno: [0, 0, 0], dos: [0, 0, 0] };
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      function hoja() {
        var tx = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tx); gl.texImage2D(gl.TEXTURE_2D, 0, fino ? gl.RGBA16F : gl.RGBA, w, h, 0, gl.RGBA, fino ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        var fb = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fb); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tx, 0);
        gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
        return { tx: tx, fb: fb };
      }
      return {
        // (the wake is kept at half the points of the screen: it is soft, and it costs a quarter)
        medida: function (ancho, alto) {
          var d = Math.min(window.devicePixelRatio || 1, 2) * 0.5, nw = Math.max(2, Math.round(ancho * d)), nh = Math.max(2, Math.round(alto * d));
          if (nw === w && nh === h) return; w = nw; h = nh; lienzo.width = w; lienzo.height = h;
          hojas.forEach(function (x) { gl.deleteTexture(x.tx); gl.deleteFramebuffer(x.fb); }); hojas = [hoja(), hoja()];
        },
        color: function (k, v) { C[k] = v; },
        cuadro: function (dt, ahora, puntero, calla) {
          if (!hojas.length) return;
          t += dt * V.velocidad;
          // the centre leans toward the pointer, without hurry
          var hx = V.x + (puntero.dentro ? puntero.x * 0.15 : 0), hy = V.y + (puntero.dentro ? puntero.y * 0.15 : 0), cede = 1 - Math.exp(-dt * 3);
          cx += (hx - cx) * cede; cy += (hy - cy) * cede;
          gl.viewport(0, 0, w, h);
          gl.useProgram(E.p); gl.bindFramebuffer(gl.FRAMEBUFFER, hojas[1].fb); gl.bindTexture(gl.TEXTURE_2D, hojas[0].tx);
          gl.uniform2f(E.u.uTam, w, h); gl.uniform2f(E.u.uCentro, cx, cy); gl.uniform1f(E.u.uT, t); gl.uniform1f(E.u.uTamano, V.tamano); gl.uniform1f(E.u.uPulso, V.pulso);
          gl.uniform1f(E.u.uPetalos, V.petalos); gl.uniform1f(E.u.uGiro, V.giro); gl.uniform1f(E.u.uQueda, 0.96 + 0.0395 * V.estela); gl.uniform1f(E.u.uResta, fino ? 0.0004 : 0.0042);
          gl.drawArrays(gl.TRIANGLES, 0, 3); hojas.reverse();
          if (calla) return;
          gl.useProgram(M.p); gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.bindTexture(gl.TEXTURE_2D, hojas[0].tx);
          gl.uniform3fv(M.u.uFondo, C.fondo); gl.uniform3fv(M.u.uUno, C.uno); gl.uniform3fv(M.u.uDos, C.dos);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        },
        quita: function () { var x = gl.getExtension('WEBGL_lose_context'); if (x) x.loseContext(); }
      };
    }
  });
})();
// Chispa: a click throws a few short lines outward from where it landed. A reaction.
// The lines leave the point evenly round it, travel a short way and shorten to nothing as they go. They are drawn on
// a canvas laid over the element, which lets every click through.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'chispa', familia: 'reaccion', nombre: 'Chispa', muestra: 'zona',
    colores: { chispa: 'interactive-01' },
    ajustes: [
      { id: 'cuantas', nombre: 'Cuántas', min: 3, max: 16, paso: 1, valor: 8 },
      { id: 'largo', nombre: 'Largo', min: 4, max: 32, paso: 2, valor: 12 },
      { id: 'alcance', nombre: 'Alcance', min: 8, max: 80, paso: 4, valor: 24 }
    ],
    pone: function (el, V) {
      var lienzo = document.createElement('canvas'), g = lienzo.getContext('2d'), vivas = [], quita = null, R = window.AlmaReloj, d = 1;
      lienzo.setAttribute('aria-hidden', 'true'); lienzo.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.appendChild(lienzo);
      function cuadro() {
        var ahora = performance.now(), dura = E.segundos('duration-slow-01', el) * 1000, sale = E.curva('easing-entrance-expressive', el);
        g.clearRect(0, 0, lienzo.width, lienzo.height);
        vivas = vivas.filter(function (c) { return ahora - c.t < dura; });
        g.strokeStyle = getComputedStyle(el).getPropertyValue('--interactive-01'); g.lineWidth = 2 * d; g.lineCap = 'round'; g.beginPath();
        vivas.forEach(function (c) {
          var k = sale((ahora - c.t) / dura), lejos = k * V.alcance * d, largo = V.largo * (1 - k) * d;
          for (var i = 0; i < V.cuantas; i++) { var a = 2 * Math.PI * i / V.cuantas, x = Math.cos(a), y = Math.sin(a); g.moveTo(c.x + lejos * x, c.y + lejos * y); g.lineTo(c.x + (lejos + largo) * x, c.y + (lejos + largo) * y); }
        });
        g.stroke();
        if (!vivas.length) { quita = null; return false; } return true;
      }
      function pulsa(ev) {
        if (E.quieto()) return;
        var r = el.getBoundingClientRect(); d = Math.min(window.devicePixelRatio || 1, 2);
        var w = Math.round(r.width * d), h = Math.round(r.height * d); if (lienzo.width !== w || lienzo.height !== h) { lienzo.width = w; lienzo.height = h; }
        vivas.push({ x: (ev.clientX - r.left) * d, y: (ev.clientY - r.top) * d, t: performance.now() });
        if (!quita) { if (R) quita = R.cada(cuadro); else { var id = 0, paso = function () { if (cuadro()) id = requestAnimationFrame(paso); }; id = requestAnimationFrame(paso); quita = function () { cancelAnimationFrame(id); }; } }
      }
      el.addEventListener('pointerdown', pulsa);
      return { quita: function () { el.removeEventListener('pointerdown', pulsa); if (quita) quita(); lienzo.remove(); } };
    }
  });
})();
// Imán: a thing leans toward the pointer when it comes near, and goes back when it leaves. A reaction.
// It is put on a wrapper, which stays where it is, and moves what the wrapper holds: so where "near" is does not
// move with the thing. Near is the wrapper's box and a margin round it; the lean is a part of the way to the pointer.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'iman', familia: 'reaccion', nombre: 'Imán', muestra: 'boton',
    colores: {},
    ajustes: [
      { id: 'alcance', nombre: 'Alcance', min: 0, max: 160, paso: 8, valor: 80 },
      { id: 'fuerza', nombre: 'Fuerza', min: 0.1, max: 0.8, paso: 0.05, valor: 0.4 }
    ],
    pone: function (el, V) {
      var pieza = el.firstElementChild, antes = pieza ? { transform: pieza.style.transform, transition: pieza.style.transition } : null, cerca = false;
      function suelta() { if (!cerca) return; cerca = false; pieza.style.transition = 'transform var(--duration-slow-01) var(--easing-standard-productive)'; pieza.style.transform = antes.transform; }
      function mueve(ev) {
        if (!pieza || ev.pointerType === 'touch' || E.quieto()) { suelta(); return; }
        var r = el.getBoundingClientRect(), dx = ev.clientX - (r.left + r.width / 2), dy = ev.clientY - (r.top + r.height / 2);
        if (Math.abs(dx) > r.width / 2 + V.alcance || Math.abs(dy) > r.height / 2 + V.alcance) { suelta(); return; }
        cerca = true; pieza.style.transition = 'transform var(--duration-moderate-02) var(--easing-entrance-productive)';
        pieza.style.transform = 'translate(' + (dx * V.fuerza).toFixed(1) + 'px,' + (dy * V.fuerza).toFixed(1) + 'px)';
      }
      window.addEventListener('pointermove', mueve, { passive: true }); document.addEventListener('pointerleave', suelta);
      return { quita: function () { window.removeEventListener('pointermove', mueve); document.removeEventListener('pointerleave', suelta); if (pieza) { pieza.style.transform = antes.transform; pieza.style.transition = antes.transition; } } };
    }
  });
})();
// Destello: a band of light crosses a surface when the pointer, or the focus, comes onto it. A reaction.
// The band is a slanted gradient much larger than the surface, laid over it and kept out of sight to one side;
// coming onto the surface slides it to the other side, and leaving slides it back.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'destello', familia: 'reaccion', nombre: 'Destello', muestra: 'tarjeta',
    colores: { luz: 'text-01' },
    ajustes: [
      { id: 'brillo', nombre: 'Brillo', min: 0.05, max: 0.6, paso: 0.05, valor: 0.3 },
      { id: 'angulo', nombre: 'Ángulo', min: -80, max: 80, paso: 5, valor: -45 },
      { id: 'ancho', nombre: 'Ancho', min: 2, max: 24, paso: 1, valor: 10 }
    ],
    pone: function (el, V) {
      var luz = document.createElement('span');
      luz.setAttribute('aria-hidden', 'true');
      luz.style.cssText = 'position:absolute;inset:0;pointer-events:none;border-radius:inherit;background-repeat:no-repeat;background-size:250% 250%;background-position:-100% -100%;transition:background-position var(--duration-slow-02) var(--easing-standard-expressive)';
      function pinta() { luz.style.backgroundImage = 'linear-gradient(' + V.angulo + 'deg, transparent ' + (50 - V.ancho) + '%, color-mix(in srgb, var(--text-01) ' + Math.round(V.brillo * 100) + '%, transparent) 50%, transparent ' + (50 + V.ancho) + '%)'; }
      function entra() { if (!E.quieto()) luz.style.backgroundPosition = '100% 100%'; }
      function sale() { luz.style.backgroundPosition = '-100% -100%'; }
      var cs = getComputedStyle(el), antes = { position: el.style.position, overflow: el.style.overflow };
      if (cs.position === 'static') el.style.position = 'relative';
      el.style.overflow = 'hidden'; pinta(); el.appendChild(luz);
      el.addEventListener('pointerenter', entra); el.addEventListener('pointerleave', sale); el.addEventListener('focusin', entra); el.addEventListener('focusout', sale);
      return { ajusta: pinta, quita: function () { el.removeEventListener('pointerenter', entra); el.removeEventListener('pointerleave', sale); el.removeEventListener('focusin', entra); el.removeEventListener('focusout', sale); luz.remove(); el.style.position = antes.position; el.style.overflow = antes.overflow; } };
    }
  });
})();
// Trama: one thing gives way to another behind a grid of squares that fills in at random and then clears. A transition.
// It is put on an element that holds the two things, the one that is there and the one to come (hidden). pasa()
// covers what is there square by square, swaps the two once nothing shows, and uncovers the other the same way.
// The squares are drawn on a canvas laid over the element.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'trama', familia: 'transicion', nombre: 'Trama', muestra: 'cambio',
    colores: { trama: 'interactive-01' },
    ajustes: [
      { id: 'columnas', nombre: 'Columnas', min: 4, max: 32, paso: 1, valor: 12 }
    ],
    pone: function (el, V) {
      var lienzo = document.createElement('canvas'), g = lienzo.getContext('2d'), R = window.AlmaReloj, quita = null, cual = 0;
      lienzo.setAttribute('aria-hidden', 'true'); lienzo.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      function caras() { return [].filter.call(el.children, function (c) { return c !== lienzo; }); }
      caras().forEach(function (c, i) { c.hidden = i !== cual; });
      el.appendChild(lienzo);
      function cambia() { var C = caras(); cual = (cual + 1) % C.length; C.forEach(function (c, i) { c.hidden = i !== cual; }); }
      function pasa() {
        if (quita) return; if (E.quieto()) { cambia(); return; }
        var r = el.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2), w = lienzo.width = Math.round(r.width * d), h = lienzo.height = Math.round(r.height * d);
        var lado = w / V.columnas, filas = Math.ceil(h / lado), n = V.columnas * filas, entra = new Float32Array(n), sale = new Float32Array(n), t = 0, hecho = false;
        for (var i = 0; i < n; i++) { entra[i] = Math.random(); sale[i] = Math.random(); }
        var medio = E.segundos('duration-slow-01', el);
        function cuadro() {
          t += R ? R.dt : 1 / 60; var k = t / medio;
          if (k >= 1 && !hecho) { hecho = true; cambia(); }
          g.clearRect(0, 0, w, h);
          if (k >= 2) { quita = null; return false; }
          g.fillStyle = getComputedStyle(el).getPropertyValue('--interactive-01');
          for (var i = 0; i < n; i++) if (k < 1 ? entra[i] < k : sale[i] >= k - 1) g.fillRect(Math.floor((i % V.columnas) * lado), Math.floor(Math.floor(i / V.columnas) * lado), Math.ceil(lado), Math.ceil(lado));
          return true;
        }
        if (R) quita = R.cada(cuadro); else { var id = 0, paso = function () { if (cuadro()) id = requestAnimationFrame(paso); }; id = requestAnimationFrame(paso); quita = function () { cancelAnimationFrame(id); }; }
      }
      return { pasa: pasa, quita: function () { if (quita) quita(); lienzo.remove(); } };
    }
  });
})();
// Aparecer: a thing comes into being when it is first seen: from clear to solid, from blurred to sharp, rising a
// little. A transition, from nothing to something.
// It is put on the thing itself. It waits out of sight until a tenth of it is in view, and then plays once;
// pasa() plays it again. The thing is there all along for whoever reads the page without seeing it.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'aparecer', familia: 'transicion', nombre: 'Aparecer', muestra: 'entrada',
    colores: {},
    ajustes: [
      { id: 'desenfoque', nombre: 'Desenfoque', min: 0, max: 24, paso: 2, valor: 8 },
      { id: 'subida', nombre: 'Subida', min: 0, max: 48, paso: 8, valor: 16 }
    ],
    pone: function (el, V) {
      var antes = { opacity: el.style.opacity, filter: el.style.filter, transform: el.style.transform, transition: el.style.transition }, ojo = null, pedido = 0;
      function suelta() { for (var k in antes) el.style[k] = antes[k]; }
      function esconde() { el.style.transition = 'none'; el.style.opacity = '0'; el.style.filter = 'blur(' + V.desenfoque + 'px)'; el.style.transform = 'translateY(' + V.subida + 'px)'; }
      function muestra() {
        void el.offsetWidth;
        var como = ' var(--duration-slow-02) var(--easing-entrance-expressive)';
        el.style.transition = 'opacity' + como + ', filter' + como + ', transform' + como; el.style.opacity = '1'; el.style.filter = 'blur(0px)'; el.style.transform = 'translateY(0)';
      }
      function termina(ev) { if (ev.target === el && ev.propertyName === 'opacity' && el.style.opacity === '1') suelta(); }
      function pasa() { if (E.quieto()) { suelta(); return; } esconde(); cancelAnimationFrame(pedido); pedido = requestAnimationFrame(muestra); }
      el.addEventListener('transitionend', termina);
      if (!E.quieto()) { esconde(); ojo = new IntersectionObserver(function (v) { if (v[v.length - 1].isIntersecting) { ojo.disconnect(); ojo = null; muestra(); } }, { threshold: 0.1 }); ojo.observe(el); }
      return { pasa: pasa, quita: function () { if (ojo) ojo.disconnect(); cancelAnimationFrame(pedido); el.removeEventListener('transitionend', termina); suelta(); } };
    }
  });
})();
// Velo: curtains of light that hang from the top of a section and sway. A background.
// How it works: along the top runs a wavering edge, a noise that drifts with time; above it there is light, and
// below it the light thins out softly. A finer noise draws the folds of the cloth. The light goes from one colour
// at the sides to another in the middle.
(function () {
  var E = window.AlmaEfectos;
  var FS = [
    'precision highp float;',
    'varying vec2 vUv; uniform vec2 uTam; uniform float uT, uAlto, uAmplitud, uSuave, uFuerza, uCorre; uniform vec3 uFondo, uUno, uDos;',
    E.RUIDO,
    'void main() {',
    '  float x = vUv.x * uTam.x / uTam.y + uCorre;',
    // the edge: a slow wave and a quicker one on top of it
    '  float borde = 1.0 - uAlto + (ruido(vec2(x * 1.3 + uT * 0.06, uT * 0.11)) - 0.5) * 0.7 * uAmplitud + (ruido(vec2(x * 3.7 - uT * 0.09, uT * 0.17 + 7.0)) - 0.5) * 0.22 * uAmplitud;',
    '  float luz = smoothstep(borde - uSuave, borde + uSuave * 0.6, vUv.y);',
    // the folds, stronger near the edge than at the top
    '  float pliegue = 0.72 + 0.28 * ruido(vec2(x * 11.0 + uT * 0.05, vUv.y * 1.5 - uT * 0.08));',
    '  luz *= mix(pliegue, 1.0, smoothstep(borde, 1.0, vUv.y) * 0.6);',
    '  vec3 tono = mix(uUno, uDos, 0.45 * (1.0 - abs(vUv.x * 2.0 - 1.0)) * (0.6 + 0.4 * ruido(vec2(x * 0.8, uT * 0.07))));',
    '  vec3 col = mix(uFondo, tono, luz * uFuerza);',
    '  col += (azar(gl_FragCoord.xy) - 0.5) / 255.0;',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');
  E.pon({
    id: 'velo', familia: 'fondo', nombre: 'Velo',
    colores: { fondo: 'ui-02', uno: 'interactive-01', dos: 'text-01' },
    ajustes: [
      { id: 'alto', nombre: 'Caída', min: 0.1, max: 1, paso: 0.05, valor: 0.45 },
      { id: 'amplitud', nombre: 'Amplitud', min: 0, max: 2, paso: 0.1, valor: 1 },
      { id: 'suave', nombre: 'Suavidad', min: 0.05, max: 0.8, paso: 0.05, valor: 0.35 },
      { id: 'fuerza', nombre: 'Fuerza', min: 0.1, max: 1, paso: 0.05, valor: 0.7 },
      { id: 'velocidad', nombre: 'Velocidad', min: 0, max: 3, paso: 0.1, valor: 1 }
    ],
    crea: function (lienzo, V) {
      var S = E.sombra(lienzo, FS, 0.5); if (!S) return null; var gl = S.gl, u = S.u, t = 0, corre = 0;
      return {
        medida: S.medida, quita: S.quita,
        color: function (k, v) { gl.uniform3fv(u[{ fondo: 'uFondo', uno: 'uUno', dos: 'uDos' }[k]], v); },
        cuadro: function (dt, ahora, puntero, calla) {
          t += dt * V.velocidad * 4; corre += ((puntero.dentro ? puntero.x * 0.3 : 0) - corre) * (1 - Math.exp(-dt * 2)); if (calla) return;
          gl.uniform1f(u.uT, t); gl.uniform1f(u.uAlto, V.alto); gl.uniform1f(u.uAmplitud, V.amplitud); gl.uniform1f(u.uSuave, V.suave); gl.uniform1f(u.uFuerza, V.fuerza); gl.uniform1f(u.uCorre, corre);
          S.dibuja();
        }
      };
    }
  });
})();
// Hilos: a sheaf of fine lines that leaves one side together and opens as it crosses, each thread waving. A background.
// How it works: each thread is a height that changes along the width, a noise read a little further on for each
// thread, so that neighbours move alike without moving the same. Where they start they are held together; the
// waving grows as they cross. Each point of the picture asks every thread how near it passes.
(function () {
  var E = window.AlmaEfectos;
  var FS = [
    'precision highp float;',
    'varying vec2 vUv; uniform vec2 uTam; uniform float uT, uCuantos, uAmplitud, uSepara, uGrosor, uSube; uniform vec3 uFondo, uUno, uDos;',
    E.RUIDO,
    'void main() {',
    '  float x = vUv.x * uTam.x / uTam.y, abre = smoothstep(0.0, 0.75, vUv.x), tinta = 0.0, cual = 0.0;',
    '  for (int i = 0; i < 48; i++) {',
    '    if (float(i) >= uCuantos) break;',
    '    float p = float(i) / max(uCuantos - 1.0, 1.0);',
    '    float onda = ruido(vec2(x * 1.4 - uT * 0.12 + p * 0.9, p * 2.6 + uT * 0.05)) - 0.5 + (ruido(vec2(x * 4.0 - uT * 0.2, p * 9.0)) - 0.5) * 0.25;',
    '    float y = 0.5 + (p - 0.5) * uSepara * (0.25 + 0.75 * abre) + onda * uAmplitud * uSube * (0.15 + 0.85 * abre);',
    '    float ancho = uGrosor * (1.0 - 0.55 * p), linea = 1.0 - smoothstep(ancho * 0.5, ancho * 0.5 + 1.25, abs(vUv.y - y) * uTam.y);',
    '    linea *= 0.35 + 0.65 * (1.0 - p);',
    '    if (linea > tinta) { tinta = linea; cual = p; }',
    '  }',
    '  vec3 col = mix(uFondo, mix(uDos, uUno, smoothstep(0.0, 0.7, cual)), tinta);',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');
  E.pon({
    id: 'hilos', familia: 'fondo', nombre: 'Hilos',
    colores: { fondo: 'ui-02', uno: 'interactive-01', dos: 'text-01' },
    ajustes: [
      { id: 'cuantos', nombre: 'Cuántos', min: 4, max: 48, paso: 1, valor: 28 },
      { id: 'amplitud', nombre: 'Amplitud', min: 0, max: 2, paso: 0.1, valor: 1 },
      { id: 'separa', nombre: 'Separación', min: 0, max: 1, paso: 0.05, valor: 0.35 },
      { id: 'grosor', nombre: 'Grosor', min: 0.5, max: 4, paso: 0.5, valor: 1.5 },
      { id: 'velocidad', nombre: 'Velocidad', min: 0, max: 3, paso: 0.1, valor: 1 }
    ],
    crea: function (lienzo, V) {
      var S = E.sombra(lienzo, FS, 1); if (!S) return null; var gl = S.gl, u = S.u, t = 0, sube = 1;
      return {
        medida: S.medida, quita: S.quita,
        color: function (k, v) { gl.uniform3fv(u[{ fondo: 'uFondo', uno: 'uUno', dos: 'uDos' }[k]], v); },
        cuadro: function (dt, ahora, puntero, calla) {
          // the pointer, higher up, makes them wave wider; to one side, hurries them
          t += dt * V.velocidad * (1 + (puntero.dentro ? puntero.x : 0)); sube += ((puntero.dentro ? 1 + puntero.y * 0.8 : 1) - sube) * (1 - Math.exp(-dt * 3)); if (calla) return;
          var d = Math.min(window.devicePixelRatio || 1, 2);
          gl.uniform1f(u.uT, t * 4); gl.uniform1f(u.uCuantos, V.cuantos); gl.uniform1f(u.uAmplitud, V.amplitud); gl.uniform1f(u.uSepara, V.separa); gl.uniform1f(u.uGrosor, V.grosor * d); gl.uniform1f(u.uSube, sube);
          S.dibuja();
        }
      };
    }
  });
})();
// Descifrar: a line of text arrives scrambled and settles letter by letter, from its beginning. A text.
// The scrambled letters are the line's own, shuffled, so it keeps its look and nearly its width while it settles.
// It plays the first time it is seen; pasa() plays it again.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'descifrar', familia: 'texto', nombre: 'Descifrar', muestra: 'texto', ejemplo: 'Todo lo que se mueve',
    colores: {},
    ajustes: [
      { id: 'pulsos', nombre: 'Pulsos por letra', min: 1, max: 8, paso: 1, valor: 3 },
      { id: 'cambio', nombre: 'Calma del revuelo', min: 1, max: 8, paso: 1, valor: 3 }
    ],
    pone: function (el, V) {
      var C = E.dosCaras(el), texto = C.texto, letras = texto.replace(/\s/g, '').split(''), revuelto = [], quita = null, deja = null;
      function baraja() { for (var i = 0; i < texto.length; i++) revuelto[i] = letras[Math.floor(Math.random() * letras.length)]; }
      function pinta(k) { var n = Math.floor(k * texto.length), s = ''; for (var i = 0; i < texto.length; i++) s += i < n || /\s/.test(texto[i]) ? texto[i] : revuelto[i]; C.vista.textContent = s; }
      function pasa() {
        if (quita) { quita(); quita = null; }
        if (E.quieto() || !letras.length) { C.vista.textContent = texto; return; }
        // (a letter settles every so many pulses: the pulse is the one a word is written with)
        var t = 0, cuenta = 0, dura = texto.length * E.segundos('duration-stagger', el) * V.pulsos;
        quita = E.cada(function (dt) {
          t += dt; if (cuenta++ % V.cambio === 0) baraja();
          if (t >= dura) { C.vista.textContent = texto; quita = null; return false; }
          pinta(t / dura); return true;
        });
      }
      if (!E.quieto() && letras.length) { baraja(); pinta(0); deja = E.alVer(el, pasa); }
      return { pasa: pasa, quita: function () { if (quita) quita(); if (deja) deja(); C.suelta(); } };
    }
  });
})();
// Contar: a number climbs from zero to its value, quickly at first and slowing as it gets there. A text.
// It is put on an element whose text is the number, as it is written (with what goes before and after it: a sign,
// a unit). It plays the first time it is seen; pasa() plays it again. Its digits keep one width, so it does not shake.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'contar', familia: 'texto', nombre: 'Contar', muestra: 'texto', ejemplo: '12.480',
    colores: {},
    ajustes: [
      { id: 'veces', nombre: 'Duración', min: 1, max: 4, paso: 0.5, valor: 2 }
    ],
    pone: function (el, V) {
      var C = E.dosCaras(el), m = /^([^\d-]*)(-?[\d.,]+)(.*)$/.exec(C.texto.trim()), quita = null, deja = null;
      if (!m) return { quita: C.suelta };
      // (as Spanish writes it: a point every three digits, a comma before the decimals)
      var dec = (m[2].split(',')[1] || '').length, hasta = parseFloat(m[2].replace(/\./g, '').replace(',', '.')), F = new Intl.NumberFormat('es', { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: 'always' });
      C.vista.style.fontVariantNumeric = 'tabular-nums';
      function pasa() {
        if (quita) { quita(); quita = null; }
        if (E.quieto() || !isFinite(hasta)) { C.vista.textContent = C.texto; return; }
        var t = 0, dura = E.segundos('duration-slow-02', el) * V.veces, frena = E.curva('easing-entrance-expressive', el);
        quita = E.cada(function (dt) {
          t += dt; if (t >= dura) { C.vista.textContent = C.texto; quita = null; return false; }
          C.vista.textContent = m[1] + F.format(hasta * frena(t / dura)) + m[3]; return true;
        });
      }
      if (!E.quieto() && isFinite(hasta)) { C.vista.textContent = m[1] + F.format(0) + m[3]; deja = E.alVer(el, pasa); }
      return { pasa: pasa, quita: function () { if (quita) quita(); if (deja) deja(); C.suelta(); } };
    }
  });
})();
// Foco: a soft light under the pointer, inside a surface, that goes where the pointer goes. A reaction.
// The light is a round gradient laid over the surface, centred where the pointer is; it comes up when the pointer
// comes onto the surface and goes down when it leaves. With the keyboard, it comes up in the middle.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'foco', familia: 'reaccion', nombre: 'Foco', muestra: 'tarjeta',
    colores: { luz: 'interactive-01' },
    ajustes: [
      { id: 'brillo', nombre: 'Brillo', min: 0.05, max: 0.6, paso: 0.05, valor: 0.25 },
      { id: 'radio', nombre: 'Radio', min: 80, max: 400, paso: 40, valor: 200 }
    ],
    pone: function (el, V) {
      var luz = document.createElement('span'), x = 50, y = 50, enPx = false;
      luz.setAttribute('aria-hidden', 'true');
      luz.style.cssText = 'position:absolute;inset:0;pointer-events:none;border-radius:inherit;opacity:0;transition:opacity var(--duration-moderate-02) var(--easing-standard-productive)';
      function pinta() { luz.style.backgroundImage = 'radial-gradient(circle ' + V.radio + 'px at ' + x + (enPx ? 'px ' : '% ') + y + (enPx ? 'px' : '%') + ', color-mix(in srgb, var(--interactive-01) ' + Math.round(V.brillo * 100) + '%, transparent), transparent)'; }
      function mueve(ev) { var r = el.getBoundingClientRect(); x = Math.round(ev.clientX - r.left); y = Math.round(ev.clientY - r.top); enPx = true; pinta(); luz.style.opacity = '1'; }
      function centro() { x = y = 50; enPx = false; pinta(); luz.style.opacity = '1'; }
      function sale() { luz.style.opacity = '0'; }
      var antes = { position: el.style.position, overflow: el.style.overflow };
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.style.overflow = 'hidden'; pinta(); el.appendChild(luz);
      el.addEventListener('pointermove', mueve); el.addEventListener('pointerleave', sale); el.addEventListener('focusin', centro); el.addEventListener('focusout', sale);
      return { ajusta: pinta, quita: function () { el.removeEventListener('pointermove', mueve); el.removeEventListener('pointerleave', sale); el.removeEventListener('focusin', centro); el.removeEventListener('focusout', sale); luz.remove(); el.style.position = antes.position; el.style.overflow = antes.overflow; } };
    }
  });
})();
// Inclinar: a surface tips toward the pointer as if it were held by its middle, and lies flat again when the
// pointer leaves. A reaction.
// It is put on a wrapper, which stays flat, and tips what the wrapper holds: so the place the pointer is measured
// against does not tip with it. The side the pointer is on goes down, as a card pressed with a finger would.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'inclinar', familia: 'reaccion', nombre: 'Inclinar', muestra: 'envuelta',
    colores: {},
    ajustes: [
      { id: 'grados', nombre: 'Grados', min: 2, max: 20, paso: 1, valor: 8 },
      { id: 'crece', nombre: 'Crece', min: 1, max: 1.1, paso: 0.01, valor: 1.02 }
    ],
    pone: function (el, V) {
      var pieza = el.firstElementChild; if (!pieza) return { quita: function () {} };
      var antes = { transform: pieza.style.transform, transition: pieza.style.transition };
      function mueve(ev) {
        if (ev.pointerType === 'touch' || E.quieto()) return;
        var r = el.getBoundingClientRect(), px = (ev.clientX - r.left) / r.width - 0.5, py = (ev.clientY - r.top) / r.height - 0.5;
        pieza.style.transition = 'transform var(--duration-moderate-01) var(--easing-entrance-productive)';
        pieza.style.transform = 'perspective(800px) rotateX(' + (-py * 2 * V.grados).toFixed(2) + 'deg) rotateY(' + (px * 2 * V.grados).toFixed(2) + 'deg) scale(' + V.crece + ')';
      }
      function sale() { pieza.style.transition = 'transform var(--duration-slow-01) var(--easing-standard-productive)'; pieza.style.transform = antes.transform; }
      el.addEventListener('pointermove', mueve); el.addEventListener('pointerleave', sale);
      return { quita: function () { el.removeEventListener('pointermove', mueve); el.removeEventListener('pointerleave', sale); pieza.style.transform = antes.transform; pieza.style.transition = antes.transition; } };
    }
  });
})();
