---
component: Switch
tab: Código
summary: Cómo usar Switch en React.
---

## Uso

```js
const { Switch } = window.AlmaDS;
h(Switch, { label: 'Notificaciones de pago', description: 'Aviso cuando se aprueba o rechaza un cobro', defaultChecked: true })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | El ajuste. |
| `description` | `string` | — | Una línea con el efecto. |
| `checked` / `defaultChecked` | `boolean` | `false` | Controlado o no controlado. |
| `onChange` | `(checked) => void` | — | Recibe el nuevo estado. |
| `disabled` | `boolean` | `false` | — |
| `aria-label` | `string` | — | Obligatorio si no hay etiqueta visible. |
| `id` | `string` | automático | — |

## Deshacer si falla

```js
h(Switch, { label: 'Pagos con un toque', checked: on, onChange: async v => {
  setOn(v);
  try { await save(v); } catch { setOn(!v); toast({ status: 'error', title: 'No se pudo guardar el ajuste' }); }
} })
```

## HTML

```html
<div class="alma-switch-row">
  <label for="n" class="alma-switch-row__label">Notificaciones de pago</label>
  <button id="n" type="button" role="switch" aria-checked="true" class="alma-switch is-on"><span class="alma-switch__thumb"></span></button>
</div>
```
