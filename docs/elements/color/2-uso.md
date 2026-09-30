---
element: Color
order: 1
tab: Uso
summary: El color de ALMA: tres capas de tokens, cuatro temas y un solo acento.
---

## Superficies

Las superficies se separan con color, no con sombra (el modelo de capas de Carbon):

| Capa | Token | Ejemplo |
|---|---|---|
| Página | `ui-02` | El fondo de toda la pantalla. |
| Primera capa | `ui-01` | Tarjetas, menús, tablas, modales. |
| Segunda capa y bordes | `ui-03` | Separadores, bordes de contenedores. |

Solo lo que flota sobre el contenido (menús, popovers, tooltips) lleva sombra: `shadow-floating`.

> **Imagen pendiente:** una pantalla con la página, una tarjeta y un menú abierto, con sus tokens rotulados.

## Un acento

- `interactive-01` (lima) es la acción principal y el foco de la pieza. **Una por pantalla.** Si todo es lima, nada lo es.
- `interactive-02` (acero) es la acción secundaria.
- El texto sobre ambos es siempre `text-on-interactive`.
- En tema claro, lo que en oscuro es lima pasa a tonos oliva y acero oscuros: el lima no llega a 3:1 sobre fondo claro.

## Texto

| Token | Uso |
|---|---|
| `text-01` | Texto principal y títulos. |
| `text-02` | Texto secundario: ayudas, descripciones, metadatos. |
| `text-03` | Texto desactivado y marcadores de posición. |
| `text-error` | Mensajes de error. |
| `text-on-interactive` | Texto sobre lima o acero. |

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

| Paleta | Tokens | Uso |
|---|---|---|
| Categórica | `viz-cat-01` a `viz-cat-08` | Series distintas, en ese orden: lima, azul, magenta, turquesa, amarillo, violeta, cian, rojo. Con más de 8, agrupa. |
| Secuencial | `viz-seq-1` a `viz-seq-5` | Valores de menos a más. |
| Divergente | `viz-div-1` a `viz-div-5` | Desvíos alrededor de un centro neutro (`viz-div-3`). |

Cada color categórico llega a 3:1 sobre `ui-01` en su tema. Rotula las series o usa forma o trama: el color solo no basta.

> **Imagen pendiente:** un gráfico de barras con 4 series y su leyenda rotulada, en tema oscuro y claro.

## Contraste

| Qué | Mínimo en Oscuro y Claro | Mínimo en alto contraste |
|---|---|---|
| Texto normal | 4,5:1 | 7:1 |
| Texto grande (24 px, o 19 px en negrita) | 3:1 | 4,5:1 |
| Bordes de controles, foco e íconos que informan | 3:1 | 3:1 |

`npm test` revisa 580 pares de color en los cuatro temas antes de cada cambio.

## No

- No escribas un hex en una interfaz: pide el token.
- No uses una rampa base (`primary-500`) donde hay un rol semántico (`interactive-01`).
- No uses el lima para decorar.
- No diferencies dos estados solo por el color.
