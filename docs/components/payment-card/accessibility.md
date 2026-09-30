---
component: PaymentCard
tab: Accesibilidad
summary: Qué resuelve ALMA en la tarjeta de pago.
---


## Qué ofrece ALMA

- El estado se dice en texto para el lector: «Cordura, Activando».
- El número enmascarado se lee «terminada en 4821», no como una fila de puntos; el vencimiento y el CVV ocultos, como «oculta» y «oculto».
- Copiar se llama «Copiar número».

## Pendiente

En pantalla, el estado se ve solo por el color de los dígitos y del chip. Para quien no distingue esos colores, muestra el estado escrito junto a la tarjeta hasta que ALMA lo incluya.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega a Copiar. |
| Enter o Espacio | Copia el número. |

## Consideraciones de desarrollo

- Confirma la copia con un `toast`: el botón no cambia de aspecto.

## Verificación

axe sin problemas sobre fondo de marca. Pendiente: el estado visible sin depender del color, y VoiceOver y NVDA.
