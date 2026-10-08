---
component: Rating
tab: Accesibilidad
summary: Lo que Rating resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Para leer, es una imagen con su texto:** «4,5 de 5 estrellas», y después «1.284 valoraciones».
- **Para elegir, es un grupo de opciones** con nombre. Cada una dice «3 estrellas» y si está elegida.
- **Una sola parada de Tab;** las flechas cambian la valoración.
- **Cada estrella mide 44 px** al elegir.
- **Llena y vacía se distinguen por la forma**, no solo por el color.

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al grupo. |
| → ↑ | Una estrella más. |
| ← ↓ | Una estrella menos. |
| Enter, Espacio | Elige, o quita si ya estaba elegida. |

## Recomendaciones de diseño

- Pon la pregunta a la vista junto a las estrellas, y úsala como `label`.
- Confirma lo elegido con texto: «Elegiste 4 de 5».

## Consideraciones de desarrollo

- No envíes la valoración al primer toque sin poder cambiarla.

Pendiente: VoiceOver y NVDA.
