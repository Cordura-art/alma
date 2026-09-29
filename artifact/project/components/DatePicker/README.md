# DatePicker

Campo de fecha con calendario (IBM Carbon, patrón de diálogo de WAI-ARIA). Formato de Chile: `dd-mm-aaaa`, semanas de lunes a domingo.

## Qué aporta quien lo usa
- `label`, `value` o `defaultValue` (un `Date`), `onChange`.
- `min` y `max`: los días fuera quedan tachados y no se pueden elegir; si se escriben, el error dice el rango.
- `helper` («Formato dd-mm-aaaa» por defecto), `error`, `required`.

## Uso
- Se puede escribir la fecha (`31-03-2026`, también con `/` o `.`) o elegirla en el calendario. Si no existe, el error dice cómo escribirla.
- Para fechas conocidas y lejanas (fecha de nacimiento), escribir es más rápido: pon el ejemplo en la ayuda.

## Teclado en el calendario
Flechas: día y semana. Inicio y Fin: inicio y fin de la semana. Re Pág y Av Pág: mes; con Mayúscula, año. Enter elige; Esc cierra y el foco vuelve al botón del calendario. Hoy lleva un anillo y `aria-current="date"`.
