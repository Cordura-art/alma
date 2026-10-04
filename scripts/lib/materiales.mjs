// The material and coat tokens of ALMA (families `material` and `pelaje` in tokens/), grouped the way the programs
// that build a character want them: { arcilla: { aspereza, capa, luzInterior, … }, … } and
// { pelo: { largoMin, largoMax, caida, … }, … }. Numbers, not text.
import { readFileSync } from 'node:fs';

const camello = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
// The tokens of a family, by the thing they describe (the second word of their name) and its property (the rest).
export function agrupa(tok, familia) {
  const o = {};
  for (const t of tok[familia].tokens) { const [, cosa, ...resto] = t.name.split('-'); (o[cosa] ||= {})[camello(resto.join('-'))] = Number(t.value); }
  return o;
}
// What each thing is, in the system's own words: the part of its first token's usage that the other things' first
// tokens do not share (they all end by explaining the same property).
export function descripciones(tok, familia) {
  const primero = {}; for (const t of tok[familia].tokens) { const cosa = t.name.split('-')[1]; if (!(cosa in primero)) primero[cosa] = t.usage || ''; }
  const usos = Object.values(primero); let n = 0;
  while (usos.every((u) => u.length > n && u[u.length - 1 - n] === usos[0][usos[0].length - 1 - n])) n++;
  const punto = (t) => (/[.!?]$/.test(t) ? t : t + '.');
  return Object.fromEntries(Object.entries(primero).map(([k, u]) => [k, punto(u.slice(0, u.length - n).trim())]));
}
export function materialesDe(tok = JSON.parse(readFileSync('dist/json/tokens.json', 'utf8'))) {
  return { materiales: agrupa(tok, 'material'), pelaje: agrupa(tok, 'pelaje') };
}
