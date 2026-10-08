---
component: List
tab: Uso
summary: Una lista agrupada de filas para navegar, actuar o mostrar datos.
---


## Resumen

`List` agrupa filas sobre un fondo redondeado, con separadores que empiezan donde empieza el texto. Es la lista agrupada de Apple y la *contained list* de Carbon.

### Cuándo usarla
- Menús de ajustes y cuentas: cada fila lleva a una pantalla.
- Acciones sobre algo: cada fila hace una cosa.
- Resúmenes de datos: pares etiqueta y valor (un resumen de precios).

### Cuándo no usarla
- **Para comparar varios elementos por los mismos atributos:** `Table`.
- **Para elementos con imagen grande:** `Card`.
- **Para elegir una opción:** `RadioGroup`.

## Tipos de fila

| Fila | Propiedad | Aspecto |
|---|---|---|
| De navegación | `href` | Enlace con la flecha `chevron--right`. |
| De acción | `onClick` | Botón, sin flecha (o con `chevron`). |
| Informativa | ninguna | Texto y valor a la derecha (`trailing`). |

## Anatomía

1. **Título del grupo** (opcional).
2. **Fila**: ícono, título, subtítulo, valor y flecha.
3. **Separador**, con sangría hasta el texto.
4. **Nota al pie** (opcional).

![Dos grupos de List: uno de navegación, con íconos y flecha, y un resumen de precios con los montos a la derecha.](assets/Componentes/list-grupos.png)

## Contenido

- **Título del grupo:** lo que tienen en común las filas («Cuenta»).
- **Título de la fila:** corto, con sustantivo.
- **Subtítulo:** un dato que ayuda a elegir («2 tarjetas»).
- **Valor:** el estado o el número («Activadas», «$7.990»).
- **Nota al pie:** una aclaración breve del grupo.

## Comportamiento

- Toda la fila es el área de toque.
- Una sola acción por fila. Si una fila necesita un interruptor, pon un `Switch` en ella.

## Relacionados

`Table` · `Switch` · `Card` · `Sheet`.

## Referencias

- Apple, Human Interface Guidelines: Lists and tables.
- IBM, Carbon Design System: Contained list.

## Filas que se eligen

Hay dos maneras, y dicen cosas distintas. Es la regla de Apple.

| Manera | Cómo se ve | Para |
|---|---|---|
| **Queda marcada** | La fila elegida conserva su fondo y su título gana peso. | Navegar: una lista a la izquierda y su detalle a la derecha. La marca dice dónde estás. |
| **Lleva un visto** | Un visto al final de la fila. | Elegir entre opciones: «Ordenar por». Con `selection: 'multiple'`, varias a la vez. |

No las mezcles en la misma lista.

## Una fila con interruptor

Una preferencia que se enciende o se apaga va en una fila, con su `Switch` al final. El título de la fila es el nombre del interruptor: no hace falta otro rótulo. Es el único lugar donde va un interruptor; fuera de una lista, usa un botón que queda marcado.

## Editar una lista

Con `editing`, las filas dejan de llevar a otra parte y muestran sus controles:

- **Eliminar**, al inicio de la fila, en rojo.
- **Subir y bajar**, al final. Reordenar no depende de arrastrar.

Entra y sal de la edición con un botón a la vista: «Editar» y «Listo». Eliminar se puede deshacer: ofrece «Deshacer» en un aviso, como dice el patrón Deshacer.

![Tres listas. «Ordenar mis viajes por», con un visto en «Fecha». «Avisos», con un interruptor encendido y otro apagado al final de cada fila. Y «Destinos favoritos» en edición: cada fila con un botón rojo de eliminar al inicio y dos flechas, subir y bajar, al final.](assets/Componentes/list-elegir-editar.png)
