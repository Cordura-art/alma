---
component: LineChart
tab: Estilo
summary: Especificaciones visuales del gráfico de líneas.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Línea | trazo | `interactive-01` |
| Línea sin énfasis | trazo | `text-03` |
| Línea categórica | trazo | `viz-cat-01` a `viz-cat-08` |
| Punto activo | relleno y contorno | El de su línea, y `ui-02` |
| Guía vertical | trazo | `text-03`, punteada |
| Líneas de guía | trazo | `border-subtle` |
| Nombres de serie, título | color del texto | `text-01` |
| Bajada, eje, leyenda | color del texto | `text-02` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título | 16 / 1 | `font-weight-emphasis` |
| Bajada | 14 / 0,875 | `font-weight-body` |
| Eje, nombres, leyenda | 12 / 0,75 | `font-weight-body` |

Todos los números usan cifras del mismo ancho.

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Gráfico | alto | 240 px (`height`) |
| Línea | grosor | 2 px; 3 px la que está activa |
| Punto | radio | 3 px, visible con ocho valores o menos |
| Punto activo | radio | 5 px |
| Área | relleno | El color de su línea, al 24 % |
| Rótulos del eje | separación | Al menos 64 px entre uno y otro; se saltan los que no caben |

## Movimiento

Las líneas se trazan una vez, al aparecer, con `duration-slow-02` y `easing-entrance-expressive`. Con movimiento reducido, están completas desde el principio.
