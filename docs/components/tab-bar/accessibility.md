---
component: TabBar
tab: Accesibilidad
summary: Qué resuelve ALMA en la barra de pestañas.
---


## Qué ofrece ALMA

### Comportamiento
- Es un `nav` nombrado «Principal» (cámbialo con `label`); cada ítem es un enlace.
- El actual lleva `aria-current="page"` y se distingue por el ícono relleno, no solo por el color.
- La insignia se anuncia con la etiqueta: «Viajes, 2 nuevos» o «Viajes, requiere atención».
- Cada ítem mide al menos 56 px de alto.
- Las etiquetas largas pasan a otra línea, cortadas con guion, en vez de salirse del ítem.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre los ítems. |
| Enter | Abre la sección. |

## Recomendaciones de diseño

- No uses el mismo ícono para dos secciones.
- Una insignia sin número («!») debe explicarse dentro de la sección.

## Consideraciones de desarrollo

- Al cambiar de sección, lleva el foco al título de la sección nueva.
- Con `fixed`, deja espacio bajo el contenido para que la barra no tape el último control.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver en iPhone y TalkBack.
