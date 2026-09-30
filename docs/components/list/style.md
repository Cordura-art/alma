---
component: List
tab: Estilo
summary: Especificaciones visuales de la lista.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Grupo | fondo | `list-bg` |
| Título del grupo | color del texto | `text-02` |
| Separador | borde (1 px) | `list-separator` |
| Fila:hover (navegación o acción) | fondo | `list-row-bg-hover` |
| Título de la fila | color del texto | `text-01` |
| Subtítulo y valor | color del texto | `text-02` |
| Ícono y flecha | relleno | `icon-02` |
| Nota al pie | color del texto | `text-02` |
| Fila:focus | contorno | `focus` (2 px, por dentro) |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título del grupo | 12 / 0,75 | Medium / 500 | — |
| Título de la fila | 14 / 0,875 | Regular / 400 | 1,4 |
| Subtítulo | 12 / 0,75 | Regular / 400 | — |
| Nota al pie | 12 / 0,75 | Regular / 400 | 1,5 |

El valor usa cifras tabulares.

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Lista | ancho máximo | 560 px (35 rem) |
| Grupo | radio | `radius-panel` |
| Título del grupo | margen | 16 px a la izquierda, 8 px abajo |
| Fila | relleno | 8 px arriba y abajo, 16 px a los lados |
| Elementos de la fila | separación | 16 px |
| Separador | sangría | 16 px, o 56 px con ícono |
| Flecha | tamaño | 20 px |
| Nota al pie | margen | 8 px arriba, 16 px a los lados |

> **Imagen pendiente:** anatomía acotada con ícono.

## Tamaño

| Densidad | Alto mínimo de la fila (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

## Movimiento

El fondo de una fila cambia en `duration-fast-01` con `easing-standard-productive`.

## Contraste

Textos a 4,5:1 sobre `list-bg` (7:1 en alto contraste); íconos a 3:1, en los cuatro temas.
