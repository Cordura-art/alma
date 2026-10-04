// The character of an entity, for its language page: the measures and the walk ALMA works out from its genes
// (entidades/personaje.mjs) and its portraits, when they have been made (entidades/retratos/<id>-piezas.jpg, drawn by
// Blender, and <id>-pelaje.jpg, taken in Unity), as images the page carries inside itself.
import { existsSync, readFileSync } from 'node:fs';
import { personajeDe } from '../../entidades/personaje.mjs';

export function personajeParaPagina(id, G) {
  const foto = (k) => { const f = `entidades/retratos/${id}-${k}.jpg`; return existsSync(f) ? 'data:image/jpeg;base64,' + readFileSync(f).toString('base64') : null; };
  return { ...personajeDe(G), retratos: { piezas: foto('piezas'), pelaje: foto('pelaje') } };
}
