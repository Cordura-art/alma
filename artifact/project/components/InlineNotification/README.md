# InlineNotification

Mensaje de estado dentro de la página, cerca de lo que describe. Sigue la notificación de IBM Carbon: variantes en línea, accionable y *callout*.

## Cuándo usarlo
- Después de una acción, para contar el resultado (`error`, `success`, `warning`, `info`) junto al lugar donde ocurrió, por ejemplo sobre un formulario.
- `kind: 'callout'`: orienta **antes** de una tarea. No se puede cerrar y no usa los estados de éxito ni de error.
- Para avisos breves y pasajeros que no bloquean, usa `toast`. Para lo que exige una decisión, usa `Alert`.
- Úsalas poco: interrumpen.

## Contenido
- `title` corto que diga qué pasó; `message` con qué hacer.
- `actionLabel`: una sola acción, la que resuelve el problema («Cambiar tarjeta»).

## Comportamiento
- **No se cierra sola**: queda hasta que la persona la cierre o resuelva el problema.
- No pongas el botón de cerrar si es crítico leerla (`dismissible: false`).
- Errores y advertencias se anuncian como `alert`; éxito e información, como `status`.

## Aspecto
Fondo `notification-*-bg`, borde e ícono relleno en `status-icon-*` y el nombre del estado para el lector de pantalla. El estado se distingue por ícono y palabra, no solo por color. Sin barra lateral de color.
