---
component: DigitEntry
tab: Accesibilidad
summary: Lo que DigitEntry resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Es un solo campo**, con su rótulo. Un lector de pantalla no encuentra seis campos sin nombre, que es el error más común de estos controles.
- **Teclado numérico** en un teléfono.
- **Se puede pegar y autocompletar.**
- **La ayuda y el error se leen con el campo.**
- **El error no depende del color:** lleva ícono y texto.
- **La casilla actual tiene foco visible.**

## Teclado

| Tecla | Qué hace |
|---|---|
| Números | Llenan las casillas en orden. |
| Retroceso | Borra el último dígito. |
| Pegar | Pone el código entero. |

## Recomendaciones de diseño

- No verifiques cada dígito: espera el código completo.
- No pongas un tiempo límite corto. Si el código caduca, dilo y ofrece otro.
- No dependas solo de este paso: ofrece otra manera de verificar.

## Consideraciones de desarrollo

- No reemplaces el campo único por varios campos. Se pierde pegar, autocompletar y el nombre.
- Tras un error, deja el foco en el campo.

Pendiente: VoiceOver y NVDA; el autocompletado en un teléfono real.
