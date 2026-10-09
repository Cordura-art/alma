---
component: SplitView
tab: Código
summary: Cómo usar SplitView en React.
---


## Uso

```js
h(SplitView, {
  primaryLabel: 'Mis viajes', detailLabel: 'Detalle del viaje',
  primary: h(List, { selection: 'single', selected: id, onSelect: elegir, items: viajes }),
  detail: detalle,
  showDetail: viendo, onBack: volver
})
```

## Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `primary`, `detail` | contenido | — | Los dos paneles. |
| `primaryLabel`, `detailLabel` | texto | «Lista», «Detalle» | Sus nombres. |
| `defaultWidth`, `minWidth`, `maxWidth` | número | 280, 200, 480 | El ancho de la lista, en px. |
| `showDetail` | sí o no | no | Angosto: muestra el detalle en vez de la lista. |
| `onBack`, `backLabel` | función, texto | —, «Volver» | Angosto: el botón para volver a la lista. |
