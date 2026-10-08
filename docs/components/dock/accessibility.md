---
component: Dock
tab: Accesibilidad
summary: Lo que Dock resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Es una barra de herramientas con nombre.** Una sola parada de Tab; las flechas pasan de app en app.
- **Cada app dice su nombre y su estado:** «Viajes, abierta», «Asistente, 2 sin ver».
- **El punto y el contador no dependen del color:** el estado va también en el nombre.
- **El menú de cada app se abre con el teclado**, con la tecla de menú o Mayúsculas + F10.
- **Las bases miden 48 px.**

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al dock; sale de él. |
| ← → | App anterior o siguiente. |
| Inicio, Fin | Primera o última app. |
| Enter, Espacio | Abre la app, o la trae al frente. |
| Tecla de menú | Abre el menú de la app. |

## Recomendaciones de diseño

- Dos apps no pueden tener el mismo ícono: el nombre no está a la vista.
- El contador dice un número. Un punto de color solo no le dice nada a quien no lo ve.

## Consideraciones de desarrollo

- Al abrir una app desde el dock, su ventana recibe el foco: usa `frontKey` en `Window`.
- Al cerrar la última ventana de una app, devuelve el foco a su lugar en el dock.

Pendiente: VoiceOver y NVDA.
