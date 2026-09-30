---
component: List
tab: Código
summary: Cómo usar List en React.
---


## Uso

```js
const { List } = window.AlmaDS;
h(List, { header: 'Cuenta', items: [
  { icon: 'user', title: 'Datos personales', href: '#perfil' },
  { icon: 'wallet', title: 'Medios de pago', subtitle: '2 tarjetas', href: '#pagos' },
  { icon: 'notification', title: 'Notificaciones', trailing: 'Activadas', href: '#avisos' }] })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | `ListItem[]` | — | Las filas. |
| `header` | `string` | — | Título del grupo; nombra la lista. |
| `headingLevel` | `2–6` | `3` | Nivel del título en la página. |
| `footer` | `string` | — | Nota al pie. |
| `aria-label` | `string` | — | Nombre de la lista si no hay `header`. |
| `id` | `string` | automático | — |

`ListItem`: `{ id?, title, subtitle?, icon?, trailing?, href?, onClick?, chevron? }`.

## Resumen de precios

```js
h(List, { header: 'Resumen del viaje', footer: 'El precio incluye la tasa de embarque.', items: [
  { title: 'Pasaje', trailing: '$7.000' }, { title: 'Seguro de viaje', trailing: '$990' }, { title: 'Total', trailing: '$7.990' }] })
```
