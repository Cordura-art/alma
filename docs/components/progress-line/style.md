---
component: ProgressLine
tab: Estilo
summary: Especificaciones visuales de la línea de progreso.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Brillo (cargando) | color | `progress-line-loading` (`brand-lime`) |
| Línea (terminada) | color | `progress-line-success` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Línea | ancho, alto | 185 px, 2 px |
| Línea | radio | 1 px |

## Movimiento

El brillo recorre la línea cada 1,4 s (dos veces `duration-slow-02`) con `easing-standard-expressive`. Con movimiento reducido, el brillo queda fijo.

## Contraste

Sobre `overlay-01`, el lima llega a 3:1. En la interfaz normal no se usa.
