---
component: SegmentedControl
tab: Estilo
summary: Especificaciones visuales del selector segmentado.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Contenedor | fondo | `segmented-bg` |
| Contenedor | borde (1 px) | `segmented-border` |
| Opción | color del texto | `segmented-text` |
| Opción:hover | color del texto | `text-01` |
| Opción elegida | fondo | `segmented-selected-bg` (`brand-white`) |
| Opción elegida | color del texto | `segmented-selected-text` (`tertiary-600`) |
| Opción:focus | contorno | `focus` (2 px, separado 2 px) |

La opción elegida se distingue por el fondo, no solo por el color del texto.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Opción | 11 / 0,6875 | Regular / 400 | `web-label-s` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Contenedor | relleno | 8 px |
| Contenedor | radio | `radius-button` |
| Opciones | separación | 4 px |
| Opción | relleno lateral | 16 px |
| Opción | radio | `radius-button` |

> **Imagen pendiente:** anatomía acotada.

## Tamaño

| Densidad | Alto de cada opción (px / rem) |
|---|---|
| Normal | 44 / 2,75 (en Figma medía 40) |
| Compacta (puntero fino) | 32 / 2 |

## Movimiento

El fondo de la opción cambia en `duration-fast-01` con `easing-standard-productive`.

## Contraste

Texto de las opciones a 4,5:1 sobre `segmented-bg` y sobre `brand-white`; borde a 3:1, en los cuatro temas.
