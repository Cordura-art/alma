---
component: PullDownButton
tab: Accesibilidad
summary: Qué resuelve ALMA en el botón de acciones.
---


## Qué ofrece ALMA

### Comportamiento
- El botón tiene `aria-haspopup="menu"` y `aria-expanded`.
- El menú es `role="menu"` y cada acción `role="menuitem"`; las desactivadas, `aria-disabled`.
- Al abrir, el foco entra a la primera acción; al cerrar, vuelve al botón.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Enter, Espacio o ↓ (en el botón) | Abre el menú. |
| ↓ / ↑ | Recorren las acciones, en círculo, saltando las desactivadas. |
| Inicio / Fin | Primera y última acción. |
| Enter o Espacio | Ejecuta la acción. |
| Esc o Tab | Cierra el menú. |

## Recomendaciones de diseño

- Un botón de solo ícono necesita un nombre que diga de qué son las acciones («Más acciones de la tarjeta»), no solo «Más».
- La acción destructiva se reconoce por su verbo, no solo por el rojo.

## Verificación

axe sin problemas con el menú abierto, en los cuatro temas. Pendiente: VoiceOver y NVDA.
