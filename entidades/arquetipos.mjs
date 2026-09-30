// The archetype of each gate and channel, written for brands. Each gate starts from its I Ching hexagram (public domain)
// and reads it as: a theme, a voice adjective, a principle and how that principle shows in an interface.
// Used by entidades/voz.mjs to write an entity's voice and principles from its chart.

// [hexagram, theme, voice, principle, in the interface]
const P = {
  1: ['Lo Creativo', 'expresarse con originalidad', 'original', 'Hacerlo a su manera', 'Una firma propia que se reconoce en cada pantalla.'],
  2: ['Lo Receptivo', 'saber hacia dónde ir', 'receptiva', 'Mostrar la dirección', 'Caminos claros y un siguiente paso evidente.'],
  3: ['La Dificultad Inicial', 'ordenar lo nuevo', 'innovadora', 'Poner orden en lo nuevo', 'Lo complejo llega por pasos.'],
  4: ['La Necedad Juvenil', 'encontrar respuestas', 'lógica', 'Dar respuestas que se entienden', 'Cada decisión explica su porqué.'],
  5: ['La Espera', 'sostener un ritmo', 'constante', 'Respetar el ritmo', 'Patrones predecibles: nada cambia de lugar sin aviso.'],
  6: ['El Conflicto', 'cuidar el contacto', 'diplomática', 'Cuidar el roce', 'Confirmaciones amables antes de lo irreversible.'],
  7: ['El Ejército', 'conducir', 'conductora', 'Guiar con un rol claro', 'Una acción principal por vista.'],
  8: ['La Solidaridad', 'aportar', 'generosa', 'Aportar algo propio', 'Cada pieza suma al conjunto.'],
  9: ['La Fuerza Domesticadora de lo Pequeño', 'enfocarse en el detalle', 'minuciosa', 'Cuidar los detalles', 'Interacciones pequeñas y precisas.'],
  10: ['El Porte', 'ser coherente', 'auténtica', 'Actuar como se es', 'Lo que dice y lo que hace coinciden.'],
  11: ['La Paz', 'tener ideas', 'imaginativa', 'Compartir las ideas', 'Espacio para explorar.'],
  12: ['El Estancamiento', 'elegir el momento', 'cuidadosa', 'Hablar cuando importa', 'Mensajes solo cuando hacen falta.'],
  13: ['La Comunidad con los Hombres', 'escuchar', 'atenta', 'Escuchar antes de hablar', 'Recordar lo que la persona ya hizo.'],
  14: ['La Posesión de lo Grande', 'poner recursos en juego', 'capaz', 'Poner la fuerza al servicio', 'Herramientas potentes y fáciles de usar.'],
  15: ['La Modestia', 'incluir a todos', 'humilde', 'Hacer lugar para todos', 'Accesible para cualquier persona.'],
  16: ['El Entusiasmo', 'dominar un oficio', 'entusiasta', 'Practicar hasta dominar', 'Mejoras constantes y visibles.'],
  17: ['El Seguimiento', 'formar opinión', 'argumentativa', 'Opinar con fundamento', 'Recomendaciones que dicen por qué.'],
  18: ['La Corrección de lo Echado a Perder', 'mejorar lo que existe', 'crítica', 'Corregir lo que no funciona', 'Errores que se explican y se arreglan.'],
  19: ['El Acercamiento', 'atender necesidades', 'sensible', 'Atender lo que se necesita', 'Anticipar lo que la persona va a necesitar.'],
  20: ['La Contemplación', 'estar presente', 'presente', 'Actuar en el momento', 'Respuestas inmediatas.'],
  21: ['La Mordedura Tajante', 'tener el control', 'firme', 'Dar el control', 'La persona decide y puede volver atrás.'],
  22: ['El Encanto', 'tener gracia', 'elegante', 'Encantar con gracia', 'Detalles bellos que no estorban.'],
  23: ['La Desintegración', 'simplificar', 'clara', 'Quitar lo que sobra', 'Cada pantalla con lo mínimo necesario.'],
  24: ['El Retorno', 'volver sobre las ideas', 'reflexiva', 'Volver a pensar', 'Siempre se puede deshacer y retomar.'],
  25: ['La Inocencia', 'actuar de buena fe', 'inocente', 'Actuar con buena fe', 'Sin trucos ni patrones engañosos.'],
  26: ['La Fuerza Domesticadora de lo Grande', 'convencer', 'persuasiva', 'Convencer con lo mejor', 'El valor se muestra antes de pedir algo.'],
  27: ['La Nutrición', 'cuidar', 'protectora', 'Cuidar a los demás', 'Proteger los datos y el tiempo de la persona.'],
  28: ['La Preponderancia de lo Grande', 'jugársela por lo que tiene sentido', 'valiente', 'Arriesgar por lo que importa', 'Caminos atrevidos, siempre con red.'],
  29: ['Lo Abismal', 'comprometerse', 'comprometida', 'Comprometerse del todo', 'Terminar lo que se empieza.'],
  30: ['Lo Adherente', 'desear', 'apasionada', 'Encender el deseo', 'Momentos que emocionan.'],
  31: ['El Influjo', 'influir', 'influyente', 'Liderar con el ejemplo', 'Mostrar el camino con casos reales.'],
  32: ['La Duración', 'perdurar', 'prudente', 'Durar en el tiempo', 'Lo que funciona no se cambia por cambiar.'],
  33: ['La Retirada', 'recordar', 'reservada', 'Retirarse para recordar', 'Historial disponible y privacidad cuidada.'],
  34: ['El Poder de lo Grande', 'hacer con fuerza', 'enérgica', 'Hacer con toda la fuerza', 'Rendimiento que se siente.'],
  35: ['El Progreso', 'buscar experiencias', 'curiosa', 'Probar lo nuevo', 'Novedades que invitan a probar.'],
  36: ['El Oscurecimiento de la Luz', 'atravesar crisis', 'intensa', 'Acompañar en la crisis', 'Presencia en los momentos difíciles.'],
  37: ['La Familia', 'hacer acuerdos', 'cercana', 'Cuidar los acuerdos', 'Tratos claros y justos.'],
  38: ['El Antagonismo', 'luchar por algo', 'tenaz', 'Defender lo que vale', 'La persona siempre tiene quien la defienda.'],
  39: ['El Impedimento', 'provocar', 'provocadora', 'Provocar el cambio', 'Preguntas que despiertan.'],
  40: ['La Liberación', 'cumplir y descansar', 'resuelta', 'Cumplir y soltar', 'Tareas que se cierran de verdad.'],
  41: ['La Merma', 'imaginar el comienzo', 'soñadora', 'Imaginar antes de empezar', 'Primeros pasos que ilusionan.'],
  42: ['El Aumento', 'cerrar ciclos', 'paciente', 'Terminar lo que se empezó', 'Progreso visible hasta el final.'],
  43: ['La Irrupción', 'ver lo nuevo', 'perspicaz', 'Ver lo que otros no ven', 'Ideas nuevas bien explicadas.'],
  44: ['El Ir al Encuentro', 'reconocer patrones', 'sagaz', 'Aprender del pasado', 'Aprender de lo que la persona hace.'],
  45: ['La Reunión', 'reunir', 'convocante', 'Reunir a los suyos', 'Comunidad y lo compartido.'],
  46: ['La Subida', 'estar donde corresponde', 'determinada', 'Disfrutar el recorrido', 'Cada paso se siente bien.'],
  47: ['La Opresión', 'encontrar sentido', 'comprensiva', 'Encontrar el sentido', 'Lo confuso se vuelve claro.'],
  48: ['El Pozo', 'ir a la raíz', 'profunda', 'Ir a la raíz', 'Respuestas con fondo.'],
  49: ['La Revolución', 'cambiar las reglas', 'revolucionaria', 'Cambiar lo que no sirve', 'Reglas justas y a la vista.'],
  50: ['El Caldero', 'sostener valores', 'responsable', 'Sostener los valores', 'Seguridad y confianza.'],
  51: ['La Conmoción', 'atreverse primero', 'audaz', 'Atreverse primero', 'Sorpresas que despiertan.'],
  52: ['La Quietud', 'concentrarse', 'serena', 'Concentrarse en lo esencial', 'Interfaces tranquilas y enfocadas.'],
  53: ['El Progreso Paulatino', 'empezar', 'emprendedora', 'Empezar algo nuevo', 'Invitar a comenzar.'],
  54: ['La Muchacha que se Casa', 'aspirar a más', 'ambiciosa', 'Aspirar a más', 'Metas y logros visibles.'],
  55: ['La Plenitud', 'vivir la abundancia', 'emotiva', 'Dar con abundancia', 'Generosidad en lo que se entrega.'],
  56: ['El Andariego', 'contar historias', 'narradora', 'Contar historias', 'Contenido contado como relato.'],
  57: ['Lo Suave', 'intuir', 'intuitiva', 'Confiar en la intuición', 'Sugerencias oportunas.'],
  58: ['Lo Sereno', 'disfrutar', 'alegre', 'Mejorar con alegría', 'Placer en el uso.'],
  59: ['La Disolución', 'romper barreras', 'cálida', 'Acercar a las personas', 'Cercanía y confianza.'],
  60: ['La Restricción', 'aceptar límites', 'sobria', 'Hacer más con menos', 'Pocas opciones, bien elegidas.'],
  61: ['La Verdad Interior', 'buscar la verdad', 'inspirada', 'Buscar la verdad', 'Preguntas abiertas que inspiran.'],
  62: ['La Preponderancia de lo Pequeño', 'nombrar con precisión', 'precisa', 'Nombrar con precisión', 'Datos exactos y etiquetas claras.'],
  63: ['Después de la Consumación', 'verificar', 'escéptica', 'Verificar antes de afirmar', 'La evidencia a la vista.'],
  64: ['Antes de la Consumación', 'dar sentido al pasado', 'evocadora', 'Dar sentido a lo vivido', 'Contexto e historia.']
};
export const PUERTAS = Object.fromEntries(Object.entries(P).map(([n, x]) => [n, { puerta: Number(n), hexagrama: x[0], tema: x[1], voz: x[2], principio: x[3], interfaz: x[4] }]));

// A name for each of the 36 channels: what the two gates do together.
export const CANAL_NOMBRE = {
  '1-8': 'Originalidad que aporta', '2-14': 'Dirección con recursos', '3-60': 'Cambio con límites', '4-63': 'Lógica que verifica',
  '5-15': 'Ritmo para todos', '6-59': 'Cercanía que une', '7-31': 'Guía por el ejemplo', '9-52': 'Foco sostenido',
  '10-20': 'Ser en el presente', '10-34': 'Convicción en acción', '10-57': 'Intuición de sí', '11-56': 'Ideas que se cuentan',
  '12-22': 'Palabra con gracia', '13-33': 'Memoria que enseña', '16-48': 'Talento con fondo', '17-62': 'Opinión precisa',
  '18-58': 'Crítica que mejora', '19-49': 'Principios sensibles', '20-34': 'Fuerza en el momento', '20-57': 'Intuición inmediata',
  '21-45': 'Recursos bien gobernados', '23-43': 'Claridad que irrumpe', '24-61': 'Pensamiento que inspira', '25-51': 'Iniciativa de buena fe',
  '26-44': 'Persuasión con memoria', '27-50': 'Cuidado con valores', '28-38': 'Lucha con propósito', '29-46': 'Compromiso que descubre',
  '30-41': 'Deseo que imagina', '32-54': 'Ambición que perdura', '34-57': 'Fuerza intuitiva', '35-36': 'Experiencia que transforma',
  '37-40': 'Acuerdos que sostienen', '39-55': 'Emoción que provoca', '42-53': 'Ciclos que maduran', '47-64': 'Sentido de lo abstracto'
};

// What each Throat gate says when it speaks.
export const VOZ_GARGANTA = {
  62: 'nombra los hechos con precisión', 23: 'dice lo que sabe, sin rodeos', 56: 'cuenta lo que cree como una historia',
  35: 'habla desde la experiencia', 12: 'elige con cuidado cuándo hablar', 45: 'habla desde lo que tiene para repartir',
  33: 'habla desde la memoria', 8: 'muestra lo que puede aportar', 31: 'habla para guiar',
  20: 'habla en presente', 16: 'habla con entusiasmo de lo que domina'
};
