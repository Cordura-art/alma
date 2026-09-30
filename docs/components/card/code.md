---
component: Card
tab: Código
summary: Cómo usar Card en React.
---


## Uso

```js
const { Card, Button } = window.AlmaDS;
h(Card, { href: '#viaje-4f2k', eyebrow: '31 mar · Interurbano', title: 'Santiago → Viña del Mar',
  subtitle: 'Salida 08:30 · Semicama',
  media: { src: 'vina.jpg', alt: '', ratio: '16 / 9' },
  actions: h(Button, { variant: 'gray', size: 'sm', onClick: share }, 'Compartir') })
```

## Propiedades

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
