---
component: Outline
tab: Código
summary: Cómo usar Outline en React.
---


## Uso

```js
h(Outline, {
  label: 'Mi cuenta',
  items: [{ id: 'viajes', label: 'Viajes', icon: 'ticket', children: [{ id: '2026', label: '2026', trailing: 5 }] }],
  defaultExpanded: ['viajes'],
  selected: elegido, onSelect: setElegido
})
```

## Propiedades

| Propiedad | Tipo | Uso |
|---|---|---|
| `items` | `[{ id, label, icon, trailing, children }]` | El árbol. |
| `label` | texto | Su nombre. |
| `expanded`, `defaultExpanded`, `onExpandedChange` | lista de `id` | Lo que está abierto. |
| `selected`, `onSelect` | `id`, función | Lo elegido. Sin `onSelect`, tocar una fila la abre o la cierra. |
