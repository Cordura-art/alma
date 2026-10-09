// Cordura's site: the page that sells what Cordura makes, to product teams in technology companies. Only ALMA
// components with the Entidad Cordura's token values. It does not explain how the language is made: it shows that one
// language holds at every level (token, component, pattern, screen, environment), on every support and in every theme.
(function () {
  'use strict';
  var h = React.createElement, useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, A = window.AlmaDS;
  var G = window.__GENES.cordura, HECHOS = window.__HECHOS, root = document.documentElement;
  root.lang = 'es';

  // Where someone writes to us. Empty until Cordura decides it: the closing then says so instead of inventing one.
  var CONTACTO = '';

  // The theme: the viewer's choice on this page (remembered on this device), else the host's (data-theme on the root),
  // else the system's. Four themes: dark or light, each with its high-contrast version.
  var KEY = 'cordura-sitio-tema', TEMAS = ['dark', 'light', 'dark-hc', 'light-hc'], ok = function (v) { return TEMAS.indexOf(v) >= 0; };
  var store = { get: function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } }, set: function (v) { try { localStorage.setItem(KEY, v); } catch (e) { /* storage blocked */ } } };
  var mq = window.matchMedia ? matchMedia('(prefers-color-scheme: light)') : null, host = root.getAttribute('data-theme'), choice = store.get(), listen = function () {};
  function paint() { var t = ok(choice) ? choice : ok(host) ? host : (mq && mq.matches ? 'light' : 'dark'); root.style.colorScheme = t.indexOf('light') === 0 ? 'light' : 'dark'; if (root.getAttribute('data-theme') !== t) root.setAttribute('data-theme', t); listen(t); return t; }
  var painted = paint();
  new MutationObserver(function () { var v = root.getAttribute('data-theme'); if (v !== painted) { host = v; choice = null; painted = paint(); } }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { painted = paint(); });
  function choose(t) { choice = t; store.set(t); painted = paint(); }

  function goTo(id) {
    var el = document.getElementById(id); if (!el) return;
    var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
    var t = el.querySelector('.sec__title, .closing__t') || el; t.focus({ preventScroll: true });
  }

  // One piece of work, the same at every level: a proposal that waits for a decision.
  var COLUMNAS = [{ key: 'p', label: 'Propuesta' }, { key: 'e', label: 'Estado' }, { key: 'v', label: 'Versión' }, { key: 'f', label: 'Vence' }];
  var FILAS = [
    { id: 'identidad', p: 'Identidad de marca', e: 'Espera tu decisión', v: '2', f: '15 oct' },
    { id: 'web', p: 'Sitio web', e: 'Espera tu decisión', v: '3', f: '15 oct' },
    { id: 'campana', p: 'Campaña de lanzamiento', e: 'Aprobada', v: '4', f: '—' },
    { id: 'senaletica', p: 'Señalética', e: 'En revisión', v: '1', f: '30 oct' }
  ];
  var AVISO = { status: 'info', title: '2 propuestas esperan tu decisión', message: 'Vencen el 15 de octubre. No hay apuro: puedes revisarlas cuando quieras.' };
  var NIVELES = ['Token', 'Componente', 'Patrón', 'Pantalla', 'Entorno'];
  var QUE = {
    Token: 'Lo más chico: un color, un radio, una letra. Cada decisión tiene un nombre y un solo valor por tema.',
    Componente: 'Los mismos tokens, armados en controles. Ninguno trae un color o una esquina propios.',
    Patrón: 'Los componentes, juntos para resolver un momento: avisar algo y pedir una decisión.',
    Pantalla: 'El patrón dentro de una vista completa de producto.',
    Entorno: 'La pantalla como una ventana más, dentro de un escritorio con su barra y su dock.'
  };
  var TOKENS = [
    { n: 'Acción principal', v: '--interactive-01', color: true },
    { n: 'Página', v: '--ui-02', color: true },
    { n: 'Contenedor', v: '--ui-01', color: true },
    { n: 'Texto', v: '--text-01', color: true },
    { n: 'Esquina de un botón', v: '--radius-button', radio: true },
    { n: 'Ancho de la letra', v: '--font-width', letra: true }
  ];

  var PIEZAS = [
    { t: 'Brand Center', fig: 'sello', et: 'Un sello que se estampa.', p: 'Lo que define a tu marca, en un solo lugar: principios, voz, color, letra, forma, movimiento e imagen. Con el porqué de cada regla, para decidir bien cuando la guía no alcanza.' },
    { t: 'Sistema de diseño', fig: 'matriz', et: 'Una matriz de piezas iguales.', p: HECHOS.componentes + ' componentes en ' + HECHOS.temas + ' temas, con el contraste medido en cada uno. Cada decisión tiene un nombre, y diseño y desarrollo usan el mismo.' },
    { t: 'Guía de UX', fig: 'lupa', et: 'Una lupa sobre una hoja.', p: 'Cómo se usa cada pieza y cuándo no: patrones, accesibilidad, escritura y casos de borde, para el trabajo de todos los días.' },
    { t: 'Soluciones ya construidas', fig: 'portatil', et: 'Un portátil que se abre.', p: 'Pantallas y flujos armados con el sistema, listos para adaptar: formularios, tablas, pagos, conversación con una IA y un entorno de escritorio.' },
    { t: 'Plantillas y movimiento', fig: 'cinta', et: 'Una cinta que avanza.', p: 'Portadas, piezas de comunicación y transiciones que salen del mismo lenguaje, para que un anuncio y un producto se reconozcan.' },
    { t: 'La puerta para tus agentes', fig: 'terminal', et: 'Una terminal que escribe.', p: 'Los mismos tokens, la misma voz y las mismas reglas, en archivos que un agente de IA lee antes de producir. Y pruebas que revisan lo que produjo.' }
  ];
  var PASOS = [
    { t: 'Conocernos', p: 'Miramos cómo trabaja tu equipo, qué ya tiene y hacia dónde va tu producto. Aquí decidimos los dos si tiene sentido seguir.' },
    { t: 'Construir la base', p: 'Armamos contigo el sistema de marca: lo que ya funciona se queda, y lo nuevo entra por partes, sin detener lo que está en curso.' },
    { t: 'Acompañar', p: 'Seguimos dentro: piezas nuevas, correcciones, y formación para las personas y para los agentes que van a producir con el sistema.' },
    { t: 'Medir juntos', p: 'Acordamos qué medir antes de empezar y lo revisamos contigo, con fecha y con fuente. Lo que no funciona, se cambia.' }
  ];
  function resp(t) { return h('p', { className: 'web-body-m note' }, t); }
  var PREGUNTAS = [
    { id: 'agentes', title: '¿Qué es un sistema de marca para agentes?', content: resp('Es tu marca escrita de modo que la pueda recorrer una persona y la pueda leer una IA: tokens con nombre, componentes que funcionan, reglas de voz y el porqué de cada una. Así un agente que arma una página o una presentación parte de tus decisiones y no de las suyas.') },
    { id: 'porcentaje', title: '¿Por qué un porcentaje y no una tarifa?', content: resp('Porque una tarifa paga una entrega, y lo que una marca necesita es que alguien la sostenga mientras crece. Con un porcentaje, a nosotros nos va bien solo si a ti te va bien.') },
    { id: 'adapta', title: '¿Se adapta a mi empresa o es igual para todos?', content: resp('Se adapta. El sistema es uno, pero sus valores son los de tu marca: color, letra, forma y movimiento. Esta página es el mismo sistema con los valores de Cordura.') },
    { id: 'existente', title: '¿Qué pasa con lo que ya tenemos?', content: resp('Se revisa al conocernos. Lo que funciona se integra; lo que se reemplaza, se reemplaza por partes y con tu equipo al tanto.') },
    { id: 'casos', title: '¿Tienen casos de clientes?', content: resp('Todavía no tenemos casos de clientes que mostrar, y preferimos decirlo. Lo que sí puedes revisar hoy es el sistema mismo: todo lo que ves en esta página está hecho con él.') }
  ];

  function Sec(p) {
    return h('section', { className: 'sec', id: p.id, 'aria-labelledby': p.id + '-t' },
      h('div', { className: 'sec__head' },
        h('h2', { className: 'web-h2 sec__title', id: p.id + '-t', tabIndex: -1 }, p.title),
        p.lede ? h('p', { className: 'web-body-l sec__lede' }, p.lede) : null),
      p.children);
  }

  // The level of the token: each value is read from the page as it is now, so a change of theme is seen here first.
  function Tokens(p) {
    var val = useState({});
    useEffect(function () {
      var cs = getComputedStyle(root), o = {}; TOKENS.forEach(function (t) { o[t.v] = cs.getPropertyValue(t.v).trim(); }); val[1](o);
    }, [p.tema]);
    return h('dl', { className: 'tokens' }, TOKENS.map(function (t) {
      var estilo = t.color ? { background: 'var(' + t.v + ')' } : t.radio ? { borderRadius: 'var(' + t.v + ')' } : null;
      return h('div', { className: 'token', key: t.v },
        h('span', { className: 'token__m web-h5', style: estilo, 'aria-hidden': 'true' }, t.letra ? 'Aa' : null),
        h('dt', { className: 'web-label-l' }, t.n),
        h('dd', { className: 'web-body-s' }, t.v.slice(2) + ' · ' + (val[0][t.v] || '')));
    }));
  }
  function Componentes() {
    return h(React.Fragment, null,
      h('div', { className: 'fila' },
        h(A.Button, { variant: 'filled' }, 'Aprobar propuesta'),
        h(A.Button, { variant: 'tinted' }, 'Pedir cambios'),
        h(A.Button, { variant: 'gray' }, 'Ahora no'),
        h(A.Button, { variant: 'plain' }, 'Ver versiones')),
      h('div', { className: 'campo' }, h(A.TextInput, { label: 'Comentario', helper: 'Lo lee todo tu equipo.' })),
      h(A.Checkbox, { label: 'Avisarme cuando haya una versión nueva', defaultChecked: true }),
      h('div', { className: 'fila' }, h(A.Tag, null, 'Espera tu decisión'), h(A.Tag, { color: 'green' }, 'Aprobada'), h(A.Tag, { color: 'blue' }, 'En revisión')));
  }
  function Patron() {
    return h(React.Fragment, null,
      h(A.InlineNotification, AVISO),
      h(A.Card, { eyebrow: 'Propuestas', title: 'Propuesta de identidad, versión 2', headingLevel: 3,
        actions: h('div', { className: 'fila' }, h(A.Button, { variant: 'filled' }, 'Aprobar propuesta'), h(A.Button, { variant: 'tinted' }, 'Pedir cambios')) },
        h('p', { className: 'web-body-m note' }, 'Revísala con calma antes de aprobarla. Puedes pedir cambios, comentarla con tu equipo o volver a ella mañana.')));
  }
  function Pantalla(p) {
    return h('div', { className: 'pantalla' },
      h('div', { className: 'pantalla__head' }, h('h3', { className: 'web-h3' }, 'Propuestas'),
        h('div', { className: 'fila' }, h(A.Button, { variant: 'tinted' }, 'Ahora no'), h(A.Button, { variant: 'filled' }, 'Revisar 2 propuestas'))),
      h(A.InlineNotification, AVISO),
      p.wide ? h('div', { className: 'tabla' }, h(A.Table, { caption: 'Propuestas', columns: COLUMNAS, rows: FILAS }))
        : h(A.List, { 'aria-label': 'Propuestas', items: FILAS.map(function (r) { return { id: r.id, title: r.p, subtitle: r.e, trailing: r.f }; }) }),
      h('p', { className: 'web-body-s note' }, 'Según tus últimas 6 propuestas, las decisiones tomadas con un día de pausa necesitaron menos cambios.'));
  }
  function Entorno() {
    var nada = function () {};
    return h(A.Desktop, { label: 'Escritorio de Cordura', className: 'entorno',
      menuBar: h(A.MenuBar, { appName: 'Propuestas', menus: [{ label: 'Propuestas', items: [{ value: 'acerca', label: 'Acerca de Propuestas' }] }, { label: 'Archivo', items: [{ value: 'nueva', label: 'Nueva propuesta' }] }], extras: [{ text: 'vie 9 oct · 10:45', label: 'Fecha y hora' }] }),
      dock: h(A.Dock, { label: 'Aplicaciones', items: [{ id: 'propuestas', label: 'Propuestas', icon: 'document', running: true, onOpen: nada }, { id: 'equipo', label: 'Equipo', icon: 'user--multiple', onOpen: nada }, { id: 'asistente', label: 'Asistente', icon: 'chat', onOpen: nada }] }) },
      h(A.Window, { title: 'Propuestas', defaultPosition: { x: 40, y: 24 }, defaultSize: { w: 520, h: 340 }, bottomBar: '2 esperan tu decisión' },
        h('div', { className: 'ventana' },
          h(A.InlineNotification, AVISO),
          h(A.List, { 'aria-label': 'Propuestas', items: FILAS.map(function (r) { return { id: r.id, title: r.p, subtitle: r.e, trailing: r.f }; }) }))));
  }

  // One of ALMA's effects (site/efectos.js) on what it wraps. A ground draws behind it; a reaction or a text acts on it.
  function Efecto(p) {
    var ref = useRef(null);
    useEffect(function () { var e = null; try { e = window.AlmaEfectos.monta(p.id, ref.current, p.valores); } catch (x) { /* the page is whole without it */ } return function () { if (e && e.quita) e.quita(); }; }, []);
    return h(p.como || 'div', { ref: ref, className: p.className }, p.children);
  }
  // One of ALMA's line figures (figuras/), with Cordura's own traits.
  function Figura(p) {
    var ref = useRef(null);
    useEffect(function () { var v = null; try { v = window.AlmaFigura.monta(ref.current, p.nombre, { genes: G, intensidad: 0.5, etiqueta: p.etiqueta }); } catch (x) { /* the card is whole without it */ } return function () { if (v) v.suelta(); }; }, []);
    return h('div', { ref: ref, className: 'pieza__fig' });
  }

  // The essay: a narrow column of our own words. A string is a paragraph; { f } opens it louder, { s } closes it.
  function Texto(p) {
    return h('div', { className: 'texto' }, p.parrafos.map(function (x, i) {
      return typeof x === 'string' ? h('p', { className: 'web-body-l', key: i }, x) : x.f ? h('p', { className: 'web-h4 texto__f', key: i }, x.f) : h(Efecto, { id: 'desvelar', como: 'p', className: 'web-h3 texto__s', key: i }, x.s);
    }));
  }

  // What goes into the system and what comes out of it. Drawn in line on a wide screen; a plain list on a narrow one.
  var ENTRA = ['Principios', 'Voz', 'Color', 'Letra', 'Forma', 'Movimiento', 'Componentes', 'Guías', 'Pruebas'];
  var SALE = ['Producto', 'Sitio', 'Documento', 'Anuncio', 'Presentación', 'Entorno'];
  function Mapa(p) {
    var alt = 'De un lado, lo que entra al sistema de marca: ' + ENTRA.join(', ').toLowerCase() + '. Del otro, lo que sale de él: ' + SALE.join(', ').toLowerCase() + '.';
    if (!p.wide) return h('div', { className: 'mapa mapa--pila' },
      h('p', { className: 'web-body-s mapa__t' }, ENTRA.join(' · ')), h(A.Icon, { name: 'arrow--down', size: 20 }),
      h('p', { className: 'web-label-l mapa__c' }, 'Sistema de marca'), h(A.Icon, { name: 'arrow--down', size: 20 }),
      h('p', { className: 'web-body-s mapa__t' }, SALE.join(' · ')));
    var W = 880, H = 300, cx = W / 2, cy = H / 2, bw = 148, bh = 64, y = function (i, n) { return 24 + i * (H - 48) / (n - 1); };
    var curva = function (x0, y0, x1, y1) { var m = (x0 + x1) / 2; return 'M' + x0 + ' ' + y0 + ' C' + m + ' ' + y0 + ' ' + m + ' ' + y1 + ' ' + x1 + ' ' + y1; };
    return h('svg', { className: 'mapa', viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': alt },
      ENTRA.map(function (t, i) { var yy = y(i, ENTRA.length); return h('g', { key: t }, h('text', { x: 196, y: yy + 4, textAnchor: 'end', className: 'mapa__txt' }, t), h('path', { d: curva(208, yy, cx - bw / 2, cy), className: 'mapa__l' })); }),
      SALE.map(function (t, i) { var yy = y(i, SALE.length); return h('g', { key: t }, h('text', { x: W - 196, y: yy + 4, className: 'mapa__txt' }, t), h('path', { d: curva(cx + bw / 2, cy, W - 208, yy), className: 'mapa__l' })); }),
      h('rect', { x: cx - bw / 2, y: cy - bh / 2, width: bw, height: bh, rx: 16, className: 'mapa__caja' }),
      h('text', { x: cx, y: cy - 4, textAnchor: 'middle', className: 'mapa__c' }, 'Sistema'), h('text', { x: cx, y: cy + 16, textAnchor: 'middle', className: 'mapa__c' }, 'de marca'));
  }

  // The same request twice. On the left, what comes out with no system: a made-up, generic screen, drawn on purpose
  // outside Cordura's values. On the right, the real components, and under them the rule each choice came from.
  var CITAS = [
    { ruta: 'lenguajes/cordura.json', regla: '«Botones con verbo y objeto.»' },
    { ruta: 'lenguajes/cordura.json', regla: '«Nunca inventes urgencia.»' },
    { ruta: 'tokens/matriz.json', regla: 'El color de marca, solo en el botón principal.' },
    { ruta: 'tokens/core/radius.json', regla: 'Todas las esquinas salen de un solo radio.' }
  ];
  function Pedido() {
    return h('div', { className: 'pedido' },
      h('p', { className: 'web-body-m pedido__q' }, h('span', null, 'Arma la pantalla de propuestas')),
      h('div', { className: 'pedido__dos' },
        h('figure', { className: 'soporte' },
          h('figcaption', { className: 'web-label-m' }, 'Sin el sistema'),
          h('div', { className: 'marco generico', role: 'img', 'aria-label': 'Una pantalla genérica: el título «Mis elementos», un aviso verde que dice «Tienes 2 elementos pendientes. Complétalos lo antes posible.», dos filas y un botón verde «Enviar».' },
            h('p', { className: 'generico__t' }, 'Mis elementos'),
            h('p', { className: 'generico__a' }, '✓ Tienes 2 elementos pendientes. Complétalos lo antes posible.'),
            h('p', { className: 'generico__f' }, 'Elemento 1', h('span', null, 'Pendiente')),
            h('p', { className: 'generico__f' }, 'Elemento 2', h('span', null, 'Pendiente')),
            h('p', { className: 'generico__b' }, 'Enviar'))),
        h('figure', { className: 'soporte' },
          h('figcaption', { className: 'web-label-m' }, 'Con el sistema de Cordura'),
          h('div', { className: 'marco pedido__si' },
            h('h3', { className: 'web-h4' }, 'Propuestas'),
            h(A.InlineNotification, AVISO),
            h(A.List, { 'aria-label': 'Propuestas', items: FILAS.slice(0, 2).map(function (r) { return { id: r.id, title: r.p, subtitle: r.e, trailing: r.f }; }) }),
            h('div', { className: 'fila' }, h(A.Button, { variant: 'filled' }, 'Revisar 2 propuestas'), h(A.Button, { variant: 'tinted' }, 'Ahora no'))))),
      h('ul', { className: 'citas' }, CITAS.map(function (c, i) { return h('li', { key: i }, h('code', { className: 'web-body-s' }, c.ruta), h('span', { className: 'web-body-s' }, c.regla)); })));
  }

  // The system's own files, cut short. One is open at a time.
  var ARCHIVOS = window.__ARCHIVOS;
  function Archivos() {
    var v = useState(ARCHIVOS[0].ruta), a = ARCHIVOS.filter(function (x) { return x.ruta === v[0]; })[0];
    return h('div', { className: 'archivos' },
      h(A.List, { header: 'Sistema de Cordura', headingLevel: 3, items: ARCHIVOS.map(function (x) { return { id: x.ruta, title: x.ruta, subtitle: x.que, icon: x.ruta === v[0] ? 'checkmark' : 'document', onClick: function () { v[1](x.ruta); } }; }) }),
      h('div', { className: 'archivos__ver' },
        h('p', { className: 'web-label-m archivos__ruta', 'aria-live': 'polite' }, a.ruta),
        h('pre', { className: 'marco archivos__txt web-body-s', tabIndex: 0, 'aria-label': 'Contenido de ' + a.ruta }, a.texto)));
  }

  var Campo = window.__GENERADOR_VISTAS(G).Campo;

  function Page() {
    var wide = useState(!window.matchMedia || matchMedia('(min-width: 56rem)').matches);
    useEffect(function () {
      if (!window.matchMedia) return;
      var m = matchMedia('(min-width: 56rem)'), on = function () { wide[1](m.matches); };
      m.addEventListener('change', on); return function () { m.removeEventListener('change', on); };
    }, []);
    var tema = useState(painted), claro = tema[0].indexOf('light') === 0, alto = /-hc$/.test(tema[0]);
    useEffect(function () { listen = tema[1]; return function () { listen = function () {}; }; }, []);
    function pon(c, a) { choose((c ? 'light' : 'dark') + (a ? '-hc' : '')); }
    var nivel = useState('Componente');

    var N = nivel[0], escena = N === 'Token' ? h(Tokens, { tema: tema[0] }) : N === 'Componente' ? h(Componentes) : N === 'Patrón' ? h(Patron) : N === 'Pantalla' ? h(Pantalla, { wide: wide[0] }) : h(Entorno);
    return h(React.Fragment, null,
      h('header', { className: 'top' }, h('div', { className: 'wrap top__in' },
        h('p', { className: 'web-h6 brand' }, 'Cordura'),
        h('nav', { className: 'top__nav', 'aria-label': 'Secciones' },
          h('div', { className: 'top__links' },
            h(A.Button, { variant: 'plain', onClick: function () { goTo('sistema'); } }, 'El sistema'),
            h(A.Button, { variant: 'plain', onClick: function () { goTo('consistencia'); } }, 'Salidas'),
            h(A.Button, { variant: 'plain', onClick: function () { goTo('relacion'); } }, 'Relación'),
            h(A.Button, { variant: 'plain', onClick: function () { goTo('preguntas'); } }, 'Preguntas')),
          h(A.Button, { variant: 'plain', icon: claro ? 'asleep' : 'light', 'aria-label': claro ? 'Usar tema oscuro' : 'Usar tema claro', onClick: function () { pon(!claro, alto); } })))),
      h('main', { className: 'wrap' },
        h(Efecto, { id: 'reticula', className: 'portada' },
          h('div', { className: 'portada__in', id: 'inicio', tabIndex: -1 },
            h(Mapa, { wide: wide[0] }),
            h('p', { className: 'web-body-m portada__pie' }, 'Diseño, desarrollo y agentes de IA, trabajando desde un mismo sistema.'))),

        h(Texto, { parrafos: [
          { f: 'Cada pantalla, cada página y cada anuncio que publica tu equipo es una decisión sobre qué es tu marca. Hoy se toman más de esas decisiones que nunca, entre más personas, y con agentes de IA en la mesa.' },
          'Nuestra marca es lima. En una portada se ve bien. ¿Va también en un enlace? ¿En un gráfico? ¿En una alerta? Una guía en PDF no lo dice: muestra la portada. Quien diseña la pantalla siguiente decide por su cuenta, y quien la programa también. Los dos deciden bien, y deciden distinto.',
          'Nadie se equivoca. Cada uno trabaja desde una versión distinta de la empresa.',
          'Antes, producir era lento y alguien alcanzaba a notar la diferencia. Hoy un agente arma veinte variantes en una tarde. Si no sabe por qué se decidió algo, adivina. Y adivina con criterio, que es lo difícil de ver: nada queda mal, todo queda genérico.',
          'No creemos que esto se arregle con otra reunión ni con otro PDF.',
          { s: 'Se arregla escribiendo la marca para que cualquiera pueda decidir bien una pantalla que nadie dibujó todavía.' }] }),

        h('section', { className: 'demo', 'aria-label': 'El mismo pedido, sin el sistema y con el sistema' },
          h(Pedido),
          h('p', { className: 'web-body-s demo__pie' }, 'El mismo pedido, sin el sistema y con el sistema. La pantalla de la izquierda es una maqueta de lo que sale por defecto.')),

        h('section', { className: 'cap', id: 'sistema', 'aria-labelledby': 'sistema-t' },
          h('h2', { className: 'web-h2 sec__title cap__t', id: 'sistema-t', tabIndex: -1 }, 'Qué es el sistema'),
          h(Texto, { parrafos: [
            'Es una colección de guías, piezas y código que una persona puede recorrer y un agente puede leer. Guarda la voz y los principios de tu marca, sus reglas de color, letra, forma y movimiento, y los componentes con que se construye lo nuevo.',
            'Lo importante es que cada regla dice dónde aplica y por qué. Una imagen muestra lo que alguien decidió para una página. Un sistema le da a la persona siguiente, o al agente siguiente, contexto para decidir una página que no existe.',
            'El nuestro responde la pregunta del lima: va solo en el botón principal. Los enlaces son azules, y los fondos y los textos son neutros. No es una opinión que haya que recordar: está escrito, con nombre, y el código lo usa tal cual.'] })),

        h('section', { className: 'demo', 'aria-label': 'Archivos del sistema de Cordura' },
          h(Archivos),
          h('p', { className: 'web-body-s demo__pie' }, 'Abre cualquiera. Son archivos del sistema de Cordura, recortados; ninguno se escribió para esta página.')),

        h(Texto, { parrafos: [
          '«Fuente de verdad» solo significa algo si las piezas siguen conectadas. Aquí el color de un botón no es un valor suelto: es un lugar en una tabla. Si la marca cambia de tono, cambia la tabla, y los ' + HECHOS.componentes + ' componentes cambian con ella en los ' + HECHOS.temas + ' temas.',
          'Eso no significa que todo se actualice solo. Significa que hay pruebas que avisan: ' + HECHOS.pares + ' combinaciones de texto y fondo se miden en cada tema, y ningún color, espacio o radio puede entrar al sistema sin nombre. Alguien sigue teniendo que mirar cómo queda. Ese alguien somos nosotros, contigo.'] }),

        h('dl', { className: 'cifras' }, [[HECHOS.componentes, 'componentes'], [HECHOS.temas, 'temas'], [HECHOS.pares, 'combinaciones de texto y fondo, medidas']].map(function (c) { return h('div', { key: c[1] }, h(Efecto, { id: 'contar', como: 'dd', className: 'web-display-m cifras__n' }, String(c[0])), h('dt', { className: 'web-body-m' }, c[1])); })),

        h(Sec, { id: 'consistencia', title: 'Un sistema, muchas salidas', lede: 'No te pedimos que nos creas: pruébalo. Cambia el tema o sube de nivel, del token más chico al entorno completo. Lo que ves es el sistema funcionando, no una imagen.' },
          h('div', { className: 'mesa' },
            h('div', { className: 'mesa__nivel' }, h(A.SegmentedControl, { label: 'Nivel', options: NIVELES, value: N, onChange: nivel[1] })),
            h(A.SegmentedControl, { label: 'Tema', options: [{ value: 'dark', label: 'Oscuro' }, { value: 'light', label: 'Claro' }], value: claro ? 'light' : 'dark', onChange: function (v) { pon(v === 'light', alto); } }),
            h(A.Checkbox, { label: 'Alto contraste', checked: alto, onChange: function (v) { pon(claro, v); } })),
          h('div', { className: 'tarima' },
            h('p', { className: 'web-body-m tarima__que', 'aria-live': 'polite' }, QUE[N]),
            escena),
          h('p', { className: 'web-body-m note' }, 'El tema cambia la página entera, no solo este recuadro: la barra de arriba, los títulos y el cierre usan los mismos tokens.')),

        h(Sec, { id: 'soportes', title: 'En cada soporte', lede: 'La misma propuesta en un teléfono, en un documento y en un anuncio. Cambian el tamaño y el formato; la voz, la letra y la forma no.' },
          h('div', { className: 'soportes' },
            h('figure', { className: 'soporte' },
              h('div', { className: 'marco marco--tel' },
                h('h3', { className: 'web-h4' }, 'Propuestas'),
                h(A.List, { 'aria-label': 'Propuestas, en un teléfono', items: FILAS.slice(0, 3).map(function (r) { return { id: r.id, title: r.p, subtitle: r.e, trailing: r.f }; }) }),
                h(A.Button, { variant: 'filled', size: 'sm' }, 'Revisar 2 propuestas')),
              h('figcaption', { className: 'web-body-s' }, 'Teléfono')),
            h('figure', { className: 'soporte' },
              h('div', { className: 'marco marco--hoja' },
                h('p', { className: 'web-label-m eyebrow' }, 'Propuesta · 9 de octubre de 2026'),
                h('h3', { className: 'web-h3' }, 'Identidad de marca, versión 2'),
                h('p', { className: 'web-body-m note' }, 'Esta versión recoge los cambios que pidió tu equipo el 30 de septiembre. Revísala con calma: vence el 15 de octubre y nada se aprueba sin ti.'),
                h('p', { className: 'web-body-s hoja__firma' }, 'Cordura · Santiago de Chile')),
              h('figcaption', { className: 'web-body-s' }, 'Documento')),
            h('figure', { className: 'soporte' },
              h('div', { className: 'marco' },
                h(Campo, { clave: 'sitio', anda: false, label: 'Campo de Cordura: emblemas lima, blancos y verdes sobre negro tinta.' }),
                h('div', { className: 'anuncio' },
                  h('p', { className: 'web-label-m eyebrow' }, 'Lo nuevo de octubre'),
                  h('h3', { className: 'web-h3' }, 'Decidir con cordura'),
                  h('p', { className: 'web-body-m note' }, 'La nueva vista de propuestas te muestra qué cambió entre versiones y te deja decidir a tu ritmo.'),
                  h('div', { className: 'actions' }, h(A.Button, { variant: 'filled', size: 'sm' }, 'Conocer la vista de propuestas')))),
              h('figcaption', { className: 'web-body-s' }, 'Anuncio')))),

        h(Sec, { id: 'recibes', title: 'Lo que construimos contigo', lede: 'Seis piezas que son una sola: cada una sale de las mismas decisiones, por eso calzan.' },
          h('div', { className: 'piezas' }, PIEZAS.map(function (x) { return h(Efecto, { id: 'inclinar', key: x.t, className: 'pieza' }, h(A.Card, { title: x.t, headingLevel: 3 }, h(Figura, { nombre: x.fig, etiqueta: x.et }), h('p', { className: 'web-body-m note' }, x.p))); })),
          h('p', { className: 'web-body-s note' }, 'Cifras al ' + HECHOS.fecha.split('-').reverse().join('-') + ', contadas en el sistema que usa esta página.')),

        h(Sec, { id: 'relacion', title: 'Una relación, no una entrega', lede: 'Un sistema así no se entrega y se deja: se sostiene. Por eso no vendemos un proyecto. Entramos como tu socio de diseño, al modo de una aceleradora, y nuestro pago es un porcentaje: nos va bien si a ti te va bien.' },
          h('ol', { className: 'pasos' }, PASOS.map(function (x) { return h('li', { key: x.t }, h('span', { className: 'pasos__c', 'aria-hidden': 'true' }, h(A.Pictogram, { name: x.t, kind: 'creature', size: 32 })), h('h3', { className: 'web-h5' }, x.t), h('p', { className: 'web-body-m' }, x.p)); })),
          h(A.InlineNotification, { kind: 'callout', status: 'info', title: 'El porcentaje se acuerda por escrito antes de empezar', message: 'Borrador: falta definir sobre qué se calcula y en qué rango.' })),

        h(Sec, { id: 'preguntas', title: 'Preguntas', lede: 'Las que nos haríamos nosotros antes de decidir.' },
          h('div', { className: 'preguntas' }, h(A.Accordion, { headingLevel: 3, items: PREGUNTAS }))),

        h('section', { className: 'closing', 'aria-labelledby': 'conversar-t' }, h(Efecto, { id: 'hilos', className: 'closing__hilos' }), h('div', { className: 'closing__in', id: 'conversar' },
          h('h2', { className: (wide[0] ? 'web-display-s' : 'web-h2') + ' closing__t', id: 'conversar-t', tabIndex: -1 }, 'Conversemos cuando quieras.'),
          h('p', { className: 'web-body-l closing__p' }, 'Te mostramos el sistema con tu caso a la vista y respondemos lo que haga falta. Si no es el momento, esta página sigue aquí.'),
          CONTACTO ? h('p', { className: 'web-h5 contacto' }, CONTACTO) : h('p', { className: 'web-body-m note' }, 'Borrador: falta definir el canal de contacto.')))),

      h('footer', { className: 'foot' }, h('div', { className: 'wrap' },
        h('p', { className: 'web-body-s' }, 'Cordura · Santiago de Chile. Todo lo que ves en esta página usa los componentes de ALMA, nuestro sistema de diseño, con los valores de Cordura.'))));
  }

  ReactDOM.createRoot(document.getElementById('app')).render(h(Page));
})();
