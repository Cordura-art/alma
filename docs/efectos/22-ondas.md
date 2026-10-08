---
efecto: Ondas
id: ondas
familia: Fondo
summary: Un suelo de líneas visto desde abajo, una detrás de otra hasta el horizonte, por el que pasan lomas.
---

## Cuándo

Para la parte baja de una apertura: da un suelo y una profundidad, y deja libre el cielo para el titular. Va bien con el Velo o los Rayos arriba, en secciones distintas.

No lo confundas con los Hilos: los Hilos son un haz que cruza; las Ondas son un terreno. No los pongas juntos.

## Cómo funciona

Cada línea es una altura que cambia a lo ancho. La línea siguiente lee el mismo dibujo un poco más allá, y entre todas dibujan un solo suelo. Las lomas avanzan hacia quien mira.

Las líneas cercanas tapan a las lejanas, como un cerro tapa lo que tiene detrás. Las lejanas son más bajas, van más juntas y se apagan. Las cercanas toman el color del texto; las lejanas, el acento.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Cuántas | Cuántas líneas hay hasta el horizonte. |
| Altura | Qué tan altas son las lomas. En cero, es un suelo plano. |
| Horizonte | A qué altura de la imagen queda la última línea. |
| Grosor | El ancho de la línea más cercana. |
| Velocidad | Qué tan rápido avanzan las lomas. |

## Reacción

Bajo el puntero, el suelo cercano se levanta un poco.

## Código

```js
var ondas = AlmaEfectos.monta('ondas', elemento, { horizonte: 0.5, altura: 1.4 });
ondas.quita();
```
