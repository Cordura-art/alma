// Searches hour by hour for birth moments whose chart matches a target entity, and ranks them by how close their
// generated accent is to a target color. Used to give existing brands a chosen date (IBM: 1911-06-03 04:00).
// Usage: npm run buscar-fecha -- --anios 1911,1924 --zona America/New_York --tipo proyector --perfil 1/3
//          --centros cabeza,ajna,garganta [--color '#0F62FE']
import { calcularCarta } from '../entidades/carta.mjs';
import { cargarMotor, deltaE } from './lib/entidades.mjs';

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const anios = (arg('anios') || '').split(',').filter(Boolean).map(Number);
const zona = arg('zona', 'UTC'), tipo = arg('tipo'), perfil = arg('perfil'), centros = arg('centros'), color = arg('color');
if (!anios.length) { console.error('Indica los años: --anios 1911,1924'); process.exit(1); }
const En = color ? await cargarMotor() : null;
const pad = (x) => String(x).padStart(2, '0');

const ventanas = [];
for (const y of anios) {
  for (let t = Date.UTC(y, 0, 1); t < Date.UTC(y + 1, 0, 1); t += 3600000) {
    const d = new Date(t), fecha = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`, hora = `${pad(d.getUTCHours())}:00`;
    const c = calcularCarta({ fecha, hora, zona });
    if ((tipo && c.tipo !== tipo) || (perfil && c.perfil !== perfil) || (centros && c.definidos.join() !== centros)) continue;
    const hit = { fecha, hora, canales: c.canales.map((k) => k.id).join(' '), cruz: c.cruz.puertas.join('/') };
    if (En) {
      const e = { id: 'busqueda', name: 'Entidad', nacimiento: { fecha, hora, zona }, variation: 0, type: c.tipo, auth: c.autoridad, profile: c.perfil, def: c.definicion, centers: c.definidos.slice() };
      hit.acento = En.params(e).accent.dark['interactive-01']; hit.dE = deltaE(hit.acento, color);
    }
    const w = ventanas[ventanas.length - 1];
    if (w && w.fecha === fecha && w.canales === hit.canales) { w.hasta = hora; if (En && hit.dE < w.mejor.dE) w.mejor = hit; } else ventanas.push({ ...hit, hasta: hora, mejor: hit });
  }
}
if (En) ventanas.sort((a, b) => a.mejor.dE - b.mejor.dE);
for (const w of ventanas) console.log(`${w.fecha} ${w.hora}–${w.hasta} · canales ${w.canales} · cruz ${w.cruz}` + (En ? ` · mejor ${w.mejor.hora} ${w.mejor.acento} ΔE ${w.mejor.dE.toFixed(3)}` : ''));
console.log(`${ventanas.length} ventanas en ${anios.length} ${anios.length === 1 ? 'año' : 'años'} (${zona}).`);
