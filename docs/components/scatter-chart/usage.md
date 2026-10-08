---
component: ScatterChart
tab: Uso
summary: Un gráfico de puntos para ver si dos medidas van juntas.
---


## Resumen

`ScatterChart` responde «¿se relacionan?». Cada punto es una cosa (un viaje, una ruta, una persona) puesta según dos medidas: una a lo ancho y otra a lo alto.

Antes de usarlo, lee **Gráficos de datos**.

## Cuándo usarlo

- Para ver si una medida sube o baja cuando la otra sube.
- Para encontrar lo que se sale de la norma: el punto que queda lejos de los demás.
- Para ver grupos: puntos que se juntan en una zona.

## Cuándo no

- Si una de las dos medidas es el tiempo: usa `LineChart`.
- Si una de las dos es una categoría: usa `BarChart`.
- Con muy pocos puntos (menos de seis): una tabla dice lo mismo.

## Anatomía

1. **Título:** la conclusión. «Mientras más lejos, más caro».
2. **Bajada** (opcional).
3. **«Ver como tabla».**
4. **Los dos ejes**, cada uno con su nombre y su unidad.
5. **Puntos.** Los que importan llevan su nombre al lado.
6. **Leyenda**, solo si hay grupos.
7. **Detalle:** el nombre del punto y sus dos valores.

![Anatomía de ScatterChart: el título con la conclusión (1), la bajada (2), el botón «Ver como tabla» (3), el nombre de un eje con su unidad (4), los puntos, dos de ellos con su nombre al lado (5), y el detalle abierto sobre el punto de Concepción (7). La leyenda (6) no aparece: todos los puntos son de un mismo grupo.](assets/Componentes/scatter-chart-anatomia.png)

## Color

| Manera | Cómo | Cuándo |
|---|---|---|
| Un color | Por defecto: todos en el acento. | Cuando todos los puntos son la misma clase de cosa. |
| Por grupo | Cada punto con su `group`. Cada grupo toma un color categórico, en orden. | Para comparar cómo se comportan dos o tres grupos. Con más de cuatro, se vuelve difícil de leer. |

## Rotular

No rotules todos los puntos: se tapan entre sí. Con `labelled` eliges los pocos que el título menciona o que se salen de la norma. Los demás dan su nombre al apuntarlos. El nombre va a la derecha de su punto, y pasa solo a la izquierda si otro punto le estorba.

## Los ejes

Parten de cero mientras los datos sean positivos. Si los puntos quedan apretados en una esquina, fija el punto de partida con `minX` o `minY`, y dilo en la bajada.

## Relacionados

`LineChart` · `BarChart` · `Table` · Gráficos de datos.
