# Combobox

Campo para elegir una o varias opciones de una lista larga, escribiendo para filtrar (patrón combobox de WAI-ARIA). Para 2 o 3 opciones usa `SegmentedControl`; para hasta unas 7 sin filtro, `PopUpButton`.

## Qué aporta quien lo usa
- `label`, `options` (textos u objetos `{ value, label, disabled }`), `value` o `defaultValue`, `onChange`.
- `multiple`: cada elección queda como `Tag` dentro del campo y se quita con su ✕ o con Retroceso. `tagColor` (azul por defecto).
- `helper`, `error`, `placeholder`, `emptyText` (por defecto «Sin resultados para «…»»).

## Teclado
Escribir filtra (sin importar tildes ni mayúsculas); ↓ ↑ recorren; Enter elige; Esc cierra la lista y, con la lista cerrada, borra lo escrito; Tab sale.
