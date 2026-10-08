// Escalonar: the words of a line come in one after another, each rising a little into its place. A text.
// Each word is its own piece, so each can start a beat after the one before; the spaces between them stay spaces,
// so the line still breaks where it would. It plays the first time it is seen; pasa() plays it again.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'escalonar', familia: 'texto', nombre: 'Escalonar', muestra: 'texto', ejemplo: 'Cada palabra a su tiempo',
    colores: {},
    ajustes: [
      { id: 'pulsos', nombre: 'Pulsos entre palabras', min: 1, max: 8, paso: 1, valor: 3 },
      { id: 'subida', nombre: 'Subida', min: 0, max: 1, paso: 0.1, valor: 0.4 }
    ],
    pone: function (el, V) {
      var C = E.dosCaras(el), piezas = [], andan = [], deja = null;
      C.vista.textContent = '';
      C.texto.split(/(\s+)/).forEach(function (t) {
        if (!t) return; if (/^\s+$/.test(t)) { C.vista.appendChild(document.createTextNode(t)); return; }
        var s = document.createElement('span'); s.style.display = 'inline-block'; s.textContent = t; C.vista.appendChild(s); piezas.push(s);
      });
      function para() { andan.forEach(function (a) { a.cancel(); }); andan = []; }
      function pasa() {
        para(); if (E.quieto() || !piezas.length || !piezas[0].animate) return;
        var cs = getComputedStyle(el), paso = E.segundos('duration-stagger', el) * V.pulsos * 1000, o = { duration: E.segundos('duration-slow-01', el) * 1000, easing: cs.getPropertyValue('--easing-entrance-expressive').trim() || 'ease-out', fill: 'backwards' };
        andan = piezas.map(function (s, i) { return s.animate([{ opacity: 0, transform: 'translateY(' + V.subida + 'em)' }, { opacity: 1, transform: 'translateY(0)' }], Object.assign({ delay: i * paso }, o)); });
      }
      if (!E.quieto()) { piezas.forEach(function (s) { s.style.opacity = '0'; }); deja = E.alVer(el, function () { piezas.forEach(function (s) { s.style.opacity = ''; }); pasa(); }); }
      return { pasa: pasa, quita: function () { para(); if (deja) deja(); C.suelta(); } };
    }
  });
})();
