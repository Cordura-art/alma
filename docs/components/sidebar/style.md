---
component: Sidebar
tab: Estilo
summary: Especificaciones visuales de la barra lateral.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Panel | fondo | `sidebar-bg` |
| Título de grupo | color del texto | `text-02` |
| Destino | color del texto | `text-01` |
| Ícono del destino | relleno | `icon-02` |
| Destino:hover | fondo | `sidebar-item-bg-hover` |
| Destino actual | fondo | `sidebar-item-bg-selected` |
| Destino actual | texto e ícono | `sidebar-item-text-selected` |
| Contador | color del texto | `text-02` |
| Destino y título:focus | contorno | `focus` (2 px, por dentro) |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Título de grupo (mayúsculas) | 11 / 0,6875 | Regular / 400 | `web-label-s` |
| Destino | 14 / 0,875 | Regular / 400 | `web-label-m` |
| Contador | 11 / 0,6875 | Regular / 400 | `web-label-s` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Panel | ancho | 280 px (17,5 rem) |
| Panel | relleno, radio | 8 px, `radius-panel` |
| Grupos | separación | 16 px |
| Título de grupo | alto mínimo | 36 px |
| Destino | relleno lateral | 16 px |
| Destino | radio | `radius-nav` |
| Ícono y etiqueta | separación | 16 px |
| Botón y panel | separación | 8 px |

Una etiqueta que no cabe se corta con puntos suspensivos.

> **Imagen pendiente:** anatomía acotada.

## Tamaño

| Densidad | Alto del destino (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

## Movimiento

El panel aparece bajando 4 px en `duration-moderate-01` con `easing-entrance-productive`; el fondo de un destino cambia en `duration-fast-01`. Con movimiento reducido, sin animación.

## Contraste

Textos a 4,5:1 sobre `sidebar-bg` y sobre `selected-ui` (7:1 en alto contraste), en los cuatro temas.
