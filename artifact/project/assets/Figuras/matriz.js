// Matriz: a panel of dots, in thin line. A point of light runs a loop over it on its own, and each dot it passes
// glows and fades. The pointer paints too. One figure, one idea: a signal, and the trace it leaves.
//
// An entity's own: the loop its light runs is drawn by its numbers; its panel has two rows more for each group.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), COLS = 14, FILAS = entre(6 + 2 * R.grupos, 8, 10), PASO = 0.13, PLACA = 0.05, W = COLS * PASO + 0.12, D = FILAS * PASO + 0.12;
    const placa = A.redondo(W, D, 0.03 + 0.14 * R.redondo), va = 0.55 + 0.11 * R.numeros[0], vb = 0.5 + 0.13 * R.numeros[1 % R.numeros.length] + 0.07, dura = (I) => 0.15 + 1.35 * I;
    const cabeza = (t) => [(COLS - 1) / 2 * (1 + 0.9 * Math.sin(t * va)), (FILAS - 1) / 2 * (1 + 0.9 * Math.sin(t * vb + 1))];
    function camaraDe() { return A.camara({ alza: 36 }).encuadra(A.cuerpo(placa, A.lugar(0, 0, 0, 0), PLACA), 20); }
    function monta(f) {
      const C = f.camara = camaraDe(); f.solido(placa, PLACA).pon(A.lugar(0, 0, 0, 0)); const puntos = [], chato = Math.abs((C.a(0, 0.1, 0)[1] - C.a(0, 0, 0)[1]) / (C.a(0, 0.1, 0)[0] - C.a(0, 0, 0)[0]));
      for (let j = 0; j < FILAS; j++) for (let i = 0; i < COLS; i++) { const q = C.a((i - (COLS - 1) / 2) * PASO, (j - (FILAS - 1) / 2) * PASO, PLACA); puntos.push({ i, j, luz: 0, cual: '', e: f.nodo('ellipse', { cx: q[0].toFixed(1), cy: q[1].toFixed(1) }, f.svg), q }); }
      const marca = f.nodo('ellipse', { class: 'acento' }, f.svg); let t = 0;
      const enciende = (u, v, ancho) => { for (const d of puntos) { const b = Math.exp(-((d.i - u) ** 2 + (d.j - v) ** 2) / ancho); if (b > d.luz) d.luz = b; } };
      for (let k = 0; k < 70; k++) { t += 1 / 30; for (const d of puntos) d.luz *= Math.exp(-(1 / 30) / dura(0.5)); const h = cabeza(t); enciende(h[0], h[1], 0.9); }      // it is already lit when it is first seen
      return {
        cuadro(dt) {
          const p = f.puntero; let cu = null;
          if (!f.quieto) { t += dt; const cae = Math.exp(-dt / dura(f.intensidad)); for (const d of puntos) d.luz *= cae; const h = cabeza(t); enciende(h[0], h[1], 0.9); cu = h; }
          if (p.dentro) { const s = C.alSuelo(p.x, p.y + PLACA * 0.8 * C.escala); cu = [entre(s[0] / PASO + (COLS - 1) / 2, 0, COLS - 1), entre(s[1] / PASO + (FILAS - 1) / 2, 0, FILAS - 1)]; enciende(cu[0], cu[1], 1.6); }
          for (const d of puntos) { const r = (0.014 + 0.036 * d.luz) * C.escala, cual = d.luz > 0.62 ? 'realce' : d.luz > 0.3 ? 'borde' : d.luz > 0.1 ? '' : 'lejos'; d.e.setAttribute('rx', r.toFixed(2)); d.e.setAttribute('ry', (r * chato).toFixed(2)); if (cual !== d.cual) { d.e.setAttribute('class', cual); d.cual = cual; } }
          // Its one mark: the dot the pointer is on, or else the one its own light is on.
          if (!cu) cu = cabeza(t); const una = puntos[Math.round(cu[1]) * COLS + Math.round(cu[0])], r = 0.05 * C.escala; marca.setAttribute('cx', una.q[0].toFixed(1)); marca.setAttribute('cy', una.q[1].toFixed(1)); marca.setAttribute('rx', r.toFixed(2)); marca.setAttribute('ry', (r * chato).toFixed(2));
          f.lee(!p.dentro ? 'En reposo' : 'Punto ' + (una.j + 1) + ' · ' + (una.i + 1)); return !f.quieto;
        },
      };
    }
    return { camaraDe, monta, COLS, FILAS };
  }
  if (A.define) A.define('matriz', { titulo: 'Matriz', propio: true, describe: 'Un panel de puntos en línea fina. Una luz lo recorre sola y cada punto que toca brilla y se apaga; el puntero también pinta.',
    nota: (R) => 'Una luz la recorre sola, y cada punto que toca brilla y se apaga de a poco; el puntero también pinta. El camino de la luz lo trazan los números de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
