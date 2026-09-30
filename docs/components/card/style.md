---
component: Card
tab: Estilo
summary: Especificaciones visuales de la tarjeta.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Tarjeta | fondo | `card-bg` |
| Tarjeta | borde (1 px) | `card-border` |
| Tarjeta enlace:hover | fondo | `card-bg-hover` |
| Tarjeta enlace:hover | título | subrayado |
| Tarjeta enlace:focus | contorno (alrededor de toda la tarjeta) | `focus` (2 px, separado 2 px) |
| Imagen (mientras carga) | fondo | `ui-03` |
| Antetítulo y subtítulo | color del texto | `text-02` |
| Título y contenido | color del texto | `text-01` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Antetítulo | 11 / 0,6875 | `font-weight-body` | — |
| Título | 18 / 1,125 | `font-weight-heading` | 1,4 |
| Subtítulo y contenido | 14 / 0,875 | `font-weight-body` | 1,6 |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Tarjeta | ancho máximo | 360 px (22,5 rem) |
| Tarjeta | radio | `radius-panel` |
| Cuerpo | relleno, separación | 24 px, 8 px |
| Acciones | relleno | 24 px a los lados y abajo |
| Acciones | separación | 8 px |
| Imagen | proporción | 16:9 por defecto |

![Medidas de Card: relleno del cuerpo, separación entre textos, relleno de las acciones y radio.](assets/Componentes/card-medidas.png)

## Movimiento

El fondo cambia en `duration-fast-02` con `easing-standard-productive`.

## Contraste

Textos a 4,5:1 sobre `card-bg` y sobre `card-bg-hover`, en los cuatro temas.
