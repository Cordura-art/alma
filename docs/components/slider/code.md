---
component: Slider
tab: Código
summary: Cómo usar Slider en React.
---


## Uso

```js
const { Slider } = window.AlmaDS;
const clp = n => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);
h(Slider, { label: 'Precio máximo', min: 2000, max: 30000, step: 500, defaultValue: 12000, format: clp, showField: true, onChange: setPrecio })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Nombre. |
| `min` / `max` / `step` | `number` | — | El rango. |
| `value` / `defaultValue` | `number` | — | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | — |
| `minIcon` / `maxIcon` | `string` | — | Íconos de los extremos. |
| `showField` | `boolean` | `false` | Campo del valor exacto. |
| `format` | `(value) => string` | — | Cómo se lee el valor. |
| `disabled` | `boolean` | `false` | — |
