---
element: Accesibilidad
order: 1
tab: Resumen
summary: El piso de ALMA es WCAG 2.2 AA en los cuatro temas, con foco visible, teclado y movimiento reducido.
---

## El piso

Todo lo que se hace con ALMA cumple **WCAG 2.2 nivel AA** en los cuatro temas, y además:

- **Foco visible** en todo control, con el token `focus`.
- **Teclado completo:** todo lo que se hace con el mouse se hace con el teclado.
- **Movimiento reducido:** si la persona lo pide, ALMA no anima nada.
- **Área de toque de 44 px** (el mínimo de Apple), por encima de los 24 px de WCAG 2.2.
- **Texto escalable al 200 %** sin que nada se recorte.
- Temas de **alto contraste** con texto a 7:1.

## Qué resuelve ALMA y qué resuelves tú

| ALMA resuelve | Tú resuelves |
|---|---|
| Roles, estados y nombres de cada componente (patrones WAI-ARIA). | Que cada campo, botón de ícono y tabla tenga su nombre. |
| El teclado dentro de cada componente. | El orden de la página y a dónde va el foco al cambiar de vista. |
| El contraste de sus colores en los cuatro temas. | No inventar colores y no poner texto sobre imágenes sin velo. |
| El foco atrapado y devuelto en modales. | No abrir diálogos sin que la persona lo pida. |
| El movimiento reducido en todos sus componentes. | Respetarlo en tus propias animaciones. |

## Cómo se verifica

- **axe** en cada componente, en los cuatro temas, y en cada página del sitio de documentación.
- **Contraste:** `npm test` revisa 580 pares de color en los cuatro temas.
- **Teclado:** probado a mano en cada componente.
- **Pendiente:** pruebas con VoiceOver, NVDA y TalkBack reales. Hasta entonces, cada guía dice solo lo que se verificó.
