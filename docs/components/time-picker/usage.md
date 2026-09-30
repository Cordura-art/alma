---
component: TimePicker
tab: Uso
summary: Un campo de hora en formato de 24 horas.
---


## Resumen

`TimePicker` pide una hora en formato de 24 horas, como se usa en Chile («14:30»). Es un `TextInput` que entiende varias formas de escribir y valida al salir.

### Cuándo usarlo
- Una hora exacta: salida de un viaje, hora de una cita.

### Cuándo no usarlo
- **Pocas horas posibles** (los horarios de un bus): muéstralas como opciones con `RadioGroup` o `PopUpButton`.
- **Una duración:** un `TextInput` numérico con su unidad.

## Anatomía

1. **Etiqueta.**
2. **Campo.**
3. **Ayuda** o **error**.

## Comportamiento

| Se escribe | Queda |
|---|---|
| `1430`, `14.30`, `14h30` | `14:30` |
| `9:05` | `09:05` |
| `25:00` | Error: la hora no existe. |

- Valida al salir del campo; el error dice cómo escribirla.
- La ayuda por defecto es «Formato de 24 horas, por ejemplo 14:30».

> **Imagen pendiente:** el campo con una hora válida y con error.

## Relacionados

`DatePicker` · `TextInput` · Formularios.
