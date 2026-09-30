---
component: Sidebar
tab: Uso
summary: Una barra lateral para moverse entre las áreas de la app en tablet y escritorio.
---


## Resumen

`Sidebar` lista los destinos principales de la app al costado de la pantalla, agrupados, con el actual marcado. Es la *sidebar* de Apple y la navegación lateral del UI shell de Carbon.

### Cuándo usarla
- Para navegar entre áreas de la app en tablet y escritorio (desde 1056 px, `bp-lg`).
- Cuando hay más destinos de los que caben en una `TabBar`, o conviene agruparlos.

### Cuándo no usarla
- **En el teléfono:** `TabBar` con los mismos destinos principales.
- **Para cambiar de vista dentro de una página:** `Tabs` o `SegmentedControl`.
- **Para acciones:** `Toolbar`.

## Anatomía

1. **Botón mostrar/ocultar** (`side-panel--close` / `side-panel--open`).
2. **Panel** `ui-01` con esquinas redondeadas.
3. **Título de grupo**, desplegable.
4. **Destino**: ícono y etiqueta.
5. **Destino actual**: fondo `selected-ui`, color `nav-selected` e ícono relleno.
6. **Contador** (opcional).

![Anatomía de Sidebar con tres grupos, uno plegado. Numerados: botón mostrar u ocultar (1), panel (2), título de grupo (3), destino (4), destino actual (5) y contador (6).](assets/Componentes/sidebar-anatomia.png)

## Estructura

- Como máximo **dos niveles**: grupos y sus destinos. Si la jerarquía es más profunda, agrega una lista intermedia entre la barra y el detalle.
- Títulos de grupo breves y descriptivos; un grupo sin título va primero.
- Visible por defecto, para que se descubra. Se puede ocultar con su botón.
- Si es posible, deja que cada persona elija y ordene sus destinos.

## Contenido

- Etiquetas cortas, con sustantivo: el nombre del área («Viajes», «Billetera»).
- Íconos conocidos, uno por destino.
- El contador solo para algo nuevo o pendiente, no para totales.

## Comportamiento

- Un clic en un destino navega; el destino queda marcado.
- Un clic en el título del grupo lo pliega o lo despliega.
- Con poco espacio (bajo 1056 px), reemplázala por `TabBar`: los destinos no cambian, solo su forma.

## Relacionados

`TabBar` · `Toolbar` · `Tabs` · `Breadcrumb`.

## Referencias

- Apple, Human Interface Guidelines: Sidebars.
- IBM, Carbon Design System: UI shell (left panel).
