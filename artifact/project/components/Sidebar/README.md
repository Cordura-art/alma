# Sidebar

Una barra lateral para moverse entre las áreas de la app en tablet y escritorio.


## Uso

### Resumen

`Sidebar` lista los destinos principales de la app al costado de la pantalla, agrupados, con el actual marcado. Es la *sidebar* de Apple y la navegación lateral del UI shell de Carbon.

#### Cuándo usarla
- Para navegar entre áreas de la app en tablet y escritorio (desde 1056 px, `bp-lg`).
- Cuando hay más destinos de los que caben en una `TabBar`, o conviene agruparlos.

#### Cuándo no usarla
- **En el teléfono:** `TabBar` con los mismos destinos principales.
- **Para cambiar de vista dentro de una página:** `Tabs` o `SegmentedControl`.
- **Para acciones:** `Toolbar`.

### Anatomía

1. **Botón mostrar/ocultar** (`side-panel--close` / `side-panel--open`).
2. **Panel** `ui-01` con esquinas redondeadas.
3. **Título de grupo**, desplegable.
4. **Destino**: ícono y etiqueta.
5. **Destino actual**: fondo `selected-ui`, color `nav-selected` e ícono relleno.
6. **Contador** (opcional).

![Anatomía de Sidebar con tres grupos, uno plegado. Numerados: botón mostrar u ocultar (1), panel (2), título de grupo (3), destino (4), destino actual (5) y contador (6).](assets/Componentes/sidebar-anatomia.png)

### Estructura

- Como máximo **dos niveles**: grupos y sus destinos. Si la jerarquía es más profunda, agrega una lista intermedia entre la barra y el detalle.
- Títulos de grupo breves y descriptivos; un grupo sin título va primero.
- Visible por defecto, para que se descubra. Se puede ocultar con su botón.
- Si es posible, deja que cada persona elija y ordene sus destinos.

### Contenido

- Etiquetas cortas, con sustantivo: el nombre del área («Viajes», «Billetera»).
- Íconos conocidos, uno por destino.
- El contador solo para algo nuevo o pendiente, no para totales.

### Comportamiento

- Un clic en un destino navega; el destino queda marcado.
- Un clic en el título del grupo lo pliega o lo despliega.
- Con poco espacio (bajo 1056 px), reemplázala por `TabBar`: los destinos no cambian, solo su forma.

### Relacionados

`TabBar` · `Toolbar` · `Tabs` · `Breadcrumb`.

### Referencias

- Apple, Human Interface Guidelines: Sidebars.
- IBM, Carbon Design System: UI shell (left panel).

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Panel | fondo | `sidebar-bg` |
| Título de grupo | color del texto | `text-02` |
| Destino | color del texto | `text-01` |
| Ícono del destino | relleno | `icon-02` |
| Destino:hover | fondo | `sidebar-item-bg-hover` |
| Destino actual | fondo | `sidebar-item-bg-selected` |
| Destino actual | texto e ícono | `sidebar-item-text-selected` |
| Contador | color del texto | `text-02` |
| Destino y título:focus | contorno | `focus` (2 px, por dentro) |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Título de grupo (mayúsculas) | 11 / 0,6875 | `font-weight-body` | `web-label-s` |
| Destino | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Contador | 11 / 0,6875 | `font-weight-body` | `web-label-s` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Panel | ancho | 280 px (17,5 rem) |
| Panel | relleno, radio | 8 px, `radius-panel` |
| Grupos | separación | 16 px |
| Título de grupo | alto mínimo | 36 px |
| Destino | relleno lateral | 16 px |
| Destino | radio | `radius-nav` |
| Destinos | separación | 4 px (`space-4`): el fondo del elegido y el de hover no se juntan |
| Ícono y etiqueta | separación | 16 px |
| Botón y panel | separación | 8 px |

Una etiqueta que no cabe se corta con puntos suspensivos.

![Medidas de Sidebar: ancho de 280 px, relleno del panel, alto de los destinos, separación entre grupos y entre destinos, y radio.](assets/Componentes/sidebar-medidas.png)

### Tamaño

| Densidad | Alto del destino (px / rem) |
|---|---|
| Normal | 44 / 2,75 |
| Compacta (puntero fino) | 32 / 2 |

### Movimiento

El panel aparece bajando 4 px en `duration-moderate-01` con `easing-entrance-productive`; el fondo de un destino cambia en `duration-fast-01`. Con movimiento reducido, sin animación.

### Contraste

Textos a 4,5:1 sobre `sidebar-bg` y sobre `selected-ui` (7:1 en alto contraste), en los cuatro temas.

## Código

### Uso

```js
const { Sidebar } = window.AlmaDS;
h(Sidebar, { label: 'Secciones', value: area, onChange: setArea, groups: [
  { items: [{ value: 'inicio', label: 'Inicio', icon: 'home' }, { value: 'viajes', label: 'Viajes', icon: 'bus', badge: 3 }] },
  { title: 'Cuenta', items: [{ value: 'ajustes', label: 'Ajustes', icon: 'settings' }] }] })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `groups` | `Array<{ title?, items: NavItem[] }>` | — | Grupos y destinos. |
| `value` / `defaultValue` | `string` | — | El destino actual. |
| `onChange` | `(value) => void` | — | Recibe el destino elegido. |
| `hidden` / `defaultHidden` | `boolean` | `false` | Muestra u oculta el panel. |
| `onHiddenChange` | `(hidden) => void` | — | Al mostrar u ocultar. |
| `label` | `string` | `'Secciones'` | Nombre del `nav`. |

Cada `NavItem` es `{ value, label, icon, href?, badge? }`. Con `href`, el destino es un enlace real y el navegador sigue la dirección; sin él, solo llama a `onChange`.

### Con rutas

```js
{ value: 'viajes', label: 'Viajes', icon: 'bus', href: '#viajes' }
```

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es un `nav` nombrado por `label`.
- Cada destino es un enlace; el actual lleva `aria-current="page"`.
- Cada título de grupo es un botón con `aria-expanded`.
- El botón mostrar/ocultar dice lo que hará: «Ocultar barra lateral» o «Mostrar barra lateral».
- Con contador, el destino se anuncia con él: «Viajes, 3 nuevos».
- El destino actual se distingue por el fondo y el ícono relleno, no solo por el color del texto.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre el botón, los títulos de grupo y los destinos. |
| Enter | Abre el destino. |
| Enter o Espacio (en un título) | Pliega o despliega el grupo. |

### Recomendaciones de diseño

- Si hay otro `nav` en la página, dale a cada uno un `label` distinto.
- Cada destino mide al menos 44 px de alto.

### Consideraciones de desarrollo

- Al navegar, mueve el foco al título de la página nueva, no lo dejes en la barra.
- En el teléfono, si la muestras, ocúltala al elegir un destino.

### Verificación

axe sin problemas en los cuatro temas; teclado probado en el sitio de documentación, que usa esta barra. Pendiente: VoiceOver y NVDA.
