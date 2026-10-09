---
component: ColumnView
tab: Uso
summary: Una jerarquía con cada nivel abierto en su propia columna.
---


## Resumen

`ColumnView` muestra la misma jerarquía que un `Outline`, pero con cada nivel en su columna: el camino recorrido queda a la vista. Es la *column view* de Apple.

![ColumnView con tres columnas. En la primera, «Viajes» elegido entre «Viajes», «Medios de pago» y «Avisos». En la segunda, su contenido: «2026» elegido y «2025» con 14. En la tercera, lo que hay en 2026: «Marzo» con 2 y «Abril» con 3. Lo elegido en cada columna queda marcado y dice el camino.](assets/Componentes/column-view-ruta.png)

## Cómo se lee

- **Una columna por nivel.** Elegir algo en una columna abre su contenido en la siguiente.
- **Lo elegido queda marcado en cada columna:** el camino se lee de izquierda a derecha, sin migas de pan.
- **La flecha al final** dice que hay algo adentro. Lo que no la tiene es un final.
- **Un dato al final de la fila** (cuántos hay adentro), en texto secundario.
- **Si no caben todas,** las columnas se desplazan hacia el lado y la última elegida queda a la vista.

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
