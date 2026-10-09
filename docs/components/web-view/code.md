---
component: WebView
tab: Código
summary: Cómo usar WebView en React.
---


## Uso

```js
h(WebView, { src: 'https://www.ejemplo.cl/condiciones', title: 'Condiciones de cambio', height: 420 })

// Donde no se puede incrustar
h(WebView, { src: url, title: 'Condiciones de cambio', blocked: true })
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `src` | texto | — | La dirección. |
| `title` | texto | El dominio | El nombre del contenido. |
| `origin` | texto | El dominio | Lo que muestra la barra. |
| `height` | número | 360 | El alto, en px. |
| `blocked` | sí o no | no | No intenta mostrarlo: ofrece abrirlo afuera. |
| `sandbox` | texto | `allow-scripts allow-forms allow-popups` | Lo que se le permite a lo de adentro. |
