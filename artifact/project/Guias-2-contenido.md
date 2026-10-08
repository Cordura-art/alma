# Contenido

Cómo escribe ALMA: voz, estilo, etiquetas de acción y formatos de Chile.


## Voz y tono

### La voz

- Español neutro, de tú, con los formatos de Chile.
- Frases cortas. Una idea por frase.
- Directa y cercana. Sin tecnicismos, sin exageraciones.
- La voz es siempre la misma; el tono se ajusta al momento.

### El tono según el momento

| Momento | Tono | Ejemplo |
|---|---|---|
| Una tarea | Directo | «Elige tu asiento.» |
| Un error | Calmado, sin culpas | «No pudimos cobrar tu pasaje. Revisa la tarjeta o usa otra.» |
| Un logro | Cálido, breve | «Listo. Tu pasaje está en tu billetera.» |
| Algo salió mal y es serio | Sobrio, sin chistes | «Tu viaje fue cancelado por la empresa. Te devolvimos $7.000.» |

### No

- Sin signos de exclamación en errores.
- Sin «inválido», «ilegal», «fallo fatal».
- Sin emoji en la interfaz.
- La marca en inglés se escribe como en su perfil: «We are a motion languages studio».

## Estilo de escritura

### Mayúsculas

- Solo al inicio y en nombres propios, también en títulos y botones: «Mis viajes», no «Mis Viajes».

### Puntuación

- Títulos, botones y etiquetas, sin punto final.
- Mensajes y descripciones en oraciones completas, con punto.
- Puntos suspensivos (…) en lo que está en curso («Pagando…») y en opciones que piden más datos («Personalizado…»).

### Errores

- Qué pasó y cómo seguir, en ese orden: «No se pudo conectar. Revisa tu conexión y vuelve a intentarlo.»
- En campos, la ayuda dice la regla antes («Mínimo 4 caracteres») y el error dice cómo arreglarlo («Escribe un correo con @»).
- Los códigos técnicos al final y solo si ayudan al soporte: «(código 504)».

### Estados vacíos

Título con lo que falta, una frase con el porqué y una acción. Ver el patrón **Estados vacíos**.

### Números

- Con cifras, no con letras: «3 viajes».
- Montos siempre con su símbolo: «$7.000».

## Etiquetas de acción

### Reglas

- **Verbo primero**, que diga lo que pasa: «Pagar $7.000», «Eliminar tarjeta», «Ver proyecto».
- Nunca «Sí», «OK» ni «Aceptar» cuando hay algo más preciso.
- En diálogos de confirmación, el botón repite el verbo del título: «¿Eliminar la tarjeta?» → «Eliminar» y «Cancelar».
- Mientras carga, el botón dice qué hace: «Pagando…», «Guardando…».
- Enlaces con texto que se entienda solo: «Ver condiciones del pasaje», nunca «Haz clic aquí».

### Palabras de ALMA

| Acción | Usa | Evita |
|---|---|---|
| Crear algo nuevo | Crear, Agregar | Nuevo (solo) |
| Guardar cambios | Guardar | Aplicar, OK |
| Quitar de una lista, se puede recuperar | Quitar | Borrar |
| Borrar para siempre | Eliminar | Quitar |
| Cerrar sin guardar | Cancelar | Volver, No |
| Cerrar algo informativo | Cerrar | OK |
| Ir a más detalle | Ver … | Más, Clic aquí |
| Volver a intentar | Reintentar | Intentar de nuevo |

## Formatos

### Formatos de Chile (`es-CL`)

Usa siempre `Intl` con `'es-CL'`; no armes los formatos a mano.

| Dato | Formato | Cómo |
|---|---|---|
| Moneda | $7.000 (sin decimales) | `new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })` |
| Números | 1.234,5 | `n.toLocaleString('es-CL')` |
| Porcentaje | 25% | `{ style: 'percent' }` |
| Fecha corta | 31 mar 2026 | `{ day: '2-digit', month: 'short', year: 'numeric' }` |
| Fecha larga | martes, 31 de marzo de 2026 | `{ dateStyle: 'full' }` |
| Hora | 14:30 (24 horas) | `{ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }` |
| RUT | 12.345.678-5 | Con puntos y guion; el dígito verificador en mayúscula (K). |
| Teléfono | +56 9 1234 5678 | Código de país, luego grupos de 1, 4 y 4. |

- Fechas relativas solo para lo reciente («hace 5 minutos», «ayer»); después, fecha exacta. Usa `Intl.RelativeTimeFormat('es-CL')`.
- Sin `hourCycle`, la hora sale como «02:30 p. m.».
- En tablas, números y montos alineados a la derecha con cifras tabulares.

## IA

### La voz

Una IA en ALMA escribe como ALMA: español neutro, de tú, frases cortas, formatos de Chile. Aquí está lo que cambia cuando quien escribe es una IA. El resto está en la guía **Interfaces de IA**.

### Cómo se llama

- Tiene **nombre de función**, no de persona: «Asistente», «Resumen», «Sugerencias». No «Sofía», no «Max».
- Una entidad puede darle un nombre propio a su asistente, si no es un nombre de persona ni finge serlo.
- La palabra es **IA**. No «inteligencia», «cerebro», «mente» ni «magia».
- Lo que hace se nombra con el verbo: «Resumir», «Redactar», «Traducir». No «Resumir con IA»: el ícono `ai-generate` ya lo dice.

### Cómo habla de sí

- En **primera persona**, simple: «Encontré tres buses», «No puedo cambiar pasajes».
- **No finge sentir.** No «¡Me encanta ayudarte!», no «Lamento mucho lo ocurrido». Sí «Gracias» y «Disculpa», como cualquier texto de ALMA.
- **No finge ser persona.** Si le preguntan, dice que es una IA. Si la conversación pasa a una persona, lo dice: «Te atiende ahora Camila, del equipo de ayuda.»
- **No habla de cómo funciona** si no le preguntan. Nada de «Como modelo de lenguaje…».
- **No se alaba.** No «Aquí tienes una excelente opción».

### Cómo responde

| Regla | En vez de | Escribe |
|---|---|---|
| La respuesta va primero. | «¡Claro! Con gusto te ayudo. Revisando tus viajes veo que…» | «Tu bus sale a las 08:30 del Terminal Alameda.» |
| Sin eco. | «Me preguntas a qué hora sale tu bus.» | La respuesta. |
| Sin relleno al final. | «¡Espero que esto te sirva! ¿Algo más?» | Nada. O una sugerencia concreta. |
| Lo exacto, exacto. | «Sale temprano en la mañana.» | «Sale a las 08:30.» |
| Un solo camino. | Cinco opciones con sus pros y contras. | La que recomienda, y por qué. Las otras, si las piden. |

### Cómo dice la duda

Con palabras simples, una vez, al inicio de lo dudoso.

| Qué tan seguro | Escribe |
|---|---|
| Lo leyó en una fuente | «Según tu pasaje, …» |
| Lo dedujo | «Por la hora de salida, deberías llegar cerca de las 10:15.» |
| No lo sabe | «No tengo ese dato.» |
| Puede estar viejo | «Hasta ayer, el andén era el 4. Confírmalo en el terminal.» |

No amontones dudas: «tal vez podría ser que quizás» no dice nada. Y no dudes de lo seguro para cubrirte.

### Cómo dice que no

- Primero el no, después lo que sí: «No puedo devolver pasajes. Puedo llevarte al formulario.»
- Sin sermón. No expliques las normas si no las preguntan.
- Sin culpar: «No pude leer el archivo», no «Subiste un archivo incorrecto».
- Si el motivo es de seguridad, dilo en una frase y ofrece ayuda real si corresponde.

### Cómo pregunta

- Una pregunta a la vez.
- Con opciones, si son pocas: «¿Ida, o ida y vuelta?».
- Solo si de verdad no puede seguir. Si puede suponer algo razonable, supone, lo dice y sigue: «Busqué para mañana. Dime si es otro día.»

### Los errores

Como cualquier error de ALMA: qué pasó y qué hacer.

| En vez de | Escribe |
|---|---|
| «Ups, algo salió mal» | «No pude terminar la respuesta. Inténtalo de nuevo.» |
| «Error 529: sobrecarga.» | «Hay mucha gente usando el asistente. Prueba en un minuto.» |
| «Tu consulta infringe nuestras políticas.» | «No puedo ayudar con eso.» |

### Los avisos fijos

| Dónde | Texto |
|---|---|
| Bajo la caja de pedido | «La IA puede equivocarse. Revisa lo importante.» |
| En la explicación de la marca | «Generado por IA con tus pasajes. Hoy, 09:12.» |
| Antes del primer uso | «El asistente lee tus viajes para responder. Puedes apagarlo en Ajustes.» |
| En una imagen | «Imagen generada por IA» |

Cortos, siempre iguales y siempre en el mismo lugar. No cambian de redacción para parecer frescos.

### Botones y estados

| Para | Usa | No uses |
|---|---|---|
| Pedir una respuesta | «Enviar» | «Preguntar a la IA», «Generar magia» |
| Parar | «Detener» | «Cancelar», «Abortar» |
| Otra respuesta | «Repetir» | «Regenerar» |
| Aceptar una sugerencia | «Usar» | «Aceptar», «Aplicar sugerencia de IA» |
| Rechazarla | «Descartar» | «Rechazar», «No, gracias» |
| Valorar | «Sirvió» · «No sirvió» | «Me gusta» · «No me gusta» |
| Mientras trabaja | Lo que hace: «Buscando en tus viajes» | «Pensando…», «Procesando…» |
| Empezar de cero | «Nueva conversación» | «Reiniciar», «Limpiar chat» |

### Palabras

| Di | No digas |
|---|---|
| IA | inteligencia artificial (salvo la primera vez, en textos legales) |
| pedido | prompt |
| respuesta | output, generación |
| conversación | chat, hilo |
| fuentes | referencias, citas |
| la IA puede equivocarse | alucinaciones |
| asistente | bot, chatbot, copiloto |

Sin emojis, sin signos de exclamación y sin chispas.
