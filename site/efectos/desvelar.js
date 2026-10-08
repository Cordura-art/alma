// Desvelar: the words of a passage go from faint to full, one after another, as whoever reads scrolls past it. A text.
// Nothing here runs on time: how many words are full is how far the passage has travelled up the window, from
// entering near the bottom to reaching the middle. Scrolling back dims them again.
// pasa() goes through it by itself once, to try it where there is nothing to scroll.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'desvelar', familia: 'texto', nombre: 'Desvelar', muestra: 'texto', ejemplo: 'Lo que se lee al paso de quien avanza, palabra por palabra.',
    colores: {},
    ajustes: [
      { id: 'tenue', nombre: 'Tenue', min: 0.1, max: 0.6, paso: 0.05, valor: 0.25 },
      { id: 'a_la_vez', nombre: 'Palabras a la vez', min: 1, max: 8, paso: 1, valor: 3 }
    ],
    pone: function (el, V) {
      var C = E.dosCaras(el), piezas = [], pedido = 0, quita = null, R = window.AlmaReloj, solo = -1;
      C.vista.textContent = '';
      C.texto.split(/(\s+)/).forEach(function (t) {
        if (!t) return; if (/^\s+$/.test(t)) { C.vista.appendChild(document.createTextNode(t)); return; }
        var s = document.createElement('span'); s.textContent = t; C.vista.appendChild(s); piezas.push(s);
      });
      function pinta(k) { var n = piezas.length, ancho = V.a_la_vez; for (var i = 0; i < n; i++) piezas[i].style.opacity = String(V.tenue + (1 - V.tenue) * Math.min(1, Math.max(0, (k * (n + ancho) - i) / ancho))); }
      // (how far along: 0 when its top comes to 85% of the window's height, 1 when its bottom reaches 45%)
      function mide() {
        pedido = 0; if (solo >= 0) return;
        if (E.quieto()) { pinta(1); return; }
        var r = el.getBoundingClientRect(), alto = window.innerHeight; pinta(Math.min(1, Math.max(0, (alto * 0.85 - r.top) / (alto * 0.4 + r.height))));
      }
      function pide() { if (!pedido) pedido = R ? R.pide(mide) : requestAnimationFrame(mide); }
      function pasa() {
        if (quita || E.quieto()) return; solo = 0; var dura = E.segundos('duration-slow-02', el) * 3;
        quita = E.cada(function (dt) { solo += dt / dura; if (solo >= 1) { solo = -1; quita = null; mide(); return false; } pinta(solo); return true; });
      }
      window.addEventListener('scroll', pide, { capture: true, passive: true }); window.addEventListener('resize', pide);
      mide();
      return { pasa: pasa, ajusta: mide, quita: function () { window.removeEventListener('scroll', pide, { capture: true }); window.removeEventListener('resize', pide); if (quita) quita(); if (pedido) (R ? R.deja(pedido) : cancelAnimationFrame(pedido)); C.suelta(); } };
    }
  });
})();
