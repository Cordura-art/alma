---
component: Button
tab: Estilo
summary: Colores, tipografía, medidas y estados del botón, con sus tokens.
---

## Color

Cada estilo usa sus tokens de componente (`button-*`), que apuntan a la capa semántica. Cambia el token de componente para ajustar un botón sin tocar el resto del sistema.

### Estilos normales

| Estilo | Reposo | Puntero encima | Presionado |
|---|---|---|---|
| `filled` | Fondo `button-filled-bg` (`interactive-01`), texto `button-filled-text` | `button-filled-bg-hover` (`hover-primary`) | `button-filled-bg-active` (`active-primary`), texto `button-filled-text-active` |
| `tinted` | Fondo `button-tinted-bg` (lima translúcido), texto `button-tinted-text` | `button-tinted-bg-hover` | Fondo de reposo al 80 % |
| `gray` | Fondo `button-gray-bg` (`interactive-02`), texto `button-gray-text` | `button-gray-bg-hover` (`hover-secondary`) | `button-gray-bg-active` (`active-secondary`), texto `button-gray-text-active` |
| `tertiary` | Sin fondo; texto y borde de 1 px `button-tertiary-text` (`interactive-03` en oscuro, `interactive-04` en claro) | Fondo `button-tertiary-bg-hover` (`hover-tertiary`), texto `inverse-01` | `button-tertiary-bg-active` (`active-tertiary`) + borde interior de 2 px |
| `plain` | Sin fondo, texto `button-plain-text` | `button-plain-bg-hover` (`hover-ui` en oscuro, `tertiary-50` en claro) | Mismo fondo + borde interior de 2 px |
| `ghost` | `button-ghost-bg`, texto `button-ghost-text` | `button-ghost-bg-hover` | `button-ghost-bg-active` |
| `inverse` | `button-inverse-bg`, texto `button-inverse-text` | `button-inverse-bg-hover` | `button-inverse-bg-active`, texto `button-inverse-text-active` |

### Destructivos

Siempre en la familia roja de la paleta de peligro, nunca en lima.

| Estilo | Reposo | Puntero encima | Presionado |
|---|---|---|---|
| `filled` | `button-destructive-fill` (danger 500; 400 en oscuro) | `button-destructive-bg-hover` (danger 600), texto blanco | `button-destructive-bg-active` (danger 700), texto blanco |
| `tinted` | Rojo translúcido `button-destructive-tinted-bg`, texto `button-destructive-text` | `button-destructive-tinted-bg-hover` | El mismo + borde interior de 2 px |
| `gray` | Fondo acero, texto `button-destructive-gray-text` | `button-destructive-gray-bg-hover` (`secondary-400`) | Acero oscuro, texto blanco |
| `plain` | Texto `button-destructive-text` | `button-destructive-plain-bg-hover` | `button-destructive-plain-bg-active` + borde interior de 2 px |
| `tertiary` | Borde y texto `button-destructive-text` | `hover-danger`, texto blanco | `active-danger`, texto blanco |

### Desactivado

Fondo `button-disabled-bg` (`disabled-01`) y texto `button-disabled-text` (`disabled-03`). Está exento de contraste según WCAG, así que nunca lleva información necesaria.

## Tipografía

Roboto Flex, extendida (`wdth` 150), peso 400, en una línea.

| Tamaño | Tamaño de letra | Interlineado | Espaciado |
|---|---|---|---|
| `sm` | 0,6875 rem (11 px) | 1,4 | 0,165 px |
| `md` | 0,875 rem (14 px) | 1,4 | 0,14 px |
| `lg` | 1 rem (16 px) | 1,4 | 0,16 px |

Los tamaños van en rem: crecen con el tamaño de texto que elige la persona. Probado al 200 %.

## Estructura

| Medida | `sm` | `md` | `lg` |
|---|---|---|---|
| Alto mínimo | 44 px (32 px compacto) | 56 px | 72 px |
| Relleno lateral | 16 px | 24 px | 32 px |
| Relleno del lado del ícono | 10 px | 16 px | 24 px |
| Ícono | 24 px | 24 px | 24 px |
| Separación ícono–etiqueta | 10 px | 10 px | 10 px |

- **Radio:** `radius-pill` en todos los tamaños.
- **Borde:** 2 px transparente, reservado para que los estados con borde no muevan el contenido.
- **Relleno del lado del ícono:** (alto − 24) / 2, para que el ícono quede centrado en un círculo, como en Figma.
- **Solo ícono:** cuadrado (`aspect-ratio: 1`) sin relleno, así que es un círculo del alto del botón.
- **Ancho:** lo define la etiqueta. En el teléfono, la acción principal de la pantalla puede ocupar el ancho completo.
- **Grupos:** 8 px entre botones (`space-8`).

## Foco

Anillo de 2 px en `focus`, separado 2 px del botón, solo con teclado. En alto contraste el color del foco llega a 7:1.

## Movimiento

Color de fondo y texto con `duration-fast-01` (70 ms) y `easing-standard-productive`. El indicador de carga gira sin fin; con movimiento reducido se detiene y queda visible.

## Temas y contraste

Medido estado por estado (reposo, puntero encima, presionado) en los 14 casos (7 estilos × 2 roles) y los cuatro temas:

| Tema | Mínimo exigido | Resultado |
|---|---|---|
| Oscuro | 4,5:1 | Todos cumplen |
| Claro | 4,5:1 | Todos cumplen |
| Oscuro alto contraste | 7:1 | Todos cumplen |
| Claro alto contraste | 7:1 | Todos cumplen |

El borde del `tertiary` supera 3:1 contra la página en los cuatro temas.
