// Tornamesa: blocks standing on a turntable, in thin line. Drag the pointer across and it spins; let go and it coasts,
// then settles on the nearest quarter turn. One figure, one idea: turning a thing over to see its other sides.
//
// An entity's own: a block for each defined center of its chart, each as tall as one of its numbers.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), N = entre(R.centros, 3, 5), Q = Math.PI / 2, radio = 0.012 + 0.07 * R.redondo, PIE = 0.05, PLATO = 0.07, ARRIBA = PIE + PLATO;
    const pie = A.redondo(1.9, 1.9, 0.95, 64), plato = A.redondo(1.66, 1.66, 0.83, 64);      // large rounds take more sides, to read as curves
    const bloques = Array.from({ length: N }, (_, k) => ({ a: k * 2 * Math.PI / N + 0.5, r: 0.42 + 0.07 * (k % 2), lado: 0.3 + 0.05 * ((k * 2) % 3), alto: 0.16 + 0.075 * R.numeros[k % R.numeros.length] }));
    const TOPE = Math.max(...bloques.map((b) => b.alto));
    function camaraDe() { const C = A.camara({ alza: 32 }), p = A.cuerpo(pie, A.lugar(0, 0, 0, 0), PIE); p.push(...A.cuerpo(A.redondo(1.3, 1.3, 0.65), A.lugar(0, 0, ARRIBA, 0), TOPE)); return C.encuadra(p, 18); }
    function monta(f) {
      const C = f.camara = camaraDe(), L0 = A.lugar(0, 0, 0, 0); f.solido(pie, PIE).pon(L0); const P = f.solido(plato, PLATO), muesca = f.lamina(f.corre(f.redondo(0.14, 0.05, 0.02), 0.7, 0), '', P.g);
      const cosas = bloques.map((b) => ({ b, S: f.solido(f.redondo(b.lado, b.lado, Math.min(radio, b.lado / 2)), b.alto) })), alta = cosas.reduce((m, c) => c.b.alto > m.b.alto ? c : m), punto = f.lamina(f.redondo(0.08, 0.08, 0.04), 'acento', alta.S.g);
      let ang = 0, vel = 0, antes = null, fijo = null, asienta = true;
      return {
        // Left and right turn it a quarter.
        tecla(dx) { if (!dx) return false; fijo = (Math.round(ang / Q) + dx) * Q; return true; },
        cuadro(dt) {
          const p = f.puntero; let arrastra = false;
          if (p.dentro && !p.tecla) { if (antes != null && dt > 0 && Math.abs(p.x - antes) > 0.3) { vel = entre(vel + ((p.x - antes) / dt * 0.014 - vel) * 0.5, -7, 7); arrastra = true;      // however hard it is flicked, it has a top speed
            fijo = null; asienta = false; } antes = p.x; } else antes = null;
          if (f.quieto) { ang = fijo != null ? fijo : Math.round((ang + vel * 0.4) / Q) * Q; vel = 0; fijo = null; }
          else if (!arrastra) {
            // Let go, it coasts and loses speed; once slow, the nearest quarter draws it in.
            if (Math.abs(vel) < 1.1 || fijo != null) asienta = true; const lento = asienta, meta = fijo != null ? fijo : Math.round(ang / Q) * Q;
            if (lento) vel += ((meta - ang) * 70 - vel * 13) * dt; else vel *= Math.exp(-dt / (0.1 + 0.35 * f.intensidad));
            if (lento && Math.abs(meta - ang) < 0.002 && Math.abs(vel) < 0.02) { ang = meta; vel = 0; fijo = null; }
          }
          ang += vel * dt; P.pon(A.lugar(0, 0, PIE, ang)); muesca.pon(A.lugar(0, 0, PIE, ang), PLATO); P.fuera.setAttribute('class', p.dentro ? 'tapa realce' : 'tapa borde');
          for (const c of cosas) { const a = c.b.a + ang; c.L = A.lugar(Math.cos(a) * c.b.r, Math.sin(a) * c.b.r, ARRIBA, ang); c.hondo = c.L.o[0] * C.mira[0] + c.L.o[1] * C.mira[1]; c.S.pon(c.L); }
          cosas.slice().sort((x, y) => x.hondo - y.hondo).forEach((c) => f.svg.appendChild(c.S.g)); punto.pon(alta.L, alta.b.alto);      // far blocks first, as they stand now
          const cuarto = ((Math.round(ang / Q) % 4) + 4) % 4; f.lee(!p.dentro ? 'En reposo' : 'Giro ' + cuarto * 90 + '°'); return vel !== 0 || arrastra;
        },
      };
    }
    return { camaraDe, monta, N, radio };
  }
  if (A.define) A.define('tornamesa', { titulo: 'Tornamesa', describe: 'Bloques sobre una tornamesa, en línea fina. Arrastra el puntero y gira; al soltarla sigue un momento y se detiene en un cuarto de vuelta.',
    nota: (R) => 'Arrastra el puntero de lado a lado y gira; al soltarla sigue un momento y se asienta en un cuarto de vuelta. Lleva ' + entre(R.centros, 3, 5) + ' bloques, uno por cada centro definido de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
