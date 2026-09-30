---
pattern: Búsqueda y filtros
summary: Cómo ayudar a encontrar: buscar, acotar y ordenar.
---

## Buscar

Usa `SearchField`:

- **El texto de ejemplo dice qué se puede buscar:** «Buscar viajes, ciudades o terminales».
- **Busca mientras se escribe** (`onChange`), sin esperar Enter, si la respuesta es rápida.
- **Sugerencias** recientes o predictivas (hasta 8) mientras escribe.
- **Alcance** (`scopes`): si se puede buscar en distintas áreas, empieza por la más amplia.
- Los resultados muestran la palabra buscada y cuántos hay: «12 viajes a Talca».

> **Imagen pendiente:** búsqueda con sugerencias abiertas y el alcance debajo.

## Filtrar

| Cantidad de filtros | Usa |
|---|---|
| Pocos y frecuentes (2 a 6) | `Tag` seleccionables, en una fila sobre los resultados |
| Un criterio con 2 o 3 valores | `SegmentedControl` |
| Muchos filtros | Un panel (`Sheet` en el teléfono) con los controles de **Formularios** |

- Los filtros aplicados se ven como `tokens` en el `SearchField` o como `Tag` que se pueden quitar.
- Ofrece «Quitar filtros» cuando hay alguno.
- Aplica al instante con pocos filtros; en un panel con muchos, con un botón «Ver 12 resultados».

## Ordenar

- En tablas, con los encabezados ordenables de `Table`.
- En listas y tarjetas, con un `PopUpButton` «Ordenar por», con la opción más útil por defecto.

## Sin resultados

Usa el estado vacío de **Estados vacíos**: di qué se buscó y sugiere cómo ampliar la búsqueda.

## Relacionados

`SearchField` · `Tag` · `SegmentedControl` · `PopUpButton` · `Table` · `Sheet`.
