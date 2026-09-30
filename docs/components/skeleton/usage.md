---
component: Skeleton
tab: Uso
summary: Una versión simplificada del contenido mientras carga.
---


## Resumen

`Skeleton` dibuja la forma del contenido antes de que llegue, con un brillo que dice que la página no está trabada. Son los *skeleton states* de Carbon.

### Cuándo usarlo
- En la carga inicial de contenedores y datos: tablas, tarjetas, listas.
- Solo por unos segundos: desaparece cuando llega el contenido.

### Cuándo no usarlo
- **Para acciones** (botones, campos, switches), toasts, menús, modales ni indicadores de carga. El contenido dentro de un modal sí puede tenerlo; el modal no.
- **Si la espera es larga o medible:** `ProgressBar`.

## Formas

| Forma | Propiedad | Para |
|---|---|---|
| Texto | `shape: 'text'` | Líneas de texto; la última, más corta. |
| Bloque | `shape: 'block'` | Imágenes, tarjetas, gráficos. |
| Círculo | `shape: 'circle'` | Avatares e íconos. |

![Una lista de viajes mientras carga, dibujada con Skeleton, y la misma lista ya cargada.](assets/Componentes/skeleton-lista.png)

## Reglas

- Imita la forma real del contenido: mismos tamaños y posiciones, para que nada salte al cargar.
- Sin texto ni íconos dentro.
- Si la carga falla, reemplázalo por el error.

## Relacionados

`ActivityIndicator` · `ProgressBar` · `Table` · Carga.

## Referencias

- IBM, Carbon Design System: Skeleton states.
