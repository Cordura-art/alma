// Antena: a dish on its mast, in thin line. It turns to face where the pointer is, on a spring, and overshoots a
// little as a heavy thing does. One figure, one idea: pointing at something far away and listening.
//
// An entity's own: as many rings in its dish as its chart has groups, plus one; at rest it leans as the entity does.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), AROS = entre(R.grupos + 1, 2, 3), ALTURA = 0.72, PLATO = 0.62, GRUESO = 0.045, FOCO = 0.36, G2 = Math.PI / 180;
    const pie = A.redondo(0.7, 0.7, R.bloques ? 0.06 : 0.35), palo = A.redondo(0.075, 0.075, 0.0375), plato = A.redondo(PLATO * 2, PLATO * 2, PLATO, 64), bocina = A.redondo(0.11, 0.11, 0.055);
    const alcance = (I) => (30 + 40 * I) * G2, EJE = [0, 0, ALTURA], REPOSO = [0.55 * Math.cos(0.5), 0.55 * Math.sin(0.5)].map((v) => v * (0.8 + 0.4 * entre(-R.inclina / 20, 0, 1)));
    // The dish, leaning `ax` and `ay` radians toward x and toward y.
    const lugar = (ax, ay) => { const el = Math.hypot(ax, ay) || 1e-6, az = Math.atan2(ay, ax); return A.bisagra(A.lugar(0, 0, ALTURA, 0), EJE, [-Math.sin(az), Math.cos(az), 0], el); };
    function camaraDe() { const C = A.camara({ alza: 28 }), p = A.cuerpo(pie, A.lugar(0, 0, 0, 0), 0.07), m = alcance(1); for (let k = 0; k < 8; k++) { const L = lugar(m * Math.cos(k * Math.PI / 4), m * Math.sin(k * Math.PI / 4)); p.push(...A.cuerpo(plato, L, GRUESO), ...A.cuerpo(bocina, A.desde(L, 0, 0, FOCO), 0.07)); } p.push(...A.cuerpo(plato, A.lugar(0, 0, ALTURA, 0), FOCO + 0.07)); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(), L0 = A.lugar(0, 0, 0, 0), B = f.solido(pie, 0.07); B.pon(L0); f.lamina(f.corre(f.redondo(0.08, 0.08, 0.04), 0.2, 0.2), 'acento', B.g).pon(L0, 0.07); f.solido(palo, ALTURA).pon(L0);
      const P = f.solido(plato, GRUESO), aros = []; for (let k = 1; k <= AROS; k++) { const r = PLATO * (1 - k / (AROS + 0.6)); aros.push(f.lamina(f.redondo(2 * r, 2 * r, r, 48), '', P.g)); }
      const tirantes = f.nodo('path', {}, f.svg), H = f.solido(bocina, 0.07), ax = f.resorte(REPOSO[0], { k: 70, c: 9, fino: 0.002 }), ay = f.resorte(REPOSO[1], { k: 70, c: 9, fino: 0.002 });
      const base = C.a(0, 0, ALTURA); let porTecla = REPOSO.slice(), deFrente = null;
      return {
        // The arrows lean it a step each way.
        tecla(dx, dy) { if (!f.puntero.tecla) porTecla = [ax.meta, ay.meta]; porTecla = [porTecla[0] + (dx - dy) * 0.14, porTecla[1] + (-dx - dy) * 0.14]; return true; },
        cuadro(dt) {
          const p = f.puntero, m = alcance(f.intensidad); let quiere = REPOSO;
          if (p.dentro) { if (p.tecla) quiere = porTecla; else { const s = C.alSuelo(p.x, p.y + (base[1] - C.a(0, 0, 0)[1]) * -1), l = Math.hypot(s[0], s[1]) || 1e-6, el = m * entre(l / 0.8, 0, 1); quiere = [s[0] / l * el, s[1] / l * el]; } }
          const l = Math.hypot(quiere[0], quiere[1]); if (l > m) quiere = [quiere[0] / l * m, quiere[1] / l * m];
          ax.meta = quiere[0]; ay.meta = quiere[1]; let mueve = f.paso(ax, dt, f.quieto); mueve = f.paso(ay, dt, f.quieto) || mueve;
          const L = lugar(ax.x, ay.x), S = P.pon(L), foco = A.desde(L, 0, 0, FOCO); aros.forEach((a) => a.pon(L, GRUESO)); H.pon(foco);
          // Its struts: from its rim to its horn. What the dish shows the camera decides what is in front of what.
          const borde = [0.5, 2.6, 4.7].map((t) => ({ x: PLATO * 0.92 * Math.cos(t), y: PLATO * 0.92 * Math.sin(t) })), punta = A.lamina(C, [{ x: 0, y: 0 }], foco, 0).puntos[0];
          tirantes.setAttribute('d', A.lamina(C, borde, L, GRUESO).puntos.map((q) => f.linea([q, punta])).join(''));
          if (S.deArriba !== deFrente) { deFrente = S.deArriba; (deFrente ? [P.g, tirantes, H.g] : [H.g, tirantes, P.g]).forEach((n) => f.svg.appendChild(n)); }
          P.fuera.setAttribute('class', p.dentro ? 'tapa realce' : 'tapa borde');
          const el = Math.hypot(ax.meta, ay.meta) / G2, az = ((Math.atan2(ay.meta, ax.meta) / G2) % 360 + 360) % 360; f.lee(!p.dentro ? 'En reposo' : 'Apunta a ' + Math.round(az) + '°, inclinada ' + Math.round(el) + '°'); return mueve;
        },
      };
    }
    return { camaraDe, monta, AROS };
  }
  if (A.define) A.define('antena', { titulo: 'Antena', describe: 'Una antena parabólica sobre su mástil, en línea fina. Gira hacia donde está el puntero, con el peso de un resorte.',
    nota: (R) => 'Gira hacia donde está el puntero y se pasa un poco antes de asentarse. Su plato lleva ' + entre(R.grupos + 1, 2, 3) + ' aros: uno por cada grupo de nuestra carta, y uno más.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
