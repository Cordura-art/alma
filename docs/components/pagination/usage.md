---
component: Pagination
tab: Uso
summary: Divide un conjunto grande de datos en páginas.
---


## Resumen

`Pagination` parte un conjunto grande en páginas y dice qué parte se está viendo. Sigue la paginación de Carbon.

### Cuándo usarla
- Cuando cargar todo tomaría mucho tiempo, o hay demasiados datos para una vista.
- Debajo de una `Table` o de una lista larga.

### Cuándo no usarla
- **Para un flujo por pasos:** `ProgressIndicator` y botones.
- **Para un carrusel de pocas páginas:** `PageControl`.
- **Si todo cabe en una página:** no la muestres.

## Anatomía

1. **Elementos por página** (`PopUpButton`).
2. **Rango**: «21–40 de 1.284 movimientos».
3. **Página actual de total**: «Página 2 de 65».
4. **Anterior** y **siguiente**, desactivados en los extremos.

> **Imagen pendiente:** anatomía numerada, pegada bajo una tabla.

## Contenido

- `itemLabel`: el sustantivo en plural de lo que se cuenta («viajes», «movimientos»).
- Tamaños de página útiles, de menor a mayor; por defecto 10, 20 y 50.
- Los números usan el formato de Chile («1.284»).

## Comportamiento

- Cambiar el tamaño de página vuelve a la primera página.
- Anterior y siguiente se desactivan en la primera y en la última página.
- El rango se actualiza y se anuncia al cambiar de página.
- En pantallas angostas, los controles pasan a una segunda línea.

## Ubicación

Pegada debajo de la tabla, sin espacio entre ambas: pásala en `Table.footer`.

## Relacionados

`Table` · `PageControl` · `PopUpButton`.

## Referencias

- IBM, Carbon Design System: Pagination.
