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

> **Imagen pendiente:** un gráfico de líneas con sus ocho partes numeradas: título con la conclusión, bajada con unidad y fuente, dos series rotuladas al final de su línea, eje con cuatro marcas, líneas de guía y el detalle abierto sobre un punto.

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
| Cargando | El marco del gráfico con `Skeleton`, del tamaño que va a tener. |
| Sin datos | `EmptyState` en el lugar del gráfico: qué falta y qué hacer. |
| Datos parciales | El gráfico, con una nota que dice qué falta. Un hueco en la línea, no una línea que baja a cero. |
| Error | `InlineNotification` y «Reintentar». |

## En pantallas angostas

- El gráfico ocupa el ancho y conserva una altura que se lea: no se achata.
- Menos marcas en el eje, y rótulos más cortos.
- La leyenda pasa abajo, o se cambia por rótulos directos.
- Si no se lee, cambia de gráfico: barras horizontales en vez de verticales, o las tres cifras que importan en vez del gráfico.

## Movimiento

Las marcas pueden crecer al aparecer, una sola vez, con `duration-slow-01` y la curva de entrada. Con movimiento reducido, están en su lugar desde el principio. Un gráfico no se mueve solo después de eso.
