---
efecto: Contar
id: contar
familia: Texto
summary: Un número sube desde cero hasta su valor, rápido al principio y frenando al llegar.
---

## Cuándo

Para una cifra que es el dato de la sección: un total, un resultado, un logro. Una o dos por pantalla.

No lo uses en tablas, en precios que alguien va a pagar ni en números que cambian solos. Ahí el número tiene que estar y nada más.

## Cómo funciona

Se pone sobre un elemento cuyo texto es el número, tal como se escribe: con sus puntos de miles, su coma decimal y lo que lleve antes o después (un signo, una unidad). Sube desde cero y, al terminar, deja el texto exactamente como estaba.

Los dígitos ocupan todos el mismo ancho mientras sube, para que la cifra no tiemble. Dura tantas veces `duration-slow-02` como diga el ajuste.

## Ajustes

| Ajuste | Qué cambia |
|---|---|
| Duración | Cuántas veces `duration-slow-02` tarda en llegar. |

## Accesibilidad

El valor verdadero está siempre en la página, fuera de la vista: un lector de pantalla lee la cifra final y no la cuenta. Con menos movimiento, la cifra está desde el principio.

## Código

```js
var cifra = AlmaEfectos.monta('contar', elemento);   // <p>$ 12.480</p>
cifra.pasa();   // otra vez
```
