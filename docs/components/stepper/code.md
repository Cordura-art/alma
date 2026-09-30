---
component: Stepper
tab: Código
summary: Cómo usar Stepper en React.
---


## Uso

```js
const { Stepper } = window.AlmaDS;
h(Stepper, { label: 'Pasajeros', icon: 'ticket', min: 1, max: 8, defaultValue: 1, onChange: setPasajeros })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `min` / `max` | `number` | `0` / `99` | Límites. |
| `value` / `defaultValue` | `number` | `min` | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | — |
| `icon` | `string` | — | Qué se cuenta. |
| `label` | `string` | — | Nombre del grupo. |
