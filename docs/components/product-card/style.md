---
component: ProductCard
tab: Estilo
summary: Especificaciones visuales de la tarjeta de producto.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Tarjeta | fondo | `product-card-bg`, o `tag-<tono>-bg` |
| Título y texto | color | `product-card-text` (`text-on-interactive`) |
| Dato destacado | color | `product-card-subtitle` |
| Botón | fondo | `product-card-toggle-bg` (`brand-white`) |
| Botón:focus | contorno | `focus` (2 px, separado 2 px) |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Estilo de texto |
|---|---|---|
| Título | 16 / 1 | `web-label-l` |
| Dato destacado | 20 / 1,25 | `web-label-xl` |
| Texto | 14 / 0,875, al 87 % de opacidad | `web-body-m` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Tarjeta | ancho | 328 px (20,5 rem) |
| Tarjeta | radio | `radius-panel` |
| Cabecera | relleno | 16 px |
| Imagen | alto | 245 px, recortada |
| Texto | relleno | 20 px arriba y abajo, 16 px a los lados |
| Botón | relleno, radio | 4 px, `radius-pill`; área de toque de 44 px |

> **Imagen pendiente:** anatomía acotada.

## Movimiento

El contenido aparece bajando 4 px en `duration-moderate-02` con `easing-entrance-productive`. Con movimiento reducido, sin animación.

## Contraste

Texto a 4,5:1 sobre los once fondos de etiqueta, en los cuatro temas.
