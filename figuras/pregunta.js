// Pregunta: a question mark made of a bent bar over a loose ball, in thin line. The hook turns to face the pointer and
// the ball rolls after it. One figure, one idea: not knowing yet, and looking toward where the answer may be.
//
// An entity's own: a hook as round as it is (in straight runs, for an entity of blocks), a bar as thick as it is heavy.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), GRUESO = 0.06 + 0.035 * R.peso, BOLA = 0.13, CENTRO = 1.02, RADIO = 0.28, G2 = Math.PI / 180, cuanto = (I) => (20 + 35 * I) * G2;
    // Its hook, in its own flat: across and up. Round, or in straight runs.
    // (a bar cannot turn a corner tighter than it is thick: each corner of the straight one is eased into a short curve)
    const esquinas = (pts, ro) => { const sale = [pts[0]]; for (let i = 1; i < pts.length - 1; i++) { const a = pts[i - 1], b = pts[i], c = pts[i + 1], la = Math.hypot(a[0] - b[0], a[1] - b[1]), lc = Math.hypot(c[0] - b[0], c[1] - b[1]), p = [b[0] + (a[0] - b[0]) / la * ro, b[1] + (a[1] - b[1]) / la * ro], q = [b[0] + (c[0] - b[0]) / lc * ro, b[1] + (c[1] - b[1]) / lc * ro]; for (let k = 0; k <= 5; k++) { const t = k / 5, u = 1 - t; sale.push([u * u * p[0] + 2 * u * t * b[0] + t * t * q[0], u * u * p[1] + 2 * u * t * b[1] + t * t * q[1]]); } } sale.push(pts[pts.length - 1]); return sale; };
    const plano = []; if (R.bloques) plano.push(...esquinas([[0, 0.46], [0, 0.82], [RADIO, 0.82], [RADIO, 1.3], [-RADIO, 1.3], [-RADIO, 1.04]], GRUESO * 1.9));
    else {
      // Up its stem, in one easy turn into its hook, and around over the top.
      const e = [RADIO * Math.cos(-35 * G2), CENTRO + RADIO * Math.sin(-35 * G2)]; plano.push([0, 0.46], [0, 0.5]);
      for (let k = 1; k < 9; k++) { const t = k / 9, u = 1 - t; plano.push([u * u * 0 + 2 * u * t * 0 + t * t * e[0], u * u * 0.5 + 2 * u * t * 0.8 + t * t * e[1]]); }
      for (let a = -35; a <= 205; a += 12) plano.push([RADIO * Math.cos(a * G2), CENTRO + RADIO * Math.sin(a * G2)]);
    }
    const gancho = (fi) => plano.map((q) => [q[0] * Math.cos(fi), q[0] * Math.sin(fi), q[1]]);
    function camaraDe() { const C = A.camara({ alza: 26 }), p = [[-0.42, 0, 0], [0.42, 0, 0], [0, 0.3, 0]]; for (const t of [-1, 0, 1]) for (const q of gancho(t * cuanto(1))) p.push([q[0], q[1], q[2] + GRUESO * 1.5], [q[0] + GRUESO, q[1], q[2]], [q[0] - GRUESO, q[1], q[2]]); return C.encuadra(p, 22); }
    function monta(f) {
      const C = f.camara = camaraDe(), T = f.tubo(), bola = f.nodo('circle', { class: 'acento', r: (BOLA * C.escala).toFixed(1) }, f.svg), medio = C.a(0, 0, 0.8)[0];
      const gira = f.resorte(0.2, { k: 80, c: 11, fino: 0.002 }), rueda = f.resorte(0.06, { k: 40, c: 5, fino: 0.002 }); let porTecla = 0.3;
      return {
        // Left and right turn it a step.
        tecla(dx) { if (!dx) return false; porTecla = entre((f.puntero.tecla ? porTecla : gira.meta / cuanto(f.intensidad)) + dx * 0.34, -1, 1); return true; },
        cuadro(dt) {
          const p = f.puntero, lado = !p.dentro ? null : p.tecla ? porTecla : entre((p.x - medio) / 130, -1, 1);
          gira.meta = lado == null ? 0.2 : lado * cuanto(f.intensidad); rueda.meta = lado == null ? 0.06 : lado * 0.22;      // its ball rolls the way its hook looks, and overshoots
          let mueve = f.paso(gira, dt, f.quieto); mueve = f.paso(rueda, dt, f.quieto) || mueve;
          T.pon(gancho(gira.x), GRUESO); T.p.setAttribute('class', p.dentro ? 'tapa realce' : 'tapa borde'); const q = C.a(rueda.x, 0.04, BOLA); bola.setAttribute('cx', q[0].toFixed(1)); bola.setAttribute('cy', q[1].toFixed(1));
          f.lee(!p.dentro ? 'En reposo' : 'Mira a ' + (gira.meta < -0.02 ? 'la izquierda' : gira.meta > 0.02 ? 'la derecha' : 'el frente') + ', ' + Math.abs(Math.round(gira.meta / G2)) + '°'); return mueve;
        },
      };
    }
    return { camaraDe, monta, gancho, GRUESO };
  }
  if (A.define) A.define('pregunta', { titulo: 'Pregunta', describe: 'Un signo de interrogación hecho con una barra curva sobre una bola suelta, en línea fina. El gancho gira hacia el puntero y la bola rueda tras él.',
    nota: (R) => 'Su gancho gira hacia el puntero y su bola rueda tras él. ' + (R.bloques ? 'El gancho va en tramos rectos porque estamos hechos de bloques.' : 'El gancho es tan redondo como somos.') + ' La bola es nuestra marca.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
