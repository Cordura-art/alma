---
component: InlineNotification
tab: Accesibilidad
summary: Qué resuelve ALMA en la notificación en línea.
---


## Qué ofrece ALMA

### Comportamiento
- Error y advertencia usan `role="alert"`: el lector los anuncia en cuanto aparecen.
- Éxito e información usan `role="status"`: se anuncian sin interrumpir.
- El ícono lleva el nombre del estado («Error», «Advertencia», «Éxito», «Información»), así el estado no depende del color.
- «Cerrar» se llama «Cerrar notificación».

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega a la acción y a «Cerrar». |
| Enter o Espacio | Activa el botón con foco. |

## Recomendaciones de diseño

- No uses el rol de alerta para mensajes que no son urgentes: interrumpe al lector.
- Si la notificación aparece por una acción, ponla cerca de donde ocurrió.

## Consideraciones de desarrollo

- Las regiones `alert` y `status` solo se anuncian si el contenido **aparece** después de cargar la página. Una notificación que ya estaba al cargar se lee en orden normal.
- Al cerrar una notificación, mueve el foco a un lugar lógico (el control que la causó) si estaba sobre «Cerrar».

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
