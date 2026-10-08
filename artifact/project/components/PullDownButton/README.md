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
- **Con una o dos acciones:** botones. Abrir un menú vale la pena desde tres.
- **Para todas las acciones de una pantalla.** Las principales van a la vista; el menú es para el resto.

### Anatomía

1. **Botón**: con etiqueta, o solo con el ícono `overflow-menu--horizontal`.
2. **Menú** con las acciones.
3. **Acción destructiva** (opcional), en rojo, al final.

![PullDownButton abierto en una tarjeta de pago, con las acciones «Copiar número», «Congelar tarjeta» y, separada en rojo, «Eliminar tarjeta».](assets/Componentes/pull-down-button-menu.png)

### Contenido

- Acciones que empiezan con verbo: «Copiar número», «Compartir viaje».
- Si una acción abre otra vista o pide datos, termina en «…»: «Cambiar nombre…».
- La destructiva va al final, separada, con `role: 'destructive'`. Si no se puede deshacer, confirma con un `ActionSheet`: aparece en otro lugar y hay que cerrarlo a propósito, y eso evita un borrado por error.
- Ordena por uso, la más usada primero.
- Las reglas de nombres, íconos y orden están en el patrón **Menús**.

### Grupos, submenús e ítems que se marcan

![Un PullDownButton «Ver» abierto, con el título «Mis viajes». El ítem «Ordenar por» tiene una flecha y su submenú abierto al lado, con «Fecha» marcada. Debajo, «Solo los pagados» con un visto, un separador y «Actualizar» con su atajo Ctrl+R a la derecha.](assets/Componentes/pull-down-button-submenu.png)

- **Grupos:** un separador (`'-'`) entre grupos de acciones relacionadas.
- **Submenú:** un ítem con `items` abre una lista menor. Un solo nivel, hasta unos cinco ítems.
- **Ítems que se marcan:** con `checked`, el ítem lleva un visto cuando está en efecto. Sirve para elegir varios a la vez, que `PopUpButton` no permite.
- **Atajos:** `shortcut` muestra el atajo a la derecha. Mostrarlo no lo activa: eso es de la app.
- **Título:** `title`, solo si agrega algo que el botón no dice.

### Comportamiento

- Elegir una acción cierra el menú y la ejecuta.
- Esc, Tab o un clic fuera cierran sin hacer nada.

### Relacionados

`PopUpButton` · `ContextMenu` · `ActionSheet` · `Toolbar` · `Button` · Menús.

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
| Etiqueta del botón y acciones | 14 / 0,875 | `font-weight-body` | `web-label-m` |

### Estructura

Igual al menú de `PopUpButton`: separado 8 px del botón, relleno de 8 px, radio `radius-panel`, acciones de 44 px de alto con `radius-nav` y separadas 4 px, ícono de 16 px (`icon-size-sm`) separado 16 px del texto y relleno lateral de 16 px, como en `Sidebar`.

![Medidas de PullDownButton: botón de 44 px, separación de 8 px con el menú, relleno del menú y alto de las acciones.](assets/Componentes/pull-down-button-medidas.png)

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
| `actions` | lista de ítems | — | Las acciones. Ver «Los ítems». |
| `title` | `string` | — | Un título dentro del menú. |
| `shortcuts` | `boolean` | `true` | Con `false`, no muestra los atajos. |
| `onAction` | `(value) => void` | — | Recibe la acción elegida. |
| `disabled` | `boolean` | `false` | — |
| `id` | `string` | automático | — |

### Los ítems

Un ítem es un texto, `'-'` para un separador, `{ title }` para el rótulo de un grupo, o un objeto:

| Campo | Tipo | Uso |
|---|---|---|
| `value`, `label` | `string` | El valor que recibe `onAction` y lo que se lee. |
| `icon` | `string` | Un ícono. Todos los de un grupo, o ninguno. |
| `role` | `'destructive'` | En rojo. Va al final. |
| `disabled` | `boolean` | Apagado: se ve, no responde. |
| `checked` | `boolean` | Un visto delante cuando es `true`. Con `radio: true`, es uno entre varios. |
| `shortcut` | `string` | El atajo, a la derecha: «Ctrl+R». |
| `items` | lista de ítems | Un submenú, de un nivel. |
| `onSelect` | `() => void` | Se llama al elegirlo, además de `onAction`. |

```js
h(PullDownButton, { label: 'Ver', onAction: handle, actions: [
  { value: 'orden', label: 'Ordenar por', items: [
    { value: 'fecha', label: 'Fecha', checked: orden === 'fecha', radio: true },
    { value: 'precio', label: 'Precio', checked: orden === 'precio', radio: true }] },
  { value: 'pagados', label: 'Solo los pagados', checked: soloPagados },
  '-',
  { value: 'actualizar', label: 'Actualizar', shortcut: 'Ctrl+R' }] })
```

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- El botón tiene `aria-haspopup="menu"` y `aria-expanded`.
- El menú es `role="menu"` y cada acción `role="menuitem"`; las desactivadas, `aria-disabled`.
- Un ítem que se marca es `menuitemcheckbox` o `menuitemradio`, y dice si está marcado.
- Un ítem con submenú dice que lo tiene y si está abierto.
- El menú no se sale de la pantalla: se abre hacia arriba o se alinea al otro lado.
- Al abrir, el foco entra a la primera acción; al cerrar, vuelve al botón.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Enter, Espacio o ↓ (en el botón) | Abre el menú. |
| ↓ / ↑ | Recorren las acciones, en círculo, saltando las desactivadas. |
| Inicio / Fin | Primera y última acción. |
| → / ← | Abre el submenú; lo cierra y vuelve a su ítem. |
| Una letra | Va a la siguiente acción que empieza con ella. |
| Enter o Espacio | Ejecuta la acción. |
| Esc o Tab | Cierra el menú. |

### Recomendaciones de diseño

- Un botón de solo ícono necesita un nombre que diga de qué son las acciones («Más acciones de la tarjeta»), no solo «Más».
- La acción destructiva se reconoce por su verbo, no solo por el rojo.

### Verificación

axe sin problemas con el menú abierto, en los cuatro temas. Pendiente: VoiceOver y NVDA.
