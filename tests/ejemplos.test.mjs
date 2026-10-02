// Tests for the example pages (ejemplos/): they are built only with ALMA tokens and components, and they build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test('Ensayo Café no trae colores propios: todo color es un token de ALMA', () => {
  for (const f of ['pagina.css', 'pagina.js']) {
    const src = readFileSync(`ejemplos/ensayo-cafe/${f}`, 'utf8');
    assert.equal(src.match(/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/), null, `${f} trae un color en crudo`);
  }
});

test('Ensayo Café se arma con los valores de la Entidad Ensayo', () => {
  const out = join(mkdtempSync(join(tmpdir(), 'alma-ejemplo-')), 'ensayo-cafe.html');
  execFileSync('node', ['ejemplos/ensayo-cafe/build.mjs', out]);
  const html = readFileSync(out, 'utf8');
  assert.match(html, /^<title>Ensayo Café<\/title>/);
  assert.match(html, /--interactive-01:\s*#D5025D/i, 'el acento de la entidad');
  assert.match(html, /window\.__GENERADOR_VISTAS = /, 'la firma generativa');
  assert.match(html, /window\.__GENES = \{"ensayo":/, 'los genes de la entidad');
  assert.doesNotMatch(html, /<template id="firma">/, 'ya sin la firma de barras');
  assert.equal(html.match(/<\/style>/g).length, 1);
  assert.ok(html.length < 1024 * 1024, `${(html.length / 1024) | 0} KB`);
});

// Ensayo Generativo: the procedural avatars and textures of an entity.
const { sistema, valor, THEMES } = await import('../scripts/lib/documentacion.mjs');
const Gen = await import('../entidades/generador.mjs');
const tok = JSON.parse(readFileSync('dist/json/tokens.json', 'utf8'));
const genesDe = async (id) => { const S = await sistema(id); return { S, G: Gen.genes(S, (n, th) => valor(tok, n, th)) }; };

test('Ensayo Generativo no trae colores propios: el generador y la página solo usan los de la entidad', () => {
  for (const f of [...['generador', 'emblemas', 'placa', 'campo', 'carrusel', 'micelio'].map((x) => `entidades/${x}.mjs`), 'site/generativo.js', 'ejemplos/ensayo-generativo/pagina.css', 'ejemplos/ensayo-generativo/pagina.js']) {
    const src = readFileSync(f, 'utf8');
    assert.equal(src.match(/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/), null, `${f} trae un color en crudo`);
  }
});

test('el generador lee sus reglas de la carta de la entidad', async () => {
  const { S, G } = await genesDe('ensayo');
  assert.equal(G.grupos, 2, 'definición partida: dos grupos');
  assert.equal(G.redondez, S.P.shape.base / 24, 'la redondez es la de sus esquinas');
  assert.equal(G.semilla, 'nac|2026-10-01|12:00|America/Santiago');
  assert.equal(G.pieza.acento, S.P.accent.dark['interactive-01'], 'el acento es el de la entidad');
});

test('la misma entidad y la misma clave dan siempre el mismo dibujo; otra clave u otra entidad, otro', async () => {
  const { G } = await genesDe('ensayo'), { G: C } = await genesDe('cordura');
  assert.equal(Gen.criatura(G, 'Ana Rojas'), Gen.criatura(G, '  ana rojas '));
  assert.equal(Gen.colonia(G, 7), Gen.colonia(G, 7));
  assert.notEqual(Gen.criatura(G, 'Ana Rojas'), Gen.criatura(C, 'Ana Rojas'));
  const claves = Array.from({ length: 500 }, (_, i) => `persona-${i}`);
  assert.equal(new Set(claves.map((k) => Gen.criatura(G, k))).size, 500, '500 personas, 500 criaturas distintas');
  assert.equal(new Set(claves.map((k) => Gen.colonia(G, k))).size, 500, '500 claves, 500 colonias distintas');
  // The bars were taken out at the user's request; they live on as a reference.
  assert.equal(Gen.avatar, undefined); assert.equal(Gen.textura, undefined);
});

test('sobre una textura de fondo, el texto principal y el secundario llegan a 4,5:1 en los cuatro temas', async () => {
  for (const id of ['ensayo', 'cordura', 'automata']) {
    const { S, G } = await genesDe(id);
    for (const th of THEMES) for (const c of Gen.colores(G.fondo[th.startsWith('light') ? 'light' : 'dark'])) for (const t of ['text-01', 'text-02']) {
      const r = S.En.contrast(valor(tok, t, th), c);
      assert.ok(r >= 4.5, `${id} · ${th}: ${t} sobre ${c} da ${r.toFixed(2)}:1`);
    }
  }
});

// Emblems, pictograms and creatures: the user's earlier studies, drawn with the entity's genes.
const Emb = await import('../entidades/emblemas.mjs');
const sano = (svg) => !/NaN|undefined|Infinity|\$\{/.test(svg);
const tintas = (svg) => new Set([...svg.matchAll(/(?:fill|stroke)="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1]));

test('los emblemas leen puntas, detalle, trazo, relleno, puertas y números de la carta', async () => {
  const { S, G } = await genesDe('ensayo'), { G: C } = await genesDe('cordura');
  assert.equal(G.puntas, S.E.centers.length + Number(S.E.profile[0]), 'centros definidos más línea consciente');
  assert.equal(G.complejidad, 1 + S.E.carta.canales.length, 'un nivel por canal definido');
  assert.equal(G.relleno, true, 'Garganta definida: emblemas rellenos');
  assert.equal(C.relleno, false, 'Garganta abierta: emblemas de línea');
  assert.notEqual(G.puntas, C.puntas, 'dos entidades con los mismos centros no comparten puntas');
  // Its gates, the four of its cross first, each with its active line; and its own numbers.
  assert.deepEqual(G.puertas.slice(0, 4).map((p) => p.n), [18, 17, 39, 38], 'la cruz de Ensayo abre sus puertas');
  assert.deepEqual(G.puertas[0], { n: 18, l: 5 });
  assert.equal(new Set(G.puertas.map((p) => p.n)).size, G.puertas.length, 'sin puertas repetidas');
  assert.deepEqual(G.numeros, [3, 4, 5, 7, 9]);
  assert.deepEqual(C.numeros, [4, 5, 6]);
});

test('los 32 emblemas clásicos se dibujan para cada entidad, solo con sus colores, y la misma palabra da el mismo', async () => {
  assert.equal(Emb.EMBLEMAS, 32);
  for (const id of ['ensayo', 'cordura', 'automata']) {
    const { G } = await genesDe(id), propios = new Set([G.pieza.base, ...G.pieza.barras, G.pieza.acento]);
    for (let i = 0; i < Emb.EMBLEMAS; i++) for (const k of ['borrador', 'observación', 'versión']) {
      const svg = Emb.emblema(G, k, { dibujo: i });
      assert.ok(sano(svg), `${id} · emblema ${i} · ${k}`);
      for (const c of tintas(svg)) assert.ok(propios.has(c), `${id} · emblema ${i}: ${c} no es de la entidad`);
    }
    assert.equal(Emb.emblema(G, 'Observación '), Emb.emblema(G, 'observación'));
    assert.ok(new Set(Array.from({ length: 300 }, (_, n) => Emb.emblema(G, `concepto-${n}`))).size > 290, `${id}: 300 conceptos casi no se repiten`);
  }
});

test('una criatura es un cuerpo, una segunda forma de otro color y dos ojos, siempre la misma para un nombre', async () => {
  const { G } = await genesDe('ensayo'), propios = new Set([G.pieza.base, ...G.pieza.barras, G.pieza.acento]);
  assert.equal(Gen.criatura(G, 'Ana Rojas'), Gen.criatura(G, ' ana rojas'));
  for (let i = 0; i < 300; i++) {
    const svg = Gen.criatura(G, `p${i}`), formas = [...svg.matchAll(/<(circle|ellipse)[^>]*fill="(#[0-9A-F]{6})"/g)];
    assert.ok(sano(svg));
    assert.deepEqual(formas.map((f) => f[1]), ['circle', 'ellipse', 'circle', 'circle']);
    assert.notEqual(formas[0][2], formas[1][2], `p${i}: cuerpo y segunda forma del mismo color`);
    assert.ok(formas[2][2] === G.pieza.base && formas[3][2] === G.pieza.base, 'los ojos son del color del fondo');
    for (const f of formas) assert.ok(propios.has(f[2]));
  }
});

test('una colonia es un mosaico de criaturas con dos ojos cada una, solo con los colores de su uso, y el acento en las más chicas', async () => {
  for (const id of ['ensayo', 'cordura', 'automata']) {
    const { G } = await genesDe(id);
    for (const [o, C] of [[{}, G.pieza], [{ modo: 'fondo', tema: 'dark' }, G.fondo.dark], [{ modo: 'fondo', tema: 'light' }, G.fondo.light]]) {
      const propios = new Set(Gen.colores(C));
      for (let k = 1; k <= 60; k++) {
        const svg = Gen.colonia(G, k, o), copias = [...svg.matchAll(/<g transform="translate\((-?[\d.]+) (-?[\d.]+)\)"><ellipse rx="([\d.]+)" ry="([\d.]+)"[^>]*fill="(#[0-9A-F]{6})"\/>((?:<circle[^>]*\/>)*)<\/g>/g)];
        assert.ok(sano(svg) && /width="240" height="240"/.test(svg), `${id} · colonia ${k}`);
        for (const c of tintas(svg)) assert.ok(propios.has(c), `${id} · colonia ${k}: ${c} no es de su uso`);
        assert.ok(copias.length >= 4 && copias.every((c) => (c[6].match(/<circle/g) || []).length === 2), `${id} · colonia ${k}: cada criatura lleva dos ojos`);
        // Every creature that crosses an edge of the tile has its copy on the opposite side.
        for (const [, x, y, rx, ry, c] of copias) {
          const R = Math.max(Number(rx), Number(ry)), hay = (dx, dy) => copias.some((q) => q[3] === rx && q[4] === ry && q[5] === c && Math.abs(Number(q[1]) - Number(x) - dx) < 0.11 && Math.abs(Number(q[2]) - Number(y) - dy) < 0.11);
          if (Number(x) + R > 240 && Number(x) - 240 + R > 0) assert.ok(hay(-240, 0), `${id} · colonia ${k}: falta la copia izquierda`);
          if (Number(y) + R > 240 && Number(y) - 240 + R > 0) assert.ok(hay(0, -240), `${id} · colonia ${k}: falta la copia de arriba`);
        }
        const area = (c) => Number(c[3]) * Number(c[4]), acento = copias.filter((c) => c[5] === C.acento), resto = copias.filter((c) => c[5] !== C.acento);
        assert.ok(acento.length >= 1, `${id} · colonia ${k}: sin acento`);
        if (C.barras.indexOf(C.acento) < 0) assert.ok(Math.max(...acento.map(area)) <= Math.max(...resto.map(area)), `${id} · colonia ${k}: el acento es la criatura más grande`);
      }
    }
    assert.equal(Gen.colonia(G, 3), Gen.colonia(G, 3));
  }
});

test('el campo de partículas es el mismo para la misma clave, no se sale de su caja y va al ritmo de la entidad', async () => {
  const Cam = await import('../entidades/campo.mjs');
  const { S, G } = await genesDe('ensayo'), { G: I } = await genesDe('automata');
  assert.equal(G.ritmo, S.P.motion.speed, 'el ritmo es el del tipo');
  const a = Cam.campo(G, 1, 800, 450), b = Cam.campo(G, 1, 800, 450), c = Cam.campo(G, 2, 800, 450);
  assert.equal(a.n, Math.round(800 * 450 * 0.012), 'la cantidad sigue al área');
  assert.equal(Cam.campo(G, 1, 4000, 3000).n, 9000, 'hasta el tope');
  assert.equal(Cam.campo(G, 1, 360, 200, { max: 3000 }).n, Math.round(360 * 200 * 0.012));
  const x0 = Float32Array.from(a.x);
  for (let i = 0; i < 120; i++) { a.avanzar(); b.avanzar(); c.avanzar(); }
  assert.deepEqual(a.x, b.x); assert.deepEqual(a.y, b.y);
  assert.notDeepEqual(a.x, c.x, 'otra clave, otro campo');
  assert.notDeepEqual(a.x, x0, 'las partículas se mueven');
  for (let i = 0; i < a.n; i++) assert.ok(a.x[i] >= 0 && a.x[i] <= 800 && a.y[i] >= 0 && a.y[i] <= 450 && a.color[i] < a.colores.length, `partícula ${i} fuera de la caja`);
  assert.deepEqual(a.colores, [...G.pieza.barras, G.pieza.acento]);
  const rojas = a.color.filter((k) => k === G.pieza.barras.length).length / a.n;
  assert.ok(rojas > 0.04 && rojas < 0.13, `el acento va en una de cada doce: ${rojas.toFixed(3)}`);
  // A slower entity moves less per step: Ensayo (a Projector) against Autómata's pace.
  assert.equal(a.paso, 1 / G.ritmo);
  assert.ok(G.ritmo !== I.ritmo ? a.paso !== Cam.campo(I, 1, 800, 450).paso : true);
});

test('el carrusel pone una tarjeta por punta, dibuja de atrás hacia adelante y vuelve al mismo lugar tras una vuelta', async () => {
  const Car = await import('../entidades/carrusel.mjs');
  const { G } = await genesDe('ensayo'), P = Car.carrusel(G);
  assert.equal(P.cantidad, G.puntas);
  assert.equal(P.periodo, 9 * G.ritmo, 'una vuelta al ritmo del tipo');
  const A = Car.anillo(P, 0);
  assert.equal(A.length, P.cantidad);
  assert.deepEqual(A.map((c) => c.i).sort((a, b) => a - b), Array.from({ length: P.cantidad }, (_, i) => i));
  for (let k = 1; k < A.length; k++) assert.ok(A[k - 1].z >= A[k].z, 'la más lejana primero');
  // At second 0 the first card is at the front: in the middle, at full size, upright and drawn last.
  const frente = A[A.length - 1];
  assert.equal(frente.i, 0);
  assert.ok(Math.abs(frente.x) < 1e-9 && Math.abs(frente.y) < 1e-9 && Math.abs(frente.s - 1) < 1e-9 && Math.abs(frente.giro) < 1e-9 && frente.opacidad === 1);
  const lugar = (t) => Object.fromEntries(Car.anillo(P, t).map((c) => [c.i, c]));
  const a = lugar(3.7), b = lugar(3.7 + P.periodo), c = lugar(3.7 + P.periodo / 2);
  for (let i = 0; i < P.cantidad; i++) {
    assert.ok(Math.abs(a[i].x - b[i].x) < 1e-6 && Math.abs(a[i].y - b[i].y) < 1e-6, 'una vuelta completa vuelve al mismo lugar');
    assert.ok(Math.abs(a[i].x - c[i].x) > 1e-3 || Math.abs(a[i].s - c[i].s) > 1e-3, 'a media vuelta está en otro lugar');
  }
  // Every card stays inside the stage of the page (800 × 360 units, the middle of the ring at 60 % of its height).
  for (let t = 0; t < P.periodo; t += 0.05) for (const k of Car.anillo(P, t)) {
    const w = P.tarjeta * k.s / 2, alto = w / (1901 / 1199), cos = Math.abs(Math.cos(k.giro)), sen = Math.abs(Math.sin(k.giro));
    const mx = w * cos + alto * sen, my = w * sen + alto * cos;
    assert.ok(k.s > 0 && k.s <= 1 && k.opacidad >= 0.7 && Math.abs(k.giro) <= P.inclinacion * Math.PI / 180 + 1e-9);
    assert.ok(Math.abs(k.x) + mx <= 400 && k.y - my >= -216 && k.y + my <= 144, `t=${t.toFixed(2)}: la tarjeta ${k.i} se sale del escenario`);
  }
});

test('un emblema nace de una puerta: sus trigramas eligen silueta y motivo, y la línea de la entidad, la marca', async () => {
  // The table of hexagrams is whole: 64 gates, and every pair of trigrams once.
  assert.equal(Object.keys(Emb.TRIGRAMAS_DE).length, 64);
  assert.equal(new Set(Object.values(Emb.TRIGRAMAS_DE).map((t) => t.join())).size, 64);
  assert.deepEqual(Emb.TRIGRAMAS_DE[1], [0, 0], 'cielo sobre cielo'); assert.deepEqual(Emb.TRIGRAMAS_DE[2], [4, 4], 'tierra sobre tierra');
  assert.deepEqual(Emb.TRIGRAMAS_DE[63], [6, 2], 'agua sobre fuego'); assert.deepEqual(Emb.TRIGRAMAS_DE[64], [2, 6], 'fuego sobre agua');
  assert.equal(Emb.SILUETAS.length, 8); assert.equal(Emb.MOTIVOS.length, 8);
  for (const id of ['ensayo', 'cordura', 'automata']) {
    const { G } = await genesDe(id), propios = new Set([G.pieza.base, ...G.pieza.barras, G.pieza.acento]);
    for (let n = 1; n <= 64; n++) for (let l = 1; l <= 6; l++) {
      const svg = Emb.emblemaPuerta(G, n, l);
      assert.ok(sano(svg), `${id} · puerta ${n}.${l}`);
      for (const c of tintas(svg)) assert.ok(propios.has(c), `${id} · puerta ${n}.${l}: ${c} no es de la entidad`);
    }
    // Two gates never share silhouette and motif; the same gate with another line changes only the mark.
    assert.notEqual(Emb.emblemaPuerta(G, 18, 5), Emb.emblemaPuerta(G, 17, 5));
    assert.notEqual(Emb.emblemaPuerta(G, 18, 5), Emb.emblemaPuerta(G, 18, 1));
    // A list of concepts gets a different gate each, all of them the entity's own.
    const lista = Emb.emblemasDe(G, ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']), suyas = new Set(G.puertas.map((p) => p.n));
    assert.equal(new Set(lista.map((x) => x.puerta)).size, 12, `${id}: doce conceptos, doce puertas`);
    assert.equal(new Set(lista.map((x) => TRIG(x.puerta))).size, 12, `${id}: ningún par repite silueta y motivo`);
    for (const x of lista) assert.ok(suyas.has(x.puerta) && G.puertas.some((p) => p.n === x.puerta && p.l === x.linea), `${id}: la puerta ${x.puerta} es suya, con su línea`);
    assert.deepEqual(Emb.emblemasDe(G, ['a', 'b']), Emb.emblemasDe(G, ['a', 'b']));
    assert.equal(Emb.emblema(G, 'Observación '), Emb.emblema(G, 'observación'));
  }
  // Genes without a chart still draw: the word alone picks the layers.
  const { G } = await genesDe('ensayo');
  assert.ok(sano(Emb.emblema({ ...G, puertas: [], numeros: undefined }, 'borrador')));
});
const TRIG = (n) => Emb.TRIGRAMAS_DE[n].join();

test('el campo va hacia donde dice el tipo y sus partículas son los emblemas de la entidad', async () => {
  const Cam = await import('../entidades/campo.mjs');
  const { S, G } = await genesDe('ensayo');
  assert.equal(G.tipo, S.E.type); assert.equal(G.autoridad, S.E.auth);
  assert.deepEqual(G.centros, S.E.centers);
  assert.deepEqual(G.canales, [['ajna', 'garganta'], ['plexo', 'raiz'], ['raiz', 'plexo']], 'cada canal, como los dos centros que une');
  // Its defined centers and channels, and its authority, change the field; without them it is the type's alone.
  const mueve = (g) => { const F = Cam.campo(g, 1, 800, 450); for (let i = 0; i < 120; i++) F.avanzar(); for (let i = 0; i < F.n; i++) assert.ok(F.x[i] >= 0 && F.x[i] <= 800 && F.y[i] >= 0 && F.y[i] <= 450 && Number.isFinite(F.x[i] + F.y[i])); return Array.from(F.x.slice(0, 60)).join(); };
  const solo = mueve({ ...G, centros: [], canales: [], autoridad: '' });
  assert.notEqual(mueve({ ...G, canales: [], autoridad: '' }), solo, 'los centros definidos mueven el campo');
  assert.notEqual(mueve({ ...G, centros: [], autoridad: '' }), solo, 'los canales definidos mueven el campo');
  for (const aut of ['emocional', 'sacral', 'esplenica', 'ego', 'autoproyectada', 'mental', 'lunar']) if (aut !== 'autoproyectada') assert.notEqual(mueve({ ...G, centros: [], canales: [], autoridad: aut }), solo, `la autoridad ${aut} cambia cómo respira`);
  // Each type moves the field its own way; genes without a type keep the first field (ALMA's cover).
  const finales = {};
  for (const tipo of ['', 'proyector', 'manifestador', 'generador', 'mg', 'reflector']) {
    const F = Cam.campo({ ...G, tipo }, 1, 800, 450, { emblemas: 12 });
    for (let i = 0; i < 200; i++) F.avanzar();
    for (let i = 0; i < F.n; i++) assert.ok(F.x[i] >= 0 && F.x[i] <= 800 && F.y[i] >= 0 && F.y[i] <= 450, `${tipo}: partícula ${i} fuera de la caja`);
    finales[tipo] = Array.from(F.x.slice(0, 40)).join();
    assert.equal(F.espejo, tipo === 'reflector');
  }
  assert.equal(new Set(Object.values(finales).slice(0, 5)).size, 5, 'cada tipo, su propio campo');
  // A Projector's field converges: in one step, most particles get closer to its focus.
  const P = Cam.campo({ ...G, tipo: 'proyector' }, 1, 800, 450), d0 = Array.from(P.x, (x, i) => Math.hypot(x - 640, P.y[i] - 225));
  P.avanzar();
  const cerca = d0.filter((d, i) => Math.hypot(P.x[i] - 640, P.y[i] - 225) < d).length / P.n;
  assert.ok(cerca > 0.85, `el campo de un Proyector converge hacia su foco: ${cerca.toFixed(2)}`);
  // With emblems the field is sparser, and each particle stamps one of them, a few much bigger.
  const E = Cam.campo(G, 1, 800, 450, { emblemas: 12 }), D = Cam.campo(G, 1, 800, 450);
  assert.equal(E.n, Math.round(800 * 450 * 0.0042)); assert.equal(D.n, Math.round(800 * 450 * 0.012));
  const dibujos = [], velos = [], ctx = { fillRect: () => velos.push(ctx.globalAlpha), drawImage: (img, x, y, w, h) => dibujos.push([img, w, h]), beginPath() {}, moveTo() {}, arc() {}, fill() {} };
  const sellos = Array.from({ length: 12 }, (_, i) => 'sello-' + i);
  Cam.pintarCampo(ctx, E, sellos);
  assert.equal(dibujos.length, E.n, 'un emblema por partícula');
  assert.ok(new Set(dibujos.map((d) => d[0])).size >= 10, 'circulan sus doce emblemas');
  const lados = dibujos.map((d) => d[1]).sort((a, b) => a - b);
  assert.ok(Math.abs(lados[0] - E.radio * 7.5) < 0.5 && lados[lados.length - 1] > lados[0] * 3, 'algunos mucho más grandes que el resto');
  assert.equal(velos[0], 0.16, 'con emblemas, la estela es más corta');
  // Without the pictures (they have not loaded, or the genes have no gates) it draws dots, as before.
  dibujos.length = 0; velos.length = 0; Cam.pintarCampo(ctx, E, null); assert.equal(dibujos.length, 0); assert.equal(velos[0], 0.09);
});

test('el relieve: el campo como terreno, en línea, con la cumbre de su tipo, un cerro por centro y una versión de fondo', async () => {
  const Rel = await import('../entidades/relieve.mjs');
  for (const id of ['ensayo', 'cordura', 'automata']) {
    const { G } = await genesDe(id), pieza = Rel.relieveSvg(G, 1), propios = new Set(Gen.colores(G.pieza));
    assert.ok(sano(pieza), id); assert.equal(pieza, Rel.relieveSvg(G, 1)); assert.notEqual(pieza, Rel.relieveSvg(G, 2), 'otra clave, otro terreno');
    for (const c of tintas(pieza)) assert.ok(propios.has(c), `${id}: ${c} no es de la entidad`);
    assert.ok(tintas(pieza).has(G.pieza.acento), 'el acento va en una fila de cada doce');
    assert.match(pieza, /^<svg [^>]*viewBox="0 0 640 360"[^>]*aria-hidden="true">/); assert.doesNotMatch(pieza, /fill="(?!none|#)/);
    // As a ground it uses only the quiet colors of the theme, the ones text reads on.
    for (const th of ['dark', 'light']) { const quietos = new Set(Gen.colores(G.fondo[th])); for (const c of tintas(Rel.relieveSvg(G, 1, { modo: 'fondo', tema: th }))) assert.ok(quietos.has(c), `${id} · ${th}: ${c} no es un color de fondo`); }
    // Far rows hide behind near ones: fewer points are drawn than the land has.
    const puntos = (pieza.match(/[ML]\d/g) || []).length; assert.ok(puntos > 1500 && puntos < 40 * 129, `${id}: ${puntos} puntos`);
    // A Projector's land peaks where its field converges, and every defined center is a hill.
    const alt = Rel.relieve(G, 1), llano = Rel.relieve({ ...G, tipo: '', centros: [] }, 1);
    assert.ok(alt(0.8, 0.5) - llano(0.8, 0.5) > 0.8, `${id}: la cumbre del Proyector`);
    assert.ok(Rel.relieve({ ...G, tipo: '' }, 1)(0.08 + 0.36 * 0.84, 0.5) - llano(0.08 + 0.36 * 0.84, 0.5) > 0.3 === G.centros.includes('garganta'), `${id}: el cerro de la Garganta`);
  }
  const { G } = await genesDe('ensayo'), formas = new Set(['', 'proyector', 'manifestador', 'generador', 'mg', 'reflector'].map((tipo) => Rel.relieveSvg({ ...G, tipo, centros: [] }, 1)));
  assert.equal(formas.size, 6, 'cada tipo, su terreno');
  const espejo = Rel.relieve({ ...G, tipo: 'reflector', centros: [] }, 1); assert.ok(Math.abs(espejo(0.2, 0.4) - espejo(0.8, 0.4)) < 1e-9, 'el de un Reflector es simétrico');
});

test('las caras de tarjeta: quince patrones con los colores de la entidad, sin capa de banco, y el grabado con las puntas del emblema', async () => {
  const Pla = await import('../entidades/placa.mjs');
  assert.equal(Pla.PATRONES.length, 15);
  assert.deepEqual(Object.keys(Pla.NOMBRE_PATRON).sort(), [...Pla.PATRONES].sort());
  for (const id of ['ensayo', 'cordura', 'automata']) {
    const { G } = await genesDe(id), propios = new Set([G.pieza.base, ...G.pieza.barras, G.pieza.acento, G.pieza.tinta]);
    for (const patron of Pla.PATRONES) for (let k = 1; k <= 20; k++) {
      const svg = Pla.placa(G, k, { patron });
      assert.ok(sano(svg) && /viewBox="0 0 856 540"/.test(svg), `${id} · ${patron} · ${k}`);
      assert.ok(!/<text|<animate/.test(svg), `${id} · ${patron}: ni texto ni animación`);
      assert.ok(svg.length < 320 * 1024, `${id} · ${patron} · ${k}: ${(svg.length / 1024) | 0} KB`);
      // Only tiles, planks and the woven mesh take tones derived from the entity's colors; the rest use them as they are.
      if (!['bricks', 'planks', 'mesh'].includes(patron)) for (const c of tintas(svg)) assert.ok(propios.has(c.toUpperCase()), `${id} · ${patron}: ${c} no es de la entidad`);
    }
    assert.equal(Pla.placa(G, 'cara-0-3'), Pla.placa(G, 'cara-0-3'));
    assert.ok(new Set(Array.from({ length: 200 }, (_, n) => Pla.placa(G, `c${n}`))).size === 200, `${id}: 200 claves, 200 caras`);
    // The engraving is a layer of its own, on top of any pattern.
    const grabada = Pla.placa(G, 1, { patron: 'vortex', guilloche: true }), lisa = Pla.placa(G, 1, { patron: 'vortex', guilloche: false });
    assert.ok(grabada.length > lisa.length + 2000, `${id}: el grabado suma líneas`);
  }
});

test('el micelio crece una vez desde los focos de la entidad, cubre toda su red y madura, con sus colores', async () => {
  const Mic = await import('../entidades/micelio.mjs');
  const largo = (T) => T.flat().reduce((a, s) => { for (let k = 0; k < s.length; k += 4) a += Math.hypot(s[k + 2] - s[k], s[k + 3] - s[k + 1]); return a; }, 0);
  for (const id of ['ensayo', 'cordura', 'automata']) {
    const { S, G } = await genesDe(id), M = Mic.micelio(G, 1);
    assert.equal(M.focos, S.E.centers.length, `${id}: un foco por centro definido`);
    assert.equal(M.crece, 4 * G.ritmo, `${id}: crece al ritmo del tipo`);
    assert.deepEqual([M.base, M.joven, M.brillo], [G.pieza.base, G.pieza.barras[4], G.pieza.tinta]);
    assert.deepEqual([...M.espectro].sort(), [...G.pieza.barras.slice(0, 4), G.pieza.acento].sort(), `${id}: el holograma recorre los colores de la entidad`);
    assert.equal(M.espectro[M.espectro.length - 1], G.pieza.acento, `${id}: y termina en su acento`);
    assert.ok(M.nodos.length > 100 && M.nodos.every((n) => Number.isFinite(n.sale) && Number.isFinite(n.llega)), `${id}: la red llega a todos los cruces`);
    // Nothing at the start; it only grows; when the time to grow is over the whole network is drawn, and then mature.
    const total = M.aristas.reduce((a, e) => a + e.largo, 0);
    assert.equal(largo(M.tramos(0)), 0);
    let antes = 0;
    for (let f = 0.05; f <= 1.0001; f += 0.05) { const ahora = largo(M.tramos(M.crece * f)); assert.ok(ahora >= antes - 1e-6, `${id}: retrocede en ${f.toFixed(2)}`); antes = ahora; }
    assert.ok(Math.abs(antes - total) < 1e-3, `${id}: al terminar cubre ${antes.toFixed(1)} de ${total.toFixed(1)}`);
    const fin = M.tramos(M.crece + M.sostiene);
    assert.ok(Math.abs(largo([fin[10]]) - total) < 1e-3 && fin.slice(0, 10).flat(2).length === 0, `${id}: al final todo está maduro`);
    for (const s of fin.flat()) for (let k = 0; k < s.length; k += 2) assert.ok(s[k] >= -5 && s[k] <= 435 && s[k + 1] >= -10 && s[k + 1] <= 942, `${id}: una hifa fuera de la pantalla`);
    assert.deepEqual(Mic.micelio(G, 1).tramos(M.crece / 2), M.tramos(M.crece / 2));
    assert.notDeepEqual(Mic.micelio(G, 2).tramos(M.crece / 2), M.tramos(M.crece / 2));
  }
  // The sway stays within the original's 25°.
  for (let r = 0; r < 60; r += 0.37) { const [x, y] = Mic.vaivenMicelio(r); assert.ok(Math.abs(x) <= 25 && Math.abs(y) <= 15); }
});

test('Ensayo Generativo se arma con los valores de la Entidad Ensayo y con el generador dentro', () => {
  const out = join(mkdtempSync(join(tmpdir(), 'alma-ejemplo-')), 'ensayo-generativo.html');
  execFileSync('node', ['ejemplos/ensayo-generativo/build.mjs', out]);
  const html = readFileSync(out, 'utf8');
  assert.match(html, /^<title>Ensayo Generativo<\/title>/);
  assert.match(html, /--interactive-01:\s*#D5025D/i, 'el acento de la entidad');
  assert.match(html, /window\.__GENERADOR = /, 'el generador');
  assert.match(html, /window\.__GENES = \{"ensayo":/, 'los genes de la entidad');
  assert.equal(html.match(/<\/style>/g).length, 1);
  assert.ok(html.length < 1024 * 1024, `${(html.length / 1024) | 0} KB`);
});

test('el generador para una página: los mismos dibujos que los módulos, y los genes viajan como datos', async () => {
  const { genesDe: genesPagina, generadorNavegador } = await import('../scripts/lib/generativo.mjs');
  const vm = await import('node:vm');
  const { S, G } = await genesDe('ensayo');
  // Genes are plain data: a page gets them as JSON.
  const viajan = JSON.parse(JSON.stringify(genesPagina(S)));
  assert.deepEqual(viajan, JSON.parse(JSON.stringify(G)));
  const window = {};
  vm.runInNewContext(generadorNavegador(), { window });
  const N = window.__GENERADOR, Pla = await import('../entidades/placa.mjs');
  assert.equal(N.criatura(viajan, 'Ana Rojas'), Gen.criatura(G, 'Ana Rojas'));
  assert.equal(N.colonia(viajan, 1, { modo: 'fondo', tema: 'light' }), Gen.colonia(G, 1, { modo: 'fondo', tema: 'light' }));
  assert.equal(N.emblema(viajan, 'borrador'), Emb.emblema(G, 'borrador'));
  assert.equal(N.placa(viajan, 'cara-0-0', { patron: 'planks' }), Pla.placa(G, 'cara-0-0', { patron: 'planks' }));
  assert.equal(N.PATRONES.length, 15);
  for (const f of ['campo', 'pintarCampo', 'carrusel', 'anillo', 'micelio', 'pintarMicelio', 'vaivenMicelio']) assert.equal(typeof N[f], 'function', f);
  assert.equal(N.carrusel(viajan).cantidad, viajan.puntas);
});

test('el lenguaje de una entidad con ilustración generativa lleva sus genes y el generador', async () => {
  execFileSync('node', ['scripts/build-entidades.mjs']);
  execFileSync('node', ['scripts/build-lenguaje.mjs', 'ensayo', 'automata']);
  const con = readFileSync('build/lenguaje-ensayo.html', 'utf8'), sin = readFileSync('build/lenguaje-automata.html', 'utf8');
  assert.match(con, /window\.__GENERADOR = /);
  assert.match(con, /window\.__GENERADOR_VISTAS = /, 'los componentes de lo que se mueve');
  assert.match(con, /"genes":\{"id":"ensayo"/);
  assert.match(sin, /window\.__GENERADOR = /);
  assert.match(sin, /"genes":\{"id":"automata"/);
});

test('la portada de la documentación: la colonia en una entidad con personajes, el campo en una sin ellos', async () => {
  const { portada } = await import('../scripts/lib/documentacion.mjs');
  // No entity goes without characters today: the case is tried on a copy of one that declares it.
  const A = await sistema('automata'), sinPersonajes = { ...A, L: { ...A.L, ilustracion: { ...A.L.ilustracion, generativa: { ...A.L.ilustracion.generativa, personajes: false } } } };
  const con = portada(await sistema('ensayo')), sin = portada(sinPersonajes);
  assert.match(portada(A).markup, /<div class="ecv__art ecv__art--gen"/, 'Autómata usa personajes: su portada es la colonia');
  assert.match(con.markup, /<div class="ecv__art ecv__art--gen"/); assert.equal(con.code, '');
  assert.match(con.markup, /Ensayo/, 'el nombre sigue al lado');
  assert.match(sin.markup, /<canvas id="ecv-campo" class="ecv__art ecv__art--gen"/, 'un lienzo para el campo');
  assert.match(sin.code, /GEN\.campo\(\{"id":"automata"/, 'el campo con los genes de la entidad');
  for (const p of [con, sin]) assert.doesNotMatch(p.markup, /<svg class="ecv__art"/, 'ya sin barras');
});

test('la portada de ALMA es su campo, dibujado con el código de entidades/ y los colores de sus tokens', () => {
  assert.match(execFileSync('node', ['scripts/build-portada.mjs', '--check']).toString(), /al día/);
  assert.match(readFileSync('package.json', 'utf8'), /"build": "[^"]*build-portada\.mjs/);
  const p = readFileSync('artifact/project/components/Cover/preview.html', 'utf8'), fuera = p.slice(0, p.indexOf('/* @campo:start */')) + p.slice(p.indexOf('/* @campo:end */'));
  assert.match(p, /^<!-- @dsCard height=300 -->\n/);
  assert.match(p, /<canvas id="cv-campo" class="art" width="896" height="600" aria-hidden="true">/);
  assert.match(p, /campo\(G, 'portada', 448, 300\)/);
  assert.equal(fuera.match(/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/), null, 'la portada no trae colores propios: los lee de los tokens');
  for (const n of ['brand-ink', 'primary-300', 'primary-500', 'tertiary-400', 'secondary-50', 'secondary-500', 'interactive-01']) assert.ok(p.includes(`tok('${n}')`), n);
});
