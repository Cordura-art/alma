---
component: Table
tab: Accesibilidad
summary: Qué resuelve ALMA en la tabla.
---


## Qué ofrece ALMA

### Comportamiento
- Es una `<table>` real, con encabezados `scope="col"`: el lector anuncia la columna de cada celda.
- Las columnas ordenables son botones y anuncian su orden con `aria-sort` (ascendente, descendente o ninguno).
- Las casillas se llaman «Seleccionar» más el valor de la primera columna («Seleccionar Santiago → Rancagua»); la del encabezado queda mixta si hay algunas marcadas.
- Con `onRowClick`, la primera celda es un botón: la fila se abre con el teclado, no solo con el clic.
- El texto recortado conserva el completo en su tooltip nativo.
- La zona que se desplaza hacia el lado recibe foco, para moverla con las flechas.
- Con `loading`, la tabla queda marcada como ocupada (`aria-busy`).

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre los encabezados ordenables, las casillas y los botones de fila. |
| Enter o Espacio (en un encabezado) | Cambia el orden. |
| Espacio (en una casilla) | Marca o desmarca la fila. |
| Enter (en la primera celda) | Abre el detalle. |
| ← / → (en la zona desplazable) | Desplaza la tabla hacia el lado. |

## Recomendaciones de diseño

- Dale un nombre a toda tabla: `title` o, si no hay título visible, `caption`.
- La fila seleccionada se distingue por la casilla, no solo por el fondo.

## Consideraciones de desarrollo

- Usa `rowKey` con un id estable: la selección y la fila actual dependen de él.
- Si ordenas en el servidor, usa `onSortChange` y pasa las filas ya ordenadas.

## Verificación

axe sin problemas en los cuatro temas; orden, selección y teclado probados. Pendiente: VoiceOver y NVDA.
