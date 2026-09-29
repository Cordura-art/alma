# Card

Contenedor de un tema: un viaje, una noticia, una configuración.

## Qué aporta quien lo usa
- `title` (obligatorio), `eyebrow` (dato breve arriba: fecha, categoría), `subtitle`, `children`.
- `media`: `{ src, alt, ratio, width, height }`. 16:9 por defecto; `alt` vacío si la imagen es decorativa. Se carga en diferido.
- `href` o `onClick`: toda la tarjeta es un solo destino. El enlace va en el título (lo que anuncia el lector de pantalla) y se extiende a toda la tarjeta.
- `actions`: botones propios de la tarjeta; quedan por encima del enlace general. Si la tarjeta ya es un enlace, que las acciones sean secundarias.
- `headingLevel`: 3 por defecto; ajústalo a la jerarquía de la página.

## Aspecto
`card-bg`, `card-border`, `radius-panel`. Si es un enlace, `card-bg-hover` y subrayado del título al pasar el puntero; el anillo de foco rodea toda la tarjeta.
