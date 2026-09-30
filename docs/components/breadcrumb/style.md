---
component: Breadcrumb
tab: Estilo
summary: Especificaciones visuales de la ruta de navegación.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Enlace | color del texto | `link-text` |
| Separador | color | `breadcrumb-separator` |
| Página actual | color del texto | `breadcrumb-current` |
| Enlace:focus | contorno | `focus` (2 px, separado 2 px) |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Enlace | 14 / 0,875 | Regular / 400 | `web-label-m` |
| Página actual | 14 / 0,875 | Medium / 500 | — |

El subrayado aparece al pasar el cursor, 0,2 em bajo el texto.

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Separador | relleno lateral | 8 px |
| Enlace | alto mínimo (área de toque) | 44 px |
| Enlace | radio del contorno de foco | `radius-chip` |
| Menú «…» | estilo | `PullDownButton` de ícono sin borde |

Si la ruta no cabe a lo ancho, pasa a la línea siguiente.

> **Imagen pendiente:** anatomía acotada.

## Contraste

Enlaces y página actual a 4,5:1; el separador a 3:1, en los cuatro temas.
