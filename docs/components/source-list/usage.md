---
component: SourceList
tab: Uso
summary: La lista de fuentes de una respuesta generada.
---


## Resumen

`SourceList` muestra de dónde sacó la IA lo que afirma: una lista numerada, con el título de cada fuente, su origen y un enlace. `SourceRef` es el número pequeño que va junto a la frase y lleva a su fuente.

Antes de usarla, lee **Interfaces de IA › Transparencia**.

## Cuándo usarla

- Bajo una respuesta o un resumen que afirma algo que la persona puede querer comprobar.
- Cuando la respuesta sale de documentos de la persona o de páginas concretas.

## Cuándo no

- Si no hay fuentes. No muestres una lista vacía ni una fuente de relleno: di «Esto no lo encontré en tus documentos».
- Para enlaces relacionados que la IA no usó. Una fuente es lo que se usó, no lo que podría interesar.
- Para una bibliografía larga de un documento: eso es contenido, no la fuente de una respuesta.

## Anatomía

1. **Número en el texto** (`SourceRef`): junto a la frase que sale de esa fuente.
2. **Rótulo:** «Fuentes».
3. **Número de la fuente.**
4. **Título**, que es el enlace.
5. **Origen** (opcional): de dónde es. «Tus viajes», «Correo», «Sitio de la empresa».
6. **«Ver las 8»**, cuando hay más de cinco.

![Anatomía de SourceList: junto a una frase, un número pequeño (1). Debajo, el rótulo «Fuentes» (2) y la lista: cada fuente con su número (3), su título como enlace (4) y su origen (5). Al final, el botón «Ver las 8» (6).](assets/Componentes/source-list-anatomia.png)

## Reglas

- **Solo lo que se usó.** Una fuente falsa es peor que ninguna.
- **El título dice qué es**, no la dirección: «Tu pasaje del 31 de marzo», no «pasaje_8842.pdf».
- **El enlace lleva al lugar exacto**: al documento, y si se puede, al párrafo.
- **El orden es el de aparición** en el texto. El número de la frase y el de la lista son el mismo.
- **Hasta cinco, todas a la vista.** Con más, se muestran tres y un botón para ver el resto.
- **El origen ayuda a confiar.** No es lo mismo «Tu pasaje» que «Un foro».

## Relacionados

`ChatMessage`, que ya la trae; `AILabel`; `Link`. La guía **Interfaces de IA**.
