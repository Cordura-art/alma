---
component: ProductCard
tab: Estilo
summary: Especificaciones visuales de la tarjeta de producto.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Tarjeta | fondo | `card-bg`; con el cursor encima, `card-bg-hover` |
| Tarjeta | borde | `card-border` |
| Imagen | fondo, mientras carga | `ui-03` |
| Insignia | fondo y texto | `ui-01` y `text-01` |
| Nombre, precio | texto | `text-01` |
| Categoría, descripción, precio anterior, nota, «Agotado» | texto | `text-02` |
| Foco | contorno | `focus` |

## Tipografía

| Elemento | Tamaño | Peso |
|---|---|---|
| Nombre | 18 px | `font-weight-heading` |
| Precio | 20 px, cifras tabulares | `font-weight-emphasis` |
| Descripción, precio anterior | 14 px | `font-weight-body` |
| Categoría, nota, insignia | 12 px | — |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Tarjeta | ancho | hasta 320 px; en fila, hasta 576 px |
| Tarjeta | radio | `radius-panel` |
| Imagen | proporción | 4 a 3; en fila, cuadrada y de 160 px |
| Cuerpo | relleno | `space-16` a los lados, `space-24` abajo |
| Cuerpo | entre líneas | `space-8` |
| Insignia | desde el borde | `space-16` |
| Acción | relleno | `space-16` |

![Medidas de ProductCard: 320 px de ancho como máximo, la imagen en proporción 4 a 3, relleno de 16 px a los lados y 8 px entre las líneas del texto.](assets/Componentes/product-card-medidas.png)
