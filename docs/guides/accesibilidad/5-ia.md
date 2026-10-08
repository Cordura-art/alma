---
element: Accesibilidad
order: 1
tab: IA
summary: El piso de ALMA es WCAG 2.2 AA en los cuatro temas, con foco visible, teclado y movimiento reducido.
---

## Lo que cambia con una IA

Una interfaz de IA suma tres dificultades a las de siempre: el contenido **llega solo y de a poco**, **tarda sin decir cuánto** y **no se sabe qué forma tendrá**. Quien no ve la pantalla, o no usa puntero, tiene que enterarse de lo mismo que el resto, y al mismo tiempo.

Todo lo de esta guía vale aquí. Esto es lo propio de una IA; el resto está en la guía **Interfaces de IA**.

## Con lector de pantalla

| Momento | Qué se anuncia | Cómo |
|---|---|---|
| Se envía el pedido | «Pedido enviado» | Región viva, `polite`. |
| Empieza a trabajar | Lo que hace: «Buscando en tus viajes» | `role="status"`. Cada paso nuevo se anuncia una vez. |
| La respuesta se escribe | Nada, todavía. | El bloque de la respuesta lleva `aria-busy="true"`. |
| Termina | La respuesta completa, una vez. | Se quita `aria-busy` y la región viva la lee. |
| Se detiene | «Respuesta detenida» | Región viva, `polite`. |
| Falla | El error, de inmediato. | `role="alert"`. |
| Pide permiso | El diálogo, con su título. | El foco pasa al diálogo. |

- **No anuncies palabra por palabra.** Un texto que crece dentro de una región viva se lee a pedazos, o se lee entero una y otra vez. Se anuncia al terminar. Si la respuesta es larga, por párrafos completos.
- **Cada respuesta se anuncia sola.** `ChatMessage` trae su propia región viva: dice lo que hace mientras piensa y lee la respuesta al terminar.
- **La conversación es una lista.** Cada mensaje es un elemento, y empieza diciendo de quién es: «Tú» o «Asistente», como texto oculto a la vista si no se muestra.
- **Cada respuesta tiene un encabezado** oculto a la vista, para saltar de una a otra.
- **La marca de IA se lee.** Su nombre es «Generado por IA», no «IA» a secas ni el nombre del ícono. Si se abre, es un botón, y dice que abre una explicación.
- **Las fuentes son enlaces con nombre**: «Fuente 1: tu pasaje del 31 de marzo», no «1».
- **Las acciones de la respuesta** tienen nombre: «Copiar respuesta», «Repetir respuesta», «Sirvió», «No sirvió». Los dos últimos dicen si están marcados, con `aria-pressed`.

## Con teclado

| Tecla | Qué hace |
|---|---|
| Enter | Envía el pedido. |
| Mayúsculas + Enter | Salto de línea. |
| Escape | Detiene la respuesta en curso. Si no hay ninguna, cierra el panel. |
| Tabulador | Recorre: sugerencias, caja, enviar, y las acciones de cada respuesta. |
| Tabulador, en un completado | Acepta la sugerencia. |
| Flecha arriba, con la caja vacía | Trae el último pedido para editarlo. |

- **El foco no se mueve solo.** Cuando llega la respuesta, el foco sigue en la caja. La persona decide cuándo ir a leerla.
- **Al abrir el panel**, el foco va a la caja. Al cerrarlo, vuelve al botón que lo abrió.
- **«Detener» ocupa el lugar de «Enviar»**: mismo orden de tabulación, mismo tamaño.
- **Las acciones que aparecen al pasar el cursor** aparecen también al enfocar. Nunca dependen solo del puntero.
- **Un permiso atrapa el foco** como cualquier diálogo, y Escape es «Cancelar».

## Movimiento

- Con movimiento reducido, **el Velo y el Halo son un cuadro quieto**. El Halo no late ni cambia con el estado.
- **El texto no entra de a poco**: aparece por párrafos completos, sin cursor que parpadea.
- **El indicador de «pensando»** sigue, porque informa. Es el `ActivityIndicator`, que ya respeta la preferencia.
- **Nada parpadea** más de tres veces por segundo. El latido del Halo es lento y de poco contraste.
- **La vista no se arrastra.** El desplazamiento automático se detiene apenas la persona se mueve.

## Color y contraste

- La marca de IA cumple 4,5:1 en su texto y 3:1 en su ícono, en todos los temas.
- El texto generado usa `text-01`, como el resto. No va más claro para parecer provisorio.
- Una sugerencia de completado en `text-03` es un apoyo: lo mismo se puede leer y aceptar de otra forma.
- La duda y el estado no se dicen solo con color.
- Ningún texto va sobre el Velo o el Halo. Por eso su contraste no hay que medirlo.

## Tiempo

- **Nada caduca.** Una sugerencia no desaparece sola. Un permiso espera lo que haga falta.
- **Deshacer dura** lo que dice el patrón Deshacer, y se puede alcanzar con teclado.
- Si una tarea larga termina mientras la persona está en otra parte, el aviso espera a que vuelva.

## Para leer y entender

- Lenguaje claro: frases cortas, una idea por frase. Ver **Contenido › IA**.
- Una respuesta larga lleva subtítulos y listas. Se puede pedir «más corto» o «más simple».
- Lo que se oye, se lee. Lo que se pide con voz, se puede escribir.
- La IA responde en el idioma del pedido, y el bloque de la respuesta lleva su `lang`.
- Los blancos de toque miden 44 px o más, también las acciones bajo cada respuesta.

## Lista de comprobación

- Se entiende qué hizo la IA sin ver la pantalla.
- La respuesta se anuncia una vez, completa.
- Se puede enviar, detener, copiar, repetir y valorar solo con teclado.
- El foco no se mueve cuando llega la respuesta.
- Con movimiento reducido no se pierde ningún estado.
- La pantalla sirve sin WebGL y sin el servicio de IA.
