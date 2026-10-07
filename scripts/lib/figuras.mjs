// ALMA's line figures for a page: the engine (figuras/motor.js) and every figure there is (figuras/<nombre>.js), as
// one script that leaves `window.AlmaFigura` ready.
import { readFileSync, readdirSync } from 'node:fs';

// In the order a page shows them: the first three as they came, then the rest by name.
const PRIMERAS = ['terreno', 'pila', 'portatil'];
export const nombresDeFiguras = () => { const t = readdirSync('figuras').filter((f) => f.endsWith('.js') && f !== 'motor.js').map((f) => f.replace(/\.js$/, '')).sort(); return [...PRIMERAS.filter((n) => t.includes(n)), ...t.filter((n) => !PRIMERAS.includes(n))]; };
export function figurasNavegador() { return ['motor', ...nombresDeFiguras()].map((n) => readFileSync(`figuras/${n}.js`, 'utf8')).join('\n'); }

// What a figure takes from an entity, from the file `npm run genes` writes (or the same things, however they come):
// its genes, and from its character how wide, tall and heavy it is, how it leans, and whether it is made of blocks.
export function rasgosDe(entidad) {
  const K = entidad.personaje; return { ...entidad.genes, ...(K ? { anguloso: K.medidas.anguloso, ancho: K.medidas.ancho, alto: K.medidas.alto, peso: K.andar.peso, inclina: K.andar.inclina } : {}) };
}
