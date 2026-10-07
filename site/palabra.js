// An entity's word, as a piece of its own: the large word of a cover, set in the variable face (Roboto Flex) and alive
// in its axes. It is written letter by letter, each one arriving light and out of focus and then taking its weight; and
// its weight answers the pointer (or the arrow keys), heavier where it is touched.
// How it is written is the entity's: its numbers are the rhythm of the letters, its `ritmo` the beat, its `direccion`
// where the writing starts (`foco`: from the middle outward; otherwise from the first letter), its `redondez` how soft
// the blur, its `puntas` how heavy and how narrow the touch. Its weight at rest, its width and its grade are the
// entity's type tokens (`font-weight-display`, `font-width`, `font-grade`).
//   var p = AlmaPalabra.monta(elemento, { genes, texto });   p.escribe()  p.texto('Otra')  p.lee()  p.deja()
// On a cover the word is behind other things and its size is the cover's: `oye` is the element whose pointer it listens
// to instead of its own, and `mide: false` leaves its size as the page set it.
(function (raiz) {
  'use strict';
  var LIVIANO = 100, ENTRA = 0.7, PESA = 1.25;      // the lightest the face goes; seconds a letter takes to come into focus, and to take its weight

  function monta(el, op) {
    op = op || {};
    var G = op.genes || {}, menos = matchMedia('(prefers-reduced-motion: reduce)'), linea = document.createElement('span'), letras = [], E = [], oye = op.oye || el, mide = op.mide !== false;
    var reposo = 220, ancho = 100, grado = 0, tope = 800, alcance = 1, borroso = 0, pedido = 0, antes = 0, reloj = 0, puntero = null, tecla = -1, tam = 100;
    linea.className = 'palabra__linea'; el.classList.add('palabra'); if (!el.hasAttribute('tabindex')) el.tabIndex = 0;

    function viste(i) { var e = E[i], s = letras[i].style; s.fontVariationSettings = "'wght' " + e.peso.toFixed(1) + ", 'wdth' " + ancho + ", 'GRAD' " + grado; s.opacity = e.ve.toFixed(3); s.filter = e.ve < 0.999 ? 'blur(' + ((1 - e.ve) * borroso).toFixed(2) + 'px)' : ''; }
    // The entity's own values, as the page has them now.
    function lee() {
      var cs = getComputedStyle(el), n = function (v, d) { var x = parseFloat(cs.getPropertyValue(v)); return isFinite(x) ? x : d; };
      reposo = n('--font-weight-display', 220); ancho = n('--font-width', 100); grado = n('--font-grade', 0);
      // (a touch is felt, not shouted: a step or two of weight above its rest)
      tope = Math.min(1000, reposo + 80 + 12 * (G.puntas || 5)); ajusta(); pide();
    }
    // As large as its place lets it be, measured at rest.
    function ajusta() {
      if (!letras.length) return; var caja = el.parentNode.getBoundingClientRect(); if (mide) el.style.fontSize = '100px';
      for (var i = 0; i < letras.length; i++) letras[i].style.fontVariationSettings = "'wght' " + reposo + ", 'wdth' " + ancho + ", 'GRAD' " + grado;
      var w = linea.getBoundingClientRect().width || 1;
      if (mide) { tam = Math.max(24, Math.min(100 * caja.width * 0.86 / w, caja.height * 0.62 || 1e4)); el.style.fontSize = tam.toFixed(1) + 'px'; } else tam = parseFloat(getComputedStyle(el).fontSize) || 100;
      // (where each letter is, as a part of the line: the page may move the word or make it larger, and they hold)
      var l = linea.getBoundingClientRect(), lw = l.width || 1, lh = l.height || 1; for (i = 0; i < letras.length; i++) { var r = letras[i].getBoundingClientRect(); E[i].cx = (r.left + r.width / 2 - l.left) / lw; E[i].cy = (r.top + r.height / 2 - l.top) / lh; }
      alcance = Math.max(0.18, Math.min(0.34, 0.4 - 0.012 * (G.puntas || 5))); borroso = tam * (0.03 + 0.06 * (G.redondez == null ? 0.5 : G.redondez));
      for (i = 0; i < letras.length; i++) viste(i);
    }
    // When each letter starts: in the entity's order, each one waiting its number of beats after the one before.
    function ordena() {
      var n = letras.length, orden = [], numeros = G.numeros && G.numeros.length ? G.numeros : [3, 4, 5], pulso = 0.046 / (G.ritmo || 1), t = 0, medio = (n - 1) / 2;
      for (var i = 0; i < n; i++) orden.push(i);
      if (G.direccion === 'foco') orden.sort(function (a, b) { return Math.abs(a - medio) - Math.abs(b - medio) || a - b; });
      for (var k = 0; k < n; k++) { t += numeros[k % numeros.length] * pulso; E[orden[k]].parte = t; }
    }
    function arma(t) {
      el.textContent = ''; el.setAttribute('aria-label', t); linea.textContent = ''; letras = []; E = [];
      Array.from(t).forEach(function (c) { var s = document.createElement('span'); s.className = 'palabra__letra'; s.setAttribute('aria-hidden', 'true'); s.textContent = c === ' ' ? ' ' : c; linea.appendChild(s); letras.push(s); E.push({ peso: LIVIANO, ve: 0, parte: 0, cx: 0, cy: 0 }); });
      el.appendChild(linea); ordena(); lee();
    }
    function escribe() { reloj = 0; antes = 0; for (var i = 0; i < E.length; i++) { E[i].ve = 0; E[i].peso = LIVIANO; } pide(); }
    function pide() { if (!pedido) pedido = requestAnimationFrame(cuadro); }

    function cuadro(ahora) {
      pedido = 0; var dt = Math.min(0.05, antes ? (ahora - antes) / 1000 : 0.016), quieto = menos.matches, sigue = false; antes = ahora; reloj += dt;
      var l = linea.getBoundingClientRect(), lw = l.width || 1, k = 1 - Math.exp(-dt * 6);
      for (var i = 0; i < E.length; i++) {
        var e = E[i], p = quieto ? 1 : Math.min(1, Math.max(0, (reloj - e.parte) / ENTRA)), q = quieto ? 1 : Math.min(1, Math.max(0, (reloj - e.parte) / PESA));
        e.ve = 1 - Math.pow(1 - p, 3);      // (it comes into focus quickly, and into its weight more slowly)
        var base = LIVIANO + (reposo - LIVIANO) * (q * q * (3 - 2 * q)), toque = 0;
        if (tecla >= 0 && E[tecla]) toque = Math.max(0, 1 - Math.abs(E[tecla].cx - e.cx) / alcance);
        else if (puntero) toque = Math.max(0, 1 - Math.hypot(puntero.x - l.left - e.cx * lw, (puntero.y - l.top - e.cy * l.height) * 0.5) / (alcance * lw));
        toque = Math.sin(toque * 1.5708); toque *= toque;
        var quiere = base + (tope - base) * toque * e.ve; e.peso = quieto ? quiere : e.peso + (quiere - e.peso) * k;
        if (q < 1 || Math.abs(quiere - e.peso) > 0.4) sigue = true; viste(i);
      }
      if (sigue) pide(); else antes = 0;
    }

    function mueve(ev) { puntero = { x: ev.clientX, y: ev.clientY }; tecla = -1; pide(); }
    function suelta() { puntero = null; pide(); }
    function teclea(ev) {
      var n = E.length, a = tecla < 0 ? Math.round((n - 1) / 2) : tecla, b = ev.key === 'ArrowRight' ? a + (tecla < 0 ? 0 : 1) : ev.key === 'ArrowLeft' ? a - (tecla < 0 ? 0 : 1) : ev.key === 'Home' ? 0 : ev.key === 'End' ? n - 1 : ev.key === 'Escape' ? -1 : null;
      if (b === null) return; ev.preventDefault(); tecla = b < 0 ? -1 : Math.min(n - 1, b); puntero = null; pide();
    }
    function sale() { tecla = -1; pide(); }
    var mira = window.ResizeObserver ? new ResizeObserver(function () { ajusta(); pide(); }) : null; if (mira) mira.observe(el.parentNode);
    oye.addEventListener('pointermove', mueve); oye.addEventListener('pointerdown', mueve); oye.addEventListener('pointerleave', suelta); oye.addEventListener('pointercancel', suelta);
    el.addEventListener('keydown', teclea); el.addEventListener('blur', sale);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ajusta(); pide(); });
    arma(op.texto || el.textContent.trim());
    return {
      escribe: escribe, lee: lee,
      texto: function (t) { arma(t); escribe(); },
      genes: function (g) { G = g || {}; ordena(); lee(); },
      deja: function () { cancelAnimationFrame(pedido); if (mira) mira.disconnect(); oye.removeEventListener('pointermove', mueve); oye.removeEventListener('pointerdown', mueve); oye.removeEventListener('pointerleave', suelta); oye.removeEventListener('pointercancel', suelta); el.removeEventListener('keydown', teclea); el.removeEventListener('blur', sale); },
      get estado() { return { pesos: E.map(function (e) { return Math.round(e.peso); }), ve: E.map(function (e) { return +e.ve.toFixed(2); }), parte: E.map(function (e) { return +e.parte.toFixed(3); }), reposo: reposo, tope: tope, tam: tam, enMovimiento: !!pedido }; }
    };
  }
  raiz.AlmaPalabra = { monta: monta };
})(typeof window !== 'undefined' ? window : this);
