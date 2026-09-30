# Toolbar

Barra superior con el título de la vista, la navegación (volver, buscar) y las acciones frecuentes sobre el contenido (en Apple, *toolbar*).

## Reglas de Apple
- Un título útil que confirme dónde está la persona. Si sería redundante, déjalo vacío.
- Pocos elementos, que se distingan y se puedan tocar. Las acciones menos importantes van al menú **Más** (`moreActions`); úsalo solo si hace falta.
- Sin fondos pesados ni controles teñidos: la barra usa el color de la página (`ui-02`) con un borde `ui-03`, y las acciones son botones `plain`.
- Para navegar entre secciones, usa `TabBar` o `Sidebar`, no la toolbar.

## Qué aporta quien lo usa
- `title`, `onBack`, `search` (un `SearchField`), `actions` (`label`, `icon`) y `moreActions`.
- Bajo 672 px, el `search` baja a su propia fila, debajo del título y las acciones, como en la barra de navegación de iOS.
- `sticky`: queda fija arriba al hacer scroll.
