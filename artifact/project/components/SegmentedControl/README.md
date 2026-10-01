# SegmentedControl

Un selector de una opción entre pocas alternativas, con una pieza que se desliza a la opción elegida.


## Uso

### Resumen

`SegmentedControl` elige una opción entre dos y cuatro, todas visibles, y cambia la vista al instante. Nace de la pantalla de pasajes de Cordura («Ida / Ida y regreso / Por cobrar») y es el *segmented control* de Apple.

#### Cuándo usarlo
- Cambiar entre vistas o modos de la misma información: «Ida» o «Ida y regreso».
- Filtrar una lista por un criterio con pocas opciones.
- Idealmente 2 o 3 opciones; como máximo 4.

#### Cuándo no usarlo
- **Paneles con contenido distinto:** `Tabs`.
- **Más de 4 opciones:** `PopUpButton` o `RadioGroup`.
- **Encender o apagar:** `Switch`.
- **Un dato que se envía con un formulario y necesita descripción:** `RadioGroup`.

### Anatomía

1. **Riel**: un fondo hundido respecto de la superficie, con esquinas `radius-button` y sin borde.
2. **Segmento**: cada opción. Todos miden lo mismo.
3. **Pieza elegida**: una sola pieza con contorno que se desliza bajo el texto hasta la opción elegida. Sus esquinas son concéntricas con las del riel.

![SegmentedControl de tipo de pasaje con la opción «Ida» elegida, en tema oscuro y claro.](assets/Componentes/segmented-control-ida.png)

### Contenido

- Textos cortos, de una a tres palabras, del mismo tipo.
- Todas las opciones del mismo largo aproximado: los segmentos miden lo mismo, y un texto mucho más largo que los demás deja a los otros con aire de sobra.
- Sustantivos o frases nominales: «Semana», «Ida y regreso».
- Solo texto en todos los segmentos; no mezcles texto e íconos.
- La opción por defecto, la más usada.

### Comportamiento

- Elegir cambia la vista al instante.
- Siempre hay una opción elegida.
- La pieza elegida se desliza de una opción a otra; no aparece y desaparece.
- Los segmentos miden lo mismo mientras haya espacio. Si el control no cabe en su contenedor, cada segmento toma el ancho de su texto.

### Relacionados

`Tabs` · `RadioGroup` · `PopUpButton` · `Tag` (filtros).

### Referencias

- Apple, Human Interface Guidelines: Segmented controls.
- IBM, Carbon Design System: Content switcher.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Riel | fondo | `segmented-bg` |
| Segmento | color del texto | `segmented-text` |
| Segmento:hover | color del texto | `text-01` |
| Pieza elegida | fondo | `segmented-selected-bg` |
| Pieza elegida | contorno (1 px) | `segmented-border` |
| Segmento elegido | color del texto | `segmented-selected-text` |
| Segmento:focus | contorno | `focus` (2 px, separado 2 px) |

La opción elegida se distingue por la pieza y por el peso del texto, no solo por el color. En el tema oscuro la pieza es más clara que el riel; en el claro es blanca y su contorno la separa del riel.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Segmento | 12 / 0,75 | `font-weight-body` | `web-body-s`, con interlínea 1,4 |
| Segmento elegido | 12 / 0,75 | `font-weight-emphasis` | |

El segmento reserva el ancho de su texto en el peso elegido, así que elegir una opción no mueve a las demás.

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Riel | relleno | 4 px (`space-4`) |
| Riel | radio | `radius-button` |
| Segmento | relleno lateral | 16 px |
| Segmento | ancho | el del segmento más ancho; todos iguales |
| Pieza elegida | radio | `radius-button` menos 4 px, concéntrico con el riel |

![Medidas de SegmentedControl: relleno del riel, alto del control, ancho de un segmento y radio.](assets/Componentes/segmented-control-medidas.png)

### Tamaño

| Densidad | Alto del control (px / rem) | Alto de la pieza elegida (px) |
|---|---|---|
| Normal | 44 / 2,75 | 36 |
| Compacta (puntero fino) | 32 / 2 | 24 |

El área de toque de cada segmento ocupa todo el alto del control.

### Movimiento

La pieza elegida se desliza en `duration-moderate-01` con `easing-standard-productive`; el color del texto cambia en `duration-fast-01`. Con movimiento reducido, cambia sin deslizarse.

### Contraste

Texto de los segmentos a 4,5:1 sobre `segmented-bg`; texto elegido a 4,5:1 sobre `segmented-selected-bg`; contorno de la pieza a 3:1 sobre el riel, en los cuatro temas.

## Código

### Uso

```js
const { SegmentedControl } = window.AlmaDS;
h(SegmentedControl, { label: 'Tipo de viaje', options: ['Ida', 'Ida y regreso'], defaultValue: 'Ida', onChange: setTipo })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `options` | `Array<string \| { value, label }>` | — | De 2 a 4. |
| `value` / `defaultValue` | `string` | la primera | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | Recibe la opción elegida. |
| `label` | `string` | — | Nombre del grupo. |

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es un grupo de radios (`role="radiogroup"`) nombrado por `label`; cada opción es `role="radio"` con `aria-checked`.
- Una sola parada de Tab: la opción elegida. Las flechas eligen y mueven el foco, como un grupo de radios nativo.
- El control mide 44 px de alto y el área de toque de cada segmento ocupa todo ese alto.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Entra a la opción elegida y sale del grupo. |
| → / ↓ | Elige la opción siguiente, en círculo. |
| ← / ↑ | Elige la opción anterior, en círculo. |
| Inicio / Fin | Elige la primera o la última. |

### Recomendaciones de diseño

- Dale siempre un `label` que diga qué se elige.
- No dependas del color para mostrar la opción elegida: la pieza y el peso del texto ya la marcan.

### Consideraciones de desarrollo

- Como las flechas cambian la opción al instante, la vista debe responder rápido. Si tarda, muestra un estado de carga dentro.

### Verificación

axe sin problemas en los cuatro temas; teclado probado. Pendiente: VoiceOver y NVDA.
