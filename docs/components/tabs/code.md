---
component: Tabs
tab: Código
summary: Cómo usar Tabs en React.
---


## Uso

```js
const { Tabs } = window.AlmaDS;
h(Tabs, { label: 'Detalle del viaje', tabs: [
  { value: 'resumen', label: 'Resumen', content: h(Resumen) },
  { value: 'asientos', label: 'Asientos', content: h(Asientos) },
  { value: 'pagos', label: 'Pagos', content: h(Pagos) }] })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `tabs` | `Array<string \| { value, label, icon, content }>` | — | Hasta 6. |
| `value` / `defaultValue` | `string` | la primera | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | Recibe la pestaña elegida. |
| `label` | `string` | — | Nombre del grupo de pestañas. |
| `children` | `node` | — | El panel, si las pestañas no traen `content`. |
| `id` | `string` | automático | — |

## Panel controlado desde fuera

```js
const [tab, setTab] = React.useState('resumen');
h(Tabs, { label: 'Detalle del viaje', value: tab, onChange: setTab, tabs: ['resumen', 'asientos'] },
  tab === 'resumen' ? h(Resumen) : h(Asientos))
```
