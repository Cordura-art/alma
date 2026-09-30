---
component: Tip
tab: Código
summary: Cómo usar Tip en React.
---


## Uso

```js
const { Tip } = window.AlmaDS;
h(Tip, { icon: 'renew', title: 'Recarga tu billetera sola',
  message: 'Activa la recarga automática y nunca te quedarás sin saldo para viajar.',
  actionLabel: 'Activar', onAction: openAutoReload, onDismiss: rememberDismissed })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | `string` | — | Orientado a la acción. |
| `message` | `string` | — | Una o dos oraciones. |
| `icon` | `string` | — | Se dibuja relleno. |
| `actionLabel` / `onAction` | `string` / `() => void` | — | Acción opcional. |
| `onDismiss` | `() => void` | — | Al cerrar: guarda que se descartó. |

El consejo se oculta solo al cerrarlo; decidir si vuelve a mostrarse le toca a tu código.
