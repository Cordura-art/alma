---
component: Tag
tab: Estilo
summary: Especificaciones visuales de la etiqueta.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | fondo / texto | `tag-<color>-bg` / `tag-<color>-text` |
| Etiqueta desactivada | fondo / texto | `tag-disabled-bg` / `tag-disabled-text` |
| Quitar y seleccionable:hover | borde (1 px, por dentro) | el color del texto |
| Seleccionable elegida | borde (2 px, por dentro) | el color del texto |
| Seleccionable elegida | ícono | `checkmark`, 16 px, del color del texto |
| Quitar:focus | contorno | `focus` (2 px, separado 1 px) |
| Seleccionable:focus | contorno | `focus` (2 px, separado 2 px) |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Texto | 12 / 0,75 | Regular / 400 | — |
| Texto (`sm`) | 11 / 0,6875 | Regular / 400 | `web-label-s` |
| Texto (elegida) | 12 / 0,75 | Medium / 500 | — |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Etiqueta | alto mínimo | 32 px (24 px en `sm`) |
| Etiqueta | relleno lateral | 8 px |
| Etiqueta | radio | `radius-pill` |
| Ícono y texto | separación | 4 px |
| Quitar | tamaño / área de toque | 20 px / 32 px |
| Seleccionable | área de toque | 44 px de alto |

> **Imagen pendiente:** anatomía acotada de los tres tipos.

## Movimiento

El borde de la seleccionable cambia en `duration-fast-01`.

## Contraste

Texto a 4,5:1 sobre su fondo en los once colores (7:1 en alto contraste; el amarillo se corrigió para lograrlo).
