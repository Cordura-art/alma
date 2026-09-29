// The tokens.json built from tokens/ must equal the one the ALMA artifact serves.
// If they differ, run `npm run build` and copy dist/json/tokens.json to artifact/project/.
import { readFile } from 'node:fs/promises';
import { isDeepStrictEqual } from 'node:util';

const built = JSON.parse(await readFile('dist/json/tokens.json', 'utf8'));
const served = JSON.parse(await readFile('artifact/project/tokens.json', 'utf8'));
if (isDeepStrictEqual(built, served)) { console.log('Ida y vuelta: dist/json/tokens.json = artifact/project/tokens.json'); process.exit(0); }
const diffs = [];
(function walk(a, b, p) {
  if (diffs.length > 20) return;
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) { diffs.push(`${p}: ${JSON.stringify(b)} → ${JSON.stringify(a)}`); return; }
  if (a && typeof a === 'object') { for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) walk(a[k], b[k], `${p}.${k}`); return; }
  if (a !== b) diffs.push(`${p}: ${JSON.stringify(b)} → ${JSON.stringify(a)}`);
})(built, served, 'tokens');
console.error('Ida y vuelta: diferencias\n' + diffs.join('\n'));
process.exit(1);
