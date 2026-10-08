// ALMA's effects: the collection of what moves behind, between and under things. Three families: a background
// (fondo), a change from one thing to another (transicion) and an answer to whoever touches (reaccion).
// Every effect is written here, ours, and keeps the same promises: its colours are tokens, read from where it is
// mounted (so an entity's effect is the entity's); it asks ALMA's clock (site/reloj.js) for its frames; it draws only
// while it is seen and the page is shown; with less motion asked for it is one still picture; and it is decoration,
// hidden from whoever does not see the page.
//   AlmaEfectos.pon({ id, familia, nombre, colores: { nombre: token }, ajustes: [{ id, nombre, min, max, paso, valor }], crea(lienzo, V) })
//     crea → { medida(ancho, alto), cuadro(dt, t, puntero), color(nombre, [r, g, b]), quita() }
//   A reaction lives on an element instead of on a canvas of its own: it gives pone(el, V) → { ajusta(id, valor), quita() }.
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
  function monta(id, el, valores) {
    var def = LISTA[id]; if (!def) throw new Error('No hay un efecto «' + id + '»');
    if (def.pone) {
      var W = {}; def.ajustes.forEach(function (a) { W[a.id] = valores && valores[a.id] != null ? valores[a.id] : a.valor; });
      var o = def.pone(el, W);
      return { valores: W, quieto: quieto, ajusta: function (k, v) { W[k] = v; if (o.ajusta) o.ajusta(k, v); }, quita: o.quita };
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
  window.AlmaEfectos = { lista: LISTA, color: color, quieto: quieto, segundos: segundos, curva: curva, monta: monta, pon: function (def) { LISTA[def.id] = def; return def; } };
})();
