---
component: TextInput
tab: Código
summary: Cómo usar TextInput en React, con sus propiedades y ejemplos.
---

## Uso

```js
const { TextInput } = window.AlmaDS;
h(TextInput, { label: 'Correo', type: 'email', autoComplete: 'email', helper: 'Te enviaremos el pasaje aquí' })
```

## Propiedades

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
| `name`, `id` | `string` | `id` automático | Para formularios. |
| `onBlur`, `onFocus` | `(event) => void` | — | Validar al salir. |

## Ejemplos

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

## HTML y CSS

```html
<div class="alma-field alma-field--filled">
  <div class="alma-field__box">
    <label for="mail" class="alma-field__label">Correo</label>
    <input id="mail" class="alma-field__input" type="email" value="ana@correo.cl" aria-describedby="mail-help">
  </div>
  <div class="alma-field__foot"><span id="mail-help" class="alma-field__help">Te enviaremos el pasaje aquí</span></div>
</div>
```

Modificadores: `alma-field--filled` (etiqueta flotante), `--error`, `--disabled`.

## Ajustar con tokens

```css
[data-theme="dark"] { --field-border-hover: var(--primary-400); }
```

## Flutter

Tokens en `dist/dart/alma_tokens.dart`: `AlmaColors.fieldBorder`, `fieldLabel`, `fieldText`… El widget llega en la fase 4.
