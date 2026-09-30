---
component: ActivityIndicator
tab: Accesibilidad
summary: Qué resuelve ALMA en el indicador de actividad.
---


## Qué ofrece ALMA

- Es una región `role="status"` con el texto de `label` oculto a la vista: el lector lo anuncia al aparecer, sin interrumpir.
- No recibe foco.
- Con movimiento reducido, deja de girar pero sigue visible.

## Recomendaciones de diseño

- Un `label` que diga qué está pasando.
- Si la espera es larga, un texto visible, para quien no usa lector.

## Consideraciones de desarrollo

- Quita el indicador cuando termine: si queda en la página, el lector lo seguirá encontrando.
- Marca la zona que carga como ocupada (`aria-busy`) si el contenido cambia al terminar.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
