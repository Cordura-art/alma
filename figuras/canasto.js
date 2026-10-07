// Canasto: a wire basket under its handle, in thin line. It tips toward the pointer, and its handle swings behind
// it, late, and settles. One figure, one idea: an empty thing waiting to be filled.
//
// An entity's own: a wire around it for each group of its chart, and one more; as round as it is.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), ALAMBRES = entre(R.grupos + 1, 2, 3), W = 1.1, D = 0.8, H = 0.5, ASA = 0.5, BARRA = 0.022, G2 = Math.PI / 180;
    const aro = A.redondo(W, D, 0.06 + 0.3 * R.redondo), boca = A.redondo(W - 0.09, D - 0.09, 0.03 + 0.28 * R.redondo), cuanto = (I) => (8 + 20 * I) * G2, REPOSO = [0.05, 0.07];
    const lugar = (ax, ay) => { const el = Math.hypot(ax, ay) || 1e-6, az = Math.atan2(ay, ax); return A.bisagra(A.lugar(0, 0, 0, 0), [0, 0, 0], [-Math.sin(az), Math.cos(az), 0], el); };
    // Its handle, swung `fi` from upright on its two pivots, as it stands on the basket.
    const asa = (P, fi) => { const p = []; for (let k = 0; k <= 16; k++) { const s = Math.PI * k / 16; p.push(A.punto(P, W / 2 * Math.cos(s), ASA * Math.sin(s) * Math.sin(fi), H + ASA * Math.sin(s) * Math.cos(fi))); } return p; };
    function camaraDe() { const C = A.camara({ alza: 30 }), p = [], m = cuanto(1); for (let k = 0; k < 8; k++) { const L = lugar(m * Math.cos(k * Math.PI / 4), m * Math.sin(k * Math.PI / 4)); p.push(...A.cuerpo(aro, L, H), ...asa(L, 0.5), ...asa(L, -0.5)); } return C.encuadra(p, 20); }
    function monta(f) {
      const C = f.camara = camaraDe(), S = f.solido(aro, H), B = f.lamina(boca, '', S.g), alambres = []; for (let k = 1; k <= ALAMBRES; k++) alambres.push({ e: f.nodo('path', {}, S.g), z: H * k / (ALAMBRES + 1) });
      const T = f.tubo(), marca = f.nodo('circle', { class: 'acento', r: 3 }, f.svg), ax = f.resorte(REPOSO[0], { k: 80, c: 13, fino: 0.002 }), ay = f.resorte(REPOSO[1], { k: 80, c: 13, fino: 0.002 }), fi = f.resorte(0, { k: 45, c: 5, fino: 0.004 }); let porTecla = REPOSO.slice();
      return {
        tecla(dx, dy) { if (!f.puntero.tecla) porTecla = [ax.meta, ay.meta]; porTecla = [porTecla[0] + (dx - dy) * 0.08, porTecla[1] + (-dx - dy) * 0.08]; return true; },
        cuadro(dt) {
          const p = f.puntero, m = cuanto(f.intensidad); let quiere = REPOSO;
          if (p.dentro) { if (p.tecla) quiere = porTecla; else { const s = C.alSuelo(p.x, p.y + H * 0.4 * C.escala), l = Math.hypot(s[0], s[1]) || 1e-6, el = m * entre(l / 0.9, 0, 1); quiere = [s[0] / l * el, s[1] / l * el]; } }
          const l = Math.hypot(quiere[0], quiere[1]); if (l > m) quiere = [quiere[0] / l * m, quiere[1] / l * m];
          ax.meta = quiere[0]; ay.meta = quiere[1]; fi.meta = -ay.x * 1.1;      // its handle hangs: it leans back as the basket tips forward, and gets there late
          let mueve = f.paso(ax, dt, f.quieto); mueve = f.paso(ay, dt, f.quieto) || mueve; mueve = f.paso(fi, dt, f.quieto) || mueve;
          const L = lugar(ax.x, ay.x); S.pon(L); B.pon(L, H); for (const a of alambres) a.e.setAttribute('d', f.linea(A.silueta(C, aro, L, a.z).pliegue));
          const camino = asa(L, fi.x), q = C.a.apply(C, camino[8]); T.pon(camino, BARRA); marca.setAttribute('cx', q[0].toFixed(1)); marca.setAttribute('cy', q[1].toFixed(1)); S.fuera.setAttribute('class', p.dentro ? 'tapa realce' : 'tapa borde');
          f.lee(!p.dentro ? 'En reposo' : 'Inclinado ' + Math.round(Math.hypot(ax.meta, ay.meta) / G2) + '°'); return mueve;
        },
      };
    }
    return { camaraDe, monta, ALAMBRES };
  }
  if (A.define) A.define('canasto', { titulo: 'Canasto', describe: 'Un canasto de alambre bajo su asa, en línea fina. Se inclina hacia el puntero y su asa lo sigue, tarde.',
    nota: (R) => 'Se inclina hacia el puntero, y su asa lo sigue un momento después. Lo rodean ' + entre(R.grupos + 1, 2, 3) + ' alambres: uno por cada grupo de nuestra carta, y uno más.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
