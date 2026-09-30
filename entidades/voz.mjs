// An entity's voice and principles, written from its chart: defined channels are its fixed traits (principles),
// the incarnation cross gates are its purpose, and the Throat, the profile, the authority and the type shape how it speaks.
// Accepts the full chart from entidades/carta.mjs or the compact one the entities tool stores.
import { PUERTAS, CANAL_NOMBRE, VOZ_GARGANTA } from './arquetipos.mjs';
import { CENTROS, CENTRO_DE } from './tabla.mjs';

const nombreCentro = (id) => CENTROS.find((c) => c.id === id).nombre;
const minus = (s) => s.charAt(0).toLowerCase() + s.slice(1);

function normalizar(c) {
  const g = (a) => (a.puerta !== undefined ? a.puerta : a.p);
  const canales = (c.canales || []).map((k) => (typeof k === 'string' ? k : k.id));
  return { tipo: c.tipo, autoridad: c.autoridad, perfil: c.perfil, definidos: c.definidos || [], canales,
    solP: g(c.personalidad[0]), tierraP: g(c.personalidad[1]), solD: g(c.diseno[0]), tierraD: g(c.diseno[1]),
    resto: c.personalidad.slice(2).map((a) => ({ cuerpo: a.cuerpo || a.c, puerta: g(a) })) };
}

// ---------- Principles
export function generarPrincipios(carta) {
  const c = normalizar(carta), cruz = [c.solP, c.tierraP, c.solD, c.tierraD];
  const deCanal = (id) => {
    const [a, b] = id.split('-').map(Number), pa = PUERTAS[a], pb = PUERTAS[b];
    return { titulo: CANAL_NOMBRE[id], origen: `Canal ${id} · ${nombreCentro(CENTRO_DE[a])} y ${nombreCentro(CENTRO_DE[b])}`, puertas: [a, b],
      texto: `${pa.principio} y ${minus(pb.principio)}.`, interfaz: `${pa.interfaz} ${pb.interfaz}` };
  };
  const ROL = ['Sol consciente', 'Tierra consciente', 'Sol inconsciente', 'Tierra inconsciente'];
  const dePuerta = (n, i) => {
    const p = PUERTAS[n];
    return { titulo: p.principio, origen: `${ROL[i]} · puerta ${n} · ${p.hexagrama}`, puertas: [n], texto: `Su propósito pasa por ${p.tema}.`, interfaz: p.interfaz };
  };
  // Channels that touch the cross come first: they carry the purpose. Then the rest, at most three.
  const canales = [...c.canales].sort((x, y) => {
    const t = (id) => (id.split('-').map(Number).some((n) => cruz.includes(n)) ? 0 : 1);
    return t(x) - t(y);
  }).slice(0, 3).map(deCanal);
  const cubiertas = new Set(canales.flatMap((k) => k.puertas));
  const out = [];
  // The conscious Sun opens the list: it is the entity's purpose, unless a channel already speaks for it.
  if (!cubiertas.has(c.solP)) { out.push(dePuerta(c.solP, 0)); cubiertas.add(c.solP); }
  out.push(...canales);
  cruz.forEach((n, i) => { if (out.length < 4 && !cubiertas.has(n)) { out.push(dePuerta(n, i)); cubiertas.add(n); } });
  // Rarely the channels already cover the whole cross: the next conscious activations complete three principles.
  for (const a of c.resto) {
    if (out.length >= 3) break;
    if (!cubiertas.has(a.puerta)) { const p = PUERTAS[a.puerta]; out.push({ titulo: p.principio, origen: `${a.cuerpo} consciente · puerta ${a.puerta} · ${p.hexagrama}`, puertas: [a.puerta], texto: `También la mueve ${p.tema}.`, interfaz: p.interfaz }); cubiertas.add(a.puerta); }
  }
  return out.slice(0, 5);
}

// ---------- Voice
const REGISTRO = {
  1: 'Fundada: da datos y fuentes antes de opinar.', 2: 'Natural: directa, sin esfuerzo ni adornos.', 3: 'Honesta: admite los errores y cuenta lo que aprendió.',
  4: 'Cercana: habla como alguien de confianza.', 5: 'Práctica: ofrece soluciones que le sirven a cualquiera.', 6: 'Sabia: da perspectiva y habla con calma.'
};
const RITMO = {
  emocional: 'Se toma su tiempo: nunca apura una decisión.', sacral: 'Responde con claridad: sí o no.', esplenica: 'Es breve e inmediata: dice lo justo, en el momento.',
  ego: 'Promete solo lo que cumple.', autoproyectada: 'Dice lo que piensa para escucharse, y por eso suena auténtica.', mental: 'Piensa en voz alta: explica y conversa.',
  lunar: 'Observa antes de hablar y refleja lo que ve.'
};
const TRATO = {
  manifestador: 'Informa antes de actuar.', generador: 'Pregunta y responde a lo que la persona pide.', mg: 'Responde rápido y avisa lo que hizo.',
  proyector: 'Invita y orienta; reconoce a la persona.', reflector: 'Refleja a su comunidad; no impone.'
};
const ACCION = {
  manifestador: ['Publicamos tu informe a las 18:00.', '¿Te gustaría publicar tu informe?', 'Informa lo que va a pasar.'],
  generador: ['¿Guardamos los cambios?', 'Guarda tus cambios ahora.', 'Pregunta y espera la respuesta.'],
  mg: ['Listo: guardamos y pasamos al siguiente paso.', 'Cuando quieras, puedes considerar guardar.', 'Responde rápido y avisa qué hizo.'],
  proyector: ['Te recomendamos revisar el total antes de pagar.', '¡Paga ya!', 'Orienta sin presionar.'],
  reflector: ['Así lo está usando tu equipo esta semana.', 'Esta es la única forma correcta.', 'Refleja a su comunidad.']
};
const ERROR = {
  emocional: 'No pudimos guardar. Vuelve a intentarlo cuando quieras: tus cambios siguen aquí.', sacral: 'No se guardó. ¿Reintentar?',
  esplenica: 'Sin conexión. Reintentando.', ego: 'No se guardó. Reintenta, y si vuelve a fallar, te ayudamos.',
  autoproyectada: 'No se guardó. Revisa si es lo que querías y vuelve a intentarlo.', mental: 'No se guardó porque se perdió la conexión. Revisa la red y vuelve a intentarlo.',
  lunar: 'No se guardó. Vuelve a intentarlo más tarde; no hay apuro.'
};
const VACIO = {
  1: 'Aún no hay informes. Importa el primero para tener una base.', 2: 'Nada por aquí todavía. Cuando quieras, empieza.',
  3: 'Todavía no hay informes. Prueba con uno: todo se puede deshacer.', 4: 'Aún no hay informes. Invita a tu equipo y empiecen juntos.',
  5: 'Aún no hay informes. Crea el primero y resuelve lo pendiente.', 6: 'Aún no hay informes. Así se ve cuando todo está en orden.'
};

export function generarVoz(carta) {
  const c = normalizar(carta), linea = Number(c.perfil.split('/')[0]);
  const garganta = c.canales.flatMap((id) => id.split('-').map(Number)).filter((n) => VOZ_GARGANTA[n]);
  const adj = [];
  [c.solP, c.solD, ...garganta, c.tierraP, c.tierraD].forEach((n) => { const v = PUERTAS[n].voz; if (adj.length < 3 && !adj.includes(v)) adj.push(v); });
  const dice = [...new Set(garganta)].map((n) => VOZ_GARGANTA[n]);
  const temas = [...new Set([c.solP, c.solD, ...c.canales.flatMap((id) => id.split('-').map(Number))])].map((n) => PUERTAS[n].tema);
  const a = ACCION[c.tipo];
  return {
    adjetivos: adj,
    resumen: `Una voz ${adj[0]}, ${adj[1]} y ${adj[2]}.`,
    registro: REGISTRO[linea],
    ritmo: RITMO[c.autoridad],
    trato: TRATO[c.tipo],
    garganta: dice.length ? `Cuando habla, ${dice.join(' y ')}.` : 'Su Garganta está abierta: adapta el tono a quien tiene enfrente y no se apura en llenar silencios.',
    temas,
    ejemplos: [
      { caso: 'Acción principal', si: a[0], no: a[1], porque: a[2] },
      { caso: 'Error', si: ERROR[c.autoridad], no: '¡Ups! Algo salió mal.', porque: RITMO[c.autoridad] },
      { caso: 'Estado vacío', si: VACIO[linea], no: 'No hay nada.', porque: REGISTRO[linea] }
    ]
  };
}
