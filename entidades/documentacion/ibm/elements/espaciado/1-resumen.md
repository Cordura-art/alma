---
element: Espaciado y grilla
order: 3
tab: Resumen
summary: La escala de 8, la grilla responsive, la densidad y nuestros ángulos rectos.
---

## Todo en múltiplos de 8

El espacio agrupa: con una separación consistente no hacen falta divisores ni cajas, porque lo que va junto se ve junto.

| Token | Valor | Uso típico |
|---|---|---|
| `space-2`, `space-4` | 2 y 4 px | Solo dentro de componentes compactos, como los campos. |
| `space-8` | 8 px | Entre un ícono y su texto; entre botones. |
| `space-16` | 16 px | Relleno de contenedores; margen de la página en el teléfono. |
| `space-24` | 24 px | Relleno de modales y alertas; entre grupos de un formulario. |
| `space-32` a `space-48` | 32 a 48 px | Entre secciones. |
| `space-56` a `space-80` | 56 a 80 px | Alrededor de titulares grandes. |

**Cuanto más grande el objeto, más espacio alrededor.** Los controles se separan con `space-8` a `space-24`; los titulares *display*, con `space-56` a `space-80`.

![Una tarjeta de viaje con sus medidas de espacio rotuladas: el relleno de la tarjeta, la separación entre textos y la separación entre botones, con sus tokens space-*.](assets/Fundamentos/espaciado-tarjeta.png)

## Radios

Nuestros ángulos son rectos. Hacen visible la alineación: cuando algo se sale de la grilla, se nota de inmediato. Hay un token de radio por familia de elementos, y todos valen lo mismo salvo dos.

| Token | Valor | Uso |
|---|---|---|
| `radius-button` | {token:radius-button} | Botones: `Button`, `IconButton`, `Stepper`, `PopUpButton`, `SegmentedControl`. |
| `radius-field` | {token:radius-field} | Campos: `TextInput`, `Textarea`, `SearchField`, campo del `Slider`. |
| `radius-nav` | {token:radius-nav} | Navegación: `Tabs`, `Sidebar`, opciones de menú, `Breadcrumb`. |
| `radius-tag` | {token:radius-tag} | `Tag`, fichas del buscador, insignias, archivos de `FileUploader`. |
| `radius-panel` | {token:radius-panel} | Contenedores: tarjetas, menús, modales, tablas. |
| `radius-card` | {token:radius-card} | Marcos de documentación y tarjetas grandes. |
| `radius-swatch` | {token:radius-swatch} | Tarjetas de muestra de color. |
| `radius-chip` | {token:radius-chip} | Etiquetas flotantes de campo, globos de ayuda, contornos de foco pequeños. |
| `radius-checkbox` | {token:radius-checkbox} | La casilla de `Checkbox`. Conserva su radio para seguir leyéndose como control. |
| `radius-pill` | {token:radius-pill} | Formas siempre redondas: `Switch`, barra de progreso, días del calendario. Es el valor de ALMA: no cambia con la entidad. |

Evita suavizar una esquina «para que se vea amable». Nunca uses una sombra para separar: usa espacio o una línea de 1 px.

## Tamaños de interacción

Todo control mide al menos `size-touch-min` (44 px), por encima de los 24 px de WCAG 2.2. Los íconos que se ven más chicos amplían su área de toque a 44 × 44.
