---
pattern: Notificaciones
summary: Cómo elegir el componente según el peso del mensaje.
---

## Elegir según el peso

| El mensaje | Usa | Se va |
|---|---|---|
| El error de un campo | El error de `TextInput` | Al corregirlo |
| Un resultado o un estado de una sección | `InlineNotification` | Al cerrarla o resolverla |
| Una guía antes de una tarea | `InlineNotification` `callout` | No se cierra |
| Un resultado pasajero que no pide nada | `toast` | Solo a los 5 s (éxito, información) |
| Algo que exige una decisión | `Alert` | Al responder |
| Un consejo sobre una función | `Tip` | Al descartarlo |

> **Imagen pendiente:** la escala de peso, del error de campo a la alerta, con un ejemplo de cada uno.

## Estados

| Estado | Úsalo para |
|---|---|
| Error | Algo falló y hay que corregirlo. |
| Advertencia | Algo puede fallar o tiene consecuencias. |
| Éxito | La acción terminó bien. |
| Información | Algo útil, sin urgencia. |

Cada estado lleva su ícono y su palabra; el color solo acompaña.

## Reglas

- **Cerca de donde ocurrió.** El resultado de guardar un formulario va arriba del formulario, no arriba de la página.
- **Una a la vez.** Si hay varios errores, agrúpalos en una notificación que diga cuántos son.
- **Lo que desaparece se puede recuperar.** Si un toast informa algo, eso también se ve en otra parte.
- **No interrumpas por lo que se puede deshacer.** Ofrece «Deshacer» en un toast en vez de preguntar antes.
- Mensajes con el orden «qué pasó» → «qué hacer»: «No pudimos cobrar tu pasaje. Revisa la tarjeta o usa otra.»

## Relacionados

`InlineNotification` · `ToastRegion` · `Alert` · `Tip` · Guía de contenido.
