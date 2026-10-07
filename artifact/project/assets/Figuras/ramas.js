// Ramas: a history of changes on a board, with a branch that leaves the main line and comes back to it, in thin line.
// The pointer lifts the change it is nearest, and what came before it rises with it, less the further back. One
// figure, one idea: where a thing comes from.
//
// An entity's own: five changes on its main line and one more for each step of its complexity; where its branch
// leaves and how long it is, is in its numbers.
(function (raiz, hace) {
  const F = hace(typeof module === 'object' && module.exports ? require('./motor.js') : raiz.AlmaFigura);
  if (typeof module === 'object' && module.exports) module.exports = F;
})(typeof self !== 'undefined' ? self : this, function (AlmaFigura) {
  const A = AlmaFigura, entre = A.entre;

  function modelo(G) {
    const R = A.rasgos(G), M = entre(5 + R.complejidad, 7, 9), SALE = 1 + R.numeros[0] % 2, LARGA = 2 + R.numeros[1 % R.numeros.length] % 2, VUELVE = SALE + LARGA + 1, W = 1.9, D = 0.9, T = 0.04, PASO = 1.6 / (M - 1);
    const placa = A.redondo(W, D, 0.03 + 0.16 * R.redondo), nodo = A.redondo(0.15, 0.15, R.bloques ? 0.02 : 0.075), sube = (I) => 0.1 + 0.26 * I, alcance = (I) => 1 + 5 * I;
    // Its changes, oldest first: where each is on the board and which came just before it.
    const todos = []; for (let i = 0; i < M; i++) todos.push({ x: (i - (M - 1) / 2) * PASO, y: 0.17, de: i ? [i - 1] : [] });
    for (let j = 0; j < LARGA; j++) todos.push({ x: (SALE + 1 + j - (M - 1) / 2) * PASO, y: -0.2, de: [j ? M + j - 1 : SALE] }); todos[VUELVE].de.push(M + LARGA - 1);
    const orden = todos.map((_, k) => k).sort((a, b) => todos[a].x - todos[b].x || todos[b].y - todos[a].y), pinta = todos.map((_, k) => k).sort((a, b) => todos[a].y - todos[b].y || todos[a].x - todos[b].x);
    // How many steps back from a change each other one is (those that did not lead to it: none).
    function atras(k) { const d = todos.map(() => Infinity), cola = [k]; d[k] = 0; while (cola.length) { const a = cola.shift(); for (const b of todos[a].de) if (d[b] > d[a] + 1) { d[b] = d[a] + 1; cola.push(b); } } return d; }
    function camaraDe() { const C = A.camara({ alza: 32 }), p = A.cuerpo(placa, A.lugar(0, 0, 0, 0), T); p.push([-0.8, -0.2, T + sube(1) + 0.06], [0.8, 0.17, T + sube(1) + 0.06]); return C.encuadra(p, 20); }
    function monta(f) {
      const C = f.camara = camaraDe(); f.solido(placa, T).pon(A.lugar(0, 0, 0, 0));
      const lineas = []; todos.forEach((n, k) => n.de.forEach((d) => lineas.push({ e: f.nodo('path', {}, f.svg), a: d, b: k })));
      const cosas = todos.map(() => null); for (const k of pinta) { const q = C.a(todos[k].x, todos[k].y, T); cosas[k] = { S: f.solido(nodo, 0.035), arriba: f.resorte(0, { k: 110, c: 17 }), x: q[0], y: q[1] }; }
      const punto = f.lamina(f.redondo(0.07, 0.07, 0.035), 'acento'), CASA = M - 1; let elegido = CASA, claro = -1, lejos = atras(CASA);
      return {
        // Left and right go back and forth through its history.
        tecla(dx) { if (!dx) return false; elegido = orden[entre(orden.indexOf(elegido) + dx, 0, orden.length - 1)]; return true; },
        cuadro(dt) {
          const p = f.puntero, I = f.intensidad; if (!p.dentro) elegido = CASA; else if (!p.tecla) { let m = 1e9; cosas.forEach((c, k) => { const d = (c.x - p.x) ** 2 + (c.y - p.y) ** 2; if (d < m) { m = d; elegido = k; } }); }
          if (elegido !== claro) lejos = atras(elegido); let mueve = false;
          cosas.forEach((c, k) => { c.arriba.meta = (p.dentro ? sube(I) : 0.05) * Math.max(0, 1 - lejos[k] / alcance(p.dentro ? I : 0.2)); mueve = f.paso(c.arriba, dt, f.quieto) || mueve; c.L = A.lugar(todos[k].x, todos[k].y, T + Math.max(0, c.arriba.x), 0); c.S.pon(c.L); });
          for (const l of lineas) { const a = cosas[l.a].L.o, b = cosas[l.b].L.o; l.e.setAttribute('d', f.linea([C.a(a[0], a[1], a[2] + 0.018), C.a(b[0], b[1], b[2] + 0.018)])); l.e.setAttribute('class', lejos[l.a] < Infinity && lejos[l.b] < Infinity ? 'borde' : ''); }
          punto.pon(cosas[elegido].L, 0.035);
          if (elegido !== claro) { if (claro >= 0) cosas[claro].S.fuera.setAttribute('class', 'tapa borde'); cosas[elegido].S.fuera.setAttribute('class', 'tapa realce'); cosas[elegido].S.g.appendChild(punto.p); claro = elegido; }
          f.lee(!p.dentro ? 'En reposo' : 'Cambio ' + (orden.indexOf(elegido) + 1) + ' de ' + todos.length + (elegido >= M ? ', en la rama' : '')); return mueve;
        },
      };
    }
    return { camaraDe, monta, M, LARGA, todos, atras };
  }
  if (A.define) A.define('ramas', { titulo: 'Ramas', describe: 'Una historia de cambios sobre una placa, con una rama que sale de la línea principal y vuelve a ella, en línea fina. El puntero levanta un cambio y lo que vino antes.',
    nota: (R) => 'El cambio más cercano al puntero se levanta, y con él lo que vino antes, cada vez menos. Su línea principal tiene ' + entre(5 + R.complejidad, 7, 9) + ' cambios; dónde sale su rama está en los números de nuestra carta.', monta: (f) => modelo(f.genes).monta(f) });
  return Object.assign(modelo(null), { modelo });
});
