---
component: LiveActivity
tab: Estilo
summary: Colores, tipografía y medidas de LiveActivity.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Compacta y mínima | fondo | `ui-03`; `hover-ui` bajo el cursor |
| Expandida | fondo | Vidrio medio (`glass-regular`) |
| Nombre, cifra | color | `text-01` |
| Detalle, pasos por hacer | color | `text-02` |
| Anillo y barra, lo avanzado | color | `interactive-01` |
| Anillo, lo que falta | color | `border-control` |
| Paso en curso | indicador | `interactive-01` |
| Foco | contorno | `focus` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Compacta | 13 / 0,8125 | `font-weight-body`; la cifra, `font-weight-emphasis` |
| Nombre | 14 / 0,875 | `font-weight-emphasis` |
| Detalle | 12 / 0,75 | `font-weight-body` |
| Cifra, expandida | 20 / 1,25, cifras del mismo ancho | `font-weight-heading` |
| Pasos | 14 / 0,875 | `font-weight-body` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Compacta y mínima | alto | 24 px, para caber en la barra de menús |
| Compacta | radio | `radius-pill` |
| Anillo | tamaño | 16 px |
| Expandida | ancho | 20 rem |
| Expandida | relleno | `space-16` |
| Expandida | radio | El doble de `radius-panel` |
| Partes de la expandida | separación | `space-16` |
| Pasos | separación | `space-8` |

## Movimiento

El anillo y la barra avanzan sin animación propia. El indicador del paso en curso es el de `ActivityIndicator`, que respeta el movimiento reducido.
