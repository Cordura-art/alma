---
pattern: Formularios
summary: Cómo pedir datos: estructura, campos, validación y envío.
---

## Cuándo

Siempre que la persona tenga que darnos datos: crear una cuenta, pagar, comprar un pasaje.

## Estructura

- **Pide lo mínimo.** Cada campo que sobra es una razón para abandonar.
- **Una columna.** Los campos uno debajo del otro, en el orden en que la persona los piensa. Solo van en fila los que forman un dato (día y hora de un viaje).
- **Agrupa** los campos relacionados bajo un título breve (`web-h6`), con `space-24` entre grupos y `space-16` entre campos.
- **Formularios largos:** pártelos en pasos con `ProgressIndicator`, uno por tema. Nunca más de 5 pasos.
- El ancho del campo sugiere el largo del dato: un código postal no ocupa todo el ancho.

![Formulario de datos del pasajero en una columna: el grupo Pasajero (nombre y RUT) y el grupo Contacto (correo y teléfono opcional), con 16 px entre campos, 24 px entre grupos y el botón «Continuar al pago» al final.](assets/Patrones/formularios-estructura.png)

## Elegir el control

| El dato es | Usa |
|---|---|
| Texto corto | `TextInput` (con `type` e `inputMode` del dato: `email`, `tel`, `numeric`) |
| Texto largo | `Textarea` |
| Una opción de 2 o 3, visibles | `SegmentedControl` |
| Una opción de 3 a 5, con descripción | `RadioGroup` |
| Una opción de muchas | `PopUpButton` (hasta ~7) o `Combobox` (para buscar) |
| Varias opciones | `Checkbox` o `Combobox` múltiple |
| Sí o no, que se envía con el formulario | `Checkbox` |
| Una cantidad pequeña | `Stepper` |
| Un valor en un rango | `Slider` con su campo |
| Una fecha o una hora | `DatePicker` o `TimePicker` |
| Un archivo | `FileUploader` |

`Switch` no va en formularios: aplica el cambio al instante.

## Etiquetas y ayudas

- Toda pregunta tiene etiqueta visible. El texto de ejemplo (*placeholder*) no reemplaza a la etiqueta.
- La ayuda dice la regla **antes** de que se rompa: «Mínimo 4 caracteres».
- Marca lo opcional, no lo obligatorio, cuando casi todo es obligatorio: «Teléfono (opcional)».

## Validación

| Momento | Qué hacer |
|---|---|
| Mientras escribe | Nada, salvo contadores de caracteres. No marques error a medio escribir. |
| Al salir del campo | Valida el formato y muestra el error en el campo. |
| Al enviar | Valida todo. Si hay errores, muestra una `InlineNotification` de error arriba del formulario con cuántos son, y lleva el foco al primer campo con error. |

- El error va bajo el campo, en `text-error` y con `field-border-error`: nunca solo color.
- Dice cómo arreglarlo: «Escribe un correo con @», no «Correo inválido».

![El mismo campo de correo en cuatro momentos: en reposo, con su ayuda, con el error «Escribe un correo con @» en rojo y con ícono, y corregido.](assets/Patrones/formularios-validacion.png)

## Envío

- Un solo botón principal, al final, con el verbo de lo que pasa: «Pagar $7.000», «Crear cuenta».
- Enter en un campo envía el formulario (el botón principal es `type: 'submit'`).
- Mientras envía, el botón muestra `loading` con su `loadingLabel` («Pagando») y no acepta otro clic.
- Si todo sale bien, lleva a la siguiente pantalla o confirma con un `toast` de éxito.
- No desactives el botón de enviar esperando que el formulario esté completo: deja enviar y explica qué falta.

## Relacionados

`TextInput` · `ProgressIndicator` · `InlineNotification` · Guía de contenido.
