---
component: Window
tab: Estilo
summary: Colores, tipografía y medidas de Window.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Cuerpo | fondo | `ui-02` |
| Barra, ventana activa | fondo | Vidrio medio (`glass-regular`) |
| Barra, ventana inactiva | fondo | `ui-01` |
| Borde de la ventana activa | color | `border-control` |
| Borde de la ventana inactiva, y de la barra | color | `border-subtle` |
| Título, activa / inactiva | color del texto | `text-01` / `text-02` |
| Controles, activa / inactiva | color | `icon-01` / `icon-02` |
| Control bajo el cursor | fondo | `hover-ui` |
| Ventana activa | sombra | `shadow-floating` |
| Panel | fondo | Vidrio medio, entero |
| Foco | contorno | `focus` |

Los controles no llevan colores propios: son íconos de Carbon (`close`, `subtract`, `maximize`), y se distinguen por su forma.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título | 14 / 0,875 | `font-weight-emphasis` |
| Pie | 12 / 0,75 | `font-weight-body` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Ventana | radio | `radius-panel` |
| Ventana | tamaño mínimo | 240 × 160 px |
| Ventana | tamaño inicial | 480 × 360 px |
| Barra | alto | 40 px; 32 px en un panel |
| Barra | relleno a los lados | `space-8` |
| Control | tamaño | 24 × 24 px |
| Controles | separación | `space-4` |
| Borde que responde | ancho | 8 px; 16 px en las esquinas |
| Pie | relleno | `space-4` y `space-16` |

## Movimiento

Mover y cambiar de tamaño siguen al puntero, sin animación. La ventana no rebota ni se desliza sola.
