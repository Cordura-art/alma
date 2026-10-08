---
element: Gráficos de datos
order: 7
tab: Resumen
summary: Cuándo un gráfico ayuda, cuál elegir y qué lleva.
---

## Para qué

Un gráfico sirve cuando deja ver algo que una cifra o una tabla no dejan ver: una tendencia, una diferencia, una excepción. Si la respuesta es un número, muestra el número. Si alguien necesita buscar valores exactos, usa `Table`.

Todo gráfico responde una pregunta. Si no puedes escribirla en una frase, todavía no hay gráfico.

ALMA trae dos gráficos, `BarChart` y `LineChart`, hechos con esta guía. Vale también para cualquier gráfico hecho con otra herramienta.

## Elegir el gráfico

| La pregunta | Gráfico | Ten en cuenta |
|---|---|---|
| ¿Cuánto es? | Una cifra grande, con su comparación al lado. | No hace falta un gráfico para un número. |
| ¿Cuál es mayor? | Barras. Horizontales si los nombres son largos. | Ordénalas de mayor a menor, salvo que tengan un orden propio. |
| ¿Cómo cambió en el tiempo? | Líneas. Barras si son pocos periodos. | El tiempo va de izquierda a derecha. |
| ¿Cómo se reparte un total? | Barras apiladas, o una sola barra dividida. | De dos a cinco partes. Con más, agrupa en «Otros». |
| ¿Se relacionan dos medidas? | Puntos. | Rotula los puntos que importan, no todos. |
| ¿Cómo se distribuye? | Histograma. | Tramos del mismo ancho. |
| ¿Dónde pasa? | Mapa, solo si el lugar es la respuesta. | Si no, barras por región se leen mejor. |
| ¿Cómo va frente a la meta? | Una barra de avance con su marca de meta. | `ProgressBar` alcanza para un solo valor. |

Evita los gráficos de torta con más de tres partes, los de tres dimensiones y los ejes dobles: hacen comparar ángulos, volúmenes o escalas distintas, que es lo que peor leemos.

## Principios

1. **El dato primero.** Todo lo que no es dato (líneas, bordes, fondos) va apagado, o no va.
2. **Decir la verdad.** Las barras parten de cero. Los ejes no se cortan sin avisarlo. Las proporciones del dibujo son las de los números.
3. **Rotular directo.** El nombre de una serie va junto a ella. Una leyenda aparte obliga a ir y volver.
4. **Un énfasis.** Si todo destaca, nada destaca: una serie con color, las demás en neutro.
5. **El título dice la conclusión.** «Las ventas subieron 12 % en marzo», no «Ventas por mes».
6. **Se entiende sin color.** Forma, posición y rótulo dicen lo mismo que el color.

## De dónde viene

La base son nuestros referentes: la guía de visualización de datos de IBM Carbon, las pautas de gráficos de Apple y las de Material. De Carbon vienen las tres familias de color y la exigencia de contraste; de Apple, que el gráfico sea simple y se pueda recorrer con un lector; de Material, elegir el gráfico por la pregunta.
