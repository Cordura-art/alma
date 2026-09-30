---
component: ProductCard
tab: Código
summary: Cómo usar ProductCard en React.
---


## Uso

```js
const { ProductCard } = window.AlmaDS;
h(ProductCard, { title: 'Pasaje flexible', subtitle: '$1.990 extra', tone: 'teal',
  image: 'flexible.jpg', imageAlt: '' }, 'Cambia la fecha sin costo hasta 4 horas antes de la salida.')
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | `string` | — | Obligatorio. |
| `subtitle` | `string` | — | Dato destacado. |
| `image` / `imageAlt` | `string` | — | Imagen; `imageAlt` vacío si es decorativa. |
| `children` | `node` | — | El texto. |
| `tone` | `string` | `'red'` | Familia de etiqueta del fondo. |
| `open` / `defaultOpen` / `onToggle` | `boolean` / `(open) => void` | — | Abierta o cerrada. |
| `collapsible` | `boolean` | `true` | `false`: siempre abierta. |
