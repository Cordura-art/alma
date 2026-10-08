// Aparecer: a thing comes into being when it is first seen: from clear to solid, from blurred to sharp, rising a
// little. A transition, from nothing to something.
// It is put on the thing itself. It waits out of sight until a tenth of it is in view, and then plays once;
// pasa() plays it again. The thing is there all along for whoever reads the page without seeing it.
(function () {
  var E = window.AlmaEfectos;
  E.pon({
    id: 'aparecer', familia: 'transicion', nombre: 'Aparecer', muestra: 'entrada',
    colores: {},
    ajustes: [
      { id: 'desenfoque', nombre: 'Desenfoque', min: 0, max: 24, paso: 2, valor: 8 },
      { id: 'subida', nombre: 'Subida', min: 0, max: 48, paso: 8, valor: 16 }
    ],
    pone: function (el, V) {
      var antes = { opacity: el.style.opacity, filter: el.style.filter, transform: el.style.transform, transition: el.style.transition }, ojo = null, pedido = 0;
      function suelta() { for (var k in antes) el.style[k] = antes[k]; }
      function esconde() { el.style.transition = 'none'; el.style.opacity = '0'; el.style.filter = 'blur(' + V.desenfoque + 'px)'; el.style.transform = 'translateY(' + V.subida + 'px)'; }
      function muestra() {
        void el.offsetWidth;
        var como = ' var(--duration-slow-02) var(--easing-entrance-expressive)';
        el.style.transition = 'opacity' + como + ', filter' + como + ', transform' + como; el.style.opacity = '1'; el.style.filter = 'blur(0px)'; el.style.transform = 'translateY(0)';
      }
      function termina(ev) { if (ev.target === el && ev.propertyName === 'opacity' && el.style.opacity === '1') suelta(); }
      function pasa() { if (E.quieto()) { suelta(); return; } esconde(); cancelAnimationFrame(pedido); pedido = requestAnimationFrame(muestra); }
      el.addEventListener('transitionend', termina);
      if (!E.quieto()) { esconde(); ojo = new IntersectionObserver(function (v) { if (v[v.length - 1].isIntersecting) { ojo.disconnect(); ojo = null; muestra(); } }, { threshold: 0.1 }); ojo.observe(el); }
      return { pasa: pasa, quita: function () { if (ojo) ojo.disconnect(); cancelAnimationFrame(pedido); el.removeEventListener('transitionend', termina); suelta(); } };
    }
  });
})();
