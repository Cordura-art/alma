// Foco: a soft light under the pointer, inside a surface, that goes where the pointer goes. A reaction.
// The light is a round gradient laid over the surface, centred where the pointer is; it comes up when the pointer
// comes onto the surface and goes down when it leaves. With the keyboard, it comes up in the middle.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'foco', familia: 'reaccion', nombre: 'Foco', muestra: 'tarjeta',
    colores: { luz: 'interactive-01' },
    ajustes: [
      { id: 'brillo', nombre: 'Brillo', min: 0.05, max: 0.6, paso: 0.05, valor: 0.25 },
      { id: 'radio', nombre: 'Radio', min: 80, max: 400, paso: 40, valor: 200 }
    ],
    pone: function (el, V) {
      var luz = document.createElement('span'), x = 50, y = 50, enPx = false;
      luz.setAttribute('aria-hidden', 'true');
      luz.style.cssText = 'position:absolute;inset:0;pointer-events:none;border-radius:inherit;opacity:0;transition:opacity var(--duration-moderate-02) var(--easing-standard-productive)';
      function pinta() { luz.style.backgroundImage = 'radial-gradient(circle ' + V.radio + 'px at ' + x + (enPx ? 'px ' : '% ') + y + (enPx ? 'px' : '%') + ', color-mix(in srgb, var(--interactive-01) ' + Math.round(V.brillo * 100) + '%, transparent), transparent)'; }
      function mueve(ev) { var r = el.getBoundingClientRect(); x = Math.round(ev.clientX - r.left); y = Math.round(ev.clientY - r.top); enPx = true; pinta(); luz.style.opacity = '1'; }
      function centro() { x = y = 50; enPx = false; pinta(); luz.style.opacity = '1'; }
      function sale() { luz.style.opacity = '0'; }
      var antes = { position: el.style.position, overflow: el.style.overflow };
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.style.overflow = 'hidden'; pinta(); el.appendChild(luz);
      el.addEventListener('pointermove', mueve); el.addEventListener('pointerleave', sale); el.addEventListener('focusin', centro); el.addEventListener('focusout', sale);
      return { ajusta: pinta, quita: function () { el.removeEventListener('pointermove', mueve); el.removeEventListener('pointerleave', sale); el.removeEventListener('focusin', centro); el.removeEventListener('focusout', sale); luz.remove(); el.style.position = antes.position; el.style.overflow = antes.overflow; } };
    }
  });
})();
