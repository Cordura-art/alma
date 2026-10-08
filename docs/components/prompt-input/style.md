---
component: PromptInput
tab: Estilo
summary: Colores, tipografía y medidas de PromptInput.
---


## Color

Es un campo de ALMA: usa los mismos tokens que `Textarea`.

| Elemento | Propiedad | Token |
|---|---|---|
| Caja | borde | `field-border`; `field-border-hover` con el cursor encima |
| Caja con el foco | borde | `field-border`, de 2 px |
| Rótulo | fondo y texto | `field-label-float-bg` y `field-label-float-text` |
| Texto | color | `field-text` |
| Texto de ejemplo | color | `field-placeholder` |
| Enviar y Detener | fondo e ícono | Los de un `Button` `filled` principal |
| Aviso | color del texto | `text-02` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Texto | 14 / 0,875, interlínea 1,5 | `font-weight-body` |
| Rótulo | 11 / 0,6875 | `font-weight-body` |
| Aviso | 12 / 0,75 | `font-weight-body` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Caja | relleno | `space-8`, y `space-16` a la izquierda |
| Caja | radio | `radius-field` |
| Campo | alto | De una a seis líneas |
| Campo y botón | separación | `space-8` |
| Botón | tamaño | El de un control, cuadrado, alineado abajo |
| Caja y aviso | separación | `space-8` |
| Todo | ancho máximo | 48 rem |

El botón se queda abajo cuando la caja crece: no hay que perseguirlo.
