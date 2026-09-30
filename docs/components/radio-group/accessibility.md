---
component: RadioGroup
tab: Accesibilidad
summary: Qué resuelve ALMA en el grupo de opciones.
---

## Qué ofrece ALMA

### Comportamiento
- Es un `<fieldset>` con `<legend>` y radios nativos con el mismo `name`: el lector anuncia el título del grupo, la opción, su posición («2 de 3») y si está elegida.
- La etiqueta de cada opción es un `<label>`: tocar el texto elige.
- Área de toque de 44 px por opción.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Entra al grupo (a la opción elegida) y sale de él. |
| ↓ / → | Elige la opción siguiente. |
| ↑ / ← | Elige la opción anterior. |
| Espacio | Elige la opción con foco, si ninguna está elegida. |

## Recomendaciones de diseño

- El título es obligatorio: sin él, las opciones no dicen a qué responden.
- El estado elegido se ve por la forma (el punto), no solo por el color.

## Consideraciones de desarrollo

- No cambies el comportamiento de las flechas: el grupo nativo ya lo resuelve.
- Si el grupo es obligatorio, anúncialo en el título y valida al enviar.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
