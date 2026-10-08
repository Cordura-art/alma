---
component: Snippet
tab: Código
summary: Cómo usar Snippet en React.
---


## Uso

```js
const { Snippet } = window.AlmaDS;

// Una confirmación: el permiso de un agente
h(Snippet, {
  kind: 'confirmation', source: 'Viajes', sourceIcon: 'ticket',
  title: 'Voy a cambiar tu pasaje',
  dialogue: 'Voy a cambiar tu pasaje del lunes 30 al martes 31. Cuesta 2.500 pesos más.',
  primaryLabel: 'Cambiar pasaje', onConfirm: cambiar, onCancel: cancelar
}, datos)

// Un resultado
h(Snippet, { kind: 'result', source: 'Viajes', title: 'Tu próximo viaje', ai: true, onOpen: abrir, onDone: cerrar }, datos)
```

Dentro de una conversación, va como contenido de un `ChatMessage`.

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `kind` | `result`, `confirmation` | `result` | El tipo. |
| `title` | texto | — | Qué es, o qué va a pasar. |
| `source`, `sourceIcon` | texto | — | La app de la que viene, y su ícono. |
| `children` | contenido | — | Los datos. |
| `dialogue` | texto | — | Lo que el asistente dice. Lo lee un lector de pantalla; no se ve. |
| `showDialogue` | sí o no | no | Lo muestra también a la vista. |
| `ai` | sí o no, o las propiedades de `AILabel` | no | Pone la marca de IA. |
| `primaryLabel` | texto | «Continuar» | El botón de una confirmación. Pon el nombre de la acción. |
| `destructive` | sí o no | no | El botón principal en rojo. |
| `onConfirm`, `onCancel` | función | — | Los de una confirmación. |
| `cancelLabel` | texto | «Cancelar» | — |
| `onDone`, `doneLabel` | función, texto | —, «Listo» | El botón de un resultado. |
| `onOpen`, `openLabel` | función, texto | —, «Abrir» | Lleva a la app. |
| `scrolls` | sí o no | no | Si el contenido se desplaza, lo hace alcanzable con el teclado. |
