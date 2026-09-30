---
component: Combobox
tab: Estilo
summary: Especificaciones visuales del campo con lista.
---

## Color

### Campo

| Elemento | Propiedad | Token |
|---|---|---|
| Contenedor | borde (1 px) | `field-border` |
| Contenedor | fondo | transparente |
| Contenedor:hover | borde | `field-border-hover` |
| Contenedor:focus | borde (2 px) | `field-border` |
| Contenedor:active | borde | `field-border-active` |
| Contenedor:error | borde | `field-border-error` |
| Contenedor:disabled | borde | `field-border-disabled` |
| Etiqueta | color del texto | `field-label` |
| Etiqueta flotante | fondo | `field-label-float-bg` |
| Etiqueta flotante | color del texto | `field-label-float-text` |
| Etiqueta:error | color del texto | `field-text-error` |
| Etiqueta flotante:error | color del texto | `field-label-float-error` |
| Texto escrito | color | `field-text` |
| Texto escrito:error | color | `field-text-error` |
| Texto de ejemplo | color | `field-placeholder` |
| Etiqueta, texto e ícono:disabled | color | `field-text-disabled` |
| Ayuda y contador | color | `text-01` |
| Botón de la lista | relleno | `field-icon` |

### Lista

| Elemento | Propiedad | Token |
|---|---|---|
| Menú | fondo | `menu-bg` |
| Menú | borde | `menu-border` |
| Menú | sombra | `shadow-floating` |
| Opción | color del texto | `text-01` |
| Opción:hover | fondo | `menu-item-bg-hover` |
| Opción activa (teclado) | fondo | `hover-ui` |
| Opción activa (teclado) | borde (2 px, interior) | `focus` |
| Marca de selección | relleno | `icon-01` |
| Casilla (múltiple) | relleno | `icon-01` (ícono `checkbox` / `checkbox--checked--filled`) |
| Sin resultados | color del texto | `text-02` |

### Etiquetas (múltiple)

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | fondo / texto | `tag-blue-bg` / `tag-blue-text` (o el color de `tagColor`) |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta del campo y texto | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Opción | 14 / 0,875 | `font-weight-body` | `web-label-m` |
| Etiqueta (`Tag` pequeña) | 11 / 0,6875 | `font-weight-body` | `web-label-s` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Campo múltiple | relleno vertical | 8 px (`space-8`) |
| Campo múltiple | separación entre filas de etiquetas | 4 px (`space-4`) |
| Botón de la lista | ícono / área de toque | 20 px / 44 × 44 px |
| Lista | separación del campo | 8 px |
| Lista | relleno y radio | 8 px, `radius-panel` |
| Lista | alto máximo | 16 rem, con desplazamiento |
| Opción | alto mínimo, radio | 44 px (`size-touch-min`), `radius-nav` |
| Opciones | separación | 4 px (`space-4`) |
| Etiqueta | alto | 24 px |

> **Imagen pendiente:** anatomía acotada del campo múltiple con la lista abierta.

## Tamaño y capas

Campo de 56 px (40 px compacto) y 20 rem de ancho. La lista flota en `z-dropdown`.

## Movimiento

La lista aparece con `duration-fast-02` y `easing-entrance-expressive` (la receta contextual de IBM).

## Contraste

Mismos resultados que `TextInput` para el campo; opciones y etiquetas a 4,5:1 (7:1 en alto contraste) en los cuatro temas, verificados con axe con la lista abierta.
