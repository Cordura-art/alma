// Terreno: a stretch of ground in thin line. At rest it is a few low dunes and one hill; the pointer carries the hill
// with it, and the ground rises where it goes. One figure, one idea: something continuous that answers where you are.
// The lines are its cross-sections, far to near; each hides what lies behind it, as the ground itself would.
//
// An entity's own ground: one dune where each defined center of its chart lies (its body laid on the ground, head
// far), as high as its numbers say and as wide as it is round; more or fewer lines as it is complex; and an entity of
// blocks has its ground in terraces.
(function (raiz, hace) {
  const T = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = T;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const PUNTOS = 44, TOPE = 0.92, LEJOS = 0.72;
  const CENTROS = { cabeza: [-0.55, -0.55], ajna: [-0.32, -0.38], garganta: [-0.1, -0.2], g: [0.05, 0], corazon: [0.36, -0.14], bazo: [-0.42, 0.3], plexo: [0.46, 0.3], sacral: [0.14, 0.36], raiz: [0.3, 0.58] };
  const orilla = (v) => { const t = Math.max(0, Math.min(1, (1 - Math.abs(v)) / 0.3)); return t * t * (3 - 2 * t); };      // the ground comes down to nothing at its edges

  function modelo(G) {
    // With no entity: ALMA's own ground, always the same low, wide dunes.
    let DUNAS = [[-0.52, -0.34, 0.2, 0.36], [0.5, 0.42, 0.15, 0.32], [-0.3, 0.55, 0.11, 0.26], [0.58, -0.52, 0.09, 0.22]], FILAS = 27, CASA = [0.22, -0.18], terrazas = false;
    if (G) {
      const cs = (G.centros || []).filter((c) => CENTROS[c]), ns = G.numeros && G.numeros.length ? G.numeros : [4], ancha = 0.2 + 0.16 * (G.redondez == null ? 0.5 : G.redondez);
      if (cs.length) DUNAS = cs.map((c, i) => [CENTROS[c][0], CENTROS[c][1], 0.08 + 0.02 * ns[i % ns.length], ancha]);
      FILAS = Math.max(21, Math.min(31, 17 + 3 * (G.complejidad || 3))); terrazas = !!G.anguloso;
      // Its hill rests away from its dunes: across the ground from where they weigh most.
      const mx = DUNAS.reduce((a, d) => a + d[0], 0) / DUNAS.length, my = DUNAS.reduce((a, d) => a + d[1], 0) / DUNAS.length, l = Math.hypot(mx, my) || 1; CASA = [-mx / l * 0.34, -my / l * 0.34];
    }
    // How high the ground is at a place, with the hill at (hx, hy), `fuerza` of it showing (0–1), at this intensity.
    function altura(x, y, hx, hy, fuerza, intensidad) {
      let h = 0; for (const d of DUNAS) h += d[2] * Math.exp(-((x - d[0]) ** 2 + (y - d[1]) ** 2) / (2 * d[3] * d[3]));
      const radio = 0.26 + 0.14 * intensidad, alto = (0.2 + 0.5 * intensidad) * fuerza;
      h += alto * Math.exp(-((x - hx) ** 2 + (y - hy) ** 2) / (2 * radio * radio));
      if (terrazas) { const paso = 0.085, s = h / paso, p = Math.floor(s), t = Math.max(0, Math.min(1, (s - p - 0.36) / 0.28)); h = paso * (p + t * t * (3 - 2 * t)); }      // flat steps with short, steep risers
      return TOPE * Math.tanh(h / TOPE) * orilla(x) * orilla(y);      // however much is asked of it, it never goes over its top
    }
    // The camera that holds all of it, at its highest.
    function camaraDe() {
      const C = AlmaFigura.camara({ alza: 34 }), p = [[-1, -1, 0], [1, -1, 0], [1, 1, 0], [-1, 1, 0]];
      // The hill as far back as it goes, as strong as it gets: the highest the ground is ever drawn.
      for (let i = 0; i <= 12; i++) for (let j = 0; j <= 12; j++) { const x = -0.9 + 0.15 * i, y = -0.9 + 0.15 * j; p.push([x, y, altura(x, y, -LEJOS, -LEJOS, 1, 1)]); }
      return C.encuadra(p, 16);
    }
    function monta(f) {
      const C = camaraDe(), filas = [], tapas = [];
      // Far to near: a line, then the strip of ground between it and the next, which hides what is behind.
      for (let j = 0; j < FILAS; j++) {
        if (j) tapas.push(f.nodo('path', { class: 'tapa' }, f.svg));
        if (j) tapas[j - 1].lados = f.nodo('path', { class: 'borde' }, f.svg);
        filas.push(f.nodo('path', { class: j === 0 || j === FILAS - 1 ? 'borde' : '' }, f.svg));
      }
      const cima = f.nodo('circle', { class: 'acento', r: 3 }, f.svg);
      const hx = f.resorte(CASA[0]), hy = f.resorte(CASA[1]), fuerza = f.resorte(0.45, { k: 70, c: 15 }); let clara = -1;
      return {
        cuadro(dt) {
          // Where the pointer is on the flat ground; the hill goes there. Left alone, it goes home and sinks to its rest.
          const p = f.puntero, s = p.dentro ? C.alSuelo(p.x, p.y) : CASA, lim = (v) => Math.max(-LEJOS, Math.min(LEJOS, v));
          hx.meta = lim(s[0]); hy.meta = lim(s[1]); fuerza.meta = p.dentro ? 1 : 0.45;
          let mueve = f.paso(hx, dt, f.quieto); mueve = f.paso(hy, dt, f.quieto) || mueve; mueve = f.paso(fuerza, dt, f.quieto) || mueve;
          const I = f.intensidad, de = (j) => -1 + 2 * j / (FILAS - 1); let previa = null;
          for (let j = 0; j < FILAS; j++) {
            const y = de(j), pts = [];
            for (let i = 0; i < PUNTOS; i++) { const x = -1 + 2 * i / (PUNTOS - 1); pts.push(C.a(x, y, altura(x, y, hx.x, hy.x, fuerza.x, I))); }
            filas[j].setAttribute('d', f.linea(pts));
            if (previa) { tapas[j - 1].setAttribute('d', f.linea(previa.concat(pts.slice().reverse()), true)); tapas[j - 1].lados.setAttribute('d', f.linea([previa[0], pts[0]]) + f.linea([previa[PUNTOS - 1], pts[PUNTOS - 1]])); }
            previa = pts;
          }
          // Its one bright line is the cross-section through the hill, and its one mark is the hill's top; both are
          // painted where they belong, so that nearer ground hides them.
          const j0 = Math.max(1, Math.min(FILAS - 2, Math.round((hy.x + 1) / 2 * (FILAS - 1))));
          if (j0 !== clara) { if (clara > 0) filas[clara].setAttribute('class', ''); filas[j0].setAttribute('class', 'realce'); filas[j0 + 1].after(cima); clara = j0; }
          const yj = de(j0), alto = altura(hx.x, yj, hx.x, hy.x, fuerza.x, I), q = C.a(hx.x, yj, alto); cima.setAttribute('cx', q[0].toFixed(1)); cima.setAttribute('cy', q[1].toFixed(1));
          const n = (v) => (Math.round(v * 10) / 10).toFixed(1).replace('.', ',').replace('-', '−');
          f.lee(p.dentro ? 'Cima en ' + n(hx.meta) + ' · ' + n(hy.meta) + ', altura ' + Math.round(alto / TOPE * 100) + ' %' : 'En reposo');
          return mueve;
        },
      };
    }
    return { altura, camaraDe, monta, FILAS, PUNTOS, TOPE, LEJOS, CASA, DUNAS, terrazas };
  }

  if (AlmaFigura.define) AlmaFigura.define('terreno', {
    describe: 'Un terreno de dunas dibujado en línea fina. Una colina sigue al puntero.',
    monta(f) { return modelo(f.genes).monta(f); },
  });
  return Object.assign(modelo(null), { modelo });
});
