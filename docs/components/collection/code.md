---
component: Collection
tab: Código
summary: Cómo usar Collection en React.
---


## Uso

```js
h(Collection, { label: 'Destinos', items: destinos, minItemWidth: 180,
  renderItem: function (d) { return h(Card, { title: d.nombre, eyebrow: d.km + ' km' }); } })

h(Collection, { label: 'Destinos', layout: 'row', items: destinos, renderItem: celda })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | lista | — | Los ítems. Con `span: 2`, uno ocupa dos celdas. |
| `renderItem` | función | — | Dibuja cada ítem. |
| `label` | texto | — | El nombre de la colección. |
| `layout` | `grid`, `row` | `grid` | Grilla o fila. |
| `minItemWidth` | número | 160 | El ancho mínimo de una celda, en px. |
| `gap` | 8, 16, 24 | 16 | La separación. |
