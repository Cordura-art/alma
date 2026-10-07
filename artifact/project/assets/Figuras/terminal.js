// Terminal: a window with its history in rows, in thin line. The pointer's height picks a line; it lifts off the
// window and the ones beside it lift a little. One figure, one idea: going back through what was said, line by line.
//
// An entity's own: six lines and one more for each step of its complexity; how long each line is, is in its numbers.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), N = entre(6 + R.complejidad, 7, 11), W = 1.7, D = 1.25, T = 0.05, BARRA = 0.16, radio = 0.03 + 0.12 * R.redondo, PASO = (D - BARRA - 0.14) / N, ALTO = 0.016;
    const ventana = A.redondo(W, D, radio), largo = (i) => entre(0.3 + 0.13 * R.numeros[i % R.numeros.length] + 0.07 * ((i * 7) % 4), 0.3, W - 0.34), yDe = (i) => -D / 2 + BARRA + 0.1 + (i + 0.5) * PASO;
    const linea = (i) => A.redondo(largo(i), Math.min(0.07, PASO * 0.55), 0.02), sube = (I) => 0.1 + 0.2 * I, lugar = (i, z) => A.lugar(-W / 2 + 0.17 + largo(i) / 2, yDe(i), T + z, 0);
    function camaraDe() { const C = A.camara({ alza: 34 }), p = A.cuerpo(ventana, A.lugar(0, 0, 0, 0), T); for (const i of [0, N - 1]) p.push(...A.cuerpo(A.redondo(W - 0.3, 0.07, 0.02), A.lugar(0, yDe(i), T + sube(1), 0), ALTO)); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(), V = f.solido(ventana, T), L0 = A.lugar(0, 0, 0, 0), lineas = []; V.pon(L0);
      f.lamina(f.corre(f.redondo(W - 0.16, 0.012, 0.005), 0, -D / 2 + BARRA), '', V.g).pon(L0, T);      // its bar, and the three buttons on it
      for (let k = 0; k < 3; k++) f.lamina(f.corre(f.redondo(0.05, 0.05, 0.025), -W / 2 + 0.14 + k * 0.09, -D / 2 + BARRA / 2), '', V.g).pon(L0, T);
      // Far lines first: a line that has lifted hides the ones behind it.
      for (let i = 0; i < N; i++) lineas.push({ S: f.solido(linea(i), ALTO), arriba: f.resorte(0, { k: 130, c: 19 }), y: C.a(0, yDe(i), T)[1] });
      const cursor = f.lamina(f.redondo(0.05, Math.min(0.07, PASO * 0.55), 0.008), 'acento'); let elegida = N - 1, clara = -1;
      return {
        tecla(dx, dy) { if (!dy) return false; elegida = entre(elegida + dy, 0, N - 1); return true; },
        cuadro(dt) {
          const p = f.puntero, I = f.intensidad; if (!p.dentro) elegida = N - 1; else if (!p.tecla) elegida = f.cerca(lineas.map((l) => l.y));
          const alcance = 0.6 + 1.4 * I; let mueve = false;
          lineas.forEach((l, i) => { l.arriba.meta = (p.dentro ? sube(I) : 0.03) * Math.exp(-((i - elegida) ** 2) / (2 * alcance * alcance)); mueve = f.paso(l.arriba, dt, f.quieto) || mueve; const L = lugar(i, Math.max(0, l.arriba.x)); l.S.pon(L); if (i === elegida) cursor.pon(A.lugar(L.o[0] + largo(i) / 2 + 0.05, L.o[1], L.o[2], 0), ALTO); });
          if (elegida !== clara) { if (clara >= 0) lineas[clara].S.fuera.setAttribute('class', 'tapa borde'); lineas[elegida].S.fuera.setAttribute('class', 'tapa realce'); lineas[elegida].S.g.appendChild(cursor.p); clara = elegida; }
          f.lee(!p.dentro ? 'En reposo' : 'Línea ' + (elegida + 1) + ' de ' + N); return mueve;
        },
      };
    }
    return { camaraDe, monta, N, radio };
  }
  if (A.define) A.define('terminal', { titulo: 'Terminal', describe: 'Una ventana de terminal con su historial en filas, en línea fina. La altura del puntero elige una línea, que se levanta.',
    nota: (R) => 'La altura del puntero elige una línea del historial, que se levanta, y sus vecinas un poco. Son ' + entre(6 + R.complejidad, 7, 11) + ' líneas, y el largo de cada una sale de los números de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
