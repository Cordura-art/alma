# TextInput

Un campo de texto de una línea para escribir un dato corto: nombre, correo, contraseña, código.


## Uso

### Resumen

`TextInput` recibe un dato corto escrito por la persona. Es un campo con borde y esquinas `radius-field`; la etiqueta vive dentro del campo y, al escribir o enfocar, sube a un chip sobre el borde. Debajo van la ayuda y, si hay límite, el contador.

#### Cuándo usarlo

- Para un dato de una línea: nombre, correo, teléfono, RUT, código, contraseña.
- Cuando la respuesta es libre y no conviene limitarla a una lista.

#### Cuándo no usarlo

- **Texto largo:** comentarios o descripciones van en `Textarea`.
- **Elegir de una lista:** usa `Combobox` (lista larga), `PopUpButton` (hasta unas 7) o `RadioGroup` (3 a 5 visibles).
- **Cantidades pequeñas:** usa `Stepper`.
- **Fechas y horas:** usa `DatePicker` y `TimePicker`.
- **Buscar:** usa `SearchField`, que tiene sugerencias y botón para borrar.

### Variantes

| Variante | Cuándo |
|---|---|
| Texto (por defecto) | Cualquier dato de una línea. |
| Contraseña (`type="password"`) | Agrega el botón del ojo para mostrar u ocultar lo escrito. |
| Correo, teléfono, URL (`type`) | Abren el teclado adecuado en el teléfono y activan el autocompletado del navegador. |
| Numérico (`inputMode="numeric"`) | Para códigos, RUT sin puntos o montos: teclado numérico sin las flechas de un campo de número. |

### Anatomía

1. **Contenedor:** esquinas `radius-field`, borde de 1 px.
2. **Etiqueta:** dentro del campo en reposo; flota a un chip sobre el borde con foco o con texto.
3. **Texto escrito.**
4. **Botón del ojo** (solo contraseña).
5. **Ayuda:** una línea bajo el campo; en error, la reemplaza el mensaje de error.
6. **Contador** (`maxLength`): `n/máximo`, a la derecha de la ayuda.

> **Imagen pendiente:** anatomía numerada de un campo vacío, uno con texto y la etiqueta flotante, y uno de contraseña con ayuda y contador.

### Tamaño y ancho

- Alto de 56 px (`size-field`); 40 px en densidad compacta con puntero fino.
- Ancho por defecto de 15 rem (240 px), nunca más ancho que su contenedor. Ajusta el ancho al dato esperado: un código de 6 dígitos no necesita un campo de página completa; una dirección sí.
- En el teléfono, los campos de un formulario ocupan el ancho.

### Contenido

#### Etiqueta
- Siempre visible y corta: un sustantivo o dos palabras («Correo», «Nombre completo»).
- Mayúscula solo al inicio, sin dos puntos al final.
- Campo obligatorio: `required` agrega el asterisco. Si casi todos son obligatorios, marca los opcionales con la ayuda «Opcional».

#### Texto de ejemplo (placeholder)
- Aparece solo con el foco, porque la etiqueta ocupa su lugar en reposo.
- Úsalo para un ejemplo de formato («nombre@correo.cl», «12.345.678-5»), nunca en lugar de la etiqueta ni de la ayuda.

#### Ayuda
- La regla antes de que se rompa: «Mínimo 8 caracteres», «Formato 12.345.678-5».
- Una línea. Si necesitas más, el campo está pidiendo demasiado.

#### Errores
- Di qué falta y cómo arreglarlo: «Escribe un correo con @», no «Correo inválido».
- Muéstralo al salir del campo o al enviar, no mientras la persona escribe.

> **Imagen pendiente:** un campo con ayuda, el mismo con error y mensaje, y un campo con contador cerca del límite.

### Comportamiento

#### Estados

| Estado | Qué cambia |
|---|---|
| Reposo | Borde de 1 px; etiqueta dentro del campo. |
| Puntero encima | El borde cambia de tono (`field-border-hover`). |
| Foco | Borde de 2 px; la etiqueta flota al chip; aparece el texto de ejemplo. |
| Con texto | La etiqueta queda flotando. |
| Error | Borde y etiqueta en rojo; el mensaje reemplaza la ayuda; `aria-invalid`. |
| Desactivado | Borde, etiqueta y texto apagados; no recibe foco. |
| Solo lectura (`readOnly`) | Borde punteado; etiqueta y texto con contraste normal. Recibe foco y el texto se puede seleccionar y copiar, pero no cambiar. |

> **Imagen pendiente:** los seis estados en tema oscuro y claro.

#### Validación
- Valida al salir del campo (`onBlur`) y al enviar el formulario.
- Si la persona corrige el error, quita el mensaje en cuanto el valor sea válido.

#### Contraseña
El ojo alterna entre mostrar y ocultar. Su nombre cambia con el estado («Mostrar contraseña» / «Ocultar contraseña»). Se ve de 24 px, pero su área de toque es de 44 × 44.

### Relacionados

`Textarea` · `Combobox` · `SearchField` · `Stepper` · `DatePicker` · `TimePicker`.

### Referencias

- Apple, Human Interface Guidelines: Text fields.
- IBM, Carbon Design System: Text input (estructura de esta guía).

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Contenedor | borde (1 px) | `field-border` |
| Contenedor | fondo | transparente |
| Contenedor:hover | borde | `field-border-hover` |
| Contenedor:focus | borde (2 px) | `field-border` |
| Contenedor:active | borde | `field-border-active` |
| Contenedor:error | borde | `field-border-error` |
| Contenedor:disabled | borde | `field-border-disabled` |
| Contenedor de solo lectura | borde (1 px, punteado; sin cambio con hover) | `field-border-readonly` |
| Contenedor de solo lectura:focus | contorno | `focus` (2 px, separado 2 px) |
| Etiqueta | color del texto | `field-label` |
| Etiqueta flotante | fondo | `field-label-float-bg` |
| Etiqueta flotante | color del texto | `field-label-float-text` |
| Etiqueta:error | color del texto | `field-text-error` |
| Etiqueta flotante:error | color del texto | `field-label-float-error` |
| Texto escrito | color | `field-text` |
| Texto escrito:error | color | `field-text-error` |
| Texto de ejemplo | color | `field-placeholder` |
| Etiqueta, texto e ícono:disabled | color | `field-text-disabled` |
| Ayuda y contador | color | `text-01` |
| Ícono del ojo | relleno | `field-icon` |
| Ícono del ojo:focus | contorno | `focus` (2 px, separado 2 px) |

En tema oscuro el borde y la etiqueta son lima; en claro, tonos acero oscuros, porque el lima sobre fondo claro no llega a 3:1.

> **Imagen pendiente:** el campo en reposo, foco, con texto, error y desactivado, en los cuatro temas.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Etiqueta flotante | 11 / 0,6875 | `font-weight-body` | `web-label-s` |
| Texto escrito | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Ayuda y contador | 11 / 0,6875 | `font-weight-body` | `web-label-s` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Contenedor | radio | `radius-field` (0 px) |
| Contenedor | relleno lateral | 16 px (`space-16`); 15 px con el borde de 2 px del foco |
| Contenedor | separación interna | 8 px (`space-8`) |
| Etiqueta flotante | posición | sobre el borde superior, a 8 px del inicio |
| Etiqueta flotante | relleno y radio | 4 px lateral, `radius-chip` |
| Ícono del ojo | tamaño visible / área de toque | 24 px / 44 × 44 px |
| Pie (ayuda y contador) | relleno lateral | 16 px |
| Campo y pie | separación | 4 px (`space-4`) |

> **Imagen pendiente:** anatomía acotada con las medidas de esta tabla.

### Tamaño

| Densidad | Alto (px / rem) |
|---|---|
| Normal | 56 / 3,5 (`size-field`) |
| Compacta (puntero fino) | 40 / 2,5 (`size-field-compact`) |

El alto es mínimo: crece si la persona agranda el texto. Ancho por defecto 15 rem, con `max-width: 100%`.

### Movimiento

El borde cambia en `duration-fast-02` (110 ms) y la etiqueta sube al chip en `duration-moderate-01` (150 ms), ambos con `easing-standard-productive`. Con movimiento reducido, los cambios son instantáneos.

### Contraste

Texto, etiqueta y texto de ejemplo a 4,5:1 o más, y borde e ícono a 3:1 o más, en oscuro y claro; 7:1 para texto en alto contraste. Verificado con los pares de contraste del repositorio y con axe en los cuatro temas. El estado desactivado está exento.

## Código

### Uso

```js
const { TextInput } = window.AlmaDS;
h(TextInput, { label: 'Correo', type: 'email', autoComplete: 'email', helper: 'Te enviaremos el pasaje aquí' })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Etiqueta visible. Obligatoria. |
| `value` / `defaultValue` | `string` | `''` | Controlado o no controlado. |
| `onChange` | `(value, event) => void` | — | Recibe el texto. |
| `type` | `'text' \| 'password' \| 'email' \| 'search' \| 'tel' \| 'url'` | `'text'` | `password` agrega el ojo. |
| `inputMode` | `'numeric' \| 'decimal' \| 'tel' \| …` | — | Teclado del teléfono. |
| `autoComplete` | `string` | — | Autocompletado del navegador (`email`, `name`, `tel`, `one-time-code`…). |
| `placeholder` | `string` | — | Ejemplo de formato; se ve solo con foco. |
| `helper` | `string` | — | Ayuda bajo el campo. |
| `error` | `boolean \| string` | — | Estado de error; si es texto, reemplaza la ayuda. |
| `maxLength` | `number` | — | Límite y contador. |
| `required` | `boolean` | `false` | Asterisco y `required` nativo. |
| `disabled` | `boolean` | `false` | Desactiva el campo. |
| `readOnly` | `boolean` | `false` | Solo lectura: se ve y se copia, pero no se cambia. |
| `name`, `id` | `string` | `id` automático | Para formularios. |
| `onBlur`, `onFocus` | `(event) => void` | — | Validar al salir. |

### Ejemplos

**Contraseña con regla**

```js
h(TextInput, { label: 'Contraseña', type: 'password', autoComplete: 'new-password', helper: 'Mínimo 8 caracteres' })
```

**Validar al salir**

```js
h(TextInput, { label: 'Correo', type: 'email', value: email, onChange: setEmail,
  onBlur: () => setError(email.includes('@') ? null : 'Escribe un correo con @'), error: error })
```

**Código numérico con contador**

```js
h(TextInput, { label: 'Código de verificación', inputMode: 'numeric', autoComplete: 'one-time-code', maxLength: 6 })
```

### HTML y CSS

```html
<div class="alma-field alma-field--filled">
  <div class="alma-field__box">
    <label for="mail" class="alma-field__label">Correo</label>
    <input id="mail" class="alma-field__input" type="email" value="ana@correo.cl" aria-describedby="mail-help">
  </div>
  <div class="alma-field__foot"><span id="mail-help" class="alma-field__help">Te enviaremos el pasaje aquí</span></div>
</div>
```

Modificadores: `alma-field--filled` (etiqueta flotante), `--error`, `--disabled`, `--readonly`.

### Ajustar con tokens

```css
[data-theme="dark"] { --field-border-hover: var(--primary-400); }
```

### Flutter

Tokens en `dist/dart/alma_tokens.dart`: `AlmaColors.fieldBorder`, `fieldLabel`, `fieldText`… El widget llega en la fase 4.

## Accesibilidad

### Qué ofrece ALMA

ALMA resuelve la relación entre etiqueta, campo, ayuda y error. Hay que anotar el diseño solo en los casos de la sección siguiente.

#### Comportamiento
- La etiqueta es un `<label>` real unido al campo: se anuncia al enfocar y agranda el área de toque.
- La ayuda y el error están unidos con `aria-describedby`: se leen después de la etiqueta.
- El error marca `aria-invalid`.
- `required` agrega el asterisco visible y el `required` nativo.
- `readOnly` usa el `readonly` nativo: el lector anuncia «solo lectura», el campo recibe foco y el texto se puede seleccionar y copiar. A diferencia del desactivado, conserva el contraste normal (4,5:1).
- El ojo de la contraseña es un botón con nombre que cambia con el estado, con área de toque de 44 × 44.
- Texto en rem; probado con texto al 200 %: la etiqueta se recorta con puntos suspensivos en vez de montarse sobre el ícono.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Entra al campo; con contraseña, el siguiente Tab va al ojo. |
| Enter | Envía el formulario si hay un botón con rol `primary`. |
| Espacio o Enter (en el ojo) | Muestra u oculta la contraseña. |

### Recomendaciones de diseño

- **Etiqueta visible siempre.** El texto de ejemplo desaparece al escribir y no se anuncia igual.
- **Instrucciones antes del campo, no solo en el error.** La regla va en la ayuda.
- **El error no depende del color:** lleva mensaje escrito.
- **Autocompletado:** pide `autoComplete` para nombre, correo, teléfono y códigos; evita que la persona escriba lo que el sistema ya sabe (WCAG 1.3.5).
- **No bloquees pegar** en contraseñas ni códigos.

#### Etiquetado

| Caso | Qué poner |
|---|---|
| Campo normal | `label` visible. |
| Obligatorio | `required`; el asterisco se explica una vez al inicio del formulario. |
| Con formato | Ejemplo en la ayuda («Formato dd-mm-aaaa»). |

### Consideraciones de desarrollo

- No reemplaces la etiqueta por `placeholder` ni por `aria-label`.
- Si el error aparece al enviar, lleva el foco al primer campo con error.
- Usa el `type` y el `inputMode` correctos: cambian el teclado y el autocompletado.

### Verificación

- axe (WCAG 2.2 AA): cero problemas en los cuatro temas.
- Pares de contraste del campo (borde, etiqueta, texto, error, ojo): cumplen en los cuatro temas.
- Probado con texto al 200 %.
- Pendiente: prueba con VoiceOver y NVDA.
