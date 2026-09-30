# Slider

Una pista con una perilla para elegir un valor en un rango.


## Uso

### Resumen

`Slider` elige un valor entre un mínimo y un máximo arrastrando una perilla. Es el *slider* de Apple.

#### Cuándo usarlo
- Valores aproximados en un rango continuo: volumen, precio máximo, distancia.
- Cuando ver el rango completo ayuda a decidir.

#### Cuándo no usarlo
- **Un valor exacto importante:** `TextInput` numérico, o agrega el campo (`showField`).
- **Pocos valores enteros:** `Stepper`.

### Anatomía

1. **Etiqueta** y **valor**, arriba.
2. **Ícono del mínimo** (opcional).
3. **Pista**, rellena del mínimo a la perilla.
4. **Perilla.**
5. **Ícono del máximo** (opcional).
6. **Campo** del valor exacto (opcional).

> **Imagen pendiente:** un slider de precio máximo con su campo, en tema oscuro y claro.

### Reglas de Apple

- El mínimo va a la izquierda y el máximo a la derecha, siempre.
- Íconos en los extremos cuando ayudan a entender qué significa cada lado.
- Si el rango es amplio, agrega el campo con el valor exacto.

### Contenido

- `format` dice cómo se lee el valor: «60%», «$12.000».

### Relacionados

`Stepper` · `TextInput` · Formularios.

### Referencias

- Apple, Human Interface Guidelines: Sliders.
- IBM, Carbon Design System: Slider.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Pista vacía | fondo | `slider-track` |
| Pista rellena | fondo | `slider-fill` |
| Perilla | fondo | `slider-thumb` |
| Perilla | anillo (3 px) | `slider-thumb-ring` |
| Etiqueta | color del texto | `text-01` |
| Valor | color del texto | `text-02` |
| Íconos | relleno | `icon-02` |
| Campo | fondo / borde | `slider-field-bg` / `slider-field-border` |
| Slider y campo:focus | contorno | `focus` (2 px, separado 2 px) |
| Desactivado | opacidad | 45 % |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta, valor y campo | 14 / 0,875 | Regular / 400 | `web-label-m` |

El valor usa cifras tabulares.

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Slider | ancho máximo | 480 px |
| Pista | alto, radio | 4 px, 2 px |
| Perilla | tamaño | 24 px |
| Área de toque | alto | 44 px |
| Elementos de la fila | separación | 16 px |
| Campo | ancho | 104 px (6,5 rem) |

> **Imagen pendiente:** anatomía acotada.

### Movimiento

Al arrastrar, la perilla crece al 115 % en `duration-fast-01`.

### Contraste

Pista rellena, perilla y borde del campo a 3:1; textos a 4,5:1, en los cuatro temas.

## Código

### Uso

```js
const { Slider } = window.AlmaDS;
const clp = n => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);
h(Slider, { label: 'Precio máximo', min: 2000, max: 30000, step: 500, defaultValue: 12000, format: clp, showField: true, onChange: setPrecio })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Nombre. |
| `min` / `max` / `step` | `number` | — | El rango. |
| `value` / `defaultValue` | `number` | — | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | — |
| `minIcon` / `maxIcon` | `string` | — | Íconos de los extremos. |
| `showField` | `boolean` | `false` | Campo del valor exacto. |
| `format` | `(value) => string` | — | Cómo se lee el valor. |
| `disabled` | `boolean` | `false` | — |

## Accesibilidad

### Qué ofrece ALMA

- Es un control nativo de rango (`<input type="range">`), nombrado por `label`.
- `format` se usa también para el lector (`aria-valuetext`): oye «$12.000», no «12000».
- El campo del valor exacto permite escribirlo, sin arrastrar.
- El área de toque mide 44 px de alto.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| ← / ↓ | Baja un paso. |
| → / ↑ | Sube un paso. |
| Re Pág / Av Pág | Sube o baja pasos más grandes. |
| Inicio / Fin | Mínimo y máximo. |

### Recomendaciones de diseño

- Arrastrar es difícil para muchas personas: agrega el campo cuando el valor importa.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
