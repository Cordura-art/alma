// Entidad IBM: a design language written by the entity born 1911-06-03 04:00 in New York, on top of the Entidades engine.
// Philosophy, language, elements, gallery and origin; every value comes from the chart through window.__ENGINE.
(function () {
  var h = React.createElement, A = window.AlmaDS, En = window.__ENGINE, CT = window.__CARTA, useState = React.useState, useEffect = React.useEffect;
  var root = document.documentElement, S = window.__STUDY; // { nacimiento, ibm, ventanas, anios, real }

  // ---------- The entity: everything below comes from this birth moment.
  var C = CT.calcularCarta(S.nacimiento);
  var E = En.withCarta({ id: 'ibm', name: 'IBM', nacimiento: S.nacimiento, variation: 0, type: 'proyector', auth: 'mental', profile: '1/3', def: 'simple', centers: [] });
  var P = En.params(E), V = CT.generarVoz(C), PR = CT.generarPrincipios(C);
  var HEX = function (n) { return CT.PUERTAS[n].hexagrama; };
  var CENTRO = function (id) { return CT.CENTROS.filter(function (c) { return c.id === id; })[0].nombre; };
  var ACC = P.accent.dark['interactive-01'];

  function oklab(hex) {
    var f = function (c) { c = parseInt(c, 16) / 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    var r = f(hex.substr(1, 2)), g = f(hex.substr(3, 2)), b = f(hex.substr(5, 2));
    var l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s];
  }
  function dE(a, b) { var x = oklab(a), y = oklab(b); return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]); }
  var DELTA = dE(ACC, S.ibm.blue);
  var fmt3 = function (x) { return x.toFixed(3).replace('.', ','); };

  function hostTheme() { var v = root.getAttribute('data-theme'); if (v === 'light' || v === 'dark') return v; return window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; }
  // The whole site wears the entity: type axes, weights, radii and palette.
  function wear(theme) {
    root.setAttribute('data-theme', theme); root.style.colorScheme = theme;
    var st = En.scopeStyle(P, theme); Object.keys(st).forEach(function (k) { root.style.setProperty(k, st[k]); });
  }

  var PAGES = [
    { id: 'inicio', group: null, title: 'Inicio', icon: 'home' },
    { id: 'punto-de-vista', group: 'Filosofía', title: 'Punto de vista', icon: 'idea' },
    { id: 'principios', group: 'Filosofía', title: 'Principios', icon: 'checkmark' },
    { id: 'prisma', group: 'Filosofía', title: 'Prisma de identidad', icon: 'identification' },
    { id: 'voz', group: 'Lenguaje', title: 'Voz', icon: 'chat' },
    { id: 'tono', group: 'Lenguaje', title: 'Tono', icon: 'information' },
    { id: 'escritura', group: 'Lenguaje', title: 'Escritura', icon: 'document' },
    { id: 'firma', group: 'Elementos', title: 'Firma', icon: 'star' },
    { id: 'tipografia', group: 'Elementos', title: 'Tipografía', icon: 'view' },
    { id: 'fundamentos', group: 'Elementos', title: 'Fundamentos tipográficos', icon: 'document' },
    { id: 'color', group: 'Elementos', title: 'Color', icon: 'categorical-palette' },
    { id: 'grilla', group: 'Elementos', title: 'Grilla', icon: 'grid' },
    { id: 'iconografia', group: 'Elementos', title: 'Iconografía', icon: 'favorite' },
    { id: 'ilustracion', group: 'Elementos', title: 'Ilustración', icon: 'image' },
    { id: 'fotografia', group: 'Elementos', title: 'Fotografía', icon: 'view' },
    { id: 'datos', group: 'Elementos', title: 'Visualización de datos', icon: 'dashboard' },
    { id: 'movimiento', group: 'Elementos', title: 'Movimiento', icon: 'flash' },
    { id: 'producto', group: 'Galería', title: 'Producto', icon: 'search' },
    { id: 'comunicacion', group: 'Galería', title: 'Comunicación', icon: 'send' },
    { id: 'componentes', group: 'Galería', title: 'Componentes', icon: 'settings' },
    { id: 'carta', group: 'Origen', title: 'La carta', icon: 'compass' },
    { id: 'fecha', group: 'Origen', title: 'La fecha', icon: 'time' },
    { id: 'calibracion', group: 'Origen', title: 'Calibración', icon: 'checkmark--outline' }
  ];
  var GROUPS = ['Filosofía', 'Lenguaje', 'Elementos', 'Galería', 'Origen'];
  function byId(id) { return PAGES.filter(function (p) { return p.id === id; })[0]; }
  function route() { var r = (location.hash || '').replace('#', ''); return byId(r) ? r : 'inicio'; }
  var slug = function (t) { return 's-' + t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-'); };

  // ---------- Shared pieces
  function Head(p) {
    var pg = byId(p.id);
    return h('header', { className: 'head' },
      pg.group ? h('p', { className: 'web-label-m eyebrow' }, pg.group) : null,
      h('h1', { className: 'web-h1 head__title', tabIndex: -1, id: 'titulo' }, p.title || pg.title),
      p.lede ? h('p', { className: 'web-body-l lede' }, p.lede) : null,
      p.index ? h('nav', { className: 'toc', 'aria-label': 'En esta página' }, p.index.map(function (t) {
        return h('a', { key: t, href: '#' + p.id, className: 'web-body-m toc__a', onClick: function (ev) { ev.preventDefault(); var el = document.getElementById(slug(t)); if (el) { el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); el.focus({ preventScroll: true }); } } }, t);
      })) : null);
  }
  function Sec(p) { return h('section', { className: 'sec' }, p.title ? h('h2', { className: 'web-h3 sec__title', id: slug(p.title), tabIndex: -1 }, p.title) : null, p.children); }
  function Sub(p) { return h('div', { className: 'sub' }, h('h3', { className: 'web-h5 sub__title' }, p.title), p.children); }
  function Para(p) { return h('p', { className: 'web-body-l para' }, p.children); }
  function Quote(p) { return h('blockquote', { className: 'quote web-h3' }, p.children); }
  function Tbl(p) { return h('div', { className: 'tbl' }, h(A.Table, { title: p.title, headingLevel: 3, columns: p.columns, rows: p.rows })); }
  function Chip(p) { return h('span', { className: 'chip', style: { background: p.c } }); }
  function Cards(p) {
    return h('div', { className: 'cards' }, p.items.map(function (c) {
      return h('div', { key: c[0], className: 'card card--static' }, c[2] ? h('span', { className: 'web-label-m cap' }, c[2]) : null, h('span', { className: 'web-h5' }, c[0]), h('span', { className: 'web-body-m cap' }, c[1]));
    }));
  }
  function Avoid(p) { return h('ul', { className: 'avoid web-body-m' }, p.items.map(function (x) { return h('li', { key: x }, h(A.Icon, { name: 'close', size: 16 }), h('span', null, x)); })); }
  // Visual do/don't pairs: each side is a real ALMA composition; the "no" side breaks one rule through scoped tokens or styles.
  function Fig(p) {
    return h('figure', { className: 'ex__fig ex__fig--' + p.k },
      h('div', { className: 'ex__stage', 'aria-hidden': p.hide ? 'true' : undefined, inert: p.hide ? '' : undefined }, p.node),
      h('figcaption', { className: 'web-body-m ex__cap' }, h(A.Icon, { name: p.k === 'si' ? 'checkmark' : 'close', size: 16 }), h('span', null, h('strong', null, p.k === 'si' ? 'Así sí. ' : 'Así no. '), p.cap)));
  }
  function Ex(p) { return h('div', { className: 'ex' }, h(Fig, { k: 'si', node: p.si, cap: p.siCap, hide: true }), h(Fig, { k: 'no', node: p.no, cap: p.noCap, hide: true })); }
  function Mini(p) {
    return h('div', { className: 'mini', style: p.style },
      h('p', { className: 'web-label-m cap mini__eyebrow', style: p.eyeStyle }, p.eyebrow || 'Informes'),
      h('p', { className: 'web-h4 mini__title', style: p.titleStyle }, p.title || 'Informe mensual de junio'),
      p.body !== false ? h('p', { className: 'web-body-m mini__body', style: p.bodyStyle }, p.body || 'Revisa el total antes de enviarlo a tu equipo.') : null,
      p.actions || h('div', { className: 'demo-row' }, h(A.Button, { variant: 'filled', role: 'primary' }, 'Enviar informe'), h(A.Button, { variant: 'tertiary' }, 'Guardar borrador')));
  }
  var ON_BLUE = { background: 'var(--interactive-01)', '--text-01': '#FFFFFF', '--text-02': '#FFFFFF', color: '#FFFFFF' };

  function Statement(p) { return h('p', { className: 'statement web-display-m' }, p.children); }
  function Origin(p) { return h('p', { className: 'web-body-s cap origin' }, h('strong', null, 'Origen en la carta. '), p.children); }
  function Frame(p) { return h('div', { className: 'frame' }, p.label ? h('p', { className: 'web-label-m cap frame__label' }, p.label) : null, p.children); }
  function Bullets(p) { return h('ul', { className: 'steps web-body-l' }, p.items.map(function (x) { return h('li', { key: x[0] }, h('strong', null, x[0] + ' '), x[1]); })); }
  function cssVar(n) { return getComputedStyle(root).getPropertyValue(n).trim(); }

  var a = C.perfil.split('/');
  var canalesTxt = C.canales.map(function (k) { return k.id + ' · ' + CT.CANAL_NOMBRE[k.id]; });
  var fechaLarga = '3 de junio de 1911, 04:00, Nueva York';

  // ---------- Inicio
  function Inicio() {
    var cards = [['punto-de-vista', 'Filosofía', 'Punto de vista, principios y prisma de identidad.'], ['voz', 'Lenguaje', 'Voz, tono y reglas de escritura.'], ['tipografia', 'Tipografía', 'Letra, escala y fundamentos.'], ['color', 'Color', 'Paleta, roles, combinaciones y accesibilidad.'], ['grilla', 'Grilla', 'Unidad base, columnas y espacio.'], ['iconografia', 'Iconografía', 'Sistema, principios y tamaños.'], ['fotografia', 'Imagen', 'Fotografía e ilustración.'], ['datos', 'Visualización de datos', 'Criterios, series y honestidad.'], ['movimiento', 'Movimiento', 'Enfoque, duraciones y curvas.'], ['producto', 'Galería', 'El lenguaje en producto y comunicación.']];
    return h('div', { className: 'page' },
      h('div', { className: 'head' },
        h('p', { className: 'web-label-m eyebrow' }, 'Lenguaje de diseño'),
        h('h1', { className: 'web-display-m hero__title', tabIndex: -1, id: 'titulo' }, 'Preguntar → Probar → Nombrar'),
        h('p', { className: 'web-body-l lede' }, 'Este es el ethos detrás de nuestra filosofía y de cada uno de nuestros principios. Nos permite reconocer todo lo que diseñamos, y explicar por qué es como es.')),
      h(En.Signature, { entity: E, P: P, format: 'wide' }),
      h('div', { className: 'cards' }, cards.map(function (c) {
        return h('a', { key: c[0], href: '#' + c[0], className: 'card' }, h('span', { className: 'web-h5' }, c[1]), h('span', { className: 'web-body-m cap' }, c[2]), h(A.Icon, { name: 'arrow--right', size: 16 }));
      })),
      h(Sec, { title: 'Recursos' }, h(Bullets, { items: [
        ['Componentes.', 'ALMA: los mismos componentes de Cordura, con nuestros tokens.'],
        ['Tokens.', 'El archivo de tokens de la entidad, exportable desde Entidades ALMA.'],
        ['Tipografía.', 'Roboto Flex, de Google Fonts, con licencia libre.']] })),
      h('p', { className: 'web-body-s cap note' }, 'Ejercicio de diseño hecho con ALMA. La entidad escribe como «nosotros», pero no es IBM: no está afiliada a IBM y no usa su logo, sus textos ni su tipografía.'));
  }

  // ---------- Filosofía
  function PuntoDeVista() {
    return h('div', { className: 'page' }, h(Head, { id: 'punto-de-vista', lede: 'Lo que creemos define lo que hacemos. Esta es la base de todo lo que diseñamos, desde una etiqueta de dos palabras hasta una campaña.' }),
      h(Sec, null,
        h(Para, null, 'Creemos en el progreso que se puede comprobar: que preguntar bien, probar pronto y nombrar con exactitud mejora el trabajo, las decisiones y la vida de las personas.'),
        h(Para, null, 'Por nuestra escala, la claridad no es un estilo. Es una responsabilidad con cada persona que decide a partir de lo que le mostramos.')),
      h(Statement, null, 'Diseñar es', h('br'), 'poner nombre.'),
      h(Sec, null,
        h(Para, null, 'Hoy cualquiera tiene herramientas para producir más, más rápido. El mundo se vuelve complejo antes de volverse claro, y las experiencias se parecen cada vez más entre sí. La prisa por publicar premia lo inmediato sobre lo comprobado.'),
        h(Para, null, 'Por eso es más importante que nunca tener un criterio propio, hacerlo visible y que se reconozca en todo lo que hacemos. Un criterio no es un gusto: es una manera de decidir que cualquiera puede aprender y repetir.')),
      h(Statement, null, 'Dudar = Cuidar'),
      h(Sec, null,
        h(Para, null, 'Dudamos de lo que no podemos comprobar, empezando por nuestras propias ideas. No es desconfianza: es la forma más seria de cuidar a quien usa lo que hacemos. Una cifra verificada, una fuente a la vista y un «estimado» dicho a tiempo valen más que cualquier promesa.'),
        h(Para, null, 'Lo que heredamos de nuestra historia no es una estética de época, sino una actitud: volver sobre lo vivido hasta entenderlo y usarlo como material de trabajo. Nuestras ideas maduran con cada vuelta.')),
      h(Statement, null, 'Pregunta → Palabra'),
      h(Sec, null,
        h(Para, null, 'El propósito de cada diseño, y de cada persona que diseña con nosotros, es llevar a alguien de una pregunta a una palabra clara: de no entender a poder decidir, de una duda a un dato, de un problema a su nombre.'),
        h(Para, null, 'Todo lo que hacemos es esto. Todo lo que diseñamos también.')),
      h(Quote, null, 'Toda experiencia con nosotros debería dejar algo más claro de lo que estaba.'),
      h(Origin, null, 'La cruz 35 / 5 / 63 / 64 (progresar, sostener un ritmo, verificar y dar sentido a lo vivido) y un solo circuito entre Cabeza, Ajna y Garganta: una mente que pregunta, piensa y dice.'));
  }

  var PRINC = [
    { t: 'Probado primero', q: ['¿Lo probamos con personas reales antes de anunciarlo?', '¿Qué aprendimos de la última versión, y se nota?', '¿La persona puede probarlo y volver atrás sin perder nada?', '¿Lanzamos para aprender o para parecer modernos?'],
      p: 'Lo nuevo nos atrae, pero solo lo que funciona merece llegar a las personas. Antes de afirmar algo, lo probamos en pequeño, con quienes lo van a usar, y aprendemos de lo que pasa. Una versión probada vale más que diez prometidas. La novedad llega como una invitación a probar, nunca como una obligación.' },
    { t: 'Nombrado con exactitud', q: ['¿Cada recomendación dice por qué?', '¿Usamos la cifra exacta, o una que suena mejor?', '¿Algún nombre, etiqueta o verbo se puede malinterpretar?', '¿Se ve de dónde sale cada dato?'],
      p: 'Tenemos opiniones y las damos, siempre con su fundamento. Una recomendación sin razones es ruido; una con datos exactos es ayuda. Elegimos cada palabra como elegimos cada píxel: por lo que significa, no por cómo suena. Lo que tiene un nombre preciso se puede entender, medir y mejorar.' },
    { t: 'Pensado dos veces', q: ['¿Todo se puede deshacer o revisar?', '¿Dejamos espacio para que la persona pregunte?', '¿Volvimos sobre la idea después de lanzarla?', '¿Existe alguna acción sin salida?'],
      p: 'Volvemos sobre nuestras ideas hasta que tienen sentido, y dejamos que las personas hagan lo mismo. Ninguna decisión en nuestros productos es definitiva: siempre hay historial, una versión anterior y una forma de volver atrás. Las mejores preguntas no cierran conversaciones; las abren.' },
    { t: 'Constante por diseño', q: ['¿Algo cambió de lugar sin aviso?', '¿Este patrón funciona igual que en el resto del sistema?', '¿Respetamos el tiempo y la atención de la persona?', '¿Hay alguna urgencia que no sea real?'],
      p: 'Sostenemos un ritmo y lo respetamos en los demás. Las personas aprenden dónde está cada cosa; mover algo sin aviso es romper un acuerdo. Preferimos llegar seguros que llegar primeros, y que cada versión se sienta como la anterior, solo que mejor.' }
  ];
  function Principios() {
    return h('div', { className: 'page' }, h(Head, { id: 'principios', lede: 'Nuestros principios son criterios para crear y para evaluar. Los usa quien diseña, quien escribe y quien aprueba: cualquier persona que decida algo en nuestro nombre.', index: PRINC.map(function (x) { return x.t; }) }),
      PRINC.map(function (x, i) {
        var e = PR[i];
        return h(Sec, { key: x.t, title: x.t },
          h(Para, null, x.p),
          h('ul', { className: 'questions web-body-l' }, x.q.map(function (q) { return h('li', { key: q }, q); })),
          e ? h(Origin, null, e.titulo + ' · ' + e.origen + '.') : null);
      }),
      h(Quote, null, 'Una prueba final: sin logo ni nombre, solo la pantalla. ¿Se entiende qué pasó, por qué y qué se puede hacer?'));
  }

  function Prisma() {
    var F = [
      { k: 'Físico', q: 'Lo que se ve', t: 'Un azul pleno sobre neutros, ángulos rectos, una grilla de 8 px y barras que se alinean. Nada redondo, nada que sobre.', o: 'Garganta definida · línea 3' },
      { k: 'Personalidad', q: 'Cómo somos', t: 'Curiosos, escépticos y precisos. Nos entusiasma lo nuevo, dudamos hasta comprobar y decimos las cosas por su nombre.', o: 'Puertas 35, 63 y 62' },
      { k: 'Relación', q: 'Cómo nos vinculamos', t: 'Guiamos por invitación. No perseguimos a nadie: nos preparamos, esperamos la pregunta y respondemos con todo lo que sabemos.', o: 'Proyector · Mercurio en la puerta 2' },
      { k: 'Cultura', q: 'Lo que valoramos', t: 'La exactitud por encima del brillo y el progreso comprobado por encima de la promesa. Arriesgamos, pero solo por lo que importa.', o: 'Venus en la 62 · Júpiter en la 28' },
      { k: 'Reflejo', q: 'A quién le hablamos', t: 'A alguien que decide con información incompleta y no quiere que lo apuren. Quiere entender, no que lo convenzan.', o: 'Autoridad mental' },
      { k: 'Autoimagen', q: 'Cómo se siente quien nos usa', t: 'Más claro y más capaz. Sale sabiendo algo que antes no sabía, y con palabras para explicarlo.', o: 'Canales 17-62 y 24-61' }
    ];
    var card = function (f) { return h('div', { key: f.k, className: 'prism__cell' }, h('span', { className: 'web-label-m cap' }, f.q), h('span', { className: 'web-h4' }, f.k), h('span', { className: 'web-body-m' }, f.t), h('span', { className: 'web-label-m cap' }, f.o)); };
    return h('div', { className: 'page' }, h(Head, { id: 'prisma', lede: 'Nuestras seis caras, ordenadas en el prisma de identidad: lo que mostramos y lo que llevamos dentro, lo que emitimos y lo que provocamos en quien nos recibe.' }),
      h('div', { className: 'prism' },
        h('span', { className: 'prism__axis prism__axis--top web-label-m cap' }, 'Emisor: nosotros'),
        h('span', { className: 'prism__axis prism__axis--l web-label-m cap' }, 'Lo que mostramos'),
        h('span', { className: 'prism__axis prism__axis--r web-label-m cap' }, 'Lo que llevamos dentro'),
        h('div', { className: 'prism__grid' }, F.map(card)),
        h('span', { className: 'prism__axis prism__axis--bottom web-label-m cap' }, 'Receptor: quien nos usa')),
      h(Sec, { title: 'Cómo leerlo' },
        h(Para, null, 'La columna izquierda es lo que cualquiera puede ver: nuestra forma, cómo nos vinculamos y a quién le hablamos. La derecha es lo que llevamos dentro: el carácter, los valores y lo que dejamos en las personas. Cuando las dos columnas dicen lo mismo, la marca es creíble. Cuando no, algo en el diseño está mintiendo.')));
  }

  // ---------- Lenguaje
  function Voz() {
    var R = [
      ['Curiosos', 'no dispersos', 'Nos interesa lo nuevo, pero no saltamos de tema en tema. Preguntamos para entender, no para entretener.', 'Puerta 35'],
      ['Escépticos', 'no cínicos', 'Dudamos de lo que no está comprobado y lo decimos, sin burlarnos de quien lo creyó. La duda es una herramienta, no una pose.', 'Puerta 63'],
      ['Precisos', 'no fríos', 'Usamos la palabra exacta y la cifra justa. La precisión es una forma de cuidado: nadie tiene que adivinar qué quisimos decir.', 'Puerta 62']
    ];
    return h('div', { className: 'page' }, h(Head, { id: 'voz', lede: 'Nuestra voz es una sola, hablemos donde hablemos: en una etiqueta, un error o una campaña. Es la voz de una mente que pregunta, prueba y nombra.', index: ['Atributos', 'Cómo hablamos', 'Quién habla', 'Así sí, así no'] }),
      h(Sec, { title: 'Atributos' }, h('div', { className: 'cards' }, R.map(function (r) {
        return h('div', { key: r[0], className: 'card card--static' }, h('span', { className: 'web-h4' }, r[0] + ', ', h('span', { className: 'cap' }, r[1])), h('span', { className: 'web-body-m cap' }, r[2]), h('span', { className: 'web-label-m cap' }, r[3]));
      }))),
      h(Sec, { title: 'Cómo hablamos' },
        h(Sub, { title: 'Fundados' }, h(Para, null, 'Damos datos y fuentes antes de opinar. Si una afirmación no tiene base, no la hacemos.')),
        h(Sub, { title: 'En voz alta' }, h(Para, null, 'Explicamos y conversamos. Nunca pedimos algo sin decir para qué, ni decidimos por la persona sin mostrarle las razones.')),
        h(Sub, { title: 'Por invitación' }, h(Para, null, 'Orientamos y recomendamos; no ordenamos. Reconocemos a la persona antes de pedirle algo.')),
        h(Origin, null, 'Línea consciente 1 · autoridad mental · Proyector · puerta 62 en la Garganta.')),
      h(Sec, { title: 'Quién habla' }, h(Para, null, 'Hablamos en plural, como el equipo que está detrás de cada pantalla, y tratamos de tú. Nunca hablamos de nosotros en tercera persona, y nunca culpamos a la persona por un error del sistema.'), h(Ex, { si: h(A.InlineNotification, { status: 'error', title: 'No se guardó el informe', message: 'Se perdió la conexión. Revisa la red y vuelve a intentarlo: tus cambios siguen aquí.' }), siCap: 'Qué pasó, por qué y qué hacer.', no: h(A.InlineNotification, { status: 'error', title: '¡Ups! Algo salió mal.', message: 'Ingresaste algo incorrecto. Inténtalo más tarde.' }), noCap: 'Nunca culpes a la persona ni escondas la causa detrás de un «¡Ups!».' })),
      h(Sec, { title: 'Así sí, así no' }, h(Tbl, { title: 'Ejemplos', columns: [{ key: 'caso', label: 'Caso' }, { key: 'si', label: 'Así sí' }, { key: 'no', label: 'Así no' }, { key: 'porque', label: 'Por qué' }], rows: V.ejemplos.map(function (x, i) { return Object.assign({ id: i }, x); }) })));
  }

  function Tono() {
    var TONO = [
      { id: 1, c: 'Bienvenida', t: 'Curioso', g: 'Lo mínimo', e: 'Explora los datos de ejemplo o importa los tuyos.' },
      { id: 2, c: 'Recomendación', t: 'Fundado', g: 'El porqué', e: 'Te recomendamos el plan anual: según tu uso, ahorras un 18 %.' },
      { id: 3, c: 'Error', t: 'Explicativo', g: 'Qué pasó y qué hacer', e: V.ejemplos[1].si },
      { id: 4, c: 'Acción irreversible', t: 'Exacto', g: 'Todo, con cifras', e: 'Se eliminarán 12 informes y no se podrán recuperar. Botón: «Eliminar 12 informes».' },
      { id: 5, c: 'Éxito', t: 'Sobrio', g: 'Una línea', e: 'Informe enviado a 4 personas.' },
      { id: 6, c: 'Dato incierto', t: 'Escéptico', g: 'Lo que falta', e: 'Estimado: entre 120 y 140 pedidos. Faltan los datos del domingo.' },
      { id: 7, c: 'Anuncio', t: 'Invitante', g: 'Lo nuevo y para qué', e: 'Lo nuevo de junio: compara dos versiones de un informe lado a lado. Pruébalo.' }
    ];
    return h('div', { className: 'page' }, h(Head, { id: 'tono', lede: 'La voz no cambia; el tono sí. Nos ajustamos al momento de la persona: no le hablamos igual a quien empieza que a quien está por borrar algo.', index: ['Según el momento', 'Cuánto explicamos', 'En ningún tono'] }),
      h(Sec, { title: 'Según el momento' }, h(Tbl, { title: 'Tono por momento', columns: [{ key: 'c', label: 'Momento' }, { key: 't', label: 'Tono' }, { key: 'g', label: 'Cuánto explicamos' }, { key: 'e', label: 'Ejemplo' }], rows: TONO })),
      h(Sec, { title: 'Cuánto explicamos' }, h(Para, null, 'Mientras más está en juego, más explicamos. En un éxito basta una línea; en un error decimos qué pasó y qué hacer; antes de algo irreversible decimos exactamente qué se pierde. Nunca explicamos para llenar espacio: explicamos para que la persona pueda decidir.'), h(Ex, { si: h(Mini, { eyebrow: 'Acción irreversible', title: 'Eliminar 12 informes', body: 'Se eliminarán 12 informes de junio y no se podrán recuperar.', actions: h('div', { className: 'demo-row' }, h(A.Button, { variant: 'filled', role: 'destructive' }, 'Eliminar 12 informes'), h(A.Button, { variant: 'tertiary' }, 'Cancelar')) }), siCap: 'Exacto: qué se pierde y cuánto, con el verbo en el botón.', no: h(Mini, { eyebrow: 'Atención', title: '¿Estás seguro?', body: false, actions: h('div', { className: 'demo-row' }, h(A.Button, { variant: 'filled', role: 'primary' }, 'Sí'), h(A.Button, { variant: 'tertiary' }, 'No')) }), noCap: 'Evita confirmaciones vagas con «Sí» y «No».' })),
      h(Sec, { title: 'En ningún tono' }, h(Avoid, { items: ['Evita exclamaciones, emojis y expresiones como «¡Ups!».', 'Nunca culpes a la persona: «Ingresaste un dato inválido».', 'Evita urgencias falsas: «¡Últimas horas!».', 'Nunca prometas lo que no está comprobado.'] })));
  }

  function Escritura() {
    return h('div', { className: 'page' }, h(Head, { id: 'escritura', lede: 'Reglas para que cualquier persona escriba como nosotros. Son pocas y son firmes, porque escribir bien también es diseñar.', index: ['Reglas', 'Palabras', 'Formatos'] }),
      h(Sec, { title: 'Reglas' }, h(Tbl, { title: 'Reglas de escritura', columns: [{ key: 'r', label: 'Regla' }, { key: 'si', label: 'Así' }, { key: 'o', label: 'Por qué' }], rows: [
        { id: 1, r: 'Botones con verbo y objeto', si: 'Enviar informe · Eliminar 12 informes', o: 'La acción se entiende sin leer nada más.' },
        { id: 2, r: 'Cifras, no aproximaciones', si: '3 de 12 servidores · 18 % · 4 personas', o: 'Una cifra exacta se puede verificar.' },
        { id: 3, r: 'La fuente a la vista', si: 'Según tu uso de los últimos 6 meses', o: 'Un dato sin origen pide fe.' },
        { id: 4, r: 'Lo estimado, marcado', si: 'Estimado: entre 120 y 140', o: 'La duda dicha a tiempo es honestidad.' },
        { id: 5, r: 'El porqué, siempre', si: 'No se guardó porque se perdió la conexión', o: 'Sin causa no hay solución.' },
        { id: 6, r: 'Invitar, no ordenar', si: 'Te recomendamos… · Pruébalo', o: 'Guiamos; no empujamos.' },
        { id: 7, r: 'Siempre una salida', si: 'Puedes volver a la versión anterior', o: 'Nada es definitivo.' },
        { id: 8, r: 'Tuteo, sin exclamaciones', si: 'Revisa la red y vuelve a intentarlo.', o: 'La confianza viene de la claridad.' },
        { id: 9, r: 'Mayúscula solo al inicio', si: 'Vista comparada · Informe mensual', o: 'Leemos más rápido en tipo oración.' }] })),
      h(Sec, { title: 'Palabras' }, h(Ex, { si: h(Mini, { title: '3 de 12 servidores necesitan atención', body: 'Uso de CPU sobre el 85 % en los últimos 15 minutos.', actions: h('div', { className: 'demo-row' }, h(A.Button, { variant: 'filled', role: 'primary' }, 'Revisar 3 servidores')) }), siCap: 'Cifras exactas, la causa y un botón con verbo y objeto.', no: h(Mini, { title: 'Algunos servidores podrían tener problemas', body: 'Te recomendamos revisarlos pronto.', actions: h('div', { className: 'demo-row' }, h(A.Button, { variant: 'filled', role: 'primary' }, 'OK')) }), noCap: 'Evita aproximaciones y botones que no dicen qué hacen.' }), h(Tbl, { title: 'Preferimos y evitamos', columns: [{ key: 'p', label: 'Preferimos' }, { key: 'e', label: 'Evitamos' }], rows: [
        { id: 1, p: 'Probar, comparar, verificar', e: 'Revolucionar, disruptivo' },
        { id: 2, p: 'Estimado, según, porque', e: 'Seguramente, sin duda' },
        { id: 3, p: 'Te recomendamos', e: 'Debes, tienes que' },
        { id: 4, p: 'No se pudo…', e: '¡Ups!, lo sentimos mucho' }] })),
      h(Sec, { title: 'Formatos' }, h(Bullets, { items: [
        ['Fechas.', '«3 jun 1911» en tablas y etiquetas; «3 de junio de 1911» en texto corrido.'],
        ['Horas.', 'Formato de 24 horas: 04:00, 18:30.'],
        ['Unidades.', 'Con espacio: 18 %, 8 px, 12 GB.'],
        ['Rangos.', 'Con guion: 1911-1924, 120-140.'],
        ['Números grandes.', 'Con punto de miles: 87.600 cartas.']] })));
  }

  // ---------- Elementos
  function Firma() {
    var f = useState('wide');
    return h('div', { className: 'page' }, h(Head, { id: 'firma', lede: 'Nuestra firma es un retrato de cómo pensamos: tres filas de barras, una por cada centro que nos define, unidas en un solo circuito. Acompaña al nombre; no lo reemplaza.', index: ['Construcción', 'Formatos', 'Espacio y tamaño', 'Color', 'Movimiento', 'Usos incorrectos'] }),
      h(Sec, { title: 'Construcción' },
        h(Para, null, 'La firma usa la gramática del símbolo de Cordura: barras escalonadas y destellos de cuatro puntas que unen las filas. La primera fila pregunta, la segunda piensa y la tercera dice. Como nuestras ideas llegan a la voz sin desvíos, todas las filas quedan unidas.'),
        h(Tbl, { title: 'Cada rasgo de la firma', columns: [{ key: 'r', label: 'Rasgo' }, { key: 'f', label: 'En la firma' }], rows: [
          { id: 1, r: 'Tres centros definidos', f: 'Tres filas de barras.' },
          { id: 2, r: 'Un solo circuito', f: 'Todas las filas unidas por destellos.' },
          { id: 3, r: 'Aprender probando', f: 'Barras de esquinas rectas.' },
          { id: 4, r: 'Guiar sin apuro', f: 'Entrada productiva, precisa y serena.' },
          { id: 5, r: 'Mirar alrededor', f: 'Azul, cian y púrpura; el azul como acento.' }] })),
      h(Sec, { title: 'Formatos' },
        h(A.SegmentedControl, { label: 'Formato', options: [{ value: 'wide', label: 'Portada 16:9' }, { value: 'square', label: 'Cuadrado 1:1' }, { value: 'tall', label: 'Historia 9:16' }], value: f[0], onChange: f[1] }),
        h(En.Signature, { entity: E, P: P, format: f[0] }),
        h(Para, null, 'La firma se recompone en cada formato: las barras se reordenan sobre la grilla y el nombre se apoya abajo a la izquierda. No se escala ni se recorta una versión en otra.')),
      h(Sec, { title: 'Espacio y tamaño' }, h(Bullets, { items: [
        ['Área de respeto.', 'Al menos la altura de una barra alrededor de la firma; nada entra en ese espacio.'],
        ['Tamaño mínimo.', '160 px de ancho en pantalla y 40 mm en impresión. Por debajo, se usa solo el nombre.'],
        ['Alineación.', 'Siempre a la grilla de 8 px y al margen izquierdo del contenido.']] })),
      h(Sec, { title: 'Color' }, h(Para, null, 'La firma vive sobre fondos oscuros neutros. Sobre fondos claros se usa la misma paleta, con el azul como barra principal. Nunca sobre fotografías ni sobre otro color de la paleta.')),
      h(Sec, { title: 'Movimiento' }, h(Para, null, 'Las barras entran escalonadas, con la curva productiva y un 25 % más lento que la base. Si la persona pidió menos movimiento, la firma aparece quieta en su estado final.')),
      h(Sec, { title: 'Usos incorrectos' }, h(Ex, { si: h('div', { className: 'ex__sig' }, h(En.Signature, { entity: E, P: P, format: 'square' }), h('p', { className: 'web-h5 ex__p' }, 'Compara dos versiones lado a lado')), siCap: 'El texto fuera de la firma, alineado a la grilla.', no: h('div', { className: 'ex__sig ex__sig--bad' }, h(En.Signature, { entity: E, P: P, format: 'square' }), h('p', { className: 'web-h3 ex__over' }, 'Compara dos versiones lado a lado')), noCap: 'Nunca escribas sobre las barras ni cambies sus colores.' }), h(Avoid, { items: ['No escribas texto encima de las barras.', 'No cambies los colores ni el orden de las filas.', 'No redondees las esquinas ni agregues sombras.', 'No la uses dentro de un formulario, una tabla o un botón.', 'No la gires ni la deformes.'] })));
  }

  function SpecRow(p) {
    var ref = React.useRef(null), m = useState('');
    useEffect(function () { var el = ref.current; if (!el) return; var cs = getComputedStyle(el); m[1](Math.round(parseFloat(cs.fontSize)) + ' / ' + Math.round(parseFloat(cs.lineHeight) || 0) + ' px · ' + cs.fontWeight); }, []);
    return h('div', { className: 'specimen__row' }, h('span', { className: 'tok' }, p.k, h('br'), h('span', { className: 'cap' }, m[0])), h('p', { ref: ref, className: p.k + ' specimen__text' }, p.t));
  }
  function Tipografia() {
    var S2 = [['web-display-m', 'Preguntar → Probar'], ['web-h1', 'Una mente que habla'], ['web-h2', 'Nombrado con exactitud'], ['web-h3', 'Pensado dos veces'], ['web-h4', 'Constante por diseño'], ['web-h5', 'Fundamentos tipográficos'], ['web-body-l', 'Frases cortas, datos exactos y verbos claros. Nuestra letra no se ensancha ni se adorna: va en su ancho natural.'], ['web-body-m', 'Texto de interfaz, descripciones y tablas.'], ['web-label-m', 'Etiquetas y controles'], ['web-body-s', 'Notas, fuentes y leyendas.']];
    return h('div', { className: 'page' }, h(Head, { id: 'tipografia', lede: 'La tipografía es nuestra voz hecha forma. Escribimos en Roboto Flex, en su ancho natural, con pocos pesos y una escala que ordena sin gritar.', index: ['La letra', 'Pesos', 'Escala'] }),
      h(Sec, { title: 'La letra' },
        h(Para, null, 'Roboto Flex es una tipografía variable: su ancho, su peso y su grado se ajustan por eje. Nosotros la usamos en su ancho natural (' + P.fontWidth + ') y con grado neutro. No nos ensanchamos para ocupar más lugar ni nos condensamos para decir más: cada palabra ocupa lo justo.'),
        h('p', { className: 'web-display-m type-sample' }, 'Aa Bb Cc 0123456789 ¿¡«»—')),
      h(Sec, { title: 'Pesos' },
        h(Tbl, { title: 'Cuatro pesos', columns: [{ key: 'r', label: 'Rol' }, { key: 'w', label: 'Peso' }, { key: 'n', label: 'Uso' }], rows: [
          { id: 1, r: 'Display', w: String(P.weights.display), n: 'Titulares grandes. Livianos: pensamos en voz alta, no imponemos.' },
          { id: 2, r: 'Títulos', w: String(P.weights.heading), n: 'Títulos de sección. Regulares: ordenan sin gritar.' },
          { id: 3, r: 'Texto', w: String(P.weights.body), n: 'Lectura larga e interfaz.' },
          { id: 4, r: 'Énfasis', w: String(P.weights.emphasis), n: 'Una palabra o frase clave por párrafo.' }] })),
      h(Sec, { title: 'Escala' },
        h('div', { className: 'specimen' }, S2.map(function (s) { return h(SpecRow, { key: s[0], k: s[0], t: s[1] }); })),
        h(Para, null, 'Los valores se miden en vivo desde los tokens de ALMA. La escala es la misma de ALMA; lo que cambia es el ancho y el peso.')),
      h(Origin, null, 'Línea consciente 1 (ancho natural) · autoridad mental (pesos 300 / 400 / 400 / 600).'));
  }

  function Fundamentos() {
    return h('div', { className: 'page' }, h(Head, { id: 'fundamentos', lede: 'La buena tipografía pasa inadvertida porque simplemente funciona. Estas son las prácticas que hacen que un texto nuestro se lea bien, en cualquier tamaño y en español.', index: ['Alineación', 'Interlineado', 'Largo de línea', 'Mayúsculas', 'Signos', 'Énfasis', 'Titulares'] }),
      h(Sec, { title: 'Alineación' }, h(Para, null, 'Alineamos a la izquierda, siempre. Crea un borde firme que el ojo sigue y que coincide con la grilla. Nunca justificamos: abre ríos de espacio entre palabras. Centramos solo una línea corta, y solo cuando está sola.'), h(Ex, { si: h('p', { className: 'web-body-m ex__p' }, 'Compara dos versiones de un informe lado a lado antes de decidir. Puedes volver a la vista anterior cuando quieras, sin perder ningún cambio.'), siCap: 'Alineado a la izquierda: un borde firme para el ojo.', no: h('p', { className: 'web-body-m ex__p', style: { textAlign: 'justify', maxWidth: '13rem', margin: '0 auto' } }, 'Compara dos versiones de un informe lado a lado antes de decidir. Puedes volver a la vista anterior cuando quieras, sin perder ningún cambio.'), noCap: 'Nunca justifiques: abre huecos entre palabras.' })),
      h(Sec, { title: 'Interlineado' }, h(Para, null, 'El texto de lectura respira con un interlineado de 1,5 veces su tamaño; los titulares, con algo menos. Los tokens de ALMA ya lo resuelven: no lo cambies a mano.')),
      h(Sec, { title: 'Largo de línea' }, h(Para, null, 'Entre 45 y 75 caracteres por línea. Más largo cansa; más corto entrecorta. En pantallas anchas, el texto no ocupa todo el ancho: se queda en su columna de lectura, de 48 rem como máximo.')),
      h(Sec, { title: 'Mayúsculas' }, h(Para, null, 'Escribimos en tipo oración: mayúscula al inicio y en nombres propios. Nunca escribimos párrafos ni botones en mayúsculas sostenidas. Las etiquetas pequeñas pueden ir en mayúsculas solo si tienen espaciado extra.')),
      h(Sec, { title: 'Signos' },
        h(Sub, { title: 'Comillas' }, h(Para, null, 'Usamos comillas latinas, « », y dentro de ellas las inglesas, “ ”. Nunca comillas rectas.')),
        h(Sub, { title: 'Raya, guion y menos' }, h(Para, null, 'La raya (—) abre incisos y diálogos. El guion (-) une compuestos y rangos: 1911-1924. El signo menos (−) va en cifras negativas.')),
        h(Sub, { title: 'Apertura' }, h(Para, null, 'En español, las preguntas y exclamaciones se abren: ¿Guardamos los cambios? Nunca omitimos el signo de apertura, ni siquiera en una etiqueta.')), h(Ex, { si: h(Mini, { eyebrow: '«Vista comparada»', title: '¿Guardamos los cambios?', body: 'Tus cambios de 2024-2025 siguen aquí — sin enviar.', actions: h('div', { className: 'demo-row' }, h(A.Button, { variant: 'filled', role: 'primary' }, 'Guardar cambios'), h(A.Button, { variant: 'tertiary' }, 'Descartar')) }), siCap: 'Comillas latinas, signo de apertura y raya para el inciso.', no: h(Mini, { eyebrow: '"Vista comparada"', title: 'Guardamos los cambios?', body: 'Tus cambios de 2024 - 2025 siguen aqui - sin enviar.', actions: h('div', { className: 'demo-row' }, h(A.Button, { variant: 'filled', role: 'primary' }, 'GUARDAR'), h(A.Button, { variant: 'tertiary' }, 'Descartar')) }), noCap: 'Evita comillas rectas, preguntas sin apertura, guiones mal usados y botones en mayúsculas.' })),
      h(Sec, { title: 'Énfasis' }, h(Para, null, 'Un solo recurso por vez. Si algo va en peso de énfasis, no va además en color, ni subrayado, ni en mayúsculas. Sumar recursos no enfatiza más: confunde.'), h(Ex, { si: h('p', { className: 'web-body-l ex__p' }, 'Con el plan anual ahorras un ', h('strong', null, '18 %'), ' al año.'), siCap: 'Un solo recurso: el peso de énfasis.', no: h('p', { className: 'web-body-l ex__p' }, 'Con el plan anual ahorras un ', h('strong', { style: { color: 'var(--interactive-01)', textDecoration: 'underline', textTransform: 'uppercase', fontStyle: 'italic' } }, '18 % al año'), '.'), noCap: 'Evita sumar peso, color, subrayado y mayúsculas.' })),
      h(Sec, { title: 'Titulares' }, h(Para, null, 'Preferimos titulares cortos, partidos en dos o tres líneas, a una sola línea larga. Evitamos dejar una palabra sola en la última línea. Para distinguir título y subtítulo usamos un recurso: tamaño o peso, no los dos.')),
      h(Avoid, { items: ['No justifiques el texto.', 'No uses mayúsculas sostenidas para destacar.', 'No combines peso, color y subrayado en la misma palabra.', 'No uses comillas rectas.'] }));
  }

  function Color() {
    var d = P.accent.dark, l = P.accent.light, c = En.contrast, STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    var BG = '#02010C';
    var spec = STEPS.map(function (st) {
      var row = { id: st, s: String(st) };
      P.palette.forEach(function (f, i) { row['f' + i] = h('span', { className: 'stat__v' }, h(Chip, { c: f.ramp[st] }), f.ramp[st]); });
      return row;
    });
    var acc = STEPS.map(function (st) {
      var v = P.palette[0].ramp[st], w = c('#FFFFFF', v), k = c(v, BG);
      var ok = function (x) { return x >= 4.5 ? 'Texto' : x >= 3 ? 'Gráficos y texto grande' : 'No'; };
      return { id: st, s: P.palette[0].name + ' ' + st, w: w.toFixed(2) + ':1 · ' + ok(w), k: k.toFixed(2) + ':1 · ' + ok(k) };
    });
    var roles = [
      { id: 1, t: 'interactive-01', v: d['interactive-01'], u: 'Acción principal, en ambos temas' },
      { id: 2, t: 'hover-primary', v: d['hover-primary'], u: 'Acción principal al pasar el cursor' },
      { id: 3, t: 'link-01 (oscuro)', v: d['link-01'], u: 'Enlaces y selección sobre fondos oscuros' },
      { id: 4, t: 'link-01 (claro)', v: l['link-01'], u: 'Enlaces y selección sobre fondos claros' },
      { id: 5, t: 'control-on (oscuro)', v: d['control-on'], u: 'Controles activos y bordes de campo' }
    ];
    return h('div', { className: 'page' }, h(Head, { id: 'color', lede: 'Nuestra paleta parte de un azul pleno y se extiende solo hacia sus vecinos. Sobre neutros sobrios, el color aparece donde se puede actuar, y por eso se reconoce.', index: ['El azul al centro', 'Especificaciones', 'Familias', 'Color en la interfaz', 'Accesibilidad', 'Color en acción'] }),
      h(Sec, { title: 'El azul al centro' },
        h(Para, null, 'El azul es el punto de partida. Combinado con la sobriedad de los neutros, da una apariencia clara, seria y reconocible. No lo elegimos por moda: es el color de cómo pensamos.'),
        h(En.Palette, { P: P }),
        h(Sub, { title: 'Neutros' }, h(Para, null, 'Los neutros de ALMA dominan toda experiencia. Organizan zonas con cambios sutiles de valor y dejan que el azul tenga un propósito. Si una pantalla se siente azul, tiene demasiado azul.')),
        h(Ex, { si: h(Mini), siCap: 'Neutros para la superficie; el azul solo en la acción principal.', no: h(Mini, { style: ON_BLUE }), noCap: 'Evita fondos enteros de azul para «darle marca»: la acción deja de destacar.' })),
      h(Sec, { title: 'Especificaciones' },
        h(Para, null, 'Cada familia tiene nueve pasos, del 100 al 900, calculados en OKLCH para que la luminosidad sea pareja entre familias: un 600 azul y un 600 cian pesan lo mismo.'),
        h(Tbl, { title: 'Pasos por familia (HEX)', columns: [{ key: 's', label: 'Paso' }].concat(P.palette.map(function (f, i) { return { key: 'f' + i, label: f.name }; })), rows: spec })),
      h(Sec, { title: 'Familias' },
        h(Ex, { si: h(Mini, { actions: h('div', { className: 'demo-row' }, h(A.Button, { variant: 'filled', role: 'primary' }, 'Enviar informe'), h(A.Button, { variant: 'tertiary' }, 'Guardar borrador')) }), siCap: 'Una acción, un color: el azul.', no: h('div', { style: { '--button-filled-bg': P.palette[2].ramp[600], '--button-filled-bg-hover': P.palette[2].ramp[700] } }, h(Mini)), noCap: 'Nunca uses púrpura o cian en una acción: son colores de apoyo.' }),
        h(Para, null, 'Toda combinación incluye el azul. Para dos colores, azul con cian o azul con púrpura; para tres, los tres. Cuando hace falta uno solo, es el azul.'),
        h(Avoid, { items: ['Evita combinar cian y púrpura sin azul.', 'Evita colores fuera de la paleta, salvo los de estado (error, advertencia, éxito).', 'Evita degradados en la interfaz. En comunicación, solo entre dos pasos vecinos de una misma familia.'] })),
      h(Sec, { title: 'Color en la interfaz' },
        h(Para, null, 'Los neutros ordenan; el azul marca la acción principal en todos los productos, para que nuestro color sea parte de cada interacción. Los demás colores se usan poco y con un propósito.'),
        h('div', { className: 'ratio', 'aria-hidden': 'true' }, h('span', { style: { flex: 7, background: 'var(--ui-01)' } }), h('span', { style: { flex: 1.6, background: 'var(--text-01)' } }), h('span', { style: { flex: 1, background: P.palette[0].ramp[600] } }), h('span', { style: { flex: 0.4, background: P.palette[1].ramp[400] } })),
        h(Tbl, { title: 'Roles', columns: [{ key: 't', label: 'Token' }, { key: 'v', label: 'Valor' }, { key: 'u', label: 'Uso' }], rows: roles })),
      h(Sec, { title: 'Accesibilidad' },
        h(Para, null, 'El color no puede interponerse entre el mensaje y la persona. Todo texto pequeño necesita un contraste de 4,5:1; el texto grande y los gráficos, 3:1. Esta tabla muestra qué pasos del azul cumplen, con texto blanco y sobre el fondo oscuro de ALMA.'),
        h(Tbl, { title: 'Contraste del azul', columns: [{ key: 's', label: 'Paso' }, { key: 'w', label: 'Con texto blanco' }, { key: 'k', label: 'Sobre el fondo oscuro' }], rows: acc }),
        h(Sub, { title: 'Daltonismo' }, h(Para, null, 'Nunca usamos solo el color para comunicar: un estado lleva icono y texto, una serie lleva etiqueta, un enlace se distingue también por su forma. El azul y el púrpura se confunden con facilidad: nunca los usamos solos para separar dos cosas.'))),
      h(Sec, { title: 'Color en acción' }, h(Para, null, 'Golpes deliberados de azul sobre neutros ricos: así se ve la paleta en la galería de producto y comunicación.'), h('a', { className: 'web-body-l', href: '#producto' }, 'Ver la galería')),
      h(Origin, null, 'Tono desde Ajna (autoridad mental), saturación por tres centros y la Garganta definida, armonía análoga del Proyector.'));
  }

  function Grilla() {
    var SP = ['space-8', 'space-16', 'space-24', 'space-32', 'space-48', 'space-64', 'space-80'];
    return h('div', { className: 'page' }, h(Head, { id: 'grilla', lede: 'La grilla es la estructura de todo lo que mostramos. Da el orden justo para que la atención vaya a la idea, no a decidir dónde va cada cosa.', index: ['Unidad base', 'Columnas', 'Espacio', 'Proporciones', 'Forma'] }),
      h(Sec, { title: 'Unidad base' }, h(Para, null, 'Todo se mide en múltiplos de 8 px: tamaños, márgenes, separaciones y la altura de cada línea. La unidad base da precisión; la grilla da estructura. Juntas hacen que cualquier pieza encaje con cualquier otra.')),
      h(Sec, { title: 'Columnas' },
        h('div', { className: 'grid16', 'aria-hidden': 'true' }, Array.from({ length: 16 }).map(function (_, i) { return h('span', { key: i }); })),
        h(Tbl, { title: 'Grilla por ancho', columns: [{ key: 'b', label: 'Desde' }, { key: 'c', label: 'Columnas' }, { key: 'm', label: 'Margen' }, { key: 'g', label: 'Separación' }], rows: [
          { id: 1, b: '320 px', c: '4', m: '16 px', g: '8 px' },
          { id: 2, b: '672 px', c: '8', m: '16 px', g: '32 px' },
          { id: 3, b: '1056 px', c: '16', m: '16 px', g: '32 px' },
          { id: 4, b: '1584 px', c: '16', m: '24 px', g: '32 px' }] }),
        h(Para, null, 'Elige una división y mantenla en todo el diseño. El texto se alinea a las separaciones, no a los bordes del lienzo.')),
      h(Sec, { title: 'Espacio' },
        h('div', { className: 'spaces' }, SP.map(function (t) { return h('div', { key: t, className: 'spaces__row' }, h('span', { className: 'tok' }, t), h('span', { className: 'spaces__bar', style: { width: 'var(--' + t + ')' } }), h('span', { className: 'web-body-s cap' }, cssVar('--' + t))); })),
        h(Para, null, 'Mientras más grande el objeto, más espacio alrededor. Lo que va junto se ve junto: con una separación consistente no hacen falta divisores ni cajas.')),
      h(Sec, { title: 'Proporciones' }, h(Para, null, 'Imágenes y contenedores usan proporciones comunes: 16:9, 4:3, 3:2, 1:1 y 9:16. El ancho se mide en columnas; el alto se deriva de la proporción.')),
      h(Sec, { title: 'Forma' },
        h('div', { className: 'cards' }, [['radius-button', P.radius['radius-button']], ['radius-card', P.radius['radius-card']], ['radius-field', P.radius['radius-field']], ['radius-checkbox', P.radius['radius-checkbox']]].map(function (r) {
          return h('div', { key: r[0], className: 'card card--static' }, h('div', { className: 'shape', style: { borderRadius: r[1] } }), h('span', { className: 'tok' }, r[0] + ' · ' + r[1]));
        })),
        h(Para, null, 'Nuestros ángulos son rectos. Hacen visible la alineación: cuando algo se sale de la grilla, se nota de inmediato. Solo la casilla de verificación conserva 2 px, para seguir leyéndose como control.'),
        h(Ex, { si: h(Mini), siCap: 'Esquinas rectas, separación con espacio y todo alineado a la izquierda.', no: h(Mini, { style: { '--radius-button': '24px', borderRadius: '16px', boxShadow: '0 12px 32px rgba(0,0,0,0.35)', marginLeft: '13px' }, titleStyle: { textAlign: 'center' } }), noCap: 'Evita radios, sombras decorativas y elementos fuera de la grilla.' }),
        h(Avoid, { items: ['No redondees esquinas «para suavizar».', 'No uses sombras para separar: usa espacio o una línea de 1 px.', 'Nunca dividas desde el borde del lienzo cuando hay margen.'] })),
      h(Origin, null, 'Línea inconsciente 3: aprender probando y quitar lo que sobra.'));
  }

  function Iconografia() {
    var N = ['search', 'information', 'warning', 'checkmark', 'renew', 'download', 'send', 'settings', 'user--avatar', 'add', 'close', 'view'];
    return h('div', { className: 'page' }, h(Head, { id: 'iconografia', lede: 'Un icono es un nombre corto. Representa una idea, un objeto o una acción de un vistazo, y ahorra palabras solo cuando no deja dudas.', index: ['El sistema', 'Principios', 'Tamaños', 'Color', 'Accesibilidad', 'Pictogramas'] }),
      h(Sec, { title: 'El sistema' }, h(Para, null, 'Usamos los iconos de ALMA, de la familia IBM Carbon: de línea, construidos sobre una grilla y con esquinas consistentes. No dibujamos iconos propios para un caso puntual; si falta uno, se propone al sistema.')),
      h(Sec, { title: 'Principios' },
        h(Sub, { title: 'Exactos' }, h(Para, null, 'Un icono, un significado. Siempre el mismo icono para la misma idea en todos los productos.')),
        h(Sub, { title: 'Esenciales' }, h(Para, null, 'Solo los trazos necesarios para reconocer la idea. Nada de relleno, brillo ni detalle decorativo.')),
        h(Sub, { title: 'Acompañados' }, h(Para, null, 'Un icono acompaña al texto; no lo reemplaza. Solo va solo en barras de herramientas, y entonces lleva una etiqueta accesible.'))),
      h(Sec, { title: 'Tamaños' },
        [16, 24, 32].map(function (s) { return h(Frame, { key: s, label: s + ' px · ' + (s === 16 ? 'junto a un texto, con 16 px de separación' : s === 24 ? 'sueltos, en barras y acciones' : 'zonas vacías y estados') }, h('div', { className: 'icons', style: { gap: s } }, N.map(function (n) { return h(A.Icon, { key: n, name: n, size: s }); }))); })),
      h(Sec, { title: 'Color' }, h(Para, null, 'Los iconos toman el color del texto que acompañan. El azul se reserva para iconos activos o que son enlaces; los colores de estado, para información, advertencia, error y éxito.'), h(Ex, { si: h('div', { className: 'demo-row ex__center' }, h(A.Button, { variant: 'tertiary', iconBefore: 'download' }, 'Descargar informe'), h(A.Button, { variant: 'tertiary', iconBefore: 'send' }, 'Enviar')), siCap: 'Icono y texto juntos, en el color del texto.', no: h('div', { className: 'demo-row ex__center' }, h(A.Button, { variant: 'tertiary', iconBefore: 'download', 'aria-label': 'Descargar' }), h('span', { className: 'web-body-m ex__icotext' }, h(A.Icon, { name: 'information', size: 32 }), 'Último informe: 3 jun')), noCap: 'Evita iconos solos y en azul cuando no se pueden tocar; ni tamaños mezclados.' })),
      h(Sec, { title: 'Accesibilidad' }, h(Para, null, 'Todo icono interactivo tiene un área de toque de al menos 44 × 44 px y un nombre accesible. Los iconos decorativos se ocultan a los lectores de pantalla.')),
      h(Sec, { title: 'Pictogramas' }, h(Para, null, 'Un pictograma representa un concepto amplio, no una acción. Será más grande y con más contexto que un icono, con el mismo trazo recto. ALMA todavía no tiene pictogramas: esta es la regla para cuando existan.')),
      h(Avoid, { items: ['No uses iconos rellenos o en tres dimensiones.', 'No pongas un icono solo, sin etiqueta.', 'No uses dos iconos distintos para la misma idea.', 'No pintes de azul un icono que no se puede tocar.'] }));
  }

  function Ilustracion() {
    return h('div', { className: 'page' }, h(Head, { id: 'ilustracion', lede: 'Ilustramos para explicar. Un dibujo nuestro muestra cómo funciona algo antes de mostrar cómo se siente.', index: ['Punto de vista', 'Estilos', 'Personas', 'Color'] }),
      h(A.InlineNotification, { kind: 'callout', status: 'info', title: 'Reglas antes que piezas', message: 'ALMA todavía no tiene ilustraciones. Estas son las reglas que van a seguir cuando existan.' }),
      h(Sec, { title: 'Punto de vista' }, h(Para, null, 'Si la fotografía muestra el mundo como es, la ilustración muestra lo que no se ve: un proceso, un sistema, una relación entre datos. Por eso nuestras ilustraciones son diagramas antes que escenas, y cada una explica una sola idea.')),
      h(Sec, { title: 'Estilos' },
        h(Sub, { title: 'Línea' }, h(Para, null, 'El estilo principal. Trazos rectos de grosor uniforme, sobre la grilla de 8 px, con esquinas en ángulo recto. Ideal para procesos y arquitecturas.')),
        h(Sub, { title: 'Plano' }, h(Para, null, 'Planos de color de nuestra paleta, sin degradados ni sombras. Para conceptos que necesitan más presencia, como portadas o temas.')),
        h(Sub, { title: 'Interfaz' }, h(Para, null, 'Fragmentos de nuestra propia interfaz, simplificados, para explicar una función. Siempre con componentes de ALMA, nunca inventados.'))),
      h(Sec, { title: 'Personas' }, h(Para, null, 'Cuando dibujamos personas, las mostramos haciendo algo: pensando, comparando, explicando. Siluetas simples y diversas, sin rasgos caricaturescos.')),
      h(Sec, { title: 'Color' }, h(Para, null, 'Azul para lo importante, neutros para el resto, cian y púrpura solo como apoyo. Una ilustración nunca usa más de tres colores de la paleta.')),
      h(Avoid, { items: ['Evita metáforas gastadas: bombillas, cohetes, engranajes.', 'Evita volúmenes, brillos y perspectivas exageradas.', 'Evita personajes y mascotas.', 'Evita ilustrar lo que una frase ya explica.'] }));
  }

  function Fotografia() {
    return h('div', { className: 'page' }, h(Head, { id: 'fotografia', lede: 'Nuestras imágenes reflejan cómo miramos el mundo: con atención, sin poses y buscando el detalle que explica.', index: ['Punto de vista', 'Tipos de imagen', 'Técnica'] }),
      h(A.InlineNotification, { kind: 'callout', status: 'info', title: 'Reglas antes que piezas', message: 'ALMA todavía no tiene un banco de fotografías. Estas son las reglas para elegir o producir las primeras.' }),
      h(Sec, { title: 'Punto de vista' }, h(Para, null, 'Somos observadores del trabajo. Una buena fotografía nuestra pone en contexto una pregunta: muestra a alguien en medio de un problema real, con las herramientas en la mano. No celebra el resultado; muestra el proceso que lo hizo posible.')),
      h(Sec, { title: 'Tipos de imagen' },
        h(Sub, { title: 'Reportaje: el trabajo en curso' }, h(Para, null, 'La mayor parte de nuestras imágenes. Personas resolviendo algo, fotografiadas como en un documental: sin mirar a cámara, en su lugar de trabajo, con luz del lugar.')),
        h(Sub, { title: 'Retrato: personas que piensan' }, h(Para, null, 'Retratos de quienes hacen el trabajo, con el mismo cuidado para todos. La expresión es de atención, no de sonrisa ensayada.')),
        h(Sub, { title: 'Objeto: el detalle que explica' }, h(Para, null, 'Una pieza, una pantalla, una mano sobre un instrumento. Fondos neutros, encuadre frontal y foco exacto en lo que se puede nombrar.'))),
      h(Sec, { title: 'Técnica' }, h(Bullets, { items: [
        ['Encuadre.', 'Ortogonal, con líneas que siguen la grilla. Espacio libre para texto fuera del sujeto.'],
        ['Luz.', 'Natural o del lugar. Sin flashes duros ni luces de colores.'],
        ['Color.', 'Fiel a la realidad. Sin filtros ni virados; el azul aparece cuando está en la escena, no se agrega.'],
        ['Foco.', 'Una sola cosa en foco: la que la imagen quiere explicar.']] })),
      h(Avoid, { items: ['Evita las fotos de banco con apretones de manos y sonrisas a cámara.', 'Evita los fondos inventados y los montajes.', 'Evita las imágenes que no explican nada.'] }));
  }

  function Barras(p) {
    var max = 140;
    return h('div', { className: 'bars bars--mini' }, p.vals.map(function (v, i) {
      var w = Math.max(2, (v - p.min) / (max - p.min) * 100);
      return h('div', { key: i, className: 'bars__row' }, h('span', { className: 'web-body-s' }, ['Norte', 'Centro', 'Sur'][i]), h('span', { className: 'bars__track' }, h('span', { className: 'bars__bar', style: { width: w + '%', background: p.color || p.colors[i] } })), h('span', { className: 'web-body-s bars__v' }, p.labels ? String(v) : ''));
    }));
  }
  function Datos() {
    var seq = [[0, 600], [1, 400], [2, 500], [0, 300], [1, 700], [2, 300]].map(function (x) { return { n: P.palette[x[0]].name + ' ' + x[1], c: P.palette[x[0]].ramp[x[1]] }; });
    var bars = [['Norte', 128], ['Centro', 96], ['Sur', 74], ['Online', 51]], max = 140;
    return h('div', { className: 'page' }, h(Head, { id: 'datos', lede: 'Los datos son nuestro terreno. Una visualización nuestra responde una pregunta de un vistazo, muestra de dónde viene y dice lo que no sabe.', index: ['Exactas', 'Fundadas', 'Honestas con la duda', 'Sobrias', 'Comparables', 'Series de color', 'Ejemplo'] }),
      h(Sec, { title: 'Exactas' }, h(Para, null, 'Cada marca corresponde a su valor. Los ejes empiezan en cero cuando se comparan cantidades, y las proporciones nunca se exageran. Una mala representación lleva a una mala decisión.'), h(Ex, { hide: true, si: h(Barras, { vals: [128, 96, 74], min: 0, labels: true, color: P.palette[0].ramp[600] }), siCap: 'Desde cero, con el valor en cada barra y una sola serie en azul.', no: h(Barras, { vals: [128, 96, 74], min: 70, labels: false, colors: [P.palette[2].ramp[500], P.palette[1].ramp[400], P.palette[0].ramp[300]] }), noCap: 'Nunca cortes el eje: 128 frente a 74 parece diez veces más.' })),
      h(Sec, { title: 'Fundadas' }, h(Para, null, 'Toda visualización dice de dónde salen los datos y qué período cubren. La fuente va a la vista, no en una nota al final.')),
      h(Sec, { title: 'Honestas con la duda' }, h(Para, null, 'Lo estimado, lo incompleto y lo proyectado se marcan con trama y con la palabra «estimado». Mostrar la incertidumbre no debilita el dato: lo vuelve confiable.')),
      h(Sec, { title: 'Sobrias' }, h(Para, null, 'Elegimos el gráfico que mejor responde la pregunta y quitamos todo lo demás: sin tres dimensiones, sin sombras, sin decoración. Si una cifra basta, mostramos la cifra.')),
      h(Sec, { title: 'Comparables' }, h(Para, null, 'Los mismos colores, escalas y formatos en todos nuestros productos. Un azul significa lo mismo en un informe que en un panel.')),
      h(Sec, { title: 'Series de color' }, h('div', { className: 'seq' }, seq.map(function (s, i) { return h('div', { key: i, className: 'seq__item' }, h('span', { className: 'seq__sw', style: { background: s.c } }), h('span', { className: 'web-label-m' }, (i + 1) + ' · ' + s.n), h('span', { className: 'tok' }, s.c)); })), h(Para, null, 'Una sola serie va en azul. Las demás siguen este orden, que alterna familia y luminosidad para que dos series vecinas nunca se confundan.')),
      h(Sec, { title: 'Ejemplo' }, h(Frame, { label: 'Pedidos por región, junio' },
        h('div', { className: 'bars', role: 'img', 'aria-label': 'Pedidos por región: Norte 128, Centro 96, Sur 74, Online 51 (estimado).' }, bars.map(function (b, i) {
          return h('div', { key: b[0], className: 'bars__row' }, h('span', { className: 'web-body-m' }, b[0]), h('span', { className: 'bars__track' }, h('span', { className: 'bars__bar' + (i === 3 ? ' bars__bar--est' : ''), style: { width: (b[1] / max * 100) + '%', background: seq[0].c } })), h('span', { className: 'web-body-m bars__v' }, b[1] + (i === 3 ? ' · estimado' : '')));
        })),
        h('p', { className: 'web-body-s cap' }, 'Fuente: registro de pedidos, 1 al 30 de junio. Online: faltan los datos del domingo.'))),
      h(Avoid, { items: ['No cortes un eje para exagerar una diferencia.', 'No uses gráficos de torta con más de cuatro partes.', 'No uses el color como única forma de distinguir series.'] }),
      h(Origin, null, 'Puerta 62 (nombrar con precisión), puerta 63 (verificar) y línea 1 (la base a la vista).'));
  }

  function Movimiento() {
    var D = ['duration-fast-01', 'duration-fast-02', 'duration-moderate-01', 'duration-moderate-02', 'duration-slow-01', 'duration-slow-02'];
    var ms = function (v) { var n = parseFloat(v); return /ms/.test(v) ? n : n * 1000; };
    var rows = D.map(function (t) { var v = cssVar('--' + t), b = ms(v); return { id: t, t: t, a: isNaN(b) ? '—' : b + ' ms', e: isNaN(b) ? '—' : Math.round(b * P.motion.speed) + ' ms' }; });
    return h('div', { className: 'page' }, h(Head, { id: 'movimiento', lede: 'El movimiento es una forma de explicar. Lo usamos para mostrar qué cambió, de dónde viene algo y hacia dónde va. Nada más.', index: ['Enfoque', 'Productivo y expresivo', 'Duraciones', 'Movimiento reducido', 'Aplicaciones'] }),
      h(Sec, { title: 'Enfoque' },
        h(Sub, { title: 'Explicativo' }, h(Para, null, 'Cada movimiento responde una pregunta: qué pasó, qué cambió, qué sigue. Si no explica nada, no se mueve.')),
        h(Sub, { title: 'Breve' }, h(Para, null, 'Respetamos el tiempo de la persona. El movimiento termina antes de que alguien tenga que esperarlo.')),
        h(Sub, { title: 'Sereno' }, h(Para, null, 'Sin rebotes, giros ni excesos. Nos movemos un 25 % más lento que la base de ALMA, con la calma de quien no necesita llamar la atención.')),
        h(Sub, { title: 'Estable' }, h(Para, null, 'Lo que ya está en pantalla se queda donde está. El movimiento nunca reordena lo que la persona ya aprendió.'))),
      h(Sec, { title: 'Productivo y expresivo' },
        h('div', { className: 'motion' }, h('div', { className: 'motion__track', 'aria-hidden': 'true' }, h('span', { className: 'motion__bar' }))),
        h(Para, null, 'ALMA tiene dos curvas: productiva, eficiente y precisa, y expresiva, con más carácter. La productiva es la nuestra en toda la interfaz. La expresiva queda para la firma y las portadas, donde un momento de carácter ayuda a contar algo.')),
      h(Sec, { title: 'Duraciones' }, h(Tbl, { title: 'Duraciones de ALMA y las nuestras (× ' + String(P.motion.speed).replace('.', ',') + ')', columns: [{ key: 't', label: 'Token' }, { key: 'a', label: 'ALMA' }, { key: 'e', label: 'Nuestra' }], rows: rows })),
      h(Sec, { title: 'Movimiento reducido' }, h(Para, null, 'Si la persona pidió menos movimiento, no animamos: mostramos el estado final de inmediato. Ningún contenido depende de una animación para entenderse.')),
      h(Sec, { title: 'Aplicaciones' }, h(Bullets, { items: [
        ['Confirmar.', 'Una transición productiva y corta confirma que una tarea terminó.'],
        ['Orientar.', 'Un panel que se abre muestra de dónde viene, para no perder el contexto.'],
        ['Presentar.', 'La firma entra con la curva expresiva en portadas y aperturas.']] })),
      h(Avoid, { items: ['No animes para decorar o entretener.', 'No uses rebotes, giros ni escalas exageradas.', 'No muevas elementos que la persona está leyendo.'] }),
      h(Origin, null, 'Proyector: sin motor propio, su energía viene de pensar. Puerta 5: sostener un ritmo.'));
  }

  function Carta() {
    var rasgos = [
      { id: 1, k: 'Tipo', v: En.TYPES[E.type].name, r: 'Estrategia: ' + En.TYPES[E.type].strategy.toLowerCase() + '. Guía cuando la invitan; no empuja.' },
      { id: 2, k: 'Perfil', v: C.perfil + ' · ' + En.LINES[a[0]] + ' / ' + En.LINES[a[1]], r: 'Consciente: investiga hasta tener una base. Inconsciente: prueba, falla y corrige.' },
      { id: 3, k: 'Autoridad', v: En.AUTH[E.auth].name, r: 'Decide conversando y tomando distancia, no por impulso.' },
      { id: 4, k: 'Definición', v: En.DEFS[E.def].name, r: 'Un solo circuito: Cabeza, Ajna y Garganta conectadas. La idea llega a la voz sin desvíos.' },
      { id: 5, k: 'Centros definidos', v: C.definidos.map(CENTRO).join(', '), r: 'Preguntas, conceptos y expresión: una mente que habla.' },
      { id: 6, k: 'Canales', v: canalesTxt.join(' · '), r: 'Sus rasgos fijos. Se convierten en sus principios.' },
      { id: 7, k: 'Cruz', v: C.cruz.puertas.join(' / ') + ' · ángulo ' + C.cruz.angulo, r: 'Su propósito: Sol y Tierra conscientes, Sol y Tierra inconscientes.' }
    ];
    var act = C.personalidad.map(function (p, i) {
      var d = C.diseno[i];
      return { id: i, c: p.cuerpo, p: p.puerta + '.' + p.linea + ' · ' + HEX(p.puerta), d: d.puerta + '.' + d.linea + ' · ' + HEX(d.puerta) };
    });
    return h('div', { className: 'page' }, h(Head, { id: 'carta', lede: 'Nos conocemos porque tenemos carta, calculada con efemérides reales para el ' + fechaLarga + '. El lado inconsciente es el ' + new Date(C.utc.diseno).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) + ', cuando el Sol estaba 88° antes.' }),
      h('div', { className: 'carta-grid' },
        h('div', { className: 'chart__graph carta-graph' }, h(En.BodyGraph, { entity: E, P: P })),
        h('div', { className: 'sec' }, h(Tbl, { title: 'Rasgos de la entidad', columns: [{ key: 'k', label: 'Rasgo' }, { key: 'v', label: 'Valor' }, { key: 'r', label: 'Qué dice' }], rows: rasgos }))),
      h(Sec, { title: 'Los canales' }, h(Cards, { items: C.canales.map(function (k) {
        var pp = k.puertas.map(function (n) { return CT.PUERTAS[n]; });
        return [CT.CANAL_NOMBRE[k.id], pp[0].principio + ' y ' + pp[1].principio.charAt(0).toLowerCase() + pp[1].principio.slice(1) + '.', 'Canal ' + k.id + ' · ' + k.centros.map(CENTRO).join(' y ')];
      }) })),
      h(Tbl, { title: 'Activaciones: puerta.línea', columns: [{ key: 'c', label: 'Cuerpo' }, { key: 'p', label: 'Consciente (personalidad)' }, { key: 'd', label: 'Inconsciente (diseño)' }], rows: act }));
  }

  function Fecha() {
    var rows = S.ventanas.map(function (w, i) { return { id: i, f: w.fecha + ' · ' + w.horas, k: w.canales, c: w.cruz, a: h('span', { className: 'stat__v' }, h(Chip, { c: w.acento }), w.acento), d: fmt3(w.dE) + (w.elegida ? ' · elegida' : '') }; });
    return h('div', { className: 'page' }, h(Head, { id: 'fecha', lede: 'La compañía se fundó el 16 de junio de 1911, pero la carta de ese día no se parece a lo que somos. En vez de forzar las reglas, se buscó el momento cuya carta sí nos explica.' }),
      h(Sec, { title: 'La búsqueda' },
        h(Para, null, 'Revisamos hora por hora ' + S.anios.length + ' años clave de su historia (' + S.anios.join(', ') + '): más de 87.000 cartas. Solo seis ventanas dan un Proyector 1/3 con Cabeza, Ajna y Garganta definidas, todas en 1911 y 1924.'),
        h(Tbl, { title: 'Las seis ventanas (Nueva York)', columns: [{ key: 'f', label: 'Fecha y horas' }, { key: 'k', label: 'Canales' }, { key: 'c', label: 'Cruz' }, { key: 'a', label: 'Acento (mejor hora)' }, { key: 'd', label: 'ΔE al Blue 60' }], rows: rows })),
      h(Sec, { title: 'Por qué el 3 de junio' }, h(Bullets, { items: [
        ['El mismo mes de la fundación.', 'Trece días antes de la firma de 1911: el momento en que la compañía ya existía como idea.'],
        ['El azul sale solo.', 'Con la semilla natural de la fecha, sin elegir variaciones, el acento es ' + ACC + '. La diferencia con el Blue 60 es ' + fmt3(DELTA) + ': el ojo no la ve.'],
        ['Una carta coherente.', 'Sus canales, 17-62 y 24-61, son mentales y verbales: pensar, dudar y nombrar. Encajan con una marca que siempre ha hablado de pensar.']] })),
      h(A.InlineNotification, { kind: 'callout', status: 'warning', title: 'Una fecha elegida, no la de fundación', message: 'Para marcas que ya existen, la fecha es una decisión: se elige el momento cuya carta explica lo que la marca ya es. Para marcas nuevas, como Cordura, manda la fecha real.' }));
  }

  function Calibracion() {
    var d = P.accent.dark, l = P.accent.light, I = S.ibm, R = S.real;
    var rows = [
      { id: 1, e: 'Acento (botón principal)', g: d['interactive-01'], i: I.blue + ' · Blue 60', r: R.acento, ok: 'Coincide' },
      { id: 2, e: 'Acento al pasar el cursor', g: d['hover-primary'], i: 'Blue 70', r: '—', ok: 'Coincide' },
      { id: 3, e: 'Texto sobre el acento', g: d['text-on-interactive'], i: '#FFFFFF', r: '#FFFFFF', ok: 'Igual' },
      { id: 4, e: 'Enlaces en oscuro', g: d['link-01'], i: I.blue30 + ' · Blue 30', r: '—', ok: 'Coincide' },
      { id: 5, e: 'Enlaces en claro', g: l['link-01'], i: I.blue + ' · Blue 60', r: '—', ok: 'Coincide' },
      { id: 6, e: 'Radio de los botones', g: P.radius['radius-button'], i: '0px', r: R.radio, ok: 'Igual' },
      { id: 7, e: 'Ancho de la letra', g: String(P.fontWidth), i: 'Normal', r: R.ancho, ok: 'Igual' },
      { id: 8, e: 'Pesos (display / títulos / texto / énfasis)', g: [P.weights.display, P.weights.heading, P.weights.body, P.weights.emphasis].join(' / '), i: 'Light / Regular / Regular / SemiBold', r: R.pesos, ok: 'Igual' },
      { id: 9, e: 'Colores de apoyo', g: P.palette[1].name + ', ' + P.palette[2].name, i: 'Cian, púrpura y otros', r: R.apoyo, ok: 'Coincide' },
      { id: 10, e: 'Grilla base', g: '8 px (ALMA)', i: '8 px', r: '8 px', ok: 'Igual' }
    ];
    return h('div', { className: 'page' }, h(Head, { id: 'calibracion', lede: 'La prueba: si las reglas están bien alineadas, la entidad debería verse como IBM. Con la fecha elegida, se ve. La última columna muestra lo que daría la fecha de fundación.' }),
      h(Tbl, { title: 'Entidad frente a IBM hoy', columns: [{ key: 'e', label: 'Elemento' }, { key: 'g', label: 'Genera la entidad' }, { key: 'i', label: 'IBM hoy' }, { key: 'ok', label: 'Resultado' }, { key: 'r', label: 'Con el 16 jun 1911' }], rows: rows }),
      h(Sec, { title: 'Lo que la calibración corrigió en las reglas' }, h(Bullets, { items: [
        ['Acentos profundos.', 'Una Garganta definida da un acento saturado con texto blanco.'],
        ['Saturación.', 'Más centros definidos saturan más; una voz definida satura un 50 % adicional.'],
        ['Armonía del Proyector.', 'Análoga amplia: el Proyector mira alrededor, no al lado opuesto.'],
        ['Línea 3 y grado.', 'La línea 3 da ángulos rectos; el grado queda neutro en las líneas del medio.'],
        ['Enlaces.', 'Con un acento profundo, los enlaces usan el primario.']] })),
      h(Sec, { title: 'Lo que no cambia' }, h(Bullets, { items: [
        ['La letra.', 'ALMA usa Roboto Flex. La entidad reproduce el ancho y los pesos, no el dibujo de la letra de IBM.'],
        ['Los neutros.', 'Los grises y fondos siguen siendo los de ALMA.'],
        ['El símbolo.', 'La firma sale de la gramática del logo de Cordura, no del logo de IBM.']] })),
      h('p', { className: 'web-body-s cap note' }, 'Diferencia de color medida en OKLab: ' + fmt3(DELTA) + '. Bajo 0,02 el ojo no distingue. Semilla: la de la fecha, sin variaciones.'));
  }

  // ---------- Filosofía
  function Producto() {
    var rows = [
      { id: 1, s: 'prod-norte-01', e: 'Requiere atención', c: '92 %', u: 'hace 4 min' },
      { id: 2, s: 'prod-norte-02', e: 'Requiere atención', c: '88 %', u: 'hace 4 min' },
      { id: 3, s: 'prod-sur-01', e: 'Requiere atención', c: '85 %', u: 'hace 6 min' },
      { id: 4, s: 'prod-centro-01', e: 'Normal', c: '41 %', u: 'hace 2 min' }
    ];
    return h('div', { className: 'page' }, h(Head, { id: 'producto', lede: 'Una pantalla de monitoreo con nuestro lenguaje. Solo componentes de ALMA: lo que cambia son los tokens y las palabras.' }),
      h(Frame, { label: 'Pantalla de ejemplo' },
        h('div', { className: 'screen' },
          h('div', { className: 'screen__head' }, h('h2', { className: 'web-h3', style: { margin: 0 } }, 'Servidores'), h('div', { className: 'demo-row' }, h(A.Button, { variant: 'tertiary' }, 'Exportar'), h(A.Button, { variant: 'filled', role: 'primary' }, 'Revisar 3 servidores'))),
          h(A.InlineNotification, { status: 'warning', title: '3 de 12 servidores necesitan atención', message: 'Uso de CPU sobre el 85 % en los últimos 15 minutos.' }),
          h('div', { className: 'tbl' }, h(A.Table, { title: 'Estado', headingLevel: 3, columns: [{ key: 's', label: 'Servidor' }, { key: 'e', label: 'Estado' }, { key: 'c', label: 'CPU' }, { key: 'u', label: 'Última lectura' }], rows: rows })),
          h('p', { className: 'web-body-s cap' }, 'Datos de los últimos 15 minutos. Se actualizan cada minuto.'))),
      h(Tbl, { title: 'Qué principio aplica cada parte', columns: [{ key: 'p', label: 'Parte' }, { key: 'r', label: 'Principio' }], rows: [
        { id: 1, p: '«3 de 12 servidores…»', r: 'Opinión precisa: cifras, no aproximaciones.' },
        { id: 2, p: 'La causa en el aviso', r: 'Pensamiento que inspira: explicar el porqué.' },
        { id: 3, p: 'Una sola acción principal, con verbo y cantidad', r: 'Proyector: guiar, no empujar.' },
        { id: 4, p: 'La fuente y el período al pie', r: 'Línea 1: la base a la vista.' },
        { id: 5, p: 'Columnas fijas y orden estable', r: 'Respetar el ritmo: nada cambia de lugar sin aviso.' }] }));
  }

  function Comunicacion() {
    return h('div', { className: 'page' }, h(Head, { id: 'comunicacion', lede: 'Cuando anunciamos algo: la firma más la voz, en tres formatos.' }),
      h(Frame, { label: 'Portada 16:9 · anuncio' },
        h(En.Signature, { entity: E, P: P, format: 'wide' }),
        h('div', { className: 'piece' }, h('p', { className: 'web-label-m eyebrow' }, 'Lo nuevo de junio'), h('h2', { className: 'web-h2', style: { margin: 0 } }, 'Compara dos versiones lado a lado'), h('p', { className: 'web-body-l cap' }, 'Mira qué cambió entre dos informes antes de decidir. Puedes volver a la vista anterior cuando quieras.'), h('div', { className: 'demo-row' }, h(A.Button, { variant: 'filled', role: 'primary' }, 'Probar la vista comparada')))),
      h('div', { className: 'pieces' },
        h(Frame, { label: 'Publicación 1:1' }, h(En.Signature, { entity: E, P: P, format: 'square' }), h('div', { className: 'piece' }, h('h3', { className: 'web-h4', style: { margin: 0 } }, '87.600 cartas revisadas.'), h('p', { className: 'web-body-m cap' }, 'Una sola explica nuestro azul. Fuente: estudio ALMA, 2026.'))),
        h(Frame, { label: 'Historia 9:16' }, h(En.Signature, { entity: E, P: P, format: 'tall' }), h('div', { className: 'piece' }, h('h3', { className: 'web-h4', style: { margin: 0 } }, 'Dudar también es un método.'), h('p', { className: 'web-body-m cap' }, 'Verificamos antes de afirmar.')))));
  }

  function Componentes() {
    var t = useState('dark');
    return h('div', { className: 'page' }, h(Head, { id: 'componentes', lede: 'Los componentes de ALMA con los parámetros de la entidad, junto a ALMA de hoy. No hay componentes nuevos: cambian los tokens.' }),
      h(A.SegmentedControl, { label: 'Tema', options: [{ value: 'dark', label: 'Oscuro' }, { value: 'light', label: 'Claro' }], value: t[0], onChange: t[1] }),
      h('div', { className: 'compare' }, h(En.Preview, { entity: E, P: P, theme: t[0], caption: 'Entidad IBM' }), h(En.Preview, { entity: E, P: null, theme: t[0], caption: 'ALMA hoy (Cordura)' })));
  }

  var VIEWS = { inicio: Inicio, 'punto-de-vista': PuntoDeVista, principios: Principios, prisma: Prisma, voz: Voz, tono: Tono, escritura: Escritura, firma: Firma, tipografia: Tipografia, fundamentos: Fundamentos, color: Color, grilla: Grilla, iconografia: Iconografia, ilustracion: Ilustracion, fotografia: Fotografia, datos: Datos, movimiento: Movimiento, producto: Producto, comunicacion: Comunicacion, componentes: Componentes, carta: Carta, fecha: Fecha, calibracion: Calibracion };

  function App() {
    var r = useState(route()), th = useState(hostTheme());
    var narrow = window.matchMedia && matchMedia('(max-width: 1055px)').matches, hid = useState(narrow);
    useEffect(function () { wear(th[0]); }, [th[0]]);
    useEffect(function () {
      function on() { r[1](route()); window.scrollTo(0, 0); var t = document.getElementById('titulo'); if (t) t.focus({ preventScroll: true }); if (window.matchMedia && matchMedia('(max-width: 1055px)').matches) hid[1](true); }
      window.addEventListener('hashchange', on);
      var mo = new MutationObserver(function () { var v = root.getAttribute('data-theme'); if ((v === 'light' || v === 'dark') && v !== th[0]) th[1](v); });
      mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
      return function () { window.removeEventListener('hashchange', on); mo.disconnect(); };
    }, [th[0]]);
    var groups = [{ items: [{ value: 'inicio', label: 'Inicio', icon: 'home', href: '#inicio' }] }].concat(GROUPS.map(function (g) {
      return { title: g, items: PAGES.filter(function (p) { return p.group === g; }).map(function (p) { return { value: p.id, label: p.title, icon: p.icon, href: '#' + p.id }; }) };
    }));
    var light = th[0] === 'light';
    return h('div', { className: 'app' },
      h('a', { className: 'skip', href: '#contenido' }, 'Saltar al contenido'),
      h(A.Toolbar, { title: 'Entidad IBM · Lenguaje de diseño', sticky: true, actions: [{ label: light ? 'Usar tema oscuro' : 'Usar tema claro', icon: light ? 'asleep' : 'light', onPress: function () { th[1](light ? 'dark' : 'light'); } }] }),
      h('div', { className: 'shell' },
        h('div', { className: 'nav' }, h(A.Sidebar, { label: 'Secciones del lenguaje de diseño', value: r[0], groups: groups, hidden: hid[0], onHiddenChange: hid[1], onChange: function (v) { location.hash = v; } })),
        h('main', { id: 'contenido', className: 'main' }, h(VIEWS[r[0]]))));
  }

  wear(hostTheme());
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
