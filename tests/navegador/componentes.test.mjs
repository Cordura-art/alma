// How the components behave, in a real browser: keyboard, focus, what is announced. `npm run test:componentes`.
// Apart from `npm test` because it needs Chromium (Playwright) and the network (React, from the same CDN as the pictures).
// Each test mounts the real bundle with ALMA's styles and drives it as a person would.
import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const CDN = 'https://cdnjs.cloudflare.com/ajax/libs';
const css = readFileSync('dist/css/alma.css', 'utf8') + readFileSync('artifact/project/components/bundle.css', 'utf8');
const bundle = readFileSync('artifact/project/components/bundle.js', 'utf8');
let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser.close(); });

// A page with one scene: `js` renders into #root with h, A (AlmaDS) and React at hand; window.log collects what the scene reports.
async function escena(js, { ancho = 1100, alto = 800 } = {}) {
  const p = await browser.newPage({ viewport: { width: ancho, height: alto } }); const errores = [];
  p.on('pageerror', (e) => errores.push(e.message));
  await p.setContent(`<!doctype html><html lang="es" data-theme="dark"><head><meta charset="utf-8"><style>${css} body{margin:0;padding:24px;background:var(--ui-02);color:var(--text-01)}</style></head><body><div id="root"></div>
<script src="${CDN}/react/18.3.1/umd/react.production.min.js"></script><script src="${CDN}/react-dom/18.3.1/umd/react-dom.production.min.js"></script><script>${bundle}</script>
<script>var h = React.createElement, A = AlmaDS; window.log = []; function monta(el) { ReactDOM.createRoot(document.getElementById('root')).render(el); }\n${js}</script></body></html>`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(150);
  return { p, errores, foco: () => p.evaluate(() => (document.activeElement.getAttribute('aria-label') || document.activeElement.textContent || '').trim()), log: () => p.evaluate(() => window.log) };
}
const fin = async (s) => { assert.deepEqual(s.errores, [], 'la página no tuvo errores'); await s.p.close(); };

test('menú: flechas, submenú de un nivel, búsqueda por letra, y Esc devuelve el foco al botón', async () => {
  const s = await escena(`monta(h(A.PullDownButton, { label: 'Ver', title: 'Mis viajes', onAction: function (v) { log.push(v); }, actions: [
    { value: 'orden', label: 'Ordenar por', items: [{ value: 'fecha', label: 'Fecha', checked: true, radio: true }, { value: 'precio', label: 'Precio', checked: false, radio: true }] },
    { value: 'solo', label: 'Solo los pagados', checked: false }, '-', { value: 'actualizar', label: 'Actualizar', shortcut: 'Ctrl+R' }] }));`);
  const { p } = s; await p.locator('.alma-popup__btn').focus(); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(80);
  assert.equal(await s.foco(), 'Ordenar por');
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(80); assert.equal(await s.foco(), 'Fecha', '→ entra al submenú');
  assert.equal(await p.locator('.alma-menu--sub [role=menuitemradio]').count(), 2);
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(80); assert.equal(await s.foco(), 'Ordenar por', '← vuelve a su ítem');
  await p.keyboard.press('a'); await p.waitForTimeout(80); assert.match(await s.foco(), /^Actualizar/, 'una letra va al ítem que empieza con ella');
  await p.keyboard.press('ArrowUp'); await p.waitForTimeout(80); assert.equal(await s.foco(), 'Solo los pagados', '↑ salta el separador');
  await p.keyboard.press('Enter'); await p.waitForTimeout(80); assert.deepEqual(await s.log(), ['solo']);
  assert.equal(await p.locator('.alma-menu').count(), 0); assert.equal(await s.foco(), 'Ver', 'el foco vuelve al botón');
  await fin(s);
});

test('menú contextual: muestra solo lo que aplica, se abre con el teclado y Esc devuelve el foco', async () => {
  const s = await escena(`monta(h(A.ContextMenu, { label: 'Acciones', onAction: function (v) { log.push(v); }, items: [{ value: 'ver', label: 'Ver pasaje', disabled: true }, { value: 'compartir', label: 'Compartir' }, '-', { value: 'anular', label: 'Anular viaje', role: 'destructive' }] }, h('button', { id: 'fila' }, 'Viaje a Viña')));`);
  const { p } = s; await p.locator('#fila').click({ button: 'right' }); await p.waitForTimeout(150);
  assert.deepEqual(await p.locator('.alma-menu--point [role=menuitem]').allTextContents(), ['Compartir', 'Anular viaje'], 'lo que no aplica no aparece');
  assert.equal(await s.foco(), 'Compartir');
  await p.keyboard.press('Escape'); await p.waitForTimeout(80); assert.equal(await s.foco(), 'Viaje a Viña');
  await p.evaluate(() => document.getElementById('fila').dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 0, clientY: 0 }))); await p.waitForTimeout(150);
  await p.keyboard.press('End'); await p.keyboard.press('Enter'); await p.waitForTimeout(80); assert.deepEqual(await s.log(), ['anular']);
  await fin(s);
});

test('hoja de acción: lo que destruye va primero, cancelar recibe el foco y Esc cancela', async () => {
  const s = await escena(`function App() { var o = React.useState(false); return h('div', null, h('button', { id: 'abre', onClick: function () { o[1](true); } }, 'Cerrar el mensaje'),
    h(A.ActionSheet, { open: o[0], title: '¿Qué hacemos con el borrador?', actions: [{ label: 'Guardar', onPress: function () {} }, { label: 'Descartar', role: 'destructive', onPress: function () {} }, { label: 'Seguir', role: 'cancel', onPress: function () { log.push('cancel'); o[1](false); } }] })); } monta(h(App));`);
  const { p } = s; await p.locator('#abre').click(); await p.waitForTimeout(150);
  assert.deepEqual(await p.locator('.alma-asheet button').allTextContents(), ['Descartar', 'Guardar', 'Seguir']);
  assert.equal(await s.foco(), 'Seguir', 'Enter no destruye nada');
  await p.keyboard.press('Escape'); await p.waitForTimeout(150); assert.deepEqual(await s.log(), ['cancel']); assert.equal(await s.foco(), 'Cerrar el mensaje');
  await fin(s);
});

test('caja de pedido: vacía no envía, Enter envía, Mayúsculas + Enter salta de línea, y ocupada detiene con su botón y con Esc', async () => {
  const s = await escena(`function App() { var b = React.useState(false); return h(A.PromptInput, { busy: b[0], onSubmit: function (t) { log.push('envía:' + t); b[1](true); }, onStop: function () { log.push('detiene'); b[1](false); } }); } monta(h(App));`);
  const { p } = s, t = p.locator('.alma-prompt__input'), btn = p.locator('.alma-prompt__send');
  assert.equal(await btn.isDisabled(), true); assert.equal(await btn.getAttribute('aria-label'), 'Enviar');
  await t.click(); await t.pressSequentially('uno'); await p.keyboard.press('Shift+Enter'); await t.pressSequentially('dos');
  assert.match(await t.inputValue(), /uno\ndos/);
  const m = await p.evaluate(() => { const a = document.querySelector('.alma-prompt__send').getBoundingClientRect(), x = document.querySelector('.alma-prompt .alma-field__box').getBoundingClientRect(); return [Math.round(x.bottom - a.bottom), Math.round(x.right - a.right)]; });
  assert.equal(m[0], m[1], 'el botón tiene el mismo margen abajo y a la derecha');
  await p.keyboard.press('Enter'); await p.waitForTimeout(80);
  assert.equal(await t.inputValue(), ''); assert.equal(await btn.getAttribute('aria-label'), 'Detener la respuesta'); assert.equal(await t.evaluate((e) => document.activeElement === e), true, 'el foco se queda en la caja');
  await p.keyboard.press('Escape'); await p.waitForTimeout(80); assert.deepEqual(await s.log(), ['envía:uno\ndos', 'detiene']);
  await fin(s);
});

test('una línea de pedido y su botón comparten centro', async () => {
  const s = await escena(`monta(h(A.PromptInput, { defaultValue: 'hola' }));`);
  const c = await s.p.evaluate(() => { const t = document.querySelector('.alma-prompt__input').getBoundingClientRect(), b = document.querySelector('.alma-prompt__send').getBoundingClientRect(); return Math.abs((t.top + t.height / 2) - (b.top + b.height / 2)); });
  assert.ok(c <= 1, 'desfase de ' + c + ' px'); await fin(s);
});

test('respuesta de la IA: ocupada mientras llega, anunciada una vez al terminar, y con sus acciones solo entonces', async () => {
  const s = await escena(`function App() { var e = React.useState('thinking'); window.pasa = e[1]; return h(A.ChatMessage, { status: e[0], statusText: 'Buscando en tus viajes', onRetry: function () {}, onFeedback: function () {} }, e[0] === 'thinking' ? null : h('p', null, 'Tu bus sale a las 08:30.')); } monta(h(App));`);
  const { p } = s, st = p.locator('.alma-msg [role=status]');
  assert.equal(await st.textContent(), 'Buscando en tus viajes'); assert.equal(await p.locator('.alma-msg').getAttribute('aria-busy'), 'true');
  await p.evaluate(() => window.pasa('writing')); await p.waitForTimeout(80); assert.equal(await p.locator('.alma-msg__actions').count(), 0, 'sin acciones mientras se escribe');
  await p.evaluate(() => window.pasa('done')); await p.waitForTimeout(80);
  assert.equal(await st.textContent(), 'Tu bus sale a las 08:30.'); assert.equal(await p.locator('.alma-msg').getAttribute('aria-busy'), null);
  assert.deepEqual(await p.locator('.alma-msg__actions button').evaluateAll((x) => x.map((b) => b.getAttribute('aria-label'))), ['Copiar respuesta', 'Repetir respuesta', 'Sirvió', 'No sirvió']);
  await fin(s);
});

test('marca de IA: su nombre es «Generado por IA», se abre con el teclado y Esc vuelve a ella; las fuentes se pliegan y se nombran', async () => {
  const s = await escena(`var F = [1,2,3,4,5,6,7].map(function (n) { return { title: 'Fuente número ' + n, href: '#' }; });
    monta(h('div', null, h(A.AILabel, { what: 'Resumí tu pasaje.', when: 'Hoy, 09:12' }), h(A.SourceList, { id: 'f', sources: F })));`);
  const { p } = s, m = p.locator('.alma-ailabel');
  assert.match(await m.evaluate((e) => [...e.querySelectorAll(':scope > :not([aria-hidden])')].map((x) => x.textContent).join('')), /Generado por IA/);
  await m.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(100); assert.equal(await m.getAttribute('aria-expanded'), 'true');
  await p.keyboard.press('Escape'); await p.waitForTimeout(100); assert.equal(await m.getAttribute('aria-expanded'), 'false'); assert.equal(await m.evaluate((e) => document.activeElement === e), true);
  assert.equal(await p.locator('.alma-sources li').count(), 3); await p.locator('.alma-sources button').click(); await p.waitForTimeout(100);
  assert.equal(await p.locator('.alma-sources li').count(), 7); assert.equal(await s.foco(), 'Fuente 4: Fuente número 4', 'el foco va a la primera que apareció');
  await fin(s);
});

test('ventana: se mueve y cambia de tamaño con el teclado, no se sale por la izquierda, y la que se toca pasa al frente', async () => {
  const s = await escena(`monta(h(A.Desktop, { style: { height: '600px' } },
    h(A.Window, { title: 'Viajes', defaultPosition: { x: 40, y: 32 }, defaultSize: { w: 320, h: 240 }, onClose: function () {} }, h('p', null, 'uno')),
    h(A.Window, { title: 'Notas', defaultPosition: { x: 300, y: 120 }, defaultSize: { w: 320, h: 240 }, onClose: function () {} }, h('p', null, 'dos'))));`);
  const { p } = s, v = p.locator('.alma-window', { has: p.locator('.alma-window__title', { hasText: 'Viajes' }) }), activa = () => p.locator('.alma-window.is-active .alma-window__title').textContent();
  assert.equal(await activa(), 'Notas', 'la última en abrirse está al frente');
  await v.locator('.alma-window__body').click({ position: { x: 10, y: 150 } }); await p.waitForTimeout(80); assert.equal(await activa(), 'Viajes');
  const a = await v.boundingBox(); await v.locator('.alma-window__bar').focus(); await p.keyboard.press('ArrowRight'); await p.keyboard.press('Shift+ArrowDown'); const b = await v.boundingBox();
  assert.equal(Math.round(b.x - a.x), 16); assert.equal(Math.round(b.height - a.height), 16);
  for (let i = 0; i < 12; i++) await p.keyboard.press('ArrowLeft'); const e = await p.locator('.alma-desktop__stage').boundingBox(), c = await v.boundingBox();
  assert.equal(Math.round(c.x - e.x), 0, 'los controles siguen a la vista');
  assert.equal(await v.locator('button').first().getAttribute('aria-label'), 'Cerrar Viajes');
  await fin(s);
});

test('ventana: avisa cuando pasa al frente y cuando deja de estarlo (así el asistente trae su Halo)', async () => {
  const s = await escena(`monta(h(A.Desktop, { style: { height: '600px' } },
    h(A.Window, { title: 'Viajes', defaultPosition: { x: 20, y: 20 }, defaultSize: { w: 300, h: 200 } }, 'a'),
    h(A.Window, { title: 'Asistente', defaultPosition: { x: 360, y: 20 }, defaultSize: { w: 300, h: 200 }, onActiveChange: function (v) { log.push(v); } }, 'b')));`);
  const { p } = s; assert.equal((await s.log()).at(-1), true, 'la última en abrirse está al frente');
  await p.locator('.alma-window', { hasText: 'Viajes' }).locator('.alma-window__bar').click({ position: { x: 150, y: 10 } }); await p.waitForTimeout(80);
  assert.equal((await s.log()).at(-1), false, 'otra ventana pasó al frente');
  await p.locator('.alma-window', { hasText: 'Asistente' }).locator('.alma-window__bar').click({ position: { x: 150, y: 10 } }); await p.waitForTimeout(80);
  assert.equal((await s.log()).at(-1), true);
  await fin(s);
});

test('escenario: ampliado y al frente no tiene fondo propio, esconde las ventanas de atrás y avisa; al perder el frente lo recupera', async () => {
  const s = await escena(`monta(h(A.Desktop, { style: { height: '600px' } },
    h(A.Window, { title: 'Viajes', defaultPosition: { x: 20, y: 20 }, defaultSize: { w: 300, h: 200 } }, 'a'),
    h(A.Window, { title: 'Asistente', kind: 'stage', defaultPosition: { x: 360, y: 20 }, defaultSize: { w: 300, h: 200 }, onZoomChange: function (v) { log.push(v); } }, h('button', { id: 'otra', onClick: function () {} }, 'b'))));`);
  const { p } = s, as = p.locator('.alma-window--stage'), vi = p.locator('.alma-window', { hasText: 'Viajes' });
  const fondo = () => as.evaluate((e) => getComputedStyle(e).backgroundColor);
  assert.notEqual(await fondo(), 'rgba(0, 0, 0, 0)', 'flotando es una ventana como las demás');
  await p.getByRole('button', { name: 'Ampliar Asistente' }).click(); await p.waitForTimeout(100);
  assert.equal((await s.log()).at(-1), true); assert.equal(await fondo(), 'rgba(0, 0, 0, 0)');
  assert.equal(await vi.evaluate((e) => getComputedStyle(e).visibility), 'hidden', 'la de atrás espera fuera de la vista');
  await p.getByRole('button', { name: 'Restaurar Asistente' }).click(); await p.waitForTimeout(100);
  assert.equal((await s.log()).at(-1), false); assert.equal(await vi.evaluate((e) => getComputedStyle(e).visibility), 'visible');
  await fin(s);
});

test('tarjeta de pago: parte oculta, muestra y oculta al pedirlo, copia avisando; y una bloqueada no ofrece mostrar nada', async () => {
  const s = await escena(`monta(h('div', null, h(A.PaymentCard, { brand: 'Cordura', status: 'active', number: '5432 8765 7654 7637', holder: 'Camila Rojas', expiry: '08/29', cvv: '417', onReveal: function (v) { log.push(v); } }),
    h(A.PaymentCard, { id: 'b', brand: 'Cordura', status: 'blocked', number: '5432 8765 7654 4821' })));`);
  const { p } = s, cara = p.locator('.alma-paycard__face').first();
  assert.equal(await cara.getAttribute('aria-label'), 'Tarjeta Cordura terminada en 7 6 3 7, activa');
  assert.doesNotMatch(await cara.innerText(), /5432|417|08\/29/, 'los datos parten ocultos');
  await p.getByRole('button', { name: 'Mostrar datos' }).click(); await p.waitForTimeout(80);
  assert.match(await cara.innerText(), /5432 8765 7654 7637/); assert.match(await cara.innerText(), /417/); assert.deepEqual(await s.log(), [true]);
  await p.getByRole('button', { name: 'Copiar número' }).click(); await p.waitForTimeout(80);
  assert.equal((await p.locator('[role=status]').first().innerText()).trim(), 'Número copiado');
  await p.getByRole('button', { name: 'Ocultar datos' }).click(); await p.waitForTimeout(80);
  assert.doesNotMatch(await cara.innerText(), /5432/); assert.equal(await p.getByRole('button', { name: /datos/ }).count(), 1, 'la bloqueada no ofrece mostrar');
  await fin(s);
});

test('tarjeta de producto: un solo enlace, la acción con el nombre del producto, y la rebaja dicha con palabras', async () => {
  const s = await escena(`monta(h('div', null, h(A.ProductCard, { href: '#p', title: 'Parlante Andén', price: '$39.990', previousPrice: '$54.990', rating: { value: 4, count: 312 }, action: { label: 'Agregar', onPress: function () { log.push('agregar'); } } }),
    h(A.ProductCard, { href: '#e', title: 'Estuche de carga', price: '$19.990', unavailable: true })));`);
  const { p } = s, c = p.locator('.alma-pcard').first();
  assert.equal(await c.locator('a').count(), 1); assert.equal(await p.getByRole('article', { name: 'Parlante Andén' }).count(), 1);
  assert.equal((await c.locator('.alma-pcard__price').textContent()).replace(/\s+/g, ' ').trim(), 'Antes $54.990, ahora $39.990');
  await p.getByRole('button', { name: 'Agregar: Parlante Andén' }).click(); assert.deepEqual(await s.log(), ['agregar']);
  const off = p.locator('.alma-pcard').nth(1); assert.equal(await off.getByRole('button').count(), 0); assert.match(await off.innerText(), /Agotado/);
  await fin(s);
});

test('escritorio angosto: una ventana a la vez; barra de menús y dock con una sola parada de Tab', async () => {
  const s = await escena(`monta(h(A.Desktop, { style: { height: '600px' },
    menuBar: h(A.MenuBar, { appName: 'Viajes', menus: [{ label: 'Viajes', items: ['Acerca de'] }, { label: 'Archivo', items: ['Nuevo'] }, { label: 'Ver', items: ['Ordenar'] }] }),
    dock: h(A.Dock, { items: [{ id: 'a', label: 'Viajes', icon: 'ticket', running: true }, { id: 'b', label: 'Notas', icon: 'document', badge: 2 }] }) },
    h(A.Window, { title: 'Viajes' }, 'uno'), h(A.Window, { title: 'Notas' }, 'dos')));`, { ancho: 420 });
  const { p } = s;
  assert.deepEqual(await p.locator('.alma-window:not([hidden]) .alma-window__title').allTextContents(), ['Notas']);
  assert.equal(await p.locator('.alma-dock__app[tabindex="0"]').count(), 1); assert.equal(await p.locator('.alma-menubar__title[tabindex="0"]').count(), 1);
  assert.deepEqual(await p.locator('.alma-dock__app').evaluateAll((x) => x.map((b) => b.getAttribute('aria-label'))), ['Viajes, abierta', 'Notas, 2 sin ver']);
  await s.p.setViewportSize({ width: 1100, height: 800 }); await p.waitForTimeout(200);
  await p.locator('.alma-menubar__title').first().focus(); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(100);
  assert.equal(await p.locator('.alma-menubar__title.is-open').textContent(), 'Archivo');
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(100); assert.equal(await p.locator('.alma-menubar__title.is-open').textContent(), 'Ver', '→ pasa al menú de al lado');
  await fin(s);
});

test('lista: una fila se elige, su interruptor toma su nombre, y al editar el foco sigue al trabajo', async () => {
  const s = await escena(`function App() { var f = React.useState([{ id: 'v', title: 'Viña' }, { id: 't', title: 'Talca' }, { id: 'm', title: 'Temuco' }]), o = React.useState('a'), w = React.useState(false);
    function mv(id, d) { var l = f[0].slice(), i = l.findIndex(function (x) { return x.id === id; }), x = l.splice(i, 1)[0]; l.splice(i + d, 0, x); f[1](l); }
    return h('div', null, h(A.List, { 'aria-label': 'Orden', selection: 'single', selectionStyle: 'check', selected: o[0], onSelect: o[1], items: [{ id: 'a', title: 'Fecha' }, { id: 'b', title: 'Precio' }] }),
      h(A.List, { 'aria-label': 'Avisos', items: [{ title: 'Ofertas', switch: { checked: w[0], onChange: w[1] } }] }),
      h(A.List, { 'aria-label': 'Favoritos', editing: true, items: f[0], onMove: mv, onDelete: function (id) { f[1](f[0].filter(function (x) { return x.id !== id; })); } })); } monta(h(App));`);
  const { p } = s, L = (i) => p.locator('.alma-list').nth(i);
  await L(0).locator('button', { hasText: 'Precio' }).click(); assert.equal(await L(0).locator('[aria-pressed=true]').textContent(), 'Precio');
  const sw = L(1).locator('[role=switch]'); await sw.click(); assert.equal(await sw.getAttribute('aria-checked'), 'true');
  assert.equal(await sw.evaluate((e) => document.getElementById(e.getAttribute('aria-labelledby')).textContent), 'Ofertas');
  await L(2).locator('button[aria-label="Bajar Viña"]').click(); await p.waitForTimeout(100);
  assert.deepEqual(await L(2).locator('.alma-list__title').allTextContents(), ['Talca', 'Viña', 'Temuco']); assert.equal(await L(2).locator('[role=status]').textContent(), 'Viña: lugar 2 de 3'); assert.equal(await s.foco(), 'Bajar Viña');
  await L(2).locator('button[aria-label="Eliminar Talca"]').click(); await p.waitForTimeout(100); assert.equal(await s.foco(), 'Eliminar Viña', 'el foco queda en la fila que tomó su lugar');
  await fin(s);
});

test('entrada de dígitos y campo de fichas: un solo campo con nombre, y cada cambio se anuncia', async () => {
  const s = await escena(`monta(h('div', null, h(A.DigitEntry, { label: 'Código', onComplete: function (v) { log.push(v); } }),
    h(A.TokenField, { label: 'Compartir con', validate: function (v) { return /@/.test(v); } })));`);
  const { p } = s, d = p.locator('.alma-digits__input');
  assert.equal(await p.locator('.alma-digits input').count(), 1); assert.equal(await p.locator('label[for="' + await d.getAttribute('id') + '"]').textContent(), 'Código');
  await d.focus(); await p.keyboard.type('12a3'); assert.equal(await d.inputValue(), '123', 'solo dígitos');
  await d.fill('482913'); assert.deepEqual(await s.log(), ['482913']);
  const t = p.locator('.alma-tokens__input'), st = p.locator('.alma-tokens [role=status]'); await t.focus(); await p.keyboard.type('ana@correo.cl,'); await p.waitForTimeout(80);
  assert.equal(await p.locator('.alma-tokens .alma-tag').count(), 1); assert.equal(await st.textContent(), 'Agregaste ana@correo.cl');
  await p.keyboard.type('mal'); await p.keyboard.press('Enter'); await p.waitForTimeout(80); assert.equal(await st.textContent(), 'mal no es válido'); assert.equal(await t.inputValue(), 'mal', 'lo que no vale se queda para corregirlo');
  await t.fill(''); await p.keyboard.press('Backspace'); assert.equal(await s.foco(), 'Quitar ana@correo.cl');
  await p.keyboard.press('Enter'); await p.waitForTimeout(80); assert.equal(await p.locator('.alma-tokens .alma-tag').count(), 0); assert.equal(await t.evaluate((e) => document.activeElement === e), true);
  await fin(s);
});

test('árbol, columnas y divisor: se recorren con las flechas', async () => {
  const s = await escena(`var T = [{ id: 'v', label: 'Viajes', children: [{ id: 'a', label: '2026', children: [{ id: 'm', label: 'Marzo' }] }] }, { id: 'p', label: 'Pagos' }];
    monta(h('div', null, h(A.Outline, { label: 'Cuenta', items: T }), h(A.ColumnView, { label: 'Cuenta', items: T, defaultPath: ['v'] }),
      h(A.SplitView, { style: { height: '200px' }, primary: 'lista', detail: 'detalle' })));`);
  const { p } = s, filas = () => p.locator('.alma-outline [role=treeitem]').count();
  await p.locator('.alma-outline [role=treeitem]').first().focus(); assert.equal(await filas(), 2);
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(80); assert.equal(await filas(), 3, '→ abre');
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(80); assert.equal(await s.foco(), '2026', '→ entra'); assert.equal(await p.locator('.alma-outline [role=treeitem]').nth(1).getAttribute('aria-level'), '2');
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(80); assert.equal(await s.foco(), 'Viajes', '← sube a la que la contiene');
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(80); assert.equal(await filas(), 2, '← cierra');
  assert.equal(await p.locator('.alma-columns__col').count(), 2); await p.locator('.alma-columns__col').first().locator('[role=option]').first().focus(); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(120); assert.equal(await s.foco(), '2026');
  const bar = p.locator('.alma-split__bar'); await bar.focus(); await p.keyboard.press('ArrowRight'); assert.equal(await bar.getAttribute('aria-valuenow'), '296');
  await fin(s);
});

test('medidor y valoración dicen su valor con palabras', async () => {
  const s = await escena(`function App() { var v = React.useState(0); return h('div', null, h(A.Gauge, { label: 'Asientos ocupados', value: 32, max: 44, valueLabel: '32 de 44' }), h(A.Rating, { value: 4.5, count: 1284 }), h(A.Rating, { label: 'Tu viaje', value: v[0], onChange: v[1] })); } monta(h(App));`);
  const { p } = s, m = p.locator('[role=meter]');
  assert.equal(await m.getAttribute('aria-valuetext'), '32 de 44'); assert.equal(await m.getAttribute('aria-valuemax'), '44');
  assert.equal(await p.locator('.alma-rating__stars').getAttribute('aria-label'), '4,5 de 5 estrellas');
  await p.locator('[role=radiogroup] button').first().focus(); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(80);
  assert.equal(await p.locator('[role=radiogroup] [aria-checked=true]').getAttribute('aria-label'), '2 estrellas');
  await fin(s);
});
