---
component: PromptInput
tab: Accesibilidad
summary: Lo que PromptInput resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Rótulo a la vista**, unido al campo. El texto de ejemplo no hace de nombre.
- **El aviso se lee con el campo**: al entrar, un lector dice «Tu pedido», y después «La IA puede equivocarse. Revisa lo importante».
- **El botón dice lo que hace en cada momento**: «Enviar», o «Detener la respuesta».
- **Detener está donde estaba Enviar**: mismo lugar en el orden de tabulación, mismo tamaño.
- **Es un formulario**: se puede enviar también desde el botón, con Enter o Espacio.
- **El foco se queda en la caja** después de enviar.
- **No envía a medio escribir** un carácter compuesto, como pasa al escribir en japonés o con acentos de tecla muerta.

## Teclado

| Tecla | Qué hace |
|---|---|
| Enter | Envía el pedido. Con teclado táctil, hace un salto de línea. |
| Mayúsculas + Enter | Salto de línea. |
| Esc | Detiene la respuesta en curso. |
| Tab | Pasa al botón. |

## Recomendaciones de diseño

- No quites el rótulo para ganar espacio.
- Si la caja está desactivada, por un límite de uso o porque no hay servicio, di por qué en un aviso junto a ella.
- No la tapes con un teclado en pantalla: el panel tiene que subir con él.

## Consideraciones de desarrollo

- Pasa `busy` apenas se envía el pedido, no cuando llega la primera palabra: Detener tiene que estar disponible desde el principio.
- `onStop` tiene que ser inmediato. No pidas confirmación.
- Si el envío falla, devuelve el texto a la caja con `value`.
- Anuncia «Pedido enviado» en la región viva de tu conversación si el pedido no aparece de inmediato en la lista.

Pendiente: VoiceOver y NVDA.
