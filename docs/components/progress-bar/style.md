---
component: ProgressBar
tab: Estilo
summary: Especificaciones visuales de la barra de progreso.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Pista | fondo | `progress-bar-track` |
| Relleno | fondo | `progress-bar-fill` |
| Relleno (éxito) | fondo | `progress-bar-fill-success` |
| Relleno (error) | fondo | `progress-bar-fill-error` |
| Etiqueta | color del texto | `text-01` |
| Porcentaje y descripción | color del texto | `text-02` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta y porcentaje | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Descripción | 12 / 0,75 | `font-weight-body` | `web-body-s` |

El porcentaje usa cifras tabulares.

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Barra | ancho máximo | 480 px |
| Pista | alto, radio | 8 px, `radius-pill` |
| Tramo indeterminado | ancho | 35 % de la pista |
| Elementos | separación | 8 px |

![Medidas de ProgressBar: pista de 8 px con radio completo, separación entre etiqueta y pista, y entre pista y descripción.](assets/Componentes/progress-bar-medidas.png)

## Movimiento

El relleno avanza en `duration-moderate-02` con `easing-standard-productive`. El tramo indeterminado recorre la pista cada 1,4 s. Con movimiento reducido, el tramo queda fijo, a todo el ancho y semitransparente.

## Contraste

Relleno a 3:1 sobre la pista; textos a 4,5:1, en los cuatro temas.
