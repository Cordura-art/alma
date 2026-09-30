# Table

Tabla de filas y columnas para leer, ordenar y seleccionar datos. Sigue la guía *Lists and tables* de Apple y la tabla de datos de IBM Carbon.

## Contenido (Apple)
- Texto breve en cada celda, para leer de un vistazo. Si una fila tiene mucho texto, muestra solo el título y abre el detalle en otra vista.
- Encabezados con sustantivo o frase nominal corta, con mayúscula solo al inicio y sin punto final.
- Si el texto no cabe, usa `maxChars`: el recorte va en el medio para conservar el principio y el final. El texto completo queda en el tooltip nativo.
- Para colecciones con imágenes o elementos de tamaños muy distintos, usa una cuadrícula, no una tabla.

## Selección y navegación
- `headingLevel`: nivel del título (`title`), 3 por defecto; ajústalo a la jerarquía de la página.
- `selectable`: casillas en cada fila y en el encabezado (con estado mixto).
- `onRowClick`: la fila lleva a su detalle. La primera celda es un botón para el teclado y la fila actual (`activeRow`) queda resaltada en `selected-ui` para mostrar el camino.

## Orden
Las columnas `sortable` alternan ascendente → descendente → sin orden y anuncian `aria-sort`. Los números se alinean a la derecha (`align: 'end'`) con cifras tabulares.

## Tamaño y paginación
- Filas de 56 px, o de 44 con `dense`. El encabezado queda fijo al hacer scroll.
- Pon `Pagination` en `footer`: queda pegada debajo, sin espacio entre ambas (Carbon).
