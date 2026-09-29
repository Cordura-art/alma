# Tag

Etiqueta corta que clasifica, filtra o muestra un estado (IBM Carbon).

## Tres usos
- **Solo lectura:** un estado o categoría («Pagado», «Interurbano»). Una o dos palabras.
- **Se puede quitar** (`onRemove`): filtros aplicados o elecciones de un `Combobox` múltiple. El botón dice «Quitar …»; `removeLabel` si el texto no es una cadena.
- **Seleccionable** (`onClick` + `selected`): filtros que se prenden y apagan. Usa `aria-pressed` y muestra un visto al estar elegida. Agrúpalas en un `role="group"` con `aria-label`, con 16 px entre filas para que sus áreas de toque de 44 px no se pisen.

## Qué aporta quien lo usa
- `color`: uno de los 11 de la paleta secundaria (`red`, `yellow`, `magenta`, `purple`, `blue`, `cyan`, `teal`, `green`, `warmgray`, `gray`, `coolgray`). El color no significa nada por sí solo: la palabra es la que informa.
- `size`: `sm` (24 px) dentro de campos; por defecto 32 px.
- `icon`, `disabled`.

## Contraste
Texto a 4,5:1 sobre su fondo en todos los temas y a 7:1 en alto contraste (`tag-<color>-text`, corregido en amarillo). El botón de quitar tiene un área de 32 × 32 px, sobre los 24 de WCAG 2.2.
