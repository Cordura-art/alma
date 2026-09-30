// Ajustes de ALMA: tune colors per theme, the Roboto Flex axes, type weights and radii on live ALMA components,
// check contrast with the repo's own pairs, and export the changes as JSON for `npm run tokens:apply`.
(function () {
  'use strict';
  var h = React.createElement, useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
  var A = window.AlmaDS;
  var C = JSON.parse(document.getElementById('tuner-data').textContent);
  var root = document.documentElement;
  root.lang = 'es';
  var KEY = 'alma-ajustes';
  var store = {
    get: function () { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } },
    set: function (v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
  };
  function empty() { return { themes: {}, fontAxis: {}, weights: {}, radius: {} }; }

  // ---- Contrast: the same rule as scripts/check-contrast.mjs (high contrast raises text to 7:1).
  function rgba(v) {
    var m = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)$/.exec(v);
    if (m) return [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]];
    m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i.exec(v);
    if (m) return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16), m[4] ? parseInt(m[4], 16) / 255 : 1];
    return null;
  }
  function over(fg, bg) { return [0, 1, 2].map(function (i) { return Math.round(fg[i] * fg[3] + bg[i] * (1 - fg[3])); }).concat(1); }
  function lum(c) { function f(x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); } return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function checkContrast(el, theme) {
    var cs = getComputedStyle(el), hc = /-hc$/.test(theme), fails = [], n = 0;
    function col(name) { return rgba(name.charAt(0) === '#' ? name : cs.getPropertyValue('--' + name).trim()); }
    C.pairs.forEach(function (p) {
      var need = +p[4]; if (hc && need >= 4.5) need = 7;
      var fgName = hc ? (C.hcForeground[p[0] + '|' + p[1]] || p[2]) : p[2];
      var b = col(p[3]), f = col(fgName), page = col('ui-02');
      if (!b || !f || !page) return;
      if (b[3] < 1) b = over(b, page);
      if (f[3] < 1) f = over(f, b);
      var r = ratio(f, b); n++;
      if (r < need) fails.push({ what: p[0] + ' · ' + p[1], r: r, need: need });
    });
    for (var i = 1; i <= 8; i++) {
      var v = col('viz-cat-0' + i), u = col('ui-01'); if (!v || !u) continue; n++;
      var r2 = ratio(v, u); if (r2 < 3) fails.push({ what: 'Gráficos · viz-cat-0' + i + ' sobre ui-01', r: r2, need: 3 });
    }
    return { n: n, fails: fails };
  }
  var fmt = function (x) { return x.toFixed(2).replace('.', ','); };

  function countChanges(ch) {
    var n = 0; Object.keys(ch.themes).forEach(function (t) { n += Object.keys(ch.themes[t]).length; });
    return n + Object.keys(ch.fontAxis).length + Object.keys(ch.weights).length + Object.keys(ch.radius).length;
  }
  function exportable(ch) {
    var out = {};
    var th = {}; Object.keys(ch.themes).forEach(function (t) { if (Object.keys(ch.themes[t]).length) th[t] = ch.themes[t]; });
    if (Object.keys(th).length) out.themes = th;
    ['fontAxis', 'weights', 'radius'].forEach(function (k) { if (Object.keys(ch[k]).length) out[k] = ch[k]; });
    return out;
  }

  // ---- Controls
  function ColorRow(p) {
    var cur = p.value, changed = p.changed;
    return h('div', { className: 'trow' },
      h('input', { type: 'color', className: 'tswatch', value: cur.toLowerCase(), 'aria-label': 'Color de ' + p.name,
        onChange: function (e) { p.onChange(e.target.value.toUpperCase()); } }),
      h('div', { className: 'trow__text' },
        h('span', { className: 'trow__name' }, p.name),
        h('span', { className: 'trow__hex' }, cur.toUpperCase() + (changed ? ' · antes ' + p.original : ''))),
      changed ? h(A.Button, { variant: 'plain', icon: 'renew', 'aria-label': 'Restablecer ' + p.name, onClick: p.onReset }) : null);
  }
  function ColorPanel(p) {
    var th = p.theme, mine = p.ch.themes[th] || {};
    return h('div', null,
      h('p', { className: 'tnote web-body-s' }, 'Los colores del tema ' + p.themeName.toLowerCase() + '. Cada cambio se ve en la vista previa y se revisa contra los ' + p.contrast.n + ' pares de contraste de ALMA.'),
      C.colorGroups.map(function (g) {
        return h('div', { key: g.title, className: 'tgroup' },
          h('h2', { className: 'tgroup__title web-label-s' }, g.title),
          g.tokens.map(function (name) {
            var original = C.values[th][name], v = mine[name] || original;
            return h(ColorRow, { key: name, name: name, value: v, original: original, changed: !!mine[name],
              onChange: function (hex) { p.setColor(th, name, hex === original ? null : hex); },
              onReset: function () { p.setColor(th, name, null); } });
          }));
      }));
  }
  function slider(label, min, max, step, value, onChange, format) {
    return h(A.Slider, { key: label, label: label, min: min, max: max, step: step, value: value, onChange: onChange, format: format, showField: true });
  }
  function TypePanel(p) {
    var ax = function (k) { return p.ch.fontAxis[k] !== undefined ? p.ch.fontAxis[k] : C.fontAxis[k]; };
    var w = function (k) { return p.ch.weights[k] !== undefined ? p.ch.weights[k] : C.weights[k]; };
    return h('div', null,
      h('p', { className: 'tnote web-body-s' }, 'Roboto Flex es una fuente variable. El ancho y el grado se aplican a todo el texto de ALMA; los pesos, a los estilos de texto (web-*, app-*, print-*).'),
      h('div', { className: 'tsliders' },
        slider('Ancho (wdth)', 25, 151, 1, ax('font-width'), function (v) { p.set('fontAxis', 'font-width', v, C.fontAxis['font-width']); }),
        slider('Grado (GRAD)', -200, 150, 1, ax('font-grade'), function (v) { p.set('fontAxis', 'font-grade', v, C.fontAxis['font-grade']); }),
        slider('Peso de display', 100, 1000, 10, w('display'), function (v) { p.set('weights', 'display', v, C.weights.display); }),
        slider('Peso de títulos', 100, 1000, 10, w('heading'), function (v) { p.set('weights', 'heading', v, C.weights.heading); }),
        slider('Peso de cuerpo y etiquetas', 100, 1000, 10, w('body'), function (v) { p.set('weights', 'body', v, C.weights.body); })));
  }
  function ShapePanel(p) {
    return h('div', null,
      h('p', { className: 'tnote web-body-s' }, 'Los radios de ALMA. radius-pill queda fijo: es la píldora de los botones.'),
      h('div', { className: 'tsliders' }, C.radius.map(function (r) {
        var v = p.ch.radius[r.name] !== undefined ? parseInt(p.ch.radius[r.name], 10) : parseInt(r.value, 10);
        return slider(r.name, 0, 48, 1, v, function (x) { p.set('radius', r.name, x + 'px', r.value); }, function (x) { return x + ' px'; });
      })));
  }

  // ---- Preview: real ALMA components in the chosen theme, with the changes as inline custom properties.
  function Preview(p) {
    var ch = p.ch, vars = {};
    Object.keys(ch.themes[p.theme] || {}).forEach(function (k) { vars['--' + k] = ch.themes[p.theme][k]; });
    Object.keys(ch.fontAxis).forEach(function (k) { vars['--' + k] = String(ch.fontAxis[k]); });
    Object.keys(ch.weights).forEach(function (k) { vars['--w-' + k] = String(ch.weights[k]); });
    Object.keys(ch.radius).forEach(function (k) { vars['--' + k] = ch.radius[k]; });
    var B = A.Button;
    return h('div', { ref: p.innerRef, className: 'tuner-preview', 'data-theme': p.theme, style: vars, 'aria-label': 'Vista previa', role: 'region' },
      h('div', null,
        h('p', { className: 'web-label-s tprev__muted' }, 'Vista previa · ' + p.themeName),
        h('p', { className: 'web-display-s' }, 'ALMA'),
        h('h2', { className: 'web-h4' }, 'Tu próximo viaje'),
        h('p', { className: 'web-body-m tprev__muted' }, 'Santiago → Viña del Mar, martes 31 de marzo a las 08:30. Revisa las ',
          h(A.Link, { href: '#' }, 'condiciones del pasaje'), ' antes de pagar.')),
      h('div', { className: 'tprev__row' },
        h(B, { variant: 'filled', role: 'primary' }, 'Pagar $7.000'),
        h(B, { variant: 'tinted' }, 'Guardar'),
        h(B, { variant: 'gray' }, 'Cancelar'),
        h(B, { variant: 'plain' }, 'Ver detalle'),
        h(B, { variant: 'tinted', role: 'destructive' }, 'Eliminar')),
      h('div', { className: 'tprev__grid' },
        h('div', { style: { display: 'grid', gap: 'var(--space-16)' } },
          h(A.TextInput, { label: 'Correo', defaultValue: 'camila@correo.cl', helper: 'Te enviaremos el pasaje aquí' }),
          h(A.TextInput, { label: 'RUT', defaultValue: '12.345.678', error: 'Agrega el dígito verificador' }),
          h(A.SegmentedControl, { label: 'Tipo de viaje', options: ['Ida', 'Ida y regreso'], defaultValue: 'Ida' }),
          h(A.Checkbox, { label: 'Recordar en este dispositivo', defaultChecked: true }),
          h(A.Switch, { label: 'Notificaciones de pago', defaultChecked: true })),
        h('div', { style: { display: 'grid', gap: 'var(--space-16)' } },
          h(A.Card, { headingLevel: 3, eyebrow: '31 mar · Interurbano', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14' }),
          h('div', { className: 'tprev__row' }, h(A.Tag, { color: 'green' }, 'Pagado'), h(A.Tag, { color: 'blue' }, 'Interurbano'), h(A.Tag, { color: 'yellow' }, 'Pendiente')),
          h(A.InlineNotification, { status: 'success', title: 'Pago aprobado', message: 'Tu pasaje está en tu billetera.', dismissible: false }),
          h(A.ProgressBar, { label: 'Subiendo fotos', value: 0.6, description: 'Subiendo 7 de 12 fotos' }))));
  }

  function App() {
    var saved = store.get() || {};
    var chS = useState(function () { var e = empty(); return saved.ch ? Object.assign(e, saved.ch) : e; }), ch = chS[0], setCh = chS[1];
    var thS = useState(saved.theme || 'dark'), theme = thS[0];
    var tabS = useState('Color');
    var ctS = useState({ n: 0, fails: [] }), contrast = ctS[0];
    var ref = useRef(null);
    var themeName = (C.themes.filter(function (t) { return t.id === theme; })[0] || C.themes[0]).name;

    useEffect(function () { root.setAttribute('data-theme', theme); root.style.colorScheme = /^light/.test(theme) ? 'light' : 'dark'; }, [theme]);
    useEffect(function () { store.set({ ch: ch, theme: theme }); }, [ch, theme]);
    useEffect(function () { var raf = requestAnimationFrame(function () { if (ref.current) ctS[1](checkContrast(ref.current, theme)); }); return function () { cancelAnimationFrame(raf); }; }, [ch, theme]);

    function setColor(th, name, hex) {
      setCh(function (c) { var n = Object.assign({}, c, { themes: Object.assign({}, c.themes) }); var t = Object.assign({}, n.themes[th] || {});
        if (hex) t[name] = hex; else delete t[name]; n.themes[th] = t; return n; });
    }
    function set(section, key, value, original) {
      setCh(function (c) { var n = Object.assign({}, c); var s = Object.assign({}, c[section]);
        if (String(value) === String(original)) delete s[key]; else s[key] = value; n[section] = s; return n; });
    }
    var total = countChanges(ch), json = JSON.stringify(exportable(ch), null, 2);
    function copy() {
      var done = function () { A.toast({ status: 'success', title: 'Cambios copiados', message: 'Pégalos en tu conversación con Claude o guárdalos como cambios.json.' }); };
      try { navigator.clipboard.writeText(json).then(done, function () { A.toast({ status: 'info', title: 'No se pudo copiar', message: 'Abre «Ver los cambios» y cópialos desde ahí.' }); }); }
      catch (e) { A.toast({ status: 'info', title: 'No se pudo copiar', message: 'Abre «Ver los cambios» y cópialos desde ahí.' }); }
    }
    var fails = contrast.fails;

    return h(React.Fragment, null,
      h(A.Toolbar, { title: 'Ajustes de ALMA', sticky: true }),
      h('div', { className: 'tuner' },
        h('aside', { className: 'tuner__controls', 'aria-label': 'Ajustes' },
          h(A.PopUpButton, { label: 'Tema', value: theme, onChange: thS[1], options: C.themes.map(function (t) { return { value: t.id, label: t.name }; }) }),
          fails.length
            ? h(A.InlineNotification, { status: 'error', dismissible: false, title: fails.length + (fails.length === 1 ? ' par no cumple' : ' pares no cumplen') + ' el contraste en este tema',
                message: fails.slice(0, 8).map(function (f) { return f.what + ': ' + fmt(f.r) + ' (mínimo ' + String(f.need).replace('.', ',') + ')'; }).join(' · ') + (fails.length > 8 ? ' · y ' + (fails.length - 8) + ' más' : '') })
            : h(A.InlineNotification, { status: 'success', dismissible: false, title: 'Contraste: los ' + contrast.n + ' pares cumplen en este tema' }),
          h(A.Tabs, { label: 'Qué ajustar', value: tabS[0], onChange: tabS[1], tabs: [
            { value: 'Color', label: 'Color', content: h(ColorPanel, { ch: ch, theme: theme, themeName: themeName, contrast: contrast, setColor: setColor }) },
            { value: 'Tipografía', label: 'Tipografía', content: h(TypePanel, { ch: ch, set: set }) },
            { value: 'Forma', label: 'Forma', content: h(ShapePanel, { ch: ch, set: set }) }] }),
          h(A.InlineNotification, { kind: 'callout', status: 'info', title: 'Cómo aplicar los cambios',
            message: 'Copia los cambios y pégalos en tu conversación con Claude. O guárdalos como cambios.json en el repositorio y corre: npm run tokens:apply -- cambios.json, y luego npm run build y npm test.' }),
          h(A.Accordion, { headingLevel: 2, items: [{ id: 'json', title: 'Ver los cambios (' + total + ')',
            content: h(A.Textarea, { label: 'Cambios en JSON', value: json, readOnly: true, rows: 10 }) }] })),
        h('main', { className: 'tuner__main', id: 'main' }, h(Preview, { ch: ch, theme: theme, themeName: themeName, innerRef: ref }))),
      h('footer', { className: 'tbar' },
        h('p', { className: 'tbar__count web-label-m' }, total ? total + (total === 1 ? ' cambio' : ' cambios') + (fails.length ? ' · revisa el contraste' : '') : 'Sin cambios'),
        h(A.Button, { variant: 'gray', disabled: !total, onClick: function () { setCh(empty()); } }, 'Deshacer todo'),
        h(A.Button, { variant: 'filled', iconBefore: 'copy', disabled: !total, onClick: copy }, 'Copiar cambios')),
      h(A.ToastRegion));
  }

  ReactDOM.createRoot(document.getElementById('app')).render(h(App));
})();
