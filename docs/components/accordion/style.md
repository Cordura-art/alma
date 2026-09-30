---
component: Accordion
tab: Estilo
summary: Especificaciones visuales del acordeón.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Separadores | borde (1 px) | `accordion-border` |
| Título | color del texto | `text-01` |
| Título:hover | fondo | `accordion-header-bg-hover` |
| Título desactivado | color del texto | `disabled-03` |
| Flecha | relleno | `icon-02` |
| Título:focus | contorno | `focus` (2 px, por dentro) |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título | 14 / 0,875 | `font-weight-heading` | — |
| Contenido | 14 / 0,875 | `font-weight-body` | 1,6 |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Acordeón | ancho máximo | 672 px (42 rem) |
| Título | relleno | 8 px arriba y abajo, 16 px a los lados |
| Título y flecha | separación | 16 px |
| Contenido | relleno | 16 px a los lados, 24 px abajo |

![Medidas de Accordion: alto del título de 44 px, relleno del título y del contenido, y borde entre secciones.](assets/Componentes/accordion-medidas.png)

## Tamaño

| Densidad | Alto mínimo del título (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

## Movimiento

La flecha gira en `duration-fast-02`; el contenido aparece bajando 4 px en `duration-moderate-02` con `easing-entrance-productive`. Con movimiento reducido, sin animación.

## Contraste

Títulos y contenido a 4,5:1; flecha a 3:1, en los cuatro temas.
