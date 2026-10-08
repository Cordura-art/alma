---
component: Snippet
tab: Uso
summary: La respuesta del asistente como tarjeta: un resultado, o una confirmación que espera.
---


## Resumen

`Snippet` es lo que responde el asistente cuando la respuesta es una cosa y no un texto: un pasaje, un saldo, un cambio que está por hacer. Es compacto, viene de una app y se resuelve en un toque. Es el *snippet* de Apple.

Antes de usarlo, lee la guía **Interfaces de IA › Control**.

## Dos tipos

![Los dos tipos de Snippet. A la izquierda, un resultado: «Tu próximo viaje», con sus datos, la marca de IA y los botones «Abrir» y «Listo». A la derecha, una confirmación: «Voy a cambiar tu pasaje», con lo que cambia y lo que cuesta, y los botones «Cancelar» y «Cambiar pasaje».](assets/Componentes/snippet-tipos.png)

| Tipo | `kind` | Qué hace | Botones |
|---|---|---|---|
| **Resultado** | `result` | Muestra algo. No pide nada. | «Listo», y «Abrir» si lleva a la app. |
| **Confirmación** | `confirmation` | Dice lo que va a pasar y espera. | «Cancelar» y un botón con el nombre de la acción. |

Una acción puede tener los dos: primero la confirmación, y después el resultado.

## Cuándo usarlo

- Cuando el asistente responde con un dato de una app, mejor mostrado que contado.
- Como el **permiso** de un agente: antes de pagar, enviar, borrar o cambiar algo que no se deshace.

## Cuándo no

- Si la respuesta es texto: eso es un `ChatMessage`.
- Para una tarea de varios pasos: eso es una `LiveActivity`, que pide sus permisos con un `Snippet`.
- Para algo que necesita más de una pantalla: abre la app.

## Anatomía

1. **Origen:** la app de la que viene.
2. **Título:** qué es, o qué va a pasar.
3. **Marca de IA**, si lo que muestra fue generado.
4. **Contenido:** los datos, mostrados.
5. **Botones.**

## Contenido

- **Corto.** Es para una interacción liviana. Hasta 400 px de alto; lo que no cabe, está en la app.
- **Se entiende mirándolo.** Lo que el asistente dice en voz alta (`dialogue`) no reemplaza lo que se ve: el título y los datos tienen que bastar.
- **El botón dice la acción:** «Cambiar pasaje», no «Aceptar» ni «Continuar».
- **Una confirmación dice los datos exactos:** qué cambia, cuánto cuesta, con qué se paga.
- **Cancelar no rompe nada.**

## Relacionados

`ChatMessage` · `LiveActivity` · `AILabel` · `ActionSheet` · `Alert` · Interfaces de IA · Diálogos.

## Referencias

- Apple, Human Interface Guidelines: Snippets, App Shortcuts.
