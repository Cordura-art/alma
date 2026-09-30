# Tipografía

Una familia, Roboto Flex extendida, en tres escalas: web, app e impresión.


## Resumen

### La familia

ALMA usa una sola familia: **Roboto Flex**, siempre extendida (ancho 150). Es una fuente variable: un solo archivo tiene todos los anchos y pesos, y ALMA fija el ancho en 150 para que la marca se reconozca en cualquier tamaño. **Roboto Mono** se usa solo para código.

> **Imagen pendiente:** el alfabeto de Roboto Flex a ancho 100 y a ancho 150, con la diferencia marcada.

### Pesos

Los pesos vienen del theme de origen de Cordura. No hay otros.

| Peso | Valor | Uso |
|---|---|---|
| SemiBold | 600 | *Display*: titulares grandes. |
| Medium | 500 | Encabezados h1–h6, *headline*, *title* y citas. |
| Regular | 400 | Cuerpo y etiquetas. |

### Tres escalas

| Escala | Para | Estilos |
|---|---|---|
| **Web** | Sitios y aplicaciones web. | `web-display-*`, `web-h1` a `web-h6`, `web-body-*`, `web-label-*`, `web-blockquote` |
| **App** | Aplicaciones móviles. | `app-display-*`, `app-headline-*`, `app-title-*`, `app-body-*`, `app-label-*` |
| **Print** | Piezas impresas. | La escala App, con `print-body-s` a 9 px y `print-label-m` a 16/20. |

Cada estilo define la familia, el tamaño, el interlineado, el peso y el espaciado entre letras. Úsalos por su nombre, sin mezclar escalas en una misma pieza.

### Mismo peso en todos los temas

ALMA fija el suavizado del texto en `antialiased`, como IBM Carbon. Con el suavizado automático de macOS, el texto claro sobre fondo oscuro se veía entre 11 % y 17 % más grueso que en el tema claro; ahora la diferencia queda en ±6 %.

### Texto escalable

Los tamaños van en `rem` (16 px = 1 rem) y los interlineados sin unidad, así que el texto sigue el tamaño que elija la persona. Probado al 200 %: nada se recorta.

## Estilos

### Estilos web más usados

| Estilo | Tamaño | Peso | Uso |
|---|---|---|---|
| `web-display-l` | 128 px (8 rem) | 600 | Titular de portada. |
| `web-h1` | 40 px (2,5 rem) | 500 | Título de página. |
| `web-h2` | 32 px (2 rem) | 500 | Sección. |
| `web-h4` | 24 px (1,5 rem) | 500 | Subsección. |
| `web-h6` | 16 px (1 rem) | 500 | Encabezado menor. |
| `web-body-l` | 16 px (1 rem) | 400 | Texto de lectura larga. |
| `web-body-m` | 14 px (0,875 rem) | 400 | **Cuerpo por defecto.** |
| `web-body-s` | 12 px (0,75 rem) | 400 | Notas y descripciones. |
| `web-label-m` | 14 px (0,875 rem) | 400 | Controles y menús. |
| `web-label-s` | 11 px (0,6875 rem) | 400 | Botones pequeños, etiquetas de campo, ayudas. |

La tabla completa, con los 48 estilos de las tres escalas, está en la pestaña **Tokens**.

### Jerarquía

- Un solo `web-h1` por página: su título.
- No saltes niveles de encabezado para lograr un tamaño: el nivel dice la estructura, el estilo dice el aspecto. Si un `h3` debe verse más chico, dale otro estilo, no uses un `h5`.
- Cuanto más grande el texto, más espacio alrededor: un *display* respira con `space-56` a `space-80`.

> **Imagen pendiente:** una página tipo con `web-h1`, `web-h4`, `web-body-m` y `web-label-s`, con sus nombres rotulados.

### Medida de línea

- El texto de lectura va entre 45 y 75 caracteres por línea. En la web, un máximo de 48 rem.
- Los titulares se equilibran (`text-wrap: balance`) para no dejar una palabra sola.

### Mayúsculas

- Mayúscula solo al inicio, en títulos, botones y etiquetas: «Cambiar el nombre del pasajero».
- Mayúsculas completas solo en los títulos de grupo de `Sidebar`, con espaciado.

### Números gigantes

`web-display-xl` (640 px, 600) es el *display Xlarge* del theme de origen. Solo en portadas y carteles; nunca en una interfaz.

### Cifras

Donde los números se comparan en columna (tablas, precios, paginación), usa cifras del mismo ancho: `font-variant-numeric: tabular-nums`.

## Código

### Cargar la fuente

Roboto Flex con el eje de ancho, desde Google Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&family=Roboto+Mono:wght@400;500&display=swap">
```

### CSS

`alma.css` define la familia (`--font-flex`, `--font-mono`) y una clase por estilo:

```css
body { font-family: var(--font-flex); font-stretch: 150%; font-variation-settings: "wdth" 150;
       -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
```

```html
<h1 class="web-h1">Mis viajes</h1>
<p class="web-body-m">Próximos pasajes comprados.</p>
```

La clase trae tamaño, interlineado, peso y espaciado; el ancho 150 se hereda de `body`.

### JavaScript

```js
import { typography } from './dist/js/tokens.mjs';
typography['web-h1'];  // { fontSize, lineHeight, fontWeight, letterSpacing, … }
```

### Flutter

`AlmaTypography` trae cada estilo como `TextStyle`, con el ancho 150 como variación de la fuente:

```dart
Text('Mis viajes', style: AlmaTypography.webH1.copyWith(color: c.text01));
```

Agrega Roboto Flex como fuente variable del proyecto para que `FontVariation('wdth', 150)` tenga efecto.
