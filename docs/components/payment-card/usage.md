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

| Estado | Texto | Dígitos | Chip | Muestra |
|---|---|---|---|---|
| `pending` | Pendiente | Rojo | Rojo | Últimos 4 dígitos. |
| `activating` | Activando | Rojo | Amarillo | Últimos 4 dígitos. |
| `enabled` | Habilitada | Verde | Verde | Últimos 4 dígitos. |
| `active` | Activa | Verde | Verde | Número completo y vencimiento. |

El estado se escribe junto al chip («Pendiente», «Activando», «Habilitada», «Activa»), así no depende del color.

![PaymentCard en sus cuatro estados sobre la tinta de marca: pendiente, activando, habilitada y activa.](assets/Componentes/payment-card-estados.png)

## Contenido

- `brand`: el nombre del producto.
- Solo el estado `active` muestra el número completo y el vencimiento; el CVV nunca.

## Relacionados

`ProductCard` · `List`.
