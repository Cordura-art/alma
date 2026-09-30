---
component: PullDownButton
tab: Código
summary: Cómo usar PullDownButton en React.
---


## Uso

```js
const { PullDownButton } = window.AlmaDS;
h(PullDownButton, { icon: 'overflow-menu--horizontal', 'aria-label': 'Más acciones de la tarjeta',
  actions: [
    { value: 'copiar', label: 'Copiar número', icon: 'copy' },
    { value: 'congelar', label: 'Congelar tarjeta' },
    { value: 'eliminar', label: 'Eliminar tarjeta', role: 'destructive' }],
  onAction: handle })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Texto del botón. |
| `icon` | `string` | — | Ícono del botón. |
| `aria-label` | `string` | — | Obligatorio si solo tiene ícono. |
| `actions` | `Array<string \| { value, label, icon, disabled, role, onSelect }>` | — | Las acciones. |
| `onAction` | `(value) => void` | — | Recibe la acción elegida. |
| `disabled` | `boolean` | `false` | — |
| `id` | `string` | automático | — |
