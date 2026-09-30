---
component: Tooltip
tab: Estilo
summary: Especificaciones visuales del tooltip.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Globo | fondo | `tooltip-bg` (`inverse-02`) |
| Texto | color | `tooltip-text` (`inverse-01`) |
| Globo | sombra | `shadow-floating` |

El globo invierte los colores del tema para separarse del contenido: claro en tema oscuro y oscuro en tema claro.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Texto | 12 / 0,75 | Regular / 400 | 1,4 |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Globo | separación del control | 8 px |
| Globo | ancho máximo | 240 px (15 rem) |
| Globo | relleno | 4 px arriba y abajo, 8 px a los lados |
| Globo | radio | `radius-chip` |

> **Imagen pendiente:** anatomía acotada.

## Capas y movimiento

En `z-floating`. Aparece y se desliza 4 px hacia su posición en `duration-fast-02` con `easing-entrance-expressive`. Con movimiento reducido, aparece sin animación.

## Contraste

Texto a 4,5:1 sobre `inverse-02` en los cuatro temas.
