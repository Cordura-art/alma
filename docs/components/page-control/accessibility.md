---
component: PageControl
tab: Accesibilidad
summary: Qué resuelve ALMA en el control de páginas.
---


## Qué ofrece ALMA

- Es un grupo nombrado por `label`.
- Cada punto es un botón llamado «Página 3 de 5»; el actual lleva `aria-current`.
- Área de toque de 44 px de alto.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre los puntos. |
| Enter o Espacio | Va a esa página. |
| ← / → | Página anterior o siguiente. |

## Recomendaciones de diseño

- El carrusel también debe poder moverse sin los puntos.

## Consideraciones de desarrollo

- Anuncia el cambio de página si el contenido cambia sin mover el foco.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
