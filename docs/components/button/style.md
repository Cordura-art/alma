---
component: Button
tab: Estilo
summary: Especificaciones visuales del botón: color, tipografía, estructura y tamaño.
---

Esta pestaña documenta las especificaciones visuales: color, tipografía, estructura y tamaño. Cada valor es un token de componente (`button-*`) que apunta a la capa semántica; para ajustar un botón, cambia su token de componente, nunca el semántico.

## Color

El ícono siempre toma el color de la etiqueta (`currentColor`). El borde reservado de 2 px es transparente en todos los estilos.

### Filled

La acción principal.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-filled-text` |
| Ícono | relleno (`currentColor`) | `button-filled-text` |
| Contenedor | fondo | `button-filled-bg` |
| Contenedor:hover | fondo | `button-filled-bg-hover` |
| Contenedor:active | fondo | `button-filled-bg-active` |
| Etiqueta:active | color del texto | `button-filled-text-active` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Contenedor:disabled | fondo | `button-disabled-bg` |
| Etiqueta:disabled | color del texto | `button-disabled-text` |

### Tinted

Acción secundaria importante.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-tinted-text` |
| Ícono | relleno | `button-tinted-text` |
| Contenedor | fondo | `button-tinted-bg` |
| Contenedor:hover | fondo | `button-tinted-bg-hover` |
| Contenedor:active | fondo | `button-tinted-bg-hover` |
| Contenedor:active | borde (2 px, interior) | `currentColor` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Contenedor:disabled | fondo | `button-disabled-bg` |
| Etiqueta:disabled | color del texto | `button-disabled-text` |

### Gray

Acciones neutras («Cancelar», «Volver»).

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-gray-text` |
| Ícono | relleno | `button-gray-text` |
| Contenedor | fondo | `button-gray-bg` |
| Contenedor:hover | fondo | `button-gray-bg-hover` |
| Contenedor:active | fondo | `button-gray-bg-active` |
| Etiqueta:active | color del texto | `button-gray-text-active` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Contenedor:disabled | fondo | `button-disabled-bg` |
| Etiqueta:disabled | color del texto | `button-disabled-text` |

### Tertiary

Alternativa con contorno.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-tertiary-text` |
| Ícono | relleno | `button-tertiary-text` |
| Contenedor | fondo | transparente |
| Contenedor | borde (1 px, interior) | `button-tertiary-border` |
| Etiqueta:hover | color del texto | `button-tertiary-text-hover` |
| Contenedor:hover | fondo | `button-tertiary-bg-hover` |
| Contenedor:hover | borde | ninguno |
| Etiqueta:active | color del texto | `button-tertiary-text-active` |
| Contenedor:active | fondo | `button-tertiary-bg-active` |
| Contenedor:active | borde (2 px, interior) | `button-tertiary-text-active` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Contenedor:disabled | fondo | `button-disabled-bg` |
| Etiqueta:disabled | color del texto | `button-disabled-text` |

### Plain

Acciones de poco peso o repetidas.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-plain-text` |
| Ícono | relleno | `button-plain-text` |
| Contenedor | fondo | transparente |
| Contenedor:hover | fondo | `button-plain-bg-hover` |
| Contenedor:active | fondo | `button-plain-bg-active` |
| Contenedor:active | borde (2 px, interior) | `currentColor` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Contenedor:disabled | fondo | transparente |
| Etiqueta:disabled | color del texto | `button-disabled-text` |

### Ghost

Sobre imágenes y fondos claros de marca.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-ghost-text` |
| Contenedor | fondo | `button-ghost-bg` |
| Contenedor:hover | fondo | `button-ghost-bg-hover` |
| Contenedor:active | fondo | `button-ghost-bg-active` |
| Etiqueta:active | color del texto | `button-ghost-text-active` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Contenedor:disabled | fondo | `button-ghost-bg` |
| Etiqueta:disabled | color del texto | `button-ghost-text-disabled` |

### Inverse

Sobre piezas de marca oscuras.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-inverse-text` |
| Contenedor | fondo | `button-inverse-bg` |
| Contenedor:hover | fondo | `button-inverse-bg-hover` |
| Contenedor:active | fondo | `button-inverse-bg-active` |
| Etiqueta:active | color del texto | `button-inverse-text-active` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

### Destructivo filled

También se aplica a `ghost` e `inverse` con rol destructivo.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-destructive-text-on-fill` |
| Contenedor | fondo | `button-destructive-fill` |
| Contenedor:hover | fondo | `button-destructive-bg-hover` |
| Etiqueta:hover | color del texto | `button-destructive-text-pressed` |
| Contenedor:active | fondo | `button-destructive-bg-active` |
| Etiqueta:active | color del texto | `button-destructive-text-pressed` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

### Destructivo tinted

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-destructive-text` |
| Contenedor | fondo | `button-destructive-tinted-bg` |
| Contenedor:hover | fondo | `button-destructive-tinted-bg-hover` |
| Contenedor:active | fondo | `button-destructive-tinted-bg-hover` |
| Contenedor:active | borde (2 px, interior) | `currentColor` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

### Destructivo gray

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-destructive-gray-text` |
| Contenedor | fondo | `button-gray-bg` |
| Contenedor:hover | fondo | `button-destructive-gray-bg-hover` |
| Contenedor:active | fondo | `button-gray-bg-active` |
| Etiqueta:active | color del texto | `button-destructive-text-pressed` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

### Destructivo plain

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-destructive-text` |
| Contenedor | fondo | transparente |
| Contenedor:hover | fondo | `button-destructive-plain-bg-hover` |
| Contenedor:active | fondo | `button-destructive-plain-bg-active` |
| Contenedor:active | borde (2 px, interior) | `currentColor` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

### Destructivo tertiary

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-destructive-text` |
| Contenedor | borde (1 px, interior) | `button-destructive-text` |
| Contenedor:hover | fondo | `button-destructive-bg-hover` |
| Etiqueta:hover | color del texto | `button-destructive-text-pressed` |
| Contenedor:active | fondo | `button-destructive-bg-active` |
| Etiqueta:active | color del texto | `button-destructive-text-pressed` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

> **Imagen pendiente:** los siete estilos y los cinco destructivos, en reposo, puntero encima, presionado, foco y desactivado, en tema oscuro y claro.

### Valores por tema

Los tokens resuelven un color distinto en cada tema (`dark`, `light`, `dark-hc`, `light-hc`). Los valores exactos están en `tokens/themes/` del repositorio y en la pestaña Colores del artefacto.

## Tipografía

Roboto Flex extendida (`wdth` 150), peso Regular, en una línea. Las etiquetas usan mayúscula solo al inicio.

| Tamaño | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| `sm` | 11 / 0,6875 | `font-weight-body` | `web-label-s` |
| `md` | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| `lg` | 16 / 1 | `font-weight-body` | `web-label-l`, con interlineado 1,4 |

Los tamaños van en rem: crecen con el tamaño de texto que elige la persona (probado al 200 %).

## Estructura

| Elemento | Propiedad | `sm` | `md` | `lg` |
|---|---|---|---|---|
| Contenedor | relleno lateral | 16 px (`space-16`) | 24 px (`space-24`) | 32 px (`space-32`) |
| Contenedor con ícono | relleno del lado del ícono | 10 px | 16 px (`space-16`) | 24 px (`space-24`) |
| Contenedor | radio | `radius-button` | `radius-button` | `radius-button` |
| Contenedor | borde reservado | 2 px transparente | 2 px transparente | 2 px transparente |
| Ícono | tamaño | 24 px (`icon-size-lg`) | 24 px | 24 px |
| Ícono y etiqueta | separación | 10 px | 10 px | 10 px |
| Indicador de carga | tamaño | 20 px, trazo 2 px | 20 px | 20 px |
| Grupo de botones | separación | 8 px (`space-8`) | 8 px | 8 px |

- El relleno del lado del ícono es (alto − 24) / 2: el ícono queda centrado en un círculo, como en Figma.
- El botón solo ícono es cuadrado (`aspect-ratio: 1`, sin relleno): un círculo del alto del botón.

> **Imagen pendiente:** anatomía acotada de los tres tamaños, con etiqueta sola, ícono antes, ícono después y solo ícono.

## Tamaño

| Tamaño | Alto (px / rem) | Uso |
|---|---|---|
| `sm` | 44 / 2,75 | Por defecto. |
| `sm` compacto | 32 / 2 | Con `data-density="compact"` y puntero fino. |
| `md` | 56 / 3,5 | Acción principal de una pantalla móvil o de un paso. |
| `lg` | 72 / 4,5 | Portadas y momentos de marca. |

El alto es mínimo: si la persona agranda el texto, el botón crece.

## Foco

Contorno de 2 px en `focus`, separado 2 px del contenedor, solo con teclado (`:focus-visible`). En alto contraste llega a 7:1.

## Movimiento

Fondo y texto cambian en `duration-fast-01` (70 ms) con `easing-standard-productive`. El indicador de carga gira sin fin; con movimiento reducido se detiene y queda visible al 60 %.

## Contraste

Medido en reposo, puntero encima y presionado, en los 14 casos (7 estilos × 2 roles) y los cuatro temas: todos llegan a 4,5:1 en oscuro y claro, y a 7:1 en alto contraste. El borde del `tertiary` supera 3:1 contra la página.
