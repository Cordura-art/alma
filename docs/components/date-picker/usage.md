---
component: DatePicker
tab: Uso
summary: Un campo de fecha con calendario, en formato de Chile.
---


## Resumen

`DatePicker` permite escribir una fecha o elegirla en un calendario. Usa el formato de Chile (`dd-mm-aaaa`) y semanas de lunes a domingo. Sigue el *date picker* de Carbon y el diálogo de fecha de WAI-ARIA.

### Cuándo usarlo
- Fechas cercanas que conviene ver en su semana: la fecha de un viaje.
- Cuando hay días que no se pueden elegir (`min`, `max`).

### Cuándo no usarlo
- **Fechas conocidas y lejanas** (nacimiento): escribir es más rápido; igual usa `DatePicker`, pero pon el ejemplo en la ayuda.
- **Una hora:** `TimePicker`.

## Anatomía

1. **Etiqueta.**
2. **Campo** con la fecha escrita.
3. **Botón del calendario.**
4. **Calendario**: mes y año, flechas de mes, grilla de días, botón «Hoy».
5. **Ayuda** o **error**.

![DatePicker con el calendario abierto en marzo de 2026: hoy (18) marcado, el 25 elegido y los días anteriores a hoy fuera de rango.](assets/Componentes/date-picker-abierto.png)

## Contenido

- Etiqueta con lo que se pide: «Fecha de ida».
- La ayuda por defecto es «Formato dd-mm-aaaa».

## Comportamiento

- Se puede escribir `31-03-2026`, también con `/` o `.`. Si la fecha no existe, el error dice cómo escribirla.
- Los días fuera de `min` y `max` se ven tachados y no se pueden elegir; si se escriben, el error dice el rango.
- Hoy se marca con un anillo. «Hoy» elige la fecha de hoy si está permitida.
- Al elegir un día, el calendario se cierra y el foco vuelve al botón.

## Relacionados

`TimePicker` · `TextInput` · Formularios.

## Referencias

- IBM, Carbon Design System: Date picker.
- W3C, WAI-ARIA Authoring Practices: Date picker dialog.
