---
component: ScatterChart
tab: Estilo
summary: Especificaciones visuales del gráfico de puntos.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Punto | relleno | `interactive-01` |
| Punto de un grupo | relleno | `viz-cat-01` a `viz-cat-08` |
| Punto activo | relleno y contorno | El suyo, y `ui-02` |
| Líneas de guía | trazo | `border-subtle` |
| Línea de base | trazo | `text-03` |
| Nombres de punto, título | color del texto | `text-01` |
| Bajada, ejes, leyenda | color del texto | `text-02` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título | 16 / 1 | `font-weight-emphasis` |
| Bajada | 14 / 0,875 | `font-weight-body` |
| Ejes, nombres, leyenda | 12 / 0,75 | `font-weight-body` |

Todos los números usan cifras del mismo ancho.

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Gráfico | alto | 280 px (`height`) |
| Punto | diámetro | 8 px |
| Punto activo | diámetro | 12 px |
| Área que responde alrededor de un punto | radio | 24 px |
| Nombre de un eje | lugar | El de lo alto, arriba a la izquierda; el de lo ancho, abajo a la derecha. Sin texto girado. |

Los puntos son un poco transparentes, para que se note cuando dos caen en el mismo lugar.
