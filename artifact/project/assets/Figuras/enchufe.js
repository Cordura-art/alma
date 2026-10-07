// Enchufe: a socket on a wall and a plug on its cord, in thin line. The nearer the pointer comes to the socket, the
// nearer the plug is drawn to it, until it is in. One figure, one idea: two things made for each other, and the last
// step that joins them.
//
// An entity's own: as many pins as its chart has groups, plus one; corners as round as it is.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), PATAS = entre(R.grupos + 1, 2, 3), radio = 0.015 + 0.08 * R.redondo, MURO_Y = -0.55, MURO = 0.09, ALTURA = 0.5, LEJOS = 1.1, PATA = 0.16;
    const muro = A.redondo(1.5, MURO, 0.02), cuerpo = A.redondo(0.3, 0.26, radio), pata = (l) => A.redondo(0.035, Math.max(0.012, l), 0.006), FRENTE = MURO_Y + MURO / 2;
    const tira = (I) => 0.35 + 0.57 * I, yDe = (t) => FRENTE + PATA + 0.01 + (1 - t) * LEJOS, xPata = (k) => (k - (PATAS - 1) / 2) * 0.1;
    // Its cord: from the back of the plug down to the floor, and away along it.
    const cordon = (C, y) => { const p = []; for (let s = 0; s <= 14; s++) { const t = s / 14; p.push(C.a(0.04 * Math.sin(t * 5), y + 0.13 + t * 0.5, (ALTURA + 0.05) * (1 - t) ** 2)); } for (let s = 1; s <= 12; s++) { const t = s / 12; p.push(C.a(0.04 * Math.sin(5) + 0.9 * t * t, y + 0.63 + 0.42 * t - 0.12 * t * t, 0)); } return p; };      // and it lies on the floor in one easy curve
    function camaraDe() { const C = A.camara({ alza: 28 }), p = A.cuerpo(muro, A.lugar(0, MURO_Y, 0, 0), 1.05); p.push(...A.cuerpo(cuerpo, A.lugar(0, yDe(0) + 0.13, ALTURA - 0.06, 0), 0.12), [0.95, yDe(0) + 1.18, 0], [0, yDe(0) + 0.6, 0]); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(); f.solido(muro, 1.05).pon(A.lugar(0, MURO_Y, 0, 0));
      const placa = A.frente(0, FRENTE, ALTURA); f.lamina(f.redondo(0.46, 0.46, 0.04 + 0.16 * R.redondo), 'borde').pon(placa, 0);
      for (let k = 0; k < PATAS; k++) f.lamina(f.corre(f.redondo(0.04, 0.09, 0.012), xPata(k), 0), 'lejos').pon(placa, 0);
      // Far to near: its pins, its body, its cord.
      const patas = []; for (let k = 0; k < PATAS; k++) patas.push(f.solido(pata(PATA), 0.02)); const S = f.solido(cuerpo, 0.12), luz = f.lamina(f.redondo(0.07, 0.07, 0.035), 'acento', S.g), cable = f.nodo('path', { class: 'borde' }, f.svg);
      const centro = C.a(0, FRENTE, ALTURA), cerca = f.resorte(0.12, { k: 80, c: 15 }); let porTecla = 0.12;
      return {
        // The arrows bring it nearer and take it away.
        tecla(dx, dy) { const d = dy ? -dy : dx; porTecla = entre((f.puntero.tecla ? porTecla : cerca.meta) + d * 0.2, 0, 1); return true; },
        cuadro(dt) {
          const p = f.puntero, I = f.intensidad, lejos = Math.hypot(p.x - centro[0], p.y - centro[1]);
          cerca.meta = !p.dentro ? 0.12 : Math.min(1, (p.tecla ? porTecla : entre(1.15 - lejos / 170, 0, 1)) * tira(I) / 0.9);
          const mueve = f.paso(cerca, dt, f.quieto), t = entre(cerca.x, 0, 1), y = yDe(t), dentro = t > 0.97;
          // Its pins stop at the wall: what has gone in is not drawn.
          patas.forEach((P, k) => { const l = Math.min(PATA, y - FRENTE - 0.004); P.pon(A.lugar(xPata(k), y - l / 2, ALTURA - 0.01, 0), null, pata(l)); });
          const L = A.lugar(0, y + 0.13, ALTURA - 0.06, 0); S.pon(L); luz.pon(L, 0.12); S.fuera.setAttribute('class', dentro ? 'tapa realce' : 'tapa borde'); cable.setAttribute('d', f.linea(cordon(C, y + 0.13)));
          f.lee(!p.dentro ? 'En reposo' : cerca.meta >= 0.97 ? 'Conectado' : 'A ' + Math.round((1 - cerca.meta) * 100) + ' % de conectar'); return mueve;
        },
      };
    }
    return { camaraDe, monta, PATAS, radio };
  }
  if (A.define) A.define('enchufe', { titulo: 'Enchufe', describe: 'Un enchufe en la pared y una clavija con su cordón, en línea fina. Mientras más se acerca el puntero al enchufe, más se acerca la clavija.',
    nota: (R) => 'Acerca el puntero al enchufe y la clavija se acerca con él, hasta entrar. Tiene ' + entre(R.grupos + 1, 2, 3) + ' patas: una por cada grupo de nuestra carta, y una más.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
