// Portátil: a laptop in thin line. At rest it stands open. The pointer is a hand on its lid: high in the picture
// opens it wide, low closes it, and the lid swings on its hinge with a little weight. One figure, one idea: something
// that opens and closes, and how far.
//
// An entity's own laptop: corners as round as it is (sharp, for an entity of blocks), as deep as it is tall and as
// thick as it is heavy; its keys in as many blocks as its chart has groups; and at rest its lid leans back as far as
// the entity leans forward when it walks.
(function (raiz, hace) {
  const P = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = P;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const G0 = Math.PI / 180;

  function modelo(G) {
    let ANCHO = 1.6, FONDO = 1.1, RADIO = 0.13, BASE = 0.07, TAPA = 0.045, REPOSO = 104, GRUPOS = 1;
    if (G) {
      RADIO = G.anguloso ? 0.04 : 0.06 + 0.14 * (G.redondez == null ? 0.5 : G.redondez); FONDO = Math.max(0.95, Math.min(1.25, G.alto || 1.1)); BASE = 0.05 + 0.05 * (G.peso == null ? 0.4 : G.peso);
      REPOSO = Math.max(96, Math.min(122, 100 - (G.inclina == null ? -5 : G.inclina))); GRUPOS = Math.max(1, Math.min(3, G.grupos || 1));
    }
    const tope = (intensidad) => REPOSO + 4 + 26 * intensidad;      // how far it opens at most
    // The lid, open `grados` from shut: the base's twin, swung on the far long edge.
    function tapaEn(grados) { return AlmaFigura.bisagra(AlmaFigura.lugar(0, 0, BASE, 0), [0, -FONDO / 2, BASE], [1, 0, 0], grados * G0); }
    // How open the pointer asks it to be: its height in the picture AT REST decides, in fixed bands, top to bottom.
    function pedido(y, intensidad) { const t = Math.max(0, Math.min(1, (y - 56) / (264 - 56))); return tope(intensidad) * (1 - t); }
    // The camera that holds it from shut to wide open.
    function camaraDe() {
      const C = AlmaFigura.camara({ alza: 30 }), anillo = AlmaFigura.redondo(ANCHO, FONDO, RADIO), p = [];
      for (const q of anillo) p.push([q.x, q.y, 0]);
      for (let g = 0; g <= tope(1) + 4; g += 4) { const T = tapaEn(g); for (const q of anillo) for (const z of [0, TAPA]) p.push([T.o[0] + T.R[0][0] * q.x + T.R[0][1] * q.y + T.R[0][2] * z, T.o[1] + T.R[1][0] * q.x + T.R[1][1] * q.y + T.R[1][2] * z, T.o[2] + T.R[2][0] * q.x + T.R[2][1] * q.y + T.R[2][2] * z]); }
      return C.encuadra(p, 18);
    }
    function monta(f) {
      f.camara = camaraDe(); const cuerpo = f.redondo(ANCHO, FONDO, RADIO), suelo = f.lugar(0, 0, 0, 0), chico = Math.min(0.05, RADIO);
      // Far to near, under to over: the base and what lies on it, then the lid and its screen.
      const base = f.solido(cuerpo, BASE), sobre = [], total = ANCHO - 0.26, hueco = 0.06, uno = (total - hueco * (GRUPOS - 1)) / GRUPOS;
      for (let k = 0; k < GRUPOS; k++) sobre.push(f.lamina(f.corre(f.redondo(uno, FONDO * 0.45, chico), -total / 2 + uno / 2 + k * (uno + hueco), -FONDO * 0.155)));      // its keys
      sobre.push(f.lamina(f.corre(f.redondo(0.46, FONDO * 0.24, chico), 0, FONDO * 0.3)));                                                                              // its touch pad
      sobre.push(f.lamina(f.corre(f.redondo(0.09, 0.09, 0.045), ANCHO / 2 - 0.18, FONDO / 2 - 0.15), 'acento'));                                                        // its one mark: a light
      const tapa = f.solido(cuerpo, TAPA), pantalla = f.lamina(f.redondo(ANCHO - 0.2, FONDO - 0.2, Math.max(0.02, RADIO - 0.06)));
      const abre = f.resorte(REPOSO, { k: 90, c: 15, fino: 0.03 }); let porTecla = REPOSO;
      base.pon(suelo); sobre.forEach((l) => l.pon(suelo, BASE));
      return {
        // The arrows open and close it a step at a time.
        tecla(dx, dy) { if (!dy) return false; porTecla = Math.max(0, Math.min(tope(f.intensidad), (f.puntero.tecla ? porTecla : abre.meta) - dy * 13)); return true; },
        cuadro(dt) {
          const p = f.puntero; abre.meta = !p.dentro ? REPOSO : p.tecla ? Math.min(porTecla, tope(f.intensidad)) : pedido(p.y, f.intensidad);
          const mueve = f.paso(abre, dt, f.quieto), g = Math.max(0, abre.x), T = tapaEn(g);      // the lid cannot go through the base, however the spring swings
          tapa.pon(T); pantalla.pon(T, 0, true); tapa.fuera.setAttribute('class', p.dentro ? 'tapa realce' : 'tapa borde');
          f.lee(!p.dentro ? 'En reposo' : abre.meta < 3 ? 'Cerrado' : 'Abierto ' + Math.round(abre.meta) + '°');
          return mueve;
        },
      };
    }
    return { tapaEn, pedido, tope, camaraDe, monta, ANCHO, FONDO, RADIO, BASE, TAPA, REPOSO, GRUPOS };
  }

  if (AlmaFigura.define) AlmaFigura.define('portatil', {
    titulo: 'Portátil', nota: (R) => 'Arriba se abre, abajo se cierra. Sus teclas van en ' + (AlmaFigura.entre(R.grupos, 1, 3) === 1 ? 'un bloque' : AlmaFigura.entre(R.grupos, 1, 3) + ' bloques') + ', como los grupos de nuestra carta, y en reposo su tapa se inclina tanto como nosotros al caminar.',
    describe: 'Un portátil dibujado en línea fina. Su tapa se abre y se cierra con el puntero.',
    monta(f) { return modelo(f.genes).monta(f); },
  });
  return Object.assign(modelo(null), { modelo });
});
