# RadioGroup

Un grupo de opciones excluyentes, todas visibles: solo se puede elegir una.


## Uso

### Resumen

`RadioGroup` muestra de 3 a 5 opciones excluyentes a la vez. Elegir una desmarca la anterior.

#### Cuándo usarlo
- Cuando conviene comparar las opciones antes de elegir (tipo de asiento, forma de entrega).
- De 3 a 5 opciones.

#### Cuándo no usarlo
- **Dos opciones cortas o una barra:** `SegmentedControl`.
- **Muchas opciones o poco espacio:** `PopUpButton` o `Combobox`.
- **Varias opciones a la vez:** `Checkbox`.
- **Encender o apagar:** `Switch`.

### Anatomía

1. **Título del grupo:** la pregunta.
2. **Botón de opción:** círculo de 20 px; elegido, con un punto dentro.
3. **Etiqueta** de cada opción.
4. **Ayuda** (opcional) bajo el grupo.

> **Imagen pendiente:** anatomía numerada de un grupo de 3 opciones con ayuda.

### Estados

| Estado | Forma |
|---|---|
| Sin elegir | Círculo vacío con borde. |
| Elegida | Círculo con borde de color y punto dentro. |
| Foco | Anillo de foco alrededor del círculo. |
| Desactivado | Todo al 45 % de opacidad. |

> **Imagen pendiente:** los estados en tema oscuro y claro.

### Contenido

- **Título:** una pregunta o un sustantivo («Tipo de asiento»).
- **Opciones:** cortas, paralelas en forma y en un orden lógico (del más barato al más caro, del más al menos común).
- **Opción por defecto:** marca la que más gente elige; deja el grupo sin elegir solo si la decisión debe ser consciente.
- Incluye «Otro» o «Ninguno» si ninguna opción puede aplicar.

### Comportamiento

- Toda la fila se puede tocar.
- Las flechas del teclado mueven la selección dentro del grupo; Tab entra y sale del grupo como una sola parada.

### Relacionados

`SegmentedControl` · `PopUpButton` · `Checkbox`.

### Referencias

- Apple, Human Interface Guidelines: Toggles (radio buttons).
- IBM, Carbon Design System: Radio button.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Título del grupo | color del texto | `text-02` |
| Círculo | borde (2 px) | `control-off-border` |
| Círculo elegido | borde | `control-on` |
| Punto | fondo | `control-on` |
| Etiqueta | color del texto | `text-01` |
| Ayuda | color del texto | `text-02` |
| Círculo:focus | contorno | `focus` (2 px, separado 2 px) |
| Opción:disabled | opacidad | 45 % |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Título del grupo | 11 / 0,6875 | `font-weight-body` | `web-label-s` |
| Etiqueta | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Ayuda | 11 / 0,6875 | `font-weight-body` | `web-label-s` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Círculo | tamaño | 20 × 20 px |
| Punto | tamaño | 10 × 10 px |
| Círculo y etiqueta | separación | 8 px |
| Opción | alto mínimo | 44 px |
| Título y opciones | separación | 4 px |
| Opciones y ayuda | separación | 4 px |

### Tamaño

| Densidad | Alto de cada opción (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

### Movimiento y contraste

El borde cambia en `duration-fast-01`. Círculo y punto a 3:1 o más, textos a 4,5:1 (7:1 en alto contraste), en los cuatro temas.

## Código

### Uso

```js
const { RadioGroup } = window.AlmaDS;
h(RadioGroup, { label: 'Tipo de asiento', options: ['Clásico', 'Semicama', 'Salón cama'], defaultValue: 'Semicama', help: 'El precio cambia según el asiento.' })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Título del grupo (`legend`). |
| `options` | `Array<string \| { value, label }>` | — | Opciones. |
| `value` / `defaultValue` | `string` | — | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | Recibe la opción elegida. |
| `help` | `string` | — | Ayuda bajo el grupo. |
| `disabled` | `boolean` | `false` | Desactiva todo el grupo. |
| `name` | `string` | automático | Nombre compartido de los radios. |

### HTML

```html
<fieldset class="alma-radios">
  <legend class="alma-radios__legend">Tipo de asiento</legend>
  <label class="alma-check alma-radio"><input type="radio" name="seat" class="alma-check__input"><span class="alma-radio__dot" aria-hidden="true"></span><span class="alma-check__label">Clásico</span></label>
</fieldset>
```

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es un `<fieldset>` con `<legend>` y radios nativos con el mismo `name`: el lector anuncia el título del grupo, la opción, su posición («2 de 3») y si está elegida.
- La etiqueta de cada opción es un `<label>`: tocar el texto elige.
- Área de toque de 44 px por opción.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Entra al grupo (a la opción elegida) y sale de él. |
| ↓ / → | Elige la opción siguiente. |
| ↑ / ← | Elige la opción anterior. |
| Espacio | Elige la opción con foco, si ninguna está elegida. |

### Recomendaciones de diseño

- El título es obligatorio: sin él, las opciones no dicen a qué responden.
- El estado elegido se ve por la forma (el punto), no solo por el color.

### Consideraciones de desarrollo

- No cambies el comportamiento de las flechas: el grupo nativo ya lo resuelve.
- Si el grupo es obligatorio, anúncialo en el título y valida al enviar.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
