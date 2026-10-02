// A creature with volume: the entity's flat creature (generador.mjs) as two round solids and two eyes, drawn with
// lines and seen from a camera that moves around it. The same name gives the same creature, flat or with volume.
// The idea of drawing volume with lines alone, and of showing a line only where nothing stands between it and the
// eye, comes from fogleman/ln (MIT); nothing of its code is used.
// `criatura3d()` builds the creature (no DOM: Node tests it); `pintarCriatura()` draws one frame on a canvas 2D context.
import { hash, rng } from './semilla.mjs';

const VUELTA = Math.PI * 2;

// A ray from o along d (not normalized) meets an ellipsoid at the smallest t between `min` and `max`, or -1.
function toca(S, o, d, min, max) {
  const ox = (o[0] - S.c[0]) / S.r[0], oy = (o[1] - S.c[1]) / S.r[1], oz = (o[2] - S.c[2]) / S.r[2], dx = d[0] / S.r[0], dy = d[1] / S.r[1], dz = d[2] / S.r[2];
  const a = dx * dx + dy * dy + dz * dz, b = 2 * (ox * dx + oy * dy + oz * dz), c = ox * ox + oy * oy + oz * oz - 1;
  let q = b * b - 4 * a * c;
  if (q < 0) return -1;
  q = Math.sqrt(q);
  let t = (-b - q) / (2 * a); if (t > min && t < max) return t;
  t = (-b + q) / (2 * a); return t > min && t < max ? t : -1;
}
// A point of solid `suyo` is seen if no solid stands between it (moved a hair off its own surface) and the eye.
export function seVe(solidos, suyo, p, ojo) {
  const q = [0, 1, 2].map((k) => suyo.c[k] + (p[k] - suyo.c[k]) * 1.012), d = [ojo[0] - q[0], ojo[1] - q[1], ojo[2] - q[2]];
  for (const s of solidos) if (toca(s, q, d, 1e-4, 1) > 0) return false;
  return true;
}
// The outline of an ellipsoid from the eye: on the unit sphere it is a circle facing the eye.
function contorno(S, ojo, n) {
  const e = [0, 1, 2].map((k) => (ojo[k] - S.c[k]) / S.r[k]), L2 = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], L = Math.sqrt(L2);
  const k = [e[0] / L, e[1] / L, e[2] / L], ro = Math.sqrt(Math.max(0, 1 - 1 / L2)), a = Math.abs(k[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  let u = [a[1] * k[2] - a[2] * k[1], a[2] * k[0] - a[0] * k[2], a[0] * k[1] - a[1] * k[0]]; const ul = Math.hypot(u[0], u[1], u[2]); u = [u[0] / ul, u[1] / ul, u[2] / ul];
  const v = [k[1] * u[2] - k[2] * u[1], k[2] * u[0] - k[0] * u[2], k[0] * u[1] - k[1] * u[0]], out = [];
  for (let i = 0; i <= n; i++) { const t = VUELTA * i / n, cs = Math.cos(t) * ro, sn = Math.sin(t) * ro; out.push([0, 1, 2].map((j) => S.c[j] + (k[j] / L + u[j] * cs + v[j] * sn) * S.r[j])); }
  return out;
}
// Rings around a solid's vertical axis: its only texture, as many as the entity says.
function anillos(S, cuantos, n) {
  const out = [];
  for (let j = 1; j <= cuantos; j++) { const f = -Math.PI / 2 + Math.PI * j / (cuantos + 1), p = []; for (let i = 0; i <= n; i++) { const t = VUELTA * i / n; p.push([S.c[0] + Math.cos(f) * Math.cos(t) * S.r[0], S.c[1] + Math.sin(f) * S.r[1], S.c[2] + Math.cos(f) * Math.sin(t) * S.r[2]]); } out.push(p); }
  return out;
}

// The creature of a name. The same draws as the flat creature, in the same order, become a round body, a second solid
// on the body's front (so that, seen from the front, it is the flat creature) and two eyes where a ray from the
// front first meets it. Its rings are the first of the entity's numbers; it is filled or in line as its emblems are.
export function criatura3d(G, clave) {
  const r = rng(hash(`criatura|${G.semilla}|${String(clave).trim().toLowerCase()}`)), C = G.pieza;
  const cuerpo = 0.5 + r() * 0.2, colores = [...C.barras, C.acento], i = Math.floor(r() * colores.length), j = (i + 1 + Math.floor(r() * (colores.length - 1))) % colores.length;
  const ancho = cuerpo * (0.3 + r() * 0.9), alto = cuerpo * 0.9, sube = cuerpo * (0.3 - (r() * 0.25 - 0.1)), mira = (r() * 2 - 1) * cuerpo * 0.03, R = cuerpo / 2;
  const A = { c: [0, 0, 0], r: [R, R, R], color: colores[i] }, B = { c: [0, sube, R * 0.78], r: [ancho / 2, alto / 2, Math.min(ancho / 2, R * 0.6)], color: colores[j] };
  const ojos = [-1, 1].map((s) => {
    const o = [s * (cuerpo * 0.32 - mira), cuerpo * 0.1, 5], d = [0, 0, -1], ta = toca(A, o, d, 0, 10), tb = toca(B, o, d, 0, 10), t = ta < 0 ? tb : tb < 0 ? ta : Math.min(ta, tb);
    return { p: [o[0], o[1], 5 - t], de: t === ta ? A : B, radio: cuerpo * 0.085 };
  });
  return { solidos: [A, B], ojos, base: C.base, alto: Math.max(R, sube + alto / 2), bajo: -R,
    anillos: G.numeros && G.numeros.length ? G.numeros[0] : 3, lleno: !!G.relleno, redondo: G.redondez > 0, trazo: G.trazo };
}

// The camera of a frame: an eye that looks at the creature from `giro` radians around it (0 is the front), and the
// projection of a point to a box of `lado` pixels: [x, y, depth].
export function camara(K, lado, giro) {
  const D = 3.2, ojo = [Math.sin(giro) * D, 0.55, Math.cos(giro) * D], t = [0, (K.alto + K.bajo) / 2, 0];
  let f = [t[0] - ojo[0], t[1] - ojo[1], t[2] - ojo[2]]; const fl = Math.hypot(f[0], f[1], f[2]); f = [f[0] / fl, f[1] / fl, f[2] / fl];
  const dl = Math.hypot(f[2], f[0]), d = [-f[2] / dl, 0, f[0] / dl], u = [d[1] * f[2] - d[2] * f[1], d[2] * f[0] - d[0] * f[2], d[0] * f[1] - d[1] * f[0]], F = lado * 2.55;
  const pr = (p) => { const x = p[0] - ojo[0], y = p[1] - ojo[1], z = p[2] - ojo[2], pz = x * f[0] + y * f[1] + z * f[2]; return [lado / 2 + (x * d[0] + z * d[2]) / pz * F, lado / 2 - (x * u[0] + y * u[1] + z * u[2]) / pz * F, pz]; };
  return { ojo, f, d, u, F, pr };
}

// One frame in a box of `lado` pixels. In line, each solid is its outline and its rings, in its color. Filled (as the
// entity's emblems are), each solid is a field of its color with its rings in the ground's color; the fill needs
// `tela`, a small canvas of the page's, where one ray per pixel says which solid is in front. `trazo` is the line's
// width in pixels. The eyes are dots, seen only from where the face is, and they narrow when seen from the side.
export function pintarCriatura(ctx, K, lado, giro, o = {}) {
  const V = camara(K, lado, giro), { ojo, f, d, u, F, pr } = V, S = K.solidos, trazo = o.trazo || Math.max(1.25, lado / 96 * K.trazo), lleno = K.lleno && !!o.tela;
  ctx.fillStyle = K.base; ctx.fillRect(0, 0, lado, lado);
  ctx.lineJoin = 'round'; ctx.lineCap = K.redondo ? 'round' : 'butt';
  if (lleno) {
    const n = Math.min(300, Math.round(lado)), cv = o.tela;
    if (cv.width !== n || cv.height !== n) cv.width = cv.height = n;
    const c2 = cv.getContext('2d'), im = c2.createImageData(n, n), px = im.data, k = lado / n, tintas = S.map((s) => [1, 3, 5].map((a) => parseInt(s.color.slice(a, a + 2), 16)));
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const X = (i + 0.5) * k - lado / 2, Y = (j + 0.5) * k - lado / 2, dir = [f[0] * F + d[0] * X - u[0] * Y, f[1] * F - u[1] * Y, f[2] * F + d[2] * X - u[2] * Y];
      let cual = -1, cerca = 1e9;
      for (let m = 0; m < S.length; m++) { const t = toca(S[m], ojo, dir, 1e-6, cerca); if (t > 0) { cerca = t; cual = m; } }
      if (cual >= 0) { const a = (j * n + i) * 4; px[a] = tintas[cual][0]; px[a + 1] = tintas[cual][1]; px[a + 2] = tintas[cual][2]; px[a + 3] = 255; }
    }
    c2.putImageData(im, 0, 0); ctx.imageSmoothingEnabled = true; ctx.drawImage(cv, 0, 0, lado, lado);
  }
  const orden = S.slice().sort((a, b) => pr(b.c)[2] - pr(a.c)[2]);
  orden.forEach((s, si) => {
    [contorno(s, ojo, 96), ...anillos(s, si ? K.anillos : K.anillos + 1, 72)].forEach((L, li) => {
      ctx.strokeStyle = lleno && li ? K.base : s.color; ctx.lineWidth = li ? trazo * 0.75 : trazo; ctx.beginPath();
      let antes = false;
      for (const p of L) { const v = seVe(S, s, p, ojo); if (v) { const q = pr(p); if (antes) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); } antes = v; }
      ctx.stroke();
    });
  });
  for (const e of K.ojos) {
    if (!seVe(S, e.de, e.p, ojo)) continue;
    const c = e.de.c, r = e.de.r; let n = [0, 1, 2].map((k) => (e.p[k] - c[k]) / (r[k] * r[k])); const nl = Math.hypot(n[0], n[1], n[2]); n = [n[0] / nl, n[1] / nl, n[2] / nl];
    const v = [ojo[0] - e.p[0], ojo[1] - e.p[1], ojo[2] - e.p[2]], cos = (n[0] * v[0] + n[1] * v[1] + n[2] * v[2]) / Math.hypot(v[0], v[1], v[2]);
    if (cos <= 0.02) continue;
    const q = pr(e.p), q2 = pr([e.p[0] + n[0] * 0.05, e.p[1] + n[1] * 0.05, e.p[2] + n[2] * 0.05]), rad = e.radio / q[2] * F;
    ctx.fillStyle = lleno ? K.base : e.de.color; ctx.beginPath(); ctx.ellipse(q[0], q[1], Math.max(0.5, rad * cos), rad, Math.atan2(q2[1] - q[1], q2[0] - q[0]), 0, VUELTA); ctx.fill();
  }
}

// The sway of a creature at second `t`: it turns a little to each side and shows its face nearly all the time.
export function vaivenCriatura(t, ritmo = 1) { return 0.85 * Math.sin(t * 0.64 / ritmo); }
