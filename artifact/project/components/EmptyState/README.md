# EmptyState

Lo que se ve cuando una lista, búsqueda o sección no tiene contenido. Sigue la guía de contenido de ALMA.

## Qué aporta quien lo usa
- `title`: qué falta, en positivo si se puede («Aún no tienes viajes»).
- `message`: por qué, o qué verás aquí cuando haya algo.
- `action`: la única acción principal que lo resuelve (`{ label, icon, onClick }`); `secondaryAction` opcional.
- `icon`: un ícono de 32 px en `empty-state-icon`. Sin ilustraciones decorativas.
- `headingLevel`: 2 por defecto.

## Casos
Primera vez (invita a empezar), sin resultados (sugiere cambiar la búsqueda o los filtros) y sin permiso o sin conexión (dice cómo recuperarlo).
