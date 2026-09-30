// Builds each component guide of the ALMA artifact from docs/components/<name>/{usage,style,code,accessibility}.md
// (the four tabs, as in IBM Carbon). Components without docs keep their hand-written README.
// Also builds the artifact's "Documentación" section from docs/novedades.md and docs/README.md.
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';

const TABS = ['usage', 'style', 'code', 'accessibility'];
const ROOT = 'docs/components';

function parse(src) {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(src);
  const meta = {};
  if (m) for (const line of m[1].split('\n')) { const i = line.indexOf(':'); if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim(); }
  return { meta, body: (m ? src.slice(m[0].length) : src).trim() };
}
const demote = (md) => md.replace(/^(#{2,5}) /gm, (_, h) => '#' + h + ' ');

let built = 0;
for (const dir of (await readdir(ROOT)).sort()) {
  if (!(await stat(`${ROOT}/${dir}`)).isDirectory()) continue;
  const tabs = [];
  for (const t of TABS) {
    try { tabs.push(parse(await readFile(`${ROOT}/${dir}/${t}.md`, 'utf8'))); } catch { /* tab not written yet */ }
  }
  if (!tabs.length) continue;
  const name = tabs[0].meta.component;
  if (!name) throw new Error(`${dir}: falta "component" en el encabezado`);
  let out = `# ${name}\n\n${tabs[0].meta.summary || ''}\n\n`;
  for (const t of tabs) out += `\n## ${t.meta.tab}\n\n${demote(t.body)}\n`;
  await writeFile(`artifact/project/components/${name}/README.md`, out);
  built++;
}
console.log(`Guías de componentes: ${built} generadas desde docs/`);

// Root-level .md files of the artifact show as sections of the brand book.
const news = demote((await readFile('docs/novedades.md', 'utf8')).replace(/^# .*\n/, ''));
const plan = demote((await readFile('docs/README.md', 'utf8')).replace(/^# .*\n/, ''));
await writeFile('artifact/project/Documentacion.md', `# Documentación\n\n## Novedades\n${news}\n## Cómo se documenta ALMA\n${plan}`);
console.log('Sección Documentación generada');

// Foundations and guides: docs/<elements|guides>/<dir>/<n>-<tab>.md → one artifact section each,
// artifact/project/<Fundamentos|Guias>-<order>-<dir>.md, with the tabs as "## <tab>" (as IBM Design Language pages).
async function tabbedPages(root, prefix) {
  let n = 0;
  for (const dir of (await readdir(root)).sort()) {
    if (!(await stat(`${root}/${dir}`)).isDirectory()) continue;
    const tabs = [];
    for (const f of (await readdir(`${root}/${dir}`)).filter((f) => f.endsWith('.md')).sort()) tabs.push(parse(await readFile(`${root}/${dir}/${f}`, 'utf8')));
    if (!tabs.length) continue;
    const { element, order, summary } = tabs[0].meta;
    if (!element || !order) throw new Error(`${root}/${dir}: faltan "element" u "order" en el encabezado`);
    let out = `# ${element}\n\n${summary || ''}\n\n`;
    for (const t of tabs) out += `\n## ${t.meta.tab}\n\n${demote(t.body)}\n`;
    await writeFile(`artifact/project/${prefix}-${order}-${dir}.md`, out);
    n++;
  }
  return n;
}
console.log(`Fundamentos: ${await tabbedPages('docs/elements', 'Fundamentos')} páginas generadas desde docs/elements/`);
console.log(`Guías: ${await tabbedPages('docs/guides', 'Guias')} páginas generadas desde docs/guides/`);

// Patterns: docs/patterns/<n>-<slug>.md, single pages (as Carbon) → one artifact section, Patrones.md.
let pats = '# Patrones\n\nSoluciones repetibles para problemas comunes, hechas con los componentes de ALMA.\n';
const patFiles = (await readdir('docs/patterns')).filter((f) => f.endsWith('.md')).sort((a, b) => parseInt(a) - parseInt(b));
for (const f of patFiles) {
  const { meta, body } = parse(await readFile(`docs/patterns/${f}`, 'utf8'));
  pats += `\n## ${meta.pattern}\n\n${meta.summary || ''}\n\n${demote(body)}\n`;
}
await writeFile('artifact/project/Patrones.md', pats);
console.log(`Patrones: ${patFiles.length} en artifact/project/Patrones.md`);
