---
component: ChatMessage
tab: Accesibilidad
summary: Lo que ChatMessage resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Dice de quién es.** Cada pedido empieza con «Tú:» y cada respuesta tiene un encabezado «Asistente», los dos ocultos a la vista. Con el encabezado se salta de una respuesta a otra.
- **Anuncia lo que hace.** Al empezar a pensar, se lee la línea de estado: «Buscando en tus viajes».
- **No lee palabra por palabra.** Mientras se escribe, la respuesta está marcada como ocupada. Al terminar se lee una vez, completa.
- **Dice si se detuvo**: «Respuesta detenida».
- **El error interrumpe**, como cualquier error de ALMA.
- **Las acciones tienen nombre**: «Copiar respuesta», «Repetir respuesta», «Sirvió», «No sirvió». Las dos últimas dicen si están marcadas.
- **Copiar se confirma** también para el lector: «Copiado».
- **El foco no se mueve** cuando llega la respuesta.

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Recorre los números de fuente, las fuentes y las acciones de cada respuesta. |
| Enter, Espacio | Activa la acción. |

Detener se hace desde `PromptInput`, con su botón o con Escape.

## Recomendaciones de diseño

- No escondas las acciones de la última respuesta. Las de las anteriores pueden atenuarse, pero tienen que aparecer al enfocarlas.
- La línea de «pensando» tiene que decir algo útil: es lo único que oye quien no ve la pantalla durante la espera.
- Si la respuesta es larga, usa subtítulos: se puede saltar entre ellos.

## Consideraciones de desarrollo

- Usa el mismo elemento, con la misma `key`, de `thinking` a `done`. Si lo reemplazas, la respuesta no se anuncia.
- Pon la conversación en una lista (`ol`) y cada mensaje con `as: 'li'`.
- Si la respuesta está en otro idioma, pasa `lang`.
- Con movimiento reducido, entrega el texto por párrafos completos en vez de palabra por palabra.

Pendiente: VoiceOver y NVDA.
