# PaymentCard

Una tarjeta de pago virtual sobre vidrio oscuro, con su avance de activación.


## Uso

### Resumen

`PaymentCard` muestra una tarjeta de pago virtual y su estado de activación. Es propia de ALMA, de la billetera de Cordura.

#### Cuándo usarla
- En la billetera, para mostrar la tarjeta y cómo va su activación.

#### Cuándo no usarla
- **Fuera de un fondo oscuro de marca:** el vidrio está pensado para `brand-black` o `brand-ink`.
- **Para listar varias tarjetas:** una `List` con el nombre y los últimos 4 dígitos.

### Estados

| Estado | Texto | Dígitos | Chip | Muestra |
|---|---|---|---|---|
| `pending` | Pendiente | Rojo | Rojo | Últimos 4 dígitos. |
| `activating` | Activando | Rojo | Amarillo | Últimos 4 dígitos. |
| `enabled` | Habilitada | Verde | Verde | Últimos 4 dígitos. |
| `active` | Activa | Verde | Verde | Número completo y vencimiento. |

El estado se escribe junto al chip («Pendiente», «Activando», «Habilitada», «Activa»), así no depende del color.

![PaymentCard en sus cuatro estados sobre el azul noche de marca: pendiente, activando, habilitada y activa.](assets/Componentes/payment-card-estados.png)

### Contenido

- `brand`: el nombre del producto.
- Solo el estado `active` muestra el número completo y el vencimiento; el CVV nunca.

### Relacionados

`ProductCard` · `List`.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Marca | color del texto | `payment-card-brand` (`brand-steel`) |
| Estado, etiquetas y valores | color del texto | `payment-card-text` |
| Dígitos, chip y Copiar (pendiente, activando) | color | `payment-card-pending` |
| Chip (activando) | borde | `payment-card-chip-activating` |
| Dígitos, chip y Copiar (habilitada, activa) | color | `payment-card-active` |
| Copiar:focus | contorno | `focus` (2 px) |

En alto contraste, `payment-card-text` y los colores de estado usan pasos más claros de sus rampas.

### Valores fijos de Figma

Algunas medidas del vidrio vienen de Figma y todavía no son tokens:

| Elemento | Valor |
|---|---|
| Vidrio | azul noche al 50 % de opacidad |
| Borde | 0,5 px blanco al 42 % |
| Radio | 14,4 px |
| Chip | 34 × 24 px, radio 5 px |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Marca | 14 / 0,875 | `font-weight-emphasis` |
| Estado y etiquetas | 11 / 0,6875 | `font-weight-body` |
| Número | 16 / 1 | `font-weight-emphasis` |
| Vencimiento y CVV | 16 / 1 | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Tarjeta | ancho, alto mínimo | 311 px (19,4375 rem), 190 px |
| Tarjeta | relleno | 16 px arriba y abajo, 18 px a los lados |
| Estado y chip | separación | 8 px |
| Vencimiento y CVV | columnas, separación | 2, 16 px |

![Medidas de PaymentCard: ancho de 311 px, alto mínimo de 190 px, relleno, radio y chip de 34 × 24 px.](assets/Componentes/payment-card-medidas.png)

### Contraste

La marca llega a 9:1 sobre el vidrio (en Figma era `#3A4660`, que daba 2:1). Dígitos, etiquetas y chip pasan AA sobre `brand-black` y `brand-ink`.

## Código

### Uso

```js
const { PaymentCard } = window.AlmaDS;
h(PaymentCard, { status: 'activating', brand: 'Cordura', last4: '4821', onCopy: copyNumber })
h(PaymentCard, { status: 'active', brand: 'Cordura', last4: '4821', number: '4821 7730 1102 4821', expiry: '09/29', onCopy: copyNumber })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `status` | `'pending' \| 'activating' \| 'enabled' \| 'active'` | `'pending'` | Estado. |
| `brand` | `string` | `'Cordura'` | Nombre del producto. |
| `last4` | `string` | `'0000'` | Últimos 4 dígitos. |
| `number` / `expiry` | `string` | — | Solo se muestran en `active`. |
| `onCopy` | `() => void` | — | Copiar el número. |

Al copiar, confirma con un `toast` («Número copiado»).

## Accesibilidad

### Qué ofrece ALMA

- El estado está escrito en la tarjeta, junto al chip («Activando»): no depende del color (WCAG 1.4.1) y el lector lo lee.
- El número enmascarado se lee «terminada en 4821», no como una fila de puntos; el vencimiento y el CVV ocultos, como «oculta» y «oculto».
- Copiar se llama «Copiar número».

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega a Copiar. |
| Enter o Espacio | Copia el número. |

### Consideraciones de desarrollo

- Confirma la copia con un `toast`: el botón no cambia de aspecto.

### Verificación

axe sin problemas sobre fondo de marca. Pendiente: VoiceOver y NVDA.
