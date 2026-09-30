---
component: Skeleton
tab: Accesibilidad
summary: Qué resuelve ALMA en el esqueleto de carga.
---


## Qué ofrece ALMA

- Cada `Skeleton` es `role="status"` con `aria-busy="true"` y su `label` oculto a la vista: el lector dice «Cargando tus viajes».
- Los huesos están ocultos para el lector.
- Con movimiento reducido, el brillo queda fijo.

## Recomendaciones de diseño

- Un solo `label` por zona que carga. Si hay muchos esqueletos juntos, que solo uno lleve un `label` claro.

## Consideraciones de desarrollo

- Al llegar el contenido, reemplaza el esqueleto: no lo dejes oculto en la página.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
