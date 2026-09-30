---
component: Tooltip
tab: Código
summary: Cómo usar Tooltip en React.
---


## Uso

```js
const { Tooltip, Button } = window.AlmaDS;
h(Tooltip, { text: 'Copiar el número de la tarjeta' },
  h(Button, { variant: 'plain', icon: 'copy', 'aria-label': 'Copiar número' }))
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `text` | `string` | — | Qué hace el control. Máximo 75 caracteres (ALMA avisa en la consola si se pasa). |
| `children` | un elemento enfocable | — | El control. |
| `placement` | `'top' \| 'bottom'` | `'top'` | Arriba o abajo del control. |
| `delay` | `number` (ms) | `500` | Espera con el cursor. El foco lo muestra al instante. |
| `id` | `string` | automático | — |

El control recibe `aria-describedby` apuntando al tooltip: su nombre sigue siendo su `aria-label` o su texto, y el tooltip lo describe.
