# ProductCard

Algo que se vende: su imagen, su nombre, su precio y una acción.


## Uso

### Resumen

`ProductCard` presenta un producto en una grilla o en una lista: su imagen, su nombre, lo que dice la gente de él, lo que cuesta y una cosa que hacer con él. Toda la tarjeta abre el producto; su acción tiene un área propia.

### Anatomía

1. **Imagen**, en proporción 4 a 3. Lo primero que se mira.
2. **Insignia** (opcional): una sola palabra sobre la imagen. «Nuevo».
3. **Categoría** (opcional), en texto secundario.
4. **Nombre.** Es el título de la tarjeta y su enlace.
5. **Descripción** (opcional): una frase, dos líneas como mucho.
6. **Valoración** (opcional): las estrellas, la cifra y cuántas personas opinaron.
7. **Precio**, y su nota: las cuotas, hasta cuándo vale.
8. **Acción:** una sola. «Agregar».

![ProductCard. A la izquierda, una tarjeta con sus partes numeradas: la imagen (1) con la insignia «Nuevo» (2), la categoría (3), el nombre (4), la descripción (5), la valoración (6), el precio con su nota (7) y la acción «Agregar» (8). Al centro, una con rebaja: el precio anterior tachado junto al nuevo. A la derecha, una agotada: la imagen apagada y, en lugar de la acción, «Agotado. Vuelve el 12 de abril.»](assets/Componentes/product-card-tono.png)

### Cuándo usarla

- En una grilla o un carrusel de productos: úsala dentro de una `Collection`.
- En una lista corta, como un carro: con `layout: 'horizontal'`.

### Cuándo no

- **Para un contenido que no se vende:** `Card`.
- **Para comparar muchos productos por sus datos:** `Table`.
- **Para un texto que se despliega:** `Accordion`. Hasta octubre de 2026 `ProductCard` era una tarjeta desplegable de color; ese uso es de `Accordion`.

### El precio

- **El precio de hoy es lo más visible** después del nombre.
- **Una rebaja muestra los dos precios:** el anterior tachado y más chico, a la izquierda, y el nuevo. Nunca solo el color dice que hay rebaja.
- **La nota dice la condición:** «o 6 cuotas de $14.998», «Hasta el 4 de abril». Una línea.
- **Con el formato del país:** «$89.990».

### Agotado

Cuando no se puede comprar, la acción se reemplaza por un texto que dice por qué y, si se sabe, hasta cuándo: «Agotado. Vuelve el 12 de abril.» La imagen se apaga. La tarjeta se sigue pudiendo abrir.

### Reglas

- **Una sola acción.** Dos botones en cada tarjeta de una grilla son demasiados.
- **La acción es `tinted`,** no `filled`: en una grilla hay muchas, y ninguna es la principal de la pantalla.
- **La insignia es una palabra,** y pocas tarjetas la llevan. Si todas son «Nuevo», ninguna lo es.
- **Todas las tarjetas de una grilla miden lo mismo** y llevan las mismas partes, aunque alguna quede vacía.
- **La imagen muestra el producto,** sobre un fondo parejo. Su texto alternativo dice qué es.
- **Sin fotos, usa una figura de línea** (`media`): toma los tonos de línea del tema y el acento de la entidad, y no hay que rehacerla para cada una. Dentro de la tarjeta queda quieta: lo que responde es la tarjeta.

### Relacionados

`Card` · `Collection` · `Rating` · `ImageView` · `Table`.

### Referencias

- Apple, Human Interface Guidelines: Collections; Buttons.
- Baymard Institute: Product list item design.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Tarjeta | fondo | `card-bg`; con el cursor encima, `card-bg-hover` |
| Tarjeta | borde | `card-border` |
| Imagen | fondo, mientras carga | `ui-03` |
| Insignia | fondo y texto | `ui-01` y `text-01` |
| Nombre, precio | texto | `text-01` |
| Categoría, descripción, precio anterior, nota, «Agotado» | texto | `text-02` |
| Foco | contorno | `focus` |

### Tipografía

| Elemento | Tamaño | Peso |
|---|---|---|
| Nombre | 18 px | `font-weight-heading` |
| Precio | 20 px, cifras tabulares | `font-weight-emphasis` |
| Descripción, precio anterior | 14 px | `font-weight-body` |
| Categoría, nota, insignia | 12 px | — |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Tarjeta | ancho | hasta 320 px; en fila, hasta 576 px |
| Tarjeta | radio | `radius-panel` |
| Imagen | proporción | 4 a 3; en fila, cuadrada y de 160 px |
| Cuerpo | relleno | `space-16` a los lados, `space-24` abajo |
| Cuerpo | entre líneas | `space-8` |
| Insignia | desde el borde | `space-16` |
| Acción | relleno | `space-16` |

![Medidas de ProductCard: 320 px de ancho como máximo, la imagen en proporción 4 a 3, relleno de 16 px a los lados y 8 px entre las líneas del texto.](assets/Componentes/product-card-medidas.png)

## Código

```js
var h = React.createElement, A = AlmaDS;

h(A.ProductCard, {
  href: '/audifonos-ruta',
  image: '/img/audifonos-ruta.jpg', imageAlt: 'Audífonos de diadema, con almohadillas azules',
  badge: 'Nuevo', eyebrow: 'Audio', title: 'Audífonos Ruta',
  description: 'Cancelación de ruido y 30 horas de batería, para viajes largos.',
  rating: { value: 4.5, count: 1284 },
  price: '$89.990', priceNote: 'o 6 cuotas de $14.998',
  action: { label: 'Agregar', icon: 'add', onPress: agregar }
});
```

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `title` | texto | — | El nombre del producto. Obligatorio. |
| `href`, `onPress` | texto, función | — | Adónde lleva la tarjeta, o qué hace al tocarla. Toda la tarjeta responde. |
| `image`, `imageAlt` | texto | — | La imagen y su texto alternativo. |
| `media` | contenido | — | Algo dibujado en lugar de la imagen: una figura de línea de ALMA. Va en vez de `image`. |
| `badge` | texto | — | La insignia sobre la imagen. |
| `eyebrow` | texto | — | La categoría. |
| `description` | texto | — | Una frase. Se corta en dos líneas. |
| `rating` | `{ value, count }` | — | La valoración, como en `Rating`. |
| `price` | texto | — | El precio de hoy, ya con formato. |
| `previousPrice` | texto | — | El precio anterior, tachado. |
| `priceNote` | texto | — | La nota bajo el precio. |
| `action` | `{ label, onPress, icon, variant, ariaLabel }` | — | La acción. `variant` es `tinted` si no se dice. |
| `unavailable` | sí, o texto | no | Reemplaza la acción por «Agotado», o por el texto que le des. |
| `layout` | `vertical`, `horizontal` | `vertical` | En grilla o en fila. |
| `headingLevel` | número | 3 | El nivel del título. |

En una grilla, usa `Collection` con `minItemWidth` de 240 a 320.

Cambio de octubre de 2026: `subtitle`, `tone`, `open`, `defaultOpen`, `collapsible`, `onToggle` y el contenido como hijos ya no existen. Para un texto que se despliega, usa `Accordion`.

## Accesibilidad

### Qué ofrece ALMA

- **La tarjeta es un artículo** que lleva el nombre de su producto.
- **Toda la tarjeta se puede tocar, con un solo enlace:** el del nombre. Un lector de pantalla lo encuentra una vez, no una por cada parte.
- **La acción tiene su propio nombre:** «Agregar: Audífonos Ruta». En una grilla, veinte botones «Agregar» iguales no dicen nada.
- **La rebaja se dice con palabras:** «Antes $54.990, ahora $39.990». El tachado solo se ve.
- **La valoración dice su valor:** «4,5 de 5 estrellas».
- **«Agotado» es texto,** no un botón apagado: se lee y explica qué pasa.
- **El foco se ve** alrededor de toda la tarjeta.

### Lo que te toca

- Escribe el texto alternativo de la imagen: qué producto es, no «foto».
- No pongas en la insignia algo que solo se entienda por su color.
- Si la tarjeta tiene acción, que haga una sola cosa y diga cuál.

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Va al nombre (la tarjeta) y después a su acción. |
| Enter | Abre el producto, o ejecuta la acción. |

### Pruebas

Pendiente: VoiceOver y NVDA.
