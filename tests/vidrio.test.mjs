// The glass (tokens/core/glass.json): what each thickness promises about the text on it, whatever is behind.
// The worst thing behind a glass is the opposite of its surface: white under the dark theme, black under the light one.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync('dist/css/alma.css', 'utf8');
const bloque = (tema) => { const i = css.indexOf(tema === 'dark' ? ':root, [data-theme="dark"] {' : `[data-theme="${tema}"] {`); return css.slice(i, css.indexOf('\n}', i)); };
const valor = (b, n) => { let v = new RegExp(`--${n}:\\s*([^;]+);`).exec(b)[1].trim(); const m = /^var\(--([\w-]+)\)$/.exec(v); return m ? valor(b, m[1]) : v; };
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const lum = (c) => { const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contraste = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const num = (n) => Number(new RegExp(`--${n}:\\s*([\\d.]+)`).exec(css)[1]);
const PROMESA = { 'glass-thin': ['text-01'], 'glass-regular': ['text-01', 'text-02'], 'glass-thick': ['text-01', 'text-02', 'text-03'] };

test('cada grosor del vidrio asegura 4,5:1 para sus textos sobre el peor fondo posible, en los temas con transparencia', () => {
  for (const tema of ['dark', 'light']) {
    const b = bloque(tema), sup = rgb(valor(b, 'ui-01')), peor = lum(sup) < 0.5 ? [255, 255, 255] : [0, 0, 0];
    for (const [vidrio, textos] of Object.entries(PROMESA)) {
      const a = num(vidrio), mezcla = sup.map((v, i) => v * a + peor[i] * (1 - a));
      for (const t of textos) { const c = contraste(rgb(valor(b, t)), mezcla); assert.ok(c >= 4.5, `${tema} · ${t} sobre ${vidrio}: ${c.toFixed(2)}:1`); }
    }
  }
});

test('los grosores van de menos a más, y el más delgado no promete nada', () => {
  const v = ['glass-ultra-thin', 'glass-thin', 'glass-regular', 'glass-thick'].map(num);
  for (let i = 1; i < v.length; i++) assert.ok(v[i] > v[i - 1]);
  assert.ok(v[3] < 1, 'el grueso sigue dejando pasar algo');
});

test('con alto contraste, con menos transparencia o sin desenfoque, el vidrio es una superficie opaca', () => {
  const hoja = readFileSync('artifact/project/components/bundle.css', 'utf8');
  assert.match(hoja, /\[data-theme\$="-hc"\] \.alma-glass/);
  assert.match(hoja, /prefers-reduced-transparency: reduce/);
  assert.match(hoja, /@supports not \(\(backdrop-filter/);
});

test('lo que flota es de vidrio sobre su propio color, con el grosor de su nivel, y también se vuelve opaco', () => {
  const hoja = readFileSync('artifact/project/components/bundle.css', 'utf8');
  for (const [pieza, grosor] of [['menu', 'regular'], ['popover, .alma-cal', 'regular'], ['toolbar', 'regular'], ['tabbar', 'regular'], ['modal', 'thick'], ['alert, .alma-asheet', 'thick']])
    assert.ok(hoja.includes(`.alma-${pieza} { --alma-surface: var(--`) && new RegExp(`\\.alma-${pieza.replace(/[.,]/g, '\\$&')} \\{[^}]*--alma-glass-k: var\\(--glass-${grosor}\\)`).test(hoja), pieza);
  assert.match(hoja, /\[data-theme\$="-hc"\] :is\(\.alma-menu, [^)]*\) \{ background: var\(--alma-surface\)/);
  // the surfaces a glass is mixed from are the ones whose text was measured: ui-01 in every case
  const css = readFileSync('dist/css/alma.css', 'utf8');
  for (const t of ['menu-bg', 'popover-bg', 'toolbar-bg', 'tab-bar-bg', 'modal-bg', 'alert-bg']) assert.match(css, new RegExp(`--${t}: var\\(--ui-0[12]\\)`), t);
});
