---
element: Interfaces de IA
order: 3
tab: Transparencia
---

## La marca de IA

Todo lo que una IA generó lleva una marca: el ícono `ai-label` y el texto «IA». Es pequeña, neutra y siempre la misma. No es un adorno ni un sello de calidad: dice de dónde viene lo que estás leyendo.

Es el componente `AILabel`. Se puede abrir: al tocarla, explica.

![Una tarjeta con el resumen de un viaje. Junto al título está la marca «IA» (1). El texto generado va debajo (2), con sus fuentes numeradas (3). La marca está abierta y muestra su explicación (4): qué es, con qué se hizo y cuándo.](assets/Guias/ia-marca.png)

1. **Marca.** Junto al título de lo generado, o en su esquina superior derecha.
2. **Contenido generado.** Con el mismo estilo de texto que el resto. No va en cursiva ni en otro color.
3. **Fuentes.** De dónde salió cada afirmación.
4. **Explicación.** Lo que la marca muestra al abrirse.

## Dónde va la marca

La marca va en el contenedor más chico que encierre todo lo generado. Una sola por contenedor.

| Lo generado es | La marca va | Ejemplo |
|---|---|---|
| Toda la página | En el encabezado, junto al título. | Un informe armado por la IA. |
| Una sección o tarjeta | Junto al título de la sección. | «Resumen de tu viaje». |
| Un mensaje de una conversación | No hace falta en cada mensaje: basta el nombre del asistente y el aviso bajo la caja. | Una respuesta del asistente. |
| El valor de un campo | Dentro del campo, al final, mientras nadie lo edite. | Una dirección completada sola. |
| Una fila o una celda | En la celda, o en una columna propia si son muchas. | Una categoría sugerida para un gasto. |
| Una imagen, un audio o un video | Sobre la esquina inferior izquierda, siempre a la vista. Y en sus datos. | Una ilustración generada. |
| Una sugerencia que aún no se acepta | En la sugerencia, junto a sus acciones. | Un borrador de respuesta. |

Si la persona edita lo generado, deja de ser solo de la IA. La marca cambia a «IA · editado» y aparece cómo volver a la versión original. Si lo reescribe entero, la marca se va.

## Qué explica

La explicación tiene tres niveles. Cada uno alcanza para quien se queda ahí.

| Nivel | Dónde | Qué dice | Largo |
|---|---|---|---|
| **1. Qué es** | La marca misma. | «IA»: esto lo generó una IA. | Dos letras. |
| **2. Cómo se hizo** | El `Popover` de la marca. | Qué hizo, con qué datos y cuándo. Qué tan seguro es, si se sabe. | Hasta cuatro líneas. |
| **3. El detalle** | Una página o un panel aparte, enlazado desde el nivel 2. | El modelo, los límites conocidos, cómo se usan los datos, cómo reportar un error. | Lo que haga falta. |

El nivel 2 responde siempre lo mismo, en este orden:

1. **Qué hizo.** «Resumí los tres correos de tu reserva.»
2. **Con qué.** «Usé tu pasaje y los avisos de la empresa.»
3. **Cuándo.** «Hoy a las 09:12.» Lo generado envejece.
4. **Qué revisar.** «Revisa la hora de salida antes de viajar.»

No pongas ahí el nombre del modelo, versiones ni términos técnicos. Eso es del nivel 3.

## Fuentes

Una respuesta que afirma algo dice de dónde lo sacó.

- Cada fuente es un número pequeño junto a la frase (`SourceRef`), y una lista al final con el título y el origen (`SourceList`).
- La lista enlaza a la fuente. Si es un documento de la persona, lo abre en el lugar exacto.
- Si no hay fuente, se dice: «Esto no lo encontré en tus documentos. Lo sé de forma general.»
- Nunca se muestra una fuente que no se usó. Una cita falsa es peor que ninguna.
- Con más de cinco fuentes, muestra tres y un «Ver las 8».

## Decir la duda

Una IA suena igual de segura cuando acierta que cuando inventa. La interfaz tiene que corregir eso.

| Qué tan seguro | Cómo se muestra | Ejemplo |
|---|---|---|
| **Alto** | Sin aviso. La respuesta y sus fuentes. | «Tu bus sale a las 08:30.» |
| **Medio** | Una frase al inicio que lo dice, y qué revisar. | «Según el aviso de ayer, sale a las 08:30. Puede haber cambiado.» |
| **Bajo** | No se afirma. Se ofrecen opciones o se pregunta. | «No encontré la hora. ¿Busco en el sitio de la empresa?» |

- Dilo con palabras, no con porcentajes. «87 % seguro» parece exacto y casi nunca lo es.
- No uses color para la duda: ni amarillo ni rojo. Es información, no una alerta.
- Cuando hay varias respuestas posibles, muestra dos o tres. Elegir es más fácil que corregir.
- Bajo la caja de pedido de un asistente va siempre un aviso corto: «La IA puede equivocarse. Revisa lo importante.»

## Imágenes y medios

Una imagen generada puede salir de la pantalla: se descarga, se comparte, se imprime. Su marca tiene que viajar con ella.

- La marca va sobre la imagen, en la esquina inferior izquierda, sobre un fondo que asegure el contraste.
- Al descargar o compartir, el archivo lleva en sus datos que fue generado, con qué y cuándo.
- Una imagen real retocada por una IA lleva «IA · editado».
- El texto alternativo empieza diciéndolo: «Imagen generada: …».
- Una voz sintética se presenta al comenzar: «Soy el asistente de ALMA, una voz generada.»

## Qué no hacer

- No marcar con color, brillo o cursiva en vez de la marca.
- No marcar lo que no es generado, para que parezca más avanzado.
- No esconder la marca en un menú o al final de la página.
- No usar chispas, estrellas ni varitas como marca. Dicen «magia», y esto no lo es.
- No quitar la marca porque «ya se sabe».
