---
efecto: Inclinar
id: inclinar
familia: Reacción
summary: Una superficie se inclina hacia el puntero, como una tarjeta sostenida por el centro.
---

## Cuándo

Para una pieza que se muestra: una tarjeta de producto, una imagen, una ficha en una portada. Una a la vez.

No lo uses en una grilla llena de tarjetas, ni en nada con controles chicos adentro: al inclinarse, cuesta apuntarles.

## Cómo funciona

Se pone sobre un envoltorio, que se queda plano, e inclina lo que hay dentro. El lado donde está el puntero baja, como una tarjeta apretada con un dedo. Al salir, vuelve a quedar plana.

Seguir al puntero toma `duration-moderate-01`; volver, `duration-slow-01`.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Grados | Cuánto se inclina como máximo. |
| Crece | Cuánto se agranda mientras está inclinada. En 1, no crece. |

## Accesibilidad

Solo responde al puntero de un mouse. Con teclado o al tocar, la pieza queda plana y su foco se ve igual. Con menos movimiento, tampoco se inclina.

## Código

```js
var ficha = AlmaEfectos.monta('inclinar', envoltorio, { grados: 6 });
ficha.quita();
```
