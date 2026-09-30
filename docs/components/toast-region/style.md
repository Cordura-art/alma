---
component: ToastRegion
tab: Estilo
summary: Especificaciones visuales de los toasts.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Toast | fondo | `notification-toast-bg` |
| Toast | borde e ícono | `notification-*-accent` según el estado |
| Toast | sombra | `shadow-floating` |
| Título | color del texto | `text-01` |
| Mensaje y hora | color del texto | `text-02` |

El resto (acción, «Cerrar») es igual a `InlineNotification`.

## Tipografía

Igual a `InlineNotification`: título 14 px Medium, mensaje 14 px Regular, hora 11 px.

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Región | posición | fija, 72 px + área segura desde arriba, 16 px desde la derecha |
| Región | separación entre toasts | 8 px |
| Toast | ancho | 360 px (como máximo, el ancho de la pantalla − 32 px) |
| Toast | relleno, radio | 16 px, `radius-panel` |

## Capas y movimiento

La región está en `z-floating`, sobre el contenido y bajo los modales. Cada toast entra bajando 8 px y apareciendo, en `duration-moderate-02` con `easing-entrance-expressive`. Con movimiento reducido, aparece sin animación.

## Contraste

Igual a `InlineNotification`, sobre `ui-01`. Verificado en los cuatro temas.
