---
component: ChatMessage
tab: Estilo
summary: Colores, tipografía y medidas de ChatMessage.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Pedido de la persona | fondo | `ui-03` |
| Pedido y respuesta | color del texto | `text-01` |
| Respuesta | fondo | Ninguno: el de la página |
| Línea de «pensando», nota de «detenida» | color del texto | `text-02` |
| Indicador y cursor | color | `interactive-01` |
| Acciones | color | El de un `Button` `plain` |
| Acción marcada | ícono | El mismo, relleno |
| Error | fondo y borde | Los de `InlineNotification` de error |

El texto de una respuesta no va más claro ni en cursiva por ser generado. Lo generado se dice con la marca y el nombre del asistente, no con el estilo.

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Pedido y respuesta | 14 / 0,875, interlínea 1,5 | `font-weight-body` |
| Línea de estado, nota | 14 / 0,875 | `font-weight-body` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Pedido | ancho máximo | 80 % del mensaje, hasta 36 rem |
| Pedido | relleno | `space-8` arriba y abajo, `space-16` a los lados |
| Pedido | radio | `radius-panel` |
| Respuesta | ancho máximo | 48 rem |
| Partes de una respuesta | separación | `space-8` |
| Acciones | separación | `space-4` |
| Acción | tamaño | El de un control |
| Cursor | ancho | 2 px, del alto de la letra |
| Entre un mensaje y el siguiente | separación | `space-16`, la pone la lista |

## Movimiento

El cursor no parpadea. El indicador de «pensando» es el de `ActivityIndicator`, que respeta el movimiento reducido.
