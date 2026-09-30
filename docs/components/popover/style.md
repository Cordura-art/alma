---
component: Popover
tab: Estilo
summary: Especificaciones visuales del popover.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Panel | fondo | `popover-bg` |
| Panel | borde (1 px) | `popover-border` |
| Panel | sombra | `shadow-floating` |
| Panel:focus | contorno | `focus` (2 px, separado 2 px) |
| Título | color del texto | `text-01` |
| Contenido | color del texto | `text-02` |
| Botón Cerrar | estilo | `Button` plain de ícono |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título | 14 / 0,875 | Medium / 500 | — |
| Contenido | 14 / 0,875 | Regular / 400 | 1,6 |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Panel | separación del botón | 8 px |
| Panel | ancho máximo | 320 px (20 rem), o el de la pantalla − 32 px |
| Panel | relleno | 16 px; 48 px a la derecha, para «Cerrar» |
| Panel | radio | `radius-panel` |
| Título y contenido | separación | 4 px |
| Botón Cerrar | posición | esquina superior derecha |

> **Imagen pendiente:** anatomía acotada.

## Capas y movimiento

En `z-floating`. Aparece como los menús, en `duration-fast-02` con `easing-entrance-expressive`. Con movimiento reducido, sin animación.

## Contraste

Textos a 4,5:1 sobre `popover-bg` en los cuatro temas.
