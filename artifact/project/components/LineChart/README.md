# LineChart

Un gráfico de líneas para ver cómo cambia una cantidad.


## Uso

### Resumen

`LineChart` responde «¿cómo cambió?». Muestra una o varias series a lo largo de algo que tiene orden, casi siempre el tiempo.

Antes de usarlo, lee **Gráficos de datos**.

### Cuándo usarlo

- Para ver una tendencia: sube, baja, se mantiene.
- Para comparar cómo evolucionan hasta ocho series.

### Cuándo no

- Para categorías sin orden: usa `BarChart`. Una línea entre «Talca» y «Chillán» sugiere un camino que no existe.
- Para dos o tres periodos: las barras se leen mejor.

### Anatomía

1. **Título:** la conclusión.
2. **Bajada** (opcional): la unidad, el periodo, la fuente.
3. **«Ver como tabla».**
4. **Líneas**, cada una con su nombre al final. En pantallas angostas, los nombres pasan a una leyenda sobre el gráfico.
5. **Eje y líneas de guía.**
6. **Guía vertical y detalle:** al apuntar o enfocar, marcan el punto y dan su valor.

> **Imagen pendiente:** un `LineChart` con tres series, una en el color del acento y dos neutras, cada una rotulada al final, la guía vertical sobre marzo y el detalle abierto.

### Color

| Manera | Cómo | Cuándo |
|---|---|---|
| Una serie | Va en el acento. | — |
| Varias, con un énfasis | `highlight`, con el nombre de una. Las demás, neutras. | Cuando el título habla de una. Es lo más claro. |
| Varias, categóricas | Por defecto: los colores categóricos, en orden. | Cuando todas importan por igual. |

### Datos que faltan

Un valor que falta se escribe `null`, y deja un hueco en la línea. Nunca lo reemplaces por cero: una línea que cae a cero dice que no hubo nada, no que no se sabe.

### El eje

Parte de cero mientras los datos sean positivos. Si las diferencias no se ven así, fija otro punto de partida con `min`, y dilo en la bajada.

### Relacionados

`BarChart` · `Table` · Gráficos de datos.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Línea | trazo | `interactive-01` |
| Línea sin énfasis | trazo | `text-03` |
| Línea categórica | trazo | `viz-cat-01` a `viz-cat-08` |
| Punto activo | relleno y contorno | El de su línea, y `ui-02` |
| Guía vertical | trazo | `text-03`, punteada |
| Líneas de guía | trazo | `border-subtle` |
| Nombres de serie, título | color del texto | `text-01` |
| Bajada, eje, leyenda | color del texto | `text-02` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título | 16 / 1 | `font-weight-emphasis` |
| Bajada | 14 / 0,875 | `font-weight-body` |
| Eje, nombres, leyenda | 12 / 0,75 | `font-weight-body` |

Todos los números usan cifras del mismo ancho.

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Gráfico | alto | 240 px (`height`) |
| Línea | grosor | 2 px; 3 px la que está activa |
| Punto | radio | 3 px, visible con ocho valores o menos |
| Punto activo | radio | 5 px |
| Rótulos del eje | separación | Al menos 64 px entre uno y otro; se saltan los que no caben |

### Movimiento

Las líneas se trazan una vez, al aparecer, con `duration-slow-02` y `easing-entrance-expressive`. Con movimiento reducido, están completas desde el principio.

## Código

### Uso

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

### Propiedades

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

### Ancho

Ocupa el ancho de su contenedor. Bajo 480 px, los nombres de las series pasan de estar junto a cada línea a una leyenda sobre el gráfico.

## Accesibilidad

### Qué ofrece ALMA

- **Los datos en una tabla**, con «Ver como tabla»: una fila por periodo y una columna por serie.
- **Un nombre y un resumen.** El título nombra el gráfico, y un resumen que se arma solo dice de dónde a dónde va cada serie.
- **Una sola parada de Tab.** Las flechas hacia los lados van de un valor al siguiente; hacia arriba y abajo, de una serie a otra.
- **Cada valor se anuncia** con su serie y su periodo: «Talca, Mar: 1.840 pasajes. 3 de 6».
- **El detalle aparece con el foco**, igual que con el puntero.
- **No depende del color:** cada línea lleva su nombre junto a ella, o en la leyenda.
- **Un dato que falta** se anuncia como «sin dato», y en la tabla es una raya.
- **Con movimiento reducido**, las líneas no se trazan.

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al gráfico; sale de él. |
| → ← | Valor siguiente o anterior. |
| ↑ ↓ | Serie anterior o siguiente. |
| Inicio, Fin | Primer o último valor. |
| Esc | Cierra el detalle. |

### Recomendaciones de diseño

- Con más de cuatro series, usa `highlight`: ocho colores a la vez son difíciles de seguir para cualquiera.
- Si dos líneas se cruzan mucho, considera dos gráficos chicos, uno al lado del otro.

### Consideraciones de desarrollo

- No quites «Ver como tabla».
- Un gráfico que se actualiza solo no debe anunciar cada cambio.

Pendiente: VoiceOver y NVDA.
