# Collection

Ítems del mismo tipo que se miran más que se leen, en grilla o en una fila.


## Uso

### Resumen

`Collection` ordena ítems parecidos (fotos, tarjetas, destinos) en una grilla que llena el ancho, o en una fila que se desplaza. Es la *collection* de Apple.

### Cuándo usarla

- Para ítems que se reconocen por su imagen o su forma.
- Para ítems de tamaños distintos.

### Cuándo no

- **Para texto:** una `List` se recorre mejor. Las filas se leen; las grillas se miran.
- Para comparar datos: `Table`.

### Dos formas

| Forma | `layout` | Para |
|---|---|---|
| **Grilla** | `grid` | Verlos todos. Las columnas se acomodan solas al ancho. |
| **Fila** | `row` | Una muestra, dentro de una página con más cosas. Se desplaza hacia el lado. |

### Reglas

- **El mismo tamaño de celda**, o el doble para lo destacado. Tamaños arbitrarios desordenan.
- **`space-16` entre ítems.** Lo de adentro de cada ítem va más junto.
- **En una fila, el último ítem se ve cortado:** así se nota que hay más.
- **El orden no cambia** al cambiar el ancho: se lee de izquierda a derecha y de arriba abajo.

### Relacionados

`Card` · `List` · `ImageView` · `ProductCard` · Diseño adaptable.

### Referencias

- Apple, Human Interface Guidelines: Collections.

## Estilo

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Celda | ancho mínimo | 160 px (`minItemWidth`) |
| Ítems | separación | `space-16` (`gap`) |
| Ítem destacado | ancho | Dos celdas |
| Fila | desplazamiento | Hacia el lado, con parada en el inicio de cada ítem |

No tiene color propio: es el de sus ítems.

## Código

### Uso

```js
h(Collection, { label: 'Destinos', items: destinos, minItemWidth: 180,
  renderItem: function (d) { return h(Card, { title: d.nombre, eyebrow: d.km + ' km' }); } })

h(Collection, { label: 'Destinos', layout: 'row', items: destinos, renderItem: celda })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `items` | lista | — | Los ítems. Con `span: 2`, uno ocupa dos celdas. |
| `renderItem` | función | — | Dibuja cada ítem. |
| `label` | texto | — | El nombre de la colección. |
| `layout` | `grid`, `row` | `grid` | Grilla o fila. |
| `minItemWidth` | número | 160 | El ancho mínimo de una celda, en px. |
| `gap` | 8, 16, 24 | 16 | La separación. |

## Accesibilidad

### Qué ofrece ALMA

- **Es una lista con nombre:** un lector dice cuántos ítems tiene.
- **La fila que se desplaza recibe el foco**, y se recorre con las flechas del teclado.
- **El orden de lectura es el de la vista.**

### En tus manos

- Cada ítem necesita su nombre: una imagen sola, su texto alternativo.
- No escondas en una fila algo que solo se alcanza desplazando con el puntero.

Pendiente: VoiceOver y NVDA.
