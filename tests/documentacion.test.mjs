// Tests for an entity's documentation (scripts/lib/documentacion.mjs, entidades/documentacion/plantilla/): the entity's
// token values, their contrast in the four themes, and a site that builds with every sentence checked.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { sistema, aplicar, css, valor, rasgos, plantilla, THEMES } from '../scripts/lib/documentacion.mjs';

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
  assert.equal(valor(tok, 'viz-cat-01', 'light'), valor(tok, 'purple-700'), 'los gráficos siguen la secuencia de IBM sobre las rampas de ALMA');
  assert.equal(valor(tok, 'viz-seq-3', 'light'), '#1D62FF', 'la rampa de un solo tono es la de la marca');
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

test('tres colores en la Entidad IBM: marca, marca muy oscura y el color de acción', async () => {
  const S = await sistema('ibm'), tok = tokens();
  aplicar(tok, S);
  const v = (n, th) => valor(tok, n, th);
  // Primary: the same brand step in every theme. Secondary: the brand at its darkest. Tertiary: the action color, here the brand itself.
  for (const th of THEMES) assert.equal(v('button-filled-bg', th), '#1D62FF', th);
  // The secondary keeps the brand's hue, very dark and with little chroma, and is lighter on dark themes.
  for (const th of ['light', 'dark']) {
    const [l, c, h] = S.En.fromHex(v('button-gray-bg', th));
    assert.ok(Math.abs(h - S.P.palette[0].h) < 6, `${th}: tono ${h.toFixed(0)}`);
    assert.ok(c <= 0.075 && c > 0.02, `${th}: saturación ${c.toFixed(3)}`);
    assert.ok(l < 0.42, `${th}: luminosidad ${l.toFixed(2)}`);
  }
  assert.ok(S.En.fromHex(v('button-gray-bg', 'dark'))[0] > S.En.fromHex(v('button-gray-bg', 'light'))[0]);
  assert.equal(v('button-tertiary-border', 'light'), '#1D62FF');
  assert.equal(v('button-tertiary-border', 'dark'), v('link-01'), 'en oscuro, el contorno es el color de los enlaces');
  assert.equal(v('focus', 'light'), '#1D62FF');
  assert.deepEqual(S.P.accent.action, S.P.palette[0].ramp, 'una marca azul es su propio color de acción');
});

test('el color de acción de una marca que no es azul queda en la zona del azul, con su saturación', async () => {
  const S = await sistema('cordura'), [, c, h] = S.En.fromHex(S.P.accent.action[500]);
  assert.ok(h >= 255 && h <= 270, `tono ${h.toFixed(0)}: un azul clásico de enlace`);
  assert.ok(c > 0.1, `saturación ${c.toFixed(2)}`);
  assert.equal(S.P.accent.dark['interactive-01'], '#E1F564', 'la marca no cambia');
  assert.equal(S.P.accent.dark['link-01'], S.P.accent.action[400]);
});

for (const id of readdirSync('entidades/lenguajes').map((f) => f.replace(/\.json$/, ''))) {
  test(`${id}: el secundario, el terciario, el foco y los gráficos pasan el contraste en los cuatro temas`, async () => {
    const S = await sistema(id), tok = tokens();
    aplicar(tok, S);
    const v = (n, th) => valor(tok, n, th);
    for (const th of THEMES) {
      for (const [texto, fondo] of [['button-gray-text', 'button-gray-bg'], ['button-gray-text', 'button-gray-bg-hover'], ['button-gray-text-active', 'button-gray-bg-active'],
        ['button-destructive-gray-text', 'button-gray-bg'], ['button-destructive-gray-text', 'button-destructive-gray-bg-hover'], ['button-destructive-text-pressed', 'button-gray-bg-active'],
        ['button-tertiary-text', 'ui-02'], ['button-tertiary-text', 'ui-01'], ['button-tertiary-text-hover', 'button-tertiary-bg-hover'], ['button-tertiary-text-active', 'button-tertiary-bg-active'],
        ['button-inverse-text', 'button-inverse-bg'], ['button-inverse-text', 'button-inverse-bg-hover'], ['button-inverse-text-active', 'button-inverse-bg-active'],
        ['button-ghost-text', 'button-ghost-bg-hover'], ['button-ghost-text-active', 'button-ghost-bg-active'], ['link-01', 'ui-02'], ['link-01', 'ui-01']]) {
        assert.ok(contraste(v(texto, th), v(fondo, th)) >= 4.5, `${th}: ${texto} sobre ${fondo} (${contraste(v(texto, th), v(fondo, th)).toFixed(1)})`);
      }
      for (const fondo of ['ui-02', 'ui-01']) assert.ok(contraste(v('focus', th), v(fondo, th)) >= 3, `${th}: foco sobre ${fondo}`);
      for (let n = 1; n <= 8; n++) assert.ok(contraste(v(`viz-cat-0${n}`, th), v('ui-01', th)) >= 3, `${th}: viz-cat-0${n} sobre ui-01`);
    }
  });
}

for (const id of readdirSync('entidades/lenguajes').map((f) => f.replace(/\.json$/, ''))) {
  test(`${id}: el sitio se construye solo con la plantilla, con cada reemplazo vigente y sin frases de un aspecto ajeno`, () => {
    const out = join(mkdtempSync(join(tmpdir(), 'alma-doc-')), 'index.html');
    execFileSync(process.execPath, ['scripts/build-site.mjs', '--entidad', id, out], { stdio: 'pipe' });
    const html = readFileSync(out, 'utf8');
    assert.match(html, /<title>Documentación [^<]+<\/title>/);
    assert.doesNotMatch(html, /\{token:[a-z0-9-]+/, 'queda un valor sin resolver');
    assert.doesNotMatch(html, /\{(?:si |sino\}|fin\}|[vVL]:|tabla:)/, 'queda una marca de plantilla sin resolver');
    assert.ok(readFileSync(join(out, '..', `entidad-${id}.css`), 'utf8').includes('--interactive-01'));
  });
}

test('la plantilla escribe lo que la carta decidió, y falla ante una marca que no conoce', async () => {
  const ibm = await sistema('ibm'), cordura = await sistema('cordura'), ti = tokens(), tc = tokens();
  aplicar(ti, ibm); aplicar(tc, cordura);
  const R = rasgos(ibm), C = rasgos(cordura);
  assert.deepEqual([R.si.profundo, R.si.recta, R.si.accionMarca, R.si.heredado], [true, true, true, false]);
  assert.deepEqual([C.si.profundo, C.si.suave, C.si.accionMarca, C.si.heredado, C.si.lima], [false, true, false, true, true]);
  const src = 'Texto {v:sobre} sobre {v:marca}.{si profundo} Profundo.{sino} Luminoso.{fin} {V:forma}: {token:radius-button}.';
  assert.equal(plantilla(src, ibm, ti), 'Texto blanco sobre un azul pleno. Profundo. Ángulos rectos: 0 px.');
  assert.equal(plantilla(src, cordura, tc), 'Texto tinta sobre el lima heredado. Luminoso. Esquinas suaves: 16 px.');
  // A line that only opens or closes a condition leaves no empty line behind.
  assert.equal(plantilla('a\n{si heredado}\nb\n{fin}\nc', ibm, ti), 'a\nc');
  assert.equal(plantilla('{L:grilla.forma:1}', ibm, ti), 'Nuestros ángulos son rectos.');
  assert.match(plantilla('{tabla:rampa}', ibm, ti), /\| `primary-600` \| `#1D62FF` \| `interactive-01` en los cuatro temas/);
  assert.throws(() => plantilla('{si inventada}x{fin}', ibm, ti), /Condición desconocida/);
  assert.throws(() => plantilla('{v:inventada}', ibm, ti), /Palabra desconocida/);
  assert.throws(() => plantilla('{L:no.existe}', ibm, ti), /le falta "no.existe"/);
});
