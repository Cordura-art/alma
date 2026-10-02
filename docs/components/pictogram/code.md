---
component: Pictogram
tab: Código
summary: Cómo usar Pictogram en React.
---


## Uso

```js
const { Pictogram } = window.AlmaDS;
h(Pictogram, { name: 'Capítulo 3' })
h(Pictogram, { name: 'Capítulo 3', size: 32 })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `name` | `string \| number` | — | El nombre de la cosa. Mayúsculas y espacios al borde no cambian el dibujo. |
| `size` | `24 \| 32` | `24` | En px; se dibuja en rem. |
| `drawing` | `number` | — | Uno de los dibujos, como lo entrega `pictogramDrawings()` para una lista. |
| `color` | `string` | — | Mejor heredarlo; si lo pasas, usa un token (`var(--nav-selected)`). |
| `label` | `string` | — | Nombre para el lector. Omítelo si el nombre de la cosa está al lado. |
| `className` | `string` | — | — |

## En una lista

```js
const nombres = ['Prólogo', 'Capítulo 1', 'Capítulo 2'];
const dibujos = AlmaDS.pictogramDrawings(nombres);
nombres.map((n, i) => h(Pictogram, { key: n, name: n, drawing: dibujos[i] }))
```

`pictogramDrawings` reparte los dibujos para que ninguno se repita mientras queden disponibles. La misma lista da siempre el mismo reparto.

## La semilla de una entidad

```js
AlmaDS.configurePictograms({ seed: 'nac|2026-10-01|12:00|America/Santiago' });
```

No suele hacer falta: el componente lee la semilla de la hoja de valores de la entidad (`--pictogram-seed`), y el grosor y el remate de los tokens `font-weight-body` y `radius-button`. `configurePictograms` los fija a mano (`seed`, `stroke` con 1 = el trazo base, `round`); con `null` vuelve a leerlos. Devuelve los valores con que se dibuja.

Los dibujos viven en `entidades/pictogramas.mjs`. `npm run build` los copia al paquete de componentes; no se editan en `bundle.js`.
