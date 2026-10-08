// A scanned place, walked into. The place is a lattice of dots (blender/escaneo.py, with --dentro); the page is scrolled
// and whoever reads goes along it, at the height of the eyes, from one end to the way out, where the entity's word is.
// The pointer turns the head. Each dot is a small square, stronger and a little larger where the place is lighter (on
// a light page, where it is darker), in one of the entity's three colors: the vault, the walls, the ground. What is far fades.
// A scanned ground with no walls (`vuelo`: a sea of clouds, say) is flown over instead, low and looking a little down: its
// three colors are its heights, its edges thin out into nothing, and the word is on the horizon.
// With `arena`, whatever is below a line of the screen comes apart into sand that drifts, each grain a little late or a
// little early, and comes together again, grain by grain, when the page is scrolled back and it rises past that line.
(function () {
  var D = window.__ESCANEO, escena = document.querySelector('.recorrido'), lienzo = document.querySelector('.escaneo__lienzo');
  if (!D || !escena || !lienzo || !lienzo.getContext) return;
  var palabra = escena.querySelector('.escaneo__palabra'), entrada = escena.querySelector('.escaneo__entrada'), datos = escena.querySelectorAll('.escaneo__dato');
  var ctx = lienzo.getContext('2d'), menos = matchMedia('(prefers-reduced-motion: reduce)'), bytes = atob(D.puntos), ANCHO = D.alma === 3 ? 10 : 7, c = ANCHO - 4, N = bytes.length / ANCHO, C = D.columnas;

  // The dots, column by column along the way, so that they are drawn from the far end toward the eyes with no sorting.
  var INICIO = new Uint32Array(C + 1), FIL = new Uint16Array(N), HON = new Uint16Array(N), TON = new Float32Array(N), TIN = new Uint8Array(N), AZX = new Int8Array(N), AZY = new Int8Array(N), cuenta = new Uint32Array(257), i, o;
  var lugar = function (o, k) { return c === 6 ? bytes.charCodeAt(o + 2 * k) | bytes.charCodeAt(o + 2 * k + 1) << 8 : bytes.charCodeAt(o + k); };
  for (i = 0; i < N; i++) { INICIO[lugar(ANCHO * i, 0) + 1]++; cuenta[bytes.charCodeAt(ANCHO * i + c)]++; }
  for (i = 0; i < C; i++) INICIO[i + 1] += INICIO[i];
  // (how light the place is, stretched between its darkest and its lightest, so that a dim scan is read as well as a bright one)
  var bajo = 0, alto = 255, suma = 0; for (i = 0; i < 256; i++) { suma += cuenta[i]; if (suma < N * 0.03) bajo = i; if (suma < N * 0.97) alto = i + 1; }
  var puesto = new Uint32Array(INICIO), semilla = 20261007, azar = function () { semilla = (semilla * 1664525 + 1013904223) >>> 0; return semilla / 4294967296; };
  for (i = 0; i < N; i++) { o = ANCHO * i; var j = puesto[lugar(o, 0)]++; FIL[j] = lugar(o, 1); HON[j] = lugar(o, 2); TON[j] = Math.pow(Math.min(1, Math.max(0, (bytes.charCodeAt(o + c) - bajo) / Math.max(1, alto - bajo))), 1.15); AZX[j] = azar() * 254 - 127; AZY[j] = azar() * 254 - 127; }
  // The way itself, read from the dots: at each step along it, where its middle is, its ground and its vault.
  var MEDIO = new Float32Array(C), SUELO = new Float32Array(C), TECHO = new Float32Array(C), ANCHURA = new Float32Array(C), crudo = [];
  for (var col = 0; col < C; col++) {
    var a = D.hondos, b = 0, s = 0, t = D.filas; for (i = INICIO[col]; i < INICIO[col + 1]; i++) { if (HON[i] < a) a = HON[i]; if (HON[i] > b) b = HON[i]; }
    var m = (a + b) / 2, tercio = (b - a) / 6; for (i = INICIO[col]; i < INICIO[col + 1]; i++) if (Math.abs(HON[i] - m) < tercio) { if (FIL[i] > s) s = FIL[i]; if (FIL[i] < t) t = FIL[i]; }
    crudo.push(b > a && s > t ? [m, s, t, b - a] : null);
  }
  var quita = Math.round(C * 0.08), sanos = crudo.slice(quita, C - quita).filter(Boolean), mediana = function (k) { var v = sanos.map(function (q) { return q[k]; }).sort(function (x, y) { return x - y; }); return v[v.length >> 1] || 0; }, comun = [mediana(0), mediana(1), mediana(2), mediana(3)];
  for (col = 0; col < C; col++) {      // (smoothed over a stretch, and at the two ends, where the place opens, as it is in the middle)
    var n = 0, q = [0, 0, 0, 0]; for (var d = -14; d <= 14; d++) { var r = crudo[col + d]; if (r && col + d >= quita && col + d < C - quita && Math.abs(r[3] - comun[3]) < comun[3] * 0.25) { n++; q[0] += r[0]; q[1] += r[1]; q[2] += r[2]; q[3] += r[3]; } }
    MEDIO[col] = n ? q[0] / n : comun[0]; SUELO[col] = n ? q[1] / n : comun[1]; TECHO[col] = n ? q[2] / n : comun[2]; ANCHURA[col] = n ? q[3] / n : comun[3];
  }
  for (col = 0; col < C; col++) for (i = INICIO[col]; i < INICIO[col + 1]; i++) { var banda = (FIL[i] - TECHO[col]) / Math.max(1, SUELO[col] - TECHO[col]) + AZX[i] / 127 * 0.05; TIN[i] = banda < 0.34 ? 0 : banda < 0.86 ? 1 : 2; }
  var CONT = !!D.contenida;      // (a contained entity: nothing arrives flying, nothing is stirred, the sand lies still, and the head turns less)
  var VUELO = !!D.vuelo, ARENA = !!D.arena, HM = D.hondos / 2, reloj = 0, aLaVista = true;
  if (VUELO) {      // (flown over: its middle is the lattice's, and what counts is how high its tops are and how low its hollows)
    var alturas = new Uint32Array(D.filas + 1), cima = 0, hoya = D.filas, van = 0, alta = 0, media = 0; for (i = 0; i < N; i++) alturas[FIL[i]]++;
    for (i = 0; i <= D.filas; i++) { van += alturas[i]; if (van < N * 0.02) cima = i; if (van < N * 0.3) alta = i + 1; if (van < N * 0.72) media = i + 1; if (van < N * 0.98) hoya = i + 1; }
    for (col = 0; col < C; col++) { MEDIO[col] = HM; ANCHURA[col] = D.hondos * 0.8; SUELO[col] = cima; TECHO[col] = cima - C * 0.1; for (i = INICIO[col]; i < INICIO[col + 1]; i++) { var nivel = FIL[i] + AZX[i] / 127 * Math.max(1, (hoya - cima) * 0.04); TIN[i] = nivel < alta ? 0 : nivel < media ? 1 : 2; } }
  }
  var en = function (A, x) { var k = Math.min(C - 1, Math.max(0, x)), e = Math.floor(k), f = Math.min(C - 1, e + 1); return A[e] + (A[f] - A[e]) * (k - e); };
  var OJOS = VUELO ? Math.max(8, C * 0.045) : Math.min(1.55 / ((D.alto || D.filas) / D.filas), (comun[1] - comun[2]) * 0.62), DESDE = VUELO ? -C * 0.04 : C * 0.06, HASTA = VUELO ? C * 0.4 : C * 0.9, CERCA = 3, BAJA = VUELO ? 0.22 : 0;

  var W = 0, H = 0, escala = 1, foco = 1, imagen = null, pixeles = null, claro = false, FONDO = 0, TINTAS = new Uint32Array(96), NIVELES = 32;
  var avance = 0, giro = 0, alza = 0, quiereGiro = 0, quiereAlza = 0, px = -1e4, py = -1e4, brio = 0, suelta = menos.matches || CONT ? 0 : 1, ENTRADA = 1.6, pedido = 0, antes = 0, anchoPalabra = 0, altoPalabra = 0;
  escena.classList.add('recorrido--vivo');
  if (palabra && window.AlmaPalabra) window.AlmaPalabra.monta(palabra, { genes: window.__PALABRA, oye: escena, mide: false });      // (the word is a piece of its own, site/palabra.js; its size here is the way's)

  // A color of the page, whatever way it is written, as the three numbers it is.
  var prueba = document.createElement('canvas'); prueba.width = prueba.height = 1; var gota = prueba.getContext('2d', { willReadFrequently: true });
  function color(css) { gota.clearRect(0, 0, 1, 1); gota.fillStyle = css; gota.fillRect(0, 0, 1, 1); return gota.getImageData(0, 0, 1, 1).data; }
  function junta(r, g, b) { return (255 << 24 | b << 16 | g << 8 | r) >>> 0; }
  function viste() {
    claro = /light/.test(document.documentElement.getAttribute('data-theme') || '');
    var lento = getComputedStyle(escena).getPropertyValue('--duration-slow-02').trim(), ls = parseFloat(lento); if (isFinite(ls) && ls > 0) ENTRADA = 2 * (/ms$/.test(lento) ? ls / 1000 : ls); if (window.AlmaPartitura) ENTRADA = window.AlmaPartitura.tiempos(escena).armarse.recorrido;      // (the dust settles in two of ALMA's slowest steps, as the entity has them)
    var f = color(getComputedStyle(document.body).backgroundColor), e = getComputedStyle(escena); FONDO = junta(f[0], f[1], f[2]);
    for (var t = 0; t < 3; t++) { var k = color(e.getPropertyValue('--escaneo-' + (t + 1)).trim()); for (var n = 0; n < NIVELES; n++) { var p = n / (NIVELES - 1); TINTAS[t * NIVELES + n] = junta(Math.round(f[0] + (k[0] - f[0]) * p), Math.round(f[1] + (k[1] - f[1]) * p), Math.round(f[2] + (k[2] - f[2]) * p)); } }
  }
  function mide() {
    var caja = lienzo.getBoundingClientRect(), w = Math.max(1, caja.width), h = Math.max(1, caja.height); escala = Math.min(window.devicePixelRatio || 1, 2); if (w * h * escala * escala > 2400000) escala = Math.sqrt(2400000 / (w * h));
    W = Math.max(1, Math.round(w * escala)); H = Math.max(1, Math.round(h * escala)); lienzo.width = W; lienzo.height = H; foco = 0.9 * Math.min(H, W * 1.15);
    imagen = ctx.createImageData(W, H); pixeles = new Uint32Array(imagen.data.buffer);
    if (palabra) { palabra.style.transform = 'none'; anchoPalabra = palabra.offsetWidth; altoPalabra = palabra.offsetHeight; }
    viste(); pide();
  }
  // (how far the page has been scrolled is the clock's to read, once a frame, when the page has it: site/reloj.js)
  function lee() { if (window.AlmaReloj) { var a = window.AlmaReloj.avance(escena); aLaVista = a.aLaVista; return a.v; } var r = escena.getBoundingClientRect(), largo = r.height - window.innerHeight; aLaVista = r.bottom > 0 && r.top < window.innerHeight;      // (the sand drifts only while it is seen)
    return largo > 0 ? Math.min(1, Math.max(0, -r.top / largo)) : 0; }
  function pide() { if (pedido) return; pedido = window.AlmaReloj ? window.AlmaReloj.pide(cuadro) : requestAnimationFrame(cuadro); }
  function cubre(x0, y0, x1, y1, tinta) {
    x0 = x0 < 0 ? 0 : x0 | 0; y0 = y0 < 0 ? 0 : y0 | 0; x1 = x1 > W ? W : x1 | 0; y1 = y1 > H ? H : y1 | 0; if (x1 <= x0) return;
    for (var y = y0; y < y1; y++) pixeles.fill(tinta, y * W + x0, y * W + x1);
  }

  function cuadro(ahora) {
    pedido = 0; var dt = Math.min(0.05, antes ? (ahora - antes) / 1000 : 0.016); antes = ahora;
    var quieto = menos.matches, meta = lee(), sigue = false;
    if (quieto) { avance = meta; giro = alza = 0; suelta = 0; brio = 0; }
    else {
      avance += (meta - avance) * (1 - Math.exp(-dt * 6)); giro += (quiereGiro - giro) * (1 - Math.exp(-dt * 5)); alza += (quiereAlza - alza) * (1 - Math.exp(-dt * 5));
      reloj += dt; if (suelta > 0) suelta = Math.max(0, suelta - dt / ENTRADA); brio *= Math.exp(-dt / 0.5); if (brio < 0.01) brio = 0;
      sigue = Math.abs(meta - avance) > 0.0004 || Math.abs(quiereGiro - giro) > 0.001 || Math.abs(quiereAlza - alza) > 0.001 || suelta > 0 || brio > 0 || (ARENA && !CONT && aLaVista && !document.hidden);
    }
    var cx = DESDE + (HASTA - DESDE) * avance, cz = en(MEDIO, cx), cy = en(SUELO, cx) - OJOS, cg = Math.cos(giro), sg = Math.sin(giro), ca = Math.cos(alza + BAJA), sa = Math.sin(alza + BAJA), mx = W / 2, my = H / 2;
    var polvo = suelta * suelta * (3 - 2 * suelta), vuela = polvo * H * 0.9 / 127, alcance = H * 0.17, alcance2 = alcance * alcance, qx = px * escala, qy = py * escala, lejos = C * 0.22, fondoLejos = C * 0.75;
    var arena = ARENA && !quieto, raya = H * 0.86, franja = H * 0.2, vuelo = H * (CONT ? 0.1 : 0.2), viva = CONT ? 0 : 1, grano = Math.max(1, 1.9 * escala);
    pixeles.fill(0);
    for (var col = C - 1; col >= 0; col--) {
      var u = col + 0.5 - cx; if (u < -30) break; var alFondo = VUELO && col > C * 0.86 ? (C - col) / (C * 0.14) : 1;
      for (var i = INICIO[col], fin = INICIO[col + 1]; i < fin; i++) {
        var w = cz - HON[i] - 0.5, v = FIL[i] + 0.5 - cy, ade = u * cg + w * sg, hondo = ade * ca + v * sa; if (hondo < CERCA) continue;
        var k = foco / hondo, x = mx + (w * cg - u * sg) * k, y = my + (v * ca - ade * sa) * k; if (x < -k || x > W + k || y < -k || y > H + k) continue;
        var niebla = hondo < CERCA * 3 ? (hondo - CERCA) / (CERCA * 2) : hondo > lejos ? Math.max(0.3, 1 - 0.7 * (hondo - lejos) / fondoLejos) : 1, t = claro ? 1 - 0.9 * TON[i] : TON[i], macizo = polvo < 0.02 && hondo >= CERCA * 3;
        if (VUELO) { var orilla = Math.abs(HON[i] + 0.5 - HM) / HM + AZY[i] / 127 * 0.05, queda = (orilla > 0.7 ? Math.max(0, (1 - orilla) / 0.3) : 1) * alFondo; if (queda <= 0) continue; niebla *= queda; if (queda < 0.75) macizo = false; }
        if (polvo > 0) { x += AZX[i] * vuela; y += AZY[i] * vuela; }
        if (brio > 0) { var ex = x - qx, ey = y - qy, e2 = ex * ex + ey * ey; if (e2 < alcance2) { var e = Math.sqrt(e2) || 1, empuje = (1 - e / alcance); empuje = empuje * empuje * brio * alcance * 0.55; x += ex / e * empuje + AZX[i] * empuje * 0.004; y += ey / e * empuje + AZY[i] * empuje * 0.004; macizo = false; } }
        if (arena && y > raya - franja) {      // (below the line: sand. How much of a grain it is, and where the wind has it)
          var tarda = (AZX[i] + 127) / 254 * 0.55, sube = Math.min(1, Math.max(0, ((raya - y) / franja - tarda) / (1 - tarda))), hecho = sube * sube * (3 - 2 * sube), suelto = 1 - hecho;
          if (suelto > 0.004) {
            var fase = AZX[i] * 0.21 + AZY[i] * 0.13, lado0 = AZY[i] / 127;
            x += (lado0 * vuelo + Math.sin(reloj * 0.55 + fase) * vuelo * 0.16 * viva) * suelto + Math.sin(hecho * 3.1416) * vuelo * 0.28 * viva * (AZX[i] > 0 ? 1 : -1);
            y += ((AZX[i] / 127 * 0.75 + 0.12) * vuelo + Math.cos(reloj * 0.45 + fase * 1.3) * vuelo * 0.14 * viva) * suelto;
            macizo = false; k = grano + (k - grano) * hecho * hecho; niebla *= 0.8 + 0.2 * hecho;
          }
        }
        var medio = k / 2;
        if (k < 3.5) { cubre(x - medio, y - medio, x - medio + Math.max(1, k), y - medio + Math.max(1, k), TINTAS[TIN[i] * NIVELES + Math.round((0.1 + 0.9 * t) * niebla * (NIVELES - 1))]); continue; }
        if (macizo) cubre(x - medio, y - medio, x + medio + 1, y + medio + 1, FONDO);      // (what is behind it is not seen through it: the word waits at the way out)
        var lado = k * (0.5 + 0.32 * t) * (hondo < CERCA * 3 ? 0.4 + 0.6 * niebla : 1) / 2;
        cubre(x - lado, y - lado, x + lado, y + lado, TINTAS[TIN[i] * NIVELES + Math.round((0.1 + 0.9 * t) * niebla * (NIVELES - 1))]);
      }
    }
    ctx.putImageData(imagen, 0, 0);
    // The word, where the way ends: small from afar, and the whole way out when one is there.
    if (palabra && anchoPalabra) {
      var uf = C * 1.02 - cx, wf = cz - en(MEDIO, C - 1), vf = (en(SUELO, C - 1) + en(TECHO, C - 1)) / 2 - cy, af = uf * cg + wf * sg, hf = Math.max(1, af * ca + vf * sa), kf = foco / hf / escala;
      var tam = en(ANCHURA, C - 1) * 0.5 * kf / anchoPalabra, xf = W / 2 / escala + (wf * cg - uf * sg) * kf, yf = H / 2 / escala + (vf * ca - af * sa) * kf;
      palabra.style.transform = 'translate(' + (xf - anchoPalabra * tam / 2).toFixed(1) + 'px,' + (yf - altoPalabra * tam / 2).toFixed(1) + 'px) scale(' + tam.toFixed(4) + ')';
    }
    // What is said: the entrance at first, then one thing at a time along the way.
    var ve = function (el, op) { el.style.opacity = op.toFixed(3); };
    if (entrada) { var oe = Math.min(1, Math.max(0, 1 - (meta - 0.03) / 0.06)); ve(entrada, oe); entrada.style.pointerEvents = oe < 0.5 ? 'none' : ''; }
    for (var g = 0; g < datos.length; g++) { var centro = 0.2 + 0.58 * (datos.length > 1 ? g / (datos.length - 1) : 0.5), lejosDe = Math.abs(meta - centro); ve(datos[g], Math.min(1, Math.max(0, (0.085 - lejosDe) / 0.03))); }
    if (sigue) pide();
  }

  window.addEventListener('scroll', pide, { passive: true }); window.addEventListener('resize', mide);
  if (window.ResizeObserver) new ResizeObserver(mide).observe(lienzo);
  escena.addEventListener('pointermove', function (ev) {
    var caja = lienzo.getBoundingClientRect(), x = ev.clientX - caja.left, y = ev.clientY - caja.top; if (menos.matches) return;
    if (px > -1e3 && !CONT) brio = Math.min(1, brio + Math.hypot(x - px, y - py) / 220); px = x; py = y;
    if (ev.pointerType !== 'touch') { var cuanto = CONT ? 0.4 : 1; quiereGiro = (x / caja.width - 0.5) * 1.1 * cuanto; quiereAlza = (y / caja.height - 0.5) * 0.36 * cuanto; } pide();
  });
  escena.addEventListener('pointerleave', function () { quiereGiro = quiereAlza = 0; px = py = -1e4; pide(); });
  // (whoever reaches the entrance's link with the keyboard is taken back to the entrance, where it is seen)
  if (entrada) entrada.addEventListener('focusin', function () { if (lee() > 0.04) window.scrollTo(0, window.scrollY + escena.getBoundingClientRect().top); });
  if (menos.addEventListener) menos.addEventListener('change', pide);
  document.addEventListener('visibilitychange', pide);
  new MutationObserver(function () { viste(); pide(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(mide);

  // Its one control: the theme, light or dark, kept for the next visit.
  var raiz = document.documentElement, boton = document.querySelector('.escaneo__tema'), LLAVE = 'alma-portada-tema';
  function guardado() { try { return localStorage.getItem(LLAVE); } catch (e) { return null; } }
  function nombra() { if (!boton) return; var dice = raiz.getAttribute('data-theme') === 'light' ? 'Usar tema oscuro' : 'Usar tema claro'; boton.setAttribute('aria-label', dice); boton.title = dice; }
  function pone(t) { raiz.setAttribute('data-theme', t); raiz.style.colorScheme = t; nombra(); }
  var elegido = guardado(); pone(elegido === 'light' || elegido === 'dark' ? elegido : raiz.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  if (boton) boton.addEventListener('click', function () { var t = raiz.getAttribute('data-theme') === 'light' ? 'dark' : 'light'; try { localStorage.setItem(LLAVE, t); } catch (e) {} pone(t); });

  mide();
  window.__recorrido = { get enMovimiento() { return !!pedido; }, get avance() { return avance; }, puntos: N };
})();
