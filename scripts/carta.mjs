// Prints the Human Design chart of an entity. Usage:
//   npm run carta -- --fecha 1911-06-16 [--hora 12:00] --zona America/New_York [--nombre IBM] [--json]
// Without --hora the chart uses noon and flags the Moon and the lines as uncertain.
import { calcularCarta } from '../entidades/carta.mjs';
import { CENTROS } from '../entidades/tabla.mjs';

const args = Object.fromEntries(process.argv.slice(2).join(' ').split('--').filter(Boolean).map((s) => { const [k, ...v] = s.trim().split(' '); return [k, v.join(' ') || true]; }));
if (!args.fecha || !args.zona) { console.error('Uso: npm run carta -- --fecha AAAA-MM-DD [--hora HH:MM] --zona Zona/IANA [--nombre Nombre] [--json]'); process.exit(1); }
const c = calcularCarta({ fecha: args.fecha, hora: args.hora === true ? undefined : args.hora, zona: args.zona, nombre: args.nombre === true ? '' : (args.nombre || '') });
if (args.json) { console.log(JSON.stringify(c, null, 2)); process.exit(0); }

const TIPO = { manifestador: 'Manifestador', generador: 'Generador', mg: 'Generador Manifestante', proyector: 'Proyector', reflector: 'Reflector' };
const AUT = { emocional: 'Emocional', sacral: 'Sacral', esplenica: 'Esplénica', ego: 'Del ego', autoproyectada: 'Autoproyectada', mental: 'Mental', lunar: 'Lunar' };
const nombre = (id) => CENTROS.find((x) => x.id === id).nombre;
const fila = (a) => `${a.cuerpo.padEnd(11)} ${String(a.puerta).padStart(2)}.${a.linea}`;
console.log(`${c.nombre || 'Carta'} · ${c.entrada.fecha} ${c.entrada.hora || '(sin hora: se usa el mediodía)'} · ${c.entrada.zona}`);
console.log(`UTC: ${c.utc.personalidad} · diseño: ${c.utc.diseno}\n`);
console.log(`Tipo:        ${TIPO[c.tipo]}`);
console.log(`Autoridad:   ${AUT[c.autoridad]}${c.detalleAutoridad ? ' (' + c.detalleAutoridad + ')' : ''}`);
console.log(`Perfil:      ${c.perfil}`);
console.log(`Definición:  ${c.definicion}`);
console.log(`Centros:     ${c.definidos.map(nombre).join(', ') || 'ninguno'}`);
console.log(`Canales:     ${c.canales.map((k) => k.id).join(', ') || 'ninguno'}`);
console.log(`Cruz:        ${c.cruz.puertas.join(' / ')} · ángulo ${c.cruz.angulo}\n`);
console.log('Personalidad            Diseño');
c.personalidad.forEach((a, i) => console.log(`${fila(a)}          ${fila(c.diseno[i])}`));
if (!c.entrada.horaConocida) console.log('\nSin hora: la Luna y las líneas pueden cambiar. Con la hora exacta la carta es definitiva.');
