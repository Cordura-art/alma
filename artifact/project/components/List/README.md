# List

Lista agrupada al estilo Apple: filas de 44 px sobre un fondo redondeado, con separadores que empiezan donde empieza el texto.

## Qué aporta quien lo usa
- `header` (título del grupo) y `footer` (nota breve).
- `items`: `{ title, subtitle, icon, trailing, href, onClick, chevron }`.
  - `href` → la fila es un enlace y muestra la flecha `chevron--right`.
  - `onClick` → la fila es un botón (una acción).
  - Sin ninguno → fila informativa, por ejemplo un resumen de precios con `trailing`.
- Sin `header`, pasa `aria-label`.

## No
- No pongas dos acciones en una fila. Si una fila necesita un interruptor, usa `Switch` dentro de la fila.
