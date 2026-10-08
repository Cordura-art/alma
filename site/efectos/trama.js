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
