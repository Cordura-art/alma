---
component: InlineNotification
tab: Código
summary: Cómo usar InlineNotification en React.
---


## Uso

```js
const { InlineNotification } = window.AlmaDS;
h(InlineNotification, { status: 'error', title: 'No pudimos cobrar tu pasaje',
  message: 'Revisa los datos de la tarjeta o usa otro medio de pago.',
  actionLabel: 'Cambiar tarjeta', onAction: openPayment })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `status` | `'error' \| 'warning' \| 'success' \| 'info'` | `'info'` | Estado. |
| `kind` | `'inline' \| 'callout' \| 'toast'` | `'inline'` | Tipo. |
| `title` | `string` | — | Qué pasó. |
| `message` | `string` | — | Qué hacer. |
| `timestamp` | `string` | — | Hora, si importa. |
| `actionLabel` / `onAction` | `string` / `() => void` | — | La acción que resuelve. |
| `dismissible` | `boolean` | `true` (`false` en callout) | Muestra «Cerrar». |
| `onClose` | `() => void` | — | Al cerrar. |

## Callout

```js
h(InlineNotification, { kind: 'callout', status: 'info', title: 'Ten a mano tu carnet',
  message: 'Lo pediremos al subir al bus.' })
```
