# PaymentCard

Tarjeta de pago virtual sobre vidrio oscuro que muestra el avance de activación con color: rojo pendiente, amarillo activando y verde habilitada.

## Qué aporta quien lo usa
- `status`: `pending`, `activating`, `enabled` o `active`. Solo `active` muestra el número completo y el vencimiento.
- `brand`: nombre del producto (en Figma, «C.WalletPay»).
- `last4`, `number`, `expiry`, `onCopy`.

## Dónde
Siempre sobre un fondo oscuro de marca (`brand-black` o `brand-ink`): el vidrio es `overlay-01` al 50 %.

## Estados (de Figma)
- Dígitos y chip en `danger-400` (pendiente).
- Chip en `support-03` (activando).
- Dígitos y chip en `success-400` (habilitada o activa).

## Contraste
El nombre de la marca va en `brand-steel` (9:1 sobre el vidrio). En Figma era `#3A4660`, que daba 2:1. Los dígitos, etiquetas y chips pasan AA.
