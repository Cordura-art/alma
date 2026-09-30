# Skeleton

Una versión simplificada del contenido mientras carga.


## Uso

### Resumen

`Skeleton` dibuja la forma del contenido antes de que llegue, con un brillo que dice que la página no está trabada. Son los *skeleton states* de Carbon.

#### Cuándo usarlo
- En la carga inicial de contenedores y datos: tablas, tarjetas, listas.
- Solo por unos segundos: desaparece cuando llega el contenido.

#### Cuándo no usarlo
- **Para acciones** (botones, campos, switches), toasts, menús, modales ni indicadores de carga. El contenido dentro de un modal sí puede tenerlo; el modal no.
- **Si la espera es larga o medible:** `ProgressBar`.

### Formas

| Forma | Propiedad | Para |
|---|---|---|
| Texto | `shape: 'text'` | Líneas de texto; la última, más corta. |
| Bloque | `shape: 'block'` | Imágenes, tarjetas, gráficos. |
| Círculo | `shape: 'circle'` | Avatares e íconos. |

![Una lista de viajes mientras carga, dibujada con Skeleton, y la misma lista ya cargada.](assets/Componentes/skeleton-lista.png)

### Reglas

- Imita la forma real del contenido: mismos tamaños y posiciones, para que nada salte al cargar.
- Sin texto ni íconos dentro.
- Si la carga falla, reemplázalo por el error.

### Relacionados

`ActivityIndicator` · `ProgressBar` · `Table` · Carga.

### Referencias

- IBM, Carbon Design System: Skeleton states.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Hueso | fondo | `skeleton-02`, al 55 % de opacidad |
| Brillo | color | `skeleton-01` |

### Estructura

| Forma | Alto | Radio |
|---|---|---|
| Texto | 12 px | `radius-chip` |
| Bloque | 120 px (o `height`) | `radius-panel` |
| Círculo | 44 × 44 px | 50 % |

Las líneas de texto se separan 8 px.

### Movimiento

El brillo cruza cada hueso cada 1,4 s con `easing-standard-productive`. Con movimiento reducido, el brillo queda fijo y el hueso semitransparente.

### Contraste

Es decorativo: no necesita contraste mínimo. Lo que informa es su `label`.

## Código

### Uso

```js
const { Skeleton } = window.AlmaDS;
h(Skeleton, { label: 'Cargando tus viajes', lines: 3 })
h(Skeleton, { shape: 'block', height: 160 })
h(Skeleton, { shape: 'circle' })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `shape` | `'text' \| 'block' \| 'circle'` | `'text'` | Forma. |
| `lines` | `number` | `3` | Líneas de texto (solo con `shape: 'text'`). |
| `width` / `height` | `string \| number` | — | Tamaño. |
| `label` | `string` | `'Cargando contenido'` | Lo oye el lector. |

## Accesibilidad

### Qué ofrece ALMA

- Cada `Skeleton` es `role="status"` con `aria-busy="true"` y su `label` oculto a la vista: el lector dice «Cargando tus viajes».
- Los huesos están ocultos para el lector.
- Con movimiento reducido, el brillo queda fijo.

### Recomendaciones de diseño

- Un solo `label` por zona que carga. Si hay muchos esqueletos juntos, que solo uno lleve un `label` claro.

### Consideraciones de desarrollo

- Al llegar el contenido, reemplaza el esqueleto: no lo dejes oculto en la página.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
