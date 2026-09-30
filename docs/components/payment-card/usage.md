---
component: PaymentCard
tab: Uso
summary: Una tarjeta de pago virtual sobre vidrio oscuro, con su avance de activación.
---


## Resumen

`PaymentCard` muestra una tarjeta de pago virtual y su estado de activación. Es propia de ALMA, de la billetera de Cordura.

### Cuándo usarla
- En la billetera, para mostrar la tarjeta y cómo va su activación.

### Cuándo no usarla
- **Fuera de un fondo oscuro de marca:** el vidrio está pensado para `brand-black` o `brand-ink`.
- **Para listar varias tarjetas:** una `List` con el nombre y los últimos 4 dígitos.

## Estados

| Estado | Dígitos | Chip | Muestra |
|---|---|---|---|
| `pending` | Rojo | Rojo | Últimos 4 dígitos. |
| `activating` | Rojo | Amarillo | Últimos 4 dígitos. |
| `enabled` | Verde | Verde | Últimos 4 dígitos. |
| `active` | Verde | Verde | Número completo y vencimiento. |

El estado se dice en texto para el lector de pantalla. En pantalla solo cambia el color: acompaña la tarjeta con el estado escrito al lado («Tu tarjeta se está activando»).

> **Imagen pendiente:** la tarjeta en los cuatro estados sobre `brand-ink`.

## Contenido

- `brand`: el nombre del producto.
- Solo el estado `active` muestra el número completo y el vencimiento; el CVV nunca.

## Relacionados

`ProductCard` · `List`.
