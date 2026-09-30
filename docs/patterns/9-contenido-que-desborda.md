---
pattern: Contenido que desborda
summary: Qué hacer cuando el texto o los datos no caben.
---

## Texto que no cabe

| Dónde | Qué hacer |
|---|---|
| Etiquetas de botones y pestañas | Acorta el texto; no las cortes con puntos suspensivos. |
| Destinos de `Sidebar` | Se cortan con puntos suspensivos; usa etiquetas cortas. |
| Celdas de `Table` | `maxChars` recorta en el medio (conserva principio y final); el texto completo aparece al pasar el cursor. |
| Títulos de página | Pasan a otra línea, equilibrados. Nunca se cortan. |
| Texto de lectura | Pasa a otra línea; ancho máximo de 48 rem. |

Truncar esconde información: úsalo solo donde el texto completo está a un paso (el detalle, el tooltip).

> **Imagen pendiente:** una celda recortada en el medio con su texto completo al pasar el cursor.

## Muchos elementos

| Situación | Qué hacer |
|---|---|
| Muchas pestañas | Más de 6: elige la vista con un `PopUpButton`. |
| Una ruta larga | `Breadcrumb` pliega los niveles del medio en «…». |
| Muchas acciones | Las frecuentes a la vista; el resto en «Más». |
| Muchas filas | `Pagination` debajo de la tabla. |
| Una tabla ancha | Se desplaza hacia el lado dentro de su contenedor; la página no. |

## Texto agrandado

El texto de ALMA crece con la preferencia de la persona (probado al 200 %). Diseña para eso:
- Deja que los contenedores crezcan en alto; no fijes altos con texto dentro.
- Evita anchos fijos en px para lo que tiene texto; usa `rem`.
- La página nunca se desplaza hacia el lado: solo las tablas y los bloques de código, dentro de su caja.

## Relacionados

`Table` · `Breadcrumb` · `Tabs` · `Pagination` · Tipografía.
