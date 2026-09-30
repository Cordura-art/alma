---
component: Modal
tab: Accesibilidad
summary: Qué resuelve ALMA en el diálogo modal.
---


## Qué ofrece ALMA

### Comportamiento
- `role="dialog"` con `aria-modal="true"`, nombrado por el título (`aria-labelledby`) y descrito por `description` (`aria-describedby`).
- Al abrir, el foco entra al primer campo o al diálogo; al cerrar, vuelve al elemento que lo abrió.
- El foco queda atrapado: Tab y Mayús+Tab recorren solo el diálogo.
- La página de fondo no hace scroll mientras está abierto.
- La cabecera y el pie son contenedores, no regiones de página: el lector no los anuncia como la cabecera o el pie del sitio.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab / Mayús+Tab | Recorre los controles del diálogo, en círculo. |
| Esc | Cierra (salvo con `dismissible: false`). |
| Enter o Espacio | Activa el botón con foco. |

## Recomendaciones de diseño

- El título dice la tarea; el lector lo anuncia al abrir.
- No abras un modal sin que la persona lo pida.
- Un solo modal a la vez.

## Consideraciones de desarrollo

- Si el diálogo no tiene campos, el foco va al diálogo: el lector lee el título y la descripción.
- Para una acción que tarda, usa `loading`: el botón queda ocupado y se anuncia.
- No quites el velo ni el bloqueo de scroll: el resto de la página debe quedar inerte.

## Verificación

axe sin problemas con el diálogo abierto, en los cuatro temas; foco y teclado probados. Pendiente: VoiceOver y NVDA.
