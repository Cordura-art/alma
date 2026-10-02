// What a system's content shares with ALMA's travels once: an entity stores only what differs (a delta), and the page
// rebuilds its content from ALMA's (site/app.js, `aplicarDelta`, the mirror of this function).
//   undefined            equal
//   { $v: value }        another value
//   { $o: {k: d}, $x, $k }  an object: the keys that differ, the keys it does not have and, if it changed, their order
//   { $a: {i: d}, $n }   an array: the items that differ, and its length
//   { $l: {i: line} }    a long text with the same number of lines: the lines that differ
const obj = (x) => x && typeof x === 'object' && !Array.isArray(x);
export function delta(a, b) {
  if (JSON.stringify(a) === JSON.stringify(b)) return undefined;
  if (obj(a) && obj(b)) {
    const o = {}, x = Object.keys(a).filter((k) => !(k in b));
    for (const k of Object.keys(b)) { const d = k in a ? delta(a[k], b[k]) : { $v: b[k] }; if (d !== undefined) o[k] = d; }
    const d = x.length ? { $o: o, $x: x } : { $o: o }, orden = Object.keys(b);
    if (Object.keys(aplicarDelta(a, d)).join('\n') !== orden.join('\n')) d.$k = orden;
    return d;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    const o = {};
    for (let i = 0; i < b.length; i++) { const d = i < a.length ? delta(a[i], b[i]) : { $v: b[i] }; if (d !== undefined) o[i] = d; }
    return { $a: o, $n: b.length };
  }
  if (typeof a === 'string' && typeof b === 'string' && b.length > 400) {
    const la = a.split('\n'), lb = b.split('\n');
    if (la.length === lb.length) { const o = {}; lb.forEach((l, i) => { if (l !== la[i]) o[i] = l; }); if (JSON.stringify(o).length < b.length * 0.8) return { $l: o }; }
  }
  return { $v: b };
}
// The same reading the page does, for the build to check that nothing is lost.
export function aplicarDelta(a, d) {
  if (d === undefined) return a;
  if ('$v' in d) return d.$v;
  if (d.$l) { const l = a.split('\n'); for (const i in d.$l) l[i] = d.$l[i]; return l.join('\n'); }
  if (d.$a) { const out = a.slice(0, d.$n); for (let i = 0; i < d.$n; i++) if (i in d.$a) out[i] = aplicarDelta(a[i], d.$a[i]); return out; }
  const out = {}, sin = d.$x || [];
  for (const k of Object.keys(a)) if (sin.indexOf(k) < 0) out[k] = a[k];
  for (const k of Object.keys(d.$o)) out[k] = aplicarDelta(a[k], d.$o[k]);
  if (d.$k) { const en = {}; for (const k of d.$k) en[k] = out[k]; return en; }
  return out;
}
