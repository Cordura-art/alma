---
component: RadioGroup
tab: Código
summary: Cómo usar RadioGroup en React.
---

## Uso

```js
const { RadioGroup } = window.AlmaDS;
h(RadioGroup, { label: 'Tipo de asiento', options: ['Clásico', 'Semicama', 'Salón cama'], defaultValue: 'Semicama', help: 'El precio cambia según el asiento.' })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Título del grupo (`legend`). |
| `options` | `Array<string \| { value, label }>` | — | Opciones. |
| `value` / `defaultValue` | `string` | — | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | Recibe la opción elegida. |
| `help` | `string` | — | Ayuda bajo el grupo. |
| `disabled` | `boolean` | `false` | Desactiva todo el grupo. |
| `name` | `string` | automático | Nombre compartido de los radios. |

## HTML

```html
<fieldset class="alma-radios">
  <legend class="alma-radios__legend">Tipo de asiento</legend>
  <label class="alma-check alma-radio"><input type="radio" name="seat" class="alma-check__input"><span class="alma-radio__dot" aria-hidden="true"></span><span class="alma-check__label">Clásico</span></label>
</fieldset>
```
