---
component: Tabs
tab: Uso
summary: Pestañas para alternar entre paneles de contenido relacionado en la misma área.
---


## Resumen

`Tabs` muestra un panel a la vez entre varios paneles relacionados, sin cambiar de página. En Apple es la *tab view*; en Carbon, *tabs*.

### Cuándo usarlo
- Para ver distintas facetas de una misma cosa: el resumen, los asientos y los pagos de un viaje.
- Cuando los paneles son independientes y no hace falta verlos juntos.

### Cuándo no usarlo
- **Para navegar entre secciones de la app:** `TabBar` en el teléfono, `Sidebar` en tablet y escritorio.
- **Para filtrar una misma lista o cambiar su vista:** `SegmentedControl`.
- **Para pasos de un proceso:** `ProgressIndicator`.
- **Con más de 6 pestañas:** elige la vista con un `PopUpButton`.
- Al revés, no pongas pocas pestañas en un menú emergente: cambiar de panel tomaría dos toques en vez de uno.

## Anatomía

1. **Lista de pestañas**, con un borde inferior.
2. **Pestaña**: etiqueta y, opcionalmente, un ícono.
3. **Indicador**: barra de 2 px bajo la pestaña activa.
4. **Panel** con el contenido.

![Anatomía de Tabs con tres pestañas y la primera activa. Numerados: lista de pestañas (1), pestaña (2), indicador de la pestaña activa (3) y panel (4).](assets/Componentes/tabs-anatomia.png)

## Contenido

- Etiquetas con sustantivo, cortas, con mayúscula solo al inicio («Resumen», «Asientos», «Pagos»).
- Todas del mismo tipo: no mezcles sustantivos y verbos.
- Ordénalas por uso, la más usada primero; la primera se abre por defecto.
- Los controles de un panel afectan solo a ese panel.

## Comportamiento

- Un clic o las flechas cambian de pestaña; el panel cambia al instante.
- El indicador se desliza a la pestaña nueva.
- Si las pestañas no caben, la lista se desplaza hacia el lado; no pasan a una segunda línea.
- Si la persona vuelve a la misma vista, muéstrale la última pestaña que eligió (lo decide quien usa el componente, con `value`).

## Relacionados

`SegmentedControl` · `TabBar` · `Sidebar` · `PopUpButton`.

## Referencias

- Apple, Human Interface Guidelines: Tab views.
- IBM, Carbon Design System: Tabs.
