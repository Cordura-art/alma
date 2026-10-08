// Retícula: an even grid of small dots; those near the pointer grow and take the accent, and now and then a slow
// wave of the same passes through by itself. A background.
// How it works: each point of the picture finds the cell of the grid it is in and asks how far it is from that
// cell's centre: nearer than the dot's radius, it is dot. The radius and the colour of each dot come from how near
// its centre is to the pointer, and from a slow noise that drifts across the grid.
(function () {
  var E = window.AlmaEfectos;
  var FS = [
    'precision highp float;',
    'varying vec2 vUv; uniform vec2 uTam, uPuntero; uniform float uT, uPaso, uTamano, uAlcance, uCrece, uOla, uCerca; uniform vec3 uFondo, uUno, uDos;',
    E.RUIDO,
    'void main() {',
    '  vec2 px = gl_FragCoord.xy, celda = floor(px / uPaso), centro = (celda + 0.5) * uPaso;',
    '  float d = length((centro / uTam - uPuntero) * vec2(uTam.x / uTam.y, 1.0));',
    '  float cerca = uCerca * (1.0 - smoothstep(0.0, uAlcance, d));',
    '  float ola = uOla * smoothstep(0.55, 0.92, ruido(celda * 0.11 + vec2(uT * 0.13, -uT * 0.09)));',
    '  float viva = max(cerca, ola), radio = uTamano * (1.0 + uCrece * viva);',
    '  float punto = 1.0 - smoothstep(radio - 0.75, radio + 0.75, length(px - centro));',
    '  gl_FragColor = vec4(mix(uFondo, mix(mix(uFondo, uDos, 0.3), uUno, viva), punto), 1.0);',
    '}'
  ].join('\n');
  E.pon({
    id: 'reticula', familia: 'fondo', nombre: 'Retícula',
    colores: { fondo: 'ui-02', uno: 'interactive-01', dos: 'text-01' },
    ajustes: [
      { id: 'paso', nombre: 'Separación', min: 12, max: 56, paso: 4, valor: 24 },
      { id: 'tamano', nombre: 'Tamaño', min: 0.5, max: 6, paso: 0.5, valor: 1.5 },
      { id: 'alcance', nombre: 'Alcance', min: 0.05, max: 0.6, paso: 0.05, valor: 0.3 },
      { id: 'crece', nombre: 'Crece', min: 0, max: 4, paso: 0.25, valor: 2 },
      { id: 'ola', nombre: 'Ola', min: 0, max: 1, paso: 0.05, valor: 0.5 },
      { id: 'velocidad', nombre: 'Velocidad', min: 0, max: 3, paso: 0.1, valor: 1 }
    ],
    crea: function (lienzo, V) {
      var S = E.sombra(lienzo, FS, 1); if (!S) return null; var gl = S.gl, u = S.u, t = 0, cerca = 0, px = 0.5, py = 0.5;
      return {
        medida: S.medida, quita: S.quita,
        color: function (k, v) { gl.uniform3fv(u[{ fondo: 'uFondo', uno: 'uUno', dos: 'uDos' }[k]], v); },
        cuadro: function (dt, ahora, puntero, calla) {
          t += dt * V.velocidad * 4;
          // the pointer's light comes up when it comes in and goes down when it leaves, and follows it without a jump
          var k = 1 - Math.exp(-dt * 10); cerca += ((puntero.dentro ? 1 : 0) - cerca) * (1 - Math.exp(-dt * 5));
          if (puntero.dentro) { px += (puntero.x + 0.5 - px) * k; py += (puntero.y + 0.5 - py) * k; }
          if (calla) return;
          var d = Math.min(window.devicePixelRatio || 1, 2);
          gl.uniform1f(u.uT, t); gl.uniform1f(u.uPaso, V.paso * d); gl.uniform1f(u.uTamano, V.tamano * d); gl.uniform1f(u.uAlcance, V.alcance); gl.uniform1f(u.uCrece, V.crece); gl.uniform1f(u.uOla, V.ola); gl.uniform1f(u.uCerca, cerca); gl.uniform2f(u.uPuntero, px, py);
          S.dibuja();
        }
      };
    }
  });
})();
