# Skeleton

Versión simplificada de un contenido mientras carga, con un brillo que indica que la página no está trabada (los *skeleton states* de IBM Carbon).

## Cuándo usarlo
- En la carga inicial de contenedores y datos: tablas, tarjetas y listas.
- Solo por unos segundos: desaparece cuando llega el contenido.
- **Nunca** para acciones (botones, campos, switches), toasts, menús, modales ni indicadores de carga. El contenido dentro de un modal sí puede tener skeleton; el modal no.
- Si la espera es larga o medible, usa `ProgressBar`.

## Qué aporta quien lo usa
- `shape`: `text` (líneas; la última más corta), `block` o `circle`.
- `lines`, `width`, `height`.
- `label`: lo anuncia el lector de pantalla («Cargando tus viajes»).

## Aspecto
Fondo `skeleton-01` con brillo `skeleton-02`. Con movimiento reducido, el brillo queda fijo.
