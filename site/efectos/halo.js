// Halo: a ring of light that breathes, and the light it leaves behind. A background.
// How it works: the picture is not drawn anew each frame. Each frame reads the one before, a little grown from the
// centre and pushed aside by its own light, lets it fade, and adds a thin ring on top. So the ring leaves a wake that
// opens outward and curls. What is kept is not colour but how much of each of two lights there is at each point; the
// colours are put in at the end, so the same wake reads on a dark page and on a light one.
(function () {
  var PUNTAS = 'attribute vec2 p; varying vec2 vUv; void main() { vUv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }';
  var ESTELA = [
    'precision highp float;',
    'varying vec2 vUv; uniform sampler2D uAntes; uniform vec2 uTam, uCentro; uniform float uT, uTamano, uPulso, uQueda, uResta, uPetalos, uGiro;',
    'void main() {',
    '  float ancho = uTam.x / uTam.y;',
    '  vec2 c = vec2(0.5) + uCentro, d = vUv - c, q = d * vec2(ancho, 1.0);',
    '  float r = length(q), a = atan(q.x, q.y);',
    // what was there: grown from the centre and turned a little, and pushed aside by its own light
    '  vec2 e = texture2D(uAntes, vUv).rg;',
    '  float g = uGiro * (0.0025 + 0.0015 * cos(uT * 0.4)), s = sin(g), k = cos(g);',
    '  vec2 crece = c + vec2(d.x * k - d.y * s * (1.0 / ancho), d.x * s * ancho + d.y * k) * 0.9955;',
    '  vec2 empuja = vUv + (e.gr - 0.2) * vec2(0.009 / ancho, 0.009);',
    '  vec2 antes = texture2D(uAntes, crece).rg * 0.62 + texture2D(uAntes, empuja).rg * 0.38;',
    '  antes = max(antes - uResta, 0.0) * uQueda;',
    // the ring: thin, just inside its radius, with petals that rise and fall
    '  float radio = 0.2 * uTamano;',
    '  float onda = sin(a * uPetalos + uT * 0.5) * sin(uT * 1.5) * 0.055 * uPulso;',
    '  float x = r / radio + onda;',
    '  float anillo = smoothstep(1.0, 0.9, x) * pow(min(x, 1.0), 18.0);',
    // which of the two lights: it goes round the ring and changes with time
    '  float cual = 0.5 + 0.5 * sin(a + uT * 0.35 + 1.2 * sin(uT * 0.21));',
    '  gl_FragColor = vec4(min(antes + anillo * vec2(cual, 1.0 - cual), 1.0), 0.0, 1.0);',
    '}'
  ].join('\n');
  var MUESTRA = [
    'precision highp float;',
    'varying vec2 vUv; uniform sampler2D uAhora; uniform vec3 uFondo, uUno, uDos;',
    'void main() {',
    '  vec2 e = texture2D(uAhora, vUv).rg;',
    '  vec3 col = mix(uFondo, uUno, smoothstep(0.0, 0.9, e.r));',
    '  col = mix(col, uDos, smoothstep(0.05, 1.0, e.g) * 0.9);',
    // (a grain finer than the eye, so that slow fades do not show steps)
    '  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');
  window.AlmaEfectos.pon({
    id: 'halo', familia: 'fondo', nombre: 'Halo',
    colores: { fondo: 'ui-02', uno: 'interactive-01', dos: 'text-01' },
    ajustes: [
      { id: 'tamano', nombre: 'Tamaño', min: 0.4, max: 2.4, paso: 0.05, valor: 1.2 },
      { id: 'pulso', nombre: 'Pulso', min: 0, max: 4, paso: 0.1, valor: 2 },
      { id: 'petalos', nombre: 'Pétalos', min: 0, max: 12, paso: 1, valor: 7 },
      { id: 'estela', nombre: 'Estela', min: 0, max: 1, paso: 0.02, valor: 0.8 },
      { id: 'giro', nombre: 'Giro', min: -3, max: 3, paso: 0.1, valor: 1 },
      { id: 'velocidad', nombre: 'Velocidad', min: 0.1, max: 2.5, paso: 0.1, valor: 1 },
      { id: 'x', nombre: 'Centro, a lo ancho', min: -0.5, max: 0.5, paso: 0.02, valor: 0 },
      { id: 'y', nombre: 'Centro, a lo alto', min: -0.5, max: 0.5, paso: 0.02, valor: 0 }
    ],
    crea: function (lienzo, V) {
      // The wake is kept in fine numbers where the machine can (so a faint light goes on fading instead of sticking);
      // where it cannot, in bytes, and then it fades a little sooner.
      var o = { alpha: false, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: true }, gl = lienzo.getContext('webgl2', o), fino = !!gl && !!(gl.getExtension('EXT_color_buffer_half_float') || gl.getExtension('EXT_color_buffer_float'));
      if (!gl) gl = lienzo.getContext('webgl', o);
      if (!gl) return null;
      function programa(fs) {
        var p = gl.createProgram();
        [[gl.VERTEX_SHADER, PUNTAS], [gl.FRAGMENT_SHADER, fs]].forEach(function (x) { var s = gl.createShader(x[0]); gl.shaderSource(s, x[1]); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); gl.attachShader(p, s); });
        gl.bindAttribLocation(p, 0, 'p'); gl.linkProgram(p); var u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
        for (var i = 0; i < n; i++) { var nombre = gl.getActiveUniform(p, i).name; u[nombre] = gl.getUniformLocation(p, nombre); }
        return { p: p, u: u };
      }
      var E = programa(ESTELA), M = programa(MUESTRA), hojas = [], w = 0, h = 0, t = 0, cx = 0, cy = 0, C = { fondo: [0, 0, 0], uno: [0, 0, 0], dos: [0, 0, 0] };
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      function hoja() {
        var tx = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tx); gl.texImage2D(gl.TEXTURE_2D, 0, fino ? gl.RGBA16F : gl.RGBA, w, h, 0, gl.RGBA, fino ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        var fb = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fb); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tx, 0);
        gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
        return { tx: tx, fb: fb };
      }
      return {
        // (the wake is kept at half the points of the screen: it is soft, and it costs a quarter)
        medida: function (ancho, alto) {
          var d = Math.min(window.devicePixelRatio || 1, 2) * 0.5, nw = Math.max(2, Math.round(ancho * d)), nh = Math.max(2, Math.round(alto * d));
          if (nw === w && nh === h) return; w = nw; h = nh; lienzo.width = w; lienzo.height = h;
          hojas.forEach(function (x) { gl.deleteTexture(x.tx); gl.deleteFramebuffer(x.fb); }); hojas = [hoja(), hoja()];
        },
        color: function (k, v) { C[k] = v; },
        cuadro: function (dt, ahora, puntero, calla) {
          if (!hojas.length) return;
          t += dt * V.velocidad;
          // the centre leans toward the pointer, without hurry
          var hx = V.x + (puntero.dentro ? puntero.x * 0.15 : 0), hy = V.y + (puntero.dentro ? puntero.y * 0.15 : 0), cede = 1 - Math.exp(-dt * 3);
          cx += (hx - cx) * cede; cy += (hy - cy) * cede;
          gl.viewport(0, 0, w, h);
          gl.useProgram(E.p); gl.bindFramebuffer(gl.FRAMEBUFFER, hojas[1].fb); gl.bindTexture(gl.TEXTURE_2D, hojas[0].tx);
          gl.uniform2f(E.u.uTam, w, h); gl.uniform2f(E.u.uCentro, cx, cy); gl.uniform1f(E.u.uT, t); gl.uniform1f(E.u.uTamano, V.tamano); gl.uniform1f(E.u.uPulso, V.pulso);
          gl.uniform1f(E.u.uPetalos, V.petalos); gl.uniform1f(E.u.uGiro, V.giro); gl.uniform1f(E.u.uQueda, 0.96 + 0.0395 * V.estela); gl.uniform1f(E.u.uResta, fino ? 0.0004 : 0.0042);
          gl.drawArrays(gl.TRIANGLES, 0, 3); hojas.reverse();
          if (calla) return;
          gl.useProgram(M.p); gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.bindTexture(gl.TEXTURE_2D, hojas[0].tx);
          gl.uniform3fv(M.u.uFondo, C.fondo); gl.uniform3fv(M.u.uUno, C.uno); gl.uniform3fv(M.u.uDos, C.dos);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        },
        quita: function () { var x = gl.getExtension('WEBGL_lose_context'); if (x) x.loseContext(); }
      };
    }
  });
})();
