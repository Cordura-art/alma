---
component: Accordion
tab: Accesibilidad
summary: Qué resuelve ALMA en el acordeón.
---


## Qué ofrece ALMA

- Cada título es un encabezado (`headingLevel`) con un botón dentro, con `aria-expanded` y `aria-controls`.
- Cada contenido es una región nombrada por su título; cerrado, queda oculto también para el lector.
- La flecha es decorativa.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre los títulos y el contenido abierto. |
| Enter o Espacio | Abre o cierra. |
| ↓ / ↑ | Pasa al título siguiente o anterior, en círculo. |
| Inicio / Fin | Primer y último título. |

## Recomendaciones de diseño

- Ajusta `headingLevel` a la jerarquía de la página.

## Verificación

axe sin problemas en los cuatro temas; teclado probado. Pendiente: VoiceOver y NVDA.
