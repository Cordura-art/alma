---
component: EmptyState
tab: Código
summary: Cómo usar EmptyState en React.
---


## Uso

```js
const { EmptyState } = window.AlmaDS;
h(EmptyState, { icon: 'bus', title: 'Aún no tienes viajes', message: 'Aquí verás los pasajes que compres.',
  action: { label: 'Buscar pasajes', onClick: goSearch } })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | `string` | — | Qué falta. |
| `message` | `string` | — | Por qué. |
| `icon` | `string` | — | Ícono de Carbon. |
| `action` | `{ label, icon?, onClick }` | — | La acción principal. |
| `secondaryAction` | `{ label, onClick }` | — | Opcional. |
| `headingLevel` | `2 \| 3 \| 4` | `2` | Nivel del título. |
| `className` | `string` | — | — |
