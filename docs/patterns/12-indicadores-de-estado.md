---
pattern: Indicadores de estado
summary: Cómo mostrar el estado de algo sin depender del color.
---

## Cuándo

Para decir en qué estado está un elemento: un pago, un viaje, una tarjeta, un archivo.

## Elegir la forma

| Situación | Usa |
|---|---|
| El estado de un elemento en una lista o tabla | `Tag` con la palabra del estado («Pagado», «Pendiente»). |
| Un estado del sistema que importa | Ícono relleno de estado + palabra. |
| Un resultado que pide atención | `InlineNotification`. |
| Algo nuevo o pendiente en la navegación | La insignia (`badge`) de `TabBar` o `Sidebar`. |
| El avance de algo | `ProgressBar` o `ProgressIndicator`. |

## Íconos de estado

| Estado | Ícono (`variant: 'filled'`) | Token |
|---|---|---|
| Error | `error` | `status-icon-error` |
| Advertencia | `warning` | `status-icon-warning` |
| Éxito | `checkmark--outline` | `status-icon-success` |
| Información | `information` | `status-icon-info` |

> **Imagen pendiente:** los cuatro íconos de estado con su palabra, en tema oscuro y claro.

## Reglas

- **Tres pistas, no una:** forma (el ícono), palabra y color. Si falta el color, las otras dos bastan.
- **La palabra informa:** «Pagado» dice más que un punto verde.
- **Los cuatro íconos de estado tienen formas distintas**, así se distinguen sin color.
- **Pocos estados:** si hay más de cinco, agrupa.
- **El mismo estado se ve igual en toda la app:** mismo color de `Tag`, misma palabra.

## Accesibilidad

- El ícono de estado lleva `label` si no hay palabra al lado.
- Los estados que cambian solos se anuncian en una región `role="status"`.

## Relacionados

`Tag` · `Icon` · `InlineNotification` · `ProgressBar` · Notificaciones.
