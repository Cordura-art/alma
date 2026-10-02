// Ensayo Generativo: a page to try the procedural generator. ALMA components with the Entidad Ensayo's token values;
// the avatars and textures are SVG written by the generator (window.__GENERADOR) from the entity's genes (window.__GENES).
(function () {
  'use strict';
  var h = React.createElement, useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, A = window.AlmaDS;
  var GEN = window.__GENERADOR, G = window.__GENES.ensayo, OTRA = window.__GENES.cordura;
  var root = document.documentElement;
  root.lang = 'es';

  // The theme: the viewer's choice on this page (remembered on this device), else the host's (data-theme on the root),
  // else the system's. A later change of the host's theme takes over again.
  var KEY = 'ensayo-generativo-tema', ok = function (v) { return v === 'light' || v === 'dark'; };
  var store = { get: function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } }, set: function (v) { try { localStorage.setItem(KEY, v); } catch (e) { /* storage blocked */ } } };
  var mq = window.matchMedia ? matchMedia('(prefers-color-scheme: light)') : null, host = root.getAttribute('data-theme'), choice = store.get(), listen = function () {};
  function paint() { var t = ok(choice) ? choice : ok(host) ? host : (mq && mq.matches ? 'light' : 'dark'); root.style.colorScheme = t; if (root.getAttribute('data-theme') !== t) root.setAttribute('data-theme', t); listen(t); return t; }
  var painted = paint();
  new MutationObserver(function () { var v = root.getAttribute('data-theme'); if (v !== painted) { host = v; choice = null; painted = paint(); } }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { painted = paint(); });
  function choose(t) { choice = t; store.set(t); painted = paint(); }

  // Example people: made-up names, drawn with the same seeded randomness, so a batch is always the same batch.
  var NOMBRES = ['Ana', 'Luis', 'Marta', 'Pedro', 'Camila', 'Tomás', 'Elena', 'Raúl', 'Sofía', 'Iván', 'Noa', 'Diego', 'Paula', 'Andrés', 'Inés', 'Bruno'];
  var APELLIDOS = ['Rojas', 'Soto', 'Díaz', 'Vera', 'Paz', 'Mora', 'Lagos', 'Pino', 'Reyes', 'Silva', 'Campos', 'Vidal'];
  function personas(lote, n) {
    var r = GEN.rng(GEN.hash('personas|' + lote)), out = [];
    while (out.length < n) { var p = NOMBRES[Math.floor(r() * NOMBRES.length)] + ' ' + APELLIDOS[Math.floor(r() * APELLIDOS.length)]; if (out.indexOf(p) < 0) out.push(p); }
    return out;
  }
  var OBSERVACIONES = [
    { quien: 'Marta Díaz', lugar: 'Párrafo 2', texto: 'Repite la idea del párrafo 1. Prueba quitarlo y lee de nuevo.' },
    { quien: 'Iván Mora', lugar: 'Línea 14', texto: 'Tres frases seguidas empiezan igual. Prueba cambiar el comienzo de la segunda.' },
    { quien: 'Camila Vera', lugar: 'Párrafo 5', texto: 'El ejemplo llega antes que la idea que explica. Te sugerimos invertir el orden.' },
    { quien: 'Raúl Paz', lugar: 'Último párrafo', texto: 'El cierre no retoma la pregunta del comienzo. Te mostramos dónde; tú decides.' }
  ];
  // Words of Ensayo's own trade: an emblem is asked for by concept.
  var CONCEPTOS = ['borrador', 'observación', 'versión', 'capítulo', 'párrafo', 'lectura', 'corrección', 'pregunta', 'estructura', 'estilo', 'ritmo', 'comienzo', 'cierre', 'razón', 'lugar', 'voz'];
  var BORRADORES = [
    { nombre: 'Prólogo', estado: 'Corregido · versión 4' },
    { nombre: 'Capítulo 1', estado: 'Corregido · versión 4' },
    { nombre: 'Capítulo 2', estado: 'Corregido · versión 3' },
    { nombre: 'Capítulo 3', estado: 'Con 4 observaciones · versión 2' },
    { nombre: 'Capítulo 4', estado: 'En lectura · versión 1' },
    { nombre: 'Notas del editor', estado: 'Sin empezar' }
  ];
  function reglas(g) {
    return [
      { id: 'color', rasgo: 'Paleta de la entidad', regla: 'Colores de criaturas, colonias, emblemas y tarjetas', valor: g.paleta.slice(1).join(' y ') + ', con acero' },
      { id: 'acento', rasgo: 'Un acento, bien usado', regla: 'Dónde va el color de marca', valor: 'El centro de un emblema, las criaturas más chicas de una colonia, una partícula de cada doce' },
      { id: 'forma', rasgo: 'Línea inconsciente', regla: 'Remate de las líneas y redondez de las tejas', valor: 'Las de sus botones: ' + g.radio.replace('px', ' px') },
      { id: 'puntas', rasgo: 'Centros definidos y línea consciente', regla: 'Puntas de un emblema', valor: g.puntas + ' puntas' },
      { id: 'detalle', rasgo: 'Canales definidos', regla: 'Nivel de detalle de un emblema', valor: g.complejidad + ' de 5' },
      { id: 'trazo', rasgo: 'Autoridad (peso de la letra)', regla: 'Grosor de las líneas', valor: Math.round(g.trazo * 100) + ' % del trazo base' },
      { id: 'relleno', rasgo: 'Garganta definida o abierta', regla: 'Emblemas rellenos o de línea', valor: g.relleno ? 'Rellenos' : 'De línea' },
      { id: 'ritmo', rasgo: 'Tipo', regla: 'Velocidad del campo', valor: Math.round(100 / g.ritmo) + ' % de la velocidad base' },
      { id: 'tarjetas', rasgo: 'Puntas del emblema', regla: 'Tarjetas del carrusel', valor: GEN.carrusel(g).cantidad + ' tarjetas' },
      { id: 'vuelta', rasgo: 'Tipo', regla: 'Tiempo de una vuelta del carrusel', valor: String(Math.round(GEN.carrusel(g).periodo * 10) / 10).replace('.', ',') + ' s' },
      { id: 'focos', rasgo: 'Centros definidos', regla: 'Focos desde donde crece el micelio', valor: g.focos + ' focos' },
      { id: 'crece', rasgo: 'Tipo', regla: 'Tiempo en que crece el micelio', valor: String(Math.round(4 * g.ritmo * 10) / 10).replace('.', ',') + ' s' },
      { id: 'corrientes', rasgo: 'Definición', regla: 'Tamaño de las corrientes del campo', valor: 'Remolinos de unos ' + Math.round(360 / g.grupos) + ' px' },
      { id: 'semilla', rasgo: 'Fecha de nacimiento', regla: 'Semilla: lo que hace propio cada dibujo', valor: g.fechaLarga }
    ];
  }

  // The generator's SVG, as is. Decorative: the name or the text always goes next to it.
  function Avatar(p) { return h('span', { className: 'av av--' + (p.size || 48), dangerouslySetInnerHTML: { __html: GEN.criatura(p.genes || G, p.clave) } }); }
  // A pictogram is ALMA's Pictogram component: 24 or 32 px, in the icon color, or in the entity's accent as a mark.
  // It reads Ensayo's seed from the entity's stylesheet, so nothing is configured here.
  function Pictograma(p) { return h(A.Pictogram, { name: p.clave, size: p.size || 24, drawing: p.dibujo, color: p.marca ? 'var(--nav-selected)' : 'var(--icon-01)' }); }
  function Emblema(p) { return h('span', { className: 'av av--' + (p.size || 96), dangerouslySetInnerHTML: { __html: GEN.emblema(p.genes || G, p.clave) } }); }
  function fondo(genes, clave, modo, tema) { return { backgroundImage: GEN.comoFondo(GEN.colonia(genes, clave, { modo: modo, tema: tema })) }; }

  // The field, the mycelium and the carousel are the system's components (site/generativo.js), with Ensayo's genes.
  var V = window.__GENERADOR_VISTAS(G), Campo = V.Campo, Micelio = V.Micelio, Carrusel = V.Carrusel, caras = V.caras, RING = V.RING, ORDEN = V.ORDEN;

  function Sec(p) {
    return h('section', { className: 'sec', id: p.id, 'aria-labelledby': p.id + '-t' },
      h('div', { className: 'sec__head' },
        h('h2', { className: 'web-h2 sec__title', id: p.id + '-t' }, p.title),
        p.lede ? h('p', { className: 'web-body-l sec__lede' }, p.lede) : null),
      p.children);
  }

  function Page() {
    var wide = useState(!window.matchMedia || matchMedia('(min-width: 56rem)').matches);
    useEffect(function () {
      if (!window.matchMedia) return;
      var m = matchMedia('(min-width: 56rem)'), on = function () { wide[1](m.matches); };
      m.addEventListener('change', on); return function () { m.removeEventListener('change', on); };
    }, []);
    var tema = useState(painted), light = tema[0] === 'light';
    useEffect(function () { listen = tema[1]; return function () { listen = function () {}; }; }, []);
    var nombre = useState('Ana Rojas'), lote = useState(1), uso = useState('pieza'), tanda = useState(0), aviso = useState('');
    var concepto = useState('observación'), serie = useState(0), mazo = useState(0), hifa = useState(1), marca = useState('Capítulo 3'), sello = marca[0].trim();
    var quieto = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches), anda = useState(!quieto), semilla = useState(1), gira = useState(!quieto), crece = useState(!quieto);
    var clave = nombre[0].trim(), gente = personas(lote[0], 24), idea = concepto[0].trim();
    var baraja = React.useMemo(function () { return caras(mazo[0]); }, [mazo[0]]);
    function copiar() {
      var svg = GEN.criatura(G, clave, { nombre: clave }), no = function () { aviso[1]('No se pudo copiar desde aquí.'); };
      if (!navigator.clipboard) return no();
      navigator.clipboard.writeText(svg).then(function () { aviso[1]('SVG copiado.'); }, no);
    }
    var filas = reglas(G);
    // The drafts sit together in one list, so their pictograms are dealt as a set: no two share a drawing.
    var MARCAS = A.pictogramDrawings(BORRADORES.map(function (b) { return b.nombre; }));

    return h(React.Fragment, null,
      h('header', { className: 'top' }, h('div', { className: 'wrap top__in' },
        h('p', { className: 'web-h6 brand' }, 'Ensayo ', h('span', null, 'Generativo')),
        h(A.Button, { variant: 'plain', icon: light ? 'asleep' : 'light', 'aria-label': light ? 'Usar tema oscuro' : 'Usar tema claro', onClick: function () { choose(light ? 'dark' : 'light'); } }))),
      h('main', { className: 'wrap' },
        h('div', { className: 'hero' },
          h('div', { className: 'hero__txt' },
            h('p', { className: 'web-label-m eyebrow' }, 'Prototipo · Entidad Ensayo'),
            h('h1', { className: (wide[0] ? 'web-display-s' : 'web-h1') + ' hero__title' }, 'Una fecha de nacimiento. Criaturas, colonias y emblemas sin fin.'),
            h('p', { className: 'web-body-l lede' }, 'Este generador usa la carta de Ensayo como un juego usa su semilla. Cada nombre da una criatura, cada número una colonia y cada concepto un emblema, siempre con los colores de Ensayo y un solo rojo. La misma palabra da siempre el mismo dibujo.')),
          h('div', { className: 'tex', style: fondo(G, 'portada', 'pieza'), role: 'img', 'aria-label': 'Colonia de Ensayo: criaturas magenta, ámbar y acero vistas de cerca, amontonadas sobre tinta, cada una con dos ojos.' })),

        h(Sec, { id: 'avatares', title: 'Avatares', lede: 'Escribe un nombre o un correo y sale su criatura: un cuerpo, una segunda forma y dos ojos. El avatar acompaña al nombre; nunca lo reemplaza.' },
          h('div', { className: 'two' },
            h('div', { className: 'stack' },
              h(A.TextInput, { id: 'nombre', label: 'Nombre o correo', value: nombre[0], onChange: function (v) { nombre[1](v || ''); aviso[1](''); }, helper: 'Mayúsculas y espacios al borde no cambian el dibujo.' }),
              h('div', { className: 'row' },
                h(A.Button, { variant: 'tinted', iconBefore: 'copy', disabled: !clave, onClick: copiar }, 'Copiar SVG'),
                h('span', { className: 'web-body-s cap', role: 'status' }, aviso[0]))),
            clave
              ? h('div', { className: 'stack' },
                h('div', { className: 'sizes' }, [96, 64, 48, 32].map(function (s) { return h(Avatar, { key: s, clave: clave, size: s }); })),
                h('p', { className: 'web-body-s note' }, 'El avatar de ' + clave + ', a 96, 64, 48 y 32 px.'))
              : h('p', { className: 'web-body-m note' }, 'Escribe un nombre para ver su avatar.')),
          h('h3', { className: 'web-h5 sub' }, '24 personas de ejemplo'),
          h('ul', { className: 'people' }, gente.map(function (p) {
            return h('li', { key: p, className: 'person' }, h(Avatar, { clave: p, size: 64 }), h('span', { className: 'web-body-s' }, p));
          })),
          h('div', { className: 'row' },
            h(A.Button, { variant: 'gray', iconBefore: 'renew', onClick: function () { lote[1](lote[0] + 1); } }, 'Ver otras 24 personas'),
            h('span', { className: 'web-body-s cap' }, 'Los nombres son inventados.'))),

        h(Sec, { id: 'texturas', title: 'Texturas', lede: 'La colonia: las mismas criaturas vistas de muy cerca y amontonadas. Cada número da un mosaico que se repite sin costura. Como pieza de marca va sobre tinta, con la paleta completa. Como fondo se apaga hasta que el texto encima se lee con contraste de 4,5:1 o más.' },
          h(A.SegmentedControl, { label: 'Uso de la textura', options: [{ value: 'pieza', label: 'Pieza de marca' }, { value: 'fondo', label: 'Fondo con texto' }], value: uso[0], onChange: uso[1] }),
          h('ul', { className: 'tiles' }, [1, 2, 3, 4, 5, 6].map(function (i) {
            var n = tanda[0] * 6 + i;
            return h('li', { key: n, className: 'tile' }, h('figure', null,
              h('div', { className: 'tex tex--' + uso[0], style: fondo(G, n, uso[0], tema[0]) },
                uso[0] === 'fondo' ? h('p', { className: 'web-h5' }, 'Capítulo 3, segunda versión') : null,
                uso[0] === 'fondo' ? h('p', { className: 'web-body-m' }, 'Tiene 4 observaciones. Léelas antes de reescribir.') : null),
              h('figcaption', { className: 'web-body-s' }, 'Textura ' + n)));
          })),
          h('div', { className: 'row' },
            h(A.Button, { variant: 'gray', iconBefore: 'renew', onClick: function () { tanda[1](tanda[0] + 1); } }, 'Ver otras 6 texturas'))),

        h(Sec, { id: 'campo', title: 'Campo', lede: 'Un fondo en movimiento para portadas: partículas que siguen corrientes y dejan estela. Va al ritmo de Ensayo, a ' + Math.round(100 / G.ritmo) + ' % de la velocidad base. Es una pieza de marca: no lleva texto encima.' },
          h(Campo, { clave: semilla[0], anda: anda[0], label: 'Campo de Ensayo: partículas magenta, ámbar y acero, con algunas rojas, que derivan hacia la derecha sobre tinta.' }),
          h('div', { className: 'row' },
            h(A.Button, { variant: 'tinted', iconBefore: anda[0] ? 'pause' : 'play', onClick: function () { anda[1](!anda[0]); } }, anda[0] ? 'Pausar' : 'Reproducir'),
            h(A.Button, { variant: 'gray', iconBefore: 'renew', onClick: function () { semilla[1](semilla[0] + 1); } }, 'Ver otro campo'),
            h('span', { className: 'web-body-s cap' }, 'Campo ' + semilla[0] + (quieto ? '. Parte en pausa porque pediste menos movimiento.' : '. Se detiene solo cuando sale de la pantalla.')))),

        h(Sec, { id: 'carrusel', title: 'Carrusel', lede: 'Una portada que muestra el mundo de Ensayo: un anillo de ' + RING.cantidad + ' tarjetas, una por cada punta de su emblema, que gira en perspectiva. Cada tarjeta lleva una cara distinta, hecha para tarjeta con los colores de Ensayo. Da una vuelta cada ' + String(Math.round(RING.periodo * 10) / 10).replace('.', ',') + ' segundos, al ritmo de Ensayo.' },
          h(Carrusel, { caras: baraja, anda: gira[0], label: 'Carrusel de Ensayo: ' + RING.cantidad + ' tarjetas que giran en anillo, cada una con un patrón distinto: ' + baraja.map(function (c) { return c.nombre.toLowerCase(); }).join(', ') + '.' }),
          h('div', { className: 'row' },
            h(A.Button, { variant: 'tinted', iconBefore: gira[0] ? 'pause' : 'play', onClick: function () { gira[1](!gira[0]); } }, gira[0] ? 'Pausar' : 'Reproducir'),
            h(A.Button, { variant: 'gray', iconBefore: 'renew', onClick: function () { mazo[1](mazo[0] + 1); } }, 'Ver otras ' + RING.cantidad + ' caras'),
            h('span', { className: 'web-body-s cap' }, quieto ? 'Parte en pausa porque pediste menos movimiento.' : 'Se detiene solo cuando sale de la pantalla.')),
          h('h3', { className: 'web-h5 sub' }, 'Las ' + RING.cantidad + ' caras, de frente'),
          h('ul', { className: 'faces' }, baraja.map(function (c, i) {
            return h('li', { key: mazo[0] + '-' + i }, h('figure', { className: 'pic' },
              h('span', { className: 'face', style: c.estilo }),
              h('figcaption', { className: 'web-body-s' }, c.nombre)));
          })),
          h('p', { className: 'web-body-m note' }, 'Son 15 patrones: formas sueltas, texturas con volumen y patrones de línea. La redondez de las tejas y los pétalos del grabado salen de la carta. Las luces y sombras de tejas y planchas son tonos derivados de un color de Ensayo. No llevan chip ni marca de red: Ensayo no es un banco.')),

        h(Sec, { id: 'micelio', title: 'Micelio', lede: 'Una pieza de bienvenida para la pantalla de un teléfono. Una red crece desde ' + G.focos + ' focos, uno por cada centro definido de Ensayo, se bifurca en cada cruce y se une. La línea joven es fina y sin color; al madurar toma un brillo que recorre los colores de Ensayo y cambia con la inclinación.' },
          h('div', { className: 'two' },
            h(Micelio, { clave: hifa[0], anda: crece[0], label: 'Micelio de Ensayo: una red de líneas rectas que crece desde el borde inferior de una pantalla de teléfono y toma un brillo magenta, ámbar y rojo.' }),
            h('div', { className: 'stack' },
              h('div', { className: 'row' },
                h(A.Button, { variant: 'tinted', iconBefore: crece[0] ? 'pause' : 'play', onClick: function () { crece[1](!crece[0]); } }, crece[0] ? 'Pausar' : 'Reproducir'),
                h(A.Button, { variant: 'gray', iconBefore: 'renew', onClick: function () { hifa[1](hifa[0] + 1); } }, 'Ver otro micelio')),
              h('p', { className: 'web-body-m note' }, 'Crece una sola vez, en ' + String(Math.round(4 * G.ritmo * 10) / 10).replace('.', ',') + ' segundos, al ritmo de Ensayo, y se queda. Después solo se mece: ese vaivén es el que mueve el brillo.'),
              h('p', { className: 'web-body-s cap' }, 'Micelio ' + hifa[0] + (quieto ? '. Parte quieto y ya crecido porque pediste menos movimiento.' : '. Se detiene solo cuando sale de la pantalla.'))))),

        h(Sec, { id: 'emblemas', title: 'Emblemas', lede: 'Un emblema por concepto: estrellas, anillos, espirales y contraformas. Son ' + G.puntas + ' puntas, rellenos y con el rojo en el centro, porque así lo dice la carta de Ensayo. Son ilustración de marca; no reemplazan a los íconos de la interfaz.' },
          h('div', { className: 'two' },
            h('div', { className: 'stack' },
              h(A.TextInput, { id: 'concepto', label: 'Concepto', value: concepto[0], onChange: function (v) { concepto[1](v || ''); }, helper: 'Cualquier palabra sirve. La misma palabra da siempre el mismo emblema.' })),
            idea ? h(Emblema, { clave: idea, size: 160 }) : h('p', { className: 'web-body-m note' }, 'Escribe un concepto para ver su emblema.')),
          h('h3', { className: 'web-h5 sub' }, '16 conceptos del oficio de Ensayo'),
          h('ul', { className: 'people people--96' }, CONCEPTOS.map(function (c) {
            return h('li', { key: c, className: 'person' }, h(Emblema, { clave: c, size: 96 }), h('span', { className: 'web-body-s' }, c));
          }))),

        h(Sec, { id: 'pictogramas', title: 'Pictogramas', lede: 'Íconos pequeños para distinguir cosas entre sí: un capítulo, un proyecto, una etiqueta. Cada nombre saca su propio dibujo, siempre el mismo. Ya son un componente de ALMA, Pictogram: toman el color del texto que los rodea y van a 24 o 32 px. Para acciones y estados siguen los íconos de Carbon.' },
          h('div', { className: 'two' },
            h('div', { className: 'stack' },
              h(A.TextInput, { id: 'marca', label: 'Nombre de lo que quieres distinguir', value: marca[0], onChange: function (v) { marca[1](v || ''); }, helper: 'Un capítulo, un proyecto, una etiqueta.' })),
            sello
              ? h('div', { className: 'stack' },
                h('div', { className: 'sizes sizes--icon' }, [32, 24].map(function (s) { return h(Pictograma, { key: s, clave: sello, size: s }); })),
                h('p', { className: 'web-body-s note' }, 'El pictograma de «' + sello + '» a 32 y 24 px, los dos tamaños que admite. Más chicos pierden detalle.'))
              : h('p', { className: 'web-body-m note' }, 'Escribe un nombre para ver su pictograma.')),
          h('h3', { className: 'web-h5 sub' }, 'En uso: los borradores de un libro'),
          h('ul', { className: 'marks' }, BORRADORES.map(function (b, i) {
            return h('li', { key: b.nombre },
              h(Pictograma, { clave: b.nombre, dibujo: MARCAS[i], marca: true }),
              h('div', { className: 'obs__txt' },
                h('p', { className: 'web-label-m' }, b.nombre),
                h('p', { className: 'web-body-s cap' }, b.estado)));
          })),
          h('h3', { className: 'web-h5 sub' }, '32 pictogramas'),
          h('ul', { className: 'icons' }, Array.from({ length: 32 }, function (_, i) {
            var n = serie[0] * 32 + i + 1;
            return h('li', { key: n }, h(Pictograma, { clave: n, size: 32 }), h('span', { className: 'web-body-s cap' }, String(n)));
          })),
          h('div', { className: 'row' },
            h(A.Button, { variant: 'gray', iconBefore: 'renew', onClick: function () { serie[1](serie[0] + 1); } }, 'Ver otros 32 pictogramas')),
          h('p', { className: 'web-body-m note' }, 'El dibujo no explica qué es cada cosa: la distingue de sus vecinas, como una huella. Por eso siempre va junto a su nombre. En una lista se reparten para que no se repitan; sueltos, cerca de uno de cada veinte nombres comparte dibujo con otro. Vienen de un estudio para banca, así que aparecen gráficos, escudos y balanzas.')),

        h(Sec, { id: 'uso', title: 'En uso', lede: 'Un borrador con sus observaciones. La colonia va de fondo en el encabezado y cada observación lleva la criatura de quien la escribió.' },
          h('div', { className: 'draft' },
            h('div', { className: 'draft__head', style: fondo(G, 'borrador', 'fondo', tema[0]) },
              h('h3', { className: 'web-h4' }, 'Capítulo 3, segunda versión'),
              h('p', { className: 'web-body-m' }, 'Tiene 4 observaciones. Léelas antes de reescribir.'),
              h('div', null, h(A.Button, { variant: 'filled' }, 'Revisar borrador'))),
            h('ul', { className: 'obs' }, OBSERVACIONES.map(function (o) {
              return h('li', { key: o.quien },
                h(Avatar, { clave: o.quien, size: 40 }),
                h('div', { className: 'obs__txt' },
                  h('p', { className: 'web-label-m obs__who' }, o.quien, h('span', null, ' · ' + o.lugar)),
                  h('p', { className: 'web-body-m' }, o.texto)));
            })))),

        h(Sec, { id: 'reglas', title: 'Las reglas', lede: 'Lo que la carta de la entidad decide hoy. Las criaturas y la colonia toman de Ensayo sus colores y su semilla; su forma todavía no lee la carta.' },
          wide[0] ? h(A.Table, { caption: 'De dónde sale cada decisión del generador', rows: filas, columns: [{ key: 'rasgo', label: 'Sale de' }, { key: 'regla', label: 'Decide' }, { key: 'valor', label: 'En Ensayo' }] })
            : h(A.List, { 'aria-label': 'De dónde sale cada decisión del generador', items: filas.map(function (f) { return { id: f.id, title: f.regla, subtitle: f.rasgo + ': ' + f.valor }; }) })),

        h(Sec, { id: 'otra', title: 'Las mismas reglas, otra entidad', lede: OTRA.nombre + ' nació el ' + OTRA.fechaLarga + '. Con su carta y su paleta, el mismo generador y las mismas ocho personas dan esto.' },
          h('div', { className: 'two' },
            h('ul', { className: 'people' }, gente.slice(0, 8).map(function (p) {
              return h('li', { key: p, className: 'person' }, h(Avatar, { genes: OTRA, clave: p, size: 64 }), h('span', { className: 'web-body-s' }, p));
            })),
            h('div', { className: 'tex', style: fondo(OTRA, 'portada', 'pieza'), role: 'img', 'aria-label': 'Colonia de ' + OTRA.nombre + ': criaturas con su paleta, amontonadas sobre tinta.' })),
          h('p', { className: 'web-body-m note' }, 'Cuatro caras de tarjeta con los mismos patrones:'),
          h('ul', { className: 'faces' }, ORDEN.slice(0, 4).map(function (patron, i) {
            return h('li', { key: patron }, h('figure', { className: 'pic' },
              h('span', { className: 'face', style: { backgroundImage: GEN.comoFondo(GEN.placa(OTRA, 'cara-0-' + i, { patron: patron })) } }),
              h('figcaption', { className: 'web-body-s' }, GEN.NOMBRE_PATRON[patron])));
          })),
          h('p', { className: 'web-body-m note' }, 'Y los mismos ocho conceptos: ' + OTRA.puntas + ' puntas y ' + (OTRA.relleno ? 'rellenos' : 'de línea') + ', porque su carta es otra.'),
          h('ul', { className: 'people people--96' }, CONCEPTOS.slice(0, 8).map(function (c) {
            return h('li', { key: c, className: 'person' }, h(Emblema, { genes: OTRA, clave: c, size: 96 }), h('span', { className: 'web-body-s' }, c));
          }))),

        h(Sec, { id: 'falta', title: 'Lo que falta decidir' },
          h(A.InlineNotification, { kind: 'callout', status: 'info', title: 'Esto es un prototipo', message: 'ALMA todavía no tiene un componente de avatar ni tokens para texturas. El generador vive en la carpeta de este ejemplo y no cambia nada del sistema.' }),
          h(A.List, { 'aria-label': 'Decisiones pendientes', items: [
            { id: 'g', icon: 'chat', title: 'Criaturas que lean la carta', subtitle: 'Hoy solo toman de la entidad el color y la semilla. Falta decidir qué rasgos cambian su forma.' },
            { id: 'p', icon: 'list', title: 'Caras de tarjeta: lo que quedó fuera', subtitle: 'El grano, la mezcla de dos patrones, el relieve del isotipo y la capa de banco (chip, contactless, marca de red).' },
                        { id: 'a', icon: 'user--avatar', title: 'Avatar como componente de ALMA', subtitle: 'Con tamaños, texto alternativo y qué pasa cuando la persona sube su foto.' },
            { id: 'b', icon: 'grid', title: 'El generador en el flujo de cada entidad', subtitle: 'Que «npm run entidad» dibuje y documente avatares, texturas y emblemas junto a la firma.' },
            { id: 'm', icon: 'renew', title: 'Texto sobre el campo', subtitle: 'Hoy el campo va sin texto. Para titular encima hace falta una veladura que asegure el contraste.' },
            { id: 'c', icon: 'image', title: 'Materia prima generada con IA', subtitle: 'Formas más ricas, siempre reducidas a la paleta de la entidad antes de entrar.' }
          ] }))),

      h('footer', { className: 'foot' }, h('div', { className: 'wrap' },
        h('p', { className: 'web-body-s' }, 'Página de prueba. Ensayo es una marca ficticia creada para probar ALMA, el sistema de diseño de Cordura. Las personas y los borradores de esta página no existen.'))));
  }

  ReactDOM.createRoot(document.getElementById('app')).render(h(Page));
})();
