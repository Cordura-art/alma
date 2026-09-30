---
element: Tipografía
order: 2
tab: Resumen
summary: Una familia, Roboto Flex extendida, en tres escalas: web, app e impresión.
---

## La familia

ALMA usa una sola familia: **Roboto Flex**, siempre extendida (ancho 150). Es una fuente variable: un solo archivo tiene todos los anchos y pesos, y ALMA fija el ancho en 150 para que la marca se reconozca en cualquier tamaño. **Roboto Mono** se usa solo para código.

> **Imagen pendiente:** el alfabeto de Roboto Flex a ancho 100 y a ancho 150, con la diferencia marcada.

## Pesos

Los pesos vienen del theme de origen de Cordura. No hay otros.

| Peso | Valor | Uso |
|---|---|---|
| SemiBold | 600 | *Display*: titulares grandes. |
| Medium | 500 | Encabezados h1–h6, *headline*, *title* y citas. |
| Regular | 400 | Cuerpo y etiquetas. |

## Tres escalas

| Escala | Para | Estilos |
|---|---|---|
| **Web** | Sitios y aplicaciones web. | `web-display-*`, `web-h1` a `web-h6`, `web-body-*`, `web-label-*`, `web-blockquote` |
| **App** | Aplicaciones móviles. | `app-display-*`, `app-headline-*`, `app-title-*`, `app-body-*`, `app-label-*` |
| **Print** | Piezas impresas. | La escala App, con `print-body-s` a 9 px y `print-label-m` a 16/20. |

Cada estilo define la familia, el tamaño, el interlineado, el peso y el espaciado entre letras. Úsalos por su nombre, sin mezclar escalas en una misma pieza.

## Mismo peso en todos los temas

ALMA fija el suavizado del texto en `antialiased`, como IBM Carbon. Con el suavizado automático de macOS, el texto claro sobre fondo oscuro se veía entre 11 % y 17 % más grueso que en el tema claro; ahora la diferencia queda en ±6 %.

## Texto escalable

Los tamaños van en `rem` (16 px = 1 rem) y los interlineados sin unidad, así que el texto sigue el tamaño que elija la persona. Probado al 200 %: nada se recorta.
