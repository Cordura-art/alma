---
component: PopUpButton
tab: Estilo
summary: Especificaciones visuales del botón con menú de opciones.
---

## Color

### Botón

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta superior | color del texto | `text-02` |
| Botón | fondo | `popup-bg` |
| Botón | borde (1 px) | `popup-border` |
| Botón | color del texto | `text-01` |
| Ícono | relleno | `icon-02` |
| Botón:hover | borde | `popup-border-hover` |
| Botón abierto | borde | `popup-border-open` |
| Botón:focus | contorno | `focus` (2 px, separado 2 px) |
| Botón:disabled | opacidad | 45 % |

### Menú

| Elemento | Propiedad | Token |
|---|---|---|
| Menú | fondo | `menu-bg` |
| Menú | borde | `menu-border` |
| Menú | sombra | `shadow-floating` |
| Opción | color del texto | `text-01` |
| Opción:hover y :focus | fondo | `menu-item-bg-hover` |
| Opción:focus-visible | borde (2 px, interior) | `focus` |
| Marca de la opción elegida | relleno | `icon-01` |
| Nota al pie | color del texto / separador | `text-02` / `menu-border` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta superior | 11 / 0,6875 | `font-weight-body` | `web-label-s` |
| Valor del botón | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Opción | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Nota al pie | 11 / 0,6875 | `font-weight-body` | `web-label-s` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Botón | ancho mínimo | 200 px |
| Botón | relleno | 16 px al inicio, 8 px al final |
| Botón | radio | `radius-button` |
| Ícono | tamaño | 20 px (`icon-size-md`) |
| Etiqueta superior | sangría | 16 px |
| Menú | separación del botón | 8 px |
| Menú | relleno, radio | 8 px, `radius-panel` |
| Menú | ancho | el del botón como mínimo, 320 px como máximo |
| Opción | alto mínimo, radio | 44 px, `radius-nav` |
| Opciones | separación | 4 px (`space-4`) |
| Opción | columna de la marca | 24 px |

![Medidas de PopUpButton: alto del botón, relleno, separación entre botón y menú, relleno del menú, alto de las opciones y columna de 24 px para la marca.](assets/Componentes/pop-up-button-medidas.png)

## Tamaño

| Densidad | Alto del botón y de las opciones (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

## Capas y movimiento

El menú flota en `z-dropdown` con `shadow-floating` y aparece con `duration-fast-02` + `easing-entrance-expressive`.

## Contraste

Texto a 4,5:1 (7:1 en alto contraste) y borde del botón a 3:1 en los cuatro temas, verificado con axe con el menú abierto.
