// Tests for an entity's documentation (scripts/lib/documentacion.mjs, entidades/documentacion/<id>/): the entity's
// token values, their contrast in the four themes, and a site that builds with every sentence checked.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { sistema, aplicar, css, valor, THEMES } from '../scripts/lib/documentacion.mjs';

const tokens = () => JSON.parse(readFileSync('dist/json/tokens.json', 'utf8'));
const lum = (hex) => { const f = (i) => { const c = parseInt(hex.substr(i, 2), 16) / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(1) + 0.7152 * f(3) + 0.0722 * f(5); };
const contraste = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

test('la Entidad IBM cambia valores de tokens, nunca nombres', async () => {
  const S = await sistema('ibm'), tok = tokens(), names = new Set(tok.color.tokens.map((t) => t.name));
  for (const th of THEMES) for (const n of Object.keys(S.color[th])) assert.ok(names.has(n), `${n} no es un token de ALMA`);
  for (const [fam, vals] of Object.entries(S.core)) for (const n of Object.keys(vals)) assert.ok(tok[fam].tokens.some((t) => t.name === n), `${fam}: ${n}`);
  const cambios = aplicar(tok, S);
  assert.ok(cambios.length > 30, String(cambios.length));
  assert.equal(valor(tok, 'interactive-01'), '#1D62FF');
  assert.equal(valor(tok, 'button-filled-bg'), '#1D62FF', 'los alias siguen al acento');
  assert.equal(valor(tok, 'progress-line-loading'), '#1D62FF', 'el color de marca sigue al acento');
  assert.equal(valor(tok, 'font-width'), '100');
  assert.equal(valor(tok, 'radius-button'), '0 px');
  assert.equal(valor(tok, 'radius-pill'), '100 px', 'las formas siempre redondas no cambian');
  assert.equal(valor(tok, 'duration-moderate-01'), '188 ms', '150 ms × 1,25');
  assert.equal(tok.type.groups[0].styles.find((s) => s.name === 'web-h1').fontWeight, 400);
  assert.equal(valor(tok, 'viz-cat-01'), tokens().color.tokens.find((t) => t.name === 'viz-cat-01').value.dark, 'los gráficos son los de ALMA');
});

test('cada tema declara los mismos tokens, para que el oscuro no se filtre en los demás', async () => {
  const S = await sistema('ibm'), keys = (th) => Object.keys(S.color[th]).sort().join();
  for (const th of THEMES) assert.equal(keys(th), keys('dark'), th);
  const hoja = css(S);
  assert.match(hoja, /\[data-theme="light"\] \{[^}]*--button-tinted-text: #141733;/);
  assert.doesNotMatch(hoja, /E1F564/i, 'no queda lima en los valores de la entidad');
});

test('el acento de la Entidad IBM pasa el contraste en los cuatro temas', async () => {
  const S = await sistema('ibm'), tok = tokens();
  aplicar(tok, S);
  for (const th of THEMES) {
    const v = (n) => valor(tok, n, th);
    assert.ok(contraste(v('text-on-interactive'), v('interactive-01')) >= 4.5, `${th}: texto sobre el acento`);
    assert.ok(contraste(v('button-filled-text'), v('button-filled-bg-hover')) >= 4.5, `${th}: texto sobre el acento, encima`);
    assert.ok(contraste(v('button-filled-text-active'), v('active-primary')) >= 4.5, `${th}: texto sobre el acento, presionado`);
    for (const fondo of ['ui-02', 'ui-01']) {
      assert.ok(contraste(v('link-01'), v(fondo)) >= 4.5, `${th}: enlace sobre ${fondo}`);
      assert.ok(contraste(v('nav-selected'), v(fondo)) >= 4.5, `${th}: destino actual sobre ${fondo}`);
      assert.ok(contraste(v('control-on'), v(fondo)) >= 3, `${th}: control encendido sobre ${fondo}`);
      assert.ok(contraste(v('field-border'), v(fondo)) >= 3, `${th}: borde de campo sobre ${fondo}`);
    }
  }
});

for (const id of readdirSync('entidades/documentacion')) {
  test(`${id}: el sitio se construye, con cada reemplazo vigente y sin frases del aspecto de Cordura`, () => {
    const out = join(mkdtempSync(join(tmpdir(), 'alma-doc-')), 'index.html');
    execFileSync(process.execPath, ['scripts/build-site.mjs', '--entidad', id, out], { stdio: 'pipe' });
    const html = readFileSync(out, 'utf8');
    assert.match(html, /<title>Documentación [^<]+<\/title>/);
    assert.doesNotMatch(html, /\{token:[a-z0-9-]+/, 'queda un valor sin resolver');
    assert.ok(readFileSync(join(out, '..', `entidad-${id}.css`), 'utf8').includes('--interactive-01'));
  });
}
