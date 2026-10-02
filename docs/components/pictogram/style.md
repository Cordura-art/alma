---
component: Pictogram
tab: Estilo
summary: Especificaciones visuales del pictograma.
---


## Color

El pictograma hereda el color del texto (`currentColor`), igual que un ícono. Ponlo dentro de algo que ya use:

| Token | Uso |
|---|---|
| `icon-01` | El color por defecto. |
| `nav-selected` | Cuando quieras que se note: es el acento que alcanza contraste de texto en todos los temas. |

No trae colores propios, ni fondo.

## Tamaño

| Tamaño | Token | En rem |
|---|---|---|
| 24 px | `icon-size-lg` | 1,5 |
| 32 px | `icon-size-xl` | 2 |

Van en `rem`: crecen con el texto.

## Trazo

- Se dibuja en la misma grilla de 32 px de los íconos de Carbon, con su mismo trazo: 2 px en la grilla.
- Cada pictograma tiene entre dos y cinco piezas.
- Las esquinas siguen las de la entidad: redondas, o rectas cuando `radius-button` es 0.
- La letra usa la tipografía de la página, en peso 600 y a su ancho normal, aunque el texto de la entidad sea más ancho.

## Semilla

Cada sistema dibuja sus propios pictogramas: el mismo nombre da otro dibujo en otra entidad. La semilla es la fecha de nacimiento: ALMA usa la de Cordura, y cada entidad declara la suya en su hoja de valores (`--pictogram-seed`). Una entidad que no usa personajes lo declara ahí mismo (`--pictogram-characters: "no"`).

## Contraste

Un pictograma necesita 3:1 contra su fondo, como un ícono. La letra es texto pequeño: dale 4,5:1.
