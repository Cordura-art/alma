// An entity's planet, drawn in dots and made as one goes. Nothing of it is kept in a file: the rule that says how high
// the ground is in every direction (the one the Unity planet has, unity/Assets/ALMA/Relieve.cs, written again here) is
// asked about the places near whoever walks, piece by piece, and each answer is a dot. Near, the dots are close
// together; twice as far, half as many and twice as large: on the page they are always about as dense. A piece that
// has just been asked about arrives as dust and settles. The dots are round, in the entity's three colors, all of
// one size on the ground (so that how small they are says how far), stronger where the sun is on them, with loose
// specks in the air; what is behind the ground is not seen; and where the pointer passes each has a life of its own,
// as the dots of a scanned thing do (site/escaneo.js): stirred, carried off, drawn out when it goes fast, and back.
// One walks with the arrows or W A S D, flies with F (Q and E, down and up), and the pointer turns the head.
// Nothing is drawn while nothing changes; what only drifts rests a while after the last sign of whoever looks; and
// the amount of dots follows what the machine holds.
(function () {
  // (this same script is run again off the page, as many times as there are hands to spare: there it only answers what
  // the ground of a piece is, so that asking never holds a frame back)
  var AYUDA = typeof document === 'undefined', M = (AYUDA ? self : window).__MUNDO, guion = AYUDA ? null : document.currentScript, escena = AYUDA ? null : document.querySelector('.mundo'), lienzo = escena && escena.querySelector('.escaneo__lienzo');
  if (!M || (!AYUDA && (!escena || !lienzo || !lienzo.getContext))) return;
  var palabra = escena && escena.querySelector('.escaneo__palabra'), entrada = escena && escena.querySelector('.escaneo__entrada'), estado = escena && escena.querySelector('.mundo__estado'), mandos = escena ? escena.querySelectorAll('[data-mando]') : [];
  var menos = AYUDA ? null : matchMedia('(prefers-reduced-motion: reduce)'), CONT = !!M.contenida, imul = Math.imul, piso = Math.floor, raiz2 = Math.sqrt, f32 = Math.fround;

  // ── The rule ────────────────────────────────────────────────────────────────────────────────────────────────────
  // ALMA's own noise: a gradient noise, summed in layers, and chance for a place (the same number every time).
  function mezcla(x, y, z, s) { var h = (imul(x, 374761393) + imul(y, 668265263) + imul(z, 2246822519) + imul(s, 3266489917)) | 0; h = imul(h ^ (h >>> 15), 2246822519); h = imul(h ^ (h >>> 13), 3266489917); return (h ^ (h >>> 16)) >>> 0; }
  function pendiente(h, x, y, z) { switch (h % 12) { case 0: return x + y; case 1: return -x + y; case 2: return x - y; case 3: return -x - y; case 4: return x + z; case 5: return -x + z; case 6: return x - z; case 7: return -x - z; case 8: return y + z; case 9: return -y + z; case 10: return y - z; default: return -y - z; } }
  function suerte(x, y, z, s) { return (mezcla(x, y, z, s) & 0xFFFFFF) / 0x1000000; }
  function curva(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function uno(x, y, z, s) {
    var xi = piso(x), yi = piso(y), zi = piso(z), fx = x - xi, fy = y - yi, fz = z - zi, u = curva(fx), v = curva(fy), w = curva(fz);
    var a = pendiente(mezcla(xi, yi, zi, s), fx, fy, fz), b = pendiente(mezcla(xi + 1, yi, zi, s), fx - 1, fy, fz), c = pendiente(mezcla(xi, yi + 1, zi, s), fx, fy - 1, fz), d = pendiente(mezcla(xi + 1, yi + 1, zi, s), fx - 1, fy - 1, fz);
    var e = pendiente(mezcla(xi, yi, zi + 1, s), fx, fy, fz - 1), f = pendiente(mezcla(xi + 1, yi, zi + 1, s), fx - 1, fy, fz - 1), g = pendiente(mezcla(xi, yi + 1, zi + 1, s), fx, fy - 1, fz - 1), h = pendiente(mezcla(xi + 1, yi + 1, zi + 1, s), fx - 1, fy - 1, fz - 1);
    var ab = a + (b - a) * u, cd = c + (d - c) * u, ef = e + (f - e) * u, gh = g + (h - g) * u, bajo = ab + (cd - ab) * v, alto = ef + (gh - ef) * v; return bajo + (alto - bajo) * w;
  }
  function capas(x, y, z, escala, cuantas, aspero, s) {
    var suma = 0, total = 0, fuerza = 1, f = escala, n = Math.ceil(cuantas) + 1;
    for (var i = 0; i < n; i++) { var peso = i < n - 1 ? 1 : 1 - (Math.ceil(cuantas) - cuantas); if (peso <= 0) break; suma += uno(x * f, y * f, z * f, (s + i * 101) >>> 0) * fuerza * peso; total += fuerza * peso; fuerza *= aspero; f *= 2; }
    return 0.5 + 0.5 * suma / total * 1.6;
  }
  function suave(v, a, b) { var t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); }
  // Chance from a word: the entity's seed says the same planet every time.
  function Azar(texto) { var s = 2166136261; for (var i = 0; i < texto.length; i++) { s = (s ^ texto.charCodeAt(i)) >>> 0; s = imul(s, 16777619) >>> 0; } this.s = s || 1; for (i = 0; i < 8; i++) this.uno(); }
  Azar.prototype.uno = function () { var s = this.s; s = (s ^ (s << 13)) >>> 0; s = (s ^ (s >>> 17)) >>> 0; s = (s ^ (s << 5)) >>> 0; this.s = s; return (s & 0xFFFFFF) / 0x1000000; };
  Azar.prototype.entre = function (a, b) { return f32(a + f32((b - a) * this.uno())); };

  // What the genes say, as the planet's numbers.
  var az = new Azar(M.semilla + '|planeta'), SEMILLA = piso(f32(az.uno() * 9999)) + 1, CONTINENTES = f32(0.75 + 0.45 * M.grupos), ANGULOSIDAD = 1 - M.redondez, RELIEVE = f32(0.08 + 0.012 * M.puntas), DETALLE = f32(3 + 1.5 * M.complejidad), MAR = f32(0.44 + (1 - M.trazo) * 0.3), DESGASTE = f32(0.6 + 0.4 * ANGULOSIDAD);
  var OX = az.entre(-50, 50), OY = az.entre(-50, 50), OZ = az.entre(-50, 50), RADIO = M.radio || 1000, RMAR = RADIO * (1 + RELIEVE * 0.02), BOSQUE = Math.min(1, 0.22 * M.focos), NUBES = Math.min(1, 0.1 + 0.06 * M.focos);
  var TIERRA = 0, HONDO = 0, ALT = 0, CALOR = 0, HUMEDAD = 0;
  // The land before the water: continents and mountains (how far inland, in TIERRA; how far below the sea, in HONDO).
  function base(px, py, pz) {
    var c = CONTINENTES, continente = capas(px, py, pz, c, 3, 0.55, SEMILLA); TIERRA = suave(continente, MAR, MAR + 0.22); HONDO = Math.min(continente - MAR, 0); if (TIERRA <= 0) return 0;
    var bulto = capas(px, py, pz, c * 3.1, Math.min(DETALLE, 5.5), 0.62 - (1 - ANGULOSIDAD) * 0.2, SEMILLA + 7), cresta = 1 - Math.abs(bulto * 2 - 1), monte = bulto + (cresta - bulto) * ANGULOSIDAD; return TIERRA * (monte * 0.8 + 0.14);
  }
  // How far out the ground is that way, as a part of the radius (below 0: under the sea); ALT is how high the land is
  // between the shore and the peaks. The land is worn as water wears it, gullies cut along the way down, with no water run.
  function sube(x, y, z) {
    var px = x + OX, py = y + OY, pz = z + OZ, c = CONTINENTES, h = base(px, py, pz), tierra = TIERRA; if (tierra <= 0) { ALT = 0; return HONDO * 0.6 * RELIEVE; }
    var ax = Math.abs(y) < 0.9 ? 0 : 1, ay = 1 - ax, t1x = -z * ay, t1y = z * ax, t1z = x * ay - y * ax, l1 = raiz2(t1x * t1x + t1y * t1y + t1z * t1z); t1x /= l1; t1y /= l1; t1z /= l1;
    var t2x = y * t1z - z * t1y, t2y = z * t1x - x * t1z, t2z = x * t1y - y * t1x, e = 0.0012, ga = (base(px + t1x * e, py + t1y * e, pz + t1z * e) - h) / e, gb = (base(px + t2x * e, py + t2y * e, pz + t2z * e) - h) / e;
    var gx = t1x * ga + t2x * gb, gy = t1y * ga + t2y * gb, gz = t1z * ga + t2z * gb, f = c * 9, fuerza = 0.05 * DESGASTE;
    for (var o = 0; o < 4; o++) {
      var g = raiz2(gx * gx + gy * gy + gz * gz); if (g < 1e-6) break;
      var dx = gx / g, dy = gy / g, dz = gz / g, sx = y * dz - z * dy, sy = z * dx - x * dz, sz = x * dy - y * dx, onda = 0, cae = 0, peso = 0, ix = piso(px * f - 0.5), iy = piso(py * f - 0.5), iz = piso(pz * f - 0.5), s = SEMILLA + 41 + o * 5;
      for (var k = 0; k < 8; k++) {
        var jx = ix + (k & 1), jy = iy + ((k >> 1) & 1), jz = iz + ((k >> 2) & 1), vx = px - (jx + 0.5 + (suerte(jx, jy, jz, s) - 0.5) * 0.6) / f, vy = py - (jy + 0.5 + (suerte(jx, jy, jz, s + 1) - 0.5) * 0.6) / f, vz = pz - (jz + 0.5 + (suerte(jx, jy, jz, s + 2) - 0.5) * 0.6) / f;
        var lejos = (vx * vx + vy * vy + vz * vz) * f * f / 2.25, w = lejos >= 1 ? 0 : (1 - lejos) * (1 - lejos), fase = (vx * sx + vy * sy + vz * sz) * f * 6.2832; onda += w * Math.cos(fase); cae -= w * Math.sin(fase) * f * 6.2832; peso += w;
      }
      if (peso > 1e-6) { var cuanto = fuerza * suave(g, 0.3, 2.2) * tierra; h += cuanto * (onda / peso - 0.35); gx += sx * cuanto * cae / peso; gy += sy * cuanto * cae / peso; gz += sz * cuanto * cae / peso; }
      f *= 2; fuerza *= 0.55;
    }
    var grano = capas(px, py, pz, c * 14, 2, 0.6, SEMILLA + 13), fino = capas(px, py, pz, c * 90, 3, 0.55, SEMILLA + 17);
    h += tierra * (grano * 0.1 + (fino - 0.5) * 0.02); if (h < 0.002) h = 0.002; ALT = Math.min(1, h); return h * RELIEVE;
  }
  // The weather of a place: how warm (cold at the poles and on high ground) and how wet.
  function clima(x, y, z, altura) {
    var px = x + OX, py = y + OY, pz = z + OZ, c = CONTINENTES, vaiven = capas(px, py, pz, c * 2.3, 2, 0.5, SEMILLA + 31);
    CALOR = Math.min(1, Math.max(0, 1 - Math.pow(Math.abs(y), 1.7) * 1.05 - altura * 0.5 + (vaiven - 0.5) * 0.3)); HUMEDAD = Math.min(1, Math.max(0, capas(px, py, pz, c * 1.7, 3, 0.55, SEMILLA + 37)));
  }
  // How far from the planet's middle one stands that way, in meters: on the land, or on the water.
  function suelo(x, y, z) { return Math.max(RADIO * (1 + sube(x, y, z)), RMAR); }

  // ── The lattice ─────────────────────────────────────────────────────────────────────────────────────────────────
  // The planet is a cube blown into a ball; each face has a lattice of places, and one of every two of them, and so on.
  var N0 = 16384, NIVELES = 8, TROZO = 64, PASO = Math.PI / 2 * RADIO / N0, DENSA = M.densidad || 160, TAM = 1, LUZ = 0.8, MOTAS = 1, REACCION = 1, ALCANCE = 1, CERCANO = PASO * DENSA, TOPE = NIVELES - 1, DECOSAS = TOPE;
  var EJE = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], LADO = [[0, 1, 0], [0, 1, 0], [0, 0, 1], [0, 0, 1], [1, 0, 0], [1, 0, 0]], ALTO = [[0, 0, 1], [0, 0, 1], [1, 0, 0], [1, 0, 0], [0, 1, 0], [0, 1, 0]], DX = 0, DY = 0, DZ = 0;
  function hacia(cara, a, b) { var ta = Math.tan(a * 0.7853981634), tb = Math.tan(b * 0.7853981634), A = EJE[cara], U = LADO[cara], V = ALTO[cara], x = A[0] + U[0] * ta + V[0] * tb, y = A[1] + U[1] * ta + V[1] * tb, z = A[2] + U[2] * ta + V[2] * tb, l = raiz2(x * x + y * y + z * z); DX = x / l; DY = y / l; DZ = z / l; }

  // Where one arrives: of many dry places at a middling height and not too cold, the most level one.
  function punto(x, y, z) { var l = raiz2(x * x + y * y + z * z); x /= l; y /= l; z /= l; var r = RADIO * (1 + sube(x, y, z)); return [x * r, y * r, z * r]; }
  var SOL = [0, 1, 0], LLEGADA = M.llegada || (function () {
    var a = new Azar(M.semilla + '|lugar'), mejor = [0, 1, 0], nivel = -1;
    for (var i = 0, vistos = 0; i < 6000 && vistos < 160; i++) {
      var x = a.entre(-1, 1), y = a.entre(-1, 1), z = a.entre(-1, 1), l2 = x * x + y * y + z * z; if (l2 < 0.05) continue; var l = raiz2(l2); x /= l; y /= l; z /= l;
      var s = sube(x, y, z), h = ALT; if (RADIO * (1 + s) < RMAR + 0.5 || h < 0.1 || h > 0.34) continue; clima(x, y, z, h); if (CALOR < 0.42) continue;
      var ux = Math.abs(y) < 0.9 ? 0 : 1, uy = 1 - ux, tx = -z * uy, ty = z * ux, tz = x * uy - y * ux, tl = raiz2(tx * tx + ty * ty + tz * tz); tx /= tl; ty /= tl; tz /= tl; var wx = y * tz - z * ty, wy = z * tx - x * tz, wz = x * ty - y * tx;
      var pa = punto(x + tx * 0.002, y + ty * 0.002, z + tz * 0.002), pb = punto(x + wx * 0.002, y + wy * 0.002, z + wz * 0.002), r0 = RADIO * (1 + s), ex = pa[0] - x * r0, ey = pa[1] - y * r0, ez = pa[2] - z * r0, fx = pb[0] - x * r0, fy = pb[1] - y * r0, fz = pb[2] - z * r0;
      var nx = ey * fz - ez * fy, ny = ez * fx - ex * fz, nz = ex * fy - ey * fx, llano = Math.abs(nx * x + ny * y + nz * z) / (raiz2(nx * nx + ny * ny + nz * nz) || 1); vistos++; if (llano > nivel) { nivel = llano; mejor = [x, y, z]; }
    }
    return mejor;
  })();
  // (the sun is over the land one arrives at, a little to one side, so that the ground there has shadows)
  (function () { var L = LLEGADA, tx = L[2], tz = -L[0], tl = raiz2(tx * tx + tz * tz) || 1, c = Math.cos(0.66), s = Math.sin(0.66); SOL = [L[0] * c + tx / tl * s, L[1] * c, L[2] * c + tz / tl * s]; })();

  // A piece of the lattice: sixty-four by sixty-four places of one level (few and large: what costs is how many pieces
  // are handed to the drawing in a frame, not how many dots they hold), asked about once and kept while it is near.
  // What is asked comes back ready for the drawing: for each place, where it is (counted from the piece's middle),
  // which way its ground faces, its color, how lit it is and its chance; with one more row and column, so that the
  // grounds of the pieces meet. And what grows and lies there, and a few of its places to count by.
  var trozos = new Map(), cola = [], LD = TROZO + 1, NV = LD * LD, HX = new Float64Array(NV), HY = new Float64Array(NV), HZ = new Float64Array(NV), HA = new Float32Array(NV), HM = new Uint8Array(NV), cuadro0 = 0, hechos = 0;
  function trozo(cara, nivel, ci, cj) {
    var llave = ((cara * 8 + nivel) * 1024 + ci) * 1024 + cj, t = trozos.get(llave); if (t) return t;
    var n = N0 >> nivel, mitad = TROZO / 2, ancho = PASO * (1 << nivel) * TROZO * 0.78; hacia(cara, -1 + 2 * (ci * TROZO + mitad) / n, -1 + 2 * (cj * TROZO + mitad) / n);
    t = { llave: llave, cara: cara, nivel: nivel, ci: ci, cj: cj, cx: DX * RADIO, cy: DY * RADIO, cz: DZ * RADIO, radio: ancho + RADIO * RELIEVE * 0.5, escala: (ancho + RADIO * (RELIEVE + 0.02)) / 32767, hecho: false, pedido: false, nace: 0, visto: 0, lejos: 0, cosas: 0, polvo: 0, vao: null, vb: null, qvao: null, qb: null, M: null };
    trozos.set(llave, t); return t;
  }
  function hace(t) {
    var n = N0 >> t.nivel, i0 = t.ci * TROZO, j0 = t.cj * TROZO, k, ii, jj, s0 = (SEMILLA + t.cara * 977) >>> 0, e = t.escala;
    for (jj = 0; jj < LD; jj++) for (ii = 0; ii < LD; ii++) {
      hacia(t.cara, -1 + 2 * (i0 + ii) / n, -1 + 2 * (j0 + jj) / n); var s = sube(DX, DY, DZ), r = RADIO * (1 + s), agua = r < RMAR + 0.4; if (agua) r = RMAR;
      k = jj * LD + ii; HX[k] = DX * r; HY[k] = DY * r; HZ[k] = DZ * r; HA[k] = agua ? -Math.min(1, -HONDO * 6) : ALT; HM[k] = agua ? 1 : 0;
    }
    var V = new ArrayBuffer(NV * 16), I16 = new Int16Array(V), I8 = new Int8Array(V), U8 = new Uint8Array(V), cosas = [], MU = new Float32Array(48), mu = 0;
    for (jj = 0; jj < LD; jj++) for (ii = 0; ii < LD; ii++) {
      k = jj * LD + ii; var o = k * 16, x = HX[k], y = HY[k], z = HZ[k]; I16[k * 8] = Math.round((x - t.cx) / e); I16[k * 8 + 1] = Math.round((y - t.cy) / e); I16[k * 8 + 2] = Math.round((z - t.cz) / e);
      // (the last row and column are only ground: their places belong to the next piece)
      if (ii === TROZO || jj === TROZO) { U8[o + 9] = 4; continue; }
      var l = raiz2(x * x + y * y + z * z), dx = x / l, dy = y / l, dz = z / l, ex = HX[k + 1] - x, ey = HY[k + 1] - y, ez = HZ[k + 1] - z, fx = HX[k + LD] - x, fy = HY[k + LD] - y, fz = HZ[k + LD] - z, nx = ey * fz - ez * fy, ny = ez * fx - ex * fz, nz = ex * fy - ey * fx, nl = raiz2(nx * nx + ny * ny + nz * nz) || 1; nx /= nl; ny /= nl; nz /= nl;
      var llano = nx * dx + ny * dy + nz * dz; if (llano < 0) { nx = -nx; ny = -ny; nz = -nz; llano = -llano; }
      // (the same chance for a place at every level it belongs to: it is the place's, not the piece's)
      var gi = (i0 + ii) << t.nivel, gj = (j0 + jj) << t.nivel, a1 = suerte(gi, gj, 1, s0), a2 = suerte(gi, gj, 2, s0), luz = Math.max(0, nx * SOL[0] + ny * SOL[1] + nz * SOL[2]), dia = suave(dx * SOL[0] + dy * SOL[1] + dz * SOL[2], -0.25, 0.3), tinta, tono, par = ((i0 + ii) & 1) === 0 && ((j0 + jj) & 1) === 0 ? 1 : 0;
      if ((ii & 15) === 8 && (jj & 15) === 8) { MU[mu++] = x; MU[mu++] = y; MU[mu++] = z; }
      if (HM[k]) { tinta = 0; tono = (0.2 + 0.3 * (1 + HA[k])) * (0.25 + 0.75 * dia) + a1 * 0.06; par |= 2; }
      else {
        var alt = HA[k]; clima(dx, dy, dz, alt); var frio = suave(CALOR, 0.3, 0.14), alto = suave(alt + (a2 - 0.5) * 0.08, 0.42, 0.6), verde = suave(HUMEDAD + (a1 - 0.5) * 0.16, 0.36, 0.6) * (1 - suave(llano, 0.9, 0.72)), orilla = alt < 0.02 + a2 * 0.012;
        tinta = orilla || a2 < Math.max(frio, alto) ? 1 : a1 < verde ? 2 : a2 < 0.72 ? 2 : 1; if (!orilla && tinta === 1 && a1 < 0.35 * (1 - Math.max(frio, alto))) tinta = 2;
        tono = (0.16 + 0.84 * luz) * (0.2 + 0.8 * dia) * (0.82 + 0.36 * a1) * (tinta === 1 ? 0.5 + 0.5 * Math.max(frio, alto, orilla ? 0.7 : 0) : 1);
        // (what grows and what lies there: the planet's own places for them, twelve meters or so apart)
        if (t.nivel === DECOSAS) for (var c = 0; c < 2; c++) {
          var su = suerte(i0 + ii, j0 + jj, c + 20, s0), seco = suave(HUMEDAD, 0.45, 0.28) * suave(CALOR, 0.35, 0.6);
          var deArbol = BOSQUE * (0.35 + 1.3 * suave(HUMEDAD, 0.3, 0.62)) * (1 - seco) * (1 - frio) * suave(alt, 0.03, 0.1) * (1 - suave(alt, 0.42, 0.6)) * suave(llano, 0.86, 0.96), deRoca = 0.03 + 0.08 * seco + 0.05 * frio + 0.4 * suave(alt, 0.04, 0.2) * (1 - suave(llano, 0.7, 0.9));
          if (su >= deArbol && su <= 1 - deRoca) continue;
          hacia(t.cara, -1 + 2 * (i0 + ii + suerte(i0 + ii, j0 + jj, c, s0)) / n, -1 + 2 * (j0 + jj + suerte(i0 + ii, j0 + jj, c + 10, s0)) / n); var pie = RADIO * (1 + sube(DX, DY, DZ)); if (pie < RMAR + 0.4) continue;
          var talla = suerte(i0 + ii, j0 + jj, c + 30, s0), vivo = (0.25 + 0.75 * dia) * (0.8 + 0.4 * suerte(i0 + ii, j0 + jj, c + 50, s0)), v, sa = (s0 + (i0 + ii) * 31 + (j0 + jj) * 17 + c) >>> 0;
          if (su < deArbol) {
            // (a tree: a trunk of five dots and a crown of forty, wider in its middle, lighter toward its top)
            var largo = 4 + 6 * talla;
            for (v = 0; v < 5; v++) cosas.push(DX * (pie + largo * (0.05 + 0.07 * v)), DY * (pie + largo * (0.05 + 0.07 * v)), DZ * (pie + largo * (0.05 + 0.07 * v)), largo * 0.035, 1, 0.3 * vivo);
            for (v = 0; v < 40; v++) { var sube1 = 0.34 + 0.64 * suerte(v, 1, c, sa), ancho1 = largo * 0.3 * Math.sin(Math.min(1, (sube1 - 0.3) / 0.7 + 0.12) * 3.1416), r1 = pie + largo * sube1; cosas.push(DX * r1 + (suerte(v, 2, c, sa) - 0.5) * ancho1, DY * r1 + (suerte(v, 3, c, sa) - 0.5) * ancho1, DZ * r1 + (suerte(v, 4, c, sa) - 0.5) * ancho1, largo * 0.03, 2, (0.4 + 0.6 * sube1) * vivo); }
          }
          else { var bulto = 0.5 + 1.4 * talla; for (v = 0; v < 12; v++) cosas.push(DX * (pie + bulto * 0.5 * suerte(v, 9, c, sa)) + (suerte(v, 6, c, sa) - 0.5) * bulto, DY * (pie + bulto * 0.5 * suerte(v, 9, c, sa)) + (suerte(v, 7, c, sa) - 0.5) * bulto, DZ * (pie + bulto * 0.5 * suerte(v, 9, c, sa)) + (suerte(v, 8, c, sa) - 0.5) * bulto, bulto * 0.14, 1, (0.3 + 0.25 * suerte(v, 5, c, sa)) * vivo); }
        }
      }
      I8[o + 6] = nx * 127; I8[o + 7] = ny * 127; I8[o + 8] = nz * 127; U8[o + 9] = par; U8[o + 10] = tinta; U8[o + 11] = Math.round(255 * Math.min(1, Math.max(0, tono))); U8[o + 12] = a1 * 255; U8[o + 13] = a2 * 255;
    }
    return { llave: t.llave, V: V, Q: cosas.length ? new Float32Array(cosas) : null, M: MU };
  }
  if (AYUDA) {
    self.onmessage = function (ev) { var d = hace(ev.data), pasa = [d.V, d.M.buffer]; if (d.Q) pasa.push(d.Q.buffer); self.postMessage(d, pasa); };
    return;
  }
  // The hands to spare: each is asked about a few pieces at a time. With none (a browser that will not have them), the page asks itself.
  var manos = [], enCurso = 0;
  try {
    var fuente = URL.createObjectURL(new Blob(['self.__MUNDO = ' + JSON.stringify(Object.assign({}, M, { llegada: LLEGADA })) + ';\n' + guion.textContent], { type: 'text/javascript' }));
    for (var w = 0, cuantas = Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 2) - 2)); w < cuantas; w++) {
      var mano = new Worker(fuente); mano.lleva = 0; manos.push(mano);
      mano.onmessage = (function (mano) { return function (ev) { mano.lleva--; enCurso--; var t = trozos.get(ev.data.llave); if (t && !t.hecho) recibe(t, ev.data); pide(); }; })(mano);
      mano.onerror = function () { manos = []; enCurso = 0; trozos.forEach(function (t) { if (!t.hecho) t.pedido = false; }); pide(); };
    }
  } catch (e) { manos = []; }

  // The clouds: a shell of dots over the land, one, two or three deep where the cloud is thick. Asked about once, a face at a time.
  var NX = [], nubesHechas = 0, NUBE = null, TECHO = RADIO * (1 + RELIEVE * 1.25);
  function nubla() {
    var cara = nubesHechas++, n = 150, umbral = 0.64 - 0.22 * NUBES;
    for (var j = 0; j < n; j++) for (var i = 0; i < n; i++) {
      hacia(cara, -1 + 2 * (i + suerte(i, j, 61, SEMILLA + cara)) / n, -1 + 2 * (j + suerte(i, j, 62, SEMILLA + cara)) / n); var c = capas(DX + OX, DY + OY, DZ + OZ, 3.4, 4, 0.55, SEMILLA + 71) - umbral; if (c <= 0) continue;
      var gruesa = Math.min(1, c / 0.16), dia = 0.3 + 0.7 * suave(DX * SOL[0] + DY * SOL[1] + DZ * SOL[2], -0.25, 0.3), talla = 5 + 5 * gruesa;
      NX.push(DX * TECHO, DY * TECHO, DZ * TECHO, talla, (0.45 + 0.3 * gruesa) * dia);
      if (gruesa > 0.3) NX.push(DX * (TECHO + 8), DY * (TECHO + 8), DZ * (TECHO + 8), talla * 0.85, (0.6 + 0.4 * gruesa) * dia);
      if (gruesa > 0.6) NX.push(DX * (TECHO + 16), DY * (TECHO + 16), DZ * (TECHO + 16), talla * 0.7, (0.75 + 0.25 * gruesa) * dia);
      if (gruesa > 0.75) NX.push(DX * (TECHO - 8), DY * (TECHO - 8), DZ * (TECHO - 8), talla * 0.7, 0.34 * dia);
    }
    if (nubesHechas === 6) { NUBE = new Float32Array(NX); NX = null; }
  }
  // The stars: a few hundred, far away.
  var ESTRELLAS = new Float32Array(420 * 4); (function () { var a = new Azar(M.semilla + '|cielo'); for (var i = 0; i < 420; i++) { var z = a.uno() * 2 - 1, g = a.uno() * 6.2832, r = raiz2(1 - z * z); ESTRELLAS[i * 4] = r * Math.cos(g); ESTRELLAS[i * 4 + 1] = z; ESTRELLAS[i * 4 + 2] = r * Math.sin(g); ESTRELLAS[i * 4 + 3] = a.uno(); } })();

  // ── The page ────────────────────────────────────────────────────────────────────────────────────────────────────
  // The dots are drawn by the machine's own drawing hand (WebGL): every piece is handed to it once, and each frame it
  // is only told where the eye is. First the ground alone, in the page's own color, as what hides what is behind it
  // (and the word, which is behind the picture); then the dots, each a round point as flat as its place is seen.
  var gl = lienzo.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'high-performance' });
  if (!gl) { if (estado) estado.textContent = 'Este navegador no puede dibujar el planeta.'; return; }
  var REVUELVE = [
    'uniform vec3 uEstela[8]; uniform float uAlcance, uReloj;',
    // (where the pointer has just been, the dots come apart: pushed away, each its own way, and falling; they come back as it fades)
    'vec2 revuelve(vec2 pix, vec2 azar, out float cuanto) {',
    '  vec2 o = vec2(0.0); cuanto = 0.0; if (uAlcance <= 0.0) return o;',
    '  for (int j = 0; j < 8; j++) { vec3 e = uEstela[j]; if (e.z <= 0.001) continue; vec2 v = pix - e.xy; float dd = length(v); if (dd >= uAlcance) continue;',
    '    float c = 1.0 - dd / uAlcance; c = c * c * e.z;',
    '    o += (v / (dd + 1.0) * 0.5 + azar * 0.7 + vec2(sin(uReloj * 2.1 + azar.x * 37.0), cos(uReloj * 1.7 + azar.y * 41.0)) * 0.22) * c * uAlcance; o.y -= c * c * uAlcance * 0.35; cuanto += c; }',
    '  return o; }'].join('\n');
  var VISTA = 'uniform vec3 uOjo, uDer, uArr, uAde; uniform vec2 uFoco, uLienzo; uniform float uFocoPx, uCerca, uTam, uLuz, uClaro, uGrande; uniform vec3 uTinta[3]; uniform vec3 uFondo;\n';
  var programa = function (vs, fs, guarda) {
    var p = gl.createProgram(), hace1 = function (tipo, texto) { var s = gl.createShader(tipo); gl.shaderSource(s, '#version 300 es\nprecision highp float;\n' + texto); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); gl.attachShader(p, s); };
    hace1(gl.VERTEX_SHADER, vs); hace1(gl.FRAGMENT_SHADER, fs); if (guarda) gl.transformFeedbackVaryings(p, guarda, gl.INTERLEAVED_ATTRIBS); gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    var u = { p: p }; for (var i = 0, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS); i < n; i++) { var nombre = gl.getActiveUniform(p, i).name.replace(/\[0\]$/, ''); u[nombre] = gl.getUniformLocation(p, nombre); } return u;
  };
  // The ground of a piece and its dots.
  var G = programa(VISTA + [
    'layout(location=0) in vec3 aPos; layout(location=1) in vec3 aNor; layout(location=2) in float aBan; layout(location=3) in vec4 aDat; layout(location=4) in vec4 aOff; layout(location=5) in vec4 aVel;',
    'uniform vec4 uTrozo, uNivel; uniform float uTope, uPaso, uPolvo, uVuelo, uCrece, uVivo, uEsc;',
    'out vec3 vColor; out float vLejos, vChato;',
    'void main() {',
    '  vec3 casa = uTrozo.xyz + aPos * uTrozo.w - uOjo, d = casa; float l = length(casa), hondo = dot(d, uAde), z = log2(max(hondo, 0.001) / 0.3) / 18.0 * 2.0 - 1.0; vLejos = l; vChato = 1.0; vColor = uFondo;',
    '  if (uPaso < 0.5) { gl_Position = vec4(vec2(dot(d, uDer), dot(d, uArr)) * uFoco, (z + 0.004) * hondo, hondo); return; }',
    '  gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 1.0; if (aBan > 3.5 || l >= uNivel.y || l < uNivel.x) return;',
    // (a piece that is alive: each dot is where its own weight has it, and going fast it is drawn out behind itself)
    '  float cola = 0.0, ag = 0.0;',
    '  if (uVivo > 0.5) { d += aOff.xyz; ag = aVel.w; cola = float(gl_VertexID); hondo = dot(d, uAde);',
    '    if (cola > 0.5) { float rap = length(vec2(dot(aVel.xyz, uDer), dot(aVel.xyz, uArr))) / max(hondo, 0.5) * uFocoPx; if (rap < 50.0 * uEsc || ag < 0.3) return; d -= aVel.xyz * 0.045 * min(1.0, 22.0 * uEsc / (rap * 0.045)) * cola / 3.0; hondo = dot(d, uAde); }',
    '    z = log2(max(hondo, 0.001) / 0.3) / 18.0 * 2.0 - 1.0; }',
    '  if (hondo < uCerca) return;',
    '  float par = mod(aBan, 2.0), mar = step(1.5, aBan), talla = 1.0;',
    // (toward the far edge of its level, one of every two grows to the next level's size and the rest go)
    '  if (uTope < 0.5 && l > uNivel.z) { float m = smoothstep(uNivel.z, uNivel.y, l); talla = par > 0.5 ? 1.0 + m : 1.0 - m; if (talla < 0.04) return; }',
    '  if (hondo < uCerca * 3.0) talla *= 0.35 + 0.65 * (hondo - uCerca) / (uCerca * 2.0);',
    '  float tono = aDat.y / 255.0; if (uClaro > 0.5) tono = 1.0 - 0.6 * tono; vColor = mix(uFondo, uTinta[int(aDat.x + 0.5)], 1.0 - uLuz + uLuz * tono);',
    '  float lado = uNivel.w * uFocoPx / hondo, tam = min(uGrande, lado * talla * uCrece * 0.4 * uTam * (mar > 0.5 ? 0.8 : 1.0)) * (1.0 - 0.2 * cola);',
    '  vChato = uPolvo > 0.02 ? 1.0 : mix(min(1.0, 0.5 + 1.6 * abs(dot(casa, aNor)) / l), 1.0, min(1.0, ag * 3.0));',
    '  vec2 azar = (aDat.zw - 127.5) / 127.5, pix = (vec2(dot(d, uDer), dot(d, uArr)) / hondo * uFoco * 0.5 + 0.5) * uLienzo + azar * uVuelo;',
    '  gl_Position = vec4(pix / uLienzo * 2.0 - 1.0, z - min(ag, 1.0) * 0.2, 1.0); gl_PointSize = max(tam, 1.0);',
    '}'].join('\n'),
    ['uniform float uPaso; uniform vec4 uNivel; uniform vec3 uFondo; in vec3 vColor; in float vLejos, vChato; out vec4 sale;',
    'void main() {',
    '  if (uPaso < 0.5) { if (vLejos < uNivel.x * 0.96 || vLejos >= uNivel.y * 1.04) discard; sale = vec4(uFondo, 1.0); return; }',
    '  vec2 q = gl_PointCoord - 0.5; q.y /= vChato; if (dot(q, q) > 0.25) discard; sale = vec4(vColor, 1.0);',
    '}'].join('\n'));
  // The life of a piece's dots: where each is from its place and how fast it goes, worked out from where it was the
  // frame before and kept. It is the scanned thing's own (site/escaneo.js): a dot is drawn to its place by a spring,
  // slack while it is stirred; carried by currents as much as it is stirred; and dragged and turned by the pointer as
  // it passes near. Here it is in the world, not on the page: a dot keeps its weight as one walks past it.
  var T = programa([
    'layout(location=0) in vec3 aPos; layout(location=2) in float aBan; layout(location=3) in vec4 aDat; layout(location=4) in vec4 aOff; layout(location=5) in vec4 aVel;',
    'uniform vec4 uTrozo, uMano; uniform vec3 uOjo, uDer, uArr, uAde, uManoV; uniform vec2 uFoco, uLienzo; uniform float uFocoPx, uEsc, uAlcance, uDt, uReloj, uViva;',
    'out vec4 vOff; out vec4 vVel;',
    'void main() {',
    '  vec3 q = uTrozo.xyz + aPos * uTrozo.w + aOff.xyz - uOjo, vel = aVel.xyz; float hondo = max(dot(q, uAde), 0.5), mpp = hondo / uFocoPx, ag = aVel.w;',
    '  vec2 pix = (vec2(dot(q, uDer), dot(q, uArr)) / hondo * uFoco * 0.5 + 0.5) * uLienzo;',
    '  if (uManoV.z > 0.0) { vec2 m = uMano.zw - uMano.xy, u = pix - uMano.xy; float t = clamp(dot(u, m) / max(dot(m, m), 1.0), 0.0, 1.0); vec2 e = u - t * m; float d2 = dot(e, e);',
    '    if (d2 < uAlcance * uAlcance) { float c = 1.0 - sqrt(d2) / uAlcance; c *= c; vec2 empuje = (uManoV.xy * 0.55 + vec2(-e.y, e.x) * length(uManoV.xy) * 0.012) * c * uDt * 9.0; vel += (uDer * empuje.x + uArr * empuje.y) * mpp; ag = min(1.0, ag + c * uManoV.z * uDt * 9.0); } }',
    '  vec2 azar = (aDat.zw - 127.5) / 127.5, p = pix / uEsc; float th = 3.1 * sin(p.x * 0.0058 + uReloj * 0.55 + sin(p.y * 0.0041 + azar.x * 6.0)) + 2.7 * cos(p.y * 0.0066 - uReloj * 0.43 + azar.y * 2.0), K = 46.0 * (1.0 - 0.93 * ag) + 1.5;',
    '  vec2 corriente = vec2(cos(th), sin(th)) * 330.0 * uEsc * ag * uViva;',
    '  vel += (-aOff.xyz * K + (uDer * corriente.x + uArr * corriente.y) * mpp) * uDt; vel *= exp(-uDt * 4.2); vec3 off = aOff.xyz + vel * uDt; ag *= exp(-uDt * 0.95);',
    '  if (aBan > 3.5) { off = vec3(0.0); vel = vec3(0.0); ag = 0.0; }',
    '  vOff = vec4(off, 0.0); vVel = vec4(vel, ag);',
    '}'].join('\n'), 'out vec4 sale; void main() { sale = vec4(0.0); }', ['vOff', 'vVel']);
  var vivos = new Map(), mano = { x: 0, y: 0, ax: 0, ay: 0, vx: 0, vy: 0, cuando: 0, dentro: false };
  // (how fast the pointer goes: from where it was the last time it was heard of, eased so that one jump does not throw everything)
  function tienta(x, y) { var t = performance.now(), ms = Math.max(8, t - (mano.cuando || t - 16)); if (!mano.dentro) { mano.ax = x; mano.ay = y; mano.vx = mano.vy = 0; } else { mano.vx += ((x - mano.x) / ms * 1000 - mano.vx) * 0.5; mano.vy += ((y - mano.y) / ms * 1000 - mano.vy) * 0.5; } mano.x = x; mano.y = y; mano.cuando = t; mano.dentro = true; }
  function aviva(t, ahora) {
    t.tocado = ahora; if (t.e0 || vivos.size >= 96) return;
    var estado = function () { var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, NV * 32, gl.DYNAMIC_COPY); return b; }, suyo = function (cada) { gl.bindBuffer(gl.ARRAY_BUFFER, t.e0); for (var a = 4; a < 6; a++) { gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 4, gl.FLOAT, false, 32, (a - 4) * 16); if (cada) gl.vertexAttribDivisor(a, 1); } };
    t.e0 = estado(); t.e1 = estado(); t.cual = 0;
    t.vsim = gl.createVertexArray(); gl.bindVertexArray(t.vsim); gl.bindBuffer(gl.ARRAY_BUFFER, t.vb); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.SHORT, false, 16, 0); gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 1, gl.UNSIGNED_BYTE, false, 16, 9); gl.enableVertexAttribArray(3); gl.vertexAttribPointer(3, 4, gl.UNSIGNED_BYTE, false, 16, 10); suyo(false);
    // (drawn, each dot is four: itself and what it leaves behind when it goes fast)
    t.vvivo = gl.createVertexArray(); gl.bindVertexArray(t.vvivo); gl.bindBuffer(gl.ARRAY_BUFFER, t.vb); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.SHORT, false, 16, 0); gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.BYTE, true, 16, 6); gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 1, gl.UNSIGNED_BYTE, false, 16, 9); gl.enableVertexAttribArray(3); gl.vertexAttribPointer(3, 4, gl.UNSIGNED_BYTE, false, 16, 10); for (var a = 0; a < 4; a++) gl.vertexAttribDivisor(a, 1); suyo(true);
    gl.bindVertexArray(null); gl.bindBuffer(gl.ARRAY_BUFFER, null); vivos.set(t.llave, t);
  }
  function apaga(t) { if (!t.e0) return; gl.deleteBuffer(t.e0); gl.deleteBuffer(t.e1); gl.deleteVertexArray(t.vsim); gl.deleteVertexArray(t.vvivo); t.e0 = t.e1 = t.vsim = t.vvivo = null; vivos.delete(t.llave); }
  // What is loose: the trees and stones, the clouds, the specks in the air, and the stars.
  var S = programa(VISTA + REVUELVE + [
    'layout(location=0) in vec3 aPos; layout(location=1) in vec3 aDat;',
    'uniform mat3 uGiro; uniform float uModo, uSuave, uCrece, uEscalaPx, uNoche; uniform vec2 uFunde; out vec3 vColor;',
    'void main() {',
    '  vec3 d; float hondo, z, tam, tono = aDat.z;',
    '  if (uModo > 0.5) { d = aPos; hondo = dot(d, uAde); z = 0.9999; tam = aDat.x * uEscalaPx; tono *= uNoche; if (hondo < 0.2) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 1.0; return; } }',
    '  else { d = uGiro * aPos - uOjo; hondo = dot(d, uAde); z = log2(max(hondo, 0.001) / 0.3) / 18.0 * 2.0 - 1.0; tam = aDat.x * uFocoPx / max(hondo, 0.001) * uTam * uCrece * (1.0 - smoothstep(uFunde.x, uFunde.y, hondo)); if (uSuave > 0.0) tam *= min(1.0, hondo / uSuave + 0.25);',
    '    if (hondo < uCerca || tam < 0.4) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 1.0; return; } tam = min(max(tam, 1.0), uGrande * 0.6); if (uClaro > 0.5) tono = 1.0 - 0.6 * tono; tono = 1.0 - uLuz + uLuz * tono; }',
    '  vColor = mix(uFondo, uTinta[int(aDat.y + 0.5)], tono);',
    '  vec2 azar = fract(aPos.xy * vec2(12.9898, 78.233)) * 2.0 - 1.0, pix = (vec2(dot(d, uDer), dot(d, uArr)) / hondo * uFoco * 0.5 + 0.5) * uLienzo; float cuanto; pix += revuelve(pix, azar, cuanto);',
    '  gl_Position = vec4(pix / uLienzo * 2.0 - 1.0, z - min(cuanto, 1.0) * 0.2, 1.0); gl_PointSize = tam;',
    '}'].join('\n'),
    'in vec3 vColor; out vec4 sale; void main() { vec2 q = gl_PointCoord - 0.5; if (dot(q, q) > 0.25) discard; sale = vec4(vColor, 1.0); }');
  // (the ground of every piece is the same net of triangles over its places)
  var red = gl.createBuffer(), NI = TROZO * TROZO * 6; (function () { var I = new Uint16Array(NI), k = 0; for (var j = 0; j < TROZO; j++) for (var i = 0; i < TROZO; i++) { var a = j * LD + i; I[k++] = a; I[k++] = a + 1; I[k++] = a + LD; I[k++] = a + 1; I[k++] = a + LD + 1; I[k++] = a + LD; } gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, red); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, I, gl.STATIC_DRAW); })();
  function sueltos(datos, uso) { var b = gl.createBuffer(), v = gl.createVertexArray(); gl.bindVertexArray(v); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, datos, uso || gl.STATIC_DRAW); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0); gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12); gl.bindVertexArray(null); return { b: b, v: v, n: datos.length / 6 }; }
  // A piece comes back from being asked about: it is handed to the drawing, and from then on it is only shown.
  function recibe(t, d) {
    t.vb = gl.createBuffer(); t.vao = gl.createVertexArray(); gl.bindVertexArray(t.vao); gl.bindBuffer(gl.ARRAY_BUFFER, t.vb); gl.bufferData(gl.ARRAY_BUFFER, d.V, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.SHORT, false, 16, 0); gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.BYTE, true, 16, 6); gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 1, gl.UNSIGNED_BYTE, false, 16, 9); gl.enableVertexAttribArray(3); gl.vertexAttribPointer(3, 4, gl.UNSIGNED_BYTE, false, 16, 10);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, red); gl.bindVertexArray(null);
    if (d.Q) { var q = sueltos(d.Q); t.qb = q.b; t.qvao = q.v; t.cosas = q.n; }
    t.M = d.M; t.hecho = true; t.pedido = false; t.nace = performance.now(); hechos++;
  }
  function suelta(t) { apaga(t); if (t.vb) { gl.deleteBuffer(t.vb); gl.deleteVertexArray(t.vao); } if (t.qb) { gl.deleteBuffer(t.qb); gl.deleteVertexArray(t.qvao); } }
  var estrellas = (function () { var D = new Float32Array(420 * 6); for (var i = 0; i < 420; i++) { D[i * 6] = ESTRELLAS[i * 4]; D[i * 6 + 1] = ESTRELLAS[i * 4 + 1]; D[i * 6 + 2] = ESTRELLAS[i * 4 + 2]; D[i * 6 + 3] = 1 + ESTRELLAS[i * 4 + 3] * 1.6; D[i * 6 + 4] = 1; D[i * 6 + 5] = 0.15 + 0.6 * ESTRELLAS[i * 4 + 3]; } return sueltos(D); })();
  var nubes = null, MOTA = new Float32Array(1331 * 6), motas = sueltos(MOTA, gl.DYNAMIC_DRAW);

  var W = 0, H = 0, escala = 1, foco = 1, claro = false, FONDO = [0, 0, 0], TINTAS = new Float32Array(9), ENTRADA = 1.6, pedido = 0, antes = 0, reloj = 0, anchoPalabra = 0, altoPalabra = 0, van = 0, visibles = [];
  escena.classList.add('mundo--vivo');
  if (palabra && window.AlmaPalabra) window.AlmaPalabra.monta(palabra, { genes: window.__PALABRA, oye: escena, mide: false });
  var prueba = document.createElement('canvas'); prueba.width = prueba.height = 1; var gota = prueba.getContext('2d', { willReadFrequently: true });
  function color(css) { gota.clearRect(0, 0, 1, 1); gota.fillStyle = css; gota.fillRect(0, 0, 1, 1); return gota.getImageData(0, 0, 1, 1).data; }
  function viste() {
    claro = /light/.test(document.documentElement.getAttribute('data-theme') || '');
    var lento = getComputedStyle(escena).getPropertyValue('--duration-slow-02').trim(), ls = parseFloat(lento); if (isFinite(ls) && ls > 0) ENTRADA = 2 * (/ms$/.test(lento) ? ls / 1000 : ls); if (window.AlmaPartitura) ENTRADA = window.AlmaPartitura.tiempos(escena).armarse.mundo;
    var f = color(getComputedStyle(document.body).backgroundColor), e = getComputedStyle(escena); FONDO = [f[0] / 255, f[1] / 255, f[2] / 255];
    for (var t = 0; t < 3; t++) { var k = color(e.getPropertyValue('--escaneo-' + (t + 1)).trim()); TINTAS[t * 3] = k[0] / 255; TINTAS[t * 3 + 1] = k[1] / 255; TINTAS[t * 3 + 2] = k[2] / 255; }
  }
  function mide() {
    var caja = lienzo.getBoundingClientRect(), w = Math.max(1, caja.width), h = Math.max(1, caja.height); escala = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(w * escala)); H = Math.max(1, Math.round(h * escala)); if (lienzo.width !== W || lienzo.height !== H) { lienzo.width = W; lienzo.height = H; } foco = 0.9 * Math.min(H, W * 1.15);
    if (palabra) { palabra.style.transform = 'none'; anchoPalabra = palabra.offsetWidth; altoPalabra = palabra.offsetHeight; }
    viste(); pide();
  }
  function pide() { if (pedido) return; pedido = window.AlmaReloj ? window.AlmaReloj.pide(cuadro) : requestAnimationFrame(cuadro); }
  // (if the machine takes its drawing hand away and gives it back, every piece is asked about again)
  lienzo.addEventListener('webglcontextlost', function (ev) { ev.preventDefault(); });
  lienzo.addEventListener('webglcontextrestored', function () { location.reload(); });

  // Whoever walks: where on the planet (a direction from its middle), which way they face, and how high they are.
  // (one arrives facing the most open way of sixteen: where the ground ahead is lowest against the sky, so that what stands there is seen)
  var P = LLEGADA.slice(), F = (function () {
    var x = SOL[0], y = SOL[1], z = SOL[2], d = x * P[0] + y * P[1] + z * P[2]; x -= P[0] * d; y -= P[1] * d; z -= P[2] * d; var l = raiz2(x * x + y * y + z * z) || 1; x /= -l; y /= -l; z /= -l;
    var kx = P[1] * z - P[2] * y, ky = P[2] * x - P[0] * z, kz = P[0] * y - P[1] * x, aqui = suelo(P[0], P[1], P[2]), mejor = [x, y, z], menor = 1e9;
    for (var g = 0; g < 16; g++) {
      var c = Math.cos(g * 0.3927), s = Math.sin(g * 0.3927), hx = x * c + kx * s, hy = y * c + ky * s, hz = z * c + kz * s, sube0 = -1;
      for (var m = 15; m <= 255; m += 30) { var qx = P[0] + hx * m / RADIO, qy = P[1] + hy * m / RADIO, qz = P[2] + hz * m / RADIO, ql = raiz2(qx * qx + qy * qy + qz * qz); sube0 = Math.max(sube0, (suelo(qx / ql, qy / ql, qz / ql) - aqui) / m); }
      if (sube0 < menor - 0.01) { menor = sube0; mejor = [hx, hy, hz]; }
    }
    return mejor;
  })();
  var OJOS = 1.7, enVuelo = false, altura = OJOS, quiereAltura = OJOS, piso0 = suelo(P[0], P[1], P[2]), radioDelOjo = piso0 + OJOS, giro = 0, alza = 0, quiereGiro = 0, quiereAlza = 0, teclas = {}, andado = 0, dicho = '';
  // (the word stands on the land one arrives at, ahead and above, as tall as a hill)
  var ANCLA = (function () { var d = 150 / RADIO, x = P[0] + F[0] * d, y = P[1] + F[1] * d, z = P[2] + F[2] * d, l = raiz2(x * x + y * y + z * z); x /= l; y /= l; z /= l; var r = suelo(x, y, z) + 46; return [x * r, y * r, z * r]; })();
  function pasa(paso) {
    var x = P[0] + F[0] * paso, y = P[1] + F[1] * paso, z = P[2] + F[2] * paso, l = raiz2(x * x + y * y + z * z); x /= l; y /= l; z /= l;
    // (on foot, the water is where one stops)
    if (enVuelo || RADIO * (1 + sube(x, y, z)) >= RMAR + 0.4) { P = [x, y, z]; andado += Math.abs(paso) * radioDelOjo; }
  }
  function tuerce(g) { var c = Math.cos(g), s = Math.sin(g), kx = P[1] * F[2] - P[2] * F[1], ky = P[2] * F[0] - P[0] * F[2], kz = P[0] * F[1] - P[1] * F[0]; F = [F[0] * c + kx * s, F[1] * c + ky * s, F[2] * c + kz * s]; }
  function mueve(dt) {
    var ade = (teclas.adelante ? 1 : 0) - (teclas.atras ? 1 : 0), gira = (teclas.izquierda ? 1 : 0) - (teclas.derecha ? 1 : 0), sube0 = (teclas.subir ? 1 : 0) - (teclas.bajar ? 1 : 0), prisa = teclas.prisa ? 3 : 1, alto = radioDelOjo - piso0;
    if (gira) tuerce(gira * 1.3 * dt);
    if (ade) pasa(ade * (enVuelo ? Math.max(9, alto * 0.9) : 4.2) * prisa * dt / radioDelOjo);
    var d = F[0] * P[0] + F[1] * P[1] + F[2] * P[2], fx = F[0] - P[0] * d, fy = F[1] - P[1] * d, fz = F[2] - P[2] * d, fl = raiz2(fx * fx + fy * fy + fz * fz) || 1; F = [fx / fl, fy / fl, fz / fl];
    if (enVuelo && sube0) quiereAltura = Math.min(RADIO * 4, Math.max(3, quiereAltura + sube0 * (quiereAltura * 0.9 + 4) * prisa * dt));
    piso0 = suelo(P[0], P[1], P[2]); altura += (quiereAltura - altura) * (menos.matches ? 1 : 1 - Math.exp(-dt * 3)); var meta = piso0 + altura;
    radioDelOjo = menos.matches ? meta : radioDelOjo + (meta - radioDelOjo) * (1 - Math.exp(-dt * 10));
    return !!(ade || gira || sube0) || Math.abs(quiereAltura - altura) > 0.02 || Math.abs(meta - radioDelOjo) > 0.01;
  }
  function vuela(si) { enVuelo = si; quiereAltura = si ? Math.max(40, altura) : OJOS; escena.classList.toggle('mundo--en-vuelo', si); for (var i = 0; i < mandos.length; i++) if (mandos[i].getAttribute('data-mando') === 'volar') mandos[i].setAttribute('aria-pressed', si ? 'true' : 'false'); pide(); }

  // Where the pointer has just been: a few places, each fading, that what is loose comes apart around.
  var ESTELA = new Float32Array(24), ultima = 0;
  function remueve(x, y, cuanto) {
    var o = ultima * 3, lejos = Math.hypot(x - ESTELA[o], y - ESTELA[o + 1]); if (ESTELA[o + 2] < 0.02 || lejos > H * 0.16 * ALCANCE * 0.3) { ultima = (ultima + 1) % 8; o = ultima * 3; ESTELA[o + 2] = 0; }
    ESTELA[o] = x; ESTELA[o + 1] = y; ESTELA[o + 2] = Math.min(1, ESTELA[o + 2] + cuanto);
  }
  function vista(u, c) {
    gl.useProgram(u.p); gl.uniform3f(u.uOjo, c.ox, c.oy, c.oz); gl.uniform3f(u.uDer, c.rx, c.ry, c.rz); gl.uniform3f(u.uArr, c.ux, c.uy, c.uz); gl.uniform3f(u.uAde, c.fx, c.fy, c.fz); gl.uniform2f(u.uFoco, foco / (W / 2), foco / (H / 2)); gl.uniform2f(u.uLienzo, W, H);
    gl.uniform1f(u.uFocoPx, foco); gl.uniform1f(u.uCerca, c.CERCA); gl.uniform1f(u.uTam, TAM); gl.uniform1f(u.uLuz, LUZ); gl.uniform1f(u.uClaro, claro ? 1 : 0); gl.uniform1f(u.uGrande, H * 0.03 * TAM); gl.uniform3fv(u.uTinta, TINTAS); gl.uniform3f(u.uFondo, FONDO[0], FONDO[1], FONDO[2]);
    gl.uniform3fv(u.uEstela, ESTELA); gl.uniform1f(u.uAlcance, c.quieto ? 0 : H * 0.16 * ALCANCE); gl.uniform1f(u.uReloj, CONT ? 0 : reloj);
  }

  // ── The frame ───────────────────────────────────────────────────────────────────────────────────────────────────
  // Whatever happens in the world each frame is on one list, in the order it happens. Each thing on it is told the
  // frame (how long since the last, where the eye is, what the pointer does) and answers whether it needs another:
  // when none does, nothing is drawn until something changes. To add a thing to the world is to add it to the list;
  // what it gets back takes it off again.
  var marcha = [], C = { dt: 0, ahora: 0, quieto: false, ambiente: false, pendientes: 0, suelto: false };
  function cada(nombre, paso) { var p = { nombre: nombre, paso: paso }; marcha.push(p); return function () { var i = marcha.indexOf(p); if (i >= 0) marcha.splice(i, 1); }; }
  // (what only drifts, the clouds and the specks, does not keep the page awake by itself: a while after the last
  // sign of whoever looks, it rests, and takes up again at the next one. The sign is the clock's to keep, when the
  // page has it: site/reloj.js)
  var sena = performance.now(), DESCANSO = 12000;
  ['pointermove', 'pointerdown', 'keydown', 'wheel', 'input', 'focusin'].forEach(function (que) { window.addEventListener(que, function () { sena = performance.now(); }, { capture: true, passive: true }); });
  // How much of what is asked for the machine holds: the amount of dots is brought down when frames are being lost,
  // and back up, a little at a time, when they are not. What whoever looks sets with the slider is the most there is.
  var CALIDAD = 1, techo = 1, techoHasta = 0, cuenta0 = 0, suma0 = 0, holgadas = 0, lentas = 0, anterior = 0, hechos0 = 0;
  function alcanza() { CERCANO = PASO * DENSA * CALIDAD; }
  function cuadro(ahora) {
    pedido = 0; var empieza = performance.now(), c = C; c.crudo = antes ? ahora - antes : 16; c.dt = Math.min(0.05, c.crudo / 1000); c.ahora = ahora; c.quieto = menos.matches; c.ambiente = false; c.suelto = false; antes = ahora; cuadro0++; reloj += c.dt;
    for (var i = 0, sigue = false; i < marcha.length; i++) if (marcha[i].paso(c)) sigue = true;
    hito.ms = performance.now() - empieza; hito.descansa = !sigue && !(c.ambiente && !document.hidden && ahora - (window.AlmaReloj ? window.AlmaReloj.sena : sena) < DESCANSO);
    if (!hito.descansa) pide(); else antes = 0;
  }

  cada('quien camina', function (c) {
    var sigue = mueve(c.dt), dt = c.dt;
    if (c.quieto) { giro = quiereGiro; alza = quiereAlza; } else { giro += (quiereGiro - giro) * (1 - Math.exp(-dt * 5)); alza += (quiereAlza - alza) * (1 - Math.exp(-dt * 5)); if (Math.abs(quiereGiro - giro) > 0.001 || Math.abs(quiereAlza - alza) > 0.001) sigue = true; }
    for (var e = 0; e < 8; e++) { ESTELA[e * 3 + 2] *= Math.exp(-dt / 1.5); if (ESTELA[e * 3 + 2] > 0.004) sigue = true; else ESTELA[e * 3 + 2] = 0; }
    return sigue;
  });

  // The eye: at its height over the place, looking ahead and a little down; from high up, down at the planet.
  cada('el ojo', function (c) {
    c.ox = P[0] * radioDelOjo; c.oy = P[1] * radioDelOjo; c.oz = P[2] * radioDelOjo; c.alto = radioDelOjo - piso0; var caida = Math.acos(Math.min(1, RADIO / radioDelOjo)), baja = 0.07 + caida * 0.9 + (1.5708 - caida * 0.9 - 0.07) * suave(c.alto, RADIO * 0.25, RADIO * 1.6) + alza;
    var cg = Math.cos(giro), sg = Math.sin(giro), rx0 = F[1] * P[2] - F[2] * P[1], ry0 = F[2] * P[0] - F[0] * P[2], rz0 = F[0] * P[1] - F[1] * P[0], hx = F[0] * cg + rx0 * sg, hy = F[1] * cg + ry0 * sg, hz = F[2] * cg + rz0 * sg, cb = Math.cos(baja), sb = Math.sin(baja);
    c.rx = hy * P[2] - hz * P[1]; c.ry = hz * P[0] - hx * P[2]; c.rz = hx * P[1] - hy * P[0]; c.fx = hx * cb - P[0] * sb; c.fy = hy * cb - P[1] * sb; c.fz = hz * cb - P[2] * sb; c.ux = P[0] * cb + hx * sb; c.uy = P[1] * cb + hy * sb; c.uz = P[2] * cb + hz * sb;
    c.CERCA = Math.max(0.5, Math.min(60, c.alto * 0.05)); c.ancho = W / 2 / foco; c.largo = H / 2 / foco; var cima = RADIO * (1 + RELIEVE) + 20; c.horizonte = Math.acos(Math.min(1, RMAR * 0.985 / radioDelOjo)) + Math.acos(Math.min(1, RMAR * 0.985 / cima)); c.cosHorizonte = Math.cos(Math.min(3.1416, c.horizonte));
    c.rapidez = Math.hypot(mano.vx, mano.vy); c.alcanceM = H * 0.16 * ALCANCE; c.caliente = !c.quieto && REACCION > 0 && mano.dentro && c.ahora - mano.cuando < 250 && c.rapidez > 15 * escala;
  });

  // The ground: of each level, the pieces within its reach and in sight. Those not asked about yet wait their turn.
  cada('el suelo a la vista', function (c) {
    var ox = c.ox, oy = c.oy, oz = c.oz, rx = c.rx, ry = c.ry, rz = c.rz, ux = c.ux, uy = c.uy, uz = c.uz, fx = c.fx, fy = c.fy, fz = c.fz, CERCA = c.CERCA, ancho = c.ancho, largo = c.largo, t, x, y, z, sigue = false; van = 0; visibles.length = 0; c.pendientes = 0;
    for (var nivel = TOPE; nivel >= 0; nivel--) {
      var n = N0 >> nivel, cuantos = n / TROZO, hasta = nivel === TOPE ? 1e9 : CERCANO * (1 << nivel), desde = nivel ? CERCANO * (1 << (nivel - 1)) : 0, hasta2 = hasta * hasta, desde2 = desde * desde, alcance = hasta * 1.18, tam = PASO * (1 << nivel);
      if (c.alto - RADIO * RELIEVE > alcance) continue;
      for (var cara = 0; cara < 6; cara++) {
        var A = EJE[cara], pa = P[0] * A[0] + P[1] * A[1] + P[2] * A[2], c0 = 0, c1 = cuantos - 1, d0 = 0, d1 = cuantos - 1;
        if (cuantos > 8) {
          // (only the pieces around where one is, on the faces one is on or next to)
          if (pa < 0.2) continue; var U = LADO[cara], V = ALTO[cara], ia = (Math.atan((P[0] * U[0] + P[1] * U[1] + P[2] * U[2]) / pa) / 0.7853981634 + 1) / 2 * n, ib = (Math.atan((P[0] * V[0] + P[1] * V[1] + P[2] * V[2]) / pa) / 0.7853981634 + 1) / 2 * n, vuelta = alcance / (tam * 0.62) + TROZO;
          c0 = Math.max(0, piso((ia - vuelta) / TROZO)); c1 = Math.min(cuantos - 1, piso((ia + vuelta) / TROZO)); d0 = Math.max(0, piso((ib - vuelta) / TROZO)); d1 = Math.min(cuantos - 1, piso((ib + vuelta) / TROZO));
        }
        for (var cj = d0; cj <= d1; cj++) for (var ci = c0; ci <= c1; ci++) {
          t = trozo(cara, nivel, ci, cj); var tx = t.cx - ox, ty = t.cy - oy, tz = t.cz - oz, tl = raiz2(tx * tx + ty * ty + tz * tz);
          if (tl - t.radio > alcance || tl + t.radio < desde * 0.9) continue;
          if ((t.cx * P[0] + t.cy * P[1] + t.cz * P[2]) / RADIO < Math.cos(Math.min(3.1416, c.horizonte + t.radio / RADIO))) continue;
          var th = tx * fx + ty * fy + tz * fz; if (th + t.radio < CERCA) continue; var orilla = Math.max(0, th) + t.radio;
          if (Math.abs(tx * rx + ty * ry + tz * rz) > orilla * ancho + t.radio * 1.5 || Math.abs(tx * ux + ty * uy + tz * uz) > orilla * largo + t.radio * 1.5) continue;
          t.visto = cuadro0; if (!t.hecho) { if (!t.pedido) { t.pedido = true; cola.push(t); } t.lejos = tl - nivel * 1e6; c.pendientes++; continue; }
          // (a piece that has just arrived is dust that settles; a contained entity's simply grows into place)
          var edad = (c.ahora - t.nace) / 1000 / ENTRADA, suelto = c.quieto || edad >= 1 ? 0 : 1 - edad; t.polvo = suelto * suelto * (3 - 2 * suelto); if (t.polvo > 0) sigue = true; t.cerca = tl; visibles.push(t);
          // (how many of its dots are in the view, counted by a few of them; and whether the pointer, passing,
          // reaches it: then its dots have a life of their own for a while)
          for (var M4 = t.M, m = 0, tocado = false; m < 48; m += 3) {
            x = M4[m] - ox; y = M4[m + 1] - oy; z = M4[m + 2] - oz; var l2 = x * x + y * y + z * z; if (l2 >= hasta2 || l2 < desde2) continue; var mh = x * fx + y * fy + z * fz; if (mh <= CERCA) continue;
            var sx = (x * rx + y * ry + z * rz) / mh, sy = (x * ux + y * uy + z * uz) / mh; if (Math.abs(sx) < ancho && Math.abs(sy) < largo) van += 256;
            if (c.caliente && !tocado) { var qx = W / 2 + sx * foco - mano.x, qy = H / 2 + sy * foco - mano.y, holgura = c.alcanceM + tam * TROZO / 4 * foco / mh; if (qx * qx + qy * qy < holgura * holgura) tocado = true; }
          }
          if (tocado) aviva(t, c.ahora);
        }
      }
    }
    return sigue;
  });

  // The life of the pieces the pointer reached: a step of it, kept for the next frame. Six seconds after the last
  // touch a piece is at rest again, and is only shown.
  cada('la vida de las partículas', function (c) {
    if (vivos.size) {
      if (c.quieto) vivos.forEach(apaga);
      else {
        gl.useProgram(T.p); gl.uniform3f(T.uOjo, c.ox, c.oy, c.oz); gl.uniform3f(T.uDer, c.rx, c.ry, c.rz); gl.uniform3f(T.uArr, c.ux, c.uy, c.uz); gl.uniform3f(T.uAde, c.fx, c.fy, c.fz); gl.uniform2f(T.uFoco, foco / (W / 2), foco / (H / 2)); gl.uniform2f(T.uLienzo, W, H); gl.uniform1f(T.uFocoPx, foco); gl.uniform1f(T.uEsc, escala);
        gl.uniform4f(T.uMano, mano.ax, mano.ay, mano.x, mano.y); gl.uniform3f(T.uManoV, mano.vx, mano.vy, c.caliente ? Math.min(1, c.rapidez / (700 * escala)) * REACCION * (CONT ? 0.4 : 1) : 0); gl.uniform1f(T.uAlcance, c.alcanceM); gl.uniform1f(T.uDt, c.dt); gl.uniform1f(T.uReloj, reloj); gl.uniform1f(T.uViva, CONT ? 0 : 1);
        gl.enable(gl.RASTERIZER_DISCARD);
        vivos.forEach(function (v) {
          if (c.ahora - v.tocado > 6000) { apaga(v); return; } var de = v.cual ? v.e1 : v.e0, a = v.cual ? v.e0 : v.e1, pone = function () { gl.vertexAttribPointer(4, 4, gl.FLOAT, false, 32, 0); gl.vertexAttribPointer(5, 4, gl.FLOAT, false, 32, 16); };
          gl.uniform4f(T.uTrozo, v.cx, v.cy, v.cz, v.escala); gl.bindVertexArray(v.vsim); gl.bindBuffer(gl.ARRAY_BUFFER, de); pone(); gl.bindBuffer(gl.ARRAY_BUFFER, null);
          gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, a); gl.beginTransformFeedback(gl.POINTS); gl.drawArrays(gl.POINTS, 0, NV); gl.endTransformFeedback(); gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);
          gl.bindVertexArray(v.vvivo); gl.bindBuffer(gl.ARRAY_BUFFER, a); pone(); gl.bindBuffer(gl.ARRAY_BUFFER, null); v.cual ^= 1;
        });
        gl.disable(gl.RASTERIZER_DISCARD); gl.bindVertexArray(null);
      }
    }
    mano.ax = mano.x; mano.ay = mano.y; if (c.ahora - mano.cuando > 60) { mano.vx *= 0.7; mano.vy *= 0.7; }
    return vivos.size > 0;
  });

  // First the ground alone, as what it hides; then its dots.
  cada('el suelo', function (c) {
    gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clearDepth(1); gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL); gl.depthMask(true); gl.disable(gl.BLEND); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    vista(G, c);
    for (var paso = 0; paso < 2; paso++) {
      gl.uniform1f(G.uPaso, paso); gl.uniform1f(G.uVivo, 0); gl.uniform1f(G.uEsc, escala); var deNivel = -1;
      for (var i = 0; i < visibles.length; i++) {
        var t = visibles[i]; if (!paso && t.polvo > 0.02) continue;
        if (t.nivel !== deNivel) { deNivel = t.nivel; var h1 = deNivel === TOPE ? 1e9 : CERCANO * (1 << deNivel); gl.uniform4f(G.uNivel, deNivel ? CERCANO * (1 << (deNivel - 1)) : 0, h1, h1 * 0.72, PASO * (1 << deNivel)); gl.uniform1f(G.uTope, deNivel === TOPE ? 1 : 0); }
        gl.uniform4f(G.uTrozo, t.cx, t.cy, t.cz, t.escala); gl.bindVertexArray(t.vao);
        if (!paso) gl.drawElements(gl.TRIANGLES, NI, gl.UNSIGNED_SHORT, 0);
        else { gl.uniform1f(G.uPolvo, t.polvo); gl.uniform1f(G.uVuelo, CONT ? 0 : t.polvo * H * 0.5); gl.uniform1f(G.uCrece, CONT ? 1 - t.polvo : 1); if (t.e0) { gl.uniform1f(G.uVivo, 1); gl.bindVertexArray(t.vvivo); gl.drawArraysInstanced(gl.POINTS, 0, 4, NV); gl.uniform1f(G.uVivo, 0); } else gl.drawArrays(gl.POINTS, 0, NV); }
      }
    }
    gl.bindVertexArray(null);
  });

  // What is loose is drawn with one hand, made ready by the first loose thing of the frame.
  var UNO = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  function loSuelto(c) { if (!c.suelto) { c.suelto = true; vista(S, c); } gl.uniformMatrix3fv(S.uGiro, false, UNO); gl.uniform1f(S.uCrece, 1); gl.uniform1f(S.uSuave, 0); gl.uniform1f(S.uModo, 0); }
  cada('las estrellas', function (c) { loSuelto(c); gl.uniform1f(S.uModo, 1); gl.uniform1f(S.uEscalaPx, escala); gl.uniform1f(S.uNoche, claro ? 0.5 : 1); gl.bindVertexArray(estrellas.v); gl.drawArrays(gl.POINTS, 0, estrellas.n); });
  cada('los árboles y las piedras', function (c) {
    loSuelto(c); gl.uniform2f(S.uFunde, 320, 460);
    for (var i = 0; i < visibles.length; i++) { var t = visibles[i]; if (!t.cosas || t.cerca - t.radio > 460) continue; gl.uniform1f(S.uCrece, 1 - t.polvo); gl.bindVertexArray(t.qvao); gl.drawArrays(gl.POINTS, 0, t.cosas); }
  });
  // (the clouds drift slowly round the planet; a contained entity's stay where they are)
  cada('las nubes', function (c) {
    if (!nubes) return; loSuelto(c); var vaga = !(c.quieto || CONT), deriva = vaga ? reloj * 0.0035 : 0, cn = Math.cos(deriva), sn = Math.sin(deriva);
    gl.uniformMatrix3fv(S.uGiro, false, [cn, 0, -sn, 0, 1, 0, sn, 0, cn]); gl.uniform2f(S.uFunde, 1e9, 2e9); gl.uniform1f(S.uSuave, 220); gl.bindVertexArray(nubes.v); gl.drawArrays(gl.POINTS, 0, nubes.n); if (vaga) c.ambiente = true;
  });
  // Loose specks in the air around whoever is there: the planet's own places for them, a few meters apart, each
  // drifting a little about its place (a contained entity's are still).
  cada('las motas', function (c) {
    if (c.alto >= 600 || MOTAS <= 0) return; loSuelto(c);
    var celda = 7, cuantasM = Math.min(0.95, 0.3 * MOTAS), vaga = c.quieto || CONT ? 0 : 1.3, m0x = piso(c.ox / celda), m0y = piso(c.oy / celda), m0z = piso(c.oz / celda), nm = 0, x, y, z;
    for (var mk = -5; mk <= 5; mk++) for (var mj = -5; mj <= 5; mj++) for (var mi = -5; mi <= 5; mi++) {
      var ax = m0x + mi, ay = m0y + mj, az0 = m0z + mk, su = suerte(ax, ay, az0, 77); if (su > cuantasM) continue; var fase = su * 400;
      x = (ax + suerte(ax, ay, az0, 78)) * celda + Math.sin(reloj * 0.21 + fase) * vaga; y = (ay + suerte(ax, ay, az0, 79)) * celda + Math.cos(reloj * 0.17 + fase * 1.3) * vaga; z = (az0 + suerte(ax, ay, az0, 80)) * celda + Math.sin(reloj * 0.13 + fase * 0.7) * vaga;
      if (x * P[0] + y * P[1] + z * P[2] < piso0 + 0.3) continue; MOTA[nm++] = x; MOTA[nm++] = y; MOTA[nm++] = z; MOTA[nm++] = 0.07; MOTA[nm++] = mezcla(ax, ay, az0, 81) % 3; MOTA[nm++] = 0.9;
    }
    if (nm) { gl.bindBuffer(gl.ARRAY_BUFFER, motas.b); gl.bufferSubData(gl.ARRAY_BUFFER, 0, MOTA, 0, nm); gl.uniform2f(S.uFunde, 24, 36); gl.bindVertexArray(motas.v); gl.drawArrays(gl.POINTS, 0, nm / 6); if (vaga) c.ambiente = true; }
  });

  // The word, standing where one arrived: the ground hides its foot, and it is gone when the planet is in the way.
  cada('la palabra', function (c) {
    gl.bindVertexArray(null); if (!palabra || !anchoPalabra) return;
    var wx = ANCLA[0] - c.ox, wy = ANCLA[1] - c.oy, wz = ANCLA[2] - c.oz, wh = wx * c.fx + wy * c.fy + wz * c.fz, seVe = wh > 4 && (ANCLA[0] * P[0] + ANCLA[1] * P[1] + ANCLA[2] * P[2]) / raiz2(ANCLA[0] * ANCLA[0] + ANCLA[1] * ANCLA[1] + ANCLA[2] * ANCLA[2]) > c.cosHorizonte;
    if (seVe) { var kf = foco / wh / escala, tamP = 150 * kf / anchoPalabra, xf = W / 2 / escala + (wx * c.rx + wy * c.ry + wz * c.rz) * kf, yf = H / 2 / escala - (wx * c.ux + wy * c.uy + wz * c.uz) * kf; palabra.style.transform = 'translate(' + (xf - anchoPalabra * tamP / 2).toFixed(1) + 'px,' + (yf - altoPalabra * tamP / 2).toFixed(1) + 'px) scale(' + tamP.toFixed(4) + ')'; }
    palabra.style.visibility = seVe ? 'visible' : 'hidden';
  });
  cada('lo que se dice', function (c) {
    if (entrada) { var oe = Math.min(1, Math.max(0, 1 - (andado - 6) / 18)) * (enVuelo ? 0 : 1) * llega; entrada.style.opacity = oe.toFixed(3); entrada.style.pointerEvents = oe < 0.5 ? 'none' : ''; }
    if (estado) { var dice = enVuelo || c.alto > OJOS + 1 ? 'En vuelo, a ' + (c.alto < 1000 ? Math.round(c.alto / 5) * 5 + ' m' : (c.alto / 1000).toFixed(1).replace('.', ',') + ' km') + ' del suelo' : 'A pie'; if (dice !== dicho) { dicho = dice; estado.textContent = dice; } }
    cuentaPuntos(c.ahora);
  });

  // What is still to be asked about: the widest pieces first, then the nearest. And what is far behind is let go.
  cada('lo que falta', function (c) {
    var sigue = false, t, i;
    if (nubesHechas < 6) { nubla(); if (NUBE) { var D = new Float32Array(NUBE.length / 5 * 6); for (i = 0; i < NUBE.length / 5; i++) { D[i * 6] = NUBE[i * 5]; D[i * 6 + 1] = NUBE[i * 5 + 1]; D[i * 6 + 2] = NUBE[i * 5 + 2]; D[i * 6 + 3] = NUBE[i * 5 + 3] * 0.7; D[i * 6 + 4] = 1; D[i * 6 + 5] = NUBE[i * 5 + 4]; } nubes = sueltos(D); } sigue = true; }
    if (cola.length) {
      cola.sort(function (a, b) { return b.lejos - a.lejos; });
      if (manos.length) while (cola.length && enCurso < manos.length * 4) { t = cola.pop(); if (t.visto < cuadro0 - 2) { t.pedido = false; continue; } var libre = manos[0]; for (i = 1; i < manos.length; i++) if (manos[i].lleva < libre.lleva) libre = manos[i]; libre.lleva++; enCurso++; libre.postMessage({ llave: t.llave, cara: t.cara, nivel: t.nivel, ci: t.ci, cj: t.cj, cx: t.cx, cy: t.cy, cz: t.cz, escala: t.escala }); }
      else { var fin = performance.now() + (hechos < 12 ? 14 : 7); while (cola.length && performance.now() < fin) { t = cola.pop(); t.pedido = false; if (t.visto >= cuadro0 - 2) recibe(t, hace(t)); } sigue = true; }
    }
    if (trozos.size > Math.max(2400, visibles.length * 2.5)) trozos.forEach(function (v, llave) { if (v.visto < cuadro0 - 180 && !v.pedido) { suelta(v); trozos.delete(llave); } });
    hito.puntos = van; hito.pendientes = c.pendientes + cola.length + enCurso; hito.piezas = visibles.length; hito.vivas = vivos.size;
    return sigue || (c.pendientes > 0 && !manos.length);
  });

  // The measure: frames are counted forty at a time, only while they follow one another.
  // Losing them (under forty-five a second, two counts running), the amount comes down a step, and that step is remembered as too much
  // for a while. Holding them for three counts in a row, it goes back up a little.
  cada('la medida', function (c) {
    var llego = hechos !== hechos0, seguido = anterior && c.crudo < 250; anterior = 1; hechos0 = hechos; if (!seguido) { cuenta0 = suma0 = 0; return; }
    // (a frame in which a piece arrives is not counted: handing it to the drawing takes a moment of its own)
    if (llego) return; suma0 += c.crudo; if (++cuenta0 < 40) return; var media = suma0 / cuenta0; cuenta0 = suma0 = 0; hito.cuadros = Math.round(1000 / media);
    if (media > 22 && CALIDAD > 0.45) { holgadas = 0; if (++lentas < 2) return; lentas = 0; techo = CALIDAD; techoHasta = c.ahora + 20000; CALIDAD = Math.max(0.45, CALIDAD * 0.85); holgadas = 0; alcanza(); return true; }
    lentas = 0; if (media < 17.6 && CALIDAD < 1) { if (++holgadas >= 3) { var mas = Math.min(1, CALIDAD * 1.08); if (mas < techo || c.ahora > techoHasta) { CALIDAD = mas; alcanza(); } holgadas = 0; return true; } } else holgadas = 0;
  });

  // Its controls: the keys, the buttons that are the keys for whoever has none, the wheel, and the pointer.
  var TECLAS = { ArrowUp: 'adelante', KeyW: 'adelante', ArrowDown: 'atras', KeyS: 'atras', ArrowLeft: 'izquierda', KeyA: 'izquierda', ArrowRight: 'derecha', KeyD: 'derecha', KeyE: 'subir', KeyQ: 'bajar', ShiftLeft: 'prisa', ShiftRight: 'prisa' };
  function enUnCampo(ev) { var e = ev.target; return e && (/^(INPUT|TEXTAREA|SELECT)$/.test(e.tagName) || e.isContentEditable); }
  window.addEventListener('keydown', function (ev) {
    if (ev.metaKey || ev.ctrlKey || ev.altKey || enUnCampo(ev)) return; if (ev.code === 'KeyF') { if (!ev.repeat) vuela(!enVuelo); ev.preventDefault(); return; }
    var m = TECLAS[ev.code]; if (!m) return; teclas[m] = true; if (/^Arrow/.test(ev.code)) ev.preventDefault(); pide();
  });
  window.addEventListener('keyup', function (ev) { var m = TECLAS[ev.code]; if (m) { teclas[m] = false; pide(); } });
  window.addEventListener('blur', function () { teclas = {}; });
  Array.prototype.forEach.call(mandos, function (boton) {
    var m = boton.getAttribute('data-mando'), espera = 0;
    if (m === 'volar') { boton.addEventListener('click', function () { vuela(!enVuelo); }); return; }
    var deja = function () { teclas[m] = false; pide(); };
    boton.addEventListener('pointerdown', function (ev) { teclas[m] = true; try { boton.setPointerCapture(ev.pointerId); } catch (e) {} pide(); });
    boton.addEventListener('pointerup', deja); boton.addEventListener('pointercancel', deja); boton.addEventListener('lostpointercapture', deja);
    // (pressed with the keyboard, a button is a step: it moves for a moment and stops)
    boton.addEventListener('click', function (ev) { if (ev.detail !== 0) return; teclas[m] = true; clearTimeout(espera); espera = setTimeout(deja, 450); pide(); });
  });
  lienzo.addEventListener('wheel', function (ev) {
    ev.preventDefault(); var d = -ev.deltaY * (ev.deltaMode ? 16 : 1);
    if (enVuelo && ev.shiftKey) quiereAltura = Math.min(RADIO * 4, Math.max(3, quiereAltura * Math.exp(-d * 0.0015))); else pasa(d * 0.02 * (enVuelo ? Math.max(1, (radioDelOjo - piso0) * 0.08) : 1) / radioDelOjo);
    pide();
  }, { passive: false });
  // (dragged, the place turns under the pointer; only passed over, the head turns a little)
  var arrastre = null, rastro = null;
  lienzo.addEventListener('pointerdown', function (ev) { arrastre = { x: ev.clientX, id: ev.pointerId }; try { lienzo.setPointerCapture(ev.pointerId); } catch (e) {} });
  lienzo.addEventListener('pointermove', function (ev) {
    var caja = lienzo.getBoundingClientRect(), px = ev.clientX - caja.left, py = ev.clientY - caja.top;
    // (the faster it passes, the more the dots come apart; a contained entity's, less than half as much)
    if (!menos.matches && REACCION > 0) { if (rastro) remueve(px * escala, H - py * escala, Math.min(1, Math.hypot(px - rastro[0], py - rastro[1]) / 90) * REACCION * (CONT ? 0.4 : 1)); rastro = [px, py]; }
    tienta(px * escala, H - py * escala);
    if (arrastre && arrastre.id === ev.pointerId) { tuerce((ev.clientX - arrastre.x) / caja.width * 2.2); arrastre.x = ev.clientX; }
    else if (ev.pointerType !== 'touch' && !menos.matches) { var cuanto = CONT ? 0.4 : 1; quiereGiro = ((ev.clientX - caja.left) / caja.width - 0.5) * 0.7 * cuanto; quiereAlza = ((ev.clientY - caja.top) / caja.height - 0.5) * 0.3 * cuanto; }
    pide();
  });
  var sueltaPuntero = function () { arrastre = null; }; lienzo.addEventListener('pointerup', sueltaPuntero); lienzo.addEventListener('pointercancel', sueltaPuntero);
  escena.addEventListener('pointerleave', function () { quiereGiro = quiereAlza = 0; rastro = null; mano.dentro = false; pide(); });
  window.addEventListener('resize', mide); if (window.ResizeObserver) new ResizeObserver(mide).observe(lienzo);
  if (menos.addEventListener) menos.addEventListener('change', pide);
  document.addEventListener('visibilitychange', pide);
  new MutationObserver(function () { viste(); pide(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(mide);

  // What the dots are like, set by whoever looks: ALMA's Slider, one for each thing. How many (more of them reach
  // farther at each size, so the same view has more and closer ones), how large, how much the light tells in their
  // color, how many loose specks are in the air, how much they come apart where the pointer passes and how far from
  // it. What is chosen is kept for the next visit.
  var ajustes = document.querySelectorAll('[data-ajuste]'), cuenta = document.querySelector('.mundo__cuenta'), abre = document.querySelector('.mundo__abre'), panel = document.querySelector('.mundo__panel'), LLAVE2 = 'alma-mundo-particulas', contado = 0;
  function ajusta(que, v, campo) {
    v = +v; if (!isFinite(v)) return; if (campo) v = Math.min(+campo.max, Math.max(+campo.min, v));
    if (que === 'densidad') { DENSA = Math.min(256, Math.max(64, v)); CALIDAD = techo = 1; holgadas = 0; alcanza(); } else if (que === 'tamano') TAM = v / 100; else if (que === 'luz') LUZ = v / 100; else if (que === 'motas') MOTAS = v / 100; else if (que === 'reaccion') REACCION = v / 100; else if (que === 'alcance') ALCANCE = v / 100;
    if (campo) { campo.value = v; campo.style.setProperty('--alma-fill', ((campo.value - campo.min) / (campo.max - campo.min) * 100) + '%'); var dice = campo.parentNode.parentNode.querySelector('.alma-slider__value'); if (dice && que !== 'densidad') { dice.textContent = Math.round(campo.value) + ' %'; campo.setAttribute('aria-valuetext', dice.textContent); } }
    pide();
  }
  function guarda() { var o = {}; Array.prototype.forEach.call(ajustes, function (c) { o[c.getAttribute('data-ajuste')] = +c.value; }); try { localStorage.setItem(LLAVE2, JSON.stringify(o)); } catch (e) {} }
  (function () { var o = {}; try { o = JSON.parse(localStorage.getItem(LLAVE2)) || {}; } catch (e) {} Array.prototype.forEach.call(ajustes, function (c) { var q = c.getAttribute('data-ajuste'); ajusta(q, o[q] != null ? o[q] : c.value, c); c.addEventListener('input', function () { ajusta(q, c.value, c); guarda(); }); }); })();
  function cuentaPuntos(ahora) { if (!cuenta || ahora - contado < 400) return; contado = ahora; var dice = 'unas ' + String(Math.round(van / 1000) * 1000).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' a la vista'; if (cuenta.textContent !== dice) { cuenta.textContent = dice; var c = document.querySelector('[data-ajuste="densidad"]'); if (c) c.setAttribute('aria-valuetext', dice); } }
  // (the sliders are behind a button: open on a wide page, closed on a narrow one, where they would be in the way)
  if (abre && panel) { var muestra = function (si) { panel.hidden = !si; abre.setAttribute('aria-expanded', si ? 'true' : 'false'); }; muestra(matchMedia('(min-width: 64rem)').matches); abre.addEventListener('click', function () { muestra(panel.hidden); }); }

  // The theme, light or dark, kept for the next visit.
  var raiz = document.documentElement, tema = document.querySelector('.escaneo__tema'), LLAVE = 'alma-portada-tema';
  function guardado() { try { return localStorage.getItem(LLAVE); } catch (e) { return null; } }
  function nombra() { if (!tema) return; var dice = raiz.getAttribute('data-theme') === 'light' ? 'Usar tema oscuro' : 'Usar tema claro'; tema.setAttribute('aria-label', dice); tema.title = dice; }
  function pone(t) { raiz.setAttribute('data-theme', t); raiz.style.colorScheme = t; nombra(); }
  var elegido = guardado(); pone(elegido === 'light' || elegido === 'dark' ? elegido : raiz.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  if (tema) tema.addEventListener('click', function () { var t = raiz.getAttribute('data-theme') === 'light' ? 'dark' : 'light'; try { localStorage.setItem(LLAVE, t); } catch (e) {} pone(t); });

  // The arrival, as a score (site/partitura.js): the word is being written and the ground is settling; what is said
  // comes once the first letters are in focus, and what one walks with a little after. Once, on arriving.
  var llega = 1, barras = [escena.querySelector('.mundo__mandos'), escena.querySelector('.mundo__ajuste')].filter(Boolean);
  if (window.AlmaPartitura) window.AlmaPartitura.toca([
    { en: ['duration-slow-02', 1], dura: ['duration-slow-01', 1], curva: 'easing-entrance-expressive', paso: function (k) { llega = k; pide(); } },
    { en: 'sigue', dura: ['duration-slow-01', 1], curva: 'easing-entrance-expressive', paso: function (k) { barras.forEach(function (b) { b.style.opacity = k >= 1 ? '' : k.toFixed(3); }); } }
  ], { el: escena });

  // (what a test asks: about how many dots a frame has, what is still to come, and the rule itself)
  var hito = window.__mundo = { puntos: 0, pendientes: 0, piezas: 0, vivas: 0, ms: 0, cuadros: 0, descansa: false, get calidad() { return CALIDAD; }, get marcha() { return marcha.map(function (p) { return p.nombre; }); }, cada: cada, get falla() { return gl.getError(); }, get enMovimiento() { return !!pedido; }, get trozos() { return hechos; }, get altura() { return radioDelOjo - piso0; }, get lugar() { return P.slice(); },
    get manos() { return manos.length; }, get maquina() { var x = gl.getExtension('WEBGL_debug_renderer_info'); return x ? gl.getParameter(x.UNMASKED_RENDERER_WEBGL) : ''; },
    ajusta: function (que, v) { ajusta(que, v, document.querySelector('[data-ajuste="' + que + '"]')); }, remueve: function (x, y, c) { remueve(x * escala, H - y * escala, c == null ? 1 : c); pide(); },
    regla: { sube: function (x, y, z) { return sube(x, y, z); }, semilla: SEMILLA, relieve: RELIEVE, mar: MAR, llegada: LLEGADA },
    pon: function (o) { if (o.lugar) P = o.lugar.slice(); if (o.hacia) F = o.hacia.slice(); if (o.altura != null) { vuela(o.altura > OJOS); altura = quiereAltura = o.altura; piso0 = suelo(P[0], P[1], P[2]); radioDelOjo = piso0 + altura; } pide(); } };
  mide();
})();
