// Builds "Entidad IBM" (build/entidad-ibm.html): the Entidades page in engine-only mode plus the IBM design language
// (site/estudio-ibm.js). The entity is born 1911-06-03 04:00 in New York, the date `npm run buscar-fecha` found.
// Usage: node scripts/build-estudio.mjs [output path]   (run `npm run entidades` first)
import { readFileSync, writeFileSync } from 'node:fs';

const OUT = process.argv[2] || 'build/entidad-ibm.html';
const read = (p) => readFileSync(p, 'utf8');
const study = {
  nacimiento: { fecha: '1911-06-03', hora: '04:00', zona: 'America/New_York' },
  ibm: { blue: '#0F62FE', blue30: '#A6C8FF' },
  anios: [1889, 1896, 1911, 1914, 1924, 1933, 1952, 1964, 1972, 1981],
  // The six windows `npm run buscar-fecha` finds in those years for a Projector 1/3 with Head, Ajna and Throat.
  ventanas: [
    { fecha: '2 jun 1911', horas: '21:00–23:00', canales: '17-62 · 24-61', cruz: '35/5/63/64', acento: '#0679C4', dE: 0.109 },
    { fecha: '3 jun 1911', horas: '00:00–17:00', canales: '17-62 · 24-61', cruz: '35/5/63/64', acento: '#1D62FF', dE: 0.006, elegida: true },
    { fecha: '12 ago 1911', horas: '19:00–23:00', canales: '4-63 · 23-43', cruz: '4/49/23/43', acento: '#0471E0', dE: 0.058 },
    { fecha: '13 ago 1911', horas: '00:00–07:00', canales: '4-63 · 23-43', cruz: '4/49/23/43', acento: '#026CEE', dE: 0.033 },
    { fecha: '4 sep 1924', horas: '17:00–20:00', canales: '4-63 · 23-43', cruz: '64/63/35/5', acento: '#0072DB', dE: 0.067 },
    { fecha: '3 dic 1924', horas: '15:00–21:00', canales: '4-63 · 11-56', cruz: '5/35/64/63', acento: '#0473D8', dE: 0.072 }
  ],
  // What the founding date (1911-06-16) generates, for the calibration table.
  real: { acento: '#9C6908 · ámbar', radio: '24px', ancho: '110', pesos: '500 / 500 / 400 / 650', apoyo: 'Lima, verde' }
};
const esc = (s) => s.replace(/<\/script/gi, '<\\/script');
let html = read('build/entidades-alma.html').replace('<title>Entidades ALMA</title>', '<title>Entidad IBM</title>')
  .replace('</style>', read('site/estudio-ibm.css') + '</style>');
// Engine only: the Entidades app exposes window.__ENGINE and returns before rendering.
html = html.replace('<script>window.__DATA', '<script>window.__ENGINE_ONLY = true;</script>\n<script>window.__DATA');
html += `<script>window.__STUDY = ${JSON.stringify(study)};</script>\n<script>${esc(read('site/estudio-ibm.js'))}</script>\n`;
writeFileSync(OUT, html);
console.log(`${OUT} · ${(html.length / 1024) | 0} KB`);
