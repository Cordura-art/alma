---
component: PaymentCard
tab: Uso
summary: Una tarjeta de pago, como se tiene en la mano.
---


## Resumen

`PaymentCard` muestra una tarjeta de pago: quién la emite, su número, de quién es y hasta cuándo vale. Lo secreto queda oculto hasta que se pide, y su estado se dice siempre con palabras.

## Anatomía

1. **Emisor.**
2. **Estado:** un ícono y una palabra.
3. **Número.** Oculto, deja ver sus últimos cuatro dígitos.
4. **Titular, vencimiento y CVV.**
5. **Acciones,** bajo la tarjeta: mostrar u ocultar los datos, y copiar el número.

![PaymentCard. A la izquierda, la tarjeta activa con sus datos a la vista y sus partes numeradas: el emisor (1), el estado «Activa» con su ícono (2), el número (3), el titular, el vencimiento y el CVV (4) y, bajo la tarjeta, las acciones «Ocultar datos» y «Copiar número» (5). A la derecha, tres tarjetas con los datos ocultos y otros estados: «Activando», «Pendiente» y «Bloqueada», esta última con sus datos apagados.](assets/Componentes/payment-card-estados.png)

## Cuándo usarla

- Para mostrar una tarjeta propia: en una billetera, al activar una tarjeta nueva, al pagar.
- Chica (`size: 'sm'`), para elegir entre varias en una lista.

## Cuándo no

- **Para pedir los datos de una tarjeta:** un formulario con `TextInput`.
- **Para una lista larga de medios de pago:** `List`, con el emisor y los últimos cuatro dígitos en cada fila.

## Estados

| Estado | Ícono | Qué significa | Datos |
|---|---|---|---|
| **Pendiente** | reloj | Se pidió y todavía no llega. | Ocultos. |
| **Activando** | avance | Se está activando. | Ocultos. |
| **Habilitada** | visto | Lista para usar; falta el primer uso. | Se pueden mostrar. |
| **Activa** | visto | En uso. | Se pueden mostrar. |
| **Bloqueada** | candado | No se puede usar. | Ocultos y apagados. |

El estado nunca se dice solo con color: lleva su ícono y su palabra.

## Los datos

- **Parten ocultos.** El número muestra solo sus últimos cuatro dígitos; el vencimiento y el CVV, puntos.
- **Se muestran al pedirlo,** con «Mostrar datos», y se vuelven a ocultar con el mismo botón.
- **El número se agrupa de a cuatro** y va en letra de ancho fijo, para leerlo y compararlo.
- **Copiar copia el número sin espacios,** y lo confirma con texto: «Número copiado».
- **Si la app puede, que pida identificarse** antes de mostrar. `PaymentCard` avisa con `onReveal`.

## Reglas

- **La tarjeta es siempre oscura,** en todos los temas: es un objeto, no una superficie de la página.
- **Una tarjeta grande por vista.** Las demás, chicas.
- **No inventes números de ejemplo que parezcan reales** en una pantalla de producción.

## Relacionados

`Card` · `List` · `TextInput` · `DigitEntry` · Indicadores de estado.

## Referencias

- Apple, Human Interface Guidelines: Wallet; Apple Pay.
