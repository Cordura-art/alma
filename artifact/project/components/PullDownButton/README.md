# PullDownButton

Un botón que abre una lista de acciones relacionadas con algo.


## Uso

### Resumen

`PullDownButton` agrupa acciones sobre un elemento (una tarjeta, un archivo, un viaje) en un menú. A diferencia de `PopUpButton`, no guarda una elección: cada opción hace algo. Es el *pull-down button* de Apple y el *overflow menu* de Carbon.

#### Cuándo usarlo
- Para acciones secundarias de un elemento que no caben a la vista.
- Como el menú «Más» de una `Toolbar`.

#### Cuándo no usarlo
- **Para elegir una opción:** `PopUpButton`.
- **Para la acción principal:** un `Button` a la vista.
- **Con una sola acción:** un `Button`.

### Anatomía

1. **Botón**: con etiqueta, o solo con el ícono `overflow-menu--horizontal`.
2. **Menú** con las acciones.
3. **Acción destructiva** (opcional), en rojo, al final.

> **Imagen pendiente:** el menú de una tarjeta de pago con «Copiar número», «Congelar tarjeta» y «Eliminar tarjeta».

### Contenido

- Acciones que empiezan con verbo: «Copiar número», «Compartir viaje».
- Si una acción abre otra vista o pide datos, termina en «…»: «Cambiar nombre…».
- La destructiva va al final, con `role: 'destructive'`. Si no se puede deshacer, confirma con `Alert`.
- Ordena por uso, la más usada primero.

### Comportamiento

- Elegir una acción cierra el menú y la ejecuta.
- Esc, Tab o un clic fuera cierran sin hacer nada.

### Relacionados

`PopUpButton` · `Toolbar` · `Button` · `Alert`.

### Referencias

- Apple, Human Interface Guidelines: Pull-down buttons.
- IBM, Carbon Design System: Overflow menu.

## Estilo

### Color

El botón usa los tokens del botón de `PopUpButton` (`popup-*`); el menú, los de `menu-*`.

| Elemento | Propiedad | Token |
|---|---|---|
| Menú | fondo / borde / sombra | `menu-bg` / `menu-border` / `shadow-floating` |
| Acción | color del texto | `text-01` |
| Acción:hover y :focus | fondo | `menu-item-bg-hover` |
| Acción destructiva | color del texto | `menu-item-destructive-text` |
| Acción desactivada | opacidad | 45 % |
| Ícono de la acción | relleno | el color del texto |

Dentro de una `Toolbar` o un `Breadcrumb`, el botón no tiene borde y usa los colores de `Button` plain.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta del botón y acciones | 14 / 0,875 | Regular / 400 | `web-label-m` |

### Estructura

Igual al menú de `PopUpButton`: separado 8 px del botón, relleno de 8 px, radio `radius-panel`, acciones de 44 px de alto con `radius-nav`, columna de 24 px para el ícono.

> **Imagen pendiente:** anatomía acotada.

### Movimiento

El menú aparece en `duration-fast-02` con `easing-entrance-expressive`.

### Contraste

Acciones, incluida la destructiva, a 4,5:1 sobre `menu-bg`, en los cuatro temas.

## Código

### Uso

```js
const { PullDownButton } = window.AlmaDS;
h(PullDownButton, { icon: 'overflow-menu--horizontal', 'aria-label': 'Más acciones de la tarjeta',
  actions: [
    { value: 'copiar', label: 'Copiar número', icon: 'copy' },
    { value: 'congelar', label: 'Congelar tarjeta' },
    { value: 'eliminar', label: 'Eliminar tarjeta', role: 'destructive' }],
  onAction: handle })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Texto del botón. |
| `icon` | `string` | — | Ícono del botón. |
| `aria-label` | `string` | — | Obligatorio si solo tiene ícono. |
| `actions` | `Array<string \| { value, label, icon, disabled, role, onSelect }>` | — | Las acciones. |
| `onAction` | `(value) => void` | — | Recibe la acción elegida. |
| `disabled` | `boolean` | `false` | — |
| `id` | `string` | automático | — |

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- El botón tiene `aria-haspopup="menu"` y `aria-expanded`.
- El menú es `role="menu"` y cada acción `role="menuitem"`; las desactivadas, `aria-disabled`.
- Al abrir, el foco entra a la primera acción; al cerrar, vuelve al botón.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Enter, Espacio o ↓ (en el botón) | Abre el menú. |
| ↓ / ↑ | Recorren las acciones, en círculo, saltando las desactivadas. |
| Inicio / Fin | Primera y última acción. |
| Enter o Espacio | Ejecuta la acción. |
| Esc o Tab | Cierra el menú. |

### Recomendaciones de diseño

- Un botón de solo ícono necesita un nombre que diga de qué son las acciones («Más acciones de la tarjeta»), no solo «Más».
- La acción destructiva se reconoce por su verbo, no solo por el rojo.

### Verificación

axe sin problemas con el menú abierto, en los cuatro temas. Pendiente: VoiceOver y NVDA.
