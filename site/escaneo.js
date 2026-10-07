// A scanned thing at the middle of a page, drawn in dots (see blender/escaneo.py). Three moments, one after another:
// a dust of dots; the dots come together into the thing, each as large as the thing is light there, in three of the
// entity's colors from top to bottom; and, as the page is scrolled, the thing comes apart into groups of dots, one
// beside each thing the page says. The pointer turns it a little, so that its depth is seen.
// Asked for less motion, it is simply there, whole, and nothing eases: it is where the scroll says.
(function () {
  var D = window.__ESCANEO, escena = document.querySelector('.escaneo'), fija = escena.querySelector('.escaneo__fija'), lienzo = escena.querySelector('canvas');
  var palabra = escena.querySelector('.escaneo__palabra'), entrada = escena.querySelector('.escaneo__entrada'), datos = [].slice.call(escena.querySelectorAll('.escaneo__dato'));
  var ctx = lienzo.getContext('2d'), menos = matchMedia('(prefers-reduced-motion: reduce)'), bytes = atob(D.puntos), N = bytes.length / 4, K = Math.max(1, datos.length);
  // Chance that is always the same: the same thing comes apart the same way every time.
  var s = 2166136261; function azar() { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 1000000) / 1000000; }
  function campana() { return (azar() + azar() + azar() + azar() - 2) / 1.2; }
  var P = [], HONDO = D.columnas * 0.7;
  for (var i = 0; i < N; i++) {
    var col = bytes.charCodeAt(4 * i), fila = bytes.charCodeAt(4 * i + 1), x = col + 0.5 - D.columnas / 2, y = fila + 0.5 - D.filas / 2, alto = fila / D.filas + (azar() - 0.5) * 0.09;
    P.push({ x: x, y: y, z: (bytes.charCodeAt(4 * i + 2) / 255 - 0.5) * HONDO, luz: bytes.charCodeAt(4 * i + 3) / 255, col: col, fila: fila, tinta: alto < 0.21 ? 0 : alto < 0.64 ? 1 : 2,
      // Which group it leaves for: the things the page says share the thing out by quarters, as they lie around it.
      grupo: K === 1 ? 0 : (x < 0 ? 0 : 1) + (K > 2 && y > 0 ? 2 : 0), antes: azar(), despues: azar(), px: (azar() * 2 - 1), py: (azar() * 2 - 1), gx: 0, gy: 0, grano: 0.35 + 1.1 * azar() * azar() });
  }
  // A group is not one round heap: it is a few smaller ones, close together, each point in one of them.
  var nidos = []; for (var g = 0; g < K; g++) { nidos.push([]); for (var q = 0; q < 6; q++) nidos[g].push([campana() * 0.75, campana() * 0.75, 0.22 + 0.3 * azar()]); }
  for (var j = 0; j < P.length; j++) { var pt = P[j]; pt.grupo = Math.min(K - 1, pt.grupo); var nido = nidos[pt.grupo][Math.floor(azar() * 6) % 6]; pt.gx = nido[0] + campana() * nido[2]; pt.gy = nido[1] + campana() * nido[2]; }
  var W = 0, H = 0, salto = 1, claro = false, celda = 1, cx = 0, cy = 0, centros = [], radio = 60, tintas = ['', '', ''], arma = 0, abre = 0, giro = 0, alza = 0, quiereGiro = 0, quiereAlza = 0, pedido = 0, antes = 0, partio = 0;
  function suave(t) { t = t < 0 ? 0 : t > 1 ? 1 : t; return t * t * (3 - 2 * t); }
  function mide() {
    var r = fija.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1); W = r.width; H = r.height; lienzo.width = Math.round(W * dpr); lienzo.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var chica = W < 700; celda = Math.min(H * (chica ? 0.56 : 0.8) / D.filas, W * (chica ? 0.8 : 0.56) / D.columnas); cx = W / 2; cy = H * (chica ? 0.4 : 0.52);
    salto = celda < 3.4 ? 2 : 1;      // where a dot would be smaller than the eye can tell apart, every other one is drawn, twice as large
    radio = Math.min(W, H) * (W < 700 ? 0.13 : 0.1);
    // Each group gathers beside what is said about it: between its words and the middle of the page.
    centros = datos.map(function (el) { var q = el.getBoundingClientRect(), mx = q.left + q.width / 2 - r.left, my = q.top + q.height / 2 - r.top, dx = W / 2 - mx, dy = H / 2 - my, l = Math.hypot(dx, dy) || 1, sale = (Math.abs(dx) > Math.abs(dy) * 1.2 ? q.width / 2 : q.height / 2) + radio * 1.25; return [mx + dx / l * Math.min(sale, l * 0.8), my + dy / l * Math.min(sale, l * 0.8)]; });
    claro = /light/.test(document.documentElement.getAttribute('data-theme') || '');      // on a light page the dots are ink: large where the thing is dark
    var e = getComputedStyle(escena); tintas = [e.getPropertyValue('--escaneo-1').trim(), e.getPropertyValue('--escaneo-2').trim(), e.getPropertyValue('--escaneo-3').trim()];
  }
  function lee() { var r = escena.getBoundingClientRect(), largo = r.height - innerHeight; return largo > 0 ? Math.min(1, Math.max(0, -r.top / largo)) : 0; }
  function cuadro(ahora) {
    pedido = 0; var dt = Math.min(0.05, antes ? (ahora - antes) / 1000 : 0.016); antes = ahora; if (!partio) partio = ahora;
    var quieto = menos.matches, meta = lee(), k = quieto ? 1 : 1 - Math.exp(-dt * 7);
    arma = quieto ? 1 : Math.min(1, (ahora - partio) / 2200); abre += (meta - abre) * k; giro += (quiereGiro - giro) * k; alza += (quiereAlza - alza) * k;
    var a = suave(abre * 1.25), cg = Math.cos(giro), sg = Math.sin(giro), ca = Math.cos(alza), sa = Math.sin(alza), lotes = [[], [], []];
    for (var i = 0; i < N; i++) {
      var p = P[i]; if (salto > 1 && ((p.col & 1) || (p.fila & 1))) continue; var e1 = suave(arma * 1.5 - p.antes * 0.5), e2 = suave(a * 1.6 - p.despues * 0.6);
      var bx = cx + (p.x * cg + p.z * sg) * celda, by = cy + (p.y * ca - p.z * sa * 0.5) * celda, br = celda * salto * 0.5 * (0.1 + 0.9 * Math.pow(claro ? 1 - 0.9 * p.luz : p.luz, 1.15));
      var x = W / 2 + p.px * W * 0.6, y = H / 2 + p.py * H * 0.6, r = 0.7;
      x += (bx - x) * e1; y += (by - y) * e1; r += (br - r) * e1;
      if (e2 > 0) { var c = centros[p.grupo]; x += (c[0] + p.gx * radio - x) * e2; y += (c[1] + p.gy * radio - y) * e2; r += (Math.max(1, celda * salto * 0.5) * p.grano - r) * e2; }
      if (r > 0.25) lotes[e2 > 0.5 ? (p.grupo + 1) % 3 : p.tinta].push(x, y, r);
    }
    ctx.clearRect(0, 0, W, H);
    for (var t = 0; t < 3; t++) { var l = lotes[t]; ctx.fillStyle = tintas[t]; ctx.beginPath(); for (var q = 0; q < l.length; q += 3) { ctx.moveTo(l[q] + l[q + 2], l[q + 1]); ctx.arc(l[q], l[q + 1], l[q + 2], 0, 6.2832); } ctx.fill(); }
    // Around it: the word behind dims as the thing comes together, the way in leaves as it comes apart, and each thing said arrives with its group.
    palabra.style.opacity = (1 - 0.82 * suave(arma * 1.2) - 0.1 * a).toFixed(3); entrada.style.opacity = (1 - suave(abre * 4)).toFixed(3); entrada.style.visibility = abre > 0.3 ? 'hidden' : '';
    datos.forEach(function (el, n) { el.style.opacity = suave((a - 0.5 - n * 0.06) * 3.2).toFixed(3); });
    if (!quieto && (arma < 1 || Math.abs(meta - abre) > 0.0005 || Math.abs(quiereGiro - giro) > 0.0005 || Math.abs(quiereAlza - alza) > 0.0005)) pide();
  }
  function pide() { if (!pedido) pedido = requestAnimationFrame(cuadro); }
  escena.classList.add('escaneo--viva'); mide(); pide();
  addEventListener('scroll', pide, { passive: true }); addEventListener('resize', function () { mide(); pide(); });
  fija.addEventListener('pointermove', function (e) { if (menos.matches) return; var r = fija.getBoundingClientRect(); quiereGiro = ((e.clientX - r.left) / r.width - 0.5) * 0.7; quiereAlza = ((e.clientY - r.top) / r.height - 0.5) * 0.3; pide(); });
  fija.addEventListener('pointerleave', function () { quiereGiro = quiereAlza = 0; pide(); });
  // If the page changes theme, its dots take the colors of the new one.
  if (window.MutationObserver) new MutationObserver(function () { mide(); pide(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { mide(); pide(); });
  window.__escaneo = { get enMovimiento() { return !!pedido; }, puntos: N };
})();
