// Teléfono: a phone taken apart into its four layers, in thin line: shell, battery, board and glass. Moving across
// the picture opens them; moving up and down picks one, which slides out toward you. One figure, one idea: what is
// inside a thing we hold every day.
//
// An entity's own: corners as round as it is, and as many lenses on its back as its chart has groups.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), N = 4, W = 0.78, D = 1.5, T = 0.05, AIRE = 0.03, radio = 0.04 + 0.16 * R.redondo, chico = Math.min(0.035, radio), LENTES = entre(R.grupos, 1, 3), NOMBRES = ['Carcasa', 'Batería', 'Placa', 'Vidrio'];
    const hueco = (I) => 0.12 + 0.28 * I, z = (i, abre, I) => i * (T + AIRE) + i * abre * hueco(I), anillo = A.redondo(W, D, radio);
    const lugar = (C, i, abre, I, sale) => A.lugar(sale * C.mira[0], sale * C.mira[1], z(i, abre, I), 0);
    // What lies on each layer, bottom to top: [wide, deep, across, along] of each shape.
    const lentes = []; for (let k = 0; k < LENTES; k++) lentes.push([0.15, 0.15, -W / 2 + 0.17, -D / 2 + 0.17 + k * 0.2, 0.075]);
    const dibujos = [lentes, [[W - 0.18, D * 0.55, 0, 0.14], [W - 0.34, 0.12, 0, -D / 2 + 0.17]], [[0.28, 0.28, -0.14, -0.4], [0.2, 0.34, 0.18, -0.36], [W - 0.2, 0.2, 0, 0.1], [0.3, 0.3, 0, 0.48]], [[W - 0.1, D - 0.1, 0, 0, Math.max(0.02, radio - 0.04)], [0.22, 0.05, 0, -D / 2 + 0.12, 0.025]]];
    function camaraDe() { const C = A.camara({ alza: 32 }), p = []; for (let i = 0; i < N; i++) for (const s of [0, 0.3]) for (const ab of [0, 1]) p.push(...A.cuerpo(anillo, lugar(C, i, ab, 1, s), T)); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(), capas = [];
      for (let i = 0; i < N; i++) { const S = f.solido(anillo, T); capas.push({ S, sale: f.resorte(0), dib: dibujos[i].map((d) => f.lamina(f.corre(f.redondo(d[0], d[1], d[4] == null ? chico : d[4]), d[2], d[3]), '', S.g)), y: C.a(0, 0, z(i, 0.5, 0.5) + T / 2)[1] }); }
      const punto = f.lamina(f.corre(f.redondo(0.09, 0.09, 0.045), W / 2 - 0.14, D / 2 - 0.14), 'acento'), abre = f.resorte(0.3); let elegida = N - 1, clara = -1, porTecla = 0.3;
      return {
        tecla(dx, dy) { if (!f.puntero.tecla) porTecla = abre.meta; elegida = entre(elegida - dy, 0, N - 1); porTecla = entre(porTecla + dx * 0.2, 0, 1); return true; },
        cuadro(dt) {
          const p = f.puntero, I = f.intensidad; if (p.dentro && !p.tecla) elegida = f.cerca(capas.map((c) => c.y));
          abre.meta = !p.dentro ? 0.3 : p.tecla ? porTecla : entre((p.x - 70) / 260, 0, 1); const a = p.dentro ? elegida : N - 1; let mueve = f.paso(abre, dt, f.quieto);
          capas.forEach((c, i) => { c.sale.meta = p.dentro && i === a ? 0.16 + 0.14 * I : 0; mueve = f.paso(c.sale, dt, f.quieto) || mueve; const L = lugar(C, i, Math.max(0, abre.x), I, c.sale.x); c.S.pon(L); c.dib.forEach((d) => d.pon(L, T)); if (i === a) punto.pon(L, T); });
          if (a !== clara) { if (clara >= 0) capas[clara].S.fuera.setAttribute('class', 'tapa borde'); capas[a].S.fuera.setAttribute('class', 'tapa realce'); capas[a].S.g.appendChild(punto.p); clara = a; }
          f.lee(!p.dentro ? 'En reposo' : NOMBRES[a] + ', abierto ' + Math.round(abre.meta * 100) + ' %'); return mueve;
        },
      };
    }
    return { camaraDe, monta, N, LENTES, radio };
  }
  if (A.define) A.define('telefono', { titulo: 'Teléfono', describe: 'Un teléfono desarmado en sus cuatro capas, en línea fina: carcasa, batería, placa y vidrio.',
    nota: (R) => 'De lado a lado se abre; arriba y abajo eliges una capa: carcasa, batería, placa o vidrio. En su espalda lleva ' + (entre(R.grupos, 1, 3) === 1 ? 'un lente' : entre(R.grupos, 1, 3) + ' lentes') + ', como los grupos de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
