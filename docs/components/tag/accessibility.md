---
component: Tag
tab: Accesibilidad
summary: Qué resuelve ALMA en la etiqueta.
---


## Qué ofrece ALMA

### Comportamiento
- La de solo lectura es texto.
- Quitar es un botón llamado «Quitar» más el texto de la etiqueta.
- La seleccionable es un botón con `aria-pressed`: el lector dice si está activada.
- La elegida se distingue por el check, el borde y el peso del texto, no solo por el color.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega a Quitar o a la seleccionable. |
| Enter o Espacio | Quita, o activa y desactiva. |

## Recomendaciones de diseño

- Agrupa las seleccionables en un `role="group"` con `aria-label` («Filtros»).
- No confíes en el color para dar significado.

## Consideraciones de desarrollo

- Al quitar una etiqueta con el teclado, lleva el foco a la siguiente, o al campo si era la última.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
