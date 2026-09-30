---
component: Table
tab: Uso
summary: Una tabla de filas y columnas para leer, ordenar y seleccionar datos.
---


## Resumen

`Table` presenta datos del mismo tipo en filas y columnas, para compararlos, ordenarlos y elegir algunos. Sigue *Lists and tables* de Apple y la tabla de datos de Carbon.

### Cuándo usarla
- Para comparar varios elementos por los mismos atributos (viajes por fecha, asiento y precio).
- Cuando la persona necesita ordenar, seleccionar varios o ir al detalle de uno.

### Cuándo no usarla
- **Para una lista simple de destinos o ajustes:** `List`.
- **Para elementos con imagen o de tamaños muy distintos:** una cuadrícula de `Card` o `ProductCard`.
- **Para mostrar un solo elemento:** una lista de pares etiqueta y valor.

## Anatomía

1. **Título** y **descripción** (opcionales).
2. **Encabezado**: nombres de columna; algunos ordenan.
3. **Fila**, con una casilla si se puede seleccionar.
4. **Celda.**
5. **Pie**: normalmente una `Pagination`, pegada debajo.

> **Imagen pendiente:** anatomía numerada con selección, orden y paginación.

## Funciones

| Función | Propiedad | Qué hace |
|---|---|---|
| Ordenar | `sortable` en la columna | Un clic en el encabezado alterna ascendente → descendente → sin orden. |
| Seleccionar | `selectable` | Casilla en cada fila y una en el encabezado que marca todas (mixta si hay algunas). |
| Abrir el detalle | `onRowClick` | La fila entera abre su detalle; la fila actual (`activeRow`) queda marcada. |
| Recortar texto | `maxChars` en la columna | Recorta en el medio para conservar el principio y el final; el texto completo aparece al pasar el cursor. |
| Paginar | `footer` | Una `Pagination` pegada debajo. |

## Contenido

- **Encabezados:** sustantivo o frase nominal corta, con mayúscula solo al inicio y sin punto final.
- **Celdas:** texto breve para leer de un vistazo. Si una fila tiene mucho texto, muestra solo el título y abre el detalle.
- **Números:** alineados a la derecha (`align: 'end'`), con cifras del mismo ancho.
- **Tabla vacía:** `emptyText` dice por qué y qué hacer («Todavía no compras pasajes»).

## Densidad

| Filas | Alto | Uso |
|---|---|---|
| Normal | 56 px | Por defecto. |
| `dense` | 44 px | Muchas filas que comparar. |

El encabezado mide 44 px y queda fijo al desplazar la tabla.

## Relacionados

`List` · `Pagination` · `Checkbox` · `Skeleton`.

## Referencias

- Apple, Human Interface Guidelines: Lists and tables.
- IBM, Carbon Design System: Data table.
