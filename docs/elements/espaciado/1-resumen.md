---
element: Espaciado y grilla
order: 3
tab: Resumen
summary: La escala de 8, la grilla responsive, la densidad y las capas.
---

## Todo en múltiplos de 8

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

## Radios

Un radio por familia de elementos. Se ajustan en **Ajustes de ALMA**, pestaña Forma; 100 px equivale a una píldora.

| Token | Valor | Uso |
|---|---|---|
| `radius-button` | 16 px | Botones: `Button`, `IconButton`, `Stepper`, `PopUpButton`, `SegmentedControl`. |
| `radius-field` | 8 px | Campos: `TextInput`, `Textarea`, `SearchField`, campo del `Slider`. |
| `radius-nav` | 8 px | Navegación: `Tabs`, `Sidebar`, opciones de menú, `Breadcrumb`. |
| `radius-tag` | 8 px | `Tag`, fichas del buscador, insignias, archivos de `FileUploader`. |
| `radius-checkbox` | 2 px | La casilla de `Checkbox`. Siempre con esquinas, para no confundirla con `RadioGroup`. |
| `radius-panel` | 8 px | Contenedores: tarjetas, menús, modales, tablas. |
| `radius-card` | 8 px | Marcos de documentación y tarjetas grandes. |
| `radius-swatch` | 2 px | Tarjetas de muestra de color. |
| `radius-chip` | 4 px | Etiquetas flotantes de campo, globos de ayuda, contornos de foco pequeños. |
| `radius-pill` | 100 px | Formas siempre redondas: `Switch`, barra de progreso, días del calendario. No se ajusta. |

## Tamaños de interacción

Todo control mide al menos `size-touch-min` (44 px), el mínimo de Apple, por encima de los 24 px de WCAG 2.2. Los íconos que se ven más chicos amplían su área de toque a 44 × 44.
