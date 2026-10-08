# Gráficos de datos

Cuándo un gráfico ayuda, cuál elegir y qué lleva.


## Resumen

### Para qué

Un gráfico sirve cuando deja ver algo que una cifra o una tabla no dejan ver: una tendencia, una diferencia, una excepción. Si la respuesta es un número, muestra el número. Si alguien necesita buscar valores exactos, usa `Table`.

Todo gráfico responde una pregunta. Si no puedes escribirla en una frase, todavía no hay gráfico.

ALMA trae tres gráficos hechos con esta guía: `BarChart` (también apiladas), `LineChart` (también con área) y `ScatterChart`. Los tres tienen sus estados de cargando, sin datos y error. Vale también para cualquier gráfico hecho con otra herramienta.

### Elegir el gráfico

| La pregunta | Gráfico | Ten en cuenta |
|---|---|---|
| ¿Cuánto es? | Una cifra grande, con su comparación al lado. | No hace falta un gráfico para un número. |
| ¿Cuál es mayor? | Barras. Horizontales si los nombres son largos. | Ordénalas de mayor a menor, salvo que tengan un orden propio. |
| ¿Cómo cambió en el tiempo? | Líneas. Barras si son pocos periodos. | El tiempo va de izquierda a derecha. |
| ¿Cómo se reparte un total? | Barras apiladas, o una sola barra dividida. | De dos a cinco partes. Con más, agrupa en «Otros». |
| ¿Se relacionan dos medidas? | Puntos: `ScatterChart`. | Rotula los puntos que importan, no todos. |
| ¿Cómo se distribuye? | Histograma. | Tramos del mismo ancho. |
| ¿Dónde pasa? | Mapa, solo si el lugar es la respuesta. | Si no, barras por región se leen mejor. |
| ¿Cómo va frente a la meta? | Una barra de avance con su marca de meta. | `ProgressBar` alcanza para un solo valor. |

Evita los gráficos de torta con más de tres partes, los de tres dimensiones y los ejes dobles: hacen comparar ángulos, volúmenes o escalas distintas, que es lo que peor leemos.

### Principios

1. **El dato primero.** Todo lo que no es dato (líneas, bordes, fondos) va apagado, o no va.
2. **Decir la verdad.** Las barras parten de cero. Los ejes no se cortan sin avisarlo. Las proporciones del dibujo son las de los números.
3. **Rotular directo.** El nombre de una serie va junto a ella. Una leyenda aparte obliga a ir y volver.
4. **Un énfasis.** Si todo destaca, nada destaca: una serie con color, las demás en neutro.
5. **El título dice la conclusión.** «Las ventas subieron 12 % en marzo», no «Ventas por mes».
6. **Se entiende sin color.** Forma, posición y rótulo dicen lo mismo que el color.

### De dónde viene

La base son nuestros referentes: la guía de visualización de datos de IBM Carbon, las pautas de gráficos de Apple y las de Material. De Carbon vienen las tres familias de color y la exigencia de contraste; de Apple, que el gráfico sea simple y se pueda recorrer con un lector; de Material, elegir el gráfico por la pregunta.

## Color

### Tres familias

| Familia | Tokens | Para |
|---|---|---|
| Categórica | `viz-cat-01` a `viz-cat-08` | Cosas distintas, sin orden entre ellas: rutas, productos, regiones. |
| Secuencial | `viz-seq-1` a `viz-seq-5` | Un valor de menos a más: ocupación, densidad, monto. |
| Divergente | `viz-div-1` a `viz-div-5` | Un desvío hacia dos lados desde un punto medio: bajo y sobre la meta. |

Cambian con el tema, y cada color de la categórica llega a 3:1 sobre `ui-01` en su tema.

### Categórica

- Úsalos en orden, empezando por el `01`. El orden está pensado para que los vecinos se distingan.
- Usa tantos como series haya. Con más de ocho, agrupa las menores en «Otros».
- Una misma cosa lleva el mismo color en toda la página: si Talca es `viz-cat-02` en un gráfico, lo es en todos.
- No repitas un color para dos series, ni lo aclares para sacar una novena.

### Secuencial y divergente

- En la secuencial, más intenso es más. No la uses para categorías.
- En la divergente, el centro (`viz-div-3`) es neutro y los extremos son los desvíos. Di en el gráfico cuál es el punto medio.
- Cinco pasos alcanzan: el ojo no distingue muchos más con seguridad.

### Un solo énfasis

Muchas veces no hacen falta ocho colores, sino uno:

- La serie que importa, en `interactive-01`.
- Las demás, en un neutro: `text-03`.

Así el gráfico dice qué mirar, y toma el color de la entidad sin tocar nada.

### Estados no son categorías

Los colores de estado (`support-01` a `support-04`) significan error, éxito, advertencia e información. No los uses para distinguir series: una barra roja se lee como un problema.

Úsalos solo cuando el dato es un estado: una meta cumplida, un límite superado. Y siempre con su palabra o su ícono.

### Nunca solo color

Cerca de una de cada doce personas distingue mal algunos colores. Por eso:

- Rotula las series junto a ellas.
- En líneas, suma una forma al punto o un trazo distinto.
- En áreas que se tocan, deja una separación de 1 px en el color del fondo.
- Revisa el gráfico en gris: si se entiende, está bien.

## Anatomía

### Partes

1. **Título:** la conclusión, en una frase. En `text-01`.
2. **Bajada** (opcional): la unidad, el periodo y la fuente. En `text-02`.
3. **Área de datos:** las marcas (barras, líneas, puntos).
4. **Ejes:** la escala y sus rótulos. En `text-02`.
5. **Líneas de guía:** horizontales, pocas y en `border-subtle`. Sin líneas verticales en un gráfico de barras.
6. **Rótulos directos:** el nombre de cada serie junto a ella, o el valor sobre la marca que importa.
7. **Leyenda:** solo si no caben los rótulos directos. Arriba del área, en el mismo orden que las series.
8. **Detalle al apuntar:** el valor exacto del punto, con su fecha y su serie.

![Las partes de un gráfico de líneas, numeradas como en la lista: el título con la conclusión (1), la bajada con la unidad y el periodo (2), el área de datos (3), el eje (4), las líneas de guía (5), el nombre de cada serie junto a su línea (6) y el detalle abierto sobre un punto (8). La leyenda (7) no aparece: los nombres caben junto a las líneas.](assets/Fundamentos/datos-anatomia.png)

### Marcas

| Marca | Medidas |
|---|---|
| Barra | Separación entre barras de al menos la mitad de su ancho. Sin borde. Esquinas rectas en la base. |
| Línea | 2 px. Puntos visibles solo al apuntar, o si son pocos. |
| Punto | 8 px como mínimo, para poder apuntarlo. |
| Área | Relleno al 24 % de su línea, para que deje ver lo que hay detrás. |

Todo en múltiplos de 8 donde se pueda: márgenes, separación entre gráficos, alto de la leyenda.

### Ejes y números

- Las barras parten de cero. Una línea puede no hacerlo, si el eje lo deja claro.
- Pocas marcas en el eje: cuatro o cinco. Números cerrados: 0, 50, 100.
- Los números usan dígitos del mismo ancho, para que queden alineados.
- Formatos de Chile, como en todo ALMA: miles con punto, decimales con coma, `$ 12.480`, `31 mar`. Ver **Contenido › Formatos**.
- Abrevia en el eje (`12 mil`, `1,2 M`) y da el valor completo en el detalle.
- La unidad va una vez, en la bajada o en el eje, no en cada número.

### Estados

| Estado | Qué mostrar |
|---|---|
| Cargando | La forma del gráfico, del tamaño que va a tener. Es `loading`. |
| Sin datos | Qué falta y qué hacer, en el lugar del gráfico. Aparece solo cuando no hay datos. |
| Datos parciales | El gráfico, con una nota que dice qué falta. Un hueco en la línea, no una línea que baja a cero. |
| Error | Qué pasó y «Reintentar». Es `error`, con `onRetry`. |

### En pantallas angostas

- El gráfico ocupa el ancho y conserva una altura que se lea: no se achata.
- Menos marcas en el eje, y rótulos más cortos.
- La leyenda pasa abajo, o se cambia por rótulos directos.
- Si no se lee, cambia de gráfico: barras horizontales en vez de verticales, o las tres cifras que importan en vez del gráfico.

### Movimiento

Las marcas pueden crecer al aparecer, una sola vez, con `duration-slow-01` y la curva de entrada. Con movimiento reducido, están en su lugar desde el principio. Un gráfico no se mueve solo después de eso.

## Accesibilidad

### Lo mínimo

Todo gráfico tiene estas cuatro cosas:

1. **Un texto que dice la conclusión.** El título ya lo hace, si está bien escrito.
2. **Los datos en una tabla**, a la vista o a un toque («Ver como tabla»). Es la alternativa completa para quien no ve el gráfico.
3. **Contraste:** las marcas llegan a 3:1 sobre su fondo; los textos, a 4,5:1.
4. **Otra pista además del color:** rótulo, forma o trama.

### Con lector de pantalla

- El gráfico se presenta como una imagen con nombre: su título y una frase con lo que muestra. «Ventas por mes, de enero a junio. Subieron de 40 a 62 millones, con una baja en abril».
- Las marcas no se leen una por una salvo que la persona entre al gráfico.
- La tabla alternativa tiene encabezados de fila y de columna.
- Un valor que cambia solo (un indicador en vivo) no se anuncia en cada cambio: a lo sumo, cada cierto tiempo o cuando cruza un límite.

### Con teclado

- El gráfico es una sola parada de Tab.
- Dentro, las flechas pasan de un punto al siguiente y de una serie a otra.
- El punto con foco muestra el mismo detalle que al apuntar, y tiene un foco visible.
- Esc sale del gráfico.

### Al apuntar y al tocar

- El detalle aparece también con el foco, no solo con el puntero.
- Se puede pasar el puntero al detalle sin que se cierre, y Esc lo cierra.
- Al tocar, el área que responde alrededor de un punto es de 44 px, aunque el punto se vea más chico.

### Revisión rápida

| Prueba | Pasa si |
|---|---|
| Míralo en gris | Las series se siguen distinguiendo. |
| Tapa la leyenda | Se sigue sabiendo cuál es cuál. |
| Lee solo el título | Se entiende qué dice el gráfico. |
| Recórrelo con teclado | Se llega a cada valor. |
| Amplía la página al 200 % | Nada se corta ni se monta. |
