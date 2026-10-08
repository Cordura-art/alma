---
component: ChatMessage
tab: Código
summary: Cómo usar ChatMessage en React.
---


## Uso

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

## Una respuesta que llega

El mismo elemento pasa de `thinking` a `writing` y a `done`. No lo reemplaces por otro al terminar: el anuncio a un lector de pantalla depende de ese cambio.

```jsx
// 1. Se envió el pedido
h(ChatMessage, { key: id, status: 'thinking', statusText: 'Buscando en tus viajes' })
// 2. Llegan las primeras palabras
h(ChatMessage, { key: id, status: 'writing' }, h('p', null, parcial))
// 3. Terminó
h(ChatMessage, { key: id, status: 'done', sources: fuentes }, h('p', null, completa))
```

## Propiedades

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
