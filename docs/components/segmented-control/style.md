---
component: SegmentedControl
tab: Estilo
summary: Especificaciones visuales del selector segmentado.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Riel | fondo | `segmented-bg` |
| Segmento | color del texto | `segmented-text` |
| Segmento:hover | color del texto | `text-01` |
| Pieza elegida | fondo | `segmented-selected-bg` |
| Pieza elegida | contorno (1 px) | `segmented-border` |
| Segmento elegido | color del texto | `segmented-selected-text` |
| Segmento:focus | contorno | `focus` (2 px, separado 2 px) |

La opción elegida se distingue por la pieza y por el peso del texto, no solo por el color. En el tema oscuro la pieza es más clara que el riel; en el claro es blanca y su contorno la separa del riel.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Segmento | 12 / 0,75 | `font-weight-body` | `web-body-s`, con interlínea 1,4 |
| Segmento elegido | 12 / 0,75 | `font-weight-emphasis` | |

El segmento reserva el ancho de su texto en el peso elegido, así que elegir una opción no mueve a las demás.

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Riel | relleno | 4 px (`space-4`) |
| Riel | radio | `radius-button` |
| Segmento | relleno lateral | 16 px |
| Segmento | ancho | el del segmento más ancho; todos iguales |
| Pieza elegida | radio | `radius-button` menos 4 px, concéntrico con el riel |

![Medidas de SegmentedControl: relleno del riel, alto del control, ancho de un segmento y radio.](assets/Componentes/segmented-control-medidas.png)

## Tamaño

| Densidad | Alto del control (px / rem) | Alto de la pieza elegida (px) |
|---|---|---|
| Normal | 44 / 2,75 | 36 |
| Compacta (puntero fino) | 32 / 2 | 24 |

El área de toque de cada segmento ocupa todo el alto del control.

## Movimiento

La pieza elegida se desliza en `duration-moderate-01` con `easing-standard-productive`; el color del texto cambia en `duration-fast-01`. Con movimiento reducido, cambia sin deslizarse.

## Contraste

Texto de los segmentos a 4,5:1 sobre `segmented-bg`; texto elegido a 4,5:1 sobre `segmented-selected-bg`; contorno de la pieza a 3:1 sobre el riel, en los cuatro temas.
