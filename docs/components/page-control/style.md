---
component: PageControl
tab: Estilo
summary: Especificaciones visuales del control de páginas.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Punto | fondo | `page-control-dot` |
| Página actual | fondo | `page-control-dot-selected` (`nav-selected`) |
| Punto:focus | contorno | `focus` (2 px, por dentro) |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Punto | tamaño | 8 × 8 px |
| Página actual | tamaño | 24 × 8 px, `radius-pill` |
| Área de toque del punto | tamaño | 24 × 44 px (32 × 44 en el actual) |

![Medidas de PageControl: puntos de 8 px, área táctil de 44 px por punto y separación entre puntos.](assets/Componentes/page-control-medidas.png)

## Movimiento

La píldora cambia de ancho en `duration-moderate-01` con `easing-standard-productive`.

## Contraste

Puntos a 3:1 sobre la página, en los cuatro temas.
