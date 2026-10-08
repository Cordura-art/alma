---
component: ContextMenu
tab: Código
summary: Cómo usar ContextMenu en React.
---


## Uso

`ContextMenu` envuelve el ítem. Lo de adentro tiene que poder recibir el foco, para abrir el menú con el teclado.

```js
const { ContextMenu, Card } = window.AlmaDS;

h(ContextMenu, {
  label: 'Acciones del viaje a Viña del Mar',
  items: [
    { value: 'ver', label: 'Ver pasaje', icon: 'ticket', disabled: !pagado },
    { value: 'compartir', label: 'Compartir', icon: 'share' },
    { value: 'cambiar', label: 'Cambiar fecha…', icon: 'calendar' },
    '-',
    { value: 'anular', label: 'Anular viaje', icon: 'trash-can', role: 'destructive' }],
  onAction: function (accion) { hacer(accion); }
}, h('div', { tabIndex: 0 }, h(Card, { title: 'Santiago → Viña del Mar' })))
```

Los ítems con `disabled` no se muestran. `'-'` es un separador.

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | lista, o función que la devuelve | — | Los ítems. Como función, recibe el evento que abrió el menú. |
| `onAction` | `(value) => void` | — | Recibe la acción elegida. |
| `label` | texto | «Acciones» | El nombre del menú para un lector de pantalla. |
| `title` | texto | — | Un título a la vista, si agrega algo. |
| `disabled` | sí o no | no | Sin menú: se ve el del navegador. |
| `as` | etiqueta | `div` | El elemento que envuelve. |

## Los ítems

| Campo | Tipo | Uso |
|---|---|---|
| `value`, `label` | texto | El valor que recibe `onAction` y lo que se lee. |
| `icon` | texto | Un ícono. Todos los de un grupo, o ninguno. |
| `role` | `destructive` | En rojo. Va al final. |
| `disabled` | sí o no | En un menú contextual, el ítem no aparece. |
| `checked` | sí o no | Un visto delante: un atributo que está puesto. |
| `items` | lista | Un submenú, de un nivel. |
| `onSelect` | función | Se llama al elegirlo, además de `onAction`. |
