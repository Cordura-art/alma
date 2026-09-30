---
component: EmptyState
tab: Uso
summary: Lo que se ve cuando una lista, una búsqueda o una sección no tiene contenido.
---


## Resumen

`EmptyState` ocupa el lugar del contenido que no hay: dice qué falta, por qué y qué hacer. Sigue la guía de contenido de ALMA; los casos están en el patrón **Estados vacíos**.

### Cuándo usarlo
- Primera vez, sin resultados, sin permiso o sin conexión.

### Cuándo no usarlo
- **Mientras carga:** `Skeleton` o `ActivityIndicator`.
- **Una tabla vacía:** `emptyText` de `Table`.

## Anatomía

1. **Ícono** (opcional), 32 px.
2. **Título:** qué falta.
3. **Mensaje:** por qué, o qué se verá aquí.
4. **Acción principal** y, si hace falta, una **secundaria**.

![EmptyState «Aún no tienes viajes», con su mensaje y la acción «Buscar pasajes».](assets/Componentes/empty-state-viajes.png)

## Contenido

- **Título** en positivo si se puede: «Aún no tienes viajes».
- **Mensaje:** una oración.
- **Acción:** la única que lo resuelve: «Buscar pasajes».
- Sin ilustraciones decorativas; un ícono a lo sumo.

## Relacionados

`Table` · `SearchField` · Estados vacíos.
