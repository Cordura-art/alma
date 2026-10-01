---
component: SegmentedControl
tab: Accesibilidad
summary: Qué resuelve ALMA en el selector segmentado.
---


## Qué ofrece ALMA

### Comportamiento
- Es un grupo de radios (`role="radiogroup"`) nombrado por `label`; cada opción es `role="radio"` con `aria-checked`.
- Una sola parada de Tab: la opción elegida. Las flechas eligen y mueven el foco, como un grupo de radios nativo.
- El control mide 44 px de alto y el área de toque de cada segmento ocupa todo ese alto.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Entra a la opción elegida y sale del grupo. |
| → / ↓ | Elige la opción siguiente, en círculo. |
| ← / ↑ | Elige la opción anterior, en círculo. |
| Inicio / Fin | Elige la primera o la última. |

## Recomendaciones de diseño

- Dale siempre un `label` que diga qué se elige.
- No dependas del color para mostrar la opción elegida: la pieza y el peso del texto ya la marcan.

## Consideraciones de desarrollo

- Como las flechas cambian la opción al instante, la vista debe responder rápido. Si tarda, muestra un estado de carga dentro.

## Verificación

axe sin problemas en los cuatro temas; teclado probado. Pendiente: VoiceOver y NVDA.
