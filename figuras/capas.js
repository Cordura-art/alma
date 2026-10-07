// Capas: a window taken apart into its layers, in thin line. Moving across the picture opens them; moving up and down
// picks one, which slides out toward you. One figure, one idea: what a thing is made of, layer by layer.
//
// An entity's own: as many layers as its chart has defined centers, corners as round as it is.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), N = entre(R.centros, 3, 5), W = 1.5, D = 1.05, T = 0.045, AIRE = 0.03, radio = 0.04 + 0.2 * R.redondo, chico = Math.min(0.04, radio);
    const hueco = (I) => 0.1 + 0.3 * I, z = (i, abre, I) => i * (T + AIRE) + i * abre * hueco(I), anillo = A.redondo(W, D, radio);
    const lugar = (C, i, abre, I, sale) => A.lugar(sale * C.mira[0], sale * C.mira[1], z(i, abre, I), 0);
    // What is drawn on each layer: a window with its bar, two columns, three rows, one sheet.
    const dibujos = [[[W - 0.24, 0.1, 0, -D / 2 + 0.17], [W - 0.24, D - 0.42, 0, 0.09]], [[W / 2 - 0.2, D - 0.26, -W / 4 + 0.03, 0], [W / 2 - 0.2, D - 0.26, W / 4 - 0.03, 0]], [[W - 0.3, 0.2, 0, -0.27], [W - 0.3, 0.2, 0, 0], [W - 0.3, 0.2, 0, 0.27]], [[W - 0.5, D - 0.4, 0, 0]]];
    function camaraDe() { const C = A.camara({ alza: 32 }), p = []; for (let i = 0; i < N; i++) for (const s of [0, 0.26]) for (const ab of [0, 1]) p.push(...A.cuerpo(anillo, lugar(C, i, ab, 1, s), T)); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(), capas = [];
      for (let i = 0; i < N; i++) { const S = f.solido(anillo, T); capas.push({ S, sale: f.resorte(0), dib: dibujos[(N - 1 - i) % dibujos.length].map((d) => f.lamina(f.corre(f.redondo(d[0], d[1], chico), d[2], d[3]), '', S.g)), y: C.a(0, 0, z(i, 0.5, 0.5) + T / 2)[1] }); }
      const punto = f.lamina(f.corre(f.redondo(0.12, 0.12, 0.06), W / 2 - 0.2, D / 2 - 0.17), 'acento'), abre = f.resorte(0.25); let elegida = N - 1, clara = -1, porTecla = 0.25;
      return {
        // Up and down pick a layer; left and right close and open them.
        tecla(dx, dy) { if (!f.puntero.tecla) porTecla = abre.meta; elegida = entre(elegida - dy, 0, N - 1); porTecla = entre(porTecla + dx * 0.2, 0, 1); return true; },
        cuadro(dt) {
          const p = f.puntero, I = f.intensidad;
          if (p.dentro && !p.tecla) elegida = f.cerca(capas.map((c) => c.y));      // against the layers half open, as they never move for this
          abre.meta = !p.dentro ? 0.25 : p.tecla ? porTecla : entre((p.x - 70) / 260, 0, 1); const a = p.dentro ? elegida : N - 1;
          let mueve = f.paso(abre, dt, f.quieto);
          capas.forEach((c, i) => { c.sale.meta = p.dentro && i === a ? 0.14 + 0.12 * I : 0; mueve = f.paso(c.sale, dt, f.quieto) || mueve; const L = lugar(C, i, Math.max(0, abre.x), I, c.sale.x); c.S.pon(L); c.dib.forEach((d) => d.pon(L, T)); if (i === a) punto.pon(L, T); });
          if (a !== clara) { if (clara >= 0) capas[clara].S.fuera.setAttribute('class', 'tapa borde'); capas[a].S.fuera.setAttribute('class', 'tapa realce'); capas[a].S.g.appendChild(punto.p); clara = a; }
          f.lee(!p.dentro ? 'En reposo' : 'Capa ' + (a + 1) + ' de ' + N + ', abierta ' + Math.round(abre.meta * 100) + ' %'); return mueve;
        },
      };
    }
    return { camaraDe, monta, N, radio };
  }
  if (A.define) A.define('capas', { titulo: 'Capas', describe: 'Una ventana desarmada en sus capas, en línea fina. De lado a lado se abren; arriba y abajo se elige una.',
    nota: (R) => 'De lado a lado se abren; arriba y abajo eliges una. Son ' + entre(R.centros, 3, 5) + ' capas, una por cada centro definido de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
