---
component: PaymentCard
tab: Código
summary: Cómo usar PaymentCard en React.
---


## Uso

```js
const { PaymentCard } = window.AlmaDS;
h(PaymentCard, { status: 'activating', brand: 'Cordura', last4: '4821', onCopy: copyNumber })
h(PaymentCard, { status: 'active', brand: 'Cordura', last4: '4821', number: '4821 7730 1102 4821', expiry: '09/29', onCopy: copyNumber })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `status` | `'pending' \| 'activating' \| 'enabled' \| 'active'` | `'pending'` | Estado. |
| `brand` | `string` | `'Cordura'` | Nombre del producto. |
| `last4` | `string` | `'0000'` | Últimos 4 dígitos. |
| `number` / `expiry` | `string` | — | Solo se muestran en `active`. |
| `onCopy` | `() => void` | — | Copiar el número. |

Al copiar, confirma con un `toast` («Número copiado»).
