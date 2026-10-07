// Gráfico: a row of bars on a plate, in thin line. The bar under the pointer rises, and its neighbors a little.
// One figure, one idea: a few quantities side by side, and looking closer at one.
//
// An entity's own: as many bars as its sign has points; how tall each one is, is in its numbers.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), N = entre(R.puntas, 5, 9), PASO = 0.2, LADO = 0.13, FONDO = 0.34, PLACA = 0.05, W = N * PASO + 0.16, D = FONDO + 0.3, radio = 0.01 + 0.05 * R.redondo;
    const placa = A.redondo(W, D, 0.03 + 0.12 * R.redondo), barra = A.redondo(LADO, FONDO, radio), alto = (i) => 0.1 + 0.075 * R.numeros[(i * 2 + 1) % R.numeros.length] + 0.04 * ((i * 5) % 3), sube = (I) => 0.12 + 0.34 * I;
    const xDe = (i) => (i - (N - 1) / 2) * PASO, TOPE = Math.max(...Array.from({ length: N }, (_, i) => alto(i)));
    function camaraDe() { const C = A.camara({ alza: 30 }), p = A.cuerpo(placa, A.lugar(0, 0, 0, 0), PLACA); for (const i of [0, N - 1]) p.push(...A.cuerpo(barra, A.lugar(xDe(i), 0, PLACA, 0), TOPE + sube(1))); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(), barras = []; f.solido(placa, PLACA).pon(A.lugar(0, 0, 0, 0));
      // Along the row from the far end: each bar hides the one behind it.
      for (let i = 0; i < N; i++) barras.push({ S: f.solido(barra, alto(i)), L: A.lugar(xDe(i), 0, PLACA, 0), mas: f.resorte(0, { k: 130, c: 19 }) });
      const punto = f.lamina(f.redondo(0.06, 0.06, 0.03), 'acento'), CASA = barras.reduce((m, b, i) => alto(i) > alto(m) ? i : m, 0); let elegida = CASA, clara = -1;
      return {
        tecla(dx, dy) { if (!dx) return false; elegida = entre(elegida + dx, 0, N - 1); return true; },
        cuadro(dt) {
          const p = f.puntero, I = f.intensidad;
          if (!p.dentro) elegida = CASA; else if (!p.tecla) elegida = entre(Math.round(C.alSuelo(p.x, p.y + (PLACA + TOPE * 0.5) * 0.87 * C.escala)[0] / PASO + (N - 1) / 2), 0, N - 1);      // read on the row as it stands at rest
          const alcance = 0.55 + 1.1 * I; let mueve = false;
          barras.forEach((b, i) => { b.mas.meta = (p.dentro ? sube(I) : 0.04) * Math.exp(-((i - elegida) ** 2) / (2 * alcance * alcance)); mueve = f.paso(b.mas, dt, f.quieto) || mueve; const h = alto(i) + Math.max(0, b.mas.x); b.S.pon(b.L, h); if (i === elegida) punto.pon(b.L, h); });
          if (elegida !== clara) { if (clara >= 0) barras[clara].S.fuera.setAttribute('class', 'tapa borde'); barras[elegida].S.fuera.setAttribute('class', 'tapa realce'); barras[elegida].S.g.appendChild(punto.p); clara = elegida; }
          f.lee(!p.dentro ? 'En reposo' : 'Barra ' + (elegida + 1) + ' de ' + N + ', vale ' + Math.round(alto(elegida) * 100)); return mueve;
        },
      };
    }
    return { camaraDe, monta, N, radio };
  }
  if (A.define) A.define('grafico', { titulo: 'Gráfico', describe: 'Una fila de barras sobre una placa, en línea fina. La barra bajo el puntero sube, y sus vecinas un poco.',
    nota: (R) => 'La barra que señalas sube, y sus vecinas un poco. Son ' + entre(R.puntas, 5, 9) + ' barras, como las puntas de nuestro signo, y su altura sale de los números de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
