---
component: Breadcrumb
tab: Código
summary: Cómo usar Breadcrumb en React.
---


## Uso

```js
const { Breadcrumb } = window.AlmaDS;
h(Breadcrumb, { items: [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Viajes', href: '#viajes' },
  { label: 'Santiago → Viña del Mar' }] })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | `Array<{ label, href?, onClick? }>` | — | Del nivel más alto a la página actual. |
| `maxItems` | `number` (mínimo 3) | `4` | Niveles visibles antes de plegar. |
| `label` | `string` | `'Ruta de navegación'` | Nombre del `nav`. |

El último ítem siempre es la página actual: su `href` se ignora.
