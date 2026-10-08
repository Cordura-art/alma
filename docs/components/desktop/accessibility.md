---
component: Desktop
tab: Accesibilidad
summary: Lo que Desktop resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Es una región con nombre**, y dentro de ella cada pieza tiene el suyo: la barra de menús, cada ventana, el dock.
- **El orden de lectura es el del uso:** barra de menús, ventanas, dock.
- **El fondo no se lee.** Es decoración.
- **En pantalla angosta, las ventanas que no se ven no existen** para el teclado ni para un lector.
- **No atrapa nada:** con Tab se entra y se sale del escritorio.

## Teclado

Ver la tabla del patrón **Entorno**: cada pieza tiene sus teclas.

## Recomendaciones de diseño

- Un escritorio pide más de la persona que una página. Úsalo cuando ver varias cosas a la vez de verdad ayude.
- No dependas del lugar de una ventana para decir algo: quien usa un lector no ve dónde está.
- El fondo no puede bajar el contraste de nada. Por eso todo lo que se lee va sobre vidrio o sobre una superficie opaca.

## Consideraciones de desarrollo

- Dale al escritorio un `label` que lo distinga si hay más de una región en la página.
- Si el fondo es un efecto, respeta el movimiento reducido: los de ALMA ya lo hacen.
- Guarda el estado de las ventanas (abiertas, lugar, tamaño) para que el entorno vuelva como estaba.

Pendiente: VoiceOver y NVDA.
