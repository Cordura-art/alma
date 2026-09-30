# TimePicker

Un campo de hora en formato de 24 horas.


## Uso

### Resumen

`TimePicker` pide una hora en formato de 24 horas, como se usa en Chile («14:30»). Es un `TextInput` que entiende varias formas de escribir y valida al salir.

#### Cuándo usarlo
- Una hora exacta: salida de un viaje, hora de una cita.

#### Cuándo no usarlo
- **Pocas horas posibles** (los horarios de un bus): muéstralas como opciones con `RadioGroup` o `PopUpButton`.
- **Una duración:** un `TextInput` numérico con su unidad.

### Anatomía

1. **Etiqueta.**
2. **Campo.**
3. **Ayuda** o **error**.

### Comportamiento

| Se escribe | Queda |
|---|---|
| `1430`, `14.30`, `14h30` | `14:30` |
| `9:05` | `09:05` |
| `25:00` | Error: la hora no existe. |

- Valida al salir del campo; el error dice cómo escribirla.
- La ayuda por defecto es «Formato de 24 horas, por ejemplo 14:30».

> **Imagen pendiente:** el campo con una hora válida y con error.

### Relacionados

`DatePicker` · `TextInput` · Formularios.

## Estilo

### Estilo

Es un `TextInput`: mismos tokens (`field-*`), tipografía, medidas y estados. Ver el estilo de `TextInput`.

El valor usa cifras tabulares, para que las horas se alineen.

### Tamaño

| Densidad | Alto del campo (px / rem) |
|---|---|
| Normal | 56 / 3,5 |
| Compacta (puntero fino) | 40 / 2,5 |

## Código

### Uso

```js
const { TimePicker } = window.AlmaDS;
h(TimePicker, { label: 'Hora de salida', defaultValue: '08:30', onChange: setHora })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Obligatoria. |
| `value` / `defaultValue` | `string` (`'HH:MM'`) | — | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | Recibe `'HH:MM'`. |
| `helper` | `string` | `'Formato de 24 horas, por ejemplo 14:30'` | Ayuda. |
| `error` | `string \| boolean` | — | Error propio. |
| `required` / `disabled` | `boolean` | `false` | — |

## Accesibilidad

### Qué ofrece ALMA

Todo lo de `TextInput`: etiqueta unida al campo, ayuda y error unidos con `aria-describedby`, error anunciado y marcado con `aria-invalid`.

- Acepta varias formas de escribir: nadie tiene que adivinar el formato.
- En el teléfono abre el teclado numérico: basta escribir «1430».

### Recomendaciones de diseño

- Mantén la ayuda con el ejemplo: dice el formato antes del error.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
