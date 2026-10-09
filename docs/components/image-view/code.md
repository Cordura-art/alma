---
component: ImageView
tab: Código
summary: Cómo usar ImageView en React.
---


## Uso

```js
h(ImageView, { src: foto, alt: 'Un cerro frente al mar, al atardecer', ratio: '16 / 9', caption: 'Viña del Mar' })

h(ImageView, { src: generada, alt: 'un cerro frente al mar', ai: true })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `src` | texto | — | La imagen. |
| `alt` | texto | — | Qué muestra. Vacío solo si es de adorno. |
| `ratio` | texto | `4 / 3` | La proporción. |
| `fit` | `cover`, `contain` | `cover` | Recortar para llenar, o mostrar entera. |
| `position` | texto | centro | Qué parte se conserva al recortar. |
| `caption` | texto | — | Un pie. |
| `ai` | sí o no, o las propiedades de `AILabel` | no | La marca de IA. |
| `lazy` | sí o no | sí | Carga la imagen cuando se acerca a la vista. |
