// Tamices: a stack of sieves over a pan, in thin line. The pointer's height picks one; it rises clear of the one under
// it, and those above rise out of its way. One figure, one idea: sorting, one pass after another.
//
// An entity's own: as many sieves as its chart has numbers; round as it is, and square for an entity of blocks.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), N = entre(R.numeros.length, 3, 5), ANCHO = 1.1, ARO = 0.19, FUENTE = 0.11, redondez = R.bloques ? 0.14 : R.propia ? 0.6 + 0.4 * R.redondo : 1;      // ALMA's own are plain circles
    const aro = A.redondo(ANCHO, ANCHO, ANCHO / 2 * redondez, 64), boca = A.redondo(ANCHO - 0.14, ANCHO - 0.14, (ANCHO - 0.14) / 2 * redondez, 64), sube = (I) => 0.08 + 0.26 * I, zDe = (i) => FUENTE + 0.012 + i * (ARO + 0.012);
    const alza = (i, a, I, cuanto) => a < 0 ? (i === N - 1 ? sube(I) * 0.4 : 0) : (i > a ? 2 : i === a ? 1 : 0) * sube(I) * cuanto;
    function camaraDe() { const C = A.camara({ alza: 30 }), p = A.cuerpo(aro, A.lugar(0, 0, 0, 0), FUENTE); p.push(...A.cuerpo(aro, A.lugar(0, 0, zDe(N - 1) + 2 * sube(1), 0), ARO)); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(), tamices = [], fondo = f.solido(aro, FUENTE), L0 = A.lugar(0, 0, 0, 0); fondo.pon(L0); f.lamina(boca, '', fondo.g).pon(L0, FUENTE);
      for (let i = 0; i < N; i++) { const S = f.solido(aro, ARO); tamices.push({ S, boca: f.lamina(boca, '', S.g), arriba: f.resorte(alza(i, -1, 0.5, 1)), y: C.a(0, 0, zDe(i) + ARO / 2)[1] }); }
      const punto = f.lamina(f.corre(f.redondo(0.07, 0.07, 0.035), ANCHO * 0.24, ANCHO * 0.24), 'acento'); let elegido = N - 1, claro = -1;
      return {
        tecla(dx, dy) { if (!dy) return false; elegido = entre(elegido - dy, 0, N - 1); return true; },
        cuadro(dt) {
          const p = f.puntero, I = f.intensidad; if (!p.dentro) elegido = N - 1; else if (!p.tecla) elegido = f.cerca(tamices.map((t) => t.y));
          let mueve = false; const a = p.dentro ? elegido : -1;
          tamices.forEach((t, i) => { t.arriba.meta = alza(i, a, I, 1); mueve = f.paso(t.arriba, dt, f.quieto) || mueve; const L = A.lugar(0, 0, zDe(i) + Math.max(0, t.arriba.x), 0); t.S.pon(L); t.boca.pon(L, ARO); if (i === elegido) punto.pon(L, ARO); });
          if (elegido !== claro) { if (claro >= 0) tamices[claro].S.fuera.setAttribute('class', 'tapa borde'); tamices[elegido].S.fuera.setAttribute('class', 'tapa realce'); tamices[elegido].S.g.appendChild(punto.p); claro = elegido; }
          f.lee(!p.dentro ? 'En reposo' : 'Tamiz ' + (elegido + 1) + ' de ' + N); return mueve;
        },
      };
    }
    return { camaraDe, monta, N, redondez };
  }
  if (A.define) A.define('tamices', { titulo: 'Tamices', describe: 'Una pila de tamices sobre su fuente, en línea fina. La altura del puntero elige uno, que se levanta.',
    nota: (R) => 'La altura del puntero elige un tamiz, que se levanta libre. Son ' + entre(R.numeros.length, 3, 5) + ', como los números de nuestra carta' + (R.bloques ? ', y cuadrados porque estamos hechos de bloques.' : '.'), monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
