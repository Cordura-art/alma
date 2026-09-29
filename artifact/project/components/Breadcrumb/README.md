# Breadcrumb

Ruta desde el inicio hasta la página actual (IBM Carbon). Úsala en sitios con 3 niveles o más; en móvil, prefiere un botón «Volver» en `Toolbar`.

## Qué aporta quien lo usa
- `items`: `{ label, href | onClick }`, del nivel más alto al actual. El último es la página actual: se muestra como texto con `aria-current="page"`, no como enlace.
- `maxItems` (4 por defecto): si la ruta es más larga, los niveles del medio se pliegan en un menú «…».
- `label`: nombre del `nav` («Ruta de navegación» por defecto). Si hay dos en la página, dale a cada uno un nombre distinto.

## Aspecto
Separador `/` en `breadcrumb-separator`, oculto para lectores de pantalla. Cada enlace tiene 44 px de alto de área táctil.
