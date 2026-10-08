---
component: LineChart
tab: Código
summary: Cómo usar LineChart en React.
---


## Uso

```jsx
const { LineChart } = window.AlmaDS;

h(LineChart, {
  title: 'Talca se despegó del resto desde marzo',
  description: 'Pasajes vendidos por mes y destino',
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  series: [
    { name: 'Talca', values: [1210, 1300, 1840, 1900, 2050, 2240] },
    { name: 'Chillán', values: [1180, 1240, 1420, 1390, null, 1460] }
  ],
  highlight: 'Talca',
  unit: 'pasajes',
  labelHeader: 'Mes'
})
```

## Propiedades

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `title` | texto | — | La conclusión. Obligatorio. |
| `description` | texto | — | La bajada. |
| `labels` | lista de textos | — | Lo que va a lo ancho: meses, fechas. |
| `series` | `[{ name, values }]` | — | Una línea por elemento. `values` tiene un valor por cada `label`; `null` es un dato que falta. |
| `highlight` | texto | — | El `name` de la serie que lleva el acento. |
| `unit` | texto | — | La unidad, para el detalle y la tabla. |
| `format` | función | Formato de Chile | Cómo se escribe un valor. |
| `min` | número | 0, o el menor valor si hay negativos | Dónde parte el eje. |
| `height` | número | 240 | El alto, en px. |
| `summary` | texto | Se arma solo | Lo que un lector de pantalla lee después del título. |
| `labelHeader` | texto | «Periodo» | El encabezado de la primera columna de la tabla. |

## Ancho

Ocupa el ancho de su contenedor. Bajo 480 px, los nombres de las series pasan de estar junto a cada línea a una leyenda sobre el gráfico.
