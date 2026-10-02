// A first draft of an entity's design language (entidades/lenguajes/<id>.json), written from its chart.
// What the chart decides is written for real: principles, voice, prism, type, shape, colour, motion and the reading of
// its birth date. What only the brand knows (its trade, its product, its examples) is written with a neutral product
// about projects, and listed in `borrador.revisar` so the person knows what to rewrite. The draft has the same shape
// as a language written by hand: the template (site/lenguaje.js) and the tests read it without knowing it is a draft.
// P is what the engine computes for the chart (site/entidades.js, `params`): palette, weights, radii and motion.
import { calcularCarta } from './carta.mjs';
import { PUERTAS } from './arquetipos.mjs';
import { CENTROS } from './tabla.mjs';
import { generarVoz, generarPrincipios } from './voz.mjs';

const may = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const minus = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const lista = (a) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' y ' + a[a.length - 1]);
const sinPunto = (s) => s.replace(/\.$/, '');
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

// ---------- What each trait of the chart says, in the entity's own voice
const TIPO = {
  manifestador: { n: 'Manifestador', carta: 'Inicia y avisa antes de actuar; no espera permiso.',
    relacion: 'Abrimos camino y avisamos antes de cada paso: nadie se entera tarde de lo que va a pasar.',
    pv: 'Nos toca empezar. Cuando vemos lo que hay que hacer, lo hacemos, y antes le avisamos a quien le afecta: informar es nuestra forma de respeto.',
    como: ['Avisando antes', 'Decimos lo que va a pasar antes de que pase. Nadie debería enterarse de un cambio por sorpresa.'],
    regla: ['Avisar antes de actuar', 'Publicaremos el proyecto a las 18:00', 'Lo que se anuncia no sorprende.'],
    palabras: ['Vamos a, a las 18:00', 'De pronto, sin aviso'], secundaria: 'Cambiar la hora', mapa: 'Manifestador: informar antes de actuar.',
    mov: ['Decidido', 'El movimiento parte sin titubeos y anuncia lo que viene: primero el aviso, después el cambio.'] },
  generador: { n: 'Generador', carta: 'Responde a lo que le piden y sostiene lo que le gusta hacer.',
    relacion: 'Respondemos a lo que la persona pide y sostenemos el trabajo hasta terminarlo. Preguntamos antes de suponer.',
    pv: 'Nos toca responder. No inventamos necesidades: escuchamos lo que la persona pide y ponemos toda la energía en eso, hasta terminarlo.',
    como: ['Preguntando', 'Preguntamos y esperamos la respuesta. Una pregunta clara, de sí o no, vale más que una suposición.'],
    regla: ['Preguntas de sí o no', '¿Guardamos los cambios?', 'Una respuesta clara necesita una pregunta clara.'],
    palabras: ['¿Guardamos?, ¿seguimos?', 'Deberías, te conviene'], secundaria: 'Ahora no', mapa: 'Generador: preguntar y esperar la respuesta.',
    mov: ['Constante', 'El movimiento sostiene un ritmo parejo y responde a lo que la persona hace, sin adelantarse.'] },
  mg: { n: 'Generador Manifestante', carta: 'Responde rápido y avisa lo que hizo; puede con varias cosas a la vez.',
    relacion: 'Respondemos rápido, nos saltamos los pasos que sobran y avisamos lo que hicimos. La persona siempre sabe en qué quedó todo.',
    pv: 'Nos toca responder, y rápido. Buscamos el camino más corto, lo probamos y contamos lo que hicimos, para que nadie tenga que adivinarlo.',
    como: ['Al grano', 'Respondemos rápido y decimos qué hicimos. Si nos saltamos un paso, lo avisamos.'],
    regla: ['Decir qué se hizo', 'Listo: guardamos y pasamos al siguiente paso', 'La rapidez sin aviso desorienta.'],
    palabras: ['Listo, hecho, siguiente', 'Cuando puedas, tal vez'], secundaria: 'Deshacer', mapa: 'Generador Manifestante: responder rápido y avisar lo que se hizo.',
    mov: ['Ágil', 'El movimiento es el más veloz del sistema: responde de inmediato y muestra qué cambió.'] },
  proyector: { n: 'Proyector', carta: 'Guía cuando la invitan; no persigue.',
    relacion: 'Guiamos por invitación: orientamos, recomendamos y reconocemos a la persona. La decisión siempre es de ella.',
    pv: 'Nos toca guiar. Miramos con atención, recomendamos con fundamento y esperamos a que nos inviten: una buena guía no empuja.',
    como: ['Por invitación', 'Sugerimos y orientamos; no ordenamos. La última palabra siempre es de la persona.'],
    regla: ['Sugerir, no ordenar', 'Te recomendamos… · Prueba…', 'La decisión es de la persona.'],
    palabras: ['Te recomendamos, prueba', 'Debes, tienes que'], secundaria: 'Ahora no', mapa: 'Proyector: guiar, no empujar.',
    mov: ['Pausado', 'El movimiento es preciso y sereno: orienta la mirada hacia lo que importa y después se queda quieto.'] },
  reflector: { n: 'Reflector', carta: 'Refleja a su entorno; se toma un ciclo completo antes de decidir.',
    relacion: 'Reflejamos a nuestra comunidad: mostramos lo que está pasando y dejamos que cada persona saque sus conclusiones.',
    pv: 'Nos toca reflejar. Mostramos a cada comunidad cómo está, sin imponerle una forma correcta, y nos tomamos el tiempo que hace falta.',
    como: ['Reflejando', 'Mostramos lo que pasa en la comunidad de la persona. No imponemos una única forma de hacer las cosas.'],
    regla: ['Mostrar, no imponer', 'Así lo está usando tu equipo esta semana', 'Cada comunidad encuentra su forma.'],
    palabras: ['Así lo usa tu equipo', 'La única forma correcta'], secundaria: 'Verlo más tarde', mapa: 'Reflector: reflejar a la comunidad.',
    mov: ['Lento', 'El movimiento es el más lento del sistema, y expresivo: deja ver cada cambio completo.'] }
};
const AUT = {
  emocional: { n: 'emocional', carta: 'Decide con tiempo: espera que la emoción se asiente antes de actuar.',
    pv: 'No apuramos a nadie. Las buenas decisiones llegan cuando la emoción se asienta, y por eso siempre dejamos una salida para pensarlo.',
    como: ['Sin apuro', 'Nunca escribimos para que alguien decida en caliente. Siempre se puede volver mañana.'], nunca: 'Nunca inventes urgencia: contadores, «últimas horas».', irreversible: 'Tómate el tiempo que necesites.', breve: 'la claridad llega con el tiempo' },
  sacral: { n: 'sacral', carta: 'Decide con el cuerpo: un sí o un no, en el momento.',
    pv: 'Creemos en las respuestas simples. Ante una buena pregunta, la persona sabe de inmediato si es sí o si es no, y eso basta.',
    como: ['Con sí o no', 'Hacemos preguntas que se responden de inmediato. No pedimos explicaciones.'], nunca: 'Nunca hagas una pregunta que no se pueda responder con sí o no.', irreversible: '¿Lo eliminamos?', breve: 'la respuesta es inmediata' },
  esplenica: { n: 'esplénica', carta: 'Decide al instante, por instinto, y no repite el aviso.',
    pv: 'Confiamos en el instinto. Decimos lo justo, en el momento justo, una sola vez: lo que hay que saber ahora, y nada más.',
    como: ['En el momento', 'Somos breves e inmediatos. Decimos lo justo cuando hace falta, y no lo repetimos.'], nunca: 'Nunca repitas un aviso que la persona ya vio.', irreversible: 'Esto no se puede deshacer.', breve: 'el instinto habla una sola vez' },
  ego: { n: 'del ego', carta: 'Decide con la voluntad: se compromete solo con lo que quiere cumplir.',
    pv: 'Una promesa nuestra se cumple. Por eso prometemos poco, decimos exactamente qué vamos a hacer y lo hacemos.',
    como: ['Con palabra', 'Prometemos solo lo que cumplimos, con fecha y con nombre.'], nunca: 'Nunca prometas algo que no depende de nosotros.', irreversible: 'Nos hacemos cargo de lo que sigue.', breve: 'solo se promete lo que se cumple' },
  autoproyectada: { n: 'autoproyectada', carta: 'Decide al escucharse hablar: lo que dice en voz alta le muestra el camino.',
    pv: 'Pensamos en voz alta. Decimos lo que creemos tal como lo creemos, y al decirlo sabemos si es cierto para nosotros.',
    como: ['Con voz propia', 'Decimos lo que pensamos, tal cual. Sonamos igual en una pantalla que en una conversación.'], nunca: 'Nunca uses una frase que no dirías en voz alta.', irreversible: 'Revisa si es lo que quieres.', breve: 'la dirección aparece al decirla' },
  mental: { n: 'mental', carta: 'Decide conversando y tomando distancia, no por impulso.',
    pv: 'Decidimos conversando. Explicamos las opciones, las comparamos y dejamos que la persona las comente con quien quiera antes de elegir.',
    como: ['Explicando', 'Damos las opciones y sus razones. Decidir es más fácil cuando se puede comparar y conversar.'], nunca: 'Nunca des una sola opción cuando hay dos.', irreversible: 'Compara antes de decidir.', breve: 'la claridad llega al conversar' },
  lunar: { n: 'lunar', carta: 'Decide después de un ciclo completo: observa antes de moverse.',
    pv: 'Observamos antes de hablar. Las decisiones grandes necesitan tiempo, y preferimos una respuesta tardía a una apurada.',
    como: ['Con tiempo', 'Observamos antes de hablar y nunca pedimos una respuesta inmediata.'], nunca: 'Nunca pidas una decisión importante en el momento.', irreversible: 'Vuelve cuando lo tengas claro; no hay apuro.', breve: 'la claridad llega con el ciclo' }
};
// Conscious line: how it speaks and how wide its letter is. Unconscious line: how it works and the shape of things.
const LC = ['',
  { carta: 'investiga hasta tener una base', como: ['Con fundamento', 'Damos el dato y la fuente antes de la opinión.'], letra: 'de ancho normal', porque: 'El ancho normal aprovecha el espacio: caben más datos en cada línea.' },
  { carta: 'hace con naturalidad lo que sabe y necesita su espacio', como: ['Con naturalidad', 'Hablamos directo, sin esfuerzo ni adornos.'], letra: 'apenas ancha', porque: 'La letra apenas ancha se lee sin esfuerzo.' },
  { carta: 'aprende probando y cuenta lo que no funcionó', como: ['Con honestidad', 'Admitimos los errores y contamos lo que aprendimos.'], letra: 'algo ancha', porque: 'La letra algo ancha deja ver cada palabra con claridad.' },
  { carta: 'trabaja con su red y cuida la confianza', como: ['De cerca', 'Hablamos como alguien de confianza, no como una institución.'], letra: 'ancha', porque: 'La letra ancha se acerca a quien lee.' },
  { carta: 'ofrece soluciones prácticas que le sirven a cualquiera', como: ['Con soluciones', 'Ofrecemos una salida práctica, que le sirve a cualquiera.'], letra: 'ancha', porque: 'La letra ancha da aire a cada palabra y se lee de lejos.' },
  { carta: 'mira desde lejos y da perspectiva', como: ['Con perspectiva', 'Damos contexto y hablamos con calma.'], letra: 'muy ancha', porque: 'La letra muy ancha habla con calma: cada palabra tiene su lugar.' }
];
const LI = ['',
  { carta: 'necesita una base firme antes de moverse', esquinas: 'casi rectas', porque: 'Son formas firmes, que se apoyan en una base.' },
  { carta: 'tiene un talento natural y necesita retirarse para cuidarlo', esquinas: 'suaves', porque: 'Suavizan sin llamar la atención: lo que importa es el contenido, no su caja.' },
  { carta: 'prueba, falla y corrige', esquinas: 'rectas', porque: 'Son formas sin adorno: lo que se ve es lo que hay.' },
  { carta: 'abre puertas y construye su red', esquinas: 'amables', porque: 'Son formas amables, hechas para acercar.' },
  { carta: 'recibe lo que otros esperan de ella y responde con algo útil', esquinas: 'amplias', porque: 'Son formas amplias, que se ven de lejos.' },
  { carta: 'con el tiempo se vuelve un ejemplo', esquinas: 'de píldora', porque: 'Son formas completas, sin ángulos.' }
];
const DEF = { ninguna: 'Sin circuitos fijos: todos los centros están abiertos y toman la forma de lo que los rodea.', simple: 'Un solo circuito: todo lo definido está conectado y trabaja sin desvíos.', partida: 'Dos circuitos, que se completan con quien llega.', triple: 'Tres circuitos: necesita movimiento y más de una mirada.', cuadruple: 'Cuatro circuitos: cada parte trabaja a su ritmo.' };
const CENTRO = { cabeza: 'preguntas', ajna: 'mente', garganta: 'voz', g: 'identidad', corazon: 'voluntad', sacro: 'energía', plexo: 'emoción', bazo: 'instinto', raiz: 'presión' };
// The voice adjective of each gate, as an attribute of a voice: what we are, and the excess we avoid.
const ATR = { 1: ['Originales', 'excéntricos'], 2: ['Receptivos', 'pasivos'], 3: ['Innovadores', 'caóticos'], 4: ['Lógicos', 'fríos'], 5: ['Constantes', 'rígidos'], 6: ['Diplomáticos', 'evasivos'], 7: ['Conductores', 'mandones'], 8: ['Generosos', 'invasivos'],
  9: ['Minuciosos', 'quisquillosos'], 10: ['Auténticos', 'caprichosos'], 11: ['Imaginativos', 'dispersos'], 12: ['Cuidadosos', 'temerosos'], 13: ['Atentos', 'entrometidos'], 14: ['Capaces', 'arrogantes'], 15: ['Humildes', 'apocados'], 16: ['Entusiastas', 'exagerados'],
  17: ['Argumentativos', 'discutidores'], 18: ['Críticos', 'duros'], 19: ['Sensibles', 'frágiles'], 20: ['Presentes', 'impulsivos'], 21: ['Firmes', 'rígidos'], 22: ['Elegantes', 'afectados'], 23: ['Claros', 'simplistas'], 24: ['Reflexivos', 'lentos'],
  25: ['Inocentes', 'ingenuos'], 26: ['Persuasivos', 'manipuladores'], 27: ['Protectores', 'paternalistas'], 28: ['Valientes', 'temerarios'], 29: ['Comprometidos', 'complacientes'], 30: ['Apasionados', 'dramáticos'], 31: ['Influyentes', 'autoritarios'], 32: ['Prudentes', 'temerosos'],
  33: ['Reservados', 'distantes'], 34: ['Enérgicos', 'atropelladores'], 35: ['Curiosos', 'dispersos'], 36: ['Intensos', 'abrumadores'], 37: ['Cercanos', 'confianzudos'], 38: ['Tenaces', 'tercos'], 39: ['Provocadores', 'hirientes'], 40: ['Resueltos', 'bruscos'],
  41: ['Soñadores', 'ilusos'], 42: ['Pacientes', 'lentos'], 43: ['Perspicaces', 'crípticos'], 44: ['Sagaces', 'desconfiados'], 45: ['Convocantes', 'acaparadores'], 46: ['Determinados', 'obstinados'], 47: ['Comprensivos', 'condescendientes'], 48: ['Profundos', 'oscuros'],
  49: ['Revolucionarios', 'destructivos'], 50: ['Responsables', 'solemnes'], 51: ['Audaces', 'imprudentes'], 52: ['Serenos', 'indiferentes'], 53: ['Emprendedores', 'apurados'], 54: ['Ambiciosos', 'codiciosos'], 55: ['Emotivos', 'sentimentales'], 56: ['Narradores', 'charlatanes'],
  57: ['Intuitivos', 'vagos'], 58: ['Alegres', 'frívolos'], 59: ['Cálidos', 'empalagosos'], 60: ['Sobrios', 'secos'], 61: ['Inspirados', 'místicos'], 62: ['Precisos', 'fríos'], 63: ['Escépticos', 'cínicos'], 64: ['Evocadores', 'nostálgicos'] };
// A primary colour that ALMA already uses for a state: the entity keeps it, and the state keeps its icon and its word.
const ESTADO = { rojo: 'los errores y las acciones destructivas', verde: 'los éxitos', amarillo: 'las advertencias', ámbar: 'las advertencias', naranja: 'las advertencias' };
const pesoDe = (w) => (w < 250 ? 'muy liviano' : w < 350 ? 'liviano' : w < 450 ? 'regular' : w < 550 ? 'medio' : w < 650 ? 'firme' : 'fuerte');

// What the hour of birth decides: the charts of the 24 hours of that day, compared with the real one.
function horasDelDia(nac, C) {
  const dia = Array.from({ length: 24 }, (_, h) => calcularCarta({ ...nac, hora: String(h).padStart(2, '0') + ':00' }));
  const igual = (f) => dia.every((c) => f(c) === f(C));
  const otros = [], hh = (h) => String(h).padStart(2, '0') + ':00';
  dia.forEach((c, h) => {
    if (c.perfil === C.perfil) return;
    const u = otros[otros.length - 1];
    if (u && u.perfil === c.perfil && u.hasta === h - 1) u.hasta = h; else otros.push({ perfil: c.perfil, desde: h, hasta: h });
  });
  return { otros: otros.map((o) => `${o.perfil} (${o.desde === o.hasta ? 'a las ' + hh(o.desde) : 'entre las ' + hh(o.desde) + ' y las ' + hh(o.hasta)})`),
    tipo: igual((c) => c.tipo), autoridad: igual((c) => c.autoridad), centros: igual((c) => c.definidos.join()), cruz: igual((c) => c.cruz.puertas.join()) };
}

export function borrador({ id, nombre, nacimiento, lugar, colorHeredado, hoy }, P) {
  const C = calcularCarta(nacimiento), V = generarVoz(C), PR = generarPrincipios(C);
  const [solP, tierraP, solD, tierraD] = C.cruz.puertas, [lc, li] = C.perfil.split('/').map(Number);
  const T = TIPO[C.tipo], A = AUT[C.autoridad], tema = (n) => PUERTAS[n].tema;
  const definidos = C.definidos.map((c) => CENTROS.find((x) => x.id === c).nombre), garganta = C.definidos.includes('garganta');
  const [y, m, d] = nacimiento.fecha.split('-').map(Number), hora = nacimiento.hora || '12:00', mes = MESES[m - 1];
  const sitio = lugar || nacimiento.zona.split('/').pop().replace(/_/g, ' ');
  const fechaLarga = `${d} de ${mes} de ${y}, ${hora}, ${sitio}`;
  const primario = P.palette[0].name.split(' ')[0].toLowerCase(), deep = !!P.accent.deep;
  const W = P.weights, vel = P.motion.speed, pct = Math.round(Math.abs(vel - 1) * 100), productivo = P.motion.motion !== 'expresivo';
  const ritmo = vel > 1 ? `un ${pct} % más lento que la base de ALMA` : vel < 1 ? `un ${pct} % más rápido que la base de ALMA` : 'al mismo ritmo que la base de ALMA';
  // The three attributes of the voice, each with the gate it comes from (the same order entidades/voz.mjs reads them).
  const candidatas = [...new Set([solP, solD, ...C.canales.flatMap((k) => k.puertas), tierraP, tierraD])];
  const atr = V.adjetivos.map((a) => { const n = candidatas.find((g) => PUERTAS[g].voz === a); return { n, adj: a, plural: ATR[n][0], limite: ATR[n][1] }; });
  const somos = lista(atr.map((a) => a.plural.toLowerCase()));
  // Three verbs for the opening line: the first word of what its cross is about.
  const verbos = [...new Set([solP, tierraP, solD, tierraD].map((n) => may(tema(n).split(' ')[0])))].slice(0, 3);
  const titulos = PR.map((p) => p.titulo);
  const H = horasDelDia(nacimiento, C), choque = !colorHeredado && ESTADO[primario];
  const fijos = [H.tipo && `el tipo, ${T.n}`, H.autoridad && `la autoridad ${A.n}`, H.centros && (definidos.length ? `los centros ${lista(definidos)} definidos` : 'todos los centros abiertos'), H.cruz && 'la cruz {cruz}'].filter(Boolean);
  const cambian = [!H.tipo && 'el tipo', !H.autoridad && 'la autoridad', !H.centros && 'los centros definidos', !H.cruz && 'la cruz'].filter(Boolean);
  const color = colorHeredado
    ? { titulo: `El ${primario} que trajimos`, parrafos: [`El ${primario} ya era nuestro antes de este lenguaje, así que lo heredamos tal cual. La carta decide todo lo demás: la armonía alrededor, los colores de apoyo y cómo se comporta el acento.`, 'ALMA, el sistema base, queda neutro. Cada entidad lo viste con su propia paleta.'] }
    : choque
      ? { titulo: `Un ${primario} que ALMA ya usaba`, parrafos: [`Nuestra carta da un acento ${primario}, y en ALMA el ${primario} ya tiene un papel: ${choque}. No cambiamos el color para evitar el cruce. Lo resolvemos con las reglas de siempre: un estado lleva su ícono y su palabra, y una acción dice exactamente qué hace.`, `ALMA, el sistema base, queda neutro. Cada entidad lo viste con su propia paleta: la nuestra es la del ${primario}.`] }
      : { titulo: `De dónde sale el ${primario}`, parrafos: [`No elegimos el ${primario}: lo da nuestra carta. El tono viene de la autoridad ${A.n}; la armonía alrededor, del tipo; y la profundidad del acento, de la Garganta.`, `ALMA, el sistema base, queda neutro. Cada entidad lo viste con su propia paleta: la nuestra es la del ${primario}.`] };

  return {
    id, nombre, nacimiento: { fecha: nacimiento.fecha, hora, zona: nacimiento.zona }, fechaLarga,
    ...(colorHeredado ? { colorHeredado } : {}),
    aviso: `Borrador automático. Estos textos se escribieron solos a partir de la carta de ${nombre} (${fechaLarga}). Lo que viene de la carta, como los principios, la voz, la letra, el color y el movimiento, ya es suyo. Los ejemplos de producto son genéricos, sobre proyectos: falta reemplazarlos por los de su oficio.`,
    borrador: { fecha: hoy || new Date().toISOString().slice(0, 10), revisar: ['aviso', 'muestra', 'inicio', 'puntoDeVista', 'tono', 'escritura', 'ilustracion', 'fotografia', 'datos', 'producto', 'comunicacion'] },
    muestra: { eyebrow: 'Proyectos', titulo: 'Proyecto de ejemplo, versión 2', texto: V.ejemplos[0].si, primaria: 'Abrir proyecto', secundaria: T.secundaria,
      parrafo: `${T.como[1]} ${A.como[1]}`, enfasis: ['El proyecto tiene ', '3 tareas', ' pendientes.'] },
    inicio: { titulo: verbos.join(' → '), lede: `Este es el ethos detrás de nuestra filosofía y de cada uno de nuestros principios. Creemos en ${tema(solP)}, y en que para eso hace falta ${tema(tierraP)}.` },
    puntoDeVista: {
      lede: 'Lo que creemos define lo que hacemos. Esta es la base de todo lo que diseñamos, desde un botón hasta una marca entera.',
      bloques: [
        { p: `Existimos para ${tema(solP)}. Es lo que buscamos en cada cosa que hacemos, y la medida con la que revisamos lo que ya hicimos.` },
        { p: `Lo que nos sostiene es ${tema(tierraP)}. Sin eso, lo primero se queda en intención.` },
        { s: `${sinPunto(PUERTAS[solP].principio)}.` },
        { p: `Hay dos cosas que no elegimos y que igual nos mueven: ${tema(solD)} y ${tema(tierraD)}. Se notan más en cómo trabajamos que en lo que decimos.` },
        { p: T.pv },
        { s: verbos.slice(0, 2).join(' → ') },
        { p: A.pv },
        { p: 'Todo lo que hacemos es esto. Todo lo que diseñamos también.' },
        { q: `Toda experiencia con nosotros debería sentirse ${lista(V.adjetivos)}.` }
      ],
      origen: `La cruz {cruz}: ${[solP, tierraP, solD, tierraD].map((n) => `${tema(n)} (${n})`).join(', ')}. Autoridad ${A.n}: ${A.breve}.`
    },
    principios: {
      lede: 'Nuestros principios son criterios para crear y para evaluar. Los usa quien diseña, quien escribe y quien aprueba: cualquier persona que decida algo en nuestro nombre.',
      items: PR.map((p) => ({ t: p.titulo,
        p: `${p.texto.replace('Su propósito', 'Nuestro propósito').replace('También la mueve', 'También nos mueve')} En la interfaz: ${minus(p.interfaz)}`,
        q: [...p.puertas.map((n) => `¿Esto ayuda a ${tema(n)}?`), '¿Una persona que llega por primera vez lo nota?', '¿Qué quitaríamos si este fuera nuestro único principio?'] })),
      cierre: `Una prueba final: después de usarnos, ¿la persona nos describiría como ${somos}?`
    },
    prisma: {
      lede: 'Nuestras seis caras, ordenadas en el prisma de identidad: lo que mostramos y lo que llevamos dentro, lo que emitimos y lo que provocamos en quien nos recibe.',
      caras: [
        { k: 'Físico', q: 'Lo que se ve', t: `Un ${primario} sobre negro, letra ${LC[lc].letra} y de peso ${pesoDe(W.display)} en los titulares, esquinas ${LI[li].esquinas} de ${P.shape.base} px y una firma que una regla dibuja: criaturas, colonias y un campo en movimiento.`, o: `Garganta ${garganta ? 'definida' : 'abierta'} · línea ${lc} · línea ${li} · definición ${C.definicion}` },
        { k: 'Personalidad', q: 'Cómo somos', t: `${may(somos)}. ${LC[lc].como[1]}`, o: `Puertas ${lista(atr.map((a) => a.n))}` },
        { k: 'Relación', q: 'Cómo nos vinculamos', t: T.relacion, o: `${T.n} · línea ${lc} · línea ${li}` },
        { k: 'Cultura', q: 'Lo que valoramos', t: `${lista(titulos.map((t, i) => (i ? minus(t) : t)))}.`, o: C.canales.length ? `Canal${C.canales.length > 1 ? 'es' : ''} ${lista(C.canales.map((k) => k.id))}` : 'Cruz {cruz}' },
        { k: 'Reflejo', q: 'A quién le hablamos', t: `A alguien que quiere ${tema(solP)} y no se conforma con menos.`, o: `Sol en la ${solP}` },
        { k: 'Autoimagen', q: 'Cómo se siente quien nos usa', t: `Capaz de ${tema(tierraP)}, y con ganas de volver.`, o: `Tierra en la ${tierraP}` }
      ],
      lectura: 'La columna izquierda es lo que cualquiera puede ver: nuestra forma, cómo nos vinculamos y a quién le hablamos. La derecha es lo que llevamos dentro: el carácter, los valores y lo que dejamos en las personas. Cuando las dos columnas dicen lo mismo, la marca es creíble. Cuando no, algo en el diseño está mintiendo.'
    },
    voz: {
      lede: `Nuestra voz es una sola, hablemos donde hablemos. Somos ${lista(atr.map((a) => `${a.plural.toLowerCase()} sin ser ${a.limite}`))}.`,
      atributos: atr.map((a) => [a.plural, `no ${a.limite}`, `Nos mueve ${tema(a.n)}. ${PUERTAS[a.n].interfaz} Cuando nos pasamos, sonamos ${a.limite}: ahí hay que volver atrás.`, `Puerta ${a.n}`]),
      como: [{ t: A.como[0], p: A.como[1] }, { t: LC[lc].como[0], p: LC[lc].como[1] }, { t: T.como[0], p: T.como[1] },
        garganta ? { t: 'Con voz definida', p: 'Tenemos una forma propia de decir las cosas, y no cambia según quién escuche.' } : { t: 'Escuchando primero', p: 'Adaptamos el tono a quien tenemos enfrente y no nos apuramos en llenar un silencio.' }],
      comoOrigen: `Autoridad ${A.n} · línea consciente ${lc} · ${T.n} · Garganta ${garganta ? 'definida' : 'abierta'}.`,
      quien: 'Hablamos en plural, como el equipo que está detrás de cada pantalla, y tratamos de tú. Nunca hablamos de nosotros en tercera persona.',
      ex: { si: { title: 'No pudimos guardar el proyecto', message: V.ejemplos[1].si, cap: `Así suena un error nuestro: ${A.breve}.` }, no: { title: '¡Ups! Algo salió mal.', message: 'Inténtalo de nuevo.', cap: 'Nunca dejes un error sin causa ni salida.' } }
    },
    tono: {
      lede: 'La voz no cambia; el tono sí. Leemos en qué momento está la persona y nos ajustamos: más ánimo al empezar, más exactitud cuando algo falla.',
      filas: [
        ['Bienvenida', 'Animado', 'Lo mínimo', V.ejemplos[2].si],
        ['Acción principal', 'Claro', 'Qué va a pasar', V.ejemplos[0].si],
        ['Error', 'Calmo', 'Qué pasó y qué hacer', '{error}'],
        ['Acción irreversible', 'Firme', 'Todo, sin presión', `Se eliminarán el proyecto y sus 12 tareas. No se podrán recuperar. ${A.irreversible}`],
        ['Éxito', 'Sobrio', 'Una línea', 'Listo. El proyecto quedó guardado.'],
        ['Anuncio', 'Propio', 'Qué cambia y para quién', `${titulos[0]}: lo nuevo de ${mes}.`]
      ],
      cuanto: 'Mientras más está en juego, más exactos somos. En un éxito basta una línea; en un error decimos qué pasó y cómo se arregla; antes de algo irreversible decimos exactamente qué se pierde. Nunca usamos el tono para presionar.',
      ex: { si: { eyebrow: 'Acción irreversible', title: 'Eliminar el proyecto', body: 'Se eliminarán el proyecto y sus 12 tareas. No se podrán recuperar.', primary: 'Eliminar proyecto', secondary: 'Cancelar', cap: 'Firme y exacto: qué se pierde, y una salida.' },
        no: { eyebrow: '¡Atención!', title: '¿Seguro que quieres hacer esto?', primary: 'Sí', secondary: 'No', cap: 'Evita las confirmaciones vagas: no dicen qué se pierde.' } },
      nunca: [A.nunca, 'Nunca dejes un error sin su causa y su salida.', `Que ser ${atr[0].plural.toLowerCase()} nunca nos vuelva ${atr[0].limite}.`, 'Evita las exclamaciones y los emojis en un error o una advertencia.']
    },
    escritura: {
      lede: `Reglas para que cualquier persona escriba como nosotros: ${somos}.`,
      reglas: [
        ['Botones con verbo y objeto', 'Abrir proyecto · Invitar al equipo', 'La acción se entiende sin leer nada más.'],
        T.regla,
        [LC[lc].como[0], sinPunto(V.ejemplos[2].si), LC[lc].como[1]],
        ['La causa, no el síntoma', 'No se guardó porque se perdió la conexión', 'Un error que se explica se puede arreglar.'],
        ['Cifras exactas', '3 de 12 tareas', '«Varias» no le sirve a nadie.'],
        ['Tuteo, sin exclamaciones', 'Vuelve a intentarlo cuando quieras.', 'La calma también se escribe.'],
        ['Mayúscula solo al inicio', 'Proyecto de ejemplo · Ver la versión anterior', 'Leemos más rápido en tipo oración.']
      ],
      ex: { si: { title: '3 tareas pendientes en el proyecto', body: 'Dos son de esta semana y una está atrasada. Puedes verlas en cualquier orden.', primary: 'Ver 3 tareas', cap: 'Cifra exacta, de qué son y el control en manos de la persona.' },
        no: { title: '¡Tienes cosas pendientes!', body: 'Hay varios problemas.', primary: 'Arreglar todo', cap: 'Evita el juicio vago, la exclamación y el botón que decide por la persona.' } },
      palabras: [T.palabras, ['Porque, la razón es', 'Algo salió mal'], ['3 de 12, el 4 de mayo', 'Varios, pronto']],
      formatos: [
        ['Fechas.', `«${d} ${mes.slice(0, 3)} ${y}» en tablas y etiquetas; «${d} de ${mes} de ${y}» en texto corrido.`],
        ['Horas.', 'Formato de 24 horas: 12:00, 18:30.'],
        ['Unidades.', 'Con espacio: 18 %, 12 px, 320 tareas.'],
        ['Números grandes.', 'Con punto de miles: 2.026 proyectos.']
      ]
    },
    firma: {
      lede: 'Nuestra firma no es un dibujo fijo. Es una familia de piezas que una regla dibuja a partir de nuestra carta y de nuestra fecha de nacimiento: un campo, un carrusel, un micelio, criaturas, colonias, emblemas y caras de tarjeta. Acompaña al nombre; no lo reemplaza.',
      construccion: 'Funciona como un juego que dibuja su mundo desde una semilla. La carta da las reglas: los colores, las puntas, los focos, el ritmo. La fecha de nacimiento da la semilla. Una clave, que puede ser un nombre, un concepto o un número, elige un dibujo entre infinitos, y la misma clave da siempre el mismo.',
      color: `Las piezas viven sobre negro, con la paleta completa y el ${primario} como acento: en la marca de cada emblema, también en los que forman el campo, y en las criaturas más chicas de una colonia. Solo la colonia y el relieve tienen una versión apagada para ir detrás de un texto.`,
      movimiento: `El campo, el carrusel y el micelio se mueven ${ritmo}. Siempre se pueden pausar y se detienen solos al salir de la pantalla. Si la persona pidió menos movimiento, parten quietos y completos.`
    },
    tipografia: {
      lede: `La tipografía es nuestra voz hecha forma. Escribimos en Roboto Flex, ${LC[lc].letra} y de peso ${pesoDe(W.display)} en los titulares.`,
      letra: `Roboto Flex es una tipografía variable: su ancho, su peso y su grado se ajustan por eje. Nosotros la usamos con ancho {ancho} y pesos {pesos}. ${LC[lc].porque}`,
      pesos: [`Titulares grandes. De peso ${pesoDe(W.display)}.`, `Títulos de sección. De peso ${pesoDe(W.heading)}.`, 'Lectura larga e interfaz.', 'Énfasis: una palabra o frase clave por párrafo.'],
      escala: [verbos.join(' → '), sinPunto(PUERTAS[solP].principio), ...[0, 1, 2, 3].map((i) => titulos[i] || `${atr[i % 3].plural}, no ${atr[i % 3].limite}`),
        `${T.como[1]} ${LC[lc].porque}`, 'Texto de interfaz, descripciones y tablas.', 'Etiquetas y controles', 'Notas, fuentes y leyendas.'],
      origen: `Línea consciente ${lc} (ancho {ancho}) · autoridad ${A.n} (pesos {pesos}) · línea ${li} (grado ${P.fontGrade < 0 ? 'más liviano' : P.fontGrade > 0 ? 'más firme' : 'normal'}).`
    },
    fundamentos: { lede: 'La buena tipografía pasa inadvertida porque simplemente funciona. Estas son las prácticas que hacen que un texto nuestro se lea bien, en cualquier tamaño y en español.' },
    color: {
      lede: `Nuestra paleta parte ${colorHeredado ? `del ${primario}, el color que ya era nuestro,` : `de un ${primario} que salió de nuestra carta,`} y se extiende hacia sus vecinos. Sobre negro, el ${primario} aparece donde se puede actuar, y por eso se reconoce.`,
      centro: colorHeredado ? `El ${primario} lo trajimos con nosotros. La carta decide todo lo demás: la armonía alrededor, los colores de apoyo y cómo se comporta el acento.` : `El ${primario} salió de nuestra carta: el tono viene de la autoridad ${A.n}, y la saturación, de ${definidos.length} centros definidos.`,
      neutros: `El negro y los neutros de ALMA dominan toda experiencia. Sobre ellos, el ${primario} marca una sola cosa por pantalla. Si una pantalla se siente de color ${primario}, tiene demasiado.`,
      interfaz: `Los neutros ordenan; el ${primario} marca la acción principal en todos los productos, ${deep ? 'con texto blanco' : 'con texto oscuro, porque es un color luminoso'}.${choque ? ` En ALMA, el ${primario} también es el color de ${choque}: por eso un estado siempre lleva su ícono y su palabra, y nunca se parece a un botón.` : ' Los demás colores se usan poco y con un propósito.'}`,
      daltonismo: 'Nunca usamos solo el color para comunicar: un estado lleva icono y texto, una serie lleva etiqueta, un enlace se distingue también por su forma. Dos colores de la paleta nunca se usan solos para separar dos cosas.',
      accion: `Trazos de ${primario} sobre negro: así se ve la paleta en la galería de producto y comunicación.`,
      origen: `Autoridad ${A.n} (tono). Armonía del ${T.n}, saturación por ${definidos.length} centros definidos, acento ${deep ? 'profundo' : 'luminoso'} por la Garganta ${garganta ? 'definida' : 'abierta'}.`
    },
    grilla: {
      lede: 'La grilla es la estructura de todo lo que mostramos. Da el orden que necesita una página para leerse: cuando todo tiene su lugar, la atención puede ir al contenido.',
      espacio: 'Mientras más larga la lectura, más margen alrededor. Lo que va junto se ve junto, y lo que es distinto se separa con espacio antes que con líneas.',
      forma: `Nuestras esquinas son ${LI[li].esquinas}, de {radio}. ${LI[li].porque} La casilla de verificación conserva sus esquinas, para seguir leyéndose como control.`,
      ex: { siCap: `Esquinas ${LI[li].esquinas} de {radio}, separación con espacio y todo alineado.`, noCap: 'Evita mezclar radios, las sombras decorativas y los elementos fuera de la grilla.' },
      avoid: ['No mezcles dos radios distintos en una misma pantalla.', 'No uses sombras para separar: usa espacio o una línea de 1 px.', 'No saques un elemento de la grilla para llamar la atención.'],
      origen: `Línea inconsciente ${li}: ${LI[li].carta}.`
    },
    iconografia: {
      lede: 'Un icono es una señal exacta. Representa una idea o una acción de un vistazo, sin dejar dudas.',
      principios: [
        { t: 'Claros', p: 'Un icono, un significado. Siempre el mismo icono para la misma idea en todos los productos.' },
        { t: 'Exactos', p: choque ? `El icono de estado solo acompaña a su estado. Como nuestro acento también es ${primario}, el icono es lo que distingue un estado de una acción.` : 'El icono de estado solo acompaña a su estado: un error, una advertencia, un éxito.' },
        { t: 'Acompañados', p: 'Un icono acompaña al texto; no lo reemplaza. Solo va solo en barras de herramientas, y entonces lleva una etiqueta accesible.' }
      ],
      ex: { boton: 'Descargar proyecto', texto: `Última versión: ${d} ${mes.slice(0, 3)}` }
    },
    ilustracion: {
      lede: 'Ilustramos para explicar. Un dibujo nuestro muestra una estructura, un cambio o un proceso que no se ve a simple vista.',
      puntoDeVista: 'Si la fotografía muestra a las personas, la ilustración muestra las ideas. Cada ilustración explica una sola idea y deja espacio alrededor.',
      estilos: [
        { t: 'Línea', p: `El estilo principal. Trazos de grosor uniforme con esquinas ${LI[li].esquinas}, sobre la grilla de 8 px. Ideal para estructuras y procesos.` },
        { t: 'Interfaz', p: 'Fragmentos de nuestra propia interfaz, simplificados, para explicar una función. Siempre con componentes de ALMA.' },
        { t: 'Criaturas', p: 'Nuestros personajes. Cada uno son dos formas redondas y dos ojos, con los colores de la paleta, y el mismo nombre da siempre la misma criatura. Sirven de avatar, de mascota de una pieza y, amontonadas, de textura.' }
      ],
      personas: 'Cuando dibujamos personas, las mostramos haciendo algo, concentradas. Siluetas simples y diversas, sin caricatura.',
      color: `El ${primario} para lo que importa, negro y neutros para el resto, {secundario} y {terciario} solo como apoyo. Una ilustración nunca usa más de tres colores de la paleta. Las criaturas son la excepción: una sola lleva dos colores sobre negro, y una textura de criaturas puede usar la paleta completa.`,
      avoid: ['Evita las metáforas gastadas: bombillas, cohetes, apretones de manos.', 'Evita que una criatura dé un error, un aviso o una instrucción: eso va con texto y un icono.', 'Evita los personajes ajenos y los que imitan a una persona real.', 'Evita ilustrar lo que una frase ya explica.'],
      generativa: {
        nombres: ['Ana Rojas', 'Luis Soto', 'Marta Díaz', 'Pedro Vera', 'Camila Paz', 'Tomás Mora', 'Elena Lagos', 'Raúl Pino', 'Sofía Reyes', 'Iván Silva', 'Noa Campos', 'Diego Vidal'],
        conceptos: ['proyecto', 'idea', 'equipo', 'versión', 'pregunta', 'avance', 'acuerdo', 'entrega', 'comienzo', 'detalle', 'ritmo', 'cierre']
      }
    },
    fotografia: {
      lede: 'Nuestras imágenes muestran el trabajo de verdad: personas, manos, mesas y herramientas, tal como son.',
      puntoDeVista: 'Fotografiamos el proceso antes que el resultado. Una buena imagen nuestra muestra a alguien haciendo algo que le importa, sin posar.',
      tipos: [
        { t: 'Oficio: el trabajo en proceso', p: 'La mayor parte de nuestras imágenes. Lo que se está haciendo, a medio camino.' },
        { t: 'Personas: la atención', p: 'Personas trabajando, fotografiadas sin interrumpir. La concentración es el tema.' },
        { t: 'Detalle: lo exacto', p: 'Un gesto o un objeto de cerca, con foco exacto.' }
      ],
      tecnica: [['Encuadre.', 'Con margen alrededor del sujeto, espacio libre para texto y líneas que siguen la grilla.'], ['Luz.', 'Natural y lateral. Sin flashes ni luces de colores.'], ['Color.', `Fiel a la realidad, con negros profundos. El ${primario} aparece en la composición, no en un filtro.`], ['Tiempo.', productivo ? 'Momentos de concentración, nunca de apuro.' : 'Momentos de acción, con el gesto a medio hacer.']],
      avoid: ['Evita las fotos de banco con sonrisas a cámara.', 'Evita las imágenes de estrés o de fecha límite.', 'Evita los montajes y los fondos inventados.']
    },
    datos: {
      lede: 'Mostramos los datos para que la persona vea lo que no se ve a simple vista: cuánto, dónde y cómo cambió.',
      criterios: [
        { t: 'Exactas', p: 'Cada marca corresponde a su valor. Los ejes empiezan en cero cuando se comparan cantidades, y las proporciones nunca se exageran.' },
        { t: 'Con su antes', p: 'Comparamos con el período anterior. Un dato sin su antes no dice si algo mejoró.' },
        { t: 'Sin alarma', p: choque ? `Nuestro acento es ${primario}, así que en un gráfico el ${primario} es una serie más. Un estado se marca con su ícono y su palabra.` : 'Un problema se marca con su ícono y su palabra, nunca solo con un color.' },
        { t: 'En tus manos', p: 'Qué medir y qué comparar lo elige la persona. Le damos el control de lo que quiere mirar.' }
      ],
      ejemplo: { titulo: 'Tareas resueltas por semana', barras: [['Sem. 1', 12], ['Sem. 2', 7], ['Sem. 3', 4], ['Sem. 4', 9, true]], fuente: 'Fuente: proyecto de ejemplo. Sem. 4: semana en curso.' },
      avoid: ['No cortes un eje para exagerar una diferencia.', 'No uses el color solo para decir que algo está mal.', 'No muestres una cifra sin decir de dónde sale.'],
      origen: `Puerta ${solP} (${tema(solP)}), puerta ${tierraP} (${tema(tierraP)}).`
    },
    movimiento: {
      lede: `Nuestro movimiento va ${ritmo}. Muestra qué cambió y después se queda quieto.`,
      enfoque: [
        { t: T.mov[0], p: T.mov[1] },
        { t: 'Exacto', p: 'El movimiento apunta al lugar: lo que cambió, lo que se abre. Nada se mueve lejos de lo que explica.' },
        { t: 'Explicativo', p: 'Cada movimiento responde una pregunta: qué cambió, de dónde viene, qué sigue. Si no explica nada, no se mueve.' },
        { t: 'Respetuoso', p: 'Nunca usamos el movimiento para llamar la atención con urgencia: nada parpadea, nada tiembla.' }
      ],
      curvas: `ALMA tiene dos curvas: productiva, eficiente y precisa, y expresiva, con más carácter. ${productivo ? 'La productiva es la nuestra en toda la interfaz. La expresiva queda para la firma y las portadas, donde un momento de carácter ayuda a contar algo.' : 'La expresiva es la nuestra: cada cambio se deja ver completo. La productiva queda para lo que se repite muchas veces, como una tabla o un menú.'}`,
      aplicaciones: [['Comparar.', 'Al cambiar de versión, lo que se quitó se va y lo nuevo llega, para que el cambio se vea.'], ['Orientar.', 'Un panel que se abre muestra de dónde viene.'], ['Presentar.', 'El campo, el carrusel y el micelio abren portadas y bienvenidas, a nuestro ritmo.']],
      avoid: ['No uses parpadeos ni temblores para llamar la atención.', 'No uses rebotes ni escalas exageradas.', 'No muevas el texto que la persona está leyendo.'],
      origen: `${T.n} · autoridad ${A.n}: ${A.breve}.`
    },
    producto: {
      lede: 'Una pantalla de proyectos con nuestro lenguaje. Solo componentes de ALMA: lo que cambia son los tokens y las palabras.',
      pantalla: {
        titulo: 'Proyectos', secundaria: T.secundaria, primaria: 'Ver 3 tareas',
        aviso: { status: 'info', title: 'El proyecto de ejemplo tiene 3 tareas pendientes', message: 'Dos son de esta semana y una está atrasada. Puedes verlas en cualquier orden.' },
        tabla: 'Proyectos',
        columnas: [{ key: 'p', label: 'Proyecto' }, { key: 'e', label: 'Estado' }, { key: 'v', label: 'Versión' }, { key: 'f', label: 'Tareas' }],
        filas: [{ p: 'Proyecto uno', e: 'Terminado', v: '4', f: '0' }, { p: 'Proyecto dos', e: 'Terminado', v: '3', f: '0' }, { p: 'Proyecto de ejemplo', e: 'Con tareas', v: '2', f: '3' }, { p: 'Proyecto cuatro', e: 'Recién creado', v: '1', f: '—' }],
        pie: 'Entre la versión 1 y la 2 del proyecto de ejemplo se resolvieron 9 de 12 tareas.'
      },
      mapa: [['El número exacto de tareas', `${titulos[0]}: la cifra y de qué son.`], [`«${T.secundaria}» junto a la acción principal`, T.mapa], ['La nota sobre lo resuelto entre versiones', `${titulos[titulos.length - 1]}: mostrar el avance.`], ['Una sola acción principal', `Un ${primario} por pantalla.`]]
    },
    comunicacion: {
      lede: 'Cuando anunciamos algo: la firma más la voz, en tres formatos.',
      portada: { eyebrow: `Lo nuevo de ${mes}`, titulo: sinPunto(PUERTAS[solP].principio), texto: `${PUERTAS[solP].interfaz} ${PUERTAS[tierraP].interfaz}`, boton: 'Conocer lo nuevo' },
      cuadrado: { titulo: `${titulos[0]}.`, texto: `${may(tema(tierraP))}.` },
      historia: { titulo: `${verbos[0]}.`, texto: `${lista(verbos.map((v, i) => (i ? v.toLowerCase() : v)))}.` }
    },
    carta: {
      tipo: T.carta,
      perfil: `Consciente: ${LC[lc].carta}. Inconsciente: ${LI[li].carta}.`,
      autoridad: A.carta,
      definicion: `${DEF[C.definicion]}${definidos.length ? ` Centros definidos: ${lista(definidos)}.` : ''}`,
      centros: definidos.length ? `${may(lista(C.definidos.map((c) => CENTRO[c])))}: lo que en nosotros es fijo y no cambia según quién llega.` : 'Ningún centro definido: una entidad que toma la forma de su entorno.'
    },
    fecha: {
      lede: 'Nacimos el {fechaLarga}. Es nuestra fecha real: para una marca nueva, la fecha manda.',
      secciones: [
        { titulo: 'Lo que decide la hora', bullets: [
          [`${hora}.`, `A esa hora nuestro perfil es {perfil}.${H.otros.length ? ` Ese mismo día, a otra hora, sería ${lista(H.otros)}.` : ' A cualquier hora de ese día sería el mismo.'}`],
          ['Lo que no depende de la hora.', fijos.length ? `A cualquier hora de ese día se mantienen ${lista(fijos)}.` : 'Ese día casi todo depende de la hora: por eso la registramos con exactitud.'],
          ['Lo que sí depende.', `El perfil ({perfil}), y con él las esquinas ({radio}) y el ancho de la letra ({ancho}).${cambian.length ? ` Ese día también cambian con la hora ${lista(cambian)}.` : ''}`]
        ] },
        color
      ],
      aviso: { title: 'La fecha manda', message: 'Para una marca nueva, manda su fecha real. La misma fecha siempre da la misma entidad.' }
    }
  };
}
