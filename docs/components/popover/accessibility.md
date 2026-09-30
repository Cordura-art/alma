---
component: Popover
tab: Accesibilidad
summary: Qué resuelve ALMA en el popover.
---


## Qué ofrece ALMA

### Comportamiento
- El panel es `role="dialog"` (no modal), nombrado por su título o por `aria-label`.
- El botón recibe `aria-haspopup="dialog"`, `aria-expanded` y `aria-controls`: el lector anuncia que abre un diálogo y si está abierto.
- Al abrir, el foco entra al primer control del panel o, si no hay, al panel.
- Esc y «Cerrar» cierran y devuelven el foco al botón.
- No atrapa el foco: Tab puede salir del panel.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Enter o Espacio (en el botón) | Abre o cierra. |
| Tab / Mayús+Tab | Recorre el panel y sigue por la página. |
| Esc | Cierra y vuelve al botón. |

## Recomendaciones de diseño

- El botón de un popover de información necesita un nombre que diga qué explica («Qué es la tasa de embarque»), no solo «Información».
- Lo esencial no va solo en un popover: debe poder encontrarse en la página.

## Consideraciones de desarrollo

- Al salir con Tab el panel sigue abierto hasta un clic fuera o Esc; si molesta, ciérralo con `onOpenChange` al perder el foco.
- Cerca del borde derecho, usa `align: 'end'` para que el panel no salga de la pantalla.

## Verificación

axe sin problemas en los cuatro temas; teclado y retorno del foco probados. Pendiente: VoiceOver y NVDA.
