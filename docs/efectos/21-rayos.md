---
efecto: Rayos
id: rayos
familia: Fondo
summary: Haces de luz que bajan en abanico desde un punto sobre la imagen, unos más fuertes que otros, girando despacio.
---

## Cuándo

Para una apertura con un foco claro: la luz señala hacia abajo, donde está lo que importa. Sirve detrás de un titular centrado o de una pieza que se presenta.

No lo uses en secciones bajas y anchas: los rayos necesitan altura para verse como rayos.

## Cómo funciona

Cada punto de la imagen mira en qué dirección queda la fuente de luz. Un dibujo que depende solo de esa dirección dice cuánta luz hay: por eso la luz es la misma a lo largo de una línea desde la fuente, y eso es un rayo. Son dos dibujos, uno fino y uno ancho, que giran en sentidos contrarios.

La luz se queda dentro de un abanico y se apaga con la distancia. Toma el acento y, donde es más fuerte, el color del texto.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Origen | De dónde viene la luz, a lo ancho. En cero, del centro. |
| Apertura | Qué tan abierto es el abanico. |
| Largo | Hasta dónde llegan los rayos. |
| Rayos | Cuántos haces se distinguen. |
| Fuerza | Cuánta luz llevan. |
| Velocidad | Qué tan rápido giran. |

## Reacción

La fuente se inclina un poco hacia el puntero.

## Código

```js
var rayos = AlmaEfectos.monta('rayos', elemento, { origen: -0.4, apertura: 1 });
rayos.quita();
```
