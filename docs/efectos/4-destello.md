---
efecto: Destello
id: destello
familia: Reacción
summary: Una franja de luz que cruza una superficie cuando el puntero o el foco llegan a ella.
---

## Cuándo

En una tarjeta o una imagen que se puede abrir, para decir «esto responde». Sirve igual con teclado: también cruza cuando llega el foco.

No lo pongas sobre texto que hay que leer con calma. La franja pasa por encima.

## Cómo funciona

La franja es un degradado inclinado, mucho más grande que la superficie, que espera fuera de la vista a un lado. Al llegar el puntero se desliza al otro lado; al salir, vuelve.

Toma el color del acento, a medias con transparente: el mismo del Foco. Cruza en `duration-slow-02`.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Brillo | Cuánta luz lleva la franja. Bajo, para que el texto de debajo se siga leyendo. |
| Ángulo | La inclinación. |
| Ancho | El grosor de la franja. |

## Con menos movimiento

No cruza.

## Código

```js
var destello = AlmaEfectos.monta('destello', tarjeta, { brillo: 0.2 });
destello.quita();
```
