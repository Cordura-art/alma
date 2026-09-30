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
| Enlace | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Página actual | 14 / 0,875 | `font-weight-emphasis` | — |

El subrayado aparece al pasar el cursor, 0,2 em bajo el texto.

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Separador | relleno lateral | 8 px |
| Enlace | alto mínimo (área de toque) | 44 px |
| Enlace | radio del contorno de foco | `radius-nav` |
| Menú «…» | estilo | `PullDownButton` de ícono sin borde |

Si la ruta no cabe a lo ancho, pasa a la línea siguiente.

![Medidas de Breadcrumb: alto del área táctil de cada enlace, separación con el separador y tamaño del separador.](assets/Componentes/breadcrumb-medidas.png)

## Contraste

Enlaces y página actual a 4,5:1; el separador a 3:1, en los cuatro temas.
