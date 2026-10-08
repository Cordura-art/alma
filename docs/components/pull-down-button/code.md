---
component: PullDownButton
tab: Código
summary: Cómo usar PullDownButton en React.
---


## Uso

```js
const { PullDownButton } = window.AlmaDS;
h(PullDownButton, { icon: 'overflow-menu--horizontal', 'aria-label': 'Más acciones de la tarjeta',
  actions: [
    { value: 'copiar', label: 'Copiar número', icon: 'copy' },
    { value: 'congelar', label: 'Congelar tarjeta' },
    { value: 'eliminar', label: 'Eliminar tarjeta', role: 'destructive' }],
  onAction: handle })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Texto del botón. |
| `icon` | `string` | — | Ícono del botón. |
| `aria-label` | `string` | — | Obligatorio si solo tiene ícono. |
| `actions` | lista de ítems | — | Las acciones. Ver «Los ítems». |
| `title` | `string` | — | Un título dentro del menú. |
| `shortcuts` | `boolean` | `true` | Con `false`, no muestra los atajos. |
| `onAction` | `(value) => void` | — | Recibe la acción elegida. |
| `disabled` | `boolean` | `false` | — |
| `id` | `string` | automático | — |

## Los ítems

Un ítem es un texto, `'-'` para un separador, `{ title }` para el rótulo de un grupo, o un objeto:

| Campo | Tipo | Uso |
|---|---|---|
| `value`, `label` | `string` | El valor que recibe `onAction` y lo que se lee. |
| `icon` | `string` | Un ícono. Todos los de un grupo, o ninguno. |
| `role` | `'destructive'` | En rojo. Va al final. |
| `disabled` | `boolean` | Apagado: se ve, no responde. |
| `checked` | `boolean` | Un visto delante cuando es `true`. Con `radio: true`, es uno entre varios. |
| `shortcut` | `string` | El atajo, a la derecha: «Ctrl+R». |
| `items` | lista de ítems | Un submenú, de un nivel. |
| `onSelect` | `() => void` | Se llama al elegirlo, además de `onAction`. |

```js
h(PullDownButton, { label: 'Ver', onAction: handle, actions: [
  { value: 'orden', label: 'Ordenar por', items: [
    { value: 'fecha', label: 'Fecha', checked: orden === 'fecha', radio: true },
    { value: 'precio', label: 'Precio', checked: orden === 'precio', radio: true }] },
  { value: 'pagados', label: 'Solo los pagados', checked: soloPagados },
  '-',
  { value: 'actualizar', label: 'Actualizar', shortcut: 'Ctrl+R' }] })
```
