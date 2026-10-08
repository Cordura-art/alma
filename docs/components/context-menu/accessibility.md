---
component: ContextMenu
tab: Accesibilidad
summary: Lo que ContextMenu resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Se abre con el teclado**: la tecla de menú o Mayúsculas + F10, bajo lo que tiene el foco.
- **Es un `role="menu"` con nombre**, y cada acción un `menuitem`.
- **El foco entra al primer ítem** al abrir, y vuelve a donde estaba al cerrar.
- **Se cierra solo** con Esc, con un clic fuera, al desplazar la página o al cambiar de ventana.
- **Nunca queda fuera de la pantalla.**

## Teclado

| Tecla | Qué hace |
|---|---|
| Tecla de menú, Mayúsculas + F10 | Abre el menú del ítem con el foco. |
| ↓ ↑ | Recorren los ítems. |
| → ← | Abren y cierran un submenú. |
| Enter, Espacio | Elige. |
| Una letra | Va al ítem que empieza con ella. |
| Esc | Cierra y devuelve el foco. |

## Recomendaciones de diseño

- **Nada vive solo aquí.** Un toque largo y un clic derecho no son evidentes, y no todo el mundo puede hacerlos. Cada acción tiene que estar también en un control a la vista.
- Dale al menú un `label` que diga de qué ítem es: «Acciones del viaje a Viña del Mar».
- La acción destructiva se reconoce por su verbo, no solo por el rojo.

## Consideraciones de desarrollo

- Lo que envuelves tiene que poder recibir el foco (`tabIndex: 0`, un botón, un enlace). Si no, el menú no se puede abrir con el teclado.
- El toque largo reemplaza al menú del navegador sobre ese ítem. No lo uses sobre texto que la gente quiera seleccionar o copiar.
- El menú se dibuja con posición fija. Dentro de un contenedor con `transform`, la posición se calcula mal: evítalo en esos casos.

Pendiente: VoiceOver y NVDA; el toque largo en un teléfono real.
