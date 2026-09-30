# Pagination

Divide un conjunto grande de datos en páginas.


## Uso

### Resumen

`Pagination` parte un conjunto grande en páginas y dice qué parte se está viendo. Sigue la paginación de Carbon.

#### Cuándo usarla
- Cuando cargar todo tomaría mucho tiempo, o hay demasiados datos para una vista.
- Debajo de una `Table` o de una lista larga.

#### Cuándo no usarla
- **Para un flujo por pasos:** `ProgressIndicator` y botones.
- **Para un carrusel de pocas páginas:** `PageControl`.
- **Si todo cabe en una página:** no la muestres.

### Anatomía

1. **Elementos por página** (`PopUpButton`).
2. **Rango**: «21–40 de 1.284 movimientos».
3. **Página actual de total**: «Página 2 de 65».
4. **Anterior** y **siguiente**, desactivados en los extremos.

> **Imagen pendiente:** anatomía numerada, pegada bajo una tabla.

### Contenido

- `itemLabel`: el sustantivo en plural de lo que se cuenta («viajes», «movimientos»).
- Tamaños de página útiles, de menor a mayor; por defecto 10, 20 y 50.
- Los números usan el formato de Chile («1.284»).

### Comportamiento

- Cambiar el tamaño de página vuelve a la primera página.
- Anterior y siguiente se desactivan en la primera y en la última página.
- El rango se actualiza y se anuncia al cambiar de página.
- En pantallas angostas, los controles pasan a una segunda línea.

### Ubicación

Pegada debajo de la tabla, sin espacio entre ambas: pásala en `Table.footer`.

### Relacionados

`Table` · `PageControl` · `PopUpButton`.

### Referencias

- IBM, Carbon Design System: Pagination.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Barra | fondo | `pagination-bg` |
| Barra dentro de una tabla | borde superior (1 px) | `table-border` |
| Rango y «Página N de M» | color del texto | `text-02` |
| Anterior y siguiente | estilo | `Button` gray de ícono |
| Elementos por página | estilo | `PopUpButton` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Rango | 14 / 0,875 | Regular / 400 | `web-label-m` |
| Página N de M | 14 / 0,875 | Regular / 400 | `web-label-m` |

Cifras tabulares, para que el texto no salte al cambiar de página.

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Barra | relleno | 8 px arriba y abajo, 16 px a los lados |
| Grupos | separación | 8 px entre filas, 24 px entre columnas |
| Elementos por página | ancho mínimo | 96 px |
| Anterior y siguiente | separación | 8 px |
| Botones | tamaño | 44 px (`size-touch-min`) |

> **Imagen pendiente:** anatomía acotada.

### Contraste

Textos a 4,5:1 sobre `pagination-bg`; botones según `Button`. Verificado en los cuatro temas.

## Código

### Uso

```js
const { Pagination } = window.AlmaDS;
h(Pagination, { totalItems: 1284, itemLabel: 'movimientos',
  onChange: ({ page, pageSize }) => load(page, pageSize) })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `totalItems` | `number` | — | Cuántos elementos hay. |
| `pageSizes` | `number[]` | `[10, 20, 50]` | Opciones de elementos por página. |
| `pageSize` / `defaultPageSize` | `number` | el primero | Controlado o no controlado. |
| `page` / `defaultPage` | `number` | `1` | Controlado o no controlado. |
| `onChange` | `({ page, pageSize }) => void` | — | Al cambiar de página o de tamaño. |
| `itemLabel` | `string` | `'elementos'` | Sustantivo del rango. |
| `label` | `string` | `'Paginación'` | Nombre del `nav`. |

### Con una tabla

```js
h(Table, { columns, rows: pageRows, footer: h(Pagination, { totalItems, itemLabel: 'viajes', onChange: setPaging }) })
```

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es un `nav` nombrado «Paginación».
- El rango es una región `aria-live="polite"`: al cambiar de página, el lector dice «21–40 de 1.284 movimientos».
- Anterior y siguiente se llaman «Página anterior» y «Página siguiente», y se desactivan en los extremos.
- El selector de tamaño se llama «Elementos por página».

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre el selector y los botones. |
| Enter o Espacio | Activa el botón con foco. |

### Recomendaciones de diseño

- Usa un `itemLabel` que diga qué se cuenta.

### Consideraciones de desarrollo

- Al cambiar de página, no muevas el foco: la persona puede seguir pasando páginas. Si la tabla está arriba, lleva el scroll a su inicio.
- Si hay dos paginaciones en la página, dale a cada una un `label` distinto.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
