// Candado: a padlock in thin line, shut. As the pointer comes near its shackle, the shackle lifts out and then swings
// aside. One figure, one idea: shut and open, and the small gesture between them.
//
// An entity's own: a body as round as it is and as wide as it is; a shackle as thick as it is heavy.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), W = 0.9 * entre(R.ancho, 0.9, 1.1), D = 0.38, H = 0.72, PATA = 0.25, GRUESO = 0.042 + 0.03 * R.peso, radio = 0.03 + 0.14 * R.redondo, G2 = Math.PI / 180;
    const cuerpo = A.redondo(W, D, radio), gira = (I) => (45 + 55 * I) * G2;
    // Its shackle, `t` open (0 shut, 1 wide open): first it lifts, then it swings on its long leg. Only what is out of the body.
    function arco(t, I) {
      const sube = 0.2 * Math.min(1, t / 0.4), fi = gira(I) * Math.max(0, (t - 0.4) / 0.6), zc = H + 0.2 + sube, p = [[-PATA, H], [-PATA, zc]];
      for (let a = 165; a >= 15; a -= 15) p.push([PATA * Math.cos(a * G2), zc + PATA * Math.sin(a * G2)]); p.push([PATA, zc], [PATA, Math.max(H, H + sube - 0.03)]);
      return p.map((q) => [-PATA + (q[0] + PATA) * Math.cos(fi), -(q[0] + PATA) * Math.sin(fi), q[1]]);      // it swings away from the camera, so that it is never seen edge on
    }
    function camaraDe() { const C = A.camara({ alza: 28 }), p = A.cuerpo(cuerpo, A.lugar(0, 0, 0, 0), H); for (const t of [0, 0.4, 0.7, 1]) p.push(...arco(t, 1).map((q) => [q[0], q[1], q[2] + GRUESO]), ...arco(t, 1).map((q) => [q[0] + GRUESO, q[1] + GRUESO, q[2]])); return C.encuadra(p, 20); }
    function monta(f) {
      const C = f.camara = camaraDe(), S = f.solido(cuerpo, H), cara = A.frente(0, D / 2, H * 0.52); S.pon(A.lugar(0, 0, 0, 0));
      f.lamina(f.redondo(0.16, 0.16, 0.08), 'acento', S.g).pon(cara, 0); f.lamina(f.corre(f.redondo(0.05, 0.16, 0.02), 0, 0.13), '', S.g).pon(cara, 0);      // its keyhole: its one mark
      const T = f.tubo(), cima = C.a(0, 0, H + 0.45), abre = f.resorte(0, { k: 90, c: 15, fino: 0.002 }); let porTecla = 0;
      return {
        // The arrows open and shut it by steps.
        tecla(dx, dy) { const d = dx || -dy; porTecla = entre((f.puntero.tecla ? porTecla : abre.meta) + d * 0.25, 0, 1); return true; },
        cuadro(dt) {
          const p = f.puntero; abre.meta = !p.dentro ? 0 : p.tecla ? porTecla : entre(1.3 - Math.hypot(p.x - cima[0], p.y - cima[1]) / 130, 0, 1);
          const mueve = f.paso(abre, dt, f.quieto), t = entre(abre.x, 0, 1); T.pon(arco(t, f.intensidad), GRUESO); S.fuera.setAttribute('class', t > 0.42 ? 'tapa realce' : 'tapa borde');
          f.lee(!p.dentro ? 'En reposo' : abre.meta < 0.05 ? 'Cerrado' : abre.meta > 0.95 ? 'Abierto' : 'Abriendo, ' + Math.round(abre.meta * 100) + ' %'); return mueve;
        },
      };
    }
    return { camaraDe, monta, arco, radio, GRUESO };
  }
  if (A.define) A.define('candado', { titulo: 'Candado', describe: 'Un candado en línea fina. Al acercarse el puntero a su arco, el arco sale y se abre hacia un lado.',
    nota: (R) => 'Acerca el puntero a su arco: primero sale y después gira hacia un lado. Su cuerpo es tan redondo como somos, y su arco tan grueso como pesamos.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
