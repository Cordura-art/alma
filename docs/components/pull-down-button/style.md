---
component: PullDownButton
tab: Estilo
summary: Especificaciones visuales del botón de acciones.
---


## Color

El botón usa los tokens del botón de `PopUpButton` (`popup-*`); el menú, los de `menu-*`.

| Elemento | Propiedad | Token |
|---|---|---|
| Menú | fondo / borde / sombra | `menu-bg` / `menu-border` / `shadow-floating` |
| Acción | color del texto | `text-01` |
| Acción:hover y :focus | fondo | `menu-item-bg-hover` |
| Acción destructiva | color del texto | `menu-item-destructive-text` |
| Acción desactivada | opacidad | 45 % |
| Ícono de la acción | relleno | el color del texto |

Dentro de una `Toolbar` o un `Breadcrumb`, el botón no tiene borde y usa los colores de `Button` plain.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta del botón y acciones | 14 / 0,875 | `font-weight-body` | `web-label-m` |

## Estructura

Igual al menú de `PopUpButton`: separado 8 px del botón, relleno de 8 px, radio `radius-panel`, acciones de 44 px de alto con `radius-nav`, columna de 24 px para el ícono.

> **Imagen pendiente:** anatomía acotada.

## Movimiento

El menú aparece en `duration-fast-02` con `easing-entrance-expressive`.

## Contraste

Acciones, incluida la destructiva, a 4,5:1 sobre `menu-bg`, en los cuatro temas.
