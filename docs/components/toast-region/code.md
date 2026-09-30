---
component: ToastRegion
tab: Código
summary: Cómo mostrar toasts en React.
---


## Uso

```js
const { ToastRegion, toast } = window.AlmaDS;
// Una vez, cerca de la raíz de la app:
h(ToastRegion)
// Donde ocurra la acción:
toast({ status: 'success', title: 'Pasaje guardado', message: 'Lo encontrarás en tu billetera.' });
```

## `toast(opciones)`

Recibe las mismas opciones que `InlineNotification` (`status`, `title`, `message`, `timestamp`, `actionLabel`, `onAction`) y además:

| Opción | Tipo | Por defecto | Uso |
|---|---|---|---|
| `duration` | `number` (ms) | 5000 en éxito e información; nunca en error y advertencia | `0` lo deja fijo. |

Devuelve un id. `toast.dismiss(id)` lo cierra.

## Con deshacer

```js
const id = toast({ status: 'success', title: 'Tarjeta eliminada', actionLabel: 'Deshacer',
  onAction: () => { restore(); toast.dismiss(id); } });
```

## `ToastRegion`

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `inline` | `boolean` | `false` | Dibuja la región en su lugar, sin posición fija. Solo para documentación. |
