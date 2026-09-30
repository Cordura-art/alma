---
component: PullDownButton
tab: Uso
summary: Un botón que abre una lista de acciones relacionadas con algo.
---


## Resumen

`PullDownButton` agrupa acciones sobre un elemento (una tarjeta, un archivo, un viaje) en un menú. A diferencia de `PopUpButton`, no guarda una elección: cada opción hace algo. Es el *pull-down button* de Apple y el *overflow menu* de Carbon.

### Cuándo usarlo
- Para acciones secundarias de un elemento que no caben a la vista.
- Como el menú «Más» de una `Toolbar`.

### Cuándo no usarlo
- **Para elegir una opción:** `PopUpButton`.
- **Para la acción principal:** un `Button` a la vista.
- **Con una sola acción:** un `Button`.

## Anatomía

1. **Botón**: con etiqueta, o solo con el ícono `overflow-menu--horizontal`.
2. **Menú** con las acciones.
3. **Acción destructiva** (opcional), en rojo, al final.

> **Imagen pendiente:** el menú de una tarjeta de pago con «Copiar número», «Congelar tarjeta» y «Eliminar tarjeta».

## Contenido

- Acciones que empiezan con verbo: «Copiar número», «Compartir viaje».
- Si una acción abre otra vista o pide datos, termina en «…»: «Cambiar nombre…».
- La destructiva va al final, con `role: 'destructive'`. Si no se puede deshacer, confirma con `Alert`.
- Ordena por uso, la más usada primero.

## Comportamiento

- Elegir una acción cierra el menú y la ejecuta.
- Esc, Tab o un clic fuera cierran sin hacer nada.

## Relacionados

`PopUpButton` · `Toolbar` · `Button` · `Alert`.

## Referencias

- Apple, Human Interface Guidelines: Pull-down buttons.
- IBM, Carbon Design System: Overflow menu.
