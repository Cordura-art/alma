// Rayos: shafts of light that fan down from a point above the picture, some brighter than others, turning slowly.
// A background.
// How it works: each point of the picture asks at what angle it is seen from the point the light comes from. A noise
// that depends only on that angle says how bright that direction is, so the light is the same all along a line from
// the source: a ray. Two such noises, one fine and one broad, turn against each other. The light is kept inside a
// fan and thins out with distance.
(function () {
  var E = window.AlmaEfectos;
  var FS = [
    'precision highp float;',
    'varying vec2 vUv; uniform vec2 uTam; uniform float uT, uOrigen, uApertura, uLargo, uRayos, uFuerza; uniform vec3 uFondo, uUno, uDos;',
    E.RUIDO,
    'void main() {',
    '  vec2 p = (vUv - vec2(0.5 + uOrigen, 1.06)) * vec2(uTam.x / uTam.y, 1.0);',
    '  float ang = atan(p.x, -p.y), d = length(p);',
    '  float a = ruido(vec2(ang * uRayos + uT * 0.12, 1.7)), b = ruido(vec2(ang * uRayos * 2.3 - uT * 0.08, 9.2));',
    '  float luz = (a * a * 0.75 + b * b * b * 0.6) * (1.0 - smoothstep(uApertura * 0.55, uApertura, abs(ang))) * (1.0 - smoothstep(0.0, uLargo, d)) * uFuerza;',
    '  vec3 col = mix(uFondo, mix(uUno, uDos, clamp(luz * 0.7, 0.0, 1.0)), clamp(luz * 1.7, 0.0, 1.0));',
    '  col += (azar(gl_FragCoord.xy * 0.731) - 0.5) / 255.0;',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');
  E.pon({
    id: 'rayos', familia: 'fondo', nombre: 'Rayos',
    colores: { fondo: 'ui-02', uno: 'interactive-01', dos: 'text-01' },
    ajustes: [
      { id: 'origen', nombre: 'Origen', min: -0.6, max: 0.6, paso: 0.05, valor: 0 },
      { id: 'apertura', nombre: 'Apertura', min: 0.2, max: 1.5, paso: 0.05, valor: 0.8 },
      { id: 'largo', nombre: 'Largo', min: 0.4, max: 2.5, paso: 0.1, valor: 1.3 },
      { id: 'rayos', nombre: 'Rayos', min: 2, max: 24, paso: 1, valor: 9 },
      { id: 'fuerza', nombre: 'Fuerza', min: 0.1, max: 1, paso: 0.05, valor: 0.7 },
      { id: 'velocidad', nombre: 'Velocidad', min: 0, max: 3, paso: 0.1, valor: 1 }
    ],
    crea: function (lienzo, V) {
      var S = E.sombra(lienzo, FS, 0.5); if (!S) return null; var gl = S.gl, u = S.u, t = 0, corre = 0;
      return {
        medida: S.medida, quita: S.quita,
        color: function (k, v) { gl.uniform3fv(u[{ fondo: 'uFondo', uno: 'uUno', dos: 'uDos' }[k]], v); },
        cuadro: function (dt, ahora, puntero, calla) {
          // the source leans a little toward the pointer
          t += dt * V.velocidad * 4; corre += ((puntero.dentro ? puntero.x * 0.2 : 0) - corre) * (1 - Math.exp(-dt * 2)); if (calla) return;
          gl.uniform1f(u.uT, t); gl.uniform1f(u.uOrigen, V.origen + corre); gl.uniform1f(u.uApertura, V.apertura); gl.uniform1f(u.uLargo, V.largo); gl.uniform1f(u.uRayos, V.rayos); gl.uniform1f(u.uFuerza, V.fuerza);
          S.dibuja();
        }
      };
    }
  });
})();
