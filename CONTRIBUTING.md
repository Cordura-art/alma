# Cómo contribuir a ALMA

## Cambiar un token
1. Edita el archivo en `tokens/` (nunca `dist/`). Cada token lleva `$value`, `$type` y `$description` (su uso).
2. `npm run build` y `npm test`.
3. Si el cambio toca el artefacto, copia `dist/json/tokens.json` a `artifact/project/tokens.json`.
4. Abre un pull request que diga qué cambió y por qué.

## Proponer algo nuevo
ALMA no crece por casos sueltos. Antes de crear un color, estilo o componente:
1. Revisa si algo existente ya lo resuelve.
2. Abre un issue con el problema, dónde aparece y cómo lo resuelven Apple HIG e IBM Carbon.
3. Cuando se apruebe, se construye con sus tokens de componente, su guía y sus pruebas de contraste y teclado.

## Revisión
Todo pull request pasa la revisión automática: archivos generados al día, ida y vuelta con el artefacto y contraste en los cuatro temas.
