---
component: PaymentCard
tab: Código
summary: Cómo usar PaymentCard en React.
---


```js
var h = React.createElement, A = AlmaDS;

h(A.PaymentCard, {
  brand: 'Cordura', status: 'active',
  number: numero, holder: 'Camila Rojas', expiry: '08/29', cvv: cvv,
  onReveal: function (visible) { /* pide identificarse, registra */ }
});

// En una lista, chica y sin datos
h(A.PaymentCard, { size: 'sm', brand: 'Cordura', status: 'blocked', last4: '4821' });
```

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `brand` | texto | «Cordura» | El emisor. |
| `status` | `pending`, `activating`, `enabled`, `active`, `blocked` | `active` | El estado. |
| `number` | texto | — | El número completo. Sin él no hay nada que mostrar ni copiar. |
| `last4` | texto | los últimos de `number` | Los cuatro dígitos que se ven con la tarjeta oculta. |
| `holder` | texto | — | El titular. |
| `expiry` | texto | — | El vencimiento: «08/29». |
| `cvv` | texto | — | El código. Solo se ve con los datos a la vista. |
| `revealed`, `defaultRevealed` | sí o no | no | Si los datos están a la vista, controlado o inicial. |
| `onReveal` | función | — | Recibe `true` o `false` al mostrar u ocultar. |
| `onCopy` | función | — | Recibe el número al copiarlo. |
| `actions` | sí o no | sí | Con `false`, sin las acciones de abajo. |
| `size` | `sm` | — | Chica: emisor, estado y últimos cuatro dígitos. |
| `label` | texto | — | El nombre de la tarjeta para un lector de pantalla, si el de siempre no sirve. |

Los datos solo se pueden mostrar en una tarjeta habilitada o activa.

Cambio de octubre de 2026: el estado por defecto es `active` (era `pending`), y se agregan `holder`, `cvv`, `blocked`, `size` y las acciones.
