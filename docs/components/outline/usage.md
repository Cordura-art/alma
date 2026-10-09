---
component: Outline
tab: Uso
summary: Cosas dentro de cosas, que se abren y se cierran.
---


## Resumen

`Outline` muestra una jerarquía: carpetas con archivos, categorías con subcategorías. Cada nivel se abre y se cierra. Es la *outline view* de Apple.

## Cuándo usarlo

- Cuando hay niveles, y conviene ver varios a la vez.
- En el panel de la lista de un `SplitView`.

## Cuándo no

- **Con un solo nivel:** `List`.
- **Para las secciones de una app:** `Sidebar`, que admite dos niveles.
- **Con más de cuatro niveles:** cuesta saber dónde se está. Prueba `ColumnView`.

## Reglas

- **La sangría dice el nivel:** `space-16` por cada uno. No la uses para otra cosa.
- **La flecha solo abre y cierra.** Tocar la fila la elige.
- **Lo que tiene adentro lleva flecha; lo que no, no.** El espacio de la flecha se conserva, para que los textos calcen.
- **Nombres cortos.** Uno largo se corta con puntos suspensivos.
- **Un dato al final de la fila** (cuántos hay adentro) va en texto secundario.

## Relacionados

`List` · `Sidebar` · `ColumnView` · `Accordion` · Jerarquía.

## Referencias

- Apple, Human Interface Guidelines: Outline views.
