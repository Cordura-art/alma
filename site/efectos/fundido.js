// Fundido: one thing goes out of focus and fades while the other comes into focus in its place. A transition.
// It is put on an element that holds the two things, the one that is there and the one to come (hidden). The two
// are laid one over the other, in the same place, so that for a moment both are seen.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'fundido', familia: 'transicion', nombre: 'Fundido', muestra: 'cambio',
    colores: {},
    ajustes: [
      { id: 'desenfoque', nombre: 'Desenfoque', min: 0, max: 24, paso: 2, valor: 8 }
    ],
    pone: function (el, V) {
      var C = [].slice.call(el.children), cual = 0, andan = null, antes = { display: el.style.display, areas: C.map(function (c) { return c.style.gridArea; }) };
      el.style.display = 'grid'; C.forEach(function (c, i) { c.style.gridArea = '1 / 1'; c.hidden = i !== cual; });
      function pasa() {
        if (andan || C.length < 2) return;
        var va = C[cual], viene = C[cual = (cual + 1) % C.length];
        if (E.quieto() || !va.animate) { va.hidden = true; viene.hidden = false; return; }
        var o = { duration: E.segundos('duration-slow-02', el) * 1000, easing: getComputedStyle(el).getPropertyValue('--easing-standard-expressive').trim() || 'ease-in-out' }, b = 'blur(' + V.desenfoque + 'px)';
        viene.hidden = false;
        andan = [va.animate([{ opacity: 1, filter: 'blur(0px)' }, { opacity: 0, filter: b }], o), viene.animate([{ opacity: 0, filter: b }, { opacity: 1, filter: 'blur(0px)' }], o)];
        andan[1].onfinish = function () { va.hidden = true; andan = null; };
      }
      return { pasa: pasa, quita: function () { if (andan) andan.forEach(function (a) { a.cancel(); }); el.style.display = antes.display; C.forEach(function (c, i) { c.style.gridArea = antes.areas[i]; }); } };
    }
  });
})();
