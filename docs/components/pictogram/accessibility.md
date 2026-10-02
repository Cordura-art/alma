---
component: Pictogram
tab: Accesibilidad
summary: Qué resuelve ALMA en el pictograma.
---


## Qué ofrece ALMA

- Sin `label`, el pictograma es decorativo: queda oculto para el lector. Es el caso normal, porque el nombre de la cosa va al lado.
- Con `label`, se anuncia con ese nombre (`role="img"`).
- Crece con el texto.

## Recomendaciones de diseño

- Nunca dejes que el pictograma sea la única forma de reconocer algo: el nombre siempre está.
- No lo uses para comunicar un estado ni una acción: una persona que no lo ve no pierde nada.
- Dos pictogramas pueden parecerse. En una lista, repártelos con `pictogramDrawings()`.

## Verificación

axe sin problemas en los cuatro temas.
