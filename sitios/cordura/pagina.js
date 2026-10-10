// Cordura's site: the page that sells what Cordura makes, to product teams in technology companies. Only ALMA
// components with the Entidad Cordura's token values. It does not explain how the language is made: it shows that one
// language holds at every level (token, component, pattern, screen, environment), on every support and in every theme.
(function () {
  'use strict';
  var h = React.createElement, useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, A = window.AlmaDS;
  var G = window.__GENES.cordura, HECHOS = window.__HECHOS, root = document.documentElement;
  root.lang = 'es';

  // Where someone writes to us: a mail address, shown as text that can be selected. Empty until Cordura gives it: the
  // closing then says so instead of inventing one.
  var CONTACTO = 'contacto@cordura.tech';

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
    { id: 'pago', title: '¿Cómo se paga?', content: resp('Lo acordamos por escrito antes de empezar, atado a tu resultado y no a una entrega. Preferimos conversarlo con tu caso a la vista.') },
    { id: 'adapta', title: '¿Se adapta a mi empresa o es igual para todos?', content: resp('Se adapta. El sistema es uno, pero sus valores son los de tu marca: color, letra, forma y movimiento. Esta página es el mismo sistema con los valores de Cordura.') },
    { id: 'existente', title: '¿Qué pasa con lo que ya tenemos?', content: resp('Se revisa al conocernos. Lo que funciona se integra; lo que se reemplaza, se reemplaza por partes y con tu equipo al tanto.') },
    { id: 'casos', title: '¿Tienen casos de clientes?', content: resp('Todavía no tenemos casos de clientes que mostrar, y preferimos decirlo. Lo que sí puedes revisar hoy es el sistema mismo: todo lo que ves en esta página está hecho con él.') }
  ];

  function Sec(p) {
    return h('section', { className: 'sec', id: p.id, 'aria-labelledby': p.id + '-t' },
      h('div', { className: 'sec__head' },
        h(Efecto, { id: 'escalonar', como: 'h2', className: 'web-h2 sec__title', attrs: { id: p.id + '-t', tabIndex: -1 } }, p.title),
        p.lede ? h(Entra, { como: 'p', className: 'web-body-l sec__lede' }, p.lede) : null),
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
    return h(p.como || 'div', Object.assign({ ref: ref, className: p.className }, p.attrs), p.children);
  }
  // What comes into view as the page is scrolled: ALMA's «aparecer» (from blurred to sharp, rising a little), once.
  function Entra(p) { return h(Efecto, { id: 'aparecer', como: p.como, className: p.className, attrs: p.attrs }, p.children); }
  // One of ALMA's line figures (figuras/), with Cordura's own traits.
  function Figura(p) {
    var ref = useRef(null);
    useEffect(function () { var v = null; try { v = window.AlmaFigura.monta(ref.current, p.nombre, { genes: G, intensidad: 0.5, etiqueta: p.etiqueta }); } catch (x) { /* the card is whole without it */ } return function () { if (v) v.suelta(); }; }, []);
    return h('div', { ref: ref, className: 'pieza__fig' });
  }

  // The essay: a narrow column of our own words. A string is a paragraph; { f } opens it louder, { s } closes it.
  function Texto(p) {
    return h('div', { className: 'texto' }, p.parrafos.map(function (x, i) {
      return typeof x === 'string' ? h(Entra, { como: 'p', className: 'web-body-l', key: i }, x) : x.f ? h(Entra, { como: 'p', className: 'web-h4 texto__f', key: i }, x.f) : h(Efecto, { id: 'desvelar', como: 'p', className: 'web-h3 texto__s', key: i }, x.s);
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
    // One frame, the two screens one over the other, and a slider under them: what is left of the line is the screen
    // made without the system, what is right of it the one made with it. The real one cannot be reached while it is hidden.
    var v = useState(50), x = v[0];
    return h('div', { className: 'pedido' },
      h('p', { className: 'web-body-m pedido__q' }, h('span', null, 'Arma la pantalla de propuestas')),
      h('div', { className: 'pedido__pila' },
        h('div', { className: 'marco generico', role: 'img', style: { clipPath: 'inset(0 ' + (100 - x) + '% 0 0)' }, 'aria-hidden': x <= 0 ? 'true' : undefined, 'aria-label': 'Sin el sistema, una pantalla genérica: el título «Mis elementos», un aviso verde que dice «Tienes 2 elementos pendientes. Complétalos lo antes posible.», dos filas y un botón verde «Enviar».' },
          h('p', { className: 'generico__t' }, 'Mis elementos'),
          h('p', { className: 'generico__a' }, '✓ Tienes 2 elementos pendientes. Complétalos lo antes posible.'),
          h('p', { className: 'generico__f' }, 'Elemento 1', h('span', null, 'Pendiente')),
          h('p', { className: 'generico__f' }, 'Elemento 2', h('span', null, 'Pendiente')),
          h('p', { className: 'generico__b' }, 'Enviar')),
        h('div', { className: 'marco pedido__si', style: { clipPath: 'inset(0 0 0 ' + x + '%)' }, inert: x >= 100 ? '' : undefined, 'aria-label': 'Con el sistema de Cordura', role: 'group' },
          h('h3', { className: 'web-h4' }, 'Propuestas'),
          h(A.InlineNotification, AVISO),
          h(A.List, { 'aria-label': 'Propuestas', items: FILAS.slice(0, 2).map(function (r) { return { id: r.id, title: r.p, subtitle: r.e, trailing: r.f }; }) }),
          h('div', { className: 'fila' }, h(A.Button, { variant: 'filled' }, 'Revisar 2 propuestas'), h(A.Button, { variant: 'tinted' }, 'Ahora no'))),
        h('span', { className: 'pedido__linea', style: { left: x + '%' }, 'aria-hidden': 'true' })),
      h('div', { className: 'pedido__control' },
        h('div', { className: 'pedido__lados web-label-m', 'aria-hidden': 'true' }, h('span', null, 'Sin el sistema'), h('span', null, 'Con el sistema de Cordura')),
        h(A.Slider, { label: 'Línea de comparación', min: 0, max: 100, step: 1, value: x, onChange: v[1], format: function (n) { return n + ' %'; } })),
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
        h('div', { id: 'inicio', tabIndex: -1, className: 'ancla' }),
        h(Texto, { parrafos: [
          { f: 'Cada pantalla, cada página y cada anuncio que publica tu equipo es una decisión sobre qué es tu marca. Hoy muchas de esas decisiones las toma un agente de IA.' },
          'Este es el mismo pedido, dos veces: una sin nada a la vista, y otra con nuestro sistema.'] }),

        h('section', { className: 'demo', 'aria-label': 'El mismo pedido, sin el sistema y con el sistema' },
          h(Entra, null, h(Pedido)),
          h('p', { className: 'web-body-s demo__pie' }, 'Mueve el control. La pantalla «sin el sistema» es una maqueta de lo que sale por defecto; la otra usa nuestros componentes.')),

        h(Texto, { parrafos: [
          'La de la izquierda no está mal. Está genérica: nadie le dijo cómo decide esta marca.',
          'Nuestra marca es lima. En una portada se ve bien. ¿Va también en un enlace, en un gráfico, en una alerta? Una guía en PDF muestra la portada y no responde. Quien diseña la pantalla siguiente decide por su cuenta, quien la programa también, y un agente arma veinte variantes en una tarde.',
          { s: 'La marca se escribe para que cualquiera pueda decidir bien una pantalla que nadie dibujó todavía.' }] }),

        h('section', { className: 'cap', id: 'sistema', 'aria-labelledby': 'sistema-t' },
          h(Efecto, { id: 'escalonar', como: 'h2', className: 'web-h2 sec__title cap__t', attrs: { id: 'sistema-t', tabIndex: -1 } }, 'Qué es el sistema'),
          h(Efecto, { id: 'reticula', className: 'portada' }, h('div', { className: 'portada__in' }, h(Mapa, { wide: wide[0] }))),
          h(Texto, { parrafos: [
            'Guías, piezas y código que una persona puede recorrer y un agente puede leer: la voz y los principios de tu marca, sus reglas de color, letra, forma y movimiento, y los componentes con que se construye lo nuevo.',
            'Cada regla dice dónde aplica y por qué. La del lima está escrita así: va solo en el botón principal; los enlaces son azules; los fondos y los textos, neutros. El código usa esa regla tal cual.'] })),

        h('section', { className: 'demo', 'aria-label': 'Archivos del sistema de Cordura' },
          h(Entra, null, h(Archivos)),
          h('p', { className: 'web-body-s demo__pie' }, 'Archivos del sistema de Cordura, recortados. Ninguno se escribió para esta página.')),

        h(Texto, { parrafos: [
          'Las piezas siguen conectadas. El color de un botón no es un valor suelto: es un lugar en una tabla. Si la marca cambia de tono, cambia la tabla y todo lo demás la sigue.',
          'No todo se actualiza solo. Hay pruebas que avisan, y alguien tiene que mirar cómo queda. Ese alguien somos nosotros, contigo.'] }),

        h('dl', { className: 'cifras' }, [[HECHOS.componentes, 'componentes'], [HECHOS.temas, 'temas'], [HECHOS.pares, 'combinaciones de texto y fondo, medidas']].map(function (c) { return h(Entra, { key: c[1] }, h(Efecto, { id: 'contar', como: 'dd', className: 'web-display-m cifras__n' }, String(c[0])), h('dt', { className: 'web-body-m' }, c[1])); })),

        h(Sec, { id: 'consistencia', title: 'Un sistema, muchas salidas', lede: 'Cambia el tema o sube de nivel, del token más chico al entorno completo. Es el sistema funcionando, no una imagen.' },
          h('div', { className: 'mesa' },
            h('div', { className: 'mesa__nivel' }, h(A.SegmentedControl, { label: 'Nivel', options: NIVELES, value: N, onChange: nivel[1] })),
            h(A.SegmentedControl, { label: 'Tema', options: [{ value: 'dark', label: 'Oscuro' }, { value: 'light', label: 'Claro' }], value: claro ? 'light' : 'dark', onChange: function (v) { pon(v === 'light', alto); } }),
            h(A.Checkbox, { label: 'Alto contraste', checked: alto, onChange: function (v) { pon(claro, v); } })),
          h(Entra, { className: 'tarima' },
            h('p', { className: 'web-body-m tarima__que', 'aria-live': 'polite' }, QUE[N]),
            escena),
          null),

        h(Sec, { id: 'soportes', title: 'En cada soporte', lede: 'La misma propuesta en un teléfono, en un documento y en un anuncio.' },
          h('div', { className: 'soportes' },
            h(Entra, { como: 'figure', className: 'soporte' },
              h('div', { className: 'marco marco--tel' },
                h('h3', { className: 'web-h4' }, 'Propuestas'),
                h(A.List, { 'aria-label': 'Propuestas, en un teléfono', items: FILAS.slice(0, 3).map(function (r) { return { id: r.id, title: r.p, subtitle: r.e, trailing: r.f }; }) }),
                h(A.Button, { variant: 'filled', size: 'sm' }, 'Revisar 2 propuestas')),
              h('figcaption', { className: 'web-body-s' }, 'Teléfono')),
            h(Entra, { como: 'figure', className: 'soporte' },
              h('div', { className: 'marco marco--hoja' },
                h('p', { className: 'web-label-m eyebrow' }, 'Propuesta · 9 de octubre de 2026'),
                h('h3', { className: 'web-h3' }, 'Identidad de marca, versión 2'),
                h('p', { className: 'web-body-m note' }, 'Esta versión recoge los cambios que pidió tu equipo el 30 de septiembre. Revísala con calma: vence el 15 de octubre y nada se aprueba sin ti.'),
                h('p', { className: 'web-body-s hoja__firma' }, 'Cordura · Santiago de Chile')),
              h('figcaption', { className: 'web-body-s' }, 'Documento')),
            h(Entra, { como: 'figure', className: 'soporte' },
              h('div', { className: 'marco' },
                h(Campo, { clave: 'sitio', anda: false, label: 'Campo de Cordura: emblemas lima, blancos y verdes sobre negro tinta.' }),
                h('div', { className: 'anuncio' },
                  h('p', { className: 'web-label-m eyebrow' }, 'Lo nuevo de octubre'),
                  h('h3', { className: 'web-h3' }, 'Decidir con cordura'),
                  h('p', { className: 'web-body-m note' }, 'La nueva vista de propuestas te muestra qué cambió entre versiones y te deja decidir a tu ritmo.'),
                  h('div', { className: 'actions' }, h(A.Button, { variant: 'filled', size: 'sm' }, 'Conocer la vista de propuestas')))),
              h('figcaption', { className: 'web-body-s' }, 'Anuncio')))),

        h(Sec, { id: 'recibes', title: 'Lo que construimos contigo', lede: 'Seis piezas que salen de las mismas decisiones. Por eso calzan.' },
          h('div', { className: 'piezas' }, PIEZAS.map(function (x) { return h(Entra, { como: 'article', key: x.t, className: 'pieza' }, h(Efecto, { id: 'inclinar', className: 'pieza__marco' }, h(Figura, { nombre: x.fig, etiqueta: x.et })), h('h3', { className: 'web-h5' }, x.t), h('p', { className: 'web-body-m note' }, x.p)); })),
          h('p', { className: 'web-body-s demo__pie' }, 'Cifras al ' + HECHOS.fecha.split('-').reverse().join('-') + ', contadas en el sistema que usa esta página.')),

        h(Sec, { id: 'relacion', title: 'Una relación, no una entrega', lede: 'Un sistema así no se entrega y se deja: se sostiene. Por eso no vendemos un proyecto. Entramos como tu socio de diseño, al modo de una aceleradora: nos va bien si a ti te va bien.' },
          h('ol', { className: 'pasos' }, PASOS.map(function (x) { return h(Entra, { como: 'li', key: x.t }, h('span', { className: 'pasos__c', 'aria-hidden': 'true' }, h(A.Pictogram, { name: x.t, kind: 'creature', size: 32 })), h('h3', { className: 'web-h5' }, x.t), h('p', { className: 'web-body-m' }, x.p)); }))),

        h(Sec, { id: 'preguntas', title: 'Preguntas', lede: 'Las que nos haríamos nosotros antes de decidir.' },
          h(Entra, { className: 'preguntas' }, h(A.Accordion, { headingLevel: 3, items: PREGUNTAS }))),

        h('section', { className: 'closing', 'aria-labelledby': 'conversar-t' }, h(Efecto, { id: 'hilos', className: 'closing__hilos' }), h(Entra, { className: 'closing__in', attrs: { id: 'conversar' } },
          h('h2', { className: (wide[0] ? 'web-display-s' : 'web-h2') + ' closing__t', id: 'conversar-t', tabIndex: -1 }, 'Conversemos cuando quieras.'),
          h('p', { className: 'web-body-l closing__p' }, 'Escríbenos un correo. Te mostramos el sistema con tu caso a la vista. Si no es el momento, esta página sigue aquí.'),
          CONTACTO ? h('p', { className: 'web-h4 contacto' }, CONTACTO) : h('p', { className: 'web-body-m note' }, 'Borrador: falta la dirección de correo.')))),

      h('footer', { className: 'foot' }, h('div', { className: 'wrap' },
        h('p', { className: 'web-body-s' }, 'Cordura · Santiago de Chile. Todo lo que ves en esta página usa los componentes de ALMA, nuestro sistema de diseño, con los valores de Cordura.'))));
  }

  ReactDOM.createRoot(document.getElementById('app')).render(h(Page));
})();
