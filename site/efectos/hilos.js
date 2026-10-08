// Hilos: a sheaf of fine lines that leaves one side together and opens as it crosses, each thread waving. A background.
// How it works: each thread is a height that changes along the width, a noise read a little further on for each
// thread, so that neighbours move alike without moving the same. Where they start they are held together; the
// waving grows as they cross. Each point of the picture asks every thread how near it passes.
(function () {
  var E = window.AlmaEfectos;
  var FS = [
    'precision highp float;',
    'varying vec2 vUv; uniform vec2 uTam; uniform float uT, uCuantos, uAmplitud, uSepara, uGrosor, uSube; uniform vec3 uFondo, uUno, uDos;',
    E.RUIDO,
    'void main() {',
    '  float x = vUv.x * uTam.x / uTam.y, abre = smoothstep(0.0, 0.75, vUv.x), tinta = 0.0, cual = 0.0;',
    '  for (int i = 0; i < 48; i++) {',
    '    if (float(i) >= uCuantos) break;',
    '    float p = float(i) / max(uCuantos - 1.0, 1.0);',
    '    float onda = ruido(vec2(x * 1.4 - uT * 0.12 + p * 0.9, p * 2.6 + uT * 0.05)) - 0.5 + (ruido(vec2(x * 4.0 - uT * 0.2, p * 9.0)) - 0.5) * 0.25;',
    '    float y = 0.5 + (p - 0.5) * uSepara * (0.25 + 0.75 * abre) + onda * uAmplitud * uSube * (0.15 + 0.85 * abre);',
    '    float ancho = uGrosor * (1.0 - 0.55 * p), linea = 1.0 - smoothstep(ancho * 0.5, ancho * 0.5 + 1.25, abs(vUv.y - y) * uTam.y);',
    '    linea *= 0.35 + 0.65 * (1.0 - p);',
    '    if (linea > tinta) { tinta = linea; cual = p; }',
    '  }',
    '  vec3 col = mix(uFondo, mix(uDos, uUno, smoothstep(0.0, 0.7, cual)), tinta);',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');
  E.pon({
    id: 'hilos', familia: 'fondo', nombre: 'Hilos',
    colores: { fondo: 'ui-02', uno: 'interactive-01', dos: 'text-01' },
    ajustes: [
      { id: 'cuantos', nombre: 'Cuántos', min: 4, max: 48, paso: 1, valor: 28 },
      { id: 'amplitud', nombre: 'Amplitud', min: 0, max: 2, paso: 0.1, valor: 1 },
      { id: 'separa', nombre: 'Separación', min: 0, max: 1, paso: 0.05, valor: 0.35 },
      { id: 'grosor', nombre: 'Grosor', min: 0.5, max: 4, paso: 0.5, valor: 1.5 },
      { id: 'velocidad', nombre: 'Velocidad', min: 0, max: 3, paso: 0.1, valor: 1 }
    ],
    crea: function (lienzo, V) {
      var S = E.sombra(lienzo, FS, 1); if (!S) return null; var gl = S.gl, u = S.u, t = 0, sube = 1;
      return {
        medida: S.medida, quita: S.quita,
        color: function (k, v) { gl.uniform3fv(u[{ fondo: 'uFondo', uno: 'uUno', dos: 'uDos' }[k]], v); },
        cuadro: function (dt, ahora, puntero, calla) {
          // the pointer, higher up, makes them wave wider; to one side, hurries them
          t += dt * V.velocidad * (1 + (puntero.dentro ? puntero.x : 0)); sube += ((puntero.dentro ? 1 + puntero.y * 0.8 : 1) - sube) * (1 - Math.exp(-dt * 3)); if (calla) return;
          var d = Math.min(window.devicePixelRatio || 1, 2);
          gl.uniform1f(u.uT, t * 4); gl.uniform1f(u.uCuantos, V.cuantos); gl.uniform1f(u.uAmplitud, V.amplitud); gl.uniform1f(u.uSepara, V.separa); gl.uniform1f(u.uGrosor, V.grosor * d); gl.uniform1f(u.uSube, sube);
          S.dibuja();
        }
      };
    }
  });
})();
