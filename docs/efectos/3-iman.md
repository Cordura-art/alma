---
efecto: Imán
id: iman
familia: Reacción
summary: Una pieza que se inclina hacia el puntero cuando se acerca.
---

## Cuándo

Para la acción principal de una portada o de una página de apertura: una sola pieza, con aire alrededor.

No lo uses en un producto, ni en piezas que están juntas: un menú, una barra, una lista. Ahí lo que se mueve estorba al apuntar.

## Cómo funciona

Se pone sobre un envoltorio, que se queda quieto, y mueve lo que hay dentro. Cuando el puntero entra al envoltorio o a un margen a su alrededor, la pieza recorre una parte del camino hacia él. Al salir, vuelve.

Acercarse toma `duration-moderate-02`; volver, `duration-slow-01`.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Alcance | El margen alrededor de la pieza donde empieza a sentir el puntero. |
| Fuerza | Qué parte del camino recorre. |

## Accesibilidad

Solo responde al puntero de un mouse. Con teclado o al tocar, la pieza no se mueve, y su foco se ve igual. Con menos movimiento, tampoco se mueve.

## Código

```js
var iman = AlmaEfectos.monta('iman', envoltorio, { fuerza: 0.3 });
iman.quita();
```
