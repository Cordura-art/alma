---
element: Tipografía
order: 2
tab: Estilos
summary: Una familia, Roboto Flex en su ancho natural y con pesos livianos, en tres escalas: web, app e impresión.
---

## Estilos web más usados

| Estilo | Tamaño | Peso | Uso |
|---|---|---|---|
| `web-display-l` | 128 px (8 rem) | {token:font-weight-display} | Titular de portada. |
| `web-h1` | 40 px (2,5 rem) | {token:font-weight-heading} | Título de página. |
| `web-h2` | 32 px (2 rem) | {token:font-weight-heading} | Sección. |
| `web-h4` | 24 px (1,5 rem) | {token:font-weight-heading} | Subsección. |
| `web-h6` | 16 px (1 rem) | {token:font-weight-heading} | Encabezado menor. |
| `web-body-l` | 16 px (1 rem) | {token:font-weight-body} | Texto de lectura larga. |
| `web-body-m` | 14 px (0,875 rem) | {token:font-weight-body} | **Cuerpo por defecto.** |
| `web-body-s` | 12 px (0,75 rem) | {token:font-weight-body} | Notas, fuentes y leyendas. |
| `web-label-m` | 14 px (0,875 rem) | {token:font-weight-body} | Controles y menús. |
| `web-label-s` | 11 px (0,6875 rem) | {token:font-weight-body} | Botones pequeños, etiquetas de campo, ayudas. |

La tabla completa, con los estilos de las tres escalas, está en la pestaña **Tokens**.

## Jerarquía

- Un solo `web-h1` por página: su título.
- No saltes niveles de encabezado para lograr un tamaño: el nivel dice la estructura, el estilo dice el aspecto. Si un `h3` debe verse más chico, dale otro estilo, no uses un `h5`.
- Cuanto más grande el texto, más espacio alrededor: un *display* respira con `space-56` a `space-80`.

![Una página tipo con los estilos web-h1, web-h4, web-body-m y web-label-s, cada uno con su nombre, tamaño y peso rotulados.](assets/Tipografia/pagina.png)

## Medida de línea

- El texto de lectura va entre 45 y 75 caracteres por línea. En la web, un máximo de 48 rem.
- Los titulares se equilibran (`text-wrap: balance`) para no dejar una palabra sola.

## Mayúsculas

- Mayúscula solo al inicio, en títulos, botones y etiquetas: «Revisar la propuesta».
- Mayúsculas completas solo en los títulos de grupo de `Sidebar`, con espaciado.

## Números gigantes

`web-display-xl` (640 px, {token:font-weight-display}) va solo en portadas y carteles; nunca en una interfaz.

## Cifras

Donde los números se comparan en columna (tablas, precios, paginación), usa cifras del mismo ancho: `font-variant-numeric: tabular-nums`.
