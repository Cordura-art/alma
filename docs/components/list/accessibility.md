---
component: List
tab: Accesibilidad
summary: Qué resuelve ALMA en la lista.
---


## Qué ofrece ALMA

### Comportamiento
- Cada grupo es una `section` nombrada por su título, con una lista `ul`: el lector dice cuántas filas tiene.
- Las filas de navegación son enlaces; las de acción, botones; las informativas, texto.
- La flecha y los íconos son decorativos: el lector no los anuncia.
- Cada fila mide al menos 44 px de alto.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre las filas de navegación y de acción. |
| Enter | Abre el enlace o activa el botón. |
| Espacio | Activa una fila de acción. |

## Recomendaciones de diseño

- Sin título visible, pasa `aria-label`.
- No dependas del ícono para decir qué hace una fila: el título debe bastar.

## Consideraciones de desarrollo

- No anides botones o enlaces dentro de una fila de navegación o de acción.
- Un `Switch` va en una fila informativa, no en una de navegación.

## Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.

## Al elegir y al editar

- **Una fila que queda marcada** se anuncia como la actual. **Una con visto**, como marcada o sin marcar.
- **El interruptor de una fila toma el título de la fila** como nombre.
- **Los controles de edición tienen nombre completo:** «Eliminar Talca», «Subir Talca».
- **Cada movimiento se anuncia:** «Talca: lugar 1 de 3».
- **El foco sigue al trabajo:** tras mover una fila, queda en el mismo botón; tras eliminarla, en la fila que tomó su lugar.
- **Reordenar no pide arrastrar.**
