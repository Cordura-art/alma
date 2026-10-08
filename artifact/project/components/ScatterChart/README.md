# ScatterChart

Un gráfico de puntos para ver si dos medidas van juntas.


## Uso

### Resumen

`ScatterChart` responde «¿se relacionan?». Cada punto es una cosa (un viaje, una ruta, una persona) puesta según dos medidas: una a lo ancho y otra a lo alto.

Antes de usarlo, lee **Gráficos de datos**.

### Cuándo usarlo

- Para ver si una medida sube o baja cuando la otra sube.
- Para encontrar lo que se sale de la norma: el punto que queda lejos de los demás.
- Para ver grupos: puntos que se juntan en una zona.

### Cuándo no

- Si una de las dos medidas es el tiempo: usa `LineChart`.
- Si una de las dos es una categoría: usa `BarChart`.
- Con muy pocos puntos (menos de seis): una tabla dice lo mismo.

### Anatomía

1. **Título:** la conclusión. «Mientras más lejos, más caro».
2. **Bajada** (opcional).
3. **«Ver como tabla».**
4. **Los dos ejes**, cada uno con su nombre y su unidad.
5. **Puntos.** Los que importan llevan su nombre al lado.
6. **Leyenda**, solo si hay grupos.
7. **Detalle:** el nombre del punto y sus dos valores.

![Anatomía de ScatterChart: el título con la conclusión (1), la bajada (2), el botón «Ver como tabla» (3), el nombre de un eje con su unidad (4), los puntos, dos de ellos con su nombre al lado (5), y el detalle abierto sobre el punto de Concepción (7). La leyenda (6) no aparece: todos los puntos son de un mismo grupo.](assets/Componentes/scatter-chart-anatomia.png)

### Color

| Manera | Cómo | Cuándo |
|---|---|---|
| Un color | Por defecto: todos en el acento. | Cuando todos los puntos son la misma clase de cosa. |
| Por grupo | Cada punto con su `group`. Cada grupo toma un color categórico, en orden. | Para comparar cómo se comportan dos o tres grupos. Con más de cuatro, se vuelve difícil de leer. |

### Rotular

No rotules todos los puntos: se tapan entre sí. Con `labelled` eliges los pocos que el título menciona o que se salen de la norma. Los demás dan su nombre al apuntarlos. El nombre va a la derecha de su punto, y pasa solo a la izquierda si otro punto le estorba.

### Los ejes

Parten de cero mientras los datos sean positivos. Si los puntos quedan apretados en una esquina, fija el punto de partida con `minX` o `minY`, y dilo en la bajada.

### Relacionados

`LineChart` · `BarChart` · `Table` · Gráficos de datos.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Punto | relleno | `interactive-01` |
| Punto de un grupo | relleno | `viz-cat-01` a `viz-cat-08` |
| Punto activo | relleno y contorno | El suyo, y `ui-02` |
| Líneas de guía | trazo | `border-subtle` |
| Línea de base | trazo | `text-03` |
| Nombres de punto, título | color del texto | `text-01` |
| Bajada, ejes, leyenda | color del texto | `text-02` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título | 16 / 1 | `font-weight-emphasis` |
| Bajada | 14 / 0,875 | `font-weight-body` |
| Ejes, nombres, leyenda | 12 / 0,75 | `font-weight-body` |

Todos los números usan cifras del mismo ancho.

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Gráfico | alto | 280 px (`height`) |
| Punto | diámetro | 8 px |
| Punto activo | diámetro | 12 px |
| Área que responde alrededor de un punto | radio | 24 px |
| Nombre de un eje | lugar | El de lo alto, arriba a la izquierda; el de lo ancho, abajo a la derecha. Sin texto girado. |

Los puntos son un poco transparentes, para que se note cuando dos caen en el mismo lugar.

## Código

### Uso

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

### Propiedades

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

## Accesibilidad

### Qué ofrece ALMA

- **Los datos en una tabla**, con «Ver como tabla»: una fila por punto, ordenadas por el valor de lo ancho.
- **Un nombre y un resumen.** El título nombra el gráfico, y un resumen que se arma solo dice cuántos puntos hay y entre qué valores va cada medida.
- **Una sola parada de Tab.** Las flechas recorren los puntos del menor al mayor valor de lo ancho.
- **Cada punto se anuncia** con su nombre y sus dos valores: «Talca. Distancia: 255 km · Precio: 9.800 pesos. 3 de 9».
- **El detalle aparece con el foco**, igual que con el puntero.
- **El área que responde** alrededor de un punto es más grande que el punto.

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al gráfico; sale de él. |
| → ← | Punto siguiente o anterior, según su valor a lo ancho. |
| Inicio, Fin | Primer o último punto. |
| Esc | Cierra el detalle. |

### Recomendaciones de diseño

- Un gráfico de puntos es de los más difíciles de entender sin verlo. El título tiene que decir la relación: «Mientras más lejos, más caro».
- Si el resumen que se arma solo no dice lo importante, escribe uno en `summary`.
- Los grupos se distinguen por color. Con más de dos, nómbralos también en el `label` de cada punto, que es lo que se anuncia.

### Consideraciones de desarrollo

- No quites «Ver como tabla».
- Con cientos de puntos, recorrerlos uno a uno con el teclado deja de servir: la tabla y el resumen pasan a ser la manera principal.

Pendiente: VoiceOver y NVDA.
