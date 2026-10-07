// Cajonera: a chest of drawers in thin line. The pointer's height picks a drawer and it slides out. One figure, one
// idea: opening one compartment of several to see what is kept there.
//
// An entity's own: two drawers and one more for each group of its chart; corners as round as it is.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), N = entre(2 + R.grupos, 3, 4), W = 1.1, D = 0.8, CAJON = 0.34, PIE = 0.05, ALTO = N * CAJON + PIE + 0.03, radio = 0.015 + 0.09 * R.redondo, CERRADO = 0.035;
    const mueble = A.redondo(W, D, radio), sale = (I) => 0.26 + 0.42 * I, caja = (cuanto) => A.redondo(W - 0.12, cuanto, Math.min(radio, cuanto / 2 - 0.004)), zDe = (i) => PIE + i * CAJON + 0.02;
    function camaraDe() { const C = A.camara({ alza: 30 }), p = A.cuerpo(mueble, A.lugar(0, 0, 0, 0), ALTO); for (let i = 0; i < N; i++) p.push(...A.cuerpo(caja(sale(1)), A.lugar(0, D / 2 + sale(1) / 2, zDe(i), 0), CAJON - 0.04)); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(), cajones = []; f.solido(mueble, ALTO).pon(A.lugar(0, 0, 0, 0));
      // Bottom to top: a drawer pulled out is drawn only as far as it is out, with its pull on its front.
      for (let i = 0; i < N; i++) { const S = f.solido(caja(CERRADO), CAJON - 0.04); cajones.push({ S, tira: f.lamina(f.redondo(0.34, 0.05, 0.025), '', S.g), fuera: f.resorte(CERRADO, { k: 100, c: 17 }), y: C.a(0, D / 2, zDe(i) + CAJON / 2)[1] }); }
      const REPOSO = Math.floor(N / 2); let elegido = REPOSO, claro = -1;
      return {
        tecla(dx, dy) { if (!dy) return false; elegido = entre(elegido - dy, 0, N - 1); return true; },
        cuadro(dt) {
          const p = f.puntero, I = f.intensidad; if (!p.dentro) elegido = REPOSO; else if (!p.tecla) elegido = f.cerca(cajones.map((c) => c.y));
          let mueve = false;
          cajones.forEach((c, i) => {
            c.fuera.meta = i !== elegido ? CERRADO : p.dentro ? sale(I) : 0.15; mueve = f.paso(c.fuera, dt, f.quieto) || mueve; const d = Math.max(CERRADO, c.fuera.x);
            c.S.pon(A.lugar(0, D / 2 + d / 2, zDe(i), 0), null, caja(d)); c.tira.pon(A.frente(0, D / 2 + d, zDe(i) + (CAJON - 0.04) * 0.62), 0);
          });
          if (elegido !== claro) { if (claro >= 0) { cajones[claro].S.fuera.setAttribute('class', 'tapa borde'); cajones[claro].tira.p.setAttribute('class', ''); } cajones[elegido].S.fuera.setAttribute('class', 'tapa realce'); cajones[elegido].tira.p.setAttribute('class', 'acento'); claro = elegido; }
          f.lee(!p.dentro ? 'En reposo' : 'Cajón ' + (elegido + 1) + ' de ' + N); return mueve;
        },
      };
    }
    return { camaraDe, monta, N, radio };
  }
  if (A.define) A.define('cajonera', { titulo: 'Cajonera', describe: 'Una cajonera en línea fina. La altura del puntero elige un cajón, que sale.',
    nota: (R) => 'La altura del puntero elige un cajón y el cajón sale. Son ' + entre(2 + R.grupos, 3, 4) + ': dos, y uno más por cada grupo de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
