---
component: Skeleton
tab: Estilo
summary: Especificaciones visuales del esqueleto de carga.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Hueso | fondo | `skeleton-02`, al 55 % de opacidad |
| Brillo | color | `skeleton-01` |

## Estructura

| Forma | Alto | Radio |
|---|---|---|
| Texto | 12 px | `radius-chip` |
| Bloque | 120 px (o `height`) | `radius-panel` |
| Círculo | 44 × 44 px | 50 % |

Las líneas de texto se separan 8 px.

## Movimiento

El brillo cruza cada hueso cada 1,4 s con `easing-standard-productive`. Con movimiento reducido, el brillo queda fijo y el hueso semitransparente.

## Contraste

Es decorativo: no necesita contraste mínimo. Lo que informa es su `label`.
