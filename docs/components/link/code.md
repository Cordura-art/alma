---
component: Link
tab: Código
summary: Cómo usar Link en React.
---


## Uso

```js
const { Link } = window.AlmaDS;
h('p', null, 'Revisa las ', h(Link, { href: '#condiciones' }, 'condiciones del pasaje'), ' antes de pagar.')
h(Link, { href: 'https://www.cordura.art', external: true, standalone: true }, 'Visitar Cordura')
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `href` | `string` | — | El destino. |
| `children` | `node` | — | El texto. |
| `external` | `boolean` | `false` | Otra pestaña, ícono y aviso. |
| `standalone` | `boolean` | `false` | Enlace suelto. |
| `current` | `boolean` | `false` | Página actual. |
| `target` / `rel` | `string` | — | Si no es `external`. |
| `onClick` | `(e) => void` | — | — |
