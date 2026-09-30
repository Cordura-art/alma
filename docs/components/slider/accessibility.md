---
component: Slider
tab: Accesibilidad
summary: Qué resuelve ALMA en el deslizador.
---


## Qué ofrece ALMA

- Es un control nativo de rango (`<input type="range">`), nombrado por `label`.
- `format` se usa también para el lector (`aria-valuetext`): oye «$12.000», no «12000».
- El campo del valor exacto permite escribirlo, sin arrastrar.
- El área de toque mide 44 px de alto.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| ← / ↓ | Baja un paso. |
| → / ↑ | Sube un paso. |
| Re Pág / Av Pág | Sube o baja pasos más grandes. |
| Inicio / Fin | Mínimo y máximo. |

## Recomendaciones de diseño

- Arrastrar es difícil para muchas personas: agrega el campo cuando el valor importa.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
