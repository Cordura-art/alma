// Cinta: crates riding a belt through a gate, in thin line. It runs on its own. Rest the pointer on it and time slows:
// the crates go by at a crawl, and one can be looked at. One figure, one idea: slowing a process down to see it.
//
// An entity's own: a crate for each defined center of its chart, and one more; their sizes are in its numbers.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), N = entre(R.centros + 1, 4, 6), LARGO = 2.0, ANCHO = 0.52, CINTA = 0.08, VUELTA = LARGO + 0.3, radio = 0.01 + 0.06 * R.redondo, PASO = VUELTA / N;
    const cinta = A.redondo(LARGO, ANCHO, 0.03 + 0.2 * R.redondo), poste = A.redondo(0.06, 0.06, 0.02), viga = A.redondo(0.09, ANCHO + 0.38, 0.02), cajas = Array.from({ length: N }, (_, k) => ({ lado: 0.22 + 0.03 * (R.numeros[k % R.numeros.length] % 3), alto: 0.13 + 0.03 * (R.numeros[(k + 1) % R.numeros.length] % 4) }));
    const lento = (I) => 0.6 - 0.55 * I, suave = (t) => { t = entre(t, 0, 1); return t * t * (3 - 2 * t); };
    function camaraDe() { const C = A.camara({ alza: 30 }), p = A.cuerpo(cinta, A.lugar(0, 0, 0, 0), CINTA); p.push(...A.cuerpo(viga, A.lugar(0, 0, 0, 0), 0.7)); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(), L0 = A.lugar(0, 0, 0, 0); f.solido(cinta, CINTA).pon(L0);
      const lejos = f.solido(poste, 0.64), cerca = f.solido(poste, 0.64), cosas = cajas.map((c) => ({ c, S: f.solido(f.redondo(c.lado, c.lado, Math.min(radio, c.lado / 2)), c.alto) })), V = f.solido(viga, 0.06);
      lejos.pon(A.lugar(0, -ANCHO / 2 - 0.1, 0, 0)); cerca.pon(A.lugar(0, ANCHO / 2 + 0.1, 0, 0)); V.pon(A.lugar(0, 0, 0.64, 0));
      const punto = f.lamina(f.redondo(0.07, 0.07, 0.035), 'acento', cosas[0].S.g), ritmo = f.resorte(1, { k: 60, c: 14 }); let anda = 0.3;
      return {
        cuadro(dt) {
          const p = f.puntero; ritmo.meta = p.dentro ? lento(f.intensidad) : 1; f.paso(ritmo, dt, f.quieto); if (!f.quieto) anda += dt * 0.34 * ritmo.x;
          const orden = [{ g: cerca.g, hondo: ANCHO / 2 + 0.1 }];
          cosas.forEach((t, k) => {
            const x = ((k * PASO + anda) % VUELTA + VUELTA) % VUELTA - VUELTA / 2, crece = suave((LARGO / 2 - t.c.lado / 2 - Math.abs(x)) / 0.14);      // a crate rises onto the belt at one end and sinks off it at the other
            t.S.g.style.display = crece < 0.02 ? 'none' : ''; t.x = x; t.L = A.lugar(crece < 0.02 ? 0 : x, 0, CINTA, 0);      // off the belt it is not drawn at all
            t.S.pon(t.L, t.c.alto * Math.max(0.02, crece)); orden.push({ g: t.S.g, hondo: x });
          });
          // Far to near as they stand now; the beam of the gate last, over all of them.
          orden.sort((a, b) => a.hondo - b.hondo).forEach((o) => f.svg.appendChild(o.g)); f.svg.appendChild(V.g);
          const una = cosas[0], bajo = Math.abs(una.x) < 0.16 && una.S.g.style.display !== 'none'; punto.pon(una.L, una.c.alto * Math.max(0.02, suave((LARGO / 2 - una.c.lado / 2 - Math.abs(una.x)) / 0.14)));
          V.fuera.setAttribute('class', bajo ? 'tapa realce' : 'tapa borde');
          f.lee(!p.dentro ? 'En reposo' : 'Velocidad ×' + ritmo.meta.toFixed(ritmo.meta < 0.1 ? 2 : 1).replace('.', ',')); return !f.quieto;
        },
      };
    }
    return { camaraDe, monta, N, radio };
  }
  if (A.define) A.define('cinta', { titulo: 'Cinta', propio: true, describe: 'Cajas sobre una cinta que pasa bajo un pórtico, en línea fina. Anda sola; con el puntero encima, el tiempo va más lento.',
    nota: (R) => 'Anda sola. Deja el puntero encima y el tiempo va más lento, para mirar una caja con calma. Lleva ' + entre(R.centros + 1, 4, 6) + ' cajas: una por cada centro definido de nuestra carta, y una más.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
