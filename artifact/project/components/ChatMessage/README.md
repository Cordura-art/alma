# ChatMessage

Un turno de una conversación con una IA: el pedido de la persona o la respuesta, con sus estados.


## Uso

### Resumen

`ChatMessage` es un turno de la conversación. El pedido de la persona va a la derecha, sobre un fondo. La respuesta de la IA va a todo el ancho, sin fondo: es el contenido. Una respuesta sabe en qué estado está, trae sus fuentes y sus acciones, y se anuncia sola a quien usa un lector de pantalla.

Antes de usarlo, lee **Interfaces de IA › Conversación** y **Estados**.

### Cuándo usarlo

- En un asistente: una lista de `ChatMessage` y un `PromptInput` al pie.
- Para una sola respuesta generada que llega de a poco, aunque no haya conversación.

### Cuándo no

- Para un chat entre personas. Ahí los dos lados son iguales, y no hay estados de «pensando».
- Para un resumen generado dentro de una página: usa el contenido normal, con su `AILabel`.
- Para un aviso del sistema dentro de la conversación: usa `InlineNotification`.

### Anatomía

1. **Pedido:** lo que escribió la persona.
2. **Respuesta:** el contenido, con el mismo estilo de texto que el resto.
3. **Números de fuente** (`SourceRef`), junto a cada afirmación.
4. **Fuentes** (`SourceList`).
5. **Acciones:** copiar, repetir, sirvió, no sirvió.

![Anatomía de ChatMessage: el pedido de la persona a la derecha (1). Debajo, la respuesta a todo el ancho (2), con números de fuente junto a las frases (3), la lista de fuentes (4) y las acciones de copiar, repetir y valorar (5).](assets/Componentes/chat-message-anatomia.png)

### Estados de una respuesta

| Estado | `status` | Qué se ve |
|---|---|---|
| Pensando | `thinking` | Un indicador y una línea que dice qué hace: «Buscando en tus viajes». |
| Escribiendo | `writing` | El texto, que crece, con un cursor fino al final. |
| Terminada | `done` | La respuesta, sus fuentes y sus acciones. |
| Detenida | `stopped` | Lo escrito hasta ahí, la nota «Detuviste la respuesta» y «Continuar». |
| Con error | `error` | Un aviso con lo que pasó y «Reintentar». Lo ya escrito se queda. |

![Los cinco estados de una respuesta: pensando, con un indicador y «Buscando en tus viajes»; escribiendo, con el texto a medias y un cursor; terminada, con fuentes y acciones; detenida, con la nota «Detuviste la respuesta» y «Continuar»; y con error, con un aviso y «Reintentar».](assets/Componentes/chat-message-estados.png)

- **Pensando dice qué hace**, no que piensa. Sin `statusText` dice «Preparando la respuesta».
- **Las fuentes y las acciones aparecen al terminar.** Mientras se escribe no hay nada que copiar ni valorar.
- **Nada salta.** El texto nuevo se agrega al final.

### Las acciones

| Acción | Aparece | Qué hace |
|---|---|---|
| Copiar | Siempre, salvo con `actions: false`. | Copia el texto de la respuesta. El ícono cambia a un visto por dos segundos. |
| Repetir | Con `onRetry`. | Pide otra respuesta al mismo pedido. |
| Sirvió, No sirvió | Con `onFeedback`. | Marca una. Tocarla de nuevo la desmarca. |

En el pedido de la persona, `onEdit` muestra un botón para editarlo. Ofrécelo solo en el último pedido.

### El contenido

- La respuesta directa va primero. Ver **Contenido › IA**.
- Usa párrafos y listas normales. Para comparar, una `Table`; para pasos, una lista numerada.
- El ancho de lectura es de hasta 48 rem.

### Relacionados

`PromptInput`, `SourceList`, `AILabel`, `InlineNotification`. La guía **Interfaces de IA**.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Pedido de la persona | fondo | `ui-03` |
| Pedido y respuesta | color del texto | `text-01` |
| Respuesta | fondo | Ninguno: el de la página |
| Línea de «pensando», nota de «detenida» | color del texto | `text-02` |
| Indicador y cursor | color | `interactive-01` |
| Acciones | color | El de un `Button` `plain` |
| Acción marcada | ícono | El mismo, relleno |
| Error | fondo y borde | Los de `InlineNotification` de error |

El texto de una respuesta no va más claro ni en cursiva por ser generado. Lo generado se dice con la marca y el nombre del asistente, no con el estilo.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Pedido y respuesta | 14 / 0,875, interlínea 1,5 | `font-weight-body` |
| Línea de estado, nota | 14 / 0,875 | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Pedido | ancho máximo | 80 % del mensaje, hasta 36 rem |
| Pedido | relleno | `space-8` arriba y abajo, `space-16` a los lados |
| Pedido | radio | `radius-panel` |
| Respuesta | ancho máximo | 48 rem |
| Partes de una respuesta | separación | `space-8` |
| Acciones | separación | `space-4` |
| Acción | tamaño | El de un control |
| Cursor | ancho | 2 px, del alto de la letra |
| Entre un mensaje y el siguiente | separación | `space-16`, la pone la lista |

### Movimiento

El cursor no parpadea. El indicador de «pensando» es el de `ActivityIndicator`, que respeta el movimiento reducido.

## Código

### Uso

La conversación es una lista. Cada mensaje es un elemento, con `as: 'li'`.

```jsx
const { ChatMessage, PromptInput, SourceRef } = window.AlmaDS;

h('ol', { className: 'conversacion' },
  h(ChatMessage, { as: 'li', from: 'user' }, '¿A qué hora sale mi bus?'),
  h(ChatMessage, {
    as: 'li', status: estado, statusText: 'Buscando en tus viajes',
    sources: fuentes, sourcesId: 'f-1',
    onRetry: repetir, feedback: voto, onFeedback: setVoto
  }, texto ? h('p', null, texto) : null))
```

```css
.conversacion { margin: 0; padding: 0; display: grid; gap: var(--space-16); }
```

### Una respuesta que llega

El mismo elemento pasa de `thinking` a `writing` y a `done`. No lo reemplaces por otro al terminar: el anuncio a un lector de pantalla depende de ese cambio.

```jsx
// 1. Se envió el pedido
h(ChatMessage, { key: id, status: 'thinking', statusText: 'Buscando en tus viajes' })
// 2. Llegan las primeras palabras
h(ChatMessage, { key: id, status: 'writing' }, h('p', null, parcial))
// 3. Terminó
h(ChatMessage, { key: id, status: 'done', sources: fuentes }, h('p', null, completa))
```

### Propiedades

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `from` | `user`, `assistant` | `assistant` | De quién es el mensaje. |
| `children` | contenido | — | El texto del pedido, o el contenido de la respuesta. |
| `status` | `thinking`, `writing`, `done`, `stopped`, `error` | `done` | El estado de una respuesta. |
| `statusText` | texto | «Preparando la respuesta» | Lo que la IA está haciendo, mientras piensa. |
| `sources` | como en `SourceList` | — | Las fuentes. Se muestran al terminar. |
| `sourcesId` | texto | — | El `id` de esa lista, para los `SourceRef`. |
| `onRetry` | función | — | Muestra «Repetir respuesta», y «Reintentar» en un error. |
| `feedback` | `up`, `down`, nada | — | La valoración marcada. |
| `onFeedback` | función | — | Muestra «Sirvió» y «No sirvió». Recibe `up`, `down` o nada. |
| `onCopy` | función | — | Recibe el texto copiado. Copiar funciona sin ella. |
| `actions` | sí o no | sí | Con `false`, no muestra acciones. |
| `onContinue` | función | — | Muestra «Continuar» en una respuesta detenida. |
| `stoppedText` | texto | «Detuviste la respuesta.» | La nota de una respuesta detenida. |
| `error` | texto | — | Lo que pasó, bajo el título del error. |
| `errorTitle` | texto | «No pude terminar la respuesta» | El título del error. |
| `onEdit` | función | — | En un pedido, muestra «Editar pedido». |
| `name` | texto | «Tú», «Asistente» | De quién es, para un lector de pantalla. |
| `headingLevel` | número | 3 | El nivel del encabezado oculto de cada respuesta. |
| `lang` | texto | — | El idioma de la respuesta, si no es el de la página. |
| `as` | etiqueta | `div` | El elemento. En una lista, `li`. |

## Accesibilidad

### Qué ofrece ALMA

- **Dice de quién es.** Cada pedido empieza con «Tú:» y cada respuesta tiene un encabezado «Asistente», los dos ocultos a la vista. Con el encabezado se salta de una respuesta a otra.
- **Anuncia lo que hace.** Al empezar a pensar, se lee la línea de estado: «Buscando en tus viajes».
- **No lee palabra por palabra.** Mientras se escribe, la respuesta está marcada como ocupada. Al terminar se lee una vez, completa.
- **Dice si se detuvo**: «Respuesta detenida».
- **El error interrumpe**, como cualquier error de ALMA.
- **Las acciones tienen nombre**: «Copiar respuesta», «Repetir respuesta», «Sirvió», «No sirvió». Las dos últimas dicen si están marcadas.
- **Copiar se confirma** también para el lector: «Copiado».
- **El foco no se mueve** cuando llega la respuesta.

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Recorre los números de fuente, las fuentes y las acciones de cada respuesta. |
| Enter, Espacio | Activa la acción. |

Detener se hace desde `PromptInput`, con su botón o con Escape.

### Recomendaciones de diseño

- No escondas las acciones de la última respuesta. Las de las anteriores pueden atenuarse, pero tienen que aparecer al enfocarlas.
- La línea de «pensando» tiene que decir algo útil: es lo único que oye quien no ve la pantalla durante la espera.
- Si la respuesta es larga, usa subtítulos: se puede saltar entre ellos.

### Consideraciones de desarrollo

- Usa el mismo elemento, con la misma `key`, de `thinking` a `done`. Si lo reemplazas, la respuesta no se anuncia.
- Pon la conversación en una lista (`ol`) y cada mensaje con `as: 'li'`.
- Si la respuesta está en otro idioma, pasa `lang`.
- Con movimiento reducido, entrega el texto por párrafos completos en vez de palabra por palabra.

Pendiente: VoiceOver y NVDA.
