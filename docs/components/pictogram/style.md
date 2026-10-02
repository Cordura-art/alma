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

- Se dibuja en la misma grilla de 32 px de los íconos.
- El grosor sigue el peso del texto: 2 px en la grilla cuando `font-weight-body` es 400, y proporcional a ese peso. Con el peso de ALMA (350) son 1,75 px.
- El remate de las líneas sigue las esquinas: redondo, o recto cuando `radius-button` es 0.

## Semilla

Cada sistema dibuja sus propios pictogramas: el mismo nombre da otro dibujo en otra entidad. La semilla es la fecha de nacimiento: ALMA usa la de Cordura, y cada entidad declara la suya en su hoja de valores (`--pictogram-seed`).

## Contraste

Un pictograma necesita 3:1 contra su fondo, como un ícono.
