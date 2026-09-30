---
component: TabBar
tab: Estilo
summary: Especificaciones visuales de la barra de pestañas.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Barra | fondo | `tab-bar-bg` |
| Barra | borde superior (1 px) | `tab-bar-border` |
| Ítem | texto e ícono | `tab-bar-text` |
| Ítem actual | texto e ícono | `tab-bar-text-selected` |
| Insignia | fondo / texto | `badge-bg` / `badge-text` |
| Ítem:focus | contorno | `focus` (2 px, por dentro) |

`badge-bg` apunta al rojo de `button-destructive-fill` y `badge-text` a `text-on-pressed`.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta (menos de 672 px) | 11 / 0,6875 | Regular / 400 | `web-label-s` |
| Etiqueta (desde 672 px) | 14 / 0,875 | Regular / 400 | `web-label-m` |
| Insignia | 11 / 0,6875 | Medium / 500 | — |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Barra | relleno inferior | el área segura del teléfono |
| Lista | ancho máximo | 672 px, centrada |
| Lista | relleno lateral | 8 px |
| Ítem | ancho | repartido en partes iguales |
| Ítem | alto mínimo | 56 px |
| Ítem | radio | `radius-panel` |
| Ícono y etiqueta | separación | 2 px (apilados) · 8 px (en fila) |
| Insignia | alto, ancho mínimo | 18 px, 18 px; `radius-tag` |

> **Imagen pendiente:** anatomía acotada en el teléfono.

## Capas y movimiento

Con `fixed`, la barra está en `z-header`. El color de un ítem cambia en `duration-fast-01`.

## Contraste

Texto e íconos a 4,5:1 sobre `tab-bar-bg`; la insignia a 4,5:1, en los cuatro temas.
