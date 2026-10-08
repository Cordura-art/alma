// Scenes for the pattern guides (docs/patterns/<file>.md). Each scene names the «Imagen pendiente» marker it replaces
// (the pattern file and the start of its text); scripts/build-images.mjs photographs them with the real components.
// Same page helpers as componentes.mjs: h, A, D, num, dimH, dimW, gapX, gapY, st, themes, device, textOf, all, $.

const scene = (doc, marker, file, alt, rest) => ({ doc, marker, file: `Patrones/${file}`, alt, ...rest });

// A screen of the ALMA travel app, reused as the ground under the dialog layers.
const TRIPS = `h('div', { style: { padding: '24px', display: 'grid', gap: '16px' } }, h('h1', { className: 'web-h4', style: { margin: 0 } }, 'Mis viajes'),
  h(A.Card, { headingLevel: 2, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14' }),
  h(A.Card, { headingLevel: 2, eyebrow: '4 abr 2026 · 19:10', title: 'Viña del Mar → Santiago', subtitle: 'Salón cama · asiento 3' }))`;

export const patternScenes = [
  // ---------- Formularios ----------
  scene('1-formularios', 'formulario de datos del pasajero', 'formularios-estructura',
    'Formulario de datos del pasajero en una columna: el grupo Pasajero (nombre y RUT) y el grupo Contacto (correo y teléfono opcional), con 16 px entre campos, 24 px entre grupos y el botón «Continuar al pago» al final.',
    { js: `function group(title, fields) { return h('div', { className: 'col grp', style: { gap: 'var(--space-16)' } }, h('h3', { className: 'web-h6', style: { margin: 0 } }, title), fields); }
      mount(h('div', { style: { padding: '8px 120px 8px 0' } }, h('form', { className: 'pane col', style: { width: '24rem', gap: 'var(--space-24)' } },
        h('h2', { className: 'web-h5', style: { margin: 0 } }, 'Datos del pasajero'),
        group('Pasajero', [h(A.TextInput, { key: 1, label: 'Nombre y apellido', defaultValue: 'Camila Rojas' }), h('div', { key: 2, style: { width: '12rem' } }, h(A.TextInput, { label: 'RUT', defaultValue: '15.482.331-7' }))]),
        group('Contacto', [h(A.TextInput, { key: 1, label: 'Correo', type: 'email', defaultValue: 'camila@correo.cl', helper: 'Te enviaremos el pasaje aquí' }), h(A.TextInput, { key: 2, label: 'Teléfono (opcional)', type: 'tel' })]),
        h('div', null, h(A.Button, { variant: 'filled', role: 'primary', type: 'submit' }, 'Continuar al pago')))));`,
      after: `var g = all('.grp'), f = all('.alma-field'); var r = box($('form')).x + box($('form')).w + 16; gapY(f[0], f[1], r); gapY(g[0], g[1], r);` }),

  scene('1-formularios', 'un campo en reposo', 'formularios-validacion',
    'El mismo campo de correo en cuatro momentos: en reposo, con su ayuda, con el error «Escribe un correo con @» en rojo y con ícono, y corregido.',
    { js: `function step(t, props) { return h('div', { className: 'col', style: { gap: 'var(--space-16)', width: '18rem' } }, h('p', { className: 'cap web-label-m' }, t), h(A.TextInput, Object.assign({ label: 'Correo', type: 'email' }, props))); }
      mount(h('div', { className: 'row', style: { gap: 'var(--space-32)', alignItems: 'flex-start' } },
        step('En reposo', {}), step('Con ayuda', { helper: 'Te enviaremos el pasaje aquí' }),
        step('Con error', { defaultValue: 'camila.correo.cl', error: 'Escribe un correo con @' }), step('Corregido', { defaultValue: 'camila@correo.cl', helper: 'Te enviaremos el pasaje aquí' })));` }),

  // ---------- Estados vacíos ----------
  scene('2-estados-vacios', 'los cuatro casos', 'estados-vacios-casos',
    'Los cuatro estados vacíos lado a lado: primera vez («Aún no tienes viajes», con «Buscar pasajes»), sin resultados («No encontramos viajes a Talca el 31 de marzo», con «Quitar filtros»), sin permiso (sin acción) y sin conexión (con «Reintentar»).',
    { js: `var C = [['Primera vez', 'ticket', 'Aún no tienes viajes', 'Aquí verás los pasajes que compres.', { label: 'Buscar pasajes', icon: 'search' }],
        ['Sin resultados', 'search', 'No encontramos viajes a Talca el 31 de marzo', 'Prueba con otra fecha o quita algún filtro.', { label: 'Quitar filtros' }],
        ['Sin permiso', 'locked', 'No tienes acceso a esta billetera', 'Pídele acceso a quien la administra.'],
        ['Sin conexión', 'wifi--off', 'Sin conexión', 'Revisa tu conexión y vuelve a intentarlo.', { label: 'Reintentar', icon: 'renew' }]];
      mount(h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 18rem)', gap: 'var(--space-24)' } }, C.map(function (c) {
        return h('div', { key: c[0], className: 'col', style: { gap: 'var(--space-8)' } }, h('p', { className: 'cap web-label-m' }, c[0]),
          h('div', { className: 'pane', style: { minHeight: '22rem', display: 'grid', alignContent: 'center' } }, h(A.EmptyState, { icon: c[1], title: c[2], message: c[3], action: c[4] }))); })));` }),

  // ---------- Notificaciones ----------
  scene('3-notificaciones', 'la escala de peso', 'notificaciones-peso',
    'La escala de peso de las notificaciones, de menos a más: el error de un campo, una InlineNotification, un callout, un Tip, un toast y una Alert que exige respuesta.',
    { js: `function step(n, t, child) { return h('div', { key: n, className: 'col', style: { gap: 'var(--space-8)' } }, h('p', { className: 'cap web-label-m' }, n + ' · ' + t), child); }
      function pane(child) { return h('div', { className: 'pane', style: { width: '26rem', minHeight: '13rem', boxSizing: 'border-box', display: 'grid', alignContent: 'center' } }, child); }
      var al = "mount(h(A.Alert, { open: true, title: '¿Anular el pasaje?', message: 'Te devolvemos $7.000 a tu billetera.', actions: [{ label: 'Cancelar', role: 'cancel' }, { label: 'Anular', role: 'destructive' }] }));";
      mount(h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 'var(--space-32) var(--space-24)', alignItems: 'start' } },
        step(1, 'Error de campo', pane(h(A.TextInput, { label: 'Correo', defaultValue: 'camila.correo.cl', error: 'Escribe un correo con @' }))),
        step(2, 'InlineNotification', pane(h(A.InlineNotification, { status: 'error', title: 'No se pudo cobrar', message: 'Revisa la tarjeta o usa otra.', actionLabel: 'Reintentar' }))),
        step(3, 'Callout', pane(h(A.InlineNotification, { kind: 'callout', status: 'info', title: 'Ten a mano tu carnet', message: 'Te lo pedirán al subir al bus.' }))),
        step(4, 'Tip', pane(h(A.Tip, { icon: 'idea', title: 'Activa la recarga automática', message: 'Así nunca te quedas sin pasaje.' }))),
        step(5, 'Toast', pane(h(A.InlineNotification, { kind: 'toast', status: 'success', title: 'Pago aprobado', message: 'Tu pasaje está en tu billetera.' }))),
        step(6, 'Alert', device({ w: 384, h: 208, js: al }))));` }),

  // ---------- Carga ----------
  scene('4-carga', 'una lista de viajes cargando', 'carga-skeleton',
    'La vista Mis viajes mientras carga, con Skeleton en el lugar de cada tarjeta, y la misma vista con los datos.',
    { js: `function sk(i) { return h('div', { key: i, className: 'pane col', style: { gap: 'var(--space-8)' } }, h('div', { style: { width: '40%' } }, h(A.Skeleton, { lines: 1 })), h(A.Skeleton, { lines: 2 })); }
      function view(t, body) { return h('div', { className: 'col', style: { width: '24rem', gap: 'var(--space-8)' } }, h('p', { className: 'cap web-label-m' }, t),
        h('div', { className: 'col', style: { gap: 'var(--space-16)' } }, h('h2', { className: 'web-h5', style: { margin: 0 } }, 'Mis viajes'), body)); }
      mount(h('div', { className: 'row', style: { gap: 'var(--space-40)', alignItems: 'flex-start' } },
        view('Cargando', h('div', { className: 'col', 'aria-busy': 'true', style: { gap: 'var(--space-16)' } }, [0, 1, 2].map(sk))),
        view('Con los datos', h('div', { className: 'col', style: { gap: 'var(--space-16)' } },
          h(A.Card, { headingLevel: 3, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14' }),
          h(A.Card, { headingLevel: 3, eyebrow: '4 abr 2026 · 19:10', title: 'Viña del Mar → Santiago', subtitle: 'Salón cama · asiento 3' }),
          h(A.Card, { headingLevel: 3, eyebrow: '14 abr 2026 · 07:00', title: 'Santiago → Rancagua', subtitle: 'Semicama · asiento 22' })))));` }),

  // ---------- Búsqueda y filtros ----------
  scene('5-busqueda-y-filtros', 'búsqueda con sugerencias', 'busqueda-sugerencias',
    'Un SearchField con el texto de ejemplo «Buscar viajes, ciudades o terminales», en dos momentos: mientras se escribe «Ta», con las sugerencias recientes abiertas, y antes de escribir, con el alcance Todo, Viajes y Pagos debajo del campo.',
    { js: `var sugg = [{ label: 'Talca', icon: 'time' }, { label: 'Talcahuano', icon: 'time' }, { label: 'Terminal Alameda', icon: 'location' }];
      function col(t, k, props) { return h('div', { className: 'col', 'data-s': k, style: { width: '28rem', gap: 'var(--space-16)' } }, h('p', { className: 'cap web-label-m' }, t),
        h(A.SearchField, Object.assign({ placeholder: 'Buscar viajes, ciudades o terminales', suggestionsTitle: 'Búsquedas recientes', suggestions: sugg, scopes: ['Todo', 'Viajes', 'Pagos'], defaultScope: 'Todo' }, props))); }
      mount(h('div', { className: 'row', style: { gap: 'var(--space-64)', alignItems: 'flex-start', paddingBottom: '9rem' } }, col('Mientras escribe', 'a', { defaultValue: 'Ta' }), col('Antes de escribir: el alcance', 'b', {})));`,
      after: `var inp = $('[data-s="a"] .alma-search__input'); inp.focus(); inp.dispatchEvent(new Event('focus', { bubbles: true })); await sleep(200);` }),

  // ---------- Diálogos ----------
  scene('6-dialogos', 'las cuatro capas', 'dialogos-capas',
    'Las cuatro capas sobre la misma pantalla de Mis viajes: un Modal para cambiar el nombre del pasajero, un Sheet para compartir el viaje, una Alert que pregunta si anular el pasaje y un Popover que explica la tasa de embarque sin bloquear la página.',
    { js: `var base = ${JSON.stringify(TRIPS)};
      var L = [['Modal · tarea breve con foco', "mount(h('div', null, " + base + ", h(A.Modal, { open: true, title: 'Cambiar el nombre del pasajero', description: 'Debe coincidir con el carnet que mostrarás al subir.', secondaryAction: { label: 'Cancelar' }, primaryAction: { label: 'Guardar' } }, h(A.TextInput, { label: 'Nombre y apellido', defaultValue: 'Camila Rojas' }))));"],
        ['Sheet · opciones al alcance del pulgar', "mount(h('div', null, " + base + ", h(A.Sheet, { open: true, title: 'Compartir viaje', size: 'sm' }, h(A.List, { 'aria-label': 'Opciones para compartir', items: [{ icon: 'copy', title: 'Copiar enlace', onClick: function () {} }, { icon: 'email', title: 'Enviar por correo', onClick: function () {} }] }))));"],
        ['Alert · exige respuesta', "mount(h('div', null, " + base + ", h(A.Alert, { open: true, title: '¿Anular el pasaje?', message: 'Te devolvemos $7.000 a tu billetera.', actions: [{ label: 'Cancelar', role: 'cancel' }, { label: 'Anular', role: 'destructive' }] })));"],
        ['Popover · no bloquea', "mount(h('div', { style: { padding: '24px', display: 'grid', gap: '16px' } }, h('h1', { className: 'web-h4', style: { margin: 0 } }, 'Mis viajes'), h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, h('span', { className: 'web-body-m' }, 'Total del próximo viaje $7.000'), h(A.Popover, { open: true, title: '¿Qué es la tasa de embarque?', content: h('p', { style: { margin: 0 } }, 'La cobra el terminal por usar sus andenes. Va incluida en el total.') }, h(A.Button, { variant: 'plain', icon: 'information', 'aria-label': 'Qué incluye el total' }))), h(A.Card, { headingLevel: 2, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14' }), h(A.Card, { headingLevel: 2, eyebrow: '4 abr 2026 · 19:10', title: 'Viña del Mar → Santiago', subtitle: 'Salón cama · asiento 3' })));"]];
      mount(h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 'var(--space-32)' } }, L.map(function (l) { return device({ key: l[0], label: l[0], w: 600, h: 520, js: l[1] }); })));` }),

  // ---------- Acciones ----------
  scene('7-acciones', 'una vista con una acción', 'acciones-prominencia',
    'Una vista de pasaje con una acción filled «Pagar $7.000», dos gray «Cambiar asiento» y «Compartir», y el menú «Más» abierto con «Anular pasaje» al final, separada y en rojo.',
    { js: `mount(h('div', { style: { padding: '0 0 14rem' } }, h('div', { className: 'pane col', style: { width: '36rem', gap: 'var(--space-16)' } },
        h('p', { className: 'cap web-label-s', style: { margin: 0 } }, '31 mar 2026 · 08:30'), h('h2', { className: 'web-h5', style: { margin: 0 } }, 'Santiago → Viña del Mar'),
        h('p', { className: 'cap web-body-m', style: { margin: 0 } }, 'Semicama · asiento 14. Paga antes de 15 minutos para no perder el asiento.'),
        h('div', { className: 'row', style: { gap: 'var(--space-8)', alignItems: 'center' } },
          h(A.Button, { variant: 'filled', role: 'primary' }, 'Pagar $7.000'), h(A.Button, { variant: 'gray' }, 'Cambiar asiento'), h(A.Button, { variant: 'gray' }, 'Compartir'),
          h(A.PullDownButton, { icon: 'overflow-menu--horizontal', 'aria-label': 'Más acciones', actions: [{ value: 'dl', label: 'Descargar', icon: 'download' }, { value: 'mail', label: 'Enviar por correo', icon: 'email' }, { value: 'del', label: 'Anular pasaje', icon: 'trash-can', role: 'destructive' }] })))));`,
      after: `$('.alma-popup__btn').click(); await sleep(250);` }),

  // ---------- Desactivado y solo lectura ----------
  scene('8-desactivado-y-solo-lectura', 'un botón desactivado', 'desactivado-explicacion',
    'El botón «Cambiar fecha» desactivado y, junto a él, la explicación «Disponible desde el 1 de abril» con un ícono de información.',
    { js: `mount(h('div', { className: 'pane col', style: { width: '32rem', gap: 'var(--space-16)' } },
        h('h2', { className: 'web-h6', style: { margin: 0 } }, 'Cambio de fecha'), h('p', { className: 'cap web-body-m', style: { margin: 0 } }, 'Puedes cambiar la fecha de este pasaje una vez, sin costo.'),
        h('div', { className: 'row', style: { gap: 'var(--space-16)', alignItems: 'center' } }, h(A.Button, { variant: 'gray', disabled: true }, 'Cambiar fecha'),
          h('p', { className: 'web-body-s', style: { margin: 0, display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-02)' } }, h(A.Icon, { name: 'information', size: 16 }), 'Disponible desde el 1 de abril'))));` }),

  // ---------- Contenido que desborda ----------
  scene('9-contenido-que-desborda', 'una celda recortada', 'desborda-celda',
    'Una tabla de pasajes cuya columna Ruta recorta en el medio los nombres largos, conservando el principio y el final; al pasar el cursor por la celda se ve el texto completo.',
    { js: `var rows = [{ id: 1, f: '31 mar', r: 'Terminal Rodoviario de Puerto Montt → Terminal Alameda de Santiago', m: '$32.000' }, { id: 2, f: '28 mar', r: 'Santiago → Viña del Mar', m: '$7.000' }, { id: 3, f: '14 mar', r: 'Terminal Sur de Santiago → Terminal de Buses de Valdivia', m: '$24.500' }];
      mount(h('div', { style: { width: '40rem', padding: '0 0 6rem' } }, h(A.Table, { title: 'Mis pasajes', headingLevel: 3, columns: [{ key: 'f', label: 'Fecha' }, { key: 'r', label: 'Ruta', maxChars: 30 }, { key: 'm', label: 'Precio', align: 'end' }], rows: rows })));`,
      after: `var c = all('.alma-table tbody tr')[0].children[1].querySelector('span'); st(c.closest('tr'), 'hover');
        var b = box(c), tip = document.createElement('div'); tip.className = 'full'; tip.textContent = c.title; tip.style.left = (b.x + 24) + 'px'; tip.style.top = (b.y + b.h + 12) + 'px'; document.getElementById('shot').appendChild(tip);`,
      css: `.full { position: absolute; z-index: 2147483001; max-width: 26rem; padding: 6px 10px; border-radius: var(--radius-chip); background: var(--ui-04); color: var(--text-01); border: 1px solid var(--border-subtle); font-size: 0.8125rem; line-height: 1.3; box-shadow: 0 8px 24px rgb(0 0 0 / 0.3); }` }),

  // ---------- Encabezado global ----------
  scene('10-encabezado-global', 'la misma app en el teléfono', 'encabezado-global',
    'La misma app en dos pantallas. En el teléfono: Toolbar arriba con el título Mis viajes y TabBar abajo. En escritorio: Toolbar arriba con el buscador y Sidebar a la izquierda con los mismos destinos.',
    { js: `var tbar = "h(A.Toolbar, { title: 'Mis viajes', search: SEARCH, actions: [{ label: 'Nuevo viaje', icon: 'add' }, { label: 'Cuenta', icon: 'user--avatar' }] })";
      var cards = "h(A.Card, { headingLevel: 2, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14' }), h(A.Card, { headingLevel: 2, eyebrow: '4 abr 2026 · 19:10', title: 'Viña del Mar → Santiago', subtitle: 'Salón cama · asiento 3' })";
      var dest = "[{ value: 'inicio', label: 'Inicio', icon: 'home' }, { value: 'viajes', label: 'Viajes', icon: 'ticket' }, { value: 'billetera', label: 'Billetera', icon: 'wallet', badge: 3 }, { value: 'cuenta', label: 'Cuenta', icon: 'user' }]";
      var phone = "mount(h('div', null, " + tbar.replace('SEARCH', 'null') + ", h('main', { style: { padding: '16px', display: 'grid', gap: '16px' } }, " + cards + "), h('div', { style: { position: 'absolute', left: 0, right: 0, bottom: 0 } }, h(A.TabBar, { label: 'Secciones', defaultValue: 'viajes', items: " + dest + " }))));";
      var desk = "mount(h('div', null, " + tbar.replace('SEARCH', "h(A.SearchField, { placeholder: 'Buscar viajes' })") + ", h('div', { style: { display: 'flex', gap: '24px', padding: '16px 24px' } }, h(A.Sidebar, { label: 'Secciones', defaultValue: 'viajes', groups: [{ items: " + dest + " }] }), h('main', { style: { flex: 1, display: 'grid', gap: '16px', alignContent: 'start', paddingTop: '52px' } }, " + cards + "))));";
      mount(h('div', { className: 'row', style: { gap: 'var(--space-40)', alignItems: 'flex-end' } }, device({ label: 'Teléfono', w: 390, h: 720, js: phone }), device({ label: 'Escritorio', w: 1180, h: 620, js: desk })));` }),

  // ---------- Inicio de sesión ----------
  scene('11-inicio-de-sesion', 'la pantalla de ingreso', 'inicio-de-sesion',
    'La pantalla de ingreso en el teléfono, en tema oscuro: título «Ingresa a tu cuenta», campos de correo y contraseña con su ojo, el enlace «¿Olvidaste tu contraseña?», el botón «Ingresar» y, abajo, el enlace para crear una cuenta.',
    { js: `var s = "mount(h('form', { style: { padding: '72px 0 32px', display: 'grid', gap: '24px' } }, h('h1', { className: 'web-h3', style: { margin: 0 } }, 'Ingresa a tu cuenta'), h('div', { style: { display: 'grid', gap: '16px' } }, h(A.TextInput, { label: 'Correo', type: 'email', autoComplete: 'username', defaultValue: 'camila@correo.cl' }), h(A.TextInput, { label: 'Contraseña', type: 'password', autoComplete: 'current-password', defaultValue: 'ejemplo-de-clave' }), h('div', null, h(A.Link, { href: '#' }, '¿Olvidaste tu contraseña?'))), h(A.Button, { variant: 'filled', role: 'primary', size: 'md', type: 'submit' }, 'Ingresar'), h('p', { className: 'web-body-m', style: { margin: 0, textAlign: 'center', color: 'var(--text-02)' } }, '¿No tienes cuenta? ', h(A.Link, { href: '#' }, 'Crea una'))));";
      mount(device({ w: 390, h: 720, js: s, theme: 'dark', after: "all('.alma-field').forEach(function (f) { f.style.width = '100%'; });" }));` }),

  // ---------- Indicadores de estado ----------
  scene('12-indicadores-de-estado', 'los cuatro íconos de estado', 'indicadores-estado',
    'Los cuatro íconos de estado rellenos con su palabra, en tema oscuro y claro: error, advertencia, éxito e información. Cada uno tiene una forma distinta, así se distinguen sin color.',
    { js: `var S = [['error', 'error', 'Error'], ['warning', 'warning', 'Advertencia'], ['checkmark--outline', 'success', 'Éxito'], ['information', 'info', 'Información']];
      mount(themes(['dark', 'light'], function () { return h('div', { className: 'col', style: { gap: 'var(--space-16)', width: '22rem' } }, S.map(function (s) {
        return h('div', { key: s[1], className: 'row', style: { gap: 'var(--space-8)', alignItems: 'center' } }, h(A.Icon, { name: s[0], variant: 'filled', size: 24, color: 'var(--status-icon-' + s[1] + ')' }), h('span', { className: 'web-body-m' }, s[2]), h('span', { className: 'tok', style: { marginLeft: 'auto' } }, 'status-icon-' + s[1])); })); }));` }),

  // ---------- Barra de texto ----------
  scene('13-barra-de-texto', 'un campo de nota con la barra', 'barra-de-texto',
    'Un campo de nota con la barra de formato arriba, en el mismo contenedor: negrita (activa), cursiva y subrayado; lista con viñetas y numerada; y enlace. El tooltip de la negrita dice «Negrita (⌘B)».',
    { js: `function b(icon, label, sel) { return h(A.Button, { key: icon, variant: 'plain', icon: icon, 'aria-label': label, selected: !!sel }); }
      mount(h('div', { style: { padding: '56px 0 0' } }, h('div', { className: 'ed' },
        h('div', { className: 'row', role: 'toolbar', 'aria-label': 'Formato del texto', style: { gap: 'var(--space-4)', alignItems: 'center' } },
          h(A.Tooltip, { text: 'Negrita (⌘B)' }, b('text--bold', 'Negrita', true)), b('text--italic', 'Cursiva'), b('text--underline', 'Subrayado'), h('span', { className: 'sep' }),
          b('list--bulleted', 'Lista con viñetas'), b('list--numbered', 'Lista numerada'), h('span', { className: 'sep' }), b('link', 'Enlace')),
        h(A.Textarea, { label: 'Nota para el conductor', defaultValue: 'Viajo con una silla de ruedas plegable. Necesito ayuda para subirla al maletero en el andén 14.' }))));`,
      after: `$('.alma-tooltip').classList.add('is-open');`,
      css: `.ed { width: 34rem; display: grid; gap: var(--space-8); padding: var(--space-8); border-radius: var(--radius-panel); background: var(--ui-01); border: 1px solid var(--border-subtle); } .sep { width: 1px; height: 24px; margin: 0 var(--space-8); background: var(--border-subtle); }` }),

  // ---------- Estilos fluidos ----------
  scene('14-estilos-fluidos', 'un campo vacío, enfocado y con texto', 'estilos-fluidos-etiqueta',
    'La etiqueta del campo Correo en cada estado: vacío, dentro del campo; enfocado, arriba y con el texto de ejemplo visible; con texto, arriba; y con error, arriba en rojo.',
    { js: `function step(t, props, k) { return h('div', { className: 'col', 'data-k': k, style: { gap: 'var(--space-16)', width: '18rem' } }, h('p', { className: 'cap web-label-m' }, t), h(A.TextInput, Object.assign({ label: 'Correo', type: 'email', placeholder: 'nombre@correo.cl' }, props))); }
      mount(h('div', { className: 'row', style: { gap: 'var(--space-32)', alignItems: 'flex-start' } },
        step('Vacío', {}, 'a'), step('Enfocado', {}, 'b'), step('Con texto', { defaultValue: 'camila@correo.cl' }, 'c'), step('Con error', { defaultValue: 'camila.correo.cl', error: 'Escribe un correo con @' }, 'd')));`,
      after: `var i = $('[data-k="b"] input'); i.focus(); st(i.closest('.alma-field__box'), 'focus-within'); await sleep(200);` }),

  // ---------- Divulgación ----------
  scene('15-divulgacion', 'una pantalla de pasaje', 'divulgacion',
    'Una pantalla de pasaje en el teléfono: el resumen a la vista (ruta, fecha, asiento y total) y, debajo, las condiciones del pasaje en un Accordion con la sección Cambios abierta.',
    { js: `var s = "mount(h('div', null, h(A.Toolbar, { title: 'Tu pasaje', onBack: function () {}, backLabel: 'Volver' }), h('main', { style: { padding: '16px', display: 'grid', gap: '24px' } }, h(A.Card, { headingLevel: 2, eyebrow: '31 mar 2026 · 08:30', title: 'Santiago → Viña del Mar', subtitle: 'Semicama · asiento 14 · Total $7.000' }), h('div', { style: { display: 'grid', gap: '8px' } }, h('h2', { className: 'web-h6', style: { margin: 0 } }, 'Condiciones del pasaje'), h(A.Accordion, { headingLevel: 3, defaultOpen: ['cambio'], items: [{ id: 'cambio', title: 'Cambios', content: 'Puedes cambiar la fecha una vez, sin costo, hasta 4 horas antes de la salida.' }, { id: 'dev', title: 'Devoluciones', content: 'Te devolvemos el 85 % si anulas hasta 4 horas antes.' }, { id: 'eq', title: 'Equipaje', content: 'Una maleta de hasta 25 kg en la bodega y un bolso de mano.' }] })))));";
      mount(device({ w: 390, h: 720, js: s }));` }),

  // ---------- Portada ----------
  scene('16-portada', 'anatomía de una portada', 'portada-anatomia',
    'Anatomía de una portada: el nombre grande detrás (1), la figura de puntos al centro (2), la entrada con su frase, su botón y su pista abajo a la izquierda (3), un dato sobre su recuadro a la derecha (4) y el botón de tema arriba a la derecha (5).',
    { css: `.pt { position: relative; width: 54rem; height: 32rem; background: var(--ui-02); border: 1px solid var(--border-subtle); overflow: hidden; }
      .pt__palabra { position: absolute; left: 0; right: 0; top: 16%; display: grid; place-items: center; margin: 0; }
      .pt__palabra span { font-size: 11rem; line-height: 1; font-weight: var(--font-weight-display); letter-spacing: -0.03em; color: var(--text-01); }
      .pt__figura { position: absolute; left: 50%; top: 44%; width: 10rem; height: 14rem; transform: translate(-50%, -50%); border-radius: 46% 46% 38% 38%; background-color: var(--ui-02); background-image: radial-gradient(circle, var(--text-01) 1.3px, transparent 1.7px); background-size: 8px 8px; }
      .pt__entrada { position: absolute; left: var(--space-24); bottom: var(--space-24); width: 13rem; gap: var(--space-16); padding: var(--space-16); }
      .pt__entrada p { margin: 0; }
      .pt__dato { position: absolute; right: var(--space-24); bottom: var(--space-24); width: 12rem; padding: var(--space-16); }
      .pt__dato p { margin: 0; }
      .pt__tema { position: absolute; right: var(--space-16); top: var(--space-16); }`,
      js: `mount(h('div', { style: { padding: '48px 56px' } }, h('div', { className: 'pt' },
        h('p', { className: 'pt__palabra' }, h('span', null, 'Nombre')),
        h('div', { className: 'pt__figura' }),
        h('div', { className: 'pane col pt__entrada' }, h('p', { className: 'web-body-l' }, 'Una idea, en dos líneas.'), h('div', null, h(A.Button, { variant: 'filled', size: 'sm' }, 'Una sola acción')), h('p', { className: 'cap web-body-s' }, 'Una pista de qué hacer')),
        h('div', { className: 'pane pt__dato' }, h('p', { className: 'web-body-m' }, 'Un dato, en una frase completa.')),
        h('div', { className: 'pt__tema' }, h(A.Button, { variant: 'plain', icon: 'light', 'aria-label': 'Usar tema claro' })))));`,
      after: `num($('.pt__palabra span'), 1, 'left', { outline: false }); num($('.pt__figura'), 2, 'bottom', { outline: false }); num($('.pt__entrada'), 3, 'left'); num($('.pt__dato'), 4, 'right'); num($('.pt__tema'), 5, 'right');` })
];
