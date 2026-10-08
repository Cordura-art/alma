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

> **Imagen pendiente:** un `BarChart` vertical con sus seis partes numeradas, una barra en el color del acento y las demás neutras, y el detalle abierto sobre una barra.

## Color

| Manera | Cómo | Cuándo |
|---|---|---|
| Un color | Por defecto: todas las barras en el acento. | Casi siempre. El largo ya dice la diferencia. |
| Un énfasis | `highlight`, con el nombre de una barra. Esa va en el acento; las demás, neutras. | Cuando el título habla de una. |
| Categórico | `categorical`. Cada barra con un color de la familia categórica, en orden. | Solo si esos colores identifican a las mismas categorías en otro gráfico de la página. |

## Vertical u horizontal

- **Vertical**, por defecto.
- **Horizontal**, cuando los nombres son largos o las categorías son muchas.
- Si no eliges, `BarChart` pasa solo a horizontal cuando las barras quedarían demasiado angostas para leer sus nombres. Así un gráfico que cabe en un escritorio sigue leyéndose en un teléfono.

## Contenido

- El título dice lo que el gráfico muestra: «Talca fue el destino más vendido en marzo».
- Ordena las barras de mayor a menor, salvo que tengan un orden propio (meses, edades).
- La unidad va en `unit`, una vez. No en cada nombre.

## Relacionados

`LineChart` · `Table` · `ProgressBar` · Gráficos de datos.
