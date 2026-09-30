---
component: Checkbox
tab: Código
summary: Cómo usar Checkbox en React.
---

## Uso

```js
const { Checkbox } = window.AlmaDS;
h(Checkbox, { label: 'Recordar en este dispositivo', defaultChecked: true })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Etiqueta visible. |
| `checked` / `defaultChecked` | `boolean` | `false` | Controlado o no controlado. |
| `indeterminate` | `boolean` | `false` | Estado mixto (guion). |
| `onChange` | `(checked) => void` | — | Recibe el nuevo estado. |
| `disabled` | `boolean` | `false` | — |
| `aria-label` | `string` | — | Solo si no hay etiqueta visible. |
| `id` | `string` | automático | — |

## Padre con hijas

```js
const all = methods.every(m => m.on), some = methods.some(m => m.on);
h(Checkbox, { label: 'Todos los medios de pago', checked: all, indeterminate: some && !all,
  onChange: v => setMethods(methods.map(m => ({ ...m, on: v }))) })
```

## HTML

```html
<label class="alma-check" for="rem">
  <input id="rem" type="checkbox" class="alma-check__input">
  <span class="alma-check__box" aria-hidden="true"></span>
  <span class="alma-check__label">Recordar en este dispositivo</span>
</label>
```
