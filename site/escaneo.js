// A scanned thing at the middle of a page, drawn in dots (see blender/escaneo.py). Three moments, one after another:
// a dust of dots; the dots come together into the thing, each as large as the thing is light there, in three of the
// entity's colors from top to bottom; and, as the page is scrolled, the thing comes apart into clusters of dots, one
// beside each thing the page says. The pointer turns it, a good way to either side: it was scanned all around, so
// what comes into view is really there, the light stays where it was and falls on its new side, and what turns away
// is not drawn. It is a body: it hides the word that stands behind it.
// The thing is not sealed: toward its foot it crumbles into loose dots, a few streams of dots leave it, and there is
// always some dust behind. Once it is apart, pointing at a thing the page says (or coming to it with the keyboard)
// gathers its cluster and lets the others drift off.
// Its dots are not slid from place to place: each has a weight and a speed of its own. A spring draws it to where it
// belongs; the pointer, passing, drags the dots near it along and stirs them, as a hand through smoke; a stirred dot
// is carried a while by slow currents, drawn out into a thread as it goes, and then comes home.
// Nothing moves on its own: it moves while the page is scrolled or pointed at, and until what was stirred has come to
// rest. Asked for less motion, it is simply there, whole: no weight, no stirring; it is where the scroll says.
(function () {
  var D = window.__ESCANEO, escena = document.querySelector('.escaneo'), fija = escena.querySelector('.escaneo__fija'), lienzo = escena.querySelector('canvas');
  var palabra = escena.querySelector('.escaneo__palabra'), entrada = escena.querySelector('.escaneo__entrada'), datos = [].slice.call(escena.querySelectorAll('.escaneo__dato'));
  if (palabra && window.AlmaPalabra) window.AlmaPalabra.monta(palabra, { genes: window.__PALABRA, oye: escena, mide: false });      // (the word is a piece of its own, site/palabra.js; its size here is the cover's)
  // A contained entity: the pointer stirs nothing and the thing turns less. How long it takes to come together is two and
  // a half of ALMA's slowest steps, as the entity has them.
  // (a contained page may still ask that the pointer stir the thing, as it stirs the ground of its planet)
  var CONT = !!D.contenida, AGITA = !CONT || !!D.agita, lento = getComputedStyle(escena).getPropertyValue('--duration-slow-02').trim(), ARMA = window.AlmaPartitura ? window.AlmaPartitura.tiempos(escena).armarse.objeto * 1000 : 2.5 * (/ms$/.test(lento) ? parseFloat(lento) : parseFloat(lento) * 1000) || 2200;
  // Its grounds, if what the page says asks for them (site/efectos.js): those behind the thing while it is whole, and
  // those that take its place once it has come apart. Each is a layer under the word, one over another in the order
  // they are named, and only those that are seen work.
  var capas = ['entrada', 'despues'].map(function (cual) {
    return [].concat(D.efectos && window.AlmaEfectos && D.efectos[cual] || []).map(function (d) {
      var capa = document.createElement('div'); capa.className = 'escaneo__efecto'; fija.insertBefore(capa, palabra);
      if (!window.AlmaEfectos.monta(d.id, capa, d.valores)) { capa.remove(); return null; }
      return capa;
    }).filter(Boolean);
  });
  if (capas[0].length || capas[1].length) escena.classList.add('escaneo--con-efectos');
  function asoma(suyas, v) { suyas.forEach(function (capa) { capa.hidden = v < 0.01; capa.style.opacity = v.toFixed(3); }); }
  var ctx = lienzo.getContext('2d'), menos = matchMedia('(prefers-reduced-motion: reduce)'), bytes = atob(D.puntos), ANCHO = D.alma === 3 ? 10 : 7, N = bytes.length / ANCHO, K = Math.max(1, datos.length);
  // Chance that is always the same: the same thing comes apart the same way every time.
  var s = 2166136261; function azar() { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 1000000) / 1000000; }
  function campana() { return (azar() + azar() + azar() + azar() - 2) / 1.2; }
  // A cluster is not one round heap: it is a few splashes, each long one way and thin the other.
  var nidos = []; for (var g = 0; g < K; g++) { nidos.push([]); for (var q = 0; q < 6; q++) nidos[g].push([campana() * 0.6, campana() * 0.6, azar() * 3.1416, 0.3 + 0.35 * azar(), 0.07 + 0.1 * azar()]); }
  // The ways its streams leave it: up and aside, to one side, to the other.
  var CHORROS = [[0.55, -0.95, 0.05], [-1, -0.3, 0.4], [1, 0.05, 0.3]];
  var P = [], cara = function (v) { return (v - 128) / 127; };
  for (var i = 0; i < N; i++) {
    var o = ANCHO * i, c = ANCHO - 4, lugar = function (k) { return c === 6 ? bytes.charCodeAt(o + 2 * k) | bytes.charCodeAt(o + 2 * k + 1) << 8 : bytes.charCodeAt(o + k); }, col = lugar(0), fila = lugar(1), x = col + 0.5 - D.columnas / 2, y = fila + 0.5 - D.filas / 2, alto = fila / D.filas, borde = alto + (azar() - 0.5) * 0.09;
    var grupo = Math.min(K - 1, K === 1 ? 0 : (x < 0 ? 0 : 1) + (K > 2 && y > 0 ? 2 : 0)), nido = nidos[grupo][Math.floor(azar() * 6) % 6], a = campana() * nido[3], b = campana() * nido[4];
    P.push({ col: col, fila: fila, x: x, y: y, z: D.hondos / 2 - lugar(2) - 0.5, tono: bytes.charCodeAt(o + c) / 255, nx: cara(bytes.charCodeAt(o + c + 1)), nu: cara(bytes.charCodeAt(o + c + 2)), nf: cara(bytes.charCodeAt(o + c + 3)), tinta: borde < 0.21 ? 0 : borde < 0.64 ? 1 : 2, grupo: grupo,
      antes: azar(), despues: azar(), px: azar() * 2 - 1, py: azar() * 2 - 1,
      gx: nido[0] + a * Math.cos(nido[2]) - b * Math.sin(nido[2]), gy: nido[1] + a * Math.sin(nido[2]) + b * Math.cos(nido[2]),
      // In its cluster: mostly that cluster's color, some of the others; a few large, most small. Only some stay in it: the rest go back to dust.
      tintaG: azar() < 0.62 ? grupo % 3 : Math.floor(azar() * 3) % 3, grano: 0.32 + 1.9 * Math.pow(azar(), 3), queda: azar() < 0.22,
      // Toward its foot it crumbles; and a few of its points, from its upper half, leave it in a stream.
      cae: Math.max(0, (alto - 0.72) / 0.28), cx: campana(), cy: Math.abs(campana()), chorro: alto < 0.5 && azar() < 0.045 ? Math.floor(azar() * 3) % 3 : -1, lejos: Math.pow(azar(), 1.5), onda: azar() * 6.28 });
  }
  // The dust that is always there, behind everything.
  var polvo = []; for (var d = 0; d < 460; d++) polvo.push({ x: azar() * 2 - 1, y: azar() * 2 - 1, r: 0.5 + 0.9 * azar() * azar(), tinta: Math.floor(azar() * 3) % 3, hondo: azar() });
  var W = 0, H = 0, salto = 1, claro = false, celda = 1, cx = 0, cy = 0, centros = [], radio = 60, tintas = ['', '', ''], fondo = '', arma = 0, abre = 0, giro = 0, alza = 0, quiereGiro = 0, quiereAlza = 0, pedido = 0, antes = 0, partio = 0;
  // Where each dot is, how fast it goes, how stirred it is (0 at rest, 1 carried by the currents) and how large it is drawn.
  var X = new Float32Array(N), Y = new Float32Array(N), VX = new Float32Array(N), VY = new Float32Array(N), AG = new Float32Array(N), RA = new Float32Array(N), puesto = false, reloj = 0, abreAntes = 0;
  var mano = { x: 0, y: 0, ax: 0, ay: 0, vx: 0, vy: 0, cuando: 0, dentro: false };      // the pointer: where it is, where it was, how fast it goes
  var elige = datos.map(function () { return 0; }), deTexto = -1, dePuntero = -1;      // for each cluster: 1 gathered, -1 let go, 0 as it is
  function suave(t) { t = t < 0 ? 0 : t > 1 ? 1 : t; return t * t * (3 - 2 * t); }
  function mide() {
    var r = fija.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1); W = r.width; H = r.height; lienzo.width = Math.round(W * dpr); lienzo.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var chica = W < 700; celda = Math.min(H * (chica ? 0.56 : 0.8) / D.filas, W * (chica ? 0.8 : 0.56) / D.columnas); cx = W / 2; cy = H * (chica ? 0.4 : 0.52);
    salto = celda < 3.4 ? 2 : 1;      // where a dot would be smaller than the eye can tell apart, every other one is drawn, twice as large
    radio = Math.min(W, H) * (chica ? 0.16 : 0.15);
    // Each cluster gathers beside what is said about it: between its words and the middle of the page.
    centros = datos.map(function (el) { var q = el.getBoundingClientRect(), mx = q.left + q.width / 2 - r.left, my = q.top + q.height / 2 - r.top, dx = W / 2 - mx, dy = H / 2 - my, l = Math.hypot(dx, dy) || 1, sale = (Math.abs(dx) > Math.abs(dy) * 1.2 ? q.width / 2 : q.height / 2) + radio * 0.95; return [mx + dx / l * Math.min(sale, l * 0.8), my + dy / l * Math.min(sale, l * 0.8)]; });
    claro = /light/.test(document.documentElement.getAttribute('data-theme') || '');      // on a light page the dots are ink: large where the thing is dark
    fondo = getComputedStyle(document.body).backgroundColor;
    var e = getComputedStyle(escena); tintas = [e.getPropertyValue('--escaneo-1').trim(), e.getPropertyValue('--escaneo-2').trim(), e.getPropertyValue('--escaneo-3').trim()];
  }
  function lee() { if (window.AlmaReloj) return window.AlmaReloj.avance(escena).v; var r = escena.getBoundingClientRect(), largo = r.height - innerHeight; return largo > 0 ? Math.min(1, Math.max(0, -r.top / largo)) : 0; }
  function cuadro(ahora) {
    pedido = 0; var dt = Math.min(0.05, antes ? (ahora - antes) / 1000 : 0.016); antes = ahora; if (!partio) partio = ahora;
    var quieto = menos.matches, meta = lee(), k = quieto ? 1 : 1 - Math.exp(-dt * 7), sigue = false;
    arma = quieto ? 1 : Math.min(1, (ahora - partio) / ARMA); abre += (meta - abre) * k; giro += (quiereGiro - giro) * k; alza += (quiereAlza - alza) * k;
    reloj += dt;
    // The pointer as it passed since the last moment: a stroke from where it was to where it is, and how fast.
    var ahoraMs = performance.now(), pasa = AGITA && mano.dentro && ahoraMs - mano.cuando < 90, mx = mano.x - mano.ax, my = mano.y - mano.ay, ml = mx * mx + my * my || 1, rapidez = Math.min(1600, Math.hypot(mano.vx, mano.vy)), fuerza = Math.min(1, rapidez / 420);
    var alcance = Math.min(W, H) * 0.17 * (0.7 + 0.5 * fuerza), R2 = alcance * alcance, freno = Math.exp(-dt * 5.2), calma = Math.exp(-dt / 1.15), k2 = 1 - Math.exp(-dt * 9);
    // As the page is scrolled from one moment to the next, everything is stirred a little: it flows there, it is not slid.
    var revuelo = Math.min(0.22, Math.abs(abre - abreAntes) * 9); abreAntes = abre;
    var a = suave((capas[1].length ? abre / 0.7 : abre) * 1.25), foco = a > 0.6 ? (deTexto >= 0 ? deTexto : dePuntero) : -1;
    for (var g = 0; g < K; g++) { var quiere = foco < 0 ? 0 : g === foco ? 1 : -1; elige[g] += (quiere - elige[g]) * k; if (Math.abs(quiere - elige[g]) > 0.002) sigue = true; }
    var cg = Math.cos(giro), sg = Math.sin(giro), ca = Math.cos(alza), sa = Math.sin(alza), lotes = [[], [], []], hilos = [[], [], []], motas = [[], [], []], tapa = [], largo = celda * D.columnas, grande = Math.max(1.15, celda * salto * 0.62);
    // Its dust, which shifts a little as the page is scrolled and pointed at: the far grains less than the near.
    for (var d = 0; d < polvo.length; d++) { var o = polvo[d]; motas[o.tinta].push(W / 2 + o.x * W * 0.56 - giro * (8 + 26 * o.hondo), H / 2 + o.y * H * 0.56 - abre * (30 + 110 * o.hondo) - alza * 40 * o.hondo, o.r); }
    for (var i = 0; i < N; i++) {
      var p = P[i]; if (salto > 1 && ((p.col & 1) || (p.fila & 1))) continue;
      var e1 = suave(arma * 1.5 - p.antes * 0.5), e2 = suave(a * 1.6 - p.despues * 0.6);
      var bx = cx + (p.x * cg + p.z * sg) * celda, by = cy + (p.y * ca - p.z * sa * 0.5) * celda, nfr = p.nf * cg - p.nx * sg, luz = p.tono * (0.18 + 0.82 * Math.max(0, (p.nx * cg + p.nf * sg) * -0.22 + p.nu * 0.46 + nfr * 0.86)), seVe = nfr > -0.12;
      // The light does not turn with it; and what has turned away from us is not drawn: at its edge, it thins out.
      var br = !seVe ? 0 : celda * salto * 0.5 * (0.1 + 0.9 * Math.pow(claro ? 1 - 0.9 * luz : luz, 1.15)) * (nfr < 0.1 ? (nfr + 0.12) / 0.22 : 1);
      if (p.cae > 0) { var c2 = p.cae * p.cae; bx += p.cx * c2 * celda * 17; by += p.cy * c2 * celda * 8; br *= p.antes < p.cae * 0.75 ? 0.25 : 1 - 0.5 * p.cae; }
      if (p.chorro >= 0) { var ch = CHORROS[p.chorro], t = p.lejos; bx += (ch[0] * t + Math.sin(t * 7 + p.onda) * 0.035) * largo * 0.9; by += (ch[1] * t + ch[2] * t * t + Math.cos(t * 6 + p.onda) * 0.03) * largo * 0.9; br = Math.max(0.9, celda * salto * 0.5 * (1.15 - 0.75 * t)); }
      var dx = W / 2 + p.px * W * 0.6, dy = H / 2 + p.py * H * 0.6, x = dx + (bx - dx) * e1, y = dy + (by - dy) * e1, r = 0.7 + (br - 0.7) * e1;
      if (e2 > 0) {
        var tx = dx, ty = dy, tr = p.despues < 0.18 ? 0.55 : 0;      // those that do not stay in a cluster go back to dust, and most of them go out
        if (p.queda) {
          var c = centros[p.grupo], v = elige[p.grupo], junta = v > 0 ? v : 0, suelta = v < 0 ? -v : 0, R = radio * (1 - 0.3 * junta);
          tx = c[0] + p.gx * R; ty = c[1] + p.gy * R; tr = grande * p.grano * (1 + 0.3 * junta) * (1 - 0.6 * suelta);
          if (suelta) { tx += (dx - tx) * 0.78 * suelta; ty += (dy - ty) * 0.78 * suelta; }
        }
        x += (tx - x) * e2; y += (ty - y) * e2; r += (tr - r) * e2;
      }
      // That is where it belongs. Where it is: drawn there by a spring, slack while it is stirred; carried by the currents
      // as much as it is stirred; and dragged and turned by the pointer as it passes near.
      // (what is turned away and at rest has no need of weight: it is simply where it belongs, unseen)
      if (quieto || !puesto || (!seVe && e2 <= 0 && arma >= 1 && AG[i] < 0.02 && revuelo < 0.01)) { X[i] = puesto ? x : dx; Y[i] = puesto ? y : dy; VX[i] = VY[i] = 0; AG[i] = puesto ? 0 : 0.55; RA[i] = r; }
      else {
        var ag = Math.min(1, AG[i] + revuelo), qx = X[i], qy = Y[i], vx = VX[i], vy = VY[i];
        if (pasa) {
          var ux = qx - mano.ax, uy = qy - mano.ay, tt = (ux * mx + uy * my) / ml; tt = tt < 0 ? 0 : tt > 1 ? 1 : tt; var ex = ux - tt * mx, ey = uy - tt * my, d2 = ex * ex + ey * ey;
          if (d2 < R2) { var cae2 = 1 - Math.sqrt(d2) / alcance; cae2 *= cae2; vx += (mano.vx * 0.55 - ey * rapidez * 0.012) * cae2 * dt * 9; vy += (mano.vy * 0.55 + ex * rapidez * 0.012) * cae2 * dt * 9; ag = Math.min(1, ag + cae2 * fuerza * dt * 9); }
        }
        var th = 3.1 * Math.sin(qx * 0.0058 + reloj * 0.55 + Math.sin(qy * 0.0041 + p.onda)) + 2.7 * Math.cos(qy * 0.0066 - reloj * 0.43 + p.onda * 0.3), K2 = 46 * (1 - 0.93 * ag) + 1.5;
        vx += ((x - qx) * K2 + Math.cos(th) * 330 * ag) * dt; vy += ((y - qy) * K2 + Math.sin(th) * 330 * ag) * dt; vx *= freno; vy *= freno;
        qx += vx * dt; qy += vy * dt; ag *= calma; X[i] = qx; Y[i] = qy; VX[i] = vx; VY[i] = vy; AG[i] = ag; RA[i] += (r - RA[i]) * k2;
        if (ag > 0.012 || vx * vx + vy * vy > 9) sigue = true;
        // Going fast, it is drawn out behind itself: a thread.
        // (only what the pointer stirred: a dot on its way to its place is a dot. And a thread is never long.)
        var paso2 = vx * vx + vy * vy; if (paso2 > 2500 && ag > 0.3 && arma >= 1 && RA[i] > 0.8) { var lh = Math.min(1, 22 / (Math.sqrt(paso2) * 0.045)); hilos[e2 > 0.5 ? p.tintaG : p.tinta].push(qx, qy, qx - vx * 0.045 * lh, qy - vy * 0.045 * lh); }
      }
      if (seVe && e1 > 0.7 && e2 < 0.45 && p.chorro < 0 && p.cae < 0.25) tapa.push(X[i], Y[i]);      // where it is a body, it hides what stands behind it
      if (RA[i] > 0.25) lotes[e2 > 0.5 ? p.tintaG : p.tinta].push(X[i], Y[i], RA[i]);
    }
    puesto = true;
    ctx.clearRect(0, 0, W, H);
    // Far to near: its dust, the body it is (which hides the word behind it), its threads and its dots.
    for (var m0 = 0; m0 < 3; m0++) { var mo = motas[m0]; ctx.fillStyle = tintas[m0]; ctx.beginPath(); for (var w0 = 0; w0 < mo.length; w0 += 3) { ctx.moveTo(mo[w0] + mo[w0 + 2], mo[w0 + 1]); ctx.arc(mo[w0], mo[w0 + 1], mo[w0 + 2], 0, 6.2832); } ctx.fill(); }
    var lado = celda * salto * 1.3; ctx.fillStyle = fondo; for (var t0 = 0; t0 < tapa.length; t0 += 2) ctx.fillRect(tapa[t0] - lado / 2, tapa[t0 + 1] - lado / 2, lado, lado);
    ctx.lineCap = 'round'; ctx.lineWidth = Math.max(1, celda * salto * 0.55);
    for (var n = 0; n < 3; n++) {
      var l = lotes[n], hh = hilos[n]; ctx.fillStyle = ctx.strokeStyle = tintas[n];
      if (hh.length) { ctx.beginPath(); for (var w = 0; w < hh.length; w += 4) { ctx.moveTo(hh[w], hh[w + 1]); ctx.lineTo(hh[w + 2], hh[w + 3]); } ctx.stroke(); }
      ctx.beginPath(); for (var q = 0; q < l.length; q += 3) { ctx.moveTo(l[q] + l[q + 2], l[q + 1]); ctx.arc(l[q], l[q + 1], l[q + 2], 0, 6.2832); } ctx.fill();
    }
    if (pasa) { mano.ax = mano.x; mano.ay = mano.y; }
    // Around it: the word behind stays, a little quieter once the thing is there; the way in leaves as the thing comes apart; each thing said arrives with its cluster.
    // Where grounds take the thing's place, the page is longer and what it tells is told sooner: the thing comes apart
    // and what is said is read over the plain page; then the dots and the words go; and only then do the grounds
    // come, so that no word is ever read over them.
    asoma(capas[0], 1 - suave(abre * 2.4)); asoma(capas[1], suave((abre - 0.8) / 0.17));
    var queda = capas[1].length ? 1 - suave((abre - 0.64) / 0.16) : 1;
    if (capas[1].length) lienzo.style.opacity = queda.toFixed(3);
    palabra.style.opacity = (1 - 0.18 * suave(arma * 1.2) - 0.55 * a).toFixed(3); entrada.style.opacity = (1 - suave(abre * 4)).toFixed(3); entrada.style.visibility = abre > 0.3 ? 'hidden' : '';
    // (over a ground, what is said is never dimmed: its box has to stay solid to be read)
    // (and there what is said leaves with the dots: at the end only the ground is left)
    datos.forEach(function (el, m) { var ve = suave((a - 0.5 - m * 0.06) * 3.2) * queda; el.style.opacity = (ve * (foco < 0 || m === foco || capas[1].length ? 1 : 0.42)).toFixed(3); el.style.visibility = ve < 0.05 ? 'hidden' : ''; });
    if (!quieto && (sigue || arma < 1 || Math.abs(meta - abre) > 0.0005 || Math.abs(quiereGiro - giro) > 0.0005 || Math.abs(quiereAlza - alza) > 0.0005)) pide();
  }
  function pide() { if (pedido) return; pedido = window.AlmaReloj ? window.AlmaReloj.pide(cuadro) : requestAnimationFrame(cuadro); }
  escena.classList.add('escaneo--viva'); mide(); pide();
  addEventListener('scroll', pide, { passive: true }); addEventListener('resize', function () { mide(); pide(); });
  fija.addEventListener('pointermove', function (e) {
    var r = fija.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top; dePuntero = -1;
    for (var g = 0; g < centros.length; g++) if (Math.hypot(px - centros[g][0], py - centros[g][1]) < radio * 1.15) dePuntero = g;      // pointing at a cluster picks it, as pointing at its words does
    // How fast it goes: from where it was the last time it was heard of, eased so that one jump does not throw everything.
    var t = performance.now(), ms = Math.max(8, t - (mano.cuando || t - 16)); if (!mano.dentro) { mano.ax = px; mano.ay = py; mano.vx = mano.vy = 0; } else { mano.vx += ((px - mano.x) / ms * 1000 - mano.vx) * 0.5; mano.vy += ((py - mano.y) / ms * 1000 - mano.vy) * 0.5; }
    mano.x = px; mano.y = py; mano.cuando = t; mano.dentro = true;
    // (from one side of the page to the other: a sixth of a turn each way; a contained entity turns less than half of that)
    if (!menos.matches) { quiereGiro = (px / r.width - 0.5) * 2.1 * (CONT ? 0.4 : 1); quiereAlza = (py / r.height - 0.5) * 0.2 * (CONT ? 0.4 : 1); } pide();
  });
  fija.addEventListener('pointerleave', function () { quiereGiro = quiereAlza = 0; dePuntero = -1; mano.dentro = false; pide(); });
  datos.forEach(function (el, m) {
    el.tabIndex = 0;
    el.addEventListener('pointerenter', function () { deTexto = m; pide(); }); el.addEventListener('pointerleave', function () { if (deTexto === m) deTexto = -1; pide(); });
    el.addEventListener('focus', function () { deTexto = m; pide(); }); el.addEventListener('blur', function () { if (deTexto === m) deTexto = -1; pide(); });
  });
  // Its theme: dark unless the page it is in, or the person, says light. The person's choice is kept for the next visit.
  var raiz = document.documentElement, boton = document.querySelector('.escaneo__tema'), LLAVE = 'alma-portada-tema';
  function guardado() { try { return localStorage.getItem(LLAVE); } catch (e) { return null; } }
  function nombra() { if (!boton) return; var dice = raiz.getAttribute('data-theme') === 'light' ? 'Usar tema oscuro' : 'Usar tema claro'; boton.setAttribute('aria-label', dice); boton.title = dice; }
  function viste(t) { raiz.setAttribute('data-theme', t); raiz.style.colorScheme = t; nombra(); }
  var elegido = guardado(); viste(elegido === 'light' || elegido === 'dark' ? elegido : raiz.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  if (boton) boton.addEventListener('click', function () { var t = raiz.getAttribute('data-theme') === 'light' ? 'dark' : 'light'; try { localStorage.setItem(LLAVE, t); } catch (e) { /* it is simply not kept */ } viste(t); });
  // If the page changes theme, its dots take the colors of the new one.
  if (window.MutationObserver) new MutationObserver(function () { nombra(); mide(); pide(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { mide(); pide(); });
  window.__escaneo = { get enMovimiento() { return !!pedido; }, get elegido() { return deTexto >= 0 ? deTexto : dePuntero; }, puntos: N };
})();
