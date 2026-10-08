---
component: Widget
tab: Estilo
summary: Colores, tipografía y medidas de Widget.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Widget | fondo | Vidrio medio (`glass-regular`) |
| Widget | borde | `border-subtle` |
| Título e ícono, fecha | color | `text-02` |
| Contenido | color | `text-01` |
| Bajo el cursor | velo | `text-01` al 6 % |
| Foco | contorno | `focus` |

Sobre el vidrio medio van `text-01` y `text-02`. No uses `text-03`.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título, fecha | 11 / 0,6875 | `font-weight-emphasis`; la fecha, `font-weight-body` |
| Cifra principal (`alma-widget__figure`) | 32 / 2, cifras del mismo ancho | `font-weight-heading` |
| Contenido | `web-body-s` o `web-label-s` | — |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Celda de la grilla | lado | 160 px |
| Entre widgets | separación | `space-16` |
| Chico / mediano / grande / muy grande | tamaño | 160 × 160 · 336 × 160 · 336 × 336 · 688 × 336 px |
| Widget | relleno | `space-16` |
| Widget | radio | El doble de `radius-panel` |
| Partes | separación | `space-8` |
