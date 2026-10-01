// Scenes for the component guides (docs/components/<dir>/<tab>.md). Each scene names the «Imagen pendiente» marker it
// replaces (dir, tab and the start of its text); scripts/build-images.mjs photographs them with the real components.
// In the page: h = React.createElement, A = AlmaDS, D = token data, and the helpers of build-images.mjs
// (num, dimH, dimW, padL, padT, gapX, gapY, rad, st, themes, device, textOf, all, $).

const scene = (dir, tab, marker, file, alt, rest) => ({ dir, tab, marker, file: `Componentes/${file}`, alt, ...rest });

export const componentScenes = [
  // ---------- Button ----------
  scene('button', 'usage', 'anatomía numerada de un botón', 'button-anatomia',
    'Anatomía de Button: un botón filled con etiqueta e ícono de flecha, un botón plain y un botón solo ícono, con su contenedor (1), su etiqueta (2) y su ícono (3) numerados.',
    { js: `mount(h('div', { className: 'row', style: { gap: 'var(--space-80)', alignItems: 'center', padding: '48px 40px' } },
        h(A.Button, { variant: 'filled', role: 'primary', size: 'md', iconAfter: 'arrow--right' }, 'Continuar'),
        h(A.Button, { variant: 'plain', size: 'md' }, 'Ver detalle'),
        h(A.Button, { variant: 'tinted', size: 'md', icon: 'add', 'aria-label': 'Agregar pasajero' })));`,
      after: `var b = all('.alma-btn');
        num(b[0], 1, 'top', { at: 0 }); num(textOf(b[0]), 2, 'bottom', { outline: false, d: 22 }); num(b[0].querySelector('.alma-ico'), 3, 'bottom', { outline: false, d: 26 });
        num(textOf(b[1]), 2, 'bottom'); num(b[2], 1, 'top'); num(b[2].querySelector('.alma-ico'), 3, 'bottom', { outline: false, d: 20 });` }),

  scene('button', 'usage', 'los tres tamaños lado a lado', 'button-tamanos',
    'Los tres tamaños de Button lado a lado, con su alto: sm de 44 px en un formulario, md de 56 px como acción principal de una pantalla móvil y lg de 72 px en una portada.',
    { js: `function ctx(size, where, child) { return h('div', { className: 'col', style: { gap: 'var(--space-16)' } }, h('p', { className: 'cap web-label-m' }, size + ' · ' + where), h('div', { className: 'pane', style: { minHeight: '12rem', display: 'grid', alignContent: 'end', gap: 'var(--space-16)' } }, child)); }
      mount(h('div', { className: 'row', style: { alignItems: 'stretch', gap: 'var(--space-64)', paddingRight: '64px' } },
        ctx('sm', 'formulario', h(React.Fragment, null, h(A.TextInput, { label: 'Correo', defaultValue: 'camila@correo.cl' }), h('div', null, h(A.Button, { variant: 'filled', role: 'primary' }, 'Guardar')))),
        ctx('md', 'pantalla móvil', h('div', { style: { width: '18rem', display: 'grid' } }, h(A.Button, { variant: 'filled', role: 'primary', size: 'md' }, 'Pagar $7.000'))),
        ctx('lg', 'portada', h(React.Fragment, null, h('p', { className: 'web-h3', style: { margin: 0 } }, 'Viaja por Chile'), h('div', null, h(A.Button, { variant: 'filled', role: 'primary', size: 'lg', iconAfter: 'arrow--right' }, 'Buscar pasajes'))))));`,
      after: `all('.alma-btn').forEach(function (b) { dimH(b, 'right'); });` }),

  scene('button', 'usage', 'una vista con una sola acción', 'button-enfasis',
    'A la izquierda, la forma correcta: una vista con una sola acción filled y dos de menor énfasis. A la derecha, la incorrecta: tres acciones filled compiten entre sí.',
    { js: `function view(ok, btns) { return h('div', { className: 'col', style: { gap: 'var(--space-16)' } },
        h('p', { className: 'cap web-label-m', style: { display: 'flex', gap: '8px', alignItems: 'center', color: ok ? 'var(--text-01)' : 'var(--text-error)' } }, h(A.Icon, { name: ok ? 'checkmark' : 'close', size: 20 }), ok ? 'Así: una sola acción principal' : 'Así no: todo es principal'),
        h('div', { className: 'pane col', style: { width: '26rem', gap: 'var(--space-16)' } }, h('h3', { className: 'web-h5', style: { margin: 0 } }, 'Tu pasaje está reservado'),
          h('p', { className: 'cap web-body-m' }, 'Paga antes de 15 minutos para no perder el asiento 14.'), h('div', { className: 'row', style: { gap: 'var(--space-8)' } }, btns))); }
      mount(h('div', { className: 'row', style: { gap: 'var(--space-40)' } },
        view(true, [h(A.Button, { key: 1, variant: 'filled', role: 'primary' }, 'Pagar'), h(A.Button, { key: 2, variant: 'gray' }, 'Cambiar asiento'), h(A.Button, { key: 3, variant: 'plain' }, 'Ver detalle')]),
        view(false, [h(A.Button, { key: 1, variant: 'filled' }, 'Pagar'), h(A.Button, { key: 2, variant: 'filled' }, 'Cambiar asiento'), h(A.Button, { key: 3, variant: 'filled' }, 'Ver detalle')])));` }),

  scene('button', 'usage', 'alineación en diálogo', 'button-alineacion',
    'Alineación de los botones en seis contextos: en un diálogo a la derecha con Cancelar primero; en un formulario a la izquierda; en un flujo por pasos abajo a la derecha con Volver antes de Continuar; en una tarjeta abajo; en una barra de herramientas a la derecha del título; y en el teléfono a todo el ancho.',
    { js: `function ctx(name, child, w) { return h('div', { className: 'col', style: { gap: 'var(--space-8)' } }, h('p', { className: 'cap web-label-m' }, name), h('div', { className: 'pane col', style: { width: (w || 22) + 'rem', minHeight: '11rem', boxSizing: 'border-box', gap: 'var(--space-16)', alignContent: 'space-between' } }, child)); }
      var B = A.Button;
      mount(h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 'var(--space-32)' } },
        ctx('Diálogo', [h('div', { key: 't' }, h('p', { className: 'web-h6', style: { margin: 0 } }, '¿Anular el pasaje?'), h('p', { className: 'cap web-body-s' }, 'Te devolvemos $7.000 a tu billetera.')),
          h('div', { key: 'b', className: 'row', style: { justifyContent: 'flex-end', gap: '8px' } }, h(B, { variant: 'gray', role: 'cancel' }, 'Cancelar'), h(B, { variant: 'filled', role: 'destructive' }, 'Anular'))]),
        ctx('Formulario', [h(A.TextInput, { key: 'i', label: 'Nombre', defaultValue: 'Camila Rojas' }), h('div', { key: 'b', className: 'row', style: { gap: '8px' } }, h(B, { variant: 'filled', role: 'primary' }, 'Guardar'), h(B, { variant: 'plain' }, 'Descartar'))]),
        ctx('Flujo por pasos', [h('p', { key: 't', className: 'cap web-label-s' }, 'Paso 2 de 3 · Pasajeros'), h('div', { key: 'b', className: 'row', style: { justifyContent: 'flex-end', gap: '8px' } }, h(B, { variant: 'gray' }, 'Volver'), h(B, { variant: 'filled', role: 'primary' }, 'Continuar'))]),
        ctx('Tarjeta', [h('div', { key: 't' }, h('p', { className: 'cap web-label-s', style: { margin: 0 } }, 'Billetera'), h('p', { className: 'web-h6', style: { margin: 0 } }, 'Recarga automática')), h('div', { key: 'b', className: 'row', style: { gap: '8px' } }, h(B, { variant: 'tinted' }, 'Cambiar monto'), h(B, { variant: 'plain' }, 'Desactivar'))]),
        ctx('Barra de herramientas', [h('div', { key: 'b', className: 'row', style: { alignItems: 'center', justifyContent: 'space-between' } }, h('p', { className: 'web-h6', style: { margin: 0 } }, 'Mis viajes'), h('div', { className: 'row', style: { gap: 0 } }, h(B, { variant: 'plain', icon: 'filter', 'aria-label': 'Filtrar' }), h(B, { variant: 'plain', icon: 'add', 'aria-label': 'Nuevo viaje' })))]),
        ctx('Teléfono', [h('p', { key: 't', className: 'web-h6', style: { margin: 0 } }, 'Total: $7.000'), h('div', { key: 'b', className: 'col' }, h(B, { variant: 'filled', role: 'primary', size: 'md' }, 'Pagar'), h(B, { variant: 'plain' }, 'Pagar después'))], 16)));` }),

  scene('button', 'usage', 'combinaciones recomendadas', 'button-combinaciones',
    'Combinaciones de botones. Recomendadas: filled con gray, con tinted, con tertiary y con plain. A evitar: dos filled juntas, tinted con tertiary sin una principal, y un botón destructivo solo, sin Cancelar.',
    { js: `var B = A.Button;
      function col(ok, title, rows) { return h('div', { className: 'col', style: { gap: 'var(--space-16)' } },
        h('p', { className: 'web-label-m', style: { margin: 0, display: 'flex', gap: '8px', alignItems: 'center', color: ok ? 'var(--text-01)' : 'var(--text-error)' } }, h(A.Icon, { name: ok ? 'checkmark' : 'close', size: 20 }), title),
        h('div', { className: 'pane col', style: { gap: 'var(--space-24)', width: '24rem' } }, rows.map(function (r, i) { return h('div', { key: i, className: 'col' }, h('span', { className: 'tok' }, r[0]), h('div', { className: 'row', style: { gap: '8px' } }, r[1])); }))); }
      mount(h('div', { className: 'row', style: { gap: 'var(--space-40)' } },
        col(true, 'Recomendadas', [['filled + gray', [h(B, { key: 1, variant: 'filled' }, 'Continuar'), h(B, { key: 2, variant: 'gray' }, 'Volver')]], ['filled + tinted', [h(B, { key: 1, variant: 'filled' }, 'Pagar'), h(B, { key: 2, variant: 'tinted' }, 'Guardar')]],
          ['filled + tertiary', [h(B, { key: 1, variant: 'filled' }, 'Pagar'), h(B, { key: 2, variant: 'tertiary' }, 'Pagar en caja')]], ['filled + plain', [h(B, { key: 1, variant: 'filled' }, 'Continuar'), h(B, { key: 2, variant: 'plain' }, 'Omitir')]]]),
        col(false, 'A evitar', [['filled + filled', [h(B, { key: 1, variant: 'filled' }, 'Pagar'), h(B, { key: 2, variant: 'filled' }, 'Guardar')]], ['tinted + tertiary, sin principal', [h(B, { key: 1, variant: 'tinted' }, 'Guardar'), h(B, { key: 2, variant: 'tertiary' }, 'Compartir')]],
          ['destructivo solo, sin «Cancelar»', [h(B, { key: 1, variant: 'filled', role: 'destructive' }, 'Eliminar tarjeta')]]])));` }),

  scene('button', 'usage', 'los seis estados de un botón', 'button-estados',
    'Los seis estados de un botón filled en tema oscuro y claro: reposo, puntero encima, presionado, foco de teclado, cargando y desactivado.',
    { js: `var S = [['Reposo', {}], ['Puntero encima', {}, 'hover'], ['Presionado', {}, 'active'], ['Foco', {}, 'focus'], ['Cargando', { loading: true, loadingLabel: 'Pagando' }], ['Desactivado', { disabled: true }]];
      mount(themes(['dark', 'light'], function () { return h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 10rem)', gap: 'var(--space-24) var(--space-16)' } },
        S.map(function (s) { return h('div', { key: s[0], className: 'col', 'data-st': s[2] || '' }, h('span', { className: 'cap web-label-s' }, s[0]), h('div', null, h(A.Button, Object.assign({ variant: 'filled' }, s[1]), 'Pagar'))); })); }));`,
      after: `all('[data-st]').forEach(function (c) { var s = c.getAttribute('data-st'); if (s) st(c.querySelector('.alma-btn'), s); });` }),

  scene('button', 'style', 'los siete estilos y los cinco destructivos', 'button-estilos',
    'Los siete estilos de Button (filled, tinted, gray, tertiary, plain, ghost e inverse) y los cinco destructivos, en reposo, puntero encima, presionado, foco y desactivado, en tema oscuro y claro.',
    { js: `var ROWS = [['filled'], ['tinted'], ['gray'], ['tertiary'], ['plain'], ['ghost', 'var(--brand-steel)'], ['inverse', 'var(--brand-ink)'], ['filled', null, 1], ['tinted', null, 1], ['gray', null, 1], ['plain', null, 1], ['tertiary', null, 1]];
      var COLS = [['Reposo'], ['Puntero', 'hover'], ['Presionado', 'active'], ['Foco', 'focus'], ['Desactivado', null, 1]];
      function grid() { return h('div', { style: { display: 'grid', gridTemplateColumns: '7.5rem repeat(5, 8.5rem)', gap: '10px 8px', alignItems: 'center' } },
        h('span'), COLS.map(function (c) { return h('span', { key: c[0], className: 'cap web-label-s' }, c[0]); }),
        ROWS.map(function (r, i) { return h(React.Fragment, { key: i }, h('span', { className: 'tok' }, (r[2] ? 'destructivo ' : '') + r[0]),
          COLS.map(function (c) { return h('div', { key: c[0], 'data-st': c[1] || '', style: { padding: '6px', borderRadius: '8px', background: r[1] || 'transparent' } },
            h(A.Button, { variant: r[0], role: r[2] ? 'destructive' : 'normal', disabled: !!c[2] }, r[2] ? 'Eliminar' : 'Guardar')); })); })); }
      mount(themes(['dark', 'light'], grid));`,
      after: `all('[data-st]').forEach(function (c) { var s = c.getAttribute('data-st'); if (s) st(c.querySelector('.alma-btn'), s); });` }),

  scene('button', 'style', 'anatomía acotada de los tres tamaños', 'button-medidas',
    'Medidas de Button en sus tres tamaños (44, 56 y 72 px de alto), con etiqueta sola, ícono antes, ícono después y solo ícono: relleno lateral, ícono de 16 px y separación de 16 px entre ícono y etiqueta.',
    { js: `var SZ = ['sm', 'md', 'lg'];
      mount(h('div', { style: { display: 'grid', gridTemplateColumns: '3rem repeat(4, auto)', gap: '64px 56px', alignItems: 'center', padding: '40px 120px 40px 8px' } },
        SZ.map(function (s) { return h(React.Fragment, { key: s }, h('span', { className: 'tok', style: { color: 'var(--text-01)' } }, s),
          h('div', { 'data-k': 'txt' }, h(A.Button, { variant: 'tinted', size: s }, 'Pagar')),
          h('div', { 'data-k': 'lead' }, h(A.Button, { variant: 'tinted', size: s, iconBefore: 'ticket' }, 'Pasajes')),
          h('div', { 'data-k': 'trail' }, h(A.Button, { variant: 'tinted', size: s, iconAfter: 'arrow--right' }, 'Seguir')),
          h('div', { 'data-k': 'icon' }, h(A.Button, { variant: 'gray', size: s, icon: 'add', 'aria-label': 'Agregar' }))); })));`,
      after: `all('[data-k="icon"] .alma-btn').forEach(function (b) { dimH(b, 'right'); });
        all('[data-k="txt"] .alma-btn').forEach(function (b) { var p = parseFloat(getComputedStyle(b).paddingLeft) + 2, r = box(b); band(r.x, r.y, p, r.h, sp(p - 2) + ' + 2 borde', r.x - 4, r.y + r.h + 6); });
        var l = $('[data-k="lead"] .alma-btn', 0), li = l.querySelector('.alma-ico'), lb = box(l), ib = box(li), tb = box(textOf(l));
        band(lb.x, lb.y, ib.x - lb.x, lb.h, px(ib.x - lb.x - 2) + ' + 2 borde', lb.x - 40, lb.y - 30);
        band(ib.x + ib.w, lb.y, tb.x - (ib.x + ib.w), lb.h, px(tb.x - (ib.x + ib.w)), ib.x + ib.w + 60, lb.y - 30);` }),
  // ---------- TextInput ----------
  scene('text-input', 'usage', 'anatomía numerada de un campo vacío', 'text-input-anatomia',
    'Anatomía de TextInput: un campo vacío, uno con texto y la etiqueta flotante, y uno de contraseña con ayuda y contador. Numerados: contenedor (1), etiqueta (2), texto escrito (3), botón del ojo (4), ayuda (5) y contador (6).',
    { js: `mount(h('div', { className: 'row', style: { gap: 'var(--space-64)', padding: '40px 40px 56px' } },
        h('div', { style: { width: '18rem' } }, h(A.TextInput, { label: 'Correo' })),
        h('div', { style: { width: '18rem' } }, h(A.TextInput, { label: 'Correo', defaultValue: 'camila@correo.cl' })),
        h('div', { style: { width: '18rem' } }, h(A.TextInput, { label: 'Contraseña', type: 'password', defaultValue: 'viaje2026', helper: 'Al menos 8 caracteres', maxLength: 20 }))));`,
      after: `var f = all('.alma-field');
        num(f[0].querySelector('.alma-field__box'), 1, 'left'); num(f[0].querySelector('.alma-field__label'), 2, 'top', { outline: false, d: 24 });
        num(f[1].querySelector('.alma-field__label'), 2, 'top', { outline: false }); num(f[1].querySelector('.alma-field__input'), 3, 'bottom', { outline: false, at: 8, d: 16 });
        num(f[2].querySelector('.alma-field__eye'), 4, 'right', { d: 20 }); var ft = f[2].querySelector('.alma-field__foot');
        num(ft.children[0], 5, 'bottom', { at: 0 }); num(ft.children[ft.children.length - 1], 6, 'bottom');` }),

  scene('text-input', 'usage', 'un campo con ayuda', 'text-input-ayuda-error',
    'Tres campos: uno con su ayuda, el mismo con un error que reemplaza la ayuda por el mensaje, y uno con contador cerca del límite (19/20).',
    { js: `mount(h('div', { className: 'row', style: { gap: 'var(--space-32)' } },
        h('div', { style: { width: '17rem' } }, h(A.TextInput, { label: 'Correo', defaultValue: 'camila@correo.cl', helper: 'Te enviaremos el pasaje aquí' })),
        h('div', { style: { width: '17rem' } }, h(A.TextInput, { label: 'Correo', defaultValue: 'camila@', error: 'Escribe un correo válido, como nombre@correo.cl' })),
        h('div', { style: { width: '17rem' } }, h(A.TextInput, { label: 'Nombre en la tarjeta', defaultValue: 'CAMILA ANDREA ROJAS', helper: 'Como aparece en la tarjeta', maxLength: 20 }))));` }),

  scene('text-input', 'usage', 'los seis estados en tema oscuro y claro', 'text-input-estados',
    'Los seis estados de TextInput en tema oscuro y claro: reposo, puntero encima, foco, con texto, error y desactivado.',
    { js: `var S = [['Reposo', {}], ['Puntero encima', {}, 'hover'], ['Foco', {}, 'focus-within'], ['Con texto', { defaultValue: 'camila@correo.cl' }], ['Error', { defaultValue: 'camila@', error: 'Escribe un correo válido' }], ['Desactivado', { disabled: true, defaultValue: 'camila@correo.cl' }]];
      mount(themes(['dark', 'light'], function () { return h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 15rem)', gap: 'var(--space-24) var(--space-24)' } },
        S.map(function (s) { return h('div', { key: s[0], className: 'col', 'data-st': s[2] || '' }, h('span', { className: 'cap web-label-s' }, s[0]), h(A.TextInput, Object.assign({ label: 'Correo', placeholder: 'nombre@correo.cl' }, s[1]))); })); }));`,
      after: `all('[data-st]').forEach(function (c) { var s = c.getAttribute('data-st'); if (s) st(c.querySelector('.alma-field__box'), s); });` }),

  scene('text-input', 'style', 'el campo en reposo, foco, con texto, error y desactivado, en los cuatro temas', 'text-input-temas',
    'TextInput en los cuatro temas de ALMA, en reposo, con foco, con texto, con error y desactivado.',
    { js: `var S = [[{}], [{}, 'focus-within'], [{ defaultValue: 'camila@correo.cl' }], [{ defaultValue: 'camila@', error: 'Escribe un correo válido' }], [{ disabled: true, defaultValue: 'camila@correo.cl' }]];
      mount(themes(['dark', 'light', 'dark-hc', 'light-hc'], function () { return h('div', { className: 'col', style: { width: '15rem', gap: 'var(--space-16)' } },
        S.map(function (s, i) { return h('div', { key: i, 'data-st': s[1] || '' }, h(A.TextInput, Object.assign({ label: 'Correo', placeholder: 'nombre@correo.cl' }, s[0]))); })); }));`,
      after: `all('[data-st]').forEach(function (c) { var s = c.getAttribute('data-st'); if (s) st(c.querySelector('.alma-field__box'), s); });` }),

  scene('text-input', 'style', 'anatomía acotada con las medidas', 'text-input-medidas',
    'Medidas de TextInput: alto del campo, relleno lateral, radio, borde, la etiqueta flotante sobre el borde y la separación con la ayuda y el contador.',
    { js: `mount(h('div', { style: { width: '22rem', padding: '48px 180px 64px 170px' } }, h(A.TextInput, { label: 'Correo', defaultValue: 'camila@correo.cl', helper: 'Te enviaremos el pasaje aquí', maxLength: 40 })));`,
      after: `var bx = $('.alma-field__box'), ft = $('.alma-field__foot'), lb = $('.alma-field__label');
        dimH(bx, 'right'); padL(bx); rad(bx, box(bx).x + box(bx).w - 80, box(bx).y - 30); gapY(bx, ft, box(ft).x + box(ft).w + 16, box(ft).y - 8);
        var L = box(lb); add('chip', L.x - 150, L.y - 26, null, null, 'etiqueta flotante');` }),

  // ---------- Textarea ----------
  scene('textarea', 'usage', 'anatomía numerada de un campo vacío', 'textarea-anatomia',
    'Anatomía de Textarea: un campo vacío con texto de ejemplo y otro con texto, ayuda y contador. Numerados: contenedor (1), etiqueta flotante (2), área de texto (3) y ayuda con contador (4).',
    { js: `mount(h('div', { className: 'row', style: { gap: 'var(--space-64)', padding: '40px 40px 56px' } },
        h('div', { style: { width: '20rem' } }, h(A.Textarea, { label: 'Comentario', placeholder: 'Cuéntanos qué pasó con tu viaje' })),
        h('div', { style: { width: '20rem' } }, h(A.Textarea, { label: 'Comentario', defaultValue: 'El bus salió 20 minutos tarde desde el Terminal Alameda y no avisaron por altavoz.', helper: 'Lo lee el equipo de servicio', maxLength: 300 }))));`,
      after: `var f = all('.alma-field');
        num(f[0].querySelector('.alma-field__box'), 1, 'left'); num(f[0].querySelector('.alma-field__label'), 2, 'top', { outline: false, d: 4 });
        num(f[1].querySelector('.alma-field__textarea, textarea'), 3, 'right', { d: 24 }); num(f[1].querySelector('.alma-field__foot'), 4, 'bottom');` }),

  scene('textarea', 'usage', 'los estados en tema oscuro y claro', 'textarea-estados',
    'Los estados de Textarea en tema oscuro y claro: reposo, foco, con texto, error, desactivado y solo lectura.',
    { js: `var S = [['Reposo', {}], ['Foco', {}, 'focus-within'], ['Con texto', { defaultValue: 'Viajo con una silla de ruedas plegable.' }], ['Error', { defaultValue: 'x', error: 'Escribe al menos 10 caracteres' }], ['Desactivado', { disabled: true, defaultValue: 'Viajo con una silla de ruedas plegable.' }], ['Solo lectura', { readOnly: true, defaultValue: 'Viajo con una silla de ruedas plegable.' }]];
      mount(themes(['dark', 'light'], function () { return h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 15rem)', gap: 'var(--space-24)' } },
        S.map(function (s) { return h('div', { key: s[0], className: 'col', 'data-st': s[2] || '' }, h('span', { className: 'cap web-label-s' }, s[0]), h(A.Textarea, Object.assign({ label: 'Necesidades especiales', rows: 2, placeholder: 'Opcional' }, s[1]))); })); }));`,
      after: `all('[data-st]').forEach(function (c) { var s = c.getAttribute('data-st'); if (s) st(c.querySelector('.alma-field__box'), s); });` }),

  // ---------- Checkbox ----------
  scene('checkbox', 'usage', 'anatomía numerada de una casilla sola', 'checkbox-anatomia',
    'Anatomía de Checkbox: una casilla sola y un grupo con una casilla madre en estado mixto y dos hijas. Numerados: casilla (1), marca (2), etiqueta (3) y título del grupo (4).',
    { js: `var C = A.Checkbox;
      mount(h('div', { className: 'row', style: { gap: 'var(--space-80)', padding: '48px 56px' } },
        h('div', null, h(C, { label: 'Recordar en este dispositivo', defaultChecked: true })),
        h('div', { className: 'col' }, h('p', { className: 'web-label-m grp', style: { margin: 0 } }, 'Medios de pago'),
          h(C, { label: 'Todos los medios de pago', checked: true, indeterminate: true }),
          h('div', { style: { paddingLeft: 28, display: 'grid' } }, h(C, { label: 'Tarjeta C.WalletPay', checked: true }), h(C, { label: 'Transferencia', checked: false })))));`,
      after: `var bx = all('.alma-check__box');
        num(bx[0], 1, 'left'); num(bx[0].querySelector('svg') || bx[0], 2, 'top', { outline: false }); num(textOf(all('.alma-check')[0]), 3, 'bottom');
        num($('.grp'), 4, 'left'); num(bx[1].querySelector('svg') || bx[1], 2, 'left', { outline: false });` }),

  scene('checkbox', 'usage', 'los cinco estados en tema oscuro y claro', 'checkbox-estados',
    'Los cinco estados de Checkbox en tema oscuro y claro: sin marcar, marcada, mixta, foco y desactivada.',
    { js: `var S = [['Sin marcar', {}], ['Marcada', { defaultChecked: true }], ['Mixta', { checked: true, indeterminate: true }], ['Foco', {}, 'focus'], ['Desactivada', { disabled: true }]];
      mount(themes(['dark', 'light'], function () { return h('div', { className: 'col', style: { gap: 'var(--space-8)', width: '16rem' } },
        S.map(function (s) { return h('div', { key: s[0], 'data-st': s[2] || '' }, h(A.Checkbox, Object.assign({ label: s[0] }, s[1]))); })); }));`,
      after: `all('[data-st]').forEach(function (c) { var s = c.getAttribute('data-st'); if (s) st(c.querySelector('.alma-check__input'), s); });` }),

  scene('checkbox', 'style', 'anatomía acotada con las medidas', 'checkbox-medidas',
    'Medidas de Checkbox: casilla de 20 px con radio de 2 px, separación entre casilla y etiqueta, y el alto de la fila, que llega al área táctil de 44 px.',
    { js: `mount(h('div', { style: { padding: '56px 200px 64px 160px' } }, h(A.Checkbox, { label: 'Recordar en este dispositivo', defaultChecked: true })));`,
      after: `var c = $('.alma-check'), b = $('.alma-check__box'); dimH(c, 'right'); dimW(b, 'top'); dimH(b, 'left', null, { d: 30 }); gapX(b, textOf(c)); rad(b, box(b).x - 130, box(b).y + box(b).h + 30);` }),

  // ---------- RadioGroup ----------
  scene('radio-group', 'usage', 'anatomía numerada de un grupo de 3 opciones', 'radio-group-anatomia',
    'Anatomía de RadioGroup con tres opciones y ayuda. Numerados: título del grupo (1), botón de opción (2), etiqueta (3) y ayuda (4).',
    { js: `mount(h('div', { style: { padding: '40px 64px', width: '20rem' } }, h(A.RadioGroup, { label: 'Tipo de asiento', options: ['Semicama', 'Salón cama', 'Premium'], defaultValue: 'Salón cama', help: 'El precio cambia según el asiento' })));`,
      after: `num($('.alma-radios__legend'), 1, 'left'); var d = all('.alma-radio__dot'); num(d[1], 2, 'left'); num(textOf(d[1].parentNode), 3, 'right'); num($('.alma-radios__help'), 4, 'left');` }),

  scene('radio-group', 'usage', 'los estados en tema oscuro y claro', 'radio-group-estados',
    'Los estados de RadioGroup en tema oscuro y claro: sin elegir, elegida, con foco y un grupo desactivado.',
    { js: `mount(themes(['dark', 'light'], function () { return h('div', { className: 'row', style: { gap: 'var(--space-40)' } },
        h('div', { 'data-f': 1 }, h(A.RadioGroup, { label: 'Tipo de asiento', options: ['Semicama', 'Salón cama', 'Premium'], defaultValue: 'Salón cama' })),
        h(A.RadioGroup, { label: 'Desactivado', options: ['Semicama', 'Salón cama'], defaultValue: 'Semicama', disabled: true })); }));`,
      after: `all('[data-f]').forEach(function (g) { st(g.querySelectorAll('input')[2], 'focus'); });` }),

  // ---------- Switch ----------
  scene('switch', 'usage', 'anatomía numerada de una fila', 'switch-anatomia',
    'Anatomía de Switch: una fila con descripción, encendida y apagada. Numerados: etiqueta (1), descripción (2), pista (3) y perilla (4).',
    { js: `mount(h('div', { className: 'col', style: { gap: 'var(--space-40)', padding: '40px 64px', width: '26rem' } },
        h(A.Switch, { label: 'Recarga automática', description: 'Cargamos $20.000 cuando tu saldo baje de $5.000', defaultChecked: true }),
        h(A.Switch, { label: 'Recarga automática', description: 'Cargamos $20.000 cuando tu saldo baje de $5.000' })));`,
      after: `var r = all('.alma-switch-row'); num(r[0].querySelector('.alma-switch-row__label'), 1, 'top', { at: 0 }); num(r[0].querySelector('.alma-switch-row__desc'), 2, 'bottom', { at: 0 });
        num(r[0].querySelector('.alma-switch'), 3, 'right'); num(r[1].querySelector('.alma-switch__thumb'), 4, 'bottom', { d: 14 });` }),

  scene('switch', 'usage', 'encendido, apagado, foco y desactivado', 'switch-estados',
    'Los estados de Switch en tema oscuro y claro: encendido, apagado, con foco y desactivado.',
    { js: `var S = [['Encendido', { defaultChecked: true }], ['Apagado', {}], ['Foco', { defaultChecked: true }, 'focus'], ['Desactivado', { disabled: true }]];
      mount(themes(['dark', 'light'], function () { return h('div', { className: 'col', style: { gap: 'var(--space-16)', width: '16rem' } },
        S.map(function (s) { return h('div', { key: s[0], 'data-st': s[2] || '' }, h(A.Switch, Object.assign({ label: s[0] }, s[1]))); })); }));`,
      after: `all('[data-st]').forEach(function (c) { var s = c.getAttribute('data-st'); if (s) st(c.querySelector('.alma-switch'), s); });` }),

  scene('switch', 'style', 'anatomía acotada con las medidas', 'switch-medidas',
    'Medidas de Switch: pista de 52 × 32 px con borde, perilla de 24 px y separación con la etiqueta.',
    { js: `mount(h('div', { style: { padding: '64px 200px 72px 64px', width: '20rem' } }, h(A.Switch, { label: 'Notificaciones de pago', defaultChecked: true })));`,
      after: `var sw = $('.alma-switch'), t = $('.alma-switch__thumb'); dimW(sw, 'bottom'); dimH(sw, 'right'); dimW(t, 'top', null, { d: 30 });` }),

  // ---------- TimePicker ----------
  scene('time-picker', 'usage', 'el campo con una hora válida y con error', 'time-picker-estados',
    'TimePicker con una hora válida (08:30) y con un error que explica el formato esperado.',
    { js: `mount(h('div', { className: 'row', style: { gap: 'var(--space-32)' } },
        h('div', { style: { width: '14rem' } }, h(A.TimePicker, { label: 'Hora de salida', defaultValue: '08:30', helper: 'Formato de 24 horas' })),
        h('div', { style: { width: '14rem' } }, h(A.TimePicker, { label: 'Hora de salida', defaultValue: '25:10', error: 'Escribe una hora entre 00:00 y 23:59' }))));` }),

  // ---------- DatePicker ----------
  scene('date-picker', 'usage', 'el campo con el calendario abierto', 'date-picker-abierto',
    'DatePicker con el calendario abierto en marzo de 2026: hoy (18) marcado, el 25 elegido y los días anteriores a hoy fuera de rango.',
    { js: `var _D = window.__RealDate || (window.__RealDate = Date); window.Date = function (a, b, c, d, e, f, g) { return arguments.length ? new _D(a, b === undefined ? 0 : b, c === undefined ? 1 : c, d || 0, e || 0, f || 0, g || 0) : new _D(2026, 2, 18, 10); };
      Date.prototype = _D.prototype; Date.now = function () { return new _D(2026, 2, 18, 10).getTime(); }; Date.UTC = _D.UTC; Date.parse = _D.parse;
      mount(h('div', { style: { width: '20rem', height: '30rem' } }, h(A.DatePicker, { label: 'Fecha de ida', defaultValue: new Date(2026, 2, 25), min: new Date(2026, 2, 18), max: new Date(2026, 5, 18) })));`,
      after: `$('.alma-date button').click(); await sleep(250);` }),

  scene('date-picker', 'style', 'anatomía acotada del calendario', 'date-picker-medidas',
    'Medidas del calendario de DatePicker: ancho del panel, relleno, alto de cada día y radio.',
    { js: `var _D = window.__RealDate || (window.__RealDate = Date); window.Date = function (a, b, c, d, e, f, g) { return arguments.length ? new _D(a, b === undefined ? 0 : b, c === undefined ? 1 : c, d || 0, e || 0, f || 0, g || 0) : new _D(2026, 2, 18, 10); };
      Date.prototype = _D.prototype; Date.now = function () { return new _D(2026, 2, 18, 10).getTime(); }; Date.UTC = _D.UTC; Date.parse = _D.parse;
      mount(h('div', { style: { width: '22rem', height: '32rem', padding: '0 170px 0 150px' } }, h(A.DatePicker, { label: 'Fecha de ida', defaultValue: new Date(2026, 2, 25), min: new Date(2026, 2, 18) })));`,
      after: `$('.alma-date button').click(); await sleep(250); var c = $('.alma-cal'); dimW(c, 'bottom'); padL(c); rad(c, box(c).x + box(c).w + 16, box(c).y); var d = $('.alma-cal__day', 10); dimH(d, 'right', null, { d: box(c).x + box(c).w - box(d).x - box(d).w + 16 });` }),

  // ---------- Slider ----------
  scene('slider', 'usage', 'un slider de precio máximo', 'slider-precio',
    'Un Slider de precio máximo con su campo numérico, en tema oscuro y claro.',
    { js: `mount(themes(['dark', 'light'], function () { return h('div', { style: { width: '24rem' } }, h(A.Slider, { label: 'Precio máximo', min: 2000, max: 30000, step: 500, defaultValue: 12000, showField: true, format: function (v) { return '$' + v.toLocaleString('es-CL'); } })); }));` }),

  scene('slider', 'style', 'anatomía acotada', 'slider-medidas',
    'Medidas de Slider: pista de 4 px, perilla de 24 px, alto de la fila y separación con el campo.',
    { js: `mount(h('div', { style: { width: '28rem', padding: '56px 160px 64px 40px' } }, h(A.Slider, { label: 'Precio máximo', min: 2000, max: 30000, step: 500, defaultValue: 12000, showField: true, format: function (v) { return '$' + v.toLocaleString('es-CL'); } })));`,
      after: `var row = $('.alma-slider__row'), inp = $('.alma-slider__input'), fld = $('.alma-slider__field'); dimH(row, 'right'); gapX(inp, fld); dimW(fld, 'top');
        var B = box(inp); add('chip', B.x, B.y + B.h + 10, null, null, 'pista: 4 px · perilla: 24 px');` }),

  // ---------- Stepper ----------
  scene('stepper', 'usage', 'el contador de pasajeros', 'stepper-pasajeros',
    'Stepper para contar pasajeros, con el ícono ticket: en 1, con el botón de restar desactivado, y en 3.',
    { js: `mount(themes(['dark'], function () { return h('div', { className: 'row', style: { gap: 'var(--space-40)' } },
        h(A.Stepper, { label: 'Pasajeros', icon: 'ticket', defaultValue: 1, min: 1, max: 6 }), h(A.Stepper, { label: 'Pasajeros', icon: 'ticket', defaultValue: 3, min: 1, max: 6 })); }, { noLabel: true }));` }),

  scene('stepper', 'style', 'anatomía acotada', 'stepper-medidas',
    'Medidas de Stepper: alto de 44 px de botones y valor, ancho de cada parte y radio.',
    { js: `mount(h('div', { style: { padding: '56px 180px 72px 56px' } }, h(A.Stepper, { label: 'Pasajeros', icon: 'ticket', defaultValue: 2, min: 1, max: 6 })));`,
      after: `var st1 = $('.alma-step'), b = all('.alma-step__btn'), v = $('.alma-step__value'); dimH(st1, 'right'); dimW(b[0], 'bottom'); dimW(v, 'top'); rad(b[1], box(b[1]).x + box(b[1]).w + 12, box(b[1]).y + box(b[1]).h + 10);` }),

  // ---------- SegmentedControl ----------
  scene('segmented-control', 'usage', 'la píldora de pasajes', 'segmented-control-ida',
    'SegmentedControl de tipo de pasaje con la opción «Ida» elegida, en tema oscuro y claro.',
    { js: `mount(themes(['dark', 'light'], function () { return h(A.SegmentedControl, { label: 'Tipo de viaje', options: ['Ida', 'Ida y regreso', 'Multidestino'], defaultValue: 'Ida' }); }));` }),

  scene('segmented-control', 'style', 'anatomía acotada', 'segmented-control-medidas',
    'Medidas de SegmentedControl: relleno del contenedor, alto de cada opción, separación entre opciones y radio.',
    { js: `mount(h('div', { style: { padding: '64px 200px 72px 150px' } }, h(A.SegmentedControl, { label: 'Tipo de viaje', options: ['Ida', 'Ida y regreso'], defaultValue: 'Ida' })));`,
      after: `var sg = $('.alma-seg'), o = all('.alma-seg__opt'); padL(sg); dimH(o[1], 'right', null, { d: 30 }); gapX(o[0], o[1], null, box(sg).y - 30); rad(sg, box(sg).x, box(sg).y + box(sg).h + 12);` }),

  // ---------- SearchField ----------
  scene('search-field', 'usage', 'anatomía numerada con dos tokens', 'search-field-anatomia',
    'Anatomía de SearchField con dos tokens, las sugerencias abiertas y el alcance. Numerados: lupa (1), campo (2), tokens (3), borrar (4), sugerencias (5) y alcance (6).',
    { js: `mount(h('div', { className: 'row', style: { gap: 'var(--space-80)', padding: '40px 64px', height: '22rem' } },
        h('div', { style: { width: '28rem' }, 'data-s': 'a' }, h(A.SearchField, { placeholder: 'Buscar ciudades o terminales', defaultValue: 'Vi', suggestionsTitle: 'Búsquedas recientes',
          suggestions: [{ label: 'Viña del Mar', icon: 'time' }, { label: 'Villa Alemana', icon: 'time' }, { label: 'Terminal Alameda', icon: 'time' }], tokens: ['Semicama', 'Marzo'] })),
        h('div', { style: { width: '24rem' } }, h(A.SearchField, { placeholder: 'Buscar en tu cuenta', scopes: ['Todo', 'Viajes', 'Pagos'], defaultScope: 'Viajes' }))));`,
      after: `var inp = $('[data-s="a"] .alma-search__input'); inp.focus(); inp.dispatchEvent(new Event('focus', { bubbles: true })); await sleep(200);
        num($('.alma-search__icon'), 1, 'left', { d: 16 }); num(inp, 2, 'top', { outline: false }); num($('.alma-search__token'), 3, 'top', { outline: false });
        if ($('.alma-search__clear')) num($('.alma-search__clear'), 4, 'right', { d: 16 }); if ($('.alma-search__menu')) num($('.alma-search__menu'), 5, 'right');
        if ($('.alma-seg')) num($('.alma-seg'), 6, 'bottom');` }),

  scene('search-field', 'style', 'anatomía acotada', 'search-field-medidas',
    'Medidas de SearchField: alto del campo, relleno, radio, lupa de 16 px y su separación de 16 px con el texto, y alto de los tokens.',
    { js: `mount(h('div', { style: { width: '26rem', padding: '56px 180px 64px 260px' } }, h(A.SearchField, { placeholder: 'Buscar ciudades o terminales', tokens: ['Semicama'] })));`,
      after: `var b = $('.alma-search__box'); dimH(b, 'right'); padL(b); rad(b, box(b).x + box(b).w - 90, box(b).y - 30); dimH($('.alma-search__token'), 'left', null, { d: box($('.alma-search__token')).x - box(b).x + 150 }); var ic = $('.alma-search__icon'); dimW(ic, 'top', null, { d: 20 }); gapX(ic, $('.alma-search__token'), null, box(b).y + box(b).h + 12);` }),

  // ---------- Combobox ----------
  scene('combobox', 'usage', 'anatomía numerada del modo simple', 'combobox-anatomia',
    'Anatomía de Combobox: el modo simple con la lista abierta y el modo múltiple con tres etiquetas. Numerados: campo (1), etiquetas (2), texto de búsqueda (3), botón de la lista (4), lista (5), sin resultados (6) y ayuda (7).',
    { js: `var cities = ['Santiago', 'Valparaíso', 'Viña del Mar', 'Villa Alemana', 'Rancagua', 'Talca', 'Concepción'];
      mount(h('div', { className: 'row', style: { gap: 'var(--space-64)', padding: '40px 64px', height: '24rem', alignItems: 'flex-start' } },
        h('div', { style: { width: '18rem' }, 'data-c': 'a' }, h(A.Combobox, { label: 'Destino', options: cities })),
        h('div', { className: 'col', style: { gap: 'var(--space-48)' } },
          h('div', { style: { width: '22rem' } }, h(A.Combobox, { label: 'Paradas de interés', multiple: true, options: cities, defaultValue: ['Rancagua', 'Talca', 'Concepción'], helper: 'Elige hasta 5 paradas' })),
          h('div', { style: { width: '22rem' }, 'data-c': 'c' }, h(A.Combobox, { label: 'Destino', options: cities })))));`,
      after: `function type(root, v) { var i = root.querySelector('input'); i.focus(); var set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; set.call(i, v); i.dispatchEvent(new Event('input', { bubbles: true })); }
        var a = $('[data-c="a"]'); type(a, 'Vi'); await sleep(200); var c = $('[data-c="c"]'); type(c, 'Arica'); await sleep(200);
        num(a.querySelector('.alma-field__box'), 1, 'left'); num(a.querySelector('input'), 3, 'top', { outline: false, at: 16 }); num(a.querySelector('.alma-combo__toggle'), 4, 'right', { d: 6 });
        if (a.querySelector('.alma-menu')) num(a.querySelector('.alma-menu'), 5, 'left'); 
        num($('.alma-tag'), 2, 'top', { outline: false }); num($('.alma-field__foot'), 7, 'right'); if (c.querySelector('.alma-combo__empty')) num(c.querySelector('.alma-combo__empty'), 6, 'right');` }),

  scene('combobox', 'usage', 'los estados de la lista', 'combobox-lista',
    'Estados de la lista de Combobox en tema oscuro y claro: abierta, filtrada, con una opción activa por teclado y sin resultados.',
    { js: `var cities = ['Santiago', 'Valparaíso', 'Viña del Mar', 'Villa Alemana', 'Rancagua'];
      var S = [['Abierta', ''], ['Filtrada', 'Vi'], ['Opción activa', 'Vi', 1], ['Sin resultados', 'Arica']];
      mount(themes(['dark', 'light'], function () { return h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 16rem)', gap: '16px 32px' } }, S.map(function (s) {
        return h('div', { key: s[0], className: 'col', 'data-q': s[1], 'data-k': s[2] ? 1 : 0, style: { height: '23rem', width: '16rem', minWidth: 0 } }, h('span', { className: 'cap web-label-s' }, s[0]), h('div', { style: { display: 'block', width: '16rem' } }, h(A.Combobox, { label: 'Destino', options: cities }))); })); }));`,
      after: `var set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        for (var c of all('[data-q]')) { var i = c.querySelector('input'); i.focus(); if (c.dataset.q) { set.call(i, c.dataset.q); i.dispatchEvent(new Event('input', { bubbles: true })); } else c.querySelector('.alma-combo__toggle').click();
          await sleep(150); if (c.dataset.k === '1') { i.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })); await sleep(100); } }` }),

  scene('combobox', 'style', 'anatomía acotada del campo múltiple', 'combobox-medidas',
    'Medidas del Combobox múltiple con la lista abierta: alto del campo, separación entre etiquetas, separación entre campo y lista, relleno y alto de las opciones.',
    { js: `var cities = ['Santiago', 'Valparaíso', 'Viña del Mar', 'Rancagua', 'Talca'];
      mount(h('div', { style: { width: '24rem', height: '26rem', padding: '48px 180px 0 150px' } }, h(A.Combobox, { label: 'Paradas de interés', multiple: true, options: cities, defaultValue: ['Rancagua', 'Talca'] })));`,
      after: `$('.alma-combo__toggle').click(); await sleep(200); var bx = $('.alma-field__box'), m = $('.alma-menu'), t = all('.alma-tag'), it = all('.alma-menu__item');
        dimH(bx, 'right'); if (t.length > 1) gapX(t[0], t[1], null, box(bx).y - 30); if (m) { gapY(bx, m, box(m).x + box(m).w + 16, box(bx).y + box(bx).h); padL(m, box(m).x - 140, box(it[2]).y); dimH(it[0], 'left', null, { d: box(it[0]).x - box(m).x + 16 }); }` }),
  // ---------- Tabs ----------
  scene('tabs', 'usage', 'anatomía numerada con tres pestañas', 'tabs-anatomia',
    'Anatomía de Tabs con tres pestañas y la primera activa. Numerados: lista de pestañas (1), pestaña (2), indicador de la pestaña activa (3) y panel (4).',
    { js: `mount(h('div', { style: { width: '34rem', padding: '48px 64px 40px' } }, h(A.Tabs, { label: 'Detalle del viaje', tabs: ['Resumen', 'Asientos', 'Pagos'], defaultValue: 'Resumen' },
        h('p', { className: 'web-body-m', style: { margin: 0 } }, 'Santiago → Viña del Mar, martes 31 de marzo a las 08:30. Semicama, asiento 14.'))));`,
      after: `var t = all('.alma-tabs__tab'), a = t[0], ab = a.getBoundingClientRect();
        num($('.alma-tabs__list'), 1, 'left'); num(t[1], 2, 'top'); num({ getBoundingClientRect: function () { return { left: ab.left, top: ab.bottom - 3, width: ab.width, height: 3, right: ab.right, bottom: ab.bottom }; } }, 3, 'bottom', { outline: false, d: 8 });
        num($('.alma-tabs__panel'), 4, 'left');` }),

  scene('tabs', 'style', 'anatomía acotada', 'tabs-medidas',
    'Medidas de Tabs: alto de la pestaña, relleno lateral, separación entre pestañas, indicador de 2 px y separación con el panel.',
    { js: `mount(h('div', { style: { width: '32rem', padding: '56px 170px 56px 150px' } }, h(A.Tabs, { label: 'Detalle del viaje', tabs: ['Resumen', 'Asientos', 'Pagos'], defaultValue: 'Resumen' }, h('p', { className: 'web-body-m', style: { margin: 0 } }, 'Contenido del panel.'))));`,
      after: `var t = all('.alma-tabs__tab'); dimH(t[2], 'right', null, { d: 40 }); padL(t[0]); if (box(t[1]).x - (box(t[0]).x + box(t[0]).w) > 0) gapX(t[0], t[1], null, box(t[0]).y - 30);
        var ab = box(t[0]); add('chip', ab.x + ab.w + 12, ab.y + ab.h + 8, null, null, 'indicador: 2 px'); gapY($('.alma-tabs__list'), $('.alma-tabs__panel'), box($('.alma-tabs__list')).x + box($('.alma-tabs__list')).w + 16);` }),

  // ---------- Sidebar ----------
  scene('sidebar', 'usage', 'anatomía numerada con tres grupos', 'sidebar-anatomia',
    'Anatomía de Sidebar con tres grupos, uno plegado. Numerados: botón mostrar u ocultar (1), panel (2), título de grupo (3), destino (4), destino actual (5) y contador (6).',
    { js: `mount(h('div', { style: { padding: '24px 64px 24px 64px' } }, h(A.Sidebar, { label: 'Secciones', defaultValue: 'viajes', groups: [
        { title: 'Viajes', items: [{ value: 'viajes', label: 'Mis viajes', icon: 'ticket' }, { value: 'buscar', label: 'Buscar pasajes', icon: 'search' }] },
        { title: 'Billetera', items: [{ value: 'saldo', label: 'Saldo y recargas', icon: 'wallet', badge: 2 }, { value: 'mov', label: 'Movimientos', icon: 'receipt' }] },
        { title: 'Cuenta', items: [{ value: 'perfil', label: 'Perfil', icon: 'user' }, { value: 'ajustes', label: 'Ajustes', icon: 'settings' }] }] })));`,
      after: `var heads = all('.alma-side__head'); heads[2].click(); await sleep(250);
        var wrapBtn = $('.alma-side-wrap > button, .alma-side-wrap .alma-btn'); if (wrapBtn) num(wrapBtn, 1, 'left');
        num($('.alma-side'), 2, 'right', { at: 0 }); num(heads[0], 3, 'left'); var it = all('.alma-side__item'); num(it[1], 4, 'right', { outline: false, d: 24 });
        num($('.alma-side__item.is-on'), 5, 'left'); if ($('.alma-side__count')) num($('.alma-side__count'), 6, 'right', { d: 40 });` }),

  scene('sidebar', 'style', 'anatomía acotada', 'sidebar-medidas',
    'Medidas de Sidebar: ancho de 280 px, relleno del panel, alto de los destinos, separación entre grupos y entre destinos, y radio.',
    { js: `mount(h('div', { style: { padding: '48px 180px 64px 150px' } }, h(A.Sidebar, { label: 'Secciones', defaultValue: 'viajes', groups: [
        { title: 'Viajes', items: [{ value: 'viajes', label: 'Mis viajes', icon: 'ticket' }, { value: 'buscar', label: 'Buscar pasajes', icon: 'search' }] },
        { title: 'Billetera', items: [{ value: 'saldo', label: 'Saldo y recargas', icon: 'wallet' }] }] })));`,
      after: `var sd = $('.alma-side'), it = all('.alma-side__item'), g = all('.alma-side__group'); dimW(sd, 'bottom'); padL(sd); dimH(it[0], 'right', null, { d: box(sd).x + box(sd).w - box(it[0]).x - box(it[0]).w + 16 });
        gapY(it[0].parentNode, it[1].parentNode, box(sd).x - 150, box(it[1]).y - 10); if (g[1]) gapY(g[0], g[1], box(sd).x + box(sd).w + 16, box(g[1]).y - 16); rad(sd, box(sd).x + box(sd).w - 90, box(sd).y - 30);` }),

  // ---------- TabBar ----------
  scene('tab-bar', 'usage', 'anatomía numerada con cuatro ítems', 'tab-bar-anatomia',
    'Anatomía de TabBar con cuatro ítems y una insignia, en el teléfono (ícono sobre la etiqueta) y en tablet (ícono y etiqueta en fila). Numerados: barra (1), ítem (2), ítem actual (3) e insignia (4).',
    { js: `var tb = "mount(h('div', { style: { position: 'absolute', left: 0, right: 0, bottom: 0 } }, h(A.TabBar, { label: 'Secciones', defaultValue: 'viajes', items: [{ value: 'inicio', label: 'Inicio', icon: 'home' }, { value: 'viajes', label: 'Viajes', icon: 'ticket' }, { value: 'billetera', label: 'Billetera', icon: 'wallet', badge: 3 }, { value: 'cuenta', label: 'Cuenta', icon: 'user' }] })));";
      var marks = "var it = all('.alma-tabbar__item'); num($('.alma-tabbar'), 1, 'top', { at: 16, d: 30 }); num(it[0], 2, 'top'); num($('.alma-tabbar__item.is-on') || it[1], 3, 'top'); num($('.alma-badge'), 4, 'top', { d: 10 });";
      mount(h('div', { className: 'row', style: { alignItems: 'flex-end', gap: 'var(--space-40)' } }, device({ label: 'Teléfono', w: 390, h: 200, js: tb, after: marks }), device({ label: 'Tablet', w: 820, h: 200, js: tb, after: marks })));` }),

  scene('tab-bar', 'style', 'anatomía acotada en el teléfono', 'tab-bar-medidas',
    'Medidas de TabBar en el teléfono: alto de la barra, alto y ancho de cada ítem, separación entre ícono y etiqueta, e insignia de 18 px.',
    { js: `var tb = "mount(h('div', { style: { position: 'absolute', left: 0, right: 0, bottom: 0 } }, h(A.TabBar, { label: 'Secciones', defaultValue: 'viajes', items: [{ value: 'inicio', label: 'Inicio', icon: 'home' }, { value: 'viajes', label: 'Viajes', icon: 'ticket' }, { value: 'billetera', label: 'Billetera', icon: 'wallet', badge: 3 }, { value: 'cuenta', label: 'Cuenta', icon: 'user' }] })));";
      var dims = "var bar = $('.alma-tabbar'), it = all('.alma-tabbar__item'); dimH(bar, 'right', null, { d: -24 }); var cs = all('.chip'), hc = cs[cs.length - 1]; hc.style.left = (box(bar).x + box(bar).w - 24 - hc.offsetWidth - 8) + 'px'; hc.style.top = (box(bar).y - 34) + 'px'; dimW(it[1], 'top'); dimH($('.alma-badge'), 'right', null, { d: 4 });";
      mount(device({ w: 420, h: 190, js: tb, after: dims, scale: 1.3 }));` }),

  // ---------- Toolbar ----------
  scene('toolbar', 'usage', 'anatomía numerada en escritorio y en el teléfono', 'toolbar-anatomia',
    'Anatomía de Toolbar en escritorio y en el teléfono, donde el buscador baja a su propia fila. Numerados: volver (1), título (2), buscador (3), acciones (4) y más (5).',
    { js: `var tb = "mount(h(A.Toolbar, { title: 'Mis viajes', onBack: function () {}, backLabel: 'Volver', search: h(A.SearchField, { placeholder: 'Buscar viajes' }), actions: [{ label: 'Filtrar', icon: 'filter' }, { label: 'Nuevo viaje', icon: 'add' }], moreActions: ['Exportar', 'Ayuda'] }));";
      var marks = "var lead = $('.alma-toolbar__lead .alma-btn'); if (lead) num(lead, 1, 'top'); num($('.alma-toolbar__title'), 2, 'top'); num($('.alma-toolbar__search'), 3, 'bottom'); var tr = all('.alma-toolbar__trail .alma-btn'); num(tr[0], 4, 'top'); num(tr[tr.length - 1], 5, 'top');";
      mount(h('div', { className: 'col', style: { gap: 'var(--space-32)' } }, device({ label: 'Escritorio', w: 1100, h: 200, js: tb, after: marks }), device({ label: 'Teléfono', w: 390, h: 260, js: tb, after: marks })));` }),

  scene('toolbar', 'style', 'anatomía acotada', 'toolbar-medidas',
    'Medidas de Toolbar: alto de la barra, relleno lateral, separación entre grupos y botones de acción de 44 px.',
    { js: `mount(h('div', { style: { width: '52rem', padding: '56px 150px 64px 150px' } }, h(A.Toolbar, { title: 'Mis viajes', onBack: function () {}, actions: [{ label: 'Filtrar', icon: 'filter' }, { label: 'Nuevo viaje', icon: 'add' }], moreActions: ['Exportar'] })));`,
      after: `var t = $('.alma-toolbar'), b = all('.alma-toolbar__trail .alma-btn'); dimH(t, 'right'); padL(t); dimW(b[0], 'bottom'); if (b[1]) gapX(b[0], b[1], null, box(b[0]).y - 30);` }),

  // ---------- Breadcrumb ----------
  scene('breadcrumb', 'usage', 'una ruta de 3 niveles', 'breadcrumb-rutas',
    'Dos rutas de Breadcrumb: una de tres niveles y otra de seis, abreviada con «…», con el menú de los niveles ocultos abierto.',
    { js: `mount(h('div', { className: 'col', style: { gap: 'var(--space-40)', width: '44rem', height: '15rem', padding: '24px 24px' } },
        h(A.Breadcrumb, { items: [{ label: 'Inicio', href: '#' }, { label: 'Mis viajes', href: '#' }, { label: 'Pasaje 4F2K-81' }] }),
        h('div', { 'data-b': 1 }, h(A.Breadcrumb, { maxItems: 4, items: [{ label: 'Inicio', href: '#' }, { label: 'Cuenta', href: '#' }, { label: 'Billetera', href: '#' }, { label: 'Tarjetas', href: '#' }, { label: 'Tarjeta terminada en 4821', href: '#' }, { label: 'Movimientos' }] }))));`,
      after: `var b = $('[data-b] button'); if (b) { b.click(); await sleep(250); }` }),

  scene('breadcrumb', 'style', 'anatomía acotada', 'breadcrumb-medidas',
    'Medidas de Breadcrumb: alto del área táctil de cada enlace, separación con el separador y tamaño del separador.',
    { js: `mount(h('div', { style: { padding: '56px 170px 64px 56px' } }, h(A.Breadcrumb, { items: [{ label: 'Inicio', href: '#' }, { label: 'Mis viajes', href: '#' }, { label: 'Pasaje 4F2K-81' }] })));`,
      after: `var l = all('.alma-crumbs__link'), sp1 = $('.alma-crumbs__sep'); dimH(l[0], 'left'); if (sp1) { gapX(l[0], sp1, null, box(l[0]).y - 30); dimW(sp1, 'bottom'); } dimH($('.alma-crumbs__current'), 'right');` }),

  // ---------- Pagination ----------
  scene('pagination', 'usage', 'anatomía numerada, pegada bajo una tabla', 'pagination-anatomia',
    'Anatomía de Pagination pegada bajo una tabla de movimientos. Numerados: elementos por página (1), rango (2), página actual de total (3) y anterior y siguiente (4).',
    { js: `var rows = [{ id: 1, f: '31 mar', d: 'Pasaje Santiago → Viña del Mar', m: '−$7.000' }, { id: 2, f: '30 mar', d: 'Recarga automática', m: '+$20.000' }, { id: 3, f: '28 mar', d: 'Pasaje Viña del Mar → Santiago', m: '−$6.500' }];
      mount(h('div', { style: { width: '46rem', padding: '24px 56px 64px' } }, h(A.Table, { title: 'Movimientos', headingLevel: 3, columns: [{ key: 'f', label: 'Fecha' }, { key: 'd', label: 'Detalle' }, { key: 'm', label: 'Monto', align: 'end' }], rows: rows,
        footer: h(A.Pagination, { totalItems: 1284, defaultPageSize: 20, defaultPage: 2, itemLabel: 'movimientos' }) })));`,
      after: `num($('.alma-pagination .alma-popup, .alma-pagination__size'), 1, 'bottom'); num($('.alma-pagination__range'), 2, 'bottom'); num($('.alma-pagination__of'), 3, 'bottom'); var pb = all('.alma-pagination .alma-btn').filter(function (b) { return !b.closest('.alma-popup'); }); pb.forEach(function (b) { num(b, 4, 'bottom'); });` }),

  scene('pagination', 'style', 'anatomía acotada', 'pagination-medidas',
    'Medidas de Pagination: relleno de la barra, separación entre grupos y botones anterior y siguiente de 44 px.',
    { js: `mount(h('div', { style: { width: '46rem', padding: '48px 150px 72px 150px' } }, h(A.Pagination, { totalItems: 1284, defaultPageSize: 20, defaultPage: 2, itemLabel: 'movimientos' })));`,
      after: `var p = $('.alma-pagination'), b = all('.alma-pagination__pages .alma-btn'); padL(p); padT(p); if (b[0]) dimW(b[0], 'bottom'); if (b[1]) gapX(b[0], b[1], null, box(b[0]).y - 30);` }),

  // ---------- PopUpButton ----------
  scene('pop-up-button', 'usage', 'anatomía numerada con el menú abierto', 'pop-up-button-anatomia',
    'Anatomía de PopUpButton con el menú abierto. Numerados: etiqueta (1), botón (2), menú (3), opción elegida (4) y nota al pie (5).',
    { js: `mount(h('div', { style: { width: '18rem', height: '24rem', padding: '40px 64px' } }, h(A.PopUpButton, { label: 'Ordenar por', options: ['Más recientes', 'Precio más bajo', 'Menor duración'], defaultValue: 'Precio más bajo', help: 'El precio incluye la tasa de embarque' })));`,
      after: `$('.alma-popup__btn').click(); await sleep(250); num($('.alma-popup__label'), 1, 'left'); num($('.alma-popup__btn'), 2, 'right'); num($('.alma-menu'), 3, 'right');
        var on = all('.alma-menu__item').filter(function (i) { return i.getAttribute('aria-selected') === 'true' || i.getAttribute('aria-checked') === 'true' || i.querySelector('.alma-menu__check svg'); })[0]; if (on) num(on, 4, 'left'); if ($('.alma-menu__footer')) num($('.alma-menu__footer'), 5, 'left');` }),

  scene('pop-up-button', 'usage', 'reposo, abierto con opción elegida', 'pop-up-button-estados',
    'Los estados de PopUpButton en tema oscuro y claro: en reposo, abierto con la opción elegida marcada, con el puntero sobre una opción, y desactivado.',
    { js: `var O = ['Más recientes', 'Precio más bajo', 'Menor duración'];
      mount(themes(['dark', 'light'], function () { return h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 15rem)', gap: '16px 24px' } },
        h('div', { className: 'col' }, h('span', { className: 'cap web-label-s' }, 'Reposo'), h(A.PopUpButton, { label: 'Ordenar por', options: O, defaultValue: 'Más recientes' })),
        h('div', { className: 'col' }, h('span', { className: 'cap web-label-s' }, 'Desactivado'), h(A.PopUpButton, { label: 'Ordenar por', options: O, defaultValue: 'Más recientes', disabled: true })),
        h('div', { className: 'col', 'data-o': 1, style: { height: '17rem' } }, h('span', { className: 'cap web-label-s' }, 'Abierto'), h(A.PopUpButton, { label: 'Ordenar por', options: O, defaultValue: 'Precio más bajo' })),
        h('div', { className: 'col', 'data-o': 2, style: { height: '17rem' } }, h('span', { className: 'cap web-label-s' }, 'Puntero sobre una opción'), h(A.PopUpButton, { label: 'Ordenar por', options: O, defaultValue: 'Precio más bajo' }))); }));`,
      after: `for (var c of all('[data-o]')) { c.querySelector('.alma-popup__btn').click(); await sleep(200); }
        all('[data-o="2"]').forEach(function (c) { var it = c.querySelectorAll('.alma-menu__item'); if (it[2]) st(it[2], 'hover'); });` }),

  scene('pop-up-button', 'style', 'anatomía acotada del botón y del menú abierto', 'pop-up-button-medidas',
    'Medidas de PopUpButton: alto del botón, relleno, separación entre botón y menú, relleno del menú, alto de las opciones, marca de 16 px y su separación de 16 px con el texto.',
    { js: `mount(h('div', { style: { width: '18rem', height: '22rem', padding: '40px 170px 0 150px' } }, h(A.PopUpButton, { label: 'Ordenar por', options: ['Más recientes', 'Precio más bajo', 'Menor duración'], defaultValue: 'Más recientes' })));`,
      after: `var b = $('.alma-popup__btn'); b.click(); await sleep(250); var m = $('.alma-menu'), it = all('.alma-menu__item');
        dimH(b, 'right'); padL(b); gapY(b, m, box(m).x + box(m).w + 16); padT(m, box(m).x + box(m).w + 16, box(m).y + 10); dimH(it[1], 'right', null, { d: box(m).x + box(m).w - box(it[1]).x - box(it[1]).w + 16 }); var ck = $('.alma-menu__check'); if (ck) { dimW(ck, 'bottom', null, { d: box(it[2]).y + box(it[2]).h - box(ck).y - box(ck).h + 24 }); gapX(ck, it[0].querySelector('.alma-menu__text'), box(m).x - 130, box(it[0]).y + 10); }` }),

  // ---------- PullDownButton ----------
  scene('pull-down-button', 'usage', 'el menú de una tarjeta de pago', 'pull-down-button-menu',
    'PullDownButton abierto en una tarjeta de pago, con las acciones «Copiar número», «Congelar tarjeta» y, separada en rojo, «Eliminar tarjeta».',
    { js: `mount(h('div', { style: { width: '26rem', height: '20rem', padding: '24px' } }, h('div', { className: 'pane row', style: { justifyContent: 'space-between', alignItems: 'center' } },
        h('div', null, h('p', { className: 'web-h6', style: { margin: 0 } }, 'Tarjeta terminada en 4821'), h('p', { className: 'cap web-body-s' }, 'Vence 08/29')),
        h(A.PullDownButton, { icon: 'overflow-menu--vertical', 'aria-label': 'Más acciones de la tarjeta', actions: [{ value: 'copy', label: 'Copiar número', icon: 'copy' }, { value: 'lock', label: 'Congelar tarjeta', icon: 'locked' }, { value: 'del', label: 'Eliminar tarjeta', icon: 'trash-can', role: 'destructive' }] }))));`,
      after: `$('.alma-popup__btn, .alma-btn').click(); await sleep(250);`,
      css: `.pane .alma-menu { right: 0; left: auto; }` }),

  scene('pull-down-button', 'style', 'anatomía acotada', 'pull-down-button-medidas',
    'Medidas de PullDownButton: botón de 44 px, separación de 8 px con el menú, relleno del menú y alto de las acciones.',
    { js: `mount(h('div', { style: { width: '16rem', height: '19rem', padding: '40px 170px 0 150px' } }, h(A.PullDownButton, { label: 'Acciones', actions: [{ value: 'copy', label: 'Copiar número', icon: 'copy' }, { value: 'lock', label: 'Congelar tarjeta', icon: 'locked' }, { value: 'del', label: 'Eliminar tarjeta', icon: 'trash-can', role: 'destructive' }] })));`,
      after: `var b = $('.alma-popup__btn, .alma-btn'); b.click(); await sleep(250); var m = $('.alma-menu'), it = all('.alma-menu__item'); dimH(b, 'right'); gapY(b, m, box(m).x + box(m).w + 16); padL(m); dimH(it[0], 'right', null, { d: box(m).x + box(m).w - box(it[0]).x - box(it[0]).w + 16 });` }),

  // ---------- PageControl ----------
  scene('page-control', 'usage', '5 puntos con el tercero', 'page-control-puntos',
    'PageControl con cinco puntos y el tercero como página actual, bajo un carrusel de destinos.',
    { js: `mount(h('div', { className: 'col', style: { width: '22rem', justifyItems: 'center', gap: 'var(--space-16)' } }, h('div', { className: 'pane', style: { width: '100%', boxSizing: 'border-box', height: '8rem', display: 'grid', placeItems: 'center' } }, h('p', { className: 'web-h5', style: { margin: 0 } }, 'Valparaíso')),
        h(A.PageControl, { count: 5, defaultValue: 2, label: 'Destinos destacados' })));` }),

  scene('page-control', 'style', 'anatomía acotada', 'page-control-medidas',
    'Medidas de PageControl: puntos de 8 px, área táctil de 44 px por punto y separación entre puntos.',
    { js: `mount(h('div', { style: { padding: '64px 150px 72px 60px' } }, h(A.PageControl, { count: 5, defaultValue: 2, label: 'Destinos destacados' })));`,
      after: `var d = all('.alma-pagecontrol__dot'); dimH(d[0], 'left'); dimW(d[4], 'bottom'); add('chip', box(d[2]).x - 20, box(d[2]).y - 30, null, null, 'punto: 8 px');` }),

  // ---------- Link ----------
  scene('link', 'usage', 'los cuatro tipos', 'link-tipos',
    'Los cuatro tipos de Link (dentro de un texto, suelto, externo y página actual) en reposo, con el cursor encima, visitado y con foco.',
    { js: `var T = [['Dentro de un texto', {}], ['Suelto', { standalone: true }], ['Externo', { external: true, href: 'https://www.ejemplo.cl' }], ['Página actual', { current: true }]];
      var S = [['Reposo'], ['Cursor encima', 'hover'], ['Visitado', 'visited'], ['Foco', 'focus']];
      mount(h('div', { style: { display: 'grid', gridTemplateColumns: '10rem repeat(4, 13rem)', gap: '20px 16px', alignItems: 'center' } }, h('span'),
        S.map(function (s) { return h('span', { key: s[0], className: 'cap web-label-s' }, s[0]); }),
        T.map(function (t) { return h(React.Fragment, { key: t[0] }, h('span', { className: 'tok' }, t[0]),
          S.map(function (s) { return h('div', { key: s[0], 'data-st': s[1] || '', className: 'web-body-m' }, t[0] === 'Dentro de un texto' ? h('span', null, 'Lee las ', h(A.Link, { href: '#condiciones' }, 'condiciones'), '.') : h(A.Link, Object.assign({ href: '#' + s[0] }, t[1]), t[0] === 'Externo' ? 'Sitio del terminal' : t[0] === 'Página actual' ? 'Mis viajes' : 'Ver todos los viajes')); })); })));`,
      after: `all('[data-st]').forEach(function (c) { var s = c.getAttribute('data-st'); if (s) st(c.querySelector('.alma-link'), s); });` }),

  // ---------- ProgressIndicator ----------
  scene('progress-indicator', 'usage', 'la compra de un pasaje en 4 pasos', 'progress-indicator-compra',
    'ProgressIndicator de la compra de un pasaje en cuatro pasos (viaje, asientos, pasajeros y pago), con el tercero en curso, en horizontal y en vertical.',
    { js: `var steps = [{ label: 'Viaje', description: 'Santiago → Viña' }, { label: 'Asientos', description: 'Asiento 14' }, { label: 'Pasajeros' }, { label: 'Pago' }];
      mount(h('div', { className: 'row', style: { gap: 'var(--space-64)', alignItems: 'flex-start' } },
        h('div', { className: 'col', style: { width: '40rem', gap: 'var(--space-16)' } }, h('p', { className: 'cap web-label-m' }, 'Horizontal'), h(A.ProgressIndicator, { steps: steps, current: 2, label: 'Compra del pasaje' })),
        h('div', { className: 'col', style: { gap: 'var(--space-16)' } }, h('p', { className: 'cap web-label-m' }, 'Vertical'), h(A.ProgressIndicator, { steps: steps, current: 2, vertical: true, label: 'Compra del pasaje' }))));` }),

  scene('progress-indicator', 'style', 'anatomía acotada', 'progress-indicator-medidas',
    'Medidas de ProgressIndicator: tamaño del ícono de cada paso, separación entre ícono y texto, y línea entre pasos.',
    { js: `var steps = [{ label: 'Viaje' }, { label: 'Asientos' }, { label: 'Pasajeros' }, { label: 'Pago' }];
      mount(h('div', { style: { width: '40rem', padding: '56px 120px 72px 56px' } }, h(A.ProgressIndicator, { steps: steps, current: 2, label: 'Compra del pasaje' })));`,
      after: `var s = all('.alma-steps__step'), ic = all('.alma-steps__icon'); dimW(ic[0], 'top'); dimH(s[1], 'right', null, { d: 4 }); var l = all('.alma-steps__label'); gapX(ic[1], l[1]); dimW(s[0], 'bottom');` }),
  // ---------- Card ----------
  scene('card', 'usage', 'una tarjeta de viaje con imagen', 'card-viaje',
    'Una tarjeta de viaje con imagen, antetítulo con la fecha, título con la ruta, subtítulo con el asiento y la acción «Ver pasaje».',
    { js: `mount(h('div', { style: { width: '22rem' } }, h(A.Card, { headingLevel: 3, media: { src: brandArt(), alt: '', ratio: '16/9' }, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14 · Terminal Alameda',
        actions: [h(A.Button, { key: 'a', variant: 'tinted' }, 'Ver pasaje')] })));` }),

  scene('card', 'style', 'anatomía acotada', 'card-medidas',
    'Medidas de Card: relleno del cuerpo, separación entre textos, relleno de las acciones y radio.',
    { js: `mount(h('div', { style: { width: '22rem', padding: '56px 180px 56px 150px' } }, h(A.Card, { headingLevel: 3, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14', actions: [h(A.Button, { key: 'a', variant: 'tinted' }, 'Ver pasaje'), h(A.Button, { key: 'b', variant: 'plain' }, 'Cambiar')] })));`,
      after: `var c = $('.alma-card'), b = $('.alma-card__body') || c; padL(b); padT(b); var k = [].slice.call(b.children); if (k[1]) gapY(k[0], k[1], box(c).x + box(c).w + 16); var btn = all('.alma-card .alma-btn'); if (btn[1]) gapX(btn[0], btn[1], null, box(btn[0]).y + box(btn[0]).h + 30); rad(c, box(c).x + box(c).w - 90, box(c).y - 30);` }),

  // ---------- List ----------
  scene('list', 'usage', 'dos grupos: uno de navegación', 'list-grupos',
    'Dos grupos de List: uno de navegación, con íconos y flecha, y un resumen de precios con los montos a la derecha.',
    { js: `mount(h('div', { className: 'row', style: { gap: 'var(--space-40)' } },
        h('div', { style: { width: '22rem' } }, h(A.List, { header: 'Tu cuenta', headingLevel: 3, items: [{ icon: 'user', title: 'Perfil', subtitle: 'Camila Rojas', chevron: true, href: '#' }, { icon: 'wallet', title: 'Billetera', subtitle: 'Saldo $12.500', chevron: true, href: '#' }, { icon: 'notification', title: 'Notificaciones', chevron: true, href: '#' }] })),
        h('div', { style: { width: '22rem' } }, h(A.List, { header: 'Resumen de la compra', footer: 'Precios en pesos chilenos, con IVA.', headingLevel: 3, items: [{ title: 'Pasaje adulto', trailing: '$6.010' }, { title: 'Tasa de embarque', trailing: '$990' }, { title: 'Total', trailing: '$7.000' }] }))));` }),

  scene('list', 'style', 'anatomía acotada con ícono', 'list-medidas',
    'Medidas de List con ícono: alto de la fila, relleno lateral, ícono de 16 px, separación entre ícono y texto, y radio del grupo.',
    { js: `mount(h('div', { style: { width: '22rem', padding: '56px 180px 56px 150px' } }, h(A.List, { 'aria-label': 'Cuenta', items: [{ icon: 'user', title: 'Perfil', subtitle: 'Camila Rojas', chevron: true, href: '#' }, { icon: 'wallet', title: 'Billetera', chevron: true, href: '#' }] })));`,
      after: `var r = all('.alma-list__row'), ic = $('.alma-list__icon'), t = $('.alma-list__text'); dimH(r[0], 'right'); padL(r[0]); if (ic && t) gapX(ic, t, null, box(r[0]).y - 30); rad($('.alma-list__rows') || $('.alma-list'), box(r[1]).x, box(r[1]).y + box(r[1]).h + 16);` }),

  // ---------- Table ----------
  scene('table', 'usage', 'anatomía numerada con selección', 'table-anatomia',
    'Anatomía de Table con selección, orden y paginación. Numerados: título y descripción (1), encabezado (2), fila con casilla (3), celda (4) y pie con Pagination (5).',
    { js: `var rows = [{ id: 1, f: '31 mar', d: 'Santiago → Viña del Mar', m: '$7.000' }, { id: 2, f: '28 mar', d: 'Viña del Mar → Santiago', m: '$6.500' }, { id: 3, f: '14 mar', d: 'Santiago → Rancagua', m: '$5.200' }];
      mount(h('div', { style: { width: '46rem', padding: '24px 64px 72px' } }, h(A.Table, { title: 'Mis pasajes', description: 'Los últimos 90 días', headingLevel: 3, selectable: true, defaultSelected: [2], defaultSort: { key: 'f', dir: 'desc' },
        columns: [{ key: 'f', label: 'Fecha', sortable: true }, { key: 'd', label: 'Ruta' }, { key: 'm', label: 'Precio', align: 'end', sortable: true }], rows: rows, footer: h(A.Pagination, { totalItems: 42, defaultPageSize: 10, itemLabel: 'pasajes' }) })));`,
      after: `num($('.alma-table__head') || $('.alma-table__title'), 1, 'left'); num($('.alma-table thead tr'), 2, 'left'); var tr = all('.alma-table tbody tr'); num(tr[1], 3, 'left'); num(tr[2].children[2], 4, 'bottom', { d: 6 }); num($('.alma-pagination'), 5, 'left');` }),

  scene('table', 'style', 'anatomía acotada', 'table-medidas',
    'Medidas de Table: alto de fila de 56 px, relleno de las celdas, alto del encabezado y radio del contenedor.',
    { js: `var rows = [{ id: 1, f: '31 mar', d: 'Santiago → Viña del Mar', m: '$7.000' }, { id: 2, f: '28 mar', d: 'Viña del Mar → Santiago', m: '$6.500' }];
      mount(h('div', { style: { width: '40rem', padding: '56px 150px 64px 150px' } }, h(A.Table, { title: 'Mis pasajes', headingLevel: 3, columns: [{ key: 'f', label: 'Fecha' }, { key: 'd', label: 'Ruta' }, { key: 'm', label: 'Precio', align: 'end' }], rows: rows })));`,
      after: `var td = all('.alma-table tbody td'), th = all('.alma-table thead th'); dimH(td[2], 'right', null, { d: 40 }); padL(td[0]); dimH(th[2], 'right', null, { d: 40 }); var w = $('.alma-table-wrap') || $('.alma-table'); rad(w, box(w).x + box(w).w - 90, box(w).y - 30);` }),

  // ---------- Accordion ----------
  scene('accordion', 'usage', 'preguntas frecuentes con una sección abierta', 'accordion-preguntas',
    'Accordion de preguntas frecuentes con la sección «¿Puedo cambiar la fecha de mi pasaje?» abierta.',
    { js: `mount(h('div', { style: { width: '34rem' } }, h(A.Accordion, { headingLevel: 3, defaultOpen: ['cambio'], items: [
        { id: 'cambio', title: '¿Puedo cambiar la fecha de mi pasaje?', content: 'Sí, hasta 4 horas antes de la salida. El cambio no tiene costo si el nuevo pasaje vale lo mismo o menos.' },
        { id: 'equipaje', title: '¿Cuánto equipaje puedo llevar?', content: 'Una maleta de hasta 25 kg en la bodega y un bolso de mano.' },
        { id: 'mascotas', title: '¿Puedo viajar con mi mascota?', content: 'Sí, en un transportador, si pesa menos de 8 kg.' }] })));` }),

  scene('accordion', 'style', 'anatomía acotada', 'accordion-medidas',
    'Medidas de Accordion: alto del título de 44 px, relleno del título y del contenido, y borde entre secciones.',
    { js: `mount(h('div', { style: { width: '30rem', padding: '56px 150px 56px 150px' } }, h(A.Accordion, { headingLevel: 3, defaultOpen: ['a'], items: [{ id: 'a', title: '¿Puedo cambiar la fecha?', content: 'Sí, hasta 4 horas antes de la salida.' }, { id: 'b', title: '¿Cuánto equipaje puedo llevar?', content: 'Una maleta de 25 kg.' }] })));`,
      after: `var b = all('.alma-accordion__btn'), pnl = $('.alma-accordion__panel'); dimH(b[1], 'right'); padL(b[0]); if (pnl) padL(pnl, null, box(pnl).y + box(pnl).h / 2 - 9);` }),

  // ---------- Tag ----------
  scene('tag', 'usage', 'los tres tipos, y la paleta', 'tag-tipos',
    'Los tres tipos de Tag (de lectura, que se quita y que se elige) y la paleta de once colores, de rojo a gris frío.',
    { js: `var C = ['red', 'yellow', 'magenta', 'purple', 'blue', 'cyan', 'teal', 'green', 'warmgray', 'gray', 'coolgray'];
      mount(h('div', { className: 'col', style: { gap: 'var(--space-32)' } },
        h('div', { className: 'row', style: { gap: 'var(--space-40)' } },
          h('div', { className: 'col' }, h('span', { className: 'cap web-label-s' }, 'De lectura'), h('div', null, h(A.Tag, { color: 'green' }, 'Pagado'))),
          h('div', { className: 'col' }, h('span', { className: 'cap web-label-s' }, 'Se quita'), h('div', null, h(A.Tag, { color: 'blue', onRemove: function () {}, removeLabel: 'Quitar filtro Semicama' }, 'Semicama'))),
          h('div', { className: 'col' }, h('span', { className: 'cap web-label-s' }, 'Se elige'), h('div', { className: 'row', style: { gap: '8px' } }, h(A.Tag, { color: 'gray', onClick: function () {}, selected: true }, 'Ida'), h(A.Tag, { color: 'gray', onClick: function () {} }, 'Ida y regreso')))),
        h('div', { className: 'col' }, h('span', { className: 'cap web-label-s' }, 'Paleta'), h('div', { className: 'row', style: { gap: '8px', flexWrap: 'wrap', width: '40rem' } }, C.map(function (c) { return h(A.Tag, { key: c, color: c }, c); })))));` }),

  scene('tag', 'style', 'anatomía acotada de los tres tipos', 'tag-medidas',
    'Medidas de Tag en sus tres tipos: alto, relleno, radio, separación con el botón para quitar y borde de la opción elegida.',
    { js: `mount(h('div', { className: 'row', style: { gap: 'var(--space-80)', padding: '64px 150px 72px 150px' } }, h(A.Tag, { color: 'green' }, 'Pagado'), h(A.Tag, { color: 'blue', onRemove: function () {}, removeLabel: 'Quitar' }, 'Semicama'), h(A.Tag, { color: 'gray', onClick: function () {}, selected: true }, 'Ida')));`,
      after: `var t = all('.alma-tag'); dimH(t[0], 'left'); padL(t[0], box(t[0]).x - 30, box(t[0]).y + box(t[0]).h + 12); rad(t[0], box(t[0]).x, box(t[0]).y - 30); var rm = t[1].querySelector('.alma-tag__remove'); if (rm) dimW(rm, 'top'); dimH(t[2], 'right');` }),

  // ---------- Icon ----------
  scene('icon', 'usage', 'el mismo ícono en contorno y relleno', 'icon-tamanos',
    'El ícono de información en contorno y en relleno, en los cuatro tamaños de ALMA: 16, 20, 24 y 32 px.',
    { js: `mount(h('div', { style: { display: 'grid', gridTemplateColumns: '6rem repeat(4, 5rem)', gap: '20px 16px', alignItems: 'center', color: 'var(--icon-01)' } },
        h('span'), [16, 20, 24, 32].map(function (s) { return h('span', { key: s, className: 'tok' }, s + ' px'); }),
        h('span', { className: 'cap web-label-s' }, 'Contorno'), [16, 20, 24, 32].map(function (s) { return h('div', { key: s }, h(A.Icon, { name: 'information', size: s })); }),
        h('span', { className: 'cap web-label-s' }, 'Relleno'), [16, 20, 24, 32].map(function (s) { return h('div', { key: s }, h(A.Icon, { name: 'information', variant: 'filled', size: s })); })));` }),

  // ---------- EmptyState ----------
  scene('empty-state', 'usage', '«Aún no tienes viajes»', 'empty-state-viajes',
    'EmptyState «Aún no tienes viajes», con su mensaje y la acción «Buscar pasajes».',
    { js: `mount(h('div', { className: 'pane', style: { width: '30rem' } }, h(A.EmptyState, { icon: 'ticket', title: 'Aún no tienes viajes', message: 'Aquí verás los pasajes que compres.', action: { label: 'Buscar pasajes', icon: 'search' } })));` }),

  scene('empty-state', 'style', 'anatomía acotada', 'empty-state-medidas',
    'Medidas de EmptyState: ícono, separación entre ícono, título, mensaje y acción, y ancho máximo del texto.',
    { js: `mount(h('div', { style: { width: '26rem', padding: '40px 170px 56px 150px' } }, h(A.EmptyState, { icon: 'ticket', title: 'Aún no tienes viajes', message: 'Aquí verás los pasajes que compres.', action: { label: 'Buscar pasajes' } })));`,
      after: `var e = $('.alma-empty'), ic = $('.alma-empty__icon'), t = $('.alma-empty__title'), m = $('.alma-empty__msg'), a = $('.alma-empty__actions'); if (ic) { dimW(ic, 'top'); gapY(ic, t, box(e).x + box(e).w + 16); } if (m) gapY(t, m, box(e).x + box(e).w + 16); if (a) gapY(m, a, box(e).x + box(e).w + 16);` }),

  // ---------- Tip ----------
  scene('tip', 'usage', 'un consejo sobre la recarga automática', 'tip-recarga',
    'Un Tip sobre la recarga automática, junto a la tarjeta de saldo de la billetera.',
    { js: `mount(h('div', { className: 'col', style: { width: '26rem', gap: 'var(--space-16)' } },
        h(A.Card, { headingLevel: 3, eyebrow: 'Billetera', title: 'Saldo: $3.200', subtitle: 'Te alcanza para medio pasaje a Viña del Mar.' }),
        h(A.Tip, { icon: 'idea', title: 'Activa la recarga automática', message: 'Cargamos $20.000 cuando tu saldo baje de $5.000, así nunca te quedas sin pasaje.', actionLabel: 'Activar recarga automática' })));` }),

  scene('tip', 'style', 'anatomía acotada', 'tip-medidas',
    'Medidas de Tip: relleno, ícono, separación entre ícono y texto, botón Cerrar y radio.',
    { js: `mount(h('div', { style: { width: '26rem', padding: '56px 170px 56px 150px' } }, h(A.Tip, { icon: 'idea', title: 'Activa la recarga automática', message: 'Cargamos $20.000 cuando tu saldo baje de $5.000.', actionLabel: 'Activar' })));`,
      after: `var t = $('.alma-tipcard'), ic = $('.alma-tipcard__icon'), bd = $('.alma-tipcard__body'); padL(t); padT(t); if (ic) gapX(ic, bd, null, box(t).y + box(t).h + 12); rad(t, box(t).x + box(t).w - 90, box(t).y - 30);` }),

  // ---------- Popover ----------
  scene('popover', 'usage', 'un popover abierto bajo un botón de información', 'popover-abierto',
    'Un Popover abierto bajo un botón de información que explica la tasa de embarque, en tema oscuro y claro.',
    { js: `mount(themes(['dark', 'light'], function () { return h('div', { style: { width: '30rem', height: '12rem' } }, h('p', { className: 'web-body-m', style: { margin: 0, display: 'flex', alignItems: 'center', gap: 8 } }, 'Tasa de embarque $990',
        h(A.Popover, { open: true, title: '¿Qué es la tasa de embarque?', content: h('p', { style: { margin: 0 } }, 'La cobra el terminal por usar sus andenes. Va incluida en el total.') }, h(A.Button, { variant: 'plain', icon: 'information', 'aria-label': 'Qué es la tasa de embarque' })))); }));` }),

  scene('popover', 'style', 'anatomía acotada', 'popover-medidas',
    'Medidas de Popover: separación con el botón, relleno, ancho máximo, botón Cerrar y radio.',
    { js: `mount(h('div', { style: { width: '24rem', height: '15rem', padding: '40px 170px 0 150px' } }, h('p', { className: 'web-body-m', style: { margin: 0, display: 'flex', alignItems: 'center', gap: 8 } }, 'Tasa de embarque $990',
        h(A.Popover, { open: true, title: '¿Qué es la tasa de embarque?', content: h('p', { style: { margin: 0 } }, 'La cobra el terminal por usar sus andenes.') }, h(A.Button, { variant: 'plain', icon: 'information', 'aria-label': 'Qué es la tasa de embarque' })))));`,
      after: `var p = $('.alma-popover'), b = $('.alma-popover-anchor .alma-btn') || $('.alma-btn'); gapY(b, p, box(p).x + box(p).w + 16); padL(p); dimW(p, 'bottom'); rad(p, box(p).x + box(p).w + 16, box(p).y + box(p).h - 30);` }),

  // ---------- Tooltip ----------
  scene('tooltip', 'usage', 'un botón de ícono con su tooltip arriba', 'tooltip-posiciones',
    'Dos botones de ícono con su Tooltip abierto: uno arriba («Compartir viaje») y otro abajo («Descargar pasaje»).',
    { js: `mount(h('div', { className: 'row', style: { gap: 'var(--space-80)', padding: '56px 80px' } },
        h(A.Tooltip, { text: 'Compartir viaje' }, h(A.Button, { variant: 'plain', icon: 'share', 'aria-label': 'Compartir viaje' })),
        h(A.Tooltip, { text: 'Descargar pasaje', placement: 'bottom' }, h(A.Button, { variant: 'plain', icon: 'download', 'aria-label': 'Descargar pasaje' }))));`,
      after: `all('.alma-tooltip').forEach(function (t) { t.classList.add('is-open'); });` }),

  scene('tooltip', 'style', 'anatomía acotada', 'tooltip-medidas',
    'Medidas de Tooltip: separación de 8 px con el control, relleno del globo y radio.',
    { js: `mount(h('div', { style: { padding: '72px 180px 40px 150px' } }, h(A.Tooltip, { text: 'Compartir viaje' }, h(A.Button, { variant: 'plain', icon: 'share', 'aria-label': 'Compartir viaje' }))));`,
      after: `var t = $('.alma-tooltip'); t.classList.add('is-open'); await sleep(50); var b = $('.alma-btn'); gapY(t, b, box(t).x + box(t).w + 16); padL(t, box(t).x - 130); rad(t, box(t).x + box(t).w + 16, box(t).y - 20);` }),

  // ---------- InlineNotification ----------
  scene('inline-notification', 'usage', 'los cuatro estados en línea', 'inline-notification-estados',
    'Los cuatro estados de InlineNotification en línea (error, advertencia, éxito e información), dos con acción y dos sin acción, en tema oscuro y claro.',
    { js: `var N = [['error', 'No se pudo cobrar', 'Tu banco rechazó el pago.', 'Reintentar'], ['warning', 'Queda poco saldo', 'Te alcanza para un pasaje más.', 'Recargar'], ['success', 'Pago aprobado', 'Tu pasaje está en tu billetera.'], ['info', 'Nuevo horario', 'El bus de las 08:30 sale ahora a las 08:40.']];
      mount(themes(['dark', 'light'], function () { return h('div', { className: 'col', style: { width: '26rem', gap: 'var(--space-16)' } }, N.map(function (n) { return h(A.InlineNotification, { key: n[0], status: n[0], title: n[1], message: n[2], actionLabel: n[3], dismissible: true }); })); }));` }),

  scene('inline-notification', 'style', 'anatomía acotada con acción', 'inline-notification-medidas',
    'Medidas de InlineNotification con acción y botón Cerrar: relleno, ícono de 16 px, separación entre título y mensaje, y borde izquierdo.',
    { js: `mount(h('div', { style: { width: '28rem', padding: '56px 170px 56px 150px' } }, h(A.InlineNotification, { status: 'warning', title: 'Queda poco saldo', message: 'Te alcanza para un pasaje más.', actionLabel: 'Recargar', dismissible: true })));`,
      after: `var n = $('.alma-notif'), ic = $('.alma-notif__icon'), t = $('.alma-notif__title'), m = $('.alma-notif__msg'); padL(n); padT(n); if (ic) dimW(ic, 'bottom', null, { d: box(n).y + box(n).h - box(ic).y - box(ic).h + 16 }); if (t && m) gapY(t, m, box(n).x + box(n).w + 16);` }),

  // ---------- ToastRegion ----------
  scene('toast-region', 'usage', 'dos toasts apilados', 'toast-region-pantalla',
    'Dos toasts apilados arriba a la derecha sobre la pantalla de Mis viajes: «Pago aprobado» y «Pasaje enviado a tu correo».',
    { js: `mount(device({ w: 1100, h: 460, js: "mount(h('div', { style: { padding: '24px 32px', display: 'grid', gap: '16px', maxWidth: '40rem' } }, h('h1', { className: 'web-h3', style: { margin: 0 } }, 'Mis viajes'), h(A.Card, { headingLevel: 2, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14' }), h(A.Card, { headingLevel: 2, eyebrow: '4 abr 2026 · 19:10', title: 'Viña del Mar → Santiago', subtitle: 'Salón cama · asiento 3' }), h(A.ToastRegion, {}))); A.toast({ status: 'success', title: 'Pago aprobado', message: 'Tu pasaje está en tu billetera.', duration: 0 }); A.toast({ status: 'info', title: 'Pasaje enviado a tu correo', message: 'camila@correo.cl', duration: 0 });" }));` }),

  // ---------- Alert ----------
  scene('alert', 'usage', 'anatomía numerada de una alerta con dos botones', 'alert-anatomia',
    'Anatomía de Alert: una alerta con dos botones y otra con tres botones apilados. Numerados: velo (1), título (2), mensaje (3), campo (4) y botones (5).',
    { js: `var a1 = "mount(h(A.Alert, { open: true, title: '¿Eliminar la tarjeta C.WalletPay?', message: 'Los pagos programados con esta tarjeta se cancelarán.', actions: [{ label: 'Cancelar', role: 'cancel' }, { label: 'Eliminar', role: 'destructive' }] }));";
      var a2 = "mount(h(A.Alert, { open: true, stacked: true, title: 'Confirma tu contraseña', message: 'La necesitamos para cambiar el límite.', actions: [{ label: 'Confirmar', role: 'default' }, { label: 'Olvidé mi contraseña' }, { label: 'Cancelar', role: 'cancel' }] }, h(A.TextInput, { label: 'Contraseña', type: 'password' })));";
      var m1 = "num($('.alma-overlay'), 1, 'top', { at: 20, d: -40, outline: false }); num($('.alma-alert__title'), 2, 'left'); num($('.alma-alert__msg'), 3, 'left'); if ($('.alma-alert__extra')) num($('.alma-alert__extra'), 4, 'left'); num($('.alma-alert__actions'), 5, 'left');";
      mount(h('div', { className: 'row', style: { gap: 'var(--space-40)' } }, device({ label: 'Dos botones', w: 560, h: 460, js: a1, after: m1 }), device({ label: 'Tres botones, apilados', w: 560, h: 560, js: a2, after: m1 })));` }),

  scene('alert', 'usage', 'el orden de los botones en fila y apilados', 'alert-orden',
    'El orden de los botones de Alert: en fila, «Cancelar» a la izquierda y la acción a la derecha; apilados, la acción por defecto arriba y «Cancelar» abajo.',
    { js: `mount(h('div', { className: 'row', style: { gap: 'var(--space-40)', alignItems: 'flex-start' } },
        h('div', { className: 'col', style: { width: '20rem' } }, h('p', { className: 'cap web-label-m' }, 'En fila'), h(A.Alert, { open: true, inline: true, title: '¿Anular el pasaje?', message: 'Te devolvemos $7.000 a tu billetera.', actions: [{ label: 'Cancelar', role: 'cancel' }, { label: 'Anular', role: 'destructive' }] })),
        h('div', { className: 'col', style: { width: '20rem' } }, h('p', { className: 'cap web-label-m' }, 'Apilados'), h(A.Alert, { open: true, inline: true, stacked: true, title: 'No se pudo conectar con el banco', message: 'Revisa tu conexión e inténtalo otra vez.', actions: [{ label: 'Reintentar', role: 'default' }, { label: 'Ver estado del servicio' }, { label: 'Cancelar', role: 'cancel' }] }))));` }),

  scene('alert', 'style', 'anatomía acotada, en fila y apilada', 'alert-medidas',
    'Medidas de Alert en fila y apilada: ancho, relleno, separación entre título y mensaje, entre texto y botones, y entre botones.',
    { js: `mount(h('div', { className: 'row', style: { gap: 'var(--space-80)', padding: '48px 150px 64px 150px', alignItems: 'flex-start' } },
        h('div', { style: { width: '20rem' } }, h(A.Alert, { open: true, inline: true, title: '¿Anular el pasaje?', message: 'Te devolvemos $7.000.', actions: [{ label: 'Cancelar', role: 'cancel' }, { label: 'Anular', role: 'destructive' }] })),
        h('div', { style: { width: '20rem' } }, h(A.Alert, { open: true, inline: true, stacked: true, title: 'No se pudo conectar', message: 'Inténtalo otra vez.', actions: [{ label: 'Reintentar', role: 'default' }, { label: 'Cancelar', role: 'cancel' }] }))));`,
      after: `var al = all('.alma-alert'); padL(al[0]); dimW(al[0], 'bottom'); var t = al[0].querySelector('.alma-alert__title'), m = al[0].querySelector('.alma-alert__msg'), ac = al[0].querySelector('.alma-alert__actions'); gapY(t, m, box(al[0]).x + box(al[0]).w + 16); gapY(m, ac, box(al[0]).x + box(al[0]).w + 16);
        var b = al[1].querySelectorAll('.alma-btn'); if (b[1]) gapY(b[0], b[1], box(al[1]).x + box(al[1]).w + 16);` }),

  // ---------- Modal ----------
  scene('modal', 'usage', 'anatomía numerada de un modal transaccional', 'modal-anatomia',
    'Anatomía de un Modal transaccional con un campo, en tema oscuro. Numerados: velo (1), contenedor (2), antetítulo (3), título (4), botón Cerrar (5), cuerpo (6) y pie (7).',
    { js: `mount(device({ w: 900, h: 620, js: "mount(h(A.Modal, { open: true, eyebrow: 'Pasaje 4F2K-81', title: 'Cambiar el nombre del pasajero', description: 'El nombre debe coincidir con el carnet que mostrarás al subir.', secondaryAction: { label: 'Cancelar' }, primaryAction: { label: 'Guardar cambio' } }, h(A.TextInput, { label: 'Nombre completo', defaultValue: 'Camila Rojas' })));",
        after: "num($('.alma-overlay'), 1, 'top', { at: 20, d: -40, outline: false }); var m = $('.alma-modal'); num(m, 2, 'right', { at: 0, outline: false }); num($('.alma-modal__eyebrow'), 3, 'left'); num($('.alma-modal__title'), 4, 'left'); var cl = $('.alma-modal__head .alma-btn'); if (cl) num(cl, 5, 'top', { d: 4 }); num($('.alma-modal__body'), 6, 'left'); num($('.alma-modal__foot'), 7, 'left');" }));` }),

  scene('modal', 'usage', 'los tres tamaños sobre la misma página', 'modal-tamanos',
    'Los tres tamaños de Modal (sm, md y lg) sobre la misma página, con su ancho.',
    { js: `function m(size) { return "mount(h(A.Modal, { open: true, size: '" + size + "', title: 'Tamaño " + size + "', description: 'El ancho del modal depende de cuánto contenido lleva.', secondaryAction: { label: 'Cancelar' }, primaryAction: { label: 'Guardar' } }));"; }
      var dims = "var m = $('.alma-modal'); add('chip', box(m).x, box(m).y + box(m).h + 16, null, null, 'ancho: ' + px(box(m).w));";
      mount(h('div', { className: 'row', style: { gap: 'var(--space-24)' } }, ['sm', 'md', 'lg'].map(function (s) { return device({ key: s, label: s, w: 1000, h: 520, scale: 0.5, js: m(s), after: dims }); })));` }),

  scene('modal', 'usage', 'secuencia abrir → escribir → guardar', 'modal-foco',
    'La ruta del foco en un Modal: al abrir, el foco va al campo; al escribir, sigue en el campo; al guardar, el modal se cierra y el foco vuelve al botón que lo abrió.',
    { js: `var page = "h('div', { style: { padding: '32px' } }, h(A.Button, { variant: 'gray', className: 'opener' }, 'Cambiar el nombre del pasajero'))";
      var modal = function (v) { return "h(A.Modal, { open: true, title: 'Cambiar el nombre', secondaryAction: { label: 'Cancelar' }, primaryAction: { label: 'Guardar cambio' } }, h(A.TextInput, { label: 'Nombre completo', defaultValue: '" + v + "' }))"; };
      mount(h('div', { className: 'row', style: { gap: 'var(--space-24)' } },
        device({ label: '1. Abrir: el foco va al campo', w: 700, h: 460, scale: 0.6, js: "mount(h(React.Fragment, null, " + page + ", " + modal('Camila Rojas') + "));", after: "st($('.alma-modal .alma-field__box'), 'focus-within'); num($('.alma-modal .alma-field__box'), 1, 'left');" }),
        device({ label: '2. Escribir: el foco sigue en el campo', w: 700, h: 460, scale: 0.6, js: "mount(h(React.Fragment, null, " + page + ", " + modal('Camila Andrea Rojas') + "));", after: "st($('.alma-modal .alma-field__box'), 'focus-within'); num($('.alma-modal .alma-field__box'), 2, 'left');" }),
        device({ label: '3. Guardar: el foco vuelve al botón', w: 700, h: 460, scale: 0.6, js: "mount(h('div', null, " + page + "));", after: "st($('.opener'), 'focus'); num($('.opener'), 3, 'right');" })));` }),

  scene('modal', 'style', 'anatomía acotada del modal', 'modal-medidas',
    'Medidas del Modal md: ancho, relleno del encabezado, del cuerpo y del pie, y radio.',
    { js: `mount(device({ w: 1000, h: 560, js: "mount(h(A.Modal, { open: true, size: 'md', eyebrow: 'Pasaje 4F2K-81', title: 'Cambiar el nombre del pasajero', description: 'El nombre debe coincidir con el carnet.', secondaryAction: { label: 'Cancelar' }, primaryAction: { label: 'Guardar cambio' } }, h(A.TextInput, { label: 'Nombre completo', defaultValue: 'Camila Rojas' })));",
        after: "var m = $('.alma-modal'); dimW(m, 'bottom'); padL($('.alma-modal__body')); padT($('.alma-modal__head') || m); rad(m, box(m).x + box(m).w + 12, box(m).y);" }));` }),

  // ---------- Sheet ----------
  scene('sheet', 'usage', 'la misma hoja en el teléfono', 'sheet-dispositivos',
    'La misma hoja «Compartir viaje» en el teléfono, pegada abajo, y en tablet, centrada.',
    { js: `var sh = "mount(h(A.Sheet, { open: true, title: 'Compartir viaje', size: 'sm' }, h(A.List, { 'aria-label': 'Opciones para compartir', items: [{ icon: 'copy', title: 'Copiar enlace', onClick: function () {} }, { icon: 'email', title: 'Enviar por correo', onClick: function () {} }, { icon: 'chat', title: 'Enviar por mensaje', onClick: function () {} }] })));";
      mount(h('div', { className: 'row', style: { gap: 'var(--space-40)', alignItems: 'flex-end' } }, device({ label: 'Teléfono', w: 390, h: 760, scale: 0.7, js: sh }), device({ label: 'Tablet', w: 820, h: 1000, scale: 0.53, js: sh })));` }),

  scene('sheet', 'style', 'anatomía acotada en el teléfono', 'sheet-medidas',
    'Medidas de Sheet en el teléfono: asa de 36 × 5 px, radio superior, relleno y alto de las opciones.',
    { js: `mount(device({ w: 390, h: 520, js: "mount(h(A.Sheet, { open: true, title: 'Compartir viaje', size: 'sm' }, h(A.List, { 'aria-label': 'Opciones', items: [{ icon: 'copy', title: 'Copiar enlace', onClick: function () {} }, { icon: 'email', title: 'Enviar por correo', onClick: function () {} }] })));",
        after: "var m = $('.alma-modal'); rad(m, box(m).x + 16, box(m).y - 34); padL($('.alma-modal__body') || m); var r = $('.alma-list__row'); if (r) dimH(r, 'right', null, { d: -60 }); add('chip', box(m).x + box(m).w / 2 + 30, box(m).y + 2, null, null, 'asa: 36 × 5 px');" }));` }),

  // ---------- ProgressBar ----------
  scene('progress-bar', 'usage', 'una barra determinada al 60', 'progress-bar-estados',
    'Tres ProgressBar: una determinada al 60 %, una indeterminada y una con error.',
    { js: `mount(h('div', { className: 'col', style: { width: '28rem', gap: 'var(--space-32)' } },
        h(A.ProgressBar, { label: 'Subiendo fotos', value: 0.6, description: 'Subiendo 7 de 12 fotos' }),
        h(A.ProgressBar, { label: 'Buscando pasajes', value: null, description: 'Revisando 14 empresas de buses' }),
        h(A.ProgressBar, { label: 'Subiendo documento', value: 0.35, status: 'error', description: 'Se cortó la conexión. Inténtalo otra vez.' })));` }),

  scene('progress-bar', 'style', 'anatomía acotada', 'progress-bar-medidas',
    'Medidas de ProgressBar: pista de 8 px con radio completo, separación entre etiqueta y pista, y entre pista y descripción.',
    { js: `mount(h('div', { style: { width: '26rem', padding: '48px 170px 56px 150px' } }, h(A.ProgressBar, { label: 'Subiendo fotos', value: 0.6, description: 'Subiendo 7 de 12 fotos' })));`,
      after: `var tr = $('.alma-progressbar__track'), tp = $('.alma-progressbar__top'), d = $('.alma-progressbar__desc'); dimH(tr, 'right'); gapY(tp, tr, box(tr).x - 130); gapY(tr, d, box(tr).x - 130);` }),

  // ---------- ProgressLine ----------
  scene('progress-line', 'usage', 'la pantalla de pago velada', 'progress-line-pago',
    'La pantalla de pago velada mientras se procesa: la línea de ProgressLine cargando y, al terminar, en verde.',
    { js: `function scr(status) { return "mount(h('div', { style: { position: 'relative', height: '100vh' } }, h('div', { style: { padding: '24px', display: 'grid', gap: '16px' } }, h('h1', { className: 'web-h4', style: { margin: 0 } }, 'Pagar pasaje'), h(A.Card, { headingLevel: 2, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Total: $7.000' }), h(A.Button, { variant: 'filled', size: 'md' }, 'Pagar $7.000')), h('div', { style: { position: 'absolute', inset: 0, background: 'var(--overlay-01)' } }), h('div', { style: { position: 'absolute', left: '15%', right: '15%', bottom: '64px' } }, h(A.ProgressLine, { status: '" + status + "', label: '" + (status === 'loading' ? 'Procesando el pago' : 'Pago aprobado') + "' }))));"; }
      mount(h('div', { className: 'row', style: { gap: 'var(--space-40)' } }, device({ label: 'Cargando', w: 390, h: 520, js: scr('loading') }), device({ label: 'Listo', w: 390, h: 520, js: scr('success') })));` }),
  // ---------- ActivityIndicator ----------
  scene('activity-indicator', 'usage', 'el indicador a 20, 24 y 40 px', 'activity-indicator-tamanos',
    'ActivityIndicator a 20, 24 y 40 px, en tema oscuro y claro.',
    { js: `mount(themes(['dark', 'light'], function () { return h('div', { className: 'row', style: { gap: 'var(--space-40)', alignItems: 'center' } }, [20, 24, 40].map(function (s) { return h('div', { key: s, className: 'col', style: { justifyItems: 'center' } }, h(A.ActivityIndicator, { size: s, label: 'Cargando' }), h('span', { className: 'tok' }, s + ' px')); })); }));` }),

  // ---------- Skeleton ----------
  scene('skeleton', 'usage', 'una lista de viajes con Skeleton', 'skeleton-lista',
    'Una lista de viajes mientras carga, dibujada con Skeleton, y la misma lista ya cargada.',
    { js: `function sk() { return h('div', { className: 'col', style: { gap: '16px' } }, [0, 1, 2].map(function (i) { return h('div', { key: i, className: 'row', style: { gap: '16px', alignItems: 'center' } }, h(A.Skeleton, { shape: 'circle' }), h('div', { style: { flex: 1 } }, h(A.Skeleton, { lines: 2 }))); })); }
      mount(h('div', { className: 'row', style: { gap: 'var(--space-40)' } },
        h('div', { className: 'col', style: { width: '22rem' } }, h('p', { className: 'cap web-label-m' }, 'Cargando'), h('div', { className: 'pane' }, sk())),
        h('div', { className: 'col', style: { width: '22rem' } }, h('p', { className: 'cap web-label-m' }, 'Cargada'), h(A.List, { 'aria-label': 'Mis viajes', items: [{ icon: 'bus', title: 'Santiago → Viña del Mar', subtitle: '31 mar · 08:30' }, { icon: 'bus', title: 'Viña del Mar → Santiago', subtitle: '4 abr · 19:10' }, { icon: 'bus', title: 'Santiago → Rancagua', subtitle: '14 abr · 07:00' }] }))));` }),

  // ---------- FileUploader ----------
  scene('file-uploader', 'usage', 'la zona, y una lista con un archivo subiendo', 'file-uploader-lista',
    'FileUploader con su zona para arrastrar y una lista con un archivo subido, uno subiendo y uno con error.',
    { js: `mount(h('div', { style: { width: '30rem' } }, h(A.FileUploader, { title: 'Documentos de identidad', description: 'PDF o JPG, hasta 5 MB cada uno.', dropZone: true, multiple: true,
        files: [{ id: 1, name: 'cedula-identidad-frente.jpg', status: 'complete' }, { id: 2, name: 'comprobante-domicilio-marzo.pdf', status: 'uploading' }, { id: 3, name: 'liquidacion-sueldo.heic', status: 'error', error: 'Formato no permitido. Sube un PDF o JPG.' }] })));` }),

  scene('file-uploader', 'style', 'anatomía acotada', 'file-uploader-medidas',
    'Medidas de FileUploader: alto de la zona, borde punteado y radio, alto de cada archivo y separación entre archivos.',
    { js: `mount(h('div', { style: { width: '28rem', padding: '40px 170px 56px 150px' } }, h(A.FileUploader, { title: 'Documentos', description: 'PDF o JPG, hasta 5 MB.', dropZone: true, multiple: true, files: [{ id: 1, name: 'cedula-frente.jpg', status: 'complete' }, { id: 2, name: 'cedula-reverso.jpg', status: 'complete' }] })));`,
      after: `var z = $('.alma-upload__zone'), f = all('.alma-upload__file'); if (z) { dimH(z, 'right'); rad(z, box(z).x - 130, box(z).y); } if (f[0]) dimH(f[0], 'right'); if (f[1]) gapY(f[0], f[1], box(f[0]).x - 130);` }),

  // ---------- PaymentCard ----------
  scene('payment-card', 'usage', 'la tarjeta en los cuatro estados', 'payment-card-estados',
    'PaymentCard en sus cuatro estados sobre el azul noche de marca: pendiente, activando, habilitada y activa.',
    { js: `mount(h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '24px', padding: '32px', background: 'var(--brand-ink)', borderRadius: 'var(--radius-panel)' } },
        h(A.PaymentCard, { brand: 'C.WalletPay', status: 'pending', last4: '0000' }), h(A.PaymentCard, { brand: 'C.WalletPay', status: 'activating', last4: '0637' }),
        h(A.PaymentCard, { brand: 'C.WalletPay', status: 'enabled', last4: '7637' }), h(A.PaymentCard, { brand: 'C.WalletPay', status: 'active', number: '5432  8765  7654  7637', expiry: '08/29' })));` }),

  scene('payment-card', 'style', 'anatomía acotada', 'payment-card-medidas',
    'Medidas de PaymentCard: ancho de 311 px, alto mínimo de 190 px, relleno, radio y chip de 34 × 24 px.',
    { js: `mount(h('div', { style: { padding: '56px 180px 64px 150px', background: 'var(--brand-ink)' } }, h(A.PaymentCard, { brand: 'C.WalletPay', status: 'active', number: '5432  8765  7654  7637', expiry: '08/29' })));`,
      after: `var c = $('.alma-paycard'), ch = $('.alma-paycard__chip'); dimW(c, 'bottom'); dimH(c, 'right'); padL(c); if (ch) dimW(ch, 'top', null, { d: box(ch).y - box(c).y + 16 }); rad(c, box(c).x + box(c).w + 16, box(c).y - 20);` }),

  // ---------- ProductCard ----------
  scene('product-card', 'usage', 'la tarjeta cerrada y abierta', 'product-card-tono',
    'ProductCard en el tono rojo, cerrada y abierta.',
    { js: `var body = 'El pasaje incluye una maleta de hasta 25 kg en la bodega y un bolso de mano. Puedes cambiar la fecha hasta 4 horas antes de la salida.';
      mount(h('div', { className: 'row', style: { gap: 'var(--space-32)', alignItems: 'flex-start' } },
        h('div', { className: 'col', style: { width: '20rem' } }, h('p', { className: 'cap web-label-m' }, 'Cerrada'), h(A.ProductCard, { title: 'Condiciones del pasaje', subtitle: 'Semicama', tone: 'red' }, body)),
        h('div', { className: 'col', style: { width: '20rem' } }, h('p', { className: 'cap web-label-m' }, 'Abierta'), h(A.ProductCard, { title: 'Condiciones del pasaje', subtitle: 'Semicama', tone: 'red', defaultOpen: true }, body))));` }),

  scene('product-card', 'style', 'anatomía acotada', 'product-card-medidas',
    'Medidas de ProductCard: relleno, botón para abrir y cerrar, separación entre encabezado y cuerpo, y radio.',
    { js: `mount(h('div', { style: { width: '22rem', padding: '56px 180px 56px 150px' } }, h(A.ProductCard, { title: 'Condiciones del pasaje', subtitle: 'Semicama', tone: 'red', defaultOpen: true }, 'Incluye una maleta de hasta 25 kg y un bolso de mano.')));`,
      after: `var c = $('.alma-pcard'), hd = $('.alma-pcard__head'), bd = $('.alma-pcard__body'), tg = $('.alma-pcard__toggle'); padL(hd || c); if (tg) dimW(tg, 'top'); if (hd && bd) gapY(hd, bd, box(c).x + box(c).w + 16); rad(c, box(c).x + box(c).w + 16, box(c).y);` })
];
