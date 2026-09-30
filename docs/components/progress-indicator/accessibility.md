---
component: ProgressIndicator
tab: Accesibilidad
summary: Qué resuelve ALMA en el indicador de pasos.
---


## Qué ofrece ALMA

- Es una lista ordenada (`ol`) nombrada por `label`: el lector dice cuántos pasos hay.
- Cada paso dice su estado en texto oculto («Asientos, completado»); el color no es la única pista.
- El paso actual lleva `aria-current="step"`.
- Con `onSelect`, los completados son botones; los pendientes no son interactivos.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre los pasos completados. |
| Enter o Espacio | Vuelve a ese paso. |

## Recomendaciones de diseño

- Cada paso lleva también su título en la pantalla, para quien no mira el indicador.

## Consideraciones de desarrollo

- Al cambiar de paso, lleva el foco al título del paso nuevo.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
