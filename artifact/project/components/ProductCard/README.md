# ProductCard

Tarjeta de contenido con título y botón para desplegar subtítulo, imagen y texto; el fondo toma el color de una familia de etiquetas.

## Qué aporta quien lo usa
- `title` (obligatorio): en `web-label-l`.
- `subtitle`: dato destacado en `web-label-xl`, color `tertiary-500`.
- `image` + `imageAlt`: 328 × 245, recortada con `object-fit: cover`.
- `children`: el texto, en `web-body-m` al 87 %.
- `tone`: la familia de etiqueta del fondo (`red` por defecto, como en Figma).
- `defaultOpen`, u `open` + `onToggle`. `collapsible={false}` la deja siempre abierta.

## No
- No mezcles más de dos tonos en una misma lista.
