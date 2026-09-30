---
element: Tipografía
order: 2
tab: Resumen
summary: Una familia, Roboto Flex extendida, en tres escalas: web, app e impresión.
---

## La familia

ALMA usa una sola familia: **Roboto Flex**, siempre extendida (ancho 150). Es una fuente variable: un solo archivo tiene todos los anchos y pesos, y ALMA fija el ancho en 150 para que la marca se reconozca en cualquier tamaño. **Roboto Mono** se usa solo para código.

> **Imagen pendiente:** el alfabeto de Roboto Flex a ancho 100 y a ancho 150, con la diferencia marcada.

## Ejes de Roboto Flex

Roboto Flex tiene varios ejes; ALMA fija dos para todo el texto, como tokens:

| Token | Eje | Valor | Qué hace |
|---|---|---|---|
| `font-width` | `wdth` (25 a 151) | 125 | El ancho: 125, extendido sin llegar al máximo de Roboto Flex (151). |
| `font-grade` | `GRAD` (−200 a 150) | 0 | El grado, en su punto neutro: engrosa o aligera el trazo sin cambiar el ancho del texto, así nada se mueve de lugar. |

El peso (`wght`) va en cada estilo de texto. Para probar otros valores sobre componentes reales, usa la herramienta **Ajustes de ALMA** (`npm run tuner`).

## Pesos

Un peso por rol, ajustado el 30 de septiembre de 2026 con **Ajustes de ALMA** (los del theme de origen eran 600, 500 y 400).

| Peso | Valor | Uso |
|---|---|---|
| Medium | 500 | *Display*: titulares grandes. |
| Entre Light y Regular | 350 | Encabezados h1–h6, *headline*, *title* y citas. |
| Entre Light y Regular | 350 | Cuerpo y etiquetas. |

El *display* se distingue por peso; títulos y cuerpo comparten peso y se distinguen por tamaño. Los pesos se aplican a los estilos de texto (`web-*`, `app-*`, `print-*`); el texto propio de los componentes conserva el peso de su CSS.

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
