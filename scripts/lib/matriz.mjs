// The colour matrix as a rule (tokens/matriz.json): three ramps and a slot for every token. A system gives its brand
// colour and its action colour; the ramps and every slot come from there. Written to run in Node and, with its
// `export` taken away, inside the comparison page (npm run matriz).
// ---------- colour: sRGB ↔ OKLCH, contrast, difference
function lin(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function gam(c) { c = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; return Math.round(Math.max(0, Math.min(1, c)) * 255); }
function rgb(hex) { return [1, 3, 5].map(function (i) { return parseInt(hex.slice(i, i + 2), 16); }); }
function lab(hex) { var c = rgb(hex).map(lin), l = Math.cbrt(0.4122214708 * c[0] + 0.5363325363 * c[1] + 0.0514459929 * c[2]), m = Math.cbrt(0.2119034982 * c[0] + 0.6806995451 * c[1] + 0.1073969566 * c[2]), s = Math.cbrt(0.0883024619 * c[0] + 0.2817188376 * c[1] + 0.6299787005 * c[2]);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; }
function lch(hex) { var a = lab(hex); return [a[0], Math.hypot(a[1], a[2]), Math.atan2(a[2], a[1])]; }
function toRgb(L, C, h) { var a = C * Math.cos(h), b = C * Math.sin(h), l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3), m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3), s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s]; }
function hexOf(L, C, h) { var c = C, r; for (var i = 0; i < 40; i++) { r = toRgb(L, c, h); if (r.every(function (v) { return v >= -0.0005 && v <= 1.0005; })) break; c *= 0.94; }
  return '#' + r.map(function (v) { return ('0' + gam(v).toString(16)).slice(-2); }).join('').toUpperCase(); }
function lum(hex) { var c = rgb(hex).map(lin); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
function con(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
function dif(a, b) { var p = lab(a), q = lab(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) * 100; }
// ---------- the ramps
var PASOS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900], NEUTRO = PASOS.concat([950, 1000]);
// A ramp anchored at 500: the colour itself there, towards white above it and towards the dark below.
function rampa(ancla) { var a = lch(ancla), o = {}, sube = { 50: 0.93, 100: 0.85, 200: 0.68, 300: 0.46, 400: 0.23 }, baja = { 600: 0.2, 700: 0.4, 800: 0.6, 900: 0.78 };
  PASOS.forEach(function (s) { if (s === 500) o[s] = ancla.toUpperCase(); else if (s < 500) o[s] = hexOf(a[0] + (0.985 - a[0]) * sube[s], a[1] * (1 - sube[s] * 0.92), a[2]); else o[s] = hexOf(a[0] - (a[0] - 0.17) * baja[s], a[1] * (1 - baja[s] * 0.45), a[2]); });
  return o; }
// The neutral: every lightness from paper to night, tinted with the hue of the action as much as `tinte` says.
var LUZ = { 50: 0.985, 100: 0.965, 200: 0.925, 300: 0.87, 400: 0.78, 500: 0.66, 600: 0.54, 700: 0.44, 800: 0.36, 900: 0.26, 950: 0.19, 1000: 0.155 }, CROMA = { 50: 0.25, 100: 0.35, 200: 0.5, 300: 0.65, 400: 0.8, 500: 1, 600: 1, 700: 1, 800: 0.95, 900: 0.9, 950: 0.8, 1000: 0.7 };
function neutro(accion, tinte) { var h = lch(accion)[2], o = {}; NEUTRO.forEach(function (s) { o[s] = hexOf(LUZ[s], 0.045 * tinte * CROMA[s], h); }); return o; }
// What every slot holds for one system and one theme. `sistema`: { marca, accion }; `regla`: tokens/matriz.json.
function matriz(sistema, tema, regla, tinte) {
  var P = rampa(sistema.marca), T = rampa(sistema.accion), S = neutro(sistema.accion, tinte == null ? regla.tinte : tinte), i = tema === 'light' ? 0 : 1, m = {};
  function de(c) { return c === 'W' ? '#FFFFFF' : c === 'K' ? '#000000' : ({ P: P, S: S, T: T })[c[0]][c.slice(1)]; }
  Object.keys(regla.casilleros).forEach(function (n) { m[n] = de(regla.casilleros[n][i]); });
  // the text of the main button: white if it reads, the darkest neutral if it does not
  m['text-on-interactive'] = con('#FFFFFF', m['interactive-01']) >= 4.5 ? '#FFFFFF' : S[1000];
  return { m: m, P: P, S: S, T: T };
}
export { lch, hexOf, con, dif, rampa, neutro, matriz, PASOS, NEUTRO };
