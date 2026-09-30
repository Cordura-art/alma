---
component: SearchField
tab: Accesibilidad
summary: Qué resuelve ALMA en el campo de búsqueda.
---


## Qué ofrece ALMA

### Comportamiento
- Es una región de búsqueda con un `combobox` y su lista de sugerencias.
- El campo se nombra con `label`.
- Borrar se llama «Borrar búsqueda» y cada token tiene su botón «Quitar filtro …».
- Sin `label`, el campo toma como nombre el texto de ejemplo.
- Borrar y quitar token tienen un área de toque de 44 px.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| ↓ / ↑ | Recorren las sugerencias. |
| Enter | Busca, o elige la sugerencia marcada. |
| Esc | Cierra las sugerencias; si ya están cerradas, borra el texto. |
| Retroceso (campo vacío) | Quita el último token. |

## Recomendaciones de diseño

- Dale siempre un `label`, aunque el texto de ejemplo diga lo mismo: el texto de ejemplo desaparece al escribir.
- Si hay dos buscadores en la página, dale a cada uno un nombre distinto.

## Consideraciones de desarrollo

- Anuncia la cantidad de resultados en una región `role="status"` («12 viajes»).

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
