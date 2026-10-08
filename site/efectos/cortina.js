// Cortina: a plain panel sweeps across, and what was there has become something else by the time it has passed.
// A transition.
// It is put on an element that holds the two things, the one that is there and the one to come (hidden). pasa()
// brings the panel in from one side until it covers everything, swaps the two behind it, and takes it out by the
// other side, without stopping.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'cortina', familia: 'transicion', nombre: 'Cortina', muestra: 'cambio',
    colores: { cortina: 'interactive-01' },
    ajustes: [
      { id: 'giro', nombre: 'Dirección, en grados', min: 0, max: 270, paso: 90, valor: 0 }
    ],
    pone: function (el, V) {
      var tela = document.createElement('span'), cual = 0, anda = null, antes = { position: el.style.position, overflow: el.style.overflow };
      tela.setAttribute('aria-hidden', 'true'); tela.style.cssText = 'position:absolute;inset:0;pointer-events:none;background:var(--interactive-01);visibility:hidden';
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.style.overflow = 'hidden';
      function caras() { return [].filter.call(el.children, function (c) { return c !== tela; }); }
      caras().forEach(function (c, i) { c.hidden = i !== cual; });
      el.appendChild(tela);
      function cambia() { var C = caras(); cual = (cual + 1) % C.length; C.forEach(function (c, i) { c.hidden = i !== cual; }); }
      // (where the panel is, from -1, out by the side it comes from, to 1, out by the other)
      function lugar(k) { var a = V.giro * Math.PI / 180, x = Math.round(Math.cos(a)), y = Math.round(Math.sin(a)); return 'translate(' + (k * x * 101) + '%,' + (k * y * 101) + '%)'; }
      function pasa() {
        if (anda) return; if (E.quieto() || !tela.animate) { cambia(); return; }
        var medio = E.segundos('duration-slow-01', el) * 1000, cs = getComputedStyle(el), entra = cs.getPropertyValue('--easing-entrance-expressive').trim() || 'ease-out', sale = cs.getPropertyValue('--easing-exit-expressive').trim() || 'ease-in';
        tela.style.visibility = 'visible';
        anda = tela.animate([{ transform: lugar(-1) }, { transform: lugar(0) }], { duration: medio, easing: entra, fill: 'forwards' });
        anda.onfinish = function () {
          cambia();
          anda = tela.animate([{ transform: lugar(0) }, { transform: lugar(1) }], { duration: medio, easing: sale, fill: 'forwards' });
          anda.onfinish = function () { anda.cancel(); anda = null; tela.style.visibility = 'hidden'; };
        };
      }
      return { pasa: pasa, quita: function () { if (anda) anda.cancel(); tela.remove(); el.style.position = antes.position; el.style.overflow = antes.overflow; } };
    }
  });
})();
