---
component: SearchField
tab: Uso
summary: Un campo de búsqueda con sugerencias, alcance y filtros.
---


## Resumen

`SearchField` busca mientras se escribe, sugiere búsquedas y puede acotar por categoría o por filtros. Es el *search field* de Apple.

### Cuándo usarlo
- Para encontrar algo en un conjunto grande: viajes, ciudades, movimientos.
- En la `Toolbar` de una vista, o arriba de una lista o una tabla.

### Cuándo no usarlo
- **Para elegir una opción de una lista conocida:** `Combobox`.
- **Para pocos elementos a la vista:** no hace falta buscar.

## Anatomía

1. **Lupa.**
2. **Campo** con texto de ejemplo.
3. **Tokens** de filtro (opcionales).
4. **Borrar** (aparece al escribir).
5. **Sugerencias**, con título opcional.
6. **Alcance** (opcional): un `SegmentedControl` debajo.

![Anatomía de SearchField con dos tokens, las sugerencias abiertas y el alcance. Numerados: lupa (1), campo (2), tokens (3), borrar (4), sugerencias (5) y alcance (6).](assets/Componentes/search-field-anatomia.png)

## Contenido

- **Texto de ejemplo:** dice **qué** se puede buscar: «Buscar ciudades o terminales», no solo «Buscar».
- **Sugerencias:** búsquedas recientes antes de escribir; predictivas mientras se escribe. Hasta 8.
- **Alcance:** categorías claras, la más amplia primero («Todo»).
- **Tokens:** filtros que se editan como una unidad. Combínalos con sugerencias para que se descubran.

## Comportamiento

- `onChange` se llama en cada tecla: busca mientras se escribe.
- `onSubmit` se llama con Enter o al elegir una sugerencia.
- Borrar vacía el campo; Retroceso con el campo vacío quita el último token.
- Los resultados más relevantes van primero y, si ayuda, agrupados por categoría (ver el patrón **Búsqueda y filtros**).

## Relacionados

`Toolbar` · `Combobox` · `Tag` · `SegmentedControl` · Búsqueda y filtros.

## Referencias

- Apple, Human Interface Guidelines: Search fields; Token fields.
- IBM, Carbon Design System: Search.
