# Color

El color de ALMA: tres capas de tokens, cuatro temas y un solo acento.


## Resumen

### Cómo funciona el color en ALMA

ALMA casi no usa color. La interfaz es un fondo negro, texto claro y un solo acento azul que marca la acción. Todo lo demás, los estados, las etiquetas y los gráficos, usa color solo cuando comunica algo, y siempre con una palabra o un ícono al lado.

Nunca se escribe un color: se pide un **token** por su nombre. El tema decide el valor. Por eso la misma interfaz funciona en los cuatro temas sin cambiar una línea.

![La misma pantalla de compra de un pasaje en los cuatro temas de ALMA, lado a lado: oscuro, claro, oscuro de alto contraste y claro de alto contraste.](assets/Fundamentos/color-cuatro-temas.png)

### Tres capas

Como en IBM Carbon, los tokens de color van en tres capas. Cada capa apunta a la anterior.

| Capa | Qué nombra | Ejemplos | Se usa en |
|---|---|---|---|
| **Base** | Los colores disponibles: marca y rampas de 50 a 900. | `brand-lime`, `primary-500`, `secondary-700`, `blue-60` | Solo dentro de las otras capas. Nunca directo en una interfaz. |
| **Semántica** | El papel en la interfaz. Cambia con el tema. | `ui-01`, `text-01`, `interactive-01`, `focus`, `support-01` | Pantallas, maquetas y componentes nuevos. |
| **Componente** | Una decisión de un componente, en un estado. | `button-filled-bg-hover`, `field-border-error`, `table-row-bg-selected` | Dentro de cada componente. |

Para ajustar un componente, cambia su token de componente, nunca el semántico: el cambio queda en ese componente y el resto del sistema no se entera.

![Las tres capas de tokens de color: el color base brand-lime alimenta al rol semántico interactive-01, que alimenta al token de componente button-filled-bg, el fondo del botón principal.](assets/Fundamentos/color-tres-capas.png)

### Los roles semánticos

| Familia | Tokens | Para qué |
|---|---|---|
| Superficies | `ui-01` a `ui-05` | Capas: la página es `ui-02`; los contenedores, `ui-01`; los paneles anidados, `ui-03` y `ui-04`. `ui-05` es un borde de énfasis. |
| Bordes | `border-subtle`, `border-control` | El borde sutil separa contenedores; el de control marca campos y selectores (3:1). |
| Texto | `text-01` a `text-05`, `text-error`, `text-on-interactive` | Principal, secundario, desactivado, sobre colores. |
| Íconos | `icon-01` a `icon-03` | Principal, secundario, sobre colores. |
| Acción | `interactive-01` a `interactive-04` | Azul para la acción principal; el mismo azul, muy oscuro y apagado, para la secundaria. |
| Estados de interacción | `hover-*`, `active-*`, `selected-ui`, `focus` | Encima, presionado, elegido y foco. |
| Estados del sistema | `support-01` a `support-04` | Error, éxito, advertencia, información. |
| Inversos | `inverse-01`, `inverse-02`, `inverse-support-*` | Superficies que invierten el tema, como el tooltip. |
| Velos | `overlay-01`, `tint-white-*`, `tint-dark-*` | Detrás de modales y sobre imágenes. |
| Pendiente | `pending-bg`, `pending-border`, `pending-text` | Solo en la documentación: marca en magenta lo que falta crear, como una imagen. |

### Capas de superficie

Las superficies se apilan en un orden fijo. Cada capa se distingue de la que tiene debajo, así la jerarquía se lee sin bordes ni sombras.

| Capa | Token | Claro | Oscuro | Qué va ahí |
|---|---|---|---|---|
| 1 | `ui-02` | Gris muy claro | El fondo más profundo | La página. |
| 2 | `ui-01` | Blanco | Blanco al 4 % sobre la página | Contenedores: tarjetas, menús, tablas, alertas. |
| 3 | `ui-03` | Gris claro | Blanco al 7 % | Un panel dentro de un contenedor. |
| 4 | `ui-04` | Gris medio claro | Blanco al 10 % | Una zona dentro de ese panel. |
| Acción | `interactive-01`, `interactive-02` | Azul y azul muy oscuro | Azul y azul muy oscuro | Los botones, sobre cualquier capa. |

No saltes capas hacia atrás: un contenedor dentro de otro `ui-01` pasa a `ui-03`, no vuelve a `ui-02`. En los dos temas cada capa de encima se despega de la anterior.

**Elevación en oscuro.** En el tema oscuro, subir una capa es acercarse a la luz: cada capa mezcla un poco más de blanco sobre la página `#02010C` (4, 7 y 10 %; 6, 12 y 18 % en alto contraste). La mezcla se guarda como un color sólido, no como transparencia. Así las capas anidadas no se suman entre sí, el contraste se puede verificar y el color es el mismo en CSS y en Flutter.

**Texto sobre cualquier capa.** `text-01`, `text-02` y `border-control` cumplen sobre las cuatro capas en los cuatro temas: 4,5:1 para texto y 3:1 para bordes de control, 7:1 para texto en alto contraste. El verificador del repositorio lo prueba en cada cambio.

**Las capas no son bordes.** Para separar un contenedor usa `border-subtle`; para marcar un control, `border-control`. Nunca uses `ui-03` o `ui-04` como borde: en oscuro están demasiado cerca del fondo para verse.

![Las cuatro capas de superficie anidadas en tema claro y oscuro: la página ui-02, un contenedor ui-01, un panel ui-03 y una zona ui-04 con los botones interactive-01 e interactive-02.](assets/Fundamentos/color-capas-superficie.png)

### Cuántos hay

ALMA tiene 495 tokens de color: los de marca, las rampas base, los roles semánticos, 18 colores de gráficos y los de cada componente. Todos están en la pestaña **Tokens** del sitio y en `tokens.json`.

## Uso

### Superficies

Las superficies se separan con color, no con sombra (el modelo de capas de Carbon):

| Capa | Token | Ejemplo |
|---|---|---|
| Página | `ui-02` | El fondo de toda la pantalla. |
| Primera capa | `ui-01` | Tarjetas, menús, tablas, modales. |
| Segunda capa | `ui-03` | Un panel dentro de una tarjeta. |
| Tercera capa | `ui-04` | Una zona dentro de ese panel. |
| Borde | `border-subtle` | Separadores y bordes de contenedores. |

Solo lo que flota sobre el contenido (menús, popovers, tooltips) lleva sombra: `shadow-floating`.

![Una pantalla en tema oscuro con sus tokens rotulados: la página en ui-02, una tarjeta en ui-01 con borde border-subtle y un menú abierto en ui-01 con la sombra shadow-floating.](assets/Fundamentos/color-pantalla-menu.png)

### Un acento

- `interactive-01` (azul) es la acción principal y el foco de la pieza. **Una por pantalla.** Si todo es azul, nada lo es.
- `interactive-02` (el mismo azul, muy oscuro y apagado) es la acción secundaria.
- El texto sobre ambos es siempre `text-on-interactive`.
- En tema oscuro, los bordes, las etiquetas y los controles encendidos usan pasos claros de la rampa azul, que se despegan del negro. En claro usan el azul de acción.

### Texto

| Token | Uso |
|---|---|
| `text-01` | Texto principal y títulos. |
| `text-02` | Texto secundario: ayudas, descripciones, metadatos. |
| `text-03` | Texto desactivado y marcadores de posición. |
| `text-error` | Mensajes de error. |
| `text-on-interactive` | Texto sobre el azul. |

### Estados del sistema

| Estado | Token | Siempre con |
|---|---|---|
| Error | `support-01` | La palabra o el ícono `error`. |
| Éxito | `support-02` | La palabra o el ícono `checkmark--outline`. |
| Advertencia | `support-03` | La palabra o el ícono `warning`. |
| Información | `support-04` | La palabra o el ícono `information`. |

El color nunca es la única pista. Los avisos usan `notification-*-bg` de fondo y `status-icon-*` en el ícono y el borde.

### Etiquetas

`Tag` tiene 11 colores (red, yellow, magenta, purple, blue, cyan, teal, green, warmgray, gray y coolgray), cada uno con su par `tag-<color>-bg` y `tag-<color>-text`. El color agrupa; la palabra informa.

### Gráficos

| Paleta | Tokens | Uso |
|---|---|---|
| Categórica | `viz-cat-01` a `viz-cat-08` | Series distintas, en ese orden: violeta, cian, turquesa, magenta, rojo, un rojo muy claro u oscuro según el tema, verde y azul. Con más de 8, agrupa. |
| Secuencial | `viz-seq-1` a `viz-seq-5` | Valores de menos a más. |
| Divergente | `viz-div-1` a `viz-div-5` | Desvíos alrededor de un centro neutro (`viz-div-3`). |

Cada color categórico llega a 3:1 sobre `ui-01` en su tema. Rotula las series o usa forma o trama: el color solo no basta.

![Un gráfico de barras de viajes por mes con cuatro series (interurbano, rural, aeropuerto y turismo) y su leyenda, en tema oscuro y claro, con los colores viz-cat-01 a viz-cat-04.](assets/Fundamentos/color-grafico.png)

### Contraste

| Qué | Mínimo en Oscuro y Claro | Mínimo en alto contraste |
|---|---|---|
| Texto normal | 4,5:1 | 7:1 |
| Texto grande (24 px, o 19 px en negrita) | 3:1 | 4,5:1 |
| Bordes de controles, foco e íconos que informan | 3:1 | 3:1 |

`npm test` revisa 580 pares de color en los cuatro temas antes de cada cambio.

### No

- No escribas un hex en una interfaz: pide el token.
- No uses una rampa base (`primary-500`) donde hay un rol semántico (`interactive-01`).
- No uses el azul de acción para decorar.
- No diferencies dos estados solo por el color.

## Código

### CSS

Carga `alma.css` (en `dist/css/`). Define cada token como variable CSS y los cuatro temas:

```css
.aviso { background: var(--ui-01); color: var(--text-01); border: 1px solid var(--border-subtle); }
.aviso:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
```

El tema lo elige el atributo `data-theme` de un contenedor, normalmente `<html>`: `dark` (por defecto), `light`, `dark-hc` o `light-hc`. Ver la página **Temas**.

### JavaScript

`dist/js/tokens.mjs` exporta los valores ya resueltos por tema:

```js
import { themes } from './dist/js/tokens.mjs';
themes.dark['interactive-01'];   // '#2667F2'
themes.light['interactive-01'];  // el valor del tema claro
```

Úsalo donde no llegan las variables CSS, como un gráfico en canvas.

### Flutter

`dist/dart/alma_tokens.dart` trae `AlmaColors`, una `ThemeExtension` con un campo por token, en camelCase, y los cuatro temas:

```dart
MaterialApp(theme: ThemeData(extensions: const [AlmaColors.dark]));
final c = Theme.of(context).extension<AlmaColors>()!;
Container(color: c.ui01, child: Text('Hola', style: TextStyle(color: c.text01)));
```

Los temas son `AlmaColors.dark`, `.light`, `.darkHc` y `.lightHc`.

### Cambiar un color

Los tokens viven en `tokens/` del repositorio, en formato W3C. Se cambian ahí, nunca en `dist/`:

1. Edita el valor en `tokens/themes/<tema>.json` o en `tokens/core/`.
2. `npm run build` genera CSS, JS, Dart y el `tokens.json` del artefacto.
3. `npm test` comprueba la ida y vuelta y el contraste de los 580 pares.
