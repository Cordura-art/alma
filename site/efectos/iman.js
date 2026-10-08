// Imán: a thing leans toward the pointer when it comes near, and goes back when it leaves. A reaction.
// It is put on a wrapper, which stays where it is, and moves what the wrapper holds: so where "near" is does not
// move with the thing. Near is the wrapper's box and a margin round it; the lean is a part of the way to the pointer.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'iman', familia: 'reaccion', nombre: 'Imán', muestra: 'boton',
    colores: {},
    ajustes: [
      { id: 'alcance', nombre: 'Alcance', min: 0, max: 160, paso: 8, valor: 80 },
      { id: 'fuerza', nombre: 'Fuerza', min: 0.1, max: 0.8, paso: 0.05, valor: 0.4 }
    ],
    pone: function (el, V) {
      var pieza = el.firstElementChild, antes = pieza ? { transform: pieza.style.transform, transition: pieza.style.transition } : null, cerca = false;
      function suelta() { if (!cerca) return; cerca = false; pieza.style.transition = 'transform var(--duration-slow-01) var(--easing-standard-productive)'; pieza.style.transform = antes.transform; }
      function mueve(ev) {
        if (!pieza || ev.pointerType === 'touch' || E.quieto()) { suelta(); return; }
        var r = el.getBoundingClientRect(), dx = ev.clientX - (r.left + r.width / 2), dy = ev.clientY - (r.top + r.height / 2);
        if (Math.abs(dx) > r.width / 2 + V.alcance || Math.abs(dy) > r.height / 2 + V.alcance) { suelta(); return; }
        cerca = true; pieza.style.transition = 'transform var(--duration-moderate-02) var(--easing-entrance-productive)';
        pieza.style.transform = 'translate(' + (dx * V.fuerza).toFixed(1) + 'px,' + (dy * V.fuerza).toFixed(1) + 'px)';
      }
      window.addEventListener('pointermove', mueve, { passive: true }); document.addEventListener('pointerleave', suelta);
      return { quita: function () { window.removeEventListener('pointermove', mueve); document.removeEventListener('pointerleave', suelta); if (pieza) { pieza.style.transform = antes.transform; pieza.style.transition = antes.transition; } } };
    }
  });
})();
