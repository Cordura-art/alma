---
component: PageControl
tab: Código
summary: Cómo usar PageControl en React.
---


## Uso

```js
const { PageControl } = window.AlmaDS;
h(PageControl, { count: 5, value: slide, onChange: setSlide, label: 'Recorrido de bienvenida' })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `count` | `number` | — | Cuántas páginas. |
| `value` / `defaultValue` | `number` | `0` | Índice de la actual. |
| `onChange` | `(index) => void` | — | — |
| `label` | `string` | `'Páginas'` | Nombre del grupo. |
