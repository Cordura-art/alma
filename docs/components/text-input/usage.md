---
component: TextInput
tab: Uso
summary: Un campo de texto de una línea para escribir un dato corto: nombre, correo, contraseña, código.
---

## Resumen

`TextInput` recibe un dato corto escrito por la persona. Es una píldora con borde; la etiqueta vive dentro del campo y, al escribir o enfocar, sube a un chip sobre el borde. Debajo van la ayuda y, si hay límite, el contador.

### Cuándo usarlo

- Para un dato de una línea: nombre, correo, teléfono, RUT, código, contraseña.
- Cuando la respuesta es libre y no conviene limitarla a una lista.

### Cuándo no usarlo

- **Texto largo:** comentarios o descripciones van en `Textarea`.
- **Elegir de una lista:** usa `Combobox` (lista larga), `PopUpButton` (hasta unas 7) o `RadioGroup` (3 a 5 visibles).
- **Cantidades pequeñas:** usa `Stepper`.
- **Fechas y horas:** usa `DatePicker` y `TimePicker`.
- **Buscar:** usa `SearchField`, que tiene sugerencias y botón para borrar.

## Variantes

| Variante | Cuándo |
|---|---|
| Texto (por defecto) | Cualquier dato de una línea. |
| Contraseña (`type="password"`) | Agrega el botón del ojo para mostrar u ocultar lo escrito. |
| Correo, teléfono, URL (`type`) | Abren el teclado adecuado en el teléfono y activan el autocompletado del navegador. |
| Numérico (`inputMode="numeric"`) | Para códigos, RUT sin puntos o montos: teclado numérico sin las flechas de un campo de número. |

## Anatomía

1. **Contenedor:** píldora de radio `radius-card` con borde de 1 px.
2. **Etiqueta:** dentro del campo en reposo; flota a un chip sobre el borde con foco o con texto.
3. **Texto escrito.**
4. **Botón del ojo** (solo contraseña).
5. **Ayuda:** una línea bajo el campo; en error, la reemplaza el mensaje de error.
6. **Contador** (`maxLength`): `n/máximo`, a la derecha de la ayuda.

> **Imagen pendiente:** anatomía numerada de un campo vacío, uno con texto y la etiqueta flotante, y uno de contraseña con ayuda y contador.

## Tamaño y ancho

- Alto de 56 px (`size-field`); 40 px en densidad compacta con puntero fino.
- Ancho por defecto de 15 rem (240 px), nunca más ancho que su contenedor. Ajusta el ancho al dato esperado: un código de 6 dígitos no necesita un campo de página completa; una dirección sí.
- En el teléfono, los campos de un formulario ocupan el ancho.

## Contenido

### Etiqueta
- Siempre visible y corta: un sustantivo o dos palabras («Correo», «Nombre completo»).
- Mayúscula solo al inicio, sin dos puntos al final.
- Campo obligatorio: `required` agrega el asterisco. Si casi todos son obligatorios, marca los opcionales con la ayuda «Opcional».

### Texto de ejemplo (placeholder)
- Aparece solo con el foco, porque la etiqueta ocupa su lugar en reposo.
- Úsalo para un ejemplo de formato («nombre@correo.cl», «12.345.678-5»), nunca en lugar de la etiqueta ni de la ayuda.

### Ayuda
- La regla antes de que se rompa: «Mínimo 8 caracteres», «Formato 12.345.678-5».
- Una línea. Si necesitas más, el campo está pidiendo demasiado.

### Errores
- Di qué falta y cómo arreglarlo: «Escribe un correo con @», no «Correo inválido».
- Muéstralo al salir del campo o al enviar, no mientras la persona escribe.

> **Imagen pendiente:** un campo con ayuda, el mismo con error y mensaje, y un campo con contador cerca del límite.

## Comportamiento

### Estados

| Estado | Qué cambia |
|---|---|
| Reposo | Borde de 1 px; etiqueta dentro del campo. |
| Puntero encima | El borde cambia de tono (`field-border-hover`). |
| Foco | Borde de 2 px; la etiqueta flota al chip; aparece el texto de ejemplo. |
| Con texto | La etiqueta queda flotando. |
| Error | Borde y etiqueta en rojo; el mensaje reemplaza la ayuda; `aria-invalid`. |
| Desactivado | Borde, etiqueta y texto apagados; no recibe foco. |

> **Imagen pendiente:** los seis estados en tema oscuro y claro.

### Validación
- Valida al salir del campo (`onBlur`) y al enviar el formulario.
- Si la persona corrige el error, quita el mensaje en cuanto el valor sea válido.

### Contraseña
El ojo alterna entre mostrar y ocultar. Su nombre cambia con el estado («Mostrar contraseña» / «Ocultar contraseña»). Se ve de 24 px, pero su área de toque es de 44 × 44.

## Relacionados

`Textarea` · `Combobox` · `SearchField` · `Stepper` · `DatePicker` · `TimePicker`.

## Referencias

- Apple, Human Interface Guidelines: Text fields.
- IBM, Carbon Design System: Text input (estructura de esta guía).
