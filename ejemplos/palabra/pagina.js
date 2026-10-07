// Palabra: the page where an entity's word is worked on. The word itself is site/palabra.js; everything around it is
// ALMA's components, with the values of the entity that is chosen.
(function () {
  'use strict';
  var h = React.createElement, useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, A = window.AlmaDS, T = window.__ENTIDADES, IDS = Object.keys(T);
  var root = document.documentElement; root.lang = 'es';
  var KEY = 'alma-palabra-tema', ok = function (v) { return v === 'light' || v === 'dark'; }, guardado = null; try { guardado = localStorage.getItem(KEY); } catch (e) { /* storage blocked */ }
  function pinta(t) { root.setAttribute('data-theme', t); root.style.colorScheme = t; return t; }
  // (ALMA is dark unless someone chose otherwise: here before, or on the page that holds this one)
  var inicial = pinta(ok(guardado) ? guardado : ok(root.getAttribute('data-theme')) ? root.getAttribute('data-theme') : 'dark');
  var estilo = document.getElementById('entidad');

  function Rasgo(p) { return h('div', { className: 'rasgo' }, h('dt', { className: 'web-label-m' }, p.nombre), h('dd', { className: 'web-h5 valor' }, p.valor), h('dd', { className: 'web-body-m hace' }, p.hace)); }

  function Page() {
    var tema = useState(inicial), light = tema[0] === 'light', id = useState(IDS[0]), E = T[id[0]], G = E.genes, texto = useState(E.nombre), tokens = useState({ reposo: '', ancho: '', grado: '', tope: '' });
    var caja = useRef(null), pieza = useRef(null);
    // The word is mounted once; the entity, the theme and the text reach it as they change.
    useEffect(function () { pieza.current = window.AlmaPalabra.monta(caja.current, { genes: G, texto: texto[0] }); return function () { pieza.current.deja(); }; }, []);
    useEffect(function () {
      estilo.textContent = E.css; var p = pieza.current; p.genes(G); p.texto(texto[0]);
      var cs = getComputedStyle(caja.current), s = p.estado; tokens[1]({ reposo: s.reposo, tope: s.tope, ancho: cs.getPropertyValue('--font-width').trim(), grado: cs.getPropertyValue('--font-grade').trim() });
    }, [id[0]]);
    function elige(nombre) { var n = IDS.filter(function (k) { return T[k].nombre === nombre; })[0]; texto[1](T[n].nombre); id[1](n); }
    function escribe(t) { texto[1](t); if (t.trim()) pieza.current.texto(t.trim()); }
    function cambia() { var t = light ? 'dark' : 'light'; try { localStorage.setItem(KEY, t); } catch (e) { /* storage blocked */ } tema[1](pinta(t)); pieza.current.lee(); }
    return h(React.Fragment, null,
      h('header', { className: 'top' }, h('div', { className: 'wrap top__in' },
        h('p', { className: 'web-h6' }, 'Palabra'),
        h(A.Button, { variant: 'plain', icon: light ? 'asleep' : 'light', 'aria-label': light ? 'Usar tema oscuro' : 'Usar tema claro', onClick: cambia }))),
      h('main', null,
        h('div', { className: 'escena' }, h('h1', { ref: caja, 'aria-describedby': 'pista' })),      // (its letters are the word's own script's to write, not this page's)
        h('div', { className: 'wrap' },
          h('p', { className: 'web-body-m pista', id: 'pista' }, 'Pasa el puntero por la palabra. Con teclado: enfócala y usa las flechas.'),
          h('div', { className: 'mesa' },
            h(A.SegmentedControl, { label: 'Entidad', options: IDS.map(function (k) { return T[k].nombre; }), value: E.nombre, onChange: elige }),
            h('div', { className: 'mesa__campo' }, h(A.TextInput, { label: 'Palabra', value: texto[0], maxLength: 24, onChange: escribe })),
            h(A.Button, { variant: 'gray', iconBefore: 'restart', onClick: function () { pieza.current.escribe(); } }, 'Volver a escribir')),
          h('section', { className: 'sec', 'aria-labelledby': 'de-donde' },
            h('h2', { className: 'web-h3', id: 'de-donde' }, 'De dónde sale cada cosa'),
            h('p', { className: 'web-body-l' }, 'La palabra no tiene ajustes propios: todo lo que hace lo toma de la entidad. Cambia de entidad y cambia la manera de escribirse.'),
            h('dl', { className: 'rasgos' },
              h(Rasgo, { nombre: 'Sus números', valor: G.numeros.join(' · '), hace: 'El ritmo de la escritura: cada letra espera ese número de pulsos después de la anterior.' }),
              h(Rasgo, { nombre: 'Su dirección', valor: G.direccion === 'foco' ? 'Foco' : 'Giro', hace: G.direccion === 'foco' ? 'Se escribe desde el centro hacia los lados.' : 'Se escribe de la primera letra a la última.' }),
              h(Rasgo, { nombre: 'Su redondez', valor: String(Math.round(G.redondez * 100) / 100).replace('.', ','), hace: 'Cuánto difuminado trae cada letra al entrar: más redonda, más suave.' }),
              h(Rasgo, { nombre: 'Sus puntas', valor: G.puntas, hace: 'Hasta qué peso llega al tocarla (' + tokens[0].tope + ') y qué tan angosto es el toque.' }),
              h(Rasgo, { nombre: 'Peso en reposo', valor: tokens[0].reposo, hace: 'Su token font-weight-display. Cada letra entra en 100, el más liviano, y sube hasta aquí.' }),
              h(Rasgo, { nombre: 'Ancho y grado', valor: tokens[0].ancho + ' · ' + tokens[0].grado, hace: 'Sus tokens font-width y font-grade, los mismos de todo su texto.' }))))));
  }
  ReactDOM.createRoot(document.getElementById('app')).render(h(Page));
})();
