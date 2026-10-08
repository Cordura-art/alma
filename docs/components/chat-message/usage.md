---
component: ChatMessage
tab: Uso
summary: Un turno de una conversación con una IA: el pedido de la persona o la respuesta, con sus estados.
---


## Resumen

`ChatMessage` es un turno de la conversación. El pedido de la persona va a la derecha, sobre un fondo. La respuesta de la IA va a todo el ancho, sin fondo: es el contenido. Una respuesta sabe en qué estado está, trae sus fuentes y sus acciones, y se anuncia sola a quien usa un lector de pantalla.

Antes de usarlo, lee **Interfaces de IA › Conversación** y **Estados**.

## Cuándo usarlo

- En un asistente: una lista de `ChatMessage` y un `PromptInput` al pie.
- Para una sola respuesta generada que llega de a poco, aunque no haya conversación.

## Cuándo no

- Para un chat entre personas. Ahí los dos lados son iguales, y no hay estados de «pensando».
- Para un resumen generado dentro de una página: usa el contenido normal, con su `AILabel`.
- Para un aviso del sistema dentro de la conversación: usa `InlineNotification`.

## Anatomía

1. **Pedido:** lo que escribió la persona.
2. **Respuesta:** el contenido, con el mismo estilo de texto que el resto.
3. **Números de fuente** (`SourceRef`), junto a cada afirmación.
4. **Fuentes** (`SourceList`).
5. **Acciones:** copiar, repetir, sirvió, no sirvió.

![Anatomía de ChatMessage: el pedido de la persona a la derecha (1). Debajo, la respuesta a todo el ancho (2), con números de fuente junto a las frases (3), la lista de fuentes (4) y las acciones de copiar, repetir y valorar (5).](assets/Componentes/chat-message-anatomia.png)

## Estados de una respuesta

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

## Las acciones

| Acción | Aparece | Qué hace |
|---|---|---|
| Copiar | Siempre, salvo con `actions: false`. | Copia el texto de la respuesta. El ícono cambia a un visto por dos segundos. |
| Repetir | Con `onRetry`. | Pide otra respuesta al mismo pedido. |
| Sirvió, No sirvió | Con `onFeedback`. | Marca una. Tocarla de nuevo la desmarca. |

En el pedido de la persona, `onEdit` muestra un botón para editarlo. Ofrécelo solo en el último pedido.

## El contenido

- La respuesta directa va primero. Ver **Contenido › IA**.
- Usa párrafos y listas normales. Para comparar, una `Table`; para pasos, una lista numerada.
- El ancho de lectura es de hasta 48 rem.

## Relacionados

`PromptInput`, `SourceList`, `AILabel`, `InlineNotification`. La guía **Interfaces de IA**.
