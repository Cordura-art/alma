// The character of an entity, for its language page: the measures and the walk ALMA works out from its genes
// (entidades/personaje.mjs) and its portraits, when they have been made (entidades/retratos/<id>-piezas.jpg, drawn by
// Blender, and <id>-pelaje.jpg, taken in Unity), as images the page carries inside itself.
import { existsSync, readFileSync } from 'node:fs';
import { personajeDe } from '../../entidades/personaje.mjs';
import { patronDe } from '../../entidades/patron.mjs';
import { descripciones } from './materiales.mjs';

export function personajeParaPagina(id, G, tok = JSON.parse(readFileSync('dist/json/tokens.json', 'utf8'))) {
  const foto = (k) => { const f = `entidades/retratos/${id}-${k}.jpg`; return existsSync(f) ? 'data:image/jpeg;base64,' + readFileSync(f).toString('base64') : null; };
  // The materials and the kinds of coat, as the system's tokens describe them.
  return { ...personajeDe(G), retratos: { piel: foto('piel'), pelaje: foto('pelaje'), probetas: foto('probetas') }, patron: patronDe(G), materiales: descripciones(tok, 'material'), pelajes: descripciones(tok, 'pelaje') };
}

// The parade: the short video of every entity's character walking by (entidades/retratos/desfile.mp4, taken in Unity)
// and its still picture, as data the page carries once, whatever the number of entities.
export function desfileParaPagina() {
  const v = 'entidades/retratos/desfile.mp4', p = 'entidades/retratos/desfile.jpg'; if (!existsSync(v)) return null;
  return { video: 'data:video/mp4;base64,' + readFileSync(v).toString('base64'), portada: existsSync(p) ? 'data:image/jpeg;base64,' + readFileSync(p).toString('base64') : null };
}
