---
component: ContextMenu
tab: Estilo
summary: Colores, tipografía y medidas de ContextMenu.
---


## Color

Es el menú de ALMA: los mismos tokens que el de `PullDownButton`.

| Elemento | Propiedad | Token |
|---|---|---|
| Menú | fondo y borde | `menu-bg` y `menu-border` |
| Ítem | color del texto | `text-01` |
| Ítem bajo el cursor o con el foco | fondo | `menu-item-bg-hover` |
| Ítem con el foco del teclado | contorno interior | `focus` |
| Ítem destructivo | color del texto y del ícono | `menu-item-destructive-text` |
| Separador | color | `menu-border` |
| Título | color del texto | `text-02` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Ítem | 14 / 0,875 | `font-weight-body` |
| Título | 11 / 0,6875 | `font-weight-body` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Menú | ancho | Desde 12 rem, hasta 20 rem |
| Menú | relleno | `space-8` |
| Menú | radio | `radius-panel` |
| Ítem | alto | El de un control |
| Ítem | relleno a los lados | `space-16` |
| Ícono y texto | separación | `space-16` |
| Menú y borde de la pantalla | distancia mínima | `space-8` |

El menú se abre en el punto del gesto. Si no cabe, se corre hasta quedar entero.
