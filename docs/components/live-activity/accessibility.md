---
component: LiveActivity
tab: Accesibilidad
summary: Lo que LiveActivity resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **La compacta es un botón con todo en su nombre:** «Viaje a Viña del Mar, 42 min, 60 %».
- **Dice si está expandida.**
- **No interrumpe.** Un dato que cambia cada minuto no se anuncia cada minuto. Se anuncia solo lo que pases en `announce`.
- **El avance es una barra de progreso** con su valor.
- **Cada paso dice su estado** con palabras: hecho, en curso, por hacer.
- **El avance no depende del color:** va también en cifras.

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega a la actividad, y a sus acciones si está expandida. |
| Enter, Espacio | Expande o pliega. |

## Recomendaciones de diseño

- Anuncia los hitos, no el reloj: «Tu bus salió», «Faltan 10 minutos», «Llegaste».
- «Detener» siempre a la vista en la expandida, si la tarea se puede parar.
- La compacta mide 24 px de alto: es el mínimo de toque. No la achiques.

## Consideraciones de desarrollo

- Cambia `announce` solo cuando pasa algo que la persona querría saber aunque no esté mirando.
- Al terminar, anuncia el resultado y retira la actividad después. No la quites sin decir cómo terminó.

Pendiente: VoiceOver y NVDA.
