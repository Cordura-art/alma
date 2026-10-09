// Scenes for the guide «Interfaces de IA» (docs/guides/ia). Its pages name their pictures directly
// (assets/Guias/<file>.png). A scene with efectos: true gets the effects' code (site/efectos) besides the bundle,
// so the presence of an AI — Velo behind, Halo in front — is the real thing, alive on the site and still in the picture.
// The four AI components (AILabel, PromptInput, ChatMessage, SourceList) have their pictures here too.
// Same page helpers as componentes.mjs: h, A, D, num, device, all, $, sleep.

const scene = (file, alt, rest) => ({ file: `Guias/${file}`, alt, ...rest });
const comp = (file, alt, rest) => ({ file: `Componentes/${file}`, alt, ...rest });

// The light is AlmaEfectos.presencia (site/efectos.js): the Halo of a state over the Velo.
const LUZ = `function luz(el, estado) { if (window.AlmaEfectos) AlmaEfectos.presencia(el, estado); }  // every scene of the guide shows the AI in front: with its Halo`;

const CSS = `.ia { width: 26rem; display: grid; gap: var(--space-24); }
.ia-escenario { height: 15rem; border-radius: var(--radius-panel); overflow: hidden; background: var(--ui-02); }
.ia-chips { display: flex; flex-wrap: wrap; gap: var(--space-8); }
.ia-hilo { margin: 0; padding: 0; display: grid; gap: var(--space-16); align-content: start; }`;

// The parts shared by the scenes: the real components, with the travel app's content.
const PARTES = `
  var F = [{ title: 'Tu pasaje del 31 de marzo', origin: 'Tus viajes', href: '#' }, { title: 'Aviso de la empresa, 29 de marzo', origin: 'Correo', href: '#' }];
  function caja(o) { o = o || {}; return h(A.PromptInput, { placeholder: 'Pregunta por tus viajes', busy: o.enCurso, defaultValue: o.texto, note: o.nota }); }
  function pedido() { return h(A.ChatMessage, { as: 'li', from: 'user' }, '¿A qué hora sale mi bus?'); }
  function texto(id) { return h('p', null, 'Tu bus a Viña del Mar sale el martes 31 de marzo a las 08:30, del andén 4 del Terminal Alameda.', h(A.SourceRef, { n: 1, listId: id }), ' Llega 15 minutos antes: la empresa avisó que el andén puede cambiar.', h(A.SourceRef, { n: 2, listId: id })); }
  function respuesta(o) { o = o || {}; return h(A.ChatMessage, Object.assign({ as: 'li', sources: F, sourcesId: 'f', onRetry: function () {}, onFeedback: function () {} }, o), o.status === 'thinking' || o.status === 'error' ? null : (o.parcial ? h('p', null, o.parcial) : texto('f'))); }`;

export const iaScenes = [
  // ---------- Presencia ----------
  scene('ia-presencia', 'Un panel de asistente. Arriba, una zona con el Velo y, sobre él, el Halo: un anillo de luz con su estela. Debajo, sobre fondo liso, el saludo «¿En qué te ayudo?», tres sugerencias y la caja para escribir el pedido.',
    { efectos: true, css: CSS,
      js: `${LUZ}${PARTES}
      mount(h('div', { className: 'ia pane' }, h('div', { className: 'ia-escenario', 'aria-hidden': true }),
        h('div', { className: 'col', style: { gap: 'var(--space-16)' } }, h('h2', { className: 'web-h4', style: { margin: 0 } }, '¿En qué te ayudo?'),
          h('div', { className: 'ia-chips' }, ['¿A qué hora sale mi bus?', 'Cambiar mi pasaje', 'Buses a Talca mañana'].map(function (t) { return h(A.Tag, { key: t, onClick: function () {} }, t); }))),
        caja()));`,
      after: `luz($('.ia-escenario'), 'reposo'); await sleep(4000);` }),

  scene('ia-presencia-estados', 'Cuatro escenarios pequeños, uno por estado. En reposo: un anillo amplio que late. Escuchando: un anillo abierto y casi quieto. Pensando: un anillo más chico, con más puntas y la estela muy enroscada. Respondiendo: un anillo parejo que late suave.',
    { efectos: true, css: CSS + ` .ia-escenario.ch { width: 13rem; height: 13rem; }`,
      js: `${LUZ}
      var E = [['reposo', 'En reposo', 'Está, y espera'], ['escuchando', 'Escuchando', 'Te escucho'], ['pensando', 'Pensando', 'Buscando en tus viajes'], ['respondiendo', 'Respondiendo', 'Escribiendo la respuesta']];
      mount(h('div', { className: 'row' }, E.map(function (e) { return h('div', { key: e[0], className: 'col', style: { gap: 'var(--space-8)' } }, h('p', { className: 'cap web-label-m' }, e[1]),
        h('div', { className: 'ia-escenario ch', 'data-estado': e[0], 'aria-hidden': true }), h('p', { className: 'web-body-s', style: { margin: 0 } }, e[2])); })));`,
      after: `all('.ia-escenario').forEach(function (el) { luz(el, el.getAttribute('data-estado')); }); await sleep(4500);` }),

  // ---------- Transparencia ----------
  scene('ia-marca', 'Una tarjeta con el resumen de un viaje. Junto al título está la marca «IA» (1). El texto generado va debajo (2), con sus fuentes numeradas (3). La marca está abierta y muestra su explicación (4): qué es, con qué se hizo y cuándo.',
    { click: '.alma-ailabel', css: CSS + ` .ia-tit { display: flex; align-items: center; justify-content: space-between; gap: var(--space-8); } .ia-tit h2 { margin: 0; } .ia.mar { width: 30rem; } .mar .ia-cuerpo { max-width: 19rem; display: grid; gap: var(--space-16); }`,
      js: `${PARTES}
      mount(h('div', { style: { padding: '40px 300px 96px 56px' } }, h('div', { className: 'ia pane mar', style: { gap: 'var(--space-16)' } },
        h('div', { className: 'ia-tit' }, h('h2', { className: 'web-h5' }, 'Resumen de tu viaje'),
          h(A.AILabel, { what: 'Resumí tu pasaje y los avisos de la empresa.', when: 'Hoy, 09:12', review: 'Revisa la hora de salida antes de viajar.', detailHref: '#' })),
        h('div', { className: 'ia-cuerpo web-body-m' }, texto('f'), h(A.SourceList, { id: 'f', sources: F })))));`,
      after: `await sleep(200); num($('.alma-ailabel'), 1, 'top'); num($('.ia-cuerpo p'), 2, 'left', { outline: false, d: 20 }); num($('.alma-sources'), 3, 'left', { outline: false, d: 20 }); num($('.alma-popover'), 4, 'right');` }),

  // ---------- Conversación ----------
  scene('ia-conversacion', 'Un asistente en un teléfono, con sus partes numeradas. Arriba, la cabecera con el nombre «Asistente» y el botón para empezar de nuevo (1). El mensaje de la persona, a la derecha (2). La respuesta, a todo el ancho (3), con sus fuentes (4) y sus acciones: copiar, repetir y valorar (5). Abajo, las sugerencias para seguir (6), la caja de pedido con su botón de enviar (7) y el aviso «La IA puede equivocarse» (8).',
    { css: CSS + ` .ia.tel { width: 22.5rem; min-height: 38rem; grid-template-rows: auto 1fr auto; } .ia-cab { display: flex; align-items: center; justify-content: space-between; } .ia-cab h2 { margin: 0; }`,
      js: `${PARTES}
      mount(h('div', { style: { padding: '0 48px' } }, h('div', { className: 'ia tel pane' },
        h('div', { className: 'ia-cab' }, h('h2', { className: 'web-h6' }, 'Asistente'), h(A.Button, { variant: 'plain', icon: 'edit', 'aria-label': 'Nueva conversación' })),
        h('div', { className: 'col', style: { gap: 'var(--space-16)' } }, h('ol', { className: 'ia-hilo' }, pedido(), respuesta()),
          h('div', { className: 'ia-chips' }, ['¿Y el último de vuelta?', 'Ver mi pasaje'].map(function (t) { return h(A.Tag, { key: t, onClick: function () {} }, t); }))),
        caja())));`,
      after: `num($('.ia-cab'), 1, 'left'); num($('.alma-msg__bubble'), 2, 'right'); num($('.alma-msg__body'), 3, 'left'); num($('.alma-sources'), 4, 'left'); num($('.alma-msg__actions'), 5, 'right'); num($('.ia-chips'), 6, 'left'); num($('.alma-prompt .alma-field__box'), 7, 'left'); num($('.alma-prompt__note'), 8, 'right');` }),

  // ---------- Estados ----------
  scene('ia-estados', 'La misma respuesta en cuatro momentos. Pensando: un indicador y el texto «Buscando en tus viajes». Escribiendo: la respuesta a medias y el botón «Detener». Terminada: la respuesta completa, con sus fuentes y sus acciones. Con error: un aviso «No pude terminar la respuesta», con el botón «Reintentar».',
    { css: CSS + ` .ia.est { width: 19rem; min-height: 27rem; grid-template-rows: 1fr auto; gap: var(--space-16); }`,
      js: `${PARTES}
      function paso(t, o, enCurso) { return h('div', { className: 'col', style: { gap: 'var(--space-16)' } }, h('p', { className: 'cap web-label-m' }, t),
        h('div', { className: 'ia est pane' }, h('ol', { className: 'ia-hilo' }, pedido(), respuesta(o)), caja({ enCurso: enCurso, nota: false }))); }
      mount(h('div', { className: 'row' },
        paso('Pensando', { status: 'thinking', statusText: 'Buscando en tus viajes' }, true),
        paso('Escribiendo', { status: 'writing', parcial: 'Tu bus a Viña del Mar sale el martes 31 de marzo a las' }, true),
        paso('Terminada', {}),
        paso('Con error', { status: 'error', error: 'Se cortó la conexión.' })));` }),

  // ---------- Control ----------
  scene('ia-control', 'Dos momentos de control. A la izquierda, una sugerencia: un borrador de mensaje con la marca «IA» y los botones «Usar», «Editar» y «Descartar». A la derecha, un permiso: «Voy a cambiar tu pasaje», con lo que cambia y lo que cuesta, y los botones «Cambiar pasaje» y «Cancelar».',
    { css: CSS + ` .ia.ctl { width: 22rem; gap: var(--space-16); } .ia-tit { display: flex; align-items: center; justify-content: space-between; gap: var(--space-8); } .ia-tit p, .ia-tit h2 { margin: 0; }
      .ia-sug { display: grid; gap: var(--space-16); padding: var(--space-16); border: 1px solid var(--border-subtle); border-radius: var(--radius-panel); } .ia-sug p { margin: 0; } .ia-bot { display: flex; flex-wrap: wrap; gap: var(--space-8); }
      .ia-dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: var(--space-8) var(--space-16); } .ia-dl dt { color: var(--text-02); } .ia-dl dd { margin: 0; }`,
      js: `${PARTES}
      mount(h('div', { className: 'row' },
        h('div', { className: 'col', style: { gap: 'var(--space-16)' } }, h('p', { className: 'cap web-label-m' }, 'Una sugerencia'),
          h('div', { className: 'ia ctl pane' }, h(A.Textarea, { label: 'Mensaje para quien viaja contigo', rows: 2, placeholder: 'Escribe tu mensaje' }),
            h('div', { className: 'ia-sug' }, h('div', { className: 'ia-tit' }, h('p', { className: 'web-label-m' }, 'Borrador'), h(A.AILabel)),
              h('p', { className: 'web-body-m' }, 'Hola, Tomás. Cambié nuestro bus al martes 31 a las 08:30. Sale del andén 4 del Terminal Alameda.'),
              h('div', { className: 'ia-bot' }, h(A.Button, { variant: 'filled', role: 'primary' }, 'Usar'), h(A.Button, { variant: 'tinted' }, 'Editar'), h(A.Button, { variant: 'plain' }, 'Descartar'))))),
        h('div', { className: 'col', style: { gap: 'var(--space-16)' } }, h('p', { className: 'cap web-label-m' }, 'Un permiso'),
          h('div', { className: 'ia ctl pane' }, h('h2', { className: 'web-h5', style: { margin: 0 } }, 'Voy a cambiar tu pasaje'),
            h('dl', { className: 'ia-dl web-body-m' }, h('dt', null, 'Antes'), h('dd', null, 'Lunes 30 de marzo, 08:30'), h('dt', null, 'Ahora'), h('dd', null, 'Martes 31 de marzo, 08:30'), h('dt', null, 'Diferencia'), h('dd', null, '$2.500, con tu tarjeta terminada en 4821')),
            h('p', { className: 'web-body-s', style: { margin: 0, color: 'var(--text-02)' } }, 'Después del cambio no se puede volver a la fecha anterior.'),
            h('div', { className: 'ia-bot' }, h(A.Button, { variant: 'filled', role: 'primary' }, 'Cambiar pasaje'), h(A.Button, { variant: 'tinted' }, 'Cancelar'))))));` }),

  // ---------- The components ----------
  comp('ai-label-anatomia', 'Anatomía de AILabel: el ícono (1) y el texto «IA» (2) forman la marca. Abierta, muestra su explicación (3) con lo que hizo y cuándo (4), qué revisar (5) y un enlace «Cómo funciona» (6).',
    { click: '.alma-ailabel',
      js: `mount(h('div', { style: { padding: '48px 360px 240px 64px' } }, h(A.AILabel, { size: 'md', what: 'Resumí tu pasaje y los avisos de la empresa.', when: 'Hoy, 09:12', review: 'Revisa la hora de salida antes de viajar.', detailHref: '#' })));`,
      after: `await sleep(200); var b = $('.alma-ailabel__body').children; num($('.alma-ailabel .alma-ico'), 1, 'top', { outline: false }); num($('.alma-ailabel .alma-tag__text'), 2, 'right', { outline: false, d: 16 }); num($('.alma-popover'), 3, 'right'); num(b[0], 4, 'left', { outline: false, d: 24 }); num(b[2], 5, 'left', { outline: false, d: 24 }); num(b[3], 6, 'left', { outline: false, d: 24 });` }),

  comp('source-list-anatomia', 'Anatomía de SourceList: junto a una frase, un número pequeño (1). Debajo, el rótulo «Fuentes» (2) y la lista: cada fuente con su número (3), su título como enlace (4) y su origen (5). Al final, el botón «Ver las 8» (6).',
    { js: `var M = ['Tu pasaje del 31 de marzo', 'Aviso de la empresa, 29 de marzo', 'Condiciones de cambio', 'Horarios del Terminal Alameda', 'Tu reserva de vuelta', 'Preguntas frecuentes', 'Mapa de andenes', 'Tarifas de marzo'].map(function (t, i) { return { title: t, origin: i % 2 ? 'Correo' : 'Tus viajes', href: '#' }; });
      mount(h('div', { className: 'col web-body-m', style: { width: '26rem', gap: 'var(--space-16)', padding: '24px 56px' } },
        h('p', { style: { margin: 0 } }, 'Tu bus sale el martes 31 de marzo a las 08:30, del andén 4.', h(A.SourceRef, { n: 1, listId: 'f' }), ' La empresa avisó que el andén puede cambiar.', h(A.SourceRef, { n: 2, listId: 'f' })),
        h(A.SourceList, { id: 'f', sources: M })));`,
      after: `var it = all('.alma-sources__item'); num($('.alma-source-ref', 1), 1, 'right', { outline: false }); num($('.alma-sources__label'), 2, 'left', { outline: false, d: 16 }); num(it[0].querySelector('.alma-sources__n'), 3, 'left', { outline: false, d: 16 }); num(it[1].querySelector('a'), 4, 'right', { outline: false }); num(it[2].querySelector('.alma-sources__origin'), 5, 'right', { outline: false }); num($('.alma-sources .alma-btn'), 6, 'right', { outline: false });` }),

  comp('chat-message-anatomia', 'Anatomía de ChatMessage: el pedido de la persona a la derecha (1). Debajo, la respuesta a todo el ancho (2), con números de fuente junto a las frases (3), la lista de fuentes (4) y las acciones de copiar, repetir y valorar (5).',
    { css: CSS, js: `${PARTES}
      mount(h('div', { style: { padding: '8px 56px' } }, h('ol', { className: 'ia-hilo', style: { width: '28rem' } }, pedido(), respuesta())));`,
      after: `num($('.alma-msg__bubble'), 1, 'right'); num($('.alma-msg__body'), 2, 'left'); num($('.alma-source-ref'), 3, 'top', { outline: false }); num($('.alma-sources'), 4, 'left'); num($('.alma-msg__actions'), 5, 'right');` }),

  comp('chat-message-estados', 'Los cinco estados de una respuesta: pensando, con un indicador y «Buscando en tus viajes»; escribiendo, con el texto a medias y un cursor; terminada, con fuentes y acciones; detenida, con la nota «Detuviste la respuesta» y «Continuar»; y con error, con un aviso y «Reintentar».',
    { css: CSS, js: `${PARTES}
      function caso(t, o) { return h('div', { className: 'col', style: { gap: 'var(--space-16)', width: '17rem' } }, h('p', { className: 'cap web-label-m' }, t), h('ol', { className: 'ia-hilo' }, respuesta(o))); }
      mount(h('div', { className: 'row', style: { gap: 'var(--space-32)' } },
        caso('Pensando', { status: 'thinking', statusText: 'Buscando en tus viajes' }), caso('Escribiendo', { status: 'writing', parcial: 'Tu bus a Viña del Mar sale el martes 31 de marzo a las' }),
        caso('Terminada', {}), caso('Detenida', { status: 'stopped', parcial: 'Tu bus a Viña del Mar sale el martes 31 de marzo', onContinue: function () {} }), caso('Con error', { status: 'error', error: 'Se cortó la conexión.' })));` }),

  comp('prompt-input-anatomia', 'Anatomía de PromptInput, dos veces. Arriba, en reposo: el rótulo «Tu pedido» (1), el campo con un pedido escrito (2), el botón de enviar (3) y el aviso «La IA puede equivocarse» (4). Abajo, mientras llega una respuesta: el mismo botón es ahora «Detener».',
    { css: CSS, js: `${PARTES}
      mount(h('div', { className: 'col', style: { width: '30rem', gap: 'var(--space-32)', padding: '24px 56px 8px' } },
        h('div', { className: 'col', style: { gap: 'var(--space-16)' } }, h('p', { className: 'cap web-label-m' }, 'En reposo'), caja({ texto: '¿A qué hora sale mi bus a Viña del Mar?' })),
        h('div', { className: 'col', style: { gap: 'var(--space-16)' } }, h('p', { className: 'cap web-label-m' }, 'Mientras llega la respuesta'), caja({ enCurso: true }))));`,
      after: `num($('.alma-prompt .alma-field__label'), 1, 'right', { outline: false }); num($('.alma-prompt__input'), 2, 'left', { outline: false, d: 28 }); num($('.alma-prompt__send'), 3, 'right', { d: 16 }); num($('.alma-prompt__note'), 4, 'left', { outline: false, d: 12 });` })
];
