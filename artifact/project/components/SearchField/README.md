# SearchField

Campo de búsqueda en píldora, con ícono de lupa, botón para borrar, sugerencias, barra de alcance y tokens de filtro (en Apple, *search field*).

## Reglas de Apple
- El placeholder dice **qué** se puede buscar: «Buscar ciudades o terminales», no solo «Buscar».
- Busca mientras se escribe: `onChange` se llama en cada tecla.
- Muestra sugerencias: búsquedas recientes antes de escribir, o predictivas mientras se escribe.
- Los resultados más relevantes van primero y, si ayuda, agrupados por categoría.
- **Alcance** (`scopes`): categorías claras. Empieza por la más amplia («Todo»).
- **Tokens** (`tokens`): filtros encapsulados que se editan como una unidad. Combínalos con sugerencias para que se descubran.

## Teclado y lector de pantalla
- Es un `combobox` con lista de sugerencias.
- ↓ ↑ recorren las sugerencias y Enter busca o elige.
- Esc cierra las sugerencias; si ya están cerradas, borra el texto.
- Retroceso con el campo vacío quita el último token.
- El botón de borrar y los de quitar token tienen área de 44 px.
