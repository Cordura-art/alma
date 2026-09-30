---
component: Icon
tab: Accesibilidad
summary: Qué resuelve ALMA en el ícono.
---


## Qué ofrece ALMA

- Sin `label`, el ícono es decorativo: queda oculto para el lector.
- Con `label`, se anuncia con ese nombre (`role="img"`).
- Crece con el texto: probado al 200 %.

## Recomendaciones de diseño

- Si el ícono está junto a un texto que dice lo mismo, déjalo decorativo.
- Un botón de solo ícono lleva el nombre en el botón (`aria-label`), no en el ícono.

## Verificación

axe sin problemas en los cuatro temas.
