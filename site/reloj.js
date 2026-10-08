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
