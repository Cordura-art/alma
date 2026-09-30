---
component: Textarea
tab: Código
summary: Cómo usar Textarea en React.
---

## Uso

```js
const { Textarea } = window.AlmaDS;
h(Textarea, { label: 'Comentario para el conductor', placeholder: 'Por ejemplo: viajo con una bicicleta plegable', maxLength: 200, helper: 'Opcional' })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Etiqueta visible. |
| `value` / `defaultValue` | `string` | `''` | Controlado o no controlado. |
| `onChange` | `(value, event) => void` | — | Recibe el texto. |
| `rows` | `number` | `4` | Alto inicial en líneas. |
| `placeholder` | `string` | — | Ejemplo real. |
| `helper` | `string` | — | Ayuda. |
| `error` | `boolean \| string` | — | Error; el texto reemplaza la ayuda. |
| `maxLength` | `number` | — | Límite y contador. |
| `required`, `disabled` | `boolean` | `false` | — |
| `name`, `id` | `string` | `id` automático | — |

## HTML y CSS

```html
<div class="alma-field alma-field--area alma-field--filled">
  <div class="alma-field__box">
    <label for="c" class="alma-field__label">Comentario</label>
    <textarea id="c" class="alma-field__input alma-field__textarea" rows="4"></textarea>
  </div>
</div>
```

## Flutter

Tokens compartidos con `TextInput` en `dist/dart/alma_tokens.dart`. El widget llega en la fase 4.
