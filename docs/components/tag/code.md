---
component: Tag
tab: Código
summary: Cómo usar Tag en React.
---


## Uso

```js
const { Tag } = window.AlmaDS;
h(Tag, { color: 'green' }, 'Pagado')                                   // solo lectura
h(Tag, { onRemove: () => quitar('Semicama') }, 'Semicama')            // se puede quitar
h('div', { role: 'group', 'aria-label': 'Filtros' },                   // seleccionables
  h(Tag, { onClick: () => toggle('directo'), selected: directo }, 'Directo'))
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `children` | `node` | — | El texto. |
| `color` | `TagColor` | `'gray'` | Uno de los 11. |
| `size` | `'sm'` | — | 24 px. |
| `icon` | `string` | — | Ícono de Carbon. |
| `onRemove` | `(e) => void` | — | Muestra Quitar. |
| `removeLabel` | `string` | — | Nombre de Quitar si el texto no es una cadena. |
| `onClick` / `selected` | `(e) => void` / `boolean` | — | Seleccionable. |
| `disabled` | `boolean` | `false` | — |
