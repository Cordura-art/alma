---
component: Window
tab: Uso
summary: El marco de una app en el escritorio: se mueve, cambia de tamaño, se amplía, se minimiza y se cierra.
---


## Resumen

`Window` es el marco de una app: una barra con sus controles y su título, y un cuerpo con el contenido. Dentro de un `Desktop` se mueve y cambia de tamaño; fuera de uno es una ventana quieta. Es la *window* de Apple.

Antes de usarla, lee el patrón **Entorno**.

## Cuándo usarla

- Para cada app o documento abierto en un `Desktop`.
- Para una tarea que conviene ver junto a otra: escribir un mensaje mientras se lee un pasaje.

## Cuándo no

- Para pedir una decisión o un dato que detiene todo: eso es un `Modal`, un `Sheet` o un `Alert`.
- Para un contenido breve junto a un control: eso es un `Popover`.
- Fuera de un entorno, para «enmarcar» una sección de una página: eso es una `Card`.

## Anatomía

1. **Barra:** por ella se mueve la ventana.
2. **Controles:** cerrar, minimizar y ampliar.
3. **Título:** el nombre de la app o del documento.
4. **Herramientas** (opcional): pocas acciones de la ventana.
5. **Cuerpo:** el contenido.
6. **Pie** (opcional): un dato menor.
7. **Bordes:** por ellos cambia de tamaño.

![Anatomía de Window: la barra (1) con los controles de cerrar, minimizar y ampliar (2), el título «Viajes» al centro (3) y un botón de buscar a la derecha (4); debajo el cuerpo con una tarjeta de viaje (5) y, al final, un pie que dice «1 viaje» (6).](assets/Componentes/window-anatomia.png)

## Tipos

| Tipo | `kind` | Para |
|---|---|---|
| **Principal** | — | La ventana de una app, con su navegación. |
| **Auxiliar** | — | Una sola tarea. No lleva a otras partes de la app, y se cierra al terminar. |
| **Panel** | `panel` | El detalle de lo seleccionado en otra ventana. Menor, toda de vidrio, sin ampliar. |
| **Escenario** | `stage` | La ventana de un asistente. Flotando es una ventana como las demás. Ampliada y al frente no tiene fondo propio: su suelo es la luz del escritorio, y lo que se lee va en una hoja de vidrio adentro. Las ventanas de atrás esperan fuera de la vista. |

## Estados

![Dos ventanas iguales. La de la izquierda está activa: su barra es de vidrio, su borde está marcado, su título y sus controles tienen todo el color, y lleva sombra. La de la derecha está inactiva: barra opaca, borde tenue, título y controles en gris, sin sombra.](assets/Componentes/window-estados.png)

| Estado | Qué es | Cómo se ve |
|---|---|---|
| **Activa** | La que está al frente y recibe el teclado. Una sola. | Barra de vidrio, borde marcado, título en `text-01`, controles en `icon-01`, sombra. |
| **Inactiva** | Las demás. | Toda la ventana bajo un velo. Barra opaca, borde tenue, título en `text-02`, controles en `icon-02`, sin sombra. |
| **Ampliada** | Ocupa todo el escritorio. | Sin radio ni bordes laterales. |
| **Minimizada** | No se ve. Vuelve desde el dock o el menú Ventana. | — |

Tocar una ventana inactiva, o llegar a ella con el teclado, la trae al frente.

## Comportamiento

- **Mover:** arrastrando la barra, o con las flechas cuando la barra tiene el foco.
- **Cambiar de tamaño:** arrastrando un borde o una esquina de abajo, o con Mayúsculas + flechas.
- **Ampliar:** con su control, o con doble clic en la barra.
- **No se pierde:** sus controles siempre quedan a la vista dentro del escritorio. Puede salirse por la derecha y por abajo, nunca por la izquierda ni por arriba.
- **En pantalla angosta:** ocupa todo, y no se mueve ni cambia de tamaño.

## Contenido

- **El título es corto:** el nombre de la app, o del documento. Sin versión ni ruta.
- **Pocas herramientas en la barra.** El resto de los comandos está en la barra de menús.
- **Nada importante en el pie:** es lo primero que queda fuera de la vista.

## Relacionados

`Desktop` · `MenuBar` · `Dock` · `Modal` · `Sheet` · Entorno · Profundidad.

## Referencias

- Apple, Human Interface Guidelines: Windows, Panels.
