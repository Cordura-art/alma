---
component: ToastRegion
tab: Accesibilidad
summary: Qué resuelve ALMA en los toasts.
---


## Qué ofrece ALMA

### Comportamiento
- La región es `aria-live="polite"`, y cada toast lleva el rol de su estado: `alert` en error y advertencia, `status` en éxito e información. El lector los anuncia al aparecer.
- Éxito e información se cierran a los 5 segundos, pero la cuenta se pausa mientras el cursor o el foco están encima (WCAG 2.2.1, tiempo ajustable).
- Error y advertencia no se cierran solos.
- Todos tienen «Cerrar notificación».

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega a la acción y a «Cerrar» del toast (está al final del documento). |
| Enter o Espacio | Activa el botón con foco. |

## Recomendaciones de diseño

- Como puede desaparecer antes de que alguien lo lea, lo que informa un toast debe poder consultarse en otra parte.
- Una acción en un toast debe tener otro camino en la interfaz: a quien navega con teclado le cuesta llegar a él.

## Consideraciones de desarrollo

- Monta una sola `ToastRegion`: dos regiones anuncian dos veces.
- No muevas el foco al toast; la persona sigue donde estaba.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA, en especial el anuncio de toasts seguidos.
