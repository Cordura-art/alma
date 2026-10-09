# PaymentCard

Una tarjeta de pago, como se tiene en la mano.


## Uso

### Resumen

`PaymentCard` muestra una tarjeta de pago: quién la emite, su número, de quién es y hasta cuándo vale. Lo secreto queda oculto hasta que se pide, y su estado se dice siempre con palabras.

### Anatomía

1. **Emisor.**
2. **Estado:** un ícono y una palabra.
3. **Número.** Oculto, deja ver sus últimos cuatro dígitos.
4. **Titular, vencimiento y CVV.**
5. **Acciones,** bajo la tarjeta: mostrar u ocultar los datos, y copiar el número.

![PaymentCard. A la izquierda, la tarjeta activa con sus datos a la vista y sus partes numeradas: el emisor (1), el estado «Activa» con su ícono (2), el número (3), el titular, el vencimiento y el CVV (4) y, bajo la tarjeta, las acciones «Ocultar datos» y «Copiar número» (5). A la derecha, tres tarjetas con los datos ocultos y otros estados: «Activando», «Pendiente» y «Bloqueada», esta última con sus datos apagados.](assets/Componentes/payment-card-estados.png)

### Cuándo usarla

- Para mostrar una tarjeta propia: en una billetera, al activar una tarjeta nueva, al pagar.
- Chica (`size: 'sm'`), para elegir entre varias en una lista.

### Cuándo no

- **Para pedir los datos de una tarjeta:** un formulario con `TextInput`.
- **Para una lista larga de medios de pago:** `List`, con el emisor y los últimos cuatro dígitos en cada fila.

### Estados

| Estado | Ícono | Qué significa | Datos |
|---|---|---|---|
| **Pendiente** | reloj | Se pidió y todavía no llega. | Ocultos. |
| **Activando** | avance | Se está activando. | Ocultos. |
| **Habilitada** | visto | Lista para usar; falta el primer uso. | Se pueden mostrar. |
| **Activa** | visto | En uso. | Se pueden mostrar. |
| **Bloqueada** | candado | No se puede usar. | Ocultos y apagados. |

El estado nunca se dice solo con color: lleva su ícono y su palabra.

### Los datos

- **Parten ocultos.** El número muestra solo sus últimos cuatro dígitos; el vencimiento y el CVV, puntos.
- **Se muestran al pedirlo,** con «Mostrar datos», y se vuelven a ocultar con el mismo botón.
- **El número se agrupa de a cuatro** y va en letra de ancho fijo, para leerlo y compararlo.
- **Copiar copia el número sin espacios,** y lo confirma con texto: «Número copiado».
- **Si la app puede, que pida identificarse** antes de mostrar. `PaymentCard` avisa con `onReveal`.

### Reglas

- **La tarjeta es siempre oscura,** en todos los temas: es un objeto, no una superficie de la página.
- **Una tarjeta grande por vista.** Las demás, chicas.
- **No inventes números de ejemplo que parezcan reales** en una pantalla de producción.

### Relacionados

`Card` · `List` · `TextInput` · `DigitEntry` · Indicadores de estado.

### Referencias

- Apple, Human Interface Guidelines: Wallet; Apple Pay.

## Estilo

### Color

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

### Tipografía

| Elemento | Tamaño | Detalle |
|---|---|---|
| Número | 20 px; chica, 14 px | Ancho fijo, cifras tabulares |
| Emisor | 16 px | `font-weight-emphasis` |
| Valores | 14 px | — |
| Estado | 12 px | — |
| Rótulos | 11 px | — |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Tarjeta | ancho | hasta 352 px; chica, 256 px |
| Tarjeta | proporción | 1,586 a 1, la de una tarjeta real. La chica toma el alto de su contenido |
| Tarjeta | relleno | `space-24`; chica, `space-16` |
| Tarjeta | radio | `radius-panel` |
| Datos | separación | `space-24` |
| Tarjeta y acciones | separación | `space-8` |

![Medidas de PaymentCard: 352 px de ancho como máximo y la proporción de una tarjeta real, 1,586 a 1; relleno de 24 px; y el radio del panel.](assets/Componentes/payment-card-medidas.png)

## Código

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

## Accesibilidad

### Qué ofrece ALMA

- **La tarjeta es un grupo con nombre:** «Tarjeta Cordura terminada en 7 6 3 7, activa».
- **El estado se dice con palabras** y con un ícono, nunca solo con color.
- **Los puntos no se leen.** Un dato oculto se anuncia como «oculto», y el número como «terminado en 7 6 3 7», dígito por dígito.
- **Mostrar y ocultar es un botón que dice lo que hará:** «Mostrar datos» u «Ocultar datos».
- **Copiar lo confirma con texto,** «Número copiado», que también se anuncia.
- **El contraste no depende del tema:** la tarjeta es siempre oscura y sus textos tienen 4,5:1 o más.

### Lo que te toca

- No muestres los datos sin que la persona lo pida.
- Si tu app exige identificarse antes de mostrar, hazlo en `onReveal`.
- Con varias tarjetas, que el emisor y los últimos cuatro dígitos las distingan.

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Va a «Mostrar datos» y después a «Copiar número». |
| Enter o Espacio | Muestra u oculta los datos; copia el número. |

### Pruebas

Pendiente: VoiceOver y NVDA.
