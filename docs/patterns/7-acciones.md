---
pattern: Acciones
summary: Cómo ordenar los botones: prominencia, cantidad y posición.
---

## Prominencia

| Estilo | Para |
|---|---|
| `filled` | La acción más probable. **1 o 2 por vista.** |
| `tinted` | Acciones importantes, pero no la principal. |
| `gray` | Acciones secundarias; «Cancelar». |
| `plain` | Acciones terciarias o en barras de herramientas. |
| `tertiary` | Contorno, del theme de origen de Cordura. |

El rol cambia el significado, no la prominencia: `destructive` pinta de rojo cualquier estilo.

![Una vista de pasaje con una acción filled «Pagar $7.000», dos gray «Cambiar asiento» y «Compartir», y el menú «Más» abierto con «Anular pasaje» al final, separada y en rojo.](assets/Patrones/acciones-prominencia.png)

## Cantidad

- Muestra pocas acciones a la vista; el resto va en el menú «Más» (`moreActions` de `Toolbar` o un `PullDownButton`).
- La acción destructiva va al final del menú, separada.

## Posición

| Lugar | Orden |
|---|---|
| Pie de un diálogo | «Cancelar» a la izquierda, la acción a la derecha. |
| Final de un formulario | Alineados con los campos. Si hay «Cancelar», va a la izquierda de la acción principal, como en los diálogos. |
| Barra de herramientas | Las más usadas a la derecha, como íconos; el resto en «Más». |
| Fila de una lista o tarjeta | Una sola acción por fila. |

## Etiquetas

- Verbo primero, que diga lo que pasa: «Pagar $7.000», «Eliminar tarjeta».
- Nunca «Sí», «OK» o «Aceptar» si hay algo más preciso.
- Botones de solo ícono: con `aria-label` y, si ayuda, un `Tooltip`.

## Desactivar o no

Prefiere dejar el botón activo y explicar al pulsarlo qué falta. Un botón desactivado no dice por qué (ver **Desactivado y solo lectura**).

## Relacionados

`Button` · `PullDownButton` · `Toolbar` · Guía de contenido.
