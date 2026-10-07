// ALMA's line figures: the engine. A figure is one object drawn in thin line, seen from above and to one side, that
// answers the pointer. Everything a figure needs is here: a camera, springs, one shared clock, the pointer (and the
// keyboard in its place), and the five tones of line, which are ALMA tokens by name.
//
// What every figure keeps to:
//   suelo     the pointer is read on the ground the figure stands on at rest, never on what has already moved
//   alcance   nothing leaves the picture (400 × 320), whatever the pointer and the intensity do
//   acento    line only: no fills but the ground color that hides what is behind; one mark in the accent color
//   reposo    at rest it is already a composed thing, not flat and not blank
//   orden     far things are painted first; what is near hides what is behind it
//   descanso  it moves only while something changes; out of sight, or asked for less motion, it is still
//   silencio  no words in the drawing: what it says goes to its caption
//   redondo   a solid is its outline and one soft crease where its top turns; its upright corners are never drawn
(function (raiz, fabrica) {
  const M = fabrica();
  if (typeof module === 'object' && module.exports) module.exports = M; else raiz.AlmaFigura = M;
})(typeof self !== 'undefined' ? self : this, function () {
  const ANCHO = 400, ALTO = 320, SVG = 'http://www.w3.org/2000/svg';

  // ---------- The camera. It looks down on the ground from one corner, with no perspective: `giro` degrees around,
  // `alza` degrees above. x runs down to the right, y down to the left, z up.
  function camara(o) {
    o = o || {}; const a = (o.giro == null ? 45 : o.giro) * Math.PI / 180, e = (o.alza == null ? 30 : o.alza) * Math.PI / 180;
    const ca = Math.cos(a), sa = Math.sin(a), se = Math.sin(e), ce = Math.cos(e);
    const C = { escala: o.escala || 100, cx: o.cx == null ? ANCHO / 2 : o.cx, cy: o.cy == null ? ALTO / 2 : o.cy, mira: [sa, ca] };      // `mira`: the way to the camera, along the ground
    C.a = function (x, y, z) { return [C.cx + (x * ca - y * sa) * C.escala, C.cy + ((x * sa + y * ca) * se - (z || 0) * ce) * C.escala]; };
    // From the picture back to the ground (z = 0): where the pointer is, in the figure's own measures.
    C.alSuelo = function (px, py) { const u = (px - C.cx) / C.escala, w = (py - C.cy) / C.escala / se; return [u * ca + w * sa, -u * sa + w * ca]; };
    // The camera steps back and aside until all these points fit in the picture, with a margin.
    C.encuadra = function (puntos, margen) {
      margen = margen == null ? 14 : margen; C.escala = 1; C.cx = C.cy = 0; let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (const p of puntos) { const q = C.a(p[0], p[1], p[2]); x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); }
      C.escala = Math.min((ANCHO - 2 * margen) / (x1 - x0), (ALTO - 2 * margen) / (y1 - y0));
      C.cx = ANCHO / 2 - (x0 + x1) / 2 * C.escala; C.cy = ALTO / 2 - (y0 + y1) / 2 * C.escala; return C;
    };
    return C;
  }

  // ---------- A spring: a value that follows its goal, overshoots a little and settles. `paso` moves it on by `dt`
  // seconds and says whether it is still moving.
  function resorte(valor, o) { o = o || {}; return { x: valor, v: 0, meta: valor, k: o.k || 120, c: o.c || 20 }; }
  function paso(r, dt, quieto) {
    if (quieto) { r.x = r.meta; r.v = 0; return false; }
    const n = Math.max(1, Math.ceil(dt / 0.008)), h = dt / n;
    for (let i = 0; i < n; i++) { r.v += (-(r.x - r.meta) * r.k - r.v * r.c) * h; r.x += r.v * h; }
    if (Math.abs(r.x - r.meta) < 0.0005 && Math.abs(r.v) < 0.0005) { r.x = r.meta; r.v = 0; return false; }
    return true;
  }
  // An easing curve of ALMA's (`cubic-bezier(a, b, c, d)`, as its motion tokens give it) as a function of time 0–1.
  function curva(texto) {
    const m = /cubic-bezier\(([^)]+)\)/.exec(texto || ''); const p = m ? m[1].split(',').map(Number) : [0.4, 0.14, 0.3, 1];
    const f = (t, a, b) => 3 * (1 - t) * (1 - t) * t * a + 3 * (1 - t) * t * t * b + t * t * t;
    return function (x) {
      if (x <= 0) return 0; if (x >= 1) return 1; let lo = 0, hi = 1;
      for (let i = 0; i < 24; i++) { const t = (lo + hi) / 2; if (f(t, p[0], p[2]) < x) lo = t; else hi = t; }
      return f((lo + hi) / 2, p[1], p[3]);
    };
  }

  const cifra = (v) => Math.round(v * 10) / 10;
  // A line through points of the picture, as the path it is.
  function linea(puntos, cierra) { let d = ''; for (let i = 0; i < puntos.length; i++) d += (i ? 'L' : 'M') + cifra(puntos[i][0]) + ' ' + cifra(puntos[i][1]); return d + (cierra ? 'Z' : ''); }

  // ---------- Rounded solids. A solid is a flat shape with round corners, raised: seen from the camera it is one
  // outline (its silhouette) and one crease, the near edge of its top. Its upright corners are round, so they have no line.
  // The shape, as points around it with the way each faces: `ancho` along x, `fondo` along y, corners of `radio`;
  // thirty-two sides to a full round, so that a corner reads as a curve.
  function redondo(ancho, fondo, radio, lados) {
    lados = lados || 32; const r = Math.min(radio, ancho / 2, fondo / 2), porEsquina = lados / 4, pts = [];
    const esquinas = [[ancho / 2 - r, fondo / 2 - r, 0], [-ancho / 2 + r, fondo / 2 - r, 90], [-ancho / 2 + r, -fondo / 2 + r, 180], [ancho / 2 - r, -fondo / 2 + r, 270]];
    for (const e of esquinas) for (let i = 0; i <= porEsquina; i++) { const t = (e[2] + 90 * i / porEsquina) * Math.PI / 180; pts.push({ x: e[0] + r * Math.cos(t), y: e[1] + r * Math.sin(t), nx: Math.cos(t), ny: Math.sin(t) }); }
    return pts;
  }
  // The smallest outline that holds all these points of the picture.
  function casco(puntos) {
    const p = puntos.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]), gira = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]), mitad = (lista) => { const h = []; for (const q of lista) { while (h.length >= 2 && gira(h[h.length - 2], h[h.length - 1], q) <= 0) h.pop(); h.push(q); } h.pop(); return h; };
    return mitad(p).concat(mitad(p.reverse()));
  }
  // A solid where it stands (`pose`: x, y, z of its base, and `giro`, its turn around its own upright, in radians),
  // `alto` high: its silhouette, the crease of its top, and its top itself, in the picture.
  function silueta(C, anillo, pose, alto) {
    const c = Math.cos(pose.giro || 0), s = Math.sin(pose.giro || 0), n = anillo.length, abajo = [], arriba = [], mira = [];
    for (const p of anillo) {
      const x = pose.x + p.x * c - p.y * s, y = pose.y + p.x * s + p.y * c; abajo.push(C.a(x, y, pose.z)); arriba.push(C.a(x, y, pose.z + alto));
      mira.push((p.nx * c - p.ny * s) * C.mira[0] + (p.nx * s + p.ny * c) * C.mira[1] > 1e-9);
    }
    let k = -1; for (let i = 0; i < n; i++) if (mira[i] && !mira[(i + n - 1) % n]) k = i;
    const pliegue = []; if (k >= 0) { pliegue.push(arriba[(k + n - 1) % n]); let i = k, cuenta = 0; for (; mira[i % n] && cuenta < n; i++, cuenta++) pliegue.push(arriba[i % n]); pliegue.push(arriba[i % n]); }
    return { casco: casco(abajo.concat(arriba)), pliegue, arriba };
  }

  // ---------- From here on, the page. (What is above also runs without one, so that it can be tested.)
  const figuras = {};
  function define(nombre, figura) { figuras[nombre] = figura; }
  function nodo(etiqueta, atributos, padre) {
    const n = document.createElementNS(SVG, etiqueta);
    for (const k in atributos || {}) n.setAttribute(k, atributos[k]);
    if (padre) padre.appendChild(n); return n;
  }
  // The five tones of line and the ground, as ALMA tokens; a page may give others to `.alma-figura`.
  const ESTILO = `
.alma-figura { --figura-fondo: var(--ui-02); --figura-realce: var(--text-01); --figura-borde: var(--text-02); --figura-medio: var(--text-03); --figura-lejos: var(--border-subtle); --figura-acento: var(--interactive-01); --figura-trazo: 1px;
  position: relative; display: block; width: 100%; aspect-ratio: 5 / 4; }
.alma-figura svg { display: block; width: 100%; height: 100%; background: var(--figura-fondo); border-radius: var(--radius-card); touch-action: pan-y; cursor: crosshair; }
.alma-figura svg:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
.alma-figura path, .alma-figura line { fill: none; stroke: var(--figura-medio); stroke-width: var(--figura-trazo); stroke-linejoin: round; stroke-linecap: round; vector-effect: non-scaling-stroke; }
.alma-figura .tapa { fill: var(--figura-fondo); stroke: none; } .alma-figura .tapa.borde, .alma-figura .tapa.realce { stroke-width: var(--figura-trazo); }
.alma-figura .lejos { stroke: var(--figura-lejos); } .alma-figura .borde { stroke: var(--figura-borde); } .alma-figura .realce { stroke: var(--figura-realce); }
.alma-figura .acento { fill: var(--figura-acento); stroke: var(--figura-fondo); }
.alma-figura .lee { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }`;
  function estilo(doc) { if (doc.getElementById('alma-figura-estilo')) return; const s = doc.createElement('style'); s.id = 'alma-figura-estilo'; s.textContent = ESTILO; doc.head.appendChild(s); }

  // One clock for every figure on the page. It runs only while some figure is moving.
  const vivas = new Set(); let pedido = 0, antes = 0;
  function tic(ahora) {
    const dt = Math.min(0.05, antes ? (ahora - antes) / 1000 : 0.016); antes = ahora; pedido = 0;
    for (const f of Array.from(vivas)) if (!f.visible || !f.cuadro(dt)) vivas.delete(f);
    if (vivas.size) pedido = requestAnimationFrame(tic); else antes = 0;
  }
  function despierta(f) { vivas.add(f); if (!pedido) pedido = requestAnimationFrame(tic); }

  // A figure on the page. `opciones`: intensidad (0–1), tema ('dark' | 'light' | none: the page's), etiqueta (what it is,
  // for those who do not see it), alLeer (what it says, each time it changes).
  function monta(donde, nombre, opciones) {
    const F = figuras[nombre]; if (!F) throw new Error('No hay una figura «' + nombre + '».');
    const o = Object.assign({ intensidad: 0.5 }, opciones); const doc = donde.ownerDocument; estilo(doc);
    donde.classList.add('alma-figura'); if (o.tema) donde.setAttribute('data-theme', o.tema);
    const svg = nodo('svg', { viewBox: '0 0 ' + ANCHO + ' ' + ALTO, role: 'img', tabindex: '0', 'aria-label': o.etiqueta || F.describe || nombre }, donde);
    const lee = doc.createElement('span'); lee.className = 'lee'; lee.setAttribute('aria-live', 'polite'); donde.appendChild(lee);
    const menos = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
    const estilos = getComputedStyle(donde); let dicho = '', turno = 0;
    const ctx = {
      svg, nodo, linea, camara, resorte, paso, redondo, silueta, ANCHO, ALTO,
      puntero: { dentro: false, tecla: false, x: ANCHO / 2, y: ALTO / 2 },
      get intensidad() { return o.intensidad; }, get quieto() { return menos.matches; },
      // ALMA's own clock for changes that are not the pointer's: its slow duration and its expressive curve.
      duracion: parseFloat(estilos.getPropertyValue('--duration-slow-02')) || 700, escalon: parseFloat(estilos.getPropertyValue('--duration-stagger')) || 20, suaviza: curva(estilos.getPropertyValue('--easing-standard-expressive')),
      // What the figure says. Those who listen hear it once it has stopped changing, not at every step.
      lee(texto) { if (texto === dicho) return; dicho = texto; if (o.alLeer) o.alLeer(texto); clearTimeout(turno); turno = setTimeout(() => { lee.textContent = texto; }, 400); },
      despierta() { despierta(yo); },
      // A solid on the page: its silhouette, which hides what is behind it, and its crease. `pon` draws it where it stands,
      // through the figure's camera (`ctx.camara`, which the figure sets to its own).
      solido(anillo, alto) {
        const g = nodo('g', {}, svg), fuera = nodo('path', { class: 'tapa borde' }, g), dentro = nodo('path', {}, g);
        return { g, fuera, pon(pose) { const S = silueta(ctx.camara, anillo, pose, alto); fuera.setAttribute('d', linea(S.casco, true)); dentro.setAttribute('d', linea(S.pliegue)); return S; } };
      },
    };
    const figura = F.monta(ctx);
    const yo = { visible: true, cuadro: (dt) => figura.cuadro(dt) };
    const lugar = (e) => { const r = svg.getBoundingClientRect(); ctx.puntero.x = (e.clientX - r.left) / r.width * ANCHO; ctx.puntero.y = (e.clientY - r.top) / r.height * ALTO; };
    const entra = (e) => { lugar(e); ctx.puntero.dentro = true; ctx.puntero.tecla = false; despierta(yo); }, sale = () => { ctx.puntero.dentro = false; ctx.puntero.tecla = false; despierta(yo); };
    // The arrow keys are a pointer too: they carry it across the picture; Escape lets go.
    const tecla = (e) => {
      const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
      if (e.key === 'Escape') return sale(); if (!d) return; e.preventDefault();
      if (figura.tecla && figura.tecla(d[0], d[1])) { ctx.puntero.dentro = true; ctx.puntero.tecla = true; return despierta(yo); }      // a figure may take the arrows as its own steps
      if (!ctx.puntero.dentro) { ctx.puntero.x = ANCHO / 2; ctx.puntero.y = ALTO / 2; }
      ctx.puntero.x = Math.max(0, Math.min(ANCHO, ctx.puntero.x + d[0] * 16)); ctx.puntero.y = Math.max(0, Math.min(ALTO, ctx.puntero.y + d[1] * 12)); ctx.puntero.dentro = true; despierta(yo);
    };
    svg.addEventListener('pointermove', entra); svg.addEventListener('pointerdown', entra); svg.addEventListener('pointerleave', sale); svg.addEventListener('pointercancel', sale);
    svg.addEventListener('keydown', tecla); svg.addEventListener('blur', sale);
    const ojo = typeof IntersectionObserver === 'function' ? new IntersectionObserver((v) => { yo.visible = v[0].isIntersecting; if (yo.visible) despierta(yo); }) : null; if (ojo) ojo.observe(donde);
    figura.cuadro(0); despierta(yo);
    return {
      pon(cambios) { Object.assign(o, cambios); if ('tema' in cambios) { if (o.tema) donde.setAttribute('data-theme', o.tema); else donde.removeAttribute('data-theme'); } if (cambios.etiqueta) svg.setAttribute('aria-label', o.etiqueta); despierta(yo); },
      suelta() { vivas.delete(yo); if (ojo) ojo.disconnect(); clearTimeout(turno); svg.remove(); lee.remove(); donde.classList.remove('alma-figura'); },
      get enMovimiento() { return vivas.has(yo); },
    };
  }
  return { ANCHO, ALTO, camara, resorte, paso, curva, linea, redondo, casco, silueta, define, monta, figuras };
});
