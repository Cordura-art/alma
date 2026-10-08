---
component: BarChart
tab: Estilo
summary: Especificaciones visuales del gráfico de barras.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Barra | relleno | `interactive-01` |
| Barra sin énfasis | relleno | `text-03` |
| Barra categórica | relleno | `viz-cat-01` a `viz-cat-08` |
| Barra activa | contorno | `focus` |
| Líneas de guía | trazo | `border-subtle` |
| Línea de base | trazo | `text-03` |
| Título, valores | color del texto | `text-01` |
| Bajada, eje | color del texto | `text-02` |
| Detalle | fondo y borde | `ui-03` y `border-subtle`, con `shadow-floating` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título | 16 / 1 | `font-weight-emphasis` |
| Bajada | 14 / 0,875 | `font-weight-body` |
| Eje y valores | 12 / 0,75 | `font-weight-body` |
| Valor del detalle | 14 / 0,875 | `font-weight-emphasis` |

Todos los números usan cifras del mismo ancho.

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Gráfico vertical | alto | 240 px (`height`) |
| Barra vertical | ancho | 62 % de su espacio, hasta 64 px |
| Fila horizontal | alto | 32 px, con una barra de 16 px |
| Barra | esquinas | Rectas |
| Entre título y gráfico | separación | `space-16` |
| Contorno de foco | separación | `space-4` |

La separación entre dos barras nunca es menor que la mitad de su ancho.

## Movimiento

Las barras crecen desde la base una vez, al aparecer, con `duration-slow-01` y `easing-entrance-expressive`. Con movimiento reducido, están en su lugar desde el principio.
