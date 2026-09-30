---
component: Popover
tab: Código
summary: Cómo usar Popover en React.
---


## Uso

```js
const { Popover, Button } = window.AlmaDS;
h(Popover, { title: 'Tasa de embarque',
  content: 'La cobra el terminal por usar sus andenes. Está incluida en el precio.' },
  h(Button, { variant: 'plain', icon: 'information', 'aria-label': 'Qué es la tasa de embarque' }))
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `children` | un elemento | — | El botón. Recibe `aria-expanded`, `aria-controls` y `aria-haspopup`. |
| `title` | `string` | — | Título; nombra el panel. |
| `content` | `node` | — | El contenido. |
| `placement` | `'bottom' \| 'top'` | `'bottom'` | Debajo o encima. |
| `align` | `'start' \| 'end'` | `'start'` | Alineación con el botón. |
| `open` / `onOpenChange` | `boolean` / `(open) => void` | — | Para controlarlo desde fuera. |
| `aria-label` | `string` | — | Nombre del panel si no hay `title`. |
| `id` | `string` | automático | — |
