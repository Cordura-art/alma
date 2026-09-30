---
component: SegmentedControl
tab: Código
summary: Cómo usar SegmentedControl en React.
---


## Uso

```js
const { SegmentedControl } = window.AlmaDS;
h(SegmentedControl, { label: 'Tipo de viaje', options: ['Ida', 'Ida y regreso'], defaultValue: 'Ida', onChange: setTipo })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `options` | `Array<string \| { value, label }>` | — | De 2 a 4. |
| `value` / `defaultValue` | `string` | la primera | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | Recibe la opción elegida. |
| `label` | `string` | — | Nombre del grupo. |
