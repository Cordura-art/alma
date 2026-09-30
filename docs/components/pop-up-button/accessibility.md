---
component: PopUpButton
tab: Accesibilidad
summary: Qué resuelve ALMA en el menú de opciones y cómo se usa con teclado.
---

## Qué ofrece ALMA

### Comportamiento
- El botón tiene `aria-haspopup="listbox"` y `aria-expanded`; su nombre combina la etiqueta y el valor actual.
- El menú es `role="listbox"`; cada opción es `role="option"` con `aria-selected` en la elegida y `aria-disabled` en las desactivadas.
- Al abrir, el foco entra a la opción elegida; al cerrar con Esc o al elegir, vuelve al botón.
- Un clic fuera cierra el menú.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Enter, Espacio, ↓ o ↑ (en el botón) | Abre el menú. |
| ↓ / ↑ | Recorre las opciones, saltando las desactivadas. |
| Inicio / Fin | Primera y última opción. |
| Enter o Espacio | Elige y cierra. |
| Esc | Cierra sin cambiar y devuelve el foco al botón. |
| Tab | Cierra el menú. |

## Recomendaciones de diseño

- Pon siempre la etiqueta: sin ella, el botón solo dice el valor y no qué se elige.
- La opción elegida se marca con check, no solo con color.

## Consideraciones de desarrollo

- No uses un `<select>` nativo al lado de este componente: mezclar los dos confunde el comportamiento.
- Si una opción cambia la vista, anuncia el cambio (por ejemplo, el nuevo orden de la lista).

## Verificación

axe sin problemas en los cuatro temas con el menú abierto; teclado probado. Pendiente: VoiceOver y NVDA.
