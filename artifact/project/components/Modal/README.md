# Modal

Diálogo que bloquea la página para una tarea breve y enfocada: editar un dato, confirmar un pago (IBM Carbon, Apple sheet). Para una advertencia con 2 o 3 respuestas, usa `Alert`.

## Qué aporta quien lo usa
- `open` y `onClose`. `title` (verbo + objeto: «Cambiar el nombre del pasajero»), `eyebrow`, `description`.
- `children`: el contenido. Si trae un campo, recibe el foco al abrir; si no, el foco va al diálogo.
- `primaryAction` `{ label, onClick, destructive, disabled, loading }` y `secondaryAction` `{ label, onClick }`. «Cancelar» a la izquierda, la acción a la derecha.
- `size`: `sm` (400 px), `md` (560 px, por defecto) o `lg` (768 px).
- `dismissible: false` solo si la tarea no se puede abandonar (sin botón «Cerrar» ni Esc).

## Comportamiento
- Atrapa el foco, Esc cierra, el foco vuelve al botón que lo abrió y la página de fondo no hace scroll.
- Con `primaryAction`, un clic fuera **no** cierra (no se pierde lo escrito); `closeOnOverlay` cambia eso.
- Entra con la receta «invocar» de IBM sobre `overlay-01`, en `z-modal`.
