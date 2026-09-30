# Table

Una tabla de filas y columnas para leer, ordenar y seleccionar datos.


## Uso

### Resumen

`Table` presenta datos del mismo tipo en filas y columnas, para compararlos, ordenarlos y elegir algunos. Sigue *Lists and tables* de Apple y la tabla de datos de Carbon.

#### Cuándo usarla
- Para comparar varios elementos por los mismos atributos (viajes por fecha, asiento y precio).
- Cuando la persona necesita ordenar, seleccionar varios o ir al detalle de uno.

#### Cuándo no usarla
- **Para una lista simple de destinos o ajustes:** `List`.
- **Para elementos con imagen o de tamaños muy distintos:** una cuadrícula de `Card` o `ProductCard`.
- **Para mostrar un solo elemento:** una lista de pares etiqueta y valor.

### Anatomía

1. **Título** y **descripción** (opcionales).
2. **Encabezado**: nombres de columna; algunos ordenan.
3. **Fila**, con una casilla si se puede seleccionar.
4. **Celda.**
5. **Pie**: normalmente una `Pagination`, pegada debajo.

> **Imagen pendiente:** anatomía numerada con selección, orden y paginación.

### Funciones

| Función | Propiedad | Qué hace |
|---|---|---|
| Ordenar | `sortable` en la columna | Un clic en el encabezado alterna ascendente → descendente → sin orden. |
| Seleccionar | `selectable` | Casilla en cada fila y una en el encabezado que marca todas (mixta si hay algunas). |
| Abrir el detalle | `onRowClick` | La fila entera abre su detalle; la fila actual (`activeRow`) queda marcada. |
| Recortar texto | `maxChars` en la columna | Recorta en el medio para conservar el principio y el final; el texto completo aparece al pasar el cursor. |
| Paginar | `footer` | Una `Pagination` pegada debajo. |

### Contenido

- **Encabezados:** sustantivo o frase nominal corta, con mayúscula solo al inicio y sin punto final.
- **Celdas:** texto breve para leer de un vistazo. Si una fila tiene mucho texto, muestra solo el título y abre el detalle.
- **Números:** alineados a la derecha (`align: 'end'`), con cifras del mismo ancho.
- **Tabla vacía:** `emptyText` dice por qué y qué hacer («Todavía no compras pasajes»).

### Densidad

| Filas | Alto | Uso |
|---|---|---|
| Normal | 56 px | Por defecto. |
| `dense` | 44 px | Muchas filas que comparar. |

El encabezado mide 44 px y queda fijo al desplazar la tabla.

### Relacionados

`List` · `Pagination` · `Checkbox` · `Skeleton`.

### Referencias

- Apple, Human Interface Guidelines: Lists and tables.
- IBM, Carbon Design System: Data table.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Contenedor | fondo | `table-bg` |
| Título | color del texto | `text-01` |
| Descripción | color del texto | `text-02` |
| Encabezado | color del texto / fondo | `table-header-text` / `table-bg` |
| Fila | borde inferior (1 px) | `table-border` |
| Fila:hover | fondo | `table-row-bg-hover` |
| Fila seleccionada o actual | fondo | `table-row-bg-selected` |
| Celda | color del texto | `text-01` |
| Tabla vacía | color del texto | `text-02` |
| Encabezado ordenable y fila:focus | contorno | `focus` (2 px, separado 2 px) |
| Zona de desplazamiento:focus | contorno | `focus` (2 px, por dentro) |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título | 16 / 1 | Medium / 500 | 1,5 |
| Descripción | 12 / 0,75 | Regular / 400 | 1,72 |
| Encabezado | 12 / 0,75 | Regular / 400 | — |
| Celda | 14 / 0,875 | Regular / 400 | — |

Los números usan cifras tabulares (`tabular-nums`).

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Contenedor | radio | `radius-panel` |
| Cabecera (título) | relleno | 16 px arriba y a los lados, 8 px abajo |
| Celda | relleno lateral | 16 px |
| Columna de selección | ancho | 44 px |
| Ícono de orden | tamaño | 16 px (`arrows--vertical`, `arrow--up`, `arrow--down`) |
| Tabla vacía | relleno | 32 px arriba y abajo |
| Última fila | borde | sin borde inferior |

> **Imagen pendiente:** anatomía acotada.

### Tamaño

| Densidad | Fila | Encabezado |
|---|---|---|
| Normal | 56 px (`size-row`) | 44 px |
| Normal + `dense` | 44 px | 44 px |
| Compacta (puntero fino) | 40 px (`size-row-compact`) | 32 px |

### Movimiento

El fondo de la fila cambia en `duration-fast-01` con `easing-standard-productive`.

### Contraste

Celdas a 4,5:1 sobre `table-bg` y sobre las filas seleccionada y con hover; bordes decorativos. Verificado en los cuatro temas.

## Código

### Uso

```js
const { Table, Pagination } = window.AlmaDS;
h(Table, { title: 'Mis viajes', description: 'Próximos pasajes comprados', selectable: true,
  defaultSort: { key: 'fecha', dir: 'asc' },
  columns: [
    { key: 'ruta', label: 'Ruta', sortable: true, maxChars: 30 },
    { key: 'fecha', label: 'Fecha', sortable: true, sortValue: r => r.iso },
    { key: 'precio', label: 'Precio', sortable: true, align: 'end', render: r => clp(r.precio), sortValue: r => r.precio }],
  rows,
  footer: h(Pagination, { totalItems: 48, itemLabel: 'viajes' }) })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `columns` | `TableColumn[]` | — | Ver abajo. |
| `rows` | `object[]` | — | Los datos. |
| `rowKey` | `string` | `'id'` | Campo que identifica la fila. |
| `title` / `description` | `string` | — | Cabecera visible. |
| `headingLevel` | `2–6` | `3` | Nivel del título en la página. |
| `caption` | `string` | — | Nombre de la tabla solo para el lector, si no hay título. |
| `selectable` | `boolean` | `false` | Casillas de selección. |
| `selected` / `defaultSelected` / `onSelectionChange` | `id[]` | — | La selección. |
| `defaultSort` / `onSortChange` | `{ key, dir } \| null` | — | El orden. |
| `onRowClick` / `activeRow` | `(row) => void` / `id` | — | Abrir el detalle y marcar la fila actual. |
| `dense` | `boolean` | `false` | Filas de 44 px. |
| `loading` | `boolean` | `false` | Marca la tabla como ocupada para el lector. |
| `emptyText` | `string` | — | Texto cuando no hay filas. |
| `footer` | `node` | — | Normalmente una `Pagination`. |

`TableColumn`: `{ key, label, sortable?, sortValue?, align?: 'start' | 'end', render?, maxChars? }`.

### Mientras carga

`loading` solo marca la tabla como ocupada (`aria-busy`); no dibuja nada. Pasa filas de `Skeleton` mientras llegan los datos:

```js
h(Table, { columns, loading: true, rows: [1, 2, 3].map(id => ({ id, ruta: h(Skeleton, { width: '60%' }) })) })
```

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es una `<table>` real, con encabezados `scope="col"`: el lector anuncia la columna de cada celda.
- Las columnas ordenables son botones y anuncian su orden con `aria-sort` (ascendente, descendente o ninguno).
- Las casillas se llaman «Seleccionar» más el valor de la primera columna («Seleccionar Santiago → Rancagua»); la del encabezado queda mixta si hay algunas marcadas.
- Con `onRowClick`, la primera celda es un botón: la fila se abre con el teclado, no solo con el clic.
- El texto recortado conserva el completo en su tooltip nativo.
- La zona que se desplaza hacia el lado recibe foco, para moverla con las flechas.
- Con `loading`, la tabla queda marcada como ocupada (`aria-busy`).

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre los encabezados ordenables, las casillas y los botones de fila. |
| Enter o Espacio (en un encabezado) | Cambia el orden. |
| Espacio (en una casilla) | Marca o desmarca la fila. |
| Enter (en la primera celda) | Abre el detalle. |
| ← / → (en la zona desplazable) | Desplaza la tabla hacia el lado. |

### Recomendaciones de diseño

- Dale un nombre a toda tabla: `title` o, si no hay título visible, `caption`.
- La fila seleccionada se distingue por la casilla, no solo por el fondo.

### Consideraciones de desarrollo

- Usa `rowKey` con un id estable: la selección y la fila actual dependen de él.
- Si ordenas en el servidor, usa `onSortChange` y pasa las filas ya ordenadas.

### Verificación

axe sin problemas en los cuatro temas; orden, selección y teclado probados. Pendiente: VoiceOver y NVDA.
