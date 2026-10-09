---
component: PaymentCard
tab: Accesibilidad
summary: Qué resuelve ALMA en la tarjeta de pago.
---


## Qué ofrece ALMA

- **La tarjeta es un grupo con nombre:** «Tarjeta Cordura terminada en 7 6 3 7, activa».
- **El estado se dice con palabras** y con un ícono, nunca solo con color.
- **Los puntos no se leen.** Un dato oculto se anuncia como «oculto», y el número como «terminado en 7 6 3 7», dígito por dígito.
- **Mostrar y ocultar es un botón que dice lo que hará:** «Mostrar datos» u «Ocultar datos».
- **Copiar lo confirma con texto,** «Número copiado», que también se anuncia.
- **El contraste no depende del tema:** la tarjeta es siempre oscura y sus textos tienen 4,5:1 o más.

## Lo que te toca

- No muestres los datos sin que la persona lo pida.
- Si tu app exige identificarse antes de mostrar, hazlo en `onReveal`.
- Con varias tarjetas, que el emisor y los últimos cuatro dígitos las distingan.

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Va a «Mostrar datos» y después a «Copiar número». |
| Enter o Espacio | Muestra u oculta los datos; copia el número. |

## Pruebas

Pendiente: VoiceOver y NVDA.
