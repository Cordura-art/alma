---
element: Gráficos de datos
order: 7
tab: Color
summary: Las tres familias de color para datos y cómo usarlas.
---

## Tres familias

| Familia | Tokens | Para |
|---|---|---|
| Categórica | `viz-cat-01` a `viz-cat-08` | Cosas distintas, sin orden entre ellas: rutas, productos, regiones. |
| Secuencial | `viz-seq-1` a `viz-seq-5` | Un valor de menos a más: ocupación, densidad, monto. |
| Divergente | `viz-div-1` a `viz-div-5` | Un desvío hacia dos lados desde un punto medio: bajo y sobre la meta. |

Cambian con el tema, y cada color de la categórica llega a 3:1 sobre `ui-01` en su tema.

## Categórica

- Úsalos en orden, empezando por el `01`. El orden está pensado para que los vecinos se distingan.
- Usa tantos como series haya. Con más de ocho, agrupa las menores en «Otros».
- Una misma cosa lleva el mismo color en toda la página: si Talca es `viz-cat-02` en un gráfico, lo es en todos.
- No repitas un color para dos series, ni lo aclares para sacar una novena.

## Secuencial y divergente

- En la secuencial, más intenso es más. No la uses para categorías.
- En la divergente, el centro (`viz-div-3`) es neutro y los extremos son los desvíos. Di en el gráfico cuál es el punto medio.
- Cinco pasos alcanzan: el ojo no distingue muchos más con seguridad.

## Un solo énfasis

Muchas veces no hacen falta ocho colores, sino uno:

- La serie que importa, en `interactive-01`.
- Las demás, en un neutro: `text-03`.

Así el gráfico dice qué mirar, y toma el color de la entidad sin tocar nada.

## Estados no son categorías

Los colores de estado (`support-01` a `support-04`) significan error, éxito, advertencia e información. No los uses para distinguir series: una barra roja se lee como un problema.

Úsalos solo cuando el dato es un estado: una meta cumplida, un límite superado. Y siempre con su palabra o su ícono.

## Nunca solo color

Cerca de una de cada doce personas distingue mal algunos colores. Por eso:

- Rotula las series junto a ellas.
- En líneas, suma una forma al punto o un trazo distinto.
- En áreas que se tocan, deja una separación de 1 px en el color del fondo.
- Revisa el gráfico en gris: si se entiende, está bien.
