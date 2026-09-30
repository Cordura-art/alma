---
component: PaymentCard
tab: Estilo
summary: Especificaciones visuales de la tarjeta de pago.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Marca | color del texto | `payment-card-brand` (`brand-steel`) |
| Estado, etiquetas y valores | color del texto | `payment-card-text` |
| Dígitos, chip y Copiar (pendiente, activando) | color | `payment-card-pending` |
| Chip (activando) | borde | `payment-card-chip-activating` |
| Dígitos, chip y Copiar (habilitada, activa) | color | `payment-card-active` |
| Copiar:focus | contorno | `focus` (2 px) |

En alto contraste, `payment-card-text` y los colores de estado usan pasos más claros de sus rampas.

## Valores fijos de Figma

Algunas medidas del vidrio vienen de Figma y todavía no son tokens:

| Elemento | Valor |
|---|---|
| Vidrio | azul noche al 50 % de opacidad |
| Borde | 0,5 px blanco al 42 % |
| Radio | 14,4 px |
| Chip | 34 × 24 px, radio 5 px |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Marca | 14 / 0,875 | Medium / 500 |
| Estado y etiquetas | 11 / 0,6875 | Regular / 400 |
| Número | 16 / 1 | Medium / 500 |
| Vencimiento y CVV | 16 / 1 | Regular / 400 |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Tarjeta | ancho, alto mínimo | 311 px (19,4375 rem), 190 px |
| Tarjeta | relleno | 16 px arriba y abajo, 18 px a los lados |
| Estado y chip | separación | 8 px |
| Vencimiento y CVV | columnas, separación | 2, 16 px |

> **Imagen pendiente:** anatomía acotada.

## Contraste

La marca llega a 9:1 sobre el vidrio (en Figma era `#3A4660`, que daba 2:1). Dígitos, etiquetas y chip pasan AA sobre `brand-black` y `brand-ink`.
