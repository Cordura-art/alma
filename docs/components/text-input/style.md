---
component: TextInput
tab: Estilo
summary: Especificaciones visuales del campo de texto: color, tipografía, estructura y tamaño.
---

## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Contenedor | borde (1 px) | `field-border` |
| Contenedor | fondo | transparente |
| Contenedor:hover | borde | `field-border-hover` |
| Contenedor:focus | borde (2 px) | `field-border` |
| Contenedor:active | borde | `field-border-active` |
| Contenedor:error | borde | `field-border-error` |
| Contenedor:disabled | borde | `field-border-disabled` |
| Contenedor de solo lectura | borde (1 px, punteado; sin cambio con hover) | `field-border-readonly` |
| Contenedor de solo lectura:focus | contorno | `focus` (2 px, separado 2 px) |
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
| Ícono del ojo | relleno | `field-icon` |
| Ícono del ojo:focus | contorno | `focus` (2 px, separado 2 px) |

En tema oscuro el borde y la etiqueta son lima; en claro, tonos acero oscuros, porque el lima sobre fondo claro no llega a 3:1.

> **Imagen pendiente:** el campo en reposo, foco, con texto, error y desactivado, en los cuatro temas.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Etiqueta | 14 / 0,875 | Regular / 400 | `web-label-m` |
| Etiqueta flotante | 11 / 0,6875 | Regular / 400 | `web-label-s` |
| Texto escrito | 14 / 0,875 | Regular / 400 | `web-label-m` |
| Ayuda y contador | 11 / 0,6875 | Regular / 400 | `web-label-s` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Contenedor | radio | `radius-card` (8 px) |
| Contenedor | relleno lateral | 16 px (`space-16`); 15 px con el borde de 2 px del foco |
| Contenedor | separación interna | 8 px (`space-8`) |
| Etiqueta flotante | posición | sobre el borde superior, a 8 px del inicio |
| Etiqueta flotante | relleno y radio | 4 px lateral, `radius-chip` |
| Ícono del ojo | tamaño visible / área de toque | 24 px / 44 × 44 px |
| Pie (ayuda y contador) | relleno lateral | 16 px |
| Campo y pie | separación | 4 px (`space-4`) |

> **Imagen pendiente:** anatomía acotada con las medidas de esta tabla.

## Tamaño

| Densidad | Alto (px / rem) |
|---|---|
| Normal | 56 / 3,5 (`size-field`) |
| Compacta (puntero fino) | 40 / 2,5 (`size-field-compact`) |

El alto es mínimo: crece si la persona agranda el texto. Ancho por defecto 15 rem, con `max-width: 100%`.

## Movimiento

El borde cambia en `duration-fast-02` (110 ms) y la etiqueta sube al chip en `duration-moderate-01` (150 ms), ambos con `easing-standard-productive`. Con movimiento reducido, los cambios son instantáneos.

## Contraste

Texto, etiqueta y texto de ejemplo a 4,5:1 o más, y borde e ícono a 3:1 o más, en oscuro y claro; 7:1 para texto en alto contraste. Verificado con los pares de contraste del repositorio y con axe en los cuatro temas. El estado desactivado está exento.
