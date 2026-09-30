---
component: ProgressLine
tab: Accesibilidad
summary: Qué resuelve ALMA en la línea de progreso.
---


## Qué ofrece ALMA

- Mientras carga es `role="progressbar"` con `aria-busy`; al terminar, `role="status"`. Ambos nombrados por `label`.
- Con movimiento reducido, el brillo queda fijo.

## Recomendaciones de diseño

- El resultado (aprobado o rechazado) se dice con texto en la pantalla, no solo con el verde.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
