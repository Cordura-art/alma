---
element: Interfaces de IA
order: 3
tab: Control
---

## La persona decide

La IA propone. Lo que pasa con la propuesta lo decide la persona. Mientras más pueda romper una acción, más cerca tiene que estar esa decisión.

## Cuánto hace sola

Hay cuatro niveles. Se elige por lo que cuesta un error, no por lo que la IA es capaz de hacer.

| Nivel | La IA | La persona | Para qué |
|---|---|---|---|
| **1. Sugiere** | Muestra una propuesta. | La acepta, la edita o la descarta. | Lo que se escribe o se elige: un texto, una categoría, una ruta. |
| **2. Hace con permiso** | Dice lo que va a hacer y espera. | Confirma o cancela. | Lo que no se puede deshacer: pagar, enviar, borrar, publicar. |
| **3. Hace y avisa** | Lo hace y lo cuenta. | Puede deshacerlo. | Lo que se deshace fácil: ordenar, etiquetar, archivar. |
| **4. Hace sola** | Lo hace sin avisar cada vez. | Lo ve en un registro, y lo puede apagar. | Lo menor y repetido que la persona pidió una vez: filtrar correo no deseado. |

Ante la duda, un nivel menos. Subir de nivel lo decide la persona, en Ajustes, nunca la IA por su cuenta.

![Dos momentos de control. A la izquierda, una sugerencia: un borrador de mensaje con la marca «IA» y los botones «Usar», «Editar» y «Descartar». A la derecha, un permiso: «Voy a cambiar tu pasaje», con lo que cambia y lo que cuesta, y los botones «Cambiar pasaje» y «Cancelar».](assets/Guias/ia-control.png)

## Una sugerencia

Una sugerencia es contenido que todavía no existe. Se nota que es provisoria y es fácil decirle que no.

- **Aparte de lo propio.** Va en su propio bloque, con borde `border-subtle` y su marca. No se mezcla con lo que la persona escribió hasta que la acepta.
- **Tres acciones**, siempre en este orden: **Usar**, **Editar**, **Descartar**. «Usar» es la principal.
- **Aceptar no es enviar.** «Usar» pone el texto en el campo. Enviar sigue siendo un paso de la persona.
- **Descartar no pregunta.** Y no vuelve a sugerir lo mismo en ese lugar.
- **No tapa.** Una sugerencia no cubre lo que la persona está haciendo ni le quita el foco.
- **No insiste.** Si se descartan tres seguidas, deja de ofrecer y dice dónde volver a activarlo.

Dentro de un campo, una sugerencia de completado va en `text-03`, después del cursor. Tabulador la acepta; seguir escribiendo la descarta.

## Un permiso

Antes de algo que no se puede deshacer, la IA se detiene y lo dice. Es un `Snippet` de confirmación.

- **Qué va a hacer**, con los datos exactos: «Cambiar tu pasaje del lunes 30 al martes 31, 08:30».
- **Qué cambia y qué cuesta**: «Se cobra una diferencia de $2.500».
- **El botón dice la acción**: «Cambiar pasaje». No «Aceptar», no «Sí».
- **Cancelar no rompe nada.** La tarea queda como estaba, y la IA lo confirma.
- **Un permiso por acción.** Aceptar una vez no autoriza la siguiente. «No volver a preguntar» existe solo para lo que se puede deshacer.

## Deshacer

Todo lo que la IA hizo se puede deshacer, igual que lo que hizo la persona. Usa el patrón Deshacer.

- Tras una acción de nivel 3, un `ToastRegion` lo cuenta y ofrece «Deshacer»: «Archivé 12 correos. Deshacer».
- Deshacer vuelve **todo** lo de esa acción, no una parte.
- Lo que la IA cambió en un texto se puede ver: qué había antes y qué hay ahora.

## Volver a lo propio

Cuando la IA reescribe algo de la persona, lo original no se pierde.

- Junto a la marca hay un «Ver original», y desde ahí «Volver al original».
- Si la persona edita lo generado, la marca dice «IA · editado» y se puede volver a la versión de la IA.
- Las versiones se guardan mientras dure la sesión, por lo menos.

## Un agente

Un agente hace varios pasos sin que se le pida cada uno. Pide más cuidado que todo lo anterior.

1. **Muestra el plan antes de empezar.** Los pasos que va a dar, en palabras simples. La persona puede cambiarlo o cancelarlo.
2. **Muestra el avance.** La lista de pasos, con cuál va. Es una `LiveActivity`, que se sigue aunque su ventana esté cerrada. Ver Estados.
3. **Se detiene ante lo que no se deshace.** Pide permiso en ese paso, no al principio por todo.
4. **Se puede parar siempre.** «Detener» está a la vista de principio a fin. Al parar, dice qué alcanzó a hacer y qué quedó sin hacer.
5. **Se puede tomar el control.** La persona puede seguir a mano desde donde quedó.
6. **Deja registro.** Al terminar, un resumen: qué hizo, qué cambió, qué no pudo. Con cómo deshacer cada cosa.
7. **No se sale del encargo.** Si para terminar necesita algo que no se le pidió, pregunta.

Si un agente trabaja mientras la persona no está, lo que hizo la espera al volver. No es una notificación que se pierde.

## Valorar

- Dos botones bajo cada respuesta: sirvió, no sirvió. Son opcionales y nunca tapan nada.
- Al marcar «no sirvió», una pregunta corta con opciones: «No era correcto», «No era lo que pedí», «Otro». Y un campo libre, opcional.
- Di para qué sirve: «Usamos tu opinión para mejorar las respuestas.»
- Agradece con una línea, sin diálogo: «Gracias».
- Se puede cambiar de opinión: el botón marcado se desmarca.
- Corregir también es valorar. Si la persona edita lo generado, eso ya dice algo. No le pidas además un pulgar.

## Los datos

- **Di qué usa.** Antes del primer uso, en una frase: «El asistente lee tus viajes y tus pasajes para responder.»
- **Pide permiso por lo nuevo.** Cada fuente nueva (el correo, la ubicación, los contactos) se pide cuando hace falta, diciendo para qué.
- **Lo mínimo.** Solo lo que la tarea necesita.
- **Qué se guarda y por cuánto.** Dilo en Ajustes, con palabras simples.
- **Entrenar es aparte.** Usar las conversaciones para mejorar el modelo tiene su propio permiso, apagado de entrada.
- **Lo delicado, con cuidado.** Salud, plata, menores de edad: avisa antes de usarlos, y no los muestres en vistas previas ni notificaciones.

## La memoria

Si la IA recuerda cosas entre una conversación y otra:

- Dilo cuando guarda algo: «Recordaré que prefieres ventana.»
- Hay una lista de todo lo que recuerda, en Ajustes.
- Cada cosa se puede borrar. Y todo de una vez.
- Hay un modo que no recuerda nada.
- Lo que recuerda no aparece por sorpresa delante de otras personas.

## Apagarla

- Cada función con IA se puede apagar en Ajustes, con un `Switch`.
- Apagada, la función vuelve a su camino sin IA. No desaparece.
- No se vuelve a encender sola tras una actualización.
- Nadie pierde nada por no usarla.

## Relacionados

Deshacer, Diálogos, Ajustes y Notificaciones, en Patrones.
