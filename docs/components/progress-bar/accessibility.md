---
component: ProgressBar
tab: Accesibilidad
summary: Qué resuelve ALMA en la barra de progreso.
---


## Qué ofrece ALMA

- La pista es `role="progressbar"`, nombrada por `label`.
- Determinada: `aria-valuemin` 0, `aria-valuemax` 100 y `aria-valuenow` con el porcentaje.
- Indeterminada: sin valor, como pide ARIA.
- `description` se lee como el valor (`aria-valuetext`): «Subiendo 3 de 12 fotos».
- Con movimiento reducido, el tramo indeterminado queda fijo.

## Recomendaciones de diseño

- El estado final (éxito o error) se dice en la descripción, no solo con el color del relleno.

## Consideraciones de desarrollo

- Actualiza el valor a un ritmo razonable (cada punto porcentual, no cada milisegundo): cada cambio puede anunciarse.
- Al terminar, anuncia el resultado en una región `role="status"`, o con un `toast`.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
