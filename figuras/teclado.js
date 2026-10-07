// Teclado: a board of keys in thin line. The key under the pointer sinks, and the ones around it sink a little with
// it, like a hand resting. One figure, one idea: touching one thing among many, and what it does to its neighbors.
//
// An entity's own: as many rows as its chart has groups (plus three), keys as round as it is.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), COLS = 10, FILAS = entre(3 + R.grupos, 4, 5), PASO = 0.17, LADO = 0.135, ALTO = 0.075, PLACA = 0.05, HUNDE = 0.055, radio = 0.012 + 0.05 * R.redondo;
    const W = COLS * PASO + 0.1, D = FILAS * PASO + 0.1, placa = A.redondo(W, D, 0.03 + 0.12 * R.redondo), tecla = A.redondo(LADO, LADO, radio);
    const donde = (i, j) => [(i - (COLS - 1) / 2) * PASO, (j - (FILAS - 1) / 2) * PASO], CASA = [COLS - 3, FILAS - 2];
    function camaraDe() { const C = A.camara({ alza: 34 }); return C.encuadra(A.cuerpo(placa, A.lugar(0, 0, 0, 0), PLACA + ALTO), 20); }
    function monta(f) {
      const C = f.camara = camaraDe(), teclas = []; f.solido(placa, PLACA).pon(A.lugar(0, 0, 0, 0));
      // Far rows first, and along each row away from the camera first: each key hides what is behind it.
      for (let j = 0; j < FILAS; j++) for (let i = 0; i < COLS; i++) { const d = donde(i, j); teclas.push({ i, j, S: f.solido(tecla, ALTO), L: A.lugar(d[0], d[1], PLACA, 0), baja: f.resorte(0, { k: 160, c: 22 }) }); }
      const punto = f.lamina(f.redondo(0.05, 0.05, 0.025), 'acento'); let ci = CASA[0], cj = CASA[1], clara = null;
      return {
        tecla(dx, dy) { ci = entre(ci + dx, 0, COLS - 1); cj = entre(cj + dy, 0, FILAS - 1); return true; },
        cuadro(dt) {
          const p = f.puntero, I = f.intensidad;
          if (!p.dentro) { ci = CASA[0]; cj = CASA[1]; } else if (!p.tecla) { const s = C.alSuelo(p.x, p.y + (PLACA + ALTO) * 0.87 * C.escala); ci = entre(Math.round(s[0] / PASO + (COLS - 1) / 2), 0, COLS - 1); cj = entre(Math.round(s[1] / PASO + (FILAS - 1) / 2), 0, FILAS - 1); }      // the pointer, read on the tops of the keys as they stand at rest
          const ancho = 0.7 + 1.6 * I, fuerza = p.dentro ? 1 : 0.5; let mueve = false, esta = null;
          for (const t of teclas) {
            const d2 = (t.i - ci) ** 2 + (t.j - cj) ** 2; t.baja.meta = HUNDE * fuerza * Math.exp(-d2 / (2 * ancho * ancho)); mueve = f.paso(t.baja, dt, f.quieto) || mueve;
            t.S.pon(t.L, ALTO - Math.max(0, t.baja.x)); if (t.i === ci && t.j === cj) esta = t;
          }
          punto.pon(esta.L, ALTO - Math.max(0, esta.baja.x));
          if (esta !== clara) { if (clara) clara.S.fuera.setAttribute('class', 'tapa borde'); esta.S.fuera.setAttribute('class', 'tapa realce'); esta.S.g.appendChild(punto.p); clara = esta; }
          f.lee(!p.dentro ? 'En reposo' : 'Tecla ' + (cj + 1) + ' · ' + (ci + 1)); return mueve;
        },
      };
    }
    return { camaraDe, monta, COLS, FILAS, radio };
  }
  if (A.define) A.define('teclado', { titulo: 'Teclado', describe: 'Un teclado en línea fina. La tecla bajo el puntero se hunde, y las de alrededor un poco con ella.',
    nota: (R) => 'La tecla que señalas se hunde, y sus vecinas un poco con ella. Tiene ' + entre(3 + R.grupos, 4, 5) + ' filas: tres, y una más por cada grupo de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
