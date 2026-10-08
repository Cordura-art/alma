---
component: TokenField
tab: Accesibilidad
summary: Lo que TokenField resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **El campo tiene su rótulo**, y las fichas son una lista con nombre: «Compartir con: 2 elegidos».
- **Cada ficha se quita con un botón con nombre:** «Quitar tomas@correo.cl».
- **Cada cambio se anuncia:** «Agregaste…», «Quitaste…», «…ya está», «…no es válido».
- **Al quitar una ficha, el foco vuelve al campo.**
- **Con sugerencias es un cuadro combinado:** dice cuántas hay y cuál está marcada.
- **Todo con teclado**, sin arrastrar ni apuntar.

## Teclado

| Tecla | Qué hace |
|---|---|
| Enter, coma | Convierte lo escrito en ficha. |
| Retroceso, con el campo vacío | Va al botón de quitar de la última ficha. |
| Tab, Mayúsculas + Tab | Recorre los botones de quitar y el campo. |
| ↓ ↑ | Recorren las sugerencias. |
| Esc | Cierra las sugerencias y borra lo escrito. |

## Recomendaciones de diseño

- Di en la ayuda cómo se separan los valores. No es evidente.
- No uses solo el color de la ficha para decir algo (un correo de fuera, por ejemplo): agrégale un ícono o un texto.

## Consideraciones de desarrollo

- Si validas, explica el error con `error`: el anuncio dice que no vale, no por qué.
- No quites fichas solo. Si un valor dejó de valer, márcalo y deja que la persona decida.

Pendiente: VoiceOver y NVDA.
