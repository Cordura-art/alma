---
component: PaymentCard
tab: Accesibilidad
summary: Qué resuelve ALMA en la tarjeta de pago.
---


## Qué ofrece ALMA

- El estado está escrito en la tarjeta, junto al chip («Activando»): no depende del color (WCAG 1.4.1) y el lector lo lee.
- El número enmascarado se lee «terminada en 4821», no como una fila de puntos; el vencimiento y el CVV ocultos, como «oculta» y «oculto».
- Copiar se llama «Copiar número».

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega a Copiar. |
| Enter o Espacio | Copia el número. |

## Consideraciones de desarrollo

- Confirma la copia con un `toast`: el botón no cambia de aspecto.

## Verificación

axe sin problemas sobre fondo de marca. Pendiente: VoiceOver y NVDA.
