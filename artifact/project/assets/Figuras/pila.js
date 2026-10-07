// Pila: a stack of round-cornered tiles in thin line. At rest it is a neat stack, each tile turned a little from
// the one under it. Point at a tile and the stack opens over it: the tiles above lift and fan out, one after another,
// and the tile itself slides out toward you. One figure, one idea: picking one thing out of many that are alike.
//
// An entity's own stack: as many tiles as its sign has points, corners as round as it is (sharp, for an entity of
// blocks), as wide as it is and as thick as it is heavy; and at rest each tile is turned by one of its numbers.
(function (raiz, hace) {
  const P = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = P;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const AIRE = 0.03, G0 = Math.PI / 180;

  function modelo(G) {
    let FICHAS = 7, ANCHO = 1.5, FONDO = 1.0, RADIO = 0.24, GRUESO = 0.07, vuelta = (i) => (i - (FICHAS - 1) / 2) * 2.2;
    if (G) {
      FICHAS = Math.max(4, Math.min(9, G.puntas || 7)); ANCHO = 1.5 * Math.max(0.85, Math.min(1.15, G.ancho || 1)); GRUESO = 0.05 + 0.05 * (G.peso == null ? 0.4 : G.peso);
      RADIO = G.anguloso ? 0.05 : 0.1 + 0.24 * (G.redondez == null ? 0.5 : G.redondez);
      const ns = G.numeros && G.numeros.length ? G.numeros : [4], medio = ns.reduce((a, b) => a + b, 0) / ns.length; vuelta = (i) => (ns[i % ns.length] - medio) * 1.7 + (i - (FICHAS - 1) / 2) * 0.9;
    }
    const EJE = [-ANCHO / 2, -FONDO / 2];      // the far corner: the tiles fan around it
    // Where a tile is: how high its base, how far it has turned (degrees) and how far it has slid out toward the camera.
    // `elegida` is the tile pointed at (none: -1, the stack at rest), at this intensity.
    function poseDe(i, elegida, intensidad) {
      const p = { z: i * (GRUESO + AIRE), giro: vuelta(i), sale: 0 };
      if (elegida < 0) { if (i === FICHAS - 1) p.sale = 0.12; return p; }      // at rest its top tile sits a little forward: the stack is not a block
      if (i > elegida) { p.z += 0.08 + 0.2 * intensidad; p.giro += (i - elegida) * 60 * (0.35 + 0.65 * intensidad) / (FICHAS - 1); }
      if (i === elegida) p.sale = 0.3 + 0.24 * intensidad;
      return p;
    }
    // The same, as the engine wants a solid: its middle on the ground, its base height, its turn in radians.
    function lugarDe(p, mira) {
      const t = p.giro * G0, c = Math.cos(t), s = Math.sin(t);
      return { x: EJE[0] + (ANCHO / 2) * c - (FONDO / 2) * s + p.sale * mira[0], y: EJE[1] + (ANCHO / 2) * s + (FONDO / 2) * c + p.sale * mira[1], z: p.z, giro: t };
    }
    // The camera that holds the stack however far it opens.
    function camaraDe() {
      const C = AlmaFigura.camara({ alza: 32 }), anillo = AlmaFigura.redondo(ANCHO, FONDO, RADIO), p = [];
      for (let a = -1; a < FICHAS; a++) for (let i = 0; i < FICHAS; i++) {
        const L = lugarDe(poseDe(i, a, 1), C.mira), c = Math.cos(L.giro), s = Math.sin(L.giro);
        for (const q of anillo) { const x = L.x + q.x * c - q.y * s, y = L.y + q.x * s + q.y * c; p.push([x, y, L.z], [x, y, L.z + GRUESO]); }
      }
      return C.encuadra(p, 18);
    }
    function monta(f) {
      const C = f.camara = camaraDe(), anillo = f.redondo(ANCHO, FONDO, RADIO), marca = f.redondo(0.16, 0.16, 0.08), fichas = [];
      // Bottom to top: each tile hides what is under it.
      for (let i = 0; i < FICHAS; i++) {
        const r = poseDe(i, -1, 0.5), S = f.solido(anillo, GRUESO);
        fichas.push({ S, z: f.resorte(r.z), giro: f.resorte(r.giro, { fino: 0.02 }), sale: f.resorte(r.sale), cuando: -1, meta: r, y: C.a(0, 0, r.z + GRUESO / 2)[1] });
      }
      const punto = f.nodo('path', { class: 'acento' }, f.svg);
      let reloj = 0, llave = '', elegida = FICHAS - 1, clara = -1;
      return {
        // The arrows go up and down the stack, one tile at a time.
        tecla(dx, dy) { if (!dy) return false; elegida = Math.max(0, Math.min(FICHAS - 1, (f.puntero.tecla ? elegida : FICHAS - 1 + (dy > 0 ? 1 : 0)) - dy)); return true; },
        cuadro(dt) {
          reloj += dt; const p = f.puntero, I = f.intensidad;
          // Which tile: the one whose place in the stack AT REST is nearest the pointer, so that it does not change as the stack opens.
          if (p.dentro && !p.tecla) { let mejor = 1e9; fichas.forEach((t, i) => { const d = Math.abs(t.y - p.y); if (d < mejor) { mejor = d; elegida = i; } }); }
          const a = p.dentro ? elegida : -1, nueva = a + '|' + I.toFixed(2);
          if (nueva !== llave) {
            // The stack opens as one gesture: each tile starts a moment after the one nearer the chosen one.
            const centro = a < 0 ? FICHAS - 1 : a; llave = nueva;
            fichas.forEach((t, i) => { t.meta = poseDe(i, a, I); t.cuando = f.quieto ? reloj : reloj + Math.abs(i - centro) * 2 * f.escalon / 1000; });
          }
          let mueve = false; const brilla = a < 0 ? FICHAS - 1 : a;
          fichas.forEach((t, i) => {
            if (t.cuando >= 0 && reloj >= t.cuando) { t.z.meta = t.meta.z; t.giro.meta = t.meta.giro; t.sale.meta = t.meta.sale; t.cuando = -1; }
            if (t.cuando >= 0) mueve = true;
            mueve = f.paso(t.z, dt, f.quieto) || mueve; mueve = f.paso(t.giro, dt, f.quieto) || mueve; mueve = f.paso(t.sale, dt, f.quieto) || mueve;
            const L = lugarDe({ z: t.z.x, giro: t.giro.x, sale: t.sale.x }, C.mira); t.S.pon(L);
            if (i === brilla) {
              // Its one mark: a dot lying on the chosen tile, near its front corner, painted with it so that the tiles above hide it.
              const c = Math.cos(L.giro), s = Math.sin(L.giro), ox = ANCHO * 0.3, oy = FONDO * 0.22;
              punto.setAttribute('d', f.linea(marca.map((q) => C.a(L.x + (ox + q.x) * c - (oy + q.y) * s, L.y + (ox + q.x) * s + (oy + q.y) * c, L.z + GRUESO)), true));
            }
          });
          if (brilla !== clara) { if (clara >= 0) fichas[clara].S.fuera.setAttribute('class', 'tapa borde'); fichas[brilla].S.fuera.setAttribute('class', 'tapa realce'); fichas[brilla].S.g.appendChild(punto); clara = brilla; }
          f.lee(a < 0 ? 'En reposo' : 'Ficha ' + (a + 1) + ' de ' + FICHAS);
          return mueve;
        },
      };
    }
    return { poseDe, lugarDe, camaraDe, monta, FICHAS, ANCHO, FONDO, RADIO, GRUESO };
  }

  if (AlmaFigura.define) AlmaFigura.define('pila', {
    describe: 'Una pila de fichas de esquinas redondas, en línea fina. Al señalar una, la pila se abre en abanico sobre ella y la ficha sale hacia ti.',
    monta(f) { return modelo(f.genes).monta(f); },
  });
  return Object.assign(modelo(null), { modelo });
});
