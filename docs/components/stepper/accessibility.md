---
component: Stepper
tab: Accesibilidad
summary: Qué resuelve ALMA en el contador.
---


## Qué ofrece ALMA

- Es un grupo (`role="group"`) nombrado por `label`.
- Los botones se llaman «Restar» y «Sumar».
- El valor es una región `aria-live="polite"`: al cambiar, el lector dice el número nuevo.
- En los límites, el botón se desactiva.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre Restar y Sumar. |
| Enter o Espacio | Resta o suma uno. |

## Recomendaciones de diseño

- Pon una etiqueta visible junto al contador: el ícono solo no basta.

## Consideraciones de desarrollo

- Si Sumar se desactiva con el foco encima, el foco se pierde: considera llevarlo a Restar.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
