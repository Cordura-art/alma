# SegmentedControl

Un selector de una opción entre pocas alternativas, en una píldora.


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

1. **Contenedor** con esquinas `radius-button`, con borde.
2. **Opción.**
3. **Opción elegida**: fondo blanco.

> **Imagen pendiente:** la píldora de pasajes con la opción «Ida» elegida, en tema oscuro y claro.

### Contenido

- Textos cortos, de una a tres palabras, del mismo tipo.
- Todas las opciones del mismo largo aproximado.
- La opción por defecto, la más usada.

### Comportamiento

- Elegir cambia la vista al instante.
- Siempre hay una opción elegida.

### Relacionados

`Tabs` · `RadioGroup` · `PopUpButton` · `Tag` (filtros).

### Referencias

- Apple, Human Interface Guidelines: Segmented controls.
- IBM, Carbon Design System: Content switcher.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Contenedor | fondo | `segmented-bg` |
| Contenedor | borde (1 px) | `segmented-border` |
| Opción | color del texto | `segmented-text` |
| Opción:hover | color del texto | `text-01` |
| Opción elegida | fondo | `segmented-selected-bg` (`brand-white`) |
| Opción elegida | color del texto | `segmented-selected-text` (`tertiary-600`) |
| Opción:focus | contorno | `focus` (2 px, separado 2 px) |

La opción elegida se distingue por el fondo, no solo por el color del texto.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Opción | 11 / 0,6875 | `font-weight-body` | `web-label-s` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Contenedor | relleno | 8 px |
| Contenedor | radio | `radius-button` |
| Opciones | separación | 4 px |
| Opción | relleno lateral | 16 px |
| Opción | radio | `radius-button` |

> **Imagen pendiente:** anatomía acotada.

### Tamaño

| Densidad | Alto de cada opción (px / rem) |
|---|---|
| Normal | 44 / 2,75 (en Figma medía 40) |
| Compacta (puntero fino) | 32 / 2 |

### Movimiento

El fondo de la opción cambia en `duration-fast-01` con `easing-standard-productive`.

### Contraste

Texto de las opciones a 4,5:1 sobre `segmented-bg` y sobre `brand-white`; borde a 3:1, en los cuatro temas.

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
- Cada opción mide 44 px de alto.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Entra a la opción elegida y sale del grupo. |
| → / ↓ | Elige la opción siguiente, en círculo. |
| ← / ↑ | Elige la opción anterior, en círculo. |
| Inicio / Fin | Elige la primera o la última. |

### Recomendaciones de diseño

- Dale siempre un `label` que diga qué se elige.

### Consideraciones de desarrollo

- Como las flechas cambian la opción al instante, la vista debe responder rápido. Si tarda, muestra un estado de carga dentro.

### Verificación

axe sin problemas en los cuatro temas; teclado probado. Pendiente: VoiceOver y NVDA.
