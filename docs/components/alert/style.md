---
component: Alert
tab: Estilo
summary: Especificaciones visuales de la alerta.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Velo | fondo | `overlay-01` |
| Contenedor | fondo | `alert-bg` |
| Contenedor | borde (1 px) | `alert-border` |
| Título | color del texto | `text-01` |
| Mensaje | color del texto | `text-02` |
| Botón por defecto | estilo | `Button` filled |
| Botón Cancelar | estilo | `Button` gray |
| Botón destructivo | estilo | `Button` tinted, rol destructive |
| Otro botón | estilo | `Button` tinted |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado | Estilo de texto |
|---|---|---|---|---|
| Título | 20 / 1,25 | Medium / 500 | 1,4 | — |
| Mensaje | 14 / 0,875 | Regular / 400 | 1,72 | `web-body-m` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Contenedor | ancho máximo | 360 px (22,5 rem) |
| Contenedor | relleno, radio | 24 px, `radius-panel` |
| Título y mensaje | separación | 8 px |
| Mensaje y campo | separación | 16 px |
| Texto y botones | separación | 24 px |
| Botones | separación | 8 px |
| Botones en fila | ancho | repartido en partes iguales |
| Botones apilados | ancho | 100 % |

> **Imagen pendiente:** anatomía acotada, en fila y apilada.

## Capas y movimiento

Velo y alerta en `z-modal`. La alerta aparece con la receta «invocar» de IBM: `duration-moderate-02` con `easing-standard-expressive`. Con movimiento reducido, sin animación.

## Contraste

Textos a 4,5:1 (7:1 en alto contraste) sobre `alert-bg`, verificado en los cuatro temas.
