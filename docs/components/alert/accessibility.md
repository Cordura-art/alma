---
component: Alert
tab: Accesibilidad
summary: Qué resuelve ALMA en la alerta.
---


## Qué ofrece ALMA

### Comportamiento
- `role="alertdialog"` con `aria-modal="true"`: el lector la anuncia como alerta, con el título (`aria-labelledby`) y el mensaje (`aria-describedby`).
- Al abrir, el foco va a la opción por defecto, o a «Cancelar» si no hay ninguna.
- El foco queda atrapado: Tab y Mayús+Tab recorren solo los botones y el campo.
- Al cerrar, el foco vuelve a donde estaba.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab / Mayús+Tab | Recorre los controles, en círculo. |
| Enter o Espacio | Activa el botón con foco. |
| Esc | Equivale a «Cancelar». |

## Recomendaciones de diseño

- El rojo del botón destructivo acompaña a la palabra, nunca la reemplaza: el verbo dice qué pasa.
- Nada de información esencial solo en el color o en un ícono.

## Consideraciones de desarrollo

- `inline` quita el velo y `aria-modal`: es para mostrar la alerta en la documentación, no para producto.
- Si la acción tarda, cierra la alerta y muestra el progreso en la página; una alerta no lleva indicadores de carga.

## Verificación

axe sin problemas en los cuatro temas; foco, orden y teclado probados. Pendiente: VoiceOver y NVDA.
