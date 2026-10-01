---
element: Color
order: 1
tab: Uso
summary: Nuestro color: un azul pleno sobre los neutros de ALMA, en tres capas de tokens y cuatro temas.
---

## Superficies

Las superficies se separan con color, no con sombra:

| Capa | Token | Ejemplo |
|---|---|---|
| Página | `ui-02` | El fondo de toda la pantalla. |
| Primera capa | `ui-01` | Tarjetas, menús, tablas, modales. |
| Segunda capa | `ui-03` | Un panel dentro de una tarjeta. |
| Tercera capa | `ui-04` | Una zona dentro de ese panel. |
| Borde | `border-subtle` | Separadores y bordes de contenedores. |

Solo lo que flota sobre el contenido (menús, popovers, tooltips) lleva sombra: `shadow-floating`.

![Una pantalla en tema oscuro con sus tokens rotulados: la página en ui-02, una tarjeta en ui-01 con borde border-subtle y un menú abierto en ui-01 con la sombra shadow-floating.](assets/Fundamentos/color-pantalla-menu.png)

## Un acento

- `interactive-01` (azul) es la acción principal de la vista. **Una por pantalla.** Si una pantalla se siente azul, tiene demasiado azul.
- `interactive-02` (acero) es la acción secundaria.
- El texto sobre la acción principal es siempre `text-on-interactive`.
- En tema oscuro, el texto y los controles en azul usan pasos claros de la rampa (`primary-300` y `primary-400`). En tema claro usan el azul pleno.

## Texto

| Token | Uso |
|---|---|
| `text-01` | Texto principal y títulos. |
| `text-02` | Texto secundario: ayudas, descripciones, metadatos. |
| `text-03` | Texto desactivado y marcadores de posición. |
| `text-error` | Mensajes de error. |
| `text-on-interactive` | Texto sobre el acento. |
| `link-01` | Enlaces. |

## Estados del sistema

| Estado | Token | Siempre con |
|---|---|---|
| Error | `support-01` | La palabra o el ícono `error`. |
| Éxito | `support-02` | La palabra o el ícono `checkmark--outline`. |
| Advertencia | `support-03` | La palabra o el ícono `warning`. |
| Información | `support-04` | La palabra o el ícono `information`. |

El color nunca es la única pista. Los avisos usan `notification-*-bg` de fondo y `status-icon-*` en el ícono y el borde.

## Etiquetas

`Tag` tiene 11 colores (red, yellow, magenta, purple, blue, cyan, teal, green, warmgray, gray y coolgray), cada uno con su par `tag-<color>-bg` y `tag-<color>-text`. El color agrupa; la palabra informa.

## Gráficos

Las paletas de gráficos son las de ALMA, sin cambios: un conjunto probado, serie por serie.

| Paleta | Tokens | Uso |
|---|---|---|
| Categórica | `viz-cat-01` a `viz-cat-08` | Series distintas, en el orden de ALMA: lima, azul, magenta, turquesa, amarillo, violeta, cian, rojo. Con más de 8, agrupa. |
| Secuencial | `viz-seq-1` a `viz-seq-5` | Valores de menos a más. |
| Divergente | `viz-div-1` a `viz-div-5` | Desvíos alrededor de un centro neutro (`viz-div-3`). |

Cada color categórico llega a 3:1 sobre `ui-01` en su tema. Rotula las series o usa forma o trama: el color solo no basta. El azul y el púrpura se confunden con facilidad: nunca los uses solos para separar dos cosas.

![Un gráfico de barras de viajes por mes con cuatro series (interurbano, rural, aeropuerto y turismo) y su leyenda, en tema oscuro y claro, con los colores viz-cat-01 a viz-cat-04.](assets/Fundamentos/color-grafico.png)

## Contraste

| Qué | Mínimo en Oscuro y Claro | Mínimo en alto contraste |
|---|---|---|
| Texto normal | 4,5:1 | 7:1 |
| Texto grande (24 px, o 19 px en negrita) | 3:1 | 4,5:1 |
| Bordes de controles, foco e íconos que informan | 3:1 | 3:1 |

## Evita

- No escribas un valor de color en una interfaz: pide el token.
- No uses una rampa base (`primary-600`) donde hay un rol semántico (`interactive-01`).
- No uses el azul para decorar.
- Nunca diferencies dos estados solo por el color.
