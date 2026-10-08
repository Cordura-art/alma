// The document of one scene of the docs: a page with ALMA's styles, the component bundle, the measuring helpers and the
// scene's own script. One function builds it for both uses: the camera (scripts/build-images.mjs photographs it for the
// ALMA artifact's guides) and the documentation site, which shows the same scene live inside a frame, so an entity
// needs no pictures of its own. No DOM here: it only joins strings.
// o: { fuentes (stylesheet URL), css, bundle, libs (script tags), helpers, doc (the function device() frames use),
//      deps (optional), datos (the scene's D), escena: { js, css, after, click, efectos }, vivo: an id when the site shows it,
//      motor (the effects' code, loaded only by a scene that says efectos: true) }
window.__ESCENA_DOC = function (o) {
  var s = o.escena, fin = '</scr' + 'ipt>', ini = '<scr' + 'ipt>';
  var head = '<link rel="stylesheet" href="' + o.fuentes + '"><style>' + o.css + '</style>';
  // A scene with device frames builds their documents from these three texts.
  var textos = /device\(/.test(s.js) ? '<scr' + 'ipt type="text/plain" id="src-head">' + head.replace(/<\/(script)/gi, '<\\/$1') + fin +
    '<scr' + 'ipt type="text/plain" id="src-bundle">' + o.bundle + fin + '<scr' + 'ipt type="text/plain" id="src-helpers">' + o.helpers + fin : '';
  // Live, the frame runs the steps the camera drives from outside: wait for the fonts and the device frames, click what
  // the scene asks, run its annotations, and tell the page its size.
  var vivo = o.vivo ? ini + '(async function () {\n  try { await document.fonts.ready; } catch (e) {}\n  await sleep(250);\n' +
    '  var t0 = Date.now(), listos = function () { return [].every.call(document.querySelectorAll("iframe"), function (f) { return f.contentWindow && f.contentWindow.__ready; }); };\n' +
    '  while (!listos() && Date.now() - t0 < 15000) await sleep(100);\n' +
    (s.click ? '  var b = document.querySelector(' + JSON.stringify(s.click) + '); if (b) b.click(); await sleep(200);\n' : '') +
    (s.after ? '  try { await (async function () {\n' + s.after + '\n  })(); } catch (e) { console.warn(e); }\n' : '') +
    '  await sleep(120);\n  var r = document.getElementById("shot").getBoundingClientRect();\n' +
    '  parent.postMessage({ almaEscena: ' + JSON.stringify(o.vivo) + ', w: Math.ceil(r.width), h: Math.ceil(r.height) }, "*");\n})();' + fin : '';
  return '<!doctype html><html lang="es" data-theme="dark"><head><meta charset="utf-8">' + head + '<style>' + (s.css || '') + '</style>\n' + textos + '</head>\n' +
    '<body><div id="shot"><div id="app"></div></div>' + o.libs + ini + o.bundle + fin + '\n' +
    ini + 'var D = ' + JSON.stringify(o.datos) + ';\nwindow.__LIBS = ' + JSON.stringify(o.libs).replace(/<\//g, '<\\/') + ';\n' + o.doc + '\n' + (o.deps || '') + '\n' + o.helpers +
    '\nstateCss(); A.registerIcons({ icons: D.icons });\n' + fin + (s.efectos && o.motor ? ini + o.motor + fin : '') + ini + s.js + fin + vivo + '</body></html>';
};
