# EmptyState

Lo que se ve cuando una lista, una búsqueda o una sección no tiene contenido.


## Uso

### Resumen

`EmptyState` ocupa el lugar del contenido que no hay: dice qué falta, por qué y qué hacer. Sigue la guía de contenido de ALMA; los casos están en el patrón **Estados vacíos**.

#### Cuándo usarlo
- Primera vez, sin resultados, sin permiso o sin conexión.

#### Cuándo no usarlo
- **Mientras carga:** `Skeleton` o `ActivityIndicator`.
- **Una tabla vacía:** `emptyText` de `Table`.

### Anatomía

1. **Ícono** (opcional), 32 px.
2. **Título:** qué falta.
3. **Mensaje:** por qué, o qué se verá aquí.
4. **Acción principal** y, si hace falta, una **secundaria**.

> **Imagen pendiente:** «Aún no tienes viajes» con su acción «Buscar pasajes».

### Contenido

- **Título** en positivo si se puede: «Aún no tienes viajes».
- **Mensaje:** una oración.
- **Acción:** la única que lo resuelve: «Buscar pasajes».
- Sin ilustraciones decorativas; un ícono a lo sumo.

### Relacionados

`Table` · `SearchField` · Estados vacíos.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Ícono | relleno | `empty-state-icon` |
| Título | color del texto | `text-01` |
| Mensaje | color del texto | `text-02` |
| Acción principal / secundaria | estilo | `Button` filled / gray |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título | 20 / 1,25 | `font-weight-heading` | 1,4 |
| Mensaje | 14 / 0,875 | `font-weight-body` | 1,6 |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Estado vacío | ancho máximo | 420 px (26,25 rem), centrado |
| Estado vacío | relleno | 48 px arriba y abajo, 24 px a los lados |
| Elementos | separación | 8 px |
| Ícono | tamaño | 32 px (`icon-size-xl`) |
| Acciones | separación del texto | 16 px |

> **Imagen pendiente:** anatomía acotada.

### Contraste

Título y mensaje a 4,5:1; ícono a 3:1, en los cuatro temas.

## Código

### Uso

```js
const { EmptyState } = window.AlmaDS;
h(EmptyState, { icon: 'bus', title: 'Aún no tienes viajes', message: 'Aquí verás los pasajes que compres.',
  action: { label: 'Buscar pasajes', onClick: goSearch } })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | `string` | — | Qué falta. |
| `message` | `string` | — | Por qué. |
| `icon` | `string` | — | Ícono de Carbon. |
| `action` | `{ label, icon?, onClick }` | — | La acción principal. |
| `secondaryAction` | `{ label, onClick }` | — | Opcional. |
| `headingLevel` | `2 \| 3 \| 4` | `2` | Nivel del título. |
| `className` | `string` | — | — |

## Accesibilidad

### Qué ofrece ALMA

- El título es un encabezado (`h2` por defecto).
- El ícono es decorativo.
- Las acciones son botones.

### Recomendaciones de diseño

- El título solo debe bastar para entender la situación.

### Consideraciones de desarrollo

- Si el estado vacío aparece después de una búsqueda, anuncia el resultado («Sin resultados») en una región `role="status"`.
- Ajusta `headingLevel` a la jerarquía de la página.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
