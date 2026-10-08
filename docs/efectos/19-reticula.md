---
efecto: Retícula
id: reticula
familia: Fondo
summary: Una grilla pareja de puntos chicos; los que quedan cerca del puntero crecen y toman el acento.
---

## Cuándo

Para una apertura sobria, de aire técnico: una página de producto, una sección de documentación, el fondo de un titular. Es el fondo que menos compite con lo que lleva encima.

No lo uses detrás de tablas, formularios o gráficos: sus puntos se confunden con los de ellos.

## Cómo funciona

Los puntos están siempre en su lugar; lo que cambia es su tamaño y su color. Cada punto mira qué tan cerca está del puntero: mientras más cerca, más crece y más toma el acento. Sin puntero, cada tanto pasa sola una ola lenta que hace lo mismo.

Los puntos en reposo toman el color del texto, muy apagado, sobre el fondo de la página.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Separación | La distancia entre un punto y el siguiente. |
| Tamaño | El radio de un punto en reposo. |
| Alcance | Hasta dónde llega la luz del puntero. |
| Crece | Cuánto se agranda un punto encendido. En cero, solo cambia de color. |
| Ola | Cuánto se nota la ola que pasa sola. En cero, solo responde al puntero. |
| Velocidad | Qué tan rápido pasa la ola. |

## Con menos movimiento

Queda la grilla quieta, con una ola detenida.

## Código

```js
var reticula = AlmaEfectos.monta('reticula', elemento, { paso: 32, ola: 0 });
reticula.quita();
```
