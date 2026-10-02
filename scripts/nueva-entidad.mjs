// Starts a new entity from its birth date: writes the first draft of its design language
// (entidades/lenguajes/<id>.json), the only file an entity has. The chart writes what it decides; the examples of
// product are neutral and wait for the brand's own. Then: edit the draft and run `npm run entidad -- <id>`.
// Usage: npm run entidad:nueva -- --nombre Nombre --fecha AAAA-MM-DD [--hora HH:MM] --zona Zona/IANA
//          [--lugar "Santiago de Chile"] [--id nombre] [--color '#RRGGBB'] [--reescribir]
import { existsSync, writeFileSync } from 'node:fs';
import { borradorDe } from './lib/borrador.mjs';

const args = Object.fromEntries(process.argv.slice(2).join(' ').split(/(?:^|\s)--/).filter(Boolean).map((s) => { const [k, ...v] = s.trim().split(' '); return [k, v.join(' ') || true]; }));
const txt = (k) => (typeof args[k] === 'string' ? args[k].trim() : '');
if (!txt('nombre') || !/^\d{4}-\d{2}-\d{2}$/.test(txt('fecha')) || !txt('zona')) {
  console.error('Uso: npm run entidad:nueva -- --nombre Nombre --fecha AAAA-MM-DD [--hora HH:MM] --zona Zona/IANA [--lugar "Ciudad"] [--id nombre] [--color \'#RRGGBB\'] [--reescribir]');
  process.exit(1);
}
if (txt('hora') && !/^\d{2}:\d{2}$/.test(txt('hora'))) { console.error('La hora va como HH:MM, en 24 horas.'); process.exit(1); }
if (txt('color') && !/^#[0-9A-F]{6}$/i.test(txt('color'))) { console.error('El color heredado va como #RRGGBB.'); process.exit(1); }
const id = (txt('id') || txt('nombre')).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const file = `entidades/lenguajes/${id}.json`;
if (existsSync(file) && !args.reescribir) { console.error(`${file} ya existe. Un lenguaje editado no se pisa: usa --reescribir solo si quieres perderlo y partir de un borrador nuevo.`); process.exit(1); }

const L = await borradorDe({ id, nombre: txt('nombre'), nacimiento: { fecha: txt('fecha'), hora: txt('hora') || '12:00', zona: txt('zona') }, lugar: txt('lugar') || undefined, colorHeredado: txt('color') ? txt('color').toUpperCase() : undefined });
writeFileSync(file, JSON.stringify(L, null, 1) + '\n');
const palabras = JSON.stringify(L).split(/\s+/).length;
console.log(`${file} · borrador de ${palabras} palabras${txt('hora') ? '' : ' (sin hora: se usó el mediodía; el perfil puede cambiar con la hora exacta)'}
  ${L.inicio.titulo}
  ${L.voz.lede}
  Principios: ${L.principios.items.map((p) => p.t).join(' · ')}

Lo que falta escribir a mano (está en «borrador.revisar», dentro del archivo): ${L.borrador.revisar.join(', ')}.
Cuando esté listo, borra «borrador» y «aviso» del archivo. Para verlo: npm run entidad -- ${id}`);
