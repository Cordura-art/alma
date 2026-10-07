// ALMA's line figures for a page: the engine (figuras/motor.js) and every figure there is (figuras/<nombre>.js), as
// one script that leaves `window.AlmaFigura` ready.
import { readFileSync, readdirSync } from 'node:fs';

export const nombresDeFiguras = () => readdirSync('figuras').filter((f) => f.endsWith('.js') && f !== 'motor.js').map((f) => f.replace(/\.js$/, '')).sort();
export function figurasNavegador() { return ['motor', ...nombresDeFiguras()].map((n) => readFileSync(`figuras/${n}.js`, 'utf8')).join('\n'); }
