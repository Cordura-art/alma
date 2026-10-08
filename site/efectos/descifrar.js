// Descifrar: a line of text arrives scrambled and settles letter by letter, from its beginning. A text.
// The scrambled letters are the line's own, shuffled, so it keeps its look and nearly its width while it settles.
// It plays the first time it is seen; pasa() plays it again.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'descifrar', familia: 'texto', nombre: 'Descifrar', muestra: 'texto', ejemplo: 'Todo lo que se mueve',
    colores: {},
    ajustes: [
      { id: 'pulsos', nombre: 'Pulsos por letra', min: 1, max: 8, paso: 1, valor: 3 },
      { id: 'cambio', nombre: 'Calma del revuelo', min: 1, max: 8, paso: 1, valor: 3 }
    ],
    pone: function (el, V) {
      var C = E.dosCaras(el), texto = C.texto, letras = texto.replace(/\s/g, '').split(''), revuelto = [], quita = null, deja = null;
      function baraja() { for (var i = 0; i < texto.length; i++) revuelto[i] = letras[Math.floor(Math.random() * letras.length)]; }
      function pinta(k) { var n = Math.floor(k * texto.length), s = ''; for (var i = 0; i < texto.length; i++) s += i < n || /\s/.test(texto[i]) ? texto[i] : revuelto[i]; C.vista.textContent = s; }
      function pasa() {
        if (quita) { quita(); quita = null; }
        if (E.quieto() || !letras.length) { C.vista.textContent = texto; return; }
        // (a letter settles every so many pulses: the pulse is the one a word is written with)
        var t = 0, cuenta = 0, dura = texto.length * E.segundos('duration-stagger', el) * V.pulsos;
        quita = E.cada(function (dt) {
          t += dt; if (cuenta++ % V.cambio === 0) baraja();
          if (t >= dura) { C.vista.textContent = texto; quita = null; return false; }
          pinta(t / dura); return true;
        });
      }
      if (!E.quieto() && letras.length) { baraja(); pinta(0); deja = E.alVer(el, pasa); }
      return { pasa: pasa, quita: function () { if (quita) quita(); if (deja) deja(); C.suelta(); } };
    }
  });
})();
