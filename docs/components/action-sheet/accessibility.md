---
component: ActionSheet
tab: Accesibilidad
summary: Lo que ActionSheet resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Es un diálogo modal** con nombre: su título. El mensaje se lee como su descripción.
- **Atrapa el foco** mientras está abierta, y lo devuelve a donde estaba al cerrar.
- **El foco entra a «Cancelar».** Enter no destruye nada por accidente.
- **Esc cancela.**
- **El orden de lectura es el de la vista:** título, mensaje, la acción destructiva, las demás, cancelar.
- **Los botones miden 44 px de alto.**

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab, Mayúsculas + Tab | Recorren los botones, sin salir de la hoja. |
| Enter, Espacio | Activa el botón con el foco. |
| Esc | Cancela. |

## Recomendaciones de diseño

- Cada botón se entiende sin leer el título: «Descartar borrador», no «Descartar».
- La acción destructiva se reconoce por su texto, no solo por el rojo.
- Pon siempre un «Cancelar». Sin él, quien llegó por error no tiene salida.

## Consideraciones de desarrollo

- Ábrela como respuesta a algo que la persona hizo, nunca sola.
- Al cerrar, el foco vuelve al control que la provocó. Si ese control ya no existe, llévalo tú a un lugar que tenga sentido.

Pendiente: VoiceOver y NVDA.
