---
component: ActionSheet
tab: Estilo
summary: Colores, tipografía y medidas de ActionSheet.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Hoja | fondo y borde | `alert-bg` y `alert-border` |
| Velo | fondo | `overlay-01` |
| Título | color del texto | `text-01` |
| Mensaje | color del texto | `text-02` |
| Acciones | — | `Button` `tinted` |
| Acción destructiva | — | `Button` `tinted` con rol destructivo |
| Cancelar | — | `Button` `gray` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título | 16 / 1 | `font-weight-emphasis` |
| Mensaje | 14 / 0,875 | `font-weight-body` |
| Botones | Los de `Button` `md` | — |

El título y el mensaje van centrados.

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Hoja | ancho máximo | 24 rem |
| Hoja | relleno | `space-16` |
| Hoja | radio | `radius-panel` |
| Botones | ancho | Todo el de la hoja |
| Botones | separación | `space-8` |
| Cancelar | separación de los demás | `space-16` |
| Hoja y borde de la pantalla | distancia | `space-16` |

## Movimiento

Entra con `duration-moderate-02` y `easing-entrance-expressive`. Con movimiento reducido aparece sin moverse.
