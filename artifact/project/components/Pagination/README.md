# Pagination

Divide un conjunto grande de datos en páginas, con el tamaño de página, el rango visible y controles de anterior y siguiente (la paginación de IBM Carbon).

## Cuándo usarlo
- Cuando cargar todo tomaría mucho tiempo, o cuando hay demasiados datos para una vista.
- **No** la uses para flujos lineales, como un formulario por pasos: ahí van `ProgressBar` y botones.
- Para carruseles de pocas páginas, usa `PageControl`.

## Anatomía
1. Elementos por página (`PopUpButton`).
2. Rango: «21–40 de 1.284 movimientos».
3. Página actual de total: «Página 2 de 65».
4. Anterior y siguiente, botones de solo ícono de 44 px, deshabilitados en los extremos.

## Ubicación
Pegada debajo de la tabla, sin espacio entre ambas: pásala en `Table.footer`. El rango se anuncia al cambiar de página.
