// Rack: a cabinet of thin blades, in thin line. Some rest half out. The pointer's height pulls the nearest ones out,
// the one it points at furthest. One figure, one idea: many equal units, and reaching for one.
//
// An entity's own: four blades and two more for each defined center of its chart; which ones rest half out is in
// its numbers.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), N = entre(4 + 2 * R.centros, 8, 12), W = 0.95, D = 0.85, HOJA = 0.105, PIE = 0.05, ALTO = N * HOJA + PIE + 0.04, radio = 0.012 + 0.07 * R.redondo, CERRADO = 0.03;
    const mueble = A.redondo(W, D, radio), sale = (I) => 0.22 + 0.4 * I, hoja = (c) => A.redondo(W - 0.12, c, Math.min(radio, 0.02, c / 2 - 0.004)), zDe = (i) => PIE + i * HOJA + 0.012;
    // At rest, the blades whose turn falls on one of its numbers stand a little out.
    const reposo = (i) => R.numeros.includes((i * 2 + 3) % 10) || i === Math.floor(N / 2) ? 0.1 + 0.02 * (i % 3) : CERRADO;
    function camaraDe() { const C = A.camara({ alza: 28 }), p = A.cuerpo(mueble, A.lugar(0, 0, 0, 0), ALTO); for (const i of [0, N - 1]) p.push(...A.cuerpo(hoja(sale(1)), A.lugar(0, D / 2 + sale(1) / 2, zDe(i), 0), HOJA - 0.02)); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(), hojas = []; f.solido(mueble, ALTO).pon(A.lugar(0, 0, 0, 0));
      for (let i = 0; i < N; i++) { const S = f.solido(hoja(CERRADO), HOJA - 0.02); hojas.push({ S, luz: f.lamina(f.corre(f.redondo(0.07, 0.03, 0.015), -W / 2 + 0.18, 0), '', S.g), fuera: f.resorte(reposo(i), { k: 110, c: 18 }), y: C.a(0, D / 2, zDe(i) + HOJA / 2)[1] }); }
      const CASA = Math.floor(N / 2); let elegida = CASA, clara = -1;
      return {
        tecla(dx, dy) { if (!dy) return false; elegida = entre(elegida - dy, 0, N - 1); return true; },
        cuadro(dt) {
          const p = f.puntero, I = f.intensidad; if (!p.dentro) elegida = CASA; else if (!p.tecla) elegida = f.cerca(hojas.map((h) => h.y));
          const alcance = 0.7 + 1.9 * I; let mueve = false;
          hojas.forEach((h, i) => {
            h.fuera.meta = p.dentro ? CERRADO + (sale(I) - CERRADO) * Math.exp(-((i - elegida) ** 2) / (2 * alcance * alcance)) : reposo(i); mueve = f.paso(h.fuera, dt, f.quieto) || mueve; const d = Math.max(CERRADO, h.fuera.x);
            h.S.pon(A.lugar(0, D / 2 + d / 2, zDe(i), 0), null, hoja(d)); h.luz.pon(A.frente(0, D / 2 + d, zDe(i) + (HOJA - 0.02) / 2), 0);
          });
          if (elegida !== clara) { if (clara >= 0) { hojas[clara].S.fuera.setAttribute('class', 'tapa borde'); hojas[clara].luz.p.setAttribute('class', ''); } hojas[elegida].S.fuera.setAttribute('class', 'tapa realce'); hojas[elegida].luz.p.setAttribute('class', 'acento'); clara = elegida; }
          f.lee(!p.dentro ? 'En reposo' : 'Hoja ' + (elegida + 1) + ' de ' + N); return mueve;
        },
      };
    }
    return { camaraDe, monta, N, radio };
  }
  if (A.define) A.define('rack', { titulo: 'Rack', describe: 'Un armario de hojas delgadas, en línea fina. La altura del puntero saca las más cercanas.',
    nota: (R) => 'La altura del puntero saca las hojas más cercanas, y más la que señalas. Son ' + entre(4 + 2 * R.centros, 8, 12) + ': cuatro, y dos más por cada centro definido de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
