# PromptInput

La caja donde se le escribe un pedido a una IA, con su botón de enviar y detener.


## Uso

### Resumen

`PromptInput` es donde la persona escribe lo que pide. Parte en una línea y crece con el texto. Su botón envía; mientras llega la respuesta, el mismo botón, en el mismo lugar, la detiene. Debajo lleva el aviso de que la IA puede equivocarse.

Antes de usarla, lee **Interfaces de IA › Conversación**.

### Cuándo usarla

- Al pie de un asistente, bajo la lista de `ChatMessage`.
- En cualquier lugar donde se le pida algo a una IA con palabras: «Describe la imagen que quieres».

### Cuándo no

- Para buscar. Un buscador devuelve resultados, no una respuesta: usa `SearchField`.
- Para un texto que se guarda tal cual, como un comentario: usa `Textarea`.
- Si lo que se pide tiene pocos datos y siempre los mismos: haz un formulario.

### Anatomía

1. **Rótulo:** «Tu pedido». Siempre a la vista.
2. **Campo:** donde se escribe. Crece hasta seis líneas.
3. **Enviar**, que pasa a ser **Detener**.
4. **Aviso:** «La IA puede equivocarse. Revisa lo importante.»

![Anatomía de PromptInput, dos veces. Arriba, en reposo: el rótulo «Tu pedido» (1), el campo con un pedido escrito (2), el botón de enviar (3) y el aviso «La IA puede equivocarse» (4). Abajo, mientras llega una respuesta: el mismo botón es ahora «Detener».](assets/Componentes/prompt-input-anatomia.png)

### Cómo se comporta

- **Crece.** Parte en una línea y crece hasta seis (`maxRows`). Desde ahí se desplaza por dentro.
- **Enter envía.** Mayúsculas + Enter hace un salto de línea. Con teclado táctil, Enter hace el salto y se envía con el botón.
- **Vacía, no se envía.** El botón está desactivado hasta que hay texto.
- **Al enviar se vacía**, y el foco se queda en la caja.
- **Mientras responde**, con `busy`, el botón es «Detener». Se puede seguir escribiendo el pedido siguiente, pero no enviarlo.
- **Escape detiene** la respuesta en curso.

### El texto de ejemplo

Uno concreto y que funcione con los datos de esta persona: «Pregunta por tus viajes». No reemplaza al rótulo, y no se usa para dar instrucciones largas.

### El aviso

Va siempre, con el mismo texto y en el mismo lugar. Se puede cambiar con `note` si la función lo pide, por ejemplo «Las imágenes generadas pueden no parecerse a lo que pediste». Quitarlo, con `note: false`, solo cuando el aviso ya está a la vista en otra parte de la misma pantalla.

### Lo adjunto

Si se pueden sumar archivos, lo adjunto va arriba de la caja, en `before`, como `Tag` que se puede quitar.

### Dónde va

Fija al pie del panel del asistente. En un teléfono, sube con el teclado. Ancho máximo: 48 rem, el mismo de las respuestas.

### Relacionados

`ChatMessage`, `Textarea`, `SearchField`. La guía **Interfaces de IA**.

## Estilo

### Color

Es un campo de ALMA: usa los mismos tokens que `Textarea`.

| Elemento | Propiedad | Token |
|---|---|---|
| Caja | borde | `field-border`; `field-border-hover` con el cursor encima |
| Caja con el foco | borde | `field-border`, de 2 px |
| Rótulo | fondo y texto | `field-label-float-bg` y `field-label-float-text` |
| Texto | color | `field-text` |
| Texto de ejemplo | color | `field-placeholder` |
| Enviar y Detener | fondo e ícono | Los de un `Button` `filled` principal |
| Aviso | color del texto | `text-02` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Texto | 14 / 0,875, interlínea 1,5 | `font-weight-body` |
| Rótulo | 11 / 0,6875 | `font-weight-body` |
| Aviso | 12 / 0,75 | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Caja | relleno | `space-8`, y `space-16` a la izquierda |
| Caja | radio | `radius-field` |
| Campo | alto | De una a seis líneas |
| Campo y botón | separación | `space-8` |
| Botón | tamaño | El de un control, cuadrado, alineado abajo |
| Caja y aviso | separación | `space-8` |
| Todo | ancho máximo | 48 rem |

El botón se queda abajo cuando la caja crece: no hay que perseguirlo.

## Código

### Uso

```jsx
const { PromptInput } = window.AlmaDS;

h(PromptInput, {
  placeholder: 'Pregunta por tus viajes',
  busy: enCurso,
  onSubmit: function (pedido) { enviar(pedido); },
  onStop: detener
})
```

`onSubmit` recibe el texto sin espacios al principio ni al final. La caja se vacía sola, salvo que uses `value`.

### Con lo adjunto

```jsx
h(PromptInput, {
  before: archivos.map(function (a) { return h(Tag, { key: a.id, icon: 'document', onRemove: function () { quitar(a.id); } }, a.nombre); }),
  onSubmit: enviar
})
```

### Propiedades

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `onSubmit` | función | — | Recibe el pedido al enviar. |
| `busy` | sí o no | no | Hay una respuesta en curso: el botón es «Detener». |
| `onStop` | función | — | Se llama con «Detener» o con Escape. |
| `label` | texto | «Tu pedido» | El rótulo. |
| `placeholder` | texto | — | El texto de ejemplo. |
| `value`, `defaultValue` | texto | — | El texto, controlado o inicial. |
| `onChange` | función | — | Recibe el texto con cada cambio. |
| `maxRows` | número | 6 | Hasta cuántas líneas crece. |
| `note` | texto, o `false` | «La IA puede equivocarse. Revisa lo importante.» | El aviso. Con `false` no se muestra. |
| `before` | contenido | — | Lo que va arriba de la caja: lo adjunto. |
| `disabled` | sí o no | no | Desactiva la caja y el botón. |
| `sendLabel`, `stopLabel` | texto | «Enviar», «Detener la respuesta» | El nombre del botón en cada caso. |
| `name`, `id` | texto | — | Los del campo. |

## Accesibilidad

### Qué ofrece ALMA

- **Rótulo a la vista**, unido al campo. El texto de ejemplo no hace de nombre.
- **El aviso se lee con el campo**: al entrar, un lector dice «Tu pedido», y después «La IA puede equivocarse. Revisa lo importante».
- **El botón dice lo que hace en cada momento**: «Enviar», o «Detener la respuesta».
- **Detener está donde estaba Enviar**: mismo lugar en el orden de tabulación, mismo tamaño.
- **Es un formulario**: se puede enviar también desde el botón, con Enter o Espacio.
- **El foco se queda en la caja** después de enviar.
- **No envía a medio escribir** un carácter compuesto, como pasa al escribir en japonés o con acentos de tecla muerta.

### Teclado

| Tecla | Qué hace |
|---|---|
| Enter | Envía el pedido. Con teclado táctil, hace un salto de línea. |
| Mayúsculas + Enter | Salto de línea. |
| Esc | Detiene la respuesta en curso. |
| Tab | Pasa al botón. |

### Recomendaciones de diseño

- No quites el rótulo para ganar espacio.
- Si la caja está desactivada, por un límite de uso o porque no hay servicio, di por qué en un aviso junto a ella.
- No la tapes con un teclado en pantalla: el panel tiene que subir con él.

### Consideraciones de desarrollo

- Pasa `busy` apenas se envía el pedido, no cuando llega la primera palabra: Detener tiene que estar disponible desde el principio.
- `onStop` tiene que ser inmediato. No pidas confirmación.
- Si el envío falla, devuelve el texto a la caja con `value`.
- Anuncia «Pedido enviado» en la región viva de tu conversación si el pedido no aparece de inmediato en la lista.

Pendiente: VoiceOver y NVDA.
