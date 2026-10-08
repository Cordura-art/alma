---
component: Gauge
tab: Código
summary: Cómo usar Gauge en React.
---


## Uso

```js
const { Gauge } = window.AlmaDS;

h(Gauge, { label: 'Asientos ocupados', value: 32, max: 44, valueLabel: '32 de 44', minLabel: '0', maxLabel: '44' })

h(Gauge, { label: 'Temperatura en Viña', kind: 'standard', value: 18, min: 5, max: 30, unit: '°C', minLabel: '5 °C', maxLabel: '30 °C' })

h(Gauge, { variant: 'circular', label: 'Ocupación', value: 73, valueLabel: '73 %' })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | texto | — | Qué se mide. Obligatorio. |
| `value` | número | — | El valor. |
| `min`, `max` | número | 0, 100 | Los límites. |
| `kind` | `capacity`, `standard` | `capacity` | Relleno, o marca. |
| `variant` | `linear`, `circular` | `linear` | La forma. |
| `unit` | texto | — | La unidad, tras el número. |
| `valueLabel` | texto | El número con formato de Chile | Cómo se escribe el valor. |
| `minLabel`, `maxLabel` | texto | — | Los extremos, en el lineal. |
| `status` | `warning`, `error`, `success` | — | El color de estado. |
| `statusText` | texto | — | La palabra del estado, para un lector de pantalla. Ponla también a la vista. |
| `size` | número | 96 | El lado del circular, en px. |
| `format` | función | Formato de Chile | Cómo se escribe un número. |
