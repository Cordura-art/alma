---
component: ProductCard
tab: Código
summary: Cómo usar ProductCard en React.
---


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
