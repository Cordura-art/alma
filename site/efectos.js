// ALMA's effects: the collection of what moves behind, between and under things. Three families: a background
// (fondo), a change from one thing to another (transicion) and an answer to whoever touches (reaccion).
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
  window.AlmaEfectos = { lista: LISTA, color: color, quieto: quieto, segundos: segundos, curva: curva, sombra: sombra, RUIDO: RUIDO, monta: monta, pon: function (def) { LISTA[def.id] = def; return def; } };
})();
