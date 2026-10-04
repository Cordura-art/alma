// The sheets of an entity: twelve drawings of its world made only of strokes, ready for a pen plotter.
// Two ideas, none of their code. From fogleman/ln (MIT): a scene with volume drawn with lines, where a line shows only
// if nothing stands between it and the eye. From vpype (abey79, MIT): the way to get strokes ready to plot: merge the
// ones that touch, simplify them, sort them so the pen travels little, lay them out on a page and count.
// No DOM: Node writes the files (scripts/laminas.mjs) and tests them, and a page draws the same sheets.
import { hash, rng } from './semilla.mjs';
import { ruido, MAPA } from './campo.mjs';
import { criatura3d, pintarCriatura } from './volumen.mjs';

// Depth is measured in rows: 30 show at a time, a stretch of the world is 36 rows long, and a row that has passed the
// viewer keeps being drawn for 5 more. Every drawing is made in a box of 600 × 800 and laid out on the sheet later.
const FILAS = 30, TRAMO = 36, SALIDA = 5, ANCHO = 600, ALTO = 800, PASO = 2, COLS = ANCHO / PASO + 1;

// The land of an entity, without end ahead, in stretches. Each stretch is its chart, upright: one enters by the root
// and leaves by the head, and its defined centers, spread over the whole stretch, are hills (the central ones one
// after another, the others at the sides). Where a stretch begins the land takes the shape of its field's direction.
// It gives the height at x across (0 to 1 is the middle band) and depth z, in rows.
export function mundo(G) {
  const n3 = ruido(hash(`panorama|${G.semilla}`)), tramos = {}, suyos = (G.centros || []).filter((id) => MAPA[id]);
  const lejos = Math.min(...suyos.map((id) => MAPA[id][0])), cerca = Math.max(...suyos.map((id) => MAPA[id][0]));
  const tramo = (c) => {
    if (tramos[c]) return tramos[c];
    const r = rng(hash(`tramo|${G.semilla}|${c}`));
    return (tramos[c] = suyos.map((id) => ({ a: (cerca > lejos ? 0.24 + (cerca - MAPA[id][0]) / (cerca - lejos) * 0.56 : 0.52) + (r() - 0.5) * 0.04, x: 0.5 + MAPA[id][1] * 0.42 + (r() - 0.5) * 0.06, alto: 0.4 + r() * 0.16 })));
  };
  return (x, z) => {
    let h = n3(x * 2.4 * G.grupos, z / TRAMO * 3.2 * G.grupos, 0) * 0.5;
    const c0 = Math.floor(z / TRAMO);
    for (let c = c0 - 1; c <= c0 + 1; c++) {
      const a = z / TRAMO - c;
      for (const q of tramo(c)) { const dx = x - q.x, da = (a - q.a) * 1.5; h += q.alto * Math.exp(-(dx * dx + da * da) / 0.006); }
      const dx = x - 0.5, da = a * 1.5, d = Math.hypot(dx, da);
      if (G.direccion === 'foco') h += 0.95 * Math.exp(-d * d / 0.03);
      else if (G.direccion === 'giro') h += 0.7 * Math.exp(-((d - 0.26) ** 2) / 0.004);
      else if (G.direccion === 'estallido') h += 0.3 * Math.cos(d * 30) * Math.exp(-d * 2.6) + 0.5 * Math.exp(-d * d / 0.01);
      else if (G.direccion === 'espiral') h += 0.5 * (0.5 + 0.5 * Math.cos(Math.atan2(da, dx) * 2 - d * 20)) * Math.exp(-d * 1.8);
    }
    return h;
  };
}
// Where a depth is on the box, seen ahead. `v` goes from 0 at the horizon to 1 at the viewer's feet.
const plano = (v) => ({ base: ALTO * (0.07 + 0.93 * v ** 1.7), alza: ALTO * (0.035 + 0.115 * v), ancho: 0.5 + 0.7 * v });
// The pen of a line: the entity's colors in turn, and its accent on one line in twelve.
const tinta = (C, k) => (((k % 12) + 12) % 12 === 5 ? C.acento : C.barras[((k % C.barras.length) + C.barras.length) % C.barras.length]);

// ---------- A camera that looks from a corner and from above, without perspective, at a ground with a height at each
// place (a smooth land, cubes, towers, boxes, a pit). A stroke in space is cut into points, and a point is drawn only
// if, going from it toward the eye, nothing of the ground rises above the way.
function mirada(escala, cx, cy, giro, inclina) {
  const c = Math.cos(giro), s = Math.sin(giro), sp = Math.sin(inclina), cp = Math.cos(inclina);
  return { pr: (x, y, z) => { const xr = (x - 0.5) * c - (y - 0.5) * s, yr = (x - 0.5) * s + (y - 0.5) * c; return [cx + xr * escala, cy - (yr * sp + z * cp) * escala]; }, ojo: [-cp * s, -cp * c, sp] };
}
function asoma(suelo, K, x, y, z, techo) {
  for (let t = 0.004; t < 3; t += 0.008) { const X = x + K.ojo[0] * t, Y = y + K.ojo[1] * t, Z = z + K.ojo[2] * t; if (Z > techo || X < -0.4 || X > 1.4 || Y < -0.4 || Y > 1.4) return true; if (suelo(X, Y) > Z + 1e-4) return false; }
  return true;
}
// What shows of a stroke in space, as strokes on the box. With `ocultas`, what does not show is kept there.
function trazar(out, K, suelo, techo, pts, color, ocultas) {
  let run = null, tapado = null;
  for (const P of pts) {
    const q = K.pr(P[0], P[1], P[2]);
    if (asoma(suelo, K, P[0], P[1], P[2], techo)) { if (!run) { run = { c: color, p: [] }; out.push(run); } run.p.push(q); tapado = null; }
    else { run = null; if (ocultas) { if (!tapado) { tapado = []; ocultas.push(tapado); } tapado.push(q); } }
  }
}
// Hidden strokes as dashes: 5 of ink, 4 of air.
function punteada(out, lineas, color) {
  for (const p of lineas) {
    let cur = null, acc = 0, pinta = true;
    for (let i = 1; i < p.length; i++) {
      const a = p[i - 1], b = p[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      let t = 0;
      while (t < L) {
        const paso = Math.min(L - t, (pinta ? 5 : 4) - acc);
        if (pinta) { if (!cur) { cur = { c: color, p: [[a[0] + (b[0] - a[0]) * t / L, a[1] + (b[1] - a[1]) * t / L]] }; out.push(cur); } cur.p.push([a[0] + (b[0] - a[0]) * (t + paso) / L, a[1] + (b[1] - a[1]) * (t + paso) / L]); }
        t += paso; acc += paso;
        if (acc >= (pinta ? 5 : 4) - 1e-6) { acc = 0; pinta = !pinta; cur = null; }
      }
    }
  }
}
const segmento = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => [a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n, a[2] + (b[2] - a[2]) * i / n]);
// One stretch of the land as heights on a grid, read between its points.
function rejilla(alt, tramo, n, alto) {
  const g = new Float32Array((n + 1) * (n + 1));
  for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) g[j * (n + 1) + i] = alt(-0.15 + 1.3 * i / n, (tramo + j / n) * TRAMO) * alto;
  return (x, y) => { if (x < 0 || x > 1 || y < 0 || y > 1) return -9; const fx = x * n, fy = y * n, i0 = Math.min(n - 1, Math.floor(fx)), j0 = Math.min(n - 1, Math.floor(fy)), u = fx - i0, w = fy - j0, a = j0 * (n + 1) + i0; return (g[a] * (1 - u) + g[a + 1] * u) * (1 - w) + (g[a + n + 1] * (1 - u) + g[a + n + 2] * u) * w; };
}

// ---------- The twelve drawings. Each gives strokes on the box: [{ c: color, p: [[x, y], …] }].
const DIBUJA = {
  // The land seen ahead, one line per row: from the nearest to the farthest, each shows what rises above the others.
  filas(G, o) {
    const alt = mundo(G), C = G.pieza, cam = o.avance, out = [], tope = new Float32Array(COLS).fill(ALTO + 60);
    for (let k = Math.ceil(cam - SALIDA); k <= Math.floor(cam + FILAS); k++) {
      const v = 1 - (k - cam) / FILAS, P = plano(v); if (v < 0.03) continue;
      let cur = null;
      for (let i = 0; i < COLS; i++) {
        const sx = i * PASO, sy = P.base - alt(0.5 + (sx - ANCHO / 2) / (ANCHO * P.ancho), k) * P.alza;
        if (sy < tope[i] && sy <= ALTO) { if (!cur) { cur = { c: tinta(C, k), p: [] }; out.push(cur); } cur.p.push([sx, sy]); } else cur = null;
        if (sy < tope[i]) tope[i] = sy;
      }
    }
    return out;
  },
  // The same moment with the lines running ahead, toward the horizon.
  surcos(G, o) {
    const alt = mundo(G), C = G.pieza, cam = o.avance, out = [], tope = new Float32Array(COLS).fill(ALTO + 60), cur = {};
    for (let d = cam - SALIDA; d <= cam + FILAS; d += 0.25) {
      const v = 1 - (d - cam) / FILAS, P = plano(v); if (v < 0.03) break;
      for (let j = -8; j <= 24; j++) {
        const xj = j / 16, sx = ANCHO / 2 + (xj - 0.5) * ANCHO * P.ancho, sy = P.base - alt(xj, d) * P.alza;
        if (sx >= 0 && sx <= ANCHO && sy <= ALTO && sy < tope[Math.round(sx / PASO)] + 0.4) { if (!cur[j]) { cur[j] = { c: tinta(C, j), p: [] }; out.push(cur[j]); } cur[j].p.push([sx, sy]); } else cur[j] = null;
      }
      for (let i = 0; i < COLS; i++) { const y = P.base - alt(0.5 + (i * PASO - ANCHO / 2) / (ANCHO * P.ancho), d) * P.alza; if (y < tope[i]) tope[i] = y; }
    }
    return out;
  },
  malla(G, o) { return [...DIBUJA.filas(G, o), ...DIBUJA.surcos(G, o)]; },
  // A whole stretch as a block seen from a corner and from above, in rows.
  maqueta(G) {
    const alt = mundo(G), C = G.pieza, out = [], tope = new Float32Array(COLS).fill(ALTO + 60), cs = Math.cos(0.62), sn = Math.sin(0.62), E = ANCHO * 0.6;
    let n = 0;
    for (let w = -0.82; w <= 0.82; w += 0.027, n++) {
      let cur = null;
      for (let i = 0; i < COLS; i++) {
        const sx = i * PASO, u = (sx - ANCHO / 2) / E, x = 0.5 + u * cs + w * sn, a = 0.5 - u * sn + w * cs;
        if (x < -0.12 || x > 1.12 || a < 0 || a > 1) { cur = null; continue; }
        const sy = ALTO * 0.56 - w * E * 0.56 - alt(x, a * TRAMO) * ALTO * 0.1;
        if (sy < tope[i]) { if (!cur) { cur = { c: tinta(C, n), p: [] }; out.push(cur); } cur.p.push([sx, sy]); tope[i] = sy; } else cur = null;
      }
    }
    return out;
  },
  // The same stretch from straight above, as a map: one curve for each level. The head is at the top.
  niveles(G) {
    const alt = mundo(G), C = G.pieza, nx = 110, ny = 150, g = [], out = [];
    let min = 9, max = -9;
    for (let j = 0; j <= ny; j++) { g.push(new Float32Array(nx + 1)); for (let i = 0; i <= nx; i++) { const z = alt(-0.15 + 1.3 * i / nx, (1 - j / ny) * TRAMO); g[j][i] = z; if (z < min) min = z; if (z > max) max = z; } }
    const X = (i) => 30 + (ANCHO - 60) * i / nx, Y = (j) => 30 + (ALTO - 60) * j / ny;
    for (let l = 1; l <= 13; l++) {
      const L = min + (max - min) * l / 14, c = tinta(C, l);
      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
        const a = g[j][i], b = g[j][i + 1], cc = g[j + 1][i + 1], d = g[j + 1][i], pts = [];
        if ((a < L) !== (b < L)) pts.push([X(i + (L - a) / (b - a)), Y(j)]);
        if ((b < L) !== (cc < L)) pts.push([X(i + 1), Y(j + (L - b) / (cc - b))]);
        if ((d < L) !== (cc < L)) pts.push([X(i + (L - d) / (cc - d)), Y(j + 1)]);
        if ((a < L) !== (d < L)) pts.push([X(i), Y(j + (L - a) / (d - a))]);
        if (pts.length >= 2) out.push({ c, p: [pts[0], pts[1]] });
        if (pts.length === 4) out.push({ c, p: [pts[2], pts[3]] });
      }
    }
    return out;
  },
  // Twelve of its creatures with volume, in line: what the creature's painter draws, written down instead of painted.
  criaturas(G, o) {
    const out = [], lado = 190;
    let ox = 0, oy = 0, cur = null, tras = [], elipse = null;
    const pluma = { fillRect() {}, drawImage() {}, beginPath() { tras = []; elipse = null; }, moveTo(x, y) { cur = [[x + ox, y + oy]]; tras.push(cur); }, lineTo(x, y) { if (cur) cur.push([x + ox, y + oy]); },
      stroke() { for (const p of tras) if (p.length > 1) out.push({ c: pluma.strokeStyle, p }); tras = []; },
      ellipse(x, y, rx, ry, giro) { elipse = []; for (let k = 0; k <= 20; k++) { const t = k / 20 * 6.2832, ex = Math.cos(t) * rx, ey = Math.sin(t) * ry; elipse.push([x + ox + ex * Math.cos(giro) - ey * Math.sin(giro), y + oy + ex * Math.sin(giro) + ey * Math.cos(giro)]); } },
      fill() { if (elipse) out.push({ c: pluma.fillStyle, p: elipse }); elipse = null; } };
    o.nombres.slice(0, 12).forEach((nombre, i) => { ox = 15 + (i % 3) * lado; oy = 20 + Math.floor(i / 3) * lado; pintarCriatura(pluma, criatura3d(G, nombre), lado, (i % 2 ? 0.45 : -0.45) + (i % 3 - 1) * 0.15, { trazo: 1 }); });
    return out.filter((t) => t.c !== G.pieza.base);
  },
  // After ln's function: a stretch of the land as a dense mesh.
  superficie(G) {
    const C = G.pieza, out = [], suelo = rejilla(mundo(G), 0, 140, 0.24), K = mirada(ANCHO * 0.66, ANCHO / 2, ALTO * 0.62, 0.62, 0.62), n = 46;
    for (let i = 0; i <= n; i++) {
      trazar(out, K, suelo, 0.6, Array.from({ length: 181 }, (_, k) => [i / n, k / 180, suelo(i / n, k / 180) + 0.002]), tinta(C, i));
      trazar(out, K, suelo, 0.6, Array.from({ length: 181 }, (_, k) => [k / 180, i / n, suelo(k / 180, i / n) + 0.002]), tinta(C, i + 3));
    }
    return out;
  },
  // After ln's cubes: the same land in steps, each place a pile of cubes. An edge two piles share is drawn once.
  cubos(G) {
    const C = G.pieza, out = [], N = 22, paso = 0.036, suave = rejilla(mundo(G), 0, 60, 1), h = [], e = 0.0015;
    for (let i = 0; i < N; i++) { h.push([]); for (let j = 0; j < N; j++) h[i].push(Math.max(1, Math.round(suave((i + 0.5) / N, (j + 0.5) / N) * 7)) * paso); }
    const suelo = (x, y) => (x < 0 || x >= 1 || y < 0 || y >= 1 ? -9 : h[Math.floor(x * N)][Math.floor(y * N)]), K = mirada(ANCHO * 0.66, ANCHO / 2, ALTO * 0.64, 0.62, 0.66);
    const sube = (x, y, z0, z1, c) => { const n = Math.max(1, Math.round((z1 - z0) / paso * 2)); trazar(out, K, suelo, 0.7, segmento([x, y, z0], [x, y, z1], n), c); };
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      const z = h[i][j], x0 = i / N, x1 = (i + 1) / N, y0 = j / N, y1 = (j + 1) / N, c = tinta(C, Math.round(z / paso)), vx = i ? h[i - 1][j] : 0, vy = j ? h[i][j - 1] : 0;
      // The top: its two near edges always; a far edge only where the pile behind it is not as tall.
      trazar(out, K, suelo, 0.7, segmento([x0, y0, z + e], [x1, y0, z + e], 4), c); trazar(out, K, suelo, 0.7, segmento([x0, y0, z + e], [x0, y1, z + e], 4), c);
      if (i === N - 1 || h[i + 1][j] !== z) trazar(out, K, suelo, 0.7, segmento([x1, y0, z + e], [x1, y1, z + e], 4), c);
      if (j === N - 1 || h[i][j + 1] !== z) trazar(out, K, suelo, 0.7, segmento([x0, y1, z + e], [x1, y1, z + e], 4), c);
      // The two sides that face the eye, cube by cube, down to the neighbor; and their upright edges.
      if (vx < z) { for (let l = vx + paso; l < z - 1e-6; l += paso) trazar(out, K, suelo, 0.7, segmento([x0 - e, y0, l], [x0 - e, y1, l], 4), c); sube(x0 - e, y1 - e, vx, z, c); }
      if (vy < z) { for (let l = vy + paso; l < z - 1e-6; l += paso) trazar(out, K, suelo, 0.7, segmento([x0, y0 - e, l], [x1, y0 - e, l], 4), c); sube(x1 - e, y0 - e, vy, z, c); }
      if (Math.min(vx, vy) < z) sube(x0 - e, y0 - e, Math.min(vx, vy), z, c);
    }
    return out;
  },
  // After ln's skyscrapers: a tower where the land is high, with the side toward the eye hatched.
  ciudad(G) {
    const C = G.pieza, out = [], N = 11, r = rng(hash(`ciudad|${G.semilla}`)), suave = rejilla(mundo(G), 0, 40, 1), torres = [], e = 0.0015;
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const a = suave((i + 0.5) / N, (j + 0.5) / N), m = 0.012 + r() * 0.012; if (a > 0.42 || r() < 0.35) torres.push({ x0: i / N + m, x1: (i + 1) / N - m, y0: j / N + m, y1: (j + 1) / N - m, z: 0.05 + a * 0.42 + r() * 0.06, c: tinta(C, i + j) }); }
    const suelo = (x, y) => { for (const t of torres) if (x >= t.x0 && x <= t.x1 && y >= t.y0 && y <= t.y1) return t.z; return 0; }, K = mirada(ANCHO * 0.68, ANCHO / 2, ALTO * 0.6, 0.5, 0.95);
    for (const t of torres) {
      for (const s of [[[t.x0, t.y0], [t.x1, t.y0]], [[t.x1, t.y0], [t.x1, t.y1]], [[t.x1, t.y1], [t.x0, t.y1]], [[t.x0, t.y1], [t.x0, t.y0]]]) trazar(out, K, suelo, 1, segmento([s[0][0], s[0][1], t.z + e], [s[1][0], s[1][1], t.z + e], 8), t.c);
      for (const q of [[t.x0 - e, t.y0 - e], [t.x1 + e, t.y0 - e], [t.x0 - e, t.y1 + e]]) trazar(out, K, suelo, 1, segmento([q[0], q[1], 0], [q[0], q[1], t.z], 10), t.c);
      for (let x = t.x0 + 0.006; x < t.x1 - 0.003; x += 0.0065) trazar(out, K, suelo, 1, segmento([x, t.y0 - e, 0], [x, t.y0 - e, t.z], 10), t.c);
    }
    return out;
  },
  // After ln's boxes: the chart. Its nine centers where they stand (the head at the back), tall the defined ones, low
  // the open ones, with its channels drawn on the floor. What a box hides is drawn in dashes.
  cajas(G) {
    const C = G.pieza, out = [], ocultas = [], bajo = [], e = 0.002, K = mirada(ANCHO * 0.74, ANCHO / 2, ALTO * 0.62, 0.55, 0.6);
    const cajas = Object.keys(MAPA).map((id) => { const si = (G.centros || []).includes(id); return { id, x: 0.5 + MAPA[id][1] * 0.36, y: 0.93 - MAPA[id][0] * 0.86, m: 0.06, z: si ? 0.3 : 0.07, c: si ? C.barras[0] : C.barras[3] }; });
    const suelo = (x, y) => { for (const b of cajas) if (Math.abs(x - b.x) <= b.m && Math.abs(y - b.y) <= b.m) return b.z; return 0; };
    for (const k of G.canales || []) { const a = cajas.find((b) => b.id === k[0]), b = cajas.find((q) => q.id === k[1]); if (a && b && a !== b) trazar(out, K, suelo, 0.6, segmento([a.x, a.y, 0.001], [b.x, b.y, 0.001], 60).filter((p) => suelo(p[0], p[1]) === 0), C.acento, bajo); }
    for (const b of cajas) {
      const m = b.m + e, esq = [[b.x - m, b.y - m], [b.x + m, b.y - m], [b.x + m, b.y + m], [b.x - m, b.y + m]];
      for (let i = 0; i < 4; i++) { const p = esq[i], q = esq[(i + 1) % 4]; trazar(out, K, suelo, 0.6, segmento([p[0], p[1], b.z + e], [q[0], q[1], b.z + e], 14), b.c, ocultas); trazar(out, K, suelo, 0.6, segmento([p[0], p[1], 0.001], [q[0], q[1], 0.001], 14), b.c, ocultas); trazar(out, K, suelo, 0.6, segmento([p[0], p[1], 0.001], [p[0], p[1], b.z + e], 14), b.c, ocultas); }
    }
    // A channel behind a box keeps its color: it is the accent, in dashes.
    punteada(out, ocultas, C.barras[4]); punteada(out, bajo, C.acento);
    return out;
  },
  // After ln's spiral: the direction of its field as a pit the strokes fall into, turning as much as the field turns.
  remolino(G) {
    const C = G.pieza, out = [], suelo = (x, y) => -0.5 / (1 + ((x - 0.5) ** 2 + (y - 0.5) ** 2) / 0.012), K = mirada(ANCHO * 0.78, ANCHO / 2, ALTO * 0.5, 0.3, 0.52);
    const vuelta = { foco: 0.5, estallido: 0.15, giro: 2.4, espiral: 3.4, espejo: 1.2 }[G.direccion] || 1, sentido = hash(`remolino|${G.semilla}`) % 2 ? 1 : -1, n = 14 * G.numeros[G.numeros.length - 1];
    for (let j = 0; j < n; j++) trazar(out, K, suelo, 0.02, Array.from({ length: 171 }, (_, k) => { const r = 0.8 * (1 - k / 170) ** 2.2 + 0.012, a = 6.2832 * j / n + sentido * vuelta * Math.log(0.82 / r), x = 0.5 + r * Math.cos(a), y = 0.5 + r * Math.sin(a); return [x, y, suelo(x, y) + 0.002]; }), tinta(C, j));
    return out;
  },
  // After ln's spheres: its creatures as round bodies covered with rings. The eyes are the densest rings.
  crateres(G, o) {
    const out = [], lado = 190, ojo = [0.28, 0.3, 0.91], dl = Math.hypot(ojo[2], ojo[0]), d = [ojo[2] / dl, 0, -ojo[0] / dl], u = [ojo[1] * d[2] - ojo[2] * d[1], ojo[2] * d[0] - ojo[0] * d[2], ojo[0] * d[1] - ojo[1] * d[0]];
    const tapa = (S, p) => { const ox = (p[0] - S.c[0]) / S.r[0], oy = (p[1] - S.c[1]) / S.r[1], oz = (p[2] - S.c[2]) / S.r[2], dx = ojo[0] / S.r[0], dy = ojo[1] / S.r[1], dz = ojo[2] / S.r[2], a = dx * dx + dy * dy + dz * dz, b = 2 * (ox * dx + oy * dy + oz * dz), q = b * b - 4 * a * (ox * ox + oy * oy + oz * oz - 1); return q >= 0 && ((-b - Math.sqrt(q)) / (2 * a) > 1e-4 || (-b + Math.sqrt(q)) / (2 * a) > 1e-4); };
    o.nombres.slice(0, 12).forEach((nombre, i) => {
      const K = criatura3d(G, nombre), r = rng(hash(`crater|${G.semilla}|${nombre}`)), cx = 15 + (i % 3) * lado + lado / 2, cy = 20 + Math.floor(i / 3) * lado + lado * 0.56, E = lado * 0.92, medio = (K.alto + K.bajo) / 2;
      const pr = (p) => [cx + (p[0] * d[0] + p[2] * d[2]) * E, cy - (p[0] * u[0] + (p[1] - medio) * u[1] + p[2] * u[2]) * E];
      // A ring on a solid: the points at one angle from a direction, drawn where no solid stands before them.
      const anillo = (S, n, ro, color) => {
        const a = Math.abs(n[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]; let p1 = [a[1] * n[2] - a[2] * n[1], a[2] * n[0] - a[0] * n[2], a[0] * n[1] - a[1] * n[0]]; const l = Math.hypot(p1[0], p1[1], p1[2]); p1 = [p1[0] / l, p1[1] / l, p1[2] / l];
        const p2 = [n[1] * p1[2] - n[2] * p1[1], n[2] * p1[0] - n[0] * p1[2], n[0] * p1[1] - n[1] * p1[0]]; let cur = null;
        for (let k = 0; k <= 48; k++) {
          const t = k / 48 * 6.2832, q = [0, 1, 2].map((m) => S.c[m] + (n[m] * Math.cos(ro) + (p1[m] * Math.cos(t) + p2[m] * Math.sin(t)) * Math.sin(ro)) * S.r[m]), fuera = [0, 1, 2].map((m) => S.c[m] + (q[m] - S.c[m]) * 1.012);
          if (K.solidos.some((T) => tapa(T, fuera))) cur = null; else { if (!cur) { cur = { c: color, p: [] }; out.push(cur); } cur.p.push(pr(q)); }
        }
      };
      for (const S of K.solidos) {
        const k = [ojo[0] / S.r[0], ojo[1] / S.r[1], ojo[2] / S.r[2]], kl = Math.hypot(k[0], k[1], k[2]);
        anillo(S, [k[0] / kl, k[1] / kl, k[2] / kl], 1.5708, S.color);
        for (let c = 0; c < 9; c++) { const z = r() * 2 - 1, t = r() * 6.2832, s = Math.sqrt(1 - z * z), n = [s * Math.cos(t), z, s * Math.sin(t)], ro = 0.12 + r() * 0.26; anillo(S, n, ro, S.color); if (r() < 0.5) anillo(S, n, ro * 0.6, S.color); }
      }
      for (const e of K.ojos) { const S = e.de; let n = [0, 1, 2].map((m) => (e.p[m] - S.c[m]) / S.r[m]); const l = Math.hypot(n[0], n[1], n[2]); n = [n[0] / l, n[1] / l, n[2] / l]; for (const ro of [0.2, 0.13, 0.06]) anillo(S, n, ro, G.pieza.acento); }
    });
    return out;
  }
};
// The twelve, in the order a page shows them: six after ln's own gallery, six from the panorama.
export const LAMINAS = [
  { id: 'superficie', titulo: 'Superficie', nota: 'Un tramo de su terreno como malla densa.' },
  { id: 'cubos', titulo: 'Cubos', nota: 'El mismo terreno en escalones, cada lugar una pila de cubos.' },
  { id: 'ciudad', titulo: 'Ciudad', nota: 'Una torre donde el terreno es alto, con una cara rayada.' },
  { id: 'cajas', titulo: 'La carta en cajas', nota: 'Sus nueve centros: altos los definidos, bajos los abiertos, y sus canales en el suelo. Lo tapado va punteado.' },
  { id: 'remolino', titulo: 'Remolino', nota: 'La dirección de su campo como un pozo donde caen los trazos.' },
  { id: 'crateres', titulo: 'Cráteres', nota: 'Doce de sus criaturas cubiertas de anillos; los ojos son los más densos.' },
  { id: 'filas', titulo: 'Filas', nota: 'Su terreno visto de frente, con una línea por fila.' },
  { id: 'surcos', titulo: 'Surcos', nota: 'El mismo momento, con las líneas hacia el horizonte.' },
  { id: 'malla', titulo: 'Malla', nota: 'Filas y surcos juntos.' },
  { id: 'maqueta', titulo: 'Maqueta', nota: 'Un tramo entero como bloque, visto desde una esquina y desde arriba.' },
  { id: 'niveles', titulo: 'Curvas de nivel', nota: 'El mismo tramo desde arriba, como un mapa: la cabeza arriba y la raíz abajo.' },
  { id: 'criaturas', titulo: 'Criaturas', nota: 'Doce de sus criaturas con volumen, solo en línea.' }
];
// The strokes of one drawing. `avance` is the moment of the way (in rows) for the three that look ahead; `nombres`,
// the names of the creatures for the two that draw them.
export function trazosDe(G, id, o = {}) {
  if (!DIBUJA[id]) throw new Error(`No hay una lámina «${id}». Las que hay: ${LAMINAS.map((l) => l.id).join(', ')}`);
  return DIBUJA[id](G, { avance: o.avance ?? 6, nombres: o.nombres && o.nombres.length ? o.nombres : ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce'] });
}

// ---------- Getting the strokes ready for the pen, as vpype does.
const largo = (p) => { let s = 0; for (let i = 1; i < p.length; i++) s += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return s; };
// A stroke drawn twice is drawn once: its pieces are compared one by one, whichever way they run.
function sinRepetir(lineas) {
  const vistos = new Set(), out = [], id = (q) => `${Math.round(q[0] * 20)},${Math.round(q[1] * 20)}`;
  for (const p of lineas) {
    let cur = null;
    for (let i = 1; i < p.length; i++) {
      const a = id(p[i - 1]), b = id(p[i]), k = a < b ? `${a}|${b}` : `${b}|${a}`;
      if (a === b || vistos.has(k)) { cur = null; continue; }
      vistos.add(k); if (!cur) { cur = [p[i - 1]]; out.push(cur); } cur.push(p[i]);
    }
  }
  return out;
}
// linesimplify: drop the points that do not change the stroke by more than `tol`. A closed stroke, which starts and
// ends at the same point, is measured from that point.
function simplificar(p, tol) {
  if (p.length < 3) return p;
  const deja = new Uint8Array(p.length), pila = [[0, p.length - 1]]; deja[0] = deja[p.length - 1] = 1;
  while (pila.length) {
    const s = pila.pop(), a = p[s[0]], b = p[s[1]], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), cerrado = L < 1e-9;
    let peor = 0, cual = -1;
    for (let i = s[0] + 1; i < s[1]; i++) { const d = cerrado ? Math.hypot(p[i][0] - a[0], p[i][1] - a[1]) : Math.abs((p[i][0] - a[0]) * dy - (p[i][1] - a[1]) * dx) / L; if (d > peor) { peor = d; cual = i; } }
    if (peor > tol) { deja[cual] = 1; pila.push([s[0], cual], [cual, s[1]]); }
  }
  return p.filter((_, i) => deja[i]);
}
// linemerge: strokes whose ends touch become one stroke.
function unir(lineas, tol) {
  const mapa = new Map(), usada = new Uint8Array(lineas.length), out = [], celda = (q) => `${Math.round(q[0] / tol)},${Math.round(q[1] / tol)}`;
  lineas.forEach((p, i) => { for (const q of [p[0], p[p.length - 1]]) { const k = celda(q); if (!mapa.has(k)) mapa.set(k, []); mapa.get(k).push(i); } });
  const busca = (q) => {
    const x = Math.round(q[0] / tol), y = Math.round(q[1] / tol);
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (const i of mapa.get(`${x + a},${y + b}`) || []) {
      if (usada[i]) continue; const p = lineas[i];
      if (Math.hypot(p[0][0] - q[0], p[0][1] - q[1]) <= tol) return [i, false];
      if (Math.hypot(p[p.length - 1][0] - q[0], p[p.length - 1][1] - q[1]) <= tol) return [i, true];
    }
    return null;
  };
  for (let i = 0; i < lineas.length; i++) {
    if (usada[i]) continue; usada[i] = 1; let p = lineas[i].slice(), r;
    while ((r = busca(p[p.length - 1]))) { usada[r[0]] = 1; p = p.concat((r[1] ? lineas[r[0]].slice().reverse() : lineas[r[0]]).slice(1)); }
    while ((r = busca(p[0]))) { usada[r[0]] = 1; p = (r[1] ? lineas[r[0]] : lineas[r[0]].slice().reverse()).slice(0, -1).concat(p); }
    out.push(p);
  }
  return out;
}
// linesort: after each stroke, the pen goes to the nearest end of a stroke not yet drawn.
function ordenar(lineas) {
  const falta = lineas.slice(), out = []; let x = 0, y = 0;
  while (falta.length) {
    let mejor = 0, alreves = false, dmin = Infinity;
    falta.forEach((p, i) => { const d0 = Math.hypot(p[0][0] - x, p[0][1] - y), d1 = Math.hypot(p[p.length - 1][0] - x, p[p.length - 1][1] - y); if (d0 < dmin) { dmin = d0; mejor = i; alreves = false; } if (d1 < dmin) { dmin = d1; mejor = i; alreves = true; } });
    let el = falta.splice(mejor, 1)[0]; if (alreves) el = el.slice().reverse();
    out.push(el); x = el[el.length - 1][0]; y = el[el.length - 1][1];
  }
  return out;
}
// The sheets a plotter takes, in millimeters, upright.
export const HOJAS = { A4: [210, 297], A3: [297, 420] };
// From strokes to a sheet: the drawing grows to fill the page inside a margin of 15 mm (the page lies down if the
// drawing is wider than tall), with one layer per pen, and is counted: strokes, millimeters of ink, millimeters the
// pen travels in the air, and the minutes it would take at 40 mm/s drawing and 120 mm/s in the air (an estimate).
// `preparar: false` leaves the strokes as they were born, to compare. `unaPluma` puts everything in one layer.
export function preparar(trazos, o = {}) {
  const papel = HOJAS[o.hoja || 'A4'], margen = 15, capas = new Map();
  if (!papel) throw new Error(`No hay una hoja «${o.hoja}». Las que hay: ${Object.keys(HOJAS).join(', ')}`);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const t of trazos) for (const q of t.p) { if (q[0] < x0) x0 = q[0]; if (q[0] > x1) x1 = q[0]; if (q[1] < y0) y0 = q[1]; if (q[1] > y1) y1 = q[1]; }
  const bw = Math.max(1, x1 - x0), bh = Math.max(1, y1 - y0), hoja = bw > bh ? [papel[1], papel[0]] : papel, k = Math.min((hoja[0] - 2 * margen) / bw, (hoja[1] - 2 * margen) / bh), dx = (hoja[0] - bw * k) / 2 - x0 * k, dy = (hoja[1] - bh * k) / 2 - y0 * k;
  for (const t of trazos) { const c = o.unaPluma ? trazos[0].c : t.c; if (!capas.has(c)) capas.set(c, []); capas.get(c).push(t.p.map((q) => [dx + q[0] * k, dy + q[1] * k])); }
  const cuenta = { trazos: 0, puntos: 0, tinta: 0, aire: 0, minutos: 0 }, listas = [];
  for (const [color, crudas] of capas) {
    let L = crudas;
    if (o.preparar !== false) L = ordenar(unir(sinRepetir(L), 0.3).map((p) => simplificar(p, 0.05)).filter((p) => p.length > 1 && largo(p) > 0.4));
    let x = 0, y = 0;
    for (const p of L) { cuenta.trazos++; cuenta.puntos += p.length; cuenta.tinta += largo(p); cuenta.aire += Math.hypot(p[0][0] - x, p[0][1] - y); x = p[p.length - 1][0]; y = p[p.length - 1][1]; }
    listas.push({ color, lineas: L });
  }
  cuenta.minutos = cuenta.tinta / 40 / 60 + cuenta.aire / 120 / 60;
  return { hoja, capas: listas, cuenta };
}
const cent = (v) => Math.round(v * 100) / 100;
// The sheet as an SVG in millimeters, with one group per pen, as a plotter program expects it. For a screen, `vista`
// adds the paper (`papel`, a color), a name for who cannot see it (`nombre`), another ink per pen (`tinta(color)`)
// and the pen's travel in the air as dashes (`aire`, a color).
export function laminaSvg(L, vista) {
  const [w, h] = L.hoja;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" ${vista ? '' : `width="${w}mm" height="${h}mm" `}viewBox="0 0 ${w} ${h}"${vista ? (vista.nombre ? ` role="img" aria-label="${String(vista.nombre).replace(/[&<>"]/g, '')}"` : ' aria-hidden="true"') : ''}>`;
  if (vista && vista.papel) s += `<rect width="${w}" height="${h}" fill="${vista.papel}"/>`;
  L.capas.forEach((c, i) => {
    s += `<g id="layer${i + 1}" inkscape:groupmode="layer" inkscape:label="${i + 1}" fill="none" stroke="${vista && vista.tinta ? vista.tinta(c.color) : c.color}" stroke-width="0.35" stroke-linecap="round" stroke-linejoin="round">`;
    for (const p of c.lineas) s += `<polyline points="${p.map((q) => `${cent(q[0])},${cent(q[1])}`).join(' ')}"/>`;
    s += '</g>';
    if (vista && vista.aire) { let x = 0, y = 0, d = ''; for (const p of c.lineas) { d += `M${cent(x)} ${cent(y)}L${cent(p[0][0])} ${cent(p[0][1])}`; x = p[p.length - 1][0]; y = p[p.length - 1][1]; } s += `<path d="${d}" fill="none" stroke="${vista.aire}" stroke-width="0.18" stroke-dasharray="0.8 0.8" opacity="0.55"/>`; }
  });
  return s + '</svg>';
}
// One sheet, whole: its strokes, prepared and laid out.
export function lamina(G, id, o = {}) { return preparar(trazosDe(G, id, o), o); }
