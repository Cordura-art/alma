---
component: Textarea
tab: Estilo
summary: Especificaciones visuales del campo de varias líneas.
---

## Color

Usa los mismos tokens que `TextInput`:

| Elemento | Propiedad | Token |
|---|---|---|
| Contenedor | borde (1 px) | `field-border` |
| Contenedor | fondo | transparente |
| Contenedor:hover | borde | `field-border-hover` |
| Contenedor:focus | borde (2 px) | `field-border` |
| Contenedor:active | borde | `field-border-active` |
| Contenedor:error | borde | `field-border-error` |
| Contenedor:disabled | borde | `field-border-disabled` |
| Contenedor de solo lectura | borde (1 px, punteado) | `field-border-readonly` |
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

El texto de ejemplo se ve también en reposo (`field-placeholder`).

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado | Estilo de texto |
|---|---|---|---|---|
| Etiqueta flotante | 11 / 0,6875 | `font-weight-body` | 1,4 | `web-label-s` |
| Texto escrito | 14 / 0,875 | `font-weight-body` | 1,5 | `web-label-m` con interlineado 1,5 |
| Ayuda y contador | 11 / 0,6875 | `font-weight-body` | 1,4 | `web-label-s` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Contenedor | radio | `radius-field` (0 px) |
| Contenedor | relleno | 16 px (`space-16`); 15 px con el borde de 2 px del foco |
| Área de texto | alto mínimo | 6 rem (96 px), 4 líneas por defecto |
| Área de texto | cambio de tamaño | solo vertical |
| Etiqueta flotante | posición | sobre el borde superior, a 8 px del inicio |

## Tamaño

| Propiedad | Valor |
|---|---|
| Ancho | 100 % del contenedor, máximo 30 rem |
| Alto | según `rows`; crece con el texto grande |

## Movimiento y contraste

Igual que `TextInput`: borde en `duration-fast-02`, sin animaciones con movimiento reducido; texto a 4,5:1 (7:1 en alto contraste) y borde a 3:1, verificados en los cuatro temas.
