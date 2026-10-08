---
pattern: Arrastrar y soltar
summary: Mover algo tomándolo, y la manera de hacer lo mismo sin arrastrar.
---

## Cuándo

Para reordenar una lista, mover algo de un grupo a otro o traer archivos a la página. Es rápido para quien usa mouse o el dedo, y directo: se mueve lo que se toca.

Nunca es la única manera. Todo lo que se hace arrastrando se puede hacer también con un botón o un menú.

## Estados

| Momento | Qué se ve |
|---|---|
| En reposo | Un asa (ícono `draggable`) dice que la fila se puede mover. |
| Tomado | La pieza se levanta: toma `shadow-floating` y sigue al puntero. Su lugar queda marcado. |
| Sobre un destino válido | Una línea en `interactive-01` muestra dónde va a caer, o el destino se resalta. |
| Sobre un lugar donde no puede caer | El destino no cambia y el cursor lo indica. |
| Soltado | La pieza llega a su lugar y las demás se acomodan. |
| Cancelado | La pieza vuelve a donde estaba. |

> **Imagen pendiente:** una lista de cuatro filas con asa, en tres momentos: en reposo, una fila tomada con su lugar marcado y la línea de destino, y la lista ya reordenada.

## La alternativa sin arrastrar

Cada cosa que se puede arrastrar tiene además una de estas:

- **Botones «Subir» y «Bajar»** en la fila, para reordenar.
- **Un menú «Mover a…»** con los destinos posibles.
- **«Elegir archivos»**, junto a la zona donde se sueltan: es lo que hace `FileUploader`.

No es un respaldo escondido: está a la vista o a un toque.

## Con teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al asa. |
| Espacio | Toma la pieza. |
| Flechas | La mueve un lugar. |
| Espacio | La suelta. |
| Esc | Cancela y la devuelve. |

## Reglas

- **Se actúa al soltar**, no al tomar: hasta ese momento se puede cancelar.
- **Esc cancela** siempre, y soltar fuera de un destino también.
- **Lo movido se puede deshacer** (ver **Deshacer**).
- En una lista larga, la página se desplaza sola al acercar la pieza al borde.
- Al tocar, se toma manteniendo el dedo un momento, para no confundirlo con desplazar.
- Solo se mueve en la dirección que tiene sentido: una lista, hacia arriba y abajo.

## Accesibilidad

- Un lector anuncia cada paso: «Tomaste Salida 8:30. Posición 2 de 4», «Movida a posición 1», «Soltada en posición 1».
- El asa tiene nombre: «Mover Salida 8:30».
- El destino no se distingue solo por color: lleva además la línea o un borde.
- Con movimiento reducido, las filas cambian de lugar sin deslizarse.

## No hagas

- Arrastrar como única forma de hacer algo.
- Hacer arrastrable toda la fila si dentro hay texto que se quiere seleccionar o botones.
- Un destino que no avisa que lo es hasta que se suelta encima.
- Mover al tiro, sin poder cancelar ni deshacer.

## Relacionados

`List` · `FileUploader` · `Table` · Deshacer · Acciones.
