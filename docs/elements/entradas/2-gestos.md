---
element: Entradas
order: 9
tab: Gestos
summary: Los gestos del toque, y lo que hace lo mismo sin gesto.
---

## Los gestos

| Gesto | Qué hace en ALMA | Lo mismo, sin el gesto |
|---|---|---|
| Tocar | Activa un control. | Enter o Espacio. |
| Mantener | Toma algo para moverlo; abre un menú de acciones. | Un botón de menú a la vista. |
| Deslizar hacia los lados | Pasa de página; muestra las acciones de una fila. | Flechas o `PageControl`; un menú en la fila. |
| Deslizar hacia abajo | Cierra una `Sheet`. | Su botón de cerrar, o Esc. |
| Arrastrar | Mueve o reordena. | «Subir», «Bajar», «Mover a…». |
| Pellizcar | Amplía una imagen o un mapa. | Botones de más y menos. |

La columna de la derecha no es opcional. Un gesto es un atajo: nadie lo ve, hay que descubrirlo, y no todos pueden hacerlo.

## Reglas

- **Los gestos de siempre hacen lo de siempre.** No uses deslizar o pellizcar para algo distinto de lo que hacen en todo el teléfono.
- **Nada con dos dedos o con un trazo como única manera.** Lo que pide un movimiento complejo tiene una versión de un solo toque.
- **Un gesto se puede cancelar**: volviendo al punto de partida, o soltando fuera.
- **Sin gestos en los bordes de la pantalla**, que son del sistema.
- **Un gesto destructivo se puede deshacer.** Deslizar para archivar ofrece «Deshacer» (ver el patrón **Deshacer**).

## Mostrar que se puede

Un gesto que no se ve no existe. Cuando algo responde a uno:

- Deja una pista visible: un asa para arrastrar, la orilla de la página siguiente, el borde de una `Sheet`.
- La primera vez, un `Tip` puede contarlo. Una sola vez.
- El control que hace lo mismo está siempre a la vista o en un menú.

## Movimiento del aparato

Agitar o inclinar el teléfono no dispara nada en ALMA. Si alguna vez lo hace, tiene que poder apagarse y tener un botón que haga lo mismo.

## Vibración

Una vibración corta puede confirmar algo que el dedo tapa: que una pieza se tomó, que un valor llegó al límite. Nunca es la única señal, y sigue el ajuste del sistema. ALMA todavía no tiene tokens para esto.
