# SearchField

Un campo de búsqueda con sugerencias, alcance y filtros.


## Uso

### Resumen

`SearchField` busca mientras se escribe, sugiere búsquedas y puede acotar por categoría o por filtros. Es el *search field* de Apple.

#### Cuándo usarlo
- Para encontrar algo en un conjunto grande: viajes, ciudades, movimientos.
- En la `Toolbar` de una vista, o arriba de una lista o una tabla.

#### Cuándo no usarlo
- **Para elegir una opción de una lista conocida:** `Combobox`.
- **Para pocos elementos a la vista:** no hace falta buscar.

### Anatomía

1. **Lupa.**
2. **Campo** con texto de ejemplo.
3. **Tokens** de filtro (opcionales).
4. **Borrar** (aparece al escribir).
5. **Sugerencias**, con título opcional.
6. **Alcance** (opcional): un `SegmentedControl` debajo.

> **Imagen pendiente:** anatomía numerada con dos tokens, sugerencias abiertas y el alcance.

### Contenido

- **Texto de ejemplo:** dice **qué** se puede buscar: «Buscar ciudades o terminales», no solo «Buscar».
- **Sugerencias:** búsquedas recientes antes de escribir; predictivas mientras se escribe. Hasta 8.
- **Alcance:** categorías claras, la más amplia primero («Todo»).
- **Tokens:** filtros que se editan como una unidad. Combínalos con sugerencias para que se descubran.

### Comportamiento

- `onChange` se llama en cada tecla: busca mientras se escribe.
- `onSubmit` se llama con Enter o al elegir una sugerencia.
- Borrar vacía el campo; Retroceso con el campo vacío quita el último token.
- Los resultados más relevantes van primero y, si ayuda, agrupados por categoría (ver el patrón **Búsqueda y filtros**).

### Relacionados

`Toolbar` · `Combobox` · `Tag` · `SegmentedControl` · Búsqueda y filtros.

### Referencias

- Apple, Human Interface Guidelines: Search fields; Token fields.
- IBM, Carbon Design System: Search.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Campo | fondo | `search-bg` |
| Campo | borde (1 px) | `search-border` |
| Campo:focus | borde (2 px) | `search-border-focus` |
| Lupa y Borrar | relleno | `icon-02` |
| Texto | color | `text-01` |
| Texto de ejemplo | color | `text-03` |
| Token | fondo / texto | `search-token-bg` / `search-token-text` |
| Borrar y quitar token:focus | contorno | `focus` (2 px, separado 2 px) |
| Sugerencias | estilo | como el menú de `PopUpButton` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Texto | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Token | 12 / 0,75 | `font-weight-body` | — |
| Título de sugerencias | 11 / 0,6875 | `font-weight-body` | `web-label-s` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Buscador | ancho máximo | 480 px |
| Campo | relleno | 16 px al inicio, 8 px al final |
| Campo | radio | `radius-field` |
| Elementos | separación | 8 px |
| Texto | ancho mínimo | 120 px |
| Token | alto, radio | 28 px, `radius-tag` |
| Borrar y quitar token | área de toque | 44 × 44 px |
| Sugerencias | separación del campo | 8 px |

> **Imagen pendiente:** anatomía acotada.

### Tamaño

| Densidad | Alto del campo (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

### Contraste

Texto a 4,5:1 y borde a 3:1 sobre la página, en los cuatro temas.

## Código

### Uso

```js
const { SearchField } = window.AlmaDS;
h(SearchField, { label: 'Buscar viajes', placeholder: 'Buscar ciudades o terminales',
  onChange: setQuery, onSubmit: search,
  suggestions: recientes, suggestionsTitle: 'Recientes',
  scopes: ['Todo', 'Viajes', 'Terminales'], onScopeChange: setScope,
  tokens: filtros, onRemoveToken: quitarFiltro })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `placeholder` | `string` | — | Qué se puede buscar. |
| `label` | `string` | — | Nombre del campo para el lector. |
| `value` / `defaultValue` | `string` | `''` | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | En cada tecla. |
| `onSubmit` | `(value) => void` | — | Con Enter o al elegir una sugerencia. |
| `suggestions` / `suggestionsTitle` | `Array<string \| { label, icon }>` / `string` | — | Hasta 8. |
| `scopes` / `scope` / `defaultScope` / `onScopeChange` | — | — | La barra de alcance. |
| `tokens` / `onRemoveToken` | `string[]` / `(token) => void` | — | Filtros dentro del campo. |
| `id` | `string` | automático | — |

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es una región de búsqueda con un `combobox` y su lista de sugerencias.
- El campo se nombra con `label`.
- Borrar se llama «Borrar búsqueda» y cada token tiene su botón «Quitar filtro …».
- Sin `label`, el campo toma como nombre el texto de ejemplo.
- Borrar y quitar token tienen un área de toque de 44 px.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| ↓ / ↑ | Recorren las sugerencias. |
| Enter | Busca, o elige la sugerencia marcada. |
| Esc | Cierra las sugerencias; si ya están cerradas, borra el texto. |
| Retroceso (campo vacío) | Quita el último token. |

### Recomendaciones de diseño

- Dale siempre un `label`, aunque el texto de ejemplo diga lo mismo: el texto de ejemplo desaparece al escribir.
- Si hay dos buscadores en la página, dale a cada uno un nombre distinto.

### Consideraciones de desarrollo

- Anuncia la cantidad de resultados en una región `role="status"` («12 viajes»).

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
