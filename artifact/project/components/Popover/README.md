# Popover

Diálogo pequeño, no modal, junto al botón que lo abre: una explicación breve o un par de controles (Apple popover, Carbon toggletip).

## Cuándo usarlo
- Para explicar un término o un cobro sin salir de la pantalla.
- Si el texto cabe en una línea y no tiene enlaces, usa `Tooltip`. Si hay que decidir algo importante, usa `Modal`.

## Qué aporta quien lo usa
- `children`: el botón que lo abre (por ejemplo `Button` de ícono `information` con `aria-label`).
- `title` y `content`. `placement` (`bottom` por defecto o `top`) y `align: 'end'` para abrirlo hacia la izquierda.

## Comportamiento
El foco entra al abrir; Esc, el botón «Cerrar» o un clic fuera lo cierran, y el foco vuelve al botón. No atrapa el foco: es no modal.
