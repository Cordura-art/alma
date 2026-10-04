// Writes the twelve sheets of an entity as files for a pen plotter: build/laminas-<id>/<nn>-<lámina>.svg, in
// millimeters, with one layer per pen and the strokes sorted so the pen travels little (entidades/laminas.mjs).
// With --vpype each file is then passed through vpype (https://github.com/abey79/vpype), the real tool: it merges,
// simplifies and sorts the strokes again, with more care, and writes the file over. It is looked for in $VPYPE, in the
// PATH and in ~/.local/share/vpype-venv (where `python3 -m venv ~/.local/share/vpype-venv` and
// `~/.local/share/vpype-venv/bin/pip install vpype` leave it).
// Usage: npm run laminas -- <id> [--hoja A3] [--una-pluma] [--avance 6] [--vpype]      (run after `npm run build`)
import { mkdirSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { sistema } from './lib/documentacion.mjs';
import { genesDe } from './lib/generativo.mjs';
import { LAMINAS, HOJAS, lamina, laminaSvg } from '../entidades/laminas.mjs';

const args = process.argv.slice(2), valor = (f, d) => { const i = args.indexOf(f); if (i < 0) return d; const v = args[i + 1]; args.splice(i, 2); return v; };
const hoja = valor('--hoja', 'A4'), avance = Number(valor('--avance', 6)), unaPluma = args.includes('--una-pluma') ? args.splice(args.indexOf('--una-pluma'), 1).length > 0 : false, conVpype = args.includes('--vpype') ? args.splice(args.indexOf('--vpype'), 1).length > 0 : false, id = args[0];
const ids = readdirSync('entidades/lenguajes').filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
if (!id || !ids.includes(id) || !HOJAS[hoja] || !Number.isFinite(avance)) {
  console.error(`Uso: npm run laminas -- <id> [--hoja ${Object.keys(HOJAS).join('|')}] [--una-pluma] [--avance filas] [--vpype]\nEntidades: ${ids.join(', ')}`);
  process.exit(1);
}
// vpype, if it is asked for: where it is, and that it answers.
let vpype = '';
if (conVpype) {
  const candidatos = [process.env.VPYPE, 'vpype', join(homedir(), '.local/share/vpype-venv/bin/vpype')].filter(Boolean);
  for (const c of candidatos) { try { if (c.includes('/') && !existsSync(c)) continue; execFileSync(c, ['--version'], { stdio: 'pipe' }); vpype = c; break; } catch (e) { /* not this one */ } }
  if (!vpype) { console.error('No encuentro vpype. Para instalarlo aparte del Python del sistema:\n  python3 -m venv ~/.local/share/vpype-venv\n  ~/.local/share/vpype-venv/bin/pip install vpype\nO indica dónde está con la variable VPYPE.'); process.exit(1); }
}
// vpype counts in pixels of 1/96 inch: its totals, in millimeters.
const totales = (texto) => { const t = texto.slice(texto.lastIndexOf('Totals')), n = (k) => Number((new RegExp(`${k}: ([\\d.]+)`).exec(t) || [0, 0])[1]); return { tinta: n('  Length') * 25.4 / 96, aire: n('Pen-up length') * 25.4 / 96, trazos: n('Path count') }; };
const S = await sistema(id), G = genesDe(S), nombres = S.L.ilustracion.generativa ? S.L.ilustracion.generativa.nombres : undefined, dir = `build/laminas-${id}`;
mkdirSync(dir, { recursive: true });
const m = (mm) => (mm / 1000).toFixed(1).replace('.', ',');
console.log(`Láminas de la Entidad ${S.L.nombre} · hoja ${hoja}${unaPluma ? ' · una sola pluma' : ''}${vpype ? ' · repasadas con ' + execFileSync(vpype, ['--version'], { encoding: 'utf8' }).trim() : ''}\n`);
let tinta = 0, minutos = 0;
LAMINAS.forEach((l, i) => {
  const L = lamina(G, l.id, { hoja, unaPluma, avance, nombres }), antes = lamina(G, l.id, { hoja, unaPluma, avance, nombres, preparar: false }).cuenta, c = L.cuenta, file = `${dir}/${String(i + 1).padStart(2, '0')}-${l.id}.svg`;
  writeFileSync(file, laminaSvg(L) + '\n');
  if (vpype) {
    const v = totales(execFileSync(vpype, ['read', file, 'linemerge', '--tolerance', '0.3mm', 'linesimplify', '--tolerance', '0.05mm', 'reloop', 'linesort', 'stat', 'write', file], { encoding: 'utf8' }));
    c.trazos = v.trazos; c.tinta = v.tinta; c.aire = v.aire; c.minutos = v.tinta / 40 / 60 + v.aire / 120 / 60;
  }
  tinta += c.tinta; minutos += c.minutos;
  console.log(`  ${file.padEnd(40)} ${String(c.trazos).padStart(4)} trazos · ${m(c.tinta).padStart(4)} m de tinta · ${m(c.aire)} m en el aire (sin preparar: ${m(antes.aire)}) · ${L.capas.length} ${L.capas.length === 1 ? 'pluma' : 'plumas'} · ${L.hoja[0] > L.hoja[1] ? 'apaisada' : 'vertical'} · unos ${Math.max(1, Math.round(c.minutos))} min`);
});
console.log(`\n${LAMINAS.length} láminas en ${dir}/ · ${m(tinta)} m de tinta en total · unos ${Math.round(minutos)} min de plotter (estimado, a 40 mm/s).`);
