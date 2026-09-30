---
element: Tipografía
order: 2
tab: Resumen
summary: Una familia, Roboto Flex extendida, en tres escalas: web, app e impresión.
---

## La familia

ALMA usa una sola familia: **Roboto Flex**, siempre extendida. Es una fuente variable: un solo archivo tiene todos los anchos, grados y pesos, y ALMA los fija con tokens para que la marca se reconozca en cualquier tamaño. **Roboto Mono** se usa solo para código.

> **Imagen pendiente:** el alfabeto de Roboto Flex a ancho 100 y al ancho de ALMA (`font-width`), con la diferencia marcada.

## Ejes de Roboto Flex

Roboto Flex tiene varios ejes; ALMA fija dos para todo el texto, como tokens:

| Token | Eje | Valor | Qué hace |
|---|---|---|---|
| `font-width` | `wdth` (25 a 151) | 130 | El ancho: 130, extendido sin llegar al máximo de Roboto Flex (151). |
| `font-grade` | `GRAD` (−200 a 150) | 20 | El grado, un poco sobre el neutro (0): engrosa o aligera el trazo sin cambiar el ancho del texto, así nada se mueve de lugar. |

El peso (`wght`) va por rol, en los tokens `font-weight-*` de la sección siguiente. Para probar otros valores sobre componentes reales, usa la herramienta **Ajustes de ALMA** (`npm run tuner`).

## Pesos

Un token de peso por rol, ajustado el 30 de septiembre de 2026 con **Ajustes de ALMA** (los del theme de origen eran 600, 500 y 400). Los estilos de texto y los componentes usan estos tokens: cambiar uno cambia todo el texto de ese rol.

| Token | Valor | Uso |
|---|---|---|
| `font-weight-display` | 220 | *Display*: titulares grandes. |
| `font-weight-heading` | 350 | Encabezados h1–h6, *headline*, *title*, citas y títulos de componentes (Card, Alert, Modal, Toolbar, Accordion…). |
| `font-weight-body` | 350 | Cuerpo y etiquetas, y todo el texto de los componentes que no es título ni énfasis. |
| `font-weight-emphasis` | 500 | Énfasis dentro de un componente: opción elegida, página actual, insignias, títulos de grupo, enlaces sueltos, negritas. |

El *display* es más liviano que el resto: a su tamaño, un trazo fino se lee bien y se ve elegante. Títulos y cuerpo comparten peso y se distinguen por tamaño; `font-weight-emphasis` marca lo elegido o lo actual sin cambiar el tamaño.

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
