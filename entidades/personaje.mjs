// The body and the walk of an entity's character, worked out once from its genes, so that every program that builds
// it (Blender, Unity) builds the same one. No imports beyond the seed and no DOM.
import { hash, azar } from './semilla.mjs';

// The type gives the build: [how tall, how wide the trunk, how thick the limbs, how big the head].
export const CONTEXTURA = { 'generador manifestante': [1.0, 1.3, 1.0, 1.0], generador: [0.96, 1.2, 1.2, 1.05], manifestor: [1.04, 1.1, 1.25, 0.95], proyector: [1.06, 0.9, 0.88, 1.05], reflector: [1.0, 0.78, 0.76, 1.15] };
const dec = (v) => Math.round(v * 10000) / 10000, entre = (v, a, b) => Math.min(b, Math.max(a, v));

// Its measures. One unit is the height of a plain character. Within its type, each entity has its own: they come from
// its date of birth (its seed). `cadera` is how high the hips are (long or short legs); `panza` is how much each limb
// swells between its joints; an entity without roundness is made of blocks.
export function medidasDe(G) {
  const t = (G.tipo || '').toLowerCase(), base = (Object.entries(CONTEXTURA).find(([k]) => t.includes(k)) || [0, [1, 1, 1, 1]])[1];
  const R = azar(hash(G.semilla + '|forma')), red = G.redondez ?? 0.5;
  const m = { alto: base[0] * R.f(0.92, 1.08), ancho: base[1] * R.f(0.85, 1.3), miembro: base[2] * R.f(0.85, 1.35), cabeza: base[3] * R.f(0.8, 1.3), cadera: R.f(0.38, 0.52),
    panza: 0.25 + 1.1 * red, mano: R.f(0.9, 1.6), pie: R.f(1.0, 1.6), hombros: R.f(0.9, 1.35),
    // Each stretch of arm and leg has its own girth: one entity has heavy forearms, another thick thighs.
    brazo: R.f(0.8, 1.5), antebrazo: R.f(0.8, 1.8), muslo: R.f(0.85, 1.6), pierna: R.f(0.8, 1.8) };
  for (const k in m) m[k] = dec(m[k]);
  return { ...m, anguloso: red < 0.25 };
}

// Its walk. Angles in degrees.
//   peso      0–1. Wide, thick bodies are heavy, and a defined sacral center adds to it. Heavy: short slow steps, a
//             wide sway, arms that hardly swing. Light: long quick steps and a bounce.
//   inclina   how far it leans forward (negative). Each defined center in the head or throat pulls it forward.
//   cojera    0–1, and the leg that limps. A defined root keeps it steady; without one it limps. A spleen without
//             its opposite (the solar plexus), or the other way round, makes it favor that side.
export function andarDe(G, M) {
  const R = azar(hash(G.semilla + '|paso')), c = new Set(G.centros || []);
  const peso = entre((M.ancho * M.miembro - 0.6) / 0.9 + (c.has('sacral') ? 0.2 : 0), 0, 1);
  const arriba = ['cabeza', 'ajna', 'garganta'].filter((x) => c.has(x)).length;
  const lado = c.has('plexo') !== c.has('bazo') ? (c.has('plexo') ? 'I' : 'D') : (R.b() ? 'I' : 'D');
  const cojera = entre((c.has('raiz') ? R.f(0, 0.06) : R.f(0.25, 0.5)) + (c.has('plexo') !== c.has('bazo') ? R.f(0.18, 0.3) : 0), 0, 0.7);
  const a = { paso: 32 - 10 * peso + R.f(-2, 2), brazos: R.f(12, 30) * (1 - 0.55 * peso), rodilla: R.f(40, 62), desfase: R.f(0, Math.PI * 2), inclina: -(3 + 5.5 * arriba + R.f(0, 4)),
    peso, cojera, rebote: 0.01 + 0.028 * (1 - peso), balanceo: 2 + 7 * peso, ritmo: (G.ritmo || 1) * (0.82 + 0.42 * peso) };
  for (const k in a) a[k] = dec(a[k]);
  return { ...a, pataCoja: lado };
}
// Its number: eight digits that are its own, from its date of birth. It goes with its name wherever the character is shown.
export function numeroDe(G) { return String(hash(G.semilla + '|numero') % 100000000).padStart(8, '0'); }
// Its skin: the one material its character wears, chosen by where the weight of its chart is. Most of its defined
// centers in the head and throat: blown vinyl. Most in the body: a chunky knit. Half and half: ribbed cloth.
export function pielDe(G) {
  const c = G.centros || [], arriba = c.filter((x) => ['cabeza', 'ajna', 'garganta'].includes(x)).length, abajo = c.length - arriba;
  return { id: arriba > abajo ? 'vinilo' : abajo > arriba ? 'punto' : 'pana', arriba, abajo };
}
export function personajeDe(G) { const medidas = medidasDe(G); return { numero: numeroDe(G), piel: pielDe(G), medidas, andar: andarDe(G, medidas) }; }
