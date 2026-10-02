// The generative pieces that move, as React components: the field, the mycelium and the carousel of an entity.
// window.__GENERADOR_VISTAS(G) gives them for one entity's genes; the drawing itself is the generator's
// (window.__GENERADOR, entidades/*.mjs). Each one moves only while `anda` is true, it is on screen and the page is
// visible, and reads complete when it is still: a page starts them paused under reduced motion and always offers a
// control to pause. Layout classes (gen-campo, gen-micelio, gen-ring) are the page's.
window.__GENERADOR_VISTAS = function (G) {
  'use strict';
  var h = React.createElement, useEffect = React.useEffect, useRef = React.useRef, GEN = window.__GENERADOR;

  // The emblems of the entity's first twelve gates, as pictures without their ground, for the field's particles.
  // They load a moment after the page; `listos()` gives them once all are drawn, and `avisar(fn)` calls back then.
  var SELLOS = (function () {
    var P = (G.puertas || []).slice(0, 12), hechos = 0, espera = [], lista = P.map(function (p) {
      var cv = document.createElement('canvas'), img = new Image(); cv.width = cv.height = 192;
      img.onload = function () { cv.getContext('2d').drawImage(img, 0, 0, 192, 192); if (++hechos === P.length) espera.splice(0).forEach(function (fn) { fn(); }); };
      img.src = 'data:image/svg+xml,' + encodeURIComponent(GEN.emblemaPuerta(G, p.n, p.l).replace(/<rect width="96" height="96" fill="[^"]*"\/>/, ''));
      return cv;
    });
    return { cuantos: P.length, listos: function () { return P.length && hechos === P.length ? lista : null; }, avisar: function (fn) { if (P.length && hechos < P.length) espera.push(fn); } };
  })();

  // The field, on a canvas. It always starts from a settled frame, so it reads complete when it is still. Its
  // particles are the entity's emblems; until they load (and for genes without gates) they are dots.
  function Campo(p) {
    var ref = useRef(null), S = useRef({ anda: p.anda, seguir: function () {} });
    useEffect(function () {
      var cv = ref.current, ctx = cv.getContext('2d'), raf = 0, visto = true, ultimo = 0, resto = 0, ancho = 0, F = null, PASO = 1000 / 60;
      function armar() {
        var box = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
        if (!box.width || !box.height) return;
        ancho = box.width; cv.width = Math.round(box.width * dpr); cv.height = Math.round(box.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        F = GEN.campo(G, p.clave, box.width, box.height, { max: box.width < 640 ? 3000 : 9000, emblemas: SELLOS.cuantos });
        ctx.fillStyle = F.base; ctx.fillRect(0, 0, F.ancho, F.alto);
        for (var i = 0; i < 160; i++) { F.avanzar(); if (i > 90) GEN.pintarCampo(ctx, F, SELLOS.listos()); }
      }
      function cuadro(ahora) {
        raf = 0;
        if (!F || !S.current.anda || !visto || document.hidden) return;
        resto += Math.min(50, ahora - (ultimo || ahora)); ultimo = ahora;
        var pasos = 0;
        while (resto >= PASO && pasos < 3) { F.avanzar(); resto -= PASO; pasos++; }
        if (pasos === 3) resto = 0;
        if (pasos) GEN.pintarCampo(ctx, F, SELLOS.listos());
        raf = requestAnimationFrame(cuadro);
      }
      function seguir() { ultimo = 0; if (!raf && S.current.anda) raf = requestAnimationFrame(cuadro); }
      S.current.seguir = seguir;
      armar(); seguir();
      // Drawn again, settled, once the emblems are ready (a still field would otherwise keep its dots).
      SELLOS.avisar(function () { if (cv.isConnected) armar(); });
      var io = window.IntersectionObserver ? new IntersectionObserver(function (es) { visto = es[0].isIntersecting; if (visto) seguir(); }) : null;
      if (io) io.observe(cv);
      var ro = window.ResizeObserver ? new ResizeObserver(function () { var w = cv.getBoundingClientRect().width; if (Math.abs(w - ancho) > 1) armar(); }) : null;
      if (ro) ro.observe(cv);
      document.addEventListener('visibilitychange', seguir);
      return function () { cancelAnimationFrame(raf); if (io) io.disconnect(); if (ro) ro.disconnect(); document.removeEventListener('visibilitychange', seguir); S.current.seguir = function () {}; };
    }, [p.clave]);
    useEffect(function () { S.current.anda = p.anda; S.current.seguir(); }, [p.anda]);
    return h('canvas', { ref: ref, className: 'gen-campo', role: 'img', 'aria-label': p.label });
  }

  // The mycelium, on a canvas drawn in the stage's own units (430 × 932). While `anda` is true and it is on screen it
  // grows once and then keeps swaying, which slides the hologram. Still (paused, or with reduced motion) it shows the
  // grown, mature network, upright. A new key builds another network and grows it again.
  function Micelio(p) {
    var ref = useRef(null), S = useRef({ anda: p.anda, seguir: function () {} });
    useEffect(function () {
      var cv = ref.current, ctx = cv.getContext('2d'), M = GEN.micelio(G, p.clave), raf = 0, visto = true, ultimo = 0, ancho = 0;
      var t = S.current.anda ? 0 : M.crece + M.sostiene, reloj = 0, tx = 0, ty = 0;
      function medir() {
        var box = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
        if (!box.width) return false;
        ancho = box.width; cv.width = Math.round(box.width * dpr); cv.height = Math.round(box.width * M.alto / M.ancho * dpr);
        ctx.setTransform(cv.width / M.ancho, 0, 0, cv.height / M.alto, 0, 0);
        return true;
      }
      function pintar() { GEN.pintarMicelio(ctx, M, t, tx, ty); }
      function cuadro(ahora) {
        raf = 0;
        if (!S.current.anda || !visto || document.hidden) return;
        var dt = Math.min(50, ahora - (ultimo || ahora)) / 1000; ultimo = ahora;
        t = Math.min(t + dt, M.crece + M.sostiene); reloj += dt;
        // The tilt has weight: it follows the sway with a little lag, as in the original.
        var v = GEN.vaivenMicelio(reloj), k = 1 - Math.exp(-dt * 9); tx += (v[0] - tx) * k; ty += (v[1] - ty) * k;
        pintar(); raf = requestAnimationFrame(cuadro);
      }
      function seguir() { ultimo = 0; if (!raf && S.current.anda) raf = requestAnimationFrame(cuadro); }
      S.current.seguir = seguir;
      if (medir()) pintar();
      seguir();
      var io = window.IntersectionObserver ? new IntersectionObserver(function (es) { visto = es[0].isIntersecting; if (visto) seguir(); }) : null;
      if (io) io.observe(cv);
      var ro = window.ResizeObserver ? new ResizeObserver(function () { if (Math.abs(cv.getBoundingClientRect().width - ancho) > 1 && medir()) pintar(); }) : null;
      if (ro) ro.observe(cv);
      document.addEventListener('visibilitychange', seguir);
      return function () { cancelAnimationFrame(raf); if (io) io.disconnect(); if (ro) ro.disconnect(); document.removeEventListener('visibilitychange', seguir); S.current.seguir = function () {}; };
    }, [p.clave]);
    useEffect(function () { S.current.anda = p.anda; S.current.seguir(); }, [p.anda]);
    return h('canvas', { ref: ref, className: 'gen-micelio', role: 'img', 'aria-label': p.label });
  }

  // The carousel: one element per card, moved by the ring's numbers. The faces are card faces of the generator (Placa),
  // a different pattern on every card: the order below mixes the three groups of patterns, and a deck takes the next
  // ones.
  var RING = GEN.carrusel(G);
  var ORDEN = ['planks', 'vortex', 'petal', 'mesh', 'hole', 'card', 'bricks', 'curves', 'ring', 'web', 'circle', 'checker', 'arc', 'mixed', 'line'];
  function caras(mazo) {
    return Array.from({ length: RING.cantidad }, function (_, i) {
      var patron = ORDEN[(mazo * RING.cantidad + i) % ORDEN.length];
      return { patron: patron, nombre: GEN.NOMBRE_PATRON[patron], estilo: { backgroundImage: GEN.comoFondo(GEN.placa(G, 'cara-' + mazo + '-' + i, { patron: patron })) } };
    });
  }
  function Carrusel(p) {
    var ref = useRef(null), S = useRef({ anda: p.anda, seguir: function () {} });
    useEffect(function () {
      var st = ref.current, cards = st.children, raf = 0, visto = true, ultimo = 0, t = 0;
      function poner() {
        var k = st.getBoundingClientRect().width / 800, A = GEN.anillo(RING, t);
        for (var j = 0; j < A.length; j++) {
          var c = A[j], el = cards[c.i];
          el.style.transform = 'translate(-50%, -50%) translate(' + (c.x * k).toFixed(2) + 'px, ' + (c.y * k).toFixed(2) + 'px) rotate(' + c.giro.toFixed(4) + 'rad) scale(' + c.s.toFixed(4) + ')';
          el.style.zIndex = j + 1; el.style.opacity = c.opacidad.toFixed(3);
        }
      }
      function cuadro(ahora) {
        raf = 0;
        if (!S.current.anda || !visto || document.hidden) return;
        t += Math.min(50, ahora - (ultimo || ahora)) / 1000; ultimo = ahora;
        poner(); raf = requestAnimationFrame(cuadro);
      }
      function seguir() { ultimo = 0; if (!raf && S.current.anda) raf = requestAnimationFrame(cuadro); }
      S.current.seguir = seguir;
      poner(); seguir();
      var io = window.IntersectionObserver ? new IntersectionObserver(function (es) { visto = es[0].isIntersecting; if (visto) seguir(); }) : null;
      if (io) io.observe(st);
      var ro = window.ResizeObserver ? new ResizeObserver(poner) : null;
      if (ro) ro.observe(st);
      document.addEventListener('visibilitychange', seguir);
      return function () { cancelAnimationFrame(raf); if (io) io.disconnect(); if (ro) ro.disconnect(); document.removeEventListener('visibilitychange', seguir); S.current.seguir = function () {}; };
    }, []);
    useEffect(function () { S.current.anda = p.anda; S.current.seguir(); }, [p.anda]);
    return h('div', { ref: ref, className: 'gen-ring', role: 'img', 'aria-label': p.label }, p.caras.map(function (cara, i) { return h('span', { key: i, className: 'gen-ring__card', style: cara.estilo }); }));
  }

  return { Campo: Campo, Micelio: Micelio, Carrusel: Carrusel, caras: caras, RING: RING, ORDEN: ORDEN };
};
