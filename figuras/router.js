// Router: a box with its antennas up, in thin line. Each antenna leans toward the pointer, the nearest most. One
// figure, one idea: something that listens for you wherever you are.
//
// An entity's own: an antenna for each defined center of its chart; a box as round as it is.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), N = entre(R.centros, 3, 5), W = 1.3, D = 0.8, H = 0.16, LARGO = 0.74, BARRA = 0.022, caja = A.redondo(W, D, 0.03 + 0.2 * R.redondo);
    const xDe = (k) => (k - (N - 1) / 2) * (W - 0.34) / (N - 1), Y = -D / 2 + 0.12, reposo = (k) => [0.1 * (k - (N - 1) / 2) / N, -0.05 - 0.02 * (R.numeros[k % R.numeros.length] % 3)];
    const antena = (k, ax, ay) => { const el = Math.hypot(ax, ay), az = Math.atan2(ay, ax), d = [Math.sin(el) * Math.cos(az), Math.sin(el) * Math.sin(az), Math.cos(el)], b = [xDe(k), Y, H]; return [b, [b[0] + d[0] * LARGO / 2, b[1] + d[1] * LARGO / 2, b[2] + d[2] * LARGO / 2], [b[0] + d[0] * LARGO, b[1] + d[1] * LARGO, b[2] + d[2] * LARGO]]; };
    function camaraDe() { const C = A.camara({ alza: 30 }), p = A.cuerpo(caja, A.lugar(0, 0, 0, 0), H); for (let k = 0; k < N; k++) for (let a = 0; a < 8; a++) p.push(antena(k, 0.62 * Math.cos(a * Math.PI / 4), 0.62 * Math.sin(a * Math.PI / 4))[2]); p.push([0, Y, H + LARGO + BARRA]); return C.encuadra(p, 20); }
    function monta(f) {
      const C = f.camara = camaraDe(), S = f.solido(caja, H), cara = A.frente(0, D / 2, H / 2); S.pon(A.lugar(0, 0, 0, 0));
      for (let k = 0; k < 4; k++) f.lamina(f.corre(f.redondo(0.05, 0.05, 0.025), -W / 2 + 0.2 + k * 0.11, 0), k ? '' : 'acento', S.g).pon(cara, 0);      // its lights; the first is its one mark
      const antenas = []; for (let k = 0; k < N; k++) { const r = reposo(k); antenas.push({ T: f.tubo(), ax: f.resorte(r[0], { k: 70, c: 9, fino: 0.002 }), ay: f.resorte(r[1], { k: 70, c: 9, fino: 0.002 }) }); }
      const baja = C.a(0, 0, 0)[1] - C.a(0, 0, H + LARGO / 2)[1], sep = (W - 0.34) / (N - 1); let porTecla = 0, clara = -1;
      return {
        // Left and right carry what it listens for along it.
        tecla(dx) { if (!dx) return false; porTecla = entre((f.puntero.tecla ? porTecla : 0) + dx * 0.25, -0.8, 0.8); return true; },
        cuadro(dt) {
          const p = f.puntero, s = !p.dentro ? null : p.tecla ? [porTecla, 0.45] : C.alSuelo(p.x, p.y + baja), ancho = 0.5 + 2.5 * f.intensidad; let mueve = false, mejor = -1, senal = 0;
          antenas.forEach((a, k) => {
            let q = reposo(k), w = 0; if (s) { const dx = s[0] - xDe(k), dy = s[1] - Y, l = Math.hypot(dx, dy) || 1e-6; w = Math.exp(-((dx / sep) ** 2) / (2 * ancho * ancho)); const el = 0.62 * w * entre(l / 0.5, 0, 1); q = [dx / l * el, dy / l * el]; }
            if (w > senal) { senal = w; mejor = k; } a.ax.meta = q[0]; a.ay.meta = q[1]; mueve = f.paso(a.ax, dt, f.quieto) || mueve; mueve = f.paso(a.ay, dt, f.quieto) || mueve; a.T.pon(antena(k, a.ax.x, a.ay.x), BARRA);
          });
          if (mejor !== clara) { if (clara >= 0) antenas[clara].T.p.setAttribute('class', 'tapa borde'); if (mejor >= 0) antenas[mejor].T.p.setAttribute('class', 'tapa realce'); clara = mejor; }
          f.lee(!p.dentro ? 'En reposo' : 'Señal ' + Math.round(senal * 100) + ' %'); return mueve;
        },
      };
    }
    return { camaraDe, monta, N };
  }
  if (A.define) A.define('router', { titulo: 'Router', describe: 'Un router con sus antenas arriba, en línea fina. Cada antena se inclina hacia el puntero, y más la más cercana.',
    nota: (R) => 'Sus antenas se inclinan hacia el puntero, la más cercana más que las otras. Tiene ' + entre(R.centros, 3, 5) + ', una por cada centro definido de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
