# PageControl

Una fila de puntos, uno por página, para moverse en un carrusel.


## Uso

### Resumen

`PageControl` muestra cuántas páginas hay en una lista plana (un carrusel, un recorrido de bienvenida) y cuál se está viendo. Es el *page control* de Apple.

#### Cuándo usarlo
- Carruseles y recorridos de pantallas del mismo nivel, idealmente de 3 a 10.

#### Cuándo no usarlo
- **Datos paginados en una tabla o una lista:** `Pagination`.
- **Pasos de un flujo:** `ProgressIndicator`.
- **Más de 10 páginas:** no se pueden contar de un vistazo.

### Anatomía

1. **Punto** por página.
2. **Página actual**: una píldora más ancha.

> **Imagen pendiente:** 5 puntos con el tercero como página actual.

### Comportamiento

- Tocar un punto lleva a su página.
- La página actual se distingue por la forma (más ancha), no solo por el color.
- Acompáñalo de una forma más de moverse: deslizar el carrusel o botones anterior y siguiente.

### Relacionados

`Pagination` · `ProgressIndicator`.

### Referencias

- Apple, Human Interface Guidelines: Page controls.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Punto | fondo | `page-control-dot` |
| Página actual | fondo | `page-control-dot-selected` (`nav-selected`) |
| Punto:focus | contorno | `focus` (2 px, por dentro) |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Punto | tamaño | 8 × 8 px |
| Página actual | tamaño | 24 × 8 px, `radius-pill` |
| Área de toque del punto | tamaño | 24 × 44 px (32 × 44 en el actual) |

> **Imagen pendiente:** anatomía acotada.

### Movimiento

La píldora cambia de ancho en `duration-moderate-01` con `easing-standard-productive`.

### Contraste

Puntos a 3:1 sobre la página, en los cuatro temas.

## Código

### Uso

```js
const { PageControl } = window.AlmaDS;
h(PageControl, { count: 5, value: slide, onChange: setSlide, label: 'Recorrido de bienvenida' })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `count` | `number` | — | Cuántas páginas. |
| `value` / `defaultValue` | `number` | `0` | Índice de la actual. |
| `onChange` | `(index) => void` | — | — |
| `label` | `string` | `'Páginas'` | Nombre del grupo. |

## Accesibilidad

### Qué ofrece ALMA

- Es un grupo nombrado por `label`.
- Cada punto es un botón llamado «Página 3 de 5»; el actual lleva `aria-current`.
- Área de toque de 44 px de alto.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre los puntos. |
| Enter o Espacio | Va a esa página. |
| ← / → | Página anterior o siguiente. |

### Recomendaciones de diseño

- El carrusel también debe poder moverse sin los puntos.

### Consideraciones de desarrollo

- Anuncia el cambio de página si el contenido cambia sin mover el foco.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
