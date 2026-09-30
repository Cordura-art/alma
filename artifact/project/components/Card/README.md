# Card

Un contenedor de un tema: un viaje, una noticia, una configuración.


## Uso

### Resumen

`Card` reúne lo que se sabe de una cosa en un bloque: imagen, título, datos y, si hace falta, acciones. Toda la tarjeta puede ser un solo enlace. Es la *tile* de Carbon.

#### Cuándo usarla
- Colecciones de elementos parecidos que se hojean: viajes, noticias, destinos.
- Un resumen que lleva al detalle.

#### Cuándo no usarla
- **Para comparar elementos por los mismos datos:** `Table`.
- **Para listas de ajustes o destinos:** `List`.
- **Para un producto con despliegue y color de marca:** `ProductCard`.

### Anatomía

1. **Imagen** (opcional).
2. **Antetítulo** (opcional): fecha o categoría.
3. **Título.**
4. **Subtítulo** (opcional).
5. **Contenido** (opcional).
6. **Acciones** (opcionales), abajo.

![Una tarjeta de viaje con imagen, antetítulo con la fecha, título con la ruta, subtítulo con el asiento y la acción «Ver pasaje».](assets/Componentes/card-viaje.png)

### Tipos

| Tipo | Propiedad | Comportamiento |
|---|---|---|
| Informativa | — | Solo muestra. |
| Enlace | `href` u `onClick` | Toda la tarjeta lleva a un destino; el enlace va en el título. |
| Con acciones | `actions` | Botones propios que quedan por encima del enlace general. |

- Si la tarjeta ya es un enlace, que las acciones sean secundarias.
- No pongas enlaces dentro del contenido de una tarjeta enlace: compiten con el destino.

### Contenido

- **Título:** el nombre de la cosa, corto.
- **Antetítulo:** un dato breve que ubica («31 mar · Interurbano»).
- **Imagen:** 16:9 por defecto; `alt` vacío si es decorativa.

### Comportamiento

- La imagen se carga cuando se acerca a la pantalla.
- En una grilla, todas las tarjetas del mismo ancho; el alto lo da el contenido.

### Relacionados

`ProductCard` · `PaymentCard` · `List` · `Table`.

### Referencias

- IBM, Carbon Design System: Tile.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Tarjeta | fondo | `card-bg` |
| Tarjeta | borde (1 px) | `card-border` |
| Tarjeta enlace:hover | fondo | `card-bg-hover` |
| Tarjeta enlace:hover | título | subrayado |
| Tarjeta enlace:focus | contorno (alrededor de toda la tarjeta) | `focus` (2 px, separado 2 px) |
| Imagen (mientras carga) | fondo | `ui-03` |
| Antetítulo y subtítulo | color del texto | `text-02` |
| Título y contenido | color del texto | `text-01` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Antetítulo | 11 / 0,6875 | `font-weight-body` | — |
| Título | 18 / 1,125 | `font-weight-heading` | 1,4 |
| Subtítulo y contenido | 14 / 0,875 | `font-weight-body` | 1,6 |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Tarjeta | ancho máximo | 360 px (22,5 rem) |
| Tarjeta | radio | `radius-panel` |
| Cuerpo | relleno, separación | 24 px, 8 px |
| Acciones | relleno | 24 px a los lados y abajo |
| Acciones | separación | 8 px |
| Imagen | proporción | 16:9 por defecto |

![Medidas de Card: relleno del cuerpo, separación entre textos, relleno de las acciones y radio.](assets/Componentes/card-medidas.png)

### Movimiento

El fondo cambia en `duration-fast-02` con `easing-standard-productive`.

### Contraste

Textos a 4,5:1 sobre `card-bg` y sobre `card-bg-hover`, en los cuatro temas.

## Código

### Uso

```js
const { Card, Button } = window.AlmaDS;
h(Card, { href: '#viaje-4f2k', eyebrow: '31 mar · Interurbano', title: 'Santiago → Viña del Mar',
  subtitle: 'Salida 08:30 · Semicama',
  media: { src: 'vina.jpg', alt: '', ratio: '16 / 9' },
  actions: h(Button, { variant: 'gray', size: 'sm', onClick: share }, 'Compartir') })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | `node` | — | Obligatorio. |
| `eyebrow` / `subtitle` | `string` | — | — |
| `children` | `node` | — | Contenido. |
| `media` | `{ src, alt, ratio, width, height }` | — | Imagen; `ratio` por defecto `'16 / 9'`. |
| `href` / `onClick` | `string` / `(e) => void` | — | Toda la tarjeta es un enlace o un botón. |
| `actions` | `node` | — | Botones sobre el enlace. |
| `headingLevel` | `2–6` | `3` | Nivel del título. |
| `className` / `id` | `string` | — | — |

Pasa `width` y `height` de la imagen para que la página no salte al cargarla.

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- Es un `article` nombrado por su título.
- En una tarjeta enlace, el enlace está en el título: el lector anuncia solo el título, no toda la tarjeta. El área de clic se extiende a toda la tarjeta.
- El anillo de foco rodea toda la tarjeta.
- Las acciones son botones propios, por encima del enlace, y se alcanzan con Tab.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega al título (el enlace) y luego a cada acción. |
| Enter | Abre el enlace o activa el botón. |

### Recomendaciones de diseño

- El título debe bastar para saber a dónde lleva la tarjeta.
- Ajusta `headingLevel` a la jerarquía de la página.

### Consideraciones de desarrollo

- `alt` vacío en imágenes decorativas; si la imagen informa, descríbela.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
