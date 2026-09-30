---
component: Pagination
tab: Estilo
summary: Especificaciones visuales de la paginación.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Barra | fondo | `pagination-bg` |
| Barra dentro de una tabla | borde superior (1 px) | `table-border` |
| Rango y «Página N de M» | color del texto | `text-02` |
| Anterior y siguiente | estilo | `Button` gray de ícono |
| Elementos por página | estilo | `PopUpButton` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Rango | 14 / 0,875 | Regular / 400 | `web-label-m` |
| Página N de M | 14 / 0,875 | Regular / 400 | `web-label-m` |

Cifras tabulares, para que el texto no salte al cambiar de página.

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Barra | relleno | 8 px arriba y abajo, 16 px a los lados |
| Grupos | separación | 8 px entre filas, 24 px entre columnas |
| Elementos por página | ancho mínimo | 96 px |
| Anterior y siguiente | separación | 8 px |
| Botones | tamaño | 44 px (`size-touch-min`) |

> **Imagen pendiente:** anatomía acotada.

## Contraste

Textos a 4,5:1 sobre `pagination-bg`; botones según `Button`. Verificado en los cuatro temas.
