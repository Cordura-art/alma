// Velo: curtains of light that hang from the top of a section and sway. A background.
// How it works: along the top runs a wavering edge, a noise that drifts with time; above it there is light, and
// below it the light thins out softly. A finer noise draws the folds of the cloth. The light goes from one colour
// at the sides to another in the middle.
(function () {
  var E = window.AlmaEfectos;
  var FS = [
    'precision highp float;',
    'varying vec2 vUv; uniform vec2 uTam; uniform float uT, uAlto, uAmplitud, uSuave, uFuerza, uCorre; uniform vec3 uFondo, uUno, uDos;',
    E.RUIDO,
    'void main() {',
    '  float x = vUv.x * uTam.x / uTam.y + uCorre;',
    // the edge: a slow wave and a quicker one on top of it
    '  float borde = 1.0 - uAlto + (ruido(vec2(x * 1.3 + uT * 0.06, uT * 0.11)) - 0.5) * 0.7 * uAmplitud + (ruido(vec2(x * 3.7 - uT * 0.09, uT * 0.17 + 7.0)) - 0.5) * 0.22 * uAmplitud;',
    '  float luz = smoothstep(borde - uSuave, borde + uSuave * 0.6, vUv.y);',
    // the folds, stronger near the edge than at the top
    '  float pliegue = 0.72 + 0.28 * ruido(vec2(x * 11.0 + uT * 0.05, vUv.y * 1.5 - uT * 0.08));',
    '  luz *= mix(pliegue, 1.0, smoothstep(borde, 1.0, vUv.y) * 0.6);',
    '  vec3 tono = mix(uUno, uDos, 0.45 * (1.0 - abs(vUv.x * 2.0 - 1.0)) * (0.6 + 0.4 * ruido(vec2(x * 0.8, uT * 0.07))));',
    '  vec3 col = mix(uFondo, tono, luz * uFuerza);',
    '  col += (azar(gl_FragCoord.xy) - 0.5) / 255.0;',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');
  E.pon({
    id: 'velo', familia: 'fondo', nombre: 'Velo',
    colores: { fondo: 'ui-02', uno: 'interactive-01', dos: 'text-01' },
    ajustes: [
      { id: 'alto', nombre: 'Caída', min: 0.1, max: 1, paso: 0.05, valor: 0.45 },
      { id: 'amplitud', nombre: 'Amplitud', min: 0, max: 2, paso: 0.1, valor: 1 },
      { id: 'suave', nombre: 'Suavidad', min: 0.05, max: 0.8, paso: 0.05, valor: 0.35 },
      { id: 'fuerza', nombre: 'Fuerza', min: 0.1, max: 1, paso: 0.05, valor: 0.7 },
      { id: 'velocidad', nombre: 'Velocidad', min: 0, max: 3, paso: 0.1, valor: 1 }
    ],
    crea: function (lienzo, V) {
      var S = E.sombra(lienzo, FS, 0.5); if (!S) return null; var gl = S.gl, u = S.u, t = 0, corre = 0;
      return {
        medida: S.medida, quita: S.quita,
        color: function (k, v) { gl.uniform3fv(u[{ fondo: 'uFondo', uno: 'uUno', dos: 'uDos' }[k]], v); },
        cuadro: function (dt, ahora, puntero, calla) {
          t += dt * V.velocidad * 4; corre += ((puntero.dentro ? puntero.x * 0.3 : 0) - corre) * (1 - Math.exp(-dt * 2)); if (calla) return;
          gl.uniform1f(u.uT, t); gl.uniform1f(u.uAlto, V.alto); gl.uniform1f(u.uAmplitud, V.amplitud); gl.uniform1f(u.uSuave, V.suave); gl.uniform1f(u.uFuerza, V.fuerza); gl.uniform1f(u.uCorre, corre);
          S.dibuja();
        }
      };
    }
  });
})();
