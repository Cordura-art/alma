# PopUpButton

Un botón que abre una lista corta de opciones excluyentes y muestra la elegida.


## Uso

### Resumen

`PopUpButton` presenta una elección entre opciones mutuamente excluyentes sin ocupar espacio: el botón muestra la opción actual y, al abrirlo, aparece la lista. Es el «menú emergente» de Apple y el «dropdown» de Carbon.

#### Cuándo usarlo
- Elegir una opción que afecta el contenido o la vista: ordenar, moneda, idioma, cantidad por página.
- Cuando hay poco espacio o las opciones no necesitan verse todas a la vez.
- Hasta unas 7 opciones.

#### Cuándo no usarlo
- **Acciones** («Compartir», «Eliminar»): `PullDownButton`.
- **Varias opciones a la vez:** `Combobox` múltiple o `Checkbox`.
- **Muchas opciones** que la persona buscaría por nombre: `Combobox`.
- **2 a 5 opciones que conviene ver juntas:** `RadioGroup` o `SegmentedControl`.

### Anatomía

1. **Etiqueta** (opcional, recomendada): anticipa las opciones sin abrir el menú.
2. **Botón:** esquinas `radius-button`, con la opción actual y el ícono `chevron--sort`.
3. **Menú:** panel flotante con la lista.
4. **Opción elegida:** marcada con un check.
5. **Nota al pie** (opcional): explica algo de las opciones.

> **Imagen pendiente:** anatomía numerada con el menú abierto y la nota al pie.

### Contenido

- **Etiqueta:** el nombre de lo que se elige, corto («Ordenar por», «Moneda»).
- **Opciones:** una o dos palabras, en un orden con sentido (lógico, por frecuencia o alfabético), sin repetir la etiqueta en cada una.
- **Opción por defecto:** la que más gente quiere; nunca una vacía como «Seleccionar…».
- **Opción que pide más datos:** agrégala al final con puntos suspensivos («Personalizado…») y explica en la nota al pie.

### Comportamiento

| Estado | Qué cambia |
|---|---|
| Reposo | Borde `popup-border`. |
| Puntero encima | Borde `popup-border-hover`. |
| Abierto | Borde `popup-border-open`; el menú aparece debajo. |
| Foco | Anillo de foco en el botón; dentro del menú, en la opción. |
| Desactivado | Al 45 % de opacidad; no se abre. |

- Elegir cierra el menú, muestra la opción en el botón y devuelve el foco al botón.
- Un clic fuera o Esc cierran sin cambiar nada.
- Las opciones desactivadas se ven pero no se pueden elegir ni recorrer.

> **Imagen pendiente:** reposo, abierto con opción elegida, puntero sobre una opción y desactivado, en tema oscuro y claro.

### Relacionados

`PullDownButton` · `Combobox` · `SegmentedControl` · `RadioGroup`.

### Referencias

- Apple, Human Interface Guidelines: Pop-up buttons.
- IBM, Carbon Design System: Dropdown.

## Estilo

### Color

#### Botón

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta superior | color del texto | `text-02` |
| Botón | fondo | `popup-bg` |
| Botón | borde (1 px) | `popup-border` |
| Botón | color del texto | `text-01` |
| Ícono | relleno | `icon-02` |
| Botón:hover | borde | `popup-border-hover` |
| Botón abierto | borde | `popup-border-open` |
| Botón:focus | contorno | `focus` (2 px, separado 2 px) |
| Botón:disabled | opacidad | 45 % |

#### Menú

| Elemento | Propiedad | Token |
|---|---|---|
| Menú | fondo | `menu-bg` |
| Menú | borde | `menu-border` |
| Menú | sombra | `shadow-floating` |
| Opción | color del texto | `text-01` |
| Opción:hover y :focus | fondo | `menu-item-bg-hover` |
| Opción:focus-visible | borde (2 px, interior) | `focus` |
| Marca de la opción elegida | relleno | `icon-01` |
| Nota al pie | color del texto / separador | `text-02` / `menu-border` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta superior | 11 / 0,6875 | Regular / 400 | `web-label-s` |
| Valor del botón | 14 / 0,875 | Regular / 400 | `web-label-m` |
| Opción | 14 / 0,875 | Regular / 400 | `web-label-m` |
| Nota al pie | 11 / 0,6875 | Regular / 400 | `web-label-s` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Botón | ancho mínimo | 200 px |
| Botón | relleno | 16 px al inicio, 8 px al final |
| Botón | radio | `radius-button` |
| Ícono | tamaño | 20 px (`icon-size-md`) |
| Etiqueta superior | sangría | 16 px |
| Menú | separación del botón | 8 px |
| Menú | relleno, radio | 8 px, `radius-panel` |
| Menú | ancho | el del botón como mínimo, 320 px como máximo |
| Opción | alto mínimo, radio | 44 px, `radius-nav` |
| Opción | columna de la marca | 24 px |

> **Imagen pendiente:** anatomía acotada del botón y del menú abierto.

### Tamaño

| Densidad | Alto del botón y de las opciones (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

### Capas y movimiento

El menú flota en `z-dropdown` con `shadow-floating` y aparece con `duration-fast-02` + `easing-entrance-expressive`.

### Contraste

Texto a 4,5:1 (7:1 en alto contraste) y borde del botón a 3:1 en los cuatro temas, verificado con axe con el menú abierto.

## Código

### Uso

```js
const { PopUpButton } = window.AlmaDS;
h(PopUpButton, { label: 'Ordenar por', options: ['Salida más temprana', 'Precio más bajo', 'Duración'], defaultValue: 'Salida más temprana' })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Etiqueta superior; también da nombre a la lista. |
| `options` | `Array<string \| { value, label, disabled, icon }>` | — | Opciones excluyentes. |
| `value` / `defaultValue` | `string` | la primera opción | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | Recibe el valor elegido. |
| `help` | `string` | — | Nota al pie del menú. |
| `disabled` | `boolean` | `false` | — |
| `id` | `string` | automático | — |

### Ejemplo con opción personalizada

```js
h(PopUpButton, { label: 'Pasajeros', options: ['1', '2', '3', '4', 'Más de 4…'],
  help: 'Para más de 4 pasajeros te pediremos los datos de cada uno.' })
```

### Flutter

Tokens `popup*` y `menu*` en `dist/dart/alma_tokens.dart`. El widget llega en la fase 4.

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- El botón tiene `aria-haspopup="listbox"` y `aria-expanded`; su nombre combina la etiqueta y el valor actual.
- El menú es `role="listbox"`; cada opción es `role="option"` con `aria-selected` en la elegida y `aria-disabled` en las desactivadas.
- Al abrir, el foco entra a la opción elegida; al cerrar con Esc o al elegir, vuelve al botón.
- Un clic fuera cierra el menú.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Enter, Espacio, ↓ o ↑ (en el botón) | Abre el menú. |
| ↓ / ↑ | Recorre las opciones, saltando las desactivadas. |
| Inicio / Fin | Primera y última opción. |
| Enter o Espacio | Elige y cierra. |
| Esc | Cierra sin cambiar y devuelve el foco al botón. |
| Tab | Cierra el menú. |

### Recomendaciones de diseño

- Pon siempre la etiqueta: sin ella, el botón solo dice el valor y no qué se elige.
- La opción elegida se marca con check, no solo con color.

### Consideraciones de desarrollo

- No uses un `<select>` nativo al lado de este componente: mezclar los dos confunde el comportamiento.
- Si una opción cambia la vista, anuncia el cambio (por ejemplo, el nuevo orden de la lista).

### Verificación

axe sin problemas en los cuatro temas con el menú abierto; teclado probado. Pendiente: VoiceOver y NVDA.
