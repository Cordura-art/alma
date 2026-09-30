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

// Foundations (color, type, spacing, motion, icons, themes): docs/elements/<dir>/<n>-<tab>.md → one section each,
// artifact/project/Fundamentos-<order>-<dir>.md, with the tabs as "## <tab>" (as IBM Design Language pages).
const EL = 'docs/elements';
let els = 0;
for (const dir of (await readdir(EL)).sort()) {
  if (!(await stat(`${EL}/${dir}`)).isDirectory()) continue;
  const tabs = [];
  for (const f of (await readdir(`${EL}/${dir}`)).filter((f) => f.endsWith('.md')).sort()) tabs.push(parse(await readFile(`${EL}/${dir}/${f}`, 'utf8')));
  if (!tabs.length) continue;
  const { element, order, summary } = tabs[0].meta;
  if (!element || !order) throw new Error(`${dir}: faltan "element" u "order" en el encabezado`);
  let out = `# ${element}\n\n${summary || ''}\n\n`;
  for (const t of tabs) out += `\n## ${t.meta.tab}\n\n${demote(t.body)}\n`;
  await writeFile(`artifact/project/Fundamentos-${order}-${dir}.md`, out);
  els++;
}
console.log(`Fundamentos: ${els} páginas generadas desde docs/elements/`);
