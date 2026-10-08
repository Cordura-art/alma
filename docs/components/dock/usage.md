---
component: Dock
tab: Uso
summary: Las apps del entorno, a un toque: cuáles hay, cuáles están abiertas y sus atajos.
---


## Resumen

`Dock` es la fila de apps al pie del escritorio. Tocar una la abre o trae su ventana al frente. Un punto marca las que están abiertas, y el menú de cada una ofrece sus atajos.

Antes de usarlo, lee el patrón **Entorno**.

## Cuándo usarlo

- En un `Desktop`, para abrir apps y pasar de una a otra.

## Cuándo no

- Para las secciones de una sola app: eso es una `TabBar` o una `Sidebar`.
- Para acciones: un dock abre cosas, no hace cosas.

## Anatomía

1. **App:** su ícono, sobre una base.
2. **Punto:** la app está abierta.
3. **Contador** (opcional): cuánto hay sin ver.
4. **Separador** (opcional): entre las apps y lo demás.
5. **Menú de la app**, con clic derecho.

![Anatomía de Dock: cuatro apps en fila (1); la primera tiene un punto debajo porque está abierta (2), la segunda un contador con un 2 (3). Después de un separador (4) está Ajustes. Sobre la primera app está abierto su menú, con «Mostrar» y «Salir» (5).](assets/Componentes/dock-anatomia.png)

## Contenido

- **De cuatro a ocho apps.** Con más, el dock se desplaza y deja de leerse de un vistazo.
- **Cada app se reconoce por su ícono.** Su nombre aparece al pasar el cursor y lo lee un lector.
- **El orden lo pone la persona**, o es fijo. No cambia solo.
- **El contador es para lo que la persona pidió seguir.** No para llamar la atención.

## El menú de una app

- Sus atajos: «Nuevo viaje», «Mostrar», «Salir».
- Cortos, y también disponibles en otra parte: no todo el mundo usa el clic derecho.
- En un menú contextual, lo que no aplica no aparece. «Salir» no está si la app no está abierta.

## En una pantalla angosta

El dock se queda abajo. Es la manera de pasar de una app a otra cuando solo se ve una ventana.

## Relacionados

`Desktop` · `Window` · `MenuBar` · `ContextMenu` · `TabBar` · Entorno.

## Referencias

- Apple, Human Interface Guidelines: Dock menus, Home Screen quick actions.
