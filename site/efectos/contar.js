// Contar: a number climbs from zero to its value, quickly at first and slowing as it gets there. A text.
// It is put on an element whose text is the number, as it is written (with what goes before and after it: a sign,
// a unit). It plays the first time it is seen; pasa() plays it again. Its digits keep one width, so it does not shake.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'contar', familia: 'texto', nombre: 'Contar', muestra: 'texto', ejemplo: '12.480',
    colores: {},
    ajustes: [
      { id: 'veces', nombre: 'Duración', min: 1, max: 4, paso: 0.5, valor: 2 }
    ],
    pone: function (el, V) {
      var C = E.dosCaras(el), m = /^([^\d-]*)(-?[\d.,]+)(.*)$/.exec(C.texto.trim()), quita = null, deja = null;
      if (!m) return { quita: C.suelta };
      // (as Spanish writes it: a point every three digits, a comma before the decimals)
      var dec = (m[2].split(',')[1] || '').length, hasta = parseFloat(m[2].replace(/\./g, '').replace(',', '.')), F = new Intl.NumberFormat('es', { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: 'always' });
      C.vista.style.fontVariantNumeric = 'tabular-nums';
      function pasa() {
        if (quita) { quita(); quita = null; }
        if (E.quieto() || !isFinite(hasta)) { C.vista.textContent = C.texto; return; }
        var t = 0, dura = E.segundos('duration-slow-02', el) * V.veces, frena = E.curva('easing-entrance-expressive', el);
        quita = E.cada(function (dt) {
          t += dt; if (t >= dura) { C.vista.textContent = C.texto; quita = null; return false; }
          C.vista.textContent = m[1] + F.format(hasta * frena(t / dura)) + m[3]; return true;
        });
      }
      if (!E.quieto() && isFinite(hasta)) { C.vista.textContent = m[1] + F.format(0) + m[3]; deja = E.alVer(el, pasa); }
      return { pasa: pasa, quita: function () { if (quita) quita(); if (deja) deja(); C.suelta(); } };
    }
  });
})();
