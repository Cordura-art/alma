---
component: ColumnView
tab: Uso
summary: Una jerarquía con cada nivel abierto en su propia columna.
---


## Resumen

`ColumnView` muestra la misma jerarquía que un `Outline`, pero con cada nivel en su columna: el camino recorrido queda a la vista. Es la *column view* de Apple.

## Cuándo usarla

- Para jerarquías profundas, donde importa ver por dónde se vino.
- Para explorar archivos o categorías con muchos niveles.

## Cuándo no

- Con dos niveles: `SplitView`.
- En pantalla angosta: no caben las columnas. Usa una `List` que avanza y vuelve.

## Reglas

- **Lo elegido en cada columna queda marcado:** es el camino.
- **Lo que tiene adentro lleva flecha.**
- **Las columnas miden lo mismo.** Si no caben, se desplaza hacia el lado y la última queda a la vista.
- **La última columna puede ser el detalle** de lo elegido.

## Relacionados

`Outline` · `SplitView` · `Breadcrumb` · `List`.

## Referencias

- Apple, Human Interface Guidelines: Column views.
