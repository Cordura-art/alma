---
element: Interfaces de IA
order: 3
tab: Conversación
---

## Cuándo una conversación

Una conversación sirve cuando la persona no sabe todavía qué pedir, o lo que pide no cabe en un formulario. Para todo lo demás es más lenta que un botón: hay que escribir, esperar y leer.

Si la tarea se repite y tiene pocos datos, haz un formulario. Si lo que ayuda es un resumen o una sugerencia en el lugar, ponlo en el lugar, con su marca. Un asistente no reemplaza la navegación ni la búsqueda: las acompaña.

## Las partes

![Un asistente en un teléfono, con sus partes numeradas. Arriba, la cabecera con el nombre «Asistente» y el botón para empezar de nuevo (1). El mensaje de la persona, a la derecha (2). La respuesta, a todo el ancho (3), con sus fuentes (4) y sus acciones: copiar, repetir y valorar (5). Abajo, las sugerencias para seguir (6), la caja de pedido con su botón de enviar (7) y el aviso «La IA puede equivocarse» (8).](assets/Guias/ia-conversacion.png)

1. **Cabecera.** El nombre del asistente y «Nueva conversación». Si hay figura, va aquí.
2. **Pedido.** Lo que escribió la persona. A la derecha, sobre un fondo `ui-03`.
3. **Respuesta.** A todo el ancho, sin fondo ni borde: es el contenido, no una burbuja.
4. **Fuentes.** De dónde salió. Ver Transparencia.
5. **Acciones de la respuesta.** Copiar, repetir, valorar.
6. **Sugerencias.** Dos o tres maneras de seguir.
7. **Caja de pedido.** Donde se escribe. Con ella va el botón de enviar, que se vuelve «Detener».
8. **Aviso.** Una línea fija: la IA puede equivocarse.

## La caja de pedido

Es el componente `PromptInput`.

- **Etiqueta.** Lleva su rótulo a la vista: «Tu pedido». El texto de ejemplo no lo reemplaza.
- **Ejemplo.** Uno concreto y que funcione: «Pregunta por tus viajes». No «Escribe lo que quieras».
- **Crece.** Parte en una línea y crece hasta seis. Desde ahí se desplaza por dentro.
- **Enviar.** Enter envía. Mayúsculas + Enter hace un salto de línea. En un teléfono, Enter hace el salto y se envía con el botón.
- **Vacía, no se envía.** El botón está desactivado hasta que hay texto.
- **Mientras responde.** Se puede seguir escribiendo. El botón de enviar pasa a ser «Detener».
- **Siempre abajo.** Fija al pie del panel. En un teléfono, sube con el teclado.
- **Adjuntos.** Si se pueden sumar archivos, el botón va a la izquierda de la caja y lo adjunto aparece arriba del texto, como `Tag` que se puede quitar.
- **Lo que no se pierde.** Si falla el envío, el texto vuelve a la caja.

## Antes del primer pedido

Una caja vacía no dice qué se puede pedir. La primera pantalla lo enseña.

- El escenario de presencia arriba, si la IA es el centro de la pantalla. Ver Presencia.
- Un saludo corto que dice para qué sirve: «¿En qué te ayudo con tus viajes?».
- **Tres o cuatro sugerencias**, como `Tag` que se pueden tocar. Reales, distintas entre sí, y que funcionen con los datos de esta persona.
- Lo que no puede hacer, si la gente suele pedirlo: «Todavía no puedo comprar pasajes por ti.»

Tocar una sugerencia la envía de inmediato. No hace falta pasar por la caja.

## La respuesta

Cada turno es un `ChatMessage`: el pedido de la persona y la respuesta, con sus estados, sus fuentes y sus acciones.

- **Llega de a poco.** El texto aparece a medida que se genera. Así se empieza a leer antes, y se puede detener si va por mal camino.
- **Sin saltos.** El texto se agrega al final. Nada de lo ya escrito cambia de lugar ni se reescribe.
- **El desplazamiento es de la persona.** La vista sigue al texto nuevo solo si la persona está al final. Si subió a leer, se queda donde está y aparece un botón «Ir al final».
- **Lo primero, primero.** La respuesta directa va en la primera frase. El detalle, después.
- **Con forma.** Pasos como lista numerada. Comparaciones como `Table`. Código en bloque, con su botón de copiar. Cifras con el formato de Chile.
- **Corta.** Hasta unas 150 palabras si la pregunta es simple. Más largo, con subtítulos.
- **Con qué seguir.** Si la respuesta lleva a una acción de la app, ofrécela como botón: «Ver mi pasaje».

## Acciones de la respuesta

Van debajo de cada respuesta terminada, como botones de ícono con su `Tooltip`. No aparecen mientras la respuesta se escribe.

| Acción | Ícono | Qué hace |
|---|---|---|
| Copiar | `copy` | Copia el texto, sin las acciones ni las fuentes. Avisa «Copiado». |
| Repetir | `restart` | Genera otra respuesta al mismo pedido. La anterior no se pierde: se puede volver a ella. |
| Sirvió | `thumbs-up` | Valora. Ver Control. |
| No sirvió | `thumbs-down` | Valora, y pregunta qué falló. |

Las de las respuestas anteriores se ven al pasar el cursor o al enfocar. Las de la última, siempre.

## Corregir el pedido

- El último pedido se puede **editar**: vuelve a la caja, y al enviarlo reemplaza la respuesta.
- Los pedidos anteriores no se editan. Para cambiar el rumbo, se escribe uno nuevo.
- «Nueva conversación» empieza de cero. Si la anterior se guarda, dilo; si se pierde, pide confirmación.

## Sugerencias para seguir

Después de una respuesta, dos o tres pedidos posibles. Cortos, escritos como los escribiría la persona: «¿Y el último bus de vuelta?».

No las muestres si no hay una continuación clara. Tres sugerencias genéricas son ruido.

## Dónde vive

| Lugar | Cuándo | Con qué |
|---|---|---|
| **Página propia** | El asistente es el producto. | Columna de texto de hasta 48 rem, centrada. |
| **Panel lateral** | Acompaña a otra tarea, y hay ancho. | `Sheet` a la derecha, desde 22 rem. No tapa lo que la persona está haciendo. |
| **Hoja inferior** | En un teléfono. | `Sheet` desde abajo, a alto completo cuando hay teclado. |

El asistente recuerda la conversación mientras el panel se cierra y se abre. Si la persona cambia de página, sigue ahí.

## Por voz

- Escuchar se nota: el Halo en «Escuchando» y el texto «Te escucho».
- Lo que la persona dice aparece escrito mientras habla, para que vea si se entendió.
- El micrófono se apaga solo tras unos segundos de silencio, y lo dice.
- Todo lo que se oye también se lee. Todo lo que se pide por voz se puede pedir escribiendo.
- El permiso del micrófono se pide al tocar el botón, no al abrir la app.

## Relacionados

Barra de texto, Carga, Estados vacíos y Deshacer, en Patrones. `PromptInput`, `ChatMessage`, `SourceList`, `Tag` y `Sheet`, en Componentes.
