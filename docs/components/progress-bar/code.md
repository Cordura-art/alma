---
component: ProgressBar
tab: Código
summary: Cómo usar ProgressBar en React.
---


## Uso

```js
const { ProgressBar } = window.AlmaDS;
h(ProgressBar, { label: 'Subiendo fotos', value: 0.25, description: 'Subiendo 3 de 12 fotos' })
h(ProgressBar, { label: 'Preparando tu boleta' })                              // indeterminada
h(ProgressBar, { label: 'Subiendo fotos', value: 1, status: 'success', description: '12 fotos subidas' })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `value` | `number` (0 a 1) \| `null` | — | Sin valor, indeterminada. |
| `label` | `string` | — | La tarea; nombra la barra. |
| `description` | `string` | — | El detalle; también lo lee el lector. |
| `status` | `'success' \| 'error'` | — | Al terminar. |
