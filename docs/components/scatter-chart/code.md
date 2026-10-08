---
component: ScatterChart
tab: Código
summary: Cómo usar ScatterChart en React.
---


## Uso

```jsx
const { ScatterChart } = window.AlmaDS;

h(ScatterChart, {
  title: 'Mientras más lejos, más caro: unos 28 pesos por kilómetro',
  description: 'Precio del pasaje semicama según la distancia desde Santiago',
  points: [{ label: 'Talca', x: 255, y: 9800 }, { label: 'Temuco', x: 680, y: 19800 }, { label: 'Valdivia', x: 840, y: 26500 }],
  xLabel: 'Distancia', xUnit: 'km',
  yLabel: 'Precio', yUnit: 'pesos',
  labelled: ['Valdivia']
})
```

## Propiedades

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `title` | texto | — | La conclusión. Obligatorio. |
| `description` | texto | — | La bajada. |
| `points` | `[{ x, y, label, group }]` | — | Un punto por elemento. `label` es su nombre; `group`, el grupo al que pertenece. |
| `xLabel`, `yLabel` | texto | — | El nombre de cada eje. |
| `xUnit`, `yUnit` | texto | — | La unidad de cada eje. |
| `labelled` | lista de textos | — | Los `label` de los puntos que llevan su nombre al lado. |
| `formatX`, `formatY` | función | Formato de Chile | Cómo se escribe un valor de cada eje. |
| `minX`, `minY` | número | 0, o el menor valor si hay negativos | Dónde parte cada eje. |
| `height` | número | 280 | El alto, en px. |
| `summary` | texto | Se arma solo | Lo que un lector de pantalla lee después del título. |
| `labelHeader`, `groupHeader` | texto | «Punto», «Grupo» | Encabezados de la tabla alternativa. |

Acepta también `loading`, `error`, `onRetry`, `emptyTitle`, `emptyMessage` y `emptyAction`, como los demás gráficos. Ver **BarChart › Código › Estados**.
