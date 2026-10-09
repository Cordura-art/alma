---
component: Outline
tab: Uso
summary: Cosas dentro de cosas, que se abren y se cierran.
---


## Resumen

`Outline` muestra una jerarquía: carpetas con archivos, categorías con subcategorías. Cada nivel se abre y se cierra. Es la *outline view* de Apple.

## Anatomía

1. **Flecha:** abre y cierra. Solo en lo que tiene algo adentro.
2. **Ícono** (opcional): qué tipo de cosa es.
3. **Nombre.**
4. **Dato al final** (opcional): cuántos hay adentro, en texto secundario.
5. **Sangría:** `space-16` por nivel.

![Anatomía de Outline: un árbol «Mi cuenta». «Viajes» está abierto y muestra «2026», también abierto, con «Marzo» elegido y «Abril» debajo, y «2025» cerrado. Numerados: la flecha que abre y cierra (1), el ícono (2), el nombre (3), el dato al final de la fila (4) y la sangría de cada nivel (5).](assets/Componentes/outline-niveles.png)

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

## Con el teclado

| Tecla | Qué hace |
|---|---|
| ↑ ↓ | Va a la fila anterior o siguiente que esté a la vista. |
| → | Abre la fila. Si ya está abierta, baja a la primera de adentro. |
| ← | Cierra la fila. Si ya está cerrada, sube a la que la contiene. |
| Enter o Espacio | Elige la fila. |
| Inicio, Fin | Primera y última fila. |

## Relacionados

`List` · `Sidebar` · `ColumnView` · `Accordion` · Jerarquía.

## Referencias

- Apple, Human Interface Guidelines: Outline views.
