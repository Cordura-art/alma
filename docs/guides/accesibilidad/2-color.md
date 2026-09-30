---
element: Accesibilidad
order: 1
tab: Color
summary: El piso de ALMA es WCAG 2.2 AA en los cuatro temas, con foco visible, teclado y movimiento reducido.
---

## Contraste mínimo

| Qué | Oscuro y Claro | Alto contraste |
|---|---|---|
| Texto normal | 4,5:1 | 7:1 |
| Texto grande (24 px, o 19 px en negrita) | 3:1 | 4,5:1 |
| Bordes de controles, anillo de foco, íconos que informan | 3:1 | 3:1 |
| Texto desactivado | Exento | Exento |

Los tokens de ALMA ya cumplen estos mínimos sobre las superficies que su nota indica. Si combinas colores fuera de esas notas, mide.

## Nunca solo color

- Los estados (error, éxito, advertencia, información) llevan palabra o ícono.
- Los gráficos rotulan sus series o usan forma o trama, además del color.
- Lo elegido se distingue también por forma: el indicador de las pestañas, el ícono relleno de la navegación, la casilla marcada.
- Los enlaces dentro de un texto van subrayados.

## Texto sobre imágenes

Pon un velo (`tint-dark-*` o `tint-white-*`) entre la imagen y el texto, y mide el contraste en la parte más clara de la imagen.

## Alto contraste

Los temas `dark-hc` y `light-hc` se activan solos si la persona pide más contraste en su sistema (con `applyTheme()`). Prueba cada pantalla nueva también en ellos.
