---
component: Desktop
tab: Uso
summary: El escenario del entorno: lleva el fondo, la barra de menús, el dock y las ventanas, y las ordena.
---


## Resumen

`Desktop` es el escritorio: el lugar donde viven las ventanas. Lleva un fondo, una `MenuBar` arriba y un `Dock` abajo, sabe qué ventana está al frente y se adapta cuando la pantalla es angosta.

Antes de usarlo, lee el patrón **Entorno**.

## Cuándo usarlo

- Para el entorno de una entidad: varias apps que se abren en ventanas.
- Para una herramienta donde se trabaja con varias cosas a la vez.

## Cuándo no

- Para un sitio o una app de una sola tarea. Ahí la estructura es `Toolbar`, `Sidebar` o `TabBar`.
- Dentro de otro `Desktop`.

## Anatomía

1. **Fondo:** un color, o un efecto de ALMA.
2. **Barra de menús** (`MenuBar`).
3. **Ventanas** (`Window`).
4. **Dock.**

![Un escritorio con sus partes numeradas. Detrás, un fondo de luz (1). Arriba, la barra de menús con el nombre de la app, sus menús y, a la derecha, los avisos y la hora (2). En el centro, dos ventanas que se superponen: «Viajes» detrás y «Asistente» al frente (3). Abajo al centro, el dock con tres apps, dos con un punto debajo (4).](assets/Componentes/desktop-anatomia.png)

## El fondo

- Es decoración: no lleva texto ni controles.
- Puede ser un efecto de ALMA. Si es la presencia de una IA, es la única luz del entorno: el Velo mientras la IA está de fondo, y el Halo sobre él cuando su ventana pasa al frente.
- Las ventanas y las barras son de vidrio sobre él: se leen igual con cualquier fondo.

## El orden de las ventanas

- La última ventana que se tocó, se enfocó o se abrió está al frente.
- Al cerrar o minimizar la del frente, pasa al frente la anterior.
- El orden es del escritorio; quién está abierta, de tu app.

## En una pantalla angosta

Bajo 672 px de ancho, el escritorio muestra una ventana a la vez, a todo el tamaño. Lo mide en su propio ancho, no en el de la pantalla: un escritorio dentro de un panel angosto también se adapta.

## Relacionados

`Window` · `MenuBar` · `Dock` · Entorno · Profundidad · Diseño adaptable.

## Referencias

- Apple, Human Interface Guidelines: Windows, Multitasking.
