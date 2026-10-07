// Casilleros: a bank of lockers in thin line. One stands open at rest. The pointer opens the locker it points at, and
// the one that was open closes. One figure, one idea: one place of your own among many alike.
//
// An entity's own: four lockers across, and a row for each group of its chart plus one; doors as round as it is.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), COLS = 4, FILAS = entre(R.grupos + 1, 2, 3), PW = 0.4, PH = 0.46, D = 0.5, W = COLS * PW + 0.06, ALTO = FILAS * PH + 0.1, GRUESO = 0.022, radio = 0.012 + 0.07 * R.redondo;
    const mueble = A.redondo(W, D, Math.min(radio, 0.05)), puerta = A.redondo(PW - 0.05, PH - 0.05, radio), abre = (I) => (55 + 65 * I) * Math.PI / 180;
    const centro = (i, j) => [(i - (COLS - 1) / 2) * PW, 0.06 + j * PH + PH / 2];
    // A door, open by an angle: it stands on the front of the bank and swings out on its left edge.
    const lugar = (i, j, angulo) => { const c = centro(i, j); return A.bisagra(A.frente(c[0], D / 2, c[1]), [c[0] - (PW - 0.05) / 2, D / 2, c[1]], [0, 0, 1], angulo); };
    function camaraDe() { const C = A.camara({ alza: 26 }), p = A.cuerpo(mueble, A.lugar(0, 0, 0, 0), ALTO); for (let i = 0; i < COLS; i++) for (const j of [0, FILAS - 1]) for (const an of [abre(1) * 0.5, abre(1)]) p.push(...A.cuerpo(puerta, lugar(i, j, an), GRUESO)); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(), casillas = []; f.solido(mueble, ALTO).pon(A.lugar(0, 0, 0, 0));
      // Bottom row first, and along each row from the far side: an open door hides what is behind it.
      for (let j = 0; j < FILAS; j++) for (let i = 0; i < COLS; i++) {
        const c = centro(i, j); f.lamina(f.redondo(PW - 0.09, PH - 0.09, Math.max(0.008, radio - 0.02)), 'lejos').pon(A.frente(c[0], D / 2, c[1]), 0);      // what is seen through the open door
        const S = f.solido(puerta, GRUESO), q = C.a(c[0], D / 2, c[1]); casillas.push({ i, j, S, tira: f.lamina(f.corre(f.redondo(0.035, 0.11, 0.017), PW / 2 - 0.1, 0), '', S.g), gira: f.resorte(0, { k: 100, c: 17, fino: 0.002 }), x: q[0], y: q[1] });
      }
      const CASA = (R.numeros[0] + R.puntas) % casillas.length; let elegida = CASA, clara = -1;
      return {
        tecla(dx, dy) { const t = casillas[elegida]; elegida = entre(t.j - dy, 0, FILAS - 1) * COLS + entre(t.i + dx, 0, COLS - 1); return true; },
        cuadro(dt) {
          const p = f.puntero, I = f.intensidad;
          if (!p.dentro) elegida = CASA; else if (!p.tecla) { let mejor = 1e9; casillas.forEach((t, k) => { const d = (t.x - p.x) ** 2 + (t.y - p.y) ** 2; if (d < mejor) { mejor = d; elegida = k; } }); }      // against the doors shut, where they do not move
          let mueve = false;
          casillas.forEach((t, k) => { t.gira.meta = k === elegida ? (p.dentro ? abre(I) : abre(0.2)) : 0; mueve = f.paso(t.gira, dt, f.quieto) || mueve; const L = lugar(t.i, t.j, Math.max(0, t.gira.x)); t.S.pon(L); if (!t.tira.pon(L, GRUESO).visible) t.tira.pon(L, 0, true); });      // its pull is seen from whichever side the door shows
          if (elegida !== clara) { if (clara >= 0) { casillas[clara].S.fuera.setAttribute('class', 'tapa borde'); casillas[clara].tira.p.setAttribute('class', ''); } casillas[elegida].S.fuera.setAttribute('class', 'tapa realce'); casillas[elegida].tira.p.setAttribute('class', 'acento'); clara = elegida; }
          f.lee(!p.dentro ? 'En reposo' : 'Casillero ' + (elegida + 1) + ' de ' + casillas.length); return mueve;
        },
      };
    }
    return { camaraDe, monta, COLS, FILAS, radio };
  }
  if (A.define) A.define('casilleros', { titulo: 'Casilleros', describe: 'Una fila de casilleros en línea fina. El puntero abre el que señala, y el que estaba abierto se cierra.',
    nota: (R) => 'Se abre el casillero que señalas, y el que estaba abierto se cierra. Son ' + 4 * entre(R.grupos + 1, 2, 3) + ', en ' + entre(R.grupos + 1, 2, 3) + ' filas: una por cada grupo de nuestra carta, y una más.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
