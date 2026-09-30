---
component: Checkbox
tab: Accesibilidad
summary: Qué resuelve ALMA en la casilla.
---

## Qué ofrece ALMA

### Comportamiento
- Es un `<input type="checkbox">` nativo, visualmente oculto bajo la casilla: se anuncia como casilla con su estado.
- El estado mixto se anuncia como «mixto» (`aria-checked="mixed"` e `indeterminate`).
- La etiqueta es un `<label>`: tocar el texto también marca.
- Área de toque de 44 × 44 px alrededor de la casilla de 20 px.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Mueve el foco a la casilla siguiente. |
| Espacio | Marca o desmarca. |

## Recomendaciones de diseño

- Agrupa las casillas relacionadas bajo un título; el grupo se anuncia con ese título.
- No uses una casilla para una acción inmediata: el cambio debe esperar al envío.

### Etiquetado
Cada casilla tiene su etiqueta visible. Solo en tablas, donde la fila ya da el contexto, usa `aria-label` («Seleccionar Santiago → Rancagua»).

## Consideraciones de desarrollo

- En grupos, envuelve las casillas en `<fieldset>` con `<legend>` para anunciar el título.
- Mantén sincronizado el estado mixto del padre al cambiar las hijas.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
