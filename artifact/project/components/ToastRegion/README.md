# ToastRegion

Avisos flotantes y pasajeros que no bloquean la pantalla.


## Uso

### Resumen

Un *toast* cuenta el resultado de una acción sin interrumpir: aparece arriba a la derecha, no bloquea nada y, si fue un éxito, se va solo. `ToastRegion` es el lugar donde aparecen y `toast()` los muestra.

#### Cuándo usarlo
- Confirmar una acción que la persona acaba de hacer («Pasaje guardado en tu billetera»).
- Avisar un evento del sistema que no necesita respuesta inmediata.

#### Cuándo no usarlo
- **Información que hay que leer antes de seguir:** `InlineNotification` o `Alert`.
- **El error de un campo:** el texto de error del campo.
- **Algo que solo existe en el toast:** como puede desaparecer, lo que informa debe poder verse en otra parte.
- **Un estado de carga:** un toast nunca se representa con `Skeleton`; muéstralo cuando haya resultado.

### Anatomía

Es una `InlineNotification` de tipo `toast`: ícono, título, mensaje, hora, acción y «Cerrar», sobre `ui-01` con sombra.

> **Imagen pendiente:** dos toasts apilados arriba a la derecha sobre una pantalla de la app.

### Duración

| Estado | Se cierra solo |
|---|---|
| `success`, `info` | Sí, a los 5 segundos. |
| `error`, `warning` | No: la persona los cierra. |

- La cuenta se pausa mientras el cursor o el foco están sobre el toast.
- `duration` cambia los 5 segundos; `duration: 0` lo deja fijo.
- Todos tienen «Cerrar».

### Posición

- Arriba a la derecha, 72 px bajo el borde superior (debajo de la barra de herramientas) y 16 px del borde derecho.
- Varios toasts se apilan hacia abajo, con 8 px entre ellos; el más nuevo queda abajo.
- Monta `ToastRegion` una sola vez, cerca de la raíz de la app.

### Contenido

- **Título:** el resultado, en pasado («Pasaje guardado»).
- **Mensaje:** opcional, una oración.
- **Acción:** opcional, una sola y reversible («Deshacer», «Ver pasaje»).

### Relacionados

`InlineNotification` · `Alert`.

### Referencias

- IBM, Carbon Design System: Notification (toast).

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Toast | fondo | `notification-toast-bg` |
| Toast | borde e ícono | `notification-*-accent` según el estado |
| Toast | sombra | `shadow-floating` |
| Título | color del texto | `text-01` |
| Mensaje y hora | color del texto | `text-02` |

El resto (acción, «Cerrar») es igual a `InlineNotification`.

### Tipografía

Igual a `InlineNotification`: título 14 px Medium, mensaje 14 px Regular, hora 11 px.

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Región | posición | fija, 72 px + área segura desde arriba, 16 px desde la derecha |
| Región | separación entre toasts | 8 px |
| Toast | ancho | 360 px (como máximo, el ancho de la pantalla − 32 px) |
| Toast | relleno, radio | 16 px, `radius-panel` |

### Capas y movimiento

La región está en `z-floating`, sobre el contenido y bajo los modales. Cada toast entra bajando 8 px y apareciendo, en `duration-moderate-02` con `easing-entrance-expressive`. Con movimiento reducido, aparece sin animación.

### Contraste

Igual a `InlineNotification`, sobre `ui-01`. Verificado en los cuatro temas.

## Código

### Uso

```js
const { ToastRegion, toast } = window.AlmaDS;
// Una vez, cerca de la raíz de la app:
h(ToastRegion)
// Donde ocurra la acción:
toast({ status: 'success', title: 'Pasaje guardado', message: 'Lo encontrarás en tu billetera.' });
```

### `toast(opciones)`

Recibe las mismas opciones que `InlineNotification` (`status`, `title`, `message`, `timestamp`, `actionLabel`, `onAction`) y además:

| Opción | Tipo | Por defecto | Uso |
|---|---|---|---|
| `duration` | `number` (ms) | 5000 en éxito e información; nunca en error y advertencia | `0` lo deja fijo. |

Devuelve un id. `toast.dismiss(id)` lo cierra.

### Con deshacer

```js
const id = toast({ status: 'success', title: 'Tarjeta eliminada', actionLabel: 'Deshacer',
  onAction: () => { restore(); toast.dismiss(id); } });
```

### `ToastRegion`

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `inline` | `boolean` | `false` | Dibuja la región en su lugar, sin posición fija. Solo para documentación. |

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- La región es `aria-live="polite"`, y cada toast lleva el rol de su estado: `alert` en error y advertencia, `status` en éxito e información. El lector los anuncia al aparecer.
- Éxito e información se cierran a los 5 segundos, pero la cuenta se pausa mientras el cursor o el foco están encima (WCAG 2.2.1, tiempo ajustable).
- Error y advertencia no se cierran solos.
- Todos tienen «Cerrar notificación».

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega a la acción y a «Cerrar» del toast (está al final del documento). |
| Enter o Espacio | Activa el botón con foco. |

### Recomendaciones de diseño

- Como puede desaparecer antes de que alguien lo lea, lo que informa un toast debe poder consultarse en otra parte.
- Una acción en un toast debe tener otro camino en la interfaz: a quien navega con teclado le cuesta llegar a él.

### Consideraciones de desarrollo

- Monta una sola `ToastRegion`: dos regiones anuncian dos veces.
- No muevas el foco al toast; la persona sigue donde estaba.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA, en especial el anuncio de toasts seguidos.
