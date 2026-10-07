// Lupa: a stand magnifier on a ruled sheet, in thin line. It follows the pointer across the sheet, and what lies
// under it is drawn again in its glass, larger. Somewhere on the sheet is one mark to find. One figure, one idea:
// looking closely for one small thing.
//
// An entity's own: as many lines on its sheet as its complexity asks; where its mark is, is in its numbers; a glass as
// round as it is.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), LINEAS = entre(5 + 2 * R.complejidad, 9, 13), W = 1.8, D = 1.26, T = 0.02, RADIO = 0.3, ALTURA = 0.32, ARO = 0.05, DENTRO = RADIO - 0.05, redondez = R.bloques ? 0.2 : 1;
    const hoja = A.redondo(W, D, 0.03 + 0.1 * R.redondo), aro = A.redondo(2 * RADIO, 2 * RADIO, RADIO * redondez, 64), vidrio = A.redondo(2 * DENTRO, 2 * DENTRO, DENTRO * redondez, 64);
    const yDe = (j) => (j - (LINEAS - 1) / 2) * (D - 0.26) / (LINEAS - 1), X = W / 2 - 0.15, aumenta = (I) => 1.3 + 1.3 * I, MARCA = [-0.5 + 0.11 * R.numeros[0], yDe((R.numeros[1 % R.numeros.length] + 2) % LINEAS) + 0.045], CASA = [-0.3, 0.12];
    function camaraDe() { const C = A.camara({ alza: 34 }), p = A.cuerpo(hoja, A.lugar(0, 0, 0, 0), T); for (const x of [-1, 1]) for (const y of [-1, 1]) p.push(...A.cuerpo(aro, A.lugar(x * (W / 2 - RADIO), y * (D / 2 - RADIO), ALTURA, 0), ARO)); return C.encuadra(p, 20); }
    function monta(f) {
      const C = f.camara = camaraDe(), S = f.solido(hoja, T), L0 = A.lugar(0, 0, 0, 0); S.pon(L0);
      for (let j = 0; j < LINEAS; j++) f.nodo('path', {}, S.g).setAttribute('d', f.linea([C.a(-X, yDe(j), T), C.a(X, yDe(j), T)]));
      const chica = f.lamina(f.corre(f.redondo(0.07, 0.07, 0.035), MARCA[0], MARCA[1]), 'acento', S.g); chica.pon(L0, T);
      const patas = [0, 1, 2].map(() => f.tubo()), V = f.solido(aro, ARO), cristal = f.lamina(vidrio, '', V.g), rayas = f.nodo('path', { class: 'realce' }, V.g), grande = f.nodo('path', { class: 'acento' }, V.g);
      const cx = f.resorte(CASA[0], { k: 90, c: 15 }), cy = f.resorte(CASA[1], { k: 90, c: 15 }), baja = C.a(0, 0, 0)[1] - C.a(0, 0, ALTURA)[1]; let porTecla = CASA.slice();
      return {
        // The arrows carry it across the sheet.
        tecla(dx, dy) { if (!f.puntero.tecla) porTecla = [cx.meta, cy.meta]; porTecla = [porTecla[0] + (dx - dy) * 0.1, porTecla[1] + (-dx - dy) * 0.1]; return true; },
        cuadro(dt) {
          const p = f.puntero, s = !p.dentro ? CASA : p.tecla ? porTecla : C.alSuelo(p.x, p.y + baja), m = aumenta(f.intensidad);
          cx.meta = entre(s[0], -W / 2 + RADIO, W / 2 - RADIO); cy.meta = entre(s[1], -D / 2 + RADIO, D / 2 - RADIO); if (p.tecla) porTecla = [cx.meta, cy.meta];
          let mueve = f.paso(cx, dt, f.quieto); mueve = f.paso(cy, dt, f.quieto) || mueve; const x = cx.x, y = cy.x, L = A.lugar(x, y, ALTURA, 0), Z = ALTURA + ARO;
          patas.forEach((P, k) => { const a = (90 + 120 * k) * Math.PI / 180, q = [x + (RADIO - 0.03) * Math.cos(a), y + (RADIO - 0.03) * Math.sin(a)]; P.pon([[q[0], q[1], T], [q[0], q[1], ALTURA]], 0.014); });
          V.pon(L); cristal.pon(L, ARO);
          // In its glass: the lines under it, further apart, as far as the round of the glass lets each one run.
          let d = ''; for (let j = 0; j < LINEAS; j++) { const yy = y + (yDe(j) - y) * m, lado = DENTRO * 0.94; if (Math.abs(yy - y) >= lado) continue; const medio = Math.sqrt(lado * lado - (yy - y) ** 2), a = Math.max(x - medio, x + (-X - x) * m), b = Math.min(x + medio, x + (X - x) * m); if (b > a) d += f.linea([C.a(a, yy, Z), C.a(b, yy, Z)]); }
          rayas.setAttribute('d', d);
          // Its mark, when the glass is over it: drawn large in the glass, and not on the sheet.
          const gx = x + (MARCA[0] - x) * m, gy = y + (MARCA[1] - y) * m, r = 0.035 * m, ve = Math.hypot(gx - x, gy - y) < DENTRO - r - 0.02;
          grande.setAttribute('d', ve ? f.linea(A.redondo(2 * r, 2 * r, r).map((q) => C.a(gx + q.x, gy + q.y, Z)), true) : ''); chica.p.style.display = ve ? 'none' : ''; V.fuera.setAttribute('class', ve ? 'tapa realce' : 'tapa borde');
          f.lee(!p.dentro ? 'En reposo' : (ve ? 'La encontraste. ' : '') + 'Aumento ×' + m.toFixed(1).replace('.', ',')); return mueve;
        },
      };
    }
    return { camaraDe, monta, LINEAS, MARCA };
  }
  if (A.define) A.define('lupa', { titulo: 'Lupa', describe: 'Una lupa de pie sobre una hoja rayada, en línea fina. Sigue al puntero y agranda lo que tiene debajo; en la hoja hay una marca que encontrar.',
    nota: (R) => 'Sigue al puntero por la hoja y agranda lo que tiene debajo. En la hoja hay una sola marca, la nuestra, que encontrar: dónde está sale de los números de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
