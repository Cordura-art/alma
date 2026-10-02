// Ensayo Café: a small landing page made only with ALMA components and the Entidad Ensayo's token values.
(function () {
  'use strict';
  var h = React.createElement, useState = React.useState, useEffect = React.useEffect, A = window.AlmaDS;
  var root = document.documentElement;
  root.lang = 'es';

  // The theme: the viewer's choice on this page (remembered on this device), else the host's (data-theme on the root),
  // else the system's. A later change of the host's theme takes over again.
  var KEY = 'ensayo-cafe-tema', ok = function (v) { return v === 'light' || v === 'dark'; };
  var store = { get: function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } }, set: function (v) { try { localStorage.setItem(KEY, v); } catch (e) { /* storage blocked */ } } };
  var mq = window.matchMedia ? matchMedia('(prefers-color-scheme: light)') : null, host = root.getAttribute('data-theme'), choice = store.get(), listen = function () {};
  function paint() { var t = ok(choice) ? choice : ok(host) ? host : (mq && mq.matches ? 'light' : 'dark'); root.style.colorScheme = t; if (root.getAttribute('data-theme') !== t) root.setAttribute('data-theme', t); listen(t); return t; }
  var painted = paint();
  new MutationObserver(function () { var v = root.getAttribute('data-theme'); if (v !== painted) { host = v; choice = null; painted = paint(); } }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { painted = paint(); });
  function choose(t) { choice = t; store.set(t); painted = paint(); }

  function goTo(id) {
    var el = document.getElementById(id); if (!el) return;
    var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
    var t = el.querySelector('.sec__title'); if (t) t.focus({ preventScroll: true });
  }
  function clp(n) { return '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

  var RECETA = [
    { icon: 'cafe', title: 'Grano', trailing: 'Arábica, tueste medio' },
    { icon: 'filter', title: 'Molienda', trailing: 'Gruesa' },
    { icon: 'drink--01', title: 'Proporción', trailing: '1 de café por 8 de agua' },
    { icon: 'time', title: 'Tiempo en frío', trailing: '18 horas' },
    { icon: 'snowflake', title: 'Temperatura', trailing: '4 °C' },
    { icon: 'checkmark', title: 'Filtrado', trailing: 'Dos veces, en papel' }
  ];
  var CORRECCIONES = [
    { id: 'v3', title: 'Versión 3: amargaba al final', content: h('p', { className: 'web-body-m note' }, 'Reposaba 24 horas. Bajamos a 18 y el amargor se fue. El cuerpo se mantuvo.') },
    { id: 'v8', title: 'Versión 8: con hielo quedaba aguado', content: h('p', { className: 'web-body-m note' }, 'Usábamos 1 parte de café por 10 de agua. Pasamos a 1 por 8: ahora aguanta el hielo hasta el último trago.') },
    { id: 'v11', title: 'Versión 11: se veía turbio', content: h('p', { className: 'web-body-m note' }, 'Filtrábamos una sola vez, en malla. Sumamos un segundo filtrado en papel y quedó limpio.') },
    { id: 'v14', title: 'Versión 14: la que servimos', content: h('p', { className: 'web-body-m note' }, 'No le encontramos nada que quitar. Eso no significa que esté terminada: significa que es la mejor que tenemos hoy.') }
  ];
  var CARTA = [
    { id: 'solo', que: 'Cold brew solo', tam: '350 ml', precio: 2900 },
    { id: 'leche', que: 'Cold brew con leche', tam: '350 ml', precio: 3400 },
    { id: 'llevar', que: 'Concentrado para llevar', tam: '500 ml, rinde 4 vasos', precio: 8900 }
  ];
  var VISITA = [
    { icon: 'location', title: 'Dirección', subtitle: 'Calle del Borrador 14, Santiago' },
    { icon: 'time', title: 'Horario', subtitle: 'Martes a sábado, de 8:30 a 17:00' },
    { icon: 'wallet', title: 'Pago', subtitle: 'Tarjeta o efectivo' }
  ];

  function Sec(p) {
    return h('section', { className: 'sec', id: p.id, 'aria-labelledby': p.id + '-t' },
      h('div', { className: 'sec__head' },
        h('h2', { className: 'web-h2 sec__title', id: p.id + '-t', tabIndex: -1 }, p.title),
        p.lede ? h('p', { className: 'web-body-l sec__lede' }, p.lede) : null),
      p.children);
  }

  var Campo = window.__GENERADOR_VISTAS(window.__GENES.ensayo).Campo;

  function Page() {
    var wide = useState(!window.matchMedia || matchMedia('(min-width: 56rem)').matches);
    useEffect(function () {
      if (!window.matchMedia) return;
      var m = matchMedia('(min-width: 56rem)'), on = function () { wide[1](m.matches); };
      m.addEventListener('change', on); return function () { m.removeEventListener('change', on); };
    }, []);
    var tema = useState(painted), light = tema[0] === 'light';
    useEffect(function () { listen = tema[1]; return function () { listen = function () {}; }; }, []);
    // The cover is Ensayo's field. It moves unless the person asked for less motion, and can always be paused.
    var anda = useState(!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches));
    return h(React.Fragment, null,
      h('a', { className: 'skip', href: '#carta', onClick: function (e) { e.preventDefault(); goTo('carta'); } }, 'Saltar a la carta'),
      h('header', { className: 'top' }, h('div', { className: 'wrap top__in' },
        h('p', { className: 'web-h6 brand' }, 'Ensayo ', h('span', null, 'Café')),
        h('nav', { className: 'top__nav', 'aria-label': 'Secciones' },
          h(A.Button, { variant: 'plain', onClick: function () { goTo('carta'); } }, 'Carta'),
          h(A.Button, { variant: 'plain', onClick: function () { goTo('visita'); } }, 'Visita'),
          h(A.Button, { variant: 'plain', icon: light ? 'asleep' : 'light', 'aria-label': light ? 'Usar tema oscuro' : 'Usar tema claro', onClick: function () { choose(light ? 'dark' : 'light'); } })))),
      h('main', { className: 'wrap' },
        h('div', { className: 'hero' },
          h('div', { className: 'hero__txt' },
            h('p', { className: 'web-label-m eyebrow' }, 'Cafetería · Abre el 15 de octubre'),
            h('h1', { className: (wide[0] ? 'web-display-m' : 'web-display-s') + ' hero__title' }, 'Un solo café. Corregido catorce veces.'),
            h('p', { className: 'web-body-l lede' }, 'Somos un taller de edición y abrimos una cafetería. Partimos con una sola cosa en la carta: cold brew. Lo reescribimos catorce veces, hasta que dejó de sobrarle algo.'),
            h('div', { className: 'actions' },
              h(A.Button, { variant: 'filled', size: wide[0] ? 'md' : 'sm', iconAfter: 'arrow--down', onClick: function () { goTo('carta'); } }, 'Ver la carta'),
              h(A.Button, { variant: 'tertiary', size: wide[0] ? 'md' : 'sm', onClick: function () { goTo('visita'); } }, 'Cómo llegar'))),
          h('div', { className: 'hero__art' },
            h(Campo, { clave: 'cafe', anda: anda[0], label: 'Campo de Ensayo: partículas magenta, ámbar y rojas que derivan sobre negro tinta y dejan estela.' }),
            h(A.Button, { variant: 'plain', size: 'sm', iconBefore: anda[0] ? 'pause' : 'play', onClick: function () { anda[1](!anda[0]); } }, anda[0] ? 'Pausar el movimiento' : 'Reproducir el movimiento'))),

        h(Sec, { id: 'receta', title: 'La receta, versión 14', lede: 'Un café también se edita. Esta es la versión que servimos y lo que corregimos para llegar a ella.' },
          h('div', { className: 'two' },
            h(A.List, { header: 'Cómo lo hacemos', headingLevel: 3, items: RECETA, footer: 'Sin azúcar ni saborizantes.' }),
            h('div', null,
              h('h3', { className: 'web-label-l note', style: { marginBottom: 'var(--space-8)' } }, 'Lo que corregimos'),
              h(A.Accordion, { headingLevel: 4, defaultOpen: ['v14'], items: CORRECCIONES })))),

        h(Sec, { id: 'carta', title: 'La carta', lede: 'Tres formas de tomar lo mismo.' },
          // On a phone a three-column table would hide the price: the same rows go in a list.
          wide[0] ? h(A.Table, { caption: 'Carta de Ensayo Café', rows: CARTA, columns: [
            { key: 'que', label: 'Qué' }, { key: 'tam', label: 'Tamaño' },
            { key: 'precio', label: 'Precio', align: 'end', render: function (r) { return clp(r.precio); } }] })
            : h(A.List, { 'aria-label': 'Carta de Ensayo Café', items: CARTA.map(function (r) { return { id: r.id, title: r.que, subtitle: r.tam, trailing: clp(r.precio) }; }) }),
          h('p', { className: 'web-body-m note' }, 'Leche entera o de avena, al mismo precio. Los precios incluyen IVA.')),

        h(Sec, { id: 'visita', title: 'Visita', lede: 'Ven con tiempo. Nada aquí está hecho para tomarse apurado.' },
          h('div', { className: 'two' },
            h(A.List, { 'aria-label': 'Datos para visitarnos', items: VISITA }),
            h(A.InlineNotification, { kind: 'callout', status: 'info', title: 'Abrimos el jueves 15 de octubre de 2026', message: 'Desde las 8:30. Ese día hay cold brew solo: la leche llega el viernes.' }))),

        h('section', { className: 'closing', 'aria-labelledby': 'cierre-t' },
          h('h2', { className: (wide[0] ? 'web-display-s' : 'web-h2') + ' closing__t', id: 'cierre-t' }, 'Si no te gusta, dinos por qué.'),
          h('p', { className: 'web-body-l closing__p' }, 'Anotamos cada observación con su razón. La versión 15 puede salir de la tuya.'))),

      h('footer', { className: 'foot' }, h('div', { className: 'wrap' },
        h('p', { className: 'web-body-s' }, 'Página de ejemplo. Ensayo es una marca ficticia creada para probar ALMA, el sistema de diseño de Cordura: esta cafetería, su dirección y sus precios no existen. Todo lo que ves usa los componentes de ALMA con los valores de la Entidad Ensayo.'))));
  }

  ReactDOM.createRoot(document.getElementById('app')).render(h(Page));
})();
