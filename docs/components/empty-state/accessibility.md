---
component: EmptyState
tab: Accesibilidad
summary: Qué resuelve ALMA en el estado vacío.
---


## Qué ofrece ALMA

- El título es un encabezado (`h2` por defecto).
- El ícono es decorativo.
- Las acciones son botones.

## Recomendaciones de diseño

- El título solo debe bastar para entender la situación.

## Consideraciones de desarrollo

- Si el estado vacío aparece después de una búsqueda, anuncia el resultado («Sin resultados») en una región `role="status"`.
- Ajusta `headingLevel` a la jerarquía de la página.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
