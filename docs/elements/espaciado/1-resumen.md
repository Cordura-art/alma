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

| Token | Valor | Uso |
|---|---|---|
| `radius-chip` | 48 px | Etiquetas, casillas, contornos de foco pequeños. |
| `radius-swatch` | 0 px | Tarjetas de muestra de color. |
| `radius-panel` | 0 px | Contenedores: tarjetas, menús, modales, tablas. |
| `radius-card` | 0 px | Campos y marcos grandes. |
| `radius-pill` | 100 px | Botones, pestañas, destinos de navegación. |

## Tamaños de interacción

Todo control mide al menos `size-touch-min` (44 px), el mínimo de Apple, por encima de los 24 px de WCAG 2.2. Los íconos que se ven más chicos amplían su área de toque a 44 × 44.
