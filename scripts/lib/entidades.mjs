// Shared pieces for the entity pages: the token data the Entidades engine needs, the alias rebinding CSS, the chart
// engine as a browser script, and a loader that runs the engine (site/entidades.js) in Node for scripts and tests.
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(p, 'utf8');

// Token data for the engine: color ramps, brand colors, and ALMA's base axes, weights, radii and accent.
export function datos() {
  const tok = JSON.parse(read('dist/json/tokens.json'));
  const col = (n) => { const t = tok.color.tokens.find((x) => x.name === n); return t && (typeof t.value === 'string' ? t.value : t.value.dark); };
  const colT = (n, th) => { const t = tok.color.tokens.find((x) => x.name === n); return t && (typeof t.value === 'string' ? t.value : t.value[th]); };
  const ramps = {};
  for (const r of ['red', 'yellow', 'magenta', 'purple', 'blue', 'cyan', 'teal', 'green', 'coolgray']) { ramps[r] = {}; for (const s of [100, 200, 300, 400, 500, 600, 700, 800]) ramps[r][s] = col(`${r}-${s}`); }
  const brand = Object.fromEntries(['brand-lime', 'brand-ink', 'brand-black', 'brand-white', 'brand-steel', 'secondary-500', 'secondary-600', 'secondary-700'].map((n) => [n, col(n)]));
  const fam = (f) => Object.fromEntries(tok[f].tokens.map((t) => [t.name, t.value]));
  const fw = fam('fontWeight');
  const base = {
    fontAxis: fam('fontAxis'), radius: fam('radius'),
    weights: { display: fw['font-weight-display'], heading: fw['font-weight-heading'], body: fw['font-weight-body'], emphasis: fw['font-weight-emphasis'] },
    extra: Object.fromEntries(['dark', 'light'].map((th) => [th, Object.fromEntries(['field-border', 'field-border-hover', 'field-label', 'button-tinted-text', 'button-tinted-bg', 'button-tinted-bg-hover', 'button-plain-text', 'control-on'].map((n) => [n, colT(n, th)]).concat(['button-gray-text', 'field-label-float-text', 'product-card-text', 'button-inverse-text', 'button-ghost-text-active'].map((n) => [n, 'var(--text-on-interactive)'])))])),
    accent: { interactive: col('interactive-01'), hover: col('hover-primary'), navDark: colT('nav-selected', 'dark'), navLight: colT('nav-selected', 'light'), navLightHc: colT('nav-selected', 'light-hc'), linkDark: colT('link-01', 'dark'), linkLight: colT('link-01', 'light'), linkLightHc: colT('link-01', 'light-hc'), linkDarkHc: colT('link-01', 'dark-hc'), ui01Dark: colT('ui-01', 'dark'), ui01Light: colT('ui-01', 'light') }
  };
  return { ramps, brand, base };
}

// Aliases that point at the accent tokens are resolved where they are declared (:root), so re-declare them on the entity scope.
export function rebind(alma) {
  const ACC = /var\(--(interactive-01|hover-primary|active-primary|brand-lime|text-on-interactive|nav-selected|link-01|field-border|field-border-hover|field-label|button-tinted-text|button-tinted-bg|button-tinted-bg-hover|button-plain-text|control-on)\)/;
  let css = '';
  for (const [, sel, body] of alma.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const th = /data-theme="([a-z-]+)"/.exec(sel); const theme = th ? th[1] : (/:root/.test(sel) ? 'dark' : null);
    if (!theme || !['dark', 'light'].includes(theme)) continue;
    const decl = body.split(';').map((d) => d.trim()).filter((d) => d.startsWith('--') && ACC.test(d));
    if (decl.length) css += `.ent-scope[data-theme="${theme}"] { ${decl.join('; ')}; }\n`;
  }
  return css;
}

// The chart engine from entidades/*.mjs as one browser script: one engine, no copy. Exposes window.__CARTA.
export function motor() {
  const strip = (f) => read(`entidades/${f}`).replace(/^import .*$/gm, '').replace(/^export /gm, '');
  return `(function () { const Astro = window.Astronomy;
${strip('tabla.mjs')}
${strip('carta.mjs')}
${strip('arquetipos.mjs')}
${strip('voz.mjs')}
window.__CARTA = { calcularCarta, puertaDe, CENTROS, CANALES, CENTRO_DE, CUERPOS, generarVoz, generarPrincipios, PUERTAS, CANAL_NOMBRE, VOZ_GARGANTA };
})();`;
}

// Runs site/entidades.js in Node with stub globals and returns its engine (params, palette, withCarta, exportJson…).
export async function cargarMotor() {
  const C = await import('../../entidades/carta.mjs'), V = await import('../../entidades/voz.mjs');
  const T = await import('../../entidades/tabla.mjs'), Ar = await import('../../entidades/arquetipos.mjs');
  // The engine reads these globals lazily, so they stay in place after loading.
  const g = globalThis;
  g.window = { __DATA: datos(), __ENGINE_ONLY: true, AlmaDS: {}, matchMedia: () => ({ matches: false }), __CARTA: { ...C, ...V, ...T, ...Ar } };
  g.React = { createElement() {}, useState() {}, useEffect() {}, useRef() {}, useMemo() {} };
  g.ReactDOM = {}; g.document = { documentElement: { getAttribute() {}, setAttribute() {}, style: {} } };
  new Function(read('site/entidades.js'))();
  return g.window.__ENGINE;
}

// OKLab distance between two #RRGGBB colors; under 0.02 the eye does not tell them apart.
export function deltaE(a, b) {
  const lab = (hex) => {
    const f = (c) => { c = parseInt(c, 16) / 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    const [r, g, bl] = [1, 3, 5].map((i) => f(hex.substr(i, 2)));
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * bl), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * bl), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * bl);
    return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s];
  };
  const x = lab(a), y = lab(b);
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
}
