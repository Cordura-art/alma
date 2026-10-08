// ALMA's score. The six recipes of brand motion (docs/elements/movimiento/2-coreografia.md) are written here once,
// as what they are: which motion token each time is counted in, and how many of it. A piece asks for its times
// instead of working them out, so what the manual says and what a page does are the same thing; and an entity that
// moves slower, because its tokens say so, is slower in every piece at once.
// A score is also how a sequence is written: this, then that, each with its time and its curve, played on ALMA's
// clock (site/reloj.js). With less motion asked for, a score is simply at its end.
//   AlmaPartitura.tiempos(el) → { escribirse: { enfoca, pesa, pulso }, armarse: { recorrido, objeto, mundo }, … } in seconds
//   AlmaPartitura.curva('easing-entrance-expressive', el) → f(0…1)
//   AlmaPartitura.toca([{ en, dura, curva, paso(k) }, …], { el, alTerminar }) → { deja(), termino }
(function () {
  if (window.AlmaPartitura) return;
  // The recipes. A time is [token, how many of it]; a recipe with no time of its own follows something.
  var RECETAS = {
    escribirse: { tiempos: { enfoca: ['duration-slow-02', 1], pesa: ['duration-slow-02', 1.75], pulso: ['duration-stagger', 2] }, curva: 'easing-entrance-expressive', veces: 1 },
    armarse: { tiempos: { recorrido: ['duration-slow-02', 2], mundo: ['duration-slow-02', 2], objeto: ['duration-slow-02', 2.5] }, curva: 'easing-standard-expressive', veces: 1 },
    deshacerse: { sigue: 'desplazamiento' },
    responder: { sigue: 'puntero' },
    avanzar: { sigue: 'desplazamiento' },
    descansar: { sigue: 'vista' }
  };
  // (what a token is worth when a page has no tokens: ALMA's own values)
  var DE_ALMA = { 'duration-fast-01': 0.07, 'duration-fast-02': 0.11, 'duration-moderate-01': 0.15, 'duration-moderate-02': 0.24, 'duration-slow-01': 0.4, 'duration-slow-02': 0.7, 'duration-stagger': 0.02 };
  function estilo(el) { return getComputedStyle(el || document.documentElement); }
  // A duration token, in seconds, as the element has it.
  function segundos(token, el, cs) { var t = (cs || estilo(el)).getPropertyValue('--' + token).trim(), x = parseFloat(t); return isFinite(x) && x > 0 ? (/ms$/.test(t) ? x / 1000 : x) : DE_ALMA[token] || 0; }
  // A time as a score writes it: seconds, or [token, how many of it].
  function tiempo(v, el, cs) { return typeof v === 'number' ? v : v ? segundos(v[0], el, cs) * (v[1] == null ? 1 : v[1]) : 0; }
  function tiempos(el) {
    var cs = estilo(el), T = {}; for (var r in RECETAS) { T[r] = {}; var de = RECETAS[r].tiempos; for (var k in de) T[r][k] = tiempo(de[k], el, cs); }
    return T;
  }
  // A curve token (a cubic-bezier, as CSS writes it) as the function it is.
  function curva(nombre, el) {
    if (typeof nombre === 'function') return nombre; var t = nombre ? (/^cubic-bezier/.test(nombre) ? nombre : estilo(el).getPropertyValue('--' + nombre).trim()) : '', m = /cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/.exec(t);
    if (!m) return function (k) { return k; };
    var x1 = +m[1], y1 = +m[2], x2 = +m[3], y2 = +m[4], b = function (a, c, s) { var u = 1 - s; return 3 * u * u * s * a + 3 * u * s * s * c + s * s * s; };
    return function (k) { if (k <= 0) return 0; if (k >= 1) return 1; for (var lo = 0, hi = 1, s = k, i = 0; i < 24; i++) { var x = b(x1, x2, s); if (Math.abs(x - k) < 1e-5) break; if (x < k) lo = s; else hi = s; s = (lo + hi) / 2; } return b(y1, y2, s); };
  }
  function quieto() { return window.AlmaReloj ? window.AlmaReloj.quieto : !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); }
  // A score, played once. Each step starts `en` (from the beginning; or 'sigue': when the one before ends), lasts
  // `dura`, and is told how far along it is, from 0 to 1, through its curve. A step is always told 1 at its end.
  function toca(pasos, o) {
    o = o || {}; var cs = estilo(o.el), fin = 0, P = pasos.map(function (p) { var en = p.en === 'sigue' ? fin + tiempo(p.mas, o.el, cs) : tiempo(p.en, o.el, cs), dura = tiempo(p.dura, o.el, cs); fin = en + dura; return { en: en, dura: dura, curva: curva(p.curva, o.el), paso: p.paso, hecho: false }; });
    var largo = P.reduce(function (m, p) { return Math.max(m, p.en + p.dura); }, 0), t = 0, antes = 0, vivo = true, id = 0, T = { termino: false, largo: largo, deja: function () { vivo = false; if (id) (window.AlmaReloj ? window.AlmaReloj.deja(id) : cancelAnimationFrame(id)); } };
    function acaba() { for (var i = 0; i < P.length; i++) if (!P[i].hecho) { P[i].hecho = true; P[i].paso(1); } T.termino = true; vivo = false; if (o.alTerminar) o.alTerminar(); }
    function cuadro(ahora) {
      id = 0; if (!vivo) return; t += Math.min(0.05, antes ? (ahora - antes) / 1000 : 0); antes = ahora; if (quieto()) { acaba(); return; }
      for (var i = 0; i < P.length; i++) { var p = P[i]; if (p.hecho || t < p.en) continue; var k = p.dura > 0 ? (t - p.en) / p.dura : 1; if (k >= 1) { p.hecho = true; p.paso(1); } else p.paso(p.curva(k)); }
      if (t >= largo) acaba(); else pide();
    }
    function pide() { id = window.AlmaReloj ? window.AlmaReloj.pide(cuadro) : requestAnimationFrame(cuadro); }
    if (quieto()) acaba(); else { for (var i = 0; i < P.length; i++) if (P[i].en > 0 || P[i].dura > 0) P[i].paso(0); pide(); }
    return T;
  }
  window.AlmaPartitura = { recetas: RECETAS, tiempos: tiempos, segundos: segundos, curva: curva, toca: toca };
})();
