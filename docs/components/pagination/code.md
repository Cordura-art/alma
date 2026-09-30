---
component: Pagination
tab: Código
summary: Cómo usar Pagination en React.
---


## Uso

```js
const { Pagination } = window.AlmaDS;
h(Pagination, { totalItems: 1284, itemLabel: 'movimientos',
  onChange: ({ page, pageSize }) => load(page, pageSize) })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `totalItems` | `number` | — | Cuántos elementos hay. |
| `pageSizes` | `number[]` | `[10, 20, 50]` | Opciones de elementos por página. |
| `pageSize` / `defaultPageSize` | `number` | el primero | Controlado o no controlado. |
| `page` / `defaultPage` | `number` | `1` | Controlado o no controlado. |
| `onChange` | `({ page, pageSize }) => void` | — | Al cambiar de página o de tamaño. |
| `itemLabel` | `string` | `'elementos'` | Sustantivo del rango. |
| `label` | `string` | `'Paginación'` | Nombre del `nav`. |

## Con una tabla

```js
h(Table, { columns, rows: pageRows, footer: h(Pagination, { totalItems, itemLabel: 'viajes', onChange: setPaging }) })
```
