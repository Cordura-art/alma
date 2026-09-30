---
component: ProgressIndicator
tab: Código
summary: Cómo usar ProgressIndicator en React.
---


## Uso

```js
const { ProgressIndicator } = window.AlmaDS;
h(ProgressIndicator, { label: 'Compra de pasajes', current: 2, onSelect: goToStep, steps: [
  { label: 'Viaje', description: 'Santiago → Viña' },
  { label: 'Asientos', description: 'Semicama, 14' },
  { label: 'Pasajeros' },
  { label: 'Pago' }] })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `steps` | `Array<{ label, description?, error? }>` | — | De 3 a 6. |
| `current` | `number` | — | Índice del paso actual. |
| `onSelect` | `(index) => void` | — | Permite volver a pasos completados. |
| `vertical` | `boolean` | `false` | En columna (siempre bajo 672 px). |
| `label` | `string` | `'Progreso'` | Nombre de la lista. |
