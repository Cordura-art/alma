---
component: TimePicker
tab: Código
summary: Cómo usar TimePicker en React.
---


## Uso

```js
const { TimePicker } = window.AlmaDS;
h(TimePicker, { label: 'Hora de salida', defaultValue: '08:30', onChange: setHora })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Obligatoria. |
| `value` / `defaultValue` | `string` (`'HH:MM'`) | — | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | Recibe `'HH:MM'`. |
| `helper` | `string` | `'Formato de 24 horas, por ejemplo 14:30'` | Ayuda. |
| `error` | `string \| boolean` | — | Error propio. |
| `required` / `disabled` | `boolean` | `false` | — |
