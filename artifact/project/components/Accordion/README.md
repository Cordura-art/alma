# Accordion

Secciones que se abren y se cierran para mostrar contenido largo por partes: preguntas frecuentes, detalles de un pedido.

## Qué aporta quien lo usa
- `items`: `{ id, title, content, disabled }`. El título es una pregunta o un tema corto.
- `defaultOpen`: ids abiertos al inicio. `allowMultiple` (verdadero por defecto, como en Carbon); `false` deja una sola abierta.
- `headingLevel`: 3 por defecto. Cada título es un encabezado con un botón dentro.

## Teclado
Enter o Espacio abre y cierra; ↑ ↓ pasan de un título a otro; Inicio y Fin van al primero y al último.

## No
No escondas en un acordeón lo que casi todos necesitan ver, ni los errores de un formulario.
