---
component: Alert
tab: Código
summary: Cómo usar Alert en React.
---


## Uso

```js
const { Alert } = window.AlmaDS;
h(Alert, { open, title: '¿Eliminar la tarjeta terminada en 4821?',
  message: 'Tendrás que ingresarla de nuevo para pagar con ella.',
  actions: [
    { label: 'Cancelar', role: 'cancel', onPress: () => setOpen(false) },
    { label: 'Eliminar', role: 'destructive', onPress: remove }] })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `open` | `boolean` | — | Muestra u oculta la alerta. |
| `title` | `string` | — | Qué pasó. Nombra al diálogo. |
| `message` | `string` | — | Lo describe. |
| `actions` | `Array<{ label, role, onPress }>` | — | Hasta 3. `role`: `default`, `cancel`, `destructive` o `normal`. |
| `onDismiss` | `() => void` | — | Esc cuando no hay «Cancelar». |
| `children` | `node` | — | Un campo, si hace falta un dato. |
| `stacked` | `boolean` | `true` con 3 botones | Apila dos botones cuyas etiquetas no caben en fila. |
| `inline` | `boolean` | `false` | Solo para documentación: dibuja la alerta sin velo. |

ALMA ordena los botones según su rol: no importa el orden en que los pases.

## Con un campo

```js
h(Alert, { open, title: 'Confirma tu contraseña para ver la tarjeta',
  actions: [{ label: 'Cancelar', role: 'cancel', onPress: close }, { label: 'Confirmar', role: 'default', onPress: check }] },
  h(TextInput, { label: 'Contraseña', type: 'password' }))
```
