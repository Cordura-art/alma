// Ascensor: floors beside an open shaft, in thin line. The pointer's height picks a floor and the car goes there, with
// the weight of a thing that travels. One figure, one idea: going from one level to another.
//
// An entity's own: as many floors as its chart has defined centers; the car as round as it is.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), N = entre(R.centros, 3, 5), SUBE = 0.4, LOSA = 0.04, radio = 0.02 + 0.1 * R.redondo, ALTO = N * SUBE + 0.06;
    const losa = A.redondo(1.0, 0.9, 0.02 + 0.1 * R.redondo), poste = A.redondo(0.04, 0.04, 0.012), carro = A.redondo(0.4, 0.4, radio), X0 = -0.38, X1 = 0.52;
    const postes = [[-1, -1], [-1, 1], [1, -1], [1, 1]].map((d) => A.lugar(X1 + d[0] * 0.25, d[1] * 0.25, 0, 0));
    function camaraDe() { const C = A.camara({ alza: 28 }), p = []; for (const q of postes) p.push(...A.cuerpo(poste, q, ALTO)); p.push(...A.cuerpo(losa, A.lugar(X0, 0, 0, 0), ALTO)); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(), pisos = [];
      for (let i = 0; i < N; i++) { const S = f.solido(losa, LOSA), L = A.lugar(X0, 0, i * SUBE, 0); S.pon(L); pisos.push({ S, y: C.a(X0, 0, i * SUBE + LOSA)[1] }); }
      // The shaft stands nearer than the floors: its far posts, the car, then its near post.
      postes.slice(0, 3).forEach((q) => f.solido(poste, ALTO).pon(q)); const S = f.solido(carro, 0.27), punto = f.lamina(f.redondo(0.1, 0.1, 0.05), 'acento', S.g), hoja = f.redondo(0.115, 0.19, 0.012), puertas = [f.lamina(f.corre(hoja, -0.062, 0), '', S.g), f.lamina(f.corre(hoja, 0.062, 0), '', S.g)];      // its two doors, on the side it shows f.solido(poste, ALTO).pon(postes[3]);
      const sube = f.resorte(SUBE + LOSA, { k: 90, c: 17 }); let piso = 1, claro = -1;
      return {
        tecla(dx, dy) { if (!dy) return false; piso = entre(piso - dy, 0, N - 1); return true; },
        cuadro(dt) {
          const p = f.puntero; if (!p.dentro) piso = 1; else if (!p.tecla) piso = f.cerca(pisos.map((q) => q.y));
          sube.k = 40 + 180 * f.intensidad; sube.c = 2 * Math.sqrt(sube.k) * 0.86; sube.meta = piso * SUBE + LOSA;      // a stronger answer is a quicker car
          const mueve = f.paso(sube, dt, f.quieto), L = A.lugar(X1, 0, Math.max(LOSA, sube.x), 0); S.pon(L); punto.pon(L, 0.27); puertas.forEach((d) => d.pon(A.frente(X1, 0.2, L.o[2] + 0.125), 0));
          if (piso !== claro) { if (claro >= 0) pisos[claro].S.fuera.setAttribute('class', 'tapa borde'); pisos[piso].S.fuera.setAttribute('class', 'tapa realce'); claro = piso; }
          f.lee(!p.dentro ? 'En reposo' : 'Piso ' + (piso + 1) + ' de ' + N); return mueve;
        },
      };
    }
    return { camaraDe, monta, N, radio };
  }
  if (A.define) A.define('ascensor', { titulo: 'Ascensor', describe: 'Pisos junto a un hueco de ascensor, en línea fina. La altura del puntero elige el piso y la cabina va hacia él.',
    nota: (R) => 'La altura del puntero elige un piso y la cabina viaja hasta él. Son ' + entre(R.centros, 3, 5) + ' pisos, uno por cada centro definido de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
