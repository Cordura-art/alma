---
component: Table
tab: Código
summary: Cómo usar Table en React.
---


## Uso

```js
const { Table, Pagination } = window.AlmaDS;
h(Table, { title: 'Mis viajes', description: 'Próximos pasajes comprados', selectable: true,
  defaultSort: { key: 'fecha', dir: 'asc' },
  columns: [
    { key: 'ruta', label: 'Ruta', sortable: true, maxChars: 30 },
    { key: 'fecha', label: 'Fecha', sortable: true, sortValue: r => r.iso },
    { key: 'precio', label: 'Precio', sortable: true, align: 'end', render: r => clp(r.precio), sortValue: r => r.precio }],
  rows,
  footer: h(Pagination, { totalItems: 48, itemLabel: 'viajes' }) })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `columns` | `TableColumn[]` | — | Ver abajo. |
| `rows` | `object[]` | — | Los datos. |
| `rowKey` | `string` | `'id'` | Campo que identifica la fila. |
| `title` / `description` | `string` | — | Cabecera visible. |
| `headingLevel` | `2–6` | `3` | Nivel del título en la página. |
| `caption` | `string` | — | Nombre de la tabla solo para el lector, si no hay título. |
| `selectable` | `boolean` | `false` | Casillas de selección. |
| `selected` / `defaultSelected` / `onSelectionChange` | `id[]` | — | La selección. |
| `defaultSort` / `onSortChange` | `{ key, dir } \| null` | — | El orden. |
| `onRowClick` / `activeRow` | `(row) => void` / `id` | — | Abrir el detalle y marcar la fila actual. |
| `dense` | `boolean` | `false` | Filas de 44 px. |
| `loading` | `boolean` | `false` | Marca la tabla como ocupada para el lector. |
| `emptyText` | `string` | — | Texto cuando no hay filas. |
| `footer` | `node` | — | Normalmente una `Pagination`. |

`TableColumn`: `{ key, label, sortable?, sortValue?, align?: 'start' | 'end', render?, maxChars? }`.

## Mientras carga

`loading` solo marca la tabla como ocupada (`aria-busy`); no dibuja nada. Pasa filas de `Skeleton` mientras llegan los datos:

```js
h(Table, { columns, loading: true, rows: [1, 2, 3].map(id => ({ id, ruta: h(Skeleton, { width: '60%' }) })) })
```
