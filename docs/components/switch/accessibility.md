---
component: Switch
tab: Accesibilidad
summary: Qué resuelve ALMA en el interruptor.
---

## Qué ofrece ALMA

### Comportamiento
- Es un `<button role="switch">` con `aria-checked`: se anuncia como interruptor, encendido o apagado.
- La etiqueta es un `<label>` unido al botón: se anuncia al enfocar y tocarla alterna.
- La descripción forma parte de la etiqueta.
- Área de toque de 44 × 44 px.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Mueve el foco al interruptor. |
| Espacio o Enter | Alterna. |

## Recomendaciones de diseño

- Etiqueta en positivo, para que «encendido» signifique lo que dice.
- Si el cambio falla, avisa con texto y vuelve al estado anterior.

### Etiquetado
Sin etiqueta visible (por ejemplo, en una tabla), usa `aria-label` con el ajuste.

## Consideraciones de desarrollo

- No uses un interruptor dentro de un formulario que se envía después: el estado debe aplicarse al instante.
- Anuncia el resultado de cambios lentos con una región de estado o un aviso.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
