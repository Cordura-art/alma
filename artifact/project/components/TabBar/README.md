# TabBar

Barra de pestañas inferior para moverse entre las **secciones principales** de la app en móvil (en Apple, *tab bar*).

## Reglas de Apple
- Es solo para navegar, nunca para ejecutar acciones. Para acciones sobre la vista, usa `Toolbar`.
- Está siempre visible al cambiar de sección. Solo la tapa un modal.
- Nunca ocultes ni deshabilites un ítem. Si una sección está vacía, explica por qué dentro de la sección.
- De 3 a 5 ítems, sin pestaña «Más».
- Cada ítem lleva ícono y una etiqueta de **una palabra**. El seleccionado usa el ícono relleno y `nav-selected`.
- `badge` solo para información crítica: un número o «!» en rojo (`button-destructive-fill` con `text-on-pressed`). El lector de pantalla lo anuncia junto a la etiqueta.
- Desde `bp-lg`, reemplázala por `Sidebar` con los mismos destinos: la estructura de navegación no cambia, solo su forma.

## Qué aporta quien lo usa
- `items` (`value`, `label`, `icon`, `href` y `badge` opcionales), `value`/`onChange`.
- `fixed`: la fija abajo y respeta el área segura del teléfono.

## Accesibilidad
Es un `nav`, con `aria-current="page"` en el destino actual. Cada ítem mide al menos 56 px de alto.
