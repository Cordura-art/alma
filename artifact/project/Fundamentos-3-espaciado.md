# Espaciado y grilla

La escala de 8, la grilla responsive, la densidad y las capas.


## Resumen

### Todo en múltiplos de 8

El espacio agrupa: con una separación normada no hacen falta divisores ni contenedores, porque lo que va junto se ve junto.

| Token | Valor | Uso típico |
|---|---|---|
| `space-2`, `space-4` | 2 y 4 px | Solo dentro de componentes compactos, como los campos. |
| `space-8` | 8 px | Entre un ícono y su texto; entre botones. |
| `space-16` | 16 px | Relleno de contenedores; margen de la página en el teléfono. |
| `space-24` | 24 px | Relleno de modales y alertas; entre grupos de un formulario. |
| `space-32` a `space-48` | 32 a 48 px | Entre secciones. |
| `space-56` a `space-80` | 56 a 80 px | Alrededor de titulares grandes. |

**Cuanto más grande el objeto, más espacio alrededor.** Los controles se separan con `space-8` a `space-24`; los titulares *display*, con `space-56` a `space-80`.

> **Imagen pendiente:** una tarjeta de viaje con las medidas de espacio rotuladas.

### Radios

| Token | Valor | Uso |
|---|---|---|
| `radius-chip` | 4 px | Etiquetas, casillas, contornos de foco pequeños. |
| `radius-swatch` | 8 px | Tarjetas de muestra de color. |
| `radius-panel` | 8 px | Contenedores: tarjetas, menús, modales, tablas. |
| `radius-card` | 8 px | Campos y marcos grandes. |
| `radius-pill` | 100 px | Botones, pestañas, destinos de navegación. |

### Tamaños de interacción

Todo control mide al menos `size-touch-min` (44 px), el mínimo de Apple, por encima de los 24 px de WCAG 2.2. Los íconos que se ven más chicos amplían su área de toque a 44 × 44.

## Grilla

### Grilla responsive

Mobile first: cada punto de quiebre aplica desde ese ancho hacia arriba. En el teléfono es la grilla de ALMA en Figma; desde tablet, el IBM 2x Grid.

| Punto de quiebre | Desde | Columnas | Margen | Separación |
|---|---|---|---|---|
| `bp-sm` | 320 px | 4, de 76 px | `grid-offset-mobile` 16 px | `grid-gutter-mobile` 8 px |
| `bp-md` | 672 px | 8 | `grid-margin` 16 px | `grid-gutter` 32 px |
| `bp-lg` | 1056 px | 16 | `grid-margin` 16 px | `grid-gutter` 32 px |
| `bp-xlg` | 1312 px | 16 | `grid-margin` 16 px | `grid-gutter` 32 px |
| `bp-max` | 1584 px | 16 | `grid-margin-max` 24 px | `grid-gutter` 32 px |

> **Imagen pendiente:** las columnas de la grilla sobre una pantalla en `bp-sm`, `bp-md` y `bp-lg`.

### Cómo usarla

- Alinea los bloques de contenido a las columnas; el texto de lectura, a un máximo de 48 rem aunque haya más columnas.
- `grid-gutter-condensed` (1 px) solo en mosaicos de imágenes y tablas de datos.
- Los componentes cambian de forma en los mismos cortes: `TabBar` en el teléfono y `Sidebar` desde `bp-lg`; `Sheet` abajo en el teléfono y centrada desde `bp-md`.

### Lo que cambia en cada corte

| Desde | Qué cambia en ALMA |
|---|---|
| 672 px (`bp-md`) | `Sheet` se centra; `TabBar` pone ícono y etiqueta en una fila; la `Toolbar` junta el buscador con el título. |
| 1056 px (`bp-lg`) | La navegación pasa de `TabBar` a `Sidebar`. |

## Densidad y capas

### Densidad

| Densidad | Controles | Campos | Filas de tabla |
|---|---|---|---|
| **Normal** (por defecto) | 44 px (`size-touch-min`) | 56 px (`size-field`) | 56 px (`size-row`) |
| **Compacta** | 32 px (`size-control-compact`) | 40 px (`size-field-compact`) | 40 px (`size-row-compact`) |

- Se activa con `data-density="compact"` en cualquier contenedor, y `data-density="normal"` vuelve a la normal dentro de una zona compacta.
- La compacta solo actúa con puntero fino (mouse o trackpad). En pantallas táctiles se ignora: todo sigue en 44 px.
- Úsala en herramientas de trabajo de escritorio con mucha información: tablas, paneles de administración, formularios largos. No en productos para el público ni en piezas de marca.
- Solo cambian altos y rellenos; el texto, los colores y el contraste no cambian.

> **Imagen pendiente:** la misma tabla en densidad normal y compacta.

### Capas

Las superficies se separan con color (ver **Color**). Lo que se apila sobre el contenido usa estas capas, por nombre:

| Token | Valor | Qué va |
|---|---|---|
| `z-hidden` | −1 | Detrás del contenido. |
| `z-footer` | 5000 | Pie fijo. |
| `z-floating`, `z-overlay` | 6000 | Tooltips, popovers, toasts. |
| `z-header` | 8000 | Barra superior fija, `TabBar` fija. |
| `z-modal` | 9000 | Modales, hojas y alertas. |
| `z-dropdown` | 9100 | Menús desplegables, también dentro de un modal. |

No inventes valores intermedios.

### Sombra

Solo `shadow-floating`, y solo en lo que flota sobre el contenido: menús, popovers, tooltips y toasts.

## Código

### CSS

```css
.tarjeta { padding: var(--space-16); border-radius: var(--radius-panel); background: var(--ui-01); }
.acciones { display: flex; gap: var(--space-8); }
.menu { z-index: var(--z-dropdown); box-shadow: var(--shadow-floating); }
```

Los puntos de quiebre no se pueden usar como variables dentro de `@media`: escribe su valor y nombra el token en un comentario.

```css
@media (min-width: 1056px) { /* bp-lg */ .app { grid-template-columns: auto 1fr; } }
```

### Densidad

```html
<section data-density="compact"> … </section>
```

### Flutter

```dart
Padding(padding: const EdgeInsets.all(AlmaSpacing.space16), child: …);
BorderRadius.circular(AlmaRadius.radiusPanel);
if (width >= AlmaBreakpoint.bpLg) { /* Sidebar */ }
```

`AlmaSpacing`, `AlmaRadius`, `AlmaBreakpoint`, `AlmaSize`, `AlmaGrid` y `AlmaShadow` están en `dist/dart/alma_tokens.dart`.
