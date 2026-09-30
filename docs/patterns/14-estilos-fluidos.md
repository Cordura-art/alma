---
pattern: Campos fluidos
summary: Cómo se comportan los campos de ALMA en formularios densos y en grillas.
---

## Qué son

En Carbon, los campos «fluidos» llevan la etiqueta dentro del campo y se pegan unos a otros para formularios densos. En ALMA, **todos los campos ya llevan la etiqueta dentro**: `TextInput`, `Textarea`, `DatePicker` y `TimePicker` son píldoras con la etiqueta flotante. No hay una variante aparte.

## Cómo funciona la etiqueta

| Estado | Etiqueta |
|---|---|
| Vacío y sin foco | Dentro del campo, en el lugar del texto. |
| Con foco o con texto | Sube al borde superior, sobre un fondo propio (`field-label-float-bg`). |
| Con error | Sube y cambia a `field-label-float-error`. |

El texto de ejemplo solo se ve con el campo enfocado: nunca compite con la etiqueta.

> **Imagen pendiente:** un campo vacío, enfocado y con texto, con la etiqueta en cada posición.

## En grillas

- **Una columna por defecto.** Pon campos en fila solo si forman un dato (fecha y hora de un viaje; día, mes y año).
- **Separación:** `space-16` entre campos y `space-24` entre grupos, también en fila.
- **Mismo alto:** todos los campos miden 56 px (40 px en densidad compacta), así las filas se alinean.
- **Ancho según el dato:** el ancho sugiere el largo de lo que se escribe.

## Formularios densos

En herramientas de trabajo de escritorio, usa la densidad compacta (`data-density="compact"`): los campos bajan a 40 px y el resto no cambia. No existe una variante de campos pegados sin separación.

## Relacionados

`TextInput` · `DatePicker` · Formularios · Espaciado y grilla.
