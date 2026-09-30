# Combobox

Un campo para elegir una o varias opciones de una lista larga escribiendo para filtrar.


## Uso

### Resumen

`Combobox` combina un campo de texto con una lista. Al escribir, la lista se filtra; con las flechas se recorre y con Enter se elige. En modo múltiple, cada elección queda como una etiqueta dentro del campo.

#### Cuándo usarlo
- Listas largas (más de unas 7 opciones) que la persona conoce por su nombre: ciudades, terminales, países, bancos.
- Para elegir varias opciones de una lista larga (`multiple`).

#### Cuándo no usarlo
- 2 a 5 opciones visibles: `RadioGroup` o `SegmentedControl`.
- Hasta unas 7 opciones sin necesidad de escribir: `PopUpButton`.
- Texto libre sin lista: `TextInput`.
- Buscar contenido: `SearchField`.

### Variantes

| Variante | Cuándo |
|---|---|
| Simple | Una opción: el campo muestra la elegida. |
| Múltiple (`multiple`) | Varias opciones: se muestran como `Tag` dentro del campo. |

### Anatomía

1. **Campo:** el de `TextInput`, con su etiqueta flotante.
2. **Etiquetas** (múltiple): una por opción elegida, con su botón para quitar.
3. **Texto de búsqueda.**
4. **Botón de la lista:** chevron para abrir o cerrar.
5. **Lista:** panel flotante con las opciones que coinciden; en múltiple, cada una con casilla.
6. **Sin resultados:** mensaje cuando nada coincide.
7. **Ayuda** o error bajo el campo.

> **Imagen pendiente:** anatomía numerada del modo simple con la lista abierta y del modo múltiple con tres etiquetas.

### Tamaño

- Alto del campo: 56 px (40 px compacto); en múltiple crece si las etiquetas ocupan más de una línea.
- Ancho por defecto 20 rem. La lista ocupa el ancho del campo y muestra hasta 16 rem de alto; más opciones se desplazan.

### Contenido

- **Etiqueta:** lo que se elige («Destino», «Paradas de interés»).
- **Opciones:** nombres que la persona reconoce, en el orden en que los buscaría (alfabético para lugares, por frecuencia para lo reciente).
- **Sin resultados:** di qué se buscó y qué probar: «Sin resultados para «Valpo». Prueba con el nombre completo.»
- **Ayuda:** cómo encontrar lo que se busca («Escribe al menos 2 letras»).

### Comportamiento

#### Filtrado
- Coincide en cualquier parte del nombre, sin importar tildes ni mayúsculas («vina» encuentra «Viña del Mar»).
- En simple, si la persona sale sin elegir, el campo vuelve a mostrar la opción elegida antes.

#### Selección
- Simple: elegir cierra la lista y muestra la opción en el campo.
- Múltiple: elegir marca la casilla, agrega la etiqueta y deja la lista abierta para seguir. Quitar: el ✕ de la etiqueta o Retroceso con el campo vacío.

#### Estados

| Estado | Qué cambia |
|---|---|
| Reposo, foco, error, desactivado | Como `TextInput`. |
| Lista abierta | Panel flotante bajo el campo; chevron hacia arriba. |
| Opción activa | Fondo y borde de foco, sin mover el foco del campo. |
| Sin resultados | Mensaje en lugar de la lista. |

> **Imagen pendiente:** los estados de la lista (abierta, filtrada, opción activa, sin resultados) en tema oscuro y claro.

### Relacionados

`PopUpButton` · `RadioGroup` · `SearchField` · `Tag` · `TextInput`.

### Referencias

- WAI-ARIA Authoring Practices: Combobox (lista con autocompletado).
- Apple, Human Interface Guidelines: Combo boxes.
- IBM, Carbon Design System: Dropdown y Combo box.

## Estilo

### Color

#### Campo

| Elemento | Propiedad | Token |
|---|---|---|
| Contenedor | borde (1 px) | `field-border` |
| Contenedor | fondo | transparente |
| Contenedor:hover | borde | `field-border-hover` |
| Contenedor:focus | borde (2 px) | `field-border` |
| Contenedor:active | borde | `field-border-active` |
| Contenedor:error | borde | `field-border-error` |
| Contenedor:disabled | borde | `field-border-disabled` |
| Etiqueta | color del texto | `field-label` |
| Etiqueta flotante | fondo | `field-label-float-bg` |
| Etiqueta flotante | color del texto | `field-label-float-text` |
| Etiqueta:error | color del texto | `field-text-error` |
| Etiqueta flotante:error | color del texto | `field-label-float-error` |
| Texto escrito | color | `field-text` |
| Texto escrito:error | color | `field-text-error` |
| Texto de ejemplo | color | `field-placeholder` |
| Etiqueta, texto e ícono:disabled | color | `field-text-disabled` |
| Ayuda y contador | color | `text-01` |
| Botón de la lista | relleno | `field-icon` |

#### Lista

| Elemento | Propiedad | Token |
|---|---|---|
| Menú | fondo | `menu-bg` |
| Menú | borde | `menu-border` |
| Menú | sombra | `shadow-floating` |
| Opción | color del texto | `text-01` |
| Opción:hover | fondo | `menu-item-bg-hover` |
| Opción activa (teclado) | fondo | `hover-ui` |
| Opción activa (teclado) | borde (2 px, interior) | `focus` |
| Marca de selección | relleno | `icon-01` |
| Casilla (múltiple) | relleno | `icon-01` (ícono `checkbox` / `checkbox--checked--filled`) |
| Sin resultados | color del texto | `text-02` |

#### Etiquetas (múltiple)

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | fondo / texto | `tag-blue-bg` / `tag-blue-text` (o el color de `tagColor`) |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta del campo y texto | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Opción | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Etiqueta (`Tag` pequeña) | 11 / 0,6875 | `font-weight-body` | `web-label-s` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Campo múltiple | relleno vertical | 8 px (`space-8`) |
| Campo múltiple | separación entre filas de etiquetas | 4 px (`space-4`) |
| Botón de la lista | ícono / área de toque | 20 px / 44 × 44 px |
| Lista | separación del campo | 8 px |
| Lista | relleno y radio | 8 px, `radius-panel` |
| Lista | alto máximo | 16 rem, con desplazamiento |
| Opción | alto mínimo, radio | 44 px (`size-touch-min`), `radius-nav` |
| Opciones | separación | 4 px (`space-4`) |
| Etiqueta | alto | 24 px |

> **Imagen pendiente:** anatomía acotada del campo múltiple con la lista abierta.

### Tamaño y capas

Campo de 56 px (40 px compacto) y 20 rem de ancho. La lista flota en `z-dropdown`.

### Movimiento

La lista aparece con `duration-fast-02` y `easing-entrance-expressive` (la receta contextual de IBM).

### Contraste

Mismos resultados que `TextInput` para el campo; opciones y etiquetas a 4,5:1 (7:1 en alto contraste) en los cuatro temas, verificados con axe con la lista abierta.

## Código

### Uso

```js
const { Combobox } = window.AlmaDS;
h(Combobox, { label: 'Destino', options: ['Santiago', 'Valparaíso', 'Viña del Mar'], defaultValue: 'Viña del Mar' })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Etiqueta visible. |
| `options` | `Array<string \| { value, label, disabled }>` | — | Opciones. |
| `multiple` | `boolean` | `false` | Varias opciones. |
| `value` / `defaultValue` | valor o arreglo | `null` o `[]` | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | Recibe el valor (o el arreglo). |
| `placeholder`, `helper`, `error` | — | — | Como `TextInput`. |
| `emptyText` | `string` | «Sin resultados para «…»» | Mensaje sin coincidencias. |
| `tagColor` | color de `Tag` | `'blue'` | Color de las etiquetas en múltiple. |
| `required`, `disabled`, `name`, `id` | — | — | — |

### Ejemplos

**Múltiple**

```js
h(Combobox, { label: 'Paradas de interés', multiple: true, options: cities, value: stops, onChange: setStops })
```

**Opciones con valor distinto del texto**

```js
h(Combobox, { label: 'Banco', options: [{ value: 'bch', label: 'Banco de Chile' }, { value: 'bst', label: 'Banco Santander' }] })
```

### Flutter

Tokens compartidos en `dist/dart/alma_tokens.dart`. El widget llega en la fase 4.

## Accesibilidad

### Qué ofrece ALMA

Sigue el patrón «combobox con lista y autocompletado» de las prácticas de autoría de WAI-ARIA.

#### Comportamiento
- El campo es `role="combobox"` con `aria-expanded`, `aria-controls` y `aria-activedescendant`: el foco se queda en el campo mientras las flechas recorren la lista.
- La lista es `role="listbox"`; en múltiple, `aria-multiselectable`. Cada opción anuncia si está elegida (`aria-selected`).
- «Sin resultados» se anuncia como estado (`role="status"`).
- El botón de la lista queda fuera del orden de Tab (el teclado usa las flechas) y tiene nombre («Mostrar opciones» / «Ocultar opciones»).
- Cada etiqueta en múltiple tiene un botón «Quitar …» con área de toque de 32 px.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Escribir | Filtra y abre la lista. |
| ↓ / ↑ | Abre la lista y recorre las opciones. |
| Enter | Elige la opción activa. |
| Esc | Cierra la lista; con la lista cerrada, borra lo escrito. |
| Retroceso (múltiple, campo vacío) | Quita la última elección. |
| Tab | Cierra la lista y sale. |

### Recomendaciones de diseño

- La etiqueta dice qué se elige; la ayuda, cómo buscar.
- El mensaje sin resultados propone qué hacer.
- En múltiple, si puede haber muchas elecciones, muéstralas también fuera del campo (por ejemplo, en una lista resumen).

### Consideraciones de desarrollo

- Si cargas opciones desde un servidor, anuncia la carga y el resultado con el mismo estado.
- No cambies el foco a la lista: el patrón mantiene el foco en el campo.

### Verificación

axe sin problemas en los cuatro temas con la lista abierta; recorrido completo con teclado probado. Pendiente: VoiceOver y NVDA.
