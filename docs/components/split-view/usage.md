---
component: SplitView
tab: Uso
summary: Una lista y su detalle, lado a lado, con un divisor que se mueve.
---


## Resumen

`SplitView` pone una lista y el detalle de lo elegido uno junto al otro. Es la *split view* de Apple.

## Cuándo usarlo

- Cuando se pasa seguido de un ítem a otro: correos, viajes, ajustes.
- Dentro de una `Window`, o como estructura de una pantalla ancha.

## Cuándo no

- Si el detalle es toda la tarea: ábrelo en su propia vista.
- Con más de tres paneles. Dos es lo normal; el tercero es un inspector.

## Cómo se comporta

- **El divisor se mueve** arrastrándolo o con las flechas, entre un ancho mínimo y uno máximo.
- **La lista marca lo elegido** y lo mantiene marcado: dice dónde estás. Usa `List` con `selection: 'single'`.
- **Angosto** (menos de 672 px), muestra un panel a la vez: la lista, y al elegir, el detalle con «Volver».
- **Lo importante va al inicio:** la lista a la izquierda, el detalle a la derecha.

![El mismo SplitView en dos anchos. Ancho: a la izquierda la lista «Mis viajes» con «Santiago → Viña del Mar» marcado, un divisor, y a la derecha el detalle de ese viaje. Angosto, en un teléfono: solo el detalle, con el botón «Volver» arriba para regresar a la lista.](assets/Componentes/split-view-ancho-angosto.png)

## Qué va en cada panel

| Panel | Qué | Con qué |
|---|---|---|
| **Lista** | De dónde se elige. Angosto y estable: no cambia al elegir. | `List`, `Outline`, `Sidebar` |
| **Detalle** | Lo elegido, completo. Cambia con cada elección. | Lo que haga falta |

- **El detalle nunca queda vacío** en ancho: parte con el primero elegido, o con un `EmptyState` que diga qué elegir.
- **En angosto, «Volver» lleva a la lista** con lo elegido todavía marcado.
- **No anides** un `SplitView` dentro de otro. Para un tercer nivel, usa `ColumnView`.

## Relacionados

`List` · `Window` · `Sidebar` · `ColumnView` · Diseño adaptable.

## Referencias

- Apple, Human Interface Guidelines: Split views.
