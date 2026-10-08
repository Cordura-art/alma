// Brillo: a band of light runs once along a line of text. A text.
// The line is painted with a gradient instead of a flat colour: the secondary text colour all along, and a band of
// the primary one, wider than the line and kept out of sight to one side. Seeing the line, pointing at it or
// reaching it with the keyboard slides the band across, once. It does not go on by itself.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'brillo', familia: 'texto', nombre: 'Brillo', muestra: 'texto', ejemplo: 'Algo nuevo llegó',
    colores: { base: 'text-02', luz: 'text-01' },
    ajustes: [
      { id: 'ancho', nombre: 'Ancho', min: 4, max: 20, paso: 2, valor: 10 },
      { id: 'veces', nombre: 'Duración', min: 1, max: 4, paso: 0.5, valor: 2 }
    ],
    pone: function (el, V) {
      var puede = window.CSS && (CSS.supports('background-clip', 'text') || CSS.supports('-webkit-background-clip', 'text')), anda = null, deja = null, antes = el.getAttribute('style');
      if (!puede || E.quieto() || !el.animate) return { pasa: function () {}, quita: function () {} };
      function pinta() { el.style.backgroundImage = 'linear-gradient(100deg, var(--text-02) ' + (50 - V.ancho) + '%, var(--text-01) 50%, var(--text-02) ' + (50 + V.ancho) + '%)'; }
      pinta(); el.style.backgroundSize = '250% 100%'; el.style.backgroundPosition = '100% 0'; el.style.webkitBackgroundClip = 'text'; el.style.backgroundClip = 'text'; el.style.color = 'transparent';
      function pasa() {
        if (anda || E.quieto()) return;
        anda = el.animate([{ backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0' }], { duration: E.segundos('duration-slow-02', el) * V.veces * 1000, easing: getComputedStyle(el).getPropertyValue('--easing-standard-expressive').trim() || 'ease-in-out' });
        anda.onfinish = anda.oncancel = function () { anda = null; };
      }
      deja = E.alVer(el, pasa); el.addEventListener('pointerenter', pasa); el.addEventListener('focusin', pasa);
      return { pasa: pasa, ajusta: pinta, quita: function () { if (anda) anda.cancel(); deja(); el.removeEventListener('pointerenter', pasa); el.removeEventListener('focusin', pasa); if (antes == null) el.removeAttribute('style'); else el.setAttribute('style', antes); } };
    }
  });
})();
