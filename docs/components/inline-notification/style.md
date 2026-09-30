---
component: InlineNotification
tab: Estilo
summary: Especificaciones visuales de la notificación en línea.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Contenedor (error) | fondo / borde e ícono | `notification-error-bg` / `notification-error-accent` |
| Contenedor (advertencia) | fondo / borde e ícono | `notification-warning-bg` / `notification-warning-accent` |
| Contenedor (éxito) | fondo / borde e ícono | `notification-success-bg` / `notification-success-accent` |
| Contenedor (información) | fondo / borde e ícono | `notification-info-bg` / `notification-info-accent` |
| Contenedor (toast) | fondo | `notification-toast-bg` |
| Título | color del texto | `text-01` |
| Mensaje y hora | color del texto | `text-02` |
| Acción | estilo | `Button` gray |
| Botón Cerrar | estilo | `Button` plain de ícono |

Los tokens `notification-*-accent` apuntan a `status-icon-*`, que alcanzan 3:1 sobre su fondo en los cuatro temas.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título | 14 / 0,875 | `font-weight-heading` | 1,4 |
| Mensaje | 14 / 0,875 | `font-weight-body` | 1,72 |
| Hora | 11 / 0,6875 | `font-weight-body` | — |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Contenedor | ancho máximo | 560 px (35 rem) |
| Contenedor | relleno | 16 px; 8 px a la derecha, junto a «Cerrar» |
| Contenedor | borde, radio | 1 px, `radius-panel` |
| Ícono y texto | separación | 16 px |
| Título y mensaje | separación | 4 px |
| Mensaje y acción | separación | 16 px |
| Ícono | tamaño | 24 px |

Sin barra lateral de color: el borde completo y el ícono marcan el estado.

![Medidas de InlineNotification con acción y botón Cerrar: relleno, ícono de 24 px, separación entre título y mensaje, y borde izquierdo.](assets/Componentes/inline-notification-medidas.png)

## Contraste

Textos a 4,5:1 sobre cada fondo de estado; ícono y borde a 3:1. Verificado con axe en los cuatro temas.
