// Perchero: a rail of bare hangers, in thin line. The pointer brushes them as it passes and they rock, each a little
// later than the last, and settle. One figure, one idea: an empty place that is ready, and moves when you pass.
//
// An entity's own: as many hangers as its sign has points; how each hangs at rest is in its numbers.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), N = entre(R.puntas, 5, 9), LARGO = 1.7, ALTURA = 1.05, BARRA = 0.022, G2 = Math.PI / 180;
    const xDe = (k) => (k - (N - 1) / 2) * (LARGO - 0.4) / (N - 1) + 0.012 * ((R.numeros[k % R.numeros.length] % 3) - 1), cuelga = (k) => (R.numeros[k % R.numeros.length] - 4.5) * 0.022;
    // A hanger: its hook over the rail, its neck, its two shoulders and the bar between them, swung on the rail.
    function percha(k, ang) {
      const p = []; for (let a = 200; a >= -20; a -= 20) p.push([0.05 * Math.cos(a * G2), 0.05 * Math.sin(a * G2)]); p.push([0, -0.05], [0, -0.14], [-0.25, -0.31], [0.25, -0.31], [0, -0.14]);
      const c = Math.cos(ang), s = Math.sin(ang); return p.map((q) => [xDe(k), q[0] * c - q[1] * s, ALTURA + q[0] * s + q[1] * c]);
    }
    const poste = (x) => [[x, 0, 0], [x, 0, ALTURA]], pie = (x) => [[x, -0.3, 0], [x, 0.3, 0]];
    function camaraDe() { const C = A.camara({ alza: 26 }), p = [[-LARGO / 2, -0.34, 0], [LARGO / 2, 0.34, 0], [-LARGO / 2, 0, ALTURA + 0.08], [LARGO / 2, 0, ALTURA + 0.08], [-LARGO / 2 + 0.2, -0.36, ALTURA - 0.3], [LARGO / 2 - 0.2, 0.36, ALTURA - 0.3]]; return C.encuadra(p, 20); }
    function monta(f) {
      const C = f.camara = camaraDe(); f.tubo().pon(pie(-LARGO / 2), BARRA); f.tubo().pon(poste(-LARGO / 2), BARRA); f.tubo().pon([[-LARGO / 2, 0, ALTURA], [LARGO / 2, 0, ALTURA]], BARRA);
      const perchas = []; for (let k = 0; k < N; k++) { const q = C.a(xDe(k), 0, ALTURA - 0.18); perchas.push({ e: f.nodo('path', {}, f.svg), ang: f.resorte(cuelga(k), { k: 55, c: 6, fino: 0.004 }), x: q[0], y: q[1] }); }
      f.tubo().pon(pie(LARGO / 2), BARRA); f.tubo().pon(poste(LARGO / 2), BARRA); const marca = f.nodo('circle', { class: 'acento', r: 3 }, f.svg), CASA = Math.floor(N / 2), paso = Math.abs(perchas[1].x - perchas[0].x);
      let elegida = CASA, clara = -1, antes = null;
      return {
        // Left and right go along the rail, and give the hanger a push.
        tecla(dx) { if (!dx) return false; elegida = entre(elegida + dx, 0, N - 1); perchas[elegida].ang.v += 3 * dx; return true; },
        cuadro(dt) {
          const p = f.puntero; let roce = 0;
          if (p.dentro && !p.tecla) { let mejor = 1e9; perchas.forEach((h, k) => { const d = Math.hypot(h.x - p.x, h.y - p.y); if (d < mejor) { mejor = d; elegida = k; } }); if (antes != null && dt > 0) roce = entre((p.x - antes) / dt, -900, 900); antes = p.x; } else { antes = null; if (!p.dentro) elegida = CASA; }
          const ancho = (0.6 + 1.3 * f.intensidad) * paso; let mueve = false;
          perchas.forEach((h, k) => {
            if (roce && !f.quieto) h.ang.v = entre(h.ang.v + roce * 0.0045 * Math.exp(-((h.x - p.x) ** 2 + (h.y - p.y) ** 2) / (2 * ancho * ancho)) * dt * 30, -6, 6);      // the pointer's own speed is the push
            if (f.quieto && p.dentro) h.ang.meta = cuelga(k) + (k === elegida ? 0.35 : 0); else h.ang.meta = cuelga(k);
            mueve = f.paso(h.ang, dt, f.quieto) || mueve; h.e.setAttribute('d', f.linea(percha(k, h.ang.x).map((q) => C.a(q[0], q[1], q[2]))));
          });
          if (elegida !== clara) { if (clara >= 0) perchas[clara].e.setAttribute('class', ''); perchas[elegida].e.setAttribute('class', 'realce'); clara = elegida; }
          const g = percha(elegida, perchas[elegida].ang.x)[5], q = C.a(g[0], g[1], g[2]); marca.setAttribute('cx', q[0].toFixed(1)); marca.setAttribute('cy', q[1].toFixed(1));
          f.lee(!p.dentro ? 'En reposo' : 'Percha ' + (elegida + 1) + ' de ' + N); return mueve;
        },
      };
    }
    return { camaraDe, monta, percha, N };
  }
  if (A.define) A.define('perchero', { titulo: 'Perchero', describe: 'Un perchero con sus perchas vacías, en línea fina. El puntero las roza al pasar y se mecen.',
    nota: (R) => 'Pasa el puntero y las perchas se mecen, cada una un poco después de la anterior. Son ' + entre(R.puntas, 5, 9) + ', como las puntas de nuestro signo.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
