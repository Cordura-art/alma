// Rotar: one word of a phrase gives way to others, one at a time, and comes back. A text.
// It is put on an element whose text is the words, separated by a bar: "claro | simple | propio". The first is the
// true one: the one read aloud, and the one left at the end. Each word goes out upward as the next comes in from
// below. It goes through them once the first time it is seen, and stops; pasa() goes through them again.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'rotar', familia: 'texto', nombre: 'Rotar', muestra: 'texto', ejemplo: 'claro | simple | propio | nuestro',
    colores: {},
    ajustes: [
      { id: 'veces', nombre: 'Pausa en cada palabra', min: 1, max: 4, paso: 0.5, valor: 2 },
      { id: 'subida', nombre: 'Subida', min: 0, max: 1, paso: 0.1, valor: 0.4 }
    ],
    pone: function (el, V) {
      var antes = el.innerHTML, palabras = el.textContent.split('|').map(function (t) { return t.trim(); }).filter(Boolean), real = document.createElement('span'), vista = document.createElement('span'), espera = 0, anda = null, deja = null, corre = false;
      real.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap'; real.textContent = palabras[0] || '';
      vista.setAttribute('aria-hidden', 'true'); vista.style.display = 'inline-block'; vista.textContent = palabras[0] || '';
      el.textContent = ''; el.appendChild(real); el.appendChild(vista);
      function para() { clearTimeout(espera); if (anda) anda.cancel(); anda = null; corre = false; }
      function pon(i, sigue) {
        var cs = getComputedStyle(el), d = E.segundos('duration-moderate-02', el) * 1000;
        anda = vista.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-' + V.subida + 'em)' }], { duration: d, easing: cs.getPropertyValue('--easing-exit-productive').trim() || 'ease-in' });
        anda.onfinish = function () {
          vista.textContent = palabras[i];
          anda = vista.animate([{ opacity: 0, transform: 'translateY(' + V.subida + 'em)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: d, easing: cs.getPropertyValue('--easing-entrance-expressive').trim() || 'ease-out' });
          anda.onfinish = function () { anda = null; sigue(); };
        };
      }
      function pasa() {
        if (corre) return; if (E.quieto() || palabras.length < 2 || !vista.animate) { vista.textContent = palabras[0] || ''; return; }
        corre = true; var i = 0;
        (function otra() {
          espera = setTimeout(function () { i = (i + 1) % palabras.length; pon(i, function () { if (i === 0) corre = false; else otra(); }); }, E.segundos('duration-slow-02', el) * V.veces * 1000);
        })();
      }
      if (!E.quieto() && palabras.length > 1) deja = E.alVer(el, pasa);
      return { pasa: pasa, quita: function () { para(); if (deja) deja(); el.innerHTML = antes; } };
    }
  });
})();
