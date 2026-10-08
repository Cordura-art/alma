---
element: Gráficos de datos
order: 7
tab: Anatomía
summary: Las partes de un gráfico, sus textos y sus estados.
---

## Partes

1. **Título:** la conclusión, en una frase. En `text-01`.
2. **Bajada** (opcional): la unidad, el periodo y la fuente. En `text-02`.
3. **Área de datos:** las marcas (barras, líneas, puntos).
4. **Ejes:** la escala y sus rótulos. En `text-02`.
5. **Líneas de guía:** horizontales, pocas y en `border-subtle`. Sin líneas verticales en un gráfico de barras.
6. **Rótulos directos:** el nombre de cada serie junto a ella, o el valor sobre la marca que importa.
7. **Leyenda:** solo si no caben los rótulos directos. Arriba del área, en el mismo orden que las series.
8. **Detalle al apuntar:** el valor exacto del punto, con su fecha y su serie.

![Las partes de un gráfico de líneas, numeradas como en la lista: el título con la conclusión (1), la bajada con la unidad y el periodo (2), el área de datos (3), el eje (4), las líneas de guía (5), el nombre de cada serie junto a su línea (6) y el detalle abierto sobre un punto (8). La leyenda (7) no aparece: los nombres caben junto a las líneas.](assets/Fundamentos/datos-anatomia.png)

## Marcas

| Marca | Medidas |
|---|---|
| Barra | Separación entre barras de al menos la mitad de su ancho. Sin borde. Esquinas rectas en la base. |
| Línea | 2 px. Puntos visibles solo al apuntar, o si son pocos. |
| Punto | 8 px como mínimo, para poder apuntarlo. |
| Área | Relleno al 24 % de su línea, para que deje ver lo que hay detrás. |

Todo en múltiplos de 8 donde se pueda: márgenes, separación entre gráficos, alto de la leyenda.

## Ejes y números

- Las barras parten de cero. Una línea puede no hacerlo, si el eje lo deja claro.
- Pocas marcas en el eje: cuatro o cinco. Números cerrados: 0, 50, 100.
- Los números usan dígitos del mismo ancho, para que queden alineados.
- Formatos de Chile, como en todo ALMA: miles con punto, decimales con coma, `$ 12.480`, `31 mar`. Ver **Contenido › Formatos**.
- Abrevia en el eje (`12 mil`, `1,2 M`) y da el valor completo en el detalle.
- La unidad va una vez, en la bajada o en el eje, no en cada número.

## Estados

| Estado | Qué mostrar |
|---|---|
| Cargando | La forma del gráfico, del tamaño que va a tener. Es `loading`. |
| Sin datos | Qué falta y qué hacer, en el lugar del gráfico. Aparece solo cuando no hay datos. |
| Datos parciales | El gráfico, con una nota que dice qué falta. Un hueco en la línea, no una línea que baja a cero. |
| Error | Qué pasó y «Reintentar». Es `error`, con `onRetry`. |

## En pantallas angostas

- El gráfico ocupa el ancho y conserva una altura que se lea: no se achata.
- Menos marcas en el eje, y rótulos más cortos.
- La leyenda pasa abajo, o se cambia por rótulos directos.
- Si no se lee, cambia de gráfico: barras horizontales en vez de verticales, o las tres cifras que importan en vez del gráfico.

## Movimiento

Las marcas pueden crecer al aparecer, una sola vez, con `duration-slow-01` y la curva de entrada. Con movimiento reducido, están en su lugar desde el principio. Un gráfico no se mueve solo después de eso.
