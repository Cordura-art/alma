// Bóveda: a vault door with its dial and its bolts, in thin line. The dial turns to face the pointer; when it comes to
// the combination, the bolts draw back. One figure, one idea: something that only opens to the one who knows how.
//
// An entity's own: its combination is one of its numbers, it has a bolt for each group of its chart plus two, and its
// door is as round as it is.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), PERNOS = entre(R.grupos + 2, 3, 4), LADO = 1.12, GRUESO = 0.1, ALTURA = 0.78, Y = -0.1, radio = 0.04 + 0.5 * R.redondo, CLAVE = (R.numeros[0] * 40 + 20) % 360, G2 = Math.PI / 180;
    const muro = A.redondo(1.75, 0.16, 0.02), puerta = A.redondo(LADO, LADO, radio), dial = A.redondo(0.46, 0.46, 0.23), FRENTE = Y + GRUESO;
    const perno = (l) => A.corre(A.redondo(l + 0.06, 0.09, 0.02), LADO / 2 - 0.03 + (l + 0.06) / 2, 0), yPerno = (k) => (k - (PERNOS - 1) / 2) * (LADO * 0.72 / (PERNOS - 1));
    const vuelta = (d) => ((d + 180) % 360 + 360) % 360 - 180;
    function camaraDe() { const C = A.camara({ alza: 26 }), p = A.cuerpo(muro, A.lugar(0, Y - 0.08, 0, 0), 1.56); p.push(...A.cuerpo(dial, A.frente(0, FRENTE, ALTURA), 0.07)); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(); f.solido(muro, 1.56).pon(A.lugar(0, Y - 0.08, 0, 0));
      const pernos = []; for (let k = 0; k < PERNOS; k++) pernos.push(f.solido(perno(0.16), 0.05)); const fuera = f.resorte(0.16, { k: 140, c: 20 });
      const P = f.solido(puerta, GRUESO), LP = A.frente(0, Y, ALTURA); P.pon(LP); f.lamina(f.redondo(0.7, 0.7, 0.35), '', P.g).pon(LP, GRUESO);
      const D = f.solido(dial, 0.06), marca = f.lamina(f.corre(f.redondo(0.045, 0.13, 0.02), 0, -0.13), 'acento', D.g), centro = C.a(0, FRENTE, ALTURA);
      const REPOSO = CLAVE + 130, gira = f.resorte(REPOSO, { fino: 0.3 }); let porTecla = REPOSO;
      return {
        // The arrows turn the dial a step.
        tecla(dx, dy) { const d = dx || -dy; porTecla = (f.puntero.tecla ? porTecla : gira.meta) + d * 20; return true; },
        cuadro(dt) {
          const p = f.puntero; gira.k = 140 - 80 * f.intensidad; gira.c = 2 * Math.sqrt(gira.k) * 0.75;      // a stronger answer is a heavier dial, that coasts
          if (!p.dentro) gira.meta = gira.x + vuelta(REPOSO - gira.x); else if (p.tecla) gira.meta = porTecla; else gira.meta = gira.x + vuelta(Math.atan2(p.y - centro[1], p.x - centro[0]) / G2 + 90 - gira.x);
          let mueve = f.paso(gira, dt, f.quieto); const abierta = Math.abs(vuelta(gira.x - CLAVE)) < 14;
          fuera.meta = abierta ? 0.012 : 0.16; mueve = f.paso(fuera, dt, f.quieto) || mueve;
          pernos.forEach((S, k) => S.pon(A.frente(0, Y + 0.025, ALTURA - yPerno(k)), null, perno(Math.max(0.005, fuera.x))));
          const LD = A.bisagra(A.frente(0, FRENTE, ALTURA), [0, FRENTE, ALTURA], [0, 1, 0], -gira.x * G2); D.pon(LD); marca.pon(LD, 0.06); P.fuera.setAttribute('class', abierta ? 'tapa realce' : 'tapa borde');
          f.lee(!p.dentro ? 'En reposo' : abierta ? 'Abierta' : 'Dial en ' + Math.round(((gira.meta % 360) + 360) % 360) + '°'); return mueve;
        },
      };
    }
    return { camaraDe, monta, PERNOS, CLAVE, radio };
  }
  if (A.define) A.define('boveda', { titulo: 'Bóveda', describe: 'La puerta de una bóveda con su dial y sus pernos, en línea fina. El dial gira hacia el puntero; en la combinación, los pernos se retiran.',
    nota: (R) => 'El dial gira hacia el puntero, y cuando da con la combinación los pernos se retiran. La combinación sale del primer número de nuestra carta, y tiene ' + entre(R.grupos + 2, 3, 4) + ' pernos.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
