# Tag

Una etiqueta corta que clasifica, filtra o muestra un estado.


## Uso

### Resumen

`Tag` pone una palabra o dos sobre un color para clasificar algo, mostrar un filtro aplicado o prender y apagar un filtro. Es el *tag* de Carbon.

#### Cuándo usarla
- Mostrar una categoría o un estado: «Pagado», «Interurbano».
- Mostrar filtros aplicados que se pueden quitar.
- Ofrecer pocos filtros frecuentes que se prenden y apagan.

#### Cuándo no usarla
- **Para una acción:** `Button`.
- **Para un estado del sistema que exige atención:** `InlineNotification`.
- **Para navegar:** `Link`.

### Tipos

| Tipo | Propiedad | Uso |
|---|---|---|
| Solo lectura | — | Un estado o una categoría. |
| Se puede quitar | `onRemove` | Filtros aplicados; elecciones de un `Combobox` múltiple. |
| Seleccionable | `onClick` + `selected` | Filtros que se prenden y apagan. Al elegirla, muestra un check (en lugar de su ícono), un borde de 2 px y el texto en Medium. |

### Anatomía

1. **Contenedor** con esquinas `radius-tag` (hoy en píldora), con el color de la etiqueta.
2. **Ícono** (opcional).
3. **Texto.**
4. **Quitar** (opcional).

> **Imagen pendiente:** los tres tipos, y la paleta de 11 colores.

### Colores

Once colores de la paleta secundaria: `red`, `yellow`, `magenta`, `purple`, `blue`, `cyan`, `teal`, `green`, `warmgray`, `gray` (por defecto) y `coolgray`.

- El color agrupa; **la palabra informa**. «Pagado» en verde no dice más que «Pagado».
- Usa el mismo color para la misma categoría en toda la app.

### Tamaños

| Tamaño | Alto | Uso |
|---|---|---|
| Por defecto | 32 px | Junto a contenido. |
| `sm` | 24 px | Dentro de campos (`Combobox`). |

### Contenido

- Una o dos palabras, con mayúscula solo al inicio.
- Un texto largo se corta con puntos suspensivos: evítalo.

### Comportamiento

- Las seleccionables se agrupan en una fila, con 16 px entre filas para que sus áreas de toque no se pisen.
- Quitar una etiqueta la saca al instante; si el filtro era importante, ofrece deshacer.

### Relacionados

`Combobox` · `SearchField` · `SegmentedControl` · Búsqueda y filtros.

### Referencias

- IBM, Carbon Design System: Tag.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | fondo / texto | `tag-<color>-bg` / `tag-<color>-text` |
| Etiqueta desactivada | fondo / texto | `tag-disabled-bg` / `tag-disabled-text` |
| Quitar y seleccionable:hover | borde (1 px, por dentro) | el color del texto |
| Seleccionable elegida | borde (2 px, por dentro) | el color del texto |
| Seleccionable elegida | ícono | `checkmark`, 16 px, del color del texto |
| Quitar:focus | contorno | `focus` (2 px, separado 1 px) |
| Seleccionable:focus | contorno | `focus` (2 px, separado 2 px) |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Texto | 12 / 0,75 | Regular / 400 | — |
| Texto (`sm`) | 11 / 0,6875 | Regular / 400 | `web-label-s` |
| Texto (elegida) | 12 / 0,75 | Medium / 500 | — |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Etiqueta | alto mínimo | 32 px (24 px en `sm`) |
| Etiqueta | relleno lateral | 8 px |
| Etiqueta | radio | `radius-tag` |
| Ícono y texto | separación | 4 px |
| Quitar | tamaño / área de toque | 20 px / 32 px |
| Seleccionable | área de toque | 44 px de alto |

> **Imagen pendiente:** anatomía acotada de los tres tipos.

### Movimiento

El borde de la seleccionable cambia en `duration-fast-01`.

### Contraste

Texto a 4,5:1 sobre su fondo en los once colores (7:1 en alto contraste; el amarillo se corrigió para lograrlo).

## Código

### Uso

```js
const { Tag } = window.AlmaDS;
h(Tag, { color: 'green' }, 'Pagado')                                   // solo lectura
h(Tag, { onRemove: () => quitar('Semicama') }, 'Semicama')            // se puede quitar
h('div', { role: 'group', 'aria-label': 'Filtros' },                   // seleccionables
  h(Tag, { onClick: () => toggle('directo'), selected: directo }, 'Directo'))
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `children` | `node` | — | El texto. |
| `color` | `TagColor` | `'gray'` | Uno de los 11. |
| `size` | `'sm'` | — | 24 px. |
| `icon` | `string` | — | Ícono de Carbon. |
| `onRemove` | `(e) => void` | — | Muestra Quitar. |
| `removeLabel` | `string` | — | Nombre de Quitar si el texto no es una cadena. |
| `onClick` / `selected` | `(e) => void` / `boolean` | — | Seleccionable. |
| `disabled` | `boolean` | `false` | — |

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- La de solo lectura es texto.
- Quitar es un botón llamado «Quitar» más el texto de la etiqueta.
- La seleccionable es un botón con `aria-pressed`: el lector dice si está activada.
- La elegida se distingue por el check, el borde y el peso del texto, no solo por el color.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega a Quitar o a la seleccionable. |
| Enter o Espacio | Quita, o activa y desactiva. |

### Recomendaciones de diseño

- Agrupa las seleccionables en un `role="group"` con `aria-label` («Filtros»).
- No confíes en el color para dar significado.

### Consideraciones de desarrollo

- Al quitar una etiqueta con el teclado, lleva el foco a la siguiente, o al campo si era la última.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
