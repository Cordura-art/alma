---
component: LineChart
tab: Uso
summary: Un gráfico de líneas para ver cómo cambia una cantidad.
---


## Resumen

`LineChart` responde «¿cómo cambió?». Muestra una o varias series a lo largo de algo que tiene orden, casi siempre el tiempo.

Antes de usarlo, lee **Gráficos de datos**.

## Cuándo usarlo

- Para ver una tendencia: sube, baja, se mantiene.
- Para comparar cómo evolucionan hasta ocho series.

## Cuándo no

- Para categorías sin orden: usa `BarChart`. Una línea entre «Talca» y «Chillán» sugiere un camino que no existe.
- Para dos o tres periodos: las barras se leen mejor.

## Anatomía

1. **Título:** la conclusión.
2. **Bajada** (opcional): la unidad, el periodo, la fuente.
3. **«Ver como tabla».**
4. **Líneas**, cada una con su nombre al final. En pantallas angostas, los nombres pasan a una leyenda sobre el gráfico.
5. **Eje y líneas de guía.**
6. **Guía vertical y detalle:** al apuntar o enfocar, marcan el punto y dan su valor.

> **Imagen pendiente:** un `LineChart` con tres series, una en el color del acento y dos neutras, cada una rotulada al final, la guía vertical sobre marzo y el detalle abierto.

## Color

| Manera | Cómo | Cuándo |
|---|---|---|
| Una serie | Va en el acento. | — |
| Varias, con un énfasis | `highlight`, con el nombre de una. Las demás, neutras. | Cuando el título habla de una. Es lo más claro. |
| Varias, categóricas | Por defecto: los colores categóricos, en orden. | Cuando todas importan por igual. |

## Datos que faltan

Un valor que falta se escribe `null`, y deja un hueco en la línea. Nunca lo reemplaces por cero: una línea que cae a cero dice que no hubo nada, no que no se sabe.

## El eje

Parte de cero mientras los datos sean positivos. Si las diferencias no se ven así, fija otro punto de partida con `min`, y dilo en la bajada.

## Relacionados

`BarChart` · `Table` · Gráficos de datos.
