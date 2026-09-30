---
component: Checkbox
tab: Estilo
summary: Especificaciones visuales de la casilla.
---

## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Casilla | borde (2 px) | `control-off-border` |
| Casilla | fondo | transparente |
| Casilla marcada o mixta | fondo y borde | `control-on` |
| Marca (check o guion) | relleno | `control-on-mark` |
| Etiqueta | color del texto | `text-01` |
| Casilla:focus | contorno | `focus` (2 px, separado 2 px) |
| Fila:disabled | opacidad | 45 % |

En tema claro, `control-on` es un oliva oscuro: el lima no llega a 3:1 sobre fondo claro.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta | 14 / 0,875 | Regular / 400 | `web-label-m` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Casilla | tamaño | 20 × 20 px |
| Casilla | radio | `radius-checkbox` (4 px) |
| Marca | tamaño | 16 px |
| Casilla y etiqueta | separación | 8 px (`space-8`) |
| Fila | alto mínimo | 44 px (`size-touch-min`) |
| Área de toque de la casilla | tamaño | 44 × 44 px |

> **Imagen pendiente:** anatomía acotada con las medidas.

## Tamaño

| Densidad | Alto de la fila (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

## Movimiento

El relleno y el borde cambian en `duration-fast-01` (70 ms) con `easing-standard-productive`.

## Contraste

Borde y relleno a 3:1 o más, marca a 3:1 sobre el relleno y etiqueta a 4,5:1 (7:1 en alto contraste), en los cuatro temas.
