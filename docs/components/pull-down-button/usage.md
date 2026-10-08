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
- **Con una o dos acciones:** botones. Abrir un menú vale la pena desde tres.
- **Para todas las acciones de una pantalla.** Las principales van a la vista; el menú es para el resto.

## Anatomía

1. **Botón**: con etiqueta, o solo con el ícono `overflow-menu--horizontal`.
2. **Menú** con las acciones.
3. **Acción destructiva** (opcional), en rojo, al final.

![PullDownButton abierto en una tarjeta de pago, con las acciones «Copiar número», «Congelar tarjeta» y, separada en rojo, «Eliminar tarjeta».](assets/Componentes/pull-down-button-menu.png)

## Contenido

- Acciones que empiezan con verbo: «Copiar número», «Compartir viaje».
- Si una acción abre otra vista o pide datos, termina en «…»: «Cambiar nombre…».
- La destructiva va al final, separada, con `role: 'destructive'`. Si no se puede deshacer, confirma con un `ActionSheet`: aparece en otro lugar y hay que cerrarlo a propósito, y eso evita un borrado por error.
- Ordena por uso, la más usada primero.
- Las reglas de nombres, íconos y orden están en el patrón **Menús**.

## Grupos, submenús e ítems que se marcan

![Un PullDownButton «Ver» abierto, con el título «Mis viajes». El ítem «Ordenar por» tiene una flecha y su submenú abierto al lado, con «Fecha» marcada. Debajo, «Solo los pagados» con un visto, un separador y «Actualizar» con su atajo Ctrl+R a la derecha.](assets/Componentes/pull-down-button-submenu.png)

- **Grupos:** un separador (`'-'`) entre grupos de acciones relacionadas.
- **Submenú:** un ítem con `items` abre una lista menor. Un solo nivel, hasta unos cinco ítems.
- **Ítems que se marcan:** con `checked`, el ítem lleva un visto cuando está en efecto. Sirve para elegir varios a la vez, que `PopUpButton` no permite.
- **Atajos:** `shortcut` muestra el atajo a la derecha. Mostrarlo no lo activa: eso es de la app.
- **Título:** `title`, solo si agrega algo que el botón no dice.

## Comportamiento

- Elegir una acción cierra el menú y la ejecuta.
- Esc, Tab o un clic fuera cierran sin hacer nada.

## Relacionados

`PopUpButton` · `ContextMenu` · `ActionSheet` · `Toolbar` · `Button` · Menús.

## Referencias

- Apple, Human Interface Guidelines: Pull-down buttons.
- IBM, Carbon Design System: Overflow menu.
