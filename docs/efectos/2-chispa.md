---
efecto: Chispa
id: chispa
familia: Reacción
summary: Unas líneas cortas que saltan desde donde se hizo clic.
---

## Cuándo

Para confirmar un gesto que vale la pena celebrar: guardar algo, marcar un favorito, terminar un paso. En una zona o en un botón.

No la pongas en toda la página ni en acciones de todos los días. Si salta con cada clic, deja de decir algo.

## Cómo funciona

Las líneas salen repartidas en círculo desde el punto del clic, avanzan un tramo corto y se acortan hasta desaparecer. Se dibujan sobre una capa que deja pasar los clics: lo que hay debajo funciona igual.

Toma el color del acento. Dura lo que dice `duration-slow-01`.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Cuántas | Cuántas líneas saltan. |
| Largo | El largo de cada línea al salir. |
| Alcance | Hasta dónde llegan. |

## Con menos movimiento

No salta. El clic hace lo suyo igual.

## Código

```js
var chispa = AlmaEfectos.monta('chispa', elemento, { cuantas: 6 });
chispa.quita();
```
