# Sidebar

Barra lateral para navegar entre áreas de la app en tablet y escritorio (en Apple, *sidebar*).

## Reglas de Apple
- Como máximo **dos niveles**: grupos con título, desplegables, y sus destinos. Si la jerarquía es más profunda, agrega una lista intermedia entre la barra y el detalle.
- Títulos de grupo breves y descriptivos.
- Se puede ocultar con un botón (`side-panel--close` / `side-panel--open`), pero **está visible por defecto** para que se descubra.
- Si es posible, deja que cada persona elija y ordene sus destinos.
- Íconos conocidos de la lista aprobada. Solo el destino actual cambia de color (`nav-selected` sobre `selected-ui`) y muestra su ícono relleno.
- Con poco espacio (bajo `bp-lg`), usa `TabBar` con los mismos destinos.

## Qué aporta quien lo usa
- `groups`: `{ title?, items: [{ value, label, icon, href?, badge? }] }`.
- `value`/`onChange`, `hidden`/`onHiddenChange`.

## Accesibilidad
Es un `nav`, con `aria-current="page"`. Cada grupo es un botón con `aria-expanded` y cada ítem mide 44 px.
