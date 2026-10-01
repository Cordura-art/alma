// Tests for the example pages (ejemplos/): they are built only with ALMA tokens and components, and they build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test('Ensayo Café no trae colores propios: todo color es un token de ALMA', () => {
  for (const f of ['pagina.css', 'pagina.js']) {
    const src = readFileSync(`ejemplos/ensayo-cafe/${f}`, 'utf8');
    assert.equal(src.match(/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/), null, `${f} trae un color en crudo`);
  }
});

test('Ensayo Café se arma con los valores de la Entidad Ensayo', () => {
  const out = join(mkdtempSync(join(tmpdir(), 'alma-ejemplo-')), 'ensayo-cafe.html');
  execFileSync('node', ['ejemplos/ensayo-cafe/build.mjs', out]);
  const html = readFileSync(out, 'utf8');
  assert.match(html, /^<title>Ensayo Café<\/title>/);
  assert.match(html, /--interactive-01:\s*#D5025D/i, 'el acento de la entidad');
  assert.match(html, /<template id="firma"><svg /, 'la firma generativa');
  assert.equal(html.match(/<\/style>/g).length, 1);
  assert.ok(html.length < 1024 * 1024, `${(html.length / 1024) | 0} KB`);
});
