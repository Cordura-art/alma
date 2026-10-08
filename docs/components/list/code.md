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

## Elegir, interruptores y edición

```js
// Una opción entre varias, con visto
h(List, { header: 'Ordenar por', selection: 'single', selectionStyle: 'check', selected: orden, onSelect: setOrden,
  items: [{ id: 'fecha', title: 'Fecha' }, { id: 'precio', title: 'Precio' }] })

// Una preferencia
h(List, { header: 'Avisos', items: [{ title: 'Ofertas', switch: { checked: ofertas, onChange: setOfertas } }] })

// Editar
h(List, { header: 'Destinos favoritos', editing: editando, items: favoritos, onMove: mover, onDelete: eliminar })
```

| Propiedad | Tipo | Uso |
|---|---|---|
| `selection` | `single`, `multiple` | Las filas se eligen. Cada ítem necesita `id`. |
| `selected` | un `id`, o una lista con `multiple` | Lo elegido. |
| `onSelect` | función | Recibe el `id`, o la lista. |
| `selectionStyle` | `check` | Con `single`: un visto en vez de la fila marcada. `multiple` siempre lleva visto. |
| `editing` | sí o no | Muestra los controles de edición. |
| `onDelete` | `(id) => void` | Muestra «Eliminar» en cada fila. |
| `onMove` | `(id, dirección) => void` | Muestra «Subir» y «Bajar». La dirección es -1 o 1. |
| en un ítem, `switch` | `{ checked, onChange, disabled }` | Un interruptor al final de la fila. |
