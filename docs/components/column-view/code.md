---
component: ColumnView
tab: Código
summary: Cómo usar ColumnView en React.
---


## Uso

```js
h(ColumnView, { label: 'Mi cuenta', items: arbol, path: camino, onPathChange: setCamino, onOpen: abrir })
```

## Propiedades

| Propiedad | Tipo | Uso |
|---|---|---|
| `items` | `[{ id, label, icon, children }]` | El árbol. |
| `label` | texto | Su nombre. |
| `path`, `defaultPath`, `onPathChange` | lista de `id` | Lo elegido en cada columna. |
| `onOpen` | función | Recibe el ítem final al elegirlo. |
