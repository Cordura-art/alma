---
element: Diseño adaptable
order: 8
tab: Comportamientos
summary: Las cuatro maneras en que una pieza responde al espacio.
---

## Cuatro maneras

| Manera | Qué hace | Ejemplo |
|---|---|---|
| Fluir | El contenido ocupa el ancho que hay y se corta en más líneas. | Un párrafo, una fila de etiquetas. |
| Reacomodar | Lo que iba lado a lado pasa a ir uno sobre otro. | Dos columnas de un formulario que pasan a una. |
| Revelar | Con más espacio aparece un panel que antes estaba a un toque. | El detalle junto a la lista. |
| Cambiar | Una pieza se reemplaza por otra que hace lo mismo. | `TabBar` por `Sidebar`; `Table` por lista. |

Prefiere las primeras. Cambiar una pieza por otra es lo más caro: hay que diseñar, construir y probar dos.

## Reglas

- **Los cambios pasan en los puntos de quiebre**, no en anchos sueltos. Así todas las piezas cambian juntas.
- **Entre dos puntos de quiebre, todo fluye.** Nada queda con un ancho fijo que no entra.
- **Una pieza se adapta a su contenedor**, no a la ventana: una tarjeta en una columna angosta es angosta aunque la pantalla sea grande.
- **Las imágenes no se deforman**: se recortan o se achican, guardando su proporción.
- **Lo fijo deja ver el contenido.** Una barra arriba y otra abajo no pueden tapar más de un tercio de una pantalla baja.

## Al girar y al cambiar de tamaño

- Nada se pierde: lo escrito, la posición en una lista y lo seleccionado siguen ahí.
- El foco sigue en el mismo elemento.
- Si un panel deja de caber, lo que tenía pasa a estar a un toque, no se cierra.

## Ampliar

Una persona puede ampliar la página al 200 %, o el texto solo, y todo sigue funcionando:

- Al 400 % de ampliación, la página se comporta como en el ancho angosto: una columna, sin desplazarse hacia los lados.
- Los tamaños de texto van en `rem`, para seguir el ajuste de quien lee.
- Los contenedores crecen con su texto. Nada tiene un alto fijo que lo corte.

## Bordes de la pantalla

En un teléfono, lo que está fijo arriba o abajo deja libre la zona que ocupan el sistema y las esquinas: el contenido corre de borde a borde, y los controles quedan dentro del área segura.

## No hagas

- Esconder una función en el teléfono porque «ahí no se usa».
- Una versión aparte para teléfono con otro contenido.
- Texto que se achica para que entre.
- Un desplazamiento hacia los lados en toda la página. Solo una tabla o un gráfico ancho, dentro de su propio marco.
