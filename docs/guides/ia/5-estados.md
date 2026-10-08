---
element: Interfaces de IA
order: 3
tab: Estados
---

## De pedir a recibir

Entre el pedido y la respuesta pasan cosas que con un botón no pasan: la IA tarda, trabaja por pasos, puede cortarse a la mitad o no poder. Cada una tiene su estado, y cada estado se ve y se lee. `ChatMessage` trae los cinco de una respuesta: pensando, escribiendo, terminada, detenida y con error.

![La misma respuesta en cuatro momentos. Pensando: un indicador y el texto «Buscando en tus viajes». Escribiendo: la respuesta a medias y el botón «Detener». Terminada: la respuesta completa, con sus fuentes y sus acciones. Con error: un aviso «No pude terminar la respuesta», con el botón «Reintentar».](assets/Guias/ia-estados.png)

## Todos los estados

| Estado | Qué se ve | Qué dice | El Halo |
|---|---|---|---|
| **En reposo** | La caja de pedido, lista. | El ejemplo de la caja. | En reposo. |
| **Escuchando** | El micrófono activo y lo dicho, escrito. | «Te escucho» | Escuchando. |
| **Enviado** | El pedido sube a la conversación. La caja se vacía. | — | Pensando. |
| **Pensando** | `ActivityIndicator` y una línea de texto. | Lo que está haciendo: «Buscando en tus viajes» | Pensando. |
| **Trabajando por pasos** | La lista de pasos: hechos, en curso y por hacer. | El nombre de cada paso. | Pensando. |
| **Escribiendo** | El texto, que crece. El botón «Detener». | La respuesta misma. | Respondiendo. |
| **Terminada** | La respuesta, sus fuentes y sus acciones. | — | En reposo. |
| **Detenida** | Lo escrito hasta ahí, y una nota. | «Detuviste la respuesta.» Y «Continuar». | En reposo. |
| **Interrumpida** | Lo escrito hasta ahí, y un aviso. | «Se cortó la conexión.» Y «Reintentar». | En reposo. |
| **Pregunta** | Una pregunta, con opciones si las hay. | «¿Ida, o ida y vuelta?» | En reposo. |
| **Espera permiso** | Lo que va a hacer, y dos botones. | «Voy a cambiar tu pasaje al martes.» | En reposo. |
| **Sin respuesta** | Un mensaje normal, no un error. | «No encontré viajes a Talca en tu cuenta.» Y qué probar. | En reposo. |
| **No puede** | Un mensaje normal. | Qué no puede, y qué sí. | En reposo. |
| **Con error** | `InlineNotification` de error. | «No pude terminar la respuesta.» Y «Reintentar». | En reposo. |
| **Límite alcanzado** | Un aviso sobre la caja, que queda desactivada. | Cuándo se puede volver a pedir. | En reposo. |
| **Sin servicio** | Un aviso, y el camino sin IA. | «El asistente no está disponible. Puedes buscar tu viaje aquí.» | Sin Halo. |

## Pensando

- **Di qué hace**, no que piensa. «Buscando en tus viajes» ayuda. «Pensando…» no dice nada.
- **Una línea que cambia.** Si hay varios pasos, la línea cambia con cada uno. No se apilan.
- **Sin porcentaje.** Nadie sabe cuánto falta. Un avance inventado es una mentira.
- **Sin esqueleto.** `Skeleton` promete una forma, y aquí no se sabe qué forma tendrá la respuesta.
- **Sin frases de relleno.** Nada de «Consultando a los astros». Si no hay nada que decir: «Preparando la respuesta».

## Cuánto tarda

| Tarda | Qué se muestra |
|---|---|
| Menos de 1 segundo | Nada. La respuesta aparece. |
| De 1 a 10 segundos | El indicador y lo que está haciendo. |
| De 10 a 30 segundos | Además, los pasos: cuáles van y cuál sigue. |
| Más de 30 segundos | Además, «Puedes seguir en otra cosa. Te aviso cuando esté.» La tarea sigue aunque se cierre el panel, y avisa con un `ToastRegion`. |

La persona puede detener en cualquiera de ellos.

## Escribiendo

- El texto entra de a palabras o de a frases, a un ritmo parejo. Sin efecto de máquina de escribir letra por letra.
- Un cursor fino al final del texto dice que sigue. Se va al terminar.
- Lo que tiene forma (una tabla, una lista, un bloque de código) aparece cuando su parte está completa, no a medio armar.
- Nada se puede copiar ni valorar hasta que termina.

## Detener

- El botón de enviar pasa a ser **«Detener»**, con el ícono `stop--filled`, apenas se envía el pedido. Mismo lugar, mismo tamaño: no hay que buscarlo.
- Con teclado, Escape detiene.
- Detener es inmediato. No pide confirmación.
- Lo ya escrito se queda, con una nota: «Detuviste la respuesta.» Se puede continuar o repetir.
- En un agente, detener para la tarea y dice qué alcanzó a hacer. Ver Control.

## Trabajando por pasos

Cuando la IA hace varias cosas seguidas, se muestran como lista. Es el componente `LiveActivity`, con `steps`.

- Cada paso tiene su estado: hecho (`checkmark--filled`), en curso (`ActivityIndicator`) o por hacer.
- El nombre dice lo que hace, en infinitivo o en gerundio, siempre igual: «Buscar tu pasaje», «Revisar los cambios permitidos».
- Los pasos hechos se pueden abrir para ver qué encontró.
- Al terminar, la lista se pliega en una línea: «4 pasos · 12 segundos». Sigue ahí para quien quiera verla.

## Cuando no hay respuesta

No encontrar nada no es un error. Va como un mensaje normal, sin rojo ni ícono de alerta, y siempre con qué probar.

| En vez de | Escribe |
|---|---|
| «No se encontraron resultados.» | «No encontré viajes a Talca en tu cuenta. ¿Busco en otra fecha?» |
| «No entiendo tu consulta.» | «No me quedó claro si preguntas por la ida o la vuelta.» |

## Cuando no puede

Hay cosas que la IA no hace: porque no sabe, porque no tiene acceso o porque no debe.

- Dilo en la primera frase, sin rodeos y sin sermón.
- Di qué sí puede: «No puedo devolver un pasaje. Puedo mostrarte cómo pedirlo.»
- Si es un límite de permisos, di cómo darlo.
- No lo disfraces de error técnico. «Algo salió mal» cuando en realidad no puede es mentir.

## Cuando falla

- Usa `InlineNotification` de error, en el lugar de la respuesta.
- Di qué pasó y qué hacer, como en cualquier error de ALMA.
- «Reintentar» envía el mismo pedido. La persona no tiene que escribirlo de nuevo.
- Lo que alcanzó a escribirse no se borra.
- Tras dos fallos seguidos, ofrece el camino sin IA.

## Sin IA

Toda función con IA tiene un camino que no la usa. Si el servicio no está, la pantalla lo dice una vez y muestra ese camino: el buscador, el formulario, la lista.

Una pantalla que sin IA queda vacía está mal hecha.

## Relacionados

Carga, Notificaciones e Indicadores de estado, en Patrones.
