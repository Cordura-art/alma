---
component: BarChart
tab: Uso
summary: Un gráfico de barras para comparar cantidades entre categorías.
---


## Resumen

`BarChart` responde «¿cuál es mayor?». Muestra una cantidad por categoría, como barras que parten de cero.

Antes de usarlo, lee **Gráficos de datos**: ahí está cuándo conviene un gráfico y cuál elegir.

## Cuándo usarlo

- Para comparar entre dos y doce categorías.
- Cuando importa el orden o la diferencia, más que el valor exacto.

## Cuándo no

- Para un solo número: muestra la cifra.
- Para ver cómo algo cambió en muchos periodos: usa `LineChart`.
- Para buscar valores exactos: usa `Table`.

## Anatomía

1. **Título:** la conclusión, en una frase.
2. **Bajada** (opcional): la unidad, el periodo, la fuente.
3. **«Ver como tabla»:** cambia el gráfico por sus datos en una tabla, y de vuelta.
4. **Barras**, con su nombre debajo, o a la izquierda si son horizontales.
5. **Eje y líneas de guía**, con cuatro o cinco marcas. Las barras horizontales llevan el valor al final de cada una, sin eje.
6. **Detalle:** el valor exacto de la barra que se apunta o se enfoca.

![Anatomía de BarChart: el título con la conclusión (1), la bajada (2), el botón «Ver como tabla» (3), las barras, con la de Talca en el color del acento y las demás neutras (4), las líneas de guía con su eje (5) y el detalle abierto sobre la barra de Temuco (6).](assets/Componentes/bar-chart-anatomia.png)

## Color

| Manera | Cómo | Cuándo |
|---|---|---|
| Un color | Por defecto: todas las barras en el acento. | Casi siempre. El largo ya dice la diferencia. |
| Un énfasis | `highlight`, con el nombre de una barra. Esa va en el acento; las demás, neutras. | Cuando el título habla de una. |
| Categórico | `categorical`. Cada barra con un color de la familia categórica, en orden. | Solo si esos colores identifican a las mismas categorías en otro gráfico de la página. |

## Apiladas

Con `series`, cada barra se divide en partes: los pasajes de un destino, por clase. Lo primero que se compara sigue siendo la barra entera; las partes, después.

![Un BarChart de barras apiladas: cinco destinos, cada barra dividida en Semicama, Salón cama y Premium, con una leyenda sobre el gráfico. El detalle, abierto sobre la parte de Salón cama de Temuco, dice «420 pasajes de 1.260».](assets/Componentes/bar-chart-apiladas.png)

- De dos a cinco partes. Con más, junta las menores en «Otros».
- Las partes van en el mismo orden en todas las barras, y la más importante, abajo: es la única que parte de cero y se compara bien.
- Cada parte toma un color categórico, y una leyenda dice cuál es cuál.
- Si lo que importa es comparar una parte entre barras, no apiles: usa un gráfico por parte.

## Estados

| Estado | Cómo | Qué se ve |
|---|---|---|
| Cargando | `loading` | La forma del gráfico, del tamaño que va a tener. |
| Sin datos | `data` vacío | Qué falta y qué hacer, con `emptyTitle`, `emptyMessage` y `emptyAction`. |
| Error | `error`, con `onRetry` | Qué pasó y «Reintentar». |

![Un mismo gráfico en sus tres estados, con el título y la bajada siempre en su lugar. Cargando: un bloque del tamaño que va a tener el gráfico. Sin datos: «Aún no hay ventas en abril» y una frase que dice cuándo aparecerán. Error: «No pudimos cargar los datos», con el botón «Reintentar».](assets/Componentes/bar-chart-estados.png)

En los tres, el título y la bajada siguen ahí, y el estado ocupa el alto del gráfico: nada salta cuando llegan los datos. Los tres valen igual para `LineChart` y `ScatterChart`.

## Vertical u horizontal

- **Vertical**, por defecto.
- **Horizontal**, cuando los nombres son largos o las categorías son muchas.
- Si no eliges, `BarChart` pasa solo a horizontal cuando las barras quedarían demasiado angostas para leer sus nombres. Así un gráfico que cabe en un escritorio sigue leyéndose en un teléfono.

## Contenido

- El título dice lo que el gráfico muestra: «Talca fue el destino más vendido en marzo».
- Ordena las barras de mayor a menor, salvo que tengan un orden propio (meses, edades).
- La unidad va en `unit`, una vez. No en cada nombre.

## Relacionados

`LineChart` · `ScatterChart` · `Table` · `ProgressBar` · `Skeleton` · `EmptyState` · Gráficos de datos.
