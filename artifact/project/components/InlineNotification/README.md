# InlineNotification

Un mensaje de estado dentro de la página, junto a lo que describe.


## Uso

### Resumen

`InlineNotification` cuenta el resultado de una acción o un estado del sistema en el lugar donde importa, sin bloquear la página. Sigue la notificación de Carbon en sus formas en línea, accionable y *callout*.

#### Cuándo usarla
- Después de una acción, para contar el resultado junto a donde ocurrió (sobre un formulario, arriba de una lista).
- Para un estado que dura y hay que resolver («Tu tarjeta vence este mes»).
- `kind: 'callout'`: para orientar **antes** de una tarea.

#### Cuándo no usarla
- **Un aviso breve que no requiere atención:** `toast`.
- **Algo que exige una decisión inmediata:** `Alert`.
- **El error de un campo:** el texto de error del propio campo.

### Estados

| Estado | Ícono | Uso |
|---|---|---|
| `error` | `error` | Algo falló y hay que corregirlo. |
| `warning` | `warning` | Algo puede fallar o tiene consecuencias. |
| `success` | `checkmark--outline` | La acción terminó bien. |
| `info` | `information` | Información útil sin urgencia. |

El estado se distingue por el ícono y por la palabra que oye el lector, no solo por el color.

### Tipos

| Tipo | Se cierra | Uso |
|---|---|---|
| `inline` (por defecto) | Con «Cerrar» | Resultado o estado en la página. |
| `callout` | No | Guía antes de una tarea. Solo `info` o `warning`. |
| `toast` | Con «Cerrar» o sola | Se muestra con `toast()`; ver `ToastRegion`. |

### Anatomía

1. **Contenedor** con borde del color del estado.
2. **Ícono** relleno.
3. **Título.**
4. **Mensaje** (opcional).
5. **Hora** (opcional).
6. **Acción** (opcional): un solo botón.
7. **Botón Cerrar.**

![Los cuatro estados de InlineNotification en línea (error, advertencia, éxito e información), dos con acción y dos sin acción, en tema oscuro y claro.](assets/Componentes/inline-notification-estados.png)

### Contenido

- **Título:** qué pasó, corto («No pudimos cobrar tu pasaje»).
- **Mensaje:** qué hacer ahora («Revisa los datos de la tarjeta o usa otro medio de pago»).
- **Acción:** la que resuelve el problema («Cambiar tarjeta»). Una sola.

### Comportamiento

- **No se cierra sola:** queda hasta que la persona la cierre o resuelva el problema.
- Quita «Cerrar» (`dismissible: false`) si es crítico leerla.
- Ponla en el lugar donde ocurrió, no arriba de toda la página si la acción fue más abajo.
- Úsala poco: varias notificaciones juntas se ignoran.

### Relacionados

`ToastRegion` · `Alert` · `Tip` · `TextInput` (error de campo).

### Referencias

- IBM, Carbon Design System: Notification.

## Estilo

### Color

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

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título | 14 / 0,875 | `font-weight-heading` | 1,4 |
| Mensaje | 14 / 0,875 | `font-weight-body` | 1,72 |
| Hora | 11 / 0,6875 | `font-weight-body` | — |

### Estructura

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

### Contraste

Textos a 4,5:1 sobre cada fondo de estado; ícono y borde a 3:1. Verificado con axe en los cuatro temas.

## Código

### Uso

```js
const { InlineNotification } = window.AlmaDS;
h(InlineNotification, { status: 'error', title: 'No pudimos cobrar tu pasaje',
  message: 'Revisa los datos de la tarjeta o usa otro medio de pago.',
  actionLabel: 'Cambiar tarjeta', onAction: openPayment })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `status` | `'error' \| 'warning' \| 'success' \| 'info'` | `'info'` | Estado. |
| `kind` | `'inline' \| 'callout' \| 'toast'` | `'inline'` | Tipo. |
| `title` | `string` | — | Qué pasó. |
| `message` | `string` | — | Qué hacer. |
| `timestamp` | `string` | — | Hora, si importa. |
| `actionLabel` / `onAction` | `string` / `() => void` | — | La acción que resuelve. |
| `dismissible` | `boolean` | `true` (`false` en callout) | Muestra «Cerrar». |
| `onClose` | `() => void` | — | Al cerrar. |

### Callout

```js
h(InlineNotification, { kind: 'callout', status: 'info', title: 'Ten a mano tu carnet',
  message: 'Lo pediremos al subir al bus.' })
```

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Error y advertencia usan `role="alert"`: el lector los anuncia en cuanto aparecen.
- Éxito e información usan `role="status"`: se anuncian sin interrumpir.
- El ícono lleva el nombre del estado («Error», «Advertencia», «Éxito», «Información»), así el estado no depende del color.
- «Cerrar» se llama «Cerrar notificación».

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega a la acción y a «Cerrar». |
| Enter o Espacio | Activa el botón con foco. |

### Recomendaciones de diseño

- No uses el rol de alerta para mensajes que no son urgentes: interrumpe al lector.
- Si la notificación aparece por una acción, ponla cerca de donde ocurrió.

### Consideraciones de desarrollo

- Las regiones `alert` y `status` solo se anuncian si el contenido **aparece** después de cargar la página. Una notificación que ya estaba al cargar se lee en orden normal.
- Al cerrar una notificación, mueve el foco a un lugar lógico (el control que la causó) si estaba sobre «Cerrar».

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
