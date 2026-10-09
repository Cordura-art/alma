---
component: PaymentCard
tab: Estilo
summary: Especificaciones visuales de la tarjeta de pago.
---


## Color

La tarjeta no cambia con el tema: sus colores son los mismos en los cuatro.

| Elemento | Propiedad | Token |
|---|---|---|
| Tarjeta | fondo | `payment-card-bg`, con un brillo tenue en diagonal hecho de `payment-card-border` |
| Tarjeta | borde | `payment-card-border`, al 40 % |
| Tarjeta | canto inferior | `payment-card-edge` |
| Emisor, número, valores | texto | `brand-white` |
| Rótulos; datos de una tarjeta bloqueada | texto | `payment-card-text` |
| Estado en curso (pendiente, activando) | ícono y texto | `payment-card-chip-activating` |
| Estado habilitada o activa | ícono y texto | `payment-card-active` |
| Estado bloqueada | ícono y texto | `payment-card-pending` |
| «Número copiado» | texto | `text-02` |

Todos los textos de la tarjeta tienen 4,5:1 o más sobre la parte más clara de su brillo.

## Tipografía

| Elemento | Tamaño | Detalle |
|---|---|---|
| Número | 20 px; chica, 14 px | Ancho fijo, cifras tabulares |
| Emisor | 16 px | `font-weight-emphasis` |
| Valores | 14 px | — |
| Estado | 12 px | — |
| Rótulos | 11 px | — |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Tarjeta | ancho | hasta 352 px; chica, 256 px |
| Tarjeta | proporción | 1,586 a 1, la de una tarjeta real. La chica toma el alto de su contenido |
| Tarjeta | relleno | `space-24`; chica, `space-16` |
| Tarjeta | radio | `radius-panel` |
| Datos | separación | `space-24` |
| Tarjeta y acciones | separación | `space-8` |

![Medidas de PaymentCard: 352 px de ancho como máximo y la proporción de una tarjeta real, 1,586 a 1; relleno de 24 px; y el radio del panel.](assets/Componentes/payment-card-medidas.png)
