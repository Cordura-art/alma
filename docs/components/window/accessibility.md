---
component: Window
tab: Accesibilidad
summary: Lo que Window resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Es un diálogo no modal con nombre:** su título. Un lector puede saltar de ventana en ventana.
- **Se mueve y cambia de tamaño sin arrastrar:** con las flechas, desde su barra. Y «Ampliar» es un botón.
- **La barra explica sus teclas** a un lector de pantalla al recibir el foco.
- **Los controles tienen nombre completo:** «Cerrar Viajes», no «Cerrar».
- **Llegar a una ventana con el teclado la trae al frente.** Nunca se escribe en una ventana tapada.
- **Cuando una ventana pasa al frente desde otro lado** (el dock, un menú), recibe el foco.
- **Los controles nunca quedan fuera del escritorio:** la ventana siempre se puede alcanzar y cerrar.
- **Activa e inactiva** se distinguen por el título, los controles y la sombra, no solo por un color.

## Teclado

| Tecla | Dónde | Qué hace |
|---|---|---|
| Tab | En la ventana | Barra, controles, herramientas y contenido. |
| Flechas | En la barra | Mueven la ventana, de a 16 px. |
| Mayúsculas + flechas | En la barra | Cambian su tamaño, de a 16 px. |
| Enter, Espacio | En un control | Cierra, minimiza o amplía. |

## Recomendaciones de diseño

- El título tiene que distinguir la ventana de las demás. Dos ventanas «Sin título» no se pueden diferenciar al oído.
- No dependas de que dos ventanas se vean a la vez para entender algo: en pantalla angosta se ve una.
- El contenido tiene que servir al tamaño mínimo de la ventana.

## Consideraciones de desarrollo

- Al cerrar una ventana, lleva el foco a un lugar con sentido: otra ventana, o su app en el dock.
- No atrapes el foco en una ventana. No es modal: se puede salir con Tab.
- Pon los comandos de la ventana también en el menú Ventana de `MenuBar`.

Pendiente: VoiceOver y NVDA; arrastrar con el dedo en una tableta real.
