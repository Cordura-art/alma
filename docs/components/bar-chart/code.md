---
component: BarChart
tab: Código
summary: Cómo usar BarChart en React.
---


## Uso

```jsx
const { BarChart } = window.AlmaDS;

h(BarChart, {
  title: 'Talca fue el destino más vendido en marzo',
  description: 'Pasajes vendidos por destino · marzo de 2026',
  data: [{ label: 'Talca', value: 1840 }, { label: 'Chillán', value: 1420 }, { label: 'Temuco', value: 1260 }],
  highlight: 'Talca',
  unit: 'pasajes',
  labelHeader: 'Destino'
})
```

## Propiedades

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `title` | texto | — | La conclusión. Obligatorio: también nombra el gráfico para un lector de pantalla. |
| `description` | texto | — | La bajada: unidad, periodo, fuente. |
| `data` | `[{ label, value }]` | — | Una barra por elemento, en ese orden. |
| `orientation` | `'vertical'` o `'horizontal'` | Según el espacio | Sin indicarlo, pasa a horizontal cuando las barras quedan angostas. |
| `highlight` | texto | — | El `label` de la barra que conserva el acento. |
| `categorical` | sí o no | no | Un color categórico por barra. |
| `unit` | texto | — | La unidad, para el detalle y la tabla. |
| `format` | función | Formato de Chile | Cómo se escribe un valor. |
| `showValues` | sí o no | no | El valor sobre cada barra vertical. |
| `max` | número | El mayor valor | Hasta dónde llega el eje. |
| `height` | número | 240 | El alto del gráfico vertical, en px. |
| `summary` | texto | Se arma solo | Lo que un lector de pantalla lee después del título. |
| `labelHeader`, `valueHeader` | texto | «Categoría», «Valor» | Los encabezados de la tabla alternativa. |

## Ancho

`BarChart` ocupa el ancho de su contenedor y se redibuja si cambia. No le des un ancho fijo.
