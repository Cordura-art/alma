---
component: Table
tab: Estilo
summary: Especificaciones visuales de la tabla.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Contenedor | fondo | `table-bg` |
| Título | color del texto | `text-01` |
| Descripción | color del texto | `text-02` |
| Encabezado | color del texto / fondo | `table-header-text` / `table-bg` |
| Fila | borde inferior (1 px) | `table-border` |
| Fila:hover | fondo | `table-row-bg-hover` |
| Fila seleccionada o actual | fondo | `table-row-bg-selected` |
| Celda | color del texto | `text-01` |
| Tabla vacía | color del texto | `text-02` |
| Encabezado ordenable y fila:focus | contorno | `focus` (2 px, separado 2 px) |
| Zona de desplazamiento:focus | contorno | `focus` (2 px, por dentro) |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título | 16 / 1 | `font-weight-heading` | 1,5 |
| Descripción | 12 / 0,75 | `font-weight-body` | 1,72 |
| Encabezado | 12 / 0,75 | `font-weight-body` | — |
| Celda | 14 / 0,875 | `font-weight-body` | — |

Los números usan cifras tabulares (`tabular-nums`).

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Contenedor | radio | `radius-panel` |
| Cabecera (título) | relleno | 16 px arriba y a los lados, 8 px abajo |
| Celda | relleno lateral | 16 px |
| Columna de selección | ancho | 44 px |
| Ícono de orden | tamaño | 16 px (`arrows--vertical`, `arrow--up`, `arrow--down`) |
| Tabla vacía | relleno | 32 px arriba y abajo |
| Última fila | borde | sin borde inferior |

![Medidas de Table: alto de fila de 56 px, relleno de las celdas, alto del encabezado y radio del contenedor.](assets/Componentes/table-medidas.png)

## Tamaño

| Densidad | Fila | Encabezado |
|---|---|---|
| Normal | 56 px (`size-row`) | 44 px |
| Normal + `dense` | 44 px | 44 px |
| Compacta (puntero fino) | 40 px (`size-row-compact`) | 32 px |

## Movimiento

El fondo de la fila cambia en `duration-fast-01` con `easing-standard-productive`.

## Contraste

Celdas a 4,5:1 sobre `table-bg` y sobre las filas seleccionada y con hover; bordes decorativos. Verificado en los cuatro temas.
