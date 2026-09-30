# DatePicker

Un campo de fecha con calendario, en formato de Chile.


## Uso

### Resumen

`DatePicker` permite escribir una fecha o elegirla en un calendario. Usa el formato de Chile (`dd-mm-aaaa`) y semanas de lunes a domingo. Sigue el *date picker* de Carbon y el diálogo de fecha de WAI-ARIA.

#### Cuándo usarlo
- Fechas cercanas que conviene ver en su semana: la fecha de un viaje.
- Cuando hay días que no se pueden elegir (`min`, `max`).

#### Cuándo no usarlo
- **Fechas conocidas y lejanas** (nacimiento): escribir es más rápido; igual usa `DatePicker`, pero pon el ejemplo en la ayuda.
- **Una hora:** `TimePicker`.

### Anatomía

1. **Etiqueta.**
2. **Campo** con la fecha escrita.
3. **Botón del calendario.**
4. **Calendario**: mes y año, flechas de mes, grilla de días, botón «Hoy».
5. **Ayuda** o **error**.

> **Imagen pendiente:** el campo con el calendario abierto, con hoy marcado, un día elegido y días fuera de rango tachados.

### Contenido

- Etiqueta con lo que se pide: «Fecha de ida».
- La ayuda por defecto es «Formato dd-mm-aaaa».

### Comportamiento

- Se puede escribir `31-03-2026`, también con `/` o `.`. Si la fecha no existe, el error dice cómo escribirla.
- Los días fuera de `min` y `max` se ven tachados y no se pueden elegir; si se escriben, el error dice el rango.
- Hoy se marca con un anillo. «Hoy» elige la fecha de hoy si está permitida.
- Al elegir un día, el calendario se cierra y el foco vuelve al botón.

### Relacionados

`TimePicker` · `TextInput` · Formularios.

### Referencias

- IBM, Carbon Design System: Date picker.
- W3C, WAI-ARIA Authoring Practices: Date picker dialog.

## Estilo

### Color

El campo usa los tokens de `TextInput` (`field-*`). El calendario:

| Elemento | Propiedad | Token |
|---|---|---|
| Calendario | fondo / borde / sombra | `popover-bg` / `popover-border` / `shadow-floating` |
| Mes | color del texto | `text-01` |
| Días de la semana | color del texto | `text-02` |
| Día | color del texto | `text-01` |
| Día:hover | fondo | `date-picker-day-bg-hover` |
| Día de otro mes | color del texto | `date-picker-day-outside-text` |
| Hoy | anillo (1 px, por dentro) | `date-picker-day-today-border` |
| Día elegido | fondo / texto | `date-picker-day-selected-bg` / `date-picker-day-selected-text` |
| Día fuera de rango | color, tachado | `disabled-03` |
| Día:focus | contorno | `focus` (2 px, por dentro) |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Mes | 14 / 0,875 | Medium / 500 |
| Días de la semana | 11 / 0,6875 | Regular / 400 |
| Día | 14 / 0,875 | Regular / 400; Medium / 500 el elegido |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Calendario | ancho | 352 px (22 rem), como máximo el ancho de la pantalla − 32 px |
| Calendario | relleno, radio | 16 px, `radius-panel` |
| Calendario | separación del campo | 8 px |
| Día | alto, radio | 44 px, `radius-pill` |

> **Imagen pendiente:** anatomía acotada del calendario.

### Capas

El calendario está en `z-dropdown`.

### Contraste

Días a 4,5:1; el elegido a 4,5:1 sobre `interactive-01`; el anillo de hoy a 3:1, en los cuatro temas.

## Código

### Uso

```js
const { DatePicker } = window.AlmaDS;
const hoy = new Date();
h(DatePicker, { label: 'Fecha de ida', min: hoy, onChange: setFecha })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Obligatoria. |
| `value` / `defaultValue` | `Date \| null` | — | Controlado o no controlado. |
| `onChange` | `(date \| null) => void` | — | Recibe la fecha, o `null` si se borra. |
| `min` / `max` | `Date` | — | Rango permitido. |
| `helper` | `string` | `'Formato dd-mm-aaaa'` | Ayuda. |
| `error` | `string \| boolean` | — | Error propio. |
| `required` / `disabled` | `boolean` | `false` | — |
| `name` / `id` | `string` | — | — |

Para mostrar la fecha elegida en otro lugar, usa `Intl.DateTimeFormat('es-CL')` (ver **Contenido → Formatos**).

## Accesibilidad

### Qué ofrece ALMA

- El botón se llama «Elegir fecha», o «Cambiar fecha, martes, 31 de marzo de 2026» si ya hay una.
- El calendario es un diálogo (`role="dialog"`) con una grilla (`role="grid"`), nombrados por el mes.
- Cada día se anuncia completo («martes, 31 de marzo de 2026»); hoy lleva `aria-current="date"` y los fuera de rango, `aria-disabled`.
- «Mes anterior» y «Mes siguiente» tienen nombre.
- Al cerrar, el foco vuelve al botón del calendario.

#### Interacciones de teclado (en el calendario)

| Tecla | Acción |
|---|---|
| ← / → | Día anterior o siguiente. |
| ↑ / ↓ | El mismo día de la semana anterior o siguiente. |
| Inicio / Fin | Inicio y fin de la semana. |
| Re Pág / Av Pág | Mes anterior o siguiente. |
| Mayús + Re Pág / Av Pág | Año anterior o siguiente. |
| Enter | Elige el día. |
| Esc | Cierra sin cambiar. |

### Recomendaciones de diseño

- Escribir la fecha siempre funciona: nadie está obligado a usar el calendario.

### Verificación

axe sin problemas en los cuatro temas con el calendario abierto; teclado probado. Pendiente: VoiceOver y NVDA.
