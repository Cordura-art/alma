// Sello: a stamp over a sheet, with the mark it leaves, in thin line. The pointer's height brings it down; pressed, it
// covers its mark, and lifted, the mark is there again. The mark is the entity's own sign. One figure, one idea: this
// is ours.
//
// An entity's own: its mark has as many points as its sign, as full as the entity is round. ALMA's own is the star
// of four points.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), PUNTAS = R.propia ? entre(R.puntas, 3, 12) : 4, W = 1.5, D = 1.1, T = 0.02, BASE = 0.1, MANGO = 0.34, ARRIBA = 0.46, lleno = R.propia ? 0.36 + 0.36 * R.redondo : 0.4;
    const hoja = A.redondo(W, D, 0.03 + 0.1 * R.redondo), base = A.redondo(0.58, 0.58, 0.04 + 0.22 * R.redondo), mango = A.redondo(0.3, 0.3, R.bloques ? 0.03 : 0.15, 48);
    // Its sign: a star, its points out and its hollows in, turn and turn about.
    const signo = []; for (let k = 0; k < 2 * PUNTAS; k++) { const a = k * Math.PI / PUNTAS - Math.PI / 2, r = 0.21 * (k % 2 ? lleno : 1); signo.push({ x: r * Math.cos(a), y: r * Math.sin(a), nx: 0, ny: 0 }); }
    const pedido = (y) => ARRIBA * entre((262 - y) / 180, 0, 1);      // the pointer's height in the picture, in fixed bands
    function camaraDe() { const C = A.camara({ alza: 32 }), p = A.cuerpo(hoja, A.lugar(0, 0, 0, 0), T); p.push(...A.cuerpo(mango, A.lugar(0, 0, T + ARRIBA + 0.03 + BASE, 0), MANGO)); return C.encuadra(p, 20); }
    function monta(f) {
      const C = f.camara = camaraDe(), S = f.solido(hoja, T), L0 = A.lugar(0, 0, 0, 0); S.pon(L0); f.lamina(signo, 'acento', S.g).pon(L0, T);
      const B = f.solido(base, BASE), Mg = f.solido(mango, MANGO), alto = f.resorte(ARRIBA * 0.8, { k: 120, c: 16, fino: 0.001 }); let porTecla = ARRIBA * 0.8;
      return {
        // Up and down lift it and press it.
        tecla(dx, dy) { if (!dy) return false; porTecla = entre((f.puntero.tecla ? porTecla : alto.meta) - dy * ARRIBA / 3, 0, ARRIBA); return true; },
        cuadro(dt) {
          const p = f.puntero; alto.meta = !p.dentro ? ARRIBA * 0.8 : p.tecla ? porTecla : pedido(p.y);
          const mueve = f.paso(alto, dt, f.quieto), z = T + Math.max(0, alto.x), abajo = alto.meta < 0.012; B.pon(A.lugar(0, 0, z, 0)); Mg.pon(A.lugar(0, 0, z + BASE, 0)); B.fuera.setAttribute('class', abajo ? 'tapa realce' : 'tapa borde');
          f.lee(!p.dentro ? 'En reposo' : abajo ? 'Estampado' : 'A ' + Math.round(alto.meta / ARRIBA * 100) + ' % de alto'); return mueve;
        },
      };
    }
    return { camaraDe, monta, PUNTAS, signo };
  }
  if (A.define) A.define('sello', { titulo: 'Sello', describe: 'Un sello sobre una hoja, con la marca que deja, en línea fina. La altura del puntero lo baja; al levantarlo, la marca está ahí.',
    nota: (R) => 'La altura del puntero lo baja hasta estampar; al levantarlo, nuestra marca está ahí. La marca es nuestro signo: ' + (R.propia ? entre(R.puntas, 3, 12) : 4) + ' puntas.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
