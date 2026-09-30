# ProductCard

Una tarjeta desplegable con fondo del color de una familia de etiquetas.


## Uso

### Resumen

`ProductCard` muestra un título y, al desplegarla, un dato destacado, una imagen y un texto. Su fondo toma el color de una familia de etiquetas. Es propia de ALMA.

#### Cuándo usarla
- Productos o beneficios que se hojean y se abren para leer más.

#### Cuándo no usarla
- **Una tarjeta que lleva a otra página:** `Card`.
- **Contenido largo por partes:** `Accordion`.

### Anatomía

1. **Título.**
2. **Botón** Expandir / Contraer.
3. **Dato destacado** (al abrir).
4. **Imagen** (al abrir), 328 × 245.
5. **Texto** (al abrir).

> **Imagen pendiente:** la tarjeta cerrada y abierta, en el tono rojo.

### Tonos

El fondo usa `tag-<tono>-bg`: `red` (por defecto), `yellow`, `magenta`, `purple`, `blue`, `cyan`, `teal`, `green`, `warmgray`, `gray` o `coolgray`. No mezcles más de dos tonos en una misma lista.

### Comportamiento

- El botón abre y cierra; el contenido aparece bajando.
- `collapsible: false` la deja siempre abierta, sin botón.

### Relacionados

`Card` · `Accordion` · `Tag`.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Tarjeta | fondo | `product-card-bg`, o `tag-<tono>-bg` |
| Título y texto | color | `product-card-text` (`text-on-interactive`) |
| Dato destacado | color | `product-card-subtitle` |
| Botón | fondo | `product-card-toggle-bg` (`brand-white`) |
| Botón:focus | contorno | `focus` (2 px, separado 2 px) |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Estilo de texto |
|---|---|---|
| Título | 16 / 1 | `web-label-l` |
| Dato destacado | 20 / 1,25 | `web-label-xl` |
| Texto | 14 / 0,875, al 87 % de opacidad | `web-body-m` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Tarjeta | ancho | 328 px (20,5 rem) |
| Tarjeta | radio | 24 px (el valor de `radius-panel`) |
| Cabecera | relleno | 16 px |
| Imagen | alto | 245 px, recortada |
| Texto | relleno | 20 px arriba y abajo, 16 px a los lados |
| Botón | relleno, radio | 4 px, `radius-pill`; área de toque de 44 px |

> **Imagen pendiente:** anatomía acotada.

### Movimiento

El contenido aparece bajando 4 px en `duration-moderate-02` con `easing-entrance-productive`. Con movimiento reducido, sin animación.

### Contraste

Texto a 4,5:1 sobre los once fondos de etiqueta, en los cuatro temas.

## Código

### Uso

```js
const { ProductCard } = window.AlmaDS;
h(ProductCard, { title: 'Pasaje flexible', subtitle: '$1.990 extra', tone: 'teal',
  image: 'flexible.jpg', imageAlt: '' }, 'Cambia la fecha sin costo hasta 4 horas antes de la salida.')
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | `string` | — | Obligatorio. |
| `subtitle` | `string` | — | Dato destacado. |
| `image` / `imageAlt` | `string` | — | Imagen; `imageAlt` vacío si es decorativa. |
| `children` | `node` | — | El texto. |
| `tone` | `string` | `'red'` | Familia de etiqueta del fondo. |
| `open` / `defaultOpen` / `onToggle` | `boolean` / `(open) => void` | — | Abierta o cerrada. |
| `collapsible` | `boolean` | `true` | `false`: siempre abierta. |

## Accesibilidad

### Qué ofrece ALMA

- El botón se llama «Expandir» o «Contraer» y tiene `aria-expanded`.
- Su área de toque mide 44 × 44 px, aunque se vea más chico.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega al botón. |
| Enter o Espacio | Abre o cierra. |

### Recomendaciones de diseño

- «Expandir» no dice qué se expande: si hay varias tarjetas juntas, el título debe ser lo bastante claro para ubicarse.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
