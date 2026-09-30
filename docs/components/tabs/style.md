---
component: Tabs
tab: Estilo
summary: Especificaciones visuales de las pestañas.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Lista | borde inferior (1 px) | `tabs-border` |
| Pestaña | color del texto | `tabs-text` |
| Pestaña:hover | color del texto | `text-01` |
| Pestaña activa | color del texto | `tabs-text-selected` |
| Indicador | fondo | `tabs-indicator` |
| Pestaña:focus | contorno | `focus` (2 px, por dentro) |
| Panel:focus | contorno | `focus` (2 px, separado 2 px) |

`tabs-text-selected` y `tabs-indicator` apuntan a `nav-selected`: la pestaña activa cambia de color **y** de forma (el indicador).

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Pestaña | 14 / 0,875 | Regular / 400 | `web-label-m` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Pestañas | separación | 8 px |
| Pestaña | relleno lateral | 16 px |
| Pestaña | radio | `radius-nav` arriba |
| Indicador | alto, radio | 2 px, 2 px |
| Indicador | margen lateral | 16 px (mide lo mismo que la etiqueta) |
| Panel | relleno | 24 px arriba y abajo |

> **Imagen pendiente:** anatomía acotada.

## Tamaño

| Densidad | Alto de la pestaña (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

## Movimiento

El color del texto cambia en `duration-fast-01`; el indicador crece en `duration-moderate-01`, ambos con `easing-standard-productive`. Con movimiento reducido, el cambio es instantáneo.

## Contraste

Texto de las pestañas a 4,5:1 (7:1 en alto contraste) e indicador a 3:1, en los cuatro temas.
