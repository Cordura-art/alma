---
component: MenuBar
tab: Accesibilidad
summary: Lo que MenuBar resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Es un `menubar`** con nombre, y cada título un `menuitem` que dice si su menú está abierto.
- **Una sola parada de Tab.** Las flechas pasan de un menú a otro.
- **Con un menú abierto, las flechas a los lados abren el de al lado**, salvo que abran o cierren un submenú.
- **Esc cierra el menú** y deja el foco en su título.
- **Los atajos se anuncian** con cada ítem.
- **Los extras tienen nombre**, aunque sean solo un ícono.

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega a la barra; sale de ella. |
| ← → | Menú anterior o siguiente. |
| ↓, Enter, Espacio | Abre el menú. |
| Inicio, Fin | Primer o último menú. |
| Dentro de un menú | Las teclas de cualquier menú de ALMA. Ver el patrón Menús. |
| Esc | Cierra el menú. |

## Recomendaciones de diseño

- Un ítem apagado sigue ahí y se anuncia como no disponible: así se sabe que existe.
- La barra es de vidrio delgado: no pongas en ella texto secundario ni de color.
- Un extra que cambia (un contador de avisos) lo dice con texto, no solo con un punto de color.

## Consideraciones de desarrollo

- Un atajo que se muestra tiene que funcionar, y no puede pisar los del navegador ni los del lector de pantalla.
- Al cambiar la app al frente, cambia `appName` y `menus` juntos.

Pendiente: VoiceOver y NVDA.
