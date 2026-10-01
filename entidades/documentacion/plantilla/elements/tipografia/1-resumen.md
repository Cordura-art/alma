---
element: Tipografía
order: 2
tab: Resumen
summary: Una familia, Roboto Flex {v:ancho}, en tres escalas: web, app e impresión.
---

## La familia

{L:tipografia.lede}

Escribimos con una sola familia: **Roboto Flex**, {v:ancho}. Es una fuente variable: un solo archivo tiene todos los anchos, grados y pesos, y los fijamos con tokens para que nuestra letra sea la misma en cualquier tamaño. **Roboto Mono** se usa solo para código.

## Ejes de Roboto Flex

Roboto Flex tiene varios ejes. Fijamos dos para todo el texto, como tokens:

| Token | Eje | Valor | Qué hace |
|---|---|---|---|
| `font-width` | `wdth` (25 a 151) | {token:font-width} | {v:anchoNota} |
| `font-grade` | `GRAD` (−200 a 150) | {token:font-grade} | {v:gradoNota} |

El peso (`wght`) va por rol, en los tokens `font-weight-*`.

## Pesos

Un token de peso por rol. Los estilos de texto y los componentes usan estos tokens: cambiar uno cambia todo el texto de ese rol.

| Token | Valor | Uso |
|---|---|---|
| `font-weight-display` | {token:font-weight-display} | *Display*. {L:tipografia.pesos.0} |
| `font-weight-heading` | {token:font-weight-heading} | Encabezados h1–h6, *headline*, *title*, citas y títulos de componentes. {L:tipografia.pesos.1} |
| `font-weight-body` | {token:font-weight-body} | Cuerpo y etiquetas, y todo el texto de los componentes que no es título ni énfasis. {L:tipografia.pesos.2} |
| `font-weight-emphasis` | {token:font-weight-emphasis} | Énfasis: la opción elegida y la página actual. {L:tipografia.pesos.3} |

{si pesosIguales}Títulos y cuerpo comparten peso y se distinguen por tamaño. {fin}El énfasis es el peso más fuerte del texto: úsalo poco.

## Tres escalas

| Escala | Para | Estilos |
|---|---|---|
| **Web** | Sitios y aplicaciones web. | `web-display-*`, `web-h1` a `web-h6`, `web-body-*`, `web-label-*`, `web-blockquote` |
| **App** | Aplicaciones móviles. | `app-display-*`, `app-headline-*`, `app-title-*`, `app-body-*`, `app-label-*` |
| **Print** | Piezas impresas. | La escala App, con `print-body-s` a 9 px y `print-label-m` a 16/20. |

Cada estilo define la familia, el tamaño, el interlineado, el peso y el espaciado entre letras. Úsalos por su nombre, sin mezclar escalas en una misma pieza.

## Mismo peso en todos los temas

El suavizado del texto es `antialiased`, como en ALMA. Así el texto claro sobre fondo oscuro no se ve más grueso que el texto oscuro sobre fondo claro.

## Texto escalable

Los tamaños van en `rem` (16 px = 1 rem) y los interlineados sin unidad, así que el texto sigue el tamaño que elija la persona.
