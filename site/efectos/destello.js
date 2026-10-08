// Destello: a band of light crosses a surface when the pointer, or the focus, comes onto it. A reaction.
// The band is a slanted gradient much larger than the surface, laid over it and kept out of sight to one side;
// coming onto the surface slides it to the other side, and leaving slides it back.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'destello', familia: 'reaccion', nombre: 'Destello', muestra: 'tarjeta',
    colores: { luz: 'interactive-01' },
    ajustes: [
      { id: 'brillo', nombre: 'Brillo', min: 0.05, max: 0.6, paso: 0.05, valor: 0.3 },
      { id: 'angulo', nombre: 'Ángulo', min: -80, max: 80, paso: 5, valor: -45 },
      { id: 'ancho', nombre: 'Ancho', min: 2, max: 24, paso: 1, valor: 10 }
    ],
    pone: function (el, V) {
      var luz = document.createElement('span');
      luz.setAttribute('aria-hidden', 'true');
      luz.style.cssText = 'position:absolute;inset:0;pointer-events:none;border-radius:inherit;background-repeat:no-repeat;background-size:250% 250%;background-position:-100% -100%;transition:background-position var(--duration-slow-02) var(--easing-standard-expressive)';
      function pinta() { luz.style.backgroundImage = 'linear-gradient(' + V.angulo + 'deg, transparent ' + (50 - V.ancho) + '%, color-mix(in srgb, var(--interactive-01) ' + Math.round(V.brillo * 100) + '%, transparent) 50%, transparent ' + (50 + V.ancho) + '%)'; }
      function entra() { if (!E.quieto()) luz.style.backgroundPosition = '100% 100%'; }
      function sale() { luz.style.backgroundPosition = '-100% -100%'; }
      var cs = getComputedStyle(el), antes = { position: el.style.position, overflow: el.style.overflow };
      if (cs.position === 'static') el.style.position = 'relative';
      el.style.overflow = 'hidden'; pinta(); el.appendChild(luz);
      el.addEventListener('pointerenter', entra); el.addEventListener('pointerleave', sale); el.addEventListener('focusin', entra); el.addEventListener('focusout', sale);
      return { ajusta: pinta, quita: function () { el.removeEventListener('pointerenter', entra); el.removeEventListener('pointerleave', sale); el.removeEventListener('focusin', entra); el.removeEventListener('focusout', sale); luz.remove(); el.style.position = antes.position; el.style.overflow = antes.overflow; } };
    }
  });
})();
