---
element: Color
order: 1
tab: Uso
summary: Nuestro color: {v:marca} sobre los neutros de ALMA, en tres capas de tokens y cuatro temas.
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

- `interactive-01` ({v:acento}) es la acción principal de la vista. **Una por pantalla.** Si una pantalla se siente {v:acento}, tiene demasiado {v:acento}.
- `interactive-02` ({v:acento} muy oscuro y apagado) es la acción secundaria, con texto blanco.
- El texto sobre el {v:acento} es siempre `text-on-interactive`, {v:sobre}.
- Los enlaces, el foco y el contorno del botón terciario usan el color de acción: `link-01`{si accionMarca}{sino}, un azul{fin}.
{si profundo}
- En tema oscuro, el texto y los controles en {v:acento} usan pasos claros de la rampa. En tema claro usan el {v:acento} pleno.
{sino}
- En tema claro, lo que en oscuro es {v:acento} pasa a pasos oscuros de su rampa: el {v:acento} no llega a 3:1 sobre fondo claro.
{fin}

## Texto

| Token | Uso |
|---|---|
| `text-01` | Texto principal y títulos. |
| `text-02` | Texto secundario: ayudas, descripciones, metadatos. |
| `text-03` | Texto desactivado y marcadores de posición. |
| `text-error` | Mensajes de error. |
| `text-on-interactive` | Texto sobre el {v:acento}. |
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

{si profundo}{sino}
Las paletas de gráficos son las de ALMA, sin cambios.

{fin}
| Paleta | Tokens | Uso |
|---|---|---|
| Categórica | `viz-cat-01` a `viz-cat-08` | Series distintas, sin relación entre sí. Con más de 8, agrupa. |
| Secuencial | `viz-seq-1` a `viz-seq-5` | Valores de menos a más{si profundo}, en un solo tono, el {v:acento}{fin}. |
| Divergente | `viz-div-1` a `viz-div-5` | Desvíos alrededor de un centro neutro (`viz-div-3`). |

{si profundo}
### Categórica

Aplica las series estrictamente en este orden. La secuencia está pensada para que dos series vecinas se distingan lo más posible. No empieza por el color de marca: en un gráfico, el {v:acento} es una serie más.

| Serie | Token | Tema claro | Tema oscuro |
|---|---|---|---|
| 1 | `viz-cat-01` | Púrpura, `{token:viz-cat-01:light}` | Púrpura, `{token:viz-cat-01}` |
| 2 | `viz-cat-02` | Cian, `{token:viz-cat-02:light}` | Cian, `{token:viz-cat-02}` |
| 3 | `viz-cat-03` | Turquesa, `{token:viz-cat-03:light}` | Turquesa, `{token:viz-cat-03}` |
| 4 | `viz-cat-04` | Magenta, `{token:viz-cat-04:light}` | Magenta, `{token:viz-cat-04}` |
| 5 | `viz-cat-05` | Rojo, `{token:viz-cat-05:light}` | Rojo, `{token:viz-cat-05}` |
| 6 | `viz-cat-06` | Rojo muy oscuro, `{token:viz-cat-06:light}` | Rojo muy claro, `{token:viz-cat-06}` |
| 7 | `viz-cat-07` | Verde, `{token:viz-cat-07:light}` | Verde, `{token:viz-cat-07}` |
| 8 | `viz-cat-08` | Azul oscuro, `{token:viz-cat-08:light}` | Azul, `{token:viz-cat-08}` |

Cada color sale de las rampas de ALMA y llega a 3:1 sobre `ui-01` en su tema. Con una sola serie, usa `viz-cat-01`.

### Secuencial

En los temas claros, el valor más alto es el paso más oscuro (`viz-seq-5`, `{token:viz-seq-5:light}`). En los temas oscuros es el más claro (`{token:viz-seq-5}`).

Rotula las series o usa forma o trama: el color solo no basta. Dos tonos vecinos, como el azul y el púrpura, se confunden con facilidad: nunca los uses solos para separar dos cosas.
{sino}
Cada color categórico llega a 3:1 sobre `ui-01` en su tema. Rotula las series o usa forma o trama: el color solo no basta. Dos tonos vecinos, como el lima y el amarillo, se confunden con facilidad: nunca los uses solos para separar dos cosas.
{fin}

![Un gráfico de barras de viajes por mes con cuatro series (interurbano, rural, aeropuerto y turismo) y su leyenda, en tema oscuro y claro, con los colores viz-cat-01 a viz-cat-04.](assets/Fundamentos/color-grafico.png)

## Contraste

| Qué | Mínimo en Oscuro y Claro | Mínimo en alto contraste |
|---|---|---|
| Texto normal | 4,5:1 | 7:1 |
| Texto grande (24 px, o 19 px en negrita) | 3:1 | 4,5:1 |
| Bordes de controles, foco e íconos que informan | 3:1 | 3:1 |

## Evita

- No escribas un valor de color en una interfaz: pide el token.
- No uses una rampa base (`primary-500`) donde hay un rol semántico (`interactive-01`).
- No uses el {v:acento} para decorar.{si profundo}{sino}
- No pongas texto blanco sobre el {v:acento}: no se lee.{fin}
- Nunca diferencies dos estados solo por el color.
