# TabBar

Una barra inferior para moverse entre las secciones principales de la app en el teléfono.


## Uso

### Resumen

`TabBar` muestra, abajo en el teléfono, de 3 a 5 secciones principales de la app, siempre a mano. Es la *tab bar* de Apple.

#### Cuándo usarla
- Para la navegación principal en el teléfono.

#### Cuándo no usarla
- **Para acciones:** `Toolbar`. La barra de pestañas solo navega.
- **Para cambiar de panel dentro de una vista:** `Tabs` o `SegmentedControl`.
- **Desde 1056 px (`bp-lg`):** `Sidebar` con los mismos destinos.

### Anatomía

1. **Barra** `ui-01` con borde superior.
2. **Ítem**: ícono y etiqueta.
3. **Ítem actual**: ícono relleno y color `nav-selected`.
4. **Insignia** (opcional): un número o «!» sobre el ícono.

> **Imagen pendiente:** anatomía numerada con cuatro ítems y una insignia, en el teléfono y en tablet.

### Reglas

- De 3 a 5 ítems, sin pestaña «Más».
- Siempre visible al cambiar de sección; solo un modal la tapa.
- Nunca ocultes ni desactives un ítem. Si una sección está vacía, explícalo dentro de la sección.
- La insignia solo para lo crítico: algo nuevo o pendiente.

### Contenido

- Etiquetas de **una palabra**, con sustantivo («Inicio», «Viajes», «Billetera»).
- Íconos conocidos; el actual se ve relleno.

### Comportamiento

| Ancho | Ítem |
|---|---|
| Menos de 672 px | Ícono arriba y etiqueta abajo, en 11 px. |
| Desde 672 px | Ícono y etiqueta en una fila, en 14 px. |

- Con `fixed`, queda pegada abajo y respeta el área segura del teléfono.
- Tocar el ítem actual no hace nada distinto: la sección sigue igual.

### Relacionados

`Sidebar` · `Toolbar` · `Tabs`.

### Referencias

- Apple, Human Interface Guidelines: Tab bars.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Barra | fondo | `tab-bar-bg` |
| Barra | borde superior (1 px) | `tab-bar-border` |
| Ítem | texto e ícono | `tab-bar-text` |
| Ítem actual | texto e ícono | `tab-bar-text-selected` |
| Insignia | fondo / texto | `badge-bg` / `badge-text` |
| Ítem:focus | contorno | `focus` (2 px, por dentro) |

`badge-bg` apunta al rojo de `button-destructive-fill` y `badge-text` a `text-on-pressed`.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta (menos de 672 px) | 11 / 0,6875 | Regular / 400 | `web-label-s` |
| Etiqueta (desde 672 px) | 14 / 0,875 | Regular / 400 | `web-label-m` |
| Insignia | 11 / 0,6875 | Medium / 500 | — |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Barra | relleno inferior | el área segura del teléfono |
| Lista | ancho máximo | 672 px, centrada |
| Lista | relleno lateral | 8 px |
| Ítem | ancho | repartido en partes iguales |
| Ítem | alto mínimo | 56 px |
| Ítem | radio | `radius-panel` |
| Ícono y etiqueta | separación | 2 px (apilados) · 8 px (en fila) |
| Insignia | alto, ancho mínimo | 18 px, 18 px; `radius-tag` |

> **Imagen pendiente:** anatomía acotada en el teléfono.

### Capas y movimiento

Con `fixed`, la barra está en `z-header`. El color de un ítem cambia en `duration-fast-01`.

### Contraste

Texto e íconos a 4,5:1 sobre `tab-bar-bg`; la insignia a 4,5:1, en los cuatro temas.

## Código

### Uso

```js
const { TabBar } = window.AlmaDS;
h(TabBar, { fixed: true, value: section, onChange: setSection, items: [
  { value: 'inicio', label: 'Inicio', icon: 'home', href: '#inicio' },
  { value: 'viajes', label: 'Viajes', icon: 'bus', href: '#viajes', badge: 2 },
  { value: 'billetera', label: 'Billetera', icon: 'wallet', href: '#billetera' },
  { value: 'cuenta', label: 'Cuenta', icon: 'user', href: '#cuenta' }] })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | `NavItem[]` | — | De 3 a 5: `{ value, label, icon, href?, badge? }`. |
| `value` / `defaultValue` | `string` | — | La sección actual. |
| `onChange` | `(value) => void` | — | Recibe la sección elegida. |
| `fixed` | `boolean` | `false` | Fija abajo, con el área segura. |
| `label` | `string` | `'Principal'` | Nombre del `nav`. |

`badge`: un número, o `true` para «!».

### Espacio bajo el contenido

Con `fixed`, la barra tapa el final de la página. Deja un relleno inferior de al menos 56 px más el área segura:

```css
main { padding-bottom: calc(56px + env(safe-area-inset-bottom, 0px)); }
```

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es un `nav` nombrado «Principal» (cámbialo con `label`); cada ítem es un enlace.
- El actual lleva `aria-current="page"` y se distingue por el ícono relleno, no solo por el color.
- La insignia se anuncia con la etiqueta: «Viajes, 2 nuevos» o «Viajes, requiere atención».
- Cada ítem mide al menos 56 px de alto.
- Las etiquetas largas pasan a otra línea, cortadas con guion, en vez de salirse del ítem.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre los ítems. |
| Enter | Abre la sección. |

### Recomendaciones de diseño

- No uses el mismo ícono para dos secciones.
- Una insignia sin número («!») debe explicarse dentro de la sección.

### Consideraciones de desarrollo

- Al cambiar de sección, lleva el foco al título de la sección nueva.
- Con `fixed`, deja espacio bajo el contenido para que la barra no tape el último control.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver en iPhone y TalkBack.
