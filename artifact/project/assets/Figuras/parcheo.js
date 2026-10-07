// Parcheo: a panel of ports with some cables in, in thin line. The pointer lifts the cable it is nearest, and the ones
// beside it lean out of its way. One figure, one idea: many connections, and following one of them.
//
// An entity's own: two cables, and one more for each defined center of its chart; which ports they are in is in
// its numbers.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), PUERTOS = 10, K = entre(R.centros + 2, 4, 7), W = 1.9, D = 0.46, H = 0.14, PASO = 0.17, BARRA = 0.02, panel = A.redondo(W, D, 0.02 + 0.12 * R.redondo);
    const xDe = (j) => (j - (PUERTOS - 1) / 2) * PASO, en = []; for (let k = 0, j = R.numeros[0] % PUERTOS; en.length < K; k++, j = (j + 3 + R.numeros[k % R.numeros.length]) % PUERTOS) { while (en.includes(j)) j = (j + 1) % PUERTOS; en.push(j); } en.sort((a, b) => a - b);
    const alto0 = (k) => 0.2 + 0.035 * (R.numeros[k % R.numeros.length] % 3), sube = (I) => 0.12 + 0.3 * I;
    // A cable: up out of its port, over, and down to the floor behind the panel.
    const cable = (k, alto, lado) => { const x = xDe(en[k]), a = [x, 0.08, H], b = [x + 1.2 * lado, -0.2, H + 2 * alto], c = [x + 2.4 * lado, -0.72, 0], p = []; for (let s = 0; s <= 26; s++) { const t = s / 26, u = 1 - t; p.push([u * u * a[0] + 2 * u * t * b[0] + t * t * c[0], u * u * a[1] + 2 * u * t * b[1] + t * t * c[1], u * u * a[2] + 2 * u * t * b[2] + t * t * c[2]]); } return p; };
    function camaraDe() { const C = A.camara({ alza: 30 }), p = A.cuerpo(panel, A.lugar(0, 0, 0, 0), H); for (const k of [0, K - 1]) for (const l of [-0.2, 0.2]) p.push(...cable(k, 0.26 + sube(1), l).map((q) => [q[0], q[1], q[2] + BARRA])); return C.encuadra(p, 20); }
    function monta(f) {
      const C = f.camara = camaraDe(), S = f.solido(panel, H), L0 = A.lugar(0, 0, 0, 0), bocas = []; S.pon(L0);
      for (let j = 0; j < PUERTOS; j++) { const b = f.lamina(f.corre(f.redondo(0.09, 0.09, 0.012 + 0.03 * R.redondo), xDe(j), 0.08), '', S.g); b.pon(L0, H); bocas.push(b); }
      // Along the panel from its far end: each cable hides the ones behind it.
      const cables = en.map((j, k) => ({ T: f.tubo(), alto: f.resorte(alto0(k), { k: 90, c: 14 }), lado: f.resorte(0, { k: 70, c: 11 }), x: C.a(xDe(j), 0.08, H + 0.2)[0] })), CASA = Math.floor(K / 2); let elegido = CASA, claro = -1;
      return {
        tecla(dx) { if (!dx) return false; elegido = entre(elegido + dx, 0, K - 1); return true; },
        cuadro(dt) {
          const p = f.puntero, I = f.intensidad; if (!p.dentro) elegido = CASA; else if (!p.tecla) { let m = 1e9; cables.forEach((c, k) => { const d = Math.abs(c.x - p.x); if (d < m) { m = d; elegido = k; } }); }
          const ancho = 0.5 + 1.2 * I; let mueve = false;
          cables.forEach((c, k) => {
            const d = k - elegido; c.alto.meta = alto0(k) + (p.dentro ? sube(I) : 0.05) * Math.exp(-(d * d) / (2 * ancho * ancho)); c.lado.meta = !p.dentro || !d ? 0 : Math.sign(d) * 0.1 * Math.exp(-((Math.abs(d) - 1) ** 2) / (2 * ancho * ancho));
            mueve = f.paso(c.alto, dt, f.quieto) || mueve; mueve = f.paso(c.lado, dt, f.quieto) || mueve; c.T.pon(cable(k, c.alto.x, c.lado.x), BARRA);
          });
          if (elegido !== claro) { if (claro >= 0) { cables[claro].T.p.setAttribute('class', 'tapa borde'); bocas[en[claro]].p.setAttribute('class', ''); } cables[elegido].T.p.setAttribute('class', 'tapa realce'); bocas[en[elegido]].p.setAttribute('class', 'acento'); claro = elegido; }
          f.lee(!p.dentro ? 'En reposo' : 'Cable ' + (elegido + 1) + ' de ' + K + ', puerto ' + (en[elegido] + 1)); return mueve;
        },
      };
    }
    return { camaraDe, monta, K, en };
  }
  if (A.define) A.define('parcheo', { titulo: 'Parcheo', describe: 'Un panel de puertos con algunos cables puestos, en línea fina. El puntero levanta el cable más cercano y sus vecinos se apartan.',
    nota: (R) => 'El cable más cercano al puntero se levanta, y sus vecinos se apartan. Lleva ' + entre(R.centros + 2, 4, 7) + ' cables: dos, y uno más por cada centro definido de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
