// The mycelium of an entity: a welcome piece for a phone screen. A rectangle is cut again and again; the cuts form a
// network, and hyphae grow along it from a few foci at the bottom, fork at every crossing and merge. A young hypha
// is a thin plain line; as it ages it takes a holographic sheen that shifts when the piece tilts.
// It is the user's Rive script "Cordura · Micelio de silicio holográfico" (referencias/cordura-micelio-rive.lua, a
// port of referencias/cordura-micelio.html) without Rive: the same structure, growth and timing. What changed: the
// hologram runs through the entity's colors instead of the visible spectrum, the ground, the young line and the sheen
// are the entity's, the foci and the pace come from its genes, and randomness is the generator's.
// `micelio()` builds the structure and says what is drawn at a moment (no DOM: Node tests it); `pintarMicelio()`
// draws one frame on a canvas 2D context; `vaivenMicelio()` is the automatic sway of the tilt.
import { hash, rng } from '../../entidades/semilla.mjs';

// The original's fixed settings: the screen (iPhone 16 Plus, in points), ten levels of maturity, four classes of
// facet, the longest stretch colored by its own age, and the user's parameters (depth 9, smallest cell 3 %,
// irregular speed 60 %, pause at forks 30 %, filled cells 1 %, maturing 32 %).
const MIC = { W: 430, H: 932, NIVELES: 10, FACETAS: 4, TRAMO: 36, PUNTA: 0.03, PISO: 0.251, FUNDIDO: 1.6, PROFUNDIDAD: 9, MINIMO: 3, IRREGULAR: 0.6, PAUSA: 0.3, RELLENO: 0.01, MADURA: 0.32 };
const suave = (v) => { v = Math.max(0, Math.min(1, v)); return v * v * (3 - 2 * v); };

// 1) The structure: recursive cuts → segments (the future hyphae) and leaves (the cells).
function arbolMicelio(seed) {
  const rand = rng(seed + 777); rand(); rand(); rand();
  const SPX = MIC.W * 1.02, SPY = MIC.H * 1.02, minimo = Math.min(SPX, SPY) * MIC.MINIMO / 100, segs = [], hojas = [];
  const sub = (x, y, w, h, d) => {
    const grande = w * h > SPX * SPY * 0.05;
    if (d <= 0 || w < minimo || h < minimo || (!grande && rand() < 0.14)) { const llena = rand() < MIC.RELLENO; rand(); hojas.push({ x, y, w, h, llena, f: 0 }); return; }
    if (w >= h ? rand() < 0.72 : rand() < 0.28) {
      const sx = x + w * (0.32 + rand() * 0.36);
      segs.push({ v: true, x: sx, a: y, b: y + h, pts: [] }); rand();
      sub(x, y, sx - x, h, d - 1); sub(sx, y, x + w - sx, h, d - 1);
    } else {
      const sy = y + h * (0.32 + rand() * 0.36);
      segs.push({ v: false, y: sy, a: x, b: x + w, pts: [] }); rand(); rand();
      sub(x, y, w, sy - y, d - 1); sub(x, sy, w, y + h - sy, d - 1);
    }
  };
  sub(MIC.W / 2 - SPX / 2, MIC.H / 2 - SPY / 2, SPX, SPY, MIC.PROFUNDIDAD);
  return { segs, hojas };
}

// 2) The network: nodes are crossings and ends, edges the stretches between them. Every edge has its own speed and
//    every node a pause; a shortest-path search from the foci says when the front reaches each node.
function redMicelio(seed, segs, hojas, focos) {
  const rand = rng(seed * 31 + 4242), nodos = [], aristas = [], mapa = new Map(), EPS = 0.01;
  const nodo = (x, y) => {
    const k = Math.round(x * 100) + ',' + Math.round(y * 100);
    if (!mapa.has(k)) { nodos.push({ x, y, adj: [], llega: Infinity, sale: Infinity, pausa: 0 }); mapa.set(k, nodos.length - 1); }
    return mapa.get(k);
  };
  const V = segs.filter((s) => s.v), Hs = segs.filter((s) => !s.v);
  for (const s of segs) s.pts = [s.a, s.b];
  for (const v of V) for (const h of Hs) if (v.x >= h.a - EPS && v.x <= h.b + EPS && h.y >= v.a - EPS && h.y <= v.b + EPS) { v.pts.push(h.y); h.pts.push(v.x); }
  for (const s of segs) {
    const p = [...s.pts].sort((a, b) => a - b), u = [p[0]];
    for (let i = 1; i < p.length; i++) if (p[i] - u[u.length - 1] > EPS) u.push(p[i]);
    for (let i = 0; i < u.length - 1; i++) {
      const a = s.v ? nodo(s.x, u[i]) : nodo(u[i], s.y), b = s.v ? nodo(s.x, u[i + 1]) : nodo(u[i + 1], s.y);
      if (a === b) continue;
      const largo = u[i + 1] - u[i], w = largo * Math.exp((rand() - 0.5) * 2 * MIC.IRREGULAR * 0.9), n = Math.max(1, Math.ceil(largo / MIC.TRAMO)), piezas = [];
      for (let k = 0; k < n; k++) piezas.push([k / n, (k + 1) / n, ((((aristas.length * 73856093) % 4294967296) ^ ((k * 19349663) % 4294967296)) >>> 0) % MIC.FACETAS]);
      aristas.push({ a, b, largo, w, piezas }); nodos[a].adj.push(aristas.length - 1); nodos[b].adj.push(aristas.length - 1);
    }
  }
  for (const n of nodos) n.pausa = MIC.PAUSA * rand() * 40;
  // The foci of colonization, near the bottom edge.
  const cerca = (x, y) => { let mejor = 0, d = Infinity; nodos.forEach((n, i) => { const q = (n.x - x) ** 2 + (n.y - y) ** 2; if (q < d) { d = q; mejor = i; } }); return mejor; };
  for (let i = 0; i < focos; i++) {
    const foco = nodos[cerca(MIC.W * ((i + 0.5) / focos + (rand() - 0.5) * 0.5 / focos), MIC.H + 10)], desde = rand() * 40;
    if (desde < foco.llega) foco.llega = desde;
  }
  const hecho = new Uint8Array(nodos.length);
  for (;;) {
    let u = -1, m = Infinity;
    for (let i = 0; i < nodos.length; i++) if (!hecho[i] && nodos[i].llega < m) { m = nodos[i].llega; u = i; }
    if (u < 0) break;
    hecho[u] = 1;
    const nu = nodos[u]; nu.sale = nu.llega + nu.pausa;
    for (const ei of nu.adj) { const e = aristas[ei], o = nodos[e.a === u ? e.b : e.a]; if (nu.sale + e.w < o.llega) o.llega = nu.sale + e.w; }
  }
  let fin = 0;
  for (const e of aristas) { const t = Math.min(nodos[e.a].sale, nodos[e.b].sale) + e.w; if (t < Infinity && t > fin) fin = t; }
  for (const n of nodos) if (n.sale === Infinity) { n.sale = fin; n.llega = fin; }
  const sc = fin > 0 ? 1 / fin : 1;
  // A filled cell appears when the network reaches its center.
  for (const l of hojas) if (l.llena) l.f = nodos[cerca(l.x + l.w / 2, l.y + l.h / 2)].llega * sc;
  return { nodos, aristas, sc };
}

// The mycelium of an entity for a key, on a stage of 430 × 932. The entity decides: a focus of colonization for every
// defined center, the time to grow at the pace of its type (4 s is ALMA's), and the colors: the ink ground, a steel
// young line, and a hologram that runs through its piece colors and ends in its accent, as the spectrum ends in red.
// `tramos(t)` gives what is drawn at second `t`: for every level of maturity (0 young … 10 mature) and facet class, the
// stretches of hypha as [x1, y1, x2, y2, …]. It grows once and stays: after `crece` seconds everything is mature.
export function micelio(G, clave, o = {}) {
  const C = G.pieza, seed = hash(`micelio|${G.semilla}|${clave}`) % 100000, { segs, hojas } = arbolMicelio(seed), focos = Math.max(1, Math.min(9, G.focos));
  const { nodos, aristas, sc } = redMicelio(seed, segs, hojas, focos), crece = 4 * G.ritmo;
  const M = { ancho: MIC.W, alto: MIC.H, focos, crece, sostiene: 4, nodos, aristas, hojas: hojas.filter((l) => l.llena), sc,
    base: C.base, joven: C.barras[4], celda: G.fondo.dark.base, brillo: C.tinta, espectro: [C.barras[1], C.barras[0], C.barras[2], C.barras[3], C.acento], holograma: o.holograma ?? 0.6 };
  M.tramos = (t) => {
    const out = Array.from({ length: MIC.NIVELES + 1 }, () => Array.from({ length: MIC.FACETAS }, () => []));
    const porUnidad = sc * 0.9 * crece, tu = t / porUnidad, retraso = MIC.PUNTA * crece, madura = Math.max(0.05, MIC.MADURA * crece * 0.8);
    for (const e of aristas) {
      const A = nodos[e.a], B = nodos[e.b];
      let pa = Math.max(0, Math.min(1, (tu - A.sale) / e.w)), pb = Math.max(0, Math.min(1, (tu - B.sale) / e.w));
      if (pa <= 0 && pb <= 0) continue;
      if (pa + pb >= 1) { pa = 1; pb = 1; }
      const dx = B.x - A.x, dy = B.y - A.y;
      for (const [p0, p1, cls] of e.piezas) {
        // A stretch grows from each of its ends that the front has reached; when both halves meet, it is one.
        const porA = pa > p0, porB = 1 - pb < p1;
        if (!porA && !porB) continue;
        let a0 = porA ? p0 : null, a1 = porA ? Math.min(p1, pa) : null, b0 = porB ? Math.max(p0, 1 - pb) : null, b1 = porB ? p1 : null;
        if (porA && porB && a1 >= b0 - 1e-9) { a1 = b1; b0 = null; b1 = null; }
        let edad = -Infinity;
        if (porA) edad = Math.max(edad, (tu - (A.sale + p0 * e.w)) * porUnidad);
        if (porB) edad = Math.max(edad, (tu - (B.sale + (1 - p1) * e.w)) * porUnidad);
        const lista = out[Math.round(suave((edad - retraso) / madura) * MIC.NIVELES)][cls];
        if (a0 !== null && a1 - a0 >= 1e-4) lista.push(A.x + dx * a0, A.y + dy * a0, A.x + dx * a1, A.y + dy * a1);
        if (b0 !== null && b1 - b0 >= 1e-4) lista.push(A.x + dx * b0, A.y + dy * b0, A.x + dx * b1, A.y + dy * b1);
      }
    }
    return out;
  };
  return M;
}

// The automatic sway of the tilt, in degrees, at second `reloj`: 0.15 Hz and 25° in the original.
export function vaivenMicelio(reloj) { const w = reloj * 0.15 * Math.PI * 2; return [25 * Math.sin(w), 25 * 0.6 * Math.sin(w * 0.63 + 1.3)]; }

// One frame at second `t` with the piece tilted `tx`, `ty` degrees, on a context already scaled to the stage. Three
// layers, as in the original: the plain young line, the hologram (a grating at 35° whose colors slide with the tilt,
// a little apart for every facet class, with parallax) and a sheen that follows the tilt.
export function pintarMicelio(ctx, M, t, tx = 0, ty = 0) {
  const W = M.ancho, H = M.alto, T = M.tramos(t), fundido = 1 - suave((t - (M.crece + M.sostiene)) / MIC.FUNDIDO);
  const traza = (s) => { ctx.beginPath(); for (let k = 0; k < s.length; k += 4) { ctx.moveTo(s[k], s[k + 1]); ctx.lineTo(s[k + 2], s[k + 3]); } ctx.stroke(); };
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; ctx.fillStyle = M.base; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = M.celda;
  for (const l of M.hojas) { const a = suave((t - (l.f * 0.9 * M.crece + 0.05 * M.crece)) / (0.12 * M.crece)) * fundido; if (a > 0.002) { ctx.globalAlpha = a; ctx.fillRect(l.x, l.y, l.w, l.h); } }
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = M.joven; ctx.lineWidth = 0.7;
  for (let j = 0; j <= MIC.NIVELES; j++) { ctx.globalAlpha = (1 - (1 - MIC.PISO) * j / MIC.NIVELES) * fundido; for (const s of T[j]) if (s.length) traza(s); }
  // The grating: mirrored periods of the entity's colors along its direction; the tilt slides them.
  const phi = 35 * Math.PI / 180, dx = Math.cos(phi), dy = Math.sin(phi), P = 320, n = Math.ceil((W * Math.abs(dx) + H * Math.abs(dy)) / 2 / P) + 1, U0 = -(n + 2), U1 = n;
  const corre = (tx * dx + ty * dy) / 10 * 0.45, E = M.espectro, grad = [];
  for (let c = 0; c < MIC.FACETAS; c++) {
    const off = (((corre + c / MIC.FACETAS * 0.35) % 2) + 2) % 2, g = ctx.createLinearGradient(W / 2 + dx * P * (U0 + off), H / 2 + dy * P * (U0 + off), W / 2 + dx * P * (U1 + off), H / 2 + dy * P * (U1 + off));
    for (let k = U0; k < U1; k++) for (let i = k > U0 ? 1 : 0; i < E.length; i++) g.addColorStop((k + i / (E.length - 1) - U0) / (U1 - U0), E[((k % 2) + 2) % 2 === 0 ? i : E.length - 1 - i]);
    grad.push(g);
  }
  const inclinado = Math.hypot(tx, ty), holo = Math.max(0, Math.min(1, M.holograma * (1 - 0.4 * (1 - Math.exp(-((inclinado / 40) ** 2)))))), par = 2 / 30;
  const destello = ctx.createRadialGradient(W / 2 + tx * 7, H / 2 + ty * 7, 0, W / 2 + tx * 7, H / 2 + ty * 7, 240);
  destello.addColorStop(0, M.brillo + 'FF'); destello.addColorStop(0.45, M.brillo + '59'); destello.addColorStop(1, M.brillo + '00');
  for (let j = 1; j <= MIC.NIVELES; j++) for (let c = 0; c < MIC.FACETAS; c++) {
    const s = T[j][c], tj = j / MIC.NIVELES;
    if (!s.length) continue;
    if (tj * holo * fundido > 0.002) { ctx.save(); ctx.translate(tx * par, ty * par); ctx.globalAlpha = tj * holo * fundido; ctx.strokeStyle = grad[c]; ctx.lineWidth = 0.9; traza(s); ctx.restore(); }
    if (tj * 0.35 * fundido > 0.002) { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = tj * 0.35 * fundido; ctx.strokeStyle = destello; ctx.lineWidth = 1.1; traza(s); ctx.restore(); }
  }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
}
