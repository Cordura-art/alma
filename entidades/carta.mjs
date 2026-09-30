// Human Design chart engine: birth date, time and time zone → the full chart that seeds an ALMA entity.
// Positions come from astronomy-engine (geocentric, apparent, ecliptic of date). The design side is the moment
// the Sun stood 88° of solar arc before its birth position.
import * as Astro from 'astronomy-engine';
import { RUEDA, INICIO, PUERTA, LINEA, CENTROS, CANALES, CENTRO_DE, CUERPOS } from './tabla.mjs';

const norm = (x) => ((x % 360) + 360) % 360;
const DIA = 86400000;

// ---------- Time: local wall time in an IANA zone → UTC (handles daylight saving through Intl).
function offsetMs(date, zona) {
  const f = new Intl.DateTimeFormat('en-US', { timeZone: zona, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const p = Object.fromEntries(f.formatToParts(date).filter((x) => x.type !== 'literal').map((x) => [x.type, Number(x.value)]));
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(date.getTime() / 1000) * 1000;
}
export function aUTC(fecha, hora, zona) {
  const [y, m, d] = fecha.split('-').map(Number), [hh, mm] = (hora || '12:00').split(':').map(Number);
  const pared = Date.UTC(y, m - 1, d, hh, mm);
  let utc = pared - offsetMs(new Date(pared), zona);
  utc = pared - offsetMs(new Date(utc), zona); // second pass settles days when daylight saving changes
  return new Date(utc);
}

// ---------- Positions (tropical longitude of date, degrees)
const PLANETAS = { Mercurio: Astro.Body.Mercury, Venus: Astro.Body.Venus, Marte: Astro.Body.Mars, 'Júpiter': Astro.Body.Jupiter, Saturno: Astro.Body.Saturn, Urano: Astro.Body.Uranus, Neptuno: Astro.Body.Neptune, 'Plutón': Astro.Body.Pluto };
const sol = (date) => Astro.SunPosition(date).elon;
// True (osculating) lunar node: the ascending node of the Moon's instantaneous orbit, from its position and velocity.
function nodoNorte(date) {
  const vec = (t) => Astro.Ecliptic(Astro.GeoMoon(t)).vec;
  const a = vec(new Date(date.getTime() - 3600000)), b = vec(new Date(date.getTime() + 3600000)), r = vec(date);
  const v = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
  const hx = r.y * v.z - r.z * v.y, hy = r.z * v.x - r.x * v.z;
  return norm(Math.atan2(hx, -hy) * 180 / Math.PI);
}
function posiciones(date) {
  const s = sol(date), n = nodoNorte(date);
  const out = { Sol: s, Tierra: norm(s + 180), Luna: Astro.EclipticGeoMoon(date).lon, 'Nodo norte': n, 'Nodo sur': norm(n + 180) };
  for (const [k, b] of Object.entries(PLANETAS)) out[k] = Astro.Ecliptic(Astro.GeoVector(b, date, true)).elon;
  return out;
}

// The design moment: the Sun 88° earlier on its path (about 88 to 92 days before birth), found by bisection.
function momentoDiseno(nacimiento) {
  const meta = norm(sol(nacimiento) - 88);
  const falta = (t) => { const x = norm(sol(new Date(t)) - meta); return x > 180 ? x - 360 : x; }; // signed, grows with time
  let lo = nacimiento.getTime() - 100 * DIA, hi = nacimiento.getTime() - 80 * DIA;
  for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (falta(mid) < 0) lo = mid; else hi = mid; }
  return new Date((lo + hi) / 2);
}

// ---------- Longitude → gate, line, color and tone
export function puertaDe(lon) {
  const x = norm(lon - INICIO), i = Math.floor(x / PUERTA), enPuerta = x - i * PUERTA;
  const linea = Math.floor(enPuerta / LINEA), enLinea = enPuerta - linea * LINEA, c = LINEA / 6;
  const color = Math.floor(enLinea / c), tono = Math.floor((enLinea - color * c) / (c / 6));
  return { puerta: RUEDA[i], linea: linea + 1, color: color + 1, tono: tono + 1 };
}
function activar(date) { const pos = posiciones(date); return CUERPOS.map((cuerpo) => ({ cuerpo, lon: pos[cuerpo], ...puertaDe(pos[cuerpo]) })); }

// ---------- Activations → channels, centers, type, authority, definition
function componentes(ids, aristas) {
  const padre = Object.fromEntries(ids.map((i) => [i, i]));
  const raiz = (i) => (padre[i] === i ? i : (padre[i] = raiz(padre[i])));
  for (const [a, b] of aristas) padre[raiz(a)] = raiz(b);
  const grupos = {}; for (const i of ids) (grupos[raiz(i)] = grupos[raiz(i)] || []).push(i);
  return Object.values(grupos);
}
const PERFIL_ANGULO = { '1/3': 'derecho', '1/4': 'derecho', '2/4': 'derecho', '2/5': 'derecho', '3/5': 'derecho', '3/6': 'derecho', '4/6': 'derecho', '4/1': 'yuxtaposición', '5/1': 'izquierdo', '5/2': 'izquierdo', '6/2': 'izquierdo', '6/3': 'izquierdo' };

export function analizar(personalidad, diseno) {
  const lado = {};
  for (const a of personalidad) lado[a.puerta] = lado[a.puerta] === 'diseño' ? 'ambos' : (lado[a.puerta] || 'personalidad');
  for (const a of diseno) lado[a.puerta] = lado[a.puerta] === 'personalidad' ? 'ambos' : (lado[a.puerta] || 'diseño');
  const activas = new Set(Object.keys(lado).map(Number));
  const canales = CANALES.filter(([a, b]) => activas.has(a) && activas.has(b)).map(([a, b]) => ({ id: a + '-' + b, puertas: [a, b], centros: [CENTRO_DE[a], CENTRO_DE[b]] }));
  const definidos = CENTROS.map((c) => c.id).filter((id) => canales.some((k) => k.centros.includes(id)));
  const on = (id) => definidos.includes(id);
  const grupos = componentes(definidos, canales.map((k) => k.centros));
  const grupoDe = (id) => grupos.find((g) => g.includes(id));
  const motorAGarganta = on('garganta') && CENTROS.some((c) => c.motor && on(c.id) && grupoDe(c.id) === grupoDe('garganta'));
  const tipo = !definidos.length ? 'reflector' : on('sacro') ? (motorAGarganta ? 'mg' : 'generador') : (motorAGarganta ? 'manifestador' : 'proyector');
  const canal = (id) => canales.some((k) => k.id === id);
  let autoridad, detalle = null;
  if (on('plexo')) autoridad = 'emocional';
  else if (on('sacro')) autoridad = 'sacral';
  else if (on('bazo')) autoridad = 'esplenica';
  else if (on('corazon')) { autoridad = 'ego'; detalle = canal('21-45') ? 'manifestada' : 'proyectada'; }
  else if (on('g') && grupoDe('g') === grupoDe('garganta')) autoridad = 'autoproyectada';
  else autoridad = tipo === 'reflector' ? 'lunar' : 'mental';
  const definicion = ['ninguna', 'simple', 'partida', 'triple', 'cuadruple'][Math.min(4, grupos.length)];
  return { lado, puertas: [...activas].sort((a, b) => a - b), canales, definidos, tipo, autoridad, detalleAutoridad: detalle, definicion };
}

// ---------- The chart
export function calcularCarta({ fecha, hora, zona, nombre = '' }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha || '')) throw new Error('La fecha va como AAAA-MM-DD.');
  if (hora && !/^\d{1,2}:\d{2}$/.test(hora)) throw new Error('La hora va como HH:MM.');
  const nacimiento = aUTC(fecha, hora, zona), momento = momentoDiseno(nacimiento);
  const personalidad = activar(nacimiento), diseno = activar(momento);
  const A = analizar(personalidad, diseno);
  const perfil = personalidad[0].linea + '/' + diseno[0].linea;
  return {
    nombre, entrada: { fecha, hora: hora || null, zona, horaConocida: !!hora },
    utc: { personalidad: nacimiento.toISOString(), diseno: momento.toISOString() },
    personalidad, diseno,
    ...A,
    perfil,
    cruz: { puertas: [personalidad[0].puerta, personalidad[1].puerta, diseno[0].puerta, diseno[1].puerta], angulo: PERFIL_ANGULO[perfil] || null }
  };
}
