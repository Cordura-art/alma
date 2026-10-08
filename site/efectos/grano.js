// Grano: broad stains of colour that drift slowly into one another, under a fine still grain like that of paper.
// A background.
// How it works: a slow noise says, at each point, which of the colours there is; before it is read, the place it
// is read at is pushed aside by another noise, which is what makes the stains curl instead of sitting as blots.
// The grain is one value for each point of the screen, always the same: it does not flicker.
(function () {
  var E = window.AlmaEfectos;
  var FS = [
    'precision highp float;',
    'varying vec2 vUv; uniform vec2 uTam; uniform float uT, uEscala, uMezcla, uGrano, uFuerza, uCorre; uniform vec3 uFondo, uUno, uDos;',
    E.RUIDO,
    'void main() {',
    '  vec2 p = vUv * vec2(uTam.x / uTam.y, 1.0) * uEscala + vec2(uCorre, 0.0);',
    '  vec2 q = p + uMezcla * (vec2(ruido(p * 1.3 + vec2(uT * 0.05, 3.1)), ruido(p * 1.3 + vec2(7.7, -uT * 0.04))) - 0.5);',
    '  float a = ruido(q * 1.1 + vec2(-uT * 0.03, uT * 0.02)), b = ruido(q * 0.8 + vec2(11.0 + uT * 0.02, 5.0));',
    '  vec3 col = mix(uFondo, uUno, smoothstep(0.3, 0.72, a) * uFuerza);',
    '  col = mix(col, uDos, smoothstep(0.62, 0.95, b) * 0.45 * uFuerza);',
    // (the grain: a chance of its own for each point, worked twice over so that no weave shows)
    '  vec2 g = floor(gl_FragCoord.xy); float fino = fract(sin(dot(g, vec2(12.9898, 78.233))) * 43758.5453); fino = fract(sin(fino * 91.3458 + dot(g, vec2(0.317, 0.729))) * 47453.5453);',
    '  col += (fino - 0.5) * uGrano;',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');
  E.pon({
    id: 'grano', familia: 'fondo', nombre: 'Grano',
    colores: { fondo: 'ui-02', uno: 'interactive-01', dos: 'text-01' },
    ajustes: [
      { id: 'escala', nombre: 'Escala', min: 0.4, max: 3, paso: 0.1, valor: 1.2 },
      { id: 'mezcla', nombre: 'Mezcla', min: 0, max: 3, paso: 0.1, valor: 1.4 },
      { id: 'fuerza', nombre: 'Fuerza', min: 0.1, max: 1, paso: 0.05, valor: 0.7 },
      { id: 'grano', nombre: 'Grano', min: 0, max: 0.3, paso: 0.02, valor: 0.1 },
      { id: 'velocidad', nombre: 'Velocidad', min: 0, max: 3, paso: 0.1, valor: 1 }
    ],
    crea: function (lienzo, V) {
      var S = E.sombra(lienzo, FS, 1); if (!S) return null; var gl = S.gl, u = S.u, t = 0, corre = 0;
      return {
        medida: S.medida, quita: S.quita,
        color: function (k, v) { gl.uniform3fv(u[{ fondo: 'uFondo', uno: 'uUno', dos: 'uDos' }[k]], v); },
        cuadro: function (dt, ahora, puntero, calla) {
          t += dt * V.velocidad * 4; corre += ((puntero.dentro ? puntero.x * 0.25 : 0) - corre) * (1 - Math.exp(-dt * 1.5)); if (calla) return;
          gl.uniform1f(u.uT, t); gl.uniform1f(u.uEscala, V.escala); gl.uniform1f(u.uMezcla, V.mezcla); gl.uniform1f(u.uGrano, V.grano); gl.uniform1f(u.uFuerza, V.fuerza); gl.uniform1f(u.uCorre, corre);
          S.dibuja();
        }
      };
    }
  });
})();
