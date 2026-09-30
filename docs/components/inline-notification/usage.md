---
component: InlineNotification
tab: Uso
summary: Un mensaje de estado dentro de la página, junto a lo que describe.
---


## Resumen

`InlineNotification` cuenta el resultado de una acción o un estado del sistema en el lugar donde importa, sin bloquear la página. Sigue la notificación de Carbon en sus formas en línea, accionable y *callout*.

### Cuándo usarla
- Después de una acción, para contar el resultado junto a donde ocurrió (sobre un formulario, arriba de una lista).
- Para un estado que dura y hay que resolver («Tu tarjeta vence este mes»).
- `kind: 'callout'`: para orientar **antes** de una tarea.

### Cuándo no usarla
- **Un aviso breve que no requiere atención:** `toast`.
- **Algo que exige una decisión inmediata:** `Alert`.
- **El error de un campo:** el texto de error del propio campo.

## Estados

| Estado | Ícono | Uso |
|---|---|---|
| `error` | `error` | Algo falló y hay que corregirlo. |
| `warning` | `warning` | Algo puede fallar o tiene consecuencias. |
| `success` | `checkmark--outline` | La acción terminó bien. |
| `info` | `information` | Información útil sin urgencia. |

El estado se distingue por el ícono y por la palabra que oye el lector, no solo por el color.

## Tipos

| Tipo | Se cierra | Uso |
|---|---|---|
| `inline` (por defecto) | Con «Cerrar» | Resultado o estado en la página. |
| `callout` | No | Guía antes de una tarea. Solo `info` o `warning`. |
| `toast` | Con «Cerrar» o sola | Se muestra con `toast()`; ver `ToastRegion`. |

## Anatomía

1. **Contenedor** con borde del color del estado.
2. **Ícono** relleno.
3. **Título.**
4. **Mensaje** (opcional).
5. **Hora** (opcional).
6. **Acción** (opcional): un solo botón.
7. **Botón Cerrar.**

> **Imagen pendiente:** los cuatro estados en línea, con y sin acción, en tema oscuro y claro.

## Contenido

- **Título:** qué pasó, corto («No pudimos cobrar tu pasaje»).
- **Mensaje:** qué hacer ahora («Revisa los datos de la tarjeta o usa otro medio de pago»).
- **Acción:** la que resuelve el problema («Cambiar tarjeta»). Una sola.

## Comportamiento

- **No se cierra sola:** queda hasta que la persona la cierre o resuelva el problema.
- Quita «Cerrar» (`dismissible: false`) si es crítico leerla.
- Ponla en el lugar donde ocurrió, no arriba de toda la página si la acción fue más abajo.
- Úsala poco: varias notificaciones juntas se ignoran.

## Relacionados

`ToastRegion` · `Alert` · `Tip` · `TextInput` (error de campo).

## Referencias

- IBM, Carbon Design System: Notification.
