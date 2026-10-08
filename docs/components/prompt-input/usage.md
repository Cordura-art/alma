---
component: PromptInput
tab: Uso
summary: La caja donde se le escribe un pedido a una IA, con su botón de enviar y detener.
---


## Resumen

`PromptInput` es donde la persona escribe lo que pide. Parte en una línea y crece con el texto. Su botón envía; mientras llega la respuesta, el mismo botón, en el mismo lugar, la detiene. Debajo lleva el aviso de que la IA puede equivocarse.

Antes de usarla, lee **Interfaces de IA › Conversación**.

## Cuándo usarla

- Al pie de un asistente, bajo la lista de `ChatMessage`.
- En cualquier lugar donde se le pida algo a una IA con palabras: «Describe la imagen que quieres».

## Cuándo no

- Para buscar. Un buscador devuelve resultados, no una respuesta: usa `SearchField`.
- Para un texto que se guarda tal cual, como un comentario: usa `Textarea`.
- Si lo que se pide tiene pocos datos y siempre los mismos: haz un formulario.

## Anatomía

1. **Rótulo:** «Tu pedido». Siempre a la vista.
2. **Campo:** donde se escribe. Crece hasta seis líneas.
3. **Enviar**, que pasa a ser **Detener**.
4. **Aviso:** «La IA puede equivocarse. Revisa lo importante.»

![Anatomía de PromptInput, dos veces. Arriba, en reposo: el rótulo «Tu pedido» (1), el campo con un pedido escrito (2), el botón de enviar (3) y el aviso «La IA puede equivocarse» (4). Abajo, mientras llega una respuesta: el mismo botón es ahora «Detener».](assets/Componentes/prompt-input-anatomia.png)

## Cómo se comporta

- **Crece.** Parte en una línea y crece hasta seis (`maxRows`). Desde ahí se desplaza por dentro.
- **Enter envía.** Mayúsculas + Enter hace un salto de línea. Con teclado táctil, Enter hace el salto y se envía con el botón.
- **Vacía, no se envía.** El botón está desactivado hasta que hay texto.
- **Al enviar se vacía**, y el foco se queda en la caja.
- **Mientras responde**, con `busy`, el botón es «Detener». Se puede seguir escribiendo el pedido siguiente, pero no enviarlo.
- **Escape detiene** la respuesta en curso.

## El texto de ejemplo

Uno concreto y que funcione con los datos de esta persona: «Pregunta por tus viajes». No reemplaza al rótulo, y no se usa para dar instrucciones largas.

## El aviso

Va siempre, con el mismo texto y en el mismo lugar. Se puede cambiar con `note` si la función lo pide, por ejemplo «Las imágenes generadas pueden no parecerse a lo que pediste». Quitarlo, con `note: false`, solo cuando el aviso ya está a la vista en otra parte de la misma pantalla.

## Lo adjunto

Si se pueden sumar archivos, lo adjunto va arriba de la caja, en `before`, como `Tag` que se puede quitar.

## Dónde va

Fija al pie del panel del asistente. En un teléfono, sube con el teclado. Ancho máximo: 48 rem, el mismo de las respuestas.

## Relacionados

`ChatMessage`, `Textarea`, `SearchField`. La guía **Interfaces de IA**.
