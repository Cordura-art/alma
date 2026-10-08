// Ondas: a ground of lines seen from low down, one behind another to the horizon; hills pass through it toward
// whoever looks, and the near lines hide the far ones. A background.
// How it works: each line is a height that changes along the width, read from a noise; the next line reads it a
// little further on, so the lines together draw one ground. Each point of the picture goes through the lines from
// the nearest: if it is on one, it is line; if it is under one, it is hidden by that hill and looks no further.
// Far lines are lower in height, closer together and fainter.
(function () {
  var E = window.AlmaEfectos;
  var FS = [
    'precision highp float;',
    'varying vec2 vUv; uniform vec2 uTam, uPuntero; uniform float uT, uCuantas, uAltura, uHorizonte, uGrosor, uCerca; uniform vec3 uFondo, uUno, uDos;',
    E.RUIDO,
    'void main() {',
    '  float x = (vUv.x - 0.5) * uTam.x / uTam.y, tinta = 0.0, lejos = 0.0;',
    '  for (int i = 0; i < 48; i++) {',
    '    if (float(i) >= uCuantas) break;',
    '    float z = float(i) / max(uCuantas - 1.0, 1.0), pie = mix(-0.04, uHorizonte, pow(z, 0.62));',
    // (a far line sees more of the ground across: the same hills, narrower)
    '    float sube = ruido(vec2(x * (1.3 + 2.6 * z) + 40.0, z * 5.0 + uT * 0.11)) + 0.35 * ruido(vec2(x * (4.0 + 6.0 * z) + 3.0, z * 14.0 + uT * 0.2));',
    '    sube += uCerca * 0.9 * exp(-pow((vUv.x - uPuntero.x) * 5.0, 2.0)) * (1.0 - z);',
    '    float y = pie + sube * uAltura * 0.2 * (1.0 - 0.72 * z);',
    '    float ancho = uGrosor * (1.0 - 0.55 * z), dy = (vUv.y - y) * uTam.y;',
    '    if (abs(dy) < ancho * 0.5 + 1.0) { tinta = (1.0 - smoothstep(ancho * 0.5, ancho * 0.5 + 1.0, abs(dy))) * (1.0 - 0.78 * z); lejos = z; break; }',
    '    if (dy < 0.0) break;',
    '  }',
    '  gl_FragColor = vec4(mix(uFondo, mix(uDos, uUno, smoothstep(0.0, 0.8, lejos)), tinta), 1.0);',
    '}'
  ].join('\n');
  E.pon({
    id: 'ondas', familia: 'fondo', nombre: 'Ondas',
    colores: { fondo: 'ui-02', uno: 'interactive-01', dos: 'text-01' },
    ajustes: [
      { id: 'cuantas', nombre: 'Cuántas', min: 8, max: 48, paso: 1, valor: 30 },
      { id: 'altura', nombre: 'Altura', min: 0, max: 2.5, paso: 0.1, valor: 1 },
      { id: 'horizonte', nombre: 'Horizonte', min: 0.3, max: 0.95, paso: 0.05, valor: 0.7 },
      { id: 'grosor', nombre: 'Grosor', min: 0.5, max: 3, paso: 0.25, valor: 1.25 },
      { id: 'velocidad', nombre: 'Velocidad', min: 0, max: 3, paso: 0.1, valor: 1 }
    ],
    crea: function (lienzo, V) {
      var S = E.sombra(lienzo, FS, 1); if (!S) return null; var gl = S.gl, u = S.u, t = 0, cerca = 0, px = 0.5;
      return {
        medida: S.medida, quita: S.quita,
        color: function (k, v) { gl.uniform3fv(u[{ fondo: 'uFondo', uno: 'uUno', dos: 'uDos' }[k]], v); },
        cuadro: function (dt, ahora, puntero, calla) {
          // under the pointer the near ground rises a little
          t += dt * V.velocidad * 4; cerca += ((puntero.dentro ? 1 : 0) - cerca) * (1 - Math.exp(-dt * 3)); if (puntero.dentro) px += (puntero.x + 0.5 - px) * (1 - Math.exp(-dt * 6));
          if (calla) return;
          var d = Math.min(window.devicePixelRatio || 1, 2);
          gl.uniform1f(u.uT, t); gl.uniform1f(u.uCuantas, V.cuantas); gl.uniform1f(u.uAltura, V.altura); gl.uniform1f(u.uHorizonte, V.horizonte); gl.uniform1f(u.uGrosor, V.grosor * d); gl.uniform1f(u.uCerca, cerca); gl.uniform2f(u.uPuntero, px, 0);
          S.dibuja();
        }
      };
    }
  });
})();
