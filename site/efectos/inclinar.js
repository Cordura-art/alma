// Inclinar: a surface tips toward the pointer as if it were held by its middle, and lies flat again when the
// pointer leaves. A reaction.
// It is put on a wrapper, which stays flat, and tips what the wrapper holds: so the place the pointer is measured
// against does not tip with it. The side the pointer is on goes down, as a card pressed with a finger would.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'inclinar', familia: 'reaccion', nombre: 'Inclinar', muestra: 'envuelta',
    colores: {},
    ajustes: [
      { id: 'grados', nombre: 'Grados', min: 2, max: 20, paso: 1, valor: 8 },
      { id: 'crece', nombre: 'Crece', min: 1, max: 1.1, paso: 0.01, valor: 1.02 }
    ],
    pone: function (el, V) {
      var pieza = el.firstElementChild; if (!pieza) return { quita: function () {} };
      var antes = { transform: pieza.style.transform, transition: pieza.style.transition };
      function mueve(ev) {
        if (ev.pointerType === 'touch' || E.quieto()) return;
        var r = el.getBoundingClientRect(), px = (ev.clientX - r.left) / r.width - 0.5, py = (ev.clientY - r.top) / r.height - 0.5;
        pieza.style.transition = 'transform var(--duration-moderate-01) var(--easing-entrance-productive)';
        pieza.style.transform = 'perspective(800px) rotateX(' + (-py * 2 * V.grados).toFixed(2) + 'deg) rotateY(' + (px * 2 * V.grados).toFixed(2) + 'deg) scale(' + V.crece + ')';
      }
      function sale() { pieza.style.transition = 'transform var(--duration-slow-01) var(--easing-standard-productive)'; pieza.style.transform = antes.transform; }
      el.addEventListener('pointermove', mueve); el.addEventListener('pointerleave', sale);
      return { quita: function () { el.removeEventListener('pointermove', mueve); el.removeEventListener('pointerleave', sale); pieza.style.transform = antes.transform; pieza.style.transition = antes.transition; } };
    }
  });
})();
