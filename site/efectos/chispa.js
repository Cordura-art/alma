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
